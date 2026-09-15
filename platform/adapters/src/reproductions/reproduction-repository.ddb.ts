/**
 * ReproductionRepository — in-memory sandbox implementation.
 */

import type { ReproductionRepository } from '@narriva/services/reproductions';
import { generateIdWithPrefix } from '../_shared/id-generator.service.impl.js';
import {
  ensureNarrivaSandboxSeeded,
  listReproductions,
  narrativesById,
  nowIso,
  reproductionsById,
  responseMeta,
  type SandboxReproductionJob,
} from '../_shared/narriva-sandbox-store.js';

export class ReproductionRepositoryDdb implements ReproductionRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listReproductions(
    input: Parameters<ReproductionRepository['listReproductions']>[0]
  ): Promise<Awaited<ReturnType<ReproductionRepository['listReproductions']>>> {
    ensureNarrivaSandboxSeeded();
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? '');
    return {
      data: { items: listReproductions() },
      ...responseMeta(correlationId),
    };
  }

  async createReproduction(
    input: Parameters<ReproductionRepository['createReproduction']>[0]
  ): Promise<Awaited<ReturnType<ReproductionRepository['createReproduction']>>> {
    ensureNarrivaSandboxSeeded();
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? '');
    const narrativeId = String(raw.narrativeId ?? '');
    const narrative = narrativesById.get(narrativeId);
    if (!narrative) {
      return null as never;
    }

    const reproductionId = String(raw.id ?? generateIdWithPrefix('rpr'));
    const now = nowIso();
    const originalText = narrative.text ?? '';
    const reproducedText = originalText;
    const job: SandboxReproductionJob = {
      reproductionId,
      narrativeId,
      snapshotId: String(raw.snapshotId ?? narrative.snapshotId),
      templateId: String(raw.templateId ?? narrative.templateId),
      templateVersion: Number(raw.templateVersion ?? narrative.templateVersion),
      status: 'done',
      originalText,
      reproducedText,
      diverged: originalText !== reproducedText,
      downloadUrl: `sandbox://reproductions/${reproductionId}.zip`,
      createdAt: now,
      completedAt: now,
    };
    reproductionsById.set(reproductionId, job);
    return {
      data: job,
      ...responseMeta(correlationId),
    };
  }

  async getReproduction(
    input: Parameters<ReproductionRepository['getReproduction']>[0]
  ): Promise<Awaited<ReturnType<ReproductionRepository['getReproduction']>>> {
    ensureNarrivaSandboxSeeded();
    const raw = input as Record<string, unknown>;
    const reproductionId = String(raw.reproductionId ?? '');
    const correlationId = String(raw.correlationId ?? '');
    const job = reproductionsById.get(reproductionId);
    if (!job) {
      return null as never;
    }
    return {
      data: job,
      ...responseMeta(correlationId),
    };
  }
}
