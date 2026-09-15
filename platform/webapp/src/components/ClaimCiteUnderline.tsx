import type { DemoClaim } from '../app/demo-data';
import './ClaimCiteUnderline.css';

interface Props {
  text: string;
  claims: DemoClaim[];
  onClaimFocus?: (claim: DemoClaim) => void;
}

export function ClaimCiteUnderline({ text, claims, onClaimFocus }: Props) {
  const sentences = text.split(/(?<=[.!?])\s+/);
  return (
    <div className="cite-galley" lang="en">
      {sentences.map((sentence, idx) => {
        const claim = claims.find((c) => c.sentenceIndex === idx);
        if (!claim || !sentence.includes(claim.claimText)) {
          return (
            <p key={idx} className="cite-sentence">
              {sentence}
            </p>
          );
        }
        const [before, after] = sentence.split(claim.claimText);
        return (
          <p key={idx} className="cite-sentence">
            {before}
            <button
              type="button"
              className="cite-mark"
              aria-label={`Cited claim ${claim.claimText} bound to ${claim.factFieldKey}`}
              onClick={() => onClaimFocus?.(claim)}
            >
              <span className="cite-text">{claim.claimText}</span>
              <span className="cite-label">Cited</span>
            </button>
            {after}
          </p>
        );
      })}
    </div>
  );
}
