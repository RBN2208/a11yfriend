'use client'

import {
  DropdownMenu,
  DropdownMenuTrigger
} from '@/shared/components/shadcn-components/ui/dropdown-menu';
import { Button } from '@/shared/components/shadcn-components/ui/button';
import { Moon, Sun } from 'lucide-react';
import * as React from 'react';
import { useTheme } from 'next-themes';

type ThemeToggleProps = {
  showLabel?: boolean;
}

export default function ThemeToggle({ showLabel }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline"
                size={showLabel ? 'default' : 'icon'}
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? (
            <>
              <Moon className="h-5 w-5"/> {showLabel && "Use light mode"}
            </>
          ) : (
            <>
              <Sun className="h-5 w-5"/> {showLabel && "Use dark mode"}
            </>
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
    </DropdownMenu>
  )
}
