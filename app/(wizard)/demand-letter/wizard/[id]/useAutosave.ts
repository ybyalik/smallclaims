"use client";

import { useEffect, useRef } from "react";

/**
 * Debounced autosave hook. Writes the given object to
 * /api/demand-letters/[caseId] (PATCH) when the value changes.
 *
 * - Does NOT fire on the initial mount; the initial form state matches what
 *   the server already has, so saving it would be a wasted round trip.
 * - Updates the global "Changes saved" / "Saving…" indicator in the top bar.
 * - Subsequent changes debounce by `delay` ms (default 500) so each
 *   keystroke doesn't trigger a network write.
 */
export function useAutosave(caseId: string, value: Record<string, unknown>, delay = 500) {
  const lastSerializedRef = useRef<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const serialized = JSON.stringify(value);

    // First render: prime the ref with the loaded server state and skip.
    if (lastSerializedRef.current === null) {
      lastSerializedRef.current = serialized;
      return;
    }

    if (serialized === lastSerializedRef.current) return;

    // Skip empty payloads — the API rejects them with 400 ("No writable
    // fields"). Useful for steps that pass `{}` until the user picks a value.
    if (serialized === "{}") {
      lastSerializedRef.current = serialized;
      return;
    }

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    setStatus("Saving…");
    timeoutRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/demand-letters/${caseId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: serialized,
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        lastSerializedRef.current = serialized;
        setStatus("Changes saved");
      } catch (e) {
        console.error("[autosave]", e);
        setStatus("Save failed — retry?");
      }
    }, delay);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [caseId, value, delay]);
}

function setStatus(text: string) {
  if (typeof document === "undefined") return;
  const el = document.getElementById("dlw-save-status");
  if (el) el.textContent = text;
}
