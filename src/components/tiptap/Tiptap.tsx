'use client'

import './styles.scss'
import { useEditor, EditorContent } from '@tiptap/react'
import {Heading} from '@tiptap/extension-heading'
import StarterKit from '@tiptap/starter-kit'
import {MenuBar} from "@/components/tiptap/MenuBar";
import {useEffect} from "react";


type TiptapProps = {
  data: string,
  onChange: (value: string) => void,
}

export default function Tiptap({data, onChange}: TiptapProps) {
  console.log("data", data)
  const editor = useEditor({
    extensions: [StarterKit, Heading],
    content: data.content,
    immediatelyRender: false,
  })

  const handleEditorChange = () => {
    const dataAsString = JSON.stringify(editor?.getJSON().content);
    if (dataAsString) {
      onChange(dataAsString)
    }
  }

  useEffect(() => {
    console.log("data", data)
    const parsed = JSON.parse(JSON.stringify(data));
    editor?.commands.setContent(parsed);
  }, [data]);

  return (
      <>
        <MenuBar editor={editor} />
        <EditorContent editor={editor}
                       className="tiptap-custom min-h-[300px] border p-2"
                       onBlur={handleEditorChange}
        />
      </>
  )
}
