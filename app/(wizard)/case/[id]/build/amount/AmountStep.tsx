"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  useFormErrors,
  ErrorSummary,
} from "../../../../../../components/wizard/form-errors";
import { useAutosave } from "../useAutosave";

interface Props {
  caseId: string;
  initialCents: number;
}

const COMMON_AMOUNTS = [500, 1_000, 2_500, 5_000, 10_000, 25_000];
const DEFAULT_DOLLARS = 1_000;
const MIN_DOLLARS = 50;

export default function AmountStep({ caseId, initialCents }: Props) {
  const router = useRouter();
  const initialDollars = initialCents > 0 ? Math.round(initialCents / 100) : 0;
  const [dollars, setDollars] = useState<number>(initialDollars);
  const [unsure, setUnsure] = useState<boolean>(false);
  const [saving, setSaving] = useState(false);
  const { errors, showErrors, clear, setErrors } = useFormErrors();

  // Autosave: persists amount + unsure flag as the user edits.
  const autoDollars = unsure ? DEFAULT_DOLLARS : dollars;
  useAutosave(
    caseId,
    autoDollars > 0
      ? {
          amount_cents: autoDollars * 100,
          intake_answers: { amount_unknown: unsure },
        }
      : {},
  );

  function onInput(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value.replace(/[^0-9]/g, "");
    setDollars(raw === "" ? 0 : parseInt(raw, 10));
    setUnsure(false);
  }

  function pickChip(amount: number) {
    setDollars(amount);
    setUnsure(false);
  }

  function validate(): Record<string, string> {
    const errs: Record<string, string> = {};
    if (!unsure && dollars < MIN_DOLLARS) {
      errs.amount = `Amount must be at least $${MIN_DOLLARS}.`;
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
    const finalDollars = unsure ? DEFAULT_DOLLARS : dollars;
    try {
      const res = await fetch(`/api/demand-letters/${caseId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount_cents: finalDollars * 100,
          intake_answers: { amount_unknown: unsure },
        }),
      });
      if (!res.ok) throw new Error("Could not save");
      router.push(`/case/${caseId}/build/state`);
    } catch (e) {
      setErrors({ _save: e instanceof Error ? e.message : "Could not save" });
      setSaving(false);
    }
  }

  return (
    <div className="dlw-step">
      <div className="dlw-step-eyebrow">Step 2 of 5</div>
      <h1>About how much are you owed?</h1>
      <p className="dlw-sub">A rough number is fine. You can refine this later.</p>

      {/* Big number input with $ prefix */}
      <div className="dlw-amount-input-wrap">
        <span className="dlw-amount-input-prefix">$</span>
        <input
          type="text"
          inputMode="numeric"
          value={unsure ? "" : dollars > 0 ? dollars.toLocaleString("en-US") : ""}
          onChange={onInput}
          className="dlw-amount-input-big"
          placeholder={unsure ? "1,000" : "0"}
          aria-label="Amount in US dollars"
          autoFocus
          aria-invalid={!!errors.amount}
        />
      </div>

      {/* Quick-pick chips */}
      <div className="dlw-amount-chips" style={{ marginTop: 16 }}>
        {COMMON_AMOUNTS.map((amount) => (
          <button
            key={amount}
            type="button"
            className={`dlw-amount-chip${dollars === amount && !unsure ? " is-on" : ""}`}
            onClick={() => pickChip(amount)}
          >
            ${amount.toLocaleString("en-US")}
          </button>
        ))}
      </div>

      <button
        type="button"
        className="dlw-amt-not-sure"
        onClick={() => setUnsure(!unsure)}
      >
        {unsure
          ? "✓ Not sure — using $1,000 placeholder. Click to enter exact."
          : "I'm not sure of the exact amount"}
      </button>

      <ErrorSummary errors={errors} order={["amount", "_save"]} />

      <div className="dlw-actions">
        <Link
          href={`/case/${caseId}/build/category`}
          className="dlw-actions-back"
        >
          ← Back
        </Link>
        <button className="dlw-cta" onClick={continueToNext} disabled={saving}>
          {saving ? "Saving…" : "Continue ▶"}
        </button>
      </div>
    </div>
  );
}
