import type { RoommateIssue } from "./types";

export const unpaidBills: RoommateIssue = {
  slug: "unpaid-bills",
  claimType: "quasi_contract",
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
    leadStrong: "Yes. Shared utilities and bills work the same way as rent contribution claims.",
    leadBody:
      " Utilities, internet, streaming services, household supplies, anything you split with a roommate. When you paid the full bill and the roommate didn't reimburse their share, you can sue them for it. Bank record + utility bill + roommate agreement (or a pattern of past payments showing the split) are the case. Most cases fit easily within state small-claims caps.",
  },

  counter: {
    amount: 1800,
    meta: "Their share of bills you covered",
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
      { num: "01", title: "Utilities (electric, gas, water)", body: "Most common. The bill is in your name. You paid the full amount. The roommate's share is recoverable." },
      { num: "02", title: "Internet, cable, streaming", body: "Same framework. Bank record showing you paid the full bill plus agreement to split (text or course of dealing) = case." },
      { num: "03", title: "Shared supplies and household items", body: "Toilet paper, laundry detergent, kitchen supplies. Smaller amounts but accumulate over a year. Receipts plus agreement to share establish recovery." },
      { num: "04", title: "Repairs to apartment (security deposits)", body: "If you paid for repairs the roommate caused, that's recoverable. Tenant security-deposit deductions for the roommate's damage are also recoverable from them." },
    ],
    note: { strongIntro: "Past payment patterns matter.", rest: " If you've been paying utilities for 6 months and the roommate Venmo'd you 50 percent each month, that establishes the agreement even without explicit terms. The court can use past payment patterns to figure out what you both agreed to." },
  },

  claim: {
    h2: { pre: "How much can you ", em: "recover", post: "?" },
    lede: "Their unpaid share plus interest plus filing fees.",
    layers: [
      { tag: "Layer 1", title: "Roommate's unpaid share", body: "Bank record plus utility bills. Calculate roommate's share for each month they didn't pay.", amount: "$1,400" },
      { tag: "Layer 2", title: "Interest before the case is decided", body: "State legal rate (7 to 10 percent per year) running from the date you paid each bill.", amount: "+ $200", accent: true },
      { tag: "Layer 3", title: "Filing fees, interest after judgment", body: "Filing fee, service-of-process cost, interest that keeps running until they pay.", amount: "+ $200" },
    ],
    total: { label: "Sample total within small-claims cap", body: "6 months of unpaid utility share plus interest, plus filing fee.", amount: "$1,800", sublabel: "illustrative · varies by bills and term" },
  },
  whatToProve: {
    h2: { pre: "What you need to ", em: "prove", post: " when a roommate didn't pay shared bills." },
    lede: "Shared-bill cases work like unjust-enrichment claims when there's no written agreement.",
    elements: [
      { title: "The bills were shared expenses", body: "Utility bills, internet, streaming subscriptions, or groceries that benefited both of you. Itemize and date each." },
      { title: "You paid the full amount", body: "Bank records, cancelled checks, or payment-app receipts. Bills paid in your name only, but with their benefit." },
      { title: "There was an agreement (or expectation) to split", body: "Texts referencing splitting, prior payment patterns, or roommate agreement language. Without this, you're relying on the obvious benefit they received." },
      { title: "They've refused to pay their share", body: "Texts asking for their half, their excuses or refusal, and any partial payments." },
    ],
  },

  demand: {
    h2: { pre: "Send a ", em: "demand letter", post: " first." },
    lede: "Demand letters work especially well for shared bills because the documentation is clean.",
    checklist: ["Bank/credit-card records", "Utility bills with full amounts", "Venmo records of partial payments", "Texts about the split", "Interest calculation", "A 14-day deadline", "Sent certified mail"],
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
        "Interest at 10 percent per year (<strong>$200</strong>).",
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
    aftermath: { tag: "After you win", title: "Collecting from a roommate.", bodyHtml: "If they don't pay, you collect using a <strong>judgment lien</strong> (claim on their property), <strong>bank levy</strong> (taking money from their account), or <strong>writ of execution</strong> (court order to seize assets). Wage garnishment is also available." },
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
      { kind: "handbook", tag: "Past payment pattern", documentTitle: "UCC § 1-303", sectionTitle: "Past payment patterns count as evidence", bodyParagraphs: [
        "A pattern of past conduct between two people gives fair notice of what their agreement actually means. The court can use it to figure out what each side intended.",
      ], highlight: "Roommates split bills 50/50 from 09/2024 to 10/2025 (12 months). Pattern established.", footer: "Used to interpret all kinds of contracts" },
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
      { quote: "I paid you in cash.", pill: "Most common", rebuttal: "<strong>Rebuttal:</strong> ask for the cash record. Cash defenses usually fail because there's no paper trail; the roommate has to prove it. Without records, the defense fails." },
      { quote: "Bills were too high. I shouldn't pay 50 percent.", pill: "Bill amount", rebuttal: "<strong>Rebuttal:</strong> the agreement was 50/50. Bill amount disputes don't change the percentage owed. If they wanted to negotiate the split, they should have raised it at the time." },
      { quote: "I never agreed to pay for streaming services.", pill: "Specific bills", rebuttal: "<strong>Rebuttal:</strong> if streaming was part of the split agreement, bring the texts. The pattern of past payments (months of paying half) also shows it was included." },
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
      { title: "Demand letter alone", pillLabel: "Free, effective", pillTier: "primary", whenItFits: "documented split. Most roommates pay at demand stage.", tradeoff: "no way to enforce it if they ignore you." },
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
    { q: "Can I sue my roommate for utilities they didn't pay?", a: "Yes. If you paid the full bill and they didn't reimburse their share, you can sue them for their share. Bank records + bill copies + agreement to split = case." },
    { q: "What if we never had a written agreement on the split?", a: "Texts confirming the split, or a pattern of past payments showing consistent splits, establish the agreement. When both names are on the bill, the default rule is that each of you is fully responsible." },
    { q: "What about household supplies (toilet paper, etc.)?", a: "Recoverable but harder due to small amounts and informal nature. Itemized receipts plus texts about who buys what establish the agreement. Most courts award if documentation is solid." },
    { q: "Should I include this in a roommate-rent case?", a: "Yes if both are pending. One small-claims case can include unpaid rent + unpaid bills + property damage. Combine to avoid multiple court appearances." },
    { q: "How long do I have to sue?", a: "The deadline (the 'statute of limitations') is 2 to 4 years for oral or unwritten agreements. Each unpaid bill is its own claim with its own clock." },
    { q: "What if my name wasn't on the utility bill?", a: "Doesn't matter. The claim is between roommates, not with the utility. Your bank record showing payment plus the agreement to share is enough, regardless of whose name is on the account." },
    { q: "What if the roommate disputes the bills were too high?", a: "The agreement controls the split, not the bill amount. If they thought bills were excessive, they should have raised it at the time. After-the-fact disputes about bill amounts rarely succeed." },
  ],

  relatedSlugs: ["unpaid-rent", "moving-out-no-notice", "property-damage-or-theft", "security-deposit", "no-lease", "emotional-distress"],
};
