import { getAudits } from '@/app/account/audits/actions';
import { AuditTable } from '@/components/lists/audit/AuditTable';
import { columns } from '@/components/lists/audit/column';

export default async function OverviewPage() {
  const response = await getAudits(5);
  if (!response.data) return null;

  const audits = response.data;

  return (
    <div>
      TODO: what else should be shown here?
      <AuditTable columns={columns} data={audits} />
    </div>
  )
}
