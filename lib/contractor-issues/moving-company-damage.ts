import type { ContractorIssue } from "./types";

export const movingCompanyDamage: ContractorIssue = {
  slug: "moving-company-damage",
  ready: true,
  short: "Moving company damage",
  breadcrumbLabel: "Moving Company Damage",

  meta: {
    title: "Can I Sue a Moving Company for Damage? Small Claims Guide",
    description:
      "Plain-English guide to recovering from movers for damaged furniture, walls, or floors. Federal Carmack Amendment for interstate moves vs. state law for local. Released-value vs. full-value protection.",
  },

  hero: {
    eyebrowSuffix: "Moving company damage",
    h1: { pre: "Can I sue a moving company for ", em: "damage", post: "?" },
    leadStrong: "Yes, but the rules depend on whether the move was local or interstate.",
    leadBody:
      " Interstate moves are governed by federal law (the Carmack Amendment, 49 U.S.C. § 14706). Local (intrastate) moves are governed by state law. Both let you recover damage costs, but the calculation differs based on which 'valuation method' you chose at booking. The default is 'released-value' protection at 60 cents per pound. Full-value protection (paid extra) covers replacement cost.",
  },

  counter: {
    amount: 3800,
    meta: "Carmack Amendment / state moving law",
    rows: [
      { label: "Damaged furniture (full-value)", value: "$2,800" },
      { label: "Wall and floor damage", value: "+ $800", emphasis: "accent" },
      { label: "Filing fee + interest", value: "$200", emphasis: "muted" },
    ],
    footer: "Sample · within most state small-claims caps",
  },

  whatCounts: {
    h2: { pre: "What kinds of ", em: "moving damage", post: " can you sue for?" },
    lede:
      "Four common patterns. The valuation method you chose at booking determines how much you can recover.",
    cards: [
      {
        num: "01",
        title: "Damaged furniture and belongings",
        body:
          "Scratched dressers, broken legs, ripped upholstery, dented appliances. The movers are responsible regardless of fault. The 'whose fault' inquiry rarely matters for damage during a move; the question is what valuation method governs.",
      },
      {
        num: "02",
        title: "Damage to your home (origin or destination)",
        body:
          "Scratched floors, dented walls, broken bannisters, damaged door frames. The movers are responsible for damage to the structure during the move. This is separate from the cargo claim and usually goes through the mover's liability insurance.",
      },
      {
        num: "03",
        title: "Items damaged because of poor packing (the mover packed them)",
        body:
          "If the moving company packed your items, they are responsible for damage caused by inadequate packing. If you packed (PBO, 'packed by owner'), the mover's liability is reduced, sometimes to zero.",
      },
      {
        num: "04",
        title: "Concealed damage discovered after delivery",
        body:
          "Damage you cannot see at delivery, like packed-down upholstery showing wear or damage to interior of cabinets. Most carriers allow concealed-damage claims for 30 to 60 days after delivery. State the claim in writing as soon as you find it.",
      },
    ],
    note: {
      strongIntro: "Released-value vs. full-value protection.",
      rest:
        " The default for federal interstate moves is released-value protection: 60 cents per pound, regardless of value. A 50-pound TV (worth $800) is covered for $30 under released value. Full-value protection (paid extra at booking) pays replacement cost. Always confirm in writing which valuation you chose.",
    },
  },

  claim: {
    h2: { pre: "How much can you ", em: "recover", post: "?" },
    lede:
      "Recovery depends on your valuation election. Full-value cases recover replacement cost; released-value cases recover only 60 cents per pound.",
    layers: [
      {
        tag: "Layer 1",
        title: "Damaged belongings (per valuation method)",
        body:
          "Full-value: replacement cost or repair, whichever is less. Released-value: 60 cents per pound. State-law moves: state-specific rules (often allow choice between depreciated value and replacement).",
        amount: "$2,800",
      },
      {
        tag: "Layer 2",
        title: "Damage to home structure",
        body:
          "Wall and floor damage from the move. The mover's general liability insurance covers structural damage. File a separate claim with the GL carrier; this claim does not depend on the valuation election.",
        amount: "+ $800",
        accent: true,
      },
      {
        tag: "Layer 3",
        title: "Filing fees, interest, alternative housing",
        body:
          "Filing fee, service-of-process cost, and pre-judgment interest at your state's legal rate. Hotel costs if items were destroyed (e.g., bed) and home was uninhabitable.",
        amount: "+ $200",
      },
    ],
    total: {
      label: "Sample total under full-value protection",
      body:
        "Replacement cost for two damaged dressers and a torn couch, plus repair to scratched hardwood and dented wall, plus filing fee.",
      amount: "$3,800",
      sublabel: "illustrative · varies by valuation method and state",
    },
  },

  demand: {
    h2: { pre: "File a ", em: "claim with the carrier first", post: "." },
    lede:
      "Moving companies have a written claim process. File there first. Most carriers settle within 60 to 90 days. If they deny or undervalue, the demand letter and small-claims complaint follow.",
    checklist: [
      "Bill of lading (BOL) with valuation method",
      "Inventory list (high-value declaration if applicable)",
      "Date of delivery and date of damage discovery",
      "Photos of damage with timestamps",
      "Replacement-cost or repair quotes",
      "Concealed-damage notice within 30 to 60 days for late discoveries",
      "A 30-day deadline before you file in small claims",
    ],
    letter: {
      certifiedNum: "7019 0140 0001 4827 3589",
      date: "May 5, 2026",
      recipientName: "Reliable Movers Inc.",
      recipientAddress: "2200 Industrial Way, Denver, CO 80216",
      reLine: "Demand for Damages, Move Dated April 8, 2026, Order #82218",
      bodyParagraphs: [
        "On April 8, 2026, you completed our move from Denver to Colorado Springs for $4,800. We selected full-value protection (BOL line 22, $5,000 declared). At unloading, two dressers were severely scratched, a couch was torn, and the destination living room had hardwood scratches and a dented wall.",
        "I filed claim #2026-1182 with your office on April 11. As of today (24 days later), no resolution has been offered. I obtained replacement quotes (attached): dresser replacement $1,600, dresser repair $400, couch reupholstery $800. Hardwood and wall repair: $800. I demand within <strong>fourteen (14) days</strong>:",
      ],
      demandList: [
        "Reimbursement of <strong>$2,800</strong> in cargo damage (full-value protection);",
        "Reimbursement of <strong>$800</strong> in structural damage to home.",
      ],
      closingLine:
        "Total demand: <strong>$3,600.00</strong>. If unresolved, I will file in Small Claims Court and report your handling to the FMCSA (interstate) or Colorado PUC.",
      signatory: "Cameron K. Homeowner",
    },
  },

  fileSteps: {
    h2: { pre: "How to ", em: "file", post: " a moving-company case." },
    lede:
      "Four steps. Start with the carrier's claim process, then escalate.",
    steps: [
      {
        title: "File a written claim with the mover",
        body:
          "Federal interstate moves require carriers to acknowledge in 30 days and resolve in 120. Local moves vary by state. File in writing with the BOL number, photos, and replacement quotes. The carrier has to respond.",
      },
      {
        title: "File regulatory complaints",
        body:
          "Interstate: FMCSA at fmcsa.dot.gov/protect-your-move. State PUC for intrastate moves. Better Business Bureau as added pressure. The regulator can fine the carrier and pull authority.",
      },
      {
        title: "File in small claims",
        body:
          "If carrier and regulator do not resolve within 90 days, file. Filing fees usually run $30 to $100. File in the destination county.",
      },
      {
        title: "Hearing",
        body:
          "Lead with the BOL showing valuation election, the inventory list, photos of damage, and replacement quotes. Hearings usually run 10 to 15 minutes.",
      },
    ],
    aftermath: {
      tag: "After you win",
      title: "Collecting from a mover.",
      bodyHtml:
        "Movers carry liability insurance. After judgment, you can present the judgment to the carrier. After 30 days post-judgment, the enforcement tools are a <strong>judgment lien</strong> on real estate, a <strong>bank levy</strong>, and a <strong>writ of execution</strong> on trucks or accounts receivable.",
    },
  },

  evidence: {
    h2: { pre: "What evidence do you need to ", em: "sue a mover", post: "?" },
    lede:
      "The bill of lading is the spine of every moving case. It shows what you booked, what valuation method you chose, and what was inventoried.",
    cells: [
      {
        kind: "photos",
        tag: "Damage photos",
        photos: [
          { id: "1581094271901-8022df4466f9", cap: "Scratched dresser" },
          { id: "1556909114-f6e7ad7d3136", cap: "Torn couch" },
          { id: "1581092335397-9583eb92d232", cap: "Scratched hardwood" },
          { id: "1503602642458-232111445657", cap: "Dented wall" },
        ],
      },
      {
        kind: "letter",
        tag: "Bill of Lading",
        letterhead: "Reliable Movers Inc. · USDOT 1827436",
        date: "April 8, 2026",
        recipientName: "Cameron Homeowner",
        reLine: "BOL #82218 · Denver to Colorado Springs",
        bodyParagraphs: [
          "Total weight: 8,400 lbs. Total cost: $4,800.",
          "Valuation method (line 22): FULL-VALUE PROTECTION at $0.85 per pound declared. Total declared value: $7,140.",
        ],
        signatory: "T. Vega",
        signatoryTitle: "Driver, USDOT 1827436",
      },
      {
        kind: "handbook",
        tag: "Federal Carmack Amendment",
        documentTitle: "49 U.S.C. § 14706 · Carriers' Liability",
        sectionTitle: "Interstate Moves · Liability",
        bodyParagraphs: [
          "A carrier providing transportation or service... shall issue a receipt or bill of lading for property it receives for transportation. The carrier is liable to the person entitled to recover under the receipt or bill of lading.",
        ],
        highlight:
          "Full-value election makes the carrier liable for actual loss or damage up to the declared value.",
        footer: "Federal preemption: state law does not override Carmack on interstate moves",
      },
      {
        kind: "receipt",
        tag: "Replacement quotes",
        vendor: "WEST ELM + REUPHOLSTERY DENVER",
        vendorAddr: "Replacement and repair quotes",
        receiptNum: "Combined estimate",
        date: "04/22/2026",
        lineItems: [
          { label: "Dresser replacement (1)", amount: "$1,600.00" },
          { label: "Dresser repair (1)", amount: "$400.00" },
          { label: "Couch reupholstery", amount: "$800.00" },
        ],
        subtotal: "$2,800.00",
        total: "$2,800.00",
        footer: "Replacement cost basis · two stores quoted",
      },
    ],
  },

  defenses: {
    h2: { pre: "Common mover ", em: "defenses", post: ", with rebuttals." },
    lede:
      "Three arguments cover most damage cases. The bill of lading shuts down most of them.",
    items: [
      {
        quote: "You only had released-value protection, so we owe 60 cents per pound.",
        pill: "Most common",
        rebuttal:
          "<strong>Rebuttal:</strong> bring the bill of lading. The valuation method is checked on the BOL. If you elected full-value, that is your protection regardless of what the carrier later argues. If the carrier failed to provide a written valuation election, federal law (Carmack) imputes full-value as the default in many disputes.",
      },
      {
        quote: "The damage was preexisting.",
        pill: "Preexisting",
        rebuttal:
          "<strong>Rebuttal:</strong> the inventory list at origin showed no damage. The mover signed it. If the inventory shows the items in good condition at pickup, damage at delivery is the mover's responsibility.",
      },
      {
        quote: "You packed the items yourself, so we are not liable.",
        pill: "PBO",
        rebuttal:
          "<strong>Rebuttal:</strong> packed-by-owner reduces but does not eliminate carrier liability. Damage from carrier handling (drops, crushing in the truck) is still recoverable. The PBO defense is limited to damage clearly from inadequate packing materials. The carrier still has to handle items reasonably.",
      },
    ],
  },

  outcomes: {
    h2: { pre: "How much do consumers ", em: "actually win", post: "?" },
    lede:
      "Typical recovery in moving-damage cases. Full-value protection cases recover near-replacement cost; released-value cases are usually too small for small claims.",
    bands: [
      {
        label: "Low",
        range: "$200 to $1,500",
        body:
          "<strong>Released-value or partial recovery.</strong> 60 cents per pound caps recovery at low totals. Court awards what the BOL controls.",
        tier: "low",
      },
      {
        label: "Mid",
        range: "$1,500 to $5,000",
        body:
          "<strong>Full-value cargo plus structural damage.</strong> Most common when full-value was elected and the BOL is clear.",
        tier: "mid",
      },
      {
        label: "High",
        range: "$5,000 to $20,000+",
        body:
          "<strong>Major damage cases.</strong> Long-haul interstate moves with high-value declared items, plus structural damage to origin or destination home. Cases beyond the cap need higher courts.",
        tier: "high",
      },
    ],
  },

  stateSection: null,

  alternatives: {
    h2: { pre: "What are the ", em: "alternatives", post: " to small claims?" },
    lede:
      "Moving cases have specific regulatory paths. Use them before court.",
    cards: [
      {
        title: "FMCSA / State PUC",
        pillLabel: "Free, regulatory",
        pillTier: "primary",
        whenItFits:
          "interstate (FMCSA) or intrastate (state PUC). Federal: file at fmcsa.dot.gov/protect-your-move. State: search 'moving complaint' on your state PUC website. Regulators investigate and can fine carriers and pull authority.",
        tradeoff:
          "regulators do not always order restitution. The threat is often more effective than the outcome.",
      },
      {
        title: "Carrier's claim department",
        pillLabel: "Required first step",
        pillTier: "good",
        whenItFits:
          "always. Federal interstate moves require carriers to acknowledge claims in 30 days and resolve in 120. State moves vary. Most carriers settle reasonable claims to avoid regulatory complaints.",
        tradeoff:
          "carriers often offer below-market settlement. Push back with replacement quotes.",
      },
      {
        title: "Small claims (this guide)",
        pillLabel: "When the carrier denies or undervalues",
        pillTier: "warn",
        whenItFits:
          "the carrier did not resolve within 90 days, or offered an inadequate settlement. Damages within your state's cap.",
        tradeoff:
          "30 to 90 day timeline. Filing fee $30 to $100. Federal Carmack preemption may apply.",
      },
    ],
  },

  cta: {
    h2: { pre: "Recover the ", em: "replacement cost", post: "." },
    body:
      "Moving demand letters work fast when paired with the bill of lading and replacement quotes. FMCSA or state PUC complaints add pressure. Our generator builds yours in under two minutes.",
    receipt: {
      label: "example · full-value cargo + structural",
      items: [
        { label: "Cargo damage (full-value)", amount: "$2,800" },
        { label: "Structural damage to home", amount: "+ $800" },
        { label: "Filing fee + interest", amount: "+ $200" },
      ],
      total: "$3,800",
      totalLabel: "Total claim",
      note: "Illustrative. Released-value cases are typically too small for small claims.",
    },
  },

  faqs: [
    {
      q: "What is the difference between released-value and full-value protection?",
      a: "Released-value is the default for federal interstate moves: 60 cents per pound, regardless of item value. Full-value (paid extra at booking) covers replacement cost or repair. A 50-pound TV worth $800 is covered for $30 under released-value but full replacement under full-value. Always confirm your valuation election in writing.",
    },
    {
      q: "What is the Carmack Amendment?",
      a: "Federal law (49 U.S.C. § 14706) governing interstate carrier liability. It establishes that interstate movers are liable for actual loss or damage to property they transport, subject to the valuation election on the bill of lading. State law does not override Carmack on interstate moves.",
    },
    {
      q: "How long do I have to file a damage claim?",
      a: "Federal interstate: 9 months from delivery for filing the claim with the carrier, then 2 years from claim denial to file in court. State law varies but most states allow 1 to 4 years. File the claim with the carrier first; you cannot sue until the carrier denies or fails to respond.",
    },
    {
      q: "What is concealed damage and how do I claim it?",
      a: "Damage you cannot see at delivery, discovered later. Most carriers allow concealed-damage claims for 30 to 60 days after delivery. Notify in writing as soon as you find it. Photos and the original inventory list (showing no preexisting damage) are essential.",
    },
    {
      q: "Can I sue if I packed the items myself?",
      a: "Yes, but the carrier's liability is reduced. Packed-by-owner (PBO) protects the carrier against damage from inadequate packing, but carriers are still responsible for handling damage (drops, crushing, etc.). Reasonable inspection at delivery should reveal handling damage.",
    },
    {
      q: "What if the mover claims I have already been paid?",
      a: "Movers sometimes offer release forms with low cash settlements. Read carefully before signing. Once signed, you typically waive further claims. If you have not signed, the carrier's claim is open and recoverable. If you signed under duress (e.g., the mover refused to release goods until signed), that is a separate violation.",
    },
    {
      q: "How do I know if my move was interstate or intrastate?",
      a: "Interstate crosses a state line. Intrastate stays within one state. Federal law (Carmack) governs interstate; state law governs intrastate. The USDOT number on the truck and BOL identifies an interstate carrier. The state PUC license identifies an intrastate carrier.",
    },
  ],

  relatedSlugs: [
    "moving-company-lost-items",
    "damaged-house",
    "deposit-and-disappearing",
    "poor-workmanship",
    "unfinished-work",
    "painter-damage",
  ],
};
