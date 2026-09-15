import { useState } from 'react';
import { demoSnapshots } from '../demo-data';
import { FactSnapshotLock, MissingFactStopBanner } from '../../components';

export function SnapshotsPage() {
  const [selectedId, setSelectedId] = useState(demoSnapshots[0].snapshotId);
  const [snapshots, setSnapshots] = useState(demoSnapshots);
  const selected = snapshots.find((s) => s.snapshotId === selectedId) ?? snapshots[0];

  return (
    <div className="page">
      <h1 className="page-title">Fact snapshots</h1>
      <p className="page-lede">
        Inspect attributable inputs, mark authoritative fields, and lock before generate.
      </p>

      <MissingFactStopBanner missingFacts={selected.missingRequiredKeys} />

      <div className="grid-2">
        <div className="panel">
          <table className="table">
            <thead>
              <tr>
                <th>Snapshot</th>
                <th>Account</th>
                <th>Period</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {snapshots.map((s) => (
                <tr
                  key={s.snapshotId}
                  style={{
                    cursor: 'pointer',
                    background:
                      s.snapshotId === selectedId ? 'var(--color-panel-muted)' : undefined,
                  }}
                  onClick={() => setSelectedId(s.snapshotId)}
                >
                  <td className="mono">{s.snapshotId}</td>
                  <td className="mono">{s.accountId}</td>
                  <td>{s.periodKey}</td>
                  <td>{s.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="panel">
          <FactSnapshotLock
            status={selected.status}
            missingRequiredKeys={selected.missingRequiredKeys}
            fields={selected.fields}
            onLock={() => {
              if (selected.missingRequiredKeys.length) return;
              setSnapshots((prev) =>
                prev.map((s) =>
                  s.snapshotId === selected.snapshotId ? { ...s, status: 'locked' } : s
                )
              );
            }}
          />
        </div>
      </div>
    </div>
  );
}
