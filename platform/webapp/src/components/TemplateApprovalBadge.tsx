interface Props {
  status: 'draft' | 'approved' | 'retired';
}

const colors: Record<Props['status'], string> = {
  draft: 'var(--color-amber)',
  approved: 'var(--color-press-green)',
  retired: 'var(--color-steel)',
};

export function TemplateApprovalBadge({ status }: Props) {
  return (
    <span className="badge" style={{ color: colors[status] }}>
      {status}
    </span>
  );
}
