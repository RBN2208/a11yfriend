import ThemeToggle from '@/shared/components/common/header/parts/theme-toggle';
import {Button} from '@/shared/components/shadcn-components/ui/button';
import {Menu} from 'lucide-react';
import type {User} from '@supabase/supabase-js'
import {SheetTrigger} from '@/shared/components/shadcn-components/ui/sheet';
import UserLogin from '@/shared/components/common/header/parts/UserLogin';
import LangToggle from "@/shared/components/common/header/parts/LangToggle";

type HeaderActionsMenuProps = {
  user: User | null;
}

export default function HeaderActionsMenu({ user }: HeaderActionsMenuProps) {
  return (
    <div className="flex items-center space-x-4 ml-auto">

            <SheetTrigger className="block sm:hidden">
                <Button variant="outline" size="icon" className="p-1" asChild>
                    <Menu/>
                </Button>
            </SheetTrigger>

            <div className="hidden sm:block">
                <LangToggle />
            </div>

            <div className="hidden sm:block">
                <ThemeToggle />
            </div>

            <div className="hidden sm:block">
                <UserLogin user={user} />
            </div>
        </div>
    )
}
