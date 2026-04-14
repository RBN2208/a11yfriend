import type {Metadata} from "next";
import "./globals.css";
import Header from '@/shared/components/common/header/Header';
import Footer from '@/shared/components/common/Footer';
import {ThemeProvider} from '@/shared/components/ThemeProvider';
import {MobileMenu} from '@/shared/components/common/header/MobileMenu';
import {Sheet} from '@/shared/components/shadcn-components/ui/sheet';
import {createServerSupabase} from '@/shared/supabase/server';
import {Toaster} from '@/shared/components/shadcn-components/ui/sonner';
import {hasLocale, NextIntlClientProvider} from "next-intl";
import {getTranslations, setRequestLocale} from "next-intl/server";
import {routing} from "@/i18n/routing";
import {notFound} from "next/navigation";
import {SkipLink} from "@/shared/components/common/SkipLink";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://a11yfriend.dev';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
    const {locale} = await params;
    const alternateLanguages: Record<string, string> = {};
    for (const loc of routing.locales) {
        alternateLanguages[loc] = `${APP_URL}/${loc}`;
    }

    return {
        title: {
            default: 'A11y Friend – Accessibility Auditing Tool',
            template: '%s | A11y Friend',
        },
        description: 'A11y Friend helps you audit websites for WCAG accessibility compliance with automated and manual testing tools.',
        metadataBase: new URL(APP_URL),
        alternates: {
            canonical: `${APP_URL}/${locale}`,
            languages: alternateLanguages,
        },
        openGraph: {
            title: 'A11y Friend – Accessibility Auditing Tool',
            description: 'Audit websites for WCAG accessibility compliance with automated and manual testing tools.',
            url: `${APP_URL}/${locale}`,
            siteName: 'A11y Friend',
            locale: locale === 'de' ? 'de_DE' : 'en_US',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: 'A11y Friend – Accessibility Auditing Tool',
            description: 'Audit websites for WCAG accessibility compliance.',
        },
        robots: {
            index: true,
            follow: true,
        },
    };
}

type Props = {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}

export default async function RootLayout({children, params}: Props) {
    const supabase = await createServerSupabase();
    const {data: {user}} = await supabase.auth.getUser();

    const {locale} = await params;

    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    // Enable static rendering
    setRequestLocale(locale);

    const t = await getTranslations('a11y');

    return (
        <html lang={locale} suppressHydrationWarning>
            <body>
                <ThemeProvider
                    defaultTheme="dark"
                    enableColorScheme
                    attribute="class"
                    disableTransitionOnChange
                >
                    <NextIntlClientProvider>
                        <Sheet>
                            <SkipLink label={t('skipToContent')} targetId="main-content" />
                            <MobileMenu user={user}/>
                            <Header user={user}/>
                            <main id="main-content" className="p-4">
                                {children}
                            </main>
                            <Footer/>
                        </Sheet>
                        <Toaster position="top-center" richColors/>
                    </NextIntlClientProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
