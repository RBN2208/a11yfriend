'use client'

import { usePathname } from 'next/navigation'
import {
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem, SidebarMenuSubButton
} from '@/shared/components/shadcn-components/ui/sidebar';
import Link from 'next/link';

const navigation = [
  {
    name: 'Overview',
    href: '/account/overview'
  },
  {
    name: 'Audits',
    href: '/account/audits',
    subs: [
      {
        name: 'Manual',
        href: '/account/audits/manual'
      },
      {
        name: 'Automatic',
        href: '/account/audits/automatic'
      },
      {
        name: 'AI-Assisted',
        href: '/account/audits/ai-assisted'
      }
    ]
  },
  {
    name: 'Settings',
    href: '/account/settings',
    subs: [
      { name: 'Profile', href: '/account/settings/profile' }
    ]
  },
]

export default function AccountNavigation() {
  const pathname = usePathname();

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
                        <Link href={sub.href}>
                          {sub.name}
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                )
              })}
            </SidebarMenuItem>
          )
        })}
     </>
  )
}
