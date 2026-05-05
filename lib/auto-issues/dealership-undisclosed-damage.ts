import type { AutoIssue } from "./types";

export const dealershipUndisclosedDamage: AutoIssue = {
  slug: "dealership-undisclosed-damage",
  ready: true,
  short: "Dealer undisclosed damage",
  breadcrumbLabel: "Dealer Undisclosed Damage",

  meta: {
    title: "Can I Sue a Dealership for Not Disclosing Damage? Small Claims Guide",
    description:
      "Plain-English guide to suing a dealership for hiding accident, flood, or salvage history. Federal Used Car Rule + state disclosure laws + UDAP multipliers + Carfax evidence. Demand-letter template.",
  },

  hero: {
    eyebrowSuffix: "Dealer undisclosed damage",
    h1: { pre: "Can I sue a dealership for ", em: "not disclosing damage", post: "?" },
    leadStrong: "Yes. State disclosure laws and UDAP statutes both apply.",
    leadBody:
      " A dealership that failed to disclose accident history, frame damage, flood damage, or salvage status committed fraud. Carfax and AutoCheck reports are the centerpiece evidence. State Used Car Rules require dealers to disclose known issues; UDAP statutes add 2x or 3x damages on top. Small claims fits when diminished value plus the multiplier stays within your state's cap.",
  },

  counter: {
    amount: 6800,
    meta: "State disclosure law + UDAP",
    rows: [
      { label: "Diminished value (Carfax-confirmed)", value: "$2,200" },
      { label: "UDAP multiplier (3x)", value: "+ $4,400", emphasis: "accent" },
      { label: "Filing fee + interest", value: "$200", emphasis: "muted" },
    ],
    footer: "Sample · within most state small-claims caps",
  },

  whatCounts: {
    h2: { pre: "What kinds of ", em: "undisclosed damage", post: " support a lawsuit?" },
    lede:
      "Four common types. Each one is recoverable under state disclosure laws plus UDAP statutes.",
    cards: [
      {
        num: "01",
        title: "Prior accidents and frame damage",
        body:
          "The most common undisclosed-damage case. Vehicle history reports show prior accident reports, body shop visits, and frame damage. Most state laws require disclosure of any structural damage; failure to disclose is fraud regardless of repair quality.",
      },
      {
        num: "02",
        title: "Flood damage",
        body:
          "Vehicles damaged by flooding (hurricanes, river floods) often get rebuilt and resold across state lines. Federal NMVTIS and state title-brand laws require disclosure. Flood damage is grounds for total rescission in most cases.",
      },
      {
        num: "03",
        title: "Salvage or rebuilt title",
        body:
          "Salvage-branded titles must be disclosed under federal and most state laws. Some unscrupulous dealers 'wash' the title across state lines (registering in a state with weaker brand laws) to hide the salvage history. Title washing is fraud regardless.",
      },
      {
        num: "04",
        title: "Lemon-buyback or manufacturer-recall history",
        body:
          "Vehicles that were repurchased by the manufacturer (often for unresolved defects) get resold by dealers. Federal law requires disclosure of lemon-buyback status. Open recall items also must be disclosed. Both are grounds for damages.",
      },
    ],
    note: {
      strongIntro: "Run a Carfax or AutoCheck report immediately.",
      rest:
        " The history report is your spine evidence. If the dealer's disclosure form says 'no accidents' but Carfax shows otherwise, the contradiction is the case. Reports cost $25 to $40 and are admissible in most jurisdictions. Run reports on every used car you buy, ideally before signing.",
    },
  },

  claim: {
    h2: { pre: "How much can you ", em: "claim", post: "?" },
    lede:
      "Diminished value is the floor. UDAP multiplier and federal Used Car Rule penalties stack on top.",
    layers: [
      {
        tag: "Layer 1",
        title: "Diminished value or rescission",
        body:
          "If you keep the car: the market-value reduction caused by the disclosed damage. If you rescind: full refund of all payments and return of trade-in. Most state UDAP laws allow either remedy.",
        amount: "$2,200",
      },
      {
        tag: "Layer 2",
        title: "Statutory multiplier",
        body:
          "State UDAP: 2x or 3x actual damages. Massachusetts: 2x or 3x for willful violations. Texas: 2x or 3x. North Carolina: 3x with attorney fees. Read your state's UDAP penalties.",
        amount: "+ $4,400",
        accent: true,
      },
      {
        tag: "Layer 3",
        title: "Filing fees, attorney fees, interest",
        body:
          "Most state UDAP statutes shift attorney fees to the dealer. Plus filing fee, service-of-process cost, and pre-judgment interest at your state's legal rate.",
        amount: "+ $200",
      },
    ],
    total: {
      label: "Sample total under state UDAP",
      body:
        "Diminished value plus 3x UDAP multiplier, plus filing fee.",
      amount: "$6,800",
      sublabel: "illustrative · varies by state UDAP and damage type",
    },
  },

  demand: {
    h2: { pre: "Send a ", em: "demand letter", post: " first." },
    lede:
      "Demand letters work especially well in disclosure cases because the Carfax contradiction is decisive evidence. Most dealers settle to keep the dispute out of state DMV and AG channels.",
    checklist: [
      "Date and price of the purchase",
      "What the dealer disclosed (signed AutoBuyersGuide)",
      "What Carfax or AutoCheck shows (the contradiction)",
      "A diminished-value appraisal from a licensed appraiser",
      "State UDAP statute citation",
      "A 30-day deadline before you file",
      "Sent certified mail to the dealer's general manager",
    ],
    letter: {
      certifiedNum: "7019 0140 0001 4827 3593",
      date: "May 5, 2026",
      recipientName: "Coast Motors Inc.",
      recipientAddress: "1500 Pacific Highway, Long Beach, CA 90802",
      reLine: "Demand for Damages, 2023 Toyota Camry Sale Dated February 18, 2026",
      bodyParagraphs: [
        "On February 18, 2026, I purchased a 2023 Toyota Camry for $26,400. The signed AutoBuyersGuide stated 'no prior accidents.' On April 14, 2026, I obtained a Carfax report showing the vehicle had a moderate-severity accident with frame damage in October 2024. A diminished-value appraisal from Sterling Appraisal (license #4218) confirms a value reduction of $2,200.",
        "Pursuant to <strong>California Civil Code § 1770(a)</strong> (CLRA) and <strong>Bus & Prof Code § 17200</strong> (UCL), I demand within <strong>thirty (30) days</strong>:",
      ],
      demandList: [
        "Reimbursement of <strong>$2,200</strong> in diminished value;",
        "Statutory damages of <strong>$4,400</strong> (CLRA actual damages of 3x for knowing misrepresentation).",
      ],
      closingLine:
        "Total demand: <strong>$6,600.00</strong>. If unresolved, I will file in Small Claims Court, file complaints with the California DMV and the Department of Consumer Affairs, and pursue attorney fees per § 1780(d).",
      signatory: "Avery K. Buyer",
    },
  },

  fileSteps: {
    h2: { pre: "How to ", em: "file", post: " an undisclosed-damage case." },
    lede:
      "Four steps. The Carfax report is decisive evidence; everything else builds the math.",
    steps: [
      {
        title: "Get the vehicle history report",
        body:
          "Carfax or AutoCheck. $25 to $40. Show the report at the same date as the sale; many reports update over time. The report establishes what the dealer's due diligence would have revealed.",
      },
      {
        title: "Get a diminished-value appraisal",
        body:
          "Licensed appraiser writes a report comparing pre-accident and post-accident market value. Cost: $150 to $400. The appraisal becomes your damages figure. Frame damage typically reduces value 10 to 30 percent.",
      },
      {
        title: "File state DMV and AG complaints",
        body:
          "DMV regulates dealer licensing. AG pursues UDAP violations. Both file at no cost. Run in parallel with the demand letter.",
      },
      {
        title: "File in small claims",
        body:
          "If the demand and regulatory complaints do not produce a refund within 60 days, file. Filing fees usually run $30 to $100. Lead with the AutoBuyersGuide, the Carfax, and the appraisal.",
      },
    ],
    aftermath: {
      tag: "After you win",
      title: "Collecting from a dealer.",
      bodyHtml:
        "Dealers carry licensing bonds. After judgment, file a bond claim. After 30 days, the enforcement tools are a <strong>judgment lien</strong>, a <strong>bank levy</strong>, and a <strong>writ of execution</strong> on inventory or accounts receivable. DMV-filed complaints can also block license renewal.",
    },
  },

  evidence: {
    h2: { pre: "What evidence do you need to ", em: "sue a dealership", post: "?" },
    lede:
      "Three pieces win these cases: the signed AutoBuyersGuide, the contradicting Carfax, and the diminished-value appraisal.",
    cells: [
      {
        kind: "letter",
        tag: "Signed AutoBuyersGuide",
        letterhead: "Federal Trade Commission · Used Car Buyers Guide",
        date: "February 18, 2026",
        recipientName: "Coast Motors Inc. · Sale Form",
        reLine: "2023 Toyota Camry · VIN 4T1G11BK5NU123456",
        bodyParagraphs: [
          "Vehicle History (per dealer disclosure):",
          "Title brand: CLEAN. Prior accidents: NONE DISCLOSED.",
          "Salvage history: NO. Flood: NO.",
        ],
        signatory: "T. Wong",
        signatoryTitle: "Sales Manager, Coast Motors",
      },
      {
        kind: "handbook",
        tag: "Carfax (truth)",
        documentTitle: "Carfax Vehicle History Report",
        sectionTitle: "2023 Toyota Camry · VIN 4T1G11BK5NU123456",
        bodyParagraphs: [
          "10/14/2024 - ACCIDENT REPORTED. Severity: MODERATE.",
          "10/16/2024 - FRAME DAMAGE noted at body shop.",
          "10/28/2024 - REPAIRS COMPLETED.",
        ],
        highlight:
          "Dealer disclosed 'NONE' on accidents. Carfax shows MODERATE accident with frame damage.",
        footer: "Carfax data is admissible evidence in most jurisdictions",
      },
      {
        kind: "letter",
        tag: "Diminished-value appraisal",
        letterhead: "Sterling Appraisal · License #4218",
        date: "April 18, 2026",
        recipientName: "Avery Buyer",
        reLine: "Diminished value report · 2023 Toyota Camry",
        bodyParagraphs: [
          "Pre-accident retail value: $24,400. Post-accident retail value (with disclosed history): $22,200.",
          "Diminished value: $2,200. The reduction reflects buyer-market discount for vehicles with reported moderate accidents and frame damage.",
        ],
        signatory: "K. Sterling",
        signatoryTitle: "Certified Appraiser, ASE",
      },
      {
        kind: "receipt",
        tag: "Purchase contract",
        vendor: "COAST MOTORS INC.",
        vendorAddr: "License #CA-DL-72182 · Long Beach, CA",
        receiptNum: "Sale #4218",
        date: "02/18/2026",
        lineItems: [
          { label: "2023 Toyota Camry (sale price)", amount: "$24,800.00" },
          { label: "Sales tax + title + reg.", amount: "$1,600.00" },
        ],
        subtotal: "$26,400.00",
        total: "$26,400.00",
        footer: "Vehicle disclosed as 'no accidents' · Carfax shows otherwise",
      },
    ],
  },

  defenses: {
    h2: { pre: "Common dealer ", em: "defenses", post: ", with rebuttals." },
    lede:
      "Three arguments cover most undisclosed-damage cases. The Carfax shuts down most of them.",
    items: [
      {
        quote: "We sold it 'as is'. You assumed the risk.",
        pill: "Most common",
        rebuttal:
          "<strong>Rebuttal:</strong> 'as is' protects against unknown defects, not against fraudulent representations. The AutoBuyersGuide specifically asks about prior accidents. Misrepresenting that answer is fraud regardless of any 'as is' clause. Most courts hold 'as is' cannot waive UDAP claims.",
      },
      {
        quote: "We did not know about the accident.",
        pill: "Knowledge",
        rebuttal:
          "<strong>Rebuttal:</strong> dealers are required to use Carfax or AutoCheck (or comparable) on any used car they sell. Failure to check is itself a UDAP violation in most states. The 'we did not know' defense fails when the dealer's own due diligence would have revealed the issue.",
      },
      {
        quote: "The damage was minor and properly repaired.",
        pill: "Causation",
        rebuttal:
          "<strong>Rebuttal:</strong> the disclosure law focuses on whether the accident occurred, not its severity or repair quality. Failure to disclose is the violation. Bring the diminished-value appraisal showing the market discount applied even after repair.",
      },
    ],
  },

  outcomes: {
    h2: { pre: "How much do buyers ", em: "actually win", post: "?" },
    lede:
      "Typical recovery in undisclosed-damage cases. UDAP multipliers push recovery well above direct damages.",
    bands: [
      {
        label: "Low",
        range: "$500 to $2,500",
        body:
          "<strong>Diminished value alone.</strong> Court awards diminished value but does not find UDAP willful violation. Common when proof of dealer knowledge is weak.",
        tier: "low",
      },
      {
        label: "Mid",
        range: "$2,500 to $8,000",
        body:
          "<strong>Diminished value plus UDAP multiplier.</strong> Most common when documented Carfax contradiction plus dealer's own due-diligence requirement push the court toward willfulness finding.",
        tier: "mid",
      },
      {
        label: "High",
        range: "$8,000 to $20,000+",
        body:
          "<strong>Cap-of-the-court awards.</strong> Major frame damage, salvage-title concealment, or flood-damage cases with significant value reduction plus UDAP multiplier.",
        tier: "high",
      },
    ],
  },

  stateSection: null,

  alternatives: {
    h2: { pre: "What are the ", em: "alternatives", post: " to small claims?" },
    lede:
      "Use regulatory complaints in parallel with small claims. They often produce settlement before court.",
    cards: [
      {
        title: "State DMV consumer protection",
        pillLabel: "Free, regulatory",
        pillTier: "primary",
        whenItFits:
          "any licensed dealer. The DMV regulates dealer licensing and can investigate disclosure violations. Many state DMVs can order restitution.",
        tradeoff:
          "DMV process can take months. Run in parallel with the demand letter, not as a replacement.",
      },
      {
        title: "State Attorney General consumer protection",
        pillLabel: "Free, UDAP-focused",
        pillTier: "good",
        whenItFits:
          "your case fits a state UDAP violation. AGs pursue dealer fraud aggressively, especially pattern cases (multiple buyers).",
        tradeoff:
          "AGs prioritize patterns over individual cases. Your single case may add to a class but not always be pursued individually.",
      },
      {
        title: "Small claims (this guide)",
        pillLabel: "Best for individual recovery",
        pillTier: "warn",
        whenItFits:
          "the dealer has not refunded after the demand letter. Damages within your state's cap.",
        tradeoff:
          "30 to 90 day timeline. Filing fee $30 to $100. Bigger cases need higher courts and a consumer-protection attorney.",
      },
    ],
  },

  cta: {
    h2: { pre: "Recover the ", em: "diminished value", post: "." },
    body:
      "Demand letters work especially well in disclosure cases because the Carfax contradiction is decisive. Pair with DMV and AG complaints for maximum pressure. Our generator builds yours in under two minutes.",
    receipt: {
      label: "example · undisclosed accident",
      items: [
        { label: "Diminished value", amount: "$2,200" },
        { label: "UDAP treble damages", amount: "+ $4,400" },
        { label: "Filing fee + interest", amount: "+ $200" },
      ],
      total: "$6,800",
      totalLabel: "Total claim",
      note: "Illustrative. Salvage-title or flood-damage cases push recovery much higher.",
    },
  },

  faqs: [
    {
      q: "Are dealers required to disclose accident history?",
      a: "Yes, in most states. The federal Used Car Rule (16 CFR § 455) and state disclosure laws require dealers to display an AutoBuyersGuide on used-car windows. State laws vary, but most require disclosure of known accidents, salvage history, flood damage, and lemon-buyback status. Failure to disclose is fraud and a UDAP violation.",
    },
    {
      q: "What is the federal Used Car Rule?",
      a: "16 CFR § 455 requires dealers to display an AutoBuyersGuide on used-car windows. The form must accurately reflect known issues, warranty status, and buyer-protection rights. Failure to display or accurately complete the form is a federal violation enforceable by the FTC and (in many states) by buyers directly.",
    },
    {
      q: "Can I rescind the deal?",
      a: "In many states, yes. Rescission is a remedy under state UDAP laws that lets you return the vehicle and recover everything you paid (down payment, monthly payments, sales tax, fees) plus return of your trade-in. Rescission is usually the right remedy for major undisclosed damage (frame, flood, salvage) where you would not have bought the car at all.",
    },
    {
      q: "How do I prove the dealer knew?",
      a: "Carfax or AutoCheck report. If the report from the date of sale shows the damage, the dealer's due diligence would have revealed it. Most state laws require dealers to use vehicle-history reports; failure to check is itself a UDAP violation in many states.",
    },
    {
      q: "How long do I have to sue?",
      a: "State UDAP claims usually run 2 to 4 years from the date of discovery. State disclosure-law claims often have shorter windows. Move fast: pre-suit demand letter timing often determines whether you get statutory multipliers.",
    },
    {
      q: "What if the dealer used a different state's title to hide the salvage history?",
      a: "Title washing is itself a fraud and UDAP violation. The federal NMVTIS (National Motor Vehicle Title Information System) database prevents most title-washing. If the dealer used loopholes, your case is stronger because of the deliberate concealment. Bring the NMVTIS report alongside Carfax.",
    },
    {
      q: "Does it matter if I bought the car 'as is'?",
      a: "'As is' protects against unknown defects, not fraud. A dealer cannot lie about the car and then hide behind 'as is'. Most courts hold that 'as is' cannot waive UDAP or fraud claims based on affirmative misrepresentations on the AutoBuyersGuide.",
    },
  ],

  relatedSlugs: [
    "dealership-fraud",
    "lemon-car",
    "mechanic-bad-work",
    "parked-car-hit",
    "valet-damage",
    "mechanic-overcharging",
  ],
};
