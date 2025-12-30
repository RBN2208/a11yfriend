import type { WcagCriterionContent } from "../../../config/types";

export const content: WcagCriterionContent = {
  title: "Nicht-Text-Inhalte",
  shortDescription: "Alle Nicht-Text-Inhalte müssen eine Textalternative haben.",
  longDescription:
    "Alle Nicht-Text-Inhalte, die dem Benutzer präsentiert werden, müssen eine Textalternative haben, die denselben Zweck erfüllt. Dies umfasst Bilder, Icons, Schaltflächen, Formularelemente, Audio, Video und andere Nicht-Text-Elemente. Textalternativen ermöglichen es, Inhalte in verschiedenen Formaten darzustellen, wie z.B. Großdruck, Braille, Sprache, Symbole oder einfachere Sprache.",
  summaryBullets: [
    "Bilder benötigen aussagekräftigen Alternativtext",
    "Dekorative Bilder sollten leere Alt-Attribute haben",
    "Formularelemente benötigen zugängliche Beschriftungen",
    "CAPTCHAs müssen alternative Formate bereitstellen",
  ],
};

