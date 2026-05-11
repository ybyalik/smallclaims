import { Undo2, Dumbbell, Shirt, Scissors, PackageX, CalendarX, Receipt, FileText, Camera, MessageSquare, BadgeCheck, FileSearch } from "lucide-react";
import type { CategoryHubData } from "./types";

export const REFUND_HUB: CategoryHubData = {
  categorySlug: "refund",
  breadcrumbLabel: "Refund Disputes",
  urlPrefix: "sue-refund-",
  meta: {
    title: "How to Sue for a Refund in Small Claims Court",
    description:
      "Plain-English guide to suing for refunds. Defective products, gym memberships, dry cleaners, salons, and services not rendered. State UDAP statutes and demand-letter templates.",
    ogTitle: "How to Sue for a Refund | CivilCase",
    ogDescription: "Consumer refund disputes you can take to small claims, what you can recover, and how to file.",
  },
  schemaArticle: {
    headline: "How to Sue for a Refund in Small Claims Court",
    description:
      "Practical guide to refund disputes: defective products, gym memberships, dry cleaners, salons, and services not rendered.",
  },

  hero: {
    h1: { pre: "How to ", em: "get a refund", post: " in small claims court." },
    lede: "Defective products, gym memberships that won't cancel, dry cleaners that ruined your clothes, salons that damaged your hair, services never delivered. State consumer-protection laws apply, with 2x or 3x penalties in many states. Most cases settle once a demand letter cites the specific statute. If you paid by credit card, try a chargeback first.",
  },

  issuePhotos: ["1554224154-26032ffc0d07", "1554224155-1696413565d3", "1556761175-5973dc0f32e7", "1556909114-f6e7ad7d3136", "1450101499163-c8848c66ca85"],

  issuesIntro: {
    h2: { pre: "What kind of refund are you trying to ", em: "recover", post: "?" },
    paragraph: "Each guide covers what you can recover and how to file.",
  },

  somethingElseCard: { title: "Something else?", blurb: "Tell us about your situation in 90 seconds and get a strength read on your case." },

  issues: [
    { slug: "refund-general", title: "Refund (general)", blurb: "Sue under state consumer-protection laws plus breach of contract. Many states let you ask for 2x or 3x damages. Try a credit-card chargeback first; small claims is the backup.", icon: <Undo2 size={24} strokeWidth={1.7} />, ready: true },
    { slug: "gym-membership", title: "Gym membership", blurb: "Most states have specific laws regulating health-club contracts (e.g. CA Civil Code § 1812.82). You get a cooling-off period to cancel — and 'no refund' clauses can't override those state-given rights.", icon: <Dumbbell size={24} strokeWidth={1.7} />, ready: true },
    { slug: "dry-cleaner", title: "Dry cleaner damage", blurb: "When you hand clothes to a dry cleaner, the law presumes they were careless if items come back damaged — they have to prove they weren't. Those 'not responsible for damage' signs usually don't hold up. You can recover the replacement value of damaged items.", icon: <Shirt size={24} strokeWidth={1.7} />, ready: true },
    { slug: "salon-or-hairdresser", title: "Salon / hairdresser damage", blurb: "When a hairdresser causes damage, you can sue for negligence plus failing to deliver the professional service you paid for. Before/after photos plus receipts for corrective treatment make the case.", icon: <Scissors size={24} strokeWidth={1.7} />, ready: true },
    { slug: "defective-product", title: "Defective product", blurb: "Federal warranty law (Magnuson-Moss) plus your state's implied warranty (that products must work as advertised) plus consumer-protection law. If you win, the manufacturer pays your attorney fees on top.", icon: <PackageX size={24} strokeWidth={1.7} />, ready: true },
    { slug: "services-not-rendered", title: "Services not rendered", blurb: "Paid for a service that was never delivered. Sue for breach of contract plus consumer-protection penalties (2x in many states). Documentation of what was promised + proof it didn't happen wins the case.", icon: <CalendarX size={24} strokeWidth={1.7} />, ready: true },
  ],

  belongs: {
    h2Em: "refund disputes",
    intro: "Most refund disputes are textbook small-claims cases. Every state has a 'UDAP' law — Unfair and Deceptive Acts and Practices — that sits on top of regular breach-of-contract law and often adds 2x or 3x damages plus attorney fees. Most disputes settle when the demand letter cites the right statute.",
    inItems: [
      { titleBold: "Refund for a service that was never delivered.", rest: "Wedding photographer who didn't show, contractor who never started, course that never began. Breach of contract." },
      { titleBold: "Defective product the seller won't refund.", rest: "Under 'implied warranty' law, products must work for their normal purpose — even if no one explicitly promised they would." },
      { titleBold: "Gym, dance studio, or self-storage cancellation.", rest: "Most states have specific laws that override 'no refund' language in long-term contracts." },
      { titleBold: "Damage by a service handler (dry cleaner, valet, mover).", rest: "When you handed over the item, the business is presumed to have been careless if it comes back damaged — they have to prove they weren't at fault." },
      { titleBold: "Refund denied after a credit-card chargeback failed.", rest: "Bring the bank's denial letter. Small claims is the backup when card networks won't pay out." },
    ],
    outItems: [
      { titleBold: "Buyer’s remorse.", rest: "If the product worked and you simply changed your mind, ‘all sales final’ usually holds up." },
      { titleBold: "Disputes still in chargeback review.", rest: "Wait for the bank decision. Filing both at once usually gets the small-claims case dismissed or stayed." },
      { titleBold: "Damages above the cap.", rest: "Big-ticket purchases (cars, kitchens, multi-year contracts) need a higher court." },
      { titleBold: "Personal injury from a product or service.", rest: "Product-liability and personal-injury cases need an attorney and civil court." },
    ],
  },

  damages: {
    intro: "The math judges use. A typical refund case stacks the price you paid, any state UDAP multiplier, and reasonable attorney fees if the statute shifts them.",
    rows: [
      { iconSvg: <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3h12v17l-3-2-3 2-3-2-3 2z" /><path d="M12 8v6M10 9.5c0-.8.7-1.5 1.5-1.5h1c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5h-1c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5h1c.8 0 1.5-.7 1.5-1.5" /></svg>, tag: "Refund of price paid", body: "What you paid for the product or service. Receipts, invoices, bank statements all anchor the number.", amount: "$1,500", barWidthPct: 50, barLabel: "Base amount" },
      { iconSvg: <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 4v17M5 21h14" /><path d="M5 8h14" /><path d="M5 8l-2 5h4z M19 8l-2 5h4z" /><path d="M12 4l-7 4M12 4l7 4" /></svg>, tag: "Consumer-protection penalty", body: "Most state consumer-protection laws add 2x or 3x damages when the seller engaged in deceptive practices.", amount: "+$1,500", barWidthPct: 50, barLabel: "Multiplier", accent: true },
      { iconSvg: <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><path d="M3 12h18" /></svg>, tag: "Mitigation costs", body: "Replacement at higher price, corrective treatment, restocking fees you absorbed. Keep the receipts.", amount: "+$300", barWidthPct: 10, barLabel: "Typical recovery" },
      { iconSvg: <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M19 5L5 19" /><circle cx="7.5" cy="7.5" r="2.5" /><circle cx="16.5" cy="16.5" r="2.5" /></svg>, tag: "Filing fee + interest", body: "Filing fee, service-of-process cost, pre-judgment interest at the state legal rate.", amount: "+$200", barWidthPct: 5, barLabel: "Accruing" },
    ],
    totalNote: "with UDAP multiplier",
    totalAmount: "$3,500",
    totalCaption: "Sample math on a $1,500 service that was never delivered, in a 2x-multiplier state. Your numbers will differ.",
  },

  evidence: {
    h2Em: "get your refund",
    intro: "Refund cases are won on the receipt and the policy. Show what you paid, what was promised, what you received (or did not), and where you tried to get it fixed before suing.",
    items: [
      { iconSvg: <Receipt size={16} strokeWidth={1.8} />, title: "Receipt or invoice", desc: "Itemized receipt, invoice, or order confirmation showing what you paid and when." },
      { iconSvg: <FileText size={16} strokeWidth={1.8} />, title: "Contract or terms", desc: "Membership agreement, service contract, or product description. The ‘what was promised’ side of the dispute." },
      { iconSvg: <Camera size={16} strokeWidth={1.8} />, title: "Photos of the product or damage", desc: "Defective product, ruined clothes, bad haircut. Date-stamped photos. Side-by-side with the listing or the original where possible." },
      { iconSvg: <MessageSquare size={16} strokeWidth={1.8} />, title: "Refund request and response", desc: "Email, text, or chat where you asked for the refund and the seller refused. Establishes you tried before suing." },
      { iconSvg: <BadgeCheck size={16} strokeWidth={1.8} />, title: "Chargeback decision", desc: "Bank or card-network outcome letter if you tried a chargeback. Win or loss, it shows you exhausted the easier route." },
      { iconSvg: <FileSearch size={16} strokeWidth={1.8} />, title: "Mitigation receipts", desc: "Replacement purchase, corrective service, expert opinion. The cost of fixing the harm." },
    ],
  },

  stateRulesIntro: "UDAP multipliers (2x or 3x), pre-judgment interest, and consumer-protection statutes vary by state. Pick yours.",

  featuredStateSlugs: ["california", "texas", "florida", "new-york", "illinois", "pennsylvania", "ohio", "georgia", "michigan", "north-carolina", "minnesota", "delaware"],

  testimonial: {
    quote: "Gym refused to cancel and kept charging. Judge ordered $1,800 back plus the filing fee.",
    name: "Sara C.",
    role: "Member · Pennsylvania",
  },

  audienceLabel: "consumers",

  faqs: [
    { q: "Can I sue for a refund in small claims court?", a: "Yes. Every state has a consumer-protection law (often called 'UDAP' — Unfair and Deceptive Acts and Practices) that covers most refund disputes. Many states let you ask for 2x or 3x damages. For defective products, there's also implied warranty law. For damaged clothing or items left in someone's care, there's bailment law. Most disputes settle once a real demand letter arrives." },
    { q: "Should I do a chargeback or sue?", a: "If you paid by credit card, try a chargeback first (you usually have 60-120 days). It's often the fastest recovery. Save small claims for cases where the chargeback was denied or doesn't apply (Venmo, Zelle, cash, etc.)." },
    { q: "What about 'all sales final' policies?", a: "'All sales final' clauses don't override your state's consumer-protection law or implied warranty rights. If the product was defective, or the service was never delivered, you have legal rights to a refund regardless of what the store policy says." },
    { q: "What is UDAP?", a: "UDAP stands for Unfair and Deceptive Acts and Practices — your state's consumer-protection law. Every state has one. They prohibit deceptive business practices (false advertising, hidden fees, bait-and-switch). Most include 2x or 3x penalty damages plus attorney fees if you win." },
    { q: "How long do I have to sue?", a: "Consumer-protection (UDAP) claims usually give you 2 to 4 years. Breach of contract: 4 to 6 years. Specific contracts like gym memberships may have their own deadlines spelled out in the contract." },
  ],

  schemaFaqIndices: [0, 1, 2],

  disclaimerNote: "Consumer-protection statutes and refund rights vary widely by state. Verify deadlines and citations against your state’s official source before filing.",
};
