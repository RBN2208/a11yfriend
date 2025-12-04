import {defineRouting} from 'next-intl/routing';

export const alternateLinks: { [key: string]: string } = {
    "en-US": '/en',
    "de-DE": '/de',
    "de": '/de',
    "en": '/en',
    "x-default": '/en',
}

export const routing = defineRouting({
    // A list of all locales that are supported
    locales: ['en', 'de'],

    // Used when no locale matches
    defaultLocale: 'en',
    localePrefix: "always",
    localeDetection: true,
    alternateLinks: true
});
