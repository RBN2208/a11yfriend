import { getAllCriteria } from "@/features/user-guides/wcag/config/helper";
import { loadCriterionContent } from "@/features/user-guides/wcag/config/content-loader";
import { WcagCriteriaList } from "@/features/user-guides/wcag/components/WcagCriteriaList";
import type { WcagCriterionData, WcagCriterionMeta } from "@/features/user-guides/wcag/config/types";
import {getTranslations} from "next-intl/server";

interface PageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function WcagGuidesPage({ params }: PageProps) {
  const { locale } = await params;
  const allCriteria = getAllCriteria();
  const t = await getTranslations();

  const criteriaWithContent = await Promise.all(
      allCriteria.map(async (meta: WcagCriterionMeta) => {
        const content = await loadCriterionContent(meta, locale);
        return { meta, content } as WcagCriterionData;
      })
  );

  return (
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">
              WCAG 2.2 {t("criteria.common.successCriteria")}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
              {t("criteria.common.overviewTitle")}
          </p>
        </div>

        <WcagCriteriaList criteria={criteriaWithContent} locale={locale} />
      </div>
  );
}

