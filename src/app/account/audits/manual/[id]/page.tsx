import {getAudit} from "@/features/audit/manual/actions/actions";
import AuditDetailOverviewPage from "@/features/audit/manual/components/audit-detail-overview-page";
import {ManualAudit} from "@/features/audit/manual/types/types";

export default async function AuditsDetailPage({params}: { params: Promise<{ id: string }> }) {
  const pageParams = await params;

  const response = await getAudit(pageParams.id);

  if (!response.data) return (
    <div>
      Loading...
    </div>
  )

  const audit = response.data as ManualAudit;

  return (
      <>
        <AuditDetailOverviewPage audit={audit} />
      </>
  )
}
