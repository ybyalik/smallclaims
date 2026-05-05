import type { ContractorIssue } from "./types";

export const plumberDamage: ContractorIssue = {
  slug: "plumber-damage",
  ready: true,
  short: "Plumber damage",
  breadcrumbLabel: "Plumber Damage",

  meta: {
    title: "Can I Sue a Plumber for Damage? Small Claims Guide",
    description:
      "Plain-English guide to suing a plumber for water damage. Plumbers are licensed and insured in nearly every state, so the GL insurance route usually pays full restoration. Plus a demand-letter template.",
  },

  hero: {
    eyebrowSuffix: "Plumber damage",
    h1: { pre: "Can I sue a plumber for ", em: "damage", post: "?" },
    leadStrong: "Yes. Plumbers are licensed and insured in nearly every state.",
    leadBody:
      " A plumber whose work caused water damage (failed solder, missed leak, overtightened fitting, wrong-pressure setting) is liable under negligence and breach of contract. Plumbers carry general liability insurance and surety bonds because most states require them. The fastest recovery path is the contractor's GL insurance, then the state plumbing board, then small claims.",
  },

  counter: {
    amount: 7800,
    meta: "Negligence · plumber GL insurance",
    rows: [
      { label: "Restoration cost (water damage)", value: "$5,800" },
      { label: "Mold remediation", value: "+ $1,800", emphasis: "accent" },
      { label: "Filing fee + interest", value: "$200", emphasis: "muted" },
    ],
    footer: "Sample · within most state small-claims caps",
  },

  whatCounts: {
    h2: { pre: "What plumber failures ", em: "cause damage", post: "?" },
    lede:
      "Four common patterns. Plumbing failures often cascade into much bigger damage than the plumbing job itself.",
    cards: [
      {
        num: "01",
        title: "Failed solder or compression joint",
        body:
          "The most common pattern. A new joint fails after the plumber leaves, releasing water for hours before anyone notices. Damage extends to floors, drywall, cabinets, and often the unit below in multifamily buildings.",
      },
      {
        num: "02",
        title: "Missed pre-existing leak",
        body:
          "Plumber called for a different issue but failed to identify or warn about an active leak. Most states impose a duty of reasonable care that includes flagging visible problems. The missed leak's resulting damage is recoverable.",
      },
      {
        num: "03",
        title: "Improper venting or drainage",
        body:
          "Backed-up sewage from improperly vented drains. Drainage problems from wrong slope. Sewage damage often includes biohazard remediation, replaced flooring, and sometimes replaced cabinets, all recoverable.",
      },
      {
        num: "04",
        title: "Pressure or temperature failures",
        body:
          "Wrong pressure-relief valve setting causing burst pipes. Thermostat or mixing-valve errors causing scalding. Water-heater installation errors. Each of these can produce significant damage and personal-injury risk.",
      },
    ],
    note: {
      strongIntro: "Plumbers carry insurance. Always.",
      rest:
        " State licensing requires it. The contractor's certificate of insurance shows the GL carrier and policy number. File a third-party claim directly with the carrier. Most water-damage claims pay out within 30 to 60 days.",
    },
  },

  claim: {
    h2: { pre: "How much can you ", em: "recover", post: "?" },
    lede:
      "Restoration cost is the floor. Mold remediation, replaced belongings, and alternative housing stack on top.",
    layers: [
      {
        tag: "Layer 1",
        title: "Restoration cost",
        body:
          "Water-damage repair: drywall, flooring, cabinets, electrical (often soaked outlets need replacement), painting. Get an itemized quote from a licensed water-damage restoration company.",
        amount: "$5,800",
      },
      {
        tag: "Layer 2",
        title: "Mold remediation and replaced belongings",
        body:
          "Mold can develop within 24 to 48 hours of water intrusion. Remediation by a licensed mold contractor follows IICRC standards. Add replaced furniture, electronics, and other belongings damaged by water.",
        amount: "+ $1,800",
        accent: true,
      },
      {
        tag: "Layer 3",
        title: "Alternative housing, filing fees, interest",
        body:
          "Hotel costs while the home is being dried and repaired. Filing fee, service-of-process cost, and pre-judgment interest at your state's legal rate.",
        amount: "+ $200",
      },
    ],
    total: {
      label: "Sample total within small-claims cap",
      body:
        "Water-damage restoration plus mold remediation, plus filing fee. Three nights of hotel and replaced rugs included.",
      amount: "$7,800",
      sublabel: "illustrative · varies by extent and trade",
    },
  },

  demand: {
    h2: { pre: "Send a ", em: "demand letter", post: " first." },
    lede:
      "Plumber damage demand letters work best when copied to the GL carrier. The carrier wants to settle to avoid coverage litigation, and your interests align: pay the claim and move on.",
    checklist: [
      "The work that caused damage and the date",
      "Restoration quote from a licensed water-damage company",
      "Mold-remediation quote if mold has developed",
      "Replaced-belongings list with replacement-cost receipts",
      "GL carrier and policy number from the certificate of insurance",
      "A 14-day deadline before you file",
      "Sent certified mail with copy to the carrier",
    ],
    letter: {
      certifiedNum: "7019 0140 0001 4827 3585",
      date: "May 5, 2026",
      recipientName: "Ace Plumbing & Drain",
      recipientAddress: "5500 Industrial Way, Phoenix, AZ 85019",
      reLine: "Demand for Damages, Failed Soldering Job on April 18, 2026",
      bodyParagraphs: [
        "On April 18, 2026, you replaced a copper water line in the kitchen for $850. The next morning, the soldered joint failed and the kitchen flooded for approximately three hours before I noticed. Water damage extended to the dining room and the basement ceiling below.",
        "I obtained a restoration quote from American Restoration (license #38291, attached) for $5,800 and a mold-remediation quote from MoldTech (license #2918) for $1,800. I demand within <strong>fourteen (14) days</strong>:",
      ],
      demandList: [
        "Reimbursement of <strong>$5,800</strong> in restoration costs;",
        "Reimbursement of <strong>$1,800</strong> in mold remediation;",
        "Reimbursement of <strong>$700</strong> in replaced belongings (rug, two chairs).",
      ],
      closingLine:
        "Total demand: <strong>$8,300.00</strong>. Copy of this letter has been sent to your GL carrier (Continental Casualty, policy GL-2026-7821). If unresolved, I will file in Small Claims Court.",
      signatory: "Skylar P. Homeowner",
    },
  },

  fileSteps: {
    h2: { pre: "How to ", em: "file", post: " a plumber-damage case." },
    lede:
      "Four steps. The insurance route resolves most cases before court. Always start there.",
    steps: [
      {
        title: "File with GL insurance carrier",
        body:
          "Get the plumber's certificate of insurance. Call the carrier and file a third-party claim. Provide the contract, photos, restoration quote, and your statement. Most carriers settle within 30 to 60 days.",
      },
      {
        title: "File state plumbing board complaint",
        body:
          "Plumbing boards investigate workmanship complaints aggressively because failures often have public-health implications (sewage backups, scalding). Filing is free. The board can pull licenses and order restitution.",
      },
      {
        title: "File in small claims",
        body:
          "If the carrier and board do not resolve within 60 days, file. Filing fees usually run $30 to $100. File in the county where the damage occurred.",
      },
      {
        title: "Hearing",
        body:
          "Lead with the restoration quote, the photos, and the timeline. Show that the damage occurred immediately after the plumber's work. Hearings usually run 10 to 15 minutes.",
      },
    ],
    aftermath: {
      tag: "After you win",
      title: "Collecting and insurance routes.",
      bodyHtml:
        "Most plumber-damage cases pay through the GL insurance. After judgment, you can also assign the judgment to the carrier as proof of liability. Beyond insurance, the enforcement tools are a <strong>judgment lien</strong> on real estate, a <strong>bank levy</strong>, and a <strong>writ of execution</strong> on tools or accounts receivable.",
    },
  },

  evidence: {
    h2: { pre: "What evidence do you need to ", em: "sue a plumber", post: "?" },
    lede:
      "Damage cases turn on photos plus an itemized restoration quote. The certificate of insurance is the gateway to the fastest recovery.",
    cells: [
      {
        kind: "photos",
        tag: "Damage photos (dated)",
        photos: [
          { id: "1581094271901-8022df4466f9", cap: "Failed solder joint" },
          { id: "1556909114-f6e7ad7d3136", cap: "Soaked drywall" },
          { id: "1581092335397-9583eb92d232", cap: "Warped hardwood" },
          { id: "1503602642458-232111445657", cap: "Basement ceiling stain" },
        ],
      },
      {
        kind: "letter",
        tag: "Restoration quote",
        letterhead: "American Restoration · License #38291",
        date: "April 25, 2026",
        recipientName: "Skylar Homeowner",
        reLine: "Quote · Water-damage restoration",
        bodyParagraphs: [
          "Scope: extract standing water, demo and replace 320 sq ft of damaged hardwood, replace soaked drywall sections, replace 4 outlets exposed to water, paint repaired walls, and finish dining room floor to match.",
          "Total: $5,800. Estimated 11 working days. Materials and labor included.",
        ],
        signatory: "T. Romero",
        signatoryTitle: "Project Manager · IICRC certified",
      },
      {
        kind: "handbook",
        tag: "Plumber's GL certificate",
        documentTitle: "Continental Casualty · Commercial GL Certificate",
        sectionTitle: "Ace Plumbing & Drain · Policy GL-2026-7821",
        bodyParagraphs: [
          "Each Occurrence: $1,000,000",
          "Damage to Rented Premises: $300,000",
          "Personal & Adv Injury: $1,000,000",
          "Products-Completed Operations: $2,000,000",
        ],
        highlight:
          "Water damage from completed plumbing work is covered under 'Products-Completed Operations.'",
        footer: "Effective 02/01/2026 to 02/01/2027",
      },
      {
        kind: "receipt",
        tag: "Mold remediation",
        vendor: "MOLDTECH · LICENSE #2918",
        vendorAddr: "IICRC certified · Phoenix, AZ",
        receiptNum: "Quote #2026-4421",
        date: "04/26/2026",
        lineItems: [
          { label: "Containment and HEPA filtration", amount: "$650.00" },
          { label: "Remove and replace insulation", amount: "$420.00" },
          { label: "Antimicrobial treatment", amount: "$380.00" },
          { label: "Air-quality clearance test", amount: "$350.00" },
        ],
        subtotal: "$1,800.00",
        total: "$1,800.00",
        footer: "Per IICRC S520 standard · post-remediation clearance included",
      },
    ],
  },

  defenses: {
    h2: { pre: "Common plumber ", em: "defenses", post: ", with rebuttals." },
    lede:
      "Three arguments cover most plumber-damage cases. Each has a clean rebuttal once the timeline is documented.",
    items: [
      {
        quote: "The leak was a pre-existing condition.",
        pill: "Most common",
        rebuttal:
          "<strong>Rebuttal:</strong> bring date-stamped photos before the work and the failure timing afterward. If the joint that failed was the joint they replaced, causation is clear. The restoration company's report should identify the failed joint specifically.",
      },
      {
        quote: "The damage came from somewhere else (an upstairs unit, a roof leak).",
        pill: "Other source",
        rebuttal:
          "<strong>Rebuttal:</strong> the restoration company traces the water source as part of their assessment. Their written finding identifying the failed plumbing joint as the source resolves this defense.",
      },
      {
        quote: "Our standard contract limits liability to the cost of the original work.",
        pill: "Limitation",
        rebuttal:
          "<strong>Rebuttal:</strong> most state consumer-protection laws prohibit pre-loss waivers of negligence liability. Many courts strike standard 'limitation of liability' clauses in contractor contracts as unconscionable when the contractor's negligence caused substantial damage.",
      },
    ],
  },

  outcomes: {
    h2: { pre: "How much do homeowners ", em: "actually win", post: "?" },
    lede:
      "Typical recovery in plumber-damage cases. The GL insurance route usually pays full restoration plus reasonable belongings.",
    bands: [
      {
        label: "Low",
        range: "$500 to $2,500",
        body:
          "<strong>Partial restoration.</strong> Court awards a fix-and-patch amount instead of full restoration. Common when the damage was contained and dried quickly.",
        tier: "low",
      },
      {
        label: "Mid",
        range: "$2,500 to $8,000",
        body:
          "<strong>Full restoration plus mold remediation.</strong> Most common when documentation is good and the GL carrier resolves the case at the demand stage.",
        tier: "mid",
      },
      {
        label: "High",
        range: "$8,000 to $20,000+",
        body:
          "<strong>Major water damage.</strong> Multifamily damage, hardwood floors throughout, or significant cabinet replacement push recovery to the cap. Cases beyond the cap need higher courts.",
        tier: "high",
      },
    ],
  },

  stateSection: null,

  alternatives: {
    h2: { pre: "What are the ", em: "alternatives", post: " to small claims?" },
    lede:
      "Plumber-damage cases have unusually strong out-of-court options. Always start with the insurance carrier.",
    cards: [
      {
        title: "Plumber's GL insurance",
        pillLabel: "Free, fast, biggest payer",
        pillTier: "primary",
        whenItFits:
          "the plumber carries general liability insurance (every licensed plumber does). File directly with the carrier using the certificate of insurance.",
        tradeoff:
          "the carrier may dispute coverage scope. Provide the restoration company's source-tracing report.",
      },
      {
        title: "State plumbing board complaint",
        pillLabel: "Free, regulatory",
        pillTier: "good",
        whenItFits:
          "the failure raises public-health concerns (sewage backup, scalding, contaminated water). State boards investigate plumbing failures aggressively because they have public-health implications.",
        tradeoff:
          "no leverage if the plumber is unlicensed (rare for plumbing work, since most states require licenses).",
      },
      {
        title: "Small claims (this guide)",
        pillLabel: "When insurance fails",
        pillTier: "warn",
        whenItFits:
          "the carrier denied the claim or the resolution was inadequate. Damages within your state's cap.",
        tradeoff:
          "30 to 90 day timeline. Filing fee $30 to $100.",
      },
    ],
  },

  cta: {
    h2: { pre: "Recover the ", em: "restoration cost", post: "." },
    body:
      "Plumber-damage demand letters work especially well when copied to the GL carrier. The carrier's interest aligns with yours. Our generator builds yours in under two minutes.",
    receipt: {
      label: "example · failed solder, water damage",
      items: [
        { label: "Restoration cost", amount: "$5,800" },
        { label: "Mold remediation", amount: "+ $1,800" },
        { label: "Filing fee + interest", amount: "+ $200" },
      ],
      total: "$7,800",
      totalLabel: "Total claim",
      note: "Illustrative. Major water damage to multifamily units or hardwood-floor homes can push higher.",
    },
  },

  faqs: [
    {
      q: "Are plumbers required to be licensed?",
      a: "Yes, in nearly every state. Plumbing is one of the most regulated trades because failures have public-health implications. The state plumbing board's website lets you verify license status. Unlicensed plumbing is rare; if you find it, your unlicensed-contractor recovery options are very strong.",
    },
    {
      q: "How fast does mold develop after water damage?",
      a: "Within 24 to 48 hours under typical conditions. That is why fast restoration matters. The longer water sits, the more remediation you need. Photographs and the restoration company's start time both establish the timeline for damages calculation.",
    },
    {
      q: "Should I use my homeowners insurance or the plumber's GL?",
      a: "Try the plumber's first. Their GL is designed for exactly this. Use your homeowners insurance only when you need fast repair and cannot wait. Your carrier will pay you and pursue the plumber (subrogation), but you eat the deductible and the claim may affect your premium.",
    },
    {
      q: "What if mold develops weeks after the damage?",
      a: "Late-developing mold is foreseeable from water damage and recoverable. The mold-remediation quote should reference the original water event. Some carriers try to limit late mold claims, but most states allow recovery for foreseeable consequential damages, including delayed mold growth.",
    },
    {
      q: "What is IICRC and why does it matter?",
      a: "The Institute of Inspection, Cleaning and Restoration Certification publishes the industry standards (S500 for water damage, S520 for mold) that licensed restoration companies follow. Courts and insurers treat IICRC standards as the benchmark for proper remediation. Your restoration company should be IICRC-certified.",
    },
    {
      q: "Can I sue for hotel costs while the home is being dried?",
      a: "Yes. Alternative housing during repair is a foreseeable consequence of major water damage. Save hotel receipts and meal receipts. The carrier or court will reimburse reasonable costs. Try to keep them in line with your normal living expenses (not luxury hotels).",
    },
    {
      q: "How long do I have to sue?",
      a: "Negligence claims usually run 2 to 4 years from the date of damage. Breach of contract claims run 3 to 6 years. Claims against the plumber's GL carrier are usually subject to the underlying claim's statute of limitations. Move fast either way.",
    },
  ],

  relatedSlugs: [
    "damaged-house",
    "deposit-and-disappearing",
    "poor-workmanship",
    "roofer-leaking-roof",
    "handyman-bad-work",
    "unfinished-work",
  ],
};
