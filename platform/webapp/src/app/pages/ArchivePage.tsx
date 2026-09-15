import { Link } from 'react-router-dom';
import { demoDeliveries, demoNarratives } from '../demo-data';
import { DeliveredArtefactStamp } from '../../components';

export function ArchivePage() {
  const delivered = demoDeliveries.filter((d) => d.status === 'delivered');
  const narrative = demoNarratives.find((n) => n.status === 'delivered');

  return (
    <div className="page">
      <h1 className="page-title">Narrative archive</h1>
      <p className="page-lede">
        Exact artefact of what the client received — immutable communication record.
      </p>

      <div className="grid-2">
        <div className="panel">
          <table className="table">
            <thead>
              <tr>
                <th>Delivery</th>
                <th>Narrative</th>
                <th>Period</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {delivered.map((d) => (
                <tr key={d.deliveryId}>
                  <td className="mono">{d.deliveryId}</td>
                  <td className="mono">{d.narrativeId}</td>
                  <td>2026-Q1</td>
                  <td>
                    <Link to="/reproduce">Start reproduction</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="panel">
          {narrative && (
            <>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.1rem',
                  lineHeight: 1.7,
                  marginBottom: 16,
                }}
              >
                {narrative.text}
              </div>
              <DeliveredArtefactStamp
                snapshotId={narrative.snapshotId}
                templateId={narrative.templateId}
                templateVersion={narrative.templateVersion}
                deliveredAt={delivered[0]?.deliveredAt}
              />
              <p style={{ color: 'var(--color-steel)', marginTop: 12, fontSize: '0.85rem' }}>
                No edit affordance on delivered artefacts (BR-7).
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
