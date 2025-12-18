export type CriteriaDefinition = {
    id: string,
    name: string
    category: "Perceivable" | "Operable" | "Understandable" | "Robust"
    guideLine: string
    conformance: 'A' | 'AA' | 'AAA'
    referenceLink: string
}

export type WcagTag =
    | 'images'
    | 'audio'
    | 'video'
    | 'captions'
    | 'audio-description'
    | 'forms'
    | 'keyboard'
    | 'navigation'
    | 'focus'
    | 'timing'
    | 'seizures'
    | 'skip-navigation'
    | 'headings'
    | 'labels'
    | 'link-purpose'
    | 'language'
    | 'predictable'
    | 'input-assistance'
    | 'error-prevention'
    | 'parsing'
    | 'name-role-value'
    | 'status-messages'
    | 'contrast'
    | 'text-spacing'
    | 'reflow'
    | 'non-text-contrast'
    | 'text-resize'
    | 'screenreader'
    | 'aria'
    | 'color';
