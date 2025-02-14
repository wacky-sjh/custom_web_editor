"use client";

import { type Editor } from "@tiptap/react";
import {
  Bold,
  Underline,
  Strikethrough,
  Italic,
  List,
  ListOrdered,
  Heading2,
  Heading1,
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Palette,
  Link,
  Highlighter,
} from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import ImageUploadPopover from "./ImageUploadPopover";

type Props = {
  editor: Editor | null;
};

export default function Toolbar({ editor }: Props) {
  if (!editor) {
    return null;
  }
  const currentFontColor = editor.getAttributes("textStyle").color || "#000000";
  const currentHighlightColor = editor.getAttributes("highlight").color || "#FFFFFF";

  const handleToggleLink = () => {
    const previousUrl = editor.getAttributes("link").href || "";
    const url = prompt("링크를 입력하세요.", previousUrl);

    if (url === null) return;
    if (url.trim() === "") {
      editor.chain().focus().unsetLink().run();
    } else {
      editor.chain().focus().setLink({ href: url, target: "_blank" }).run();
    }
  };

  return (
    <div className="flex border bg-transparent h-fit">
      {/* Font Color Picker */}
      <div className="relative">
        <Button
          size="sm"
          variant="ghost"
          onClick={() => {
            document.getElementById("font-color-picker")?.click();
          }}
        >
          <Palette />
        </Button>

        <span
          className="absolute bottom-[5px] right-[5px] w-2 h-2 rounded-full"
          style={{
            backgroundColor: currentFontColor,
          }}
        />
        <Input
          id="font-color-picker"
          type="color"
          className="absolute w-0 h-0 opacity-0"
          onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
            editor.chain().focus().setColor(e.target.value).run()
          }
          value={currentFontColor}
        />
      </div>

      {/* Highlight Color Picker */}
      <div className="relative">
        <Button
          size="sm"
          variant="ghost"
          onClick={() => {
            document.getElementById("highlight-color-picker")?.click();
          }}
        >
          <Highlighter />
        </Button>
        <span
          className="absolute bottom-[5px] right-[5px] w-2 h-2 rounded-full"
          style={{
            backgroundColor: currentHighlightColor,
          }}
        />
        <Input
          id="highlight-color-picker"
          type="color"
          className="absolute w-0 h-0 opacity-0"
          onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
            editor.chain().focus().setHighlight({ color: e.target.value }).run()
          }
          value={currentHighlightColor}
        />
      </div>

      <Toggle
        size="sm"
        pressed={editor.isActive("heading", { level: 1 })}
        onPressedChange={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
      >
        <Heading1 strokeWidth={`${editor.isActive("heading", { level: 1 }) ? 4 : 2}`} />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("heading", { level: 2 })}
        onPressedChange={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        <Heading2 strokeWidth={`${editor.isActive("heading", { level: 2 }) ? 4 : 2}`} />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("bold")}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold strokeWidth={`${editor.isActive("bold") ? 4 : 2}`} />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("italic")}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic strokeWidth={`${editor.isActive("italic") ? 4 : 2}`} />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("underline")}
        onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
      >
        <Underline strokeWidth={`${editor.isActive("underline") ? 4 : 2}`} />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("strike")}
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
      >
        <Strikethrough strokeWidth={`${editor.isActive("strike") ? 4 : 2}`} />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive({ textAlign: "left" })}
        onPressedChange={() => editor.chain().focus().setTextAlign("left").run()}
      >
        <AlignLeft strokeWidth={`${editor.isActive({ textAlign: "left" }) ? 4 : 2}`} />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive({ textAlign: "center" })}
        onPressedChange={() => editor.chain().focus().setTextAlign("center").run()}
      >
        <AlignCenter strokeWidth={`${editor.isActive({ textAlign: "center" }) ? 4 : 2}`} />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive({ textAlign: "right" })}
        onPressedChange={() => editor.chain().focus().setTextAlign("right").run()}
      >
        <AlignRight strokeWidth={`${editor.isActive({ textAlign: "right" }) ? 4 : 2}`} />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive({ textAlign: "jutify" })}
        onPressedChange={() => editor.chain().focus().setTextAlign("justify").run()}
      >
        <AlignJustify strokeWidth={`${editor.isActive({ textAlign: "justify" }) ? 4 : 2}`} />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("bulletList")}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List strokeWidth={`${editor.isActive("bulletList") ? 4 : 2}`} />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("orderedList")}
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered strokeWidth={`${editor.isActive("orderedList") ? 4 : 2}`} />
      </Toggle>

      <ImageUploadPopover editor={editor} />

      <Toggle size="sm" pressed={editor.isActive("link")} onPressedChange={handleToggleLink}>
        <Link strokeWidth={`${editor.isActive("link") ? 3 : 2}`} />
      </Toggle>
    </div>
  );
}
