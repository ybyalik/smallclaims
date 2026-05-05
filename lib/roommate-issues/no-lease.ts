import type { RoommateIssue } from "./types";

export const noLease: RoommateIssue = {
  slug: "no-lease",
  ready: true,
  short: "Roommate no lease",
  breadcrumbLabel: "Roommate No Lease",

  meta: {
    title: "Can I Sue My Roommate Without a Written Lease or Agreement?",
    description: "Plain-English guide to recovering from a roommate when there's no written lease or agreement. Implied contracts, course of dealing, and a demand-letter template.",
  },

  hero: {
    eyebrowSuffix: "No written lease",
    h1: { pre: "Can I sue my roommate ", em: "without a lease", post: "?" },
    leadStrong: "Yes. Implied contracts and course of dealing both apply.",
    leadBody:
      " You don't need a written roommate agreement to sue. The legal framework: implied contract from your living arrangement, course of dealing from past payments, and unjust enrichment for benefits the roommate received. Texts about rent splits, Venmo/Zelle records of past payments, and witness testimony all establish the agreement. The proof is harder than written-lease cases but the recovery is the same.",
  },

  counter: {
    amount: 3800,
    meta: "Implied contract / course of dealing",
    rows: [
      { label: "Unpaid share (multiple categories)", value: "$3,400" },
      { label: "Pre-judgment interest", value: "+ $200", emphasis: "accent" },
      { label: "Filing fee", value: "$200", emphasis: "muted" },
    ],
    footer: "Sample · within most state small-claims caps",
  },

  whatCounts: {
    h2: { pre: "How do you ", em: "prove a roommate agreement", post: " without writing?" },
    lede: "Four kinds of evidence work even without a written lease or roommate agreement.",
    cards: [
      { num: "01", title: "Course of dealing (past payments)", body: "Most useful evidence. Months of consistent Venmo/Zelle payments at the same amount establish the split. The pattern tells the court what each person agreed to pay." },
      { num: "02", title: "Texts about rent or expenses", body: "Even casual texts ('your half of rent' or 'sending you my $X') establish the agreement. The roommate's own words about amounts and timing are decisive." },
      { num: "03", title: "Witness testimony", body: "Visitors, family, other roommates who heard the agreement or saw the payment pattern. Statements at the hearing or written declarations are admissible." },
      { num: "04", title: "Bank/credit-card records of shared expenses", body: "If you paid bills, rent, or supplies and the roommate Venmo'd you regular amounts, the matching pattern establishes the agreement. Multiple months of consistent transfers = strong evidence." },
    ],
    note: { strongIntro: "Course of dealing is powerful.", rest: " 12 months of $1,200 Venmo from the roommate on the 1st of each month establishes a $1,200 monthly obligation. When they stop paying, the case becomes a clean breach of implied contract. The pattern itself proves the agreement." },
  },

  claim: {
    h2: { pre: "How much can you ", em: "recover", post: "?" },
    lede: "Whatever was reasonably owed under the implied agreement plus interest plus filing fees.",
    layers: [
      { tag: "Layer 1", title: "Unpaid share under implied agreement", body: "Calculate based on course of dealing. If they paid $1,200/month for 12 months, then stopped, owed amount is $1,200 × months unpaid.", amount: "$3,400" },
      { tag: "Layer 2", title: "Pre-judgment interest", body: "State legal rate (7 to 10 percent per year) running from each missed payment date.", amount: "+ $200", accent: true },
      { tag: "Layer 3", title: "Filing fees, post-judgment interest", body: "Filing fee, service-of-process cost, post-judgment interest until paid.", amount: "+ $200" },
    ],
    total: { label: "Sample total within small-claims cap", body: "Multiple months of unpaid share under implied agreement plus interest, plus filing fee.", amount: "$3,800", sublabel: "illustrative · varies by amount and term" },
  },

  demand: {
    h2: { pre: "Send a ", em: "demand letter", post: " first." },
    lede: "Demand letters work especially well for no-lease cases because the documentation comes from the roommate's own payment history.",
    checklist: ["Past Venmo/Zelle records (course of dealing)", "Texts about the agreement", "Witness contact info", "Bank records of shared expenses", "A 14-day deadline", "Sent certified mail"],
    letter: {
      certifiedNum: "7019 0140 0001 4827 3623",
      date: "May 5, 2026",
      recipientName: "Jordan Roommate",
      recipientAddress: "1424 Maple Lane, Phoenix, AZ 85003",
      reLine: "Demand for Unpaid Roommate Share Under Implied Agreement",
      bodyParagraphs: [
        "We've shared the apartment at 5500 Industrial Way since 09/01/2024 without a written lease or roommate agreement. From 09/2024 to 12/2025 (16 months), you Venmo'd me $1,200 on the 1st of each month for your share of rent (records attached). From 01/2026 through April 2026, you paid no rent. Your unpaid share for those 4 months is $4,800; combined with $400 in unpaid utilities, total owed is $3,400 net (after offsetting $1,800 you paid in late February).",
        "I demand within <strong>fourteen (14) days</strong>:",
      ],
      demandList: [
        "Reimbursement of <strong>$3,400</strong> in unpaid share under our implied agreement;",
        "Pre-judgment interest at 10 percent per year (<strong>$200</strong>).",
      ],
      closingLine: "Total demand: <strong>$3,600.00</strong>. If unresolved, I will file in Small Claims Court.",
      signatory: "Reese Q. Tenant",
    },
  },

  fileSteps: {
    h2: { pre: "How to ", em: "file", post: " a no-lease case." },
    lede: "Four steps. Stitching together the implied-contract evidence is the case.",
    steps: [
      { title: "Gather payment history", body: "Export Venmo/Zelle history showing months of consistent payments. Bank records showing your full rent payments. Texts about money. Witness statements. Course of dealing is the foundation." },
      { title: "Document the breach", body: "Date the roommate stopped paying. Months covered by you alone. Total shortfall. The math is what the court needs." },
      { title: "Send certified-mail demand", body: "Most roommates pay or set up payment plans at this stage." },
      { title: "Hearing", body: "Lead with the Venmo history establishing the pattern. Then the bank record showing you paid full rent. Hearings usually run 10 to 15 minutes." },
    ],
    aftermath: { tag: "After you win", title: "Collecting from a roommate.", bodyHtml: "Money judgments enforce via <strong>judgment lien</strong>, <strong>bank levy</strong>, and <strong>writ of execution</strong>. Wage garnishment is also available." },
  },

  evidence: {
    h2: { pre: "What evidence do you need ", em: "without a lease", post: "?" },
    lede: "Course of dealing + texts + bank records establish the agreement.",
    cells: [
      { kind: "letter", tag: "Course of dealing record", letterhead: "Reese Tenant · Roommate payment log", date: "September 2024 - December 2025", recipientName: "Court records", reLine: "16 months of Venmo from Jordan", bodyParagraphs: [
        "09/01/2024: Jordan Venmo'd $1,200 (note: 'rent share').",
        "10/01/2024: $1,200 (note: 'rent').",
        "Continued monthly through 12/2025: 16 consecutive months of $1,200 each.",
        "Then: 01/2026 - 04/2026: $0 each month.",
      ], signatory: "Reese Tenant", signatoryTitle: "Tracker since 09/01/2024" },
      { kind: "texts", tag: "Implied agreement", texts: [
        { dir: "in", text: "Sending your half of rent for September." },
        { dir: "out", text: "Got it, $1,200. Same as last month." },
        { dir: "in", text: "Yeah, same every month." },
      ] },
      { kind: "handbook", tag: "Implied contract doctrine", documentTitle: "Restatement (Second) of Contracts · § 4", sectionTitle: "Implied-in-fact contracts", bodyParagraphs: [
        "A contract may be inferred from a person's conduct. When parties' conduct establishes mutual assent, an implied-in-fact contract arises with all the legal effect of an express contract.",
      ], highlight: "16 months of consistent $1,200 monthly payments establishes mutual assent to a $1,200 monthly obligation.", footer: "Implied-in-fact contract · same legal force as express" },
      { kind: "receipt", tag: "Venmo history (export)", vendor: "VENMO PLATFORM", vendorAddr: "Transaction history", receiptNum: "Account history", date: "Sep 2024 - Dec 2025", lineItems: [
        { label: "16 monthly payments at $1,200 from Jordan", amount: "$19,200" },
        { label: "Standard payment date: 1st of month", amount: "—" },
        { label: "Standard memo: 'rent share' or similar", amount: "—" },
      ], subtotal: "$19,200", total: "$19,200", footer: "16-month consistent course of dealing" },
    ],
  },

  defenses: {
    h2: { pre: "Common roommate ", em: "defenses", post: ", with rebuttals." },
    lede: "Three arguments cover most no-lease cases.",
    items: [
      { quote: "We never agreed to anything. I was just helping out.", pill: "Most common", rebuttal: "<strong>Rebuttal:</strong> 16 months of consistent $1,200 payments is not 'helping out'. Course of dealing establishes the agreement decisively. The pattern is the proof." },
      { quote: "Without a written agreement, you can't sue.", pill: "Need writing", rebuttal: "<strong>Rebuttal:</strong> wrong. Implied-in-fact contracts have the same legal force as express contracts. Course of dealing, texts, and witness testimony all establish the agreement. State law explicitly recognizes implied contracts." },
      { quote: "I'm in financial hardship. I'll pay when I can.", pill: "Hardship", rebuttal: "<strong>Rebuttal:</strong> hardship doesn't extinguish the debt. The judgment can be entered and collection deferred. Many lenders agree to payment plans rather than aggressive collection." },
    ],
  },

  outcomes: {
    h2: { pre: "How much do tenants ", em: "actually recover", post: "?" },
    lede: "Typical recovery ranges. Course-of-dealing strength drives outcomes.",
    bands: [
      { label: "Low", range: "$200 to $1,000", body: "<strong>Partial recovery.</strong> Court awards portion when course of dealing is short or contested.", tier: "low" },
      { label: "Mid", range: "$1,000 to $5,000", body: "<strong>Multi-month unpaid share + interest.</strong> Most common with clean documentation.", tier: "mid" },
      { label: "High", range: "$5,000 to $20,000+", body: "<strong>Cap-of-court awards.</strong> Multiple months at higher amounts push to cap.", tier: "high" },
    ],
  },

  stateSection: null,

  alternatives: {
    h2: { pre: "What are the ", em: "alternatives", post: " to small claims?" },
    lede: "Demand letter is usually the lowest-friction path.",
    cards: [
      { title: "Demand letter alone", pillLabel: "Free, evidence-generating", pillTier: "primary", whenItFits: "documented course of dealing. Many roommates pay or counter-offer at this stage.", tradeoff: "no enforcement if ignored." },
      { title: "Mediation", pillLabel: "Preserve relationships", pillTier: "good", whenItFits: "ongoing roommate situation. Community mediation centers offer services for $50 to $200.", tradeoff: "no enforcement; only effective if roommate participates." },
      { title: "Small claims (this guide)", pillLabel: "Reliable enforced recovery", pillTier: "warn", whenItFits: "demand failed. Damages within state cap.", tradeoff: "30 to 90 day timeline. No-lease cases require stronger documentation than written-lease cases." },
    ],
  },

  cta: {
    h2: { pre: "Recover under the ", em: "implied agreement", post: "." },
    body: "Demand letters with course-of-dealing documentation produce settlement in most cases.",
    receipt: { label: "example · 4 months unpaid implied share", items: [
      { label: "Unpaid share (multi-category)", amount: "$3,400" },
      { label: "Pre-judgment interest", amount: "+ $200" },
      { label: "Filing fee", amount: "+ $200" },
    ], total: "$3,800", totalLabel: "Total claim", note: "Illustrative. Long no-lease relationships often have substantial accumulated shares." },
  },

  faqs: [
    { q: "Can I sue my roommate without a written lease or agreement?", a: "Yes. Implied-in-fact contracts and course of dealing both apply. Months of consistent Venmo payments establish the agreement. Texts about money and witness testimony also establish it. The proof is harder but the recovery is the same." },
    { q: "What is 'course of dealing'?", a: "A pattern of conduct between parties prior to or in absence of an express agreement. 16 months of consistent $1,200 monthly Venmo payments establishes a $1,200 monthly obligation. When the pattern breaks, the breach is clear." },
    { q: "What if there's no Venmo or other digital record?", a: "Texts about money, witness testimony, bank records of shared expenses combined with course of dealing on cash payments. Less clean than digital records but still recoverable. Witness testimony from third parties who saw payments helps." },
    { q: "Should I get a written agreement now (after the dispute)?", a: "Useful even after the dispute. You can ask the roommate to acknowledge in writing what they owe. Many will sign (especially if you offer a payment plan). The acknowledgment converts a hard implied-contract case into a clean acknowledgment-of-debt case." },
    { q: "What if my roommate denies they ever paid me?", a: "Bank/Venmo records are decisive. Their own platform history shows the payments. Withdrawal denial fails when documentary evidence exists." },
    { q: "How long do I have to sue?", a: "Implied contracts: 2 to 4 years from each unpaid month. Course of dealing claims: 3 to 4 years typical. Each unpaid month is its own breach with its own clock." },
    { q: "Can I include this with other roommate claims?", a: "Yes. One small-claims case can include unpaid rent + unpaid bills + property damage + deposit. Combine to avoid multiple court appearances." },
  ],

  relatedSlugs: ["unpaid-rent", "unpaid-bills", "moving-out-no-notice", "property-damage-or-theft", "security-deposit", "emotional-distress"],
};
