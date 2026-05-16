// Customer-facing approval gate that sits under the embedded PDF on
// /case/[id]/letter. Three render branches keyed off approval_status:
//   - pending           → "Ready to mail?" with Approve + Request changes
//   - changes_requested → "We're working on revisions" callout
//   - approved          → "Approved" confirmation (kept brief — the mail
//                         status panel that already lives on the case page
//                         takes over tracking from here)

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  caseId: string;
  approvalStatus: "pending" | "approved" | "changes_requested";
  changesText: string | null;
  hasMailVendorId: boolean;
}

export default function LetterApprovalPanel({
  caseId,
  approvalStatus,
  changesText,
  hasMailVendorId,
}: Props) {
  const router = useRouter();
  const [busy, setBusy] = useState<"approve" | "request" | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState("");

  async function approve() {
    if (busy) return;
    setBusy("approve");
    setError(null);
    try {
      const res = await fetch(`/api/cases/${caseId}/demand-letter/approve`, {
        method: "POST",
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message || `HTTP ${res.status}`);
      }
      router.refresh();
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : "We couldn't record your approval. Please try again in a moment.",
      );
    } finally {
      setBusy(null);
    }
  }

  async function requestChanges() {
    if (busy) return;
    if (feedback.trim().length < 5) {
      setError("Add a quick note about what you'd like changed.");
      return;
    }
    setBusy("request");
    setError(null);
    try {
      const res = await fetch(`/api/cases/${caseId}/demand-letter/request-changes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ feedback }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message || `HTTP ${res.status}`);
      }
      setShowFeedback(false);
      setFeedback("");
      router.refresh();
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : "We couldn't save your request. Please try again in a moment.",
      );
    } finally {
      setBusy(null);
    }
  }

  // Already in the mail or beyond — nothing for the customer to do here.
  if (hasMailVendorId) {
    return (
      <div className="letter-approve-card letter-approve-mailed">
        <div className="letter-approve-title">In the mail</div>
        <p className="letter-approve-body">
          Your letter is on its way via USPS Certified Mail with return
          receipt. Tracking updates appear on the case page above.
        </p>
      </div>
    );
  }

  if (approvalStatus === "approved") {
    return (
      <div className="letter-approve-card letter-approve-approved">
        <div className="letter-approve-title">Approved</div>
        <p className="letter-approve-body">
          We&rsquo;re preparing your letter for dispatch. You&rsquo;ll see
          tracking info here once it&rsquo;s in transit, usually within
          24 to 48 hours.
        </p>
      </div>
    );
  }

  if (approvalStatus === "changes_requested") {
    return (
      <div className="letter-approve-card letter-approve-pending-edits">
        <div className="letter-approve-title">Revision in progress</div>
        <p className="letter-approve-body">
          Our team is making the changes you requested. We&rsquo;ll email you
          and post a notification here when the updated letter is ready for
          you to review.
        </p>
        {changesText ? (
          <div className="letter-approve-quote">
            <span className="letter-approve-quote-label">Your feedback</span>
            <blockquote>{changesText}</blockquote>
          </div>
        ) : null}
      </div>
    );
  }

  // approval_status === "pending"
  return (
    <div className="letter-approve-card letter-approve-pending">
      <div className="letter-approve-title">Ready to mail?</div>
      <p className="letter-approve-body">
        Review the letter above. Once you approve, we&rsquo;ll dispatch it
        via USPS certified mail with return receipt within 24 to 48 hours.
        Nothing leaves this dashboard without your explicit go-ahead.
      </p>

      {!showFeedback ? (
        <div className="letter-approve-actions">
          <button
            type="button"
            className="btn btn-dark"
            onClick={approve}
            disabled={busy !== null}
          >
            {busy === "approve" ? "Approving…" : "Approve and send"}
          </button>
          <button
            type="button"
            className="btn btn-cream"
            onClick={() => {
              setShowFeedback(true);
              setError(null);
            }}
            disabled={busy !== null}
          >
            Request changes
          </button>
        </div>
      ) : (
        <div className="letter-approve-feedback">
          <label htmlFor="letter-feedback" className="letter-approve-feedback-label">
            What would you like changed?
          </label>
          <textarea
            id="letter-feedback"
            className="letter-approve-feedback-input"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="e.g., the amount should be $1,800 not $1,500; please add a sentence about the missed inspection on March 10; tone should be a bit firmer in the closing."
            rows={5}
            disabled={busy !== null}
          />
          <div className="letter-approve-actions">
            <button
              type="button"
              className="btn btn-dark"
              onClick={requestChanges}
              disabled={busy !== null || feedback.trim().length < 5}
            >
              {busy === "request" ? "Sending…" : "Send change request"}
            </button>
            <button
              type="button"
              className="btn btn-cream"
              onClick={() => {
                setShowFeedback(false);
                setFeedback("");
                setError(null);
              }}
              disabled={busy !== null}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {error ? <p className="letter-approve-error">{error}</p> : null}
    </div>
  );
}
