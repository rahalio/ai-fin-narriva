import './JudgmentOverlay.css';

interface Props {
  text?: string;
}

export function JudgmentOverlay({ text }: Props) {
  if (!text) {
    return <p className="judgment-empty">No PM judgment overlay on this draft.</p>;
  }
  return (
    <aside className="judgment" aria-label="PM judgment overlay">
      <header>Judgment overlay</header>
      <p>{text}</p>
      <footer>Non-numeric commentary — claim bindings unchanged</footer>
    </aside>
  );
}
