import type { OnlineSellerIssue } from "./types";

export const facebookMarketplace: OnlineSellerIssue = {
  slug: "facebook-marketplace",
  ready: true,
  short: "Facebook Marketplace seller",
  breadcrumbLabel: "Facebook Marketplace",

  meta: { title: "Can I Sue a Facebook Marketplace Seller for Scamming Me?", description: "Plain-English guide to suing a Facebook Marketplace seller. No platform protection — direct UDAP claim. Police reports + small claims. Demand-letter template." },

  hero: {
    eyebrowSuffix: "Facebook Marketplace seller",
    h1: { pre: "Can I sue a ", em: "Facebook Marketplace seller", post: "?" },
    leadStrong: "Yes. Facebook has no buyer protection — direct UDAP claim required.",
    leadBody: " Unlike Amazon or eBay, Facebook Marketplace has no platform-level buyer protection program. If the seller scams you, your options are: (1) credit card chargeback for online payments; (2) police report for theft (especially in-person scams); (3) small claims under state consumer-protection laws. The seller's profile and contact info from Facebook are usually enough to identify and serve them.",
  },

  counter: { amount: 1800, meta: "State UDAP + breach of contract", rows: [
    { label: "Refund of purchase price", value: "$1,200" },
    { label: "UDAP multiplier (2x)", value: "+ $400", emphasis: "accent" },
    { label: "Filing fee + interest", value: "$200", emphasis: "muted" },
  ], footer: "Sample · within most state small-claims caps" },

  whatCounts: {
    h2: { pre: "What kinds of ", em: "Facebook Marketplace fraud", post: " can you sue for?" },
    lede: "Four common patterns. No platform protection means small claims is often necessary.",
    cards: [
      { num: "01", title: "Item never arrived (online sale)", body: "Paid via Venmo or Cash App; item never shipped or delivered. Most common pattern. Seller's Facebook profile usually identifies them; their address can be obtained through the platform's records." },
      { num: "02", title: "Item significantly misrepresented", body: "In-person sale where item was different from listing. Photos at meetup compared to listing establish misrepresentation." },
      { num: "03", title: "Counterfeit or stolen items", body: "Item turns out to be fake, stolen, or with hidden defects. Photos plus expert opinion (where applicable) establish the case. Stolen items also trigger police involvement." },
      { num: "04", title: "Bait-and-switch", body: "Listing showed one item; seller delivered different one. Documentation of listing (screenshots) plus delivered item establishes the case." },
    ],
    note: { strongIntro: "Facebook has no buyer protection.", rest: " Unlike Amazon, eBay, and Etsy, Facebook Marketplace has no built-in protection program. Your protections come from credit card chargebacks (if paid by card), state UDAP statutes (small claims), and police reports (for clear theft)." },
  },

  claim: {
    h2: { pre: "How much can you ", em: "claim", post: "?" },
    lede: "Refund plus UDAP multiplier plus filing fees.",
    layers: [
      { tag: "Layer 1", title: "Refund of purchase price", body: "Item cost. Bank record or Venmo/Zelle receipt establishes amount paid.", amount: "$1,200" },
      { tag: "Layer 2", title: "UDAP multiplier", body: "State UDAP statutes add 2x or 3x for willful violations. Most marketplace fraud cases qualify.", amount: "+ $400", accent: true },
      { tag: "Layer 3", title: "Filing fees, interest", body: "Filing fee, service-of-process cost, pre-judgment interest.", amount: "+ $200" },
    ],
    total: { label: "Sample total within small-claims cap", body: "$1,200 refund plus 2x UDAP, plus filing fee.", amount: "$1,800", sublabel: "illustrative · Facebook has no platform alternative" },
  },

  demand: {
    h2: { pre: "Send a ", em: "demand letter", post: " first." },
    lede: "Demand letters work especially well because Facebook sellers know they have no platform shield.",
    checklist: ["Listing screenshots", "Payment records (Venmo/Zelle/Cash App or bank)", "Communications with seller", "Photos of item received vs. listing", "Police report (if theft)", "Seller's Facebook profile info", "A 14-day deadline", "Sent certified mail to seller address"],
    letter: { certifiedNum: "7019 0140 0001 4827 3629", date: "May 5, 2026", recipientName: "Jordan Seller", recipientAddress: "1424 Maple Lane, Phoenix, AZ 85003", reLine: "Demand for Refund of Misrepresented Marketplace Item", bodyParagraphs: [
      "On March 14, 2026, I purchased an item from your Facebook Marketplace listing for $1,200. The listing showed [item] (screenshots attached). The item delivered was materially different (photos attached). My Venmo records show the $1,200 payment.",
      "Pursuant to <strong>Arizona Consumer Fraud Act § 44-1521</strong>, I demand within <strong>fourteen (14) days</strong>:",
    ], demandList: [
      "Refund of <strong>$1,200</strong> in purchase price;",
      "UDAP statutory damages of <strong>$400</strong>.",
    ], closingLine: "Total demand: <strong>$1,600.00</strong>. If unresolved, I will file in Small Claims Court and report to local police.", signatory: "Reese Q. Buyer" },
  },

  fileSteps: {
    h2: { pre: "How to ", em: "file", post: " against a Marketplace seller." },
    lede: "Four steps. No platform layer; direct to demand and small claims.",
    steps: [
      { title: "Try credit card chargeback first (if applicable)", body: "If paid by credit card or PayPal, file chargeback within 60 to 120 days. Often the fastest recovery for online payments." },
      { title: "File police report (for clear theft)", body: "If the seller took your money and gave you nothing, that's theft. Police reports create record. Some states track Marketplace fraud as a pattern." },
      { title: "Send certified-mail demand", body: "Use seller's Facebook info to identify; lookup public records for address. Most settle to avoid court." },
      { title: "File in small claims", body: "Damages within state cap. Subpoena Facebook for seller info if needed." },
    ],
    aftermath: { tag: "After you win", title: "Collecting from a Marketplace seller.", bodyHtml: "Money judgments enforce via <strong>judgment lien</strong>, <strong>bank levy</strong>, and <strong>writ of execution</strong>. Marketplace sellers sometimes use false names; subpoena Facebook for true identity if needed." },
  },

  evidence: {
    h2: { pre: "What evidence do you need ", em: "for a Marketplace case", post: "?" },
    lede: "Listing screenshot, payment record, and item photos establish the case.",
    cells: [
      { kind: "letter", tag: "Listing screenshot", letterhead: "Facebook Marketplace · Listing ID 82218", date: "March 14, 2026", recipientName: "Reese Buyer", reLine: "Listing description and photos", bodyParagraphs: [
        "Listing title: '[Item description as advertised]'",
        "Price: $1,200",
        "Photos in listing: [details].",
        "Seller name: Jordan Seller",
        "Listing screenshot saved 03/14/2026.",
      ], signatory: "Listing screenshot", signatoryTitle: "Saved at time of purchase" },
      { kind: "photos", tag: "Listing vs. received", photos: [
        { id: "1581094271901-8022df4466f9", cap: "Listing photo (advertised)" },
        { id: "1556909114-f6e7ad7d3136", cap: "Received item (different)" },
        { id: "1581092335397-9583eb92d232", cap: "Comparison" },
        { id: "1503602642458-232111445657", cap: "Detail discrepancy" },
      ] },
      { kind: "texts", tag: "Messenger conversation", texts: [
        { dir: "out", text: "Want the [item] for $1,200. Sending Venmo." },
        { dir: "in", text: "Sounds good, sending shipping info." },
        { dir: "out", text: "Item arrived. This is not what you advertised." },
        { dir: "in", text: "All sales final." },
      ] },
      { kind: "receipt", tag: "Venmo payment", vendor: "VENMO PLATFORM", vendorAddr: "@reesebuyer to @jordanseller", receiptNum: "Transaction record", date: "03/14/2026", lineItems: [
        { label: "Sent to @jordanseller", amount: "$1,200" },
        { label: "Note: 'For Marketplace purchase'", amount: "(memo)" },
      ], subtotal: "$1,200", total: "$1,200", footer: "Payment confirmed · seller identified" },
    ],
  },

  defenses: {
    h2: { pre: "Common seller ", em: "defenses", post: ", with rebuttals." },
    lede: "Three arguments cover most cases.",
    items: [
      { quote: "All sales final on Marketplace.", pill: "Most common", rebuttal: "<strong>Rebuttal:</strong> 'all sales final' doesn't override state UDAP. Misrepresentation is actionable regardless of the seller's policy." },
      { quote: "You saw it before buying.", pill: "Inspection", rebuttal: "<strong>Rebuttal:</strong> bring the listing screenshot. The listing represents what was advertised. Buyer's prior inspection doesn't negate seller misrepresentation in the listing." },
      { quote: "I'm not a real seller, just a person.", pill: "Casual seller", rebuttal: "<strong>Rebuttal:</strong> state UDAP applies to anyone who sells, including casual sellers. Selling on Facebook makes them a 'seller' under UDAP regardless of business status." },
    ],
  },

  outcomes: {
    h2: { pre: "How much do buyers ", em: "actually recover", post: "?" },
    lede: "Recovery depends on identifying the seller.",
    bands: [
      { label: "Low", range: "$50 to $500", body: "<strong>Chargeback only.</strong> If credit card was used. No other platform protection.", tier: "low" },
      { label: "Mid", range: "$500 to $2,500", body: "<strong>Refund + UDAP multiplier.</strong> Most common when seller is identifiable.", tier: "mid" },
      { label: "High", range: "$2,500 to $20,000+", body: "<strong>Larger purchases.</strong> Cap-of-court when fraud is willful and seller has assets.", tier: "high" },
    ],
  },

  stateSection: null,

  alternatives: {
    h2: { pre: "What are the ", em: "alternatives", post: " to small claims?" },
    lede: "No platform layer. Use chargebacks, police reports, and small claims.",
    cards: [
      { title: "Credit card chargeback", pillLabel: "Free, fast", pillTier: "primary", whenItFits: "credit card purchase within 60-120 days. Federal Reg E protection.", tradeoff: "issuer decides." },
      { title: "Police report (for theft)", pillLabel: "Free, criminal angle", pillTier: "good", whenItFits: "clear theft (paid for nothing). Police reports create record useful for both criminal and civil cases.", tradeoff: "criminal cases focus on punishment, not recovery." },
      { title: "Small claims (this guide)", pillLabel: "For monetary recovery", pillTier: "warn", whenItFits: "seller identifiable and damages within cap. UDAP claim with multiplier.", tradeoff: "30 to 90 day timeline. Identifying anonymous sellers harder." },
    ],
  },

  cta: {
    h2: { pre: "Recover from a ", em: "Marketplace seller", post: "." },
    body: "Use chargebacks first; small claims under UDAP for the rest.",
    receipt: { label: "example · misrepresented Marketplace listing", items: [
      { label: "Refund of purchase price", amount: "$1,200" },
      { label: "UDAP multiplier", amount: "+ $400" },
      { label: "Filing fee + interest", amount: "+ $200" },
    ], total: "$1,800", totalLabel: "Total claim", note: "Illustrative. Identifying anonymous sellers is the main challenge." },
  },

  faqs: [
    { q: "Does Facebook Marketplace have buyer protection?", a: "No. Unlike Amazon, eBay, and Etsy, Facebook Marketplace has no platform-level buyer protection program. Your protections come from credit card chargebacks, state UDAP, and police reports for theft." },
    { q: "What if I paid via Venmo or Cash App?", a: "P2P payments don't have chargeback rights like credit cards. Recovery limited to small claims (state UDAP) and police report for theft. Document the seller's identity." },
    { q: "How do I identify an anonymous seller?", a: "Subpoena Facebook for seller info if necessary. Most state small-claims courts can subpoena platform records. Public records search using the seller's name often produces address." },
    { q: "Should I file a police report?", a: "For clear theft (paid for nothing), yes. Police reports create record. Some jurisdictions track Marketplace fraud patterns and may pursue. Criminal investigation often produces civil settlement." },
    { q: "Can I sue Facebook directly?", a: "Generally no. Facebook is a platform, not the seller. Section 230 of the federal Communications Decency Act protects platforms from most third-party content liability." },
    { q: "What if seller is in another state?", a: "Out-of-state sellers can be sued in your home state if they 'purposefully availed' themselves of your state's market (selling to your state, advertising there). Cross-state cases are slightly harder but doable." },
    { q: "How long do I have to sue?", a: "State UDAP: 2 to 4 years. Breach of contract: 4 to 6 years. Move fast: identifying sellers gets harder over time and Facebook's records may not be retained indefinitely." },
  ],

  relatedSlugs: ["online-seller-general", "amazon-seller", "ebay-seller", "etsy-seller", "venmo-cashapp-scam", "fedex-package"],
};
