/**
 * TemplateRepository — in-memory sandbox implementation.
 */

import type { TemplateRepository } from '@narriva/services/templates';
import { generateIdWithPrefix } from '../_shared/id-generator.service.impl.js';
import {
  ensureNarrivaSandboxSeeded,
  listTemplates,
  nowIso,
  responseMeta,
  templatesById,
  type SandboxTemplate,
} from '../_shared/narriva-sandbox-store.js';

export class TemplateRepositoryDdb implements TemplateRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listTemplates(
    input: Parameters<TemplateRepository['listTemplates']>[0]
  ): Promise<Awaited<ReturnType<TemplateRepository['listTemplates']>>> {
    ensureNarrivaSandboxSeeded();
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? '');
    return {
      data: { items: listTemplates() },
      ...responseMeta(correlationId),
    };
  }

  async createTemplate(
    input: Parameters<TemplateRepository['createTemplate']>[0]
  ): Promise<Awaited<ReturnType<TemplateRepository['createTemplate']>>> {
    ensureNarrivaSandboxSeeded();
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? '');
    const templateId = String(raw.id ?? generateIdWithPrefix('tpl'));
    const now = nowIso();
    const template: SandboxTemplate = {
      templateId,
      name: String(raw.name ?? 'Untitled template'),
      audience: (raw.audience as SandboxTemplate['audience']) ?? 'retail_client',
      locale: String(raw.locale ?? 'en-US'),
      version: 1,
      status: 'draft',
      body: String(raw.body ?? ''),
      productRiskTier:
        (raw.productRiskTier as SandboxTemplate['productRiskTier']) ?? 'routine',
      disclosureRuleIds: (raw.disclosureRuleIds as string[] | undefined) ?? [],
      bannedClaims: (raw.bannedClaims as string[] | undefined) ?? [],
      logicOutline: raw.logicOutline ? String(raw.logicOutline) : undefined,
      boundFactKeys: (raw.boundFactKeys as string[] | undefined) ?? [],
      createdAt: now,
      updatedAt: now,
    };
    templatesById.set(templateId, template);
    return {
      data: template,
      ...responseMeta(correlationId),
    };
  }

  async getTemplate(
    input: Parameters<TemplateRepository['getTemplate']>[0]
  ): Promise<Awaited<ReturnType<TemplateRepository['getTemplate']>>> {
    ensureNarrivaSandboxSeeded();
    const raw = input as Record<string, unknown>;
    const templateId = String(raw.templateId ?? '');
    const correlationId = String(raw.correlationId ?? '');
    const template = templatesById.get(templateId);
    if (!template) {
      return null as never;
    }
    return {
      data: template,
      ...responseMeta(correlationId),
    };
  }
}
