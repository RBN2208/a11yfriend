'use client'

import React from "react";
import {useTranslations} from "next-intl";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from "@/shared/components/shadcn-components/ui/accordion";
import ChangePasswordForm from "@/features/auth/components/change-password-form";

export default function ProfileSettingsSecurityMenu() {
    const t = useTranslations();

    return (
        <>
            <Accordion type={"single"} collapsible className="w-full">
                <AccordionItem value={"change-password"}>
                    <AccordionTrigger className="AccordionTrigger px-4">
                        {t('auth.changePassword')}
                    </AccordionTrigger>
                    <AccordionContent className="p-4">
                        <ChangePasswordForm />
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </>
    )
}
