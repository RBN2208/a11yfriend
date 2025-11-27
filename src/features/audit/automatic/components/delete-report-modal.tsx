'use client'

import React, {useState} from 'react'
import {Button} from "@/shared/components/shadcn-components/ui/button";
import {Trash2} from "lucide-react";
import {useRouter} from "next/navigation";
import DialogWrapper from "@/shared/components/shadn-wrappers/DialogWrapper";
import {deleteAudit} from "@/features/audit/manual/actions/actions";
import {toast} from "sonner";
import {deleteReport} from "@/features/audit/automatic/actions/actions";

interface ReportMenuProps {
    reportId: string
    reportName: string
}

export default function DeleteReportModal({reportId, reportName}: ReportMenuProps) {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    const handleDelete = async () => {
        const {success, globalError, message} = await deleteReport(reportId);
        if (success) {
            toast.success(message);
            router.refresh();
            setIsOpen(false);
        } else {
            toast.error(message, {description: globalError});
        }
    }

    return (
        <DialogWrapper
            title="Delete Report?"
            open={isOpen}
            onOpenChange={setIsOpen}
            description={"This action cannot be undone."}
            dialogAction={<Button onClick={handleDelete}>Delete Audit</Button>}
            dialogTrigger={
                <Button variant="outline" size="icon" title="Delete Report">
                    <Trash2/>
                </Button>
            }
        >
            TODO: add deleting of report
            <p>
                Delete audit: <strong>{reportName}</strong>
            </p>
        </DialogWrapper>
    )
}
