import type { WcagCriterionData } from "../config/types";
import { WcagCriterionCard } from "./WcagCriterionCard";

interface WcagCriteriaListProps {
  criteria: WcagCriterionData[];
  locale: string;
}

export function WcagCriteriaList({ criteria, locale }: WcagCriteriaListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {criteria.map((criterion) => (
        <WcagCriterionCard
          key={criterion.meta.id}
          meta={criterion.meta}
          content={criterion.content}
          locale={locale}
        />
      ))}
    </div>
  );
}

