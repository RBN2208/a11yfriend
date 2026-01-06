"use client"
import React, { useState } from 'react';
import {Button} from "@/shared/components/shadcn-components/ui/button";
import {Loader2, FileDown} from "lucide-react";
import {downloadAuditPDF} from "@/shared/features/pdf-renderer/generate-pdf";
import {PDFTranslations} from "@/shared/features/pdf-renderer/types/types";
import {useTranslations} from "next-intl";
import {AutomaticAudit} from "@/features/audit/automatic/types/types";

export default function ExportReportForm({report}: {report: AutomaticAudit | undefined}) {
  const [loadingPdf, setLoadingPdf] = useState(false);
  const t = useTranslations();

  const readableDate = report ? new Date(report.created_at).toLocaleDateString() : '';
  const pdfTranslations: PDFTranslations = {
    summary: t('audit.pdf.summary'),
    checked: t('audit.pdf.checked'),
    failed: t('audit.pdf.failed'),
    not_applicable: t('audit.pdf.not_applicable'),
    not_checked: t('audit.pdf.not_checked'),
    failedTests: t('audit.pdf.failedTests'),
    successTests: t('audit.pdf.successTests'),
    notApplicableTests: t('audit.pdf.notApplicableTests'),
    notCheckedTests: t('audit.pdf.notCheckedTests'),
    footerText: t('audit.pdf.footerText', { date: readableDate })
  }

  async function exportToPdf() {
    if (!report) return;
    setLoadingPdf(true);
    try {
      // TODO: const success = await downloadAuditPDF({audit: report, translations: pdfTranslations});
      const success = true;
      if (!success) {
        console.error('PDF export failed');
      }
    } catch (error) {
      console.error('PDF export failed:', error);
    } finally {
      setLoadingPdf(false);
    }
  }

  return (
      <>
        <div className="flex gap-4 mt-4">
          <Button
            disabled={loadingPdf || !report}
            onClick={exportToPdf}
            className="w-full"
          >
            {loadingPdf && <Loader2 className="animate-spin mr-2"/>}

            <FileDown className="mr-2 h-4 w-4" />

            {loadingPdf ?
                t('audit.export.generateFormat', {format: "PDF"}) :
                t("audit.export.exportToFormat", {format: "PDF"})
            }
          </Button>
        </div>
      </>
  )
}
