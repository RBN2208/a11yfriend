import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/shadcn-components/ui/card';
import {getAudit} from "@/features/audit/manual/actions/actions";
import {ManualAudit} from "@/features/audit/manual/types/types";
import {VisuallyHidden} from "@radix-ui/react-visually-hidden";
import {Label} from "@/shared/components/shadcn-components/ui/label";
import {Input} from "@/shared/components/shadcn-components/ui/input";
import CreateAuditModal from "@/features/audit/manual/components/modals/create-audit-modal";
import {AuditTable} from "@/features/audit/manual/components/AuditTable";
import {getTranslations} from "next-intl/server";

export default async function AuditsPage() {
  const response = await getAudit(null, 20);
  if (!response.data) return null;

  const audits = response.data as ManualAudit[];

  const t = await getTranslations();

  return (
    <div>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>
            <h1>
              {t('audit.overview')}
            </h1>
          </CardTitle>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            <h2>
              {t('audit.manage')}
            </h2>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <AuditTable audits={audits} />
        </CardContent>
      </Card>
    </div>
  )
}
