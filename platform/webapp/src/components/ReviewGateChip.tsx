interface Props {
  gate: 'auto_send' | 'pm_required' | 'compliance_required';
}

const labels: Record<Props['gate'], string> = {
  auto_send: 'Auto-send',
  pm_required: 'PM sign-off',
  compliance_required: 'Compliance',
};

export function ReviewGateChip({ gate }: Props) {
  const color =
    gate === 'auto_send' ? 'var(--color-press-green)' : 'var(--color-amber)';
  return (
    <span className="badge" style={{ color }}>
      {labels[gate]}
    </span>
  );
}
