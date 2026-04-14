'use client'

import './styles.scss'
import { useEffect } from "react";
import { useEditor, EditorContent, Extension } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { TableKit } from '@tiptap/extension-table'
import DOMPurify from 'isomorphic-dompurify';

import { MenuBar } from "@/shared/components/tiptap/MenuBar";
import {AuditResult} from "@/features/audit/manual/types/types";

// Custom extension to fix cursor position issues when editing formatted text
// before: while editing the focus was always set on next line
const CursorFix = Extension.create({
  name: 'cursorFix',

  addKeyboardShortcuts() {
    return {
      Backspace: () => {
        return false;
      },
      Delete: () => {
        return false;
      },
      Enter: () => {
        return false;
      },
    };
  },
});

/**
 * Sanitizes HTML content to prevent XSS attacks.
 * Allows common formatting tags used by the TipTap editor.
 */
function sanitizeHtml(dirty: string): string {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: [
      'p', 'br', 'strong', 'em', 'u', 's', 'code', 'pre',
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'ul', 'ol', 'li', 'blockquote',
      'table', 'thead', 'tbody', 'tr', 'th', 'td',
      'a', 'span', 'div',
    ],
    ALLOWED_ATTR: ['href', 'target', 'rel', 'class', 'colspan', 'rowspan'],
  });
}

type TiptapProps = {
  data: AuditResult['findings'],
  updateAction: (value: any) => void,
}

export default function Tiptap({data, updateAction}: TiptapProps) {
  const editor = useEditor({
    extensions: [StarterKit, TableKit, CursorFix],
    content: data,
    editable: true,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'focus:outline-none',
      },
      handleDOMEvents: {
        keydown: (_view, event) => {
          // Allow normal keydown behavior
          return false;
        },
      },
      // Sanitize any pasted HTML content
      handlePaste: (view, event) => {
        const html = event.clipboardData?.getData('text/html');
        if (html) {
          const clean = sanitizeHtml(html);
          // Let TipTap handle the sanitized content
          if (clean !== html) {
            event.preventDefault();
            editor?.commands.insertContent(clean);
            return true;
          }
        }
        return false;
      },
    },
    onUpdate: ({editor}) => {
      const html = editor.getHTML();
      const sanitized = sanitizeHtml(html);
      // If sanitization changed the content, update the editor
      if (html !== sanitized) {
        editor.commands.setContent(sanitized);
      }
      const json = editor.getJSON();
      updateAction(json);
    }
  })

  useEffect(() => {
    if (editor && JSON.stringify(editor.getJSON()) !== JSON.stringify(data)) {
      const selection = editor.view.state.selection;
      editor.commands.setContent(data);
      try {
        if (selection && editor.view && editor.view.state) {
          editor.commands.focus();
        }
      } catch (e) {
        console.error(e)
      }
    }
  }, [data, editor]);

  return (
      <div role="group" aria-label="Rich text editor">
        {editor && <MenuBar editor={editor} /> }
        <EditorContent editor={editor}
                       className="tiptap-custom min-h-[300px] border p-2"
                       aria-label="Rich text editor"
        />
      </div>
  )
}
