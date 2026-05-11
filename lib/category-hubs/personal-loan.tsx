import { Banknote, UserMinus, Users, HeartCrack, FileSignature, MessageSquare, DollarSign, FileQuestion, MailCheck, Calendar } from "lucide-react";
import type { CategoryHubData } from "./types";

export const PERSONAL_LOAN_HUB: CategoryHubData = {
  categorySlug: "personal-loan",
  breadcrumbLabel: "Personal Loan Disputes",
  urlPrefix: "sue-loan-",
  meta: {
    title: "How to Sue Someone Who Owes You Money",
    description:
      "Plain-English guide to recovering personal loans. Friends, family, exes, IOUs, verbal agreements, cash loans, and informal debts. What you can recover and how to file in your state.",
    ogTitle: "How to Sue Someone Who Owes You Money | CivilCase",
    ogDescription: "Lender-versus-borrower disputes you can take to small claims, what you can recover, and how to file.",
  },
  schemaArticle: {
    headline: "How to Sue Someone Who Owes You Money",
    description:
      "Practical guide to recovering personal loans in small claims for friends, family, exes, IOUs, verbal agreements, cash loans, and informal debts.",
  },

  hero: {
    h1: { pre: "How to ", em: "sue someone who owes you money", post: "." },
    lede: "Friend, family member, ex, or stranger. With or without a written agreement. Small claims is built for these cases. Most informal loans are recoverable: bank records, texts, witness testimony, and the borrower’s own statements all establish the agreement. Most cases settle once a demand letter arrives.",
  },

  issuePhotos: ["1554224155-1696413565d3", "1554224154-26032ffc0d07", "1556740758-90de374c12ad", "1554224128-7e632ba31cf2", "1559523161-0fc0d8b38a7a"],

  issuesIntro: {
    h2: { pre: "What kind of loan are you trying to ", em: "recover", post: "?" },
    paragraph: "Each guide covers what you can recover, what evidence to bring, and how to file in your state.",
  },

  somethingElseCard: { title: "Something else?", blurb: "Tell us about your situation in 90 seconds and get a strength read on your case." },

  issues: [
    { slug: "someone-owes-me-money", title: "Someone owes me money", blurb: "General loan recovery. Bank record + texts + state legal interest. Most informal loans are recoverable in small claims.", icon: <Banknote size={24} strokeWidth={1.7} />, ready: true },
    { slug: "friend-not-paying-back", title: "Friend not paying back", blurb: "Venmo/Zelle records + text messages establish the loan. Most cases settle once a demand letter arrives.", icon: <UserMinus size={24} strokeWidth={1.7} />, ready: true },
    { slug: "family-member", title: "Family member owes money", blurb: "Family loans face a gift presumption. Bank memos + texts + written agreements overcome it. Family fallout is significant.", icon: <Users size={24} strokeWidth={1.7} />, ready: true },
    { slug: "ex-or-after-breakup", title: "Ex owes me money", blurb: "Post-breakup recovery. Bank memos and texts overcome the gift defense. Pure cohabitation cases fit small claims.", icon: <HeartCrack size={24} strokeWidth={1.7} />, ready: true },
    { slug: "iou", title: "IOU not paid back", blurb: "Strongest type of loan evidence. Written promissory note. 4-to-6-year statute. Most defenses fail at the hearing.", icon: <FileSignature size={24} strokeWidth={1.7} />, ready: true },
    { slug: "verbal-agreement", title: "Verbal agreement", blurb: "Oral contracts are enforceable in most states. Bank records + texts + witnesses combine to prove the agreement.", icon: <MessageSquare size={24} strokeWidth={1.7} />, ready: true },
    { slug: "cash-loan", title: "Cash loan not repaid", blurb: "ATM record + witness + borrower’s texts establish cash transfers. Harder cases but very winnable with documentation.", icon: <DollarSign size={24} strokeWidth={1.7} />, ready: true },
    { slug: "unpaid-debt-no-contract", title: "Debt without a contract", blurb: "Unjust enrichment + promissory estoppel. Recovery without formal contract. Bank record + understanding of obligation = case.", icon: <FileQuestion size={24} strokeWidth={1.7} />, ready: true },
  ],

  belongs: {
    h2Em: "personal loan disputes",
    intro: "Small claims is the standard venue for informal loans between people. Most state caps fall between $5,000 and $20,000. You do not need a written contract to win. Bank records, payment-app screenshots, and the borrower’s own messages all establish the loan.",
    inItems: [
      { titleBold: "Money you can prove you transferred.", rest: "Venmo, Zelle, Cash App, ATM withdrawals, canceled checks. The dollar amount is right there on the record." },
      { titleBold: "Loans with text-message acknowledgement.", rest: "‘I’ll pay you back next month’ or ‘sorry, I’ll get it to you’ overcomes the gift defense almost every time." },
      { titleBold: "Written IOUs and promissory notes.", rest: "Even a one-line note (‘I owe you $X, will pay by Y’) is a contract." },
      { titleBold: "Pre-judgment interest at the legal rate.", rest: "Most states allow 7 to 10 percent per year from the agreed repayment date forward." },
      { titleBold: "Filing fee and service of process.", rest: "Both shift to the borrower if you win." },
    ],
    outItems: [
      { titleBold: "Loans documented only by your memory.", rest: "No bank record, no texts, no witness. Hard to win without something contemporaneous." },
      { titleBold: "Past the statute of limitations.", rest: "Written contracts run 4 to 6 years; oral 2 to 4. Older claims need the borrower’s written acknowledgement to revive." },
      { titleBold: "Money you knowingly gambled.", rest: "Most states will not enforce gambling debts." },
      { titleBold: "Investment-loss disputes.", rest: "If you funded their business and lost it, that is investor risk, not a loan, and goes to civil court." },
    ],
  },

  damages: {
    intro: "The math judges use. A typical informal-loan case stacks the principal, pre-judgment interest, and filing fees.",
    rows: [
      { iconSvg: <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3h12v17l-3-2-3 2-3-2-3 2z" /><path d="M12 8v6M10 9.5c0-.8.7-1.5 1.5-1.5h1c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5h-1c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5h1c.8 0 1.5-.7 1.5-1.5" /></svg>, tag: "Original loan", body: "The amount you transferred plus any costs you paid on the borrower’s behalf.", amount: "$3,500", barWidthPct: 65, barLabel: "Base amount" },
      { iconSvg: <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 4v17M5 21h14" /><path d="M5 8h14" /><path d="M5 8l-2 5h4z M19 8l-2 5h4z" /><path d="M12 4l-7 4M12 4l7 4" /></svg>, tag: "Pre-judgment interest", body: "State legal rate (7-10% per year typical) running from agreed repayment date.", amount: "+$500", barWidthPct: 30, barLabel: "Multiplier", accent: true },
      { iconSvg: <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><path d="M3 12h18" /></svg>, tag: "Filing fee", body: "Filing fee, service-of-process cost, post-judgment interest until paid.", amount: "+$200", barWidthPct: 5, barLabel: "Typical recovery" },
    ],
    totalNote: "typical small-claims recovery",
    totalAmount: "$4,200",
    totalCaption: "Sample math on a typical informal loan. Your numbers will differ.",
  },

  evidence: {
    h2Em: "recover money you’re owed",
    intro: "Personal-loan cases are won on the paper trail. Bank records, payment-app screenshots, and the borrower’s own messages overcome almost every defense. The judge wants to see the transfer, the agreement to repay, and proof you asked.",
    items: [
      { iconSvg: <Banknote size={16} strokeWidth={1.8} />, title: "Bank or payment-app records", desc: "Statement, transfer screenshot, or canceled check showing the dollar amount and date you sent it." },
      { iconSvg: <FileSignature size={16} strokeWidth={1.8} />, title: "Written IOU or promissory note", desc: "Even a handwritten note. If you have one, this is the strongest single piece of evidence in the case." },
      { iconSvg: <MessageSquare size={16} strokeWidth={1.8} />, title: "Texts and chat messages", desc: "Anything where the borrower says ‘pay back,’ ‘loan,’ ‘I owe you.’ Venmo memo lines count too. Screenshot the whole thread." },
      { iconSvg: <MailCheck size={16} strokeWidth={1.8} />, title: "Demand letter and proof of delivery", desc: "Certified-mail receipt or email read-receipt. Shows you gave them a chance to pay before filing." },
      { iconSvg: <Users size={16} strokeWidth={1.8} />, title: "Witness statement", desc: "A friend, partner, or coworker who heard the agreement or saw the cash change hands. A short signed declaration helps." },
      { iconSvg: <Calendar size={16} strokeWidth={1.8} />, title: "Repayment schedule (if any)", desc: "If you had a plan, even informal, write it down with dates and amounts. Missed payments anchor your timeline." },
    ],
  },

  stateRulesIntro: "Statute of limitations varies (2 to 6 years for oral, 4 to 10 for written). Pre-judgment interest rates differ. Some states require notice before suit. Pick yours for the exact rules.",

  featuredStateSlugs: ["california", "texas", "florida", "new-york", "illinois", "pennsylvania", "ohio", "georgia", "michigan", "north-carolina", "minnesota", "delaware"],

  testimonial: {
    quote: "Got back $5,000 from a friend who stopped answering. Venmo records and texts were all I needed.",
    name: "Anna L.",
    role: "Lender · Illinois",
  },

  audienceLabel: "lenders",

  faqs: [
    { q: "Can I sue someone who owes me money?", a: "Yes, when the amount fits your state’s cap (usually $5,000 to $20,000). Most informal loans are recoverable: friend loans via Venmo, family loans, oral agreements, IOUs, cash loans, even loans without a written contract under unjust enrichment theory." },
    { q: "Do I need a written contract to sue?", a: "No. Oral contracts are enforceable in most states. Bank records, texts, and witness testimony all establish the agreement. Even without an explicit contract, unjust enrichment and promissory estoppel provide alternative theories." },
    { q: "How long do I have to sue?", a: "Written contracts (IOUs): 4 to 6 years in most states (some up to 10). Oral contracts: 2 to 4 years. Unjust enrichment: 3 to 4 years. Statute usually starts on the agreed repayment date or first demand. Move fast." },
    { q: "What if the borrower says it was a gift?", a: "Bring the texts. The borrower’s own words about ‘pay back’ or ‘loan’ in any text or platform-note (Venmo memo) overcome the gift defense decisively. Friends and family rarely send ‘pay back’ messages for actual gifts." },
    { q: "Can I charge interest?", a: "Yes if agreed in advance. Without agreement, you can claim pre-judgment interest at the state legal rate (7 to 10 percent per year typical). Higher contractual interest may be limited by state usury laws." },
  ],

  schemaFaqIndices: [0, 1, 2],

  disclaimerNote: "Statutes of limitations, the Statute of Frauds, and pre-judgment interest rates vary by state. Verify deadlines and citations against your state’s official source before filing.",
};
