import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarFooter,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu
} from '@/shared/components/shadcn-components/ui/sidebar';
import AccountNavigation from "@/shared/components/navigation/AccountNavigation";
import {getTranslations} from "next-intl/server";

export default async function AccountNavigationBase() {
  const t = await getTranslations();

  return (
    <Sidebar className="sticky" variant="floating">
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            {t('common.account')}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>

              <AccountNavigation />

            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}
