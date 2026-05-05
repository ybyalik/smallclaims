import type { NeighborIssue } from "./types";

export const deadTreeFell: NeighborIssue = {
  slug: "dead-tree-fell",
  ready: true,
  short: "Dead tree fell",
  breadcrumbLabel: "Dead Tree Fell",

  meta: {
    title: "Can I Sue My Neighbor If His Dead Tree Fell on My House?",
    description:
      "Plain-English guide to recovering when a neighbor's dead tree fell on your property. The 'known dangerous condition' rule, homeowners-insurance route, and a demand-letter template.",
  },

  hero: {
    eyebrowSuffix: "Dead tree fell",
    h1: { pre: "Can I sue my neighbor if his ", em: "dead tree fell on my house", post: "?" },
    leadStrong: "Usually yes — if the tree was visibly dead or dying before it fell.",
    leadBody:
      " Most states use the 'known dangerous condition' rule: a property owner is liable for damage from a tree if they knew (or reasonably should have known) the tree was dead, diseased, or hazardous before it fell. A healthy tree felled by a freak storm is usually 'act of God' and not actionable. A visibly dead tree the neighbor ignored for months is negligence. The neighbor's homeowners insurance is the primary recovery; small claims is the backup.",
  },

  counter: {
    amount: 8500,
    meta: "Negligence · known-dangerous-condition rule",
    rows: [
      { label: "Roof and structural repair", value: "$6,800" },
      { label: "Replaced belongings + tree removal", value: "+ $1,500", emphasis: "accent" },
      { label: "Filing fee + interest", value: "$200", emphasis: "muted" },
    ],
    footer: "Sample · within most state small-claims caps",
  },

  whatCounts: {
    h2: { pre: "When is your neighbor ", em: "liable for a fallen tree", post: "?" },
    lede: "Four conditions establish liability. The dead/dying state plus the neighbor's knowledge are the keys.",
    cards: [
      { num: "01", title: "Tree was visibly dead or dying", body: "Bark falling off, no leaves in growing season, large dead branches, fungus or rot at the base. A licensed arborist can document the condition; many homeowners' phones contain pre-fall photos." },
      { num: "02", title: "Neighbor knew or should have known", body: "You complained in writing. The HOA cited the tree. Multiple neighbors raised concerns. The dead state was visible from the street. Constructive notice (should have known) is enough in most states." },
      { num: "03", title: "Neighbor failed to act in reasonable time", body: "Most states give a property owner reasonable time to remove a known hazardous tree. Months without action after notice meets the threshold. Days might not." },
      { num: "04", title: "The tree caused the damage", body: "Photos showing the fallen tree on your property. Contractor's report tracing the damage to the tree. Most cases are obvious; rare cases involve secondary damage (water entry through tree-caused roof breach)." },
    ],
    note: { strongIntro: "Healthy trees are different.", rest: " A healthy tree felled by a hurricane or unforeseeable storm is usually 'act of God' under most state laws. The neighbor is not liable. The exception is when the tree had documented hazardous features the neighbor ignored, even if storms triggered the actual fall." },
  },

  claim: {
    h2: { pre: "How much can you ", em: "recover", post: "?" },
    lede: "Repair cost is the floor. Tree removal, replaced belongings, alternative housing stack on top.",
    layers: [
      { tag: "Layer 1", title: "Roof and structural repair", body: "Quote from a licensed roofing or general contractor. Major tree falls often damage rafters, drywall, plumbing, electrical. Get a thorough inspection.", amount: "$6,800" },
      { tag: "Layer 2", title: "Tree removal and replaced belongings", body: "Cost to remove the fallen tree (usually $500 to $2,000). Replaced furniture, electronics, or fixtures destroyed by the fall. Hotel costs if home was uninhabitable.", amount: "+ $1,500", accent: true },
      { tag: "Layer 3", title: "Filing fees, interest, expert reports", body: "Filing fee, arborist's report on tree condition ($200 to $500), pre-judgment interest at your state's legal rate.", amount: "+ $200" },
    ],
    total: { label: "Sample total within small-claims cap", body: "Roof and structural repair plus tree removal and replaced belongings, plus filing fee.", amount: "$8,500", sublabel: "illustrative · varies by damage extent" },
  },

  demand: {
    h2: { pre: "Send a ", em: "demand letter", post: " first." },
    lede: "Demand letters work especially well when copied to the neighbor's homeowners carrier. The carrier wants to settle if liability is clear (visibly dead tree).",
    checklist: [
      "Date the tree fell and date(s) you raised concerns before",
      "Photos of the tree before the fall (showing dead state)",
      "Photos of the damage",
      "Arborist's report on tree condition (dead, diseased, etc.)",
      "Repair quote from a licensed contractor",
      "Neighbor's homeowners carrier and policy number",
      "A 14-day deadline before you file",
    ],
    letter: {
      certifiedNum: "7019 0140 0001 4827 3601",
      date: "May 5, 2026",
      recipientName: "Pat Neighbor",
      recipientAddress: "1424 Maple Lane, Atlanta, GA 30309",
      reLine: "Demand for Damages, Dead Tree Fell on My House on April 14, 2026",
      bodyParagraphs: [
        "On April 14, 2026, the dead oak tree at the property line between our houses fell onto my home, causing significant roof and structural damage. I notified you in writing on January 8, 2026 (text attached) that the tree was visibly dead and posed a hazard. You did not remove it.",
        "I obtained an arborist's report from Tree Care Inc. confirming the tree was dead at the time of the fall (substantial bark loss, no leaves in the prior growing season). My contractor's quote is $6,800 for repair plus $1,200 for tree removal. I demand within <strong>fourteen (14) days</strong>:",
      ],
      demandList: [
        "Reimbursement of <strong>$6,800</strong> in roof and structural repair;",
        "Reimbursement of <strong>$1,500</strong> in tree removal and replaced belongings.",
      ],
      closingLine: "Total demand: <strong>$8,300.00</strong>. Copy of this letter has been sent to your homeowners carrier (Allstate). If unresolved, I will file in Small Claims Court.",
      signatory: "Casey Q. Owner",
    },
  },

  fileSteps: {
    h2: { pre: "How to ", em: "file", post: " a fallen-tree case." },
    lede: "Four steps. The arborist's report on tree condition is the spine.",
    steps: [
      { title: "Get an arborist's report", body: "Licensed arborist documents the tree's condition (dead, diseased, hazardous). Cost: $200 to $500. The report establishes the 'should have known' element." },
      { title: "File with the neighbor's homeowners carrier", body: "Most homeowners policies cover liability for known hazardous conditions. File a third-party claim with the policy info." },
      { title: "File in small claims", body: "If carrier denies (often citing 'act of God'), file. Filing fees usually run $30 to $100. Lead with the prior-notice text or letter." },
      { title: "Hearing", body: "Lead with the prior-notice communication, the arborist's report, and the contractor's repair estimate. Hearings usually run 10 to 15 minutes." },
    ],
    aftermath: { tag: "After you win", title: "Collecting from a neighbor.", bodyHtml: "Most cases pay through homeowners insurance. After 30 days post-judgment, the enforcement tools are a <strong>judgment lien</strong> on the neighbor&rsquo;s house, a <strong>bank levy</strong>, and a <strong>writ of execution</strong>." },
  },

  evidence: {
    h2: { pre: "What evidence do you need to ", em: "sue your neighbor", post: "?" },
    lede: "Pre-fall photos plus an arborist's report are decisive. The neighbor's notice (in writing) seals the case.",
    cells: [
      { kind: "photos", tag: "Tree before and after", photos: [
        { id: "1581094271901-8022df4466f9", cap: "Dead tree (pre-fall)" },
        { id: "1556909114-f6e7ad7d3136", cap: "Bark loss" },
        { id: "1581092335397-9583eb92d232", cap: "Tree on house" },
        { id: "1503602642458-232111445657", cap: "Roof damage" },
      ] },
      { kind: "letter", tag: "Arborist report", letterhead: "Tree Care Inc. · Certified Arborist #4218", date: "April 22, 2026", recipientName: "Casey Owner", reLine: "Tree condition report", bodyParagraphs: [
        "Inspected the fallen tree at the property line. Findings: tree was dead at time of fall (no living tissue in cambium, substantial bark loss documented in pre-fall photos, fungal growth at base).",
        "Tree-condition findings indicate the tree had been dead for at least 12 to 18 months. Removal should have been done within 60 days of the dead state becoming visible.",
      ], signatory: "K. Petrov", signatoryTitle: "ISA Certified Arborist" },
      { kind: "texts", tag: "Prior notice", texts: [
        { dir: "out", text: "Pat — that oak in your yard looks dead. No leaves last summer. Worried it'll come down." },
        { dir: "in", text: "I'll get a quote when I have time." },
        { dir: "out", text: "It's been 3 months. Still nothing. Sending you a written notice." },
      ] },
      { kind: "receipt", tag: "Contractor estimate", vendor: "ATLANTA HOME SERVICES", vendorAddr: "License #38291 · Atlanta, GA", receiptNum: "Estimate #2026-118", date: "04/22/2026", lineItems: [
        { label: "Roof structural repair", amount: "$4,200.00" },
        { label: "Drywall and ceiling replacement", amount: "$1,800.00" },
        { label: "Tree removal and disposal", amount: "$800.00" },
      ], subtotal: "$6,800.00", total: "$6,800.00", footer: "Materials and labor included" },
    ],
  },

  defenses: {
    h2: { pre: "Common neighbor ", em: "defenses", post: ", with rebuttals." },
    lede: "Three arguments cover most fallen-tree cases.",
    items: [
      { quote: "It was an act of God. The storm caused it.", pill: "Most common", rebuttal: "<strong>Rebuttal:</strong> the act-of-God defense fails when the tree had documented hazardous features. Bring the arborist's report. A storm may have triggered the fall, but the dead state made the fall foreseeable. Foreseeable equals negligent." },
      { quote: "I didn't know the tree was dead.", pill: "Knowledge", rebuttal: "<strong>Rebuttal:</strong> bring your prior-notice texts or letters. Constructive knowledge (should have known) also counts in most states. A tree visibly dead from the street is constructive knowledge." },
      { quote: "Trees fall. It's nature.", pill: "Trees", rebuttal: "<strong>Rebuttal:</strong> healthy trees in storms are nature. Dead trees the owner knew about are negligence. The arborist's report distinguishes the two." },
    ],
  },

  outcomes: {
    h2: { pre: "How much do owners ", em: "actually recover", post: "?" },
    lede: "Typical recovery in fallen-tree cases. Documented dead state plus prior notice produces the cleanest outcomes.",
    bands: [
      { label: "Low", range: "$500 to $2,500", body: "<strong>Tree removal only.</strong> Court agrees on tree removal but not full liability. Common when the act-of-God defense partially succeeds.", tier: "low" },
      { label: "Mid", range: "$2,500 to $10,000", body: "<strong>Repair plus removal.</strong> Most common when prior notice and arborist's report establish negligence.", tier: "mid" },
      { label: "High", range: "$10,000 to $20,000+", body: "<strong>Major structural damage.</strong> Cap-of-court awards for serious roof, plumbing, electrical damage.", tier: "high" },
    ],
  },

  stateSection: null,

  alternatives: {
    h2: { pre: "What are the ", em: "alternatives", post: " to small claims?" },
    lede: "Insurance is usually the fastest path.",
    cards: [
      { title: "Neighbor's homeowners insurance", pillLabel: "Free, fast", pillTier: "primary", whenItFits: "the policy covers liability for known dangerous conditions.", tradeoff: "carriers often initially deny on act-of-God grounds. Push back with arborist report." },
      { title: "Your homeowners insurance", pillLabel: "Quick, partial", pillTier: "good", whenItFits: "you need fast repair. Your carrier pays you and pursues subrogation.", tradeoff: "deductible costs you out of pocket." },
      { title: "Small claims", pillLabel: "When insurance fails", pillTier: "warn", whenItFits: "carrier denied liability. Damages within your state's cap.", tradeoff: "30 to 90 day timeline." },
    ],
  },

  cta: {
    h2: { pre: "Recover the ", em: "repair cost", post: "." },
    body: "Demand letters with the arborist's report and prior-notice text usually produce settlement. Our generator builds yours in under two minutes.",
    receipt: { label: "example · dead-tree fall", items: [
      { label: "Roof and structural", amount: "$6,800" },
      { label: "Tree removal + belongings", amount: "+ $1,500" },
      { label: "Filing fee + interest", amount: "+ $200" },
    ], total: "$8,500", totalLabel: "Total claim", note: "Illustrative. Major structural damage cases push higher." },
  },

  faqs: [
    { q: "What is the 'known dangerous condition' rule?", a: "A common-law rule that property owners are liable for damage from natural conditions on their land (dead trees, dangerous slopes) when they knew or reasonably should have known of the danger and failed to act in reasonable time. Most states apply this rule to fallen-tree cases." },
    { q: "What if the tree looked healthy?", a: "Then the act-of-God defense usually wins. Healthy trees felled by storms are not actionable in most states. The case turns on whether the tree had documented hazardous features (dead, diseased, leaning, fungal growth)." },
    { q: "Do I need an arborist?", a: "Yes, ideally. A licensed arborist's written report establishing the tree was dead at the time of fall is decisive evidence. Cost: $200 to $500. Many arborists do post-incident assessments. The investment pays off at the hearing." },
    { q: "Will the neighbor's homeowners insurance cover this?", a: "Usually yes if liability is clear. Most homeowners policies cover liability for known hazardous conditions. Carriers often initially deny on act-of-God grounds; push back with the arborist's report and prior-notice documentation." },
    { q: "How long do I have to sue?", a: "Property damage and negligence claims usually run 2 to 4 years. Some states have specific tree-statute deadlines. Move fast: arborist evidence is strongest soon after the incident." },
    { q: "What if the tree was on the property line?", a: "Boundary trees have shared ownership in most states. If the tree was jointly owned, both owners share responsibility. The dead state plus prior notice still establishes liability for the owner who knew about the danger." },
    { q: "Can my own insurance subrogate against the neighbor?", a: "Yes. If you file a claim against your homeowners insurance for fast repair, your carrier may pursue subrogation against the neighbor's carrier. You eat the deductible; your carrier handles the rest. Useful when you need fast repair and cannot wait." },
  ],

  relatedSlugs: ["tree-encroachment", "property-damage", "construction-damage", "water-runoff", "harassment", "fence-dispute"],
};
