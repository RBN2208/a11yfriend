'use client'

import DialogWrapper from "@/shared/components/shadn-wrappers/DialogWrapper";
import {Button} from "@/shared/components/shadcn-components/ui/button";
import {useState} from "react";
import CreateAxeReportForm from "@/features/audit/automatic/components/create-axe-report-form";
import {SupabaseReport} from "@/features/audit/automatic/types/types";

type CreateReportModalProps = {
  reportData?: SupabaseReport
}

export default function CreateAxeReportModal(props: CreateReportModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DialogWrapper
        title="Create a new axe report"
        description="Provide the urls of the pages you want to audit with axe."
        open={isOpen}
        onOpenChange={setIsOpen}
        dialogTrigger={<Button>Create Axe Report</Button>}
        dialogSize={"max-w-2xl"}
    >
      <CreateAxeReportForm
          callbackAction={() => setIsOpen(false)}
          reportData={props.reportData}
      />
    </DialogWrapper>
  )
}
