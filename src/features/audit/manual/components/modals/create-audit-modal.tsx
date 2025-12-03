'use client'

import CreateAuditForm from '@/features/audit/manual/components/forms/create-audit-form';
import DialogWrapper from "@/shared/components/shadn-wrappers/DialogWrapper";
import {Button} from "@/shared/components/shadcn-components/ui/button";
import {Edit} from "lucide-react";
import {ManualAudit} from "@/features/audit/manual/types/types";
import {useState} from "react";

type CreateAuditModalProps = {
  isEditModal: boolean; // reuse component to create or update the audit data
  auditData?: ManualAudit
}

export default function CreateAuditModal(props: CreateAuditModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const editModalTrigger = () => <Button variant={"outline"} size={"icon"}><Edit /></Button>;
  const defaultModalTrigger = () => <Button>Create audit</Button>;

  const dialogTriggerButton = props.isEditModal ? editModalTrigger() : defaultModalTrigger();

  return (
    <DialogWrapper
        title="Create a new audit"
        description=""
        open={isOpen}
        onOpenChange={setIsOpen}
        dialogTrigger={dialogTriggerButton}
        dialogSize={"max-w-2xl"}
    >
      <CreateAuditForm
          auditData={props.auditData}
          isEditModal={props.isEditModal}
          callbackAction={() => setIsOpen(false)}
      />
    </DialogWrapper>
  )
}
