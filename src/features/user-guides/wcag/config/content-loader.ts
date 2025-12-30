import {WcagCriterionMeta, WcagCriterionContent, WcagCriterionData} from "./types";
import { ComponentType } from "react";

/**
 * Load localized content for a criterion
 * returns undefined if no content exists for the requested locale
 */
export async function loadCriterionContent(meta: WcagCriterionMeta, locale: string): Promise<WcagCriterionContent | undefined> {
  try {
    // Try to load the requested locale
    const contentModule = await import(
      `../examples/${meta.id}/translations/${locale}.ts`
    );
    return contentModule.content;
  } catch (error) {
    return undefined
  }
}

/**
 * Load example component for a criterion
 * Returns null if no example component exists
 */
export async function loadExampleComponent(meta: WcagCriterionMeta, locale: string): Promise<ComponentType<{ locale: string }> | null> {
  try {
    const componentModule = await import(
      `../examples/${meta.id}/ExampleContent.tsx`
    );
    return componentModule.default;
  } catch (error) {
    return null;
  }
}

