'use client'

import DialogWrapper from "@/shared/components/shadn-wrappers/DialogWrapper";
import {Button} from "@/shared/components/shadcn-components/ui/button";
import {FileText} from "lucide-react";
import {AutomaticAudit} from "@/features/audit/automatic/types/types";
import ExportReportForm from "@/features/audit/automatic/components/forms/export-report-form";

type CreateAuditModalProps = {
  report?: AutomaticAudit
}

export default function ExportReportModal(props: CreateAuditModalProps) {
  const modalTrigger = <Button variant={"outline"} size={"icon"} title="Export"><FileText /></Button>;

  return (
    <DialogWrapper
        title="Export options"
        description=""
        dialogTrigger={modalTrigger}
        dialogSize={"max-w-sm"}
    >
      <ExportReportForm report={props.report} />
    </DialogWrapper>
  )
}
