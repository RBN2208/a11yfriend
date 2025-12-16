"use client"
import React, { useState } from 'react';
import {ManualAudit} from "@/features/audit/manual/types/types";
import {TypographyP} from "@/shared/components/typography/typography-elements";
import {Button} from "@/shared/components/shadcn-components/ui/button";
import {Loader2, FileDown} from "lucide-react";
import {downloadAuditPDF} from "@/shared/features/pdf-renderer/generate-pdf";

export default function ExportAuditForm({auditData}: {auditData: ManualAudit | undefined}) {
  const [loadingPdf, setLoadingPdf] = useState(false);

  async function exportToPdf() {
    if (!auditData) return;
    setLoadingPdf(true);
    try {
      const success = await downloadAuditPDF(auditData);
      if (!success) {
        console.error('PDF export failed');
      }
    } catch (error) {
      console.error('PDF export failed:', error);
    } finally {
      setLoadingPdf(false);
    }
  }


  /**
   * convert to word using docjs and file-saver.
   * convert to pdf using react-pdf-renderer in a web worker.
   */
  return (
      <>
        <TypographyP>Exportiere den Bericht zu PDF</TypographyP>
        <div className="flex gap-4 mt-4">
          <Button
            disabled={loadingPdf || !auditData}
            onClick={exportToPdf}
          >
            {loadingPdf && <Loader2 className="animate-spin mr-2"/>}
            <FileDown className="mr-2 h-4 w-4" />
            {loadingPdf ? 'Erstelle PDF...' : 'Export als PDF'}
          </Button>
        </div>
      </>
  )
}
