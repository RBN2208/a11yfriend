import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem, NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger, navigationMenuTriggerStyle
} from '@/components/shadcn-components/ui/navigation-menu';
import { features, resources } from '@/components/common/header/data/static-navigation';
import Link from 'next/link';
import * as React from 'react';

export default function HeaderNavigation() {
  return (
    <NavigationMenu className="hidden md:flex pt-2">
      <NavigationMenuList>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Menu 1</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {features.map((feature) => (
                <li key={feature.title} className="row-span-1">
                  <Link
                    href={feature.href}
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    passHref
                  >
                    <NavigationMenuLink asChild>
                      <div>
                        <div className="text-sm font-medium leading-none">{feature.title}</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          {feature.description}
                        </p>
                      </div>
                    </NavigationMenuLink>
                  </Link>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Menu 2</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {resources.map((resource) => (
                <li key={resource.title} className="row-span-1">
                  <Link
                    href={resource.href}
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    passHref
                  >
                    <NavigationMenuLink asChild>
                      <div>
                        <div className="text-sm font-medium leading-none">{resource.title}</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          {resource.description}
                        </p>
                      </div>
                    </NavigationMenuLink>
                  </Link>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink href="/tbd" className={navigationMenuTriggerStyle()}>
            Link 1
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink href="/tbd" className={navigationMenuTriggerStyle()}>
            Link 2
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
