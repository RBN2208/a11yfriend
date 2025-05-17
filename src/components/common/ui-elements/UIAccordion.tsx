import React from "react";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";

type UISelectProps = {
  triggerLabel: string;
  children: React.ReactNode;
}
export default function UIAccordion({triggerLabel, children}: UISelectProps) {
  return (
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="font-bold">
            {triggerLabel}
          </AccordionTrigger>
          <AccordionContent>
            {children}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
  )
}