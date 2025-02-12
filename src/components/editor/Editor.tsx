"use client";
import { useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import { extensions } from "@/features/editorExtensions";
import ToolBar from "./ToolBar";

const Editor = () => {
  const [content, setContent] = useState("");

  const editor = useEditor({
    content: content,
    extensions,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "rounded-md border min-h-[150px] border-input bg-back border-input bg-back disabled:cursor-not-allowed disabled:opacity-50 prose max-w-none [&_ol]:list-decimal [&_ul]:list-disc",
      },
    },
  });

  if (!editor) {
    return <div>Loading editor...</div>;
  }

  return (
    <div className="w-full h-full">
      {editor && <ToolBar editor={editor} />}
      <EditorContent editor={editor} />
    </div>
  );
};

export default Editor;
