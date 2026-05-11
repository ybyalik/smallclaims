import { Banknote, Droplets, DoorOpen, Lock, AlertOctagon, Bug, ShieldAlert, HeartCrack, Building2, Move, FileX, FileText, Camera, MessageSquare, Receipt, MapPin, Users } from "lucide-react";
import type { CategoryHubData } from "./types";

export const LANDLORD_HUB: CategoryHubData = {
  categorySlug: "landlord",
  breadcrumbLabel: "Landlord Disputes",
  urlPrefix: "sue-landlord-",
  meta: {
    title: "How to Sue Your Landlord in Small Claims Court",
    description:
      "Step by step guide to suing your landlord. Security deposits, mold, illegal lockouts, harassment, wrongful eviction, and 7 more disputes. What you can recover and how to file in your state.",
    ogTitle: "How to Sue Your Landlord in Small Claims Court | CivilCase",
    ogDescription:
      "Landlord-tenant disputes you can take to small claims, what you can recover, and how to file in your state.",
  },
  schemaArticle: {
    headline: "How to Sue Your Landlord in Small Claims Court",
    description:
      "Practical guide to suing a landlord in small claims for security deposits, illegal lockouts, mold, repairs, and other tenant disputes.",
  },

  hero: {
    h1: { pre: "How to ", em: "sue your landlord", post: " in small claims court." },
    lede: "If your landlord owes you money for a withheld deposit, repair costs, or a hotel bill from a lockout, small claims is the right court. You do not need an attorney. Filing fees are usually under $100, and many states add statutory damages on top of what you are directly owed.",
  },

  issuePhotos: ["1560518883-ce09059eeffa", "1493809842364-78817add7ffb", "1560448204-e02f11c3d0e2", "1502672260266-1c1ef2d93688", "1568605114967-8130f3a36994"],

  issuesIntro: {
    h2: { pre: "What can you sue your landlord ", em: "for", post: "?" },
    paragraph: "Pick the one that fits your situation. Each guide covers what you can recover, what evidence to bring, and how to file in your state.",
  },

  somethingElseCard: {
    title: "Something else?",
    blurb: "Tell us about your situation in 90 seconds and get a strength read on your case.",
  },

  issues: [
    { slug: "security-deposit", title: "Security deposit not returned", blurb: "The most common landlord small-claims case. Most states let you ask for 2x or 3x the deposit as a penalty if the landlord kept it without a good reason.", icon: <Banknote size={24} strokeWidth={1.7} />, ready: true },
    { slug: "mold", title: "Mold and habitability", blurb: "Recover medical costs, ruined property, and rent abatement when your landlord ignores serious habitability problems.", icon: <Droplets size={24} strokeWidth={1.7} />, ready: true },
    { slug: "wrongful-eviction", title: "Wrongful eviction", blurb: "Sue for moving costs, lost property, hotel stays, and statutory damages of 2x or 3x rent in tenant-friendly states.", icon: <DoorOpen size={24} strokeWidth={1.7} />, ready: true },
    { slug: "illegal-lockout", title: "Illegal lockout", blurb: "Changed locks, shut-off utilities, or removed belongings without a court order. California adds $100/day. Florida adds 3x rent.", icon: <Lock size={24} strokeWidth={1.7} />, ready: true },
    { slug: "harassment", title: "Landlord harassment", blurb: "Repeated unauthorized entry, threats, retaliation. California adds $2,000 per harassment act. NYC adds 3x rent.", icon: <AlertOctagon size={24} strokeWidth={1.7} />, ready: true },
    { slug: "pest-infestation", title: "Pest infestation", blurb: "Roaches, bed bugs, rats. Recover treatment costs, replaced belongings, and rent reduction for the affected period.", icon: <Bug size={24} strokeWidth={1.7} />, ready: true },
    { slug: "unsafe-conditions", title: "Unsafe living conditions", blurb: "Structural failures, electrical hazards, missing smoke detectors, no heat or hot water. The law calls this a 'habitability' problem, and you can sue for rent back during the time the unit wasn't liveable.", icon: <ShieldAlert size={24} strokeWidth={1.7} />, ready: true },
    { slug: "emotional-distress", title: "Emotional distress", blurb: "Pair with another tenant claim for the strongest case. Therapy bills and lost work make documented claims succeed.", icon: <HeartCrack size={24} strokeWidth={1.7} />, ready: true },
    { slug: "apartment-complex", title: "Apartment complex", blurb: "Corporate landlords settle faster than mom-and-pop. Multi-claim cases against complexes typically recover $2,000 to $6,000.", icon: <Building2 size={24} strokeWidth={1.7} />, ready: true },
    { slug: "after-moving-out", title: "After moving out", blurb: "Statutes of limitations are generous. Most claims still timely 1 to 4 years post-move-out. Move quickly anyway.", icon: <Move size={24} strokeWidth={1.7} />, ready: true },
    { slug: "break-lease", title: "Break your lease", blurb: "Five legal grounds let you break a lease without penalty: military, domestic violence, habitability, harassment, mutual.", icon: <FileX size={24} strokeWidth={1.7} />, ready: true },
  ],

  belongs: {
    h2Em: "landlord disputes",
    intro: "Small claims is built for everyday money disputes, the kind tenants run into all the time. Most state caps fall between $5,000 and $20,000. Hearings take 10 to 15 minutes. You do not need a lawyer to use it.",
    inItems: [
      { titleBold: "Withheld security deposit.", rest: "Plus 2x or 3x in statutory damages in many states." },
      { titleBold: "Repairs you paid for", rest: "that the lease said the landlord owed." },
      { titleBold: "Hotel stays", rest: "during an illegal lockout or uninhabitable period." },
      { titleBold: "Ruined personal property", rest: "from a habitability failure (mold, leaks, pests)." },
      { titleBold: "Lead-paint disclosure", rest: "violations under federal and state law." },
    ],
    outItems: [
      { titleBold: "Getting back into the unit.", rest: "That requires an emergency court order from housing court — small claims can't force the landlord to let you back in." },
      { titleBold: "Rent-control calculations.", rest: "Handled by your local rent board, not the courts." },
      { titleBold: "Fair-housing discrimination.", rest: "Filed with a civil-rights agency or in federal court." },
      { titleBold: "Eviction defense.", rest: "Goes to housing court (sometimes called 'unlawful detainer' court), not small claims." },
    ],
  },

  damages: {
    intro: "The math judges use. A typical security-deposit case stacks four layers on top of the deposit you are directly owed.",
    rows: [
      {
        iconSvg: (
          <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 3h12v17l-3-2-3 2-3-2-3 2z" />
            <path d="M12 8v6M10 9.5c0-.8.7-1.5 1.5-1.5h1c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5h-1c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5h1c.8 0 1.5-.7 1.5-1.5" />
          </svg>
        ),
        tag: "Direct damages",
        body: "The deposit, repair receipts, hotel and moving costs, replacement-cost photos.",
        amount: "$1,500",
        barWidthPct: 30,
        barLabel: "Base amount",
      },
      {
        iconSvg: (
          <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 4v17M5 21h14" />
            <path d="M5 8h14" />
            <path d="M5 8l-2 5h4z M19 8l-2 5h4z" />
            <path d="M12 4l-7 4M12 4l7 4" />
          </svg>
        ),
        tag: "Penalty on top",
        body: "If the landlord kept your money without a good reason, most states let you ask for 2 or 3 times that amount as a penalty (called 'statutory damages').",
        amount: "+$3,000",
        barWidthPct: 62,
        barLabel: "Multiplier",
        accent: true,
      },
      {
        iconSvg: (
          <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="7" width="18" height="13" rx="2" />
            <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            <path d="M3 12h18" />
          </svg>
        ),
        tag: "Attorney's fees",
        body: "Many state laws make the losing side pay the winner's attorney fees. That pressure alone often gets the landlord to settle before court.",
        amount: "+$300",
        barWidthPct: 8,
        barLabel: "Typical recovery",
      },
      {
        iconSvg: (
          <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 5L5 19" />
            <circle cx="7.5" cy="7.5" r="2.5" />
            <circle cx="16.5" cy="16.5" r="2.5" />
          </svg>
        ),
        tag: "Interest",
        body: "4 to 10 percent per year, pre- and post-judgment, depending on the state.",
        amount: "+$150",
        barWidthPct: 4,
        barLabel: "Accruing",
      },
    ],
    totalNote: "3.3× the deposit",
    totalAmount: "$4,950",
    totalCaption: "Sample math on a $1,500 deposit a landlord withheld in bad faith. Your numbers will differ.",
  },

  evidence: {
    h2Em: "sue your landlord",
    intro: "Landlord cases are won on paperwork. Anything you can't show in writing, you're asking the judge to just take your word for — and they usually won't. Your landlord (especially one with a property manager) has more documentation than you do. Your job is to close that gap before you walk into court.",
    items: [
      { iconSvg: <FileText size={16} strokeWidth={1.8} />, title: "Your lease", desc: "Every page of the signed copy, not a draft. If it lives in your email, print it." },
      { iconSvg: <Camera size={16} strokeWidth={1.8} />, title: "Move-in & move-out photos", desc: "Walkthrough photos plus the condition checklist. Date-stamps matter. Judges care when the evidence was created." },
      { iconSvg: <Banknote size={16} strokeWidth={1.8} />, title: "Proof of every payment", desc: "Bank records, money-order stubs, canceled checks, payment-app screenshots. Show dollar amount and date." },
      { iconSvg: <MessageSquare size={16} strokeWidth={1.8} />, title: "All communications", desc: "Texts, emails, certified-mail receipts, voicemails. Most landlord-tenant cases turn on what was said and when." },
      { iconSvg: <Receipt size={16} strokeWidth={1.8} />, title: "Receipts for what you spent", desc: "Hotel, movers, replacement furniture, exterminator, mold remediation. Originals or PDFs." },
      { iconSvg: <MapPin size={16} strokeWidth={1.8} />, title: "Your forwarding address notice", desc: "For deposit cases especially. Written notice telling the landlord where to send the deposit is what starts the state's return-deadline clock. Without it, they can argue they had nowhere to mail the check." },
      { iconSvg: <Users size={16} strokeWidth={1.8} />, title: "Witness contact info", desc: "Roommate, neighbor, or repair tech who saw the unit’s condition can be the difference at the hearing." },
    ],
  },

  stateRulesIntro: "Landlord-tenant rules vary state by state. Deposit return deadlines, statutory damages, and repair-and-deduct procedures are different in every state. Pick yours for the exact statute, deadline, and form numbers.",

  featuredStateSlugs: ["california", "texas", "florida", "new-york", "illinois", "pennsylvania", "ohio", "georgia", "michigan", "north-carolina", "minnesota", "delaware"],

  testimonial: {
    quote: "Won my $4,500 deposit back in 47 days. The demand letter alone got my landlord to settle.",
    name: "Maria R.",
    role: "Tenant · California",
  },

  audienceLabel: "tenants",

  faqs: [
    { q: "Can you sue your landlord in small claims court?", a: "Yes. Small claims is the standard venue for tenant-versus-landlord money disputes under your state’s jurisdictional cap (usually $5,000 to $20,000). Eviction itself goes to housing court, but money you are owed (deposit, repair costs, hotel stays during a lockout, ruined property) belongs in small claims." },
    { q: "How long do you have to sue a landlord?", a: "Most landlord-tenant claims have a 2 to 6 year statute of limitations, depending on the state and whether the lease is written or oral. Security-deposit claims usually run on the contract clock (longer). Repair and habitability claims sometimes run on a tort clock (shorter). Check your state guide for exact numbers." },
    { q: "Do you need a lawyer to sue a landlord?", a: "No. In most states attorneys are permitted but not required. In a few states (California, for example) lawyers are not even allowed at the initial small-claims hearing. The whole format is built for self-represented litigants." },
    { q: "What if your landlord ignores your demand letter?", a: "That's your cue to file in small claims. The demand letter creates a paper trail you point to at the hearing — most judges expect to see one. Read your state's small-claims guide for the specific filing fee, forms, and service-of-process rules." },
    { q: "Can you sue your landlord while you still live there?", a: "Legally, yes. Practically, be careful. Most states have anti-retaliation laws that protect you from being evicted or having your rent raised because you sued — but proving the landlord retaliated is hard in practice. If you're still in the unit and can wait, many tenants file after they move out." },
    { q: "What can you recover from a landlord in small claims?", a: "At minimum, your out-of-pocket losses: the deposit, repair receipts, hotel costs, and ruined property. Many states also let you ask for a 2x or 3x penalty on top of the amount the landlord kept without a good reason, plus their attorney fees — even though you don't need a lawyer to use small claims yourself." },
  ],

  schemaFaqIndices: [0, 1, 5],

  disclaimerNote: "Landlord-tenant law varies by state, county, and lease type. Verify deadlines and statute citations against your state’s official source before filing.",
};
