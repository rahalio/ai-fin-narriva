import { useState } from 'react';
import { Link } from 'react-router-dom';
import { demoNarratives, type DemoClaim } from '../demo-data';
import {
  ClaimCiteUnderline,
  JudgmentOverlay,
  MissingFactStopBanner,
  ReviewGateChip,
} from '../../components';

export function DraftGalleyPage() {
  const drafts = demoNarratives;
  const [selectedId, setSelectedId] = useState(drafts[1]?.narrativeId ?? drafts[0].narrativeId);
  const [focusedClaim, setFocusedClaim] = useState<DemoClaim | null>(null);
  const selected = drafts.find((d) => d.narrativeId === selectedId) ?? drafts[0];

  return (
    <div className="page">
      <h1 className="page-title">Draft galley</h1>
      <p className="page-lede">
        Generated prose with sentence-level claim underlines to locked facts.
      </p>

      <MissingFactStopBanner missingFacts={selected.missingFacts} />

      <div className="grid-2">
        <div>
          <div style={{ marginBottom: 'var(--space-3)', display: 'flex', gap: 12 }}>
            {drafts.map((d) => (
              <button
                key={d.narrativeId}
                type="button"
                className={`btn ${d.narrativeId === selectedId ? '' : 'btn-ghost'}`}
                onClick={() => {
                  setSelectedId(d.narrativeId);
                  setFocusedClaim(null);
                }}
              >
                {d.audience}
              </button>
            ))}
          </div>
          <ClaimCiteUnderline
            text={selected.text}
            claims={selected.claimBindings}
            onClaimFocus={setFocusedClaim}
          />
          <JudgmentOverlay text={selected.judgmentOverlay} />
        </div>
        <div className="panel">
          <div style={{ marginBottom: 'var(--space-3)' }}>
            <ReviewGateChip gate={selected.reviewGate} />
          </div>
          <p>
            <span className="mono">{selected.narrativeId}</span>
          </p>
          <p>
            Snapshot{' '}
            <Link to="/snapshots" className="mono">
              {selected.snapshotId}
            </Link>
          </p>
          <p>
            Template{' '}
            <Link to={`/templates/${selected.templateId}`} className="mono">
              {selected.templateId}
            </Link>{' '}
            v{selected.templateVersion}
          </p>
          <h2 style={{ fontSize: '1rem' }}>Focused claim</h2>
          {focusedClaim ? (
            <dl>
              <dt>Text</dt>
              <dd>{focusedClaim.claimText}</dd>
              <dt>Fact key</dt>
              <dd className="mono">{focusedClaim.factFieldKey}</dd>
            </dl>
          ) : (
            <p style={{ color: 'var(--color-steel)' }}>Select an underlined claim.</p>
          )}
          <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
            <Link className="btn" to="/review">
              Approve / reject
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
