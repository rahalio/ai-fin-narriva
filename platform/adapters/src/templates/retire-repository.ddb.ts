/**
 * RetireRepository — in-memory sandbox implementation.
 */

import type { RetireRepository } from '@narriva/services/templates';
import {
  ensureNarrivaSandboxSeeded,
  nowIso,
  responseMeta,
  templatesById,
} from '../_shared/narriva-sandbox-store.js';

export class RetireRepositoryDdb implements RetireRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async retireTemplate(
    input: Parameters<RetireRepository['retireTemplate']>[0]
  ): Promise<Awaited<ReturnType<RetireRepository['retireTemplate']>>> {
    ensureNarrivaSandboxSeeded();
    const raw = input as Record<string, unknown>;
    const templateId = String(raw.templateId ?? '');
    const correlationId = String(raw.correlationId ?? '');
    const template = templatesById.get(templateId);
    if (!template) {
      return null as never;
    }
    const now = nowIso();
    template.status = 'retired';
    template.retiredAt = now;
    template.updatedAt = now;
    templatesById.set(templateId, template);
    return {
      data: template,
      ...responseMeta(correlationId),
    };
  }
}
