'use client'

import DialogWrapper from "@/shared/components/shadn-wrappers/DialogWrapper";
import {Button} from "@/shared/components/shadcn-components/ui/button";
import {Edit} from "lucide-react";
import {useState} from "react";
import {useTranslations} from "next-intl";
import {AutomaticAudit} from "@/features/audit/automatic/types/types";
import CreateReportForm from "@/features/audit/automatic/components/forms/create-report-form";

type CreateAuditModalProps = {
  isEditModal: boolean; // reuse component to create or update the audit data
  report?: AutomaticAudit
}

export default function CreateReportModal(props: CreateAuditModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const t = useTranslations();

  const editModalTrigger = () => <Button variant={"outline"} size={"icon"}><Edit /></Button>;
  const defaultModalTrigger = () => <Button>{t('report.create')}</Button>;

  const dialogTriggerButton = props.isEditModal ? editModalTrigger() : defaultModalTrigger();
  const dialogTitle = props.isEditModal ? t("report.edit") : t("report.create");

  return (
    <DialogWrapper
        title={dialogTitle}
        description=""
        open={isOpen}
        onOpenChange={setIsOpen}
        dialogTrigger={dialogTriggerButton}
        dialogSize={"max-w-2xl"}
    >
      <CreateReportForm
          report={props.report}
          isEditModal={props.isEditModal}
          callbackAction={() => setIsOpen(false)}
      />
    </DialogWrapper>
  )
}
