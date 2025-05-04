// import ChangeUserDetailsForm from '@/components/forms/account/ChangeUserDetailsForm'
// import { createClient } from '@/utils/supabase/server'
//
// export default async function Account() {
//   const supabase = await createClient()
//
//   const {
//     data: { user },
//   } = await supabase.auth.getUser()
//
//   return <ChangeUserDetailsForm user={user} />
// }


import { redirect } from 'next/navigation'

export default function AccountPage() {
  redirect('/account/overview')
}
