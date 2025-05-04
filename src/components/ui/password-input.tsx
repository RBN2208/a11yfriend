import * as React from "react"

import { cn } from "@/lib/utils"
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PasswordInput = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    return (
      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          className={cn(
            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            className
          )}
          ref={ref}
          {...props}
        />
        {showPassword ? (
          <Button variant="ghost"
                  size="icon"
                  title="Hide password"
                  className="absolute right-1 top-1 z-10 w-7 h-7 cursor-pointer text-gray-500"
                  onClick={(e) => {
                    e.preventDefault()
                    setShowPassword(!showPassword)
                  }}
          >
            <Eye className="text-gray-500"/>
          </Button>
        ) : (
          <Button variant="ghost"
                  size="icon"
                  title="Show password"
                  className="absolute right-1 top-1 w-7 h-7 z-10 cursor-pointer text-gray-500"
                  onClick={(e) => {
                    e.preventDefault()
                    setShowPassword(!showPassword)
                  }}
          >
            <EyeOff className="text-gray-500" />
          </Button>
        )}
      </div>
    )
  }
)
PasswordInput.displayName = "Input"

export { PasswordInput }
