import DOMPurify from "dompurify";

type Props = {
  htmlContent: any;
};
const EditorContentRenderer = ({ htmlContent }: Props) => {
  return (
    <div className="py-1 px-3 border w-full h-full">
      <div
        className="prose max-w-none border rounded-md p-4 w-full h-full"
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(htmlContent) }}
      />
    </div>
  );
};

export default EditorContentRenderer;
