/**
 * Automatic interface, represents an own table in the database.
 * {id} is primary key.
 * {user_id} is foreign key relating to
 * {created_at} and {updated_at} are Dates from Supabase.
 */
export interface AutomaticAudit {
  id: string;
  user_id: string;
  name: string;
  description: string;
  urls: { url: string }[];
  findings: AuditResult[];
  created_at: string;
  updated_at: string;
}


/**
 * TODO: implement and add description
 */
export type AuditResult = {
  summary: AutomaticAuditSummary | null,
  axe_results: AutomaticAuditAxeResults | null,
  lighthouse_results: AutomaticAuditLighthouseResults | null,
  created_at: string
}

export type AutomaticAuditSummary = {};
export type AutomaticAuditAxeResults = {};
export type AutomaticAuditLighthouseResults = {}