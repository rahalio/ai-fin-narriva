/**
 * SnapshotRepository — in-memory sandbox implementation.
 */

import type { SnapshotRepository } from '@narriva/services/snapshots';
import { generateIdWithPrefix } from '../_shared/id-generator.service.impl.js';
import {
  ensureNarrivaSandboxSeeded,
  factSnapshotsById,
  listSnapshots,
  newFieldId,
  nowIso,
  recomputeMissingRequiredKeys,
  responseMeta,
  type SandboxFactField,
  type SandboxFactSnapshot,
} from '../_shared/narriva-sandbox-store.js';

export class SnapshotRepositoryDdb implements SnapshotRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listFactSnapshots(
    input: Parameters<SnapshotRepository['listFactSnapshots']>[0]
  ): Promise<Awaited<ReturnType<SnapshotRepository['listFactSnapshots']>>> {
    ensureNarrivaSandboxSeeded();
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? '');
    return {
      data: { items: listSnapshots() },
      ...responseMeta(correlationId),
    };
  }

  async createFactSnapshot(
    input: Parameters<SnapshotRepository['createFactSnapshot']>[0]
  ): Promise<Awaited<ReturnType<SnapshotRepository['createFactSnapshot']>>> {
    ensureNarrivaSandboxSeeded();
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? '');
    const snapshotId = String(raw.id ?? generateIdWithPrefix('snp'));
    const now = nowIso();
    const fieldsIn = (raw.fields as Array<Record<string, unknown>> | undefined) ?? [];
    const fields: SandboxFactField[] = fieldsIn.map((f) => ({
      fieldId: newFieldId(),
      key: String(f.key ?? ''),
      value: f.value,
      sourceSystem: String(f.sourceSystem ?? 'unknown'),
      authoritative: Boolean(f.authoritative ?? false),
      requiredForGeneration: Boolean(f.requiredForGeneration ?? false),
    }));

    const snapshot: SandboxFactSnapshot = {
      snapshotId,
      accountId: String(raw.accountId ?? ''),
      asOf: String(raw.asOf ?? now),
      periodKey: String(raw.periodKey ?? ''),
      status: 'open',
      fields,
      missingRequiredKeys: [],
      createdAt: now,
      updatedAt: now,
    };
    snapshot.missingRequiredKeys = recomputeMissingRequiredKeys(snapshot);
    factSnapshotsById.set(snapshotId, snapshot);

    return {
      data: snapshot,
      ...responseMeta(correlationId),
    };
  }

  async getFactSnapshot(
    input: Parameters<SnapshotRepository['getFactSnapshot']>[0]
  ): Promise<Awaited<ReturnType<SnapshotRepository['getFactSnapshot']>>> {
    ensureNarrivaSandboxSeeded();
    const raw = input as Record<string, unknown>;
    const snapshotId = String(raw.snapshotId ?? '');
    const correlationId = String(raw.correlationId ?? '');
    const snapshot = factSnapshotsById.get(snapshotId);
    if (!snapshot) {
      return null as never;
    }
    return {
      data: snapshot,
      ...responseMeta(correlationId),
    };
  }
}
