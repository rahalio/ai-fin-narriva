import { Navigate, Route, Routes } from 'react-router-dom';
import { getDemoSession } from './session';
import { AppShell } from './shell/AppShell';
import { LoginPage } from './pages/LoginPage';
import { ReportingRunsPage } from './pages/ReportingRunsPage';
import { SnapshotsPage } from './pages/SnapshotsPage';
import { TemplatesPage } from './pages/TemplatesPage';
import { TemplateLogicInspectorPage } from './pages/TemplateLogicInspectorPage';
import { DraftGalleyPage } from './pages/DraftGalleyPage';
import { ReviewQueuePage } from './pages/ReviewQueuePage';
import { DeliveriesPage } from './pages/DeliveriesPage';
import { ArchivePage } from './pages/ArchivePage';
import { ReproducePage } from './pages/ReproducePage';
import { AnalyticsPage } from './pages/AnalyticsPage';

function ProtectedShell() {
  const session = getDemoSession();
  if (!session?.signedIn) {
    return <Navigate to="/login" replace />;
  }
  return <AppShell session={session} />;
}

export function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<ProtectedShell />}>
        <Route index element={<Navigate to="/runs" replace />} />
        <Route path="runs" element={<ReportingRunsPage />} />
        <Route path="snapshots" element={<SnapshotsPage />} />
        <Route path="templates" element={<TemplatesPage />} />
        <Route path="templates/:templateId" element={<TemplateLogicInspectorPage />} />
        <Route path="drafts" element={<DraftGalleyPage />} />
        <Route path="review" element={<ReviewQueuePage />} />
        <Route path="deliveries" element={<DeliveriesPage />} />
        <Route path="archive" element={<ArchivePage />} />
        <Route path="reproduce" element={<ReproducePage />} />
        <Route path="analytics" element={<AnalyticsPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
