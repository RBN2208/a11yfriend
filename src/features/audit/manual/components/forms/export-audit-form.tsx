"use client"
import React, { useState } from 'react';
import {ManualAudit} from "@/features/audit/manual/types/types";
import {TypographyP} from "@/shared/components/typography/typography-elements";
import {Button} from "@/shared/components/shadcn-components/ui/button";
import {Loader2} from "lucide-react";
import {createWordDocument} from "@/shared/features/word-converter/document";

export default function ExportAuditForm({auditData}: {auditData: ManualAudit | undefined}) {
  const [loading, setLoading] = useState(false);

  async function exportDocument(format: 'word' | 'pdf') {
    setLoading(true);
    try {
      if (format === 'word') {
        createWordDocument(auditData)
      } else if (format === 'pdf') {
        // to pdf stuff
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  /**
   * convert to word using docjs and file-saver.
   */
  return (
      <>
        <TypographyP>TODO: add options for export format</TypographyP>
        <Button disabled={loading}
                onClick={() => exportDocument('word')}
                className="mt-4"
        >
          {loading && <Loader2 className="animate-spin"/>}
          {loading ? 'Transforming' : 'Export to Word'}
        </Button>
      </>
  )
}
