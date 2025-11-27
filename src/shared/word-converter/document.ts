import {Document, Packer} from "docx";
import {saveAs} from "file-saver";
import {SupabaseAudit} from "@/features/audit/manual/types/types";
import {createCriteriaSection, createIntroSection} from "@/shared/word-converter/sections";
import {DEFAULT_STYLES_CONFIG} from "@/shared/word-converter/configs";

export function createWordDocument(auditData: SupabaseAudit | undefined) {
  if (!auditData) return;

  const doc = new Document({
    title: auditData.name || "No Title provided",
    description: auditData.description || "No description provided",
    styles: DEFAULT_STYLES_CONFIG,
    sections: [
        createIntroSection(auditData),
        createCriteriaSection(auditData.auditResults)
    ]
  });

  Packer.toBlob(doc).then((blob) => {
    saveAs(blob, `Audit_${auditData.name}.docx`);
  });
}
