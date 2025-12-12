'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/shared/components/shadcn-components/ui/dropdown-menu';
import { Button } from '@/shared/components/shadcn-components/ui/button';
import { User as UserIcon } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import type { User } from '@supabase/supabase-js';
import { useState } from 'react';
import { SignInAndUpModal } from '@/features/auth/components/SignInAndUpModal';
import {useTranslations} from "next-intl";

type UserLoginProps = {
  user: User | null,
  showLabel?: boolean
}

export default function UserLogin({ user, showLabel }: UserLoginProps  ) {
  const [open, setOpen] = useState(false);
  const t = useTranslations();

  const callLogout = async () => {
    const res = await fetch('/api/signout', {
      method: 'POST',
    });

    if (res.redirected) {
      window.location.href = res.url;
    }
  }

  return (
    <>
      {user ? (
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="outline"
                    size="icon"
                    title={t('common.account')}
                    onClick={() => setOpen(!open)}
            >
              <UserIcon className="h-6 w-6"/> {showLabel && t('common.account')}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Link href="/account"
                    onClick={() => setOpen(false)}
                    className="w-full h-full"
              >
                {t('common.accountOverview')}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/account/settings"
                    onClick={() => setOpen(false)}
                    className="w-full h-full"
              >
                {t('common.accountSettings')}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Button className="w-full h-full"
                      onClick={callLogout}
              >
                {t('auth.logout')}
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <SignInAndUpModal />
      )}
    </>
  )
}
