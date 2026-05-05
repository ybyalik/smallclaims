import type { RoommateIssue } from "./types";

export const propertyDamageOrTheft: RoommateIssue = {
  slug: "property-damage-or-theft",
  ready: true,
  short: "Roommate damage or theft",
  breadcrumbLabel: "Damage or Theft",

  meta: {
    title: "Can I Sue My Roommate for Property Damage or Theft?",
    description: "Plain-English guide to recovering from a roommate for damage to your stuff or theft. Negligence, conversion, and a demand-letter template.",
  },

  hero: {
    eyebrowSuffix: "Damage or theft",
    h1: { pre: "Can I sue my roommate for ", em: "property damage or theft", post: "?" },
    leadStrong: "Yes. Damage from negligence and theft both have civil remedies.",
    leadBody:
      " A roommate who damaged your belongings (broke your TV, stained your couch, ruined your kitchen items) is liable under negligence. A roommate who took your property (stole electronics, kept items when they moved out) is liable under conversion. Both can support a small-claims case for replacement value. Photos before and after, plus witness testimony from other roommates or neighbors, establish the case.",
  },

  counter: {
    amount: 3200,
    meta: "Negligence + conversion",
    rows: [
      { label: "Replacement value of damaged/taken", value: "$2,800" },
      { label: "Pre-judgment interest", value: "+ $200", emphasis: "accent" },
      { label: "Filing fee", value: "$200", emphasis: "muted" },
    ],
    footer: "Sample · within most state small-claims caps",
  },

  whatCounts: {
    h2: { pre: "What kinds of damage or theft ", em: "are recoverable", post: "?" },
    lede: "Four common patterns.",
    cards: [
      { num: "01", title: "Damage from negligence", body: "Spilled drink ruined laptop, dropped TV, kitchen accident damaged appliances. Negligence requires that the roommate's failure to use reasonable care caused the damage." },
      { num: "02", title: "Damage from intentional acts", body: "Punched hole in wall, broke door in argument, threw away your food. Intentional damage = trespass to chattels (movable property). Damages plus possible punitive recovery." },
      { num: "03", title: "Theft (conversion)", body: "Took your electronics, kept items when they moved out, used your bank card without permission. Civil conversion claim plus possible criminal complaint." },
      { num: "04", title: "Damage to shared/common areas", body: "Living-room damage when you were the one paying for repairs. Recovery is for your share of repair costs (typically 100 percent if the damage was their fault, 50/50 if accidental)." },
    ],
    note: { strongIntro: "Photos before and after.", rest: " Most apartments don't have walkthrough photos like rentals from landlords do. Take photos of your room and shared spaces when you move in. Date-stamps establish what was original. After-damage photos seal the case." },
  },

  claim: {
    h2: { pre: "How much can you ", em: "claim", post: "?" },
    lede: "Replacement value of damaged or taken items plus filing fees.",
    layers: [
      { tag: "Layer 1", title: "Replacement or repair cost", body: "Replacement-value receipts (West Elm, Best Buy, etc. for damaged items). Repair quotes for damaged items that can be fixed. Original receipt or photos to prove ownership.", amount: "$2,800" },
      { tag: "Layer 2", title: "Pre-judgment interest", body: "State legal rate (7 to 10 percent per year) running from the date of damage or theft.", amount: "+ $200", accent: true },
      { tag: "Layer 3", title: "Filing fees, post-judgment interest", body: "Filing fee, service-of-process cost, post-judgment interest until paid.", amount: "+ $200" },
    ],
    total: { label: "Sample total within small-claims cap", body: "Replacement value of damaged or taken items plus interest, plus filing fee.", amount: "$3,200", sublabel: "illustrative · varies by extent" },
  },

  demand: {
    h2: { pre: "Send a ", em: "demand letter", post: " first." },
    lede: "Demand letters work well in roommate damage cases. Most settle once the receipts are produced.",
    checklist: ["Photos of items before and after", "Original receipts or proof of ownership", "Replacement quotes from current retailers", "Witness statements (other roommates)", "A 14-day deadline", "Sent certified mail (use forwarding address if they moved)"],
    letter: {
      certifiedNum: "7019 0140 0001 4827 3621",
      date: "May 5, 2026",
      recipientName: "Jordan Roommate",
      recipientAddress: "1424 Forwarding Address, Phoenix, AZ 85003",
      reLine: "Demand for Damages, Property Damage and Theft",
      bodyParagraphs: [
        "On April 14, 2026, you damaged or took the following items from our shared apartment:",
        "April 14: Spilled wine on my laptop (ruined). Replacement cost: $1,800 (receipt attached).",
        "April 18: Took my Sonos speakers when you moved out without permission. Replacement cost: $700.",
        "April 22: Broke my kitchen mixer in argument. Replacement cost: $300.",
        "Total: $2,800. I demand within <strong>fourteen (14) days</strong>:",
      ],
      demandList: [
        "Reimbursement of <strong>$2,800</strong> in damaged or taken items;",
        "Pre-judgment interest at 10 percent per year (<strong>$200</strong>).",
      ],
      closingLine: "Total demand: <strong>$3,000.00</strong>. If unresolved, I will file in Small Claims Court and (for the speakers) report theft to police.",
      signatory: "Reese Q. Tenant",
    },
  },

  fileSteps: {
    h2: { pre: "How to ", em: "file", post: " a damage/theft case." },
    lede: "Four steps. Photos and receipts are decisive.",
    steps: [
      { title: "Document the damage immediately", body: "Photos of damaged items (close-up plus context). Itemized list with original purchase receipts and current replacement cost. Witness contact info from other roommates or visitors who saw." },
      { title: "Send certified-mail demand", body: "Use forwarding address if the roommate moved. Many roommates pay at this stage to close the matter." },
      { title: "File in small claims", body: "If demand fails, file. Filing fees usually run $30 to $100. File in the county where the damage occurred." },
      { title: "Hearing", body: "Lead with photos, original receipts, and replacement quotes. Hearings usually run 10 to 15 minutes." },
    ],
    aftermath: { tag: "After you win", title: "Collecting from a roommate.", bodyHtml: "Money judgments enforce via <strong>judgment lien</strong>, <strong>bank levy</strong>, and <strong>writ of execution</strong>. Wage garnishment is also available." },
  },

  evidence: {
    h2: { pre: "What evidence do you need ", em: "to recover", post: "?" },
    lede: "Photos, receipts, and witness testimony establish the case.",
    cells: [
      { kind: "photos", tag: "Damage photos (dated)", photos: [
        { id: "1581094271901-8022df4466f9", cap: "Wine-stained laptop" },
        { id: "1556909114-f6e7ad7d3136", cap: "Empty Sonos shelf (stolen)" },
        { id: "1581092335397-9583eb92d232", cap: "Broken mixer" },
        { id: "1503602642458-232111445657", cap: "Pre-damage photo (ref.)" },
      ] },
      { kind: "texts", tag: "Roommate admissions", texts: [
        { dir: "in", text: "Sorry about the laptop, I'll figure something out." },
        { dir: "in", text: "I took the speakers, I think they were mine. We can talk." },
        { dir: "out", text: "Speakers are mine - here's the receipt. Need them back or replaced." },
      ] },
      { kind: "letter", tag: "Witness statement", letterhead: "Sam Witness · Other roommate", date: "April 22, 2026", recipientName: "Court records", reLine: "Witness statement", bodyParagraphs: [
        "I lived with Reese and Jordan from September 2024 to April 2026.",
        "I saw Jordan spill wine on Reese's laptop on April 14. I saw Jordan take the speakers when moving out April 18. I heard the argument and the breaking of the mixer on April 22.",
        "Available to testify.",
      ], signatory: "Sam Witness", signatoryTitle: "Roommate, witness to events" },
      { kind: "receipt", tag: "Replacement values", vendor: "BEST BUY + SONOS + AMAZON", vendorAddr: "Replacement-cost receipts", receiptNum: "Combined", date: "04/25/2026", lineItems: [
        { label: "MacBook Pro replacement", amount: "$1,800.00" },
        { label: "Sonos Era 100 (pair)", amount: "$700.00" },
        { label: "KitchenAid mixer replacement", amount: "$300.00" },
      ], subtotal: "$2,800.00", total: "$2,800.00", footer: "Replacement-cost basis · originals damaged or taken" },
    ],
  },

  defenses: {
    h2: { pre: "Common roommate ", em: "defenses", post: ", with rebuttals." },
    lede: "Three arguments cover most cases.",
    items: [
      { quote: "It was an accident.", pill: "Most common", rebuttal: "<strong>Rebuttal:</strong> negligence covers accidents. The roommate's failure to use reasonable care (drinking wine near a laptop) caused the damage. Accident is not a defense to negligence." },
      { quote: "The speakers were mine.", pill: "Disputed ownership", rebuttal: "<strong>Rebuttal:</strong> bring the original purchase receipt. Most modern items have purchase records (Amazon orders, credit-card statements). The receipt establishes ownership." },
      { quote: "We were both drinking. You're partly to blame.", pill: "Comparative fault", rebuttal: "<strong>Rebuttal:</strong> being present is not contributory negligence. The roommate caused the damage; you didn't. State comparative fault rules rarely reduce damages from drink-spill type accidents." },
    ],
  },

  outcomes: {
    h2: { pre: "How much do tenants ", em: "actually recover", post: "?" },
    lede: "Typical recovery ranges.",
    bands: [
      { label: "Low", range: "$100 to $500", body: "<strong>Partial recovery.</strong> Court awards portion when ownership is contested or value is unclear.", tier: "low" },
      { label: "Mid", range: "$500 to $3,500", body: "<strong>Full replacement value + interest.</strong> Most common with photos, receipts, and witness testimony.", tier: "mid" },
      { label: "High", range: "$3,500 to $15,000+", body: "<strong>Major losses.</strong> Multiple high-value items damaged or stolen.", tier: "high" },
    ],
  },

  stateSection: null,

  alternatives: {
    h2: { pre: "What are the ", em: "alternatives", post: " to small claims?" },
    lede: "Demand letter usually resolves smaller cases. Police report adds leverage for theft.",
    cards: [
      { title: "Demand letter alone", pillLabel: "Free, often works", pillTier: "primary", whenItFits: "documented damage. Most roommates pay to close the matter.", tradeoff: "no enforcement if ignored." },
      { title: "Police report (for theft)", pillLabel: "Free, criminal angle", pillTier: "good", whenItFits: "items were stolen (vs. damaged). Police report creates official record. Many former roommates return items quickly to avoid criminal charges.", tradeoff: "criminal cases focus on punishment, not your recovery. File alongside civil action." },
      { title: "Small claims (this guide)", pillLabel: "For monetary recovery", pillTier: "warn", whenItFits: "demand letter failed. Damages within your state's cap.", tradeoff: "30 to 90 day timeline." },
    ],
  },

  cta: {
    h2: { pre: "Recover what was ", em: "damaged or taken", post: "." },
    body: "Demand letters with photos and receipts produce settlement in most cases.",
    receipt: { label: "example · damaged + stolen items", items: [
      { label: "Replacement values", amount: "$2,800" },
      { label: "Pre-judgment interest", amount: "+ $200" },
      { label: "Filing fee", amount: "+ $200" },
    ], total: "$3,200", totalLabel: "Total claim", note: "Illustrative. Major losses push higher." },
  },

  faqs: [
    { q: "Can I sue my roommate for damaging my stuff?", a: "Yes. Negligence covers accidental damage; intentional damage is trespass to chattels. Both support recovery for replacement or repair cost. Photos and original receipts are decisive evidence." },
    { q: "What if my roommate took something when they moved out?", a: "Civil conversion claim plus possible police report for theft. The original receipt establishes ownership. Most former roommates return items quickly when faced with a police report or formal demand letter." },
    { q: "Do I file a police report?", a: "For clear theft (electronics, jewelry, items they have no claim to), yes. The police report creates an official record useful for both criminal prosecution and civil recovery. For ambiguous cases (shared items, unclear ownership), the civil case alone is usually enough." },
    { q: "How do I prove what items were mine?", a: "Original purchase receipts (Amazon order history, credit-card statements). Photos of items in your room or with you. Witness testimony. Insurance riders or rental insurance lists. The combination establishes ownership." },
    { q: "What about damage to common areas?", a: "If the roommate caused damage and you paid to repair, the recovery is for your share of repair costs (typically 100 percent if the damage was their fault). The cleaning service or repair contractor's invoice plus photos establish the case." },
    { q: "Can I keep the security deposit to cover damages?", a: "Only if you control the deposit. Usually the landlord holds the deposit. If your roommate's portion of the deposit is held by the landlord, it returns to them; if held by you (in a sublease), you can deduct. Document the deduction in writing to the roommate." },
    { q: "How long do I have to sue?", a: "Property damage and conversion claims usually run 2 to 4 years from the date of damage or theft. Move fast: photos and witness memories fade." },
  ],

  relatedSlugs: ["unpaid-rent", "unpaid-bills", "moving-out-no-notice", "security-deposit", "no-lease", "emotional-distress"],
};
