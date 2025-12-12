import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem, NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger, navigationMenuTriggerStyle
} from '@/shared/components/shadcn-components/ui/navigation-menu';
import { features, resources } from '@/shared/components/common/header/data/static-navigation';
import { Link } from '@/i18n/navigation';
import * as React from 'react';
import {useTranslations} from "next-intl";

export default function HeaderNavigation() {
  const t = useTranslations();

  return (
    <NavigationMenu className="hidden md:flex pt-2">
      <NavigationMenuList>

        <NavigationMenuItem>
          <NavigationMenuTrigger>
            {t("header.features.title")}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {features.map((feature) => (
                <li key={feature.key} className="row-span-1">
                  <Link
                    href={feature.href}
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    passHref
                  >
                    <NavigationMenuLink asChild>
                      <div>
                        <div className="text-sm font-medium leading-none">
                          {t(`header.features.items.${feature.key}.title`)}
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          {t(`header.features.items.${feature.key}.description`)}
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
          <NavigationMenuTrigger>
            {t("header.resources.title")}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {resources.map((resource) => (
                <li key={resource.key} className="row-span-1">
                  <Link
                    href={resource.href}
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    passHref
                  >
                    <NavigationMenuLink asChild>
                      <div>
                        <div className="text-sm font-medium leading-none">
                          {t(`header.resources.items.${resource.key}.title`)}
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          {t(`header.resources.items.${resource.key}.description`)}
                        </p>
                      </div>
                    </NavigationMenuLink>
                  </Link>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
