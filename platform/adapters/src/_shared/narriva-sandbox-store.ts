/**
 * In-memory sandbox store for Narriva product domains (local / demo).
 */

import { generateIdWithPrefix } from './id-generator.service.impl.js';

export function nowIso(): string {
  return new Date().toISOString();
}

export function responseMeta(correlationId?: string) {
  return {
    meta: {
      correlationId,
      generatedAt: nowIso(),
    },
  };
}

export interface SandboxFactField {
  fieldId: string;
  key: string;
  value: unknown;
  sourceSystem: string;
  authoritative: boolean;
  requiredForGeneration: boolean;
}

export interface SandboxFactSnapshot {
  snapshotId: string;
  accountId: string;
  asOf: string;
  periodKey: string;
  status: 'open' | 'locked';
  fields: SandboxFactField[];
  missingRequiredKeys: string[];
  lockedAt?: string;
  lockedBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SandboxTemplate {
  templateId: string;
  name: string;
  audience: 'retail_client' | 'advisor' | 'institutional';
  locale: string;
  version: number;
  status: 'draft' | 'approved' | 'retired';
  body: string;
  productRiskTier: 'routine' | 'elevated' | 'high';
  disclosureRuleIds?: string[];
  bannedClaims?: string[];
  logicOutline?: string;
  boundFactKeys?: string[];
  createdAt: string;
  updatedAt: string;
  approvedAt?: string;
  retiredAt?: string;
}

export interface SandboxDisclosureRule {
  disclosureRuleId: string;
  name: string;
  body: string;
  bannedClaimPatterns?: string[];
  status: 'draft' | 'approved' | 'retired';
}

export interface SandboxClaimBinding {
  claimBindingId: string;
  sentenceIndex: number;
  claimText: string;
  factFieldKey: string;
  snapshotId: string;
  locale?: string;
}

export interface SandboxNarrativeDraft {
  narrativeId: string;
  snapshotId: string;
  templateId: string;
  templateVersion: number;
  periodKey: string;
  audience: 'retail_client' | 'advisor' | 'institutional';
  locale: string;
  text?: string;
  claimBindings: SandboxClaimBinding[];
  missingFacts: string[];
  judgmentOverlay?: string;
  status:
    | 'generated'
    | 'failed_missing_facts'
    | 'pending_review'
    | 'approved'
    | 'rejected'
    | 'delivered';
  reviewGate?: 'auto_send' | 'pm_required' | 'compliance_required';
  createdAt: string;
  updatedAt: string;
}

export interface SandboxApproval {
  approvalId: string;
  narrativeId: string;
  outcome: 'approved' | 'rejected' | 'escalated';
  comment?: string;
  riskTier: 'routine' | 'elevated' | 'high';
  approvedBy?: string;
  slaDueAt?: string;
  createdAt: string;
}

export interface SandboxDeliveredNarrative {
  deliveryId: string;
  narrativeId: string;
  channel: 'pdf' | 'email' | 'in_app';
  status: 'scheduled' | 'sent' | 'delivered' | 'failed' | 'cancelled';
  recipientRef?: string;
  snapshotId: string;
  templateId: string;
  templateVersion: number;
  artefactUri?: string;
  scheduledAt?: string;
  deliveredAt?: string;
  failureReason?: string;
  createdAt: string;
}

export interface SandboxReproductionJob {
  reproductionId: string;
  narrativeId: string;
  snapshotId: string;
  templateId: string;
  templateVersion: number;
  status: 'queued' | 'running' | 'done' | 'failed';
  originalText?: string;
  reproducedText?: string;
  diverged?: boolean;
  downloadUrl?: string;
  errorMessage?: string;
  createdAt: string;
  completedAt?: string;
}

export const factSnapshotsById = new Map<string, SandboxFactSnapshot>();
export const templatesById = new Map<string, SandboxTemplate>();
export const disclosureRulesById = new Map<string, SandboxDisclosureRule>();
export const narrativesById = new Map<string, SandboxNarrativeDraft>();
export const approvalsById = new Map<string, SandboxApproval>();
export const deliveriesById = new Map<string, SandboxDeliveredNarrative>();
export const reproductionsById = new Map<string, SandboxReproductionJob>();

let seeded = false;

export function ensureNarrivaSandboxSeeded(): void {
  if (seeded) return;
  seeded = true;

  const now = nowIso();
  const disclosureId = 'dcl_01demo000000000000000001';
  const snapshotLockedId = 'snp_01demo000000000000000001';
  const snapshotOpenId = 'snp_01demo000000000000000002';
  const templateApprovedId = 'tpl_01demo000000000000000001';
  const templateDraftId = 'tpl_01demo000000000000000002';
  const narrativeId = 'nar_01demo000000000000000001';
  const narrativePendingId = 'nar_01demo000000000000000002';
  const fieldReturn = 'fld_01demo000000000000000001';
  const fieldNav = 'fld_01demo000000000000000002';
  const fieldMissing = 'fld_01demo000000000000000003';
  const claim1 = 'clm_01demo000000000000000001';
  const claim2 = 'clm_01demo000000000000000002';
  const approvalId = 'apr_01demo000000000000000001';
  const deliveryId = 'dlv_01demo000000000000000001';
  const reproductionId = 'rpr_01demo000000000000000001';

  disclosureRulesById.set(disclosureId, {
    disclosureRuleId: disclosureId,
    name: 'Retail performance disclaimer',
    body: 'Past performance is not indicative of future results. Holdings shown as of the locked fact snapshot.',
    bannedClaimPatterns: ['guaranteed return', 'risk-free'],
    status: 'approved',
  });

  factSnapshotsById.set(snapshotLockedId, {
    snapshotId: snapshotLockedId,
    accountId: 'acct_household_alpha',
    asOf: '2026-03-31T23:59:59.000Z',
    periodKey: '2026-Q1',
    status: 'locked',
    fields: [
      {
        fieldId: fieldReturn,
        key: 'portfolio.return.qtd',
        value: 0.042,
        sourceSystem: 'portfolio_accounting',
        authoritative: true,
        requiredForGeneration: true,
      },
      {
        fieldId: fieldNav,
        key: 'portfolio.nav',
        value: 1_250_000,
        sourceSystem: 'portfolio_accounting',
        authoritative: true,
        requiredForGeneration: true,
      },
    ],
    missingRequiredKeys: [],
    lockedAt: now,
    lockedBy: 'usr_demo_steward',
    createdAt: now,
    updatedAt: now,
  });

  factSnapshotsById.set(snapshotOpenId, {
    snapshotId: snapshotOpenId,
    accountId: 'acct_household_beta',
    asOf: '2026-03-31T23:59:59.000Z',
    periodKey: '2026-Q1',
    status: 'open',
    fields: [
      {
        fieldId: fieldMissing,
        key: 'portfolio.nav',
        value: 890_000,
        sourceSystem: 'crm_feed',
        authoritative: false,
        requiredForGeneration: true,
      },
    ],
    missingRequiredKeys: ['portfolio.return.qtd'],
    createdAt: now,
    updatedAt: now,
  });

  templatesById.set(templateApprovedId, {
    templateId: templateApprovedId,
    name: 'Q1 retail household letter',
    audience: 'retail_client',
    locale: 'en-US',
    version: 3,
    status: 'approved',
    body: 'Your portfolio returned {{portfolio.return.qtd}} in the quarter. Ending NAV was {{portfolio.nav}}.',
    productRiskTier: 'routine',
    disclosureRuleIds: [disclosureId],
    bannedClaims: ['guaranteed return'],
    logicOutline:
      'IF locked snapshot THEN render QTD return sentence bound to portfolio.return.qtd; render NAV sentence bound to portfolio.nav; append approved disclosure.',
    boundFactKeys: ['portfolio.return.qtd', 'portfolio.nav'],
    createdAt: now,
    updatedAt: now,
    approvedAt: now,
  });

  templatesById.set(templateDraftId, {
    templateId: templateDraftId,
    name: 'Advisor fund commentary (draft)',
    audience: 'advisor',
    locale: 'en-US',
    version: 1,
    status: 'draft',
    body: 'Fund commentary for {{portfolio.return.qtd}} with judgment slot.',
    productRiskTier: 'elevated',
    disclosureRuleIds: [disclosureId],
    bannedClaims: ['outperform peers'],
    logicOutline: 'Elevated risk gate — PM judgment overlay required before send.',
    boundFactKeys: ['portfolio.return.qtd'],
    createdAt: now,
    updatedAt: now,
  });

  const galleyText =
    'Your portfolio returned 4.2% in the quarter. Ending NAV was $1,250,000. Markets were uneven; allocations stayed within policy.';

  narrativesById.set(narrativeId, {
    narrativeId,
    snapshotId: snapshotLockedId,
    templateId: templateApprovedId,
    templateVersion: 3,
    periodKey: '2026-Q1',
    audience: 'retail_client',
    locale: 'en-US',
    text: galleyText,
    claimBindings: [
      {
        claimBindingId: claim1,
        sentenceIndex: 0,
        claimText: '4.2%',
        factFieldKey: 'portfolio.return.qtd',
        snapshotId: snapshotLockedId,
        locale: 'en-US',
      },
      {
        claimBindingId: claim2,
        sentenceIndex: 1,
        claimText: '$1,250,000',
        factFieldKey: 'portfolio.nav',
        snapshotId: snapshotLockedId,
        locale: 'en-US',
      },
    ],
    missingFacts: [],
    judgmentOverlay: undefined,
    status: 'delivered',
    reviewGate: 'auto_send',
    createdAt: now,
    updatedAt: now,
  });

  narrativesById.set(narrativePendingId, {
    narrativeId: narrativePendingId,
    snapshotId: snapshotLockedId,
    templateId: templateDraftId,
    templateVersion: 1,
    periodKey: '2026-Q1',
    audience: 'advisor',
    locale: 'en-US',
    text: 'Fund returned 4.2% in the quarter against a choppy equity tape.',
    claimBindings: [
      {
        claimBindingId: 'clm_01demo000000000000000003',
        sentenceIndex: 0,
        claimText: '4.2%',
        factFieldKey: 'portfolio.return.qtd',
        snapshotId: snapshotLockedId,
        locale: 'en-US',
      },
    ],
    missingFacts: [],
    judgmentOverlay: 'Relative to mandate, we remain comfortable with duration.',
    status: 'pending_review',
    reviewGate: 'pm_required',
    createdAt: now,
    updatedAt: now,
  });

  approvalsById.set(approvalId, {
    approvalId,
    narrativeId: narrativePendingId,
    outcome: 'escalated',
    comment: 'Awaiting PM sign-off on judgment tone',
    riskTier: 'elevated',
    approvedBy: 'usr_demo_compliance',
    slaDueAt: new Date(Date.now() + 86400000).toISOString(),
    createdAt: now,
  });

  deliveriesById.set(deliveryId, {
    deliveryId,
    narrativeId,
    channel: 'pdf',
    status: 'delivered',
    recipientRef: 'client:household_alpha',
    snapshotId: snapshotLockedId,
    templateId: templateApprovedId,
    templateVersion: 3,
    artefactUri: `sandbox://artefacts/${deliveryId}.pdf`,
    deliveredAt: now,
    createdAt: now,
  });

  reproductionsById.set(reproductionId, {
    reproductionId,
    narrativeId,
    snapshotId: snapshotLockedId,
    templateId: templateApprovedId,
    templateVersion: 3,
    status: 'done',
    originalText: galleyText,
    reproducedText: galleyText,
    diverged: false,
    downloadUrl: `sandbox://reproductions/${reproductionId}.zip`,
    createdAt: now,
    completedAt: now,
  });
}

export function recomputeMissingRequiredKeys(snapshot: SandboxFactSnapshot): string[] {
  const fromFields = snapshot.fields
    .filter(
      (f) =>
        f.requiredForGeneration &&
        (f.value === null || f.value === undefined || f.value === '')
    )
    .map((f) => f.key);
  const presentKeys = new Set(snapshot.fields.map((f) => f.key));
  const stillMissing = snapshot.missingRequiredKeys.filter((k) => !presentKeys.has(k));
  return [...new Set([...fromFields, ...stillMissing])];
}

export function listSnapshots(): SandboxFactSnapshot[] {
  ensureNarrivaSandboxSeeded();
  return [...factSnapshotsById.values()];
}

export function listTemplates(): SandboxTemplate[] {
  ensureNarrivaSandboxSeeded();
  return [...templatesById.values()];
}

export function listDisclosureRules(): SandboxDisclosureRule[] {
  ensureNarrivaSandboxSeeded();
  return [...disclosureRulesById.values()];
}

export function listNarratives(): SandboxNarrativeDraft[] {
  ensureNarrivaSandboxSeeded();
  return [...narrativesById.values()];
}

export function listApprovals(): SandboxApproval[] {
  ensureNarrivaSandboxSeeded();
  return [...approvalsById.values()];
}

export function listDeliveries(): SandboxDeliveredNarrative[] {
  ensureNarrivaSandboxSeeded();
  return [...deliveriesById.values()];
}

export function listReproductions(): SandboxReproductionJob[] {
  ensureNarrivaSandboxSeeded();
  return [...reproductionsById.values()];
}

export function newFieldId(): string {
  return generateIdWithPrefix('fld');
}

export function newClaimId(): string {
  return generateIdWithPrefix('clm');
}
