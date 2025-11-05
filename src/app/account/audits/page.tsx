import { Card, CardContent, CardHeader, CardTitle } from '@/components/shadcn-components/ui/card';
import {getAudit} from "@/features/audit/actions/actions";
import {SupabaseAudit} from "@/features/audit/types/types";
import {UITable} from "@/components/table/UITable";
import {auditColumns} from "@/components/table/columns/auditColumns";
import {VisuallyHidden} from "@radix-ui/react-visually-hidden";
import {Label} from "@/components/shadcn-components/ui/label";
import {Input} from "@/components/shadcn-components/ui/input";
import CreateAuditModal from "@/components/modals/create-audit-modal";

export default async function AuditsPage() {
  const response = await getAudit(null, 20);
  if (!response.data) return null;

  const audits = response.data as SupabaseAudit[];

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
          <UITable columns={auditColumns} data={audits}>
            <VisuallyHidden>
              <Label htmlFor="searchAuditsInput">
                Search audits
              </Label>
            </VisuallyHidden>
            <Input id="searchAuditsInput" placeholder="Search audits"/>
            <CreateAuditModal isEditModal={false}/>
          </UITable>
        </CardContent>
      </Card>
    </div>
  )
}
