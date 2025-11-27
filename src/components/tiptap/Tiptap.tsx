'use client'

import './styles.scss'
import { useEffect } from "react";
import { useEditor, EditorContent, Extension } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { TableKit } from '@tiptap/extension-table'

import { MenuBar } from "@/components/tiptap/MenuBar";
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
    },
    onUpdate: ({editor}) => {
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
      <>
        {editor && <MenuBar editor={editor} /> }
        <EditorContent editor={editor}
                       className="tiptap-custom min-h-[300px] border p-2"
        />
      </>
  )
}
