import { redirect } from '@/i18n/navigation'

type Props = {
  params: Promise<{ locale: string }>;
};

/**
 * bug in next-intl?
 * if used without explicit locale like "redirect('/account/overview')"
 * it will redirect to "http://localhost:3000/undefinedundefined"
 * @param params
 * @constructor
 */
export default async function AccountPage({ params }: Props) {
  const { locale } = await params;
  redirect({ href: '/account/overview', locale });
}
