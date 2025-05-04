import AuditDetailOverview from '@/components/audit/AuditDetailOverview';
import { getAudit } from '@/app/account/audits/actions';

export default async function AuditsDetailPage({params}: { params: Promise<{ id: string }> }) {
  const pageParams = await params;

  const response = await getAudit(pageParams.id);

  if (!response.data) return (
    <div>
      Loading...
    </div>
  )

  const audit = response.data;

  return <AuditDetailOverview audit={audit} />
}
