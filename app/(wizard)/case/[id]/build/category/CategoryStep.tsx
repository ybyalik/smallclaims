"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CATEGORIES } from "../../../../../../lib/demand-letter/categories";
import type { DisputeType } from "../../../../../../lib/supabase/types";
import { useAutosave } from "../useAutosave";

interface Props {
  caseId: string;
  initialSlug: DisputeType;
}

export default function CategoryStep({ caseId, initialSlug }: Props) {
  const router = useRouter();
  // "other" is the default placeholder set on case create. Treat it as
  // not-selected unless the user explicitly clicks it during this step.
  const [selected, setSelected] = useState<DisputeType | null>(
    initialSlug && initialSlug !== "other" ? initialSlug : null
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Autosave: persists the field every time it changes (debounced 500ms).
  useAutosave(caseId, selected ? { dispute_type: selected } : {});

  const ready = selected !== null;

  async function continueToNext() {
    if (!ready || saving) return;
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`/api/demand-letters/${caseId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dispute_type: selected }),
      });
      if (!res.ok) throw new Error("Could not save");
      router.push(`/case/${caseId}/build/amount`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not save");
      setSaving(false);
    }
  }

  return (
    <div className="dlw-step">
      <div className="dlw-step-eyebrow">Step 1 of 5 · Quick start</div>
      <h1>What&apos;s your dispute about?</h1>
      <p className="dlw-sub">Pick the situation that fits yours best. You can change this later.</p>

      <div className="dlw-cat-grid">
        {CATEGORIES.map((cat) => {
          const isSel = selected === cat.slug;
          const Icon = cat.icon;
          return (
            <button
              key={cat.slug}
              type="button"
              className={`dlw-cat-card${isSel ? " is-selected" : ""}`}
              onClick={() => setSelected(cat.slug)}
              aria-pressed={isSel}
            >
              <div className="dlw-cat-icon">
                <Icon size={18} strokeWidth={1.8} />
              </div>
              <strong>{cat.label}</strong>
              <span style={{ fontSize: 13, color: "#6b6b6b", lineHeight: 1.4 }}>{cat.blurb}</span>
            </button>
          );
        })}
      </div>

      <div className="dlw-actions">
        <span />
        <button
          className="dlw-cta"
          onClick={continueToNext}
          disabled={!ready || saving}
        >
          {saving ? "Saving…" : "Continue ▶"}
        </button>
      </div>
      {error ? <p style={{ color: "var(--accent)", marginTop: 12 }}>{error}</p> : null}
    </div>
  );
}
