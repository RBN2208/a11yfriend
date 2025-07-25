'use client'

import React from 'react'
import {Button} from "@/components/shadcn-components/ui/button";
import { Trash2} from "lucide-react";
import {deleteAudit} from "@/actions/audit";
import {useRouter} from "next/navigation";
import DialogWrapper from "@/components/shadn-wrappers/DialogWrapper";

interface AuditMenuProps {
  auditId: string
  auditName: string
}

export default function DeleteAuditModal({ auditId, auditName }: AuditMenuProps) {
  const router = useRouter();

  const handleDelete = async () => {
    const response = await deleteAudit(auditId);
    router.refresh();
    // TODO handle response (loading state, error state, success state)
  }

  return (
      <DialogWrapper
          title="Delete audit?"
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
