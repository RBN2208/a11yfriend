'use client'

import CreateAuditForm from '@/components/form-components/forms/create-audit-form';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CircleX } from 'lucide-react';
import {useRef} from "react";

export default function CreateAuditModal() {

  const closeButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          Create Audit
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl py-10 px-2 pb-2 sm:py-10 sm:px-6 sm:pb-6 md:p-10 md:pb-8 overflow-y-scroll max-h-screen [&>button:last-of-type]:hidden"
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

        <DialogTitle className="p-2">Create a new audit</DialogTitle>

        <CreateAuditForm />
      </DialogContent>
    </Dialog>
  )
}
