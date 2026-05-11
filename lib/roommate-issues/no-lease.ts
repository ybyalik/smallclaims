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
    leadStrong: "Yes. The law recognizes unwritten agreements built from how you actually lived together.",
    leadBody:
      " You don't need a written agreement to sue. The law looks at three things: an unwritten (or 'implied') agreement based on your living arrangement, a pattern of past payments that shows what you agreed to, and the basic fairness rule that someone can't keep a benefit without paying for it. Texts about rent splits, Venmo/Zelle records of past payments, and witness testimony all establish the agreement. The proof is harder than written-lease cases but the recovery is the same.",
  },

  counter: {
    amount: 3800,
    meta: "Unwritten agreement shown by payment pattern",
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
      { num: "01", title: "Pattern of past payments", body: "Most useful evidence. Months of consistent Venmo/Zelle payments at the same amount show the agreed split. The pattern tells the court what each person agreed to pay." },
      { num: "02", title: "Texts about rent or expenses", body: "Even casual texts ('your half of rent' or 'sending you my $X') establish the agreement. The roommate's own words about amounts and timing are decisive." },
      { num: "03", title: "Witness testimony", body: "Visitors, family, other roommates who heard the agreement or saw the payment pattern. Statements at the hearing or written declarations are admissible." },
      { num: "04", title: "Bank/credit-card records of shared expenses", body: "If you paid bills, rent, or supplies and the roommate Venmo'd you regular amounts, the matching pattern establishes the agreement. Multiple months of consistent transfers = strong evidence." },
    ],
    note: { strongIntro: "A consistent payment pattern is powerful evidence.", rest: " 12 months of $1,200 Venmo from the roommate on the 1st of each month establishes a $1,200 monthly obligation. When they stop paying, the case becomes a clean breach of an unwritten agreement. The pattern itself proves the agreement." },
  },

  claim: {
    h2: { pre: "How much can you ", em: "recover", post: "?" },
    lede: "Whatever was reasonably owed under the unwritten agreement plus interest plus filing fees.",
    layers: [
      { tag: "Layer 1", title: "Unpaid share under the unwritten agreement", body: "Calculate based on the payment pattern. If they paid $1,200/month for 12 months, then stopped, owed amount is $1,200 × months unpaid.", amount: "$3,400" },
      { tag: "Layer 2", title: "Interest before the case is decided", body: "State legal rate (7 to 10 percent per year) running from each missed payment date.", amount: "+ $200", accent: true },
      { tag: "Layer 3", title: "Filing fees, interest after judgment", body: "Filing fee, service-of-process cost, interest that keeps running until they pay.", amount: "+ $200" },
    ],
    total: { label: "Sample total within small-claims cap", body: "Multiple months of unpaid share under the unwritten agreement plus interest, plus filing fee.", amount: "$3,800", sublabel: "illustrative · varies by amount and term" },
  },

  demand: {
    h2: { pre: "Send a ", em: "demand letter", post: " first." },
    lede: "Demand letters work especially well for no-lease cases because the documentation comes from the roommate's own payment history.",
    checklist: ["Past Venmo/Zelle records showing the payment pattern", "Texts about the agreement", "Witness contact info", "Bank records of shared expenses", "A 14-day deadline", "Sent certified mail"],
    letter: {
      certifiedNum: "7019 0140 0001 4827 3623",
      date: "May 5, 2026",
      recipientName: "Jordan Roommate",
      recipientAddress: "1424 Maple Lane, Phoenix, AZ 85003",
      reLine: "Demand for Unpaid Roommate Share Under Our Unwritten Agreement",
      bodyParagraphs: [
        "We've shared the apartment at 5500 Industrial Way since 09/01/2024 without a written lease or roommate agreement. From 09/2024 to 12/2025 (16 months), you Venmo'd me $1,200 on the 1st of each month for your share of rent (records attached). From 01/2026 through April 2026, you paid no rent. Your unpaid share for those 4 months is $4,800; combined with $400 in unpaid utilities, total owed is $3,400 net (after offsetting $1,800 you paid in late February).",
        "I demand within <strong>fourteen (14) days</strong>:",
      ],
      demandList: [
        "Reimbursement of <strong>$3,400</strong> in unpaid share under our unwritten agreement;",
        "Interest at 10 percent per year (<strong>$200</strong>).",
      ],
      closingLine: "Total demand: <strong>$3,600.00</strong>. If unresolved, I will file in Small Claims Court.",
      signatory: "Reese Q. Tenant",
    },
  },

  fileSteps: {
    h2: { pre: "How to ", em: "file", post: " a no-lease case." },
    lede: "Four steps. Stitching together the unwritten-agreement evidence is the case.",
    steps: [
      { title: "Gather payment history", body: "Export Venmo/Zelle history showing months of consistent payments. Bank records showing your full rent payments. Texts about money. Witness statements. The payment pattern is the foundation." },
      { title: "Document the breach", body: "Date the roommate stopped paying. Months covered by you alone. Total shortfall. The math is what the court needs." },
      { title: "Send certified-mail demand", body: "Most roommates pay or set up payment plans at this stage." },
      { title: "Hearing", body: "Lead with the Venmo history showing the pattern. Then the bank record showing you paid full rent. Hearings usually run 10 to 15 minutes." },
    ],
    aftermath: { tag: "After you win", title: "Collecting from a roommate.", bodyHtml: "If they don't pay, you collect using a <strong>judgment lien</strong> (claim on their property), <strong>bank levy</strong> (taking money from their account), or <strong>writ of execution</strong> (court order to seize assets). Wage garnishment is also available." },
  },

  evidence: {
    h2: { pre: "What evidence do you need ", em: "without a lease", post: "?" },
    lede: "Course of dealing + texts + bank records establish the agreement.",
    cells: [
      { kind: "letter", tag: "Payment pattern record", letterhead: "Reese Tenant · Roommate payment log", date: "September 2024 - December 2025", recipientName: "Court records", reLine: "16 months of Venmo from Jordan", bodyParagraphs: [
        "09/01/2024: Jordan Venmo'd $1,200 (note: 'rent share').",
        "10/01/2024: $1,200 (note: 'rent').",
        "Continued monthly through 12/2025: 16 consecutive months of $1,200 each.",
        "Then: 01/2026 - 04/2026: $0 each month.",
      ], signatory: "Reese Tenant", signatoryTitle: "Tracker since 09/01/2024" },
      { kind: "texts", tag: "Unwritten agreement", texts: [
        { dir: "in", text: "Sending your half of rent for September." },
        { dir: "out", text: "Got it, $1,200. Same as last month." },
        { dir: "in", text: "Yeah, same every month." },
      ] },
      { kind: "handbook", tag: "Unwritten agreements are still binding", documentTitle: "Restatement (Second) of Contracts · § 4", sectionTitle: "Agreements shown by conduct", bodyParagraphs: [
        "An agreement can be inferred from how people act. When their conduct shows they both agreed to something, the law treats it as a contract with the same force as a written one.",
      ], highlight: "16 months of consistent $1,200 monthly payments shows both sides agreed to a $1,200 monthly obligation.", footer: "Same legal force as a written contract" },
      { kind: "receipt", tag: "Venmo history (export)", vendor: "VENMO PLATFORM", vendorAddr: "Transaction history", receiptNum: "Account history", date: "Sep 2024 - Dec 2025", lineItems: [
        { label: "16 monthly payments at $1,200 from Jordan", amount: "$19,200" },
        { label: "Standard payment date: 1st of month", amount: "—" },
        { label: "Standard memo: 'rent share' or similar", amount: "—" },
      ], subtotal: "$19,200", total: "$19,200", footer: "16-month consistent payment pattern" },
    ],
  },

  defenses: {
    h2: { pre: "Common roommate ", em: "defenses", post: ", with rebuttals." },
    lede: "Three arguments cover most no-lease cases.",
    items: [
      { quote: "We never agreed to anything. I was just helping out.", pill: "Most common", rebuttal: "<strong>Rebuttal:</strong> 16 months of consistent $1,200 payments is not 'helping out'. The pattern proves the agreement on its own." },
      { quote: "Without a written agreement, you can't sue.", pill: "Need writing", rebuttal: "<strong>Rebuttal:</strong> wrong. Unwritten agreements built from conduct have the same legal force as written ones. The payment pattern, texts, and witness testimony all establish the agreement. State law explicitly recognizes these." },
      { quote: "I'm in financial hardship. I'll pay when I can.", pill: "Hardship", rebuttal: "<strong>Rebuttal:</strong> hardship doesn't erase the debt. The court can enter the judgment now and collection can be worked out later. Many people agree to payment plans rather than aggressive collection." },
    ],
  },

  outcomes: {
    h2: { pre: "How much do tenants ", em: "actually recover", post: "?" },
    lede: "Typical recovery ranges. How strong your payment-pattern evidence is drives outcomes.",
    bands: [
      { label: "Low", range: "$200 to $1,000", body: "<strong>Partial recovery.</strong> Court awards portion when the payment pattern is short or disputed.", tier: "low" },
      { label: "Mid", range: "$1,000 to $5,000", body: "<strong>Multi-month unpaid share + interest.</strong> Most common with clean documentation.", tier: "mid" },
      { label: "High", range: "$5,000 to $20,000+", body: "<strong>Up to the small-claims cap.</strong> Multiple months at higher amounts push toward the cap.", tier: "high" },
    ],
  },

  stateSection: null,

  alternatives: {
    h2: { pre: "What are the ", em: "alternatives", post: " to small claims?" },
    lede: "Demand letter is usually the lowest-friction path.",
    cards: [
      { title: "Demand letter alone", pillLabel: "Free, evidence-generating", pillTier: "primary", whenItFits: "documented payment pattern. Many roommates pay or counter-offer at this stage.", tradeoff: "no way to enforce it if they ignore you." },
      { title: "Mediation", pillLabel: "Preserve relationships", pillTier: "good", whenItFits: "ongoing roommate situation. Community mediation centers offer services for $50 to $200.", tradeoff: "no enforcement; only effective if roommate participates." },
      { title: "Small claims (this guide)", pillLabel: "Reliable enforced recovery", pillTier: "warn", whenItFits: "demand failed. Damages within state cap.", tradeoff: "30 to 90 day timeline. No-lease cases require stronger documentation than written-lease cases." },
    ],
  },

  cta: {
    h2: { pre: "Recover under the ", em: "unwritten agreement", post: "." },
    body: "Demand letters with payment-pattern documentation produce settlement in most cases.",
    receipt: { label: "example · 4 months unpaid share", items: [
      { label: "Unpaid share (multi-category)", amount: "$3,400" },
      { label: "Pre-judgment interest", amount: "+ $200" },
      { label: "Filing fee", amount: "+ $200" },
    ], total: "$3,800", totalLabel: "Total claim", note: "Illustrative. Long no-lease relationships often have substantial accumulated shares." },
  },

  faqs: [
    { q: "Can I sue my roommate without a written lease or agreement?", a: "Yes. Unwritten agreements built from how you actually lived together have the same legal force as written ones. Months of consistent Venmo payments establish the agreement. Texts about money and witness testimony also help. The proof is harder but the recovery is the same." },
    { q: "What counts as a 'payment pattern'?", a: "A consistent pattern of behavior between you and the roommate, even without a formal written agreement. 16 months of consistent $1,200 monthly Venmo payments establishes a $1,200 monthly obligation. When the pattern breaks, the breach is clear." },
    { q: "What if there's no Venmo or other digital record?", a: "Texts about money, witness testimony, bank records of shared expenses combined with the cash payment history. Less clean than digital records but still recoverable. Witness testimony from third parties who saw payments helps." },
    { q: "Should I get a written agreement now (after the dispute)?", a: "Useful even after the dispute. You can ask the roommate to acknowledge in writing what they owe. Many will sign (especially if you offer a payment plan). The written acknowledgment converts a hard unwritten-agreement case into a clean acknowledged-debt case." },
    { q: "What if my roommate denies they ever paid me?", a: "Bank/Venmo records are decisive. Their own platform history shows the payments. Denials fail when the documents show otherwise." },
    { q: "How long do I have to sue?", a: "The deadline (the 'statute of limitations') for unwritten agreements is 2 to 4 years from each unpaid month. Each unpaid month is its own breach with its own clock." },
    { q: "Can I include this with other roommate claims?", a: "Yes. One small-claims case can include unpaid rent + unpaid bills + property damage + deposit. Combine them to avoid multiple court appearances." },
  ],

  relatedSlugs: ["unpaid-rent", "unpaid-bills", "moving-out-no-notice", "property-damage-or-theft", "security-deposit", "emotional-distress"],
};
