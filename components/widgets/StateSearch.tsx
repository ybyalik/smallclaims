"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { STATES } from "../../lib/states";

export default function StateSearch({ readySlugs }: { readySlugs: string[] }) {
  const router = useRouter();
  const ready = useMemo(() => new Set(readySlugs), [readySlugs]);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const blurTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return STATES.filter(
      (s) => s.name.toLowerCase().includes(q) || s.abbr.toLowerCase() === q
    ).slice(0, 8);
  }, [query]);

  useEffect(() => {
    setActiveIdx(0);
  }, [matches]);

  function go(slug: string) {
    router.push(`/guides/${slug}`);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Escape") {
      setOpen(false);
      inputRef.current?.blur();
      return;
    }
    if (matches.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((i) => Math.min(i + 1, matches.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      go(matches[activeIdx].slug);
    }
  }

  return (
    <div className="statesearch">
      <div className="statesearch-field">
        <svg
          className="statesearch-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-3.5-3.5" />
        </svg>
        <input
          ref={inputRef}
          type="search"
          value={query}
          placeholder="Type your state, e.g. Texas or TX"
          aria-label="Find your state"
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => {
            if (blurTimer.current) clearTimeout(blurTimer.current);
            setOpen(true);
          }}
          onBlur={() => {
            blurTimer.current = setTimeout(() => setOpen(false), 140);
          }}
          onKeyDown={onKeyDown}
        />
        {query && (
          <button
            type="button"
            className="statesearch-clear"
            aria-label="Clear search"
            onClick={() => {
              setQuery("");
              inputRef.current?.focus();
            }}
          >
            ×
          </button>
        )}
      </div>
      {open && matches.length > 0 && (
        <ul className="statesearch-results" role="listbox">
          {matches.map((s, i) => {
            const isReady = ready.has(s.slug);
            return (
              <li
                key={s.slug}
                role="option"
                aria-selected={i === activeIdx}
                data-active={i === activeIdx}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => go(s.slug)}
                onMouseEnter={() => setActiveIdx(i)}
              >
                <span className="ssr-name">{s.name}</span>
                <span className="ssr-abbr">{s.abbr}</span>
                <span className={`ssr-status ${isReady ? "ready" : "soon"}`}>
                  {isReady ? "Ready →" : "Coming soon"}
                </span>
              </li>
            );
          })}
        </ul>
      )}
      {open && query.trim() && matches.length === 0 && (
        <div className="statesearch-empty">No state matches &ldquo;{query}&rdquo;.</div>
      )}
    </div>
  );
}
