/**
 * DisclosureRuleRepository — in-memory sandbox implementation.
 */

import type { DisclosureRuleRepository } from '@narriva/services/templates';
import { generateIdWithPrefix } from '../_shared/id-generator.service.impl.js';
import {
  disclosureRulesById,
  ensureNarrivaSandboxSeeded,
  listDisclosureRules,
  responseMeta,
  type SandboxDisclosureRule,
} from '../_shared/narriva-sandbox-store.js';

export class DisclosureRuleRepositoryDdb implements DisclosureRuleRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listDisclosureRules(
    input: Parameters<DisclosureRuleRepository['listDisclosureRules']>[0]
  ): Promise<Awaited<ReturnType<DisclosureRuleRepository['listDisclosureRules']>>> {
    ensureNarrivaSandboxSeeded();
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? '');
    return {
      data: { items: listDisclosureRules() },
      ...responseMeta(correlationId),
    };
  }

  async createDisclosureRule(
    input: Parameters<DisclosureRuleRepository['createDisclosureRule']>[0]
  ): Promise<Awaited<ReturnType<DisclosureRuleRepository['createDisclosureRule']>>> {
    ensureNarrivaSandboxSeeded();
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? '');
    const disclosureRuleId = String(raw.id ?? generateIdWithPrefix('dcl'));
    const rule: SandboxDisclosureRule = {
      disclosureRuleId,
      name: String(raw.name ?? 'Untitled rule'),
      body: String(raw.body ?? ''),
      bannedClaimPatterns: (raw.bannedClaimPatterns as string[] | undefined) ?? [],
      status: 'draft',
    };
    disclosureRulesById.set(disclosureRuleId, rule);
    return {
      data: rule,
      ...responseMeta(correlationId),
    };
  }
}
