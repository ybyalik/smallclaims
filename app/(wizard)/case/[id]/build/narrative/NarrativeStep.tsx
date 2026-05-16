"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { CATEGORIES } from "../../../../../../lib/demand-letter/categories";
import {
  checklistFromNarrative,
  summaryFromNarrative,
  type NarrativeChecklist,
} from "../../../../../../lib/demand-letter/ai-mocks";
import type { DisputeType } from "../../../../../../lib/supabase/types";
import Combobox, { type ComboboxOption } from "../../../../../../components/wizard/Combobox";
import { listStates } from "../../../../../../lib/demand-letter/state-context";
import CountyField, {
  type CountyLookupStatus,
} from "../../../../../../components/wizard/CountyField";
import {
  useFormErrors,
  ErrorSummary,
  Field,
} from "../../../../../../components/wizard/form-errors";
import { validateNarrativePhase } from "../../../../../../lib/cases/phase-validators";
import { useAutosave } from "../useAutosave";

// "Austin, TX" / "Old Bridge NJ" / "Old Bridge, New Jersey 08857"
// → { city, state, zip } so the county-lookup helper can use it.
function parseIncidentLocation(raw: string): {
  line1?: string;
  city?: string;
  state?: string;
  zip?: string;
} {
  const s = raw.trim();
  if (!s) return {};
  const zipMatch = s.match(/\b(\d{5})(?:-\d{4})?\b/);
  const zip = zipMatch?.[1];
  // Drop the zip from the working string then split on commas/whitespace
  const noZip = (zipMatch ? s.replace(zipMatch[0], "") : s).trim().replace(/\s+/g, " ");
  const parts = noZip.split(/\s*,\s*/).filter(Boolean);
  let line1: string | undefined;
  let city: string | undefined;
  let state: string | undefined;
  if (parts.length >= 3) {
    // "123 Main St, Austin, TX" → line1="123 Main St", city="Austin", state="TX"
    state = parts[parts.length - 1];
    city = parts[parts.length - 2];
    line1 = parts.slice(0, -2).join(", ");
  } else if (parts.length === 2) {
    // "Austin, TX" → city="Austin", state="TX"
    city = parts[0];
    state = parts[1];
  } else {
    // No comma — try to split last token as state if it's 2 chars
    const tokens = noZip.split(/\s+/);
    if (tokens.length >= 2 && /^[A-Za-z]{2}$/.test(tokens[tokens.length - 1])) {
      state = tokens.pop();
      city = tokens.join(" ");
    } else {
      city = noZip;
    }
  }
  return { line1, city, state, zip };
}

interface Props {
  caseId: string;
  initialNarrative: string;
  initialDisputeType: DisputeType;
  initialAnswers: Record<string, unknown>;
}

const CHIPS = [
  "I paid for work that was never finished.",
  "I'm owed money for services I provided.",
  "I bought something faulty or not as described.",
  "My deposit wasn't returned.",
];

const STATE_OPTIONS: ComboboxOption[] = listStates().map((s) => ({
  value: s.abbr,
  label: s.name,
  sublabel: s.abbr,
  search: s.abbr,
}));

export default function NarrativeStep({
  caseId,
  initialNarrative,
  initialDisputeType,
  initialAnswers,
}: Props) {
  const router = useRouter();

  const [narrative, setNarrative] = useState(initialNarrative);
  const [disputeType, setDisputeType] = useState<DisputeType>(initialDisputeType);
  const [incidentDate, setIncidentDate] = useState<string>(
    (initialAnswers.incident_date as string) || ""
  );
  // Initial city/state: prefer dedicated keys if they exist (set by this
  // form going forward), fall back to parsing the legacy combined
  // incident_location string so older cases still hydrate correctly.
  const initialLegacyLoc = parseIncidentLocation(
    (initialAnswers.incident_location as string) || "",
  );
  const [incidentCity, setIncidentCity] = useState<string>(
    (initialAnswers.incident_city as string) || initialLegacyLoc.city || "",
  );
  const [incidentStateAbbr, setIncidentStateAbbr] = useState<string>(
    (initialAnswers.incident_state as string) ||
      (initialLegacyLoc.state || "").toUpperCase().slice(0, 2),
  );
  const [incidentCounty, setIncidentCounty] = useState<string>(
    (initialAnswers.incident_county as string) || ""
  );
  // Derived combined string, kept in sync for downstream consumers (validator,
  // demand-letter generator, customer report) that read `incident_location`.
  const incidentLocation = (
    incidentCity.trim() && incidentStateAbbr.trim()
      ? `${incidentCity.trim()}, ${incidentStateAbbr.trim().toUpperCase()}`
      : incidentCity.trim() || incidentStateAbbr.trim()
  );

  const [saving, setSaving] = useState(false);
  const { errors, showErrors, clear, setErrors } = useFormErrors();
  const [countyStatus, setCountyStatus] = useState<CountyLookupStatus>("idle");
  const [debouncedNarrative, setDebouncedNarrative] = useState(narrative);

  useEffect(() => {
    const id = setTimeout(() => setDebouncedNarrative(narrative), 1500);
    return () => clearTimeout(id);
  }, [narrative]);

  const checklist: NarrativeChecklist = useMemo(
    () => checklistFromNarrative(debouncedNarrative),
    [debouncedNarrative]
  );
  const summary: string = useMemo(
    () => (debouncedNarrative.length >= 30 ? summaryFromNarrative(debouncedNarrative) : ""),
    [debouncedNarrative]
  );

  // Autosave: persist narrative + supporting fields as the user types.
  // Uses the debounced narrative (already 1.5s smoothed) plus immediate values
  // for the other inputs. Empty narrative is skipped by the hook.
  useAutosave(caseId, {
    facts_narrative: narrative,
    dispute_type: disputeType,
    incident_county: incidentCounty.trim() || null,
    intake_answers: {
      incident_date: incidentDate,
      incident_location: incidentLocation,
      incident_city: incidentCity.trim() || null,
      incident_state: incidentStateAbbr.trim().toUpperCase() || null,
      incident_county: incidentCounty,
    },
  });

  function applyChip(text: string) {
    if (!narrative.trim()) {
      setNarrative(text);
    } else {
      setNarrative(text + " " + narrative);
    }
  }

  function validate(): Record<string, string> {
    return validateNarrativePhase({
      narrative,
      disputeType,
      incidentDate,
      incidentLocation,
      incidentCounty,
    });
  }

  async function continueToNext() {
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
          facts_narrative: narrative,
          dispute_type: disputeType,
          incident_county: incidentCounty.trim() || null,
          intake_answers: {
            incident_date: incidentDate,
            incident_location: incidentLocation,
            incident_city: incidentCity.trim() || null,
            incident_state: incidentStateAbbr.trim().toUpperCase() || null,
            incident_county: incidentCounty,
            ai_summary: summary,
            checklist,
          },
        }),
      });
      if (!res.ok) throw new Error("Could not save");
      router.push(`/case/${caseId}/build/claim-amount`);
    } catch (e) {
      setErrors({ _save: e instanceof Error ? e.message : "Could not save" });
      setSaving(false);
    }
  }

  // Only treat the lookup as blocking when the county field is EMPTY.
  // A background re-lookup while the field is already populated must not
  // gray out the Continue button.
  const isCountyLookingUp = countyStatus === "looking_up" && !incidentCounty.trim();

  return (
    <div className="dlw-step">
      <div className="dlw-step-eyebrow">Phase 3 of 6</div>
      <h1>What happened?</h1>
      <p className="dlw-sub">
        2 to 3 sentences is enough. We&rsquo;ll ask follow-up questions to fill in the gaps.
      </p>

      <div className="dlw-chips">
        {CHIPS.map((chip) => (
          <button
            key={chip}
            type="button"
            className="dlw-chip"
            onClick={() => applyChip(chip)}
          >
            {chip}
          </button>
        ))}
      </div>

      <textarea
        className="dlw-textarea"
        value={narrative}
        onChange={(e) => setNarrative(e.target.value.slice(0, 500))}
        placeholder="Tell us what happened in your own words…"
        rows={4}
        aria-invalid={!!errors.narrative}
      />
      <div className="dlw-char-count">{narrative.length}/500</div>
      {errors.narrative ? (
        <span className="dlw-field-error-msg">{errors.narrative}</span>
      ) : null}

      <div className="dlw-strengthen">
        <div className="dlw-strengthen-title">Strengthen your claim</div>
        <ChecklistRow
          checked={checklist.payment_amount_and_when}
          label="How much you paid and when"
        />
        <ChecklistRow
          checked={checklist.agreement_terms}
          label="What was agreed (written or verbal)"
        />
        <ChecklistRow
          checked={checklist.what_went_wrong}
          label="What went wrong or wasn't delivered"
        />
        <ChecklistRow
          checked={checklist.resolution_attempted}
          label="Whether you've tried to resolve it"
        />
      </div>

      <div className="dlw-banner">
        Please don&rsquo;t argue the case here. Just explain what happened. Our team
        will frame it for the letter.
      </div>

      {summary ? (
        <div className="dlw-summary-card">
          <strong>Summary for forms</strong>
          <span>&ldquo;{summary}&rdquo;</span>
        </div>
      ) : null}

      {/* CLAIM TYPE */}
      <div style={{ marginTop: 28 }}>
        <h3
          style={{
            fontFamily: "Newsreader, Georgia, serif",
            fontSize: 18,
            margin: "0 0 10px",
          }}
        >
          What type of claim is this?
        </h3>
        <Combobox
          id="claim-type"
          value={disputeType}
          onChange={(v) => setDisputeType(v as DisputeType)}
          options={CATEGORIES.map<ComboboxOption>((c) => ({ value: c.slug, label: c.label }))}
          ariaLabel="Claim type"
          placeholder="Select a claim type…"
        />
        {errors.disputeType ? (
          <span className="dlw-field-error-msg">{errors.disputeType}</span>
        ) : null}
      </div>

      {/* DATE & LOCATION */}
      <div className="dlw-field-row" style={{ marginTop: 22 }}>
        <Field label="Date of incident" required error={errors.incidentDate}>
          <input
            type="date"
            value={incidentDate}
            onChange={(e) => setIncidentDate(e.target.value)}
            className="dlw-input"
            max={new Date().toISOString().slice(0, 10)}
            aria-invalid={!!errors.incidentDate}
          />
        </Field>
        <Field label="City of incident" required error={errors.incidentLocation}>
          <input
            value={incidentCity}
            onChange={(e) => setIncidentCity(e.target.value)}
            className="dlw-input"
            placeholder="e.g., Austin"
            aria-invalid={!!errors.incidentLocation}
          />
        </Field>
        <Field label="State of incident" required error={errors.incidentLocation}>
          <Combobox
            id="incident-state"
            value={incidentStateAbbr}
            onChange={(v) => setIncidentStateAbbr(v.toUpperCase())}
            options={STATE_OPTIONS}
            ariaLabel="State of incident"
            fullWidth
            placeholder="Select…"
          />
        </Field>
      </div>

      <div style={{ marginTop: 22 }}>
        <Field label="Incident county" required error={errors.incidentCounty}>
          <CountyField
            address={{
              city: incidentCity,
              state: incidentStateAbbr,
            }}
            value={incidentCounty}
            onChange={setIncidentCounty}
            label="Incident county"
            onStatusChange={setCountyStatus}
            invalid={!!errors.incidentCounty}
          />
        </Field>
      </div>

      <ErrorSummary
        errors={errors}
        order={[
          "narrative",
          "disputeType",
          "incidentDate",
          "incidentLocation",
          "incidentCounty",
          "_save",
        ]}
      />

      <div className="dlw-actions">
        <Link
          href={`/case/${caseId}/build/plaintiff`}
          className="dlw-actions-back"
        >
          ← Back
        </Link>
        <button
          className="dlw-cta"
          onClick={continueToNext}
          disabled={saving || isCountyLookingUp}
        >
          {saving
            ? "Saving…"
            : isCountyLookingUp
              ? "Looking up county…"
              : "Set the amount ▶"}
        </button>
      </div>
    </div>
  );
}

function ChecklistRow({ checked, label }: { checked: boolean; label: string }) {
  return (
    <div className={`dlw-strengthen-row${checked ? " is-checked" : ""}`}>
      <div className="dlw-strengthen-check">
        {checked ? (
          <svg
            viewBox="0 0 24 24"
            width="12"
            height="12"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
          >
            <path d="M5 12l4 4 10-10" />
          </svg>
        ) : null}
      </div>
      <span>{label}</span>
    </div>
  );
}

