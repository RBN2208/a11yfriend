import { pdf } from '@react-pdf/renderer';
import React from 'react';
import { ManualAudit } from '@/features/audit/manual/types/types';
import { ManualAuditPDFDocument } from './pdf-renderer';
import {getErrorOfUnknownError} from "@/shared/utils/client-utils";

export type PDFGenerationResult = {
    success: true;
    blob: Blob;
    filename: string;
} | {
    success: false;
    error: string;
};

/**
 * Generates a PDF for a ManualAudit.
 * The pdf() function from @react-pdf/renderer is already asynchronous.
 * @param audit The manual audit data to generate the PDF from
 * @returns Promise resolving to the generated PDF blob and filename, or an error
 */
export async function generateAuditPDF(audit: ManualAudit): Promise<PDFGenerationResult> {
    try {
        // Create the document element - cast to any to avoid type issues with @react-pdf/renderer
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const documentElement = React.createElement(ManualAuditPDFDocument, { audit }) as any;
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
 * @returns Promise resolving to true if successful, false otherwise
 */
export async function downloadAuditPDF(audit: ManualAudit): Promise<boolean> {
    const result = await generateAuditPDF(audit);

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
