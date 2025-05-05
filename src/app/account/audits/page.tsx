import { createClient } from '@/utils/supabase/server';
import { Headline } from '@/components/ui-elements/text/Headline';
import AuditOverviewList from '@/components/audit/parts/AuditOverviewList';
import CreateAuditModal from '@/components/audit/modals/CreateAuditModal';
import { getAudits } from '@/app/account/audits/actions';
import { AuditTable } from '@/components/lists/audit/AuditTable';
import { columns } from '@/components/lists/audit/column';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default async function AuditsPage() {
  const response = await getAudits(20);
  if (!response.data) return null;

  const audits = response.data;

  return (
    <div>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>
            <h1>
              Audits
            </h1>
          </CardTitle>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            <h2>
              Manage your audits
            </h2>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {audits && audits.length > 0 && (
              <AuditTable columns={columns} data={audits} />
            )
          }
        </CardContent>
      </Card>
    </div>
  )
}
