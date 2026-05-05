import type { OnlineSellerIssue } from "./types";

export const amazonSeller: OnlineSellerIssue = {
  slug: "amazon-seller",
  ready: true,
  short: "Amazon seller",
  breadcrumbLabel: "Amazon Seller",

  meta: {
    title: "Can I Sue an Amazon Seller? Small Claims Guide",
    description: "Plain-English guide to recovering from a third-party Amazon seller. A-to-z Guarantee first, then state UDAP and small claims.",
  },

  hero: {
    eyebrowSuffix: "Amazon seller",
    h1: { pre: "Can I sue an ", em: "Amazon seller", post: "?" },
    leadStrong: "Yes, but use the A-to-z Guarantee first.",
    leadBody:
      " Amazon's A-to-z Guarantee covers most third-party seller disputes: items not received, items not as described, and unauthorized charges. The guarantee resolves most claims within 30 days at no cost to you. If the A-to-z Guarantee fails (or doesn't apply), state consumer-protection laws apply with 2x or 3x multipliers in many states. Small claims is the right court for documented sellers.",
  },

  counter: {
    amount: 1800,
    meta: "A-to-z Guarantee + state UDAP backup",
    rows: [
      { label: "Refund of purchase price", value: "$1,200" },
      { label: "UDAP multiplier (2x)", value: "+ $400", emphasis: "accent" },
      { label: "Filing fee + interest", value: "$200", emphasis: "muted" },
    ],
    footer: "Sample · within most state small-claims caps",
  },

  whatCounts: {
    h2: { pre: "What kinds of ", em: "Amazon seller disputes", post: " can you sue for?" },
    lede: "Four common patterns. A-to-z usually resolves; small claims is the backup.",
    cards: [
      { num: "01", title: "Item not received", body: "Tracking shows no movement or shows delivered to wrong address. A-to-z Guarantee covers this with refund. If A-to-z denies, small claims under breach of contract." },
      { num: "02", title: "Item not as described", body: "Wrong size, color, brand, or condition. Photos comparing listing to actual item establish the case. A-to-z usually covers; small claims under UDAP if denied." },
      { num: "03", title: "Counterfeit item", body: "Fake or counterfeit product. Federal trademark law plus state UDAP both apply. Amazon usually pulls the listing and refunds; small claims for damages beyond refund." },
      { num: "04", title: "Hostile seller refused refund", body: "Seller refuses despite valid claim. A-to-z Guarantee enforces against the seller. Small claims for amounts above what A-to-z covers." },
    ],
    note: { strongIntro: "A-to-z Guarantee is unusually generous.", rest: " Amazon's third-party seller guarantee covers up to $2,500 per claim and is usually granted within 30 days. File via 'Your Orders' → 'Problem with order' → 'Request A-to-z Guarantee'. Most disputes never reach court." },
  },

  claim: {
    h2: { pre: "How much can you ", em: "claim", post: "?" },
    lede: "A-to-z covers refund up to $2,500. Small claims for amounts beyond.",
    layers: [
      { tag: "Layer 1", title: "Refund of purchase price", body: "Item cost plus shipping. Amazon's A-to-z Guarantee covers up to $2,500 directly.", amount: "$1,200" },
      { tag: "Layer 2", title: "Statutory multiplier (when A-to-z fails)", body: "State UDAP statutes add 2x or 3x for willful violations. Apply when seller refuses A-to-z and you have to file small claims.", amount: "+ $400", accent: true },
      { tag: "Layer 3", title: "Filing fees, interest", body: "Filing fee, service-of-process cost, pre-judgment interest at your state's legal rate.", amount: "+ $200" },
    ],
    total: { label: "Sample total within small-claims cap", body: "$1,200 refund plus 2x UDAP, plus filing fee.", amount: "$1,800", sublabel: "illustrative · A-to-z covers most claims under $2,500" },
  },

  demand: {
    h2: { pre: "Send a ", em: "demand letter", post: " after A-to-z fails." },
    lede: "Demand letters work after A-to-z Guarantee denies. Cite state UDAP and the seller's Amazon listing.",
    checklist: ["Order details with seller name", "A-to-z Guarantee claim outcome", "Photos of item received vs. listing", "State UDAP statute citation", "A 14-day deadline", "Sent certified mail to seller business address"],
    letter: {
      certifiedNum: "7019 0140 0001 4827 3626",
      date: "May 5, 2026",
      recipientName: "Acme Sales (Amazon Seller)",
      recipientAddress: "1424 Commerce Way, Phoenix, AZ 85003",
      reLine: "Demand for Refund of Defective Order #82218",
      bodyParagraphs: [
        "On March 14, 2026, I purchased [product] from your Amazon storefront for $1,200. The item arrived damaged. Amazon A-to-z Guarantee was denied on appeal (Amazon claim ID 4218).",
        "Pursuant to <strong>Arizona Consumer Fraud Act § 44-1521</strong>, I demand within <strong>fourteen (14) days</strong>:",
      ],
      demandList: [
        "Refund of <strong>$1,200</strong> in purchase price plus shipping;",
        "UDAP statutory damages of <strong>$400</strong>.",
      ],
      closingLine: "Total demand: <strong>$1,600.00</strong>. If unresolved, I will file in Small Claims Court.",
      signatory: "Reese Q. Buyer",
    },
  },

  fileSteps: {
    h2: { pre: "How to ", em: "file", post: " against an Amazon seller." },
    lede: "Four steps. A-to-z first; small claims as backup.",
    steps: [
      { title: "File A-to-z Guarantee", body: "'Your Orders' → 'Problem with order' → 'Request A-to-z Guarantee'. Cover most claims up to $2,500. Resolution typically 30 days." },
      { title: "Send certified-mail demand", body: "If A-to-z denied, send the seller a state UDAP demand. Most settle to avoid court." },
      { title: "File in small claims", body: "If demand fails, file. Lookup the seller's business address from Amazon listing or state secretary of state." },
      { title: "Hearing", body: "Lead with A-to-z denial, photos, listing comparison. Hearings 10 to 15 minutes." },
    ],
    aftermath: { tag: "After you win", title: "Collecting from an Amazon seller.", bodyHtml: "Money judgments enforce via <strong>judgment lien</strong>, <strong>bank levy</strong>, and <strong>writ of execution</strong>. Cross-state sellers may need sheriff service. Amazon listing changes don't bar collection." },
  },

  evidence: {
    h2: { pre: "What evidence do you need ", em: "for an Amazon case", post: "?" },
    lede: "Order record, A-to-z claim, and photos establish the case.",
    cells: [
      { kind: "letter", tag: "Order record", letterhead: "Amazon · Order #82218", date: "March 14, 2026", recipientName: "Reese Buyer", reLine: "Order from Acme Sales (third-party)", bodyParagraphs: [
        "Item: [product]. Sold by: Acme Sales (third-party). Price: $1,200.",
        "Status: Delivered 03/22/2026. Damaged on arrival.",
        "A-to-z Guarantee filed 03/24. Denied 04/15.",
      ], signatory: "Amazon platform record", signatoryTitle: "Order detail" },
      { kind: "photos", tag: "Item received vs. listing", photos: [
        { id: "1581094271901-8022df4466f9", cap: "Item received (damaged)" },
        { id: "1556909114-f6e7ad7d3136", cap: "Listing photo (intact)" },
        { id: "1581092335397-9583eb92d232", cap: "Box damage" },
        { id: "1503602642458-232111445657", cap: "Close-up of damage" },
      ] },
      { kind: "texts", tag: "Seller refused (Amazon messaging)", texts: [
        { dir: "out", text: "Item arrived damaged. Need refund per Amazon's policy." },
        { dir: "in", text: "Sale was final. We don't accept returns." },
        { dir: "out", text: "I filed A-to-z Guarantee. Amazon will decide." },
      ] },
      { kind: "handbook", tag: "A-to-z denial", documentTitle: "Amazon A-to-z Guarantee · Claim 4218", sectionTitle: "Denial reason", bodyParagraphs: [
        "Claim filed 03/24/2026. Denied 04/15/2026.",
        "Reason: 'Seller provided evidence of correct shipment.' Buyer dispute insufficient.",
        "Appeal denied 04/22/2026.",
      ], highlight: "A-to-z denial allows direct lawsuit under state UDAP.", footer: "A-to-z claim outcome documented" },
    ],
  },

  defenses: {
    h2: { pre: "Common seller ", em: "defenses", post: ", with rebuttals." },
    lede: "Three arguments cover most cases.",
    items: [
      { quote: "Amazon already decided. You can't sue.", pill: "Most common", rebuttal: "<strong>Rebuttal:</strong> A-to-z is Amazon's voluntary program. Denial doesn't bar you from court. State UDAP applies independently." },
      { quote: "All sales final.", pill: "Final sale", rebuttal: "<strong>Rebuttal:</strong> 'all sales final' clauses don't override state UDAP or implied warranty of merchantability. Defective items are recoverable regardless." },
      { quote: "We're a small business. We can't afford this.", pill: "Hardship", rebuttal: "<strong>Rebuttal:</strong> hardship doesn't extinguish the obligation. Most state UDAP statutes apply to all sellers including small businesses." },
    ],
  },

  outcomes: {
    h2: { pre: "How much do buyers ", em: "actually recover", post: "?" },
    lede: "Most cases resolve through A-to-z. Small claims for backup.",
    bands: [
      { label: "Low", range: "$50 to $500", body: "<strong>A-to-z refund only.</strong> Platform program returns purchase price.", tier: "low" },
      { label: "Mid", range: "$500 to $2,500", body: "<strong>Refund + multiplier.</strong> When A-to-z denied and small claims succeeds.", tier: "mid" },
      { label: "High", range: "$2,500 to $20,000+", body: "<strong>Cap-of-court.</strong> Larger purchases beyond A-to-z limits, with UDAP multiplier.", tier: "high" },
    ],
  },

  stateSection: null,

  alternatives: {
    h2: { pre: "What are the ", em: "alternatives", post: " to small claims?" },
    lede: "A-to-z first; chargeback second; small claims third.",
    cards: [
      { title: "Amazon A-to-z Guarantee", pillLabel: "Free, fast, biggest payer", pillTier: "primary", whenItFits: "third-party seller dispute under $2,500. Resolves within 30 days.", tradeoff: "Amazon decides; not always favorable." },
      { title: "Credit card chargeback", pillLabel: "Free, 60-120 days", pillTier: "good", whenItFits: "credit card purchase under chargeback window. Federal Reg E provides protection.", tradeoff: "issuer decides; takes 30 to 90 days." },
      { title: "Small claims (this guide)", pillLabel: "When others fail", pillTier: "warn", whenItFits: "A-to-z denied or above limit. UDAP claim with multiplier.", tradeoff: "30 to 90 day timeline." },
    ],
  },

  cta: {
    h2: { pre: "Recover the ", em: "purchase price", post: "." },
    body: "A-to-z first. If denied, demand letter and small claims under state UDAP.",
    receipt: { label: "example · damaged Amazon purchase", items: [
      { label: "Refund of purchase price", amount: "$1,200" },
      { label: "UDAP multiplier", amount: "+ $400" },
      { label: "Filing fee + interest", amount: "+ $200" },
    ], total: "$1,800", totalLabel: "Total claim", note: "Illustrative. A-to-z covers most claims; small claims for backup." },
  },

  faqs: [
    { q: "Should I file the A-to-z Guarantee or sue?", a: "A-to-z first. It covers up to $2,500 per claim, resolves in 30 days, and is free. If A-to-z denies or doesn't apply, then small claims is your next step." },
    { q: "How do I file an A-to-z Guarantee claim?", a: "Go to 'Your Orders' on Amazon → click 'Problem with order' → select 'Request A-to-z Guarantee'. Provide order details and reason. Amazon evaluates and typically responds within 30 days." },
    { q: "What if the seller is in another country?", a: "International sellers are harder to sue but A-to-z still covers them. Use A-to-z plus credit card chargeback first. Direct international lawsuits rarely succeed." },
    { q: "Can I sue Amazon directly?", a: "Generally no. Amazon's terms make them a marketplace, not the seller. Third-party sellers are the appropriate defendants. Amazon does have specific liability for some categories (defective products under product liability laws)." },
    { q: "What if Amazon's records show the item was delivered?", a: "Tracking can be wrong. Photos at delivery, neighbor witness, or porch-cam footage can establish non-delivery. Some states' 'failure to deliver as agreed' is actionable separately." },
    { q: "How long do I have to sue?", a: "Breach of contract: 4 to 6 years. State UDAP: 2 to 4 years. Move quickly: A-to-z window is short and small claims comes after." },
    { q: "Can I sue for emotional distress?", a: "Generally no for product purchase disputes unless conduct rises to extreme. Standard purchase disputes are breach of contract and UDAP, not personal-injury cases." },
  ],

  relatedSlugs: ["online-seller-general", "ebay-seller", "etsy-seller", "facebook-marketplace", "venmo-cashapp-scam", "fedex-package"],
};
