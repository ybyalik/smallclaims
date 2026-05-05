import type { OnlineSellerIssue } from "./types";

export const fedexPackage: OnlineSellerIssue = {
  slug: "fedex-package",
  ready: true,
  short: "FedEx package",
  breadcrumbLabel: "FedEx Package",

  meta: { title: "Can I Sue FedEx for a Lost, Damaged, or Stolen Package?", description: "Plain-English guide to recovering from FedEx for lost, damaged, or stolen packages. Carmack Amendment, default $100 liability, declared-value protection, and a demand-letter template." },

  hero: {
    eyebrowSuffix: "FedEx package",
    h1: { pre: "Can I sue FedEx for a ", em: "lost, damaged, or stolen package", post: "?" },
    leadStrong: "Yes, but the federal Carmack Amendment limits recovery.",
    leadBody: " Federal law (Carmack Amendment, 49 U.S.C. § 14706) governs interstate carrier liability. The default for most FedEx shipments is $100 per package unless declared value protection was purchased. For packages with declared value, full replacement up to declared amount. Stolen packages have additional theft considerations. Small claims is appropriate when the loss is within your state's cap.",
  },

  counter: { amount: 1200, meta: "Carmack Amendment + declared value", rows: [
    { label: "Declared-value claim (with declaration)", value: "$800" },
    { label: "Filing fee + interest", value: "$200", emphasis: "muted" },
    { label: "Default $100 (without declaration)", value: "$100", emphasis: "accent" },
  ], footer: "Sample · within most state small-claims caps" },

  whatCounts: {
    h2: { pre: "What kinds of ", em: "FedEx claims", post: " can you sue for?" },
    lede: "Three common patterns. Carmack governs interstate; state law for intrastate.",
    cards: [
      { num: "01", title: "Lost package", body: "Package never arrived. Tracking shows no movement or shows delivered to wrong address. FedEx claim process first; small claims if denied or undervalued." },
      { num: "02", title: "Damaged package", body: "Package arrived damaged. Photos at unboxing establish damage during shipping. FedEx claims usually accept; recovery limited by declared value." },
      { num: "03", title: "Stolen package (porch pirate)", body: "Package marked delivered but taken from doorstep. Police report establishes theft. FedEx liability ends at delivery; recovery may require police investigation." },
      { num: "04", title: "Damaged or lost high-value items (with declared value)", body: "If you purchased declared-value protection, full replacement up to declared amount. Without declaration, $100 default. Document the declared value at shipment." },
    ],
    note: { strongIntro: "Carmack Amendment is federal law.", rest: " Interstate shipments are governed by Carmack. Default liability is $100/package. Declared value (extra cost) increases coverage. Read FedEx terms carefully. State law governs intrastate shipments." },
  },

  claim: {
    h2: { pre: "How much can you ", em: "claim", post: "?" },
    lede: "Carmack Amendment caps recovery. Document declared value carefully.",
    layers: [
      { tag: "Layer 1", title: "Declared value (if purchased)", body: "Full replacement up to declared amount. Receipt establishing the declared value at shipment.", amount: "$800" },
      { tag: "Layer 2", title: "Default $100 limit (Carmack)", body: "Without declared value, FedEx liability is $100 per package. Federal law caps regardless of actual value.", amount: "$100" },
      { tag: "Layer 3", title: "Filing fees, interest", body: "Filing fee, service-of-process cost, pre-judgment interest.", amount: "+ $200" },
    ],
    total: { label: "Sample total", body: "Declared value $800 plus filing fee. Without declaration, capped at $100.", amount: "$1,200", sublabel: "illustrative · varies by declaration" },
  },

  demand: {
    h2: { pre: "Send a ", em: "demand letter", post: " after FedEx claim fails." },
    lede: "FedEx claim process is required first. After denial, demand letter and small claims.",
    checklist: ["Tracking number", "Shipping receipt with declared value", "Photos of damage if applicable", "FedEx claim outcome", "A 14-day deadline", "Sent certified mail to FedEx claims department"],
    letter: { certifiedNum: "7019 0140 0001 4827 3632", date: "May 5, 2026", recipientName: "FedEx Corporate", recipientAddress: "942 South Shady Grove Road, Memphis, TN 38120", reLine: "Demand for Damaged Package #82218 Tracking #4218456789", bodyParagraphs: [
      "On March 14, 2026, I shipped a package via FedEx (tracking #4218456789) with declared value of $800. Package arrived damaged 03/22/2026 (photos attached). I filed FedEx claim 03/24/2026; denied 04/15/2026.",
      "Pursuant to <strong>Carmack Amendment, 49 U.S.C. § 14706</strong>, I demand within <strong>fourteen (14) days</strong>:",
    ], demandList: [
      "Reimbursement of <strong>$800</strong> in declared value (per shipping receipt);",
      "Reimbursement of <strong>$200</strong> in filing fee and interest.",
    ], closingLine: "Total demand: <strong>$1,000.00</strong>. If unresolved, I will file in Small Claims Court.", signatory: "Reese Q. Sender" },
  },

  fileSteps: {
    h2: { pre: "How to ", em: "file", post: " a FedEx case." },
    lede: "Four steps. FedEx claim first; small claims as backup.",
    steps: [
      { title: "File FedEx claim", body: "Required first step under Carmack Amendment. File at fedex.com/claims. Resolution typically 30 to 90 days." },
      { title: "Document declared value", body: "Original shipping receipt showing declared value. Without it, the $100 cap applies." },
      { title: "Send certified-mail demand", body: "Cite Carmack Amendment. Most cases settle to avoid court." },
      { title: "File in small claims", body: "If demand fails, file. FedEx is a national company; service via registered agent in your state." },
    ],
    aftermath: { tag: "After you win", title: "Collecting from FedEx.", bodyHtml: "FedEx is a major corporation with assets. Money judgments enforce easily. Most settle to avoid PR exposure and pattern-of-claims documentation." },
  },

  evidence: {
    h2: { pre: "What evidence do you need ", em: "for a FedEx case", post: "?" },
    lede: "Tracking, shipping receipt, and damage photos establish the case.",
    cells: [
      { kind: "letter", tag: "Tracking record", letterhead: "FedEx · Tracking #4218456789", date: "March 14-22, 2026", recipientName: "Reese Sender", reLine: "Shipment record", bodyParagraphs: [
        "Shipped: 03/14/2026 from Phoenix to Atlanta.",
        "Service: FedEx 2Day. Declared value: $800.",
        "Status: Delivered 03/22/2026, recipient noted 'damaged'.",
      ], signatory: "FedEx tracking record", signatoryTitle: "Shipment confirmed" },
      { kind: "photos", tag: "Damage photos", photos: [
        { id: "1581094271901-8022df4466f9", cap: "Box damage" },
        { id: "1556909114-f6e7ad7d3136", cap: "Item damage inside" },
        { id: "1581092335397-9583eb92d232", cap: "Original packaging" },
        { id: "1503602642458-232111445657", cap: "Comparison" },
      ] },
      { kind: "handbook", tag: "Carmack Amendment", documentTitle: "49 U.S.C. § 14706", sectionTitle: "Carrier liability", bodyParagraphs: [
        "Liability of carriers for loss or damage to interstate shipments. Default coverage is $100 per package; declared value protection extends coverage up to declared amount.",
      ], highlight: "Declared value $800 establishes carrier liability. Federal law preempts state law for interstate shipments.", footer: "Carmack Amendment · federal carrier law" },
      { kind: "receipt", tag: "Shipping receipt", vendor: "FEDEX SHIP CENTER", vendorAddr: "Phoenix · 03/14/2026", receiptNum: "Receipt #82218", date: "03/14/2026", lineItems: [
        { label: "FedEx 2Day shipment", amount: "$45" },
        { label: "Declared value $800", amount: "+ $8" },
        { label: "Total cost of shipment", amount: "$53" },
      ], subtotal: "$53.00", total: "$53.00", footer: "Declared value documented at shipment" },
    ],
  },

  defenses: {
    h2: { pre: "Common FedEx ", em: "defenses", post: ", with rebuttals." },
    lede: "Three arguments cover most cases.",
    items: [
      { quote: "Liability is limited to $100.", pill: "Most common", rebuttal: "<strong>Rebuttal:</strong> bring the shipping receipt showing declared value of $800. Declared value purchased at shipment overrides the default $100 cap. The receipt is decisive." },
      { quote: "Damage was caused by inadequate packaging.", pill: "Packaging", rebuttal: "<strong>Rebuttal:</strong> photos of original packaging and the damage. If packaging meets FedEx's published guidelines, FedEx is responsible for damage during transit." },
      { quote: "Recipient signed for damage.", pill: "Receipt waiver", rebuttal: "<strong>Rebuttal:</strong> 'damaged' notation on delivery preserves the claim. FedEx's terms allow concealed-damage claims for 60 days post-delivery for inspection." },
    ],
  },

  outcomes: {
    h2: { pre: "How much do shippers ", em: "actually recover", post: "?" },
    lede: "Recovery limited by declared value. Most settle through FedEx claims.",
    bands: [
      { label: "Low", range: "$50 to $300", body: "<strong>Default $100 cap (no declaration).</strong>", tier: "low" },
      { label: "Mid", range: "$300 to $2,500", body: "<strong>Declared value claim.</strong> Up to declared amount.", tier: "mid" },
      { label: "High", range: "$2,500 to $20,000+", body: "<strong>High-declared-value items.</strong> Full replacement up to declared amount.", tier: "high" },
    ],
  },

  stateSection: null,

  alternatives: {
    h2: { pre: "What are the ", em: "alternatives", post: " to small claims?" },
    lede: "FedEx claim first; small claims as backup.",
    cards: [
      { title: "FedEx claim process", pillLabel: "Free, required first", pillTier: "primary", whenItFits: "any FedEx shipment loss or damage. File at fedex.com/claims.", tradeoff: "FedEx decides; capped by declared value." },
      { title: "Credit card chargeback (for purchases)", pillLabel: "Free, fast", pillTier: "good", whenItFits: "credit card purchase that was lost or damaged in shipping. Some cards extend purchase protection.", tradeoff: "issuer decides." },
      { title: "Small claims (this guide)", pillLabel: "When FedEx denies", pillTier: "warn", whenItFits: "FedEx claim denied or undervalued. Damages within state cap.", tradeoff: "30 to 90 day timeline. Carmack governs interstate." },
    ],
  },

  cta: {
    h2: { pre: "Recover the ", em: "shipment loss", post: "." },
    body: "FedEx claim first. If denied, demand letter and small claims under Carmack Amendment.",
    receipt: { label: "example · damaged FedEx package", items: [
      { label: "Declared value claim", amount: "$800" },
      { label: "Filing fee + interest", amount: "+ $200" },
      { label: "(Default $100 cap without declaration)", amount: "—" },
    ], total: "$1,000", totalLabel: "Total claim", note: "Illustrative. Carmack Amendment caps recovery; declare valuable items." },
  },

  faqs: [
    { q: "Can I sue FedEx for a lost or damaged package?", a: "Yes, but recovery is limited by the Carmack Amendment. Default liability is $100 per package; declared value protection (extra cost at shipment) increases coverage. File FedEx claim first; small claims if denied." },
    { q: "What is declared value?", a: "Optional protection purchased at shipment that increases FedEx's liability up to the declared amount. Without declaration, $100 cap applies. Always declare value for items worth more than $100." },
    { q: "What is the Carmack Amendment?", a: "Federal law (49 U.S.C. § 14706) governing interstate carrier liability for loss or damage. Default coverage is $100 per package; declared value increases coverage. Federal law preempts state law for interstate shipments." },
    { q: "What about porch pirates?", a: "Once FedEx delivers (recipient signature or door-tag delivery), their liability ends. Stolen packages from porches are theft. File police report; some renters/homeowners insurance covers stolen packages." },
    { q: "Can I sue FedEx for damage from poor handling?", a: "Yes if your packaging met published guidelines. FedEx is liable for damage during transit. Photos of original packaging compared to damaged box establish carrier responsibility." },
    { q: "How long do I have to file?", a: "FedEx claim: 9 months from shipment for most claims. Lawsuit after FedEx denial: 2 years. Move fast; concealed-damage claims have 60-day window." },
    { q: "Can I sue for lost shipping cost?", a: "Limited. FedEx claim refunds shipping cost on lost packages but not always on damaged ones. Small claims can recover shipping under breach of contract for non-delivery cases." },
  ],

  relatedSlugs: ["online-seller-general", "amazon-seller", "ebay-seller", "etsy-seller", "facebook-marketplace", "venmo-cashapp-scam"],
};
