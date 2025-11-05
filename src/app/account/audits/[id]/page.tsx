import {getAudit} from "@/features/audit/actions/actions";
import AuditDetailOverviewPage from "@/features/audit/components/audit-detail-overview-page";
import {SupabaseAudit} from "@/features/audit/types/types";

export default async function AuditsDetailPage({params}: { params: Promise<{ id: string }> }) {
  const pageParams = await params;

  const response = await getAudit(pageParams.id);

  if (!response.data) return (
    <div>
      Loading...
    </div>
  )

  const audit = response.data as SupabaseAudit;

  return (
      <>
        <AuditDetailOverviewPage audit={audit} />
      </>
  )
}
