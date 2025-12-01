/**
 * ManualAudit interface, represents an own table in the database.
 * {id} is primary key.
 * {user_id} is foreign key relating to
 * {created_at} and {updated_at} are Dates from Supabase.
 */
export interface ManualAudit {
  id: string;
  user_id: string;
  name: string;
  description: string;
  status: AuditStatus;
  conformance: 'A' | 'AA' | 'AAA';
  findings: AuditResult[];
  created_at: string;
  updated_at: string;
}

export type AuditStatus = 'pending' | 'running' | 'done';

export type AuditResult = {
  id: string
  name: string
  conformance: 'A' | 'AA' | 'AAA'
  referenceLink: string
  status: 'checked' | 'not_checked' | 'not_applicable' | 'failed'
  findings: TipTapContentType | null,
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

export type AuditResponse = {
  ok: boolean;
  errors?: {
    field: 'name' | 'description' | 'status' | 'customer' | 'project_name' | 'module' | 'version' | 'conformance' | 'miscellaneous' | 'root';
    errors: string[];
  }[];
  message?: string;
};
