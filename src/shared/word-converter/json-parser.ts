import {Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell, BorderStyle, WidthType} from "docx";
import {SupabaseAudit} from "@/features/audit/types/types";
import {WCAGCriterias} from "@/staticData/criteria";

/**
 * Renders a TipTap node to a docx Paragraph
 */
export function renderNode(node: any): Paragraph | Paragraph[] {
  if (!node) return new Paragraph({ children: [] });

  switch (node.type) {
    case "paragraph":
      return new Paragraph({
        children: node.content ? node.content.map((child: any) => renderTextRun(child)) : [],
        indent: {
          left: 100
        }
      });
    case "heading":
      const level = node.attrs?.level || 1;
      let headingLevel;
      switch (level) {
        case 1:
          headingLevel = HeadingLevel.HEADING_1;
          break;
        case 2:
          headingLevel = HeadingLevel.HEADING_2;
          break;
        case 3:
          headingLevel = HeadingLevel.HEADING_3;
          break;
        case 4:
          headingLevel = HeadingLevel.HEADING_4;
          break;
        default:
          headingLevel = HeadingLevel.HEADING_1;
      }
      return new Paragraph({
        heading: headingLevel,
        indent: {
          left: 100
        },
        children: node.content ? node.content.map((child: any) => renderTextRun(child)) : [],
      });
    case "bulletList":
      return node.content ? node.content.map((item: any, index: number) => {
        return new Paragraph({
          bullet: {
            level: 0
          },
          indent: {
            left: 100
          },
          children: item.content && item.content[0].content 
            ? item.content[0].content.map((child: any) => renderTextRun(child)) 
            : [],
        });
      }) : [];
    case "orderedList":
      return node.content ? node.content.map((item: any, index: number) => {
        return new Paragraph({
          children: [
            new TextRun({ text: `${index + 1}. ` }),
            ...(item.content && item.content[0].content 
              ? item.content[0].content.map((child: any) => renderTextRun(child)) 
              : []),
          ],
          indent: {
            left: 100
          },
        });
      }) : [];
    case "codeBlock":
      return new Paragraph({
        children: node.content ? node.content.map((child: any) => renderTextRun(child)) : [],
        shading: {
          type: "solid",
          color: "auto",
          fill: "F5F5F5",
        },
        indent: {
          left: 100
        },
      });
    case "blockquote":
      return node.content ? node.content.map((item: any) => renderNode(item)).flat() : [];
    case "doc":
      return node.content ? node.content.map((item: any) => renderNode(item)).flat() : [];
    default:
      return new Paragraph({ children: [] });
  }
}

function renderTextRun(node: any): TextRun {
  if (!node || !node.text) return new TextRun("");

  const options: any = {
    text: node.text,
  };

  if (node.marks) {
    node.marks.forEach((mark: any) => {
      switch (mark.type) {
        case "bold":
          options.bold = true;
          break;
        case "italic":
          options.italics = true;
          break;
        case "strike":
          options.strike = true;
          break;
        // Add more mark types as needed
      }
    });
  }

  return new TextRun(options);
}

/**
 * Converts a WCAGAuditFormTypeWithFindings object to docx Paragraphs
 */
export function convertFindingsToTables(results: SupabaseAudit['auditResults']): Table[] {
  const tables: Table[] = [];

  results.forEach((result) => {
    // Create a new table for each entry
    const tableRows: TableRow[] = [];

    // Criteria row
    tableRows.push(
      new TableRow({
        children: [
            new TableCell({
              children: [
                  new Paragraph({
                    text: "Criteria",
                    indent: {
                      left: 100
                    },
                  })
              ]
            })
        ]
      })
    )
    tableRows.push(
        new TableRow({
          children: [
            new TableCell({
              children: [
                new Paragraph({
                  text: result.name,
                  indent: {
                    left: 100
                  },
                })
              ]
            })
          ]
        })
    )

    // Status row
    tableRows.push(
        new TableRow({
          children: [
            new TableCell({
              children: [
                new Paragraph({
                  text: "Status",
                  indent: {
                    left: 100
                  }
                })
              ]
            })
          ]
        })
    )
    tableRows.push(
        new TableRow({
          children: [
            new TableCell({
              children: [
                new Paragraph({
                  text: result.status,
                  indent: {
                    left: 100
                  }
                })
              ]
            })
          ]
        })
    )

    // Findings row
    tableRows.push(
        new TableRow({
          children: [
            new TableCell({
              children: [
                new Paragraph({
                  text: "Findings",
                  indent: {
                    left: 100
                  }
                })
              ]
            })
          ]
        })
    )

    // Process findings content
    const findingsParagraph: Paragraph[] = [];
    try {
      if (result.findings && result.findings.content) {
        // Convert each content item to paragraphs
        const findingsParagraphs = result.findings.content
          .filter((item: any) => item !== null && item !== undefined)
          .map((item: any) => {
            try {
              return renderNode(item);
            } catch (err) {
              console.error(`Error rendering node: ${err}`);
              return new Paragraph({
                children: [new TextRun("Error rendering content")]
              });
            }
          })
          .flat();

        if (findingsParagraphs.length > 0) {
          findingsParagraph.push(...findingsParagraphs);
        } else {
          findingsParagraph.push(new Paragraph({
            children: [new TextRun("No valid findings content")]
          }));
        }
      } else {
        findingsParagraph.push(new Paragraph({
          children: [new TextRun("No findings provided")]
        }));
      }
    } catch (err) {
      console.error(`Error processing findings: ${err}`);
      findingsParagraph.push(new Paragraph({
        children: [new TextRun("Error processing findings")]
      }));
    }

    // Add findings to the table
    tableRows.push(
        new TableRow({
          children: [
            new TableCell({
              children: findingsParagraph,
              margins: {
                left: 30
              },
            })
          ]
        })
    )

    // Create the table with full width
    tables.push(new Table({
      rows: tableRows,
      width: {
        size: 100,
        type: WidthType.PERCENTAGE,
      },
      borders: {
        top: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
        bottom: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
        left: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
        right: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
        insideHorizontal: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
        insideVertical: { style: BorderStyle.SINGLE, size: 1, color: "ff0000" },
      },
      margins: {
        top: 30,
        bottom: 30,
        left: 30,
        right: 30
      }
    }));

    // somehow the margins of a table wont apply correctly, so we create and empty spacer table after each criteria table
    tables.push(new Table({
      rows: [
          new TableRow({
            children: [
                new TableCell({
                  children: [
                      new Paragraph(" ")
                  ]
                })
            ]
          })
      ],
      width: {
        size: 100,
        type: WidthType.PERCENTAGE,
      },
      borders: {
        top: { style: "none" },
        bottom: { style: "none" },
        left: { style: "none" },
        right: { style: "none" },
        insideHorizontal: { style: "none" },
        insideVertical: { style: "none" },
      }
    }))
  });

  return tables;
}
