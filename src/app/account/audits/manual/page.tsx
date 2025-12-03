import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/shadcn-components/ui/card';
import {getAudit} from "@/features/audit/manual/actions/actions";
import {ManualAudit} from "@/features/audit/manual/types/types";
import {TableWrapper} from "@/shared/components/shadn-wrappers/TableWrapper";
import {VisuallyHidden} from "@radix-ui/react-visually-hidden";
import {Label} from "@/shared/components/shadcn-components/ui/label";
import {Input} from "@/shared/components/shadcn-components/ui/input";
import CreateAuditModal from "@/features/audit/manual/components/modals/create-audit-modal";
import {auditColumns} from "@/features/audit/manual/components/UITableColumns/auditColumns";

export default async function AuditsPage() {
  const response = await getAudit(null, 20);
  if (!response.data) return null;

  const audits = response.data as ManualAudit[];

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
          <TableWrapper columns={auditColumns} data={audits}>
            <VisuallyHidden>
              <Label htmlFor="searchAuditsInput">
                Search audits
              </Label>
            </VisuallyHidden>
            <Input id="searchAuditsInput" placeholder="Search audits"/>
            <CreateAuditModal isEditModal={false}/>
          </TableWrapper>
        </CardContent>
      </Card>
    </div>
  )
}
