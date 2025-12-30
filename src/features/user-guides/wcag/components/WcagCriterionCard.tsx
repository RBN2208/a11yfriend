import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/shadcn-components/ui/card";
import { Badge } from "@/shared/components/shadcn-components/ui/badge";
import type { WcagCriterionMeta, WcagCriterionContent } from "../config/types";
import {Link} from "@/i18n/navigation";
import {getLevelColor, getPrincipleLabel} from "@/features/user-guides/wcag/config/helper";
import {TypographyH3} from "@/shared/components/typography/typography-elements";

interface WcagCriterionCardProps {
  meta: WcagCriterionMeta;
  content: WcagCriterionContent;
  locale: string;
}

export function WcagCriterionCard({ meta, content, locale }: WcagCriterionCardProps) {
  const href = `/resources/guides/wcag/${meta.slug}`;

  const principleLabel = getPrincipleLabel(meta.principle, locale);

  return (
    <Card className="h-full hover:shadow-lg relative hover:cursor-pointer hover:scale-[1.02] transition duration-200">
      <CardHeader>
        <div className="flex items-start justify-between gap-4 mb-2">
          <div className="space-y-1 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-mono text-muted-foreground">
                {meta.number}
              </span>
              <Badge className={getLevelColor(meta.level)} variant="secondary">
                Level {meta.level}
              </Badge>
            </div>
              <CardTitle className="text-xl">
                <TypographyH3>
                  <Link href={href} className="block after:absolute after:top-0 after:bottom-0 after:left-0 after:right-0">
                    {content.title}
                  </Link>
                </TypographyH3>
              </CardTitle>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>
            {principleLabel}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base">
          {content.shortDescription}
        </CardDescription>
      </CardContent>
    </Card>
  );
}

