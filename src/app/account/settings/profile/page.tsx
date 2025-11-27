import {Card, CardContent, CardHeader, CardTitle} from '@/shared/components/shadcn-components/ui/card';
import UIAccordion from "@/shared/components/common/ui-elements/UIAccordion";
import ChangePasswordForm from "@/features/auth/components/change-password-form";

export default async function AccountSettingsProfilePage() {
  return (
      <div className="grid grid-cols-12 gap-4">
        <Card className="col-span-6">
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <UIAccordion triggerLabel="Change Password">
              <div className="max-w-xl">
                <ChangePasswordForm />
              </div>
            </UIAccordion>
            <UIAccordion triggerLabel="Change E-Mail">
              TODO: add email change form
            </UIAccordion>
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
