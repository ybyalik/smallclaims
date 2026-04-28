"use client";

import { useState, useTransition } from "react";
import { createClient } from "../../../../../lib/supabase/client";

type CheckoutOption = "download" | "mail";

const PRICE_DOWNLOAD = 39;
const PRICE_MAIL = 79;

export default function LetterEditor({
  caseId,
  initialBody,
}: {
  caseId: string;
  initialBody: string;
}) {
  const [body, setBody] = useState(initialBody);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [savingError, setSavingError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [checkoutNotice, setCheckoutNotice] = useState<string | null>(null);

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

  async function checkout(option: CheckoutOption) {
    // Save first
    await save();
    setCheckoutNotice(
      option === "download"
        ? "Stripe checkout for $39 download will go here once Stripe keys are configured."
        : "Stripe checkout for $79 mail-it-certified will go here once Stripe keys are configured."
    );
    // TODO: when Stripe keys arrive, replace with:
    //   const res = await fetch('/api/checkout/session', { method: 'POST', body: JSON.stringify({ caseId, product_key: option === 'download' ? 'demand_letter_download' : 'demand_letter_mail' }) })
    //   const { url } = await res.json()
    //   window.location.href = url
  }

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

      <div className="dl-pricing-cards">
        <div className="dl-price-card">
          <div className="dl-price-tier">Download only</div>
          <div className="dl-price">${PRICE_DOWNLOAD}</div>
          <ul className="dl-price-features">
            <li>Polished PDF of your letter</li>
            <li>Plain-text copy you can email</li>
            <li>Instructions for sending it yourself</li>
          </ul>
          <button
            type="button"
            className="btn btn-cream btn-full"
            onClick={() => startTransition(() => checkout("download"))}
            disabled={isPending}
          >
            Get the PDF
          </button>
        </div>

        <div className="dl-price-card dl-price-card-featured">
          <div className="dl-price-badge">Recommended</div>
          <div className="dl-price-tier">Mail it for me, certified</div>
          <div className="dl-price">${PRICE_MAIL}</div>
          <ul className="dl-price-features">
            <li>Everything in Download</li>
            <li>USPS Certified Mail with Return Receipt</li>
            <li>Tracking number + delivery confirmation</li>
            <li>Court-ready proof of delivery (PDF)</li>
          </ul>
          <button
            type="button"
            className="btn btn-dark btn-full"
            onClick={() => startTransition(() => checkout("mail"))}
            disabled={isPending}
          >
            Mail it certified
          </button>
        </div>
      </div>

      {checkoutNotice && (
        <div className="dl-stripe-stub">
          <strong>Coming soon:</strong> {checkoutNotice}
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
