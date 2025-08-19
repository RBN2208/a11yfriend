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
  images: DragAndDropImageFile[] | []
}

export type AuditResult = {
  id: string
  name: string
  conformance: 'A' | 'AA' | 'AAA'
  referenceLink: string
  status: 'checked' | 'not_checked' | 'not_applicable' | 'failed'
  findings: TipTapContentType | null,
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


export type DragAndDropImageFile = {
  id: string;
  name: string;
  preview: string;
  file?: File;
  uploadStatus?: 'idle' | 'uploading' | 'success' | 'error';
};

export type AuditResponse = {
  ok: boolean;
  errors?: {
    field: 'name' | 'description' | 'status' | 'customer' | 'project_name' | 'module' | 'version' | 'conformance' | 'miscellaneous' | 'root';
    errors: string[];
  }[];
  message?: string;
};
