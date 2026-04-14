import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';

export default function ErrorPage() {
  const t = useTranslations('error');

  return (
    <div role="alert" className="flex flex-col items-center justify-center gap-4 py-16">
      <h1 className="text-2xl font-bold">{t('title')}</h1>
      <p className="text-muted-foreground">{t('description')}</p>
      <Link
        href="/"
        className="mt-4 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring"
      >
        {t('backToHome')}
      </Link>
    </div>
  );
}
