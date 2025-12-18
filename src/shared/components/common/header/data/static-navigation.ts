export type NavItem = {
  key: string;
  href: string;
};

export const features: NavItem[] = [
  {
    key: "features",
    href: "/features",
  },
  {
    key: "pricing",
    href: "/pricing",
  },
  {
    key: "faq",
    href: "/faq",
  },
];

export const resources: NavItem[] = [
  {
    key: "wcagGuide",
    href: "/resources/guides/wcag",
  },
  {
    key: "documentation",
    href: "/docs",
  },
  {
    key: "support",
    href: "/support",
  },
  {
    key: "blog",
    href: "/blog",
  },
];
