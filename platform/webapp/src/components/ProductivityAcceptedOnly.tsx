import './ProductivityAcceptedOnly.css';

interface Props {
  hoursSavedAcceptedOnly: number;
  acceptedCount: number;
  rejectedCount: number;
  periodKey: string;
}

export function ProductivityAcceptedOnly({
  hoursSavedAcceptedOnly,
  acceptedCount,
  rejectedCount,
  periodKey,
}: Props) {
  return (
    <div className="prod-accepted panel">
      <div className="prod-label">Hours saved · accepted only</div>
      <div className="prod-metric">{hoursSavedAcceptedOnly.toFixed(1)}h</div>
      <p>
        Period <span className="mono">{periodKey}</span> — {acceptedCount} accepted,{' '}
        {rejectedCount} rejected excluded from savings (BR-9).
      </p>
    </div>
  );
}
