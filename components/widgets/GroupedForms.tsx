"use client";

import { useState, useMemo } from "react";
import type { Form, FormGroup } from "../../lib/types/state-guide";

const GROUP_LABELS: Record<FormGroup, string> = {
  starting: "Starting your case",
  service: "Serving the defendant",
  hearing: "At the hearing",
  counterclaim: "Counterclaim",
  "after-judgment": "After judgment / collecting",
  "fee-waiver": "Fee waiver",
  appeal: "Appeals",
};

const GROUP_ORDER: FormGroup[] = [
  "starting",
  "service",
  "hearing",
  "counterclaim",
  "after-judgment",
  "fee-waiver",
  "appeal",
];

export default function GroupedForms({ forms }: { forms: Form[] }) {
  const [query, setQuery] = useState("");
  const searching = query.trim().length > 0;

  const filtered = useMemo(() => {
    if (!searching) return forms;
    const q = query.toLowerCase();
    return forms.filter(
      (f) =>
        f.number.toLowerCase().includes(q) ||
        f.name.toLowerCase().includes(q) ||
        f.description.toLowerCase().includes(q)
    );
  }, [forms, searching, query]);

  const grouped = useMemo(() => {
    const map = new Map<FormGroup, Form[]>();
    for (const f of filtered) {
      if (!map.has(f.group)) map.set(f.group, []);
      map.get(f.group)!.push(f);
    }
    return GROUP_ORDER.filter((g) => map.has(g)).map((g) => ({ group: g, forms: map.get(g)! }));
  }, [filtered]);

  return (
    <div className="forms-explorer">
      <div className="ce-search">
        <svg className="ce-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-3.5-3.5" />
        </svg>
        <input
          type="search"
          placeholder="Search by form number or name (e.g. SC-100, deposit, garnish)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search forms"
        />
        {searching && (
          <button className="ce-clear" onClick={() => setQuery("")} aria-label="Clear search">
            ×
          </button>
        )}
      </div>

      {grouped.length === 0 && (
        <p className="forms-empty">No forms match &ldquo;{query}&rdquo;.</p>
      )}

      <div className="form-groups">
        {grouped.map(({ group, forms: groupForms }) => (
          <details key={group} open={searching || group === "starting"} className="form-group">
            <summary>
              <span className="form-group-name">{GROUP_LABELS[group]}</span>
              <span className="form-group-count">{groupForms.length}</span>
            </summary>
            <ul>
              {groupForms.map((f) => (
                <li key={f.number} className="form-row">
                  <span className="form-row-num">{f.number}</span>
                  <div className="form-row-body">
                    <span className="form-row-name">{f.name}</span>
                    <span className="form-row-desc">{f.description}</span>
                  </div>
                  {f.url ? (
                    <a className="form-row-link" href={f.url} target="_blank" rel="noopener noreferrer">
                      PDF →
                    </a>
                  ) : (
                    <span className="form-row-link form-row-link-muted">PDF</span>
                  )}
                </li>
              ))}
            </ul>
          </details>
        ))}
      </div>
    </div>
  );
}
