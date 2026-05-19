import type { RoommateIssue } from "./types";

export const propertyDamageOrTheft: RoommateIssue = {
  slug: "property-damage-or-theft",
  claimType: "property_damage",
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
    leadStrong: "Yes. You can sue for damage from carelessness, and for theft.",
    leadBody:
      " A roommate who damaged your belongings (broke your TV, stained your couch, ruined your kitchen items) is on the hook for being careless. A roommate who took your property (stole electronics, kept items when they moved out) is on the hook for taking your stuff (the legal name is 'conversion'). Both can support a small-claims case for replacement value. Photos before and after, plus witness testimony from other roommates or neighbors, are the case.",
  },

  counter: {
    amount: 3200,
    meta: "Carelessness + taking your stuff",
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
      { num: "01", title: "Damage from carelessness", body: "Spilled drink ruined laptop, dropped TV, kitchen accident damaged appliances. You have to show the roommate failed to be reasonably careful and that's what caused the damage." },
      { num: "02", title: "Damage from intentional acts", body: "Punched hole in wall, broke door in argument, threw away your food. Damaging your stuff on purpose is a separate wrong (the legal name is 'trespass to chattels'). You can recover damages plus possibly an extra penalty." },
      { num: "03", title: "Theft", body: "Took your electronics, kept items when they moved out, used your bank card without permission. You can sue for the value (the legal name for taking your stuff is 'conversion') and also file a police report." },
      { num: "04", title: "Damage to shared/common areas", body: "Living-room damage when you were the one paying for repairs. You can recover your share of repair costs (typically 100 percent if the damage was their fault, 50/50 if accidental)." },
    ],
    note: { strongIntro: "Photos before and after.", rest: " Most apartments don't have walkthrough photos like rentals from landlords do. Take photos of your room and shared spaces when you move in. Date-stamps establish what was original. After-damage photos seal the case." },
  },

  claim: {
    h2: { pre: "How much can you ", em: "claim", post: "?" },
    lede: "Replacement value of damaged or taken items plus filing fees.",
    layers: [
      { tag: "Layer 1", title: "Replacement or repair cost", body: "Replacement-value receipts (West Elm, Best Buy, etc. for damaged items). Repair quotes for damaged items that can be fixed. Original receipt or photos to prove ownership.", amount: "$2,800" },
      { tag: "Layer 2", title: "Interest before the case is decided", body: "State legal rate (7 to 10 percent per year) running from the date of damage or theft.", amount: "+ $200", accent: true },
      { tag: "Layer 3", title: "Filing fees, interest after judgment", body: "Filing fee, service-of-process cost, interest that keeps running until they pay.", amount: "+ $200" },
    ],
    total: { label: "Sample total within small-claims cap", body: "Replacement value of damaged or taken items plus interest, plus filing fee.", amount: "$3,200", sublabel: "illustrative · varies by extent" },
  },
  whatToProve: {
    h2: { pre: "What you need to ", em: "prove", post: " when a roommate damaged or took your property." },
    lede: "Document what was yours, what happened to it, and that the roommate was responsible.",
    elements: [
      { title: "The property was yours", body: "Receipts, photos in your room/space, or witness statements. Joint-purchase items are harder; truly individual items are easier." },
      { title: "The damage or theft happened", body: "Photos of damaged items, missing items, or evidence of theft. Date each event." },
      { title: "The roommate was responsible", body: "Witness statements, security-camera footage, their admission in texts, or pattern of access. Process-of-elimination evidence helps." },
      { title: "The replacement or repair cost", body: "Receipts for replacement, repair estimates, or replacement-cost research for items you can't easily replace." },
    ],
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
        "Interest at 10 percent per year (<strong>$200</strong>).",
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
    aftermath: { tag: "After you win", title: "Collecting from a roommate.", bodyHtml: "If they don't pay, you collect using a <strong>judgment lien</strong> (claim on their property), <strong>bank levy</strong> (taking money from their account), or <strong>writ of execution</strong> (court order to seize assets). Wage garnishment is also available." },
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
      { quote: "It was an accident.", pill: "Most common", rebuttal: "<strong>Rebuttal:</strong> carelessness covers accidents. The roommate's failure to be reasonably careful (drinking wine near a laptop) is what caused the damage. 'It was an accident' isn't a defense." },
      { quote: "The speakers were mine.", pill: "Disputed ownership", rebuttal: "<strong>Rebuttal:</strong> bring the original purchase receipt. Most modern items have purchase records (Amazon orders, credit-card statements). The receipt establishes ownership." },
      { quote: "We were both drinking. You're partly to blame.", pill: "Sharing the blame", rebuttal: "<strong>Rebuttal:</strong> just being there is not your fault. The roommate caused the damage; you didn't. State rules about sharing blame rarely reduce damages from spilled-drink accidents." },
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
      { title: "Demand letter alone", pillLabel: "Free, often works", pillTier: "primary", whenItFits: "documented damage. Most roommates pay to close the matter.", tradeoff: "no way to enforce it if they ignore you." },
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
    { q: "Can I sue my roommate for damaging my stuff?", a: "Yes. Carelessness covers accidental damage; intentional damage is a separate wrong. Both support recovery for replacement or repair cost. Photos and original receipts are decisive evidence." },
    { q: "What if my roommate took something when they moved out?", a: "Sue for the value (the legal name for taking your stuff is 'conversion'), plus consider a police report. The original receipt establishes ownership. Most former roommates return items quickly when faced with a police report or formal demand letter." },
    { q: "Do I file a police report?", a: "For clear theft (electronics, jewelry, items they have no claim to), yes. The police report creates an official record useful for both criminal prosecution and civil recovery. For ambiguous cases (shared items, unclear ownership), the civil case alone is usually enough." },
    { q: "How do I prove what items were mine?", a: "Original purchase receipts (Amazon order history, credit-card statements). Photos of items in your room or with you. Witness testimony. Insurance riders or rental insurance lists. The combination establishes ownership." },
    { q: "What about damage to common areas?", a: "If the roommate caused damage and you paid to repair, you can recover your share of the repair costs (typically 100 percent if the damage was their fault). The cleaning service or repair contractor's invoice plus photos make the case." },
    { q: "Can I keep the security deposit to cover damages?", a: "Only if you control the deposit. Usually the landlord holds it. If your roommate's portion of the deposit is held by the landlord, it goes back to them; if held by you (in a sublease), you can deduct. Put the deduction in writing to the roommate." },
    { q: "How long do I have to sue?", a: "The deadline (the 'statute of limitations') is usually 2 to 4 years from the date of damage or theft. Move fast: photos and witness memories fade." },
  ],

  relatedSlugs: ["unpaid-rent", "unpaid-bills", "moving-out-no-notice", "security-deposit", "no-lease", "emotional-distress"],
};
