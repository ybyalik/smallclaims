import type { RoommateIssue } from "./types";

export const unpaidBills: RoommateIssue = {
  slug: "unpaid-bills",
  ready: true,
  short: "Roommate unpaid bills",
  breadcrumbLabel: "Roommate Unpaid Bills",

  meta: {
    title: "Can I Sue My Roommate for Unpaid Bills and Utilities?",
    description: "Plain-English guide to recovering unpaid utilities, internet, and shared expenses from a roommate. Contribution rights, course of dealing, and a demand-letter template.",
  },

  hero: {
    eyebrowSuffix: "Unpaid bills",
    h1: { pre: "Can I sue my roommate for ", em: "unpaid bills", post: "?" },
    leadStrong: "Yes. Shared utilities and bills work like rent contribution claims.",
    leadBody:
      " Utilities, internet, streaming services, household supplies — anything you split with a roommate. When you paid the full bill and the roommate didn't reimburse their share, you can sue for contribution. Bank record + utility bill + roommate agreement (or course of dealing showing past split) establish the case. Most cases fit easily within state small-claims caps.",
  },

  counter: {
    amount: 1800,
    meta: "Contribution / breach of roommate agreement",
    rows: [
      { label: "Unpaid utility shares (6 months)", value: "$1,400" },
      { label: "Pre-judgment interest", value: "+ $200", emphasis: "accent" },
      { label: "Filing fee", value: "$200", emphasis: "muted" },
    ],
    footer: "Sample · within most state small-claims caps",
  },

  whatCounts: {
    h2: { pre: "What ", em: "shared bills", post: " can you sue for?" },
    lede: "Four common patterns.",
    cards: [
      { num: "01", title: "Utilities (electric, gas, water)", body: "Most common. The bill is in your name. You paid the full amount. The roommate's share is recoverable under contribution." },
      { num: "02", title: "Internet, cable, streaming", body: "Same framework. Bank record showing you paid the full bill plus agreement to split (text or course of dealing) = case." },
      { num: "03", title: "Shared supplies and household items", body: "Toilet paper, laundry detergent, kitchen supplies. Smaller amounts but accumulate over a year. Receipts plus agreement to share establish recovery." },
      { num: "04", title: "Repairs to apartment (security deposits)", body: "If you paid for repairs the roommate caused, that's recoverable. Tenant security-deposit deductions for the roommate's damage are also recoverable from them." },
    ],
    note: { strongIntro: "Course of dealing matters.", rest: " If you've been paying utilities for 6 months and the roommate Venmo'd you 50 percent each month, that establishes the agreement even without explicit terms. Past payment patterns are admissible to establish the agreement." },
  },

  claim: {
    h2: { pre: "How much can you ", em: "recover", post: "?" },
    lede: "Their unpaid share plus pre-judgment interest plus filing fees.",
    layers: [
      { tag: "Layer 1", title: "Roommate's unpaid share", body: "Bank record plus utility bills. Calculate roommate's share for each month they didn't pay.", amount: "$1,400" },
      { tag: "Layer 2", title: "Pre-judgment interest", body: "State legal rate (7 to 10 percent per year) running from the date you paid each bill.", amount: "+ $200", accent: true },
      { tag: "Layer 3", title: "Filing fees, post-judgment interest", body: "Filing fee, service-of-process cost, post-judgment interest until paid.", amount: "+ $200" },
    ],
    total: { label: "Sample total within small-claims cap", body: "6 months of unpaid utility share plus interest, plus filing fee.", amount: "$1,800", sublabel: "illustrative · varies by bills and term" },
  },

  demand: {
    h2: { pre: "Send a ", em: "demand letter", post: " first." },
    lede: "Demand letters work especially well for shared bills because the documentation is clean.",
    checklist: ["Bank/credit-card records", "Utility bills with full amounts", "Venmo records of partial payments", "Texts about the split", "Pre-judgment interest calculation", "A 14-day deadline", "Sent certified mail"],
    letter: {
      certifiedNum: "7019 0140 0001 4827 3619",
      date: "May 5, 2026",
      recipientName: "Jordan Roommate",
      recipientAddress: "1424 Maple Lane, Phoenix, AZ 85003",
      reLine: "Demand for Unpaid Roommate Utility Shares (Nov 2025 - April 2026)",
      bodyParagraphs: [
        "From November 2025 through April 2026, I paid the full amount of our shared utilities, internet, and household expenses. We agreed to split 50/50 (text 09/14/2024 attached). Your unpaid share for those 6 months totals $1,400 (itemized list attached).",
        "I demand within <strong>fourteen (14) days</strong>:",
      ],
      demandList: [
        "Reimbursement of <strong>$1,400</strong> in your unpaid share;",
        "Pre-judgment interest at 10 percent per year (<strong>$200</strong>).",
      ],
      closingLine: "Total demand: <strong>$1,600.00</strong>. If unresolved, I will file in Small Claims Court.",
      signatory: "Reese Q. Tenant",
    },
  },

  fileSteps: {
    h2: { pre: "How to ", em: "file", post: " an unpaid-bills case." },
    lede: "Four steps. Documentation is straightforward.",
    steps: [
      { title: "Gather bills and bank records", body: "Each utility bill with the full amount and your name. Bank/credit-card statement showing you paid. Venmo records of any partial payments from roommate. Texts about the split." },
      { title: "Itemize the unpaid shares", body: "Spreadsheet by month: bill total, roommate's share, what they paid (if anything), shortfall. Total all shortfalls = your claim amount." },
      { title: "Send certified-mail demand", body: "Most roommates pay at this stage to avoid court appearance." },
      { title: "Hearing", body: "Lead with the spreadsheet, the texts about the split, and the bank records. Hearings usually run 10 to 15 minutes." },
    ],
    aftermath: { tag: "After you win", title: "Collecting from a roommate.", bodyHtml: "Money judgments enforce via <strong>judgment lien</strong>, <strong>bank levy</strong>, and <strong>writ of execution</strong>. Wage garnishment is also available." },
  },

  evidence: {
    h2: { pre: "What evidence do you need to ", em: "sue", post: "?" },
    lede: "Bills, bank records, and split agreement establish the case.",
    cells: [
      { kind: "letter", tag: "Itemized spreadsheet", letterhead: "Reese Tenant · Bills tracker", date: "Nov 2025 - Apr 2026", recipientName: "Court records", reLine: "Unpaid utility shares", bodyParagraphs: [
        "11/2025: Electric $180, Internet $80, Gas $120 = $380 total. 50% = $190 each. Jordan paid $0.",
        "12/2025: Electric $200, Internet $80, Gas $140 = $420 total. 50% = $210 each. Jordan paid $0.",
        "Continued through April 2026. Total Jordan unpaid: $1,400.",
      ], signatory: "Reese Tenant", signatoryTitle: "Tracking since 11/01/2025" },
      { kind: "texts", tag: "Split agreement (texts)", texts: [
        { dir: "in", text: "Hey, can we just do 50/50 on all utilities?" },
        { dir: "out", text: "Yes. I'll pay everything and you Venmo me your half on the 1st." },
        { dir: "in", text: "Sounds good." },
      ] },
      { kind: "handbook", tag: "Course of dealing", documentTitle: "UCC § 1-303", sectionTitle: "Course of dealing", bodyParagraphs: [
        "Course of dealing is a sequence of conduct between parties prior to the agreement giving fair notice as to the meaning of their agreement. Course of dealing is admissible to establish the parties' intent.",
      ], highlight: "Roommates split bills 50/50 from 09/2024 to 10/2025 (12 months). Course of dealing established.", footer: "UCC course-of-dealing analog applied to non-UCC contracts" },
      { kind: "receipt", tag: "Bank record · bills paid", vendor: "WELLS FARGO", vendorAddr: "Account 1234", receiptNum: "Statements", date: "Nov 2025 - Apr 2026", lineItems: [
        { label: "All utility bills paid in full by Reese", amount: "$2,800" },
        { label: "Jordan's share (50%)", amount: "$1,400" },
        { label: "Jordan paid via Venmo", amount: "$0" },
      ], subtotal: "$1,400.00", total: "$1,400.00", footer: "Net owed by Jordan" },
    ],
  },

  defenses: {
    h2: { pre: "Common roommate ", em: "defenses", post: ", with rebuttals." },
    lede: "Three arguments cover most cases.",
    items: [
      { quote: "I paid you in cash.", pill: "Most common", rebuttal: "<strong>Rebuttal:</strong> ask for the cash record. Most cash defenses fail because cash payments leave no paper trail; the burden is on the roommate to prove. Without records, the defense fails." },
      { quote: "Bills were too high. I shouldn't pay 50 percent.", pill: "Bill amount", rebuttal: "<strong>Rebuttal:</strong> the agreement was 50/50. Bill amount disputes don't change the percentage owed. If they wanted to negotiate the split, they should have raised it at the time." },
      { quote: "I never agreed to pay for streaming services.", pill: "Specific bills", rebuttal: "<strong>Rebuttal:</strong> if streaming was part of the split agreement, bring the texts. Course of dealing (months of paying half) also establishes inclusion." },
    ],
  },

  outcomes: {
    h2: { pre: "How much do tenants ", em: "actually recover", post: "?" },
    lede: "Typical recovery ranges.",
    bands: [
      { label: "Low", range: "$100 to $500", body: "<strong>Partial recovery.</strong> Court awards portion when documentation is light.", tier: "low" },
      { label: "Mid", range: "$500 to $2,500", body: "<strong>Full unpaid share + interest.</strong> Most common with clean documentation.", tier: "mid" },
      { label: "High", range: "$2,500 to $10,000+", body: "<strong>Multi-month or large bills.</strong> Cumulative cases over multi-month periods push higher.", tier: "high" },
    ],
  },

  stateSection: null,

  alternatives: {
    h2: { pre: "What are the ", em: "alternatives", post: " to small claims?" },
    lede: "Demand letter is usually the lowest-friction path.",
    cards: [
      { title: "Demand letter alone", pillLabel: "Free, effective", pillTier: "primary", whenItFits: "documented split. Most roommates pay at demand stage.", tradeoff: "no enforcement if ignored." },
      { title: "Mediation", pillLabel: "Preserve relationships", pillTier: "good", whenItFits: "ongoing roommate situation. Community mediation centers offer services for $50 to $200.", tradeoff: "no enforcement; only effective if roommate participates." },
      { title: "Small claims (this guide)", pillLabel: "Reliable recovery", pillTier: "warn", whenItFits: "demand failed. Damages within state cap.", tradeoff: "30 to 90 day timeline." },
    ],
  },

  cta: {
    h2: { pre: "Recover the ", em: "unpaid bills", post: "." },
    body: "Demand letters with itemized spreadsheets produce settlement in most cases.",
    receipt: { label: "example · 6 months unpaid utility share", items: [
      { label: "Unpaid utility shares", amount: "$1,400" },
      { label: "Pre-judgment interest", amount: "+ $200" },
      { label: "Filing fee", amount: "+ $200" },
    ], total: "$1,800", totalLabel: "Total claim", note: "Illustrative. Cumulative amounts over longer periods push higher." },
  },

  faqs: [
    { q: "Can I sue my roommate for utilities they didn't pay?", a: "Yes. If you paid the full bill and they didn't reimburse their share, you have a contribution claim. Bank records + bill copies + agreement to split = case." },
    { q: "What if we never had a written agreement on the split?", a: "Texts confirming the split or course of dealing (months of consistent split payments) establish the agreement. Default joint-and-several rules also apply when both names are on the bill." },
    { q: "What about household supplies (toilet paper, etc.)?", a: "Recoverable but harder due to small amounts and informal nature. Itemized receipts plus texts about who buys what establish the agreement. Most courts award if documentation is solid." },
    { q: "Should I include this in a roommate-rent case?", a: "Yes if both are pending. One small-claims case can include unpaid rent + unpaid bills + property damage. Combine to avoid multiple court appearances." },
    { q: "How long do I have to sue?", a: "Oral or implied contract: 2 to 4 years. Course-of-dealing claims: 3 to 4 years typical. Each unpaid bill is its own claim with its own clock." },
    { q: "What if my name wasn't on the utility bill?", a: "Doesn't matter. The contribution claim is between roommates, not with the utility. Your bank record showing payment plus the agreement to share establishes recovery regardless of whose name is on the account." },
    { q: "What if the roommate disputes the bills were too high?", a: "The agreement governs the split, not the bill amount. If they thought bills were excessive, they should have raised it at the time. After-the-fact disputes about bill amounts rarely succeed." },
  ],

  relatedSlugs: ["unpaid-rent", "moving-out-no-notice", "property-damage-or-theft", "security-deposit", "no-lease", "emotional-distress"],
};
