import {Document, Packer, Paragraph, TextRun} from "docx";
import {saveAs} from "file-saver";
import {SupaBaseAudit} from "@/types/audit/types";
import {createCriteriaSection, createIntroSection} from "@/lib/word-converter/sections";
import {DEFAULT_STYLES_CONFIG} from "@/lib/word-converter/configs";

export function createWordDocument(auditData: SupaBaseAudit | undefined) {
  if (!auditData) return;

  const doc = new Document({
    title: auditData.name || "No Title provided",
    description: auditData.description || "No description provided",
    styles: DEFAULT_STYLES_CONFIG,
    sections: [
        createIntroSection(auditData),
        createCriteriaSection(auditData.criteria_results)
    ]
  });

  Packer.toBlob(doc).then((blob) => {
    saveAs(blob, `Audit_${auditData.name}.docx`);
  });
}
