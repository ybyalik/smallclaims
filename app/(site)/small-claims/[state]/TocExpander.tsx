"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

interface TocItem {
  id: string;
  label: string;
}

export default function TocExpander({
  items,
  startCounter,
}: {
  items: TocItem[];
  startCounter: number;
}) {
  const [open, setOpen] = useState(false);
  if (items.length === 0) return null;

  if (!open) {
    return (
      <button
        type="button"
        className="sgv2-toc-more"
        onClick={() => setOpen(true)}
      >
        <span>Show all {startCounter + items.length} sections</span>
        <ArrowRight size={14} strokeWidth={2.2} className="sgv2-toc-more-chev" aria-hidden />
      </button>
    );
  }

  return (
    <>
      <ol
        className="sgv2-toc sgv2-toc-rest"
        style={{ counterReset: `sgv2-toc ${startCounter}` }}
      >
        {items.map((it) => (
          <li key={it.id}>
            <a href={`#${it.id}`}>{it.label}</a>
          </li>
        ))}
      </ol>
      <button
        type="button"
        className="sgv2-toc-less"
        onClick={() => setOpen(false)}
      >
        <span>Show fewer sections</span>
        <ArrowRight size={14} strokeWidth={2.2} className="sgv2-toc-less-chev" aria-hidden />
      </button>
    </>
  );
}
