"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { C, BODY_FONT, HEAD_FONT, RAD, eyebrow, Arrow } from "./index";

interface StateRow {
  abbr: string;
  name: string;
  slug: string;
  cap?: string;
  popular?: boolean;
}

// Type-ahead state search. Empty input shows the popular states; typing
// filters the full STATES list (abbr OR name). The results list is a
// fixed-height scroll area so the panel never changes size as the result
// count changes. The "See all" button toggles a separate server-rendered
// A–Z directory elsewhere on the page (passed as directoryId) so all 51
// links stay in the HTML source while hidden by default.
export function StateSearchPanel({ states, directoryId }: { states: StateRow[]; directoryId?: string }) {
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState(false);
  const popular = useMemo(() => states.filter((s) => s.popular), [states]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return popular;
    return states.filter(
      (s) => s.name.toLowerCase().includes(q) || s.abbr.toLowerCase() === q || s.slug.includes(q),
    );
  }, [query, states, popular]);

  const toggleDirectory = () => {
    if (!directoryId) return;
    const el = document.getElementById(directoryId);
    if (!el) return;
    const willShow = el.hidden;
    el.hidden = !willShow;
    setExpanded(willShow);
    if (willShow) el.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  return (
    <div>
      <div style={{ ...eyebrow, marginBottom: 14 }}>SEARCH STATES</div>
      <div
        style={{
          background: "#fff",
          border: `1px solid ${C.line}`,
          padding: "12px 16px",
          display: "flex",
          alignItems: "center",
          gap: 12,
          borderRadius: RAD.card,
        }}
      >
        <Search size={18} strokeWidth={1.8} color={C.muted} aria-hidden />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type your state, e.g. Texas or TX"
          aria-label="Search states"
          style={{
            flex: 1,
            border: "none",
            outline: "none",
            background: "transparent",
            font: `15px/1.4 ${BODY_FONT}`,
            color: C.fg,
          }}
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label="Clear search"
            style={{ background: "transparent", border: "none", padding: 4, cursor: "pointer", color: C.muted, display: "grid", placeItems: "center" }}
          >
            <X size={16} strokeWidth={2} />
          </button>
        )}
      </div>

      <div style={{ ...eyebrow, marginTop: 32, marginBottom: 14 }}>
        {query ? `RESULTS (${results.length})` : "MOST POPULAR"}
      </div>

      {/* Fixed-height scroll area — stable size regardless of result count. */}
      <div style={{ height: 320, overflowY: "auto", background: "#fff", border: `1px solid ${C.line}`, borderRadius: RAD.card }}>
        {results.length === 0 ? (
          <div style={{ padding: "20px 18px", font: `14px/1.5 ${BODY_FONT}`, color: C.muted }}>
            No states match &ldquo;{query}&rdquo;. Try a state name or two-letter code.
          </div>
        ) : (
          results.map((s, i, arr) => (
            <Link
              key={s.slug}
              href={`/small-claims/${s.slug}`}
              className="firm-row-link"
              style={{
                display: "grid",
                gridTemplateColumns: "44px 1fr auto 22px",
                gap: 16,
                alignItems: "center",
                padding: "14px 18px",
                borderBottom: i < arr.length - 1 ? `1px solid ${C.line}` : "none",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <div style={{ font: `500 12px/1 ${BODY_FONT}`, color: C.accent, letterSpacing: "0.06em" }}>{s.abbr}</div>
              <div style={{ font: `600 18px/1.2 ${HEAD_FONT}`, color: C.fg, letterSpacing: "-0.005em" }}>{s.name}</div>
              <div style={{ font: `12px/1 ${BODY_FONT}`, color: C.muted }}>{s.cap ?? ""}</div>
              <Arrow color={C.muted} />
            </Link>
          ))
        )}
      </div>

      <div style={{ marginTop: 24 }}>
        <button
          type="button"
          onClick={toggleDirectory}
          aria-expanded={expanded}
          aria-controls={directoryId}
          style={{
            background: "transparent",
            color: C.fg,
            border: `1px solid ${C.fg}`,
            padding: "14px 22px",
            font: `500 14px/1 ${BODY_FONT}`,
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            borderRadius: 999,
          }}
        >
          {expanded ? "Show Fewer" : "See All 51 States"} <Arrow color={C.fg} />
        </button>
      </div>
    </div>
  );
}
