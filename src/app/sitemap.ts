import type { MetadataRoute } from 'next';
import { locales, defaultLocale } from '@/i18n/routing';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://a11yfriend.dev';

/**
 * Generates a sitemap with all public routes for each supported locale.
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const publicRoutes = [
    '/',
    '/resources/guides/wcag',
  ];

  const entries: MetadataRoute.Sitemap = [];

  for (const route of publicRoutes) {
    const languages: Record<string, string> = {};
    for (const locale of locales) {
      languages[locale] = `${APP_URL}/${locale}${route === '/' ? '' : route}`;
    }

    entries.push({
      url: `${APP_URL}/${defaultLocale}${route === '/' ? '' : route}`,
      lastModified: new Date(),
      changeFrequency: route === '/' ? 'weekly' : 'monthly',
      priority: route === '/' ? 1.0 : 0.8,
      alternates: {
        languages,
      },
    });
  }

  return entries;
}
