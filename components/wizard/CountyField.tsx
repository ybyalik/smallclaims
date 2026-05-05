"use client";

import { useEffect, useRef, useState } from "react";

interface AddressInput {
  line1?: string | null;
  city?: string | null;
  state?: string | null;
  zip?: string | null;
}

interface Props {
  // The address fields the wizard already collects. We re-derive the county
  // whenever the (debounced) combination of these changes.
  address: AddressInput;
  // Caller-controlled value. Component is "controlled-with-derive": we
  // suggest a derived county, but the value persisted in the case row is
  // whatever the user finally accepts (after edit if they changed it).
  value: string;
  onChange: (value: string) => void;
  // Distinguishing label so the wizard can have multiple instances side by
  // side (plaintiff, defendant, incident).
  label?: string;
  // Disable network derivation entirely — user can still type freely.
  disableLookup?: boolean;
}

const DEBOUNCE_MS = 600;

export default function CountyField({
  address,
  value,
  onChange,
  label = "County",
  disableLookup,
}: Props) {
  const [derived, setDerived] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "looking_up" | "matched" | "no_match">(
    "idle",
  );
  const lastQueryRef = useRef<string>("");
  const inFlightRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (disableLookup) return;
    const sig = signature(address);
    if (!sig) {
      setStatus("idle");
      setDerived(null);
      return;
    }
    if (sig === lastQueryRef.current) return;
    const t = setTimeout(async () => {
      lastQueryRef.current = sig;
      inFlightRef.current?.abort();
      const ctrl = new AbortController();
      inFlightRef.current = ctrl;
      setStatus("looking_up");
      try {
        const res = await fetch("/api/intake/county-lookup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(address),
          signal: ctrl.signal,
        });
        const body = (await res.json()) as { ok?: boolean; county?: string };
        if (!ctrl.signal.aborted) {
          if (body.ok && body.county) {
            setDerived(body.county);
            setStatus("matched");
            // Auto-fill only when the field is empty or still matches a previous derivation.
            if (!value || value === lastDerivedRef.current) {
              onChange(body.county);
            }
            lastDerivedRef.current = body.county;
          } else {
            setStatus("no_match");
            setDerived(null);
          }
        }
      } catch {
        if (!ctrl.signal.aborted) setStatus("no_match");
      }
    }, DEBOUNCE_MS);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address.line1, address.city, address.state, address.zip, disableLookup]);

  const lastDerivedRef = useRef<string>("");

  return (
    <div>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="dlw-input"
        placeholder={
          status === "looking_up"
            ? "Looking up county…"
            : status === "matched" && derived
              ? derived
              : "e.g., Middlesex County"
        }
        aria-label={label}
      />
      <p className="dlw-hint" style={{ marginTop: 4, fontSize: 12, color: "var(--muted)" }}>
        {status === "looking_up" ? (
          <>Looking up county from address…</>
        ) : status === "matched" && derived ? (
          <>
            Auto-derived: <strong>{derived}</strong>. Edit if wrong.
          </>
        ) : status === "no_match" ? (
          <>Could not auto-derive. Enter it manually.</>
        ) : (
          <>Auto-derived from the address above. Editable.</>
        )}
      </p>
    </div>
  );
}

function signature(a: AddressInput): string {
  const parts = [
    (a.line1 || "").trim(),
    (a.city || "").trim(),
    (a.state || "").trim(),
    (a.zip || "").trim(),
  ];
  // Need at least state + (city OR zip) for any kind of meaningful lookup.
  const hasState = parts[2].length > 0;
  const hasCityOrZip = parts[1].length > 0 || parts[3].length >= 5;
  if (!hasState || !hasCityOrZip) return "";
  return parts.join("|").toLowerCase();
}
