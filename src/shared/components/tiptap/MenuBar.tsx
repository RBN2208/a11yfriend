'use client'

// TODO: implement table-kit

import React from 'react'
import type { Editor } from '@tiptap/react'
import { useEditorState } from '@tiptap/react'
import { Code, List, ListOrdered, MessageSquareCode, X } from "lucide-react";

export function MenuBar({ editor }: { editor: Editor | null }) {
  if (!editor) return null;

  const editorState = useEditorState({
    editor,
    selector: ctx => {
      return {
        isBold: ctx.editor.isActive('bold'),
        canBold: ctx.editor.can().chain().focus().toggleBold().run(),
        isItalic: ctx.editor.isActive('italic'),
        canItalic: ctx.editor.can().chain().focus().toggleItalic().run(),
        isStrike: ctx.editor.isActive('strike'),
        canStrike: ctx.editor.can().chain().focus().toggleStrike().run(),
        isCode: ctx.editor.isActive('code'),
        canCode: ctx.editor.can().chain().focus().toggleCode().run(),
        canClearMarks: ctx.editor.can().chain().focus().unsetAllMarks().run(),
        isParagraph: ctx.editor.isActive('paragraph'),
        isHeading2: ctx.editor.isActive('heading', { level: 2 }),
        isHeading3: ctx.editor.isActive('heading', { level: 3 }),
        isHeading4: ctx.editor.isActive('heading', { level: 4 }),
        isBulletList: ctx.editor.isActive('bulletList'),
        isOrderedList: ctx.editor.isActive('orderedList'),
        isCodeBlock: ctx.editor.isActive('codeBlock'),
        isBlockquote: ctx.editor.isActive('blockquote')
      }
    },
  })

  const defaultButtonClass = "m-1 px-2 py-1 text-xs font-medium text-center text-black border-neutral-400 border rounded-sm hover:bg-neutral-700 hover:text-white focus:ring-1 focus:outline-none focus:ring-indigo-900 dark:bg-white dark:text-black dark:hover:bg-indigo-700 dark:focus:ring-indigo-800";
  const activeButtonClass = " bg-emerald-700 text-white hover:bg-emerald-900";

  return (
      <div className="flex gap-10 border border-neutral-300 border-b-0 p-2">
        <div className="button-group">
          <button onClick={() => editor.chain().focus().unsetAllMarks().run()}
                  disabled={!editorState.canClearMarks}
                  className={defaultButtonClass}
                  title="Clear formatting"
          >
            <X height={16} width={16} style={{display: 'inline-block', verticalAlign: 'middle'}}/>
          </button>
          <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              disabled={!editorState.canBold}
              className={editorState.isBold ? defaultButtonClass + activeButtonClass : defaultButtonClass}
              style={{fontWeight: 'bold'}}
              title="Bold"
          >
            B
          </button>
          <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              disabled={!editorState.canItalic}
              className={editorState.isItalic ? defaultButtonClass + activeButtonClass : defaultButtonClass}
              style={{fontStyle: 'italic'}}
              title="Italic"
          >
            I
          </button>
          <button
              onClick={() => editor.chain().focus().toggleStrike().run()}
              disabled={!editorState.canStrike}
              className={editorState.isStrike ? defaultButtonClass + activeButtonClass : defaultButtonClass}
              style={{textDecoration: 'line-through'}}
          >
            Strike
          </button>
        </div>
        <div className="button-group">
          <button onClick={() => editor.chain().focus().clearNodes().run()}
                  className={defaultButtonClass}
                  title="Clear formatting"
          >
            <X height={16} width={16} style={{display: 'inline-block', verticalAlign: 'middle'}}/>
          </button>
          <button
              onClick={() => editor.chain().focus().setParagraph().run()}
              className={editorState.isParagraph ? defaultButtonClass + activeButtonClass : defaultButtonClass}
              title="Paragraph"
          >
            P
          </button>
          <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              className={editorState.isHeading2 ? defaultButtonClass + activeButtonClass : defaultButtonClass}
          >
            H2
          </button>
          <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
              className={editorState.isHeading3 ? defaultButtonClass + activeButtonClass : defaultButtonClass}
          >
            H3
          </button>
          <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
              className={editorState.isHeading4 ? defaultButtonClass + activeButtonClass : defaultButtonClass}
          >
            H4
          </button>
          <button
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={editorState.isBulletList ? defaultButtonClass + activeButtonClass : defaultButtonClass}
              title="Bullet List"
          >
            <List height={16} width={16} style={{display: 'inline-block', verticalAlign: 'middle'}}/>
          </button>
          <button
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={editorState.isOrderedList ? defaultButtonClass + activeButtonClass : defaultButtonClass}
              title="Ordered List"
          >
            <ListOrdered height={16} width={16} style={{display: 'inline-block', verticalAlign: 'middle'}}/>
          </button>
          <button
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              className={editorState.isCodeBlock ? defaultButtonClass + activeButtonClass : defaultButtonClass}
              title="Code Block"
          >
            <Code height={16} width={16} style={{display: 'inline-block', verticalAlign: 'middle'}}/>
          </button>
          <button
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              className={editorState.isBlockquote ? defaultButtonClass + activeButtonClass : defaultButtonClass}
              title="Blockquote"
          >
            <MessageSquareCode height={16} width={16} style={{display: 'inline-block', verticalAlign: 'middle'}}/>
          </button>
        </div>
      </div>
  )
}