import {Badge} from "@/shared/components/shadcn-components/ui/badge";
import {WcagCriterionId, WcagCriterionMeta} from "@/features/user-guides/wcag/config/types";
import {WCAG_CRITERIA_REGISTRY} from "@/features/user-guides/wcag/config/criteria";

export function getLevelColor(level: string): string {
    switch (level) {
        case "A":
            return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
        case "AA":
            return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
        case "AAA":
            return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
        default:
            return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
}

export function getPrincipleLabel(principle: string, locale: string): string {
    const labels: Record<string, Record<string, string>> = {
        perceivable: { de: "Wahrnehmbar", en: "Perceivable" },
        operable: { de: "Bedienbar", en: "Operable" },
        understandable: { de: "Verständlich", en: "Understandable" },
        robust: { de: "Robust", en: "Robust" },
    };
    return labels[principle]?.[locale] || principle;
}


export function getAllCriteria(): WcagCriterionMeta[] {
    return Object.values(WCAG_CRITERIA_REGISTRY);
}

export function getCriterionById(id: WcagCriterionId): WcagCriterionMeta | undefined {
    return WCAG_CRITERIA_REGISTRY[id];
}

export function getCriterionBySlug(slug: string): WcagCriterionMeta | undefined {
    return Object.values(WCAG_CRITERIA_REGISTRY).find((criterion) => criterion.slug === slug);
}
