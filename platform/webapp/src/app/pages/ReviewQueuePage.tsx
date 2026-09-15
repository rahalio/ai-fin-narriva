import { useState } from 'react';
import { Link } from 'react-router-dom';
import { demoNarratives } from '../demo-data';
import {
  ClaimCiteUnderline,
  JudgmentOverlay,
  ReviewGateChip,
} from '../../components';

export function ReviewQueuePage() {
  const queue = demoNarratives.filter((n) => n.status === 'pending_review');
  const [selectedId, setSelectedId] = useState(queue[0]?.narrativeId);
  const [note, setNote] = useState('');
  const selected = queue.find((n) => n.narrativeId === selectedId) ?? queue[0];

  if (!selected) {
    return (
      <div className="page">
        <h1 className="page-title">Review queue</h1>
        <p className="page-lede">No drafts awaiting you.</p>
      </div>
    );
  }

  return (
    <div className="page">
      <h1 className="page-title">Review queue</h1>
      <p className="page-lede">
        Configurable gates by product risk — auto-send vs PM / compliance sign-off.
      </p>

      <div className="grid-2">
        <div className="panel">
          <table className="table">
            <thead>
              <tr>
                <th>Narrative</th>
                <th>Audience</th>
                <th>Gate</th>
                <th>Period</th>
              </tr>
            </thead>
            <tbody>
              {queue.map((n) => (
                <tr
                  key={n.narrativeId}
                  style={{
                    cursor: 'pointer',
                    background:
                      n.narrativeId === selected.narrativeId
                        ? 'var(--color-panel-muted)'
                        : undefined,
                  }}
                  onClick={() => setSelectedId(n.narrativeId)}
                >
                  <td className="mono">{n.narrativeId}</td>
                  <td>{n.audience}</td>
                  <td>
                    <ReviewGateChip gate={n.reviewGate} />
                  </td>
                  <td>{n.periodKey}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="panel">
          <ClaimCiteUnderline text={selected.text} claims={selected.claimBindings} />
          <JudgmentOverlay text={selected.judgmentOverlay} />
          <label style={{ display: 'block', marginTop: 16 }}>
            Decision comment
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
              style={{
                display: 'block',
                width: '100%',
                marginTop: 6,
                border: '1px solid var(--color-rule)',
                borderRadius: 'var(--radius-sm)',
                padding: 8,
                background: 'var(--color-panel)',
              }}
            />
          </label>
          <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
            <button type="button" className="btn">
              Approve
            </button>
            <button type="button" className="btn btn-ghost">
              Reject
            </button>
            <Link to="/drafts" className="btn btn-ghost">
              Open galley
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
