"use client"

import * as React from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

import { Button } from "@/shared/components/shadcn-components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/shared/components/shadcn-components/ui/collapsible"

type UICollapsibleProps = {
  title: string,
  children: React.ReactNode
}

export function UICollapsible({title, children}: UICollapsibleProps) {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
      <Collapsible
          open={isOpen}
          onOpenChange={setIsOpen}
          className="w-full space-y-2"
      >
        <div className="flex items-center justify-between space-x-4">
          <CollapsibleTrigger asChild>
            <Button className="px-10">
              { title }
              { isOpen ?
                <ChevronUp className="h-4 w-4" /> :
                <ChevronDown className="h-4 w-4" />
              }
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="space-y-2">
          {children}
        </CollapsibleContent>
      </Collapsible>
  )
}
