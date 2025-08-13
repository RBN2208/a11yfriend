import {getAudit} from "@/actions/audit/actions";
import AuditDetailOverviewPage from "@/components/audit/audit-detail-overview-page";
import {SupaBaseAudit} from "@/types/audit/types";

export default async function AuditsDetailPage({params}: { params: Promise<{ id: string }> }) {
  const pageParams = await params;

  const response = await getAudit(pageParams.id);

  if (!response.data) return (
    <div>
      Loading...
    </div>
  )

  const audit = response.data as SupaBaseAudit;

  return (
      <>
        <AuditDetailOverviewPage audit={audit} />
      </>
  )
}
