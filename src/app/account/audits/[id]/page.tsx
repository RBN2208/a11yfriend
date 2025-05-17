import { getAudit } from '@/actions/audit';
import AuditDetailOverviewPage from "@/components/audit/audit-detail-overview-page";

export default async function AuditsDetailPage({params}: { params: Promise<{ id: string }> }) {
  const pageParams = await params;

  const response = await getAudit(pageParams.id);

  if (!response.data) return (
    <div>
      Loading...
    </div>
  )

  const audit = response.data;

  return (
      <>
        <AuditDetailOverviewPage audit={audit} />
      </>
  )
}
