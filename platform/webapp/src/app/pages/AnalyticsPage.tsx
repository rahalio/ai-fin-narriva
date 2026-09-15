import { demoProductivity } from '../demo-data';
import { ProductivityAcceptedOnly } from '../../components';

export function AnalyticsPage() {
  const p = demoProductivity;
  return (
    <div className="page">
      <h1 className="page-title">Productivity & quality</h1>
      <p className="page-lede">
        Hours saved and quality without counting rejected drafts as success (BR-9).
      </p>

      <div className="grid-2" style={{ marginBottom: 'var(--space-4)' }}>
        <ProductivityAcceptedOnly
          periodKey={p.periodKey}
          hoursSavedAcceptedOnly={p.hoursSavedAcceptedOnly}
          acceptedCount={p.acceptedCount}
          rejectedCount={p.rejectedCount}
        />
        <div className="panel">
          <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--color-steel)' }}>
            Claim binding coverage
          </div>
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '2.5rem',
              fontWeight: 700,
              color: 'var(--color-masthead)',
            }}
          >
            {(p.claimBindingCoverage * 100).toFixed(0)}%
          </div>
          <p style={{ margin: 0, color: 'var(--color-steel)' }}>
            Missing-fact rate {(p.missingFactRate * 100).toFixed(0)}%
          </p>
        </div>
      </div>

      <div className="panel">
        <h2 style={{ fontSize: '1rem', marginTop: 0 }}>Reject reasons</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Reason</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            {p.rejectReasons.map((r) => (
              <tr key={r.reason}>
                <td>{r.reason}</td>
                <td>{r.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
