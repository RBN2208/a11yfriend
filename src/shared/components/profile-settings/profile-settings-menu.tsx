'use client'

import {useTranslations} from "next-intl";
import {Button} from "@/shared/components/shadcn-components/ui/button";
import {useState} from "react";
import {SettingsMenuActionValues} from "@/shared/components/profile-settings/types/types";
import ProfileSettingsGeneralMenu from "@/shared/components/profile-settings/menus/profile-settings-general-menu";
import ProfileSettingsSecurityMenu from "@/shared/components/profile-settings/menus/profile-settings-security-menu";
import ProfileSettingsAccountMenu from "@/shared/components/profile-settings/menus/profile-settings-account-menu";
import {CircleUser, KeyRound, Settings} from "lucide-react";

export default function ProfileSettingsMenu() {
  const [menu, setMenu] = useState<SettingsMenuActionValues>('general');
  const t = useTranslations();

  function handleAction(value: SettingsMenuActionValues) {
    setMenu(value);
  }

  return (
    <div className="flex gap-4 h-80 overflow-scroll">
      <div className="flex flex-col gap-2">
        <Button
            variant={menu === 'general' ? 'default' : 'outline'}
            className="flex gap-4 justify-start"
            onClick={() => handleAction('general')}
        >
          <Settings /> {t('common.general')}
        </Button>
        <Button
            variant={menu === 'security' ? 'default' : 'outline'}
            className="flex gap-4 justify-start"
            onClick={() => handleAction('security')}
        >
          <KeyRound /> {t('common.security')}
        </Button>
        <Button
            variant={menu === 'account' ? 'default' : 'outline'}
            className="flex gap-4 justify-start"
            onClick={() => handleAction('account')}
        >
          <CircleUser /> {t('common.account')}
        </Button>
      </div>
      <div className="w-full">
        {menu === 'general' && <ProfileSettingsGeneralMenu />}
        {menu === 'security' && <ProfileSettingsSecurityMenu />}
        {menu === 'account' && <ProfileSettingsAccountMenu />}
      </div>
    </div>
  )
}
