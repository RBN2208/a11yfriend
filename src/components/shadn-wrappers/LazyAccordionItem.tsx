"use client";

import * as React from "react";
import {AccordionItem, AccordionTrigger, AccordionContent} from "@/components/shadcn-components/ui/accordion";

export default function LazyAccordionItem({ value, title, children }: { value: string; title: string; children: React.ReactNode }) {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <AccordionItem value={value}>
            <AccordionTrigger
                className="AccordionTrigger px-4 font-bold"
                onClick={() => setIsOpen((prev) => !prev)}
            >
                {title}
            </AccordionTrigger>
            <AccordionContent>
                {isOpen ? children : null}
            </AccordionContent>
        </AccordionItem>
    );
}