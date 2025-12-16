import { pdf } from '@react-pdf/renderer';
import React from 'react';
import { ManualAuditPDFDocument } from './manual-audit-pdf-renderer';
import {getErrorOfUnknownError} from "@/shared/utils/client-utils";
import {ManualAuditPDFExportProps, PDFGenerationResult} from "@/shared/features/pdf-renderer/types/types";

/**
 * Generates a PDF for a ManualAudit.
 * The pdf() function from @react-pdf/renderer is already asynchronous.
 * @param audit The manual audit data to generate the PDF from
 * @param translations Translations for the PDF content
 * @returns Promise resolving to the generated PDF blob and filename, or an error
 */
export async function generateAuditPDF({audit, translations}: ManualAuditPDFExportProps): Promise<PDFGenerationResult> {
    try {
        // Create the document element - cast to any to avoid type issues with @react-pdf/renderer
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const documentElement = React.createElement(ManualAuditPDFDocument, { audit, translations }) as any;
        const blob = await pdf(documentElement).toBlob();

        const sanitizedName = audit.name.replace(/[^a-zA-Z0-9-_]/g, '_');
        const filename = `${sanitizedName}_audit_${new Date().toISOString().split('T')[0]}.pdf`;

        return {
            success: true,
            blob,
            filename,
        };
    } catch (error) {
        return {
            success: false,
            error: getErrorOfUnknownError(error, "Unknown error occurred")
        };
    }
}

/**
 * Generates and downloads a PDF for a ManualAudit.
 * @param audit The manual audit data to generate the PDF from
 * @param translations Translations for the PDF content
 * @returns Promise resolving to true if successful, false otherwise
 */
export async function downloadAuditPDF({audit, translations}: ManualAuditPDFExportProps): Promise<boolean> {
    const result = await generateAuditPDF({audit, translations});

    if (result.success) {
        // Create download link
        const url = URL.createObjectURL(result.blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = result.filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        return true;
    } else {
        console.error('PDF generation failed:', result.error);
        return false;
    }
}
