export interface SupaBaseAudit {
  id: string
  name: string
  description?: string
  created_at: string
  updated_at?: string
  user_id: string
  status: 'draft' | 'in_progress' | 'completed'
  customer: string
  project_name: string
  module: string
  version: '2.0' | '2.1' | '2.2'
  conformance: 'A' | 'AA' | 'AAA'
  miscellaneous: string
  audit: WCAGAuditFormType[] | [],
  criteria_results: Record<string, Pick<WCAGAuditFormType, 'findings' | 'status'>>
}

export type WCAGAuditFormType = {
  id: string,
  category: string
  guideLine: string
  name: string
  level: 'A' | 'AA' | 'AAA'
  referenceLink: string
  findings: string
  status: 'checked' | 'not_checked' | 'not_applicable'
}
