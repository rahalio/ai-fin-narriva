/**
 * JudgmentRepository — in-memory sandbox implementation.
 */

import type { JudgmentRepository } from '@narriva/services/narratives';
import {
  ensureNarrivaSandboxSeeded,
  narrativesById,
  nowIso,
  responseMeta,
} from '../_shared/narriva-sandbox-store.js';

export class JudgmentRepositoryDdb implements JudgmentRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async addNarrativeJudgmentOverlay(
    input: Parameters<JudgmentRepository['addNarrativeJudgmentOverlay']>[0]
  ): Promise<Awaited<ReturnType<JudgmentRepository['addNarrativeJudgmentOverlay']>>> {
    ensureNarrivaSandboxSeeded();
    const raw = input as Record<string, unknown>;
    const narrativeId = String(raw.narrativeId ?? '');
    const correlationId = String(raw.correlationId ?? '');
    const narrative = narrativesById.get(narrativeId);
    if (!narrative) {
      return null as never;
    }
    narrative.judgmentOverlay = String(raw.judgmentOverlay ?? '');
    narrative.updatedAt = nowIso();
    narrativesById.set(narrativeId, narrative);
    return {
      data: narrative,
      ...responseMeta(correlationId),
    };
  }
}
