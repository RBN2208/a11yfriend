export type WcagVersion = "2.2";

export type WcagLevel = "A" | "AA" | "AAA";

export type WcagPrinciple = "perceivable" | "operable" | "understandable" | "robust";

export type WcagCriterionId = string; // example: "1-1-1-non-text-content"

export interface WcagCriterionMeta {
  id: WcagCriterionId;
  number: string; // "1.1.1"
  slug: string; // "1-1-1-non-text-content"
  level: WcagLevel;
  principle: WcagPrinciple;
  wcagVersion: WcagVersion;
  shortNameKey: string;
  officialUrl: string;
  tags: string[];
}

export interface WcagCriterionContent {
  title: string;
  shortDescription: string;
  longDescription?: string;
  summaryBullets?: string[];
}

export type WcagCriteriaRegistry = Record<WcagCriterionId, WcagCriterionMeta>;

export interface WcagCriterionData {
  meta: WcagCriterionMeta;
  content: WcagCriterionContent;
}

