import type { ContractorIssue } from "./types";

export const poorWorkmanship: ContractorIssue = {
  slug: "poor-workmanship",
  ready: true,
  short: "Poor workmanship",
  breadcrumbLabel: "Poor Workmanship",

  meta: {
    title: "Can I Sue a Contractor for Poor Workmanship? Small Claims Guide",
    description:
      "Plain-English guide to suing a contractor for defective work. The implied warranty of workmanlike construction, cost-to-redo damages, expert opinions, and a demand-letter template.",
  },

  hero: {
    eyebrowSuffix: "Poor workmanship",
    h1: { pre: "Can I sue a contractor for ", em: "poor workmanship", post: "?" },
    leadStrong: "Yes. Defective work breaks an implied warranty in nearly every state.",
    leadBody:
      " The 'implied warranty of workmanlike construction' is a rule that a contractor must do the work to the standard of the trade, even if the written contract says nothing about quality. If the work is defective, you can recover the cost to redo it. Photos, an industry-standards reference, and a written quote from a replacement contractor are usually enough. File a complaint with your state's licensing board first; many cases settle before court.",
  },

  counter: {
    amount: 6800,
    meta: "Implied warranty of workmanlike construction",
    rows: [
      { label: "Cost to redo defective work", value: "$5,200" },
      { label: "Damage caused by the bad work", value: "+ $1,400", emphasis: "accent" },
      { label: "Filing fee + interest", value: "$200", emphasis: "muted" },
    ],
    footer: "Sample · within most state small-claims caps",
  },

  whatCounts: {
    h2: { pre: "What counts as ", em: "poor workmanship", post: "?" },
    lede:
      "Four common types. The standard is whatever a competent member of the trade would consider acceptable. Trade publications, manufacturer specs, and replacement-contractor opinions establish that standard.",
    cards: [
      {
        num: "01",
        title: "Below industry standard",
        body:
          "Work that does not meet the standards of the trade: tile not laid level, cabinets not square, drywall finishes that show seams, framing out of plumb. Industry guides (NAHB Residential Construction Performance Guidelines) define tolerances and are admissible evidence.",
      },
      {
        num: "02",
        title: "Code violations",
        body:
          "Work that fails inspection or violates the building code. Missing permits where required. Improper electrical (wrong wire gauge, missing arc-fault, exposed splices). Plumbing without proper vents or traps. Code violations are objective evidence of defective work.",
      },
      {
        num: "03",
        title: "Manufacturer-specification violations",
        body:
          "Most building products (windows, flashing, roofing, paint) come with installation specs. Skipping or violating them voids manufacturer warranties and is per-se defective workmanship. Bring the product spec sheet plus photos of the violation.",
      },
      {
        num: "04",
        title: "Damage caused by the work",
        body:
          "When defective work damages other parts of the house: leaks from bad flashing damaging interior walls, failing waterproofing causing mold, electrical fires from improper wiring. The damage cost stacks on top of the cost-to-redo.",
      },
    ],
    note: {
      strongIntro: "Get a second opinion in writing.",
      rest:
        " A written assessment from a licensed contractor describing the defects and the cost to redo is the centerpiece of your case. Many contractors do paid 'second-opinion' visits for $150 to $500. Spend the money before filing.",
    },
  },

  claim: {
    h2: { pre: "How much can you ", em: "claim", post: "?" },
    lede:
      "The cost to redo is the floor. Damage caused by the bad work and any cost-difference for materials stack on top.",
    layers: [
      {
        tag: "Layer 1",
        title: "Cost to redo defective work",
        body:
          "Quote from a replacement contractor for the cost to demo what is wrong and redo it correctly. This is the centerpiece of your damages.",
        amount: "$5,200",
      },
      {
        tag: "Layer 2",
        title: "Damage caused by the work",
        body:
          "Water damage from bad flashing, electrical issues from improper wiring, structural problems from failed framing. Add the repair cost to the redo cost.",
        amount: "+ $1,400",
        accent: true,
      },
      {
        tag: "Layer 3",
        title: "Filing fees, expert reports, interest",
        body:
          "Filing fee, the cost of paid second-opinion contractor reports (often $150 to $500), and pre-judgment interest at your state's legal rate.",
        amount: "+ $200",
      },
    ],
    total: {
      label: "Sample total within small-claims cap",
      body:
        "Cost to demo and redo defective tile and waterproofing, plus repair to interior walls damaged by leak, plus filing fee.",
      amount: "$6,800",
      sublabel: "illustrative · varies by trade and damage scope",
    },
  },

  demand: {
    h2: { pre: "Send a ", em: "demand letter", post: " first." },
    lede:
      "Workmanship demand letters work especially well when paired with a paid second-opinion report. The contractor knows that a board complaint plus a written expert opinion are decisive evidence and most settle to avoid the licensing risk.",
    checklist: [
      "Description of the defective work and where it is",
      "Photos showing the defects",
      "Industry-standard or code reference (NAHB guidelines, building code section)",
      "Written second-opinion contractor report with cost-to-redo",
      "A 14-day deadline before you file",
      "Sent certified mail with return receipt",
    ],
    letter: {
      certifiedNum: "7019 0140 0001 4827 3582",
      date: "May 5, 2026",
      recipientName: "Goldstar Tile and Stone",
      recipientAddress: "115 Workshop Way, Tampa, FL 33602",
      reLine: "Demand for Damages, Defective Tile Installation Dated March 14, 2026",
      bodyParagraphs: [
        "On March 14 to 21, 2026, you installed bathroom tile for $4,800 under our written contract. The work has multiple defects: lippage exceeds NAHB tolerances on 35 percent of joints; grout was applied before thinset cured, causing cracking; waterproofing membrane was not installed (visible from the demolition). The shower has been leaking into the kitchen ceiling for three weeks.",
        "I obtained a second-opinion report from Pinnacle Tile (license #4827, attached) confirming the defects and quoting $5,200 to demo and redo. Repair to the kitchen ceiling adds $1,400. I demand within <strong>fourteen (14) days</strong>:",
      ],
      demandList: [
        "Refund of <strong>$4,800</strong> paid (work has to be entirely redone);",
        "Reimbursement of <strong>$1,400</strong> for water damage to kitchen ceiling.",
      ],
      closingLine:
        "Total demand: <strong>$6,200.00</strong>. If unresolved, I will file a complaint with the Florida Department of Business and Professional Regulation, claim against your bond, and file in Small Claims Court.",
      signatory: "Morgan Q. Homeowner",
    },
  },

  fileSteps: {
    h2: { pre: "How to ", em: "file", post: " a poor-workmanship case." },
    lede:
      "Four steps. The second-opinion report from a licensed contractor is the spine of the case.",
    steps: [
      {
        title: "Get a paid second-opinion report",
        body:
          "Hire a licensed contractor in the same trade for a paid inspection. Ask for a written report with photos, defect descriptions, and a cost-to-redo quote. This is your expert evidence at the hearing.",
      },
      {
        title: "File contractor-board complaint",
        body:
          "Your state board (CSLB, DBPR, ROC, etc.) takes complaints at no cost. Workmanship cases are exactly what licensing boards investigate. Include the second-opinion report. The board can pull licenses and order restitution.",
      },
      {
        title: "File in small claims",
        body:
          "If the board complaint and bond claim do not resolve within 60 days, file. File in the county where the work was done. Filing fees usually run $30 to $100.",
      },
      {
        title: "Hearing",
        body:
          "Lead with the photos and the second-opinion report. Walk through each defect and tie it to industry standards or code. Hearings usually run 10 to 15 minutes. Reports do most of the talking.",
      },
    ],
    aftermath: {
      tag: "After you win",
      title: "Collecting and bond claims.",
      bodyHtml:
        "Bond claims are the most reliable source of payment in workmanship cases because the surety pays out before other creditors. After judgment, the enforcement tools are a <strong>judgment lien</strong> on real estate, a <strong>bank levy</strong>, and a <strong>writ of execution</strong> on tools or accounts receivable. Workmanship judgments also stay on the contractor&rsquo;s licensing record and can block renewal.",
    },
  },

  evidence: {
    h2: { pre: "What evidence do you need to ", em: "sue a contractor", post: "?" },
    lede:
      "Cases like this turn on photos plus the second-opinion report. The clearer the side-by-side comparison to industry standard, the faster the hearing.",
    cells: [
      {
        kind: "photos",
        tag: "Defect photos",
        photos: [
          { id: "1581094271901-8022df4466f9", cap: "Tile lippage" },
          { id: "1556909114-f6e7ad7d3136", cap: "Cracked grout" },
          { id: "1581092335397-9583eb92d232", cap: "Water damage to ceiling" },
          { id: "1503602642458-232111445657", cap: "Missing waterproofing" },
        ],
      },
      {
        kind: "letter",
        tag: "Second-opinion report",
        letterhead: "Pinnacle Tile · License #4827",
        date: "April 22, 2026",
        recipientName: "Morgan Q. Homeowner",
        reLine: "Bathroom tile defect inspection · Report #2026-118",
        bodyParagraphs: [
          "Inspected the bathroom installation on April 22, 2026. Multiple defects observed: tile lippage averaging 1/8 inch (NAHB tolerance is 1/32 inch), grout cracking consistent with premature application, and absence of waterproofing membrane confirmed by drilled inspection.",
          "Cost to demo and reinstall to industry standard: $5,200. This is a complete tear-out; selective repair is not feasible.",
        ],
        signatory: "K. Petrov",
        signatoryTitle: "Master Tile Installer · 22 yrs",
      },
      {
        kind: "handbook",
        tag: "Industry standard",
        documentTitle: "NAHB Residential Construction Performance Guidelines",
        sectionTitle: "Section 5-3 · Tile Lippage",
        bodyParagraphs: [
          "Lippage between adjacent tile shall not exceed 1/32 inch when grout joint width is 1/16 inch or less, or 1/16 inch when grout joint width exceeds 1/16 inch.",
        ],
        highlight:
          "Average lippage measured on this job: 1/8 inch (4x the maximum tolerance).",
        footer: "NAHB guidelines are admissible as industry-standard evidence",
      },
      {
        kind: "receipt",
        tag: "Original payment",
        vendor: "GOLDSTAR TILE AND STONE",
        vendorAddr: "License #FL-CGC1517532 · Tampa, FL",
        receiptNum: "Invoice #2218",
        date: "03/21/2026",
        lineItems: [
          { label: "Bathroom tile install (78 sq ft)", amount: "$3,200.00" },
          { label: "Materials and grout", amount: "$1,200.00" },
          { label: "Waterproofing membrane (charged)", amount: "$400.00" },
        ],
        subtotal: "$4,800.00",
        total: "$4,800.00",
        footer: "Paid in full · waterproofing was charged but not installed",
      },
    ],
  },

  defenses: {
    h2: { pre: "Common contractor ", em: "defenses", post: ", with rebuttals." },
    lede:
      "Three arguments cover most workmanship cases. Each has a clean rebuttal if your photos and report are in order.",
    items: [
      {
        quote: "The defects are normal and within tolerance.",
        pill: "Most common",
        rebuttal:
          "<strong>Rebuttal:</strong> the NAHB Residential Construction Performance Guidelines define tolerance for every common trade. Bring the relevant section. The second-opinion report should explicitly compare actual to tolerance.",
      },
      {
        quote: "You provided defective materials. The work is fine.",
        pill: "Materials",
        rebuttal:
          "<strong>Rebuttal:</strong> if the materials were the issue, the contractor should have refused to install them. The implied warranty of workmanlike construction includes the duty to use suitable materials. They cannot install bad materials and then blame the homeowner.",
      },
      {
        quote: "You signed off on the work when you paid.",
        pill: "Acceptance",
        rebuttal:
          "<strong>Rebuttal:</strong> payment is not legal acceptance. Most states allow homeowners to discover and bring workmanship claims for years after the work is paid. Latent defects (problems hidden until later) have their own discovery clock.",
      },
    ],
  },

  outcomes: {
    h2: { pre: "How much do homeowners ", em: "actually win", post: "?" },
    lede:
      "Typical recovery in workmanship cases. The second-opinion report drives the result.",
    bands: [
      {
        label: "Low",
        range: "$500 to $2,500",
        body:
          "<strong>Partial repair cost.</strong> Court awards a fix-and-patch amount instead of a full redo. Common when the defect is contained and photos are weak.",
        tier: "low",
      },
      {
        label: "Mid",
        range: "$2,500 to $8,000",
        body:
          "<strong>Cost to redo plus damage.</strong> Most common when the second-opinion report is clear and the work has to be entirely demoed and replaced.",
        tier: "mid",
      },
      {
        label: "High",
        range: "$8,000 to $20,000+",
        body:
          "<strong>Cap-of-the-court awards.</strong> Major workmanship failures with significant damage to the rest of the home (water, structural, electrical fire), or unlicensed-contractor recovery.",
        tier: "high",
      },
    ],
  },

  stateSection: null,

  alternatives: {
    h2: { pre: "What are the ", em: "alternatives", post: " to small claims?" },
    lede:
      "Workmanship cases have unusually strong out-of-court options. Try these in order before filing.",
    cards: [
      {
        title: "State contractor licensing board",
        pillLabel: "Free, fast, biggest hammer",
        pillTier: "primary",
        whenItFits:
          "the contractor is licensed. Boards investigate workmanship complaints aggressively because a license carries an obligation to do work to the standard of the trade.",
        tradeoff:
          "no leverage if the contractor is unlicensed.",
      },
      {
        title: "Bond claim",
        pillLabel: "Best chance of payment",
        pillTier: "good",
        whenItFits:
          "the contractor is licensed and bonded. File with the surety. Bond pays out before other creditors. Especially useful when the contractor is insolvent.",
        tradeoff:
          "the bond may have other claimants competing for the same pool.",
      },
      {
        title: "Small claims (this guide)",
        pillLabel: "When the others fail",
        pillTier: "warn",
        whenItFits:
          "board and bond did not resolve within 60 days, or the contractor was unlicensed. Damages within your state's cap.",
        tradeoff:
          "30 to 90 day timeline. Filing fee $30 to $100.",
      },
    ],
  },

  cta: {
    h2: { pre: "Recover the ", em: "cost to redo", post: "." },
    body:
      "Workmanship demand letters work especially well when paired with a written second-opinion report. The contractor knows the report is decisive evidence and most settle. Our generator builds yours in under two minutes.",
    receipt: {
      label: "example · defective tile + water damage",
      items: [
        { label: "Cost to redo", amount: "$5,200" },
        { label: "Water-damage repair", amount: "+ $1,400" },
        { label: "Filing fee + interest", amount: "+ $200" },
      ],
      total: "$6,800",
      totalLabel: "Total claim",
      note: "Illustrative. Larger workmanship failures with structural or fire damage push higher.",
    },
  },

  faqs: [
    {
      q: "What is the implied warranty of workmanlike construction?",
      a: "A rule recognized in nearly every state that a contractor must perform work to the standard of the trade, even if the contract says nothing about quality. Defective work breaks the warranty and lets you recover the cost to redo. The standard is whatever a competent member of the trade would consider acceptable.",
    },
    {
      q: "How do I prove poor workmanship?",
      a: "Photos plus a second-opinion report from a licensed contractor in the same trade. The report should describe the defects, compare them to industry standards (NAHB guidelines, building code, manufacturer specs), and quote the cost to redo. Expect to pay $150 to $500 for a thorough report.",
    },
    {
      q: "What are NAHB Performance Guidelines?",
      a: "The National Association of Home Builders publishes a tolerance manual covering tile, drywall, framing, electrical, plumbing, and other trades. Courts and licensing boards routinely cite NAHB tolerances as the standard of acceptable work. The guideline is your benchmark when comparing actual to acceptable.",
    },
    {
      q: "Can I sue if I already paid in full?",
      a: "Yes. Payment is not legal acceptance. Most states allow homeowners to bring workmanship claims for years after the work is paid. Latent defects (problems hidden until later) have their own discovery clock that starts when you discovered or reasonably should have discovered the defect.",
    },
    {
      q: "How long do I have to sue for poor workmanship?",
      a: "Breach of contract and warranty claims usually run 3 to 6 years from the date of completion. Latent-defect claims often run from when the defect was reasonably discoverable. Some states have construction-specific 'statutes of repose' that cap the window at 8 to 12 years from completion. Check your state.",
    },
    {
      q: "What if the contractor was unlicensed?",
      a: "Most states make this work in your favor. An unlicensed contractor cannot enforce the contract or sue you for the unpaid balance. In California (Bus & Prof Code § 7031) and several other states, you can recover every dollar you paid, regardless of the work's quality.",
    },
    {
      q: "Will the contractor's insurance cover this?",
      a: "Sometimes. General liability insurance covers damage caused by the work (water damage, electrical fires) but not the cost to redo the defective work itself (that is contractual, not covered). For workmanship, the bond claim is the usual path to recovery.",
    },
  ],

  relatedSlugs: [
    "deposit-and-disappearing",
    "unfinished-work",
    "damaged-house",
    "handyman-bad-work",
    "roofer-leaking-roof",
    "plumber-damage",
  ],
};
