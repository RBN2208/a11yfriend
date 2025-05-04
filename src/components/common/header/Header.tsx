import AllyFriendLogo from '@/components/Logo';
import HeaderNavigation from '@/components/common/header/parts/header-navigation';
import HeaderActionsMenu from '@/components/common/header/parts/header-actions-menu';
import type { User } from '@supabase/supabase-js';

type HeaderProps = {
  user: User | null;
}

export default async function Header({ user }: HeaderProps) {

  return (
    <header className="border-b border-border sticky top-0 z-50 bg-background">
      <div className="flex items-center gap-4 h-16 px-4 md:px-6">
        <AllyFriendLogo />

        <HeaderNavigation />

        <HeaderActionsMenu user={user} />
      </div>
    </header>
  );
}

