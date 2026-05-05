import type { ContractorIssue } from "./types";

export const rooferLeakingRoof: ContractorIssue = {
  slug: "roofer-leaking-roof",
  ready: true,
  short: "Roofer leaking roof",
  breadcrumbLabel: "Roofer Leaking Roof",

  meta: {
    title: "Can I Sue a Roofer for a Leaking Roof? Small Claims Guide",
    description:
      "Plain-English guide to recovering from a roofer when a new roof leaks. Workmanship warranty plus manufacturer warranty plus interior damage. Bond claims, board complaints, and a demand-letter template.",
  },

  hero: {
    eyebrowSuffix: "Roofer leaking roof",
    h1: { pre: "Can I sue a roofer for a ", em: "leaking roof", post: "?" },
    leadStrong: "Yes. Roofers carry workmanship warranties and the manufacturer warranties stack on top.",
    leadBody:
      " A new roof that leaks within the workmanship warranty period (typically 2 to 10 years) is a clear case. The roofer is responsible for the cost to fix the leak and any interior damage. The shingle manufacturer's warranty (often 25 to 50 years) provides additional protection for material failures. Roofing is heavily licensed in most states, so the contractor licensing board and the bond claim are reliable pressure points.",
  },

  counter: {
    amount: 8500,
    meta: "Workmanship warranty + interior damage",
    rows: [
      { label: "Roof repair (new flashing, redo)", value: "$4,800" },
      { label: "Interior damage repair", value: "+ $3,500", emphasis: "accent" },
      { label: "Filing fee + interest", value: "$200", emphasis: "muted" },
    ],
    footer: "Sample · within most state small-claims caps",
  },

  whatCounts: {
    h2: { pre: "What roofer ", em: "failures", post: " let you sue?" },
    lede:
      "Four common patterns. Most leaking-roof cases involve workmanship rather than material defects, and workmanship is the contractor's responsibility regardless of material warranties.",
    cards: [
      {
        num: "01",
        title: "Improper flashing",
        body:
          "The most common cause of new-roof leaks. Flashing around chimneys, vents, walls, valleys, and skylights has to be installed per manufacturer specs. Skipped step flashing, missing kick-out flashing, or wrong-pitch valley flashing causes leaks within months.",
      },
      {
        num: "02",
        title: "Underlayment shortcuts",
        body:
          "Synthetic underlayment under shingles is required by most building codes and manufacturer specs. Skipping it, using felt where synthetic is required, or improper overlap causes leaks during heavy rain.",
      },
      {
        num: "03",
        title: "Nailing pattern violations",
        body:
          "Each shingle requires 4 to 6 nails per manufacturer specs. Wrong nail placement (too high, too low, too few) creates wind-uplift failures. Over-nailing creates sealant failures. Both void the manufacturer warranty.",
      },
      {
        num: "04",
        title: "Damage to interior from leaks",
        body:
          "Interior ceilings, walls, attic insulation, hardwood floors, and electrical components damaged by water from a defective roof. The roofer is responsible for foreseeable interior damage caused by their workmanship.",
      },
    ],
    note: {
      strongIntro: "Get a second-opinion roofer report.",
      rest:
        " A licensed roofer's written assessment identifying the workmanship defect and quoting the cost to fix is the centerpiece of your case. Many roofers do paid second-opinion inspections for $200 to $500. Spend the money before filing. The report often becomes the GL insurance carrier's settlement basis too.",
    },
  },

  claim: {
    h2: { pre: "How much can you ", em: "recover", post: "?" },
    lede:
      "Roof repair is the floor. Interior damage from leaks stacks on top. The cost to fully redo a defectively-installed roof can hit small-claims caps quickly.",
    layers: [
      {
        tag: "Layer 1",
        title: "Roof repair or partial redo",
        body:
          "Cost to install proper flashing, fix underlayment, redo affected shingle areas, or in severe cases redo the entire roof. Quote from a different licensed roofer.",
        amount: "$4,800",
      },
      {
        tag: "Layer 2",
        title: "Interior damage repair",
        body:
          "Drywall, paint, insulation, hardwood floors, electrical components damaged by leaks. Restoration company quote covers all interior items.",
        amount: "+ $3,500",
        accent: true,
      },
      {
        tag: "Layer 3",
        title: "Filing fees, expert reports, interest",
        body:
          "Filing fee, paid second-opinion report ($200 to $500), pre-judgment interest at your state's legal rate.",
        amount: "+ $200",
      },
    ],
    total: {
      label: "Sample total within small-claims cap",
      body:
        "Cost to install proper flashing and redo affected shingle areas, plus interior damage from leaks, plus filing fee.",
      amount: "$8,500",
      sublabel: "illustrative · varies by roof size and damage extent",
    },
  },

  demand: {
    h2: { pre: "Send a ", em: "demand letter", post: " first." },
    lede:
      "Roofer demand letters work especially well when paired with a second-opinion report identifying the workmanship defect. The roofer knows they cannot beat a written report from a licensed peer.",
    checklist: [
      "Date of installation and date leaking started",
      "The workmanship defect identified by a second-opinion roofer",
      "Photos of the defect and the resulting damage",
      "Quote from a replacement roofer for the fix",
      "Restoration quote for interior damage",
      "A 14-day deadline before you file",
      "Sent certified mail with copy to the GL carrier",
    ],
    letter: {
      certifiedNum: "7019 0140 0001 4827 3586",
      date: "May 5, 2026",
      recipientName: "Skyline Roofing Inc.",
      recipientAddress: "2200 Industrial Way, Charlotte, NC 28202",
      reLine: "Demand for Damages, Defective Roof Installation Dated September 8, 2025",
      bodyParagraphs: [
        "On September 8, 2025, you installed a new asphalt-shingle roof for $14,200. The roof began leaking on October 22, 2025 (less than 7 weeks later). I obtained a second-opinion report from Apex Roofing (license #2218) identifying step flashing missing at the chimney and improper overlap of valley flashing as the cause.",
        "Apex's quote to install proper flashing and redo affected shingle areas: $4,800. American Restoration's quote for interior damage repair (drywall, paint, insulation): $3,500. I demand within <strong>fourteen (14) days</strong>:",
      ],
      demandList: [
        "Reimbursement of <strong>$4,800</strong> for proper flashing and redo;",
        "Reimbursement of <strong>$3,500</strong> for interior-damage repair.",
      ],
      closingLine:
        "Total demand: <strong>$8,300.00</strong>. Copy of this letter has been sent to your GL carrier (West Casualty, policy GL-2025-9821) and the North Carolina Licensing Board for General Contractors. If unresolved, I will file in Small Claims Court.",
      signatory: "Avery J. Homeowner",
    },
  },

  fileSteps: {
    h2: { pre: "How to ", em: "file", post: " a roofer-leak case." },
    lede:
      "Four steps. The second-opinion report is the spine. Insurance and board complaints run in parallel.",
    steps: [
      {
        title: "Get a second-opinion roofer report",
        body:
          "Hire a licensed roofer (different from the one who installed) for a paid inspection. Get a written report with photos, defect descriptions, and a cost-to-fix quote. Expect to pay $200 to $500 for thorough work.",
      },
      {
        title: "File with GL carrier and contractor board",
        body:
          "Roofers carry GL insurance for damage their work causes. File a third-party claim. State boards investigate roofing complaints because of the public-safety implications of leaks. Both run free.",
      },
      {
        title: "File in small claims",
        body:
          "If insurance and board do not resolve within 60 days, file. Filing fees usually run $30 to $100. File in the county where the roof is located.",
      },
      {
        title: "Hearing",
        body:
          "Lead with the second-opinion report and the photos of the defect. Show the timeline of installation and the start of leaks. Hearings usually run 10 to 15 minutes.",
      },
    ],
    aftermath: {
      tag: "After you win",
      title: "Collecting and bond claims.",
      bodyHtml:
        "Roofers carry licensing bonds and GL insurance. Bond claims pay out before other creditors. After 30 days post-judgment, the enforcement tools are a <strong>judgment lien</strong> on real estate, a <strong>bank levy</strong>, and a <strong>writ of execution</strong> on tools or vehicles. Roofing-board complaints can also block license renewal.",
    },
  },

  evidence: {
    h2: { pre: "What evidence do you need to ", em: "sue a roofer", post: "?" },
    lede:
      "Cases like this turn on the second-opinion report and the timeline. Photos of the defect plus interior damage show the chain.",
    cells: [
      {
        kind: "photos",
        tag: "Roof and interior",
        photos: [
          { id: "1581094271901-8022df4466f9", cap: "Missing step flashing" },
          { id: "1556909114-f6e7ad7d3136", cap: "Valley flashing overlap" },
          { id: "1581092335397-9583eb92d232", cap: "Ceiling stain" },
          { id: "1503602642458-232111445657", cap: "Soaked insulation" },
        ],
      },
      {
        kind: "letter",
        tag: "Second-opinion report",
        letterhead: "Apex Roofing · License #2218",
        date: "April 28, 2026",
        recipientName: "Avery Homeowner",
        reLine: "Roof inspection · Report #2026-217",
        bodyParagraphs: [
          "Inspected the roof installed September 8, 2025. Defects observed: step flashing absent at chimney left side; valley flashing has 2-inch overlap (manufacturer spec requires 6 inches); shingle nailing pattern shows over-driven nails on south slope.",
          "Cost to install proper flashing, redo south slope, and add manufacturer-spec valley flashing: $4,800. Estimated 4 working days.",
        ],
        signatory: "K. Thaler",
        signatoryTitle: "Master Roofer · 18 yrs",
      },
      {
        kind: "handbook",
        tag: "Manufacturer spec",
        documentTitle: "GAF Pro-Start Edge Strip · Installation Specifications",
        sectionTitle: "Valley Flashing Overlap",
        bodyParagraphs: [
          "Valley flashing must extend a minimum of 12 inches up each side from the valley centerline. Adjacent flashing pieces must overlap by no less than 6 inches with sealant between layers.",
        ],
        highlight:
          "Inspection found 2-inch overlap. Manufacturer warranty void on valley work as installed.",
        footer: "Manufacturer specs are admissible as industry-standard evidence",
      },
      {
        kind: "receipt",
        tag: "Original payment",
        vendor: "SKYLINE ROOFING INC.",
        vendorAddr: "License #NC-72182 · Charlotte, NC",
        receiptNum: "Invoice #4827",
        date: "09/08/2025",
        lineItems: [
          { label: "Tear-off existing roof", amount: "$2,200.00" },
          { label: "Install architectural shingles", amount: "$8,400.00" },
          { label: "Flashing and venting", amount: "$2,400.00" },
          { label: "Cleanup and disposal", amount: "$1,200.00" },
        ],
        subtotal: "$14,200.00",
        total: "$14,200.00",
        footer: "Paid in full · 10-year workmanship warranty in writing",
      },
    ],
  },

  defenses: {
    h2: { pre: "Common roofer ", em: "defenses", post: ", with rebuttals." },
    lede:
      "Three arguments cover most leaking-roof cases. Each has a clean rebuttal once the second-opinion report is in evidence.",
    items: [
      {
        quote: "The leak is from somewhere else, not our work.",
        pill: "Most common",
        rebuttal:
          "<strong>Rebuttal:</strong> the second-opinion roofer traces the leak source as part of the inspection. A written finding identifying the specific workmanship defect (e.g., missing step flashing) resolves causation.",
      },
      {
        quote: "The shingles are defective. Take it up with the manufacturer.",
        pill: "Material defect",
        rebuttal:
          "<strong>Rebuttal:</strong> manufacturer warranties cover material defects, not installation defects. The second-opinion report should identify whether the failure is workmanship (your case against the roofer) or material (your case against the manufacturer). Most leaks are workmanship.",
      },
      {
        quote: "Our workmanship warranty does not cover leaks during the first 90 days.",
        pill: "Warranty exclusions",
        rebuttal:
          "<strong>Rebuttal:</strong> exclusions of the workmanship warranty cannot waive the implied warranty of workmanlike construction in most states. The implied warranty applies regardless of what the written warranty says. Bring the second-opinion report establishing defective workmanship.",
      },
    ],
  },

  outcomes: {
    h2: { pre: "How much do homeowners ", em: "actually win", post: "?" },
    lede:
      "Typical recovery in leaking-roof cases. The second-opinion report drives the result.",
    bands: [
      {
        label: "Low",
        range: "$500 to $2,500",
        body:
          "<strong>Partial flashing redo.</strong> Court awards the cost to fix the specific defect. Common when the leak is contained and interior damage is minimal.",
        tier: "low",
      },
      {
        label: "Mid",
        range: "$2,500 to $8,000",
        body:
          "<strong>Repair plus interior damage.</strong> Most common when the second-opinion report is clear and the interior damage is documented.",
        tier: "mid",
      },
      {
        label: "High",
        range: "$8,000 to $20,000+",
        body:
          "<strong>Cap-of-the-court awards.</strong> Major flashing failures requiring partial roof redo, plus significant interior damage. Multiple-room damage cases push to the cap.",
        tier: "high",
      },
    ],
  },

  stateSection: null,

  alternatives: {
    h2: { pre: "What are the ", em: "alternatives", post: " to small claims?" },
    lede:
      "Roofing has unusually strong out-of-court options because roofers are heavily licensed and insured.",
    cards: [
      {
        title: "Roofer's GL insurance",
        pillLabel: "Free, fast, biggest payer",
        pillTier: "primary",
        whenItFits:
          "interior damage from the leaks. The roofer's GL covers exactly this. File a third-party claim with the carrier using the certificate of insurance.",
        tradeoff:
          "the carrier may dispute coverage scope (workmanship vs. damage). The second-opinion report establishes the link.",
      },
      {
        title: "State contractor or roofing board",
        pillLabel: "Free, regulatory",
        pillTier: "good",
        whenItFits:
          "the roofer is licensed (most are). Boards investigate roofing complaints aggressively. Florida has a specific roofing license. CSLB roofing classification (C-39) in California.",
        tradeoff:
          "the board can pull the license but does not always order restitution.",
      },
      {
        title: "Small claims (this guide)",
        pillLabel: "When the others fail",
        pillTier: "warn",
        whenItFits:
          "the carrier and board did not resolve within 60 days. Damages within your state's cap.",
        tradeoff:
          "30 to 90 day timeline. Filing fee $30 to $100.",
      },
    ],
  },

  cta: {
    h2: { pre: "Recover the ", em: "repair cost", post: "." },
    body:
      "Roofer demand letters work especially well when paired with a second-opinion report and copied to the GL carrier. Most cases settle at the demand stage. Our generator builds yours in under two minutes.",
    receipt: {
      label: "example · flashing failure + interior damage",
      items: [
        { label: "Roof repair", amount: "$4,800" },
        { label: "Interior damage", amount: "+ $3,500" },
        { label: "Filing fee + interest", amount: "+ $200" },
      ],
      total: "$8,500",
      totalLabel: "Total claim",
      note: "Illustrative. Larger roofs, full re-roofs, or major interior damage push higher.",
    },
  },

  faqs: [
    {
      q: "How long is a roofer's workmanship warranty?",
      a: "Typically 2 to 10 years for asphalt-shingle roofs, 10 to 25 years for metal or tile. The warranty is in writing and should be part of your contract. Even if the written warranty is shorter, the implied warranty of workmanlike construction in most states extends the protection.",
    },
    {
      q: "What is the difference between workmanship warranty and manufacturer warranty?",
      a: "Workmanship is the roofer's responsibility for proper installation. Manufacturer is the shingle company's responsibility for material defects. Workmanship covers most leak causes (flashing, nailing, underlayment). Manufacturer covers material failures (premature shingle aging, blistering, granule loss).",
    },
    {
      q: "Can I claim against the manufacturer warranty?",
      a: "Sometimes. Manufacturer warranties cover material defects but usually require proper installation. Improper installation often voids the manufacturer warranty. The second-opinion report tells you whether the failure is workmanship (the roofer is responsible) or material (the manufacturer is). Most are workmanship.",
    },
    {
      q: "What if the roofer is out of business?",
      a: "Two paths still work: bond claim and GL insurance claim. Both pay even if the company shut down. The bond and the policy were active when the work was done; the obligation to pay survives the company's closure. Both should be on the certificate of insurance.",
    },
    {
      q: "How do I find a roofer's license and bond?",
      a: "Search your state's contractor licensing board website. California: cslb.ca.gov, search for license type C-39. Florida: myfloridalicense.com. The license record shows the bond amount, the surety, current status, and any past complaints.",
    },
    {
      q: "How long do I have to sue?",
      a: "Breach of contract and warranty claims usually run 3 to 6 years from the date of installation. Latent defects (problems that develop later) often have a discovery clock that starts when the leak appeared. Some states have construction-specific statutes of repose capping the window at 8 to 12 years from completion.",
    },
    {
      q: "Will my homeowners insurance cover this?",
      a: "Sometimes for the interior damage, never for the cost to redo the roof. Use your homeowners insurance only when you need fast repair. Your carrier will pay you and pursue the roofer (subrogation), but you eat the deductible and the claim may affect your premium.",
    },
  ],

  relatedSlugs: [
    "damaged-house",
    "poor-workmanship",
    "deposit-and-disappearing",
    "unfinished-work",
    "plumber-damage",
    "painter-damage",
  ],
};
