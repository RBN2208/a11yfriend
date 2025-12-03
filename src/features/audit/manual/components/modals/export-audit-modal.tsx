'use client'

import DialogWrapper from "@/shared/components/shadn-wrappers/DialogWrapper";
import {Button} from "@/shared/components/shadcn-components/ui/button";
import {FileText} from "lucide-react";
import {ManualAudit} from "@/features/audit/manual/types/types";
import ExportAuditForm from "@/features/audit/manual/components/forms/export-audit-form";

type CreateAuditModalProps = {
  auditData?: ManualAudit
}

export default function ExportAuditModal(props: CreateAuditModalProps) {
  const modalTrigger = <Button variant={"outline"} size={"icon"} title="Export"><FileText /></Button>;
  return (
    <DialogWrapper
        title="Export options"
        description=""
        dialogTrigger={modalTrigger}
        dialogSize={"max-w-sm"}
    >
      <ExportAuditForm auditData={props.auditData} />
    </DialogWrapper>
  )
}
