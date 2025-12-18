import { redirect } from 'next/navigation'
import { createServerSupabase } from '@/shared/supabase/server';
import { SidebarProvider, SidebarTrigger } from "@/shared/components/shadcn-components/ui/sidebar"
import AccountNavigationBase from "@/shared/components/navigation/AccountNavigationBase";

export default async function AccountLayout({children}: { children: React.ReactNode }) {
  const supabase = await createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login?redirectTo=/account')
  }

  return (
    <SidebarProvider className="md:grid md:grid-cols-[256px_minmax(0,80%)] py-2">
      <AccountNavigationBase />
      <main className="p-1 pr-4 w-full">
        <div className="flex justify-start items-center p-4 pl-0">
          <SidebarTrigger className="block md:hidden" />
        </div>
        {children}
      </main>
    </SidebarProvider>
  )
}
