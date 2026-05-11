"use client";

import { useState, useTransition } from "react";
import { createClient } from "../../../../../../lib/supabase/client";

const PRICE_DOWNLOAD = 39;

export default function LetterEditor({
  caseId,
  initialBody,
  isPaid,
  isAdmin,
}: {
  caseId: string;
  initialBody: string;
  isPaid: boolean;
  isAdmin: boolean;
}) {
  const [body, setBody] = useState(initialBody);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [savingError, setSavingError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  async function save() {
    setSavingError(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const supabase = createClient() as any;
    const { error } = await supabase
      .from("demand_letters")
      .update({ body_md: body })
      .eq("case_id", caseId);
    if (error) {
      setSavingError(error.message);
      return;
    }
    setSavedAt(new Date());
  }

  async function checkout() {
    setCheckoutError(null);
    await save();
    try {
      const res = await fetch("/api/checkout/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ caseId, product_key: "demand_letter_download" }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) {
        setCheckoutError(data?.error || "Could not start checkout. Try again.");
        return;
      }
      window.location.href = data.url;
    } catch (e) {
      setCheckoutError(e instanceof Error ? e.message : "Network error.");
    }
  }

  async function downloadPdf() {
    window.location.href = `/api/demand-letter/${caseId}/pdf`;
  }

  const canDownload = isPaid || isAdmin;

  return (
    <div className="dl-editor">
      <div className="dl-editor-toolbar">
        <button
          type="button"
          className="btn btn-cream"
          onClick={() => startTransition(save)}
          disabled={isPending}
        >
          {isPending ? "Saving..." : "Save changes"}
        </button>
        {savedAt && <span className="dl-saved-at">Saved at {savedAt.toLocaleTimeString()}</span>}
        {savingError && <span className="dl-error-inline">{savingError}</span>}
      </div>

      <textarea
        className="dl-letter-textarea"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        rows={30}
        spellCheck
      />

      {canDownload ? (
        <div className="dl-paid-card">
          <div>
            <div className="dl-paid-label">
              {isAdmin && !isPaid ? "Admin access" : "Paid"}
            </div>
            <div className="dl-paid-title">Your letter is ready</div>
            <p className="dl-paid-sub">Download the formatted PDF to send by mail or email.</p>
          </div>
          <button type="button" className="btn btn-dark" onClick={downloadPdf}>
            Download PDF
          </button>
        </div>
      ) : (
        <div className="dl-pricing-cards dl-pricing-single">
          <div className="dl-price-card dl-price-card-featured">
            <div className="dl-price-tier">Get your letter</div>
            <div className="dl-price">${PRICE_DOWNLOAD}</div>
            <ul className="dl-price-features">
              <li>Formatted PDF of your demand letter</li>
              <li>Plain-text version you can email</li>
              <li>Instructions for sending it yourself</li>
              <li>Saved to your CivilCase dashboard</li>
            </ul>
            <button
              type="button"
              className="btn btn-dark btn-full"
              onClick={() => startTransition(checkout)}
              disabled={isPending}
            >
              {isPending ? "Loading checkout..." : "Continue to checkout"}
            </button>
            {checkoutError && <p className="dl-error-inline" style={{ marginTop: 12 }}>{checkoutError}</p>}
          </div>
        </div>
      )}

      <div className="dl-disclaimer">
        <p>
          <strong>About this letter:</strong> CivilCase generated this letter from the facts you
          provided. We&apos;re not a law firm and this isn&apos;t legal advice. You&apos;re responsible
          for reviewing it for accuracy before sending. If your situation is unusual or
          high-stakes, consider consulting a licensed attorney in your state.
        </p>
      </div>
    </div>
  );
}
