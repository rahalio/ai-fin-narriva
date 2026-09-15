/**
 * ProductivityRepository — in-memory sandbox implementation.
 */

import type { ProductivityRepository } from '@narriva/services/narratives';
import {
  ensureNarrivaSandboxSeeded,
  listNarratives,
  responseMeta,
} from '../_shared/narriva-sandbox-store.js';

export class ProductivityRepositoryDdb implements ProductivityRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async getNarrativeProductivitySummary(
    input: Parameters<ProductivityRepository['getNarrativeProductivitySummary']>[0]
  ): Promise<
    Awaited<ReturnType<ProductivityRepository['getNarrativeProductivitySummary']>>
  > {
    ensureNarrivaSandboxSeeded();
    const raw = input as Record<string, unknown>;
    const periodKey = String(raw.periodKey ?? '2026-Q1');
    const correlationId = String(raw.correlationId ?? '');
    const inPeriod = listNarratives().filter((n) => n.periodKey === periodKey);
    const accepted = inPeriod.filter(
      (n) => n.status === 'approved' || n.status === 'delivered'
    );
    const rejected = inPeriod.filter((n) => n.status === 'rejected');
    const failedMissing = inPeriod.filter((n) => n.status === 'failed_missing_facts');
    const withBindings = inPeriod.filter((n) => n.claimBindings.length > 0);
    const hoursSavedAcceptedOnly = accepted.length * 0.75;

    return {
      data: {
        periodKey,
        acceptedCount: accepted.length,
        rejectedCount: rejected.length,
        hoursSavedAcceptedOnly,
        missingFactRate:
          inPeriod.length === 0 ? 0 : failedMissing.length / inPeriod.length,
        claimBindingCoverage:
          inPeriod.length === 0 ? 0 : withBindings.length / inPeriod.length,
        rejectReasons: [
          { reason: 'Tone / judgment mismatch', count: Math.max(rejected.length, 1) },
          { reason: 'Missing fact stop', count: failedMissing.length },
        ],
      },
      ...responseMeta(correlationId),
    };
  }
}
