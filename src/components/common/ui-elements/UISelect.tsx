import {Select, SelectContent, SelectGroup, SelectTrigger, SelectValue} from "@/components/ui/select";
import React from "react";

type UISelectProps = {
  placeholder: string;
  value: any;
  onChange: (value: any) => void;
  children: React.ReactNode;
  id?: string;
}
export default function UISelect({placeholder, value, id = "", onChange, children, ...props}: UISelectProps) {
  return (
      <Select onValueChange={(value) => onChange(value)} value={value}>
        <SelectTrigger id={id} className="max-w-52">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {children}
          </SelectGroup>
        </SelectContent>
      </Select>
  )
}