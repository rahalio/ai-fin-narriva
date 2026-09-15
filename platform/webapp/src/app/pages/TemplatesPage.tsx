import { Link } from 'react-router-dom';
import { demoTemplates } from '../demo-data';
import { TemplateApprovalBadge } from '../../components';

export function TemplatesPage() {
  return (
    <div className="page">
      <h1 className="page-title">Templates</h1>
      <p className="page-lede">
        Audience-specific templates with tone, disclosures, and compliance pre-approval.
      </p>
      <div className="panel">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Audience</th>
              <th>Locale</th>
              <th>Version</th>
              <th>Risk</th>
              <th>Status</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {demoTemplates.map((t) => (
              <tr key={t.templateId}>
                <td>{t.name}</td>
                <td>{t.audience}</td>
                <td className="mono">{t.locale}</td>
                <td className="mono">v{t.version}</td>
                <td>{t.productRiskTier}</td>
                <td>
                  <TemplateApprovalBadge status={t.status} />
                </td>
                <td>
                  <Link to={`/templates/${t.templateId}`}>Inspect logic</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
