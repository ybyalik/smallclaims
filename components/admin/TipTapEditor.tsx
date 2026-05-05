"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import { useState, useEffect, useRef } from "react";

type Mode = "visual" | "code";

export default function TipTapEditor({
  initialJson,
  initialHtml,
  onChange,
}: {
  initialJson: unknown | null;
  initialHtml: string | null;
  onChange: (data: { json: unknown; html: string }) => void;
}) {
  const [mode, setMode] = useState<Mode>("visual");
  const [htmlSource, setHtmlSource] = useState<string>(initialHtml || "");
  const [uploadingImg, setUploadingImg] = useState(false);
  const imgInputRef = useRef<HTMLInputElement | null>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3, 4] },
      }),
      Link.configure({ openOnClick: false, autolink: true }),
      Image,
      Placeholder.configure({ placeholder: "Start writing your post…" }),
    ],
    content: initialJson || initialHtml || "",
    editorProps: { attributes: { class: "tiptap-content" } },
    onUpdate: ({ editor }) => {
      const json = editor.getJSON();
      const html = editor.getHTML();
      setHtmlSource(html);
      onChange({ json, html });
    },
    immediatelyRender: false,
  });

  // When user switches from code → visual, push the edited HTML back into the editor.
  useEffect(() => {
    if (mode === "visual" && editor && htmlSource !== editor.getHTML()) {
      editor.commands.setContent(htmlSource, { emitUpdate: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  if (!editor) return <div className="tiptap-loading">Loading editor…</div>;

  return (
    <div className="tiptap-shell">
      <div className="tiptap-toolbar">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "active" : ""}
          title="Bold"
        >
          <b>B</b>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "active" : ""}
          title="Italic"
        >
          <i>I</i>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive("strike") ? "active" : ""}
          title="Strikethrough"
        >
          <s>S</s>
        </button>
        <span className="tiptap-divider" />
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor.isActive("heading", { level: 2 }) ? "active" : ""}
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={editor.isActive("heading", { level: 3 }) ? "active" : ""}
        >
          H3
        </button>
        <span className="tiptap-divider" />
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "active" : ""}
          title="Bullet list"
        >
          • List
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "active" : ""}
          title="Numbered list"
        >
          1. List
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive("blockquote") ? "active" : ""}
        >
          ❝ Quote
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive("codeBlock") ? "active" : ""}
        >
          {"</>"}
        </button>
        <span className="tiptap-divider" />
        <button
          type="button"
          onClick={() => {
            const url = window.prompt("URL");
            if (url) editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
            else editor.chain().focus().unsetLink().run();
          }}
          className={editor.isActive("link") ? "active" : ""}
          title="Link"
        >
          🔗 Link
        </button>
        <button
          type="button"
          onClick={() => imgInputRef.current?.click()}
          title="Upload image"
          disabled={uploadingImg}
        >
          {uploadingImg ? "⏳ Uploading…" : "🖼 Image"}
        </button>
        <button
          type="button"
          onClick={() => {
            const url = window.prompt("Image URL");
            if (url) editor.chain().focus().setImage({ src: url }).run();
          }}
          title="Image from URL"
        >
          🔗 Img
        </button>
        <input
          ref={imgInputRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={async (e) => {
            const file = e.target.files?.[0];
            e.target.value = "";
            if (!file) return;
            setUploadingImg(true);
            try {
              const fd = new FormData();
              fd.append("file", file);
              const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
              const body = await res.json().catch(() => ({}));
              if (!res.ok || !body.url) {
                alert(body.error || "Upload failed");
                return;
              }
              editor.chain().focus().setImage({ src: body.url }).run();
            } finally {
              setUploadingImg(false);
            }
          }}
        />
        <span className="tiptap-divider" />
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
        >
          ↶
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
        >
          ↷
        </button>
        <span className="tiptap-spacer" />
        <div className="tiptap-mode-toggle">
          <button
            type="button"
            data-active={mode === "visual"}
            onClick={() => setMode("visual")}
          >
            Visual
          </button>
          <button
            type="button"
            data-active={mode === "code"}
            onClick={() => {
              setHtmlSource(editor.getHTML());
              setMode("code");
            }}
          >
            HTML
          </button>
        </div>
      </div>

      {mode === "visual" ? (
        <EditorContent editor={editor} />
      ) : (
        <textarea
          className="tiptap-code"
          value={htmlSource}
          onChange={(e) => {
            setHtmlSource(e.target.value);
            onChange({ json: null, html: e.target.value });
          }}
          spellCheck={false}
        />
      )}
    </div>
  );
}
