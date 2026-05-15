"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CATEGORIES } from "../../../../../../lib/demand-letter/categories";
import type { DisputeType } from "../../../../../../lib/supabase/types";
import {
  useFormErrors,
  ErrorSummary,
} from "../../../../../../components/wizard/form-errors";
import { useAutosave } from "../useAutosave";

interface Props {
  caseId: string;
  initialSlug: DisputeType;
  initialCustomText: string;
}

const CUSTOM_TEXT_MIN = 8;
const CUSTOM_TEXT_MAX = 240;

export default function CategoryStep({
  caseId,
  initialSlug,
  initialCustomText,
}: Props) {
  const router = useRouter();
  // "other" is the default placeholder set on case create. Treat it as
  // not-selected unless the user explicitly clicks it during this step.
  const [selected, setSelected] = useState<DisputeType | null>(
    initialSlug && initialSlug !== "other" ? initialSlug : null,
  );
  const [otherText, setOtherText] = useState(initialCustomText);
  // Once a user explicitly picks "other" on this visit, we hydrate the
  // pre-saved custom text (if any). Until then the textarea stays hidden.
  const [otherPicked, setOtherPicked] = useState(
    initialSlug === "other" && initialCustomText.length > 0,
  );
  const [saving, setSaving] = useState(false);
  const { errors, showErrors, clear, setErrors } = useFormErrors();

  // Autosave the slug as it changes. The "other" text is saved on submit
  // (a debounced autosave on every keystroke spams the API).
  useAutosave(caseId, selected ? { dispute_type: selected } : {});

  const isOther = selected === "other" || otherPicked;
  const trimmedOther = otherText.trim();
  const otherTextValid =
    trimmedOther.length >= CUSTOM_TEXT_MIN &&
    trimmedOther.length <= CUSTOM_TEXT_MAX;

  function pickCategory(slug: DisputeType) {
    setSelected(slug);
    setOtherPicked(slug === "other");
    clear();
  }

  function validate(): Record<string, string> {
    const errs: Record<string, string> = {};
    if (!selected) {
      errs.category = "Pick a category to continue.";
      return errs;
    }
    if (selected === "other") {
      if (trimmedOther.length < CUSTOM_TEXT_MIN) {
        errs.other_text = `Briefly describe your dispute (at least ${CUSTOM_TEXT_MIN} characters).`;
      } else if (trimmedOther.length > CUSTOM_TEXT_MAX) {
        errs.other_text = `Keep it under ${CUSTOM_TEXT_MAX} characters.`;
      }
    }
    return errs;
  }

  async function continueToNext() {
    if (saving) return;
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      showErrors(errs);
      return;
    }
    setSaving(true);
    clear();
    try {
      const body: Record<string, unknown> = { dispute_type: selected };
      if (selected === "other") {
        body.intake_answers = { dispute_type_other: trimmedOther };
      } else {
        // Clear any leftover custom text from a previous "Other" selection.
        body.intake_answers = { dispute_type_other: null };
      }
      const res = await fetch(`/api/demand-letters/${caseId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error("Could not save");
      router.push(`/case/${caseId}/build/amount`);
    } catch (e) {
      setErrors({ _save: e instanceof Error ? e.message : "Could not save" });
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
              onClick={() => pickCategory(cat.slug)}
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

      {isOther ? (
        <div className="dlw-field" style={{ marginTop: 16 }}>
          <label htmlFor="dispute-other" className="dlw-label">
            Describe your dispute
          </label>
          <p className="dlw-sub" style={{ marginBottom: 8 }}>
            One or two short sentences. We use this everywhere the category would otherwise show, including your demand letter.
          </p>
          <textarea
            id="dispute-other"
            className="dlw-textarea"
            rows={3}
            maxLength={CUSTOM_TEXT_MAX}
            value={otherText}
            onChange={(e) => setOtherText(e.target.value)}
            placeholder="e.g. The airline lost my checked luggage on a domestic flight and the claim form was denied."
          />
          <div className="dlw-sub" style={{ marginTop: 4 }}>
            {trimmedOther.length}/{CUSTOM_TEXT_MAX}
            {otherTextValid ? null : (
              <span style={{ marginLeft: 8 }}>
                {trimmedOther.length < CUSTOM_TEXT_MIN
                  ? `(at least ${CUSTOM_TEXT_MIN} characters)`
                  : ""}
              </span>
            )}
          </div>
        </div>
      ) : null}

      <ErrorSummary errors={errors} order={["category", "other_text", "_save"]} />

      <div className="dlw-actions">
        <span />
        <button
          className="dlw-cta"
          onClick={continueToNext}
          disabled={saving}
        >
          {saving ? "Saving…" : "Continue ▶"}
        </button>
      </div>
    </div>
  );
}
