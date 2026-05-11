import { Banknote, Receipt, DoorOpen, ShieldOff, CreditCard, FileQuestion, HeartCrack, FileText, MessageSquare, Camera, Calendar, Users } from "lucide-react";
import type { CategoryHubData } from "./types";

export const ROOMMATE_HUB: CategoryHubData = {
  categorySlug: "roommate",
  breadcrumbLabel: "Roommate Disputes",
  urlPrefix: "sue-roommate-",
  meta: {
    title: "How to Sue Your Roommate in Small Claims Court",
    description:
      "Plain-English guide to suing a roommate. Unpaid rent, bills, moving out without notice, property damage, security deposits, and no-lease cases. What you can recover and how to file.",
    ogTitle: "How to Sue Your Roommate in Small Claims Court | CivilCase",
    ogDescription: "Roommate disputes you can take to small claims, what you can recover, and how to file.",
  },
  schemaArticle: {
    headline: "How to Sue Your Roommate in Small Claims Court",
    description:
      "Practical guide to roommate disputes: unpaid rent, bills, moving out without notice, property damage, security deposits, no-lease cases, and emotional distress.",
  },

  hero: {
    h1: { pre: "How to ", em: "sue your roommate", post: " in small claims court." },
    lede: "Unpaid rent, unpaid bills, moving out without notice, property damage, security-deposit disputes, and emotional distress. Roommate cases are textbook small-claims cases. Most settle once a demand letter arrives. Bank records, texts, and lease provisions establish the case.",
  },

  issuePhotos: ["1560448204-e02f11c3d0e2", "1502672260266-1c1ef2d93688", "1560518883-ce09059eeffa", "1493809842364-78817add7ffb", "1484154218962-a197022b5858"],

  issuesIntro: {
    h2: { pre: "What can you sue your roommate ", em: "for", post: "?" },
    paragraph: "Pick the one that fits your situation. Each guide covers what you can recover, what evidence to bring, and how to file in your state.",
  },

  somethingElseCard: { title: "Something else?", blurb: "Tell us about your situation in 90 seconds and get a strength read on your case." },

  issues: [
    { slug: "unpaid-rent", title: "Unpaid rent", blurb: "Joint-and-several lease liability + contribution rights. Bank record + texts + lease establish the case.", icon: <Banknote size={24} strokeWidth={1.7} />, ready: true },
    { slug: "unpaid-bills", title: "Unpaid bills + utilities", blurb: "Shared utilities, internet, household supplies. Course of dealing + bills + Venmo records make the case clean.", icon: <Receipt size={24} strokeWidth={1.7} />, ready: true },
    { slug: "moving-out-no-notice", title: "Moved out no notice", blurb: "Their share of rent until you find a replacement. Mitigation documentation (Craigslist posts) is critical.", icon: <DoorOpen size={24} strokeWidth={1.7} />, ready: true },
    { slug: "property-damage-or-theft", title: "Damage or theft", blurb: "Negligence + conversion. Photos + receipts + witness testimony establish the case.", icon: <ShieldOff size={24} strokeWidth={1.7} />, ready: true },
    { slug: "security-deposit", title: "Security deposit", blurb: "Roommate kept your share. Bank record from move-in + landlord refund record establish the case.", icon: <CreditCard size={24} strokeWidth={1.7} />, ready: true },
    { slug: "no-lease", title: "No written lease", blurb: "Implied contracts + course of dealing both apply. Months of consistent Venmo establish the agreement.", icon: <FileQuestion size={24} strokeWidth={1.7} />, ready: true },
    { slug: "emotional-distress", title: "Emotional distress", blurb: "IIED + paired-claim structure. Therapy bills + provider notes + lost work establish damages.", icon: <HeartCrack size={24} strokeWidth={1.7} />, ready: true },
  ],

  belongs: {
    h2Em: "roommate disputes",
    intro: "Roommate disputes are textbook small-claims cases. Most state caps fall between $5,000 and $20,000. Most cases settle once a demand letter arrives. The lease, the bank records, and a string of payment-app messages do most of the work.",
    inItems: [
      { titleBold: "Unpaid share of rent.", rest: "Joint-and-several liability on the lease plus contribution rights between roommates." },
      { titleBold: "Unpaid utilities and shared bills.", rest: "Internet, electric, water, household supplies. Course of dealing plus the bill establishes the obligation." },
      { titleBold: "Rent owed after they moved out early.", rest: "Their share until you found a replacement. Document the mitigation (Craigslist posts, listing screenshots)." },
      { titleBold: "Property damage and missing items.", rest: "Repair receipts, replacement cost, and photos. Conversion (theft) is its own claim." },
      { titleBold: "Their share of the security deposit they kept.", rest: "Landlord’s refund check made out to one of you, then never split. Bank record settles it." },
    ],
    outItems: [
      { titleBold: "Eviction of the roommate.", rest: "If the landlord is on the lease too, eviction goes to housing court, not small claims." },
      { titleBold: "Restoring access to the home.", rest: "Lockout disputes need an emergency injunction in housing court." },
      { titleBold: "Personal-injury claims.", rest: "Fights or accidents that caused medical bills go to civil court with an attorney." },
      { titleBold: "Damages over the cap.", rest: "Multi-year unpaid rent or major property damage above $20,000 needs a higher court." },
    ],
  },

  damages: {
    intro: "The math judges use. A typical roommate case stacks the unpaid share, any damage or unpaid bills, and the filing fee.",
    rows: [
      { iconSvg: <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3h12v17l-3-2-3 2-3-2-3 2z" /><path d="M12 8v6M10 9.5c0-.8.7-1.5 1.5-1.5h1c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5h-1c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5h1c.8 0 1.5-.7 1.5-1.5" /></svg>, tag: "Unpaid share", body: "Their portion of rent and shared bills you covered while they were on the lease.", amount: "$2,400", barWidthPct: 50, barLabel: "Base amount" },
      { iconSvg: <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 4v17M5 21h14" /><path d="M5 8h14" /><path d="M5 8l-2 5h4z M19 8l-2 5h4z" /><path d="M12 4l-7 4M12 4l7 4" /></svg>, tag: "Damage and missing items", body: "Repair receipts, replacement cost, deep cleaning. Photos and dated receipts anchor the number.", amount: "+$900", barWidthPct: 30, barLabel: "Multiplier", accent: true },
      { iconSvg: <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><path d="M3 12h18" /></svg>, tag: "Filing fee + interest", body: "Filing fee, service of process, pre-judgment interest at the state legal rate.", amount: "+$200", barWidthPct: 5, barLabel: "Typical recovery" },
    ],
    totalNote: "typical small-claims recovery",
    totalAmount: "$3,500",
    totalCaption: "Sample math on a roommate who moved out early and left damage. Your numbers will differ.",
  },

  evidence: {
    h2Em: "sue your roommate",
    intro: "Roommate cases are won on the lease, the payment-app history, and the texts. Most evidence already lives on your phone. Pull it together before you draft the demand letter.",
    items: [
      { iconSvg: <FileText size={16} strokeWidth={1.8} />, title: "The lease", desc: "Every page of the signed lease, plus any roommate agreement or rent-split memo. Names on the lease set who is liable." },
      { iconSvg: <Banknote size={16} strokeWidth={1.8} />, title: "Bank and payment-app history", desc: "Venmo, Zelle, Cash App, bank transfers. Pattern of who paid what month builds the case faster than any document." },
      { iconSvg: <MessageSquare size={16} strokeWidth={1.8} />, title: "Texts and group chats", desc: "Anything where the roommate acknowledges the rent split, the missing payment, or the move-out plan. Screenshot whole threads." },
      { iconSvg: <Camera size={16} strokeWidth={1.8} />, title: "Move-in and move-out photos", desc: "Date-stamped photos of the unit on day one and the day they moved out. Damage cases live or die here." },
      { iconSvg: <Calendar size={16} strokeWidth={1.8} />, title: "Replacement-roommate timeline", desc: "Listings, screening texts, and move-in date for whoever filled the room. Proves you mitigated the loss." },
      { iconSvg: <Users size={16} strokeWidth={1.8} />, title: "Witness statements", desc: "Other roommates, friends, or the landlord can confirm the split or the damage. A short signed declaration helps." },
    ],
  },

  stateRulesIntro: "Joint-and-several liability rules, security-deposit rules, and contribution doctrines vary by state. Pick yours for the exact rules.",

  featuredStateSlugs: ["california", "texas", "florida", "new-york", "illinois", "pennsylvania", "ohio", "georgia", "michigan", "north-carolina", "minnesota", "delaware"],

  testimonial: {
    quote: "Roommate left a $3,200 hole when she moved out early. Recovered it all in 60 days.",
    name: "Jordan A.",
    role: "Tenant · Washington",
  },

  audienceLabel: "roommates",

  faqs: [
    { q: "Can I sue my roommate in small claims court?", a: "Yes. Unpaid rent, unpaid utilities, moving out without notice, property damage, security-deposit disputes, and emotional distress all support small-claims cases. Most cases settle once a demand letter arrives. Documentation is the spine: lease, bank records, texts, witness testimony." },
    { q: "What if there’s no written lease or roommate agreement?", a: "Implied contracts and course of dealing both apply. Months of consistent Venmo payments establish the agreement. Texts about money and witness testimony also work. The proof is harder than written-lease cases but the recovery is the same." },
    { q: "How long do I have to sue?", a: "Written lease + roommate agreement: 4 to 6 years. Oral agreement: 2 to 4 years. Property damage: 2 to 4 years. Each unpaid month is its own claim with its own clock." },
    { q: "Will the landlord get involved?", a: "Usually not. The landlord cares that the rent gets paid, not who pays it. Your contribution case against the roommate is between you and them. The landlord is not involved." },
    { q: "Can I combine multiple roommate claims?", a: "Yes. One small-claims case can include unpaid rent + unpaid bills + property damage + deposit. Combine to avoid multiple court appearances." },
  ],

  schemaFaqIndices: [0, 1, 2],

  disclaimerNote: "Joint-and-several liability rules and security-deposit rules vary widely. Verify deadlines and citations against your state’s official source before filing.",
};
