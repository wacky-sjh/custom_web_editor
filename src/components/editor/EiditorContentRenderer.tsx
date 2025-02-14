"use client";

import DOMPurify from "dompurify";
import { useState, useEffect } from "react";
type Props = {
  htmlContent: any;
};
const EditorContentRenderer = ({ htmlContent }: Props) => {
  const [sanitizedContent, setSanitizedContent] = useState("");

  useEffect(() => {
    // 클라이언트 사이드에서만 DOMpurify 실행
    setSanitizedContent(DOMPurify.sanitize(htmlContent));
  }, [htmlContent]);

  return (
    <div className="py-1 px-3 border w-full h-full">
      <div
        className="prose max-w-none border rounded-md p-4 w-full h-full"
        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      />
    </div>
  );
};

export default EditorContentRenderer;
