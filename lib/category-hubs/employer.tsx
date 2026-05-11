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
    lede: "If your employer owes you wages, a final paycheck, severance, or stolen tips, small claims is the right court. You don't need an attorney. Filing fees are usually under $100, and many wage laws let you ask for 2x or 3x on top as a penalty (called 'liquidated damages').",
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
    { slug: "hostile-work-environment", title: "Hostile work environment (after quitting)", blurb: "You quit because the workplace was so hostile any reasonable person would have (the law calls this 'constructive discharge'). If the hostility was discrimination-based, you'll usually need to file with the EEOC — the federal workplace-discrimination agency — first.", icon: <MessageSquareWarning size={24} strokeWidth={1.7} />, ready: true },
    { slug: "retaliation", title: "Retaliation", blurb: "Fired or demoted for doing something the law protects: reporting harassment, filing a workers' comp claim, taking family/medical leave (FMLA), or whistleblowing. How quickly the firing followed your protected act is usually the whole case.", icon: <AlertOctagon size={24} strokeWidth={1.7} />, ready: true },
    { slug: "unpaid-wages", title: "Unpaid wages", blurb: "Wages your employer owes you, including overtime. Many states let you ask for 2x or 3x on top as a penalty. If you win, the employer usually has to repay your filing fee on top.", icon: <Banknote size={24} strokeWidth={1.7} />, ready: true },
    { slug: "no-w2", title: "No W-2", blurb: "Your employer never sent your W-2. The IRS expects them by January 31. You can also report to the IRS, the state, and recover any out-of-pocket cost from the missing form.", icon: <FileX size={24} strokeWidth={1.7} />, ready: true },
    { slug: "unsafe-working-conditions", title: "Unsafe working conditions", blurb: "Injuries from unsafe conditions usually go through workers' comp instead of court. But if your employer fired you for reporting safety problems to OSHA (the federal workplace-safety agency), that's a retaliation case that fits small claims.", icon: <HardHat size={24} strokeWidth={1.7} />, ready: true },
    { slug: "last-paycheck", title: "Last paycheck withheld", blurb: "Most states set a deadline for the final paycheck — usually the next regular payday or sooner. Many states add 'waiting time' penalties: one day's wages for every day the paycheck is late, up to 30 days.", icon: <CreditCard size={24} strokeWidth={1.7} />, ready: true },
    { slug: "stolen-tips", title: "Stolen tips", blurb: "Federal law says employers cannot keep any of your tips. Sharing tips with managers or owners is illegal. You can recover the tips plus an equal-amount penalty on top, plus attorney fees.", icon: <HandCoins size={24} strokeWidth={1.7} />, ready: true },
  ],

  belongs: {
    h2Em: "employer disputes",
    intro: "Small claims is built for everyday money disputes. Most state caps fall between $5,000 and $20,000. Hearings take 10 to 15 minutes. You do not need a lawyer to use it. Some claims (like federal discrimination) belong in higher courts instead.",
    inItems: [
      { titleBold: "Unpaid wages and overtime.", rest: "Plus a 2x penalty on top under most state and federal wage laws." },
      { titleBold: "Withheld final paycheck.", rest: "Many states add 'waiting time' penalties — one day's wages for every day the paycheck is late." },
      { titleBold: "Stolen tips.", rest: "Federal law says employers cannot keep any of your tips. You can recover the tips plus an equal-amount penalty on top." },
      { titleBold: "Severance promised but not paid.", rest: "If you have it in writing (or the company normally pays it), it's a contract claim." },
      { titleBold: "Unused PTO not paid out.", rest: "Most states require your employer to pay out unused vacation when you leave, no matter why." },
    ],
    outItems: [
      { titleBold: "Federal discrimination claims.", rest: "Title VII, ADEA, and ADA — the federal anti-discrimination laws — require filing a charge with the EEOC first." },
      { titleBold: "Workplace injuries.", rest: "In most states, workers' comp is your only path — you cannot sue your employer directly for an on-the-job injury." },
      { titleBold: "Damages over the cap.", rest: "Lost wages above $20,000 belong in regular civil court. You'll usually want a lawyer who works on contingency (only paid if you win)." },
      { titleBold: "Reinstatement.", rest: "Small claims awards money, not your job back. To get reinstated, you need a labor agency or a higher court." },
    ],
  },

  damages: {
    intro: "The math judges use. A typical wage case stacks four layers on top of the wages you are directly owed.",
    rows: [
      { iconSvg: <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3h12v17l-3-2-3 2-3-2-3 2z" /><path d="M12 8v6M10 9.5c0-.8.7-1.5 1.5-1.5h1c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5h-1c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5h1c.8 0 1.5-.7 1.5-1.5" /></svg>, tag: "Direct damages", body: "Unpaid wages, last paycheck, accrued PTO, owed bonus, stolen tips. The dollar amount you can prove was owed.", amount: "$1,800", barWidthPct: 30, barLabel: "Base amount" },
      { iconSvg: <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 4v17M5 21h14" /><path d="M5 8h14" /><path d="M5 8l-2 5h4z M19 8l-2 5h4z" /><path d="M12 4l-7 4M12 4l7 4" /></svg>, tag: "Penalty on top", body: "Most state and federal wage laws double or triple the unpaid amount when the employer knew they were breaking the law and did it anyway. Called 'liquidated damages.'", amount: "+$1,800", barWidthPct: 62, barLabel: "Multiplier", accent: true },
      { iconSvg: <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><path d="M3 12h18" /></svg>, tag: "Attorney's fees", body: "Most state wage laws make the losing employer pay the winning employee's attorney fees. That pressure alone often gets the employer to settle before court.", amount: "+$300", barWidthPct: 8, barLabel: "Typical recovery" },
      { iconSvg: <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M19 5L5 19" /><circle cx="7.5" cy="7.5" r="2.5" /><circle cx="16.5" cy="16.5" r="2.5" /></svg>, tag: "Interest", body: "4 to 10 percent per year, pre- and post-judgment, depending on the state.", amount: "+$120", barWidthPct: 4, barLabel: "Accruing" },
    ],
    totalNote: "2.2× the unpaid amount",
    totalAmount: "$4,020",
    totalCaption: "Sample math on $1,800 in unpaid wages with a willful violation. Your numbers will differ.",
  },

  evidence: {
    h2Em: "sue your employer",
    intro: "Employment cases are won on paperwork. Anything you can't show in writing, you're asking the judge to just take your word for — and they usually won't. Your employer (with an HR team and a payroll vendor) has more documentation than you do. Your job is to close that gap before you walk into court.",
    items: [
      { iconSvg: <FileText size={16} strokeWidth={1.8} />, title: "Offer letter and contract", desc: "Your signed offer, plus any amendments. Severance, bonus structure, and termination clauses all live here." },
      { iconSvg: <Banknote size={16} strokeWidth={1.8} />, title: "Every paystub and W-2", desc: "Your hourly rate, regular hours, overtime, and PTO accrual. The wage math starts here." },
      { iconSvg: <MessageSquare size={16} strokeWidth={1.8} />, title: "All HR communications", desc: "Termination email or letter, write-ups, performance reviews, and any text or message about why you were let go." },
      { iconSvg: <Clock size={16} strokeWidth={1.8} />, title: "Time records", desc: "Punch records, schedule screenshots, or your own log kept at the time. Critical for unpaid-overtime cases." },
      { iconSvg: <BookOpen size={16} strokeWidth={1.8} />, title: "Employee handbook", desc: "Step-by-step discipline procedures (warnings before firing), severance schedules, and PTO payout rules. If your employer broke its own policy, that's a contract claim." },
      { iconSvg: <Users size={16} strokeWidth={1.8} />, title: "Witness contact info", desc: "Coworkers who heard the comments, saw the conditions, or know what really happened. A short signed statement from them helps." },
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
    { q: "Can you sue your employer while you still work there?", a: "Legally, yes. Practically, be careful. Most states have anti-retaliation laws that protect you from being fired or demoted because you sued — but proving the employer retaliated is hard in practice. Many workers wait until they have a new job lined up." },
    { q: "What can you recover from an employer in small claims?", a: "At minimum, your out-of-pocket losses: unpaid wages, last paycheck, severance, stolen tips, unused PTO. Many state wage laws also let you ask for a 2x or 3x penalty on top, plus 'waiting time' penalties for late final paychecks, plus their attorney fees — even though you don't need a lawyer to use small claims yourself." },
  ],

  schemaFaqIndices: [0, 1, 5],

  disclaimerNote: "Employment law varies by state, county, and contract. Verify deadlines and statute citations against your state’s official source before filing.",
};
