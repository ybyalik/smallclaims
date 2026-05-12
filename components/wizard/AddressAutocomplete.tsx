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
  return {
    line1: [streetNumber, route].filter(Boolean).join(" "),
    city,
    state,
    zip,
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

  useEffect(() => {
    let cancelled = false;
    loadGoogleMaps()
      .then((maps) => {
        if (cancelled || !inputRef.current) return;
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
    return () => {
      cancelled = true;
      // Cleanup: detach the autocomplete listeners. Google's .pac-container
      // (the dropdown) is body-attached and managed by Google; leaving it
      // is fine.
      if (autocompleteRef.current) {
        google.maps.event.clearInstanceListeners(autocompleteRef.current);
        autocompleteRef.current = null;
      }
    };
  }, [country]);

  return (
    <>
      <input
        ref={inputRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
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
