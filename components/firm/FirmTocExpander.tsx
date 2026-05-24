"use client";

import { useState } from "react";
import { Arrow } from "./index";

interface TocItem { id: string; label: string; }

const HIDE_CSS = `
.firm-sg-toc-more, .firm-sg-toc-less {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 14px;
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  font: 500 13px/1 var(--font-geist), system-ui, sans-serif;
  color: #b8331f;
  letter-spacing: 0.02em;
}
`;

export default function FirmTocExpander({ items, startCounter }: { items: TocItem[]; startCounter: number; }) {
  const [open, setOpen] = useState(false);
  if (items.length === 0) return null;

  if (!open) {
    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: HIDE_CSS }} />
        <button type="button" className="firm-sg-toc-more" onClick={() => setOpen(true)}>
          <span>Show all {startCounter + items.length} sections</span>
          <Arrow color="#b8331f" />
        </button>
      </>
    );
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: HIDE_CSS }} />
      <ol className="firm-sg-toc firm-sg-toc-rest" style={{ counterReset: `firm-sg-toc ${startCounter}` }}>
        {items.map((it) => (
          <li key={it.id}>
            <a href={`#${it.id}`}>{it.label}</a>
          </li>
        ))}
      </ol>
      <button type="button" className="firm-sg-toc-less" onClick={() => setOpen(false)}>
        <span>Show fewer sections</span>
        <Arrow color="#b8331f" />
      </button>
    </>
  );
}
