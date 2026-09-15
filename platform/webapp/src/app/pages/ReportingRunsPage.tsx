import { Link } from 'react-router-dom';
import { demoProductivity, demoRuns } from '../demo-data';
import { ProductivityAcceptedOnly } from '../../components';

export function ReportingRunsPage() {
  return (
    <div className="page">
      <h1 className="page-title">Reporting runs</h1>
      <p className="page-lede">
        Period packs ready, blocked on facts, or waiting on review — the reporting desk home.
      </p>

      <div className="grid-2" style={{ marginBottom: 'var(--space-5)' }}>
        <ProductivityAcceptedOnly
          periodKey={demoProductivity.periodKey}
          hoursSavedAcceptedOnly={demoProductivity.hoursSavedAcceptedOnly}
          acceptedCount={demoProductivity.acceptedCount}
          rejectedCount={demoProductivity.rejectedCount}
        />
        <div className="panel">
          <strong>Alerts</strong>
          <ul style={{ margin: '8px 0 0', paddingLeft: 18 }}>
            <li>1 run blocked on missing QTD return</li>
            <li>1 advisor commentary awaiting PM gate</li>
          </ul>
        </div>
      </div>

      <div className="panel">
        <table className="table">
          <thead>
            <tr>
              <th>Period</th>
              <th>Audience</th>
              <th>Product</th>
              <th>Snapshot</th>
              <th>Missing facts</th>
              <th>Review SLA</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {demoRuns.map((run) => (
              <tr key={run.id}>
                <td className="mono">{run.periodKey}</td>
                <td>{run.audience}</td>
                <td>{run.product}</td>
                <td>
                  <span
                    className="badge"
                    style={{
                      color:
                        run.snapshotStatus === 'locked'
                          ? 'var(--color-press-green)'
                          : 'var(--color-amber)',
                    }}
                  >
                    {run.snapshotStatus}
                  </span>
                </td>
                <td>{run.missingFactCount}</td>
                <td>{run.reviewSla}</td>
                <td>
                  {run.status === 'blocked_facts' ? (
                    <Link to="/snapshots">Open blocked</Link>
                  ) : run.status === 'pending_review' ? (
                    <Link to="/review">Jump to review</Link>
                  ) : (
                    <Link to="/drafts">Open drafts</Link>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
