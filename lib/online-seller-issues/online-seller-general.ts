import type { OnlineSellerIssue } from "./types";

export const onlineSellerGeneral: OnlineSellerIssue = {
  slug: "online-seller-general",
  ready: true,
  short: "Online seller (general)",
  breadcrumbLabel: "Online Seller",

  meta: {
    title: "Can I Sue an Online Seller? Small Claims Guide",
    description: "Plain-English guide to suing an online seller. Platform protection programs, state consumer-protection laws, and a demand-letter template.",
  },

  hero: {
    eyebrowSuffix: "Online seller",
    h1: { pre: "Can I sue an ", em: "online seller", post: "?" },
    leadStrong: "Yes, but try the platform's protection program first.",
    leadBody:
      " Most online platforms (Amazon, eBay, Etsy, PayPal) have buyer-protection programs that resolve disputes faster than court. Try those first. If the platform's program fails (or doesn't exist), state consumer-protection laws (UDAP statutes) apply with 2x or 3x multipliers in many states. Small claims is the right court when damages are within your state's cap.",
  },

  counter: {
    amount: 1800,
    meta: "State UDAP + breach of contract",
    rows: [
      { label: "Refund of purchase price", value: "$1,200" },
      { label: "UDAP multiplier (2x)", value: "+ $400", emphasis: "accent" },
      { label: "Filing fee + interest", value: "$200", emphasis: "muted" },
    ],
    footer: "Sample · within most state small-claims caps",
  },

  whatCounts: {
    h2: { pre: "What kinds of ", em: "online seller disputes", post: " can you sue for?" },
    lede: "Four common patterns. Each is recoverable under breach of contract or UDAP.",
    cards: [
      { num: "01", title: "Item never shipped or arrived", body: "You paid; nothing arrived. Tracking shows no movement, or shows delivered to wrong address. Most platforms have buyer protection for this. State law also makes it actionable as breach of contract." },
      { num: "02", title: "Item significantly different from listing", body: "Item arrives but is materially different (condition, size, brand, function). Photos showing the discrepancy are the case. Most platforms refund 'item not as described'." },
      { num: "03", title: "Defective or damaged item", body: "Item arrived damaged or stops working immediately. Most platforms offer return/refund within 30 days. Beyond that, state UDAP and warranty claims apply." },
      { num: "04", title: "Refused refund despite valid reason", body: "Seller refuses to refund despite legitimate return or valid claim. Platform mediation usually resolves; if not, small claims under UDAP." },
    ],
    note: { strongIntro: "Use the platform first.", rest: " Amazon A-to-z guarantee, eBay Money Back Guarantee, Etsy case system, and PayPal Buyer Protection all resolve disputes faster than court. Try the platform program first. If it fails, then the demand letter and small claims." },
  },

  claim: {
    h2: { pre: "How much can you ", em: "claim", post: "?" },
    lede: "Refund or replacement cost is the floor. UDAP multiplier and shipping costs stack on top.",
    layers: [
      { tag: "Layer 1", title: "Refund or replacement", body: "The purchase price plus shipping. If you can return the item, the refund is straightforward. If you cannot (damaged, lost), full purchase price.", amount: "$1,200" },
      { tag: "Layer 2", title: "Statutory multiplier", body: "State UDAP statutes add 2x or 3x for willful violations. Most online seller cases qualify when seller refuses legitimate refund.", amount: "+ $400", accent: true },
      { tag: "Layer 3", title: "Filing fees, interest, return shipping", body: "Filing fee, return shipping you paid, pre-judgment interest at your state's legal rate.", amount: "+ $200" },
    ],
    total: { label: "Sample total within small-claims cap", body: "$1,200 refund plus 2x UDAP multiplier, plus filing fee.", amount: "$1,800", sublabel: "illustrative · varies by state" },
  },

  demand: {
    h2: { pre: "Send a ", em: "demand letter", post: " first." },
    lede: "Demand letters work after platform programs fail. Many sellers settle once they realize state UDAP applies.",
    checklist: ["Order/transaction details", "Photos of item received vs. listing", "Communications with seller", "Platform claim outcome (if applicable)", "State UDAP statute citation", "A 14-day deadline", "Sent certified mail to seller's business address"],
    letter: {
      certifiedNum: "7019 0140 0001 4827 3625",
      date: "May 5, 2026",
      recipientName: "Acme Online Sales",
      recipientAddress: "1424 Commerce Way, Phoenix, AZ 85003",
      reLine: "Demand for Refund of Defective Product Order #82218",
      bodyParagraphs: [
        "On March 14, 2026, I purchased a [product] from your store for $1,200 (transaction record attached). The item arrived damaged and inoperable. I requested a refund through your platform's process; you refused.",
        "Pursuant to <strong>Arizona Consumer Fraud Act § 44-1521</strong> (UDAP), I demand within <strong>fourteen (14) days</strong>:",
      ],
      demandList: [
        "Refund of <strong>$1,200</strong> in purchase price plus shipping;",
        "UDAP statutory damages of <strong>$400</strong> (2x for willful violation).",
      ],
      closingLine: "Total demand: <strong>$1,600.00</strong>. If unresolved, I will file in Small Claims Court and report to the Arizona Attorney General Consumer Protection Division.",
      signatory: "Reese Q. Buyer",
    },
  },

  fileSteps: {
    h2: { pre: "How to ", em: "file", post: " an online-seller case." },
    lede: "Four steps. Platform first; then demand letter; then small claims.",
    steps: [
      { title: "Use the platform's protection program", body: "Amazon A-to-z, eBay Money Back Guarantee, Etsy case, PayPal Buyer Protection. Free, fast, often resolves the dispute. Document the platform claim outcome." },
      { title: "Send certified-mail demand", body: "Cite state UDAP. Most sellers settle to avoid court and AG complaints." },
      { title: "File state AG complaint", body: "State attorneys general's consumer protection divisions take complaints free of charge. Pattern complaints get pursued." },
      { title: "File in small claims", body: "If platform, demand, and AG complaint don't resolve, file. Filing fees usually run $30 to $100. Lead with photos and platform records." },
    ],
    aftermath: { tag: "After you win", title: "Collecting from an online seller.", bodyHtml: "Money judgments enforce via <strong>judgment lien</strong>, <strong>bank levy</strong>, and <strong>writ of execution</strong>. Cross-state online sellers may require sheriff service. State AG complaint filings often produce additional pressure." },
  },

  evidence: {
    h2: { pre: "What evidence do you need ", em: "to sue an online seller", post: "?" },
    lede: "Order record, photos, and platform claim outcome establish the case.",
    cells: [
      { kind: "letter", tag: "Order record", letterhead: "Online Platform · Order #82218", date: "March 14, 2026", recipientName: "Reese Buyer", reLine: "Order confirmation", bodyParagraphs: [
        "Order placed 03/14/2026 from Acme Online Sales.",
        "Item: [product]. Price: $1,200. Shipping: $40.",
        "Status: Delivered 03/22/2026. Damaged on arrival.",
      ], signatory: "Platform record", signatoryTitle: "Order confirmation" },
      { kind: "photos", tag: "Damaged item photos", photos: [
        { id: "1581094271901-8022df4466f9", cap: "Damaged item (front)" },
        { id: "1556909114-f6e7ad7d3136", cap: "Damaged item (close-up)" },
        { id: "1581092335397-9583eb92d232", cap: "Listing photo (compare)" },
        { id: "1503602642458-232111445657", cap: "Box damage" },
      ] },
      { kind: "texts", tag: "Seller refused refund", texts: [
        { dir: "out", text: "Item arrived damaged. Need to return for refund." },
        { dir: "in", text: "Sale is final. We don't accept returns on these items." },
        { dir: "out", text: "Listing said 30-day returns. Filing platform claim." },
      ] },
      { kind: "handbook", tag: "State UDAP statute", documentTitle: "Arizona Revised Statutes · § 44-1521", sectionTitle: "Consumer Fraud Act", bodyParagraphs: [
        "It is unlawful for any person to use any deception, deceptive or unfair act or practice in connection with the sale of any merchandise.",
      ], highlight: "Refusing legitimate return + ignoring stated return policy = UDAP violation.", footer: "Arizona Consumer Fraud Act · 2x damages available" },
    ],
  },

  defenses: {
    h2: { pre: "Common seller ", em: "defenses", post: ", with rebuttals." },
    lede: "Three arguments cover most cases.",
    items: [
      { quote: "All sales final. We're a small business.", pill: "Most common", rebuttal: "<strong>Rebuttal:</strong> 'all sales final' clauses don't override state UDAP. Most state laws require sellers to honor advertised return policies. Even without one, defective items have implied warranty claims." },
      { quote: "You damaged it during shipping.", pill: "Buyer caused damage", rebuttal: "<strong>Rebuttal:</strong> bring photos of the box and item on arrival. Damaged box + damaged item = shipping damage; that's seller's responsibility. Photos taken at unboxing are decisive." },
      { quote: "It's not really damaged. You're being unreasonable.", pill: "Subjectivity", rebuttal: "<strong>Rebuttal:</strong> bring photos comparing the listing to the actual item. Material discrepancy between listing and delivered item is objective. State UDAP focuses on whether the seller misled, not on subjective satisfaction." },
    ],
  },

  outcomes: {
    h2: { pre: "How much do buyers ", em: "actually recover", post: "?" },
    lede: "Most cases recover full refund through platform programs or demand letters.",
    bands: [
      { label: "Low", range: "$50 to $500", body: "<strong>Refund only.</strong> Platform program returns the purchase price.", tier: "low" },
      { label: "Mid", range: "$500 to $2,500", body: "<strong>Refund + UDAP multiplier.</strong> Most common when small claims is needed and willful violation is found.", tier: "mid" },
      { label: "High", range: "$2,500 to $20,000+", body: "<strong>Cap-of-court awards.</strong> Larger purchases (electronics, vehicles, equipment) with UDAP multiplier.", tier: "high" },
    ],
  },

  stateSection: null,

  alternatives: {
    h2: { pre: "What are the ", em: "alternatives", post: " to small claims?" },
    lede: "Platform programs are the fastest path. State AG for systemic issues.",
    cards: [
      { title: "Platform protection program", pillLabel: "Free, fast", pillTier: "primary", whenItFits: "any major platform sale (Amazon, eBay, Etsy, PayPal). Resolution within days to weeks. No court needed.", tradeoff: "platform decides; not always favorable." },
      { title: "State Attorney General", pillLabel: "Free, regulatory", pillTier: "good", whenItFits: "systemic deceptive practices. AGs pursue patterns of fraud across multiple buyers.", tradeoff: "AGs prioritize patterns over individual cases." },
      { title: "Small claims (this guide)", pillLabel: "When others fail", pillTier: "warn", whenItFits: "platform refused or doesn't apply. UDAP claim with multiplier.", tradeoff: "30 to 90 day timeline. Cross-state seller cases harder." },
    ],
  },

  cta: {
    h2: { pre: "Recover the ", em: "purchase price", post: "." },
    body: "Use platform protection first; then demand letter; then small claims.",
    receipt: { label: "example · damaged purchase", items: [
      { label: "Refund of purchase price", amount: "$1,200" },
      { label: "UDAP multiplier (2x)", amount: "+ $400" },
      { label: "Filing fee + interest", amount: "+ $200" },
    ], total: "$1,800", totalLabel: "Total claim", note: "Illustrative. Larger purchases push higher; platform protection covers most cases." },
  },

  faqs: [
    { q: "Should I use the platform's protection program first?", a: "Yes, almost always. Amazon A-to-z, eBay Money Back Guarantee, Etsy case, and PayPal Buyer Protection resolve disputes faster than court. Try those first. If they fail, then demand letter and small claims." },
    { q: "What if the seller is in another state?", a: "Out-of-state sellers can be sued in your home state if they 'purposefully availed' themselves of your state's market (selling to your state, advertising there). Most online sellers meet this. Service may require sheriff in their state." },
    { q: "What is UDAP?", a: "Unfair and Deceptive Acts and Practices: state consumer-protection laws prohibiting deceptive business practices. Most states have UDAP statutes with 2x or 3x damage multipliers and attorney fee-shifting. Online seller fraud is a common UDAP claim." },
    { q: "Can I file with my credit card chargeback instead?", a: "Yes, often the fastest path. Credit cards have chargeback rights for 60 to 120 days. PayPal has its own dispute system. Use chargebacks for quick resolution; small claims for cases the chargeback doesn't cover." },
    { q: "What if the seller is overseas?", a: "International sellers are very hard to sue. Use the platform program (most platforms have buyer protection covering international sellers). Credit card chargebacks also work. Direct lawsuits against international sellers usually don't succeed." },
    { q: "How long do I have to sue?", a: "State UDAP claims usually run 2 to 4 years. Breach of contract: 4 to 6 years. Move fast: pre-suit demand letter timing affects multipliers." },
    { q: "Will my chargeback or platform claim affect the seller?", a: "Yes. Chargebacks and platform disputes affect the seller's processing fees and account standing. Pattern of disputes can result in seller-account termination. Both create real leverage." },
  ],

  relatedSlugs: ["amazon-seller", "ebay-seller", "etsy-seller", "facebook-marketplace", "venmo-cashapp-scam", "fedex-package"],
};
