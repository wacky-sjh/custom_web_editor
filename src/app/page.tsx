"use client";
import { useState } from "react";
import Editor from "@/containers/editor/Editor";
import EditorContentRenderer from "@/components/editor/EiditorContentRenderer";

export default function Home() {
  const [htmlContent, setHtmlContent] = useState("");

  return (
    <main>
      <div className="w-full flex gap-2 h-screen">
        <Editor onChange={setHtmlContent} />
        <EditorContentRenderer htmlContent={htmlContent} />
      </div>
    </main>
  );
}
