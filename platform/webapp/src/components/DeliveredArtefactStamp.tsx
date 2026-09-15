import './DeliveredArtefactStamp.css';

interface Props {
  snapshotId: string;
  templateId: string;
  templateVersion: number;
  deliveredAt?: string;
}

export function DeliveredArtefactStamp({
  snapshotId,
  templateId,
  templateVersion,
  deliveredAt,
}: Props) {
  return (
    <div className="artefact-stamp">
      <div className="artefact-stamp-brand">Narriva · communication record</div>
      <dl>
        <div>
          <dt>Snapshot</dt>
          <dd className="mono">{snapshotId}</dd>
        </div>
        <div>
          <dt>Template</dt>
          <dd className="mono">
            {templateId} · v{templateVersion}
          </dd>
        </div>
        {deliveredAt && (
          <div>
            <dt>Delivered</dt>
            <dd>{new Date(deliveredAt).toLocaleString()}</dd>
          </div>
        )}
      </dl>
    </div>
  );
}
