import {Alert, AlertDescription, AlertTitle} from "@/shared/components/shadcn-components/ui/alert";
import React from "react";

type AlertWrapperProps = {
  title: string;
  variant: "default" | "destructive";
  icon: React.ReactNode;
  children: React.ReactNode;
  alertClass?: string;
}

export default function AlertWrapper(props: AlertWrapperProps) {
  return (
      <Alert variant={props.variant || "default"} className={props.alertClass}>
        {props.icon && props.icon}
        {
          props.title &&
            <AlertTitle className="font-bold ml-2 mb-2 mt-2">
              {props.title}
            </AlertTitle>
        }

        {
          props.children &&
            <AlertDescription className="ml-2">
              {props.children}
            </AlertDescription>
        }
      </Alert>
  )
}