import { UserX, Construction, AlertCircle, AlertTriangle, Wrench, Droplets, CloudRain, Paintbrush, TreePine, Truck, PackageX, FileText, Banknote, Camera, MessageSquare, FileSearch, BadgeCheck } from "lucide-react";
import type { CategoryHubData } from "./types";

export const CONTRACTOR_HUB: CategoryHubData = {
  categorySlug: "contractor",
  breadcrumbLabel: "Contractor Disputes",
  urlPrefix: "sue-contractor-",
  meta: {
    title: "How to Sue a Contractor in Small Claims Court",
    description:
      "Plain-English guide to suing a contractor. Vanishing contractors, unfinished work, poor workmanship, damage to your house, and 7 more disputes. What you can recover and how to file in your state.",
    ogTitle: "How to Sue a Contractor in Small Claims Court | CivilCase",
    ogDescription:
      "Homeowner-versus-contractor disputes you can take to small claims, what you can recover, and how to file in your state.",
  },
  schemaArticle: {
    headline: "How to Sue a Contractor in Small Claims Court",
    description:
      "Practical guide to suing a contractor in small claims for vanishing deposits, unfinished work, poor workmanship, damage to your house, and other home-improvement disputes.",
  },

  hero: {
    h1: { pre: "How to ", em: "sue a contractor", post: " in small claims court." },
    lede: "If a contractor took your deposit and disappeared, left the job unfinished, did defective work, or damaged your house, small claims is often the right court. Before you file, three pressure points usually settle the case faster: a complaint to your state's contractor licensing board, a claim against the contractor's bond (insurance the state makes them carry to cover customer claims), and a demand letter that mentions both.",
  },

  issuePhotos: ["1503387762-592deb58ef4e", "1581094288338-2314dddb7ece", "1556909114-f6e7ad7d3136", "1581244277943-fe4a9c777189", "1567521464027-f127ff144326"],

  issuesIntro: {
    h2: { pre: "What can you sue a contractor ", em: "for", post: "?" },
    paragraph: "Pick the one that fits your situation. Each guide covers what you can recover, what evidence to bring, and how to file in your state.",
  },

  somethingElseCard: {
    title: "Something else?",
    blurb: "Tell us about your situation in 90 seconds and get a strength read on your case.",
  },

  issues: [
    { slug: "deposit-and-disappearing", title: "Took deposit and disappeared", blurb: "Three pressure points: contractor-board complaint, bond claim, small claims. If the contractor was unlicensed, most states let you recover every dollar paid.", icon: <UserX size={24} strokeWidth={1.7} />, ready: true },
    { slug: "unfinished-work", title: "Unfinished work", blurb: "Contractor started but never finished. Recover the cost difference to hire a replacement, plus the unearned portion of any deposit.", icon: <Construction size={24} strokeWidth={1.7} />, ready: true },
    { slug: "poor-workmanship", title: "Poor workmanship", blurb: "Work was done but it was defective. Most states say contractors are legally required to do work to a professional standard — if they didn't, you can recover the cost to redo or fix it.", icon: <AlertCircle size={24} strokeWidth={1.7} />, ready: true },
    { slug: "damaged-house", title: "Damaged your house", blurb: "Contractor caused collateral damage to your home (broken pipes, water damage, electrical fires). Recover repair costs plus replaced belongings.", icon: <AlertTriangle size={24} strokeWidth={1.7} />, ready: true },
    { slug: "handyman-bad-work", title: "Handyman bad work", blurb: "Handymen often work without licenses. Bad work plus unlicensed status often means you can recover every dollar paid in many states.", icon: <Wrench size={24} strokeWidth={1.7} />, ready: true },
    { slug: "plumber-damage", title: "Plumber damage", blurb: "Water damage from a plumbing job gone wrong. Plumbers carry liability insurance and bonds. Recover repairs plus damage to belongings.", icon: <Droplets size={24} strokeWidth={1.7} />, ready: true },
    { slug: "roofer-leaking-roof", title: "Roofer leaking roof", blurb: "New roof that still leaks. Workmanship warranty plus manufacturer warranty plus possible cost-to-redo. The roofing trade is heavily licensed.", icon: <CloudRain size={24} strokeWidth={1.7} />, ready: true },
    { slug: "painter-damage", title: "Painter damage", blurb: "Damaged floors, furniture, or fixtures during a paint job. Painters often skip drop cloths. Recover cleaning, refinishing, or replacement costs.", icon: <Paintbrush size={24} strokeWidth={1.7} />, ready: true },
    { slug: "landscaper-bad-work", title: "Landscaper bad work", blurb: "Dead plants, killed lawn, broken irrigation, damaged hardscape. Recover replacement plant cost plus repair of any damage caused.", icon: <TreePine size={24} strokeWidth={1.7} />, ready: true },
    { slug: "moving-company-damage", title: "Moving company damage", blurb: "Damaged furniture, walls, or floors. Interstate moves governed by federal Carmack Amendment; intrastate by state law. Different rules apply.", icon: <Truck size={24} strokeWidth={1.7} />, ready: true },
    { slug: "moving-company-lost-items", title: "Moving company lost items", blurb: "Items that never arrived. Be aware: the default coverage movers offer is only 60 cents per pound (so a 10-pound lost laptop = $6). Higher recovery requires the 'full-value' option, which the mover should have offered in writing.", icon: <PackageX size={24} strokeWidth={1.7} />, ready: true },
  ],

  belongs: {
    h2Em: "contractor disputes",
    intro: "Small claims is built for everyday money disputes. Most state caps fall between $5,000 and $20,000. Hearings take 10 to 15 minutes. You do not need a lawyer. Contractor cases have unusually strong out-of-court options that often settle the dispute before you file.",
    inItems: [
      { titleBold: "Refunded deposit.", rest: "Money paid up front for work that never started or was abandoned." },
      { titleBold: "Cost difference to finish.", rest: "Quotes from replacement contractors minus what you would have paid the original." },
      { titleBold: "Cost to redo defective work.", rest: "Contractors are legally required to do work to a professional standard. If they didn't, you can recover the cost to make it right." },
      { titleBold: "Damage to your home.", rest: "Broken pipes, water damage, electrical issues caused by the work itself." },
      { titleBold: "Unlicensed-contractor recovery.", rest: "Many states let you claw back every dollar paid to an unlicensed contractor." },
    ],
    outItems: [
      { titleBold: "Damages over the cap.", rest: "Full kitchen or bathroom remodel disputes often exceed $20,000. Those need a higher court." },
      { titleBold: "Removing a contractor's lien on your house.", rest: "If the contractor filed a 'mechanic's lien' against your property, removing it is a separate process in property court, not small claims." },
      { titleBold: "Personal injury from the work.", rest: "If the work caused an injury, that goes to regular civil court — you'll usually want a personal-injury attorney." },
      { titleBold: "Permitting and code-enforcement disputes.", rest: "These get handled by your local building department, not the courts." },
    ],
  },

  damages: {
    intro: "The math judges use. A typical contractor case stacks the deposit, the cost-to-finish difference, and any collateral damage caused by the work itself.",
    rows: [
      {
        iconSvg: (
          <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 3h12v17l-3-2-3 2-3-2-3 2z" />
            <path d="M12 8v6M10 9.5c0-.8.7-1.5 1.5-1.5h1c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5h-1c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5h1c.8 0 1.5-.7 1.5-1.5" />
          </svg>
        ),
        tag: "Direct damages",
        body: "Refunded deposit, cost difference for a replacement contractor, cost to redo defective work.",
        amount: "$3,200",
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
        tag: "Collateral damage",
        body: "Damage caused by the work itself: water damage from plumbing, fire from electrical, structural cracks.",
        amount: "+$800",
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
        tag: "Statutory penalties",
        body: "Excessive-deposit penalties, unlicensed-contractor recovery, state consumer-protection multipliers.",
        amount: "+$200",
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
        tag: "Filing fee + interest",
        body: "Filing fee, service of process, pre-judgment interest at the state legal rate (4 to 10 percent per year).",
        amount: "+$0",
        barWidthPct: 4,
        barLabel: "Accruing",
      },
    ],
    totalNote: "typical small-claims recovery",
    totalAmount: "$4,200",
    totalCaption: "Sample math on a $5,000 deposit case with $800 in collateral damage. Your numbers will differ.",
  },

  evidence: {
    h2Em: "sue a contractor",
    intro: "Contractor cases are won on the contract, the deposit receipt, photos of the work, and quotes from replacement contractors. The clearer the math, the faster the case.",
    items: [
      { iconSvg: <FileText size={16} strokeWidth={1.8} />, title: "The signed contract", desc: "Every page, plus any change orders. Most states require home-improvement contracts in writing for jobs over a dollar threshold." },
      { iconSvg: <Banknote size={16} strokeWidth={1.8} />, title: "Proof of every payment", desc: "Bank records, money-order stubs, canceled checks, payment-app screenshots. Show dollar amount and date." },
      { iconSvg: <Camera size={16} strokeWidth={1.8} />, title: "Before-and-after photos", desc: "Date-stamped photos of the area before work started and at every visit. Defective work is best shown side by side." },
      { iconSvg: <MessageSquare size={16} strokeWidth={1.8} />, title: "All communications", desc: "Texts, emails, voicemails. Most contractor cases turn on what was promised and when." },
      { iconSvg: <FileSearch size={16} strokeWidth={1.8} />, title: "Replacement quotes", desc: "Two or three written quotes from replacement contractors to finish or fix the work. Judges use the average to set damages." },
      { iconSvg: <BadgeCheck size={16} strokeWidth={1.8} />, title: "Contractor license record", desc: "Print the license record from the state board website. Shows the bond, the surety, past complaints, and current status. Critical for unlicensed-contractor cases." },
    ],
  },

  stateRulesIntro: "Contractor licensing rules, deposit caps, and bond requirements vary state by state. California has the strongest unlicensed-contractor recovery statute. Florida and Texas have specific licensing for many trades. Pick yours for the exact rules and board contact information.",

  featuredStateSlugs: ["california", "texas", "florida", "new-york", "illinois", "pennsylvania", "ohio", "georgia", "michigan", "north-carolina", "minnesota", "delaware"],

  testimonial: {
    quote: "He took my $4,800 deposit and ghosted. Demand letter alone got the check in seven days.",
    name: "Dana W.",
    role: "Homeowner · Florida",
  },

  audienceLabel: "homeowners",

  faqs: [
    { q: "Can you sue a contractor in small claims court?", a: "Yes, when the dispute is mostly about money you are owed (refunded deposit, cost-to-finish difference, repair of damage caused) and the amount is within your state’s cap (usually $5,000 to $20,000). Bigger jobs (full kitchen or bathroom remodels, roof replacements) often exceed the cap and need higher courts." },
    { q: "What is a contractor licensing board complaint?", a: "Each state has a board that licenses contractors and investigates customer complaints (California's is the CSLB, Florida's is the DBPR, and so on). The board can suspend the contractor's license, freeze their bond, order them to refund you, and fine them. Filing a complaint is free and often more effective than a lawsuit. Use this as your first step before small claims." },
    { q: "What if the contractor was unlicensed?", a: "Most states make this work in your favor. An unlicensed contractor cannot enforce the contract or sue you for the unpaid balance. In California (Business & Professions Code § 7031) and several other states, you can recover every dollar you paid — even if they did some of the work. Most cases like this win on default because the unlicensed contractor doesn't even show up." },
    { q: "How much can a contractor legally take as a deposit?", a: "California caps home-improvement deposits at $1,000 or 10 percent, whichever is less. New York caps at 50 percent. Connecticut at one-third. Many states have no cap but courts treat anything above 30 to 50 percent as suspicious. Your contractor-licensing law sets the limit." },
    { q: "What is a contractor surety bond and how do I claim against it?", a: "A surety bond is insurance the state requires licensed contractors to carry to cover claims by customers. California requires $25,000; other states vary. To claim, contact the bonding company (named on the contractor’s license), provide the contract, the deposit receipt, and proof of breach. The bond pays out before the contractor’s other creditors." },
  ],

  schemaFaqIndices: [0, 1, 2],

  disclaimerNote: "Contractor law varies by state, county, and project type. Verify deadlines, licensing rules, and statute citations against your state’s official source before filing.",
};
