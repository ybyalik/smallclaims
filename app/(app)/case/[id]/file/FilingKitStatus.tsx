"use client";

// "Being prepared" screen for the Filing Kit while the per-case research +
// report pipeline runs. Polls a tiny status endpoint and refreshes the page
// the moment a published report exists. The customer never sees raw pipeline
// status or errors — if something fails, an admin is alerted and re-runs, and
// this screen simply keeps waiting / tells them we'll email them.

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import EmptyState from "../../../../../components/ui/EmptyState";

const POLL_MS = 6000;
const MAX_ATTEMPTS = 30; // ~3 minutes of active polling, then settle to email mode

export default function FilingKitStatus({ caseId, stateName }: { caseId: string; stateName: string }) {
  const router = useRouter();
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    if (settled) return;
    let attempts = 0;
    let stopped = false;

    const poll = async () => {
      attempts += 1;
      try {
        const res = await fetch(`/api/cases/${caseId}/file/status`, { cache: "no-store" });
        const data = (await res.json()) as { ready?: boolean };
        if (data.ready && !stopped) {
          stopped = true;
          clearInterval(id);
          router.refresh();
          return;
        }
      } catch {
        // ignore transient network errors; keep polling
      }
      if (attempts >= MAX_ATTEMPTS && !stopped) {
        stopped = true;
        clearInterval(id);
        setSettled(true);
      }
    };

    const id = setInterval(poll, POLL_MS);
    return () => {
      stopped = true;
      clearInterval(id);
    };
  }, [caseId, settled, router]);

  return (
    <EmptyState
      title={`Building your ${stateName} Filing Kit`}
      body={
        settled
          ? "This is taking a little longer than usual. We'll email you the moment it's ready, you can safely close this page and come back later."
          : "We're researching your court, forms, fees, and service rules for your specific case. This usually takes a few minutes, and this page updates automatically when it's ready."
      }
    />
  );
}
