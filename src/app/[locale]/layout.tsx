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
import {setRequestLocale} from "next-intl/server";
import {routing} from "@/i18n/routing";
import {notFound} from "next/navigation";

export const metadata: Metadata = {
    title: "A11y Friend"
};

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

    return (
        <html lang="en" suppressHydrationWarning>
            <body>
                <ThemeProvider
                    defaultTheme="dark"
                    enableColorScheme
                    attribute="class"
                    disableTransitionOnChange
                >
                    <NextIntlClientProvider>
                        <Sheet>
                            <MobileMenu user={user}/>
                            <Header user={user}/>
                            <div className="p-4">
                                {children}
                            </div>
                            <Footer/>
                        </Sheet>
                        <Toaster position="top-center" richColors/>
                    </NextIntlClientProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
