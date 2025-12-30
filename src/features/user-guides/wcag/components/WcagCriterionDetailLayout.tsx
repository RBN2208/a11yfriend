import type {ComponentType} from "react";
import {Badge} from "@/shared/components/shadcn-components/ui/badge";
import {Separator} from "@/shared/components/shadcn-components/ui/separator";
import type {WcagCriterionMeta, WcagCriterionContent} from "../config/types";
import Link from "next/link";
import {ExternalLink} from "lucide-react";
import {getLevelColor, getPrincipleLabel} from "@/features/user-guides/wcag/config/helper";
import {useTranslations} from "next-intl";
import {Card, CardContent, CardHeader, CardTitle} from "@/shared/components/shadcn-components/ui/card";
import {Button} from "@/shared/components/shadcn-components/ui/button";

interface WcagCriterionDetailLayoutProps {
    meta: WcagCriterionMeta;
    content: WcagCriterionContent;
    locale: string;
    ExampleComponent?: ComponentType<{ locale: string }> | null;
}

export function WcagCriterionDetailLayout({meta, content, locale, ExampleComponent}: WcagCriterionDetailLayoutProps) {
    const isGerman = locale === "de";
    const t = useTranslations();

    return (
        <div className="container mx-auto px-4 py-8 max-w-5xl">
            <div className="mb-8">
                <CriterionBadgeContainer
                    meta={meta}
                    locale={locale}
                />

                <CriterionDetailStage
                    content={content}
                    meta={meta}
                    t={t}
                />

                <CriterionSummary
                    content={content}
                    label={t('criteria.common.summary')}
                />
            </div>

            <Separator className="my-8"/>

            <CriterionMoreAndFurtherReading meta={meta} t={t}/>

            {ExampleComponent && (
                <>
                    <Separator className="my-8"/>
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold mb-6">
                            {t('criteria.common.examples')}
                        </h2>
                        <ExampleComponent locale={locale}/>
                    </div>
                </>
            )}

            {/* Placeholder while under construction */}
            {!ExampleComponent && (
                <div className="bg-muted p-6 rounded-lg text-center">
                    <p className="text-muted-foreground">
                        {isGerman
                            ? "Beispiele und Best Practices folgen in Kürze."
                            : "Examples and best practices coming soon."}
                    </p>
                </div>
            )}
        </div>
    );
}


function CriterionBadgeContainer({meta, locale}: { meta: WcagCriterionMeta, locale: string }) {
    return (
        <div className="flex items-center gap-3 mb-4 flex-wrap">
        <span className="text-lg font-mono text-muted-foreground">
          {meta.number}
        </span>
            <Badge className={getLevelColor(meta.level)} variant="secondary">
                Level {meta.level}
            </Badge>
            <Badge variant="outline">
                {getPrincipleLabel(meta.principle, locale)}
            </Badge>
            <Badge variant="outline">
                WCAG {meta.wcagVersion}
            </Badge>
        </div>
    )
}

function CriterionDetailStage({content, meta, t}: { content: WcagCriterionContent, meta: WcagCriterionMeta, t: ReturnType<typeof useTranslations> }) {
    return (
        <section className="mb-8">
            <h1 className="text-4xl font-bold mb-4">
                {content.title}
            </h1>

            <p className="text-xl text-muted-foreground mb-6">
                {content.shortDescription}
            </p>

            {content.longDescription && (
                <p className="text-lg leading-relaxed mb-6">
                    {content.longDescription}
                </p>
            )}

            {meta.tags && meta.tags.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold mb-2 text-muted-foreground">
                    {t('criteria.common.topics')}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {meta.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                    ))}
                  </div>
                </div>
            )}
        </section>
    )
}

function CriterionSummary({content, label}: { content: WcagCriterionContent, label: string }) {
    return (
        <>
            {content.summaryBullets && content.summaryBullets.length > 0 && (
                <div className="bg-muted p-6 rounded-lg">
                    <h2 className="text-lg font-semibold mb-3">
                        {label}
                    </h2>
                    <ul className="space-y-2">
                        {content.summaryBullets.map((bullet, index) => (
                            <li key={index} className="flex items-start gap-2">
                                <span className="text-primary mt-1">•</span>
                                <span>{bullet}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    )
}

function CriterionMoreAndFurtherReading({meta, t}: { meta: WcagCriterionMeta, t: ReturnType<typeof useTranslations> }) {
    return (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>
              <h2 className="text-2xl font-bold">
                  {t('criteria.common.moreInfo')}
              </h2>
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
              <div>
                  <h3 className="text-sm font-semibold mb-2 text-muted-foreground">
                      {t('criteria.common.officialDocumentation')}
                  </h3>
                <Button asChild variant="outline" >
                  <Link
                      href={meta.officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-primary hover:underline"
                  >
                      {t('criteria.common.moreAboutCriteria', {criteria: meta.number})}
                      <ExternalLink className="h-4 w-4"/>
                  </Link>
                </Button>
              </div>
          </CardContent>
        </Card>
    )
}

