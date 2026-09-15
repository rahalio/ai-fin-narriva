/**
 * LockRepository — in-memory sandbox implementation.
 */

import type { LockRepository } from '@narriva/services/snapshots';
import {
  ensureNarrivaSandboxSeeded,
  factSnapshotsById,
  nowIso,
  recomputeMissingRequiredKeys,
  responseMeta,
} from '../_shared/narriva-sandbox-store.js';

export class LockRepositoryDdb implements LockRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async lockFactSnapshot(
    input: Parameters<LockRepository['lockFactSnapshot']>[0]
  ): Promise<Awaited<ReturnType<LockRepository['lockFactSnapshot']>>> {
    ensureNarrivaSandboxSeeded();
    const raw = input as Record<string, unknown>;
    const snapshotId = String(raw.snapshotId ?? '');
    const correlationId = String(raw.correlationId ?? '');
    const snapshot = factSnapshotsById.get(snapshotId);
    if (!snapshot) {
      return null as never;
    }

    snapshot.missingRequiredKeys = recomputeMissingRequiredKeys(snapshot);
    if (snapshot.missingRequiredKeys.length > 0) {
      // Fail closed: return current open snapshot without locking
      snapshot.updatedAt = nowIso();
      factSnapshotsById.set(snapshotId, snapshot);
      return {
        data: snapshot,
        ...responseMeta(correlationId),
      };
    }

    const now = nowIso();
    snapshot.status = 'locked';
    snapshot.lockedAt = now;
    snapshot.lockedBy = String(raw.createdByActorId ?? raw.lockedBy ?? 'sandbox');
    snapshot.updatedAt = now;
    factSnapshotsById.set(snapshotId, snapshot);

    return {
      data: snapshot,
      ...responseMeta(correlationId),
    };
  }
}
