import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { User as UserIcon } from 'lucide-react';
import Link from 'next/link';
import type { User } from '@supabase/supabase-js';
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { SignInAndUpModal } from '@/components/modals/SignInAndUpModal';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

type UserLoginProps = {
  user: User | null,
  label?: string;
}

export default function UserLogin({ user, label }: UserLoginProps  ) {
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
        <Dialog>
          <DialogTrigger asChild>
            <Button size={label ? 'default' : 'icon'} title={"Login or Register"}>
              <UserIcon className="h-6 w-6"/> {label}
            </Button>
          </DialogTrigger>
          <DialogContent className="py-10 px-2 pb-2 sm:py-10 sm:px-6 sm:pb-3 md:p-10 md:pb-4">
            <VisuallyHidden>
              <DialogTitle>Login or Register</DialogTitle>
              <DialogDescription>Login to your account or register a new one</DialogDescription>
            </VisuallyHidden>
            <SignInAndUpModal />
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
