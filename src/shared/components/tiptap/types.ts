export type TipTapDoc = {
    type: "doc",
    content:    TipTapParagraph[] |
                TipTapHeading[] |
                TipTapCodeBlock[] |
                TipTapBulletList[] |
                TipTapOrderedList[] |
                TipTapBlockquote[]
}

export type TipTapParagraph = {
    type: "paragraph",
    content?: TipTapText[] // no content = blank line
}

export type TipTapHeading = {
    type: "heading",
    content: TipTapParagraph[]
}

export type TipTapOrderedList = {
    type: "orderedList",
    content: TipTapListItem[]
}

export type TipTapBulletList = {
    type: "bulletList",
    content: TipTapListItem[]
}

export type TipTapBlockquote = {
    type: "blockquote",
    content: TipTapParagraph[]
}

export type TipTapListItem = {
    type: "listItem",
    content: TipTapParagraph[]
}

export type TipTapText = {
    type: "text",
    text: string,
    marks?: TipTapMarks[]
}

export type TipTapMarks = {
    type: "bold" | "italic" | "strike"
}

export type TipTapCodeBlock = {
    type: "codeBlock",
    content: TipTapText[]
}