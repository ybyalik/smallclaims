"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  caseId: string;
  // Current case.status. Drives which action to show.
  status: string;
}

export default function CaseLifecycleActions({ caseId, status }: Props) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirming, setConfirming] = useState(false);
  const [reason, setReason] = useState("");

  const isClosed = status === "closed";

  async function close() {
    if (busy) return;
    setBusy(true);
    setError(null);
    try {
      const res = await fetch(`/api/cases/${caseId}/lifecycle`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "close", reason }),
      });
      if (!res.ok) {
        throw new Error("close_failed");
      }
      setConfirming(false);
      setReason("");
      router.refresh();
    } catch {
      setError("We couldn't close the case. Please try again in a moment.");
    } finally {
      setBusy(false);
    }
  }

  async function reopen() {
    if (busy) return;
    setBusy(true);
    setError(null);
    try {
      const res = await fetch(`/api/cases/${caseId}/lifecycle`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "reopen" }),
      });
      if (!res.ok) {
        throw new Error("reopen_failed");
      }
      router.refresh();
    } catch {
      setError("We couldn't reopen the case. Please try again in a moment.");
    } finally {
      setBusy(false);
    }
  }

  if (isClosed) {
    return (
      <div className="app-case-lifecycle">
        <button
          type="button"
          className="btn btn-cream btn-sm"
          onClick={reopen}
          disabled={busy}
        >
          {busy ? "Reopening…" : "Reopen case"}
        </button>
        {error ? <p className="app-case-lifecycle-error">{error}</p> : null}
      </div>
    );
  }

  if (confirming) {
    return (
      <div className="app-case-lifecycle app-case-confirm">
        <p className="app-case-confirm-title">Close this case?</p>
        <p className="app-case-confirm-body">
          It will move to your closed list and stop showing as active. You can
          reopen it any time.
        </p>
        <label className="app-case-confirm-label" htmlFor="close-reason">
          Reason (optional)
        </label>
        <textarea
          id="close-reason"
          className="app-case-confirm-textarea"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Defendant judgment-proof, gave up, statute ran, etc."
          rows={3}
          disabled={busy}
        />
        <div className="app-case-confirm-actions">
          <button
            type="button"
            className="btn btn-danger btn-sm"
            onClick={close}
            disabled={busy}
          >
            {busy ? "Closing…" : "Confirm close"}
          </button>
          <button
            type="button"
            className="btn btn-cream btn-sm"
            onClick={() => {
              setConfirming(false);
              setError(null);
            }}
            disabled={busy}
          >
            Cancel
          </button>
        </div>
        {error ? <p className="app-case-lifecycle-error">{error}</p> : null}
      </div>
    );
  }

  return (
    <div className="app-case-lifecycle">
      <button
        type="button"
        className="btn btn-danger btn-sm"
        onClick={() => setConfirming(true)}
      >
        Close case
      </button>
      {error ? <p className="app-case-lifecycle-error">{error}</p> : null}
    </div>
  );
}
