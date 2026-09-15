/**
 * ApproveRepository — in-memory sandbox implementation.
 */

import type { ApproveRepository } from '@narriva/services/templates';
import {
  ensureNarrivaSandboxSeeded,
  nowIso,
  responseMeta,
  templatesById,
} from '../_shared/narriva-sandbox-store.js';

export class ApproveRepositoryDdb implements ApproveRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async approveTemplate(
    input: Parameters<ApproveRepository['approveTemplate']>[0]
  ): Promise<Awaited<ReturnType<ApproveRepository['approveTemplate']>>> {
    ensureNarrivaSandboxSeeded();
    const raw = input as Record<string, unknown>;
    const templateId = String(raw.templateId ?? '');
    const correlationId = String(raw.correlationId ?? '');
    const template = templatesById.get(templateId);
    if (!template) {
      return null as never;
    }
    const now = nowIso();
    template.status = 'approved';
    template.approvedAt = now;
    template.updatedAt = now;
    templatesById.set(templateId, template);
    return {
      data: template,
      ...responseMeta(correlationId),
    };
  }
}
