import './ReproductionDiff.css';

interface Props {
  originalText: string;
  reproducedText: string;
  diverged?: boolean;
}

export function ReproductionDiff({ originalText, reproducedText, diverged }: Props) {
  return (
    <div
      className={`repro-diff ${diverged ? 'repro-diff--diverge' : ''}`}
      aria-live="polite"
      aria-label={diverged ? 'Reproduction diverged from original' : 'Reproduction matches original'}
    >
      <div className="repro-col">
        <h3>Original delivered</h3>
        <pre>{originalText}</pre>
      </div>
      <div className="repro-col">
        <h3>Reproduced</h3>
        <pre>{reproducedText}</pre>
      </div>
      <p className="repro-status">
        {diverged ? 'Divergence detected — file exception' : 'No divergence — verbatim match'}
      </p>
    </div>
  );
}
