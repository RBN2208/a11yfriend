import {Header, ISectionOptions, Paragraph, HeadingLevel, TextRun} from "docx";
import { SupabaseAudit } from "@/features/audit/manual/types/types";
import {convertFindingsToTables} from "@/shared/word-converter/json-parser";

export function createIntroSection(audit: SupabaseAudit): ISectionOptions {
  return {
    headers: {
      default: new Header({
        children: [
            new Paragraph({
              children: [
                new TextRun(`Audit: ${audit.name}`)
              ]
            })
        ]
      })
    },
    children: [
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          children: [
            new TextRun('Audit of: ' + audit.name)
          ]
        }),

        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [
            new TextRun("Customer")
          ]
        }),
        new Paragraph({
          children: [
            new TextRun(audit.customer || "No customer provided")
          ]
        }),

        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [
            new TextRun("Audit description")
          ]
        }),
        new Paragraph({
          children: [
            new TextRun(audit.description || "No description provided")
          ]
        }),

        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [
            new TextRun("WCAG Version:")
          ]
        }),
        new Paragraph({
          children: [
            new TextRun(audit.version || "No version provided")
          ]
        }),

        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [
            new TextRun("Conformance:")
          ]
        }),
        new Paragraph({
          children: [
            new TextRun(audit.conformance || "No conformance provided")
          ]
        }),

        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [
            new TextRun("Tested module / page:")
          ]
        }),
        new Paragraph({
          children: [
            new TextRun(audit.module || "No module provided")
          ]
        }),

        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [
            new TextRun('Miscellaneous:')
          ]
        }),
        new Paragraph({
          children: [
            new TextRun(audit.miscellaneous || "No miscellaneous provided")
          ]
        }),
    ]
  }
}


export function createCriteriaSection(results: SupabaseAudit['auditResults']): ISectionOptions {
  const tables = convertFindingsToTables(results);
  return {
    children: tables,
  }
}
