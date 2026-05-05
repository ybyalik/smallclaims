import type { ContractorIssue } from "./types";

export const damagedHouse: ContractorIssue = {
  slug: "damaged-house",
  ready: true,
  short: "Damaged house",
  breadcrumbLabel: "Damaged House",

  meta: {
    title: "Can I Sue a Contractor for Damaging My House? Small Claims Guide",
    description:
      "Plain-English guide to recovering when a contractor damaged your home (water damage, electrical fires, structural cracks). Insurance claims, negligence, and a demand-letter template that gets a response.",
  },

  hero: {
    eyebrowSuffix: "Damaged your house",
    h1: { pre: "Can I sue a contractor for ", em: "damaging my house", post: "?" },
    leadStrong: "Yes. Contractors are responsible for damage their work causes.",
    leadBody:
      " A contractor whose work damaged your home (broken pipe causing water damage, electrical fire from improper wiring, structural cracks from rough framing) is liable under negligence and breach of contract. The first call is to the contractor's general liability insurance carrier, which covers exactly this kind of damage. The second is your state's contractor licensing board. Small claims is the third option if neither produces a fast resolution.",
  },

  counter: {
    amount: 6500,
    meta: "Negligence + breach + GL insurance",
    rows: [
      { label: "Repair cost (water damage)", value: "$4,800" },
      { label: "Replaced belongings", value: "+ $1,500", emphasis: "accent" },
      { label: "Filing fee + interest", value: "$200", emphasis: "muted" },
    ],
    footer: "Sample · within most state small-claims caps",
  },

  whatCounts: {
    h2: { pre: "What kinds of ", em: "house damage", post: " can you sue for?" },
    lede:
      "Four common patterns. Each is a separate claim. Most cases combine breach of contract (defective work) with negligence (the resulting damage).",
    cards: [
      {
        num: "01",
        title: "Water damage from plumbing or roof work",
        body:
          "Burst pipe from improper soldering, missing flashing causing roof leak, failed waterproofing in a bathroom remodel. The damage extends beyond the work itself: drywall, flooring, cabinets, electrical, mold remediation. All of it is recoverable.",
      },
      {
        num: "02",
        title: "Electrical fires or shorts",
        body:
          "Improper wiring, missing arc-fault interrupters, exposed splices, wrong-gauge wire. Fires cause damage to walls, ceilings, belongings, sometimes the entire structure. Electrical work without permits and inspections often correlates with these failures.",
      },
      {
        num: "03",
        title: "Structural damage during work",
        body:
          "Cracked foundations from heavy equipment, broken floor joists from cutting load-bearing material, walls out of plumb after framing work. These cases often involve homeowners insurance subrogation against the contractor's GL policy.",
      },
      {
        num: "04",
        title: "Damage to non-work-area items",
        body:
          "Scratched hardwood, broken windows, damaged appliances, ruined furniture during the project. Many contractors do not protect adjacent areas. The damage to non-project areas is straight negligence and usually covered by the contractor's GL insurance.",
      },
    ],
    note: {
      strongIntro: "Call the GL insurance carrier first.",
      rest:
        " Every legitimate contractor carries general liability insurance specifically for damage like this. The certificate of insurance shows the carrier and the policy number. File a claim directly with the insurance company. Most cases are resolved within 30 to 60 days at the carrier without ever filing in court.",
    },
  },

  claim: {
    h2: { pre: "How much can you ", em: "recover", post: "?" },
    lede:
      "Repair cost is the floor. Replaced belongings, alternative housing, and consequential damages stack on top.",
    layers: [
      {
        tag: "Layer 1",
        title: "Repair cost",
        body:
          "Quote from a licensed contractor (different from the one who caused the damage) for the cost to fix. Drywall, flooring, electrical, plumbing, mold remediation, painting. Get the estimate in writing.",
        amount: "$4,800",
      },
      {
        tag: "Layer 2",
        title: "Replaced belongings and alternative housing",
        body:
          "Furniture, electronics, clothing damaged by water or smoke. Hotel costs while the home is uninhabitable. Lost food. Document with photos and replacement-cost receipts.",
        amount: "+ $1,500",
        accent: true,
      },
      {
        tag: "Layer 3",
        title: "Filing fees, interest, expert reports",
        body:
          "Filing fee, the cost of any expert reports (mold inspection, structural engineer), and pre-judgment interest at your state's legal rate.",
        amount: "+ $200",
      },
    ],
    total: {
      label: "Sample total within small-claims cap",
      body:
        "Repair cost for water damage from a plumbing failure, plus replaced furniture and three nights at a hotel, plus filing fee.",
      amount: "$6,500",
      sublabel: "illustrative · varies by damage type and severity",
    },
  },

  demand: {
    h2: { pre: "Send a ", em: "demand letter", post: " first." },
    lede:
      "Damage demand letters work best when copied to the contractor's GL insurance carrier. The carrier wants to settle to avoid coverage litigation, and the carrier's interest aligns with yours: pay the claim and move on.",
    checklist: [
      "Date and description of the work that caused damage",
      "Description of the damage with photos",
      "Repair quote from a licensed contractor (not the one who caused the damage)",
      "Replaced-belongings list with replacement-cost receipts",
      "GL insurance carrier and policy number (from the certificate of insurance)",
      "A 14-day deadline before you file",
      "Sent certified mail with copy to the carrier",
    ],
    letter: {
      certifiedNum: "7019 0140 0001 4827 3583",
      date: "May 5, 2026",
      recipientName: "Reliable Plumbing Inc.",
      recipientAddress: "1810 Pine Street, Houston, TX 77002",
      reLine: "Demand for Damages, Water Damage from Failed Soldering Job on April 18, 2026",
      bodyParagraphs: [
        "On April 18, 2026, you replaced a copper water line in our kitchen for $850. The next morning, the soldered joint failed and the kitchen and adjacent dining room flooded for approximately three hours before I noticed and shut off the main. Damage includes warped hardwood floors, soaked drywall, and a ruined dining room rug.",
        "I obtained a repair quote from American Restoration (license #38291, attached) for $4,800 to repair flooring, drywall, and remediate mold. Replaced belongings (rug, two chairs) total $1,500. I demand within <strong>fourteen (14) days</strong>:",
      ],
      demandList: [
        "Reimbursement of <strong>$4,800</strong> in repair costs;",
        "Reimbursement of <strong>$1,500</strong> in replaced belongings.",
      ],
      closingLine:
        "Total demand: <strong>$6,300.00</strong>. Copy of this letter has been sent to your GL carrier (Acme Casualty, policy GL-2026-4218). If unresolved, I will file in Small Claims Court.",
      signatory: "Avery K. Homeowner",
    },
  },

  fileSteps: {
    h2: { pre: "How to ", em: "file", post: " a damage case." },
    lede:
      "Four steps. The insurance route usually settles before you file in court. Always start there.",
    steps: [
      {
        title: "File with GL insurance carrier",
        body:
          "Get the contractor's certificate of insurance (every legitimate contractor has one). Call the carrier and file a damage claim directly. The carrier handles the rest. Keep your contractor in copy. Most claims pay out within 30 to 60 days.",
      },
      {
        title: "File contractor-board complaint",
        body:
          "Damage from defective work is exactly what state contractor boards investigate. Filing is free. The board can pull the license, freeze the bond, and assess penalties. Run this in parallel with the insurance claim.",
      },
      {
        title: "File in small claims",
        body:
          "If the insurance and board do not resolve within 60 days, file. File in the county where the damage occurred. Filing fees usually run $30 to $100.",
      },
      {
        title: "Hearing",
        body:
          "Lead with photos of the damage and the repair quote. Show that the damage was caused by the contractor's work, not by something else. Hearings usually run 10 to 15 minutes.",
      },
    ],
    aftermath: {
      tag: "After you win",
      title: "Collecting and insurance routes.",
      bodyHtml:
        "Most damage cases pay through the contractor&rsquo;s GL insurance. After judgment, you can also assign the judgment to the insurance carrier as proof of liability. Beyond insurance, the enforcement tools are a <strong>judgment lien</strong> on real estate, a <strong>bank levy</strong>, and a <strong>writ of execution</strong> on tools or accounts receivable.",
    },
  },

  evidence: {
    h2: { pre: "What evidence do you need to ", em: "sue a contractor", post: "?" },
    lede:
      "Damage cases turn on photos plus a repair quote from a different licensed contractor. The contractor's certificate of insurance is the gateway to recovery.",
    cells: [
      {
        kind: "photos",
        tag: "Damage photos (dated)",
        photos: [
          { id: "1581094271901-8022df4466f9", cap: "Warped hardwood" },
          { id: "1556909114-f6e7ad7d3136", cap: "Soaked drywall" },
          { id: "1581092335397-9583eb92d232", cap: "Ruined rug" },
          { id: "1503602642458-232111445657", cap: "Failed solder joint" },
        ],
      },
      {
        kind: "letter",
        tag: "Repair quote",
        letterhead: "American Restoration · License #38291",
        date: "April 25, 2026",
        recipientName: "Avery Homeowner",
        reLine: "Quote · Water-damage repair from plumbing failure",
        bodyParagraphs: [
          "Scope: remove and replace 240 sq ft of damaged hardwood, replace soaked drywall sections, mold remediation per IICRC standards, paint repaired walls, and re-finish dining room floor to match.",
          "Total: $4,800. Estimated 8 working days. Materials and labor included.",
        ],
        signatory: "T. Romero",
        signatoryTitle: "Project Manager",
      },
      {
        kind: "handbook",
        tag: "Certificate of insurance",
        documentTitle: "Acme Casualty · Commercial GL Certificate",
        sectionTitle: "Reliable Plumbing Inc. · Policy GL-2026-4218",
        bodyParagraphs: [
          "Each Occurrence: $1,000,000",
          "Damage to Rented Premises: $300,000",
          "Personal & Adv Injury: $1,000,000",
          "Products-Completed Operations Aggregate: $2,000,000",
        ],
        highlight:
          "Damage to your home is covered under 'Each Occurrence.' Carrier required to defend and indemnify the contractor up to policy limit.",
        footer: "Effective 01/15/2026 to 01/15/2027",
      },
      {
        kind: "receipt",
        tag: "Replaced belongings",
        vendor: "WEST ELM · TRADITIONAL HOME",
        vendorAddr: "Replacement order · Houston, TX",
        receiptNum: "Order #82218",
        date: "04/22/2026",
        lineItems: [
          { label: "Wool dining room rug 8x10", amount: "$890.00" },
          { label: "Upholstered dining chairs (2)", amount: "$520.00" },
          { label: "Tax + delivery", amount: "$90.00" },
        ],
        subtotal: "$1,500.00",
        total: "$1,500.00",
        footer: "Replacement-cost basis · originals destroyed",
      },
    ],
  },

  defenses: {
    h2: { pre: "Common contractor ", em: "defenses", post: ", with rebuttals." },
    lede:
      "Three arguments cover most damage cases. The repair quote and timeline shut down most of them.",
    items: [
      {
        quote: "The damage was preexisting.",
        pill: "Most common",
        rebuttal:
          "<strong>Rebuttal:</strong> bring date-stamped photos of the area before the work started. Most homeowners' phones now embed timestamps automatically. If the damage appeared after the work, the timing is decisive.",
      },
      {
        quote: "The homeowner caused the damage by misuse.",
        pill: "Misuse",
        rebuttal:
          "<strong>Rebuttal:</strong> show the second-opinion contractor's report identifying the actual cause (failed solder joint, missing flashing, improper splice). The cause should be a workmanship issue, not normal use.",
      },
      {
        quote: "The damage exceeds the cost to redo, so it is not our problem.",
        pill: "Out of scope",
        rebuttal:
          "<strong>Rebuttal:</strong> consequential damages from negligent work are recoverable, not just the cost to redo the work itself. Your damages include the foreseeable consequences (water damage, electrical fires) of the contractor's negligence. The GL insurance covers exactly this.",
      },
    ],
  },

  outcomes: {
    h2: { pre: "How much do homeowners ", em: "actually win", post: "?" },
    lede:
      "Typical recovery in damage cases. Insurance routes usually pay full repair plus reasonable belongings replacement.",
    bands: [
      {
        label: "Low",
        range: "$500 to $2,500",
        body:
          "<strong>Partial repair.</strong> Court awards a fix-and-patch amount instead of full restoration. Common when documentation is light or causation is contested.",
        tier: "low",
      },
      {
        label: "Mid",
        range: "$2,500 to $8,000",
        body:
          "<strong>Full repair plus replaced belongings.</strong> Most common when the repair quote is from a licensed contractor and photos document the chain of damage.",
        tier: "mid",
      },
      {
        label: "High",
        range: "$8,000 to $20,000+",
        body:
          "<strong>Cap-of-the-court awards.</strong> Major water damage, electrical fires, or structural damage where repair plus alternative housing plus replaced belongings hit the cap.",
        tier: "high",
      },
    ],
  },

  stateSection: null,

  alternatives: {
    h2: { pre: "What are the ", em: "alternatives", post: " to small claims?" },
    lede:
      "Damage cases have unusually strong out-of-court options. Always start with the insurance carrier.",
    cards: [
      {
        title: "Contractor's GL insurance carrier",
        pillLabel: "Free, fast, biggest payer",
        pillTier: "primary",
        whenItFits:
          "the contractor carries general liability insurance (every legitimate contractor does). File directly with the carrier using the certificate of insurance. Most carriers settle within 30 to 60 days.",
        tradeoff:
          "no leverage if the contractor was uninsured. Some unlicensed contractors carry no insurance.",
      },
      {
        title: "Your homeowner's insurance",
        pillLabel: "Quick, partial",
        pillTier: "good",
        whenItFits:
          "you have homeowners insurance and the damage is significant. Your carrier pays you, then sues the contractor (subrogation) to recover from the contractor's GL.",
        tradeoff:
          "deductible costs you out of pocket. Claims can affect your premium. Use when you need fast repair and cannot wait for the contractor's carrier.",
      },
      {
        title: "Small claims (this guide)",
        pillLabel: "When insurance fails",
        pillTier: "warn",
        whenItFits:
          "the contractor carries no insurance, the carrier denied the claim, or the resolution was inadequate. Damages within your state's cap.",
        tradeoff:
          "30 to 90 day timeline. Filing fee $30 to $100. Collection from an uninsured contractor can be hard.",
      },
    ],
  },

  cta: {
    h2: { pre: "Recover the ", em: "repair cost", post: "." },
    body:
      "Damage demand letters work especially well when copied to the contractor's GL insurance carrier. The carrier's interest aligns with yours. Our generator builds yours in under two minutes.",
    receipt: {
      label: "example · plumbing-failure water damage",
      items: [
        { label: "Repair cost (water)", amount: "$4,800" },
        { label: "Replaced belongings", amount: "+ $1,500" },
        { label: "Filing fee + interest", amount: "+ $200" },
      ],
      total: "$6,500",
      totalLabel: "Total claim",
      note: "Illustrative. Major fires or structural damage push higher and may exceed the small-claims cap.",
    },
  },

  faqs: [
    {
      q: "What is general liability insurance and how do I claim against it?",
      a: "Every legitimate contractor carries a GL policy that covers damage to property they cause during work. The certificate of insurance shows the carrier and the policy number. Call the carrier directly and file a third-party claim. Provide the contract, photos, repair quote, and your statement. Most carriers settle within 30 to 60 days.",
    },
    {
      q: "What if the contractor has no insurance?",
      a: "You have to recover from the contractor directly through the bond claim and small claims. Many states require contractors to carry insurance and unlicensed contractors often do not. The bond claim becomes critical because it is the most reliable source of payment from a no-insurance contractor.",
    },
    {
      q: "Should I use my own homeowners insurance or the contractor's?",
      a: "Try the contractor's first. Their GL is designed for exactly this. Use your homeowners insurance only when you need fast repair and cannot wait. Your carrier will pay you and then pursue the contractor (subrogation), but you eat the deductible and the claim may affect your premium.",
    },
    {
      q: "How do I prove the contractor caused the damage?",
      a: "A second-opinion contractor's report identifying the actual cause (failed solder, missing flashing, improper wiring) is the best evidence. Combine with date-stamped photos showing the area before and after. The closer in time the damage to the work, the stronger the causation argument.",
    },
    {
      q: "Can I sue for things they damaged that were not part of the work?",
      a: "Yes. Damage to non-project areas (scratched hardwood from moving tools, broken windows, damaged appliances) is straight negligence. The contractor was responsible for protecting adjacent areas. The damage is recoverable under their GL insurance and at small claims.",
    },
    {
      q: "How long do I have to sue?",
      a: "Negligence claims usually run 2 to 4 years from the date of damage. Breach of contract claims run 3 to 6 years from the breach. Latent damage (mold growing in walls, slow leaks) has its own discovery clock that starts when you reasonably should have known about the damage.",
    },
    {
      q: "What if the damage is bigger than the small-claims cap?",
      a: "Two options. Waive the amount above the cap and stay in small claims (often worth it for speed). Or file in regular civil court with an attorney. Most attorneys take damage cases on contingency when the GL insurance is good for the amount.",
    },
  ],

  relatedSlugs: [
    "deposit-and-disappearing",
    "unfinished-work",
    "poor-workmanship",
    "plumber-damage",
    "roofer-leaking-roof",
    "painter-damage",
  ],
};
