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
  auditResults: AuditResult[]
}

export type AuditResult = {
  id: string
  name: string
  conformance: 'A' | 'AA' | 'AAA'
  status: 'checked' | 'not_checked' | 'not_applicable' | 'failed'
  findings: TipTapContentType | null
}

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

type TipTapContentType = {
  type: string,
  content: TipTapContentType[],
  text?: string,
  marks?: {
    type: string
  }[],
  attrs?: {
    level: number
  } | {}
}
