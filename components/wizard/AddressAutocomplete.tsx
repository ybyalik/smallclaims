"use client";

// Street-address input augmented with Google Places autocomplete. The user
// types and picks a suggestion from a dropdown; we parse the chosen place
// into structured fields ({line1, city, state, zip}) and fire one callback
// so the parent can populate all four state values in a single tick.
//
// The user can still type a custom address that isn't in Google's index —
// the input acts as a normal controlled <input> when no suggestion is
// selected. If the Maps script fails to load (no key, network blocked),
// we degrade gracefully to a plain input.

import { useEffect, useRef, useState } from "react";
import { loadGoogleMaps } from "../../lib/google-maps";

export interface ParsedAddress {
  line1: string;
  city: string;
  state: string;
  zip: string;
  /**
   * County (US: administrative_area_level_2). Empty string if Google didn't
   * include one for this address — some rural/mailing-only addresses lack
   * it. The parent's CountyField fallback handles those.
   */
  county: string;
}

interface Props {
  value: string;
  onChange: (line1: string) => void;
  onAddressSelect: (address: ParsedAddress) => void;
  placeholder?: string;
  autoComplete?: string;
  className?: string;
  // Restrict suggestions to a country (default: "us"). Pass null to disable.
  country?: string | null;
}

function parsePlace(place: google.maps.places.PlaceResult): ParsedAddress {
  const components = place.address_components ?? [];
  const get = (type: string, short = false) => {
    const c = components.find((c) => c.types.includes(type));
    return c ? (short ? c.short_name : c.long_name) : "";
  };
  const streetNumber = get("street_number");
  const route = get("route");
  // 'locality' covers most cities; fall back to common alternates.
  const city =
    get("locality") ||
    get("sublocality_level_1") ||
    get("postal_town") ||
    get("administrative_area_level_3") ||
    "";
  const state = get("administrative_area_level_1", true);
  const zip = get("postal_code");
  // US county. Google returns "Middlesex County" with the suffix; the
  // existing CountyField shows the same format.
  const county = get("administrative_area_level_2");
  return {
    line1: [streetNumber, route].filter(Boolean).join(" "),
    city,
    state,
    zip,
    county,
  };
}

export default function AddressAutocomplete({
  value,
  onChange,
  onAddressSelect,
  placeholder,
  autoComplete = "street-address",
  className = "dlw-input",
  country = "us",
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const onChangeRef = useRef(onChange);
  const onSelectRef = useRef(onAddressSelect);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Keep refs in sync so the place_changed listener always sees the latest
  // callbacks (it's initialized once and lives across re-renders).
  useEffect(() => {
    onChangeRef.current = onChange;
    onSelectRef.current = onAddressSelect;
  });

  // Lazy-load Maps: only fetch the script when the user actually focuses
  // an address field. This avoids the ~140KB Maps payload (plus 4 sub-script
  // requests) on first paint of every page that renders an address input.
  // Once loaded, the singleton in lib/google-maps.ts keeps the script in
  // memory for the rest of the session, so subsequent inputs attach
  // synchronously.
  const attachAutocomplete = () => {
    if (autocompleteRef.current) return;
    if (!inputRef.current) return;
    loadGoogleMaps()
      .then((maps) => {
        if (!inputRef.current) return;
        if (autocompleteRef.current) return;
        // Chrome's native autofill competes with Google's autocomplete on
        // address fields and can suppress Google's dropdown on first
        // interaction. Setting a non-standard autocomplete value bypasses
        // Chrome's autofill detection. Google's widget will set its own
        // value after attachment.
        inputRef.current.setAttribute("autocomplete", "civilcase-street");
        const ac = new maps.places.Autocomplete(inputRef.current, {
          types: ["address"],
          componentRestrictions: country ? { country } : undefined,
          fields: ["address_components", "formatted_address"],
        });
        autocompleteRef.current = ac;
        ac.addListener("place_changed", () => {
          const place = ac.getPlace();
          if (!place || !place.address_components) return;
          const parsed = parsePlace(place);
          onSelectRef.current(parsed);
          onChangeRef.current(parsed.line1);
        });
      })
      .catch((e) => {
        setLoadError(e instanceof Error ? e.message : "Maps unavailable");
      });
  };

  // Cleanup on unmount only — no eager load on country change.
  useEffect(() => {
    return () => {
      if (autocompleteRef.current) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const g = (window as any).google;
        if (g?.maps?.event?.clearInstanceListeners) {
          g.maps.event.clearInstanceListeners(autocompleteRef.current);
        }
        autocompleteRef.current = null;
      }
    };
  }, []);

  return (
    <>
      <input
        ref={inputRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={attachAutocomplete}
        className={className}
        placeholder={placeholder}
        autoComplete={autoComplete}
        type="text"
      />
      {loadError ? (
        <div
          style={{ fontSize: 11, color: "var(--muted)", marginTop: 4 }}
          aria-live="polite"
        >
          Address suggestions unavailable. You can still type manually.
        </div>
      ) : null}
    </>
  );
}
