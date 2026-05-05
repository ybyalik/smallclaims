import type { NeighborIssue } from "./types";

export const blockingDriveway: NeighborIssue = {
  slug: "blocking-driveway",
  ready: true,
  short: "Blocking driveway",
  breadcrumbLabel: "Blocking Driveway",

  meta: {
    title: "Can I Sue My Neighbor for Blocking My Driveway? Small Claims Guide",
    description:
      "Plain-English guide to suing a neighbor for blocking your driveway. Easement law, parking enforcement, towing rights, and a demand-letter template.",
  },

  hero: {
    eyebrowSuffix: "Blocking driveway",
    h1: { pre: "Can I sue my neighbor for ", em: "blocking my driveway", post: "?" },
    leadStrong: "Yes. Trespass plus interference with easement, plus you can usually tow.",
    leadBody:
      " A neighbor blocking your driveway commits trespass against your property and (if there's an easement) interferes with your easement rights. The fastest remedy is parking enforcement: most cities will tow vehicles blocking residential driveways at no cost to you. For documented patterns of blocking, small claims awards damages including towing costs, lost wages from missed work, and (in extreme cases) emotional distress.",
  },

  counter: {
    amount: 2400,
    meta: "Trespass + easement interference",
    rows: [
      { label: "Towing costs (multiple incidents)", value: "$800" },
      { label: "Lost wages from missed work", value: "+ $1,400", emphasis: "accent" },
      { label: "Filing fee + interest", value: "$200", emphasis: "muted" },
    ],
    footer: "Sample · within most state small-claims caps",
  },

  whatCounts: {
    h2: { pre: "What counts as ", em: "blocking your driveway", post: "?" },
    lede: "Four common patterns. Each one is its own claim under trespass or easement law.",
    cards: [
      { num: "01", title: "Vehicle parked across your driveway", body: "Most common. Neighbor or guest parks across your apron, blocking your access to the street. Most cities allow towing immediately at no cost; the police-call pattern builds the case for damages." },
      { num: "02", title: "Repeated obstruction by neighbor's guests", body: "When the neighbor's guests repeatedly block. The neighbor is responsible for their guests' parking. Document with photos and date-times." },
      { num: "03", title: "Permanent obstruction (storage, planters)", body: "Trash cans, storage containers, planters, or other items placed in or near your driveway. Trespass plus nuisance. Removal costs are recoverable." },
      { num: "04", title: "Easement interference", body: "Some properties have shared driveways with easements. Blocking the easement is interference. The easement document (in your title) defines the scope." },
    ],
    note: { strongIntro: "Tow first; sue later.", rest: " Most cities will tow a vehicle blocking your driveway at no cost. Call the non-emergency police line. Most police departments have a 'driveway block' towing protocol. After the immediate problem is solved, document the pattern for the small-claims case." },
  },

  claim: {
    h2: { pre: "How much can you ", em: "claim", post: "?" },
    lede: "Towing costs are the floor. Lost wages and consequential damages stack on top.",
    layers: [
      { tag: "Layer 1", title: "Towing and removal costs", body: "Towing fees you paid (when the city did not tow at no cost), removal costs for permanent obstruction. Save receipts and police-call records.", amount: "$800" },
      { tag: "Layer 2", title: "Lost wages and consequential damages", body: "Wages lost from missed work because you could not get out. Missed appointments, alternative-transportation costs (Uber, Lyft). Document with timesheets or pay stubs.", amount: "+ $1,400", accent: true },
      { tag: "Layer 3", title: "Filing fees, interest", body: "Filing fee, service-of-process cost, pre-judgment interest at your state's legal rate.", amount: "+ $200" },
    ],
    total: { label: "Sample total within small-claims cap", body: "Towing costs from multiple incidents plus lost wages from missed work, plus filing fee.", amount: "$2,400", sublabel: "illustrative · varies by frequency" },
  },

  demand: {
    h2: { pre: "Send a ", em: "demand letter", post: " first." },
    lede: "Demand letters work especially well when paired with the police-call record. Most neighbors stop blocking once formal action is in motion.",
    checklist: [
      "Photos of every blocking incident with timestamps",
      "Police-call records",
      "Towing receipts",
      "Lost wages documentation (paystubs, timesheets)",
      "Easement document if applicable",
      "A 14-day deadline before you file",
      "Sent certified mail",
    ],
    letter: {
      certifiedNum: "7019 0140 0001 4827 3607",
      date: "May 5, 2026",
      recipientName: "Pat Neighbor",
      recipientAddress: "1424 Maple Lane, Chicago, IL 60601",
      reLine: "Demand for Damages, Repeated Driveway Blocking",
      bodyParagraphs: [
        "Since January 2026, your guests have blocked my driveway on 8 documented occasions. I have called Chicago PD on 4 of those (incident #s 26-1182, 26-2218, 26-3217, 26-4218). Each instance prevented me from leaving my home for at least 30 minutes; on 3 occasions, I missed work and had towing costs ($200 per tow).",
        "I demand within <strong>fourteen (14) days</strong>:",
      ],
      demandList: [
        "Reimbursement of <strong>$800</strong> in towing costs (4 incidents at $200 each);",
        "Reimbursement of <strong>$1,400</strong> in lost wages from missed work.",
      ],
      closingLine: "Total demand: <strong>$2,200.00</strong>. If unresolved, I will file in Small Claims Court.",
      signatory: "Reese Q. Owner",
    },
  },

  fileSteps: {
    h2: { pre: "How to ", em: "file", post: " a blocking case." },
    lede: "Four steps. Pattern documentation is the spine.",
    steps: [
      { title: "Document each incident", body: "Photo with timestamp. Call non-emergency police line. Keep towing receipts. Note the time you were blocked and any work you missed." },
      { title: "Send demand letter to the neighbor", body: "Cite the pattern of incidents and the damages. Most neighbors stop the conduct once they see formal demand." },
      { title: "File in small claims", body: "If the demand does not resolve, file. Filing fees usually run $30 to $100. File in the county where you live." },
      { title: "Hearing", body: "Lead with the photos, police-call records, and damage documentation. Hearings usually run 10 to 15 minutes." },
    ],
    aftermath: { tag: "After you win", title: "Collecting plus injunction.", bodyHtml: "Money judgments enforce via <strong>judgment lien</strong>, <strong>bank levy</strong>, and <strong>writ of execution</strong>. For ongoing blocking, small claims cannot order an injunction; for that, higher court is needed. The judgment itself usually pressures the neighbor to stop." },
  },

  evidence: {
    h2: { pre: "What evidence do you need to ", em: "sue your neighbor", post: "?" },
    lede: "Photos, police records, and damage receipts are the case.",
    cells: [
      { kind: "photos", tag: "Blocking incidents", photos: [
        { id: "1581094271901-8022df4466f9", cap: "01/14: vehicle across drive" },
        { id: "1556909114-f6e7ad7d3136", cap: "02/04: trash cans in apron" },
        { id: "1581092335397-9583eb92d232", cap: "03/22: party guest" },
        { id: "1503602642458-232111445657", cap: "04/15: same vehicle" },
      ] },
      { kind: "letter", tag: "Police call records", letterhead: "Chicago Police Department", date: "Jan – Apr 2026", recipientName: "Reese Owner", reLine: "Driveway-blocking calls", bodyParagraphs: [
        "Incident 26-1182 (01/14/2026): driveway block, towed.",
        "Incident 26-2218 (02/04/2026): driveway block, owner moved vehicle.",
        "Incident 26-3217 (03/22/2026): driveway block, towed.",
        "Incident 26-4218 (04/15/2026): driveway block, citation issued.",
      ], signatory: "Records Division", signatoryTitle: "CPD Records · obtained via FOIA" },
      { kind: "texts", tag: "Asked neighbor to stop", texts: [
        { dir: "out", text: "Pat — your guests blocked my driveway again last night. 4th time this month." },
        { dir: "in", text: "I'll tell them. Not my fault." },
        { dir: "out", text: "It is your responsibility. I'm documenting and will tow next time." },
      ] },
      { kind: "receipt", tag: "Towing + lost wages", vendor: "DOWNTOWN TOWING + WAGE DOCUMENTATION", vendorAddr: "Combined claim", receiptNum: "Statement", date: "Jan – Apr 2026", lineItems: [
        { label: "Tow fee 01/14 (paid you, refunded)", amount: "$200.00" },
        { label: "Tow fee 03/22 (paid you, refunded)", amount: "$200.00" },
        { label: "Lost wages 01/14 (4 hours)", amount: "$300.00" },
        { label: "Lost wages 03/22 + 04/15 (10 hours)", amount: "$700.00" },
        { label: "Lost wages 02/04 (5 hours)", amount: "$400.00" },
        { label: "Tow fees not refunded", amount: "$400.00" },
      ], subtotal: "$2,200.00", total: "$2,200.00", footer: "Documented out-of-pocket plus lost wages" },
    ],
  },

  defenses: {
    h2: { pre: "Common neighbor ", em: "defenses", post: ", with rebuttals." },
    lede: "Three arguments cover most blocking cases.",
    items: [
      { quote: "It was just a few minutes.", pill: "Most common", rebuttal: "<strong>Rebuttal:</strong> bring the photos with timestamps. Even short blocking incidents prevent you from accessing your property when you need to. Pattern over multiple incidents establishes the nuisance." },
      { quote: "It was my guests, not me.", pill: "Guests", rebuttal: "<strong>Rebuttal:</strong> homeowners are responsible for their guests' parking in most state nuisance laws. The neighbor's failure to control guests is the actionable conduct." },
      { quote: "Public street parking is fair game.", pill: "Public street", rebuttal: "<strong>Rebuttal:</strong> the area in front of your driveway is not public parking. Most cities specifically prohibit blocking residential driveways. Bring the city ordinance." },
    ],
  },

  outcomes: {
    h2: { pre: "How much do owners ", em: "actually recover", post: "?" },
    lede: "Typical recovery in blocking cases.",
    bands: [
      { label: "Low", range: "$100 to $500", body: "<strong>Towing costs only.</strong> Court awards documented towing fees but not consequential damages.", tier: "low" },
      { label: "Mid", range: "$500 to $2,500", body: "<strong>Towing plus lost wages.</strong> Most common with documented pattern.", tier: "mid" },
      { label: "High", range: "$2,500 to $10,000+", body: "<strong>Major pattern + emotional distress.</strong> Sustained harassment-level blocking with significant lost wages and impact.", tier: "high" },
    ],
  },

  stateSection: null,

  alternatives: {
    h2: { pre: "What are the ", em: "alternatives", post: " to small claims?" },
    lede: "Police, parking enforcement, and HOA action often resolve blocking before court.",
    cards: [
      { title: "Parking enforcement (police or city)", pillLabel: "Free, immediate", pillTier: "primary", whenItFits: "any blocking incident. Most cities tow at no cost for residential driveway blocks. Police also issue citations and fines.", tradeoff: "first-time blocking often gets warning instead of tow. Repeat blocking gets towed." },
      { title: "HOA action", pillLabel: "Free, regulatory", pillTier: "good", whenItFits: "you live in an HOA. Most HOAs have parking rules. HOA citations create written records useful for small-claims pattern.", tradeoff: "no enforcement authority beyond fines. HOA fines establish pattern for damages case." },
      { title: "Small claims (this guide)", pillLabel: "For damages", pillTier: "warn", whenItFits: "documented pattern of blocking causing real damages. Damages within your state's cap.", tradeoff: "30 to 90 day timeline." },
    ],
  },

  cta: {
    h2: { pre: "Stop the ", em: "blocking", post: "." },
    body: "Demand letters with police-call records usually stop blocking. Tow first, document second, sue third. Our generator builds yours in under two minutes.",
    receipt: { label: "example · 4 incidents documented", items: [
      { label: "Towing costs", amount: "$800" },
      { label: "Lost wages", amount: "+ $1,400" },
      { label: "Filing fee + interest", amount: "+ $200" },
    ], total: "$2,400", totalLabel: "Total claim", note: "Illustrative. Sustained blocking patterns push higher." },
  },

  faqs: [
    { q: "Can I tow a car blocking my driveway?", a: "In most cities, yes. Call the non-emergency police line. Most cities have a 'driveway block' towing protocol that allows immediate towing at no cost to the homeowner. Some cities require a posted sign on your property; most don't for residential driveways." },
    { q: "What if my neighbor's guest blocks me?", a: "Same towing process. The vehicle is the issue, not who owns it. Tow it. The neighbor is responsible for guests under most nuisance laws and will usually intervene quickly to keep their guests in good standing." },
    { q: "Can I sue for the time I missed?", a: "Lost wages from missed work are recoverable. Personal time is rarely compensable. Save pay stubs or timesheets showing what you missed and the dates that align with the blocking incidents." },
    { q: "What if there's an easement?", a: "Easement interference is its own claim. The easement document (in your title) defines the scope. Blocking the easement is actionable independently of trespass or nuisance." },
    { q: "What if my neighbor is just rude but not actively blocking?", a: "Rude behavior alone is not actionable. The blocking has to be objective and frequent. Single incidents rarely support a damages case. Pattern matters." },
    { q: "How long do I have to sue?", a: "Trespass and nuisance claims usually run 1 to 3 years from the most recent incident. Continuing-tort cases reset the clock with each new instance. File while documentation is fresh." },
    { q: "Should I install a 'No Parking' sign?", a: "Useful in some jurisdictions but rarely necessary for residential driveways. Most cities already prohibit blocking driveways. The sign helps with public-street complaints; for the neighbor case, the documented pattern is what matters." },
  ],

  relatedSlugs: ["harassment", "property-damage", "construction-damage", "noise", "fence-dispute", "smoke-and-odors"],
};
