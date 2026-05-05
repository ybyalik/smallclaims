import type { NeighborIssue } from "./types";

export const waterRunoff: NeighborIssue = {
  slug: "water-runoff",
  ready: true,
  short: "Water runoff",
  breadcrumbLabel: "Water Runoff",

  meta: {
    title: "Can I Sue My Neighbor for Water Runoff Flooding My Yard?",
    description:
      "Plain-English guide to suing a neighbor for water runoff and yard flooding. State drainage rules (reasonable use, civil law, common enemy), and a demand-letter template.",
  },

  hero: {
    eyebrowSuffix: "Water runoff",
    h1: { pre: "Can I sue my neighbor for ", em: "water runoff flooding my yard", post: "?" },
    leadStrong: "Yes, but the rules vary widely by state.",
    leadBody:
      " Most states use one of three drainage rules: 'reasonable use' (most common — neighbor is liable for unreasonable diversion), 'civil law' (each property must accept natural flow but cannot block or alter it), or 'common enemy' (each landowner is free to defend against water as they choose). Whichever rule applies, regrading your land to dump water on your neighbor's lawn or installing drainage that floods them is usually actionable. Documentation with photos plus an engineer's report on the water source is the spine.",
  },

  counter: {
    amount: 5800,
    meta: "State drainage law (reasonable use / civil law / common enemy)",
    rows: [
      { label: "Drainage repair and yard restoration", value: "$4,200" },
      { label: "Mold remediation in basement", value: "+ $1,400", emphasis: "accent" },
      { label: "Filing fee + interest", value: "$200", emphasis: "muted" },
    ],
    footer: "Sample · within most state small-claims caps",
  },

  whatCounts: {
    h2: { pre: "What kinds of ", em: "water runoff", post: " support a lawsuit?" },
    lede: "Four common patterns. Each one violates the drainage rule in most states.",
    cards: [
      { num: "01", title: "Neighbor regraded their land", body: "Most common. Neighbor regraded their yard, driveway, or patio in a way that now sends water onto your property. Aerial photos before and after establish the change. Most state drainage rules prohibit unreasonable changes to natural flow." },
      { num: "02", title: "New construction altered drainage", body: "New addition, pool, or paved surface created drainage that floods you. Even where construction was permitted, the drainage impact is separately actionable. The contractor's plans plus an engineer's report establish the change." },
      { num: "03", title: "Failed gutters or drainage system", body: "Neighbor's gutters or downspouts dump water onto your property instead of into proper drainage. Failure to maintain creates liability. Photos showing the discharge angle are decisive." },
      { num: "04", title: "Septic, pool, or pond overflow", body: "Septic system overflow, pool drainage, or fountain leaks that flood your property. Recovery includes clean-up costs and any health hazards (sewage cases especially)." },
    ],
    note: { strongIntro: "Know your state's rule.", rest: " Reasonable use (most states): liability for unreasonable diversion. Civil law (about 20 states): natural flow must be preserved; any change is actionable. Common enemy (a few states): each owner can defend, but creating new diversion is still actionable. Look up your state's rule before filing." },
  },

  claim: {
    h2: { pre: "How much can you ", em: "claim", post: "?" },
    lede: "Yard restoration is the floor. Drainage repair, mold remediation, and structural damage stack on top.",
    layers: [
      { tag: "Layer 1", title: "Drainage repair and yard restoration", body: "Cost to install proper drainage on your property to handle the runoff (often retaining wall, swale, or french drain). Plus restoration of damaged lawn or landscaping. Engineer's report and contractor's quote.", amount: "$4,200" },
      { tag: "Layer 2", title: "Mold remediation and structural damage", body: "Water entering basement or crawlspace creates mold within 24 to 48 hours. IICRC-certified mold remediation. Foundation damage in extreme cases.", amount: "+ $1,400", accent: true },
      { tag: "Layer 3", title: "Filing fees, expert reports, interest", body: "Filing fee, engineer's report on water source ($300 to $800), pre-judgment interest at your state's legal rate.", amount: "+ $200" },
    ],
    total: { label: "Sample total within small-claims cap", body: "Drainage repair plus mold remediation, plus filing fee.", amount: "$5,800", sublabel: "illustrative · varies by extent" },
  },

  demand: {
    h2: { pre: "Send a ", em: "demand letter", post: " first." },
    lede: "Demand letters work especially well when paired with an engineer's report identifying the runoff source. The neighbor's homeowners carrier covers exactly this.",
    checklist: [
      "Photos of flooding and the apparent source",
      "Engineer's report on water source and flow",
      "Drainage and remediation quotes",
      "Documentation of the neighbor's regrading or changes",
      "A 14-day deadline before you file",
      "Sent certified mail with copy to homeowners carrier",
    ],
    letter: {
      certifiedNum: "7019 0140 0001 4827 3605",
      date: "May 5, 2026",
      recipientName: "Pat Neighbor",
      recipientAddress: "1424 Maple Lane, Houston, TX 77002",
      reLine: "Demand for Damages, Yard Flooding from Regraded Property",
      bodyParagraphs: [
        "On October 14, 2025, you regraded your back yard and installed paved patio. Since then, my back yard has flooded after every significant rainfall (12 documented events with photos). Engineer's report from Texas Drainage Solutions confirms the regrading is the cause: water that previously sheeted south now flows directly onto my property at the property line.",
        "Repair quote: $4,200 to install french drain and restore lawn. Mold remediation in basement: $1,400. I demand within <strong>fourteen (14) days</strong>:",
      ],
      demandList: [
        "Reimbursement of <strong>$4,200</strong> in drainage and yard repair;",
        "Reimbursement of <strong>$1,400</strong> in mold remediation.",
      ],
      closingLine: "Total demand: <strong>$5,600.00</strong>. If unresolved, I will file in Small Claims Court.",
      signatory: "Devin Q. Owner",
    },
  },

  fileSteps: {
    h2: { pre: "How to ", em: "file", post: " a water-runoff case." },
    lede: "Four steps. The engineer's report is decisive evidence.",
    steps: [
      { title: "Get an engineer's report", body: "Licensed civil or drainage engineer documents the source and flow of water. Cost: $300 to $800. The report establishes that the neighbor's actions caused the flooding." },
      { title: "File with neighbor's homeowners carrier", body: "Most homeowners policies cover damage to others' property from drainage failures. File a third-party claim using the policy info." },
      { title: "File in small claims", body: "If carrier and demand do not resolve within 60 days, file. Filing fees usually run $30 to $100." },
      { title: "Hearing", body: "Lead with the engineer's report, photos before and after the regrading, and the contractor's quote. Hearings usually run 10 to 15 minutes." },
    ],
    aftermath: { tag: "After you win", title: "Collecting and ongoing protection.", bodyHtml: "Money judgments enforce via <strong>judgment lien</strong>, <strong>bank levy</strong>, and <strong>writ of execution</strong>. For ongoing protection (the regrading is permanent), small claims cannot order an injunction; that requires higher court. Recovery here funds your defensive drainage installation." },
  },

  evidence: {
    h2: { pre: "What evidence do you need to ", em: "sue your neighbor", post: "?" },
    lede: "Photos before and after the neighbor's change plus an engineer's report on the water source are decisive.",
    cells: [
      { kind: "photos", tag: "Flooding and source", photos: [
        { id: "1581094271901-8022df4466f9", cap: "Yard flood (after rain)" },
        { id: "1556909114-f6e7ad7d3136", cap: "Source: regraded yard" },
        { id: "1581092335397-9583eb92d232", cap: "Property line flow" },
        { id: "1503602642458-232111445657", cap: "Basement water" },
      ] },
      { kind: "letter", tag: "Engineer's report", letterhead: "Texas Drainage Solutions · License #PE-12345", date: "April 22, 2026", recipientName: "Devin Owner", reLine: "Drainage analysis report", bodyParagraphs: [
        "Inspected both properties on April 22, 2026. Pre-2025 aerial photos show natural southward sheet flow from neighbor's property. Post-regrading, water now flows east directly onto your back yard.",
        "Cause of flooding: neighbor's October 2025 regrading and paved patio. Solution: french drain on your property line. Cost: $4,200.",
      ], signatory: "K. Petrov", signatoryTitle: "Licensed Civil Engineer" },
      { kind: "handbook", tag: "State drainage rule", documentTitle: "Texas Drainage Law · Reasonable Use Rule", sectionTitle: "Reasonable use of surface water", bodyParagraphs: [
        "An upper landowner has the right to use, divert, or alter the natural flow of surface water in a reasonable manner that does not unduly burden the lower landowner.",
      ], highlight: "Regrading that diverts water directly onto neighbor's property is per-se unreasonable.", footer: "Texas Water Code · drainage law" },
      { kind: "receipt", tag: "Repair quotes", vendor: "TEXAS DRAINAGE SOLUTIONS", vendorAddr: "License #PE-12345 · Houston, TX", receiptNum: "Quote #2026-218", date: "04/22/2026", lineItems: [
        { label: "French drain installation (60 ft)", amount: "$2,800.00" },
        { label: "Lawn and landscape restoration", amount: "$1,400.00" },
      ], subtotal: "$4,200.00", total: "$4,200.00", footer: "Materials and labor included" },
    ],
  },

  defenses: {
    h2: { pre: "Common neighbor ", em: "defenses", post: ", with rebuttals." },
    lede: "Three arguments cover most water-runoff cases.",
    items: [
      { quote: "Water flows where water flows. Not my problem.", pill: "Most common", rebuttal: "<strong>Rebuttal:</strong> bring the engineer's report. Most state drainage rules hold the neighbor liable for unreasonable diversion. The pre-and-post-regrading aerial photos plus the engineer's flow analysis establish the cause." },
      { quote: "Your yard has always flooded.", pill: "Pre-existing", rebuttal: "<strong>Rebuttal:</strong> bring pre-2025 photos showing your yard dry after rain. The engineer's report distinguishes pre-existing flooding from post-regrading flooding." },
      { quote: "We had permits. Everything was approved.", pill: "Permits", rebuttal: "<strong>Rebuttal:</strong> permit approval addresses building code, not drainage liability. Most state drainage rules apply regardless of whether construction was permitted. The drainage impact is separately actionable." },
    ],
  },

  outcomes: {
    h2: { pre: "How much do owners ", em: "actually recover", post: "?" },
    lede: "Typical recovery ranges. Documented engineer's report drives the result.",
    bands: [
      { label: "Low", range: "$300 to $1,500", body: "<strong>Lawn restoration only.</strong> Court awards lawn but not drainage. Common when source is contested.", tier: "low" },
      { label: "Mid", range: "$1,500 to $5,000", body: "<strong>Drainage plus restoration.</strong> Most common with clean engineer's report.", tier: "mid" },
      { label: "High", range: "$5,000 to $20,000+", body: "<strong>Major flooding plus structural damage.</strong> Foundation damage, mold throughout home, or repeated flooding push to cap.", tier: "high" },
    ],
  },

  stateSection: null,

  alternatives: {
    h2: { pre: "What are the ", em: "alternatives", post: " to small claims?" },
    lede: "Insurance is usually the fastest path. Small claims for when carrier denies.",
    cards: [
      { title: "Neighbor's homeowners insurance", pillLabel: "Free, fast", pillTier: "primary", whenItFits: "the regrading or construction caused damage. File a third-party claim.", tradeoff: "carriers may dispute drainage cases as 'gradual' rather than sudden." },
      { title: "City code enforcement", pillLabel: "Free, regulatory", pillTier: "good", whenItFits: "the regrading or construction violated city code. Code enforcement issues citations and can require correction.", tradeoff: "code addresses building code, not always drainage liability." },
      { title: "Small claims (this guide)", pillLabel: "When insurance fails", pillTier: "warn", whenItFits: "carrier denied or undervalued. Damages within your state's cap.", tradeoff: "30 to 90 day timeline. Cannot order injunctive relief." },
    ],
  },

  cta: {
    h2: { pre: "Recover the ", em: "drainage cost", post: "." },
    body: "Demand letters with engineer's report and pre-and-post photos usually produce settlement. Our generator builds yours in under two minutes.",
    receipt: { label: "example · regrading caused flooding", items: [
      { label: "Drainage and lawn", amount: "$4,200" },
      { label: "Mold remediation", amount: "+ $1,400" },
      { label: "Filing fee + interest", amount: "+ $200" },
    ], total: "$5,800", totalLabel: "Total claim", note: "Illustrative. Major flooding cases push higher." },
  },

  faqs: [
    { q: "What is the 'reasonable use' rule for drainage?", a: "The most common state drainage rule. An upper landowner can use, divert, or alter natural flow in a reasonable way that does not unduly burden the lower landowner. Most states follow some version of this rule." },
    { q: "What is the 'civil law' rule?", a: "About 20 states use this rule: each property must accept natural flow but cannot alter or block it. Any change to natural drainage that affects a neighbor is actionable. Stricter than reasonable use." },
    { q: "What is the 'common enemy' rule?", a: "A few states use this older rule: each landowner is free to defend their own property against water as they choose. Modern application often requires reasonableness on top of the rule, narrowing the difference from reasonable use." },
    { q: "Do I need an engineer?", a: "Yes, ideally. A licensed civil or drainage engineer documents the source and flow of water and identifies the cause. Cost: $300 to $800. The report is the spine of the case." },
    { q: "What if my neighbor had permits?", a: "Permit approval addresses building code, not drainage liability. Most state drainage rules apply regardless of permits. The neighbor's compliance with building code is not a defense against drainage claims." },
    { q: "How long do I have to sue?", a: "Property damage and nuisance claims usually run 2 to 4 years. Continuing-tort cases (ongoing flooding) reset the clock with each new instance. Move fast on the engineer's report; documentation is strongest soon after the regrading." },
    { q: "Can I install my own drainage to defend?", a: "In most states yes, but be careful. Self-help drainage that diverts water back to the neighbor or to a third party can create new liability. Consult an engineer before installing major drainage on your property." },
  ],

  relatedSlugs: ["property-damage", "construction-damage", "tree-encroachment", "fence-dispute", "dead-tree-fell", "smoke-and-odors"],
};
