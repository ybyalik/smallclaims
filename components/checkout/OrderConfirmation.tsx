import Link from "next/link";
import { Check } from "lucide-react";
import { CHECKOUT_CONFIGS, type ProductKind } from "./config";

interface NextStep {
  title: string;
  body: string;
}

interface PrimaryCta {
  href: string;
  label: string;
}

const PRODUCT_CONFIRMATION: Record<
  ProductKind,
  {
    title: string;
    subtitle: string;
    nextSteps: NextStep[];
    primaryCta: (caseId: string) => PrimaryCta;
    secondaryCta?: (caseId: string) => PrimaryCta;
  }
> = {
  "demand-letter": {
    title: "Your demand letter is ordered.",
    subtitle:
      "Our paralegal team will review your case and dispatch your letter within 24 to 48 hours.",
    nextSteps: [
      {
        title: "Paralegal review",
        body: "We check the letter against your case facts and fix any obvious issues before mailing.",
      },
      {
        title: "Certified mail dispatch",
        body: "Sent USPS Certified Mail with tracking. You get the tracking number by email.",
      },
      {
        title: "Track delivery",
        body: "Watch the response status from your case dashboard. The 14-day clock starts when the recipient signs for it.",
      },
    ],
    primaryCta: (caseId) => ({ href: `/case/${caseId}`, label: "Open your case" }),
    secondaryCta: (caseId) => ({ href: `/case/${caseId}`, label: "Back to your case" }),
  },
  "collection-plan": {
    title: "We're building your Post-Judgment Collection Plan.",
    subtitle:
      "Your plan is generating now. We're pulling your county's specific forms and fees, then building a sequenced action plan tailored to your case.",
    nextSteps: [
      {
        title: "County research",
        body: "We're fetching the actual writ of execution form, wage garnishment paperwork, sheriff fees, and recorder fees for your county. This takes about 2 to 3 minutes.",
      },
      {
        title: "Your personalized sequence",
        body: "Based on what you told us about the defendant, we'll order the collection methods that fit you best, with realistic cost and recovery estimates per step.",
      },
      {
        title: "Your report arrives",
        body: "When it's ready, the case page will show 'Open plan' and we'll send you an email. You can come back any time.",
      },
    ],
    primaryCta: (caseId) => ({ href: `/case/${caseId}`, label: "Open your case" }),
    secondaryCta: (caseId) => ({ href: `/case/${caseId}`, label: "Back to your case" }),
  },
  "filing-guide": {
    title: "Your Filing Guide is unlocked.",
    subtitle:
      "Specific to your state and county. Everything you need to file the case correctly the first time.",
    nextSteps: [
      {
        title: "Where to file",
        body: "Your guide tells you the exact court and venue rules. Filing in the wrong county gets your packet rejected.",
      },
      {
        title: "Forms and fees",
        body: "Direct links to the forms you need, with fee amounts and waiver eligibility.",
      },
      {
        title: "Service of process",
        body: "How to serve the defendant and the proof-of-service form you'll file with the court.",
      },
    ],
    primaryCta: (caseId) => ({ href: `/case/${caseId}/file`, label: "Open your filing guide" }),
    secondaryCta: (caseId) => ({ href: `/case/${caseId}`, label: "Back to your case" }),
  },
};

interface Props {
  productKind: ProductKind;
  caseId: string;
  amountCents: number | null;
  paymentId?: string | null;
}

export default function OrderConfirmation({
  productKind,
  caseId,
  amountCents,
  paymentId,
}: Props) {
  const meta = PRODUCT_CONFIRMATION[productKind];
  const config = CHECKOUT_CONFIGS[productKind];
  const primary = meta.primaryCta(caseId);
  const secondary = meta.secondaryCta?.(caseId);

  return (
    <div className="ck-conf">
      <div className="ck-conf-mark" aria-hidden="true">
        <Check size={32} strokeWidth={2.6} />
      </div>
      <p className="ck-conf-eyebrow">{config.eyebrow}</p>
      <h1 className="ck-conf-title">{meta.title}</h1>
      <p className="ck-conf-sub">{meta.subtitle}</p>

      {amountCents !== null ? (
        <div className="ck-conf-receipt">
          <span>Charged today</span>
          <strong>${(amountCents / 100).toFixed(2)}</strong>
          {paymentId ? (
            <a
              href={`/api/payments/${paymentId}/receipt`}
              className="ck-conf-receipt-link"
              title="Download PDF receipt"
            >
              Download receipt ↓
            </a>
          ) : null}
        </div>
      ) : null}

      <div className="ck-conf-steps">
        <h2 className="ck-conf-steps-h">What happens next</h2>
        <ol>
          {meta.nextSteps.map((s, i) => (
            <li key={s.title}>
              <span className="ck-conf-step-num">{i + 1}</span>
              <div>
                <strong>{s.title}</strong>
                <span>{s.body}</span>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="ck-conf-actions">
        <Link href={primary.href} className="btn btn-dark">
          {primary.label}
        </Link>
        {secondary ? (
          <Link href={secondary.href} className="btn btn-cream">
            {secondary.label}
          </Link>
        ) : null}
      </div>
    </div>
  );
}
