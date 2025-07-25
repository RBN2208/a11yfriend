import { getAudits } from '@/actions/audit';
import { AuditTable } from '@/components/lists/audit/AuditTable';
import { columns } from '@/components/lists/audit/column';
import AlertWrapper from "@/components/shadn-wrappers/AlertWrapper";
import {AlertCircleIcon, CheckCircle2Icon} from "lucide-react";
import {TypographyList} from "@/components/typography/typography-elements";

export default async function OverviewPage() {
  const response = await getAudits(5);
  if (!response.data) return null;

  const audits = response.data;

  return (
    <div>
      TODO: DASHBOARD
    </div>
  )
}
