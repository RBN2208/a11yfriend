import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn-components/ui/dialog"
import React from "react";

/*
   @dialogTrigger
   The definition for the trigger that opens the dialog, like <Button>
   @dialogAction
   The definition for the action button like a submit button, like <Button>
   @dialogClose
   The definition for the close button in case a second button should be available, like <Button>
 */
type DialogWrapperProps = {
  children: React.ReactNode;
  title: string;
  description: string;
  dialogTrigger?: React.ReactNode;
  dialogAction?: React.ReactNode;
  dialogClose?: React.ReactNode;
  dialogSize?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function DialogWrapper(props: DialogWrapperProps) {

  return (
    <Dialog open={props.open} onOpenChange={props.onOpenChange}>
      {
        props.dialogTrigger &&
          <DialogTrigger asChild>
            {props.dialogTrigger}
          </DialogTrigger>
      }

      <DialogContent className={`${props.dialogSize}`}>
        {
          (props.title || props.description) &&
            <DialogHeader className="flex items-center mb-4">
              {
                props.title &&
                  <DialogTitle>
                    {props.title}
                  </DialogTitle>
              }
              {
                props.description &&
                  <DialogDescription className="text-center">
                    {props.description}
                  </DialogDescription>
              }
            </DialogHeader>
        }

        {props.children}

        <DialogFooter>
          {
            props.dialogClose &&
              <DialogClose asChild>
                {props.dialogClose}
              </DialogClose>
          }
          {props.dialogAction && props.dialogAction}
        </DialogFooter>

      </DialogContent>

    </Dialog>
  )
}