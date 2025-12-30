import type { WcagCriterionContent } from "../../../config/types";

export const content: WcagCriterionContent = {
  title: "Non-text Content",
  shortDescription: "All non-text content must have a text alternative.",
  longDescription:
    "All non-text content that is presented to the user must have a text alternative that serves the equivalent purpose. This includes images, icons, buttons, form controls, audio, video, and other non-text elements. Text alternatives enable content to be rendered in different formats such as large print, braille, speech, symbols, or simpler language.",
  summaryBullets: [
    "Images require meaningful alt text",
    "Decorative images should have empty alt attributes",
    "Form controls need accessible labels",
    "CAPTCHAs must provide alternative formats",
  ],
};

