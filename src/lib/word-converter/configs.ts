import {AlignmentType, convertInchesToTwip, TabStopPosition, UnderlineType} from "docx";


// size is halfpoints, so 12pt in word is 24 half points here.

export const DEFAULT_STYLES_CONFIG = {
  default: {
    heading1: {
      run: {
        font: "Calibri",
        size: 50,
        bold: true,
        color: "000000",
        underline: {
          type: UnderlineType.SINGLE,
          color: "000000",
        },
      },
      paragraph: {
        alignment: AlignmentType.CENTER,
        spacing: { line: 340 },
      },
    },
    heading2: {
      run: {
        font: "Calibri",
        size: 44,
        bold: true,
      },
      paragraph: {
        spacing: { line: 340 },
      },
    },
    heading3: {
      run: {
        font: "Calibri",
        size: 36,
        bold: true,
      },
      paragraph: {
        spacing: { line: 276 },
      },
    },
    heading4: {
      run: {
        font: "Calibri",
        size: 32,
        bold: true,
      },
      paragraph: {
        alignment: AlignmentType.JUSTIFIED,
      },
    }
  },
  paragraphStyles: [
    {
      id: "Normal",
      name: "Normal",
      basedOn: "Normal",
      next: "Normal",
      quickFormat: true,
      run: {
        font: "Calibri",
        size: 32,
        bold: false,
      },
      paragraph: {
        spacing: { line: 276, before: 20 * 72 * 0.1, after: 20 * 72 * 0.05 },
        rightTabStop: TabStopPosition.MAX,
        leftTabStop: 453.543307087,
      },
    }
  ],
}