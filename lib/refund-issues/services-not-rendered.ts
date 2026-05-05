import type { RefundIssue } from "./types";

export const servicesNotRendered: RefundIssue = {
  slug: "services-not-rendered",
  ready: true,
  short: "Services not rendered",
  breadcrumbLabel: "Services Not Rendered",

  meta: { title: "Can I Sue for Services Not Rendered? Small Claims Guide", description: "Plain-English guide to recovering when services weren't performed. Breach of contract, refund of payment, and a demand-letter template." },

  hero: {
    eyebrowSuffix: "Services not rendered",
    h1: { pre: "Can I sue for ", em: "services not rendered", post: "?" },
    leadStrong: "Yes. Breach of contract + state UDAP both apply.",
    leadBody: " When you paid for services that weren't performed (or were performed badly), recovery is straightforward under breach of contract. State UDAP statutes add 2x or 3x multipliers for willful violations. The proof: payment record + agreement (oral or written) + lack of performance. Most cases settle once a demand letter cites the legal theory.",
  },

  counter: { amount: 2400, meta: "Breach of contract + state UDAP", rows: [
    { label: "Refund of payment", value: "$1,600" },
    { label: "UDAP multiplier (2x)", value: "+ $600", emphasis: "accent" },
    { label: "Filing fee + interest", value: "$200", emphasis: "muted" },
  ], footer: "Sample · within most state small-claims caps" },

  whatCounts: {
    h2: { pre: "What kinds of ", em: "services not rendered", post: " can you sue for?" },
    lede: "Four common patterns.",
    cards: [
      { num: "01", title: "Service never performed", body: "You paid; service never started. Most common pattern. Refund of payment + UDAP multiplier." },
      { num: "02", title: "Partial performance, no completion", body: "Service started but stopped before completion. Refund of unearned portion (quantum meruit calculation)." },
      { num: "03", title: "Service performed badly", body: "Service done but materially defective. Implied warranty of workmanlike service applies. Recovery is cost to redo or refund of bad work." },
      { num: "04", title: "Service rendered to wrong specifications", body: "Service performed but to wrong specifications (wrong design, wrong size, wrong scope). Materially different from agreement = breach." },
    ],
    note: { strongIntro: "Document the agreement.", rest: " Texts, emails, written contracts, and receipts establish what was agreed. Even oral agreements are enforceable. The clearer the agreement, the cleaner the case for non-performance." },
  },

  claim: {
    h2: { pre: "How much can you ", em: "claim", post: "?" },
    lede: "Refund + UDAP multiplier + filing fees.",
    layers: [
      { tag: "Layer 1", title: "Refund of payment", body: "Bank/credit-card record establishes payment. Refund of full amount for non-performance, or unearned portion for partial.", amount: "$1,600" },
      { tag: "Layer 2", title: "UDAP multiplier", body: "State UDAP statutes add 2x or 3x for willful violations.", amount: "+ $600", accent: true },
      { tag: "Layer 3", title: "Filing fees, interest", body: "Filing fee, service-of-process cost, pre-judgment interest.", amount: "+ $200" },
    ],
    total: { label: "Sample total within small-claims cap", body: "$1,600 refund plus 2x UDAP, plus filing fee.", amount: "$2,400", sublabel: "illustrative · varies by state" },
  },

  demand: {
    h2: { pre: "Send a ", em: "demand letter", post: " first." },
    lede: "Demand letters work especially well for non-performance because the case is clean.",
    checklist: ["Bank/credit card record of payment", "Agreement (texts, emails, contract)", "Documentation of non-performance or partial performance", "State UDAP citation", "A 14-day deadline", "Sent certified mail to service provider"],
    letter: { certifiedNum: "7019 0140 0001 4827 3638", date: "May 5, 2026", recipientName: "Acme Service Provider", recipientAddress: "1424 Service Way, Phoenix, AZ 85003", reLine: "Demand for Refund of Payment for Services Not Rendered", bodyParagraphs: [
      "On March 14, 2026, I paid your company $1,600 for [service description] (receipt and bank record attached). The service was never performed. I have called and emailed multiple times; no response.",
      "Pursuant to <strong>Arizona Consumer Fraud Act § 44-1521</strong>, I demand within <strong>fourteen (14) days</strong>:",
    ], demandList: [
      "Refund of <strong>$1,600</strong> in payment;",
      "UDAP statutory damages of <strong>$600</strong>.",
    ], closingLine: "Total demand: <strong>$2,200.00</strong>. If unresolved, I will file in Small Claims Court.", signatory: "Reese Q. Customer" },
  },

  fileSteps: {
    h2: { pre: "How to ", em: "file", post: " a services case." },
    lede: "Four steps. Documentation is the case.",
    steps: [
      { title: "Gather payment + agreement records", body: "Bank/credit card statement showing payment. Texts, emails, contract showing the agreement. Communications showing non-performance." },
      { title: "Send certified-mail demand", body: "Cite state UDAP. Most providers settle to avoid court." },
      { title: "Try chargeback if applicable", body: "Credit card chargeback within 60-120 days. Often the fastest recovery." },
      { title: "File in small claims", body: "If demand fails. Filing fees usually $30 to $100." },
    ],
    aftermath: { tag: "After you win", title: "Collecting from a service provider.", bodyHtml: "Money judgments enforce via <strong>judgment lien</strong>, <strong>bank levy</strong>, and <strong>writ of execution</strong>." },
  },

  evidence: {
    h2: { pre: "What evidence do you need ", em: "for non-performance", post: "?" },
    lede: "Payment record, agreement, and proof of non-performance.",
    cells: [
      { kind: "letter", tag: "Service agreement", letterhead: "Acme Service Provider · Quote #82218", date: "March 1, 2026", recipientName: "Reese Customer", reLine: "Service estimate", bodyParagraphs: [
        "Service: [description].",
        "Total: $1,600. Down payment: $1,600 (full).",
        "Estimated start: 03/14/2026. Estimated completion: 03/30/2026.",
      ], signatory: "Acme Service Provider", signatoryTitle: "Service quote" },
      { kind: "texts", tag: "Service never started", texts: [
        { dir: "out", text: "When does work start? You said 3/14, it's now 4/15." },
        { dir: "in", text: "Soon. Things came up." },
        { dir: "out", text: "It's been a month and a half. Need a refund." },
      ] },
      { kind: "handbook", tag: "Breach of contract + UDAP", documentTitle: "Restatement (Second) of Contracts + State UDAP", sectionTitle: "Material breach + UDAP", bodyParagraphs: [
        "Failure to perform agreed services within reasonable time is material breach. Refund of consideration is appropriate remedy.",
        "State UDAP adds multiplier for willful or repeated violations.",
      ], highlight: "Service paid 03/14; not started by 04/15. 32 days past start date. Material breach.", footer: "Standard breach-of-contract law" },
      { kind: "receipt", tag: "Bank record of payment", vendor: "WELLS FARGO", vendorAddr: "Account 1234", receiptNum: "Statement", date: "03/14/2026", lineItems: [
        { label: "Wire to Acme Service Provider", amount: "$1,600" },
        { label: "Memo: 'Service per quote dated 3/1/2026'", amount: "(memo)" },
      ], subtotal: "$1,600", total: "$1,600", footer: "Payment confirmed" },
    ],
  },

  defenses: {
    h2: { pre: "Common service provider ", em: "defenses", post: ", with rebuttals." },
    lede: "Three arguments cover most cases.",
    items: [
      { quote: "We had to delay due to circumstances.", pill: "Most common", rebuttal: "<strong>Rebuttal:</strong> reasonable delays may be acceptable; significant delays without communication are breach. The agreement specified timing; long unexplained delays are material breach." },
      { quote: "We did some work, just not all.", pill: "Partial performance", rebuttal: "<strong>Rebuttal:</strong> bring evidence of what was actually done. Quantum meruit lets the provider recover for actual work value, but you recover the unearned portion." },
      { quote: "Refund isn't possible.", pill: "Cannot refund", rebuttal: "<strong>Rebuttal:</strong> 'cannot refund' isn't a legal defense. Court can order refund; provider has to pay regardless of cash flow. Money judgment enforces via levy or garnishment." },
    ],
  },

  outcomes: {
    h2: { pre: "How much do customers ", em: "actually recover", post: "?" },
    lede: "Most cases recover full amount.",
    bands: [
      { label: "Low", range: "$50 to $500", body: "<strong>Refund only.</strong>", tier: "low" },
      { label: "Mid", range: "$500 to $2,500", body: "<strong>Refund + UDAP.</strong>", tier: "mid" },
      { label: "High", range: "$2,500 to $20,000+", body: "<strong>Larger services with multipliers.</strong>", tier: "high" },
    ],
  },

  stateSection: null,

  alternatives: {
    h2: { pre: "What are the ", em: "alternatives", post: " to small claims?" },
    lede: "Demand letter and chargeback first.",
    cards: [
      { title: "Credit card chargeback", pillLabel: "Free, fast", pillTier: "primary", whenItFits: "credit card payment within 60-120 days.", tradeoff: "issuer decides." },
      { title: "Demand letter", pillLabel: "Free", pillTier: "good", whenItFits: "documented agreement and non-performance.", tradeoff: "no enforcement if ignored." },
      { title: "Small claims (this guide)", pillLabel: "When others fail", pillTier: "warn", whenItFits: "demand and chargeback fail.", tradeoff: "30 to 90 day timeline." },
    ],
  },

  cta: {
    h2: { pre: "Recover the ", em: "payment", post: "." },
    body: "Demand letters with payment records produce settlement in most cases.",
    receipt: { label: "example · service never performed", items: [
      { label: "Refund of payment", amount: "$1,600" },
      { label: "UDAP multiplier", amount: "+ $600" },
      { label: "Filing fee + interest", amount: "+ $200" },
    ], total: "$2,400", totalLabel: "Total claim", note: "Illustrative. Larger services push higher." },
  },

  faqs: [
    { q: "Can I sue for services not rendered?", a: "Yes. Breach of contract is straightforward. Bank record + agreement + lack of performance = case. State UDAP multipliers apply." },
    { q: "What if some work was done?", a: "Quantum meruit. Provider recovers the value of actual work; you recover the unearned portion. Calculate proportional refund." },
    { q: "Can I do a chargeback first?", a: "Yes for credit card payments within 60-120 days. Often the fastest recovery. Use chargebacks for fast resolution; small claims for backup." },
    { q: "What if there was no written contract?", a: "Oral contracts are enforceable. Texts, emails, witness testimony, and bank records establish the agreement. The provider's own communications usually prove the case." },
    { q: "How long do I have to sue?", a: "Breach of contract: 4 to 6 years for written, 2 to 4 for oral. State UDAP: 2 to 4 years. Move fast." },
    { q: "What if provider went out of business?", a: "Sue the principal individually if applicable. Some service providers are sole proprietors; the principal is personally liable. Corporate providers have asset issues but the lawsuit can still be filed." },
    { q: "What about emotional distress from missed service?", a: "Generally limited. Standard non-performance is direct damages and UDAP. Severe consequential damages may apply for medical or critical services." },
  ],

  relatedSlugs: ["refund-general", "gym-membership", "dry-cleaner", "salon-or-hairdresser", "defective-product"],
};
