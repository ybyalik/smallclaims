"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Building2, Search, CheckCircle2 } from "lucide-react";
import type { PostalAddress } from "../../../../../../lib/supabase/types";
import type { EntityMatch, EntitySearchResult } from "../../../../../../lib/sos-lookup/types";
import { listStates } from "../../../../../../lib/demand-letter/state-context";
import Combobox, { type ComboboxOption } from "../../../../../../components/wizard/Combobox";
import CountyField from "../../../../../../components/wizard/CountyField";
import AddressAutocomplete from "../../../../../../components/wizard/AddressAutocomplete";
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

  // SOS lookup state. Once an entity is confirmed, we lock the business
  // name to the legal name from the SOS record so the filing later is
  // against the right entity.
  const initialSosMatch =
    (initialAnswers.defendant_sos_match as EntityMatch | null) || null;
  const [sosMatch, setSosMatch] = useState<EntityMatch | null>(initialSosMatch);
  const [sosResults, setSosResults] = useState<EntityMatch[] | null>(null);
  const [sosSearching, setSosSearching] = useState(false);
  const [sosError, setSosError] = useState<string | null>(null);
  const [sosShowResults, setSosShowResults] = useState(false);

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
      defendant_sos_match: entity === "business" ? sosMatch : null,
      secondary_defendant: hasSecondary ? secondary : null,
    },
  });

  async function runSosSearch() {
    if (!bizName.trim() || sosSearching) return;
    setSosSearching(true);
    setSosError(null);
    setSosShowResults(true);
    try {
      // Try to derive a state hint from the city field ("Las Vegas, NV").
      // Fall back to no state hint, which searches across all US jurisdictions.
      const stateHint = (() => {
        const m = bizCity.match(/,\s*([A-Z]{2})\b/i);
        return m ? m[1].toUpperCase() : undefined;
      })();
      const res = await fetch("/api/sos-lookup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: bizName.trim(), state: stateHint, limit: 5 }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message || `Search failed (${res.status})`);
      }
      const data = (await res.json()) as EntitySearchResult;
      setSosResults(data.matches);
    } catch (e) {
      setSosError(e instanceof Error ? e.message : "Search failed");
      setSosResults(null);
    } finally {
      setSosSearching(false);
    }
  }

  function pickSosMatch(match: EntityMatch) {
    setSosMatch(match);
    setBizName(match.legal_name);
    // Map SOS entity_type into the bizSubtype dropdown when possible.
    const t = (match.entity_type || "").toLowerCase();
    if (t.includes("llc") || t.includes("limited liability")) setBizSubtype("llc");
    else if (t.includes("corp") || t.includes("inc")) setBizSubtype("corp");
    else if (t.includes("partnership")) setBizSubtype("partnership");
    setSosShowResults(false);
  }

  function clearSosMatch() {
    setSosMatch(null);
    setSosResults(null);
    setSosError(null);
    setSosShowResults(false);
  }

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
      router.push(`/case/${caseId}/build/plaintiff`);
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
          <User size={16} strokeWidth={1.8} aria-hidden /> Individual
        </button>
        <button
          type="button"
          className={`dlw-pill${entity === "business" ? " is-on" : ""}`}
          onClick={() => setEntity("business")}
          aria-pressed={entity === "business"}
        >
          <Building2 size={16} strokeWidth={1.8} aria-hidden /> Business
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
            <div className="dlw-sos-row">
              <input
                value={bizName}
                onChange={(e) => {
                  setBizName(e.target.value);
                  // Editing the name invalidates any prior SOS confirmation
                  if (sosMatch && e.target.value.trim() !== sosMatch.legal_name) {
                    clearSosMatch();
                  }
                }}
                className="dlw-input"
                disabled={!bizCity.trim()}
                placeholder={bizCity ? "Type the business name…" : "Enter city first"}
              />
              <button
                type="button"
                className="dlw-sos-btn"
                onClick={runSosSearch}
                disabled={!bizName.trim() || !bizCity.trim() || sosSearching}
                title="Search Secretary of State records to confirm the legal entity"
              >
                <Search size={14} strokeWidth={2} aria-hidden />
                {sosSearching ? "Searching…" : "Verify entity"}
              </button>
            </div>

            {sosMatch ? (
              <div className="dlw-sos-confirmed">
                <CheckCircle2 size={16} strokeWidth={2} aria-hidden />
                <div>
                  <strong>Confirmed:</strong> {sosMatch.legal_name}
                  {sosMatch.entity_type ? ` · ${sosMatch.entity_type}` : ""}
                  {sosMatch.state_of_registration ? ` · ${sosMatch.state_of_registration}` : ""}
                  {sosMatch.status ? ` · ${sosMatch.status}` : ""}
                  {sosMatch.registered_agent?.name ? (
                    <div className="dlw-sos-agent">
                      Registered agent: {sosMatch.registered_agent.name}
                      {sosMatch.registered_agent.address
                        ? ` — ${sosMatch.registered_agent.address}`
                        : ""}
                    </div>
                  ) : null}
                </div>
                <button
                  type="button"
                  className="dlw-link-btn"
                  onClick={clearSosMatch}
                  style={{ marginLeft: "auto" }}
                >
                  Change
                </button>
              </div>
            ) : (
              <span className="dlw-hint">
                We&rsquo;ll search the Secretary of State to confirm the exact legal entity.
                Required for filing later.
              </span>
            )}

            {sosShowResults && !sosMatch ? (
              <div className="dlw-sos-results">
                {sosError ? (
                  <p className="dlw-sos-error">{sosError}</p>
                ) : sosSearching ? (
                  <p className="dlw-sos-loading">Searching SOS records…</p>
                ) : sosResults && sosResults.length === 0 ? (
                  <div>
                    <p className="dlw-sos-loading">
                      No matches. Double-check the spelling, or continue with the name as you
                      typed it (you may need to update it later).
                    </p>
                    <button
                      type="button"
                      className="dlw-link-btn"
                      onClick={() => setSosShowResults(false)}
                    >
                      Close
                    </button>
                  </div>
                ) : sosResults && sosResults.length > 0 ? (
                  <div>
                    <p className="dlw-sos-prompt">
                      Pick the entity that matches:
                    </p>
                    <ul className="dlw-sos-match-list">
                      {sosResults.map((m) => (
                        <li key={m.provider_id}>
                          <button
                            type="button"
                            className="dlw-sos-match"
                            onClick={() => pickSosMatch(m)}
                          >
                            <strong>{m.legal_name}</strong>
                            <span className="dlw-sos-match-meta">
                              {m.entity_type || "Entity"}
                              {m.state_of_registration ? ` · ${m.state_of_registration}` : ""}
                              {m.status ? ` · ${m.status}` : ""}
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                    <button
                      type="button"
                      className="dlw-link-btn"
                      onClick={() => setSosShowResults(false)}
                    >
                      None of these match
                    </button>
                  </div>
                ) : null}
              </div>
            ) : null}
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
            <AddressAutocomplete
              value={line1}
              onChange={setLine1}
              onAddressSelect={(a) => {
                setLine1(a.line1);
                if (a.city) setCity(a.city);
                if (a.state) setStateAbbr(a.state);
                if (a.zip) setZip(a.zip);
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
          href={`/case/${caseId}/build/recovery`}
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
