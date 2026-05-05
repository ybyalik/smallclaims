import type { ContractorIssue } from "./types";

export const painterDamage: ContractorIssue = {
  slug: "painter-damage",
  ready: true,
  short: "Painter damage",
  breadcrumbLabel: "Painter Damage",

  meta: {
    title: "Can I Sue a Painter for Damage? Small Claims Guide",
    description:
      "Plain-English guide to recovering when a painter damaged floors, furniture, or fixtures. The skipped-drop-cloth pattern, GL insurance route, and a demand-letter template.",
  },

  hero: {
    eyebrowSuffix: "Painter damage",
    h1: { pre: "Can I sue a painter for ", em: "damage", post: "?" },
    leadStrong: "Yes. Painters are responsible for protecting adjacent surfaces.",
    leadBody:
      " A painter who skipped drop cloths, masking, or proper containment and damaged your floors, furniture, fixtures, or landscaping is liable under negligence. The damage is usually minor compared to the work itself, but small claims is well-suited to these cases. Painters carry general liability insurance and (in many states) bonds. The carrier and the contractor licensing board are your fastest pressure points.",
  },

  counter: {
    amount: 2400,
    meta: "Negligence + GL insurance",
    rows: [
      { label: "Floor refinishing", value: "$1,400" },
      { label: "Replaced furniture", value: "+ $800", emphasis: "accent" },
      { label: "Filing fee + interest", value: "$200", emphasis: "muted" },
    ],
    footer: "Sample · within most state small-claims caps",
  },

  whatCounts: {
    h2: { pre: "What counts as ", em: "painter damage", post: "?" },
    lede:
      "Four common patterns. Each is its own claim. Most painter cases involve negligence in surface protection rather than the paint work itself.",
    cards: [
      {
        num: "01",
        title: "Floor damage",
        body:
          "Paint drips on hardwood, scratches from ladders, dents from drop equipment, paint trapped between floorboards. Refinishing or replacement quotes are your damages.",
      },
      {
        num: "02",
        title: "Furniture, fixtures, electronics",
        body:
          "Paint splatter on furniture, damaged or missing items moved during work, paint on electronics or appliances. Replacement-cost receipts are your damages.",
      },
      {
        num: "03",
        title: "Landscaping and exterior",
        body:
          "Paint overspray on plants, killed lawn from spilled solvent, broken irrigation, damaged hardscape. Plant replacement plus restoration is recoverable.",
      },
      {
        num: "04",
        title: "Defective paint job",
        body:
          "Beyond protection failures: peeling within months, color mismatches, visible roller marks, paint over dirty surfaces. Workmanship claims overlap with damage claims when the painter has to redo and protect during the redo.",
      },
    ],
    note: {
      strongIntro: "Document with photos before the painter starts.",
      rest:
        " Date-stamped photos of the area before work begins are decisive evidence. Most homeowners' phones embed timestamps automatically. If the area was clean before and damaged after, the painter is responsible.",
    },
  },

  claim: {
    h2: { pre: "How much can you ", em: "recover", post: "?" },
    lede:
      "Repair or replacement cost is the floor. Painter damage cases stay relatively small but fit small claims well.",
    layers: [
      {
        tag: "Layer 1",
        title: "Repair or refinishing cost",
        body:
          "Hardwood-floor refinishing, carpet cleaning or replacement, fixture repair. Quote from a licensed restoration or refinishing company.",
        amount: "$1,400",
      },
      {
        tag: "Layer 2",
        title: "Replaced furniture, fixtures, plants",
        body:
          "Items damaged beyond cleaning. Replacement-cost basis (what it costs to replace today, not what you paid originally).",
        amount: "+ $800",
        accent: true,
      },
      {
        tag: "Layer 3",
        title: "Filing fees, interest, alternative-room costs",
        body:
          "Filing fee, service-of-process cost, and pre-judgment interest. If a room was unusable while painted, reasonable accommodation costs.",
        amount: "+ $200",
      },
    ],
    total: {
      label: "Sample total within small-claims cap",
      body:
        "Hardwood-floor refinishing for paint drips, plus replaced upholstered chair (paint splatter), plus filing fee.",
      amount: "$2,400",
      sublabel: "illustrative · varies by extent of damage",
    },
  },

  demand: {
    h2: { pre: "Send a ", em: "demand letter", post: " first." },
    lede:
      "Painter demand letters work well because the cases are small and most painters' GL carriers settle quickly to avoid coverage disputes. Copy the carrier on the letter.",
    checklist: [
      "Date the painter worked",
      "Date-stamped photos before and after",
      "Repair quotes from licensed restoration companies",
      "Replacement-cost receipts for items destroyed",
      "GL carrier and policy number from the certificate of insurance",
      "A 14-day deadline before you file",
      "Sent certified mail with copy to the carrier",
    ],
    letter: {
      certifiedNum: "7019 0140 0001 4827 3587",
      date: "May 5, 2026",
      recipientName: "Bright Strokes Painting",
      recipientAddress: "1900 Maple Avenue, Atlanta, GA 30309",
      reLine: "Demand for Damages, Floor and Furniture Damage from Interior Paint Job on April 14, 2026",
      bodyParagraphs: [
        "On April 14 to 16, 2026, your team painted four rooms for $3,200. The team did not use drop cloths in the dining room. As a result, the hardwood floor has multiple paint drips and an upholstered dining chair was hit with overspray and is unusable.",
        "I obtained a quote from West Coast Floor Refinishing (license #38291) for $1,400 to refinish the affected floor area. Replacement cost for the chair (West Elm) is $800. I demand within <strong>fourteen (14) days</strong>:",
      ],
      demandList: [
        "Reimbursement of <strong>$1,400</strong> for floor refinishing;",
        "Reimbursement of <strong>$800</strong> for replaced dining chair.",
      ],
      closingLine:
        "Total demand: <strong>$2,200.00</strong>. Copy of this letter has been sent to your GL carrier (Continental Casualty, policy GL-2026-1182). If unresolved, I will file in Small Claims Court.",
      signatory: "Casey M. Homeowner",
    },
  },

  fileSteps: {
    h2: { pre: "How to ", em: "file", post: " a painter-damage case." },
    lede:
      "Four steps. The certificate of insurance is the gateway. Always start with the GL carrier.",
    steps: [
      {
        title: "File with GL carrier",
        body:
          "Get the painter's certificate of insurance. Call the carrier and file a third-party claim. Provide photos before and after, the contract, and the repair quote. Most carriers settle within 30 to 60 days.",
      },
      {
        title: "File contractor-board complaint (if applicable)",
        body:
          "Painters are licensed in some states (CSLB C-33 in California, others). If your state requires a license and the painter is licensed, file a board complaint. The board can pull the license.",
      },
      {
        title: "File in small claims",
        body:
          "If the carrier and board do not resolve within 60 days, file. Filing fees usually run $30 to $100. File in the county where the damage occurred.",
      },
      {
        title: "Hearing",
        body:
          "Lead with before-and-after photos. Walk through the protection failures (no drop cloths, no masking) and the damage. Hearings usually run 10 to 15 minutes.",
      },
    ],
    aftermath: {
      tag: "After you win",
      title: "Collecting from a painter.",
      bodyHtml:
        "Most painter-damage cases pay through the GL insurance. After 30 days post-judgment, the enforcement tools are a <strong>judgment lien</strong> on real estate, a <strong>bank levy</strong>, and a <strong>writ of execution</strong> on tools or vehicles. Painter judgments rarely require enforcement because the GL carrier resolves most cases at the claim stage.",
    },
  },

  evidence: {
    h2: { pre: "What evidence do you need to ", em: "sue a painter", post: "?" },
    lede:
      "Cases like this are won on before-and-after photos and the GL certificate. The damages are small enough that most carriers settle quickly.",
    cells: [
      {
        kind: "photos",
        tag: "Damage photos",
        photos: [
          { id: "1581094271901-8022df4466f9", cap: "Paint drips on hardwood" },
          { id: "1556909114-f6e7ad7d3136", cap: "Splatter on chair" },
          { id: "1581092335397-9583eb92d232", cap: "Floor close-up" },
          { id: "1503602642458-232111445657", cap: "Damaged baseboard" },
        ],
      },
      {
        kind: "letter",
        tag: "Refinishing quote",
        letterhead: "West Coast Floor Refinishing · License #38291",
        date: "April 22, 2026",
        recipientName: "Casey Homeowner",
        reLine: "Quote · Hardwood floor refinishing",
        bodyParagraphs: [
          "Inspected dining room hardwood. Paint drips and overspray throughout 220 sq ft. Selective patching not feasible due to color match.",
          "Cost to sand and refinish entire dining room floor: $1,400. Estimated 3 working days.",
        ],
        signatory: "T. Romero",
        signatoryTitle: "Project Manager",
      },
      {
        kind: "handbook",
        tag: "Painter's GL certificate",
        documentTitle: "Continental Casualty · Commercial GL Certificate",
        sectionTitle: "Bright Strokes Painting · Policy GL-2026-1182",
        bodyParagraphs: [
          "Each Occurrence: $1,000,000",
          "Damage to Rented Premises: $300,000",
          "Personal & Adv Injury: $1,000,000",
          "Products-Completed Operations: $2,000,000",
        ],
        highlight:
          "Damage during work covered under 'Each Occurrence.' Carrier must defend and indemnify.",
        footer: "Effective 03/15/2026 to 03/15/2027",
      },
      {
        kind: "receipt",
        tag: "Replacement chair",
        vendor: "WEST ELM · TRADITIONAL",
        vendorAddr: "Replacement order · Atlanta, GA",
        receiptNum: "Order #82218",
        date: "04/22/2026",
        lineItems: [
          { label: "Upholstered dining chair", amount: "$680.00" },
          { label: "Tax + delivery", amount: "$120.00" },
        ],
        subtotal: "$800.00",
        total: "$800.00",
        footer: "Replacement-cost basis · original destroyed by overspray",
      },
    ],
  },

  defenses: {
    h2: { pre: "Common painter ", em: "defenses", post: ", with rebuttals." },
    lede:
      "Three arguments cover most painter cases. Photos shut down most of them.",
    items: [
      {
        quote: "The damage was preexisting.",
        pill: "Most common",
        rebuttal:
          "<strong>Rebuttal:</strong> bring date-stamped photos of the area before the painter started. Most phones embed timestamps automatically. The before-and-after timeline is decisive.",
      },
      {
        quote: "You agreed to leave items in the room.",
        pill: "Acceptance",
        rebuttal:
          "<strong>Rebuttal:</strong> agreement to leave furniture in a room does not waive the painter's duty to protect it. The painter was responsible for masking, drop cloths, and reasonable care. If they did not protect the items, that is negligence regardless of where the items were.",
      },
      {
        quote: "Our standard contract limits liability to the cost of the paint job.",
        pill: "Limitation",
        rebuttal:
          "<strong>Rebuttal:</strong> most state consumer-protection laws prohibit pre-loss waivers of negligence liability. Courts often strike standard 'limitation of liability' clauses in service contracts as unconscionable when the contractor's negligence caused damage.",
      },
    ],
  },

  outcomes: {
    h2: { pre: "How much do homeowners ", em: "actually win", post: "?" },
    lede:
      "Typical recovery in painter-damage cases. The carrier route usually pays full repair plus reasonable belongings.",
    bands: [
      {
        label: "Low",
        range: "$200 to $1,000",
        body:
          "<strong>Cleaning and minor repairs.</strong> Court awards a fix-and-clean amount. Common when the damage is contained.",
        tier: "low",
      },
      {
        label: "Mid",
        range: "$1,000 to $3,500",
        body:
          "<strong>Floor refinishing plus replaced items.</strong> Most common when the protection failure caused damage to multiple surfaces.",
        tier: "mid",
      },
      {
        label: "High",
        range: "$3,500 to $10,000+",
        body:
          "<strong>Major refinishing or restoration.</strong> Hardwood floors throughout multiple rooms, plus replaced furniture. Cases beyond the cap need higher courts.",
        tier: "high",
      },
    ],
  },

  stateSection: null,

  alternatives: {
    h2: { pre: "What are the ", em: "alternatives", post: " to small claims?" },
    lede:
      "Painter cases are well-served by the GL insurance route because painters carry it and the damages are usually within policy limits.",
    cards: [
      {
        title: "Painter's GL insurance",
        pillLabel: "Free, fast, biggest payer",
        pillTier: "primary",
        whenItFits:
          "the painter carries general liability insurance (most do). File directly with the carrier using the certificate of insurance. Most claims settle within 30 to 60 days.",
        tradeoff:
          "no leverage if the painter was uninsured.",
      },
      {
        title: "State contractor licensing board",
        pillLabel: "Free, regulatory",
        pillTier: "good",
        whenItFits:
          "your state requires painter licensing (California: C-33 license type) and the painter is licensed. The board investigates damage complaints and assesses fines.",
        tradeoff:
          "many states do not license painting separately. Texas, Georgia, and others have no painting license requirement.",
      },
      {
        title: "Small claims (this guide)",
        pillLabel: "When insurance fails",
        pillTier: "warn",
        whenItFits:
          "the carrier denied the claim or the painter was uninsured. Damages within your state's cap.",
        tradeoff:
          "30 to 90 day timeline. Filing fee $30 to $100.",
      },
    ],
  },

  cta: {
    h2: { pre: "Recover the ", em: "repair cost", post: "." },
    body:
      "Painter demand letters work fast when copied to the GL carrier. Most cases settle at the demand stage. Our generator builds yours in under two minutes.",
    receipt: {
      label: "example · paint damage to floor and furniture",
      items: [
        { label: "Floor refinishing", amount: "$1,400" },
        { label: "Replaced furniture", amount: "+ $800" },
        { label: "Filing fee + interest", amount: "+ $200" },
      ],
      total: "$2,400",
      totalLabel: "Total claim",
      note: "Illustrative. Bigger jobs with multi-room hardwood damage push higher.",
    },
  },

  faqs: [
    {
      q: "Do painters carry insurance?",
      a: "Most legitimate painters do, but it varies. State-licensed painters (California's C-33 and similar) are generally required to carry GL coverage. Unlicensed painters often do not. Always ask for the certificate of insurance before hiring. If they do not have one, expect to absorb damages they cause.",
    },
    {
      q: "How long do I have to find damage after the painter leaves?",
      a: "Negligence claims typically run 2 to 4 years from the date of damage. Latent damage (paint trapped under furniture, not noticed for months) starts the clock when discovered. Move fast for documentation reasons; carriers prefer fresh evidence.",
    },
    {
      q: "Can I sue if the paint job itself was bad?",
      a: "Yes. Workmanship claims overlap with damage claims. Peeling paint, color mismatches, visible roller marks, and paint over dirty surfaces are workmanship issues. The implied warranty of workmanlike construction lets you recover the cost to redo. Pair with damage claims if both apply.",
    },
    {
      q: "What if the painter was a small operation with no insurance?",
      a: "Recovery is limited to whatever assets the painter has. The judgment is still worth pursuing because it appears on credit reports and accrues interest. State contractor-board complaints (where applicable) can prevent the painter from operating in the future even if you cannot collect the full judgment.",
    },
    {
      q: "Should I dock the final payment instead of suing?",
      a: "Sometimes. If the damages are clearly the painter's fault, you can withhold the final payment in proportion to the damages. But document everything and send written notice. Painters can file a mechanic's lien if you withhold without sending a clear damages itemization.",
    },
    {
      q: "Do I need before-and-after photos?",
      a: "Yes, ideally. Most phones now embed timestamps automatically. If you do not have before photos, witness statements from other people who saw the area before work started can substitute. Workmanship reports from a second-opinion painter also help establish what was original versus damaged.",
    },
    {
      q: "Can I claim hotel or alternative-room costs?",
      a: "Sometimes. If a room is unusable during repair (drying, refinishing, fume containment), reasonable accommodation costs are recoverable. Save receipts. Cases involving multiple rooms or whole-house impacts have stronger alternative-housing claims than single-room jobs.",
    },
  ],

  relatedSlugs: [
    "damaged-house",
    "deposit-and-disappearing",
    "poor-workmanship",
    "handyman-bad-work",
    "landscaper-bad-work",
    "unfinished-work",
  ],
};
