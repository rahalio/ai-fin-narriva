import './MissingFactStopBanner.css';

interface Props {
  missingFacts: string[];
}

export function MissingFactStopBanner({ missingFacts }: Props) {
  if (!missingFacts.length) return null;
  return (
    <div className="stop-banner" role="alert" aria-live="assertive">
      <strong>Stop press — missing facts</strong>
      <p>Generation failed closed. Required fields are absent from the locked snapshot.</p>
      <ul>
        {missingFacts.map((k) => (
          <li key={k} className="mono">
            {k}
          </li>
        ))}
      </ul>
    </div>
  );
}
