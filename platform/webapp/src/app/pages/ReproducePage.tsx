import { useState } from 'react';
import { demoNarratives } from '../demo-data';
import { ReproductionDiff } from '../../components';

export function ReproducePage() {
  const source = demoNarratives.find((n) => n.status === 'delivered') ?? demoNarratives[0];
  const [ran, setRan] = useState(false);
  const [snapshotId, setSnapshotId] = useState(source.snapshotId);
  const [templateVersion, setTemplateVersion] = useState(String(source.templateVersion));

  return (
    <div className="page">
      <h1 className="page-title">Audit reproduction</h1>
      <p className="page-lede">
        Reproduce from the same fact snapshot and template version for regulators and internal
        audit.
      </p>

      <div className="panel" style={{ marginBottom: 'var(--space-4)' }}>
        <div className="grid-2">
          <label>
            Snapshot id
            <input
              className="mono"
              value={snapshotId}
              onChange={(e) => setSnapshotId(e.target.value)}
              style={{
                display: 'block',
                width: '100%',
                marginTop: 6,
                padding: 8,
                border: '1px solid var(--color-rule)',
                borderRadius: 'var(--radius-sm)',
              }}
            />
          </label>
          <label>
            Template version
            <input
              className="mono"
              value={templateVersion}
              onChange={(e) => setTemplateVersion(e.target.value)}
              style={{
                display: 'block',
                width: '100%',
                marginTop: 6,
                padding: 8,
                border: '1px solid var(--color-rule)',
                borderRadius: 'var(--radius-sm)',
              }}
            />
          </label>
        </div>
        <button
          type="button"
          className="btn"
          style={{ marginTop: 16 }}
          onClick={() => setRan(true)}
        >
          Run reproduction
        </button>
      </div>

      {ran && (
        <ReproductionDiff
          originalText={source.text}
          reproducedText={source.text}
          diverged={false}
        />
      )}
    </div>
  );
}
