import {defineRouting} from 'next-intl/routing';

/** All supported locales – single source of truth */
export const locales = ['en', 'de'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const alternateLinks: { [key: string]: string } = {
    "en-US": '/en',
    "de-DE": '/de',
    "de": '/de',
    "en": '/en',
    "x-default": '/en',
}

/** Regex pattern matching any supported locale prefix (e.g. /en or /de) */
export const localePattern = locales.join('|');

export const routing = defineRouting({
    locales,
    defaultLocale,
    localePrefix: "always",
    localeDetection: true,
    alternateLinks: true
});
