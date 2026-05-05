import type { NeighborIssue } from "./types";

export const constructionDamage: NeighborIssue = {
  slug: "construction-damage",
  ready: true,
  short: "Construction damage",
  breadcrumbLabel: "Construction Damage",

  meta: {
    title: "Can I Sue My Neighbor for Construction Damage to My Property?",
    description:
      "Plain-English guide to recovering when a neighbor's construction damaged your property. Strict liability, GL insurance route, contractor versus homeowner liability, and a demand-letter template.",
  },

  hero: {
    eyebrowSuffix: "Construction damage",
    h1: { pre: "Can I sue my neighbor for ", em: "construction damage", post: "?" },
    leadStrong: "Yes. Both the neighbor and the contractor are usually liable.",
    leadBody:
      " Construction next door that damaged your property (foundation cracks from vibration, dust damage, broken fence, water intrusion from changed drainage) creates liability under negligence and (in some cases) strict liability for ultrahazardous activity. The contractor's general liability insurance is usually the primary recovery path, but the neighbor as the property owner is also liable. Document with photos before, during, and after the construction.",
  },

  counter: {
    amount: 6800,
    meta: "Negligence + strict liability for ultrahazardous activity",
    rows: [
      { label: "Foundation crack repair", value: "$5,200" },
      { label: "Cleanup, paint, replaced items", value: "+ $1,400", emphasis: "accent" },
      { label: "Filing fee + interest", value: "$200", emphasis: "muted" },
    ],
    footer: "Sample · within most state small-claims caps",
  },

  whatCounts: {
    h2: { pre: "What kinds of ", em: "construction damage", post: " can you sue for?" },
    lede: "Four common patterns. Each is recoverable under negligence; some under strict liability.",
    cards: [
      { num: "01", title: "Foundation or structural damage from vibration", body: "Heavy machinery (jackhammers, pile drivers) can crack foundations and damage drywall on adjacent properties. Strict liability often applies; you do not have to prove negligence." },
      { num: "02", title: "Dust and debris damage", body: "Construction dust damages siding, paint, HVAC systems, vehicles, gardens. Failure to use proper containment is negligence. Quote from a cleaning or repair contractor establishes damages." },
      { num: "03", title: "Drainage changes from grading", body: "Construction often regrades the lot, changing how water flows. New flooding on your property is actionable under state drainage rules (see water-runoff page). The contractor's plans plus engineer's report establish causation." },
      { num: "04", title: "Direct damage to your property", body: "Equipment hit your fence, contractor encroached on your lawn, materials stored on your property without permission. Trespass plus negligence. Direct damages are full repair cost." },
    ],
    note: { strongIntro: "Document before, during, and after.", rest: " Photos of your property before construction starts. Continuing photos as construction progresses. Photos of damage when it appears. Most damage cases turn on the timing: the damage appeared during or after construction. Pre-construction photos seal the case." },
  },

  claim: {
    h2: { pre: "How much can you ", em: "claim", post: "?" },
    lede: "Repair cost is the floor. Cleanup, replaced items, alternative housing stack on top.",
    layers: [
      { tag: "Layer 1", title: "Repair cost", body: "Quote from a licensed contractor (foundation, structural, drywall, HVAC). Two estimates strengthen the case. Hidden damage requires a second-opinion inspection.", amount: "$5,200" },
      { tag: "Layer 2", title: "Cleanup, paint, replaced items", body: "Power-washing siding, replaced HVAC filters, repainted areas damaged by overspray, replaced plants. Save receipts.", amount: "+ $1,400", accent: true },
      { tag: "Layer 3", title: "Filing fees, expert reports, interest", body: "Filing fee, structural engineer's report ($300 to $1,500), pre-judgment interest at your state's legal rate.", amount: "+ $200" },
    ],
    total: { label: "Sample total within small-claims cap", body: "Foundation crack repair plus cleanup and replaced items, plus filing fee.", amount: "$6,800", sublabel: "illustrative · varies by extent" },
  },

  demand: {
    h2: { pre: "Send a ", em: "demand letter", post: " first." },
    lede: "Demand letters work especially well in construction-damage cases because the contractor's GL carrier covers exactly this. Send to both the neighbor and the contractor.",
    checklist: [
      "Photos before, during, and after construction",
      "Repair quote from a licensed contractor",
      "Structural engineer's report if foundation",
      "Construction company's name and GL info (often on permit)",
      "A 14-day deadline before you file",
      "Sent certified mail to neighbor + contractor + GL carrier",
    ],
    letter: {
      certifiedNum: "7019 0140 0001 4827 3608",
      date: "May 5, 2026",
      recipientName: "Pat Neighbor + Apex Construction",
      recipientAddress: "Construction at 1424 Maple Lane, Denver, CO 80202",
      reLine: "Demand for Damages, Construction Damage to Adjacent Property",
      bodyParagraphs: [
        "From January 14 to March 22, 2026, Apex Construction excavated and rebuilt the foundation at 1424 Maple Lane (your property). During and after the work, my house developed a 8-foot foundation crack and significant drywall damage. Engineer's report from Rockies Structural confirms vibration from your excavation as the cause.",
        "Repair quote: $5,200. Cleanup and replaced items: $1,400. I demand within <strong>fourteen (14) days</strong>:",
      ],
      demandList: [
        "Reimbursement of <strong>$5,200</strong> in foundation and drywall repair;",
        "Reimbursement of <strong>$1,400</strong> in cleanup and replaced items.",
      ],
      closingLine: "Total demand: <strong>$6,600.00</strong>. Copy of this letter has been sent to Apex Construction and their GL carrier (Continental Casualty, policy GL-2026-7821). If unresolved, I will file in Small Claims Court.",
      signatory: "Cameron Q. Owner",
    },
  },

  fileSteps: {
    h2: { pre: "How to ", em: "file", post: " a construction-damage case." },
    lede: "Four steps. The engineer's report linking damage to construction is the spine.",
    steps: [
      { title: "Get a structural engineer's report", body: "Licensed engineer documents the damage and the cause. Cost: $300 to $1,500. Decisive evidence at the hearing." },
      { title: "File with contractor's GL carrier", body: "Get the contractor's certificate of insurance (often on the building permit or city records). File a third-party claim. Most carriers settle within 30 to 60 days." },
      { title: "File in small claims", body: "If carrier and demand do not resolve within 60 days, file. Filing fees usually run $30 to $100. Sue both the contractor and the neighbor (property owner)." },
      { title: "Hearing", body: "Lead with the photos, engineer's report, and contractor's quote. Hearings usually run 10 to 15 minutes." },
    ],
    aftermath: { tag: "After you win", title: "Collecting from contractor or neighbor.", bodyHtml: "Most cases pay through the contractor&rsquo;s GL insurance. After 30 days post-judgment, the enforcement tools are a <strong>judgment lien</strong> on the neighbor&rsquo;s house, a <strong>bank levy</strong>, and a <strong>writ of execution</strong>." },
  },

  evidence: {
    h2: { pre: "What evidence do you need to ", em: "sue", post: "?" },
    lede: "Photos before-during-after plus engineer's report are decisive. The contractor's certificate of insurance is the gateway to fast recovery.",
    cells: [
      { kind: "photos", tag: "Damage chronology", photos: [
        { id: "1581094271901-8022df4466f9", cap: "Pre-construction (12/2025)" },
        { id: "1556909114-f6e7ad7d3136", cap: "Excavation (02/2026)" },
        { id: "1581092335397-9583eb92d232", cap: "Foundation crack (03/2026)" },
        { id: "1503602642458-232111445657", cap: "Drywall damage" },
      ] },
      { kind: "letter", tag: "Engineer's report", letterhead: "Rockies Structural · License #PE-12345", date: "April 14, 2026", recipientName: "Cameron Owner", reLine: "Foundation damage analysis", bodyParagraphs: [
        "Inspected the property on April 14, 2026. Foundation crack measured 8 feet length, 0.5 inch depth. Crack pattern consistent with vibration during adjacent excavation.",
        "Cause: Apex Construction's excavation at 1424 Maple Lane (Jan-March 2026). Repair: $5,200. Crack monitoring recommended for 12 months post-repair.",
      ], signatory: "K. Petrov", signatoryTitle: "Licensed Structural Engineer" },
      { kind: "handbook", tag: "Contractor GL info", documentTitle: "Continental Casualty · Apex Construction GL Certificate", sectionTitle: "Policy GL-2026-7821", bodyParagraphs: [
        "Each Occurrence: $1,000,000",
        "Damage to Rented Premises: $300,000",
        "Personal & Adv Injury: $1,000,000",
      ], highlight: "Damage to adjacent property covered under 'Each Occurrence.'", footer: "Effective 01/01/2026 to 01/01/2027" },
      { kind: "receipt", tag: "Repair quote", vendor: "DENVER FOUNDATION REPAIR", vendorAddr: "License #38291 · Denver, CO", receiptNum: "Quote #2026-218", date: "04/22/2026", lineItems: [
        { label: "Foundation crack repair (8 ft)", amount: "$3,800.00" },
        { label: "Drywall and paint repair", amount: "$1,400.00" },
      ], subtotal: "$5,200.00", total: "$5,200.00", footer: "Materials and labor included" },
    ],
  },

  defenses: {
    h2: { pre: "Common defenses ", em: "with rebuttals", post: "." },
    lede: "Three arguments cover most construction-damage cases.",
    items: [
      { quote: "Foundation cracks happen naturally.", pill: "Most common", rebuttal: "<strong>Rebuttal:</strong> bring the engineer's report. The crack pattern, location, and timing relative to construction establish vibration cause. Pre-construction photos of the foundation seal the case." },
      { quote: "We had permits and followed all rules.", pill: "Permits", rebuttal: "<strong>Rebuttal:</strong> permits address building code, not damage liability. Most state laws hold contractors liable for damage caused by their work regardless of permits. The contractor's GL covers exactly this." },
      { quote: "Our standard contract limits damages to permit fees.", pill: "Limitation", rebuttal: "<strong>Rebuttal:</strong> any contract limitation is between the homeowner and contractor; it does not bind you (third party). Most state laws prohibit pre-loss waivers of negligence liability against third parties." },
    ],
  },

  outcomes: {
    h2: { pre: "How much do owners ", em: "actually recover", post: "?" },
    lede: "Typical recovery ranges. Engineer's report drives the result.",
    bands: [
      { label: "Low", range: "$300 to $1,500", body: "<strong>Cleanup only.</strong> Court awards cleanup but not structural damage.", tier: "low" },
      { label: "Mid", range: "$1,500 to $5,000", body: "<strong>Repair plus cleanup.</strong> Most common with engineer's report.", tier: "mid" },
      { label: "High", range: "$5,000 to $20,000+", body: "<strong>Major foundation or structural.</strong> Cap-of-court awards for significant foundation, plumbing, or electrical damage.", tier: "high" },
    ],
  },

  stateSection: null,

  alternatives: {
    h2: { pre: "What are the ", em: "alternatives", post: " to small claims?" },
    lede: "GL insurance is usually the fastest path. Both contractor and neighbor are typically liable.",
    cards: [
      { title: "Contractor's GL insurance", pillLabel: "Free, fast, biggest payer", pillTier: "primary", whenItFits: "the contractor carries general liability insurance (legitimate ones do). File a third-party claim using the certificate.", tradeoff: "carriers may dispute causation. Engineer's report addresses this." },
      { title: "Your homeowners insurance", pillLabel: "Quick, partial", pillTier: "good", whenItFits: "you need fast repair. Your carrier pays you and pursues subrogation.", tradeoff: "deductible costs you out of pocket. May affect your premium." },
      { title: "Small claims (this guide)", pillLabel: "When insurance fails", pillTier: "warn", whenItFits: "carrier denied or undervalued. Damages within your state's cap.", tradeoff: "30 to 90 day timeline." },
    ],
  },

  cta: {
    h2: { pre: "Recover the ", em: "repair cost", post: "." },
    body: "Demand letters to both the neighbor and the contractor's GL carrier produce settlement in most cases. Our generator builds yours in under two minutes.",
    receipt: { label: "example · foundation damage from excavation", items: [
      { label: "Foundation + drywall", amount: "$5,200" },
      { label: "Cleanup + replaced items", amount: "+ $1,400" },
      { label: "Filing fee + interest", amount: "+ $200" },
    ], total: "$6,800", totalLabel: "Total claim", note: "Illustrative. Major foundation cases push higher." },
  },

  faqs: [
    { q: "Should I sue the neighbor or the contractor?", a: "Both. The contractor's GL covers most construction-damage cases. The neighbor is also liable as the property owner. Suing both protects you if one is uncollectable. Most cases pay through the GL." },
    { q: "What if there's no contractor (DIY)?", a: "The neighbor is solely liable. Their homeowners insurance covers liability for damage to others' property. File a third-party claim. Same legal framework, single defendant." },
    { q: "What is 'strict liability' for ultrahazardous activity?", a: "Some construction activities (blasting, pile driving, hazardous excavation) are 'ultrahazardous' under state law. Strict liability applies: you do not have to prove negligence; just that the activity caused damage. Foundations and demolition often qualify." },
    { q: "Can the contractor disclaim liability with their contract?", a: "The contract is between the homeowner and contractor. It does not bind you (third party). Most state laws prohibit pre-loss waivers of negligence against third parties. The contractor's GL covers your damage regardless of their contract terms." },
    { q: "How do I find the contractor's GL info?", a: "City building permits often include the contractor's name and license. State contractor license boards publish GL certificates. Public records request to the city or state often produces the info." },
    { q: "How long do I have to sue?", a: "Property damage and negligence claims usually run 2 to 4 years. Hidden damage that develops later (foundation cracks growing, drainage issues appearing months later) often has a discovery clock that starts when reasonably discoverable." },
    { q: "Will my homeowners insurance cover this?", a: "Usually yes for the immediate repair. Use your insurance for fast repair; your carrier pursues subrogation. You eat the deductible. Useful when you cannot wait for the contractor's carrier." },
  ],

  relatedSlugs: ["water-runoff", "property-damage", "dead-tree-fell", "tree-encroachment", "fence-dispute", "harassment"],
};
