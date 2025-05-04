import { OverviewList } from '@/components/lists/OverviewList';
import AuditOverviewList from '@/components/audit/parts/AuditOverviewList';
import { Headline } from '@/components/ui-elements/text/Headline';
import { getAudits } from '@/app/account/audits/actions';
import { DataTable } from '@/components/lists/audit/DataTable';
import { columns } from '@/components/lists/audit/column';

export default async function OverviewPage() {
  const response = await getAudits(5);
  if (!response.data) return null;

  const audits = response.data;

  return (
    <div>
      <DataTable columns={columns} data={audits} />
    </div>
  )
}
