import {useTranslations} from 'next-intl';

export default function Home() {
    const t = useTranslations('home');

    return (
        <main className="flex flex-col">
            <div className="h-[500px] flex items-center justify-center">
                <div className="max-w-2xl mx-auto text-center space-y-4 p-8">
                    <h1 className="text-4xl font-bold">{t('title')}</h1>
                    <p>{t('intro')}</p>
                </div>
            </div>
        </main>
    );
}
