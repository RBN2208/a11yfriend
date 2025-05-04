import { redirect } from 'next/navigation'
import AccountNav from '@/components/navigation/AccountNavigation'
import { createClient } from '@/utils/supabase/server';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

export default async function AccountLayout({children}: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login?redirectTo=/account')
  }

  return (
    <SidebarProvider className="w-auto">
      <AccountNav />
      <main className="p-1">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}
