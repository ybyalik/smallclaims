"use client";

import { useEffect, useMemo, useRef, useState } from "react";

export interface ComboboxOption {
  value: string;
  label: string;
  sublabel?: string;
  search?: string;
}

interface Props {
  value: string;
  onChange: (value: string) => void;
  options: ComboboxOption[];
  placeholder?: string;
  ariaLabel?: string;
  emptyLabel?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  id?: string;
}

export default function Combobox({
  value,
  onChange,
  options,
  placeholder = "Type to search or pick from the list…",
  ariaLabel,
  emptyLabel,
  disabled,
  fullWidth,
  id,
}: Props) {
  const selected = useMemo(() => options.find((o) => o.value === value) || null, [options, value]);
  const [query, setQuery] = useState<string>(selected?.label ?? "");
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(-1);
  const wrapRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listId = id ? `${id}-list` : undefined;

  useEffect(() => {
    setQuery(selected?.label ?? "");
  }, [selected]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q || q === selected?.label.toLowerCase()) return options;
    return options.filter((o) => {
      const hay = `${o.label} ${o.sublabel ?? ""} ${o.search ?? ""}`.toLowerCase();
      return hay.includes(q);
    });
  }, [query, options, selected]);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery(selected?.label ?? "");
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open, selected]);

  useEffect(() => {
    setHighlight(filtered.length > 0 ? 0 : -1);
  }, [filtered.length]);

  function pick(opt: ComboboxOption) {
    onChange(opt.value);
    setQuery(opt.label);
    setOpen(false);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setHighlight((h) => Math.min(h + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlight((h) => Math.max(h - 1, 0));
    } else if (e.key === "Enter") {
      if (open && highlight >= 0 && filtered[highlight]) {
        e.preventDefault();
        pick(filtered[highlight]);
      }
    } else if (e.key === "Escape") {
      setOpen(false);
      setQuery(selected?.label ?? "");
    } else if (e.key === "Tab") {
      setOpen(false);
    }
  }

  return (
    <div
      className={`dlw-combo${fullWidth ? " dlw-combo-full" : ""}`}
      ref={wrapRef}
    >
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={onKeyDown}
        className="dlw-combo-input"
        placeholder={placeholder}
        aria-label={ariaLabel}
        role="combobox"
        aria-expanded={open}
        aria-autocomplete="list"
        aria-controls={listId}
        aria-activedescendant={
          highlight >= 0 && filtered[highlight] && id
            ? `${id}-opt-${filtered[highlight].value}`
            : undefined
        }
        autoComplete="off"
        disabled={disabled}
      />
      <button
        type="button"
        className="dlw-combo-toggle"
        onClick={() => {
          if (disabled) return;
          setOpen((o) => !o);
          inputRef.current?.focus();
        }}
        aria-label={open ? "Close list" : "Open list"}
        tabIndex={-1}
      >
        <svg
          viewBox="0 0 24 24"
          width="16"
          height="16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          style={{
            transform: open ? "rotate(180deg)" : "rotate(0)",
            transition: "transform .15s ease",
          }}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open && !disabled ? (
        <ul id={listId} role="listbox" className="dlw-combo-list" aria-label={ariaLabel}>
          {filtered.length === 0 ? (
            <li className="dlw-combo-empty">
              {emptyLabel || `No matches for "${query}"`}
            </li>
          ) : (
            filtered.map((o, i) => (
              <li
                key={o.value}
                id={id ? `${id}-opt-${o.value}` : undefined}
                role="option"
                aria-selected={o.value === value}
                className={`dlw-combo-opt${i === highlight ? " is-highlighted" : ""}${
                  o.value === value ? " is-selected" : ""
                }`}
                onMouseDown={(e) => {
                  e.preventDefault();
                  pick(o);
                }}
                onMouseEnter={() => setHighlight(i)}
              >
                <span className="dlw-combo-opt-label">{o.label}</span>
                {o.sublabel ? (
                  <span className="dlw-combo-opt-sub">{o.sublabel}</span>
                ) : null}
              </li>
            ))
          )}
        </ul>
      ) : null}
    </div>
  );
}
