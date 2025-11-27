'use client'

import CreateAuditForm from '@/components/form-components/forms/create-audit-form';
import DialogWrapper from "@/components/shadn-wrappers/DialogWrapper";
import {Button} from "@/components/shadcn-components/ui/button";
import {Edit, FileText} from "lucide-react";
import {SupabaseAudit} from "@/features/audit/manual/types/types";
import ExportAuditForm from "@/components/form-components/forms/export-audit-form";

type CreateAuditModalProps = {
  auditData?: SupabaseAudit
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
