"use client";

import { useState, useMemo } from "react";
import type { ClaimCategory, Claim } from "../../lib/types/state-guide";

export default function ClaimExplorer({ categories }: { categories: ClaimCategory[] }) {
  const [activeId, setActiveId] = useState(categories[0]?.id ?? "");
  const [query, setQuery] = useState("");

  const totalClaims = useMemo(
    () => categories.reduce((sum, c) => sum + c.claims.length, 0),
    [categories]
  );

  const searching = query.trim().length > 0;

  const searchResults = useMemo(() => {
    if (!searching) return [];
    const q = query.toLowerCase();
    const hits: { claim: Claim; category: ClaimCategory }[] = [];
    for (const cat of categories) {
      for (const claim of cat.claims) {
        const haystack = `${claim.name} ${claim.example} ${claim.notes ?? ""} ${claim.damageBoost ?? ""}`.toLowerCase();
        if (haystack.includes(q)) hits.push({ claim, category: cat });
      }
    }
    return hits;
  }, [searching, query, categories]);

  const activeCategory = categories.find((c) => c.id === activeId) ?? categories[0];

  return (
    <div className="claim-explorer">
      <div className="ce-search">
        <svg className="ce-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-3.5-3.5" />
        </svg>
        <input
          type="search"
          placeholder={`Search ${totalClaims} claim types (try "deposit" or "wage")`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search claim types"
        />
        {searching && (
          <button className="ce-clear" onClick={() => setQuery("")} aria-label="Clear search">
            ×
          </button>
        )}
      </div>

      {!searching && (
        <>
          <div className="ce-pills" role="tablist">
            {categories.map((c) => (
              <button
                key={c.id}
                role="tab"
                aria-selected={activeId === c.id}
                data-active={activeId === c.id}
                onClick={() => setActiveId(c.id)}
                className="ce-pill"
              >
                <span className="ce-pill-label">{c.title}</span>
                <span className="ce-pill-count">{c.claims.length}</span>
              </button>
            ))}
          </div>

          <div className="ce-pane" role="tabpanel">
            <p className="ce-blurb">{activeCategory.blurb}</p>
            <ul className="ce-claims">
              {activeCategory.claims.map((claim) => (
                <ClaimCard key={claim.id} claim={claim} />
              ))}
            </ul>
          </div>
        </>
      )}

      {searching && (
        <div className="ce-pane">
          <p className="ce-blurb">
            {searchResults.length === 0
              ? `No claims match "${query}". Try a different word.`
              : `${searchResults.length} ${searchResults.length === 1 ? "match" : "matches"} for "${query}"`}
          </p>
          <ul className="ce-claims">
            {searchResults.map(({ claim, category }) => (
              <ClaimCard key={`${category.id}-${claim.id}`} claim={claim} categoryLabel={category.title} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function ClaimCard({ claim, categoryLabel }: { claim: Claim; categoryLabel?: string }) {
  const [open, setOpen] = useState(false);
  const hasMore = !!(claim.notes || claim.damageBoost || claim.statute);
  return (
    <li className="ce-claim">
      <button
        className="ce-claim-head"
        onClick={() => hasMore && setOpen((o) => !o)}
        aria-expanded={open}
        disabled={!hasMore}
        type="button"
      >
        <div className="ce-claim-text">
          {categoryLabel && <span className="ce-claim-cat">{categoryLabel}</span>}
          <h4>{claim.name}</h4>
          <p>{claim.example}</p>
        </div>
        {hasMore && (
          <span className="ce-claim-chevron" aria-hidden="true" data-open={open}>
            ▾
          </span>
        )}
      </button>
      {open && hasMore && (
        <div className="ce-claim-details">
          {claim.damageBoost && (
            <div className="ce-detail-boost">
              <span className="ce-boost-tag">Bonus damages</span>
              <span>{claim.damageBoost}</span>
            </div>
          )}
          {claim.notes && <div className="ce-detail-notes">{claim.notes}</div>}
          {claim.statute && <div className="ce-detail-statute">{claim.statute}</div>}
        </div>
      )}
    </li>
  );
}
