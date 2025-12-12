'use client';

import {Popover, PopoverContent, PopoverTrigger} from "@/shared/components/shadcn-components/ui/popover";
import {Languages} from "lucide-react";
import {Button} from "@/shared/components/shadcn-components/ui/button";
import {useLocale, useTranslations} from "next-intl";
import Image from 'next/image'
import Link from "next/link";
import {usePathname} from "@/i18n/navigation";

export default function LangToggle({showLabel}: { showLabel?: boolean }) {
    const t = useTranslations();
    const pathname = usePathname();
    const currentLocale = useLocale();
    const getLocalizedPath = (newLocale: string) => {
        const pathWithoutLocale = pathname.replace(`/${currentLocale}`, '') || '/';
        return `/${newLocale}${pathWithoutLocale}`;
    };

    const languages = [
        {
            label: t('lang.english'),
            text: "EN",
            locale: "en",
            imgSrc: "/en.png"
        },
        {
            label: t('lang.german'),
            text: "DE",
            locale: "de",
            imgSrc: "/de.png"
        }
    ]

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline"
                        size={showLabel ? "default" : "icon"}
                        title={t('ui.languageToggle')}
                >
                    <Languages/> {showLabel && t('ui.languageToggle')}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-max flex flex-col gap-4">
                {languages.map(lang => {
                    return (
                        <Button variant="link"
                                asChild
                                key={lang.locale}
                                title={lang.label}
                                aria-label={lang.label}
                        >
                            <Link href={getLocalizedPath(lang.locale)}>
                                <Image src={lang.imgSrc}
                                       alt=""
                                       width={20}
                                       height={30}
                                /> {lang.text}
                            </Link>
                        </Button>
                    )
                })}
            </PopoverContent>
        </Popover>
    )
}
