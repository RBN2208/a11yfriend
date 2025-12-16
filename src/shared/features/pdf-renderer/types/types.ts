import {ManualAudit} from "@/features/audit";

export type PDFTranslations = {
    summary: string
    checked: string
    failed: string
    not_applicable: string
    not_checked: string
    failedTests: string
    successTests: string
    notApplicableTests: string
    notCheckedTests: string
    footerText: string
}

export type ManualAuditPDFExportProps = {
    audit: ManualAudit;
    translations: PDFTranslations
}

export type PDFGenerationResult = {
    success: true;
    blob: Blob;
    filename: string;
} | {
    success: false;
    error: string;
};