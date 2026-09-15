/**
 * AuthoritativeRepository — in-memory sandbox implementation.
 */

import type { AuthoritativeRepository } from '@narriva/services/snapshots';
import {
  ensureNarrivaSandboxSeeded,
  factSnapshotsById,
  nowIso,
  recomputeMissingRequiredKeys,
  responseMeta,
} from '../_shared/narriva-sandbox-store.js';

export class AuthoritativeRepositoryDdb implements AuthoritativeRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async markFactFieldAuthoritative(
    input: Parameters<AuthoritativeRepository['markFactFieldAuthoritative']>[0]
  ): Promise<Awaited<ReturnType<AuthoritativeRepository['markFactFieldAuthoritative']>>> {
    ensureNarrivaSandboxSeeded();
    const raw = input as Record<string, unknown>;
    const snapshotId = String(raw.snapshotId ?? '');
    const fieldId = String(raw.fieldId ?? '');
    const correlationId = String(raw.correlationId ?? '');
    const snapshot = factSnapshotsById.get(snapshotId);
    if (!snapshot) {
      return null as never;
    }

    const field = snapshot.fields.find((f) => f.fieldId === fieldId);
    if (!field) {
      return null as never;
    }

    field.authoritative = true;
    snapshot.updatedAt = nowIso();
    snapshot.missingRequiredKeys = recomputeMissingRequiredKeys(snapshot);
    factSnapshotsById.set(snapshotId, snapshot);

    return {
      data: snapshot,
      ...responseMeta(correlationId),
    };
  }
}
