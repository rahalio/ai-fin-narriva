import './FactSnapshotLock.css';

interface FieldRow {
  fieldId: string;
  key: string;
  value: unknown;
  sourceSystem: string;
  authoritative: boolean;
  requiredForGeneration: boolean;
}

interface Props {
  status: 'open' | 'locked';
  missingRequiredKeys: string[];
  fields: FieldRow[];
  onLock?: () => void;
}

export function FactSnapshotLock({ status, missingRequiredKeys, fields, onLock }: Props) {
  const blocked = missingRequiredKeys.length > 0;
  return (
    <div className="fsl">
      <div className="fsl-head">
        <span className={`badge fsl-status fsl-status--${status}`}>
          {status === 'locked' ? 'Locked' : 'Open'}
        </span>
        {status === 'open' && (
          <button
            type="button"
            className="btn"
            disabled={blocked}
            onClick={onLock}
            title={blocked ? 'Resolve missing required facts first' : 'Lock snapshot'}
          >
            Lock snapshot
          </button>
        )}
      </div>
      {blocked && (
        <ul className="fsl-missing" aria-live="polite">
          {missingRequiredKeys.map((k) => (
            <li key={k}>
              Missing required: <span className="mono">{k}</span>
            </li>
          ))}
        </ul>
      )}
      <table className="table fsl-fields">
        <thead>
          <tr>
            <th>Field</th>
            <th>Value</th>
            <th>Source</th>
            <th>Authority</th>
          </tr>
        </thead>
        <tbody>
          {fields.map((f) => (
            <tr key={f.fieldId}>
              <td className="mono">{f.key}</td>
              <td>{String(f.value)}</td>
              <td>{f.sourceSystem}</td>
              <td>{f.authoritative ? 'Authoritative' : 'Provisional'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
