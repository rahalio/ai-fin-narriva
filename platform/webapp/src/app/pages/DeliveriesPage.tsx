import { useState } from 'react';
import { demoDeliveries } from '../demo-data';
import { DeliveredArtefactStamp } from '../../components';

export function DeliveriesPage() {
  const [items, setItems] = useState(demoDeliveries);

  return (
    <div className="page">
      <h1 className="page-title">Deliveries</h1>
      <p className="page-lede">
        Same narrative engine to PDF letters and in-app copy — channel status and cancel pre-send.
      </p>
      <div className="panel">
        <table className="table">
          <thead>
            <tr>
              <th>Delivery</th>
              <th>Channel</th>
              <th>Status</th>
              <th>Recipient</th>
              <th>Stamp</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {items.map((d) => (
              <tr key={d.deliveryId}>
                <td className="mono">{d.deliveryId}</td>
                <td>{d.channel}</td>
                <td>
                  <span
                    className="badge"
                    style={{
                      color:
                        d.status === 'delivered'
                          ? 'var(--color-press-green)'
                          : d.status === 'cancelled'
                            ? 'var(--color-steel)'
                            : 'var(--color-amber)',
                    }}
                  >
                    {d.status}
                  </span>
                </td>
                <td className="mono">{d.recipientRef}</td>
                <td>
                  <DeliveredArtefactStamp
                    snapshotId={d.snapshotId}
                    templateId={d.templateId}
                    templateVersion={d.templateVersion}
                    deliveredAt={d.deliveredAt}
                  />
                </td>
                <td>
                  {d.status === 'scheduled' && (
                    <button
                      type="button"
                      className="btn btn-ghost"
                      onClick={() =>
                        setItems((prev) =>
                          prev.map((x) =>
                            x.deliveryId === d.deliveryId
                              ? { ...x, status: 'cancelled' }
                              : x
                          )
                        )
                      }
                    >
                      Cancel
                    </button>
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
