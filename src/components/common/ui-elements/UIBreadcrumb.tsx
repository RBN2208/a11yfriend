'use client'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/shadcn-components/ui/breadcrumb";
import {usePathname} from "next/navigation";
import {Fragment} from "react";

const createBreadcrumbs = (path: string) => {
  const paths = path.split("/");
  const crumbs: {name: string, href: string}[] = [];

  paths.forEach((path, index) => {
    if (index !== 0) {
      crumbs.push({
        name: capitalizeFirstLetter(path),
        href: paths.slice(0, index + 1).join("/")
      })
    }
  })
  return crumbs;
}

const capitalizeFirstLetter = (str: string) => {
  return str.at(0)?.toUpperCase() + str.slice(1);
}

export default function UIBreadcrumb() {
  const paths = usePathname();

  const crumbs = createBreadcrumbs(paths);

  return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          {crumbs.map((crumb, index) => {
            const notLast = crumb !== crumbs.at(-1);
            return (
              <Fragment key={index}>
                <BreadcrumbItem key={crumb.name}>
                  {notLast ?
                    <BreadcrumbLink href={crumb.href}>{crumb.name}</BreadcrumbLink> :
                    <BreadcrumbPage>{crumb.name}</BreadcrumbPage>
                  }
                </BreadcrumbItem>
                {notLast &&
                    <BreadcrumbSeparator />
                }
              </Fragment>
            )
          })}
        </BreadcrumbList>
      </Breadcrumb>
  )
}