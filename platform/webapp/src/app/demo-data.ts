/** Demo fixtures for Narriva operator console (offline-first). */

export const API_KEY = 'narriva_demo_local_dev_key';

export interface DemoClaim {
  claimBindingId: string;
  sentenceIndex: number;
  claimText: string;
  factFieldKey: string;
}

export interface DemoNarrative {
  narrativeId: string;
  snapshotId: string;
  templateId: string;
  templateVersion: number;
  periodKey: string;
  audience: string;
  locale: string;
  text: string;
  claimBindings: DemoClaim[];
  missingFacts: string[];
  judgmentOverlay?: string;
  status: string;
  reviewGate: 'auto_send' | 'pm_required' | 'compliance_required';
}

export const demoRuns = [
  {
    id: 'run_q1_retail',
    periodKey: '2026-Q1',
    audience: 'retail_client',
    product: 'Household letter',
    snapshotStatus: 'locked' as const,
    missingFactCount: 0,
    reviewSla: 'On track',
    status: 'ready',
  },
  {
    id: 'run_q1_advisor',
    periodKey: '2026-Q1',
    audience: 'advisor',
    product: 'Fund commentary',
    snapshotStatus: 'locked' as const,
    missingFactCount: 0,
    reviewSla: 'Due in 18h',
    status: 'pending_review',
  },
  {
    id: 'run_q1_beta',
    periodKey: '2026-Q1',
    audience: 'retail_client',
    product: 'Household letter',
    snapshotStatus: 'open' as const,
    missingFactCount: 1,
    reviewSla: 'Blocked',
    status: 'blocked_facts',
  },
];

export const demoSnapshots = [
  {
    snapshotId: 'snp_01demo000000000000000001',
    accountId: 'acct_household_alpha',
    periodKey: '2026-Q1',
    status: 'locked' as const,
    missingRequiredKeys: [] as string[],
    fields: [
      {
        fieldId: 'fld_01demo000000000000000001',
        key: 'portfolio.return.qtd',
        value: '4.2%',
        sourceSystem: 'portfolio_accounting',
        authoritative: true,
        requiredForGeneration: true,
      },
      {
        fieldId: 'fld_01demo000000000000000002',
        key: 'portfolio.nav',
        value: '$1,250,000',
        sourceSystem: 'portfolio_accounting',
        authoritative: true,
        requiredForGeneration: true,
      },
    ],
  },
  {
    snapshotId: 'snp_01demo000000000000000002',
    accountId: 'acct_household_beta',
    periodKey: '2026-Q1',
    status: 'open' as const,
    missingRequiredKeys: ['portfolio.return.qtd'],
    fields: [
      {
        fieldId: 'fld_01demo000000000000000003',
        key: 'portfolio.nav',
        value: '$890,000',
        sourceSystem: 'crm_feed',
        authoritative: false,
        requiredForGeneration: true,
      },
    ],
  },
];

export const demoTemplates = [
  {
    templateId: 'tpl_01demo000000000000000001',
    name: 'Q1 retail household letter',
    audience: 'retail_client',
    locale: 'en-US',
    version: 3,
    status: 'approved' as const,
    body: 'Your portfolio returned {{portfolio.return.qtd}} in the quarter. Ending NAV was {{portfolio.nav}}.',
    productRiskTier: 'routine' as const,
    logicOutline:
      'IF locked snapshot THEN render QTD return + NAV sentences; append retail disclosure.',
    boundFactKeys: ['portfolio.return.qtd', 'portfolio.nav'],
    bannedClaims: ['guaranteed return'],
  },
  {
    templateId: 'tpl_01demo000000000000000002',
    name: 'Advisor fund commentary (draft)',
    audience: 'advisor',
    locale: 'en-US',
    version: 1,
    status: 'draft' as const,
    body: 'Fund commentary for {{portfolio.return.qtd}} with judgment slot.',
    productRiskTier: 'elevated' as const,
    logicOutline: 'Elevated risk — PM judgment overlay required.',
    boundFactKeys: ['portfolio.return.qtd'],
    bannedClaims: ['outperform peers'],
  },
];

export const demoNarratives: DemoNarrative[] = [
  {
    narrativeId: 'nar_01demo000000000000000001',
    snapshotId: 'snp_01demo000000000000000001',
    templateId: 'tpl_01demo000000000000000001',
    templateVersion: 3,
    periodKey: '2026-Q1',
    audience: 'retail_client',
    locale: 'en-US',
    text: 'Your portfolio returned 4.2% in the quarter. Ending NAV was $1,250,000. Markets were uneven; allocations stayed within policy.',
    claimBindings: [
      {
        claimBindingId: 'clm_01demo000000000000000001',
        sentenceIndex: 0,
        claimText: '4.2%',
        factFieldKey: 'portfolio.return.qtd',
      },
      {
        claimBindingId: 'clm_01demo000000000000000002',
        sentenceIndex: 1,
        claimText: '$1,250,000',
        factFieldKey: 'portfolio.nav',
      },
    ],
    missingFacts: [],
    status: 'delivered',
    reviewGate: 'auto_send',
  },
  {
    narrativeId: 'nar_01demo000000000000000002',
    snapshotId: 'snp_01demo000000000000000001',
    templateId: 'tpl_01demo000000000000000002',
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
      },
    ],
    missingFacts: [],
    judgmentOverlay: 'Relative to mandate, we remain comfortable with duration.',
    status: 'pending_review',
    reviewGate: 'pm_required',
  },
];

export const demoDeliveries: Array<{
  deliveryId: string;
  narrativeId: string;
  channel: string;
  status: string;
  recipientRef: string;
  snapshotId: string;
  templateId: string;
  templateVersion: number;
  deliveredAt?: string;
  scheduledAt?: string;
}> = [
  {
    deliveryId: 'dlv_01demo000000000000000001',
    narrativeId: 'nar_01demo000000000000000001',
    channel: 'pdf',
    status: 'delivered',
    recipientRef: 'client:household_alpha',
    snapshotId: 'snp_01demo000000000000000001',
    templateId: 'tpl_01demo000000000000000001',
    templateVersion: 3,
    deliveredAt: '2026-04-02T14:00:00.000Z',
  },
  {
    deliveryId: 'dlv_01demo000000000000000002',
    narrativeId: 'nar_01demo000000000000000002',
    channel: 'email',
    status: 'scheduled',
    recipientRef: 'advisor:desk_north',
    snapshotId: 'snp_01demo000000000000000001',
    templateId: 'tpl_01demo000000000000000002',
    templateVersion: 1,
    scheduledAt: '2026-04-05T09:00:00.000Z',
  },
];

export const demoProductivity = {
  periodKey: '2026-Q1',
  acceptedCount: 18,
  rejectedCount: 3,
  hoursSavedAcceptedOnly: 13.5,
  missingFactRate: 0.12,
  claimBindingCoverage: 0.97,
  rejectReasons: [
    { reason: 'Tone / judgment mismatch', count: 2 },
    { reason: 'Disclosure wording', count: 1 },
  ],
};

export const localeParityRows = [
  { locale: 'en-US', factKey: 'portfolio.return.qtd', value: '4.2%' },
  { locale: 'fr-CA', factKey: 'portfolio.return.qtd', value: '4.2%' },
  { locale: 'en-US', factKey: 'portfolio.nav', value: '$1,250,000' },
  { locale: 'fr-CA', factKey: 'portfolio.nav', value: '1 250 000 $' },
];

export async function optionalApiFetch<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(path, {
      headers: { 'X-API-Key': API_KEY },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}
