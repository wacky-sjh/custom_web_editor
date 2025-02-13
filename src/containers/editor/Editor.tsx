"use client";
import { useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import { extensions } from "@/features/editor/editorExtensions";
import ToolBar from "@/components/editor/ToolBar";

type Props = {
  onChange?: (content: string) => void;
};

const Editor = ({ onChange }: Props) => {
  const [content, setContent] = useState("");

  const editor = useEditor({
    content,
    extensions,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML(); // 에디터 내용을 HTML로 가져옴
      setContent(html);
      onChange?.(html); // 부모 컴포넌트에 변경 사항 전달
    },
    editorProps: {
      attributes: {
        class:
          "prose max-w-none h-full border p-4 disabled:cursor-not-allowed disabled:opacity-50 [&_ol]:list-decimal [&_ul]:list-disc",
      },
    },
  });

  if (!editor) {
    return <div>Loading editor...</div>;
  }

  return (
    <div className="w-full h-full">
      {editor && <ToolBar editor={editor} />}
      <EditorContent editor={editor} className="h-full overflow-auto" />
    </div>
  );
};

export default Editor;
