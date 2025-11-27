'use client'
import {
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle
} from '@/shared/components/shadcn-components/ui/sheet';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import ThemeToggle from '@/shared/components/common/header/parts/theme-toggle';
import UserLogin from '@/shared/components/common/header/parts/UserLogin';
import type { User } from '@supabase/supabase-js';
import { Card, CardContent, CardDescription } from '@/shared/components/shadcn-components/ui/card';

type MobileMenuProps = {
  user: User | null;
}
export function MobileMenu({ user }: MobileMenuProps) {

  const menuItems = [
    { text: "TBD 1", href: "#" },
    { text: "TBD 2", href: "#" },
    { text: "TBD 3", href: "#" },
    { text: "TBD 4", href: "#" },
    { text: "TBD 5", href: "#" }
  ];

  return (
    <SheetContent side="left" className="flex flex-col justify-between w-64">
      <VisuallyHidden>
        <SheetHeader>
          <SheetTitle>Navigation</SheetTitle>
          <SheetDescription>tbd</SheetDescription>
        </SheetHeader>
      </VisuallyHidden>
      <div className="flex flex-col">
        <nav className="flex-1">
          <ul className="space-y-1 pt-4">
            {menuItems.map((item, index) => (
              <li key={index}>
                <SheetClose asChild>
                  <a
                    href={item.href}
                    className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    {item.text}
                  </a>
                </SheetClose>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <SheetFooter className="flex flex-col gap-4">
        <UserLogin user={user} />
        <ThemeToggle showLabel={true} />
      </SheetFooter>
    </SheetContent>
  )
}
