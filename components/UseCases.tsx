"use client";

import { useState } from "react";

type UseCase = {
  id: string;
  tab: string;
  title: string;
  description: string;
  image: { src: string; alt: string };
  bullets: { icon: React.ReactNode; text: string }[];
  callout: { label: string; value: string };
};

const Icon = {
  Deposit: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="6" width="18" height="13" rx="2" />
      <path d="M3 10h18" />
      <circle cx="12" cy="14.5" r="1.5" />
    </svg>
  ),
  Invoice: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
      <path d="M14 3v6h6" />
      <path d="M8 13h8M8 17h6" />
    </svg>
  ),
  Wrench: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a4.5 4.5 0 1 1-3.4 7.6L4 21l-1-1 7.1-7.3a4.5 4.5 0 0 1 4.6-6.4z" />
    </svg>
  ),
  Refund: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4" />
      <circle cx="12" cy="12" r="4" />
    </svg>
  ),
  Wages: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 6v12M9 9h4.5a2.5 2.5 0 0 1 0 5H9.5a2.5 2.5 0 0 0 0 5H14" />
    </svg>
  ),
  Car: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 17h14M5 17l-2-5h18l-2 5M7 12V8a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v4" />
      <circle cx="7.5" cy="17" r="1.5" />
      <circle cx="16.5" cy="17" r="1.5" />
    </svg>
  ),
  Shield: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2 4 6v6c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V6z" />
    </svg>
  ),
  Home: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12 12 4l9 8" />
      <path d="M5 10v10h14V10" />
    </svg>
  ),
  Doc: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
      <path d="M14 3v6h6" />
    </svg>
  ),
};

const cases: UseCase[] = [
  {
    id: "renters",
    tab: "Renters",
    title: "Get your money back from your landlord.",
    description:
      "Security deposits are the most common small claims case in America. If your landlord kept your deposit without itemizing damage or missed the legal deadline to return it, the law is on your side. Many states let you recover two or three times the deposit in bad-faith cases.",
    image: {
      src: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=900&h=900&fit=crop",
      alt: "Apartment keys on a counter",
    },
    bullets: [
      { icon: Icon.Deposit, text: "Recover your full security deposit, often with double or triple damages" },
      { icon: Icon.Wrench, text: "Get reimbursed for repairs your landlord ignored" },
      { icon: Icon.Refund, text: "Dispute bogus cleaning, late, or move-out fees" },
    ],
    callout: { label: "Average recovery", value: "$2,400" },
  },
  {
    id: "freelancers",
    tab: "Freelancers",
    title: "Make your client pay what they owe.",
    description:
      "Late payment is the freelancer tax. When a client stops responding to invoices and emails, small claims is the fastest way to collect without a collections agency taking 30%. A well-drafted demand letter alone resolves most disputes before you ever file.",
    image: {
      src: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=900&h=900&fit=crop",
      alt: "Person reviewing invoices on a laptop",
    },
    bullets: [
      { icon: Icon.Invoice, text: "Recover unpaid invoices for design, dev, writing, consulting" },
      { icon: Icon.Doc, text: "Enforce written contracts and signed statements of work" },
      { icon: Icon.Wages, text: "Collect kill fees and cancellation charges per your contract" },
    ],
    callout: { label: "Average recovery", value: "$3,800" },
  },
  {
    id: "consumers",
    tab: "Consumers",
    title: "Hold companies accountable for botched purchases.",
    description:
      "When a mechanic overcharges, a contractor abandons a job, or a wedding photographer no-shows, you usually do not need a lawyer. Small claims is built for exactly these disputes, and many state consumer-protection laws kick in extra damages for false advertising or deceptive practices.",
    image: {
      src: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=900&h=900&fit=crop",
      alt: "Receipts and a calculator",
    },
    bullets: [
      { icon: Icon.Refund, text: "Refunds for defective products and services" },
      { icon: Icon.Wrench, text: "Auto repair, contractor, and home improvement disputes" },
      { icon: Icon.Shield, text: "Statutory damages under your state's consumer protection law" },
    ],
    callout: { label: "Bonus damages available", value: "Up to 3x" },
  },
  {
    id: "small-business",
    tab: "Small businesses",
    title: "Collect from customers without hiring a lawyer.",
    description:
      "Most small claims caps work fine for B2B receivables. Sending a customer a small claims summons often closes invoices that have been ignored for months. We help you name the right legal entity, file in the correct venue, and follow through on collection.",
    image: {
      src: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&h=900&fit=crop",
      alt: "Modern small office workspace",
    },
    bullets: [
      { icon: Icon.Invoice, text: "Recover open accounts and unpaid B2B invoices" },
      { icon: Icon.Doc, text: "Enforce service agreements and master contracts" },
      { icon: Icon.Wages, text: "Collect on bounced checks (often with statutory multipliers)" },
    ],
    callout: { label: "Business cap (CA)", value: "$6,250" },
  },
  {
    id: "employees",
    tab: "Employees",
    title: "Get paid every dollar you earned.",
    description:
      "Unpaid final paychecks, missing commissions, and unreimbursed expenses are recoverable in small claims. Many states tack on penalty wages on top, and you do not need to wait for a state labor agency. If you can prove you worked the hours, you can recover the money.",
    image: {
      src: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=900&h=900&fit=crop",
      alt: "Coworkers in a workplace setting",
    },
    bullets: [
      { icon: Icon.Wages, text: "Final paychecks plus state penalty wages" },
      { icon: Icon.Invoice, text: "Unpaid commissions and bonuses" },
      { icon: Icon.Refund, text: "Unreimbursed business expenses (mileage, supplies, equipment)" },
    ],
    callout: { label: "CA penalty wages", value: "Up to 30 days" },
  },
  {
    id: "homeowners",
    tab: "Homeowners",
    title: "Resolve contractor and HOA disputes.",
    description:
      "Half-finished bathrooms, abandoned remodels, defective roofs. When a contractor takes a deposit and disappears, small claims gives you the fastest path to recovery for amounts under your state cap. We also handle HOA fee disputes and CC&R violations.",
    image: {
      src: "https://images.unsplash.com/photo-1416331108676-a22ccb276e35?w=900&h=900&fit=crop",
      alt: "House under renovation with tools",
    },
    bullets: [
      { icon: Icon.Wrench, text: "Contractor abandonment, defects, and incomplete work" },
      { icon: Icon.Home, text: "HOA fines, fee disputes, and CC&R violations" },
      { icon: Icon.Doc, text: "Property damage from neighbors and service providers" },
    ],
    callout: { label: "Unlicensed contractor", value: "Total recovery" },
  },
];

export default function UseCases() {
  const [activeId, setActiveId] = useState(cases[0].id);
  const active = cases.find((c) => c.id === activeId) ?? cases[0];

  return (
    <section className="usecases">
      <div className="wrap-wide">
        <div className="usecases-shell">
          <div className="usecases-head">
            <span className="eyebrow" style={{ color: "#F4C84B" }}>By who's filing</span>
            <h2>
              CivilCase works for <em>everyone</em> who's owed money.
            </h2>
            <div className="usecases-tabs" role="tablist">
              {cases.map((c) => (
                <button
                  key={c.id}
                  role="tab"
                  aria-selected={c.id === activeId}
                  data-active={c.id === activeId}
                  onClick={() => setActiveId(c.id)}
                  className="usecases-tab"
                >
                  {c.tab}
                </button>
              ))}
            </div>
          </div>

          <div className="usecases-body" role="tabpanel">
            <div className="usecases-image">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img key={active.id} src={active.image.src} alt={active.image.alt} />
            </div>
            <div className="usecases-content">
              <h3>{active.title}</h3>
              <p>{active.description}</p>
              <ul className="usecases-bullets">
                {active.bullets.map((b, i) => (
                  <li key={i}>
                    <span className="usecases-bullet-icon">{b.icon}</span>
                    <span>{b.text}</span>
                  </li>
                ))}
              </ul>
              <div className="usecases-callout">
                <span className="usecases-callout-label">{active.callout.label}</span>
                <span className="usecases-callout-value">{active.callout.value}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
