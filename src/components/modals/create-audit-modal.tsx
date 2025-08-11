'use client'

import CreateAuditForm from '@/components/form-components/forms/create-audit-form';
import DialogWrapper from "@/components/shadn-wrappers/DialogWrapper";
import {Button} from "@/components/shadcn-components/ui/button";
import {Edit} from "lucide-react";
import {SupaBaseAudit} from "@/types/audit/types";

type CreateAuditModalProps = {
  isEditModal: boolean; // reuse component to create or update the audit data
  auditData?: SupaBaseAudit
}

export default function CreateAuditModal(props: CreateAuditModalProps) {
  const editModalTrigger = () => <Button variant={"outline"} size={"icon"}><Edit /></Button>;
  const defaultModalTrigger = () => <Button>Create audit</Button>;

  const dialogTriggerButton = props.isEditModal ? editModalTrigger() : defaultModalTrigger();

  return (
    <DialogWrapper
        title="Create a new audit"
        description=""
        dialogTrigger={dialogTriggerButton}
        dialogSize={"max-w-2xl"}
    >
      <CreateAuditForm
          auditData={props.auditData}
          isEditModal={props.isEditModal}
      />
    </DialogWrapper>
  )
}
