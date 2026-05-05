"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { PostalAddress } from "../../../../../../lib/supabase/types";
import { listStates } from "../../../../../../lib/demand-letter/state-context";
import Combobox, { type ComboboxOption } from "../../../../../../components/wizard/Combobox";
import CountyField from "../../../../../../components/wizard/CountyField";
import { useAutosave } from "../useAutosave";

const BIZ_TYPES: ComboboxOption[] = [
  { value: "llc", label: "LLC" },
  { value: "corp", label: "Corporation" },
  { value: "sole_prop", label: "Sole Proprietor" },
  { value: "partnership", label: "Partnership" },
];

const STATE_OPTIONS: ComboboxOption[] = listStates().map((s) => ({
  value: s.abbr,
  label: s.name,
  sublabel: s.abbr,
  search: s.abbr,
}));

type EntityType = "individual" | "business";

interface Props {
  caseId: string;
  initialName: string;
  initialEmail: string;
  initialPhone: string;
  initialAddress: PostalAddress | null;
  initialCounty: string;
  initialAnswers: Record<string, unknown>;
}

export default function PlaintiffStep({
  caseId,
  initialName,
  initialEmail,
  initialPhone,
  initialAddress,
  initialCounty,
  initialAnswers,
}: Props) {
  const router = useRouter();

  const initialEntity =
    (initialAnswers.plaintiff_entity_type as EntityType) || "individual";
  const [entity, setEntity] = useState<EntityType>(initialEntity);

  // Best-effort split for individual
  const [first, last] = (() => {
    if (initialEntity === "individual" && initialName) {
      const p = initialName.trim().split(/\s+/);
      return [p[0] ?? "", p.slice(1).join(" ")];
    }
    return ["", ""];
  })();
  const [firstName, setFirstName] = useState(first);
  const [lastName, setLastName] = useState(last);

  // Business
  const [bizName, setBizName] = useState(
    initialEntity === "business" ? initialName : ""
  );
  const [bizSubtype, setBizSubtype] = useState(
    (initialAnswers.plaintiff_business_subtype as string) || "llc"
  );

  // Shared
  const [email, setEmail] = useState(initialEmail);
  const [phone, setPhone] = useState(initialPhone);
  const [line1, setLine1] = useState(initialAddress?.line1 ?? "");
  const [city, setCity] = useState(initialAddress?.city ?? "");
  const [stateAbbr, setStateAbbr] = useState(initialAddress?.state ?? "");
  const [zip, setZip] = useState(initialAddress?.zip ?? "");
  const [county, setCounty] = useState(initialCounty ?? "");
  const [tcpa, setTcpa] = useState<boolean>(
    !!initialAnswers.plaintiff_sms_consent
  );

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Autosave: persist the in-progress draft on every field change. The TCPA
  // consent timestamp is intentionally NOT autosaved (it's only set when the
  // user clicks Continue) so we don't end up with thrashing timestamps.
  useAutosave(caseId, {
    plaintiff_name:
      entity === "individual"
        ? `${firstName.trim()} ${lastName.trim()}`.trim()
        : bizName.trim(),
    plaintiff_email: email.trim() || null,
    plaintiff_phone: phone.trim() || null,
    plaintiff_address:
      !line1 && !city && !stateAbbr && !zip
        ? null
        : { line1, city, state: stateAbbr, zip },
    plaintiff_county: county.trim() || null,
    intake_answers: {
      plaintiff_entity_type: entity,
      plaintiff_business_subtype: entity === "business" ? bizSubtype : undefined,
      plaintiff_sms_consent: tcpa,
    },
  });

  function buildName(): string {
    if (entity === "individual") return `${firstName.trim()} ${lastName.trim()}`.trim();
    return bizName.trim();
  }
  function buildAddress(): PostalAddress | null {
    if (!line1 && !city && !stateAbbr && !zip) return null;
    return { line1, city, state: stateAbbr, zip };
  }

  function readyError(): string | null {
    if (entity === "individual") {
      if (!firstName.trim()) return "First name is required.";
      if (!lastName.trim()) return "Last name is required.";
    } else {
      if (!bizName.trim()) return "Business name is required.";
    }
    if (!email.trim() || !/.+@.+\..+/.test(email.trim())) {
      return "A valid email is required.";
    }
    if (!phone.trim()) return "Phone is required.";
    if (!line1.trim()) return "Street address is required.";
    if (!city.trim()) return "City is required.";
    if (!stateAbbr) return "State is required.";
    if (!/^\d{5}(-\d{4})?$/.test(zip.trim())) return "Valid ZIP is required.";
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
          plaintiff_name: buildName(),
          plaintiff_email: email.trim(),
          plaintiff_phone: phone.trim(),
          plaintiff_address: buildAddress(),
          plaintiff_county: county.trim() || null,
          intake_answers: {
            plaintiff_entity_type: entity,
            plaintiff_business_subtype: entity === "business" ? bizSubtype : undefined,
            plaintiff_sms_consent: tcpa,
            plaintiff_sms_consent_at: tcpa ? new Date().toISOString() : null,
          },
        }),
      });
      if (!res.ok) throw new Error("Could not save");
      router.push(`/demand-letter/wizard/${caseId}/narrative`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not save");
      setSaving(false);
    }
  }

  return (
    <div className="dlw-step">
      <div className="dlw-step-eyebrow">Phase 2 of 5</div>
      <h1>Are you sending this as an individual or a business?</h1>
      <p className="dlw-sub">
        We use these details for the letter signature and to send you case-status
        notifications. The letter goes out under our brand, not your address.
      </p>

      <div className="dlw-pill-group" role="radiogroup" aria-label="Sender type">
        <button
          type="button"
          className={`dlw-pill${entity === "individual" ? " is-on" : ""}`}
          onClick={() => setEntity("individual")}
        >
          👤 Individual
        </button>
        <button
          type="button"
          className={`dlw-pill${entity === "business" ? " is-on" : ""}`}
          onClick={() => setEntity("business")}
        >
          🏢 Business
        </button>
      </div>

      <div className="dlw-fields">
        {entity === "individual" ? (
          <div className="dlw-field-row">
            <Field label="First name" required>
              <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="dlw-input"
                autoComplete="given-name"
              />
            </Field>
            <Field label="Last name" required>
              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="dlw-input"
                autoComplete="family-name"
              />
            </Field>
          </div>
        ) : (
          <div className="dlw-field-row">
            <Field label="Business name" required>
              <input
                value={bizName}
                onChange={(e) => setBizName(e.target.value)}
                className="dlw-input"
              />
            </Field>
            <Field label="Business type" required>
              <Combobox
                id="plaintiff-biz-type"
                value={bizSubtype}
                onChange={setBizSubtype}
                options={BIZ_TYPES}
                ariaLabel="Business type"
                fullWidth
                placeholder="Select…"
              />
            </Field>
          </div>
        )}

        <div className="dlw-field-row">
          <Field label="Email" required>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="dlw-input"
              autoComplete="email"
            />
          </Field>
          <Field label="Phone" required>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="dlw-input"
              autoComplete="tel"
            />
          </Field>
        </div>

        <Field label="Street address" required>
          <input
            value={line1}
            onChange={(e) => setLine1(e.target.value)}
            className="dlw-input"
            autoComplete="street-address"
          />
        </Field>
        <div className="dlw-field-row dlw-field-row-3">
          <Field label="City" required>
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="dlw-input"
              autoComplete="address-level2"
            />
          </Field>
          <Field label="State" required>
            <Combobox
              id="plaintiff-state"
              value={stateAbbr}
              onChange={setStateAbbr}
              options={STATE_OPTIONS}
              ariaLabel="State"
              fullWidth
              placeholder="Select…"
            />
          </Field>
          <Field label="ZIP" required>
            <input
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              className="dlw-input"
              autoComplete="postal-code"
              inputMode="numeric"
              maxLength={10}
            />
          </Field>
        </div>
        <Field label="County">
          <CountyField
            address={{ line1, city, state: stateAbbr, zip }}
            value={county}
            onChange={setCounty}
            label="Plaintiff county"
          />
        </Field>
      </div>

      {/* TCPA opt-in */}
      <label className="dlw-skiptrace" style={{ marginTop: 18 }}>
        <input
          type="checkbox"
          checked={tcpa}
          onChange={(e) => setTcpa(e.target.checked)}
        />
        <span>
          <strong>Send me text updates about my case.</strong> Msg &amp; data rates may apply.
          Reply STOP to opt out.{" "}
          <Link href="/terms" className="dlw-actions-back" style={{ textDecoration: "underline" }}>
            Terms
          </Link>{" "}
          &amp;{" "}
          <Link href="/privacy" className="dlw-actions-back" style={{ textDecoration: "underline" }}>
            Privacy
          </Link>
        </span>
      </label>

      <div className="dlw-actions">
        <Link
          href={`/demand-letter/wizard/${caseId}/defendant`}
          className="dlw-actions-back"
        >
          ← Back
        </Link>
        <button className="dlw-cta" onClick={continueToNext} disabled={saving}>
          {saving ? "Saving…" : "Continue ▶"}
        </button>
      </div>
      {error ? <p style={{ color: "var(--accent)", marginTop: 12 }}>{error}</p> : null}
    </div>
  );
}

function Field({
  label,
  required,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="dlw-field">
      <span className="dlw-label">
        {label} {required ? <em className="dlw-required">*</em> : null}
      </span>
      {children}
      {hint ? <span className="dlw-hint">{hint}</span> : null}
    </label>
  );
}
