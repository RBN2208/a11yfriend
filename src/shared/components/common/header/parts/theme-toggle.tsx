'use client'

import {
  DropdownMenu,
  DropdownMenuTrigger
} from '@/shared/components/shadcn-components/ui/dropdown-menu';
import { Button } from '@/shared/components/shadcn-components/ui/button';
import { Moon, Sun } from 'lucide-react';
import * as React from 'react';
import { useTheme } from 'next-themes';
import {useTranslations} from "next-intl";

type ThemeToggleProps = {
  showLabel?: boolean;
}

export default function ThemeToggle({ showLabel }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const t = useTranslations();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline"
                size={showLabel ? 'default' : 'icon'}
                title={theme === "dark" ? t('ui.lightMode') : t('ui.darkMode')}
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? (
            <>
              <Moon className="h-5 w-5"/> {showLabel && t('ui.lightMode')}
            </>
          ) : (
            <>
              <Sun className="h-5 w-5"/> {showLabel && t('ui.darkMode')}
            </>
          )}
          <span className="sr-only">
            {t('ui.themeToggle')}
          </span>
        </Button>
      </DropdownMenuTrigger>
    </DropdownMenu>
  )
}
