"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../../../lib/supabase/client";
import type { PostalAddress } from "../../../../lib/supabase/types";
import AddressAutocomplete from "../../../../components/wizard/AddressAutocomplete";
import CountyField from "../../../../components/wizard/CountyField";

interface Props {
  initialFullName: string;
  email: string;
  initialPhone: string;
  initialEntityType: "individual" | "business" | null;
  initialBusinessName: string;
  initialAddress: PostalAddress | null;
  initialCounty: string;
}

export default function SettingsForm({
  initialFullName,
  email,
  initialPhone,
  initialEntityType,
  initialBusinessName,
  initialAddress,
  initialCounty,
}: Props) {
  const router = useRouter();
  const [fullName, setFullName] = useState(initialFullName);
  const [phone, setPhone] = useState(initialPhone);
  const [entityType, setEntityType] = useState<"individual" | "business" | null>(
    initialEntityType,
  );
  const [businessName, setBusinessName] = useState(initialBusinessName);
  const [line1, setLine1] = useState(initialAddress?.line1 ?? "");
  const [city, setCity] = useState(initialAddress?.city ?? "");
  const [stateAbbr, setStateAbbr] = useState(initialAddress?.state ?? "");
  const [zip, setZip] = useState(initialAddress?.zip ?? "");
  const [county, setCounty] = useState(initialCounty);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  async function save() {
    setError(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const supabase = createClient() as any;
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      setError("You're not signed in.");
      return;
    }

    // Build the address jsonb only if at least one field is filled — empty
    // saves shouldn't persist a {line1:"",city:"",state:"",zip:""} object.
    const addressFilled = line1 || city || stateAbbr || zip;
    const addressValue: PostalAddress | null = addressFilled
      ? { line1, city, state: stateAbbr, zip }
      : null;

    const { error: dbErr } = await supabase
      .from("profiles")
      .update({
        full_name: fullName.trim() || null,
        default_phone: phone.trim() || null,
        default_entity_type: entityType,
        default_business_name:
          entityType === "business" ? businessName.trim() || null : null,
        default_address: addressValue,
        default_county: county.trim() || null,
      })
      .eq("user_id", user.id);
    if (dbErr) {
      setError(dbErr.message);
      return;
    }
    await supabase.auth.updateUser({ data: { full_name: fullName.trim() } });
    setSavedAt(new Date());
    router.refresh();
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        startTransition(save);
      }}
      className="app-settings-form"
    >
      <label>
        <span>Full name</span>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          autoComplete="name"
        />
      </label>
      <label>
        <span>Email</span>
        <input type="email" value={email} disabled aria-disabled />
        <span className="app-settings-hint">
          Email is set by your sign-in method and can&apos;t be changed here.
        </span>
      </label>
      <label>
        <span>Phone</span>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          autoComplete="tel"
          placeholder="(555) 123-4567"
        />
        <span className="app-settings-hint">
          Used on demand letters and for Voice of Justice phone follow-ups.
        </span>
      </label>

      <fieldset
        style={{
          border: "1px solid var(--hairline)",
          borderRadius: 10,
          padding: "16px 18px",
          marginTop: 8,
        }}
      >
        <legend style={{ padding: "0 8px", fontWeight: 600, fontSize: 14 }}>
          Default filer profile (optional)
        </legend>
        <p
          className="app-settings-hint"
          style={{ margin: "0 0 14px", display: "block" }}
        >
          Save your usual filer identity once. When you start a new case, you can
          click &ldquo;Use my saved address&rdquo; on the plaintiff step to prefill
          these fields.
        </p>

        <div style={{ display: "flex", gap: 14, marginBottom: 14, flexWrap: "wrap" }}>
          <label
            style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 14 }}
          >
            <input
              type="radio"
              name="entity-type"
              checked={entityType === "individual"}
              onChange={() => setEntityType("individual")}
            />
            Individual
          </label>
          <label
            style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 14 }}
          >
            <input
              type="radio"
              name="entity-type"
              checked={entityType === "business"}
              onChange={() => setEntityType("business")}
            />
            Business
          </label>
          <label
            style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 14 }}
          >
            <input
              type="radio"
              name="entity-type"
              checked={entityType === null}
              onChange={() => setEntityType(null)}
            />
            Not set
          </label>
        </div>

        {entityType === "business" ? (
          <label>
            <span>Business name</span>
            <input
              type="text"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              autoComplete="organization"
              placeholder="e.g., Acme Plumbing LLC"
            />
          </label>
        ) : null}

        <label>
          <span>Street address</span>
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
            className=""
          />
        </label>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 100px 130px",
            gap: 10,
          }}
        >
          <label>
            <span>City</span>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              autoComplete="address-level2"
            />
          </label>
          <label>
            <span>State</span>
            <input
              type="text"
              value={stateAbbr}
              onChange={(e) => setStateAbbr(e.target.value.toUpperCase())}
              maxLength={2}
              autoComplete="address-level1"
              placeholder="CA"
            />
          </label>
          <label>
            <span>ZIP</span>
            <input
              type="text"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              maxLength={10}
              inputMode="numeric"
              autoComplete="postal-code"
            />
          </label>
        </div>
        <label>
          <span>County</span>
          <CountyField
            address={{ line1, city, state: stateAbbr, zip }}
            value={county}
            onChange={setCounty}
            label="Default county"
          />
        </label>
      </fieldset>

      {error && <p className="dl-error-inline">{error}</p>}
      <div className="app-settings-actions">
        <button type="submit" className="btn btn-dark" disabled={isPending}>
          {isPending ? "Saving..." : "Save changes"}
        </button>
        {savedAt && (
          <span className="dl-saved-at">Saved at {savedAt.toLocaleTimeString()}</span>
        )}
      </div>
    </form>
  );
}
