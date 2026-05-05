import type { RefundIssue } from "./types";

export const defectiveProduct: RefundIssue = {
  slug: "defective-product",
  ready: true,
  short: "Defective product",
  breadcrumbLabel: "Defective Product",

  meta: { title: "Can I Sue for a Defective Product? Small Claims Guide", description: "Plain-English guide to recovering for defective products. Federal Magnuson-Moss Warranty Act, state UDAP, implied warranty of merchantability, and a demand-letter template." },

  hero: {
    eyebrowSuffix: "Defective product",
    h1: { pre: "Can I sue for a ", em: "defective product", post: "?" },
    leadStrong: "Yes. Federal warranty law plus state UDAP both apply.",
    leadBody: " A defective product violates the implied warranty of merchantability and possibly the manufacturer's express warranty. The federal Magnuson-Moss Warranty Act (15 U.S.C. § 2301) extends federal court enforcement to any written warranty. State UDAP statutes add 2x or 3x multipliers. Recovery is refund or replacement value, plus often attorney fees if you hire one.",
  },

  counter: { amount: 1800, meta: "Magnuson-Moss + state UDAP", rows: [
    { label: "Refund or replacement value", value: "$1,200" },
    { label: "UDAP multiplier (2x)", value: "+ $400", emphasis: "accent" },
    { label: "Filing fee + interest", value: "$200", emphasis: "muted" },
  ], footer: "Sample · within most state small-claims caps" },

  whatCounts: {
    h2: { pre: "What kinds of ", em: "defective product", post: " disputes can you sue for?" },
    lede: "Four common patterns.",
    cards: [
      { num: "01", title: "Item doesn't work as advertised", body: "Implied warranty of merchantability covers this. Item must be 'fit for ordinary purpose'. Failure within reasonable time is breach." },
      { num: "02", title: "Hidden defects discovered after purchase", body: "Latent defects not visible at purchase. Most state laws extend warranty for reasonable time after discovery, even after returns expired." },
      { num: "03", title: "Manufacturer warranty refused", body: "Manufacturer denies warranty claim. Magnuson-Moss requires written warranties be honored as written. Plus state UDAP for refusal." },
      { num: "04", title: "Counterfeit or seriously misrepresented item", body: "Item is fake or significantly different from listing. Federal trademark law plus state UDAP both apply." },
    ],
    note: { strongIntro: "Implied warranty of merchantability is automatic.", rest: " Most state laws require products to be 'fit for ordinary purpose' for a reasonable time. This warranty is automatic on most consumer purchases regardless of any 'as is' clause. Defective products break the warranty regardless of disclaimer." },
  },

  claim: {
    h2: { pre: "How much can you ", em: "claim", post: "?" },
    lede: "Refund or replacement value plus UDAP multiplier.",
    layers: [
      { tag: "Layer 1", title: "Refund or replacement value", body: "Original price plus shipping. If you can't return, replacement cost.", amount: "$1,200" },
      { tag: "Layer 2", title: "UDAP multiplier", body: "State UDAP statutes add 2x or 3x for willful violations.", amount: "+ $400", accent: true },
      { tag: "Layer 3", title: "Filing fees, interest, attorney fees", body: "Filing fee, service-of-process cost, pre-judgment interest. Magnuson-Moss shifts attorney fees to manufacturer if you win.", amount: "+ $200" },
    ],
    total: { label: "Sample total within small-claims cap", body: "$1,200 refund plus 2x UDAP, plus filing fee.", amount: "$1,800", sublabel: "illustrative · varies by state" },
  },

  demand: {
    h2: { pre: "Send a ", em: "demand letter", post: " first." },
    lede: "Demand letters work especially well for defective products because Magnuson-Moss makes the warranty explicit.",
    checklist: ["Original purchase record", "Manufacturer warranty terms", "Photos and documentation of defect", "Repair or replacement quotes", "A 14-day deadline", "Sent certified mail to manufacturer or retailer"],
    letter: { certifiedNum: "7019 0140 0001 4827 3637", date: "May 5, 2026", recipientName: "Acme Manufacturer Inc.", recipientAddress: "1424 Industrial Way, Phoenix, AZ 85003", reLine: "Demand for Defective Product Refund Under Magnuson-Moss Warranty Act", bodyParagraphs: [
      "On March 14, 2026, I purchased [product] for $1,200. The product failed within 30 days due to defective manufacturing (photos and inspection report attached). Your warranty refused refund.",
      "Pursuant to the <strong>Magnuson-Moss Warranty Act (15 U.S.C. § 2301)</strong> and <strong>Arizona Consumer Fraud Act § 44-1521</strong>, I demand within <strong>fourteen (14) days</strong>:",
    ], demandList: [
      "Refund of <strong>$1,200</strong> in purchase price plus shipping;",
      "UDAP statutory damages of <strong>$400</strong>.",
    ], closingLine: "Total demand: <strong>$1,600.00</strong>. If unresolved, I will file in Small Claims Court and pursue Magnuson-Moss attorney fees.", signatory: "Reese Q. Customer" },
  },

  fileSteps: {
    h2: { pre: "How to ", em: "file", post: " a defective product case." },
    lede: "Four steps.",
    steps: [
      { title: "Document the defect", body: "Photos at multiple angles. Video showing the defect in action. Get a repair shop's report if applicable." },
      { title: "Try retailer/manufacturer first", body: "Most resolve at customer service. Document the refusal." },
      { title: "Send certified-mail demand", body: "Cite Magnuson-Moss + state UDAP. Most settle to avoid attorney fee shifting." },
      { title: "File in small claims", body: "Damages within state cap. Sue retailer or manufacturer (or both)." },
    ],
    aftermath: { tag: "After you win", title: "Collecting from a manufacturer.", bodyHtml: "Manufacturers are major corporations with assets. Money judgments enforce easily. Most pay quickly to avoid PR exposure." },
  },

  evidence: {
    h2: { pre: "What evidence do you need ", em: "for a defective product case", post: "?" },
    lede: "Purchase record, defect documentation, and warranty terms establish the case.",
    cells: [
      { kind: "letter", tag: "Purchase record", letterhead: "Bank · Account 1234", date: "March 14, 2026", recipientName: "Reese Customer", reLine: "Purchase from Acme Manufacturer", bodyParagraphs: [
        "Charge $1,200 to Acme Manufacturer Inc.",
        "Product: [product description]",
        "Manufacturer warranty: 1 year (per receipt).",
      ], signatory: "Bank platform record", signatoryTitle: "Charge confirmed" },
      { kind: "photos", tag: "Defect photos", photos: [
        { id: "1581094271901-8022df4466f9", cap: "Defect (close-up)" },
        { id: "1556909114-f6e7ad7d3136", cap: "Defect in operation" },
        { id: "1581092335397-9583eb92d232", cap: "Listing photo (working)" },
        { id: "1503602642458-232111445657", cap: "Manual / serial number" },
      ] },
      { kind: "handbook", tag: "Magnuson-Moss + Implied Warranty", documentTitle: "15 U.S.C. § 2301 (Magnuson-Moss) + UCC § 2-314 (implied warranty)", sectionTitle: "Federal warranty + state implied warranty", bodyParagraphs: [
        "Magnuson-Moss: Federal court enforcement of any written warranty. Attorney fees shifted to losing manufacturer.",
        "UCC § 2-314: Implied warranty of merchantability — products must be fit for ordinary purpose.",
      ], highlight: "Item failed within 30 days. Both Magnuson-Moss and implied warranty apply. UDAP multiplier adds.", footer: "Federal + state law combined" },
      { kind: "receipt", tag: "Repair shop assessment", vendor: "ACME APPLIANCE REPAIR", vendorAddr: "License #38291", receiptNum: "Quote #2026-218", date: "04/15/2026", lineItems: [
        { label: "Diagnostic of defect", amount: "$50" },
        { label: "Defective at manufacture, not repairable", amount: "—" },
        { label: "Replacement value", amount: "$1,200" },
      ], subtotal: "$1,200", total: "$1,200", footer: "Defect confirmed by independent shop" },
    ],
  },

  defenses: {
    h2: { pre: "Common manufacturer ", em: "defenses", post: ", with rebuttals." },
    lede: "Three arguments cover most cases.",
    items: [
      { quote: "Buyer caused the damage.", pill: "Most common", rebuttal: "<strong>Rebuttal:</strong> bring the repair shop's report. Manufacturing defects are usually distinguishable from user damage by inspection." },
      { quote: "Warranty doesn't cover that.", pill: "Warranty exclusion", rebuttal: "<strong>Rebuttal:</strong> implied warranty of merchantability applies regardless of express warranty exclusions. Most state laws prohibit waiving merchantability for consumer goods." },
      { quote: "Item was sold 'as is'.", pill: "As-is sale", rebuttal: "<strong>Rebuttal:</strong> 'as is' may waive express warranty but not implied warranty in many states. Plus 'as is' doesn't override Magnuson-Moss for written warranties." },
    ],
  },

  outcomes: {
    h2: { pre: "How much do customers ", em: "actually recover", post: "?" },
    lede: "Typical recovery ranges.",
    bands: [
      { label: "Low", range: "$50 to $300", body: "<strong>Refund or replacement.</strong>", tier: "low" },
      { label: "Mid", range: "$300 to $2,500", body: "<strong>Refund + UDAP.</strong>", tier: "mid" },
      { label: "High", range: "$2,500 to $20,000+", body: "<strong>Larger purchases + multipliers.</strong>", tier: "high" },
    ],
  },

  stateSection: null,

  alternatives: {
    h2: { pre: "What are the ", em: "alternatives", post: " to small claims?" },
    lede: "Manufacturer warranty first; chargeback; small claims as backup.",
    cards: [
      { title: "Manufacturer warranty claim", pillLabel: "Free, official", pillTier: "primary", whenItFits: "manufacturer offers warranty service.", tradeoff: "manufacturer decides; not always favorable." },
      { title: "Credit card chargeback", pillLabel: "Free, fast", pillTier: "good", whenItFits: "credit card purchase within window.", tradeoff: "issuer decides." },
      { title: "Small claims (this guide)", pillLabel: "When others fail", pillTier: "warn", whenItFits: "warranty denied or doesn't apply. UDAP claim.", tradeoff: "30 to 90 day timeline." },
    ],
  },

  cta: {
    h2: { pre: "Recover the ", em: "purchase price", post: "." },
    body: "Manufacturer warranty first; demand letter; small claims under Magnuson-Moss + state UDAP.",
    receipt: { label: "example · defective appliance", items: [
      { label: "Refund or replacement", amount: "$1,200" },
      { label: "UDAP multiplier", amount: "+ $400" },
      { label: "Filing fee + interest", amount: "+ $200" },
    ], total: "$1,800", totalLabel: "Total claim", note: "Illustrative. Major appliances or vehicles push higher." },
  },

  faqs: [
    { q: "Can I sue for a defective product?", a: "Yes. Federal Magnuson-Moss Warranty Act + state implied warranty + state UDAP all apply. Recovery is refund or replacement value, plus often attorney fees." },
    { q: "What is implied warranty of merchantability?", a: "Common-law (codified in UCC § 2-314) requirement that products be 'fit for ordinary purpose'. Automatic on most consumer purchases. Cannot be waived for consumer goods in most states." },
    { q: "What is Magnuson-Moss?", a: "Federal law (15 U.S.C. § 2301) that creates federal court enforcement of any written warranty. Attorney fees shifted to losing manufacturer. Particularly powerful for warranty cases." },
    { q: "What if the item was sold 'as is'?", a: "'As is' may waive express warranty but not implied warranty in many states. Most state consumer protection laws prevent waiving implied warranty on consumer goods." },
    { q: "Should I sue the retailer or manufacturer?", a: "Both. Retailer is liable for breach of contract and implied warranty. Manufacturer is liable under Magnuson-Moss for written warranty. Sue both to ensure recovery." },
    { q: "How long do I have to sue?", a: "UCC implied warranty: 4 years. State UDAP: 2 to 4 years. Magnuson-Moss: usually 4 years. Move fast: documentation strongest soon after defect discovered." },
    { q: "What about returning the item?", a: "Most state UDAP laws and implied warranty allow refund without return if item is unsafe or defective. If returnable, return for refund. Magnuson-Moss usually requires reasonable cooperation." },
  ],

  relatedSlugs: ["refund-general", "gym-membership", "dry-cleaner", "salon-or-hairdresser", "services-not-rendered"],
};
