import React from "react";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/shared/components/shadcn-components/ui/accordion";

type UISelectProps = {
  triggerLabel: string;
  triggerMarkerClass?: string;
  children: React.ReactNode;
}
export default function UIAccordion({triggerLabel, triggerMarkerClass, children}: UISelectProps) {
  return (
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className={`AccordionTrigger px-4 font-bold ${triggerMarkerClass || ""}`}>
            {triggerLabel}
          </AccordionTrigger>
          <AccordionContent>
            {children}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
  )
}