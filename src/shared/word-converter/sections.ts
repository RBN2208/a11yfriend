import {Header, ISectionOptions, Paragraph, HeadingLevel, TextRun} from "docx";
import {ManualAudit} from "@/features/audit/manual/types/types";
import {convertFindingsToTables} from "@/shared/word-converter/json-parser";

export function createIntroSection(audit: ManualAudit): ISectionOptions {
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
            new TextRun("Conformance:")
          ]
        }),
        new Paragraph({
          children: [
            new TextRun(audit.conformance || "No conformance provided")
          ]
        })
    ]
  }
}


export function createCriteriaSection(results: ManualAudit['findings']): ISectionOptions {
  const tables = convertFindingsToTables(results);
  return {
    children: tables,
  }
}
