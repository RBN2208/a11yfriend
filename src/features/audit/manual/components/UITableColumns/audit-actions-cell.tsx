"use client"

import { Link } from '@/i18n/navigation';
import {ManualAudit} from '@/features/audit/manual/types/types';
import DeleteAuditModal from "@/features/audit/manual/components/modals/delete-audit-modal";
import {buttonVariants} from "@/shared/components/shadcn-components/ui/button"
import {Separator} from "@/shared/components/shadcn-components/ui/separator";
import {View} from "lucide-react";
import {getCriteriaLengths} from "@/staticData/audit/criteria";
import {TypographyP} from "@/shared/components/typography/typography-elements";
import CreateAuditModal from "@/features/audit/manual/components/modals/create-audit-modal";
import ExportAuditModal from "@/features/audit/manual/components/modals/export-audit-modal";
import {useTranslations} from "next-intl";

interface AuditActionsCellProps {
  audit: ManualAudit;
}

export function AuditActionsCell({ audit }: AuditActionsCellProps) {
  const solvedCriterias = audit.findings.filter(result => result.status !== 'not_checked');
  const t = useTranslations()
  return (
    <div className="flex justify-start items-center gap-2 h-8">
      <Link
        className={buttonVariants({variant: "outline", size: "icon"})}
        href={`/account/audits/manual/${audit.id}`}
        title={t("audit.view")}
      >
        <View/>
      </Link>
      <CreateAuditModal
          isEditModal={true}
          auditData={audit}
      />
      <ExportAuditModal auditData={audit}/>
      <Separator orientation="vertical"/>
      <DeleteAuditModal
          auditId={audit.id}
          auditName={audit.name}
      />
      <Separator orientation="vertical"/>
      <TypographyP
          aria-label="Completed criteria:"
          className="m-0 whitespace-nowrap"
      >
        {solvedCriterias.length} / {getCriteriaLengths(audit.conformance)}
      </TypographyP>
    </div>
  );
}

