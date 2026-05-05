import type { OnlineSellerIssue } from "./types";

export const venmoCashappScam: OnlineSellerIssue = {
  slug: "venmo-cashapp-scam",
  ready: true,
  short: "Venmo / Cash App scam",
  breadcrumbLabel: "Venmo / Cash App Scam",

  meta: { title: "Can I Sue Someone for a Venmo or Cash App Scam?", description: "Plain-English guide to recovering from Venmo, Cash App, or Zelle scams. P2P payment limits, Reg E rights, and a demand-letter template." },

  hero: {
    eyebrowSuffix: "Venmo / Cash App scam",
    h1: { pre: "Can I sue someone for a ", em: "Venmo scam", post: "?" },
    leadStrong: "Yes, but recovery is limited because P2P apps have weak protection.",
    leadBody:
      " Venmo, Cash App, Zelle, and similar P2P payment apps don't provide the same protection as credit cards. Federal Reg E covers unauthorized transactions but not authorized scam payments (where you sent money but the seller never delivered). Your options: dispute through the app for unauthorized; small claims for authorized scams. Document the conversation and payment carefully.",
  },

  counter: { amount: 1800, meta: "Reg E + state UDAP + breach of contract", rows: [
    { label: "Refund of scam amount", value: "$1,200" },
    { label: "UDAP multiplier (2x)", value: "+ $400", emphasis: "accent" },
    { label: "Filing fee + interest", value: "$200", emphasis: "muted" },
  ], footer: "Sample · within most state small-claims caps" },

  whatCounts: {
    h2: { pre: "What kinds of ", em: "P2P payment scams", post: " can you sue for?" },
    lede: "Four common patterns.",
    cards: [
      { num: "01", title: "Authorized scam payment", body: "Most common. You sent money for an item or service that never came. Reg E doesn't cover authorized payments, but small claims under UDAP and breach of contract does." },
      { num: "02", title: "Unauthorized account access", body: "Someone hacked your account and sent payments without your knowledge. Reg E covers this. Dispute through the app within 60 days of statement." },
      { num: "03", title: "Friend/family scam (overpayment)", body: "Scammer sends you money 'by mistake' and asks for return. The original payment is later reversed; you've sent the 'return' from your real funds. Small claims under UDAP." },
      { num: "04", title: "Romance / advance-fee scam", body: "Built relationship, then asked for money for travel/emergency/etc. Money never returned. State UDAP plus possibly criminal investigation." },
    ],
    note: { strongIntro: "P2P apps are not credit cards.", rest: " Venmo, Cash App, Zelle don't offer the same buyer protection as credit cards. Reg E protects against unauthorized account access, not authorized scams. Use credit cards for purchases when possible to retain chargeback rights." },
  },

  claim: {
    h2: { pre: "How much can you ", em: "claim", post: "?" },
    lede: "Refund of scam amount plus UDAP multiplier.",
    layers: [
      { tag: "Layer 1", title: "Refund of scam amount", body: "The total you sent to the scammer. Venmo/Cash App/Zelle records establish the amount.", amount: "$1,200" },
      { tag: "Layer 2", title: "UDAP multiplier", body: "State UDAP statutes add 2x or 3x for willful violations. Most scams qualify.", amount: "+ $400", accent: true },
      { tag: "Layer 3", title: "Filing fees, interest", body: "Filing fee, service-of-process cost, pre-judgment interest.", amount: "+ $200" },
    ],
    total: { label: "Sample total within small-claims cap", body: "$1,200 refund plus UDAP multiplier, plus filing fee.", amount: "$1,800", sublabel: "illustrative · varies by amount" },
  },

  demand: {
    h2: { pre: "Send a ", em: "demand letter", post: " first." },
    lede: "Demand letters work when scammer is identifiable. Most ignore but documentation builds the case.",
    checklist: ["Venmo/Cash App/Zelle transaction record", "Scammer's account info and any contact data", "Communications (texts, emails)", "Police report if criminal", "State UDAP citation", "A 14-day deadline", "Sent certified mail to identified address"],
    letter: { certifiedNum: "7019 0140 0001 4827 3630", date: "May 5, 2026", recipientName: "Jordan Scammer", recipientAddress: "1424 Maple Lane, Phoenix, AZ 85003", reLine: "Demand for Refund of Fraudulent P2P Payment", bodyParagraphs: [
      "On March 14, 2026, I sent you $1,200 via Venmo (transaction ID #82218) for the [item or service you promised]. You never delivered. Communications attached.",
      "Pursuant to <strong>Arizona Consumer Fraud Act § 44-1521</strong>, I demand within <strong>fourteen (14) days</strong>:",
    ], demandList: [
      "Refund of <strong>$1,200</strong> in fraudulent payment;",
      "UDAP statutory damages of <strong>$400</strong>.",
    ], closingLine: "Total demand: <strong>$1,600.00</strong>. If unresolved, I will file in Small Claims Court and report to local police.", signatory: "Reese Q. Buyer" },
  },

  fileSteps: {
    h2: { pre: "How to ", em: "file", post: " a P2P scam case." },
    lede: "Four steps. Identifying the scammer is the main challenge.",
    steps: [
      { title: "Dispute through the app first", body: "Venmo, Cash App, Zelle all have dispute processes. Reg E covers unauthorized payments. File within 60 days of statement." },
      { title: "File police report", body: "P2P scams often involve criminal fraud. Police report creates record useful for both criminal and civil cases." },
      { title: "Identify the scammer", body: "Subpoena the platform for account info if needed. Many small-claims courts can issue subpoenas to identify defendants. Public records search using known info." },
      { title: "File in small claims", body: "If scammer identified and damages within cap. UDAP claim with multiplier." },
    ],
    aftermath: { tag: "After you win", title: "Collecting from a scammer.", bodyHtml: "Collection from scammers is hard. Many use stolen identities or move money quickly. After judgment, the enforcement tools are <strong>judgment lien</strong>, <strong>bank levy</strong>, and <strong>writ of execution</strong>. Default judgments are common when scammers don't appear." },
  },

  evidence: {
    h2: { pre: "What evidence do you need ", em: "for a P2P scam case", post: "?" },
    lede: "Transaction record, communications, and scammer identification establish the case.",
    cells: [
      { kind: "letter", tag: "Venmo transaction record", letterhead: "Venmo · @reesebuyer", date: "March 14, 2026", recipientName: "Reese Buyer", reLine: "Transaction #82218", bodyParagraphs: [
        "Sent $1,200 to @jordanscammer.",
        "Note: 'For [item or service]'.",
        "Status: Completed. No reversal possible.",
      ], signatory: "Venmo platform record", signatoryTitle: "Transaction confirmed" },
      { kind: "texts", tag: "Scammer conversation", texts: [
        { dir: "out", text: "Sending $1,200 via Venmo. Will you ship today?" },
        { dir: "in", text: "Yes will ship today. Thanks." },
        { dir: "out", text: "It's been 2 weeks. Where's the item?" },
        { dir: "in", text: "(no response)" },
      ] },
      { kind: "handbook", tag: "P2P payment limits", documentTitle: "Federal Regulation E (15 U.S.C. § 1693)", sectionTitle: "Electronic Fund Transfer Act", bodyParagraphs: [
        "Reg E covers unauthorized electronic fund transfers. Authorized payments (where consumer initiated and approved) are not protected against the recipient's failure to deliver goods or services.",
      ], highlight: "Authorized P2P scams require small claims action. Reg E only covers hacked-account cases.", footer: "Federal Reg E · key limitation" },
      { kind: "receipt", tag: "Police report", vendor: "PHOENIX POLICE DEPARTMENT", vendorAddr: "Filed 03/22/2026", receiptNum: "Report #82218", date: "03/22/2026", lineItems: [
        { label: "Reported Venmo scam", amount: "—" },
        { label: "Loss amount", amount: "$1,200" },
        { label: "Suspect identified by Venmo username", amount: "—" },
      ], subtotal: "—", total: "—", footer: "Police case number documented" },
    ],
  },

  defenses: {
    h2: { pre: "Common scammer ", em: "defenses", post: ", with rebuttals." },
    lede: "Three arguments cover most cases.",
    items: [
      { quote: "I'm not the one who got the money.", pill: "Most common", rebuttal: "<strong>Rebuttal:</strong> Venmo records show the recipient. The recipient is the responsible party. Subpoena the platform for additional info." },
      { quote: "It was a misunderstanding.", pill: "Misunderstanding", rebuttal: "<strong>Rebuttal:</strong> bring the texts. The texts show what was promised and what was paid for. Misunderstanding rarely succeeds when communications are clear." },
      { quote: "You voluntarily sent the money.", pill: "Voluntary", rebuttal: "<strong>Rebuttal:</strong> voluntary payment doesn't make scam acceptable. Misrepresentation invalidates consent. State UDAP applies to misrepresentation regardless of voluntariness." },
    ],
  },

  outcomes: {
    h2: { pre: "How much do buyers ", em: "actually recover", post: "?" },
    lede: "Hard to recover unless scammer is identifiable and has assets.",
    bands: [
      { label: "Low", range: "$0 to $300", body: "<strong>Often nothing.</strong> Scammers often use stolen identities, fake accounts, or move quickly to evade.", tier: "low" },
      { label: "Mid", range: "$300 to $1,500", body: "<strong>Identified scammer.</strong> Default judgment with limited collection.", tier: "mid" },
      { label: "High", range: "$1,500 to $5,000", body: "<strong>Identified scammer with assets.</strong> Larger frauds with attachable assets push higher.", tier: "high" },
    ],
  },

  stateSection: null,

  alternatives: {
    h2: { pre: "What are the ", em: "alternatives", post: " to small claims?" },
    lede: "Platform dispute first; police second; small claims third.",
    cards: [
      { title: "Platform dispute (Venmo/Cash App)", pillLabel: "Free, limited", pillTier: "warn", whenItFits: "unauthorized transaction. Reg E covers hacked accounts.", tradeoff: "doesn't cover authorized scams." },
      { title: "Police report", pillLabel: "Free, criminal angle", pillTier: "good", whenItFits: "clear theft. Police reports create record. Some FBI fraud units pursue patterns.", tradeoff: "criminal cases focus on punishment, not recovery." },
      { title: "Small claims (this guide)", pillLabel: "When scammer identified", pillTier: "warn", whenItFits: "scammer identified and damages within cap. UDAP claim.", tradeoff: "30 to 90 day timeline. Collection from scammers is hard." },
    ],
  },

  cta: {
    h2: { pre: "Recover from a ", em: "P2P scam", post: "." },
    body: "Use platform dispute first; police report; then small claims under UDAP.",
    receipt: { label: "example · Venmo scam", items: [
      { label: "Refund of payment", amount: "$1,200" },
      { label: "UDAP multiplier", amount: "+ $400" },
      { label: "Filing fee + interest", amount: "+ $200" },
    ], total: "$1,800", totalLabel: "Total claim", note: "Illustrative. P2P scams are hard to collect on; many never recover." },
  },

  faqs: [
    { q: "Will Venmo or Cash App refund a scam?", a: "Generally no for authorized payments. Reg E covers unauthorized transactions (hacked accounts) but not scams where you sent money to someone who didn't deliver. Use credit cards for purchases when possible to retain chargeback rights." },
    { q: "What's the difference between authorized and unauthorized?", a: "Authorized = you sent the money on purpose. Unauthorized = someone else accessed your account. Reg E only covers unauthorized. Most P2P scams are 'authorized' even though they're scams." },
    { q: "Should I file a police report?", a: "Yes for clear scams. Police reports create record. Some scams trigger FBI involvement (interstate, large amounts, organized crime). Criminal investigation often produces additional pressure for civil settlement." },
    { q: "How do I identify the scammer?", a: "Subpoena the platform for account holder info. Most small-claims courts can issue subpoenas to identify defendants. Some scammers use stolen identities; investigation may not reach the actual person." },
    { q: "Can I sue the platform?", a: "Generally no. Section 230 of the federal Communications Decency Act protects platforms from most third-party fraud liability. Direct lawsuits against Venmo/Cash App/Zelle for fraud they didn't commit usually don't succeed." },
    { q: "How long do I have to sue?", a: "State UDAP: 2 to 4 years. Federal Reg E disputes: 60 days from statement. Move fast: scammers often clean out accounts and disappear quickly." },
    { q: "What if the scammer is in another state or country?", a: "Cross-state cases are doable but harder. Cross-country cases (international fraud) are very hard. Use platform disputes and credit card chargebacks first; civil action against international scammers rarely succeeds." },
  ],

  relatedSlugs: ["online-seller-general", "amazon-seller", "ebay-seller", "etsy-seller", "facebook-marketplace", "fedex-package"],
};
