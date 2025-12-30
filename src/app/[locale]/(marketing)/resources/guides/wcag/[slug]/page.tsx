import { notFound } from "next/navigation";
import { getAllCriteria, getCriterionBySlug } from "@/features/user-guides/wcag/config/helper";
import { loadCriterionContent, loadExampleComponent } from "@/features/user-guides/wcag/config/content-loader";
import { WcagCriterionDetailLayout } from "@/features/user-guides/wcag/components/WcagCriterionDetailLayout";

interface PageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const allCriteria = getAllCriteria();
  const locales = ["de", "en"];

  return allCriteria.flatMap((criterion) =>
      locales.map((locale) => ({
        locale,
        slug: criterion.slug,
      }))
  );
}

export default async function WcagCriterionDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;

  const meta = getCriterionBySlug(slug);

  if (!meta) {
    notFound();
  }

  const content = await loadCriterionContent(meta, locale);
  const ExampleComponent = await loadExampleComponent(meta, locale);

  if (content === undefined) notFound();

  return (
      <WcagCriterionDetailLayout
          meta={meta}
          content={content}
          locale={locale}
          ExampleComponent={ExampleComponent}
      />
  );
}

