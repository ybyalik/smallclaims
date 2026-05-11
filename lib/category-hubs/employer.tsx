import { UserX, AlertTriangle, HeartCrack, MessageSquareWarning, AlertOctagon, Banknote, FileX, HardHat, CreditCard, HandCoins, FileText, MessageSquare, Clock, BookOpen, Users } from "lucide-react";
import type { CategoryHubData } from "./types";

export const EMPLOYER_HUB: CategoryHubData = {
  categorySlug: "employer",
  breadcrumbLabel: "Employer Disputes",
  urlPrefix: "sue-employer-",
  meta: {
    title: "How to Sue Your Employer in Small Claims Court",
    description:
      "Plain-English guide to suing an employer in small claims. Wrongful termination, unpaid wages, retaliation, last paycheck, stolen tips, and 5 more disputes. What you can recover and how to file in your state.",
    ogTitle: "How to Sue Your Employer in Small Claims Court | CivilCase",
    ogDescription:
      "Worker-versus-employer disputes you can take to small claims, what you can recover, and how to file in your state.",
  },
  schemaArticle: {
    headline: "How to Sue Your Employer in Small Claims Court",
    description:
      "Practical guide to suing an employer in small claims for unpaid wages, last paycheck, wrongful termination, retaliation, stolen tips, and other workplace disputes.",
  },

  hero: {
    h1: { pre: "How to ", em: "sue your employer", post: " in small claims court." },
    lede: "If your employer owes you wages, a final paycheck, severance, or stolen tips, small claims is the right court. You do not need an attorney. Filing fees are usually under $100, and many wage laws add 2x or 3x liquidated damages on top of what you are directly owed.",
  },

  issuePhotos: ["1521791136064-7986c2920216", "1554224155-1696413565d3", "1554224154-26032ffc0d07", "1517245386807-bb43f82c33c4", "1450101499163-c8848c66ca85"],

  issuesIntro: {
    h2: { pre: "What can you sue your employer ", em: "for", post: "?" },
    paragraph: "Pick the one that fits your situation. Each guide covers what you can recover, what evidence to bring, and how to file in your state.",
  },

  somethingElseCard: {
    title: "Something else?",
    blurb: "Tell us about your situation in 90 seconds and get a strength read on your case.",
  },

  issues: [
    { slug: "wrongful-termination", title: "Wrongful termination", blurb: "Fired for an illegal reason: discrimination, retaliation, public-policy violation, or breach of contract. Small claims fits when damages are within your state’s cap.", icon: <UserX size={24} strokeWidth={1.7} />, ready: true },
    { slug: "fired-without-warning", title: "Fired without warning", blurb: "Most states are at-will, so warning is not legally required. But if your handbook or contract promised progressive discipline, the broken promise is a contract claim.", icon: <AlertTriangle size={24} strokeWidth={1.7} />, ready: true },
    { slug: "emotional-distress", title: "Emotional distress", blurb: "Pair with another employment claim. Therapy bills, medical records, and lost work make documented emotional-distress damages succeed in small claims.", icon: <HeartCrack size={24} strokeWidth={1.7} />, ready: true },
    { slug: "hostile-work-environment", title: "Hostile work environment (after quitting)", blurb: "Constructive discharge: you quit because the workplace was so hostile that any reasonable person would have. Discrimination-based hostility usually needs an EEOC charge.", icon: <MessageSquareWarning size={24} strokeWidth={1.7} />, ready: true },
    { slug: "retaliation", title: "Retaliation", blurb: "Fired or demoted for protected activity: reporting harassment, filing a workers’ comp claim, requesting FMLA leave, or whistleblowing. Timing is the case.", icon: <AlertOctagon size={24} strokeWidth={1.7} />, ready: true },
    { slug: "unpaid-wages", title: "Unpaid wages", blurb: "Wages your employer owes you, including overtime. Many states add 2x or 3x liquidated damages. Filing fees usually shift to the employer if you win.", icon: <Banknote size={24} strokeWidth={1.7} />, ready: true },
    { slug: "no-w2", title: "No W-2", blurb: "Your employer never sent your W-2. The IRS expects them by January 31. You can also report to the IRS, the state, and recover any out-of-pocket cost from the missing form.", icon: <FileX size={24} strokeWidth={1.7} />, ready: true },
    { slug: "unsafe-working-conditions", title: "Unsafe working conditions", blurb: "Injuries from unsafe conditions usually go through workers’ comp. But if the employer fired you for reporting OSHA issues, that is a retaliation claim that fits small claims.", icon: <HardHat size={24} strokeWidth={1.7} />, ready: true },
    { slug: "last-paycheck", title: "Last paycheck withheld", blurb: "Most states set a deadline for the final paycheck (next regular payday or sooner). Many add ‘waiting time’ penalties of one day’s wages per day late, capped at 30 days.", icon: <CreditCard size={24} strokeWidth={1.7} />, ready: true },
    { slug: "stolen-tips", title: "Stolen tips", blurb: "Federal law prohibits employers from keeping any tips. Tip pooling with managers or owners is illegal. Recover tips plus liquidated damages plus attorney fees.", icon: <HandCoins size={24} strokeWidth={1.7} />, ready: true },
  ],

  belongs: {
    h2Em: "employer disputes",
    intro: "Small claims is built for everyday money disputes. Most state caps fall between $5,000 and $20,000. Hearings take 10 to 15 minutes. You do not need a lawyer to use it. Some claims (like federal discrimination) belong in higher courts instead.",
    inItems: [
      { titleBold: "Unpaid wages and overtime.", rest: "Plus 2x liquidated damages under most state and federal wage laws." },
      { titleBold: "Withheld final paycheck.", rest: "Many states add ‘waiting time’ penalties of one day’s wages per day late." },
      { titleBold: "Stolen tips.", rest: "Federal law prohibits employers from keeping any tip. Recovery often includes 2x liquidated damages." },
      { titleBold: "Severance promised but not paid.", rest: "If it was in writing or by past practice, it is a contract claim." },
      { titleBold: "Accrued PTO not paid out.", rest: "Most states require payout at termination, regardless of why you left." },
    ],
    outItems: [
      { titleBold: "Federal discrimination claims.", rest: "Title VII, ADEA, and ADA require an EEOC charge first." },
      { titleBold: "Workplace injuries.", rest: "Workers’ comp is the exclusive remedy in most states." },
      { titleBold: "Damages over the cap.", rest: "Lost wages above $20,000 belong in regular civil court with a contingency-fee lawyer." },
      { titleBold: "Reinstatement.", rest: "Small claims awards money, not your job back. Reinstatement requires a labor agency or higher court." },
    ],
  },

  damages: {
    intro: "The math judges use. A typical wage case stacks four layers on top of the wages you are directly owed.",
    rows: [
      { iconSvg: <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3h12v17l-3-2-3 2-3-2-3 2z" /><path d="M12 8v6M10 9.5c0-.8.7-1.5 1.5-1.5h1c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5h-1c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5h1c.8 0 1.5-.7 1.5-1.5" /></svg>, tag: "Direct damages", body: "Unpaid wages, last paycheck, accrued PTO, owed bonus, stolen tips. The dollar amount you can prove was owed.", amount: "$1,800", barWidthPct: 30, barLabel: "Base amount" },
      { iconSvg: <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 4v17M5 21h14" /><path d="M5 8h14" /><path d="M5 8l-2 5h4z M19 8l-2 5h4z" /><path d="M12 4l-7 4M12 4l7 4" /></svg>, tag: "Liquidated damages", body: "Most state and federal wage statutes double or triple the unpaid amount when the employer acted willfully.", amount: "+$1,800", barWidthPct: 62, barLabel: "Multiplier", accent: true },
      { iconSvg: <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><path d="M3 12h18" /></svg>, tag: "Attorney’s fees", body: "Most wage statutes shift the loser’s fees to the prevailing employee. That alone pressures early settlement.", amount: "+$300", barWidthPct: 8, barLabel: "Typical recovery" },
      { iconSvg: <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M19 5L5 19" /><circle cx="7.5" cy="7.5" r="2.5" /><circle cx="16.5" cy="16.5" r="2.5" /></svg>, tag: "Interest", body: "4 to 10 percent per year, pre- and post-judgment, depending on the state.", amount: "+$120", barWidthPct: 4, barLabel: "Accruing" },
    ],
    totalNote: "2.2× the unpaid amount",
    totalAmount: "$4,020",
    totalCaption: "Sample math on $1,800 in unpaid wages with a willful violation. Your numbers will differ.",
  },

  evidence: {
    h2Em: "sue your employer",
    intro: "Employment cases are won on documents. Whatever you do not have on paper, the judge takes on your word. An employer with an HR team and a payroll vendor has more paper than you do, so your job is to close that gap.",
    items: [
      { iconSvg: <FileText size={16} strokeWidth={1.8} />, title: "Offer letter and contract", desc: "The signed offer, plus any amendments. Severance terms, bonus structure, and termination clauses live here." },
      { iconSvg: <Banknote size={16} strokeWidth={1.8} />, title: "Every paystub and W-2", desc: "Hourly rate, regular hours, overtime, and PTO accrual. The wage math starts here." },
      { iconSvg: <MessageSquare size={16} strokeWidth={1.8} />, title: "All HR communications", desc: "Termination email or letter, write-ups, performance reviews, and any text or message about why you were let go." },
      { iconSvg: <Clock size={16} strokeWidth={1.8} />, title: "Time records", desc: "Punch records, schedule screenshots, or your own contemporaneous log. Critical for unpaid-overtime cases." },
      { iconSvg: <BookOpen size={16} strokeWidth={1.8} />, title: "Employee handbook", desc: "Progressive discipline policies, severance schedules, and PTO payout rules. If the employer broke its own policy, that is a contract claim." },
      { iconSvg: <Users size={16} strokeWidth={1.8} />, title: "Witness contact info", desc: "Coworkers who heard the comments, saw the conditions, or know what really happened. A short signed declaration helps." },
    ],
  },

  stateRulesIntro: "Wage and termination rules vary state by state. Final-paycheck deadlines, waiting-time penalties, PTO payout, and tip rules are different in every state. Pick yours for the exact statute and form numbers.",

  featuredStateSlugs: ["california", "texas", "florida", "new-york", "illinois", "pennsylvania", "ohio", "georgia", "michigan", "north-carolina", "minnesota", "delaware"],

  testimonial: {
    quote: "Recovered $6,200 in unpaid wages and a doubled penalty. Filed it myself in two weeks.",
    name: "Marcus T.",
    role: "Worker · Texas",
  },

  audienceLabel: "workers",

  faqs: [
    { q: "Can you sue your employer in small claims court?", a: "Yes, when the dispute is mostly about money you are owed (wages, severance, accrued PTO, last paycheck, stolen tips, contract breach) and the amount is within your state’s cap (usually $5,000 to $20,000). Federal discrimination claims usually need an EEOC charge first and damages often outgrow small claims." },
    { q: "How long do you have to sue an employer?", a: "Depends on the legal theory. Wage claims usually run 2 to 4 years (3 years for federal FLSA, longer for willful violations). Breach of contract is typically 3 to 6 years. Federal discrimination claims need an EEOC charge within 180 days (300 days in most states). Public-policy retaliation usually 2 to 3 years." },
    { q: "Do you need a lawyer to sue an employer?", a: "No, not for small claims. In most states attorneys are permitted but not required. In a few states (California, for example) lawyers are not even allowed at the initial small-claims hearing. The format is built for self-represented litigants." },
    { q: "What if your employer ignores your demand letter?", a: "That is the signal to file in small claims. The demand letter creates the paper trail you point to at the hearing, and most judges expect to see one. Read your state’s small-claims guide for the specific filing fee, forms, and service rules." },
    { q: "Can you sue your employer while you still work there?", a: "Legally yes. Practically, be careful. Most states have anti-retaliation laws that protect you if the employer tries to fire or demote you in response to a lawsuit, but those laws are easier to invoke than to enforce. Many workers wait until they have a new job lined up." },
    { q: "What can you recover from an employer in small claims?", a: "At minimum, your out-of-pocket loss: unpaid wages, last paycheck, severance, stolen tips, accrued PTO. Many wage statutes add 2x or 3x liquidated damages, plus ‘waiting time’ penalties for late final paychecks, plus reasonable attorney fees, even though you do not need a lawyer to use small claims." },
  ],

  schemaFaqIndices: [0, 1, 5],

  disclaimerNote: "Employment law varies by state, county, and contract. Verify deadlines and statute citations against your state’s official source before filing.",
};
