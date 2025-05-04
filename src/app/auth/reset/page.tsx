'use client'

import ChangePasswordForm from '@/components/forms/auth/ChangePasswordForm';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';

export default function ChangePassword() {
  const router = useRouter();
  const [isValid, setIsValid] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams.get('code')

    if (code) {
      const supabase = createClient()

      supabase.auth.exchangeCodeForSession(code).then(({ error }) => {
        if (error) {
          console.log("exchange error", error.message)
        }
        setIsValid(true);
      })
    }
  }, [searchParams])

  return (
    <main>
      {
        isValid ?
        <ChangePasswordForm /> :
        <>
          <p>Invalid token</p>
        </>
      }
    </main>
  )
}
