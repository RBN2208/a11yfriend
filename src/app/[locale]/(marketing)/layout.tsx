import type {Metadata} from "next";
import {hasLocale} from "next-intl";
import {setRequestLocale} from "next-intl/server";
import {routing} from "@/i18n/routing";
import {notFound} from "next/navigation";
import BreadCrumbs from "@/shared/components/navigation/BreadCrumbs";

export const metadata: Metadata = {
    title: "A11y Friend",
    description: "Seemingly easy accessibility audits for the web.",
};

type Props = {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}
export default async function RootLayout({children, params}: Props) {
    const {locale} = await params;

    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    // Enable static rendering
    setRequestLocale(locale);

    return (
        <main className="flex gap-4 flex-col">
            <BreadCrumbs />
            {children}
        </main>
    );
}
