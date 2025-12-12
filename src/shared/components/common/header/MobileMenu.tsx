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
import LangToggle from "@/shared/components/common/header/parts/LangToggle";
import { features, resources } from '@/shared/components/common/header/data/static-navigation';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

type MobileMenuProps = {
  user: User | null;
}
export function MobileMenu({ user }: MobileMenuProps) {
  const t = useTranslations();

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
          <div className="pt-4">
            <h3 className="px-4 text-sm font-semibold text-muted-foreground">
              {t('header.features.title')}
            </h3>
            <ul className="space-y-1 pt-2">
              {features.map((item) => (
                <li key={item.key}>
                  <SheetClose asChild>
                    <Link
                      href={item.href}
                      className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded-md dark:text-gray-300 dark:hover:bg-gray-800"
                    >
                      {t(`header.features.items.${item.key}.title`)}
                    </Link>
                  </SheetClose>
                </li>
              ))}
            </ul>
          </div>
          <div className="pt-4">
            <h3 className="px-4 text-sm font-semibold text-muted-foreground">
              {t('header.resources.title')}
            </h3>
            <ul className="space-y-1 pt-2">
              {resources.map((item) => (
                <li key={item.key}>
                  <SheetClose asChild>
                    <Link
                      href={item.href}
                      className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded-md dark:text-gray-300 dark:hover:bg-gray-800"
                    >
                      {t(`header.resources.items.${item.key}.title`)}
                    </Link>
                  </SheetClose>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
      <SheetFooter className="flex flex-col gap-4">
        <LangToggle showLabel={true} />
        <UserLogin user={user} showLabel={true} />
        <ThemeToggle showLabel={true} />
      </SheetFooter>
    </SheetContent>
  )
}
