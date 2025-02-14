"use client";
import { useState } from "react";
import Editor from "@/containers/editor/Editor";
import EditorContentRenderer from "@/components/editor/EiditorContentRenderer";

export default function Home() {
  const [htmlContent, setHtmlContent] = useState("");

  return (
    <main>
      <div className="w-full flex flex-1 gap-2 h-screen">
        <Editor onChange={setHtmlContent} />
        <div className="w-full h-full">
          <h2>Editor Content Renderer</h2>
          <EditorContentRenderer htmlContent={htmlContent} />
        </div>
      </div>
    </main>
  );
}
