import type { OnlineSellerIssue } from "./types";

export const etsySeller: OnlineSellerIssue = {
  slug: "etsy-seller",
  ready: true,
  short: "Etsy seller",
  breadcrumbLabel: "Etsy Seller",

  meta: { title: "Can I Sue an Etsy Seller for Refusing a Refund?", description: "Plain-English guide to recovering from an Etsy seller. Etsy case system, state UDAP, and demand-letter template." },

  hero: {
    eyebrowSuffix: "Etsy seller",
    h1: { pre: "Can I sue an ", em: "Etsy seller", post: "?" },
    leadStrong: "Yes. Use the Etsy case system first; small claims as backup.",
    leadBody: " Etsy's case system handles disputes between buyers and sellers. Most cases resolve within 30 days. If denied, state consumer-protection laws apply with 2x or 3x multipliers in many states. Small claims is the right court when Etsy resolution fails. Etsy sellers are usually small businesses, which means seller business address is straightforward to find for service.",
  },

  counter: { amount: 1400, meta: "Etsy case system + state UDAP", rows: [
    { label: "Refund of purchase price", value: "$800" },
    { label: "UDAP multiplier (2x)", value: "+ $400", emphasis: "accent" },
    { label: "Filing fee + interest", value: "$200", emphasis: "muted" },
  ], footer: "Sample · within most state small-claims caps" },

  whatCounts: {
    h2: { pre: "What kinds of ", em: "Etsy disputes", post: " can you sue for?" },
    lede: "Four common patterns.",
    cards: [
      { num: "01", title: "Item not as described", body: "Wrong materials, dimensions, or features. Etsy's listing accuracy rules + photos = case." },
      { num: "02", title: "Custom order not delivered", body: "Custom or made-to-order item never finished. Etsy case system covers; small claims for damages beyond." },
      { num: "03", title: "Refund refused despite valid claim", body: "Seller violates Etsy's policies and refuses refund. Etsy case typically resolves; UDAP for backup." },
      { num: "04", title: "Counterfeit or copyright violation", body: "Item infringes copyright or counterfeits brand. Federal trademark/copyright + state UDAP both apply." },
    ],
    note: { strongIntro: "Etsy is buyer-favorable.", rest: " Etsy's case system tends to resolve in buyer's favor when documentation is solid. File via the order page. Most disputes resolved within 30 days." },
  },

  claim: {
    h2: { pre: "How much can you ", em: "claim", post: "?" },
    lede: "Etsy typically refunds; small claims for amounts beyond.",
    layers: [
      { tag: "Layer 1", title: "Refund", body: "Item cost plus shipping. Etsy case system returns directly.", amount: "$800" },
      { tag: "Layer 2", title: "UDAP multiplier", body: "State UDAP statutes add 2x or 3x for willful violations.", amount: "+ $400", accent: true },
      { tag: "Layer 3", title: "Filing fees, interest", body: "Filing fee, service-of-process cost, pre-judgment interest.", amount: "+ $200" },
    ],
    total: { label: "Sample total within small-claims cap", body: "$800 refund plus 2x UDAP, plus filing fee.", amount: "$1,400", sublabel: "illustrative · Etsy case resolves most" },
  },

  demand: {
    h2: { pre: "Send a ", em: "demand letter", post: " after Etsy fails." },
    lede: "Demand letters work after Etsy case denial. Cite UDAP.",
    checklist: ["Order details", "Etsy case outcome", "Photos vs. listing", "State UDAP citation", "A 14-day deadline", "Sent certified mail to seller"],
    letter: { certifiedNum: "7019 0140 0001 4827 3628", date: "May 5, 2026", recipientName: "Acme Crafts (Etsy Seller)", recipientAddress: "1424 Workshop Way, Phoenix, AZ 85003", reLine: "Demand for Refund of Custom Order #82218", bodyParagraphs: [
      "On March 14, 2026, I purchased a custom item from your Etsy shop for $800. Item arrived materially different from listing (different materials, missing features). Etsy case 4218 was denied on appeal.",
      "Pursuant to <strong>Arizona Consumer Fraud Act § 44-1521</strong>, I demand within <strong>fourteen (14) days</strong>:",
    ], demandList: [
      "Refund of <strong>$800</strong> in purchase price plus shipping;",
      "UDAP statutory damages of <strong>$400</strong>.",
    ], closingLine: "Total demand: <strong>$1,200.00</strong>. If unresolved, I will file in Small Claims Court.", signatory: "Reese Q. Buyer" },
  },

  fileSteps: {
    h2: { pre: "How to ", em: "file", post: " against an Etsy seller." },
    lede: "Four steps.",
    steps: [
      { title: "File Etsy case", body: "Go to order details → 'Help with order' → start a case. Etsy mediates; resolution typically 30 days." },
      { title: "Send demand letter", body: "If Etsy denied, send seller a state UDAP demand. Most settle." },
      { title: "File in small claims", body: "Etsy listing usually shows seller business name; lookup state secretary of state for address." },
      { title: "Hearing", body: "Lead with case denial, photos, listing comparison." },
    ],
    aftermath: { tag: "After you win", title: "Collecting from an Etsy seller.", bodyHtml: "Money judgments enforce via <strong>judgment lien</strong>, <strong>bank levy</strong>, and <strong>writ of execution</strong>. Cross-state sellers may need sheriff service." },
  },

  evidence: {
    h2: { pre: "What evidence do you need ", em: "for an Etsy case", post: "?" },
    lede: "Order, case outcome, photos.",
    cells: [
      { kind: "letter", tag: "Etsy order record", letterhead: "Etsy · Order #82218", date: "March 14, 2026", recipientName: "Reese Buyer", reLine: "Custom order from Acme Crafts", bodyParagraphs: [
        "Item: [custom product]. Sold by: Acme Crafts. Price: $800.",
        "Listing specified: hand-stitched, oak frame, 18x24 inches.",
        "Received: machine-stitched, pine frame, 16x22 inches.",
      ], signatory: "Etsy platform record", signatoryTitle: "Order detail" },
      { kind: "photos", tag: "Item vs. listing", photos: [
        { id: "1581094271901-8022df4466f9", cap: "Listing photo (oak)" },
        { id: "1556909114-f6e7ad7d3136", cap: "Received (pine)" },
        { id: "1581092335397-9583eb92d232", cap: "Stitching close-up" },
        { id: "1503602642458-232111445657", cap: "Size comparison" },
      ] },
      { kind: "texts", tag: "Etsy messaging", texts: [
        { dir: "out", text: "Item is different from listing. Wrong wood, wrong size." },
        { dir: "in", text: "Variations are normal in handmade. Final sale." },
        { dir: "out", text: "Filing Etsy case. Listing was specific." },
      ] },
      { kind: "handbook", tag: "Etsy case denial", documentTitle: "Etsy Case 4218", sectionTitle: "Denial", bodyParagraphs: [
        "Case filed 03/24/2026. Denied 04/15/2026.",
        "Reason: 'Seller's variation in handmade work was reasonable.'",
        "Appeal denied 04/22/2026.",
      ], highlight: "Etsy denial allows direct lawsuit under UDAP.", footer: "Etsy case outcome" },
    ],
  },

  defenses: {
    h2: { pre: "Common seller ", em: "defenses", post: ", with rebuttals." },
    lede: "Three arguments cover most cases.",
    items: [
      { quote: "Handmade items vary.", pill: "Most common", rebuttal: "<strong>Rebuttal:</strong> listing specified materials and dimensions. 'Variation' doesn't mean materially different. Photos comparing listing to received establish the discrepancy." },
      { quote: "Custom orders are final sale.", pill: "Final sale", rebuttal: "<strong>Rebuttal:</strong> 'final sale' doesn't override state UDAP. If seller misrepresented, the sale's finality doesn't bar recovery." },
      { quote: "We're a small Etsy shop.", pill: "Small business", rebuttal: "<strong>Rebuttal:</strong> state UDAP applies to all sellers including small businesses. Size doesn't excuse violations." },
    ],
  },

  outcomes: {
    h2: { pre: "How much do buyers ", em: "actually recover", post: "?" },
    lede: "Most via Etsy case; small claims as backup.",
    bands: [
      { label: "Low", range: "$50 to $300", body: "<strong>Etsy refund only.</strong>", tier: "low" },
      { label: "Mid", range: "$300 to $1,500", body: "<strong>Refund + multiplier.</strong> When Etsy denied.", tier: "mid" },
      { label: "High", range: "$1,500 to $5,000", body: "<strong>Larger custom orders.</strong> With UDAP multiplier.", tier: "high" },
    ],
  },

  stateSection: null,

  alternatives: {
    h2: { pre: "What are the ", em: "alternatives", post: " to small claims?" },
    lede: "Etsy case first; chargeback second; small claims third.",
    cards: [
      { title: "Etsy case system", pillLabel: "Free, fast", pillTier: "primary", whenItFits: "any Etsy purchase dispute. Resolves within 30 days.", tradeoff: "Etsy decides; not always favorable." },
      { title: "Credit card chargeback", pillLabel: "Free", pillTier: "good", whenItFits: "credit card purchase within chargeback window.", tradeoff: "issuer decides." },
      { title: "Small claims (this guide)", pillLabel: "When others fail", pillTier: "warn", whenItFits: "Etsy denied. UDAP claim.", tradeoff: "30 to 90 day timeline." },
    ],
  },

  cta: {
    h2: { pre: "Recover the ", em: "purchase price", post: "." },
    body: "Etsy case first. If denied, demand letter and small claims under UDAP.",
    receipt: { label: "example · custom order misrepresented", items: [
      { label: "Refund", amount: "$800" },
      { label: "UDAP multiplier", amount: "+ $400" },
      { label: "Filing fee + interest", amount: "+ $200" },
    ], total: "$1,400", totalLabel: "Total claim", note: "Illustrative. Etsy case resolves most." },
  },

  faqs: [
    { q: "Should I file an Etsy case or sue?", a: "Etsy case first. Free, fast, often resolves. If denied, then small claims under UDAP." },
    { q: "How do I file an Etsy case?", a: "Go to order details → 'Help with order' → start a case. Etsy mediates; resolution typically 30 days." },
    { q: "What about handmade variation?", a: "Listings often specify materials, dimensions, and features. 'Variation' applies to small differences, not material misrepresentation. Photos comparing establish the discrepancy." },
    { q: "Can I sue Etsy directly?", a: "Generally no. Etsy is a marketplace. Sue the third-party seller." },
    { q: "What if seller refuses any communication?", a: "Etsy case is the leverage point. After denial, certified-mail demand to seller's business address. Most respond at this stage." },
    { q: "How long do I have to sue?", a: "Breach of contract: 4 to 6 years. UDAP: 2 to 4 years." },
    { q: "Are custom orders harder to dispute?", a: "Slightly. 'Custom' allows variation; 'made-to-order' allows interpretation. But material misrepresentation is still actionable. Listing specifics are decisive." },
  ],

  relatedSlugs: ["online-seller-general", "amazon-seller", "ebay-seller", "facebook-marketplace", "venmo-cashapp-scam", "fedex-package"],
};
