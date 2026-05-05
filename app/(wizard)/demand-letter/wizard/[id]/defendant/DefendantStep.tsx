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
  { value: "", label: "Unknown" },
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

interface SecondaryDefendant {
  entity_type: EntityType;
  first_name?: string;
  last_name?: string;
  business_name?: string;
  email?: string;
  phone?: string;
  address?: PostalAddress;
  skip_trace_needed?: boolean;
}

interface Props {
  caseId: string;
  initialName: string;
  initialEmail: string;
  initialPhone: string;
  initialAddress: PostalAddress | null;
  initialCounty: string;
  initialAnswers: Record<string, unknown>;
}

export default function DefendantStep({
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
    (initialAnswers.defendant_entity_type as EntityType) || "individual";

  const [entity, setEntity] = useState<EntityType>(initialEntity);
  const [skipTrace, setSkipTrace] = useState<boolean>(
    !!initialAnswers.defendant_skip_trace_needed
  );

  // For individual: split initial name into first/last best-effort
  const [firstName, lastName] = (() => {
    if (initialEntity === "individual" && initialName) {
      const parts = initialName.trim().split(/\s+/);
      return [parts[0] ?? "", parts.slice(1).join(" ")];
    }
    return ["", ""];
  })();
  const [first, setFirst] = useState(firstName);
  const [last, setLast] = useState(lastName);

  // Business
  const [bizCity, setBizCity] = useState((initialAnswers.defendant_business_city as string) || "");
  const [bizName, setBizName] = useState(
    initialEntity === "business" ? initialName : ""
  );
  const [bizSubtype, setBizSubtype] = useState(
    (initialAnswers.defendant_business_subtype as string) || ""
  );
  const [bizWebsite, setBizWebsite] = useState(
    (initialAnswers.defendant_website as string) || ""
  );

  // Shared
  const [email, setEmail] = useState(initialEmail);
  const [phone, setPhone] = useState(initialPhone);
  const [line1, setLine1] = useState(initialAddress?.line1 ?? "");
  const [city, setCity] = useState(initialAddress?.city ?? "");
  const [stateAbbr, setStateAbbr] = useState(initialAddress?.state ?? "");
  const [zip, setZip] = useState(initialAddress?.zip ?? "");
  const [county, setCounty] = useState(initialCounty ?? "");

  const initialSecondary = (initialAnswers.secondary_defendant as SecondaryDefendant | null) || null;
  const [hasSecondary, setHasSecondary] = useState(!!initialSecondary);
  const [secondary, setSecondary] = useState<SecondaryDefendant | null>(initialSecondary);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showCapModal, setShowCapModal] = useState(false);

  // Autosave: persists every field change. Identity-only (no validation gate);
  // we save what the user has so far so they don't lose work between steps.
  useAutosave(caseId, {
    defendant_name: entity === "individual"
      ? `${first.trim()} ${last.trim()}`.trim()
      : bizName.trim(),
    defendant_email: email.trim() || null,
    defendant_phone: phone.trim() || null,
    defendant_address: skipTrace
      ? null
      : !line1 && !city && !stateAbbr && !zip
        ? null
        : { line1, city, state: stateAbbr, zip },
    defendant_county: county.trim() || null,
    intake_answers: {
      defendant_entity_type: entity,
      defendant_skip_trace_needed: skipTrace,
      defendant_business_city: entity === "business" ? bizCity : undefined,
      defendant_business_subtype: entity === "business" ? bizSubtype : undefined,
      defendant_website: entity === "business" ? bizWebsite : undefined,
      secondary_defendant: hasSecondary ? secondary : null,
    },
  });

  function buildPrimaryName(): string {
    if (entity === "individual") return `${first.trim()} ${last.trim()}`.trim();
    return bizName.trim();
  }

  function buildAddress(): PostalAddress | null {
    if (skipTrace) return null;
    if (!line1 && !city && !stateAbbr && !zip) return null;
    return { line1, city, state: stateAbbr, zip };
  }

  function readyToContinue(): string | null {
    if (entity === "individual") {
      if (!first.trim()) return "First name is required.";
      if (!last.trim()) return "Last name is required.";
    } else {
      if (!bizCity.trim()) return "City or location is required.";
      if (!bizName.trim()) return "Business name is required.";
    }
    if (!skipTrace) {
      if (!line1.trim()) return "Street address is required (or use skip-trace).";
      if (!city.trim()) return "City is required.";
      if (!stateAbbr) return "State is required.";
      if (!/^\d{5}(-\d{4})?$/.test(zip.trim())) return "Valid ZIP is required.";
    }
    return null;
  }

  async function continueToNext() {
    const err = readyToContinue();
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
          defendant_name: buildPrimaryName(),
          defendant_email: email.trim() || null,
          defendant_phone: phone.trim() || null,
          defendant_address: buildAddress(),
          defendant_county: county.trim() || null,
          intake_answers: {
            defendant_entity_type: entity,
            defendant_skip_trace_needed: skipTrace,
            defendant_business_city: entity === "business" ? bizCity : undefined,
            defendant_business_subtype: entity === "business" ? bizSubtype : undefined,
            defendant_website: entity === "business" ? bizWebsite : undefined,
            secondary_defendant: hasSecondary ? secondary : null,
          },
        }),
      });
      if (!res.ok) throw new Error("Could not save");
      router.push(`/demand-letter/wizard/${caseId}/plaintiff`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not save");
      setSaving(false);
    }
  }

  return (
    <div className="dlw-step">
      <div className="dlw-step-eyebrow">Phase 1 of 5</div>
      <h1>Who are you sending this to?</h1>
      <p className="dlw-sub">
        Pick whether the recipient is a person or a business. We&rsquo;ll set the letter
        tone accordingly.
      </p>

      {/* Entity pill */}
      <div className="dlw-pill-group" role="radiogroup" aria-label="Recipient type">
        <button
          type="button"
          className={`dlw-pill${entity === "individual" ? " is-on" : ""}`}
          onClick={() => setEntity("individual")}
          aria-pressed={entity === "individual"}
        >
          👤 Individual
        </button>
        <button
          type="button"
          className={`dlw-pill${entity === "business" ? " is-on" : ""}`}
          onClick={() => setEntity("business")}
          aria-pressed={entity === "business"}
        >
          🏢 Business
        </button>
      </div>

      {/* Fields */}
      {entity === "individual" ? (
        <div className="dlw-fields">
          <div className="dlw-field-row">
            <Field label="First name" required>
              <input
                value={first}
                onChange={(e) => setFirst(e.target.value)}
                className="dlw-input"
                autoComplete="given-name"
              />
            </Field>
            <Field label="Last name" required>
              <input
                value={last}
                onChange={(e) => setLast(e.target.value)}
                className="dlw-input"
                autoComplete="family-name"
              />
            </Field>
          </div>
          <div className="dlw-field-row">
            <Field label="Email" hint="If we have it, we can email follow-ups to them under Full Pressure.">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="dlw-input"
                autoComplete="off"
              />
            </Field>
            <Field label="Phone" hint="Required for Voice of Justice calls under Full Pressure.">
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="dlw-input"
                autoComplete="off"
              />
            </Field>
          </div>
        </div>
      ) : (
        <div className="dlw-fields">
          <Field
            label="City or location"
            required
            hint="We need a location before we can search for the business."
          >
            <input
              value={bizCity}
              onChange={(e) => setBizCity(e.target.value)}
              className="dlw-input"
              placeholder="e.g., Las Vegas, NV"
            />
          </Field>
          <Field label="Business name" required>
            <input
              value={bizName}
              onChange={(e) => setBizName(e.target.value)}
              className="dlw-input"
              disabled={!bizCity.trim()}
              placeholder={bizCity ? "Search for the business…" : "Enter city first"}
            />
            {!bizCity.trim() ? null : (
              <span className="dlw-hint">
                Autocomplete coming soon. Type the business name as it appears on
                their public-facing materials.
              </span>
            )}
          </Field>
          <div className="dlw-field-row">
            <Field label="Business type">
              <Combobox
                id="defendant-biz-type"
                value={bizSubtype}
                onChange={setBizSubtype}
                options={BIZ_TYPES}
                ariaLabel="Business type"
                fullWidth
                placeholder="Select…"
              />
            </Field>
            <Field label="Website">
              <input
                value={bizWebsite}
                onChange={(e) => setBizWebsite(e.target.value)}
                className="dlw-input"
                placeholder="https://"
              />
            </Field>
          </div>
        </div>
      )}

      {/* Skip-trace toggle */}
      <label className="dlw-skiptrace">
        <input
          type="checkbox"
          checked={skipTrace}
          onChange={(e) => setSkipTrace(e.target.checked)}
        />
        <span>
          <strong>I don&rsquo;t have their address — use skip-trace.</strong> Our team will
          track them down. Adds an $80 add-on at checkout.
        </span>
      </label>

      {/* Address fields */}
      {!skipTrace ? (
        <div className="dlw-fields" style={{ marginTop: 6 }}>
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
                id="defendant-state"
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
              label="Defendant county"
            />
          </Field>
        </div>
      ) : null}

      {/* Add another defendant */}
      <div className="dlw-add-defendant">
        {!hasSecondary ? (
          <button
            type="button"
            className="dlw-link-btn"
            onClick={() => {
              setHasSecondary(true);
              setSecondary({ entity_type: "individual" });
            }}
          >
            + Add another defendant
          </button>
        ) : (
          <SecondaryDefendantBlock
            value={secondary!}
            onChange={setSecondary}
            onRemove={() => {
              setHasSecondary(false);
              setSecondary(null);
            }}
          />
        )}
        {hasSecondary ? (
          <button
            type="button"
            className="dlw-link-btn"
            onClick={() => setShowCapModal(true)}
            style={{ marginTop: 12 }}
          >
            + Add a third defendant
          </button>
        ) : null}
      </div>

      <div className="dlw-actions">
        <Link
          href={`/demand-letter/wizard/${caseId}/recovery`}
          className="dlw-actions-back"
        >
          ← Back
        </Link>
        <button className="dlw-cta" onClick={continueToNext} disabled={saving}>
          {saving ? "Saving…" : "Lock in the defendant ▶"}
        </button>
      </div>

      {error ? <p style={{ color: "var(--accent)", marginTop: 12 }}>{error}</p> : null}

      {showCapModal ? (
        <div className="dlw-modal-backdrop" onClick={() => setShowCapModal(false)}>
          <div className="dlw-modal" onClick={(e) => e.stopPropagation()}>
            <h3>One or two recipients works best</h3>
            <p>
              Demand letters are most effective with one or two named recipients. For cases
              with three or more, please contact our team and we&rsquo;ll handle the matter
              specially.
            </p>
            <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
              <Link href="/contact" className="dlw-cta" style={{ flex: 1, textAlign: "center" }}>
                Contact us
              </Link>
              <button
                className="dlw-cta dlw-cta-ghost"
                onClick={() => setShowCapModal(false)}
                style={{ flex: 1 }}
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      ) : null}
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

function SecondaryDefendantBlock({
  value,
  onChange,
  onRemove,
}: {
  value: SecondaryDefendant;
  onChange: (v: SecondaryDefendant) => void;
  onRemove: () => void;
}) {
  const isInd = value.entity_type === "individual";
  return (
    <div className="dlw-secondary">
      <div className="dlw-secondary-head">
        <strong>Second defendant</strong>
        <button type="button" className="dlw-link-btn" onClick={onRemove}>
          Remove
        </button>
      </div>
      <div className="dlw-pill-group" style={{ marginTop: 8 }}>
        <button
          type="button"
          className={`dlw-pill${isInd ? " is-on" : ""}`}
          onClick={() => onChange({ ...value, entity_type: "individual" })}
        >
          Individual
        </button>
        <button
          type="button"
          className={`dlw-pill${!isInd ? " is-on" : ""}`}
          onClick={() => onChange({ ...value, entity_type: "business" })}
        >
          Business
        </button>
      </div>
      {isInd ? (
        <div className="dlw-field-row" style={{ marginTop: 12 }}>
          <input
            value={value.first_name ?? ""}
            onChange={(e) => onChange({ ...value, first_name: e.target.value })}
            className="dlw-input"
            placeholder="First name"
          />
          <input
            value={value.last_name ?? ""}
            onChange={(e) => onChange({ ...value, last_name: e.target.value })}
            className="dlw-input"
            placeholder="Last name"
          />
        </div>
      ) : (
        <input
          value={value.business_name ?? ""}
          onChange={(e) => onChange({ ...value, business_name: e.target.value })}
          className="dlw-input"
          placeholder="Business name"
          style={{ marginTop: 12 }}
        />
      )}
    </div>
  );
}
