import { Link, useParams } from 'react-router-dom';
import { demoTemplates, localeParityRows } from '../demo-data';
import { LocaleBindingParity, TemplateApprovalBadge } from '../../components';

export function TemplateLogicInspectorPage() {
  const { templateId } = useParams();
  const template =
    demoTemplates.find((t) => t.templateId === templateId) ?? demoTemplates[0];

  return (
    <div className="page">
      <p style={{ marginBottom: 'var(--space-3)' }}>
        <Link to="/templates">← Templates</Link>
      </p>
      <h1 className="page-title">{template.name}</h1>
      <p className="page-lede">
        Template logic and fact bindings — not confidence theatre (BR-11).
      </p>

      <div className="grid-2">
        <div className="panel">
          <div style={{ marginBottom: 'var(--space-3)' }}>
            <TemplateApprovalBadge status={template.status} />{' '}
            <span className="mono">
              {template.templateId} · v{template.version}
            </span>
          </div>
          <h2 style={{ fontSize: '1rem' }}>Logic outline</h2>
          <p>{template.logicOutline}</p>
          <h2 style={{ fontSize: '1rem' }}>Body</h2>
          <pre
            style={{
              whiteSpace: 'pre-wrap',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
            }}
          >
            {template.body}
          </pre>
          <h2 style={{ fontSize: '1rem' }}>Bound fact keys</h2>
          <ul>
            {template.boundFactKeys.map((k) => (
              <li key={k} className="mono">
                {k}
              </li>
            ))}
          </ul>
          <h2 style={{ fontSize: '1rem' }}>Banned claims</h2>
          <ul>
            {template.bannedClaims.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
        <div className="panel">
          <h2 style={{ fontSize: '1rem', marginTop: 0 }}>Locale binding parity</h2>
          <LocaleBindingParity rows={localeParityRows} />
        </div>
      </div>
    </div>
  );
}
