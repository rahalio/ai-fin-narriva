/**
 * SubmitRepository — in-memory sandbox implementation.
 */

import type { SubmitRepository } from '@narriva/services/templates';
import {
  ensureNarrivaSandboxSeeded,
  nowIso,
  responseMeta,
  templatesById,
} from '../_shared/narriva-sandbox-store.js';

export class SubmitRepositoryDdb implements SubmitRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async submitTemplateForApproval(
    input: Parameters<SubmitRepository['submitTemplateForApproval']>[0]
  ): Promise<Awaited<ReturnType<SubmitRepository['submitTemplateForApproval']>>> {
    ensureNarrivaSandboxSeeded();
    const raw = input as Record<string, unknown>;
    const templateId = String(raw.templateId ?? '');
    const correlationId = String(raw.correlationId ?? '');
    const template = templatesById.get(templateId);
    if (!template) {
      return null as never;
    }
    // Remain draft until approved; mark updated for queue visibility
    template.updatedAt = nowIso();
    templatesById.set(templateId, template);
    return {
      data: template,
      ...responseMeta(correlationId),
    };
  }
}
