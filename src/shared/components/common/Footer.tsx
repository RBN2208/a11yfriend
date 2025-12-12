import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import Logo from '@/shared/components/Logo';
import { Separator } from '@/shared/components/shadcn-components/ui/separator';

// TODO: Create page components for links
// - /privacy (Datenschutz)
// - /terms (Nutzungsbedingungen / AGB)
// - /imprint (Impressum)
// - /contact (Kontakt)
// - /about (Über uns)
// - /faq (FAQ / Hilfe)
// - /accessibility (Barrierefreiheitserklärung)

export default function Footer() {
  const t = useTranslations();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/40">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Logo />
            <p className="mt-4 text-sm text-muted-foreground">
              {t('footer.description')}
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">
              {t('footer.product')}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/features" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t('footer.features')}
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t('footer.pricing')}
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t('footer.faq')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">
              {t('footer.company')}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t('footer.about')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t('footer.contact')}
                </Link>
              </li>
              <li>
                <Link href="/imprint" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t('footer.imprint')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">
              {t('footer.legal')}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t('footer.privacy')}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t('footer.terms')}
                </Link>
              </li>
              <li>
                <Link href="/accessibility" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t('footer.accessibility')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>{t('footer.copyright', { year: currentYear })}</p>
          <p className="mt-2 md:mt-0">
            {t('footer.madeWith')}
          </p>
        </div>
      </div>
    </footer>
  );
}
