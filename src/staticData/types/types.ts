export type WCAGAuditFormType = {
    id: string,
    category: string
    guideLine: string
    name: string
    conformance: 'A' | 'AA' | 'AAA'
    referenceLink: string
    findings: string
    status: 'checked' | 'not_checked' | 'not_applicable'
}