import { Car, AlertOctagon, EyeOff, Truck, Wrench, DollarSign, Clock, KeyRound, Citrus, FileText, Receipt, Camera, MessageSquare, FileSearch, BadgeCheck } from "lucide-react";
import type { CategoryHubData } from "./types";

export const AUTO_HUB: CategoryHubData = {
  categorySlug: "auto",
  breadcrumbLabel: "Auto Disputes",
  urlPrefix: "sue-auto-",
  meta: {
    title: "How to Sue Over a Car in Small Claims Court",
    description:
      "Plain-English guide to suing over a car. Lemon vehicles, dealership fraud, mechanic overcharges, towing damage, valet damage, and parked-car hits. What you can recover and how to file in your state.",
    ogTitle: "How to Sue Over a Car in Small Claims Court | CivilCase",
    ogDescription:
      "Driver-versus-everyone disputes you can take to small claims, what you can recover, and how to file in your state.",
  },
  schemaArticle: {
    headline: "How to Sue Over a Car in Small Claims Court",
    description:
      "Practical guide to suing over a car in small claims for lemon vehicles, dealership fraud, mechanic overcharges, towing damage, valet damage, and other auto disputes.",
  },

  hero: {
    h1: { pre: "How to ", em: "sue over a car", post: " in small claims court." },
    lede: "If a dealership lied to you, a mechanic overcharged, a towing company damaged your car, or someone hit you in a parking lot and walked away, small claims is often the right court. Each scenario has its own pre-suit pressure point: state DMV complaints, the federal odometer law, BBB Auto Line arbitration for lemons, and auto repair board complaints for mechanic disputes.",
  },

  issuePhotos: ["1503376780353-7e6692767b70", "1492144534655-ae79c964c9d7", "1542362567-b07e54358753", "1486006920555-c77dcf18193c", "1568605114967-8130f3a36994"],

  issuesIntro: {
    h2: { pre: "What can you sue over a car ", em: "for", post: "?" },
    paragraph: "Pick the one that fits your situation. Each guide covers what you can recover, what evidence to bring, and how to file in your state.",
  },

  somethingElseCard: {
    title: "Something else?",
    blurb: "Tell us about your situation in 90 seconds and get a strength read on your case.",
  },

  issues: [
    { slug: "parked-car-hit", title: "Someone hit my parked car", blurb: "Their auto insurance is the primary recovery. Small claims fits when the driver is uninsured, the claim was rejected, or it was a hit-and-run with a suspect identified.", icon: <Car size={24} strokeWidth={1.7} />, ready: true },
    { slug: "dealership-fraud", title: "Dealership fraud", blurb: "Mileage rollback, lying about accidents, undisclosed liens, payment scams. State consumer-protection laws often add 2x or 3x damages plus attorney fees.", icon: <AlertOctagon size={24} strokeWidth={1.7} />, ready: true },
    { slug: "dealership-undisclosed-damage", title: "Dealership not disclosing damage", blurb: "Frame damage, flood history, prior accident, salvage title undisclosed. State Carfax-style disclosure laws plus federal odometer law (49 USC § 32710) apply.", icon: <EyeOff size={24} strokeWidth={1.7} />, ready: true },
    { slug: "towing-damage", title: "Towing company damaged my car", blurb: "Tow truck scratched, dented, or broke parts of your car. When a company takes custody of your car, the law holds them to a higher standard than someone you bump into on the street — they have to prove they weren't at fault.", icon: <Truck size={24} strokeWidth={1.7} />, ready: true },
    { slug: "mechanic-bad-work", title: "Mechanic bad work", blurb: "Repair didn’t fix the problem, caused new damage, or used the wrong parts. State auto repair statutes (CA Bureau of Auto Repair, NY DMV) require written estimates.", icon: <Wrench size={24} strokeWidth={1.7} />, ready: true },
    { slug: "mechanic-overcharging", title: "Mechanic overcharging", blurb: "Bill exceeds the written estimate. Most states require shop authorization for charges over a small percentage above estimate (10% in California).", icon: <DollarSign size={24} strokeWidth={1.7} />, ready: true },
    { slug: "mechanic-took-too-long", title: "Mechanic took too long", blurb: "Repair held the car for weeks or months without progress. Recover rental car costs, lost wages, and (if outrageous) the diminished value of the vehicle.", icon: <Clock size={24} strokeWidth={1.7} />, ready: true },
    { slug: "valet-damage", title: "Valet damaged my car", blurb: "When you hand a valet your keys, the law puts the burden on them: if the car comes back damaged, they have to prove they weren't at fault — not the other way around.", icon: <KeyRound size={24} strokeWidth={1.7} />, ready: true },
    { slug: "lemon-car", title: "Sold me a lemon", blurb: "A vehicle with a recurring defect the manufacturer can't fix. You're protected by federal warranty law (Magnuson-Moss), your state's lemon law, and free arbitration through the BBB Auto Line. Possible outcomes: full refund or replacement vehicle.", icon: <Citrus size={24} strokeWidth={1.7} />, ready: true },
  ],

  belongs: {
    h2Em: "auto disputes",
    intro: "Small claims is built for everyday money disputes. Most state caps fall between $5,000 and $20,000. Hearings take 10 to 15 minutes. Auto cases have unusually strong out-of-court options because of regulatory bodies and statutory protections.",
    inItems: [
      { titleBold: "Mechanic overcharges and bad work.", rest: "State auto-repair laws limit how much a shop can charge beyond the written estimate without your approval." },
      { titleBold: "Towing damage.", rest: "When a tow company takes custody of your car, the burden is on them to prove they weren't at fault for any damage." },
      { titleBold: "Valet damage.", rest: "Same rule as towing — the valet has to prove they weren't responsible, not the other way around." },
      { titleBold: "Parked-car hit (uninsured driver).", rest: "When insurance won't cover or the claim was rejected." },
      { titleBold: "Dealership fraud and undisclosed damage.", rest: "Many state consumer-protection laws add 2x or 3x the damages plus attorney fees." },
    ],
    outItems: [
      { titleBold: "Full-vehicle lemon refund.", rest: "Cases over the cap need a lemon-law attorney (contingency, no upfront cost)." },
      { titleBold: "Personal injury from accidents.", rest: "Goes to civil court with a personal-injury attorney." },
      { titleBold: "Insurance bad-faith disputes.", rest: "Specialized insurance-law claims, not small claims." },
      { titleBold: "Title and DMV disputes.", rest: "Administrative law in front of the state DMV, not small claims." },
    ],
  },

  damages: {
    intro: "The math judges use. A typical auto case stacks the direct cost (repair or refund), consequential damages (rental, lost wages), and any statutory multiplier under state consumer-protection laws.",
    rows: [
      { iconSvg: <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3h12v17l-3-2-3 2-3-2-3 2z" /><path d="M12 8v6M10 9.5c0-.8.7-1.5 1.5-1.5h1c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5h-1c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5h1c.8 0 1.5-.7 1.5-1.5" /></svg>, tag: "Direct damages", body: "Repair cost, refund of fraudulent purchase, refund of overcharge, replacement value.", amount: "$2,400", barWidthPct: 30, barLabel: "Base amount" },
      { iconSvg: <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 4v17M5 21h14" /><path d="M5 8h14" /><path d="M5 8l-2 5h4z M19 8l-2 5h4z" /><path d="M12 4l-7 4M12 4l7 4" /></svg>, tag: "Consequential damages", body: "Rental car, lost wages, towing, alternative transportation.", amount: "+$900", barWidthPct: 62, barLabel: "Multiplier", accent: true },
      { iconSvg: <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><path d="M3 12h18" /></svg>, tag: "Statutory multiplier", body: "State consumer-protection laws often add 2x or 3x damages for fraud and willful violations.", amount: "+$300", barWidthPct: 8, barLabel: "Typical recovery" },
      { iconSvg: <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M19 5L5 19" /><circle cx="7.5" cy="7.5" r="2.5" /><circle cx="16.5" cy="16.5" r="2.5" /></svg>, tag: "Filing fee + interest", body: "Filing fee, service-of-process cost, pre-judgment interest at the state legal rate.", amount: "+$200", barWidthPct: 4, barLabel: "Accruing" },
    ],
    totalNote: "typical small-claims recovery",
    totalAmount: "$3,800",
    totalCaption: "Sample math on a $2,400 mechanic-overcharge case. Your numbers will differ.",
  },

  evidence: {
    h2Em: "sue over a car",
    intro: "Auto cases are won on documents and photos. The work order, the written estimate, before-and-after photos, and the receipts are what move the case. Many state agencies (DMV, Bureau of Auto Repair) keep records you can subpoena if needed.",
    items: [
      { iconSvg: <FileText size={16} strokeWidth={1.8} />, title: "Written estimate or work order", desc: "The signed shop authorization that started the job. Most states require it before any work begins." },
      { iconSvg: <Receipt size={16} strokeWidth={1.8} />, title: "Final invoice and receipts", desc: "What you actually paid, line by line. Compare to the estimate to show overcharges and unauthorized work." },
      { iconSvg: <Camera size={16} strokeWidth={1.8} />, title: "Before-and-after photos", desc: "Date-stamped photos of the car when you dropped it off and when you got it back. Damage cases live or die here." },
      { iconSvg: <MessageSquare size={16} strokeWidth={1.8} />, title: "All communications", desc: "Texts, emails, voicemails, online ad listings. Most auto cases turn on what was promised at the lot or counter." },
      { iconSvg: <FileSearch size={16} strokeWidth={1.8} />, title: "Second-opinion estimate", desc: "A written quote from another shop covering the same problem. Judges use it to set the proper repair cost." },
      { iconSvg: <BadgeCheck size={16} strokeWidth={1.8} />, title: "Vehicle history report", desc: "Carfax or AutoCheck for fraud and undisclosed damage cases. Print it the day you discover the problem." },
    ],
  },

  stateRulesIntro: "Auto repair laws, dealer disclosure rules, lemon-law thresholds, and consumer protection multipliers vary state by state. California has the strongest mechanic consumer-protection rules. Massachusetts has used-car lemon law. Pick yours for the exact statutes and agency contact info.",

  featuredStateSlugs: ["california", "texas", "florida", "new-york", "illinois", "pennsylvania", "ohio", "georgia", "michigan", "north-carolina", "minnesota", "delaware"],

  testimonial: {
    quote: "Dealership hid frame damage on a used car. Court ordered $3,500 plus my filing fee back.",
    name: "Carlos M.",
    role: "Buyer · Arizona",
  },

  audienceLabel: "drivers",

  faqs: [
    { q: "Can you sue over a car in small claims court?", a: "Yes, when the dispute fits your state’s cap (usually $5,000 to $20,000). Common cases: parked-car hits when the driver is uninsured, mechanic overcharges, towing damage, valet damage, and partial-refund lemon cases. Bigger cases (full lemon-law refund on a $40,000 vehicle) usually need a lemon-law attorney instead." },
    { q: "Should I sue the dealer or the manufacturer for a lemon?", a: "Almost always the manufacturer. State lemon laws and the federal Magnuson-Moss Warranty Act create the warranty obligations on the manufacturer, not the dealer. Dealers can be added as defendants for fraud or misrepresentation, but the lemon-law claim itself is against the manufacturer’s regional consumer affairs office." },
    { q: "What state agencies handle auto disputes?", a: "Mechanic complaints: state Bureau of Automotive Repair (CA), DMV (NY), or equivalent agency. Dealership complaints: state DMV or attorney general’s consumer protection office. Tow company complaints: state DOT or PUC. Lemon cases: BBB Auto Line arbitration first, then court." },
    { q: "What if the other driver was uninsured?", a: "Two paths: (1) your own uninsured-motorist coverage if you carry it; (2) sue the driver directly in small claims for repair cost. Collection from an uninsured driver can be hard, but the judgment stays on their record for 10+ years and accrues interest." },
    { q: "Will my insurance go up if I sue?", a: "Suing the other party rarely affects your insurance. What can affect your insurance is filing a claim against your own policy (uninsured motorist coverage, collision). Small-claims actions against another driver are usually insurance-neutral on your side." },
  ],

  schemaFaqIndices: [0, 1, 2],

  disclaimerNote: "Auto law varies by state, by case type, and by the specific consumer-protection statutes in play. Verify deadlines, statute citations, and agency contacts against your state’s official source before filing.",
};
