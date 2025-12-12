'use client'

import DialogWrapper from "@/shared/components/shadn-wrappers/DialogWrapper";
import {Button} from "@/shared/components/shadcn-components/ui/button";
import {useState} from "react";
import {useTranslations} from "next-intl";
import ProfileSettingsMenu from "@/shared/components/profile-settings/profile-settings-menu";

export default function ProfileSettingsModal() {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations();

  const dialogTriggerButton = <Button variant={"outline"}>{t('common.settings')}</Button>

  return (
    <DialogWrapper
        title="Settings"
        description=""
        open={isOpen}
        onOpenChange={setIsOpen}
        dialogTrigger={dialogTriggerButton}
        dialogSize={"max-w-2xl"}
    >
      <ProfileSettingsMenu />
    </DialogWrapper>
  )
}
