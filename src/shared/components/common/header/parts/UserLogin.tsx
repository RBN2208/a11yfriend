'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/shared/components/shadcn-components/ui/dropdown-menu';
import { Button } from '@/shared/components/shadcn-components/ui/button';
import { User as UserIcon } from 'lucide-react';
import Link from 'next/link';
import type { User } from '@supabase/supabase-js';
import { useState } from 'react';
import { SignInAndUpModal } from '@/features/auth/components/SignInAndUpModal';

type UserLoginProps = {
  user: User | null
}

export default function UserLogin({ user }: UserLoginProps  ) {
  const [open, setOpen] = useState(false);

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
            <Button variant="outline" size="icon" onClick={() => setOpen(!open)}>
              <UserIcon className="h-6 w-6"/>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Link href="/account"
                    onClick={() => setOpen(false)}
                    className="w-full h-full"
              >
                Dashboard
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/account/settings"
                    onClick={() => setOpen(false)}
                    className="w-full h-full"
              >
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Button className="w-full h-full"
                      onClick={callLogout}
              >
                Logout
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
