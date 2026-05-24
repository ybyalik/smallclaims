"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { C, BODY_FONT, HEAD_FONT, RAD, eyebrow, Arrow, FirmBtn } from "./index";

interface StateRow {
  abbr: string;
  name: string;
  slug: string;
  cap?: string;
  popular?: boolean;
}

// Type-ahead state search. When the input is empty we show the popular
// states; when the user types we filter against the full STATES list
// (matches abbreviation OR name).
export function StateSearchPanel({ states }: { states: StateRow[] }) {
  const [query, setQuery] = useState("");
  const popular = useMemo(() => states.filter((s) => s.popular), [states]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return popular;
    return states.filter(
      (s) => s.name.toLowerCase().includes(q) || s.abbr.toLowerCase() === q || s.slug.includes(q),
    );
  }, [query, states, popular]);

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

      {results.length === 0 ? (
        <div style={{ background: "#fff", border: `1px solid ${C.line}`, borderRadius: RAD.card, padding: "20px 18px", font: `14px/1.5 ${BODY_FONT}`, color: C.muted }}>
          No states match &ldquo;{query}&rdquo;. Try a state name or two-letter code.
        </div>
      ) : (
        <div style={{ display: "grid", gap: 0, background: "#fff", border: `1px solid ${C.line}`, borderRadius: RAD.card, overflow: "hidden" }}>
          {results.slice(0, 12).map((s, i, arr) => (
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
              {s.cap && <div style={{ font: `12px/1 ${BODY_FONT}`, color: C.muted }}>{s.cap}</div>}
              <Arrow color={C.muted} />
            </Link>
          ))}
        </div>
      )}

      <div style={{ marginTop: 24 }}>
        <Link href="/small-claims" style={{ textDecoration: "none" }}>
          <FirmBtn kind="ghost">See all 51 states</FirmBtn>
        </Link>
      </div>
    </div>
  );
}
