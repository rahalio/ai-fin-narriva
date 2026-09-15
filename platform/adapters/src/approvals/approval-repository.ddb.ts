/**
 * ApprovalRepository — in-memory sandbox implementation.
 */

import type { ApprovalRepository } from '@narriva/services/approvals';
import { generateIdWithPrefix } from '../_shared/id-generator.service.impl.js';
import {
  approvalsById,
  ensureNarrivaSandboxSeeded,
  listApprovals,
  narrativesById,
  nowIso,
  responseMeta,
  templatesById,
  type SandboxApproval,
} from '../_shared/narriva-sandbox-store.js';

export class ApprovalRepositoryDdb implements ApprovalRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listApprovals(
    input: Parameters<ApprovalRepository['listApprovals']>[0]
  ): Promise<Awaited<ReturnType<ApprovalRepository['listApprovals']>>> {
    ensureNarrivaSandboxSeeded();
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? '');
    return {
      data: { items: listApprovals() },
      ...responseMeta(correlationId),
    };
  }

  async createNarrativeApproval(
    input: Parameters<ApprovalRepository['createNarrativeApproval']>[0]
  ): Promise<Awaited<ReturnType<ApprovalRepository['createNarrativeApproval']>>> {
    ensureNarrivaSandboxSeeded();
    const raw = input as Record<string, unknown>;
    const narrativeId = String(raw.narrativeId ?? '');
    const correlationId = String(raw.correlationId ?? '');
    const narrative = narrativesById.get(narrativeId);
    if (!narrative) {
      return null as never;
    }

    const outcome = (raw.outcome as SandboxApproval['outcome']) ?? 'approved';
    const template = templatesById.get(narrative.templateId);
    const approvalId = String(raw.id ?? generateIdWithPrefix('apr'));
    const now = nowIso();
    const approval: SandboxApproval = {
      approvalId,
      narrativeId,
      outcome,
      comment: raw.comment ? String(raw.comment) : undefined,
      riskTier: template?.productRiskTier ?? 'routine',
      approvedBy: String(raw.createdByActorId ?? 'sandbox'),
      slaDueAt: new Date(Date.now() + 86400000).toISOString(),
      createdAt: now,
    };
    approvalsById.set(approvalId, approval);

    if (outcome === 'approved') narrative.status = 'approved';
    else if (outcome === 'rejected') narrative.status = 'rejected';
    else narrative.status = 'pending_review';
    narrative.updatedAt = now;
    narrativesById.set(narrativeId, narrative);

    return {
      data: approval,
      ...responseMeta(correlationId),
    };
  }

  async getApproval(
    input: Parameters<ApprovalRepository['getApproval']>[0]
  ): Promise<Awaited<ReturnType<ApprovalRepository['getApproval']>>> {
    ensureNarrivaSandboxSeeded();
    const raw = input as Record<string, unknown>;
    const approvalId = String(raw.approvalId ?? '');
    const correlationId = String(raw.correlationId ?? '');
    const approval = approvalsById.get(approvalId);
    if (!approval) {
      return null as never;
    }
    return {
      data: approval,
      ...responseMeta(correlationId),
    };
  }
}
