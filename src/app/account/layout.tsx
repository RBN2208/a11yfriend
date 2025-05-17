import { redirect } from 'next/navigation'
import AccountNav from '@/components/navigation/AccountNavigation'
import { createClient } from '@/utils/supabase/server';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import {Breadcrumb} from "@/components/ui/breadcrumb";
import UIBreadcrumb from "@/components/common/ui-elements/UIBreadcrumb";

export default async function AccountLayout({children}: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login?redirectTo=/account')
  }

  return (
    <SidebarProvider>
      <AccountNav />
      <main className="p-1 pr-4 w-full">
        <div className="flex justify-start items-center p-4 pl-0">
          <SidebarTrigger className="block md:hidden" />
          <UIBreadcrumb />
        </div>
        {children}
      </main>
    </SidebarProvider>
  )
}
