'use client'

import React, {useState} from 'react'
import {Button} from "@/components/shadcn-components/ui/button";
import { Trash2} from "lucide-react";
import {useRouter} from "next/navigation";
import DialogWrapper from "@/components/shadn-wrappers/DialogWrapper";
import {deleteAudit} from "@/actions/audit/actions";
import {toast} from "sonner";

interface AuditMenuProps {
  auditId: string
  auditName: string
}

export default function DeleteAuditModal({ auditId, auditName }: AuditMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    const { success, globalError, message } = await deleteAudit(auditId);
    if (success) {
      toast.success(message);
      router.refresh();
      setIsOpen(false);
    } else {
      toast.error(message, { description: globalError });
    }
  }

  return (
      <DialogWrapper
          title="Delete audit?"
          open={isOpen}
          onOpenChange={setIsOpen}
          description={"This action cannot be undone."}
          dialogAction={<Button onClick={handleDelete}>Delete Audit</Button>}
          dialogTrigger={
            <Button variant="outline" size="icon" title="Delete audit">
              <Trash2 />
            </Button>
          }
      >
        <p>
          Delete audit: <strong>{auditName}</strong>
        </p>
      </DialogWrapper>
  )
}
