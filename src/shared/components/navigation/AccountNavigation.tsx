'use client'

import { usePathname } from 'next/navigation'
import {
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem, SidebarMenuSubButton
} from '@/shared/components/shadcn-components/ui/sidebar';
import { Link } from '@/i18n/navigation';
import ProfileSettingsModal from "@/shared/components/profile-settings/profile-settings-modal";
import {Badge} from "@/shared/components/shadcn-components/ui/badge";
import {useTranslations} from "next-intl";

export default function AccountNavigation() {
  const pathname = usePathname();
  const t = useTranslations();

  const navigation = [
    {
      name: t('navigation.overview'),
      href: '/account/overview'
    },
    {
      name: t('navigation.audits'),
      href: '/account/audits',
      subs: [
        {
          name: t('navigation.manual'),
          href: '/account/audits/manual',
          active: true
        },
        {
          name: t('navigation.automatic'),
          href: '/account/audits/automatic',
          active: true
        },
        {
          name: t('navigation.ai'),
          href: '/account/audits/ai-assisted',
          active: false
        }
      ]
    }
  ]

  return (
     <>
        {navigation.map((item) => {
          const isActive = pathname === item.href ||
            (item.href !== '/account/overview' && pathname.startsWith(item.href))

          return (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton asChild isActive={isActive}>
                <Link href={item.href}>
                  {item.name}
                </Link>
              </SidebarMenuButton>
              {item.subs && item.subs.map(sub => {
                const isActiveSub = pathname === sub.href;
                return (
                  <SidebarMenuSub key={sub.name}>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild isActive={isActiveSub}>
                        {sub.active ? (
                            <Link href={sub.href}>
                              {sub.name}
                            </Link>
                        ) : (
                            <span>
                              {sub.name} <Badge>Soon</Badge>
                            </span>
                        )}
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                )
              })}
            </SidebarMenuItem>
          )
        })}
       <ProfileSettingsModal />
     </>
  )
}
