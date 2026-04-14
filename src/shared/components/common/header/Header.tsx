import AllyFriendLogo from '@/shared/components/Logo';
import HeaderNavigation from '@/shared/components/common/header/parts/header-navigation';
import HeaderActionsMenu from '@/shared/components/common/header/parts/header-actions-menu';
import type { User } from '@supabase/supabase-js';
import {getTranslations} from 'next-intl/server';

type HeaderProps = {
  user: User | null;
}

export default async function Header({ user }: HeaderProps) {
  const t = await getTranslations('a11y');

  return (
    <header className="border-b border-border sticky top-0 z-50 bg-background">
      <nav aria-label={t('mainNavigation')}>
        <div className="flex items-center gap-4 h-16 px-4 md:px-6">
          <AllyFriendLogo />

          <HeaderNavigation />

          <HeaderActionsMenu user={user} />
        </div>
      </nav>
    </header>
  );
}

