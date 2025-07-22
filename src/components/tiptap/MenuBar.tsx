import type { Editor } from '@tiptap/react'
import { EditorContent, useEditor, useEditorState } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React from 'react'

export const extensions = [StarterKit]

export function MenuBar({ editor }: { editor: Editor | null }) {
  if (!editor) return;
  // Read the current editor's state, and re-render the component when it changes
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
        isHeading1: ctx.editor.isActive('heading', { level: 1 }),
        isHeading2: ctx.editor.isActive('heading', { level: 2 }),
        isHeading3: ctx.editor.isActive('heading', { level: 3 }),
        isHeading4: ctx.editor.isActive('heading', { level: 4 }),
        isHeading5: ctx.editor.isActive('heading', { level: 5 }),
        isHeading6: ctx.editor.isActive('heading', { level: 6 }),
        isBulletList: ctx.editor.isActive('bulletList'),
        isOrderedList: ctx.editor.isActive('orderedList'),
        isCodeBlock: ctx.editor.isActive('codeBlock'),
        isBlockquote: ctx.editor.isActive('blockquote'),
        canUndo: ctx.editor.can().chain().focus().undo().run(),
        canRedo: ctx.editor.can().chain().focus().redo().run(),
      }
    },
  })

  return (
      <div className="control-group">
        <div className="button-group">
          <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              disabled={!editorState.canBold}
              className={editorState.isBold ? 'bg-black text-white rounded p-1 px-2 m-2' : 'p-1 px-2 m-2 bg-neutral-400 text-black rounded'}
          >
            Bold
          </button>
          <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              disabled={!editorState.canItalic}
              className={editorState.isItalic ? 'bg-black text-white rounded p-1 px-2 m-2' : 'p-1 px-2 m-2 bg-neutral-400 text-black rounded'}
          >
            Italic
          </button>
          <button
              onClick={() => editor.chain().focus().toggleStrike().run()}
              disabled={!editorState.canStrike}
              className={editorState.isStrike ? 'bg-black text-white rounded p-1 px-2 m-2' : 'p-1 px-2 m-2 bg-neutral-400 text-black rounded'}
          >
            Strike
          </button>
          <button
              onClick={() => editor.chain().focus().toggleCode().run()}
              disabled={!editorState.canCode}
              className={editorState.isCode ? 'bg-black text-white rounded p-1 px-2 m-2' : 'p-1 px-2 m-2 bg-neutral-400 text-black rounded'}
          >
            Code
          </button>
          <button onClick={() => editor.chain().focus().unsetAllMarks().run()}
                  className="p-1 px-2 m-2 bg-neutral-400 text-black rounded"
          >
            Clear marks
          </button>
          <button onClick={() => editor.chain().focus().clearNodes().run()}
                  className="p-1 px-2 m-2 bg-neutral-400 text-black rounded"
          >
            Clear nodes
          </button>
          <button
              onClick={() => editor.chain().focus().setParagraph().run()}
              className={editorState.isParagraph ? 'bg-black text-white rounded p-1 px-2 m-2' : 'p-1 px-2 m-2 bg-neutral-400 text-black rounded'}
          >
            Paragraph
          </button>
          <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              className={editorState.isHeading2 ? 'bg-black text-white rounded p-1 px-2 m-2' : 'p-1 px-2 m-2 bg-neutral-400 text-black rounded'}
          >
            H2
          </button>
          <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
              className={editorState.isHeading3 ? 'bg-black text-white rounded p-1 px-2 m-2' : 'p-1 px-2 m-2 bg-neutral-400 text-black rounded'}
          >
            H3
          </button>
          <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
              className={editorState.isHeading4 ? 'bg-black text-white rounded p-1 px-2 m-2' : 'p-1 px-2 m-2 bg-neutral-400 text-black rounded'}
          >
            H4
          </button>
          <button
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={editorState.isBulletList ? 'bg-black text-white rounded p-1 px-2 m-2' : 'p-1 px-2 m-2 bg-neutral-400 text-black rounded'}
          >
            Bullet list
          </button>
          <button
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={editorState.isOrderedList ? 'bg-black text-white rounded p-1 px-2 m-2' : 'p-1 px-2 m-2 bg-neutral-400 text-black rounded'}
          >
            Ordered list
          </button>
          <button
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              className={editorState.isCodeBlock ? 'bg-black text-white rounded p-1 px-2 m-2' : 'p-1 px-2 m-2 bg-neutral-400 text-black rounded'}
          >
            Code block
          </button>
          <button
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              className={editorState.isBlockquote ? 'bg-black text-white rounded p-1 px-2 m-2' : 'p-1 px-2 m-2 bg-neutral-400 text-black rounded'}
          >
            Blockquote
          </button>
        </div>
      </div>
  )
}