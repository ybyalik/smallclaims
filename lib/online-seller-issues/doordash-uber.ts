import type { OnlineSellerIssue } from "./types";

export const doordashUber: OnlineSellerIssue = {
  slug: "doordash-uber",
  ready: true,
  short: "DoorDash / Uber / Uber Eats",
  breadcrumbLabel: "DoorDash / Uber",

  meta: { title: "Can I Sue DoorDash, Uber, or Uber Eats?", description: "Plain-English guide to suing gig services. TOS arbitration clauses are the biggest barrier. When small claims fits and when arbitration applies." },

  hero: {
    eyebrowSuffix: "DoorDash / Uber",
    h1: { pre: "Can I sue ", em: "DoorDash, Uber, or Uber Eats", post: "?" },
    leadStrong: "Sometimes. Arbitration clauses in their terms often block lawsuits.",
    leadBody: " Most gig services include forced-arbitration clauses in their terms of service. These clauses require disputes to be arbitrated rather than litigated. Small claims is one of the few exceptions: most arbitration clauses carve out small-claims cases. So if your damages fit your state's cap, you can usually still sue. For larger cases, arbitration is usually required.",
  },

  counter: { amount: 800, meta: "Small-claims carve-out from arbitration", rows: [
    { label: "Refund of order", value: "$80" },
    { label: "UDAP multiplier (10x for small)", value: "+ $500", emphasis: "accent" },
    { label: "Filing fee + interest", value: "$200", emphasis: "muted" },
  ], footer: "Sample · within most state small-claims caps" },

  whatCounts: {
    h2: { pre: "What gig service ", em: "disputes", post: " can you sue for?" },
    lede: "Four common patterns. Watch for arbitration clauses.",
    cards: [
      { num: "01", title: "Order never delivered", body: "Order shows delivered but you didn't receive it. Most apps refund through customer service. Small claims as backup if app refuses." },
      { num: "02", title: "Wrong item or significantly missing items", body: "Driver delivered wrong item or order missing significant portion. Most apps offer credits or refunds. Small claims if denied." },
      { num: "03", title: "Driver damaged your property", body: "Driver scratched your car, damaged the package, or caused property damage during pickup. Negligence claim against driver and company." },
      { num: "04", title: "Customer service refused legitimate refund", body: "App's customer service refused refund despite valid claim. Small-claims under state UDAP for the amount plus multipliers." },
    ],
    note: { strongIntro: "Read the TOS arbitration clause.", rest: " Most major gig services (DoorDash, Uber, Uber Eats, Grubhub) require disputes to go to arbitration. Small claims is usually carved out (you can still sue in small claims). Class actions and other higher-court cases are usually blocked." },
  },

  claim: {
    h2: { pre: "How much can you ", em: "claim", post: "?" },
    lede: "Refund plus UDAP multiplier. Most cases are small.",
    layers: [
      { tag: "Layer 1", title: "Refund of order", body: "Cost of the order including delivery fees. App records establish the amount.", amount: "$80" },
      { tag: "Layer 2", title: "UDAP multiplier", body: "State UDAP statutes add 2x or 3x for willful violations. For small purchases, multiplier disproportionately large.", amount: "+ $500", accent: true },
      { tag: "Layer 3", title: "Filing fees, interest", body: "Filing fee, service-of-process cost, pre-judgment interest.", amount: "+ $200" },
    ],
    total: { label: "Sample total", body: "Refund plus UDAP multiplier (often disproportionate to small order amount).", amount: "$800", sublabel: "illustrative · varies by state UDAP" },
  },

  demand: {
    h2: { pre: "Send a ", em: "demand letter", post: " first." },
    lede: "Demand letters work because gig companies want to avoid bad PR. Customer service often resolves at this stage.",
    checklist: ["Order details", "Customer service exchange", "Photos of issue (if applicable)", "State UDAP citation", "A 14-day deadline", "Sent certified mail to company headquarters or registered agent"],
    letter: { certifiedNum: "7019 0140 0001 4827 3631", date: "May 5, 2026", recipientName: "DoorDash Inc.", recipientAddress: "303 2nd Street, San Francisco, CA 94107", reLine: "Demand for Refund of Order #82218", bodyParagraphs: [
      "On March 14, 2026, I placed an order through DoorDash for $80 (order #82218). The order was marked delivered but never arrived (security camera footage attached). DoorDash customer service refused refund despite my reports.",
      "Pursuant to <strong>California Consumer Legal Remedies Act § 1770</strong>, I demand within <strong>fourteen (14) days</strong>:",
    ], demandList: [
      "Refund of <strong>$80</strong> for the order;",
      "UDAP statutory damages of <strong>$500</strong>.",
    ], closingLine: "Total demand: <strong>$580.00</strong>. If unresolved, I will file in Small Claims Court (small-claims carve-out from arbitration agreement).", signatory: "Reese Q. Customer" },
  },

  fileSteps: {
    h2: { pre: "How to ", em: "file", post: " against a gig service." },
    lede: "Four steps. Confirm small-claims carve-out from arbitration.",
    steps: [
      { title: "Try the app's customer service first", body: "Most apps offer credits or refunds for legitimate complaints. Document the customer service exchange." },
      { title: "Send certified-mail demand", body: "Use the company's registered agent address (state secretary of state). Cite the small-claims carve-out from arbitration." },
      { title: "Verify small-claims carve-out", body: "Read the company's TOS section on arbitration. Most exempt small-claims actions." },
      { title: "File in small claims", body: "Filing fees usually $30 to $100. Sue the parent company at their registered agent." },
    ],
    aftermath: { tag: "After you win", title: "Collecting from a gig company.", bodyHtml: "Major gig companies have substantial assets. Money judgments enforce via <strong>judgment lien</strong>, <strong>bank levy</strong>, and <strong>writ of execution</strong>. Most pay quickly to close the matter and avoid pattern-of-disputes documentation." },
  },

  evidence: {
    h2: { pre: "What evidence do you need ", em: "for a gig service case", post: "?" },
    lede: "Order record, customer service exchange, and proof of issue establish the case.",
    cells: [
      { kind: "letter", tag: "Order record", letterhead: "DoorDash · Order #82218", date: "March 14, 2026", recipientName: "Reese Customer", reLine: "Order details", bodyParagraphs: [
        "Restaurant: Acme Kitchen. Total: $80 (food $65, delivery $10, tip $5).",
        "Status: 'Delivered' at 19:30.",
        "Customer reported non-delivery 19:45. CS denied refund.",
      ], signatory: "DoorDash platform record", signatoryTitle: "Order detail" },
      { kind: "texts", tag: "CS exchange", texts: [
        { dir: "out", text: "Order shows delivered but didn't arrive. Have security cam footage." },
        { dir: "in", text: "We see delivery confirmation. Cannot refund." },
        { dir: "out", text: "I have video of porch with no delivery. Need refund." },
      ] },
      { kind: "handbook", tag: "TOS small-claims carve-out", documentTitle: "DoorDash Terms of Service · Section 12.4", sectionTitle: "Arbitration · Small claims exception", bodyParagraphs: [
        "Notwithstanding any other provision, either party may bring an individual action in small claims court for any qualifying disputes. The arbitration provision does not preclude such actions.",
      ], highlight: "Small-claims carve-out preserves right to sue in court for cases within state cap.", footer: "TOS arbitration · standard small-claims exception" },
      { kind: "photos", tag: "Non-delivery footage", photos: [
        { id: "1581094271901-8022df4466f9", cap: "19:30 timestamp · empty porch" },
        { id: "1556909114-f6e7ad7d3136", cap: "19:35 · still empty" },
        { id: "1581092335397-9583eb92d232", cap: "Driver photo (was delivered to wrong unit)" },
        { id: "1503602642458-232111445657", cap: "App marked 'delivered'" },
      ] },
    ],
  },

  defenses: {
    h2: { pre: "Common gig service ", em: "defenses", post: ", with rebuttals." },
    lede: "Three arguments cover most cases.",
    items: [
      { quote: "Arbitration clause requires arbitration.", pill: "Most common", rebuttal: "<strong>Rebuttal:</strong> bring the small-claims carve-out from the TOS. Most major gig services explicitly allow small-claims actions. The clause itself is your authority to sue in small claims." },
      { quote: "Driver photo shows delivery.", pill: "Delivery confirmed", rebuttal: "<strong>Rebuttal:</strong> bring your security camera footage. Driver photo at wrong address doesn't confirm delivery to your address. Photos plus timestamps establish non-delivery." },
      { quote: "We're not responsible for driver actions.", pill: "Driver liability", rebuttal: "<strong>Rebuttal:</strong> driver acts as company's agent for delivery purposes. Company is liable for driver negligence in performing the delivery service. Vicarious liability applies." },
    ],
  },

  outcomes: {
    h2: { pre: "How much do customers ", em: "actually recover", post: "?" },
    lede: "Most cases small. UDAP multiplier helps proportionally.",
    bands: [
      { label: "Low", range: "$30 to $200", body: "<strong>Refund only.</strong> App customer service refunds the order.", tier: "low" },
      { label: "Mid", range: "$200 to $1,500", body: "<strong>Refund + UDAP.</strong> When small claims is needed.", tier: "mid" },
      { label: "High", range: "$1,500 to $10,000+", body: "<strong>Larger property damage.</strong> Driver damaged car or property.", tier: "high" },
    ],
  },

  stateSection: null,

  alternatives: {
    h2: { pre: "What are the ", em: "alternatives", post: " to small claims?" },
    lede: "Customer service first; arbitration second; small claims for cases within carve-out.",
    cards: [
      { title: "App customer service", pillLabel: "Free, fast", pillTier: "primary", whenItFits: "any reasonable complaint. Apps usually credit or refund.", tradeoff: "limited; some claims rejected." },
      { title: "Arbitration", pillLabel: "Required for larger cases", pillTier: "warn", whenItFits: "claim above small-claims cap or beyond carve-out scope.", tradeoff: "filing fees + delays. Often unfavorable terms." },
      { title: "Small claims (this guide)", pillLabel: "Best for individual cases under cap", pillTier: "good", whenItFits: "carve-out applies. Damages within state cap.", tradeoff: "30 to 90 day timeline. Read TOS carefully for carve-out scope." },
    ],
  },

  cta: {
    h2: { pre: "Recover from a ", em: "gig service", post: "." },
    body: "Customer service first; small claims under carve-out. Most cases settle through customer service.",
    receipt: { label: "example · non-delivered DoorDash order", items: [
      { label: "Refund", amount: "$80" },
      { label: "UDAP multiplier", amount: "+ $500" },
      { label: "Filing fee + interest", amount: "+ $200" },
    ], total: "$800", totalLabel: "Total claim", note: "Illustrative. Most cases settle at customer service." },
  },

  faqs: [
    { q: "Can I sue DoorDash, Uber, or Uber Eats in small claims?", a: "Yes, in most cases. Most major gig services include small-claims carve-outs in their arbitration clauses. Read the TOS to confirm. Small-claims actions for cases within your state's cap are usually allowed." },
    { q: "What is forced arbitration?", a: "A clause in TOS requiring disputes to go to a private arbitrator instead of court. Most major gig services include these. Small claims is usually exempt; class actions and most higher-court cases are blocked." },
    { q: "Should I try customer service first?", a: "Yes, almost always. Most app customer service offers credits or refunds for legitimate complaints. Try first; small claims for backup when CS refuses." },
    { q: "What if the driver damaged my car or property?", a: "Negligence claim against the driver and company. Driver acts as company's agent. Vicarious liability applies. The app's GL insurance often covers." },
    { q: "Can I sue for being kicked off the app (driver/customer)?", a: "Limited. TOS gives apps wide discretion to terminate users. State UDAP rarely applies to platform decisions. Specific cases (discrimination, breach of contract) may apply." },
    { q: "How long do I have to sue?", a: "State UDAP: 2 to 4 years. Breach of contract: 4 to 6 years. Move fast: app customer service issues should be raised within days." },
    { q: "What about tip theft (driver case)?", a: "Drivers can sue companies for unpaid tips or wage violations. Cases run as wage-and-hour FLSA claims. See our employer category for those cases." },
  ],

  relatedSlugs: ["online-seller-general", "amazon-seller", "ebay-seller", "etsy-seller", "facebook-marketplace", "venmo-cashapp-scam"],
};
