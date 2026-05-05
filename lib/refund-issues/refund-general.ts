import type { RefundIssue } from "./types";

export const refundGeneral: RefundIssue = {
  slug: "refund-general",
  ready: true,
  short: "Refund (general)",
  breadcrumbLabel: "Refund",

  meta: { title: "Can I Sue for a Refund? Small Claims Guide", description: "Plain-English guide to recovering refunds from businesses. State consumer-protection laws, when small claims fits, and a demand-letter template." },

  hero: {
    eyebrowSuffix: "Refund",
    h1: { pre: "Can I sue for a ", em: "refund", post: "?" },
    leadStrong: "Yes. State consumer-protection laws cover most refund disputes.",
    leadBody: " When a business refuses a legitimate refund — for defective products, services not rendered, gym memberships not cancelable, or other consumer disputes — state UDAP statutes apply with 2x or 3x multipliers in many states. Most cases settle once a demand letter cites the specific statute. Small claims is the right venue for documented disputes within your state's cap.",
  },

  counter: { amount: 1800, meta: "State UDAP + breach of contract", rows: [
    { label: "Refund of payment", value: "$1,200" },
    { label: "UDAP multiplier (2x)", value: "+ $400", emphasis: "accent" },
    { label: "Filing fee + interest", value: "$200", emphasis: "muted" },
  ], footer: "Sample · within most state small-claims caps" },

  whatCounts: {
    h2: { pre: "When can you sue for a ", em: "refund", post: "?" },
    lede: "Four common scenarios under state UDAP.",
    cards: [
      { num: "01", title: "Defective product", body: "Item doesn't work as advertised. Implied warranty of merchantability + state UDAP both apply. Recovery is refund or replacement value." },
      { num: "02", title: "Services not rendered", body: "Paid for service that wasn't performed (or done badly). Breach of contract + state UDAP. Recovery is refund or cost to redo." },
      { num: "03", title: "Refund refused despite policy", body: "Business advertised return policy and refused. Most state laws hold businesses to advertised refund terms. Refusal triggers UDAP claim." },
      { num: "04", title: "Cancellation refused", body: "Gym membership, subscription, contract that the business refuses to cancel. State-specific membership cancellation statutes often apply." },
    ],
    note: { strongIntro: "Try the business first.", rest: " Email or call customer service. Document the refusal. State the legal theory in your follow-up. Most refund disputes resolve before court when you cite state UDAP and the multiplier." },
  },

  claim: {
    h2: { pre: "How much can you ", em: "claim", post: "?" },
    lede: "Refund plus UDAP multiplier plus filing fees.",
    layers: [
      { tag: "Layer 1", title: "Refund of payment", body: "Original payment. Bank/credit-card record establishes the amount.", amount: "$1,200" },
      { tag: "Layer 2", title: "UDAP multiplier", body: "State UDAP statutes add 2x or 3x for willful violations.", amount: "+ $400", accent: true },
      { tag: "Layer 3", title: "Filing fees, interest", body: "Filing fee, service-of-process cost, pre-judgment interest.", amount: "+ $200" },
    ],
    total: { label: "Sample total within small-claims cap", body: "Refund plus UDAP multiplier plus filing fee.", amount: "$1,800", sublabel: "illustrative · varies by state" },
  },

  demand: {
    h2: { pre: "Send a ", em: "demand letter", post: " first." },
    lede: "Most refund disputes settle once a real demand letter arrives.",
    checklist: ["Original payment record", "Communications with business", "State UDAP citation", "Documentation of defect or non-performance", "A 14-day deadline", "Sent certified mail to business address"],
    letter: { certifiedNum: "7019 0140 0001 4827 3633", date: "May 5, 2026", recipientName: "Acme Business Inc.", recipientAddress: "1424 Commerce Way, Phoenix, AZ 85003", reLine: "Demand for Refund of Defective Product", bodyParagraphs: [
      "On March 14, 2026, I purchased [product/service] for $1,200 (transaction record attached). The product was defective and the company refused refund despite my requests.",
      "Pursuant to <strong>Arizona Consumer Fraud Act § 44-1521</strong>, I demand within <strong>fourteen (14) days</strong>:",
    ], demandList: [
      "Refund of <strong>$1,200</strong> in purchase price;",
      "UDAP statutory damages of <strong>$400</strong>.",
    ], closingLine: "Total demand: <strong>$1,600.00</strong>. If unresolved, I will file in Small Claims Court and report to the Arizona Attorney General Consumer Protection Division.", signatory: "Reese Q. Customer" },
  },

  fileSteps: {
    h2: { pre: "How to ", em: "file", post: " a refund case." },
    lede: "Four steps. Documentation is straightforward.",
    steps: [
      { title: "Gather payment and refund-refusal records", body: "Bank/credit card showing payment. Communications showing refusal. Photos or documentation of the defect or non-performance." },
      { title: "Send certified-mail demand", body: "Cite state UDAP. Most businesses settle to avoid court and AG complaints." },
      { title: "File state AG complaint", body: "State attorneys general's consumer protection divisions take complaints free of charge." },
      { title: "File in small claims", body: "If demand and AG complaint don't resolve, file. Filing fees usually $30 to $100." },
    ],
    aftermath: { tag: "After you win", title: "Collecting the refund.", bodyHtml: "Most businesses pay through credit card chargeback or bank transfer after judgment. Money judgments enforce via <strong>judgment lien</strong>, <strong>bank levy</strong>, and <strong>writ of execution</strong>." },
  },

  evidence: {
    h2: { pre: "What evidence do you need ", em: "for a refund case", post: "?" },
    lede: "Payment record, communications, and proof of issue establish the case.",
    cells: [
      { kind: "letter", tag: "Original payment record", letterhead: "Bank · Account 1234", date: "March 14, 2026", recipientName: "Reese Customer", reLine: "Payment to Acme Business", bodyParagraphs: [
        "Charge $1,200 to Acme Business Inc.",
        "Date: 03/14/2026.",
        "Status: Posted.",
      ], signatory: "Bank platform record", signatoryTitle: "Statement record" },
      { kind: "texts", tag: "Refund refusal", texts: [
        { dir: "out", text: "Item is defective. Need a refund per your stated policy." },
        { dir: "in", text: "All sales final. We don't issue refunds on these items." },
        { dir: "out", text: "Your website says 30-day refund policy. Will pursue." },
      ] },
      { kind: "handbook", tag: "State UDAP statute", documentTitle: "Arizona Revised Statutes · § 44-1521", sectionTitle: "Consumer Fraud Act", bodyParagraphs: [
        "It is unlawful for any person to use any deception, deceptive or unfair act or practice in connection with the sale of any merchandise or service.",
      ], highlight: "Refusing legitimate refund + ignoring stated policy = UDAP violation.", footer: "Arizona Consumer Fraud Act · 2x damages available" },
      { kind: "receipt", tag: "Defect documentation", vendor: "REPAIR ESTIMATE / SECOND OPINION", vendorAddr: "Documentation of issue", receiptNum: "Quote", date: "04/05/2026", lineItems: [
        { label: "Item is defective per inspection", amount: "—" },
        { label: "Cannot be repaired or unsafe", amount: "—" },
        { label: "Replacement value", amount: "$1,200" },
      ], subtotal: "$1,200", total: "$1,200", footer: "Documented defect · refund claim" },
    ],
  },

  defenses: {
    h2: { pre: "Common business ", em: "defenses", post: ", with rebuttals." },
    lede: "Three arguments cover most cases.",
    items: [
      { quote: "All sales final. No exceptions.", pill: "Most common", rebuttal: "<strong>Rebuttal:</strong> 'all sales final' clauses don't override state UDAP or implied warranty of merchantability. Defective items are recoverable regardless of policy." },
      { quote: "You used it, so we can't refund.", pill: "Used item", rebuttal: "<strong>Rebuttal:</strong> bringing the item into use to discover the defect is not 'use' for purposes of return. Photos of defect on first use establish the timing." },
      { quote: "Our policy says no refunds.", pill: "Stated policy", rebuttal: "<strong>Rebuttal:</strong> the policy applies only to non-defective items. Defective products have implied warranty rights regardless of policy. State UDAP applies." },
    ],
  },

  outcomes: {
    h2: { pre: "How much do customers ", em: "actually recover", post: "?" },
    lede: "Most refund cases recover full amount.",
    bands: [
      { label: "Low", range: "$50 to $500", body: "<strong>Refund only.</strong>", tier: "low" },
      { label: "Mid", range: "$500 to $2,500", body: "<strong>Refund + UDAP.</strong> When small claims is needed.", tier: "mid" },
      { label: "High", range: "$2,500 to $20,000+", body: "<strong>Larger purchases or services.</strong> Cap-of-court awards.", tier: "high" },
    ],
  },

  stateSection: null,

  alternatives: {
    h2: { pre: "What are the ", em: "alternatives", post: " to small claims?" },
    lede: "Demand letter and chargeback first.",
    cards: [
      { title: "Credit card chargeback", pillLabel: "Free, fast", pillTier: "primary", whenItFits: "credit card purchase within chargeback window. Federal Reg E protection.", tradeoff: "issuer decides; takes 30 to 90 days." },
      { title: "State AG consumer protection", pillLabel: "Free, regulatory", pillTier: "good", whenItFits: "systemic deceptive practices.", tradeoff: "AGs prioritize patterns over individual cases." },
      { title: "Small claims (this guide)", pillLabel: "When others fail", pillTier: "warn", whenItFits: "demand letter and AG don't resolve. UDAP claim with multiplier.", tradeoff: "30 to 90 day timeline." },
    ],
  },

  cta: {
    h2: { pre: "Recover the ", em: "refund", post: "." },
    body: "Use chargebacks first; then demand letter; then small claims under UDAP.",
    receipt: { label: "example · refused refund", items: [
      { label: "Refund of payment", amount: "$1,200" },
      { label: "UDAP multiplier", amount: "+ $400" },
      { label: "Filing fee + interest", amount: "+ $200" },
    ], total: "$1,800", totalLabel: "Total claim", note: "Illustrative. Larger purchases push higher." },
  },

  faqs: [
    { q: "Can I sue for a refund?", a: "Yes. State consumer-protection laws (UDAP) require businesses to honor refund obligations on defective products and services not rendered. Most states have UDAP statutes with 2x or 3x multipliers." },
    { q: "What if the business says 'all sales final'?", a: "Override by state UDAP. Defective items have implied warranty rights regardless of policy. 'All sales final' clauses don't bar recovery for defective products." },
    { q: "Should I try a chargeback first?", a: "Yes for credit card purchases within chargeback window (60 to 120 days). Often the fastest recovery. Use small claims when chargeback fails or doesn't apply." },
    { q: "What is UDAP?", a: "Unfair and Deceptive Acts and Practices: state consumer-protection laws prohibiting deceptive business practices. Most states have UDAP statutes with 2x or 3x damage multipliers and attorney fee-shifting." },
    { q: "How long do I have to sue?", a: "State UDAP claims usually run 2 to 4 years. Breach of contract: 4 to 6 years. Move fast: pre-suit demand letter timing affects multipliers." },
    { q: "Can I get my time back?", a: "Personal time spent dealing with the business is rarely compensable in small-claims refund cases. UDAP multiplier compensates for the inconvenience indirectly." },
    { q: "What about emotional distress?", a: "Generally limited in refund cases. Standard refund disputes are breach of contract and UDAP, not personal-injury. Extreme conduct (extreme harassment) can support emotional-distress damages." },
  ],

  relatedSlugs: ["gym-membership", "dry-cleaner", "salon-or-hairdresser", "defective-product", "services-not-rendered"],
};
