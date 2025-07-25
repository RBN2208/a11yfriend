import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarFooter,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu
} from '@/components/shadcn-components/ui/sidebar';
import AccountNavigation from "@/components/navigation/AccountNavigation";


export default async function AccountNavigationBase() {
  return (
    <Sidebar className="sticky" variant="floating">
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            Account
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
