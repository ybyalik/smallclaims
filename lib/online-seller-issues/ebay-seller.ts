import type { OnlineSellerIssue } from "./types";

export const ebaySeller: OnlineSellerIssue = {
  slug: "ebay-seller",
  ready: true,
  short: "eBay seller",
  breadcrumbLabel: "eBay Seller",

  meta: { title: "Can I Sue an eBay Seller? Small Claims Guide", description: "Plain-English guide to recovering from an eBay seller. Money Back Guarantee first, state UDAP for backup, demand-letter template included." },

  hero: {
    eyebrowSuffix: "eBay seller",
    h1: { pre: "Can I sue an ", em: "eBay seller", post: "?" },
    leadStrong: "Yes, but use eBay Money Back Guarantee first.",
    leadBody: " eBay's Money Back Guarantee covers items not received and items not as described. Most disputes resolve within 30 days at no cost. If denied, state UDAP statutes apply with 2x or 3x multipliers in many states. Small claims is the right court for documented sellers when MBG fails.",
  },

  counter: { amount: 1800, meta: "eBay MBG + state UDAP", rows: [
    { label: "Refund of purchase price", value: "$1,200" },
    { label: "UDAP multiplier (2x)", value: "+ $400", emphasis: "accent" },
    { label: "Filing fee + interest", value: "$200", emphasis: "muted" },
  ], footer: "Sample · within most state small-claims caps" },

  whatCounts: {
    h2: { pre: "What kinds of ", em: "eBay disputes", post: " can you sue for?" },
    lede: "Four common patterns. MBG covers most; UDAP for backup.",
    cards: [
      { num: "01", title: "Item not received (INR)", body: "Seller shipped but item never arrived, or seller never shipped. eBay MBG covers with refund. Most cases resolve at MBG stage." },
      { num: "02", title: "Item significantly not as described (SNAD)", body: "Wrong condition, brand, size, or function. Photos comparing listing to delivered item are decisive. MBG returns money." },
      { num: "03", title: "Counterfeit item", body: "Fake or counterfeit product. eBay's Verified Authentic program covers. Federal trademark law plus state UDAP also apply." },
      { num: "04", title: "Seller refused refund despite valid claim", body: "Seller violates eBay's policies and refuses MBG resolution. Small claims under UDAP for amounts beyond MBG limits." },
    ],
    note: { strongIntro: "eBay MBG is robust.", rest: " The Money Back Guarantee covers most third-party seller disputes. File via 'My eBay' → 'Returns' → start a return. Most disputes resolved within 30 days. Use MBG first." },
  },

  claim: {
    h2: { pre: "How much can you ", em: "claim", post: "?" },
    lede: "MBG covers refund. Small claims for amounts beyond.",
    layers: [
      { tag: "Layer 1", title: "Refund (MBG covers)", body: "Item cost plus shipping. eBay MBG returns directly.", amount: "$1,200" },
      { tag: "Layer 2", title: "UDAP multiplier (when MBG fails)", body: "State UDAP statutes add 2x or 3x for willful violations.", amount: "+ $400", accent: true },
      { tag: "Layer 3", title: "Filing fees, interest", body: "Filing fee, service-of-process cost, pre-judgment interest.", amount: "+ $200" },
    ],
    total: { label: "Sample total within small-claims cap", body: "Refund plus UDAP multiplier, plus filing fee.", amount: "$1,800", sublabel: "illustrative · MBG resolves most cases" },
  },

  demand: {
    h2: { pre: "Send a ", em: "demand letter", post: " after MBG fails." },
    lede: "Demand letters work after MBG denial. Cite state UDAP.",
    checklist: ["Order details with seller name", "MBG claim outcome", "Photos of item received vs. listing", "State UDAP citation", "A 14-day deadline", "Sent certified mail to seller"],
    letter: { certifiedNum: "7019 0140 0001 4827 3627", date: "May 5, 2026", recipientName: "Acme Sales (eBay Seller)", recipientAddress: "1424 Commerce Way, Phoenix, AZ 85003", reLine: "Demand for Refund of Defective eBay Order #82218", bodyParagraphs: [
      "On March 14, 2026, I purchased [product] from your eBay store for $1,200. Item arrived damaged. eBay Money Back Guarantee was denied on appeal (case ID 4218).",
      "Pursuant to <strong>Arizona Consumer Fraud Act § 44-1521</strong>, I demand within <strong>fourteen (14) days</strong>:",
    ], demandList: [
      "Refund of <strong>$1,200</strong> in purchase price plus shipping;",
      "UDAP statutory damages of <strong>$400</strong>.",
    ], closingLine: "Total demand: <strong>$1,600.00</strong>. If unresolved, I will file in Small Claims Court.", signatory: "Reese Q. Buyer" },
  },

  fileSteps: {
    h2: { pre: "How to ", em: "file", post: " against an eBay seller." },
    lede: "Four steps. MBG first; small claims as backup.",
    steps: [
      { title: "File eBay Money Back Guarantee", body: "'My eBay' → 'Returns' → start a return. Documents the dispute and triggers eBay's resolution process." },
      { title: "Send certified-mail demand", body: "If MBG denied, send seller a state UDAP demand. Most settle to avoid court." },
      { title: "File in small claims", body: "If demand fails, lookup seller business address from eBay listing. Filing fees usually $30 to $100." },
      { title: "Hearing", body: "Lead with MBG denial, photos, listing comparison. Hearings 10 to 15 minutes." },
    ],
    aftermath: { tag: "After you win", title: "Collecting from an eBay seller.", bodyHtml: "Money judgments enforce via <strong>judgment lien</strong>, <strong>bank levy</strong>, and <strong>writ of execution</strong>. Cross-state sellers may need sheriff service." },
  },

  evidence: {
    h2: { pre: "What evidence do you need ", em: "for an eBay case", post: "?" },
    lede: "Order, MBG outcome, and photos establish the case.",
    cells: [
      { kind: "letter", tag: "eBay order record", letterhead: "eBay · Order #82218", date: "March 14, 2026", recipientName: "Reese Buyer", reLine: "Order from Acme Sales", bodyParagraphs: [
        "Item: [product]. Sold by: Acme Sales. Price: $1,200.",
        "Status: Delivered 03/22/2026, damaged.",
        "MBG case 4218 filed 03/24, denied 04/15.",
      ], signatory: "eBay platform record", signatoryTitle: "Order detail" },
      { kind: "photos", tag: "Item vs. listing", photos: [
        { id: "1581094271901-8022df4466f9", cap: "Item received (damaged)" },
        { id: "1556909114-f6e7ad7d3136", cap: "Listing photo" },
        { id: "1581092335397-9583eb92d232", cap: "Box damage" },
        { id: "1503602642458-232111445657", cap: "Close-up" },
      ] },
      { kind: "texts", tag: "Seller refused", texts: [
        { dir: "out", text: "Item arrived damaged. Need refund per eBay policy." },
        { dir: "in", text: "Sale was final. We don't accept returns." },
        { dir: "out", text: "Filed Money Back Guarantee. eBay decides." },
      ] },
      { kind: "handbook", tag: "MBG denial", documentTitle: "eBay Money Back Guarantee · Case 4218", sectionTitle: "Denial reason", bodyParagraphs: [
        "Case filed 03/24/2026. Denied 04/15/2026.",
        "Reason: 'Seller provided shipping evidence; buyer claim insufficient.'",
        "Appeal denied 04/22/2026.",
      ], highlight: "MBG denial allows direct lawsuit under state UDAP.", footer: "MBG outcome documented" },
    ],
  },

  defenses: {
    h2: { pre: "Common seller ", em: "defenses", post: ", with rebuttals." },
    lede: "Three arguments cover most cases.",
    items: [
      { quote: "eBay already ruled in my favor.", pill: "Most common", rebuttal: "<strong>Rebuttal:</strong> MBG is voluntary. Denial doesn't bar court. State UDAP applies independently." },
      { quote: "All sales final.", pill: "Final sale", rebuttal: "<strong>Rebuttal:</strong> override by state UDAP. Defective items recoverable regardless." },
      { quote: "Buyer damaged it after delivery.", pill: "After-delivery damage", rebuttal: "<strong>Rebuttal:</strong> photos at unboxing with timestamps establish damage at arrival." },
    ],
  },

  outcomes: {
    h2: { pre: "How much do buyers ", em: "actually recover", post: "?" },
    lede: "Most via MBG. Small claims as backup.",
    bands: [
      { label: "Low", range: "$50 to $500", body: "<strong>MBG refund only.</strong>", tier: "low" },
      { label: "Mid", range: "$500 to $2,500", body: "<strong>Refund + multiplier.</strong> Most common when MBG denied.", tier: "mid" },
      { label: "High", range: "$2,500 to $20,000+", body: "<strong>Cap-of-court.</strong> Larger purchases with UDAP multiplier.", tier: "high" },
    ],
  },

  stateSection: null,

  alternatives: {
    h2: { pre: "What are the ", em: "alternatives", post: " to small claims?" },
    lede: "MBG, chargeback, then small claims.",
    cards: [
      { title: "eBay Money Back Guarantee", pillLabel: "Free, fast, biggest payer", pillTier: "primary", whenItFits: "any eBay third-party seller dispute. Resolves within 30 days.", tradeoff: "eBay decides; not always favorable." },
      { title: "Credit card chargeback", pillLabel: "Free, 60-120 days", pillTier: "good", whenItFits: "credit card purchase. Federal Reg E protection.", tradeoff: "issuer decides; takes 30 to 90 days." },
      { title: "Small claims (this guide)", pillLabel: "When others fail", pillTier: "warn", whenItFits: "MBG denied. UDAP claim.", tradeoff: "30 to 90 day timeline." },
    ],
  },

  cta: {
    h2: { pre: "Recover the ", em: "purchase price", post: "." },
    body: "MBG first. If denied, demand letter and small claims under UDAP.",
    receipt: { label: "example · damaged eBay purchase", items: [
      { label: "Refund", amount: "$1,200" },
      { label: "UDAP multiplier", amount: "+ $400" },
      { label: "Filing fee + interest", amount: "+ $200" },
    ], total: "$1,800", totalLabel: "Total claim", note: "Illustrative. MBG covers most cases." },
  },

  faqs: [
    { q: "Should I file MBG or sue?", a: "MBG first. Free, fast, often resolves the dispute. If denied, then small claims under state UDAP." },
    { q: "How do I file MBG?", a: "'My eBay' → 'Returns' → start a return. Document the dispute. eBay typically responds within 30 days." },
    { q: "What if seller is overseas?", a: "MBG covers international sellers. Use MBG plus chargeback. Direct international lawsuits rarely succeed." },
    { q: "Can I sue eBay directly?", a: "Generally no. eBay is a marketplace, not the seller. Sue the third-party seller." },
    { q: "How long do I have to sue?", a: "Breach of contract: 4 to 6 years. State UDAP: 2 to 4 years." },
    { q: "What if eBay decides for the seller?", a: "MBG denial doesn't bar court. State UDAP applies independently. Small claims with UDAP multiplier." },
    { q: "Can I get punitive damages?", a: "Most state UDAP statutes have multipliers (2x or 3x) but not punitive damages in small claims. Higher courts can award punitive in egregious fraud cases." },
  ],

  relatedSlugs: ["online-seller-general", "amazon-seller", "etsy-seller", "facebook-marketplace", "venmo-cashapp-scam", "fedex-package"],
};
