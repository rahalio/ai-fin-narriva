/**
 * NarrativeRepository — in-memory sandbox implementation.
 */

import type { NarrativeRepository } from '@narriva/services/narratives';
import { generateIdWithPrefix } from '../_shared/id-generator.service.impl.js';
import {
  ensureNarrivaSandboxSeeded,
  factSnapshotsById,
  listNarratives,
  listTemplates,
  narrativesById,
  newClaimId,
  nowIso,
  responseMeta,
  templatesById,
  type SandboxClaimBinding,
  type SandboxNarrativeDraft,
} from '../_shared/narriva-sandbox-store.js';

function formatFactValue(value: unknown): string {
  if (typeof value === 'number') {
    if (Math.abs(value) < 1) return `${(value * 100).toFixed(1)}%`;
    return `$${value.toLocaleString('en-US')}`;
  }
  return String(value ?? '');
}

export class NarrativeRepositoryDdb implements NarrativeRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listNarratives(
    input: Parameters<NarrativeRepository['listNarratives']>[0]
  ): Promise<Awaited<ReturnType<NarrativeRepository['listNarratives']>>> {
    ensureNarrivaSandboxSeeded();
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? '');
    return {
      data: { items: listNarratives() },
      ...responseMeta(correlationId),
    };
  }

  async generateNarrative(
    input: Parameters<NarrativeRepository['generateNarrative']>[0]
  ): Promise<Awaited<ReturnType<NarrativeRepository['generateNarrative']>>> {
    ensureNarrivaSandboxSeeded();
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? '');
    const snapshotId = String(raw.snapshotId ?? '');
    const templateId =
      String(raw.templateId ?? '') ||
      listTemplates().find((t) => t.status === 'approved')?.templateId ||
      '';
    const locale = String(raw.locale ?? 'en-US');
    const narrativeId = String(raw.id ?? generateIdWithPrefix('nar'));

    const snapshot = factSnapshotsById.get(snapshotId);
    const template = templatesById.get(templateId);
    if (!snapshot || !template) {
      return null as never;
    }

    const now = nowIso();
    const missingFacts = [...snapshot.missingRequiredKeys];
    for (const key of template.boundFactKeys ?? []) {
      if (!snapshot.fields.some((f) => f.key === key)) {
        missingFacts.push(key);
      }
    }
    const uniqueMissing = [...new Set(missingFacts)];

    if (snapshot.status !== 'locked' || uniqueMissing.length > 0) {
      const failed: SandboxNarrativeDraft = {
        narrativeId,
        snapshotId,
        templateId,
        templateVersion: template.version,
        periodKey: snapshot.periodKey,
        audience: template.audience,
        locale,
        claimBindings: [],
        missingFacts: uniqueMissing.length
          ? uniqueMissing
          : snapshot.status !== 'locked'
            ? ['snapshot_not_locked']
            : [],
        status: 'failed_missing_facts',
        reviewGate:
          template.productRiskTier === 'routine' ? 'auto_send' : 'pm_required',
        createdAt: now,
        updatedAt: now,
      };
      narrativesById.set(narrativeId, failed);
      return {
        data: failed,
        ...responseMeta(correlationId),
      };
    }

    const claimBindings: SandboxClaimBinding[] = [];
    const sentences: string[] = [];
    let sentenceIndex = 0;
    for (const key of template.boundFactKeys ?? []) {
      const field = snapshot.fields.find((f) => f.key === key);
      if (!field) continue;
      const claimText = formatFactValue(field.value);
      claimBindings.push({
        claimBindingId: newClaimId(),
        sentenceIndex,
        claimText,
        factFieldKey: key,
        snapshotId,
        locale,
      });
      sentences.push(
        key.includes('return')
          ? `Your portfolio returned ${claimText} in the quarter.`
          : key.includes('nav')
            ? `Ending NAV was ${claimText}.`
            : `${key} was ${claimText}.`
      );
      sentenceIndex += 1;
    }

    const draft: SandboxNarrativeDraft = {
      narrativeId,
      snapshotId,
      templateId,
      templateVersion: template.version,
      periodKey: snapshot.periodKey,
      audience: template.audience,
      locale,
      text: sentences.join(' '),
      claimBindings,
      missingFacts: [],
      status: 'pending_review',
      reviewGate:
        template.productRiskTier === 'routine' ? 'auto_send' : 'pm_required',
      createdAt: now,
      updatedAt: now,
    };
    narrativesById.set(narrativeId, draft);
    return {
      data: draft,
      ...responseMeta(correlationId),
    };
  }

  async getNarrative(
    input: Parameters<NarrativeRepository['getNarrative']>[0]
  ): Promise<Awaited<ReturnType<NarrativeRepository['getNarrative']>>> {
    ensureNarrivaSandboxSeeded();
    const raw = input as Record<string, unknown>;
    const narrativeId = String(raw.narrativeId ?? '');
    const correlationId = String(raw.correlationId ?? '');
    const narrative = narrativesById.get(narrativeId);
    if (!narrative) {
      return null as never;
    }
    return {
      data: narrative,
      ...responseMeta(correlationId),
    };
  }
}
