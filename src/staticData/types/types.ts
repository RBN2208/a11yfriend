export type CriteriaDefinition = {
    id: string,
    name: string
    category: "Perceivable" | "Operable" | "Understandable" | "Robust"
    guideLine: string
    conformance: 'A' | 'AA' | 'AAA'
    referenceLink: string,
    userGuide: {
        description: string
    }
}
