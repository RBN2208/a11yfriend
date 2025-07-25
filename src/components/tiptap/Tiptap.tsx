'use client'

import './styles.scss'
import { useEffect } from "react";
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { TableKit } from '@tiptap/extension-table'

import { MenuBar } from "@/components/tiptap/MenuBar";


type TiptapProps = {
  data: string,
  updateAction: (value: any) => void,
}

export default function Tiptap({data, updateAction}: TiptapProps) {
  const editor = useEditor({
    extensions: [StarterKit, TableKit],
    content: data,
    immediatelyRender: false,
    onUpdate: ({editor}) => {
      const json = editor.getJSON();
      updateAction(json);
    }
  })

  useEffect(() => {
    editor?.commands.setContent(data);
  }, [data]);

  return (
      <>
        {editor && <MenuBar editor={editor} /> }
        <EditorContent editor={editor}
                       className="tiptap-custom min-h-[300px] border p-2"
        />
      </>
  )
}
