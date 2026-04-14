import type { MetadataRoute } from 'next';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://a11yfriend.dev';

/**
 * Generates robots.txt configuration.
 * Allows all crawlers on public routes, disallows private/account routes.
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/account/', '/api/'],
      },
    ],
    sitemap: `${APP_URL}/sitemap.xml`,
  };
}
