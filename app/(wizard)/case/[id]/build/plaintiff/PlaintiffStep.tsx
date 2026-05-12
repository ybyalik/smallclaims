"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Building2 } from "lucide-react";
import type { PostalAddress } from "../../../../../../lib/supabase/types";
import { listStates } from "../../../../../../lib/demand-letter/state-context";
import Combobox, { type ComboboxOption } from "../../../../../../components/wizard/Combobox";
import CountyField from "../../../../../../components/wizard/CountyField";
import AddressAutocomplete from "../../../../../../components/wizard/AddressAutocomplete";
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

export interface SavedDefaults {
  fullName: string;
  entityType: "individual" | "business" | null;
  businessName: string;
  address: PostalAddress | null;
  county: string;
}

interface Props {
  caseId: string;
  initialName: string;
  initialEmail: string;
  initialPhone: string;
  initialAddress: PostalAddress | null;
  initialCounty: string;
  initialAnswers: Record<string, unknown>;
  savedDefaults: SavedDefaults | null;
}

export default function PlaintiffStep({
  caseId,
  initialName,
  initialEmail,
  initialPhone,
  initialAddress,
  initialCounty,
  initialAnswers,
  savedDefaults,
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
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Autosave: persist the in-progress draft on every field change.
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
          },
        }),
      });
      if (!res.ok) throw new Error("Could not save");
      router.push(`/case/${caseId}/build/narrative`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not save");
      setSaving(false);
    }
  }

  function applySavedDefaults() {
    if (!savedDefaults) return;
    if (savedDefaults.entityType) setEntity(savedDefaults.entityType);
    if (savedDefaults.entityType === "business") {
      setBizName(savedDefaults.businessName || "");
    } else if (savedDefaults.entityType === "individual" && savedDefaults.fullName) {
      const parts = savedDefaults.fullName.trim().split(/\s+/);
      setFirstName(parts[0] ?? "");
      setLastName(parts.slice(1).join(" "));
    }
    if (savedDefaults.address) {
      setLine1(savedDefaults.address.line1 ?? "");
      setCity(savedDefaults.address.city ?? "");
      setStateAbbr(savedDefaults.address.state ?? "");
      setZip(savedDefaults.address.zip ?? "");
    }
    if (savedDefaults.county) setCounty(savedDefaults.county);
  }

  return (
    <div className="dlw-step">
      <div className="dlw-step-eyebrow">Phase 2 of 5</div>
      <h1>Are you sending this as an individual or a business?</h1>
      <p className="dlw-sub">
        We use these details for the letter signature and to send you case-status
        notifications. The letter goes out under our brand, not your address.
      </p>

      {savedDefaults ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            background: "var(--bg-soft, #faf8f4)",
            border: "1px solid var(--hairline, #e8e5de)",
            borderRadius: 10,
            padding: "12px 16px",
            margin: "0 0 18px",
            fontSize: 14,
          }}
        >
          <span>
            <strong>Saved filer profile available.</strong>{" "}
            {savedDefaults.entityType === "business" && savedDefaults.businessName
              ? savedDefaults.businessName
              : savedDefaults.fullName || "Your account"}
            {savedDefaults.address?.city ? ` · ${savedDefaults.address.city}` : ""}
            {savedDefaults.address?.state ? `, ${savedDefaults.address.state}` : ""}
          </span>
          <button
            type="button"
            onClick={applySavedDefaults}
            className="btn btn-cream btn-sm"
            style={{ flexShrink: 0 }}
          >
            Use saved
          </button>
        </div>
      ) : null}

      <div className="dlw-pill-group" role="radiogroup" aria-label="Sender type">
        <button
          type="button"
          className={`dlw-pill${entity === "individual" ? " is-on" : ""}`}
          onClick={() => setEntity("individual")}
        >
          <User size={16} strokeWidth={1.8} aria-hidden /> Individual
        </button>
        <button
          type="button"
          className={`dlw-pill${entity === "business" ? " is-on" : ""}`}
          onClick={() => setEntity("business")}
        >
          <Building2 size={16} strokeWidth={1.8} aria-hidden /> Business
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
          <AddressAutocomplete
            value={line1}
            onChange={setLine1}
            onAddressSelect={(a) => {
              setLine1(a.line1);
              if (a.city) setCity(a.city);
              if (a.state) setStateAbbr(a.state);
              if (a.zip) setZip(a.zip);
              // County comes back from Google instantly; populating here
              // beats the CountyField's debounced API lookup so the user
              // can advance immediately. CountyField's fallback still
              // covers manually typed addresses.
              if (a.county) setCounty(a.county);
            }}
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

      <div className="dlw-actions">
        <Link
          href={`/case/${caseId}/build/defendant`}
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
