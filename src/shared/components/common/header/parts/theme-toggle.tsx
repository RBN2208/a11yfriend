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
                title={theme === "dark" ? t('common.lightMode') : t('common.darkMode')}
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? (
            <>
              <Moon className="h-5 w-5"/> {showLabel && t('common.lightMode')}
            </>
          ) : (
            <>
              <Sun className="h-5 w-5"/> {showLabel && t('common.darkMode')}
            </>
          )}
          <span className="sr-only">
            {t('common.themeToggle')}
          </span>
        </Button>
      </DropdownMenuTrigger>
    </DropdownMenu>
  )
}
