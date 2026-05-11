"use client";

// Renders deep-research call markdown as formatted HTML, with a toggle to
// view the raw markdown source. Formatted view picks up styling from
// .admin-research-content (defined in app/admin/admin.css).

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Props {
  markdown: string;
}

export default function MarkdownView({ markdown }: Props) {
  const [showRaw, setShowRaw] = useState(false);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 8 }}>
        <button
          type="button"
          onClick={() => setShowRaw((v) => !v)}
          className="btn btn-cream btn-sm"
          style={{ fontSize: 12, padding: "4px 10px" }}
        >
          {showRaw ? "Show formatted" : "Show source"}
        </button>
      </div>

      {showRaw ? (
        <pre
          style={{
            background: "var(--bg-soft)",
            padding: 14,
            borderRadius: 6,
            maxHeight: 520,
            overflow: "auto",
            whiteSpace: "pre-wrap",
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
            fontSize: 12,
          }}
        >
          {markdown}
        </pre>
      ) : (
        <div
          className="admin-research-content"
          style={{ maxHeight: 600, overflow: "auto", padding: "20px 24px" }}
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              a: (props) => <a {...props} target="_blank" rel="noopener noreferrer" />,
            }}
          >
            {markdown}
          </ReactMarkdown>
        </div>
      )}
    </div>
  );
}
