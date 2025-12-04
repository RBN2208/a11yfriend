import {Card, CardContent, CardHeader, CardTitle} from '@/shared/components/shadcn-components/ui/card';
import ChangePasswordForm from "@/features/auth/components/change-password-form";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/shared/components/shadcn-components/ui/accordion";
import {getTranslations} from "next-intl/server";

export default async function AccountSettingsProfilePage() {
  const t = await getTranslations('account');

  return (
      <div className="grid grid-cols-12 gap-4">
        <Card className="col-span-6">
          <CardHeader>
            <CardTitle>
              {t('settings.title')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible>
              <AccordionItem value="change-pw">
                <AccordionTrigger className="AccordionTrigger px-4 font-bold">
                  {t('settings.changePassword')}
                </AccordionTrigger>
                <AccordionContent>
                  <ChangePasswordForm />
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="change-mail">
                <AccordionTrigger className="AccordionTrigger px-4 font-bold">
                  {t('settings.changeEmail')}
                </AccordionTrigger>
                <AccordionContent>
                  TODO: add email change form
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
        <Card className="col-span-6">
          <CardHeader>
            <CardTitle>
              {t('settings.title')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            TODO: add account informations (name, subscription, ...)
          </CardContent>
        </Card>
      </div>
  )
}
