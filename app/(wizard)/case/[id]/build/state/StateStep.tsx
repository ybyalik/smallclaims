"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { getStateContext } from "../../../../../../lib/demand-letter/state-context";
import Combobox, { type ComboboxOption } from "../../../../../../components/wizard/Combobox";
import {
  useFormErrors,
  ErrorSummary,
} from "../../../../../../components/wizard/form-errors";
import { useAutosave } from "../useAutosave";

interface State {
  slug: string;
  name: string;
  abbr: string;
}

interface Props {
  caseId: string;
  initialAbbr: string;
  states: State[];
}

export default function StateStep({ caseId, initialAbbr, states }: Props) {
  const router = useRouter();
  const [abbr, setAbbr] = useState<string>(initialAbbr);
  const [saving, setSaving] = useState(false);
  const { errors, showErrors, clear, setErrors } = useFormErrors();

  const ctx = useMemo(() => (abbr ? getStateContext(abbr) : null), [abbr]);

  // Autosave: persists state pick as soon as it's chosen.
  useAutosave(
    caseId,
    abbr ? { state: abbr, intake_answers: { recipient_state: abbr } } : {},
  );

  const options = useMemo<ComboboxOption[]>(
    () =>
      states.map((s) => ({
        value: s.abbr,
        label: s.name,
        sublabel: s.abbr,
        search: s.abbr,
      })),
    [states],
  );

  function validate(): Record<string, string> {
    const errs: Record<string, string> = {};
    if (!abbr) errs.state = "Select the recipient's state to continue.";
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
      const res = await fetch(`/api/demand-letters/${caseId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          state: abbr,
          intake_answers: { recipient_state: abbr },
        }),
      });
      if (!res.ok) throw new Error("Could not save");
      router.push(`/case/${caseId}/build/eligibility`);
    } catch (e) {
      setErrors({ _save: e instanceof Error ? e.message : "Could not save" });
      setSaving(false);
    }
  }

  return (
    <div className="dlw-step">
      <div className="dlw-step-eyebrow">Step 3 of 5</div>
      <h1>Where is the other party located?</h1>
      <p className="dlw-sub">
        We use this to set the tone of the letter and calculate statutory interest.
      </p>

      <Combobox
        id="recipient-state"
        value={abbr}
        onChange={setAbbr}
        options={options}
        ariaLabel="Recipient state"
        placeholder="Type to search or pick from the list…"
      />

      {ctx ? (
        <div className="dlw-state-context">
          <strong>{ctx.name} — quick context</strong>
          <ul>
            <li>
              Statutory pre-judgment interest:{" "}
              <strong>{ctx.prejudgment_interest_rate}%</strong> per year
            </li>
            <li>
              If they don&rsquo;t pay, your next step is small claims court in {ctx.name}.
              Max claim:{" "}
              <strong>${ctx.small_claims_max_dollars.toLocaleString("en-US")}</strong>
            </li>
          </ul>
        </div>
      ) : null}

      <ErrorSummary errors={errors} order={["state", "_save"]} />

      <div className="dlw-actions">
        <Link href={`/case/${caseId}/build/amount`} className="dlw-actions-back">
          ← Back
        </Link>
        <button className="dlw-cta" onClick={continueToNext} disabled={saving}>
          {saving ? "Saving…" : "Continue ▶"}
        </button>
      </div>
    </div>
  );
}
