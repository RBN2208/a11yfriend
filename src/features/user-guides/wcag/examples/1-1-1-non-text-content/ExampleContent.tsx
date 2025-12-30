import React from "react";
import {Card, CardContent, CardHeader, CardTitle} from "@/shared/components/shadcn-components/ui/card";
import {TypographyH2, TypographyH3} from "@/shared/components/typography/typography-elements";

interface ExampleContentProps {
    locale: string;
}

// Content translations for multiple languages
// to dont overload next-intl translations, each criteria-example comes with its own translations
const content = {
    de: {
        bestPractices: "Best Practices",
        informativeImages: {
            title: "1. Informative Bilder",
            description: "Bilder, die Informationen vermitteln, benötigen einen aussagekräftigen Alt-Text, der den Inhalt beschreibt.",
            goodLabel: "✅ Gut:",
            badLabel: "❌ Schlecht:",
            goodExample: "Balkendiagramm zeigt Umsatzwachstum von 20% im Jahr 2024",
            badExample: "Diagramm",
        },
        decorativeImages: {
            title: "2. Dekorative Bilder",
            description: "Bilder, die rein dekorativ sind und keine Information vermitteln, sollten ein leeres Alt-Attribut haben.",
            goodLabel: "✅ Gut:",
            note: "Hinweis: Das Alt-Attribut muss vorhanden sein, aber leer bleiben.",
        },
        functionalImages: {
            title: "3. Funktionale Bilder",
            description: "Bilder in Links oder Buttons beschreiben die Funktion, nicht das Aussehen.",
            goodLabel: "✅ Gut:",
            badLabel: "❌ Schlecht:",
            goodExample: "Suchen",
            badExample: "Lupen-Symbol",
        },
        complexGraphics: {
            title: "4. Komplexe Grafiken",
            description: "Komplexe Grafiken benötigen sowohl einen kurzen Alt-Text als auch eine ausführliche Beschreibung.",
            goodLabel: "✅ Gut:",
            goodExample: "Organigramm der Unternehmensstruktur",
            captionText: "Detaillierte Beschreibung: Das Organigramm zeigt...",
        },
        iconsWithText: {
            title: "5. Icons mit Text",
            description: "Wenn Icons zusammen mit Text erscheinen, können sie als dekorativ markiert werden.",
            goodLabel: "✅ Gut:",
            buttonText: "Herunterladen",
        },
        commonMistakes: {
            title: "Häufige Fehler vermeiden",
            mistakes: [
                "Verwenden Sie nicht 'Bild von...' oder 'Grafik von...' - der Kontext ist bereits klar",
                "Vermeiden Sie Dateinamen als Alt-Text (z.B. 'IMG_1234.jpg')",
                "Halten Sie Alt-Texte prägnant (idealerweise unter 125 Zeichen)",
                "Lassen Sie das Alt-Attribut niemals weg - nutzen Sie alt='' für dekorative Bilder",
            ],
        },
        testingTips: {
            title: "Testing-Tipps",
            screenReader: {
                label: "Screenreader-Test:",
                text: "Nutzen Sie NVDA (Windows) oder VoiceOver (Mac) um zu testen, wie Ihre Alt-Texte vorgelesen werden",
            },
            browserInspector: {
                label: "Browser-Inspektor:",
                text: "Überprüfen Sie im Element-Inspektor, ob alle Bilder ein Alt-Attribut haben",
            },
            automatedTools: {
                label: "Automatisierte Tools:",
                text: "Tools wie axe DevTools oder Lighthouse können fehlende Alt-Attribute erkennen",
            },
        },
    },
    en: {
        bestPractices: "Best Practices",
        informativeImages: {
            title: "1. Informative Images",
            description: "Images that convey information need meaningful alt text that describes the content.",
            goodLabel: "✅ Good:",
            badLabel: "❌ Bad:",
            goodExample: "Bar chart showing 20% revenue growth in 2024",
            badExample: "chart",
        },
        decorativeImages: {
            title: "2. Decorative Images",
            description: "Images that are purely decorative and convey no information should have an empty alt attribute.",
            goodLabel: "✅ Good:",
            note: "Note: The alt attribute must be present but remain empty.",
        },
        functionalImages: {
            title: "3. Functional Images",
            description: "Images in links or buttons describe the function, not the appearance.",
            goodLabel: "✅ Good:",
            badLabel: "❌ Bad:",
            goodExample: "Search",
            badExample: "Magnifying glass icon",
        },
        complexGraphics: {
            title: "4. Complex Graphics",
            description: "Complex graphics need both a short alt text and a detailed description.",
            goodLabel: "✅ Good:",
            goodExample: "Company organizational chart",
            captionText: "Detailed description: The organizational chart shows...",
        },
        iconsWithText: {
            title: "5. Icons with Text",
            description: "When icons appear together with text, they can be marked as decorative.",
            goodLabel: "✅ Good:",
            buttonText: "Download",
        },
        commonMistakes: {
            title: "Avoiding Common Mistakes",
            mistakes: [
                "Don't use 'Image of...' or 'Picture of...' - the context is already clear",
                "Avoid filenames as alt text (e.g., 'IMG_1234.jpg')",
                "Keep alt text concise (ideally under 125 characters)",
                "Never omit the alt attribute - use alt='' for decorative images",
            ],
        },
        testingTips: {
            title: "Testing Tips",
            screenReader: {
                label: "Screen reader test:",
                text: "Use NVDA (Windows) or VoiceOver (Mac) to test how your alt texts are read aloud",
            },
            browserInspector: {
                label: "Browser inspector:",
                text: "Check in the element inspector if all images have an alt attribute",
            },
            automatedTools: {
                label: "Automated tools:",
                text: "Tools like axe DevTools or Lighthouse can detect missing alt attributes",
            },
        },
    },
} as const;

type Locale = keyof typeof content;

export default function ExampleContent({locale}: ExampleContentProps) {
    const currentLocale = (locale in content ? locale : "en") as Locale;
    const t = content[currentLocale];

    return (
        <div className="space-y-8">
            <TypographyH3 className="mb-4">
              {t.bestPractices}
            </TypographyH3>
            <ExampleSection
                title={t.informativeImages.title}
                size="h4"
                subTitle={t.informativeImages.description}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted p-4 rounded-lg">
                    <ImageWithCodeExample title={t.informativeImages.goodLabel}
                                          src="/user-guide/1-1-1-non-text-content-example-1.jpg"
                    >
                <pre className="bg-gray-100 mt-2 p-3 rounded overflow-x-auto">
                  <code>
                    {`<img 
  src="/path/to/image" 
  alt="${t.informativeImages.goodExample}"
/>`}
                  </code>
                </pre>
                    </ImageWithCodeExample>
                    <ImageWithCodeExample title={t.informativeImages.badLabel}
                                          src="/user-guide/1-1-1-non-text-content-example-1.jpg">
                <pre className="bg-gray-100 mt-2 p-3 rounded overflow-x-auto">
                  <code>
                    {`<img 
  src="/path/to/image" 
  alt="${t.informativeImages.badExample}"
/>`}
                  </code>
                </pre>
                    </ImageWithCodeExample>
                </div>
            </ExampleSection>

            <ExampleSection
                title={t.decorativeImages.title}
                size="h4"
                subTitle={t.decorativeImages.description}
            >
                <div className="bg-muted p-4 rounded-lg">
                    <p className="font-mono text-sm mb-2">
                        {t.decorativeImages.goodLabel}
                    </p>
                    <pre className="bg-background p-3 rounded overflow-x-auto">
              <code>{`<img src="decorative-border.png" alt="" />`}</code>
            </pre>
                    <p className="text-sm text-muted-foreground mt-2">
                        {t.decorativeImages.note}
                    </p>
                </div>
            </ExampleSection>

            <ExampleSection
                title={t.functionalImages.title}
                size="h4"
                subTitle={t.functionalImages.description}
            >
                <div className="bg-muted p-4 rounded-lg">
                    <p className="font-mono text-sm mb-2">
                        {t.functionalImages.goodLabel}
                    </p>
                    <pre className="bg-background p-3 rounded overflow-x-auto">
                <code>
                  {`<button><img src="search-icon.svg" alt="${t.functionalImages.goodExample}" /></button>`}
                </code>
              </pre>
                    <p className="font-mono text-sm mt-4 mb-2">
                        {t.functionalImages.badLabel}
                    </p>
                    <pre className="bg-background p-3 rounded overflow-x-auto">
                <code>
                  {`<button><img src="search-icon.svg" alt="${t.functionalImages.badExample}" /></button>`}
                </code>
              </pre>
                </div>
            </ExampleSection>

            <ExampleSection
                title={t.complexGraphics.title}
                size="h4"
                subTitle={t.complexGraphics.description}
            >
                <div className="bg-muted p-4 rounded-lg">
                    <p className="font-mono text-sm mb-2">
                        {t.complexGraphics.goodLabel}
                    </p>
                    <pre className="bg-background p-3 rounded overflow-x-auto">
                <code>
                  {`<figure>
   <img src="complex-chart.png" alt="${t.complexGraphics.goodExample}" />
   <figcaption>
     ${t.complexGraphics.captionText}
   </figcaption>
</figure>
`}
                </code>
              </pre>
                </div>
            </ExampleSection>

            <ExampleSection
                title={t.iconsWithText.title}
                size="h4"
                subTitle={t.iconsWithText.description}
            >
                <div className="bg-muted p-4 rounded-lg">
                    <p className="font-mono text-sm mb-2">
                        {t.iconsWithText.goodLabel}
                    </p>
                    <pre className="bg-background p-3 rounded overflow-x-auto">
                <code>
                  {`<button><img src="download-icon.svg" alt="" />${t.iconsWithText.buttonText}</button>`}
                </code>
              </pre>
                </div>
            </ExampleSection>


            <ExampleSection title={t.commonMistakes.title}>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    {t.commonMistakes.mistakes.map((mistake, index) => (
                        <li key={index}>{mistake}</li>
                    ))}
                </ul>
            </ExampleSection>

            <ExampleSection title={t.testingTips.title}>
                <div className="bg-muted p-4 rounded-lg">
                    <ul className="space-y-2">
                        <li>
                            <strong>{t.testingTips.screenReader.label}</strong>{" "}
                            {t.testingTips.screenReader.text}
                        </li>
                        <li>
                            <strong>{t.testingTips.browserInspector.label}</strong>{" "}
                            {t.testingTips.browserInspector.text}
                        </li>
                        <li>
                            <strong>{t.testingTips.automatedTools.label}</strong>{" "}
                            {t.testingTips.automatedTools.text}
                        </li>
                    </ul>
                </div>
            </ExampleSection>
        </div>
    );
};

function ImageWithCodeExample({src, title, children}: { src: string, title: string, children: React.ReactNode }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <figure>
                    <img className="w-full" src={src} alt=""/>
                    <figcaption>
                        {children}
                    </figcaption>
                </figure>
            </CardContent>
        </Card>
    )
}

type ExampleSectionProps = {
    title: string,
    size?: "h2" | "h3" | "h4"
    subTitle?: string,
    children: React.ReactNode
}

function ExampleSection({title, size = "h3", subTitle, children}: ExampleSectionProps) {
    const Heading = size;

    return (
        <div>
            <Heading className="text-xl font-semibold mb-2">
                {title}
            </Heading>
            <p className="text-muted-foreground mb-3">
                {subTitle}
            </p>
            {children}
        </div>
    )
}