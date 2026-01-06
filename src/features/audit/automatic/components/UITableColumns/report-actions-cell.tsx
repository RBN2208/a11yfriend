"use client"

import { Link } from '@/i18n/navigation';
import {buttonVariants} from "@/shared/components/shadcn-components/ui/button"
import {Separator} from "@/shared/components/shadcn-components/ui/separator";
import {View} from "lucide-react";
import {useTranslations} from "next-intl";
import {AutomaticAudit} from "@/features/audit/automatic/types/types";
import CreateReportModal from "@/features/audit/automatic/components/modals/create-report-modal";
import ExportReportModal from "@/features/audit/automatic/components/modals/export-report-modal";
import DeleteReportModal from "@/features/audit/automatic/components/modals/delete-report-modal";

interface AuditActionsCellProps {
  report: AutomaticAudit;
}

export function ReportActionsCell({ report }: AuditActionsCellProps) {
  const t = useTranslations();

  return (
    <div className="flex justify-start items-center gap-2 h-8">
      <Link
        className={buttonVariants({variant: "outline", size: "icon"})}
        href={`/account/audits/automatic/${report.id}`}
        title={t("audit.view")}
      >
        <View/>
      </Link>
      <CreateReportModal
          isEditModal={true}
          report={report}
      />
      <ExportReportModal report={report}/>
      <Separator orientation="vertical"/>
      <DeleteReportModal
          reportId={report.id}
          reportName={report.name}
      />
    </div>
  );
}

