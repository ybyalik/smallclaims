import type { RefundIssue } from "./types";

export const dryCleaner: RefundIssue = {
  slug: "dry-cleaner",
  ready: true,
  short: "Dry cleaner damage",
  breadcrumbLabel: "Dry Cleaner Damage",

  meta: { title: "Can I Sue a Dry Cleaner for Ruining My Clothes?", description: "Plain-English guide to recovering from a dry cleaner for damaged clothes. Bailment law, replacement-value damages, and a demand-letter template." },

  hero: {
    eyebrowSuffix: "Dry cleaner damage",
    h1: { pre: "Can I sue a dry cleaner for ", em: "ruining my clothes", post: "?" },
    leadStrong: "Yes. Bailment law presumes the cleaner was negligent.",
    leadBody: " Dry cleaners hold your clothes as bailees. When clothes come back damaged or shrunk, bailment law presumes negligence; the cleaner has to prove they were not at fault. Many cleaners post 'not responsible for damage' signs that are unenforceable in most states. Recovery is replacement value of the items.",
  },

  counter: { amount: 800, meta: "Bailment law + presumption of negligence", rows: [
    { label: "Replacement value of items", value: "$500" },
    { label: "Recovery costs", value: "+ $100", emphasis: "accent" },
    { label: "Filing fee", value: "$200", emphasis: "muted" },
  ], footer: "Sample · within most state small-claims caps" },

  whatCounts: {
    h2: { pre: "What kinds of ", em: "dry cleaner damage", post: " can you sue for?" },
    lede: "Four common patterns.",
    cards: [
      { num: "01", title: "Item shrunk or damaged", body: "Heat-damaged silk, shrunk wool, color-bleed onto white items, broken zippers, lost buttons. Photos of damage establish the case." },
      { num: "02", title: "Item lost or never returned", body: "Cleaner can't find your item. Receipt + claim ticket establishes you brought it. Replacement value recoverable." },
      { num: "03", title: "Item returned with stains or damage from cleaning chemicals", body: "Stains, fading, fabric damage from improper cleaning. Care label + cleaner's failure to follow it = case." },
      { num: "04", title: "Refund refused despite obvious damage", body: "Cleaner refuses to refund or replace despite visible damage. Bailment law's presumption applies regardless of refusal." },
    ],
    note: { strongIntro: "Disclaimer signs are usually unenforceable.", rest: " Signs like 'not responsible for damage' or 'limit liability to $50' are routinely struck down by courts. State consumer-protection laws prohibit pre-loss waivers of negligence liability. The bailment relationship cannot be disclaimed by sign." },
  },

  claim: {
    h2: { pre: "How much can you ", em: "claim", post: "?" },
    lede: "Replacement value plus filing fees.",
    layers: [
      { tag: "Layer 1", title: "Replacement value", body: "Current cost to replace the item at the same quality. Receipts of original purchase plus current retail prices.", amount: "$500" },
      { tag: "Layer 2", title: "Recovery costs", body: "Cleaning the damaged item, alterations to other clothes that no longer match, etc.", amount: "+ $100", accent: true },
      { tag: "Layer 3", title: "Filing fees, interest", body: "Filing fee, service-of-process cost, pre-judgment interest.", amount: "+ $200" },
    ],
    total: { label: "Sample total within small-claims cap", body: "Replacement value of damaged items plus filing fee.", amount: "$800", sublabel: "illustrative · varies by item" },
  },

  demand: {
    h2: { pre: "Send a ", em: "demand letter", post: " first." },
    lede: "Demand letters work because most cleaners' insurance handles disputes.",
    checklist: ["Cleaning ticket / receipt", "Photos of damage", "Original purchase receipts", "Replacement quotes", "A 14-day deadline", "Sent certified mail"],
    letter: { certifiedNum: "7019 0140 0001 4827 3635", date: "May 5, 2026", recipientName: "Acme Dry Cleaners", recipientAddress: "1424 Main Street, Phoenix, AZ 85003", reLine: "Demand for Replacement of Damaged Clothing", bodyParagraphs: [
      "On March 14, 2026, I dropped off two items at your store (claim ticket attached). At pickup 03/22, the silk blouse was visibly damaged with heat marks and color bleed. The wool dress shrunk one full size.",
      "Replacement values: blouse $200 (receipt attached), dress $300 (receipt attached). Per common-law bailment, I demand within <strong>fourteen (14) days</strong>:",
    ], demandList: [
      "Reimbursement of <strong>$500</strong> in replacement value;",
      "Reimbursement of <strong>$100</strong> in recovery costs.",
    ], closingLine: "Total demand: <strong>$600.00</strong>. If unresolved, I will file in Small Claims Court.", signatory: "Reese Q. Customer" },
  },

  fileSteps: {
    h2: { pre: "How to ", em: "file", post: " a dry cleaner case." },
    lede: "Four steps. Bailment law makes these cases easy to win.",
    steps: [
      { title: "Document damage at pickup", body: "Photos before driving away. Don't take damaged items home and discover later — courts respect contemporaneous photos most." },
      { title: "Get replacement quotes", body: "Receipts of original purchase if available. Current retail prices for replacement. Two quotes are stronger." },
      { title: "Send certified-mail demand", body: "Most cleaners' GL insurance settles within 30 days." },
      { title: "Hearing", body: "Lead with photos and receipts. Bailment presumption shifts burden to cleaner. Hearings 10 to 15 minutes." },
    ],
    aftermath: { tag: "After you win", title: "Collecting from a cleaner.", bodyHtml: "Most cleaners have GL insurance. Money judgments enforce via <strong>judgment lien</strong>, <strong>bank levy</strong>, and <strong>writ of execution</strong>." },
  },

  evidence: {
    h2: { pre: "What evidence do you need ", em: "for a dry cleaner case", post: "?" },
    lede: "Cleaning ticket, photos, and receipts establish the case.",
    cells: [
      { kind: "letter", tag: "Cleaning ticket", letterhead: "Acme Dry Cleaners · Ticket #82218", date: "March 14, 2026", recipientName: "Reese Customer", reLine: "Drop-off ticket", bodyParagraphs: [
        "Items: 1 silk blouse (cream), 1 wool dress (navy).",
        "Drop-off: 03/14/2026 09:30. Pickup ready: 03/22/2026.",
        "Cleaning method: dry-clean per care label.",
      ], signatory: "Acme Dry Cleaners", signatoryTitle: "Drop-off ticket" },
      { kind: "photos", tag: "Damage photos", photos: [
        { id: "1581094271901-8022df4466f9", cap: "Silk blouse heat damage" },
        { id: "1556909114-f6e7ad7d3136", cap: "Color bleed pattern" },
        { id: "1581092335397-9583eb92d232", cap: "Wool dress shrunk" },
        { id: "1503602642458-232111445657", cap: "Comparison: original size" },
      ] },
      { kind: "handbook", tag: "Bailment standard", documentTitle: "Restatement (Second) of Torts · § 519", sectionTitle: "Bailee for hire · presumption of negligence", bodyParagraphs: [
        "When goods are delivered to a bailee for hire in good condition and returned in damaged condition, a presumption of negligence arises. The bailee bears the burden of proving they exercised reasonable care.",
      ], highlight: "Items delivered undamaged 03/14. Returned damaged 03/22. Cleaner must prove non-negligence.", footer: "Bailment law applies to dry cleaners" },
      { kind: "receipt", tag: "Replacement value receipts", vendor: "ORIGINAL PURCHASES", vendorAddr: "Documenting replacement value", receiptNum: "Combined", date: "Various", lineItems: [
        { label: "Silk blouse (Brooks Brothers, replacement)", amount: "$200" },
        { label: "Wool dress (Banana Republic, replacement)", amount: "$300" },
        { label: "Cleaning service (refunded)", amount: "$0" },
      ], subtotal: "$500", total: "$500", footer: "Replacement values · originals destroyed" },
    ],
  },

  defenses: {
    h2: { pre: "Common cleaner ", em: "defenses", post: ", with rebuttals." },
    lede: "Three arguments cover most cases.",
    items: [
      { quote: "Sign says we're not responsible.", pill: "Most common", rebuttal: "<strong>Rebuttal:</strong> disclaimer signs are unenforceable. State consumer-protection laws prohibit pre-loss waivers of negligence." },
      { quote: "Damage was already there.", pill: "Preexisting", rebuttal: "<strong>Rebuttal:</strong> bring photos of items at drop-off if you have them, or evidence of recent purchase showing items were undamaged." },
      { quote: "Care label was wrong; we cleaned per label.", pill: "Care label", rebuttal: "<strong>Rebuttal:</strong> cleaners are professional bailees expected to know that some labels are conservative. If the label said 'dry-clean only' and the cleaner damaged the item via dry cleaning, the cleaner's responsibility." },
    ],
  },

  outcomes: {
    h2: { pre: "How much do customers ", em: "actually recover", post: "?" },
    lede: "Most cases recover full replacement value.",
    bands: [
      { label: "Low", range: "$50 to $300", body: "<strong>Single damaged item.</strong>", tier: "low" },
      { label: "Mid", range: "$300 to $1,500", body: "<strong>Multiple items + recovery costs.</strong>", tier: "mid" },
      { label: "High", range: "$1,500 to $5,000", body: "<strong>Wedding dress, designer items, large lots.</strong>", tier: "high" },
    ],
  },

  stateSection: null,

  alternatives: {
    h2: { pre: "What are the ", em: "alternatives", post: " to small claims?" },
    lede: "Demand letter usually resolves dry cleaner cases.",
    cards: [
      { title: "Demand letter", pillLabel: "Free, often effective", pillTier: "primary", whenItFits: "documented damage. Most cleaners' GL insurance settles.", tradeoff: "no enforcement if ignored." },
      { title: "BBB complaint", pillLabel: "Public pressure", pillTier: "good", whenItFits: "small business with reputation concerns.", tradeoff: "no enforcement; reputation only." },
      { title: "Small claims (this guide)", pillLabel: "When demand fails", pillTier: "warn", whenItFits: "demand failed. Bailment law makes these easy.", tradeoff: "30 to 90 day timeline." },
    ],
  },

  cta: {
    h2: { pre: "Recover the ", em: "replacement value", post: "." },
    body: "Demand letters with photos and replacement-value documentation usually settle. Bailment law makes these straightforward.",
    receipt: { label: "example · damaged silk + wool", items: [
      { label: "Replacement value", amount: "$500" },
      { label: "Recovery costs", amount: "+ $100" },
      { label: "Filing fee", amount: "+ $200" },
    ], total: "$800", totalLabel: "Total claim", note: "Illustrative. Designer or wedding items push higher." },
  },

  faqs: [
    { q: "Can I sue a dry cleaner for damaging my clothes?", a: "Yes. Bailment law presumes negligence when items are returned damaged. The cleaner has to prove they were not at fault. Recovery is replacement value." },
    { q: "What about disclaimer signs?", a: "Disclaimer signs are usually unenforceable. State consumer-protection laws prohibit pre-loss waivers of negligence liability. Disclaimers don't bar recovery." },
    { q: "How do I prove the value of damaged items?", a: "Original purchase receipts ideally. Without those, current retail prices for similar items. Photos of items help establish quality and condition before damage." },
    { q: "What if the care label was wrong?", a: "Cleaners are professionals. They're expected to know when care labels are conservative or when an item shouldn't be cleaned a particular way. Care label issues rarely shift liability away from the cleaner." },
    { q: "How long do I have to sue?", a: "Negligence and bailment claims usually run 2 to 4 years from the date of damage." },
    { q: "Should I file BBB complaint?", a: "Yes for added pressure. Many cleaners care about online reputation. BBB complaint creates public record. Use alongside demand letter." },
    { q: "What if cleaner says they'll refund cleaning cost only?", a: "Refund of cleaning cost only doesn't cover replacement value. Negotiate or sue for full replacement. State UDAP applies if they refuse documented damage claim." },
  ],

  relatedSlugs: ["refund-general", "gym-membership", "salon-or-hairdresser", "defective-product", "services-not-rendered"],
};
