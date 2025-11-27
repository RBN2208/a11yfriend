import {Select, SelectContent, SelectGroup, SelectTrigger, SelectValue} from "@/shared/components/shadcn-components/ui/select";
import React from "react";
import {Label} from "@/shared/components/shadcn-components/ui/label";

type UISelectProps = {
  placeholder: string;
  value: any;
  onChange: (value: any) => void;
  children: React.ReactNode;
  label?: string;
  id?: string;
}
export default function UISelect({placeholder, label, value, id = "", onChange, children, ...props}: UISelectProps) {
  return (
      <>
        {label &&
          <Label htmlFor={id}
                 className="font-bold"
          >
            {label}
          </Label>
        }
        <Select onValueChange={(value) => onChange(value)} value={value}>
          <SelectTrigger id={id} className="max-w-60">
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {children}
            </SelectGroup>
          </SelectContent>
        </Select>
      </>
  )
}