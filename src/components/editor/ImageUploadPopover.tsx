import { type Editor } from "@tiptap/react";
import { Button } from "../ui/button";
import { Image } from "lucide-react";
import { Input } from "../ui/input";
import { uploadImage } from "@/lib/uploadImage";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { useState } from "react";
import classnames from "classnames";
import { v4 as uuidv4 } from "uuid";

const ImageUploadPopover = ({ editor }: { editor: Editor }) => {
  const [uploadType, setUploadType] = useState<"url" | "file" | null>(null);
  const [imageUrl, setImageUrl] = useState("");

  const handleUploadByUrl = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (imageUrl) {
      editor.chain().focus().setImage({ src: imageUrl }).run();
    }
    setImageUrl("");
  };

  const handleUploadByFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const file = e.target.files[0];
    const fileName = file.name;
    const encodedFileName = fileName.replace(/[^\x00-\x7F]/g, "") || uuidv4();
    const newFile = new File([file], encodedFileName, { type: file.type });
    const uploadedImageUrl = await uploadImage(newFile);

    if (uploadedImageUrl) {
      editor.chain().focus().setImage({ src: uploadedImageUrl }).run();
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="sm" variant="ghost">
          <Image strokeWidth={2} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-60 flex flex-col space-y-2 p-2 text-center bg-white">
        <div className="flex space-x-2">
          <Button
            onClick={() => setUploadType("url")}
            variant="ghost"
            className={classnames("w-28 rounded-none", {
              "border-b-2 border-b-blue-500": uploadType === "url",
            })}
          >
            URL로 업로드
          </Button>
          <Button
            onClick={() => setUploadType("file")}
            variant="ghost"
            className={classnames("w-28 rounded-none", {
              "border-b-2 border-b-blue-500": uploadType === "file",
            })}
          >
            파일 업로드
          </Button>
        </div>

        {uploadType === "url" && (
          <form onSubmit={handleUploadByUrl} className="flex flex-col gap-1">
            <Input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="이미지 주소를 입력하세요."
            />
            <Button className="w-full" variant="default" type="submit">
              업로드
            </Button>
          </form>
        )}

        {uploadType === "file" && (
          <div className="flex flex-col gap-1">
            <Input type="file" accept="image/*" hidden onChange={handleUploadByFile} />
            <Button className="w-full" variant="default" type="button">
              업로드
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default ImageUploadPopover;
