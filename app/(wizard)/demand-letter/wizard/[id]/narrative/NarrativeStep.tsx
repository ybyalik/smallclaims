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
import CountyField from "../../../../../../components/wizard/CountyField";
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
  let city: string | undefined;
  let state: string | undefined;
  if (parts.length >= 2) {
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
  return { city, state, zip };
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
  const [incidentLocation, setIncidentLocation] = useState<string>(
    (initialAnswers.incident_location as string) || ""
  );
  const [incidentCounty, setIncidentCounty] = useState<string>(
    (initialAnswers.incident_county as string) || ""
  );

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
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

  function readyError(): string | null {
    if (narrative.trim().length < 10) return "Describe what happened (at least 10 characters).";
    if (!disputeType) return "Select a claim type.";
    if (!incidentDate) return "Enter the date of the incident.";
    if (!incidentLocation.trim()) return "Enter the city and state of the incident.";
    return null;
  }

  async function continueToNext() {
    const err = readyError();
    if (err) {
      setError(err);
      return;
    }
    setSaving(true);
    setError(null);
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
            incident_county: incidentCounty,
            ai_summary: summary,
            checklist,
          },
        }),
      });
      if (!res.ok) throw new Error("Could not save");
      router.push(`/demand-letter/wizard/${caseId}/claim-amount`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not save");
      setSaving(false);
    }
  }

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
      />
      <div className="dlw-char-count">{narrative.length}/500</div>

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
      </div>

      {/* DATE & LOCATION */}
      <div className="dlw-field-row" style={{ marginTop: 22 }}>
        <Field label="Date of incident" required>
          <input
            type="date"
            value={incidentDate}
            onChange={(e) => setIncidentDate(e.target.value)}
            className="dlw-input"
            max={new Date().toISOString().slice(0, 10)}
          />
        </Field>
        <Field label="Location (City, State)" required>
          <input
            value={incidentLocation}
            onChange={(e) => setIncidentLocation(e.target.value)}
            className="dlw-input"
            placeholder="e.g., Austin, TX"
          />
        </Field>
      </div>

      <Field label="Incident county">
        <CountyField
          address={parseIncidentLocation(incidentLocation)}
          value={incidentCounty}
          onChange={setIncidentCounty}
          label="Incident county"
        />
      </Field>

      <div className="dlw-actions">
        <Link
          href={`/demand-letter/wizard/${caseId}/plaintiff`}
          className="dlw-actions-back"
        >
          ← Back
        </Link>
        <button className="dlw-cta" onClick={continueToNext} disabled={saving}>
          {saving ? "Saving…" : "Set the amount ▶"}
        </button>
      </div>
      {error ? <p style={{ color: "var(--accent)", marginTop: 12 }}>{error}</p> : null}
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

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="dlw-field">
      <span className="dlw-label">
        {label} {required ? <em className="dlw-required">*</em> : null}
      </span>
      {children}
    </label>
  );
}
