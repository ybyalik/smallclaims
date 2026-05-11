import type { RefundIssue } from "./types";

export const salonOrHairdresser: RefundIssue = {
  slug: "salon-or-hairdresser",
  ready: true,
  short: "Salon / hairdresser damage",
  breadcrumbLabel: "Salon / Hairdresser",

  meta: { title: "Can I Sue a Salon or Hairdresser for Ruining My Hair?", description: "Plain-English guide to recovering when a salon or hairdresser damaged your hair. Negligence, professional standards, and a demand-letter template." },

  hero: {
    eyebrowSuffix: "Salon / hairdresser",
    h1: { pre: "Can I sue a salon for ", em: "ruining my hair", post: "?" },
    leadStrong: "Yes. They were careless and didn't meet the standard a professional should.",
    leadBody: " A salon or hairdresser who damaged your hair (chemical burns, breakage, wrong color, severe over-processing) is on the hook for being careless and for failing to do the job to professional standards. You can recover the cost of fixing the damage, possibly hair extensions or wigs, and in extreme cases compensation for emotional distress. Document the damage with photos before and after.",
  },

  counter: { amount: 1800, meta: "Carelessness + failure to meet professional standards", rows: [
    { label: "Corrective treatment costs", value: "$1,200" },
    { label: "Refund of original service", value: "+ $400", emphasis: "accent" },
    { label: "Filing fee", value: "$200", emphasis: "muted" },
  ], footer: "Sample · within most state small-claims caps" },

  whatCounts: {
    h2: { pre: "When can you sue a ", em: "salon", post: "?" },
    lede: "Four common patterns.",
    cards: [
      { num: "01", title: "Chemical burns or scalp damage", body: "Bleach or color burns, blistering, severe scalp irritation. Medical documentation strengthens the case. You'll need to show the stylist did something a careful professional wouldn't." },
      { num: "02", title: "Major hair breakage or damage", body: "Excessive over-processing causing breakage. Hair won't recover with normal care. Cost to fix or replace via extensions/wigs is the recovery." },
      { num: "03", title: "Wrong color or significantly different result", body: "You asked for one thing and got another (e.g., asked for highlights, got full bleach). Cost to fix is recoverable. Most salons offer free correction; lawsuit if they refuse." },
      { num: "04", title: "Allergic reaction from undisclosed chemicals", body: "Salon used a chemical you're allergic to without proper consultation. Medical bills and corrective costs recoverable. Consultation forms establish whether allergies were disclosed." },
    ],
    note: { strongIntro: "Photos at multiple times.", rest: " Before the appointment (your starting hair). Immediately after (the damage). At followup appointments showing healing or worsening. The timeline of photos proves the salon caused the damage." },
  },

  claim: {
    h2: { pre: "How much can you ", em: "claim", post: "?" },
    lede: "Corrective treatments + original service refund + medical (if any).",
    layers: [
      { tag: "Layer 1", title: "Corrective treatment costs", body: "Cost to fix the damage. Specialist hair colorist or scalp specialist consultation plus treatments. Quotes from licensed professionals.", amount: "$1,200" },
      { tag: "Layer 2", title: "Refund of original service", body: "What you paid for the bad service. Plus any medical bills if scalp burns occurred.", amount: "+ $400", accent: true },
      { tag: "Layer 3", title: "Filing fees, interest", body: "Filing fee, service-of-process cost, pre-judgment interest.", amount: "+ $200" },
    ],
    total: { label: "Sample total within small-claims cap", body: "Corrective treatments plus original service refund, plus filing fee.", amount: "$1,800", sublabel: "illustrative · varies by extent" },
  },

  demand: {
    h2: { pre: "Send a ", em: "demand letter", post: " first." },
    lede: "Demand letters work especially well because most salons want to avoid public reviews and reputation damage.",
    checklist: ["Photos before and after", "Receipts for original service and corrections", "Medical records if injury", "Consultation forms (if relevant)", "A 14-day deadline", "Sent certified mail to salon"],
    letter: { certifiedNum: "7019 0140 0001 4827 3636", date: "May 5, 2026", recipientName: "Acme Salon", recipientAddress: "1424 Style Way, Phoenix, AZ 85003", reLine: "Demand for Damages, Hair Damage from March 14 Service", bodyParagraphs: [
      "On March 14, 2026, I received a hair coloring service at your salon for $400 (receipt attached). I asked for highlights only; you applied full bleach and the resulting damage required two corrective treatments at a different salon ($1,200, receipts attached). Photos before, after, and during recovery attached.",
      "Under the <strong>Arizona Consumer Fraud Act (§ 44-1521), the state's consumer-protection law,</strong> I demand within <strong>fourteen (14) days</strong>:",
    ], demandList: [
      "Refund of <strong>$400</strong> in original service;",
      "Reimbursement of <strong>$1,200</strong> in corrective treatments.",
    ], closingLine: "Total demand: <strong>$1,600.00</strong>. If unresolved, I will file in Small Claims Court.", signatory: "Reese Q. Customer" },
  },

  fileSteps: {
    h2: { pre: "How to ", em: "file", post: " a salon case." },
    lede: "Four steps. Photos and corrective treatment quotes are decisive.",
    steps: [
      { title: "Document with photos immediately", body: "Photos at multiple times: before appointment (if available), immediately after damage discovered, during corrective treatment, and after recovery. The timeline proves the salon caused it." },
      { title: "Get corrective treatment quotes", body: "Different salon's quote to fix the damage. Two quotes are stronger." },
      { title: "Send certified-mail demand", body: "Most salons settle to avoid online reviews and reputation damage." },
      { title: "Hearing", body: "Lead with photos, original receipt, corrective treatment receipts. Hearings 10 to 15 minutes." },
    ],
    aftermath: { tag: "After you win", title: "Collecting from a salon.", bodyHtml: "Most salons have business insurance. If they don't pay, you collect using a <strong>judgment lien</strong> (claim on their property), <strong>bank levy</strong> (taking money from their account), or <strong>writ of execution</strong> (court order to seize assets). A complaint to the state cosmetology board adds pressure." },
  },

  evidence: {
    h2: { pre: "What evidence do you need ", em: "for a salon case", post: "?" },
    lede: "Photos before/after + receipts + corrective quotes establish the case.",
    cells: [
      { kind: "photos", tag: "Before / after / corrective", photos: [
        { id: "1581094271901-8022df4466f9", cap: "Before appointment" },
        { id: "1556909114-f6e7ad7d3136", cap: "After damage" },
        { id: "1581092335397-9583eb92d232", cap: "Corrective treatment" },
        { id: "1503602642458-232111445657", cap: "Final result" },
      ] },
      { kind: "texts", tag: "Communication with salon", texts: [
        { dir: "out", text: "I asked for highlights and got full bleach. Hair is breaking off." },
        { dir: "in", text: "Sometimes color goes lighter than expected. We'll offer a discount on next visit." },
        { dir: "out", text: "I have $1,200 in corrective treatments at a different salon. Need refund." },
      ] },
      { kind: "letter", tag: "Corrective treatment professional report", letterhead: "Pinnacle Salon · Master Colorist", date: "April 22, 2026", recipientName: "Reese Customer", reLine: "Hair restoration treatment summary", bodyParagraphs: [
        "Inspected hair on April 22, 2026. Severe over-processing from incorrect bleach application. Hair was significantly damaged with breakage on 30% of strands.",
        "Corrective treatment: 4 deep conditioning sessions, color correction. Total cost: $1,200. Estimated recovery: 6 to 12 months.",
      ], signatory: "K. Petrov", signatoryTitle: "Master Colorist · 18 yrs" },
      { kind: "receipt", tag: "Cost summary", vendor: "ORIGINAL + CORRECTIVE", vendorAddr: "Combined claim", receiptNum: "Statement", date: "Mar - Apr 2026", lineItems: [
        { label: "Acme Salon original service", amount: "$400" },
        { label: "Pinnacle Salon corrective (4 sessions)", amount: "$1,200" },
      ], subtotal: "$1,600", total: "$1,600", footer: "Documented costs" },
    ],
  },

  defenses: {
    h2: { pre: "Common salon ", em: "defenses", post: ", with rebuttals." },
    lede: "Three arguments cover most cases.",
    items: [
      { quote: "Color services don't always go as expected.", pill: "Most common", rebuttal: "<strong>Rebuttal:</strong> the standard is what a careful, qualified colorist would do. Asking for highlights and getting full bleach is way outside that. A master colorist's report can show what the professional standard should have been." },
      { quote: "You consented to whatever I did.", pill: "Consent", rebuttal: "<strong>Rebuttal:</strong> agreeing to a service doesn't mean you agreed to a botched one. You agreed to the procedure, not to careless execution of it." },
      { quote: "We offered to fix it for free.", pill: "Free fix", rebuttal: "<strong>Rebuttal:</strong> offering a free fix doesn't excuse the original damage. If you didn't trust them to fix it and went elsewhere, you can still recover what the fix cost you." },
    ],
  },

  outcomes: {
    h2: { pre: "How much do customers ", em: "actually recover", post: "?" },
    lede: "Typical recovery ranges.",
    bands: [
      { label: "Low", range: "$100 to $500", body: "<strong>Refund only.</strong> Salon refunds the original service.", tier: "low" },
      { label: "Mid", range: "$500 to $2,500", body: "<strong>Refund + corrective.</strong> Most common with good documentation.", tier: "mid" },
      { label: "High", range: "$2,500 to $10,000", body: "<strong>Major damage + medical.</strong> Severe burns, scalp injuries, extensions/wigs.", tier: "high" },
    ],
  },

  stateSection: null,

  alternatives: {
    h2: { pre: "What are the ", em: "alternatives", post: " to small claims?" },
    lede: "Demand letter and BBB complaint usually resolve.",
    cards: [
      { title: "Demand letter", pillLabel: "Free, fast", pillTier: "primary", whenItFits: "documented damage. Most salons settle to avoid reviews.", tradeoff: "no enforcement if ignored." },
      { title: "State cosmetology board", pillLabel: "Free, regulatory", pillTier: "good", whenItFits: "careless or unlicensed cosmetologist. Board can suspend licenses.", tradeoff: "no monetary recovery." },
      { title: "Small claims (this guide)", pillLabel: "When demand fails", pillTier: "warn", whenItFits: "demand fails. State consumer-protection law applies.", tradeoff: "30 to 90 day timeline." },
    ],
  },

  cta: {
    h2: { pre: "Recover the ", em: "corrective costs", post: "." },
    body: "Demand letters with photos and corrective receipts usually settle within 14 days.",
    receipt: { label: "example · over-processed hair", items: [
      { label: "Corrective treatments", amount: "$1,200" },
      { label: "Refund original service", amount: "+ $400" },
      { label: "Filing fee", amount: "+ $200" },
    ], total: "$1,800", totalLabel: "Total claim", note: "Illustrative. Severe damage cases push higher." },
  },

  faqs: [
    { q: "Can I sue a salon for ruining my hair?", a: "Yes. They were careless and failed to meet professional standards. You can recover the cost of corrective treatments, a refund of the original service, and medical bills if there were scalp injuries." },
    { q: "What's the standard for proving they were careless?", a: "Whether the colorist or stylist did something a careful, qualified professional in the same situation would not have done. A master colorist's written report can show what the professional standard should have been." },
    { q: "Do I need medical documentation?", a: "Helpful but not required for hair-only damage. Required if you suffered scalp burns or allergic reactions. Medical bills strengthen the case, but corrective treatment receipts are what prove the damages." },
    { q: "What if the salon offered a free fix?", a: "You're not required to accept. If you went elsewhere, you can still recover the cost. The free-fix offer doesn't excuse the original damage." },
    { q: "Can I sue for emotional distress?", a: "Limited. Standard hair damage cases are covered by direct costs only. Severe cases (loss of hair, severe burns, lasting psychological impact) may support emotional-distress claims." },
    { q: "How long do I have to sue?", a: "The deadline (the 'statute of limitations') is usually 2 to 4 years. Move fast: photo evidence is strongest soon after the damage." },
    { q: "What about state cosmetology board?", a: "File a complaint with the state cosmetology board for careless or unlicensed work. The board can suspend licenses and assess fines. The complaint creates pressure for civil settlement; you don't get money from the board." },
  ],

  relatedSlugs: ["refund-general", "gym-membership", "dry-cleaner", "defective-product", "services-not-rendered"],
};
