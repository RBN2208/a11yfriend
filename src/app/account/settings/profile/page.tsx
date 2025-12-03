import {Card, CardContent, CardHeader, CardTitle} from '@/shared/components/shadcn-components/ui/card';
import ChangePasswordForm from "@/features/auth/components/change-password-form";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/shared/components/shadcn-components/ui/accordion";

export default async function AccountSettingsProfilePage() {
  return (
      <div className="grid grid-cols-12 gap-4">
        <Card className="col-span-6">
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible>
              <AccordionItem value="change-pw">
                <AccordionTrigger className="AccordionTrigger px-4 font-bold">
                  Change Password
                </AccordionTrigger>
                <AccordionContent>
                  <ChangePasswordForm />
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="change-mail">
                <AccordionTrigger className="AccordionTrigger px-4 font-bold">
                  Change E-Mail
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
            <CardTitle>Account informations</CardTitle>
          </CardHeader>
          <CardContent>
            TODO: add account informations (name, subscription, ...)
          </CardContent>
        </Card>
      </div>
  )
}
