'use client'

import React, {useRef} from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {CircleX, Trash2} from "lucide-react";
import {deleteAudit} from "@/actions/audit";
import {useRouter} from "next/navigation";

interface AuditMenuProps {
  auditId: string
  auditName: string
}

export default function DeleteAuditModal({ auditId, auditName }: AuditMenuProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();

  const handleDelete = async () => {
    const response = await deleteAudit(auditId);
    router.refresh();
    // TODO handle response (loading state, error state, success state)
  }

  return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="icon" title="Delete audit">
            <Trash2 />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl py-10 px-2 pb-2 sm:py-10 sm:px-6 sm:pb-6 md:p-10 md:pb-8 overflow-y-scroll max-h-screen [&>button:last-of-type]:hidden"
                       onOpenAutoFocus={(e) => {
                         e.preventDefault()
                         closeButtonRef.current?.focus();
                       }}
        >
          <DialogClose asChild className="absolute right-2 top-2">
            <Button size="icon"
                    variant="ghost"
                    className="z-10"
                    ref={closeButtonRef}
            >
              <CircleX width="50" height="50"/>
            </Button>
          </DialogClose>

          <DialogTitle>Delete audit?</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the audit <strong>{auditName}</strong>?
            <br/>
            <br/>
            This action cannot be undone.
            <br/>
            <br/>
            <Button onClick={handleDelete}>Delete Audit</Button>
          </DialogDescription>

        </DialogContent>
      </Dialog>
  )
}
