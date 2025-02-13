import { Color } from "@tiptap/extension-color";
import { ListItem } from "@tiptap/extension-list-item";
import { TextStyle } from "@tiptap/extension-text-style";
import { StarterKit } from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import ImageResize from "tiptap-extension-resize-image";
import Highlight from "@tiptap/extension-highlight";

export const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle,
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
  Underline,
  Highlight.configure({ multicolor: true }),
  Image.configure({
    inline: true,
  }),
  ImageResize,
  Link.configure(),
  StarterKit.configure({
    heading: {
      levels: [1, 2],
    },
    bulletList: { keepMarks: true, keepAttributes: false },
    orderedList: { keepMarks: true, keepAttributes: false },
  }),
];
