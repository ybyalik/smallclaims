import type { RefundIssue } from "./types";

export const gymMembership: RefundIssue = {
  slug: "gym-membership",
  ready: true,
  short: "Gym membership refund",
  breadcrumbLabel: "Gym Membership",

  meta: { title: "Can I Sue a Gym for Not Canceling My Membership?", description: "Plain-English guide to canceling a gym membership and recovering refunds. State health-club statutes, mandatory cooling-off periods, and a demand-letter template." },

  hero: {
    eyebrowSuffix: "Gym membership",
    h1: { pre: "Can I sue a gym for ", em: "not canceling my membership", post: "?" },
    leadStrong: "Yes. Most states have specific health-club cancellation laws.",
    leadBody: " Health-club cancellation laws (CA Civ. Code § 1812.82, NY Gen. Bus. Law § 624, others) require gyms to provide cancellation procedures and cooling-off periods. When a gym refuses to cancel or continues charging after cancellation, state UDAP and the specific health-club statute both apply with multipliers in many states.",
  },

  counter: { amount: 1200, meta: "State health-club statute + UDAP", rows: [
    { label: "Refund of post-cancellation charges (6 months)", value: "$600" },
    { label: "UDAP multiplier (2x)", value: "+ $400", emphasis: "accent" },
    { label: "Filing fee", value: "$200", emphasis: "muted" },
  ], footer: "Sample · within most state small-claims caps" },

  whatCounts: {
    h2: { pre: "When can you sue a ", em: "gym", post: "?" },
    lede: "Four common patterns. State health-club laws apply broadly.",
    cards: [
      { num: "01", title: "Refused cancellation despite proper notice", body: "You followed the cancellation procedure (letter, in-person visit, online form). Gym continued charging. Most state statutes require recognition of cancellation within 10 days." },
      { num: "02", title: "Cancellation procedure wasn't disclosed", body: "Gym signed you up but never disclosed how to cancel. Many state laws require cancellation procedure disclosed in the contract." },
      { num: "03", title: "Continued charging after cancellation", body: "You canceled but charges continued. Each unauthorized charge is its own UDAP violation. Per-charge penalties in some states." },
      { num: "04", title: "Cooling-off period violation", body: "Most states require 3 to 7 day cooling-off period for new memberships. If you canceled within the period and gym refused, the violation is decisive." },
    ],
    note: { strongIntro: "Read the state health-club statute.", rest: " California Civil Code § 1812.82 et seq, New York General Business Law § 624, Texas Civil Practice & Remedies Code, and others have specific cancellation provisions for health clubs. Most include cooling-off periods, mandatory cancellation procedures, and UDAP-style penalties." },
  },

  claim: {
    h2: { pre: "How much can you ", em: "claim", post: "?" },
    lede: "Refund of post-cancellation charges plus UDAP multiplier.",
    layers: [
      { tag: "Layer 1", title: "Refund of charges after cancellation", body: "Each monthly charge after your proper cancellation. Bank/credit card record establishes amounts.", amount: "$600" },
      { tag: "Layer 2", title: "Statutory damages", body: "State health-club statutes often have specific penalty provisions. UDAP multipliers (2x or 3x) for willful violations.", amount: "+ $400", accent: true },
      { tag: "Layer 3", title: "Filing fees, interest", body: "Filing fee, service-of-process cost, pre-judgment interest.", amount: "+ $200" },
    ],
    total: { label: "Sample total within small-claims cap", body: "Refund of post-cancellation charges plus statutory multiplier, plus filing fee.", amount: "$1,200", sublabel: "illustrative · varies by state" },
  },

  demand: {
    h2: { pre: "Send a ", em: "demand letter", post: " first." },
    lede: "Most gyms back down once a state health-club statute is cited.",
    checklist: ["Gym membership contract", "Cancellation request (date, method, copies)", "Bank/credit card showing post-cancellation charges", "Statute citation", "A 14-day deadline", "Sent certified mail to gym corporate"],
    letter: { certifiedNum: "7019 0140 0001 4827 3634", date: "May 5, 2026", recipientName: "Acme Fitness Inc.", recipientAddress: "1424 Wellness Way, Phoenix, AZ 85003", reLine: "Demand for Refund of Post-Cancellation Charges + Cancellation Confirmation", bodyParagraphs: [
      "On October 14, 2025, I provided written cancellation notice via certified mail (receipt attached). You confirmed receipt 10/16/2025. Despite the cancellation, you have continued charging $100/month from November 2025 through April 2026 — six unauthorized charges totaling $600.",
      "Pursuant to <strong>Arizona Revised Statutes § 13-3717</strong> (health-club statute) and <strong>§ 44-1521</strong> (UDAP), I demand within <strong>fourteen (14) days</strong>:",
    ], demandList: [
      "Refund of <strong>$600</strong> in post-cancellation charges;",
      "UDAP statutory damages of <strong>$400</strong>;",
      "Confirmation of cancellation effective 10/16/2025.",
    ], closingLine: "Total demand: <strong>$1,000.00</strong>. If unresolved, I will file in Small Claims Court and report to the Arizona Attorney General Consumer Protection.", signatory: "Reese Q. Member" },
  },

  fileSteps: {
    h2: { pre: "How to ", em: "file", post: " a gym case." },
    lede: "Four steps. State health-club statute is the spine.",
    steps: [
      { title: "Document cancellation properly", body: "Send certified mail with return receipt. Save copies. Most state statutes require specific cancellation methods (writing, certified mail, sometimes online). Follow the statute exactly." },
      { title: "Track post-cancellation charges", body: "Bank or credit card statements showing each unauthorized charge after cancellation. Each charge is its own UDAP violation." },
      { title: "Send demand letter citing statute", body: "Most gyms settle when state health-club statute is cited." },
      { title: "Hearing", body: "Lead with cancellation receipt, charge records, and statute citation. Hearings 10 to 15 minutes." },
    ],
    aftermath: { tag: "After you win", title: "Collecting from a gym.", bodyHtml: "Most gyms pay quickly to avoid AG complaints and class actions. Money judgments enforce via <strong>judgment lien</strong>, <strong>bank levy</strong>, and <strong>writ of execution</strong>." },
  },

  evidence: {
    h2: { pre: "What evidence do you need ", em: "for a gym case", post: "?" },
    lede: "Cancellation receipt, charge records, and contract are the case.",
    cells: [
      { kind: "letter", tag: "Cancellation letter (certified)", letterhead: "Reese Member", date: "October 14, 2025", recipientName: "Acme Fitness Inc.", reLine: "Cancellation of membership", bodyParagraphs: [
        "I am hereby canceling my Acme Fitness membership effective immediately.",
        "Account: Reese Member, Member ID 4218.",
        "Per Arizona Revised Statutes § 13-3717, this notice satisfies cancellation requirements.",
      ], signatory: "Reese Member", signatoryTitle: "Member" },
      { kind: "texts", tag: "Customer service refused", texts: [
        { dir: "out", text: "I sent cancellation 10/14. Why am I still being charged?" },
        { dir: "in", text: "We need 30 days. November charge stands." },
        { dir: "out", text: "December and January also? You confirmed receipt." },
      ] },
      { kind: "handbook", tag: "Health-club statute", documentTitle: "Arizona Revised Statutes · § 13-3717", sectionTitle: "Health-club cancellation rights", bodyParagraphs: [
        "A consumer who cancels a health-club membership in writing shall be entitled to refund of all paid amounts and termination of all future obligations within 10 days of receipt of notice.",
      ], highlight: "Cancellation effective 10/16/2025 (date of confirmed receipt). Six charges since are unauthorized.", footer: "Arizona statute · health-club cancellation rights" },
      { kind: "receipt", tag: "Bank charges (post-cancellation)", vendor: "WELLS FARGO", vendorAddr: "Account 1234", receiptNum: "Statements", date: "Nov 2025 - Apr 2026", lineItems: [
        { label: "Acme Fitness charge 11/01/2025", amount: "$100" },
        { label: "12/01/2025 charge", amount: "$100" },
        { label: "01/01/2026 charge", amount: "$100" },
        { label: "02/01/2026 charge", amount: "$100" },
        { label: "03/01/2026 charge", amount: "$100" },
        { label: "04/01/2026 charge", amount: "$100" },
      ], subtotal: "$600", total: "$600", footer: "All post-cancellation charges" },
    ],
  },

  defenses: {
    h2: { pre: "Common gym ", em: "defenses", post: ", with rebuttals." },
    lede: "Three arguments cover most cases.",
    items: [
      { quote: "Cancellation requires 30 days notice.", pill: "Most common", rebuttal: "<strong>Rebuttal:</strong> bring state health-club statute. Most require less than 30 days. Standard 30-day notice clauses don't override statute. Contract terms can't waive statutory rights." },
      { quote: "You didn't cancel through proper channel.", pill: "Wrong channel", rebuttal: "<strong>Rebuttal:</strong> certified mail with return receipt is the strongest cancellation method. State statutes typically accept written cancellation regardless of preferred company channel." },
      { quote: "Your contract said no refunds.", pill: "Contract terms", rebuttal: "<strong>Rebuttal:</strong> state health-club statute supersedes contract. Cooling-off and cancellation rights are statutory and cannot be waived." },
    ],
  },

  outcomes: {
    h2: { pre: "How much do members ", em: "actually recover", post: "?" },
    lede: "Most cases recover full amount.",
    bands: [
      { label: "Low", range: "$50 to $300", body: "<strong>Cancellation only.</strong> Court orders refund of post-cancellation charges.", tier: "low" },
      { label: "Mid", range: "$300 to $1,500", body: "<strong>Refund + multiplier.</strong> Most common with state health-club statute.", tier: "mid" },
      { label: "High", range: "$1,500 to $5,000", body: "<strong>Larger pattern with multipliers.</strong>", tier: "high" },
    ],
  },

  stateSection: null,

  alternatives: {
    h2: { pre: "What are the ", em: "alternatives", post: " to small claims?" },
    lede: "Chargeback first; AG complaint; small claims as backup.",
    cards: [
      { title: "Credit card chargeback", pillLabel: "Free, fast", pillTier: "primary", whenItFits: "post-cancellation charges. Each unauthorized charge can be charged back within 60-120 days.", tradeoff: "issuer decides." },
      { title: "State AG consumer protection", pillLabel: "Free, regulatory", pillTier: "good", whenItFits: "systemic violations across multiple members.", tradeoff: "AGs prioritize patterns." },
      { title: "Small claims (this guide)", pillLabel: "When others fail", pillTier: "warn", whenItFits: "demand and chargeback fail. UDAP claim.", tradeoff: "30 to 90 day timeline." },
    ],
  },

  cta: {
    h2: { pre: "End the ", em: "gym charges", post: "." },
    body: "Send cancellation by certified mail. If charges continue, demand letter under state health-club statute.",
    receipt: { label: "example · 6 months unauthorized charges", items: [
      { label: "Refund of post-cancellation charges", amount: "$600" },
      { label: "UDAP multiplier", amount: "+ $400" },
      { label: "Filing fee", amount: "+ $200" },
    ], total: "$1,200", totalLabel: "Total claim", note: "Illustrative. Larger amounts pushing through cap." },
  },

  faqs: [
    { q: "Can I sue a gym for not canceling my membership?", a: "Yes. Most states have specific health-club cancellation statutes (CA Civ. Code § 1812.82, NY Gen. Bus. Law § 624, others) that require gyms to recognize cancellation. Continuing to charge after cancellation is UDAP plus statutory violations." },
    { q: "How do I cancel properly?", a: "Send written cancellation by certified mail with return receipt. Save the receipt. Most state statutes accept this as sufficient regardless of company-preferred channel. Document everything." },
    { q: "What's the cooling-off period?", a: "Most state statutes require a 3 to 7 day cooling-off period for new gym memberships. You can cancel without penalty within that window. Cancellations within cooling-off period are decisive evidence." },
    { q: "Should I just chargeback the charges?", a: "Yes for recent unauthorized charges. Credit card chargebacks within 60-120 days. Use chargebacks for fast resolution; small claims for cumulative cases." },
    { q: "What if my gym is a small business?", a: "State UDAP applies regardless of gym size. Health-club cancellation statutes apply to all gyms. Size doesn't excuse violations." },
    { q: "How long do I have to sue?", a: "State UDAP: 2 to 4 years. Breach of contract: 4 to 6 years. State health-club statute violations: usually 2 to 4 years. Each unauthorized charge is its own claim with its own clock." },
    { q: "What about cancellation fees?", a: "Many state laws limit cancellation fees on health-club memberships (typically capped at small percentages or specific dollar amounts). Excessive cancellation fees may be illegal under state UDAP." },
  ],

  relatedSlugs: ["refund-general", "dry-cleaner", "salon-or-hairdresser", "defective-product", "services-not-rendered"],
};
