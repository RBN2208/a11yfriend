'use client'

import { usePathname } from 'next/navigation'
import UILink from '@/components/ui-elements/UILink';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarFooter,
  SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton
} from '@/components/ui/sidebar';
import Link from 'next/link';

const navigation = [
  { name: 'Overview', href: '/account/overview' },
  { name: 'Audits', href: '/account/audits' },
  { name: 'Settings', href: '/account/settings' },
]

export default function AccountNav() {
  const pathname = usePathname();

  return (
    <Sidebar className="sticky" variant="floating">
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
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
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}
