'use client'

import CreateAuditForm from '@/components/form-components/forms/create-audit-form';
import DialogWrapper from "@/components/shadn-wrappers/DialogWrapper";
import {Button} from "@/components/shadcn-components/ui/button";
import {Edit} from "lucide-react";
import {SupabaseAudit} from "@/features/audit/types/types";
import {useState} from "react";

type CreateAuditModalProps = {
  isEditModal: boolean; // reuse component to create or update the audit data
  auditData?: SupabaseAudit
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
