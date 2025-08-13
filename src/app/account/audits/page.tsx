import { AuditTable } from '@/components/lists/audit/AuditTable';
import { columns } from '@/components/lists/audit/column';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/shadcn-components/ui/card';
import {getAudit} from "@/actions/audit/actions";
import {SupaBaseAudit} from "@/types/audit/types";

export default async function AuditsPage() {
  const response = await getAudit(null, 20);
  if (!response.data) return null;

  const audits = response.data as SupaBaseAudit[];

  return (
    <div>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>
            <h1>
              Audit Overview
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
          <AuditTable columns={columns} data={audits} />
        </CardContent>
      </Card>
    </div>
  )
}
