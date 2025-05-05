'use client'

import { useUIStore } from '@/stores/ui-store';
import CreateAuditForm from '@/components/forms/audit/CreateAuditForm';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

export default function CreateAuditModal() {

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          Create Audit
        </Button>
      </DialogTrigger>
      <DialogContent className="py-10 px-2 pb-2 sm:py-10 sm:px-6 sm:pb-3 md:p-10 md:pb-4">
        <VisuallyHidden>
          <DialogTitle>Create a new audit</DialogTitle>
        </VisuallyHidden>
        <CreateAuditForm />
      </DialogContent>
    </Dialog>
  )
}
