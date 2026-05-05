import type { AutoIssue } from "./types";

export const dealershipFraud: AutoIssue = {
  slug: "dealership-fraud",
  ready: true,
  short: "Dealership fraud",
  breadcrumbLabel: "Dealership Fraud",

  meta: {
    title: "Can I Sue a Car Dealership for Fraud? Small Claims Guide",
    description:
      "Plain-English guide to suing a dealership for fraud. State UDAP statutes (often 2x or 3x damages), federal odometer law, and demand-letter template. State DMV and AG complaints add pressure.",
  },

  hero: {
    eyebrowSuffix: "Dealership fraud",
    h1: { pre: "Can I sue a car dealership for ", em: "fraud", post: "?" },
    leadStrong: "Yes. State consumer-protection laws often add 2x or 3x damages plus attorney fees.",
    leadBody:
      " A dealership that lied about a car's condition, mileage, accident history, lien status, or payment terms violated state Unfair and Deceptive Acts and Practices (UDAP) statutes. Most states add 2x or 3x damages plus attorney fees. Federal odometer law (49 USC § 32710) adds $10,000 or 3x the actual damages, whichever is greater. The state DMV and the attorney general's consumer protection office both take complaints free of charge.",
  },

  counter: {
    amount: 8400,
    meta: "State UDAP + federal odometer law",
    rows: [
      { label: "Diminished value (lied about condition)", value: "$2,800" },
      { label: "UDAP multiplier (3x)", value: "+ $5,400", emphasis: "accent" },
      { label: "Filing fee + interest", value: "$200", emphasis: "muted" },
    ],
    footer: "Sample · within most state small-claims caps",
  },

  whatCounts: {
    h2: { pre: "What counts as ", em: "dealership fraud", post: "?" },
    lede:
      "Five common patterns. Each one is its own claim under state UDAP and most include statutory multipliers.",
    cards: [
      {
        num: "01",
        title: "Mileage rollback (odometer fraud)",
        body:
          "Federal Odometer Act (49 USC § 32710) makes mileage rollback illegal and adds the greater of $10,000 or 3x actual damages. State odometer laws add separate penalties. Mileage discrepancy is checkable through state title records and Carfax history.",
      },
      {
        num: "02",
        title: "Concealed accident or salvage history",
        body:
          "Failing to disclose prior accidents, frame damage, flood history, or salvage title. Most states require dealers to disclose if the vehicle was branded as salvage, flood, or rebuilt. The federal AutoBuyersGuide on used-car windows must accurately reflect known issues.",
      },
      {
        num: "03",
        title: "Hidden liens or title defects",
        body:
          "Selling a vehicle still subject to a lender's lien, or with a title defect that prevents clean ownership transfer. The dealer must convey clean title under state title transfer laws. Hidden liens become buyer's problem until resolved.",
      },
      {
        num: "04",
        title: "Bait-and-switch on price or terms",
        body:
          "Advertised price did not match what was charged, financing terms changed at closing, undisclosed dealer add-ons (paint protection, gap insurance) added without consent. State UDAP statutes specifically prohibit deceptive pricing.",
      },
      {
        num: "05",
        title: "Yo-yo financing (spot delivery scam)",
        body:
          "Dealer let you take the car home before financing was approved, then called you back days later demanding higher payments or threatening repossession. Many state laws specifically prohibit this practice.",
      },
    ],
    note: {
      strongIntro: "State UDAP statutes are powerful.",
      rest:
        " Most states' Unfair and Deceptive Acts and Practices laws include 2x or 3x damage multipliers, fee-shifting, and sometimes punitive damages. Federal odometer law adds penalties on top. Always cite the specific statute in your demand letter.",
    },
  },

  claim: {
    h2: { pre: "How much can you ", em: "claim", post: "?" },
    lede:
      "Diminished value or refund is the floor. State UDAP multipliers and federal odometer law penalties push recovery well above the direct damages.",
    layers: [
      {
        tag: "Layer 1",
        title: "Diminished value or refund",
        body:
          "If you keep the car: the difference between what you paid and the actual value given the undisclosed issue. If you rescind: full refund of all payments, plus return of your trade-in.",
        amount: "$2,800",
      },
      {
        tag: "Layer 2",
        title: "Statutory damages",
        body:
          "State UDAP: 2x or 3x actual damages in most states. Federal odometer fraud: $10,000 or 3x damages, whichever is greater. State odometer laws often add separate penalties.",
        amount: "+ $5,400",
        accent: true,
      },
      {
        tag: "Layer 3",
        title: "Filing fees, attorney fees, interest",
        body:
          "Most state UDAP statutes shift attorney fees to the losing dealer. Federal odometer law also shifts fees. Plus filing fee, service-of-process cost, and pre-judgment interest.",
        amount: "+ $200",
      },
    ],
    total: {
      label: "Sample total under state UDAP",
      body:
        "Diminished value plus 3x state UDAP multiplier, plus filing fee.",
      amount: "$8,400",
      sublabel: "illustrative · varies by state UDAP and fraud type",
    },
  },

  demand: {
    h2: { pre: "Send a ", em: "demand letter", post: " first." },
    lede:
      "Dealership fraud demand letters work especially well because dealers know that state UDAP cases shift fees to the loser and trigger DMV and AG investigations. Most settle to keep the dispute out of regulatory channels.",
    checklist: [
      "Date and price of the purchase",
      "The misrepresentation (mileage, accident, lien, etc.)",
      "How you discovered the truth (Carfax, second mechanic, lender)",
      "The state UDAP statute you are relying on (cited by section)",
      "Federal odometer law (if applicable)",
      "A 30-day deadline before you file (some state UDAP laws require this notice)",
      "Sent certified mail to the dealer's general manager",
    ],
    letter: {
      certifiedNum: "7019 0140 0001 4827 3592",
      date: "May 5, 2026",
      recipientName: "Sunrise Auto Sales",
      recipientAddress: "5500 Industrial Way, Charlotte, NC 28202",
      reLine: "Demand for Damages, 2022 Honda Civic Sale Dated March 14, 2026",
      bodyParagraphs: [
        "On March 14, 2026, I purchased a 2022 Honda Civic from your dealership for $24,800. The dealer's representations and AutoBuyersGuide stated 'no accidents.' On April 22, 2026, I obtained a Carfax report showing the vehicle had been in a major accident with frame damage in November 2024. A second-opinion inspection by Apex Auto Body confirmed unrepaired frame damage and a diminished value of $2,800.",
        "Pursuant to <strong>North Carolina Gen. Stat. § 75-1.1</strong> (UDAP), I demand within <strong>thirty (30) days</strong>:",
      ],
      demandList: [
        "Reimbursement of <strong>$2,800</strong> in diminished value;",
        "Statutory treble damages of <strong>$5,400</strong> under § 75-16.",
      ],
      closingLine:
        "Total demand: <strong>$8,200.00</strong>. If unresolved, I will file in Small Claims Court, file complaints with the NC DMV and the NC Attorney General's Consumer Protection Division, and pursue attorney fees per § 75-16.1.",
      signatory: "Riley M. Buyer",
    },
  },

  fileSteps: {
    h2: { pre: "How to ", em: "file", post: " a dealership-fraud case." },
    lede:
      "Four steps. Regulatory complaints (DMV, AG) often produce settlements before court.",
    steps: [
      {
        title: "Document the fraud",
        body:
          "Carfax or AutoCheck history report. Second-opinion inspection from a different mechanic. Original AutoBuyersGuide and contract. Any text or email showing the dealer's representations.",
      },
      {
        title: "File DMV and AG complaints",
        body:
          "State DMV regulates dealer licensing and can investigate complaints. Attorney general's consumer protection division pursues UDAP violations. Both file at no cost. Pattern complaints (multiple buyers with similar issues) get fast-tracked.",
      },
      {
        title: "File in small claims",
        body:
          "If the demand and regulatory complaints do not produce a refund within 60 days, file. Filing fees usually run $30 to $100. File in the county where the dealership is located.",
      },
      {
        title: "Hearing",
        body:
          "Lead with the contract, the AutoBuyersGuide, and the Carfax report showing the contradiction. Walk through the misrepresentation. Hearings usually run 10 to 15 minutes.",
      },
    ],
    aftermath: {
      tag: "After you win",
      title: "Collecting from a dealer.",
      bodyHtml:
        "Dealers carry licensing bonds (state-mandated, varies by state). After judgment, file a bond claim. After 30 days, the enforcement tools are a <strong>judgment lien</strong> on real estate, a <strong>bank levy</strong>, and a <strong>writ of execution</strong> on inventory or accounts receivable. DMV-filed complaints can also block license renewal.",
    },
  },

  evidence: {
    h2: { pre: "What evidence do you need to ", em: "sue a dealership", post: "?" },
    lede:
      "Cases like this turn on the contract, the AutoBuyersGuide, and a vehicle history report contradicting the dealer's representations.",
    cells: [
      {
        kind: "letter",
        tag: "AutoBuyersGuide (signed)",
        letterhead: "Federal Trade Commission · Used Car Buyers Guide",
        date: "March 14, 2026",
        recipientName: "Sunrise Auto Sales · Sale Form",
        reLine: "2022 Honda Civic · VIN 19XFC2F69NE123456",
        bodyParagraphs: [
          "Vehicle History (per dealer disclosure):",
          "[ ] AS IS - NO WARRANTY",
          "[X] WARRANTY - 30 days/1,000 miles",
          "Title brand: CLEAN. Prior accidents: NONE DISCLOSED. Salvage: NO.",
        ],
        signatory: "Marcus Vega",
        signatoryTitle: "Sales Manager, Sunrise Auto Sales",
      },
      {
        kind: "handbook",
        tag: "Carfax report (truth)",
        documentTitle: "Carfax Vehicle History Report",
        sectionTitle: "2022 Honda Civic · VIN 19XFC2F69NE123456",
        bodyParagraphs: [
          "11/18/2024 - ACCIDENT REPORTED. Severity: MODERATE. Police-reported. Vehicle towed.",
          "11/22/2024 - DAMAGE NOTED at body shop. Frame, structural component damage.",
          "12/15/2024 - REPAIRS COMPLETED at independent shop.",
        ],
        highlight:
          "Dealer disclosed 'NONE' on accidents. Carfax shows MODERATE accident with frame damage in 2024.",
        footer: "Carfax data is admissible evidence in most jurisdictions",
      },
      {
        kind: "texts",
        tag: "Salesperson confirmed",
        texts: [
          { dir: "out", text: "Just one question before I sign: any prior accidents?" },
          { dir: "in", text: "Clean record. Carfax came back perfect on this one." },
          { dir: "in", text: "We don't take in cars with bad histories. Drive it home." },
        ],
      },
      {
        kind: "receipt",
        tag: "Purchase contract",
        vendor: "SUNRISE AUTO SALES",
        vendorAddr: "License #NC-DL-2918374 · Charlotte, NC",
        receiptNum: "Sale #4218",
        date: "03/14/2026",
        lineItems: [
          { label: "2022 Honda Civic (sale price)", amount: "$23,500.00" },
          { label: "Sales tax + title + reg.", amount: "$1,300.00" },
          { label: "Documentation fee", amount: "$0.00" },
        ],
        subtotal: "$24,800.00",
        total: "$24,800.00",
        footer: "Vehicle disclosed as 'no accidents' · Carfax shows otherwise",
      },
    ],
  },

  defenses: {
    h2: { pre: "Common dealer ", em: "defenses", post: ", with rebuttals." },
    lede:
      "Three arguments cover most fraud cases. The contract terms and Carfax usually shut them down.",
    items: [
      {
        quote: "We sold it 'as is'. You assumed the risk.",
        pill: "Most common",
        rebuttal:
          "<strong>Rebuttal:</strong> 'as is' protects against unknown defects, not against fraud. The AutoBuyersGuide specifically asks about prior accidents; misrepresenting the answer is fraud regardless of any 'as is' clause. Most state courts hold that 'as is' cannot waive UDAP claims.",
      },
      {
        quote: "We did not know about the accident history.",
        pill: "Knowledge",
        rebuttal:
          "<strong>Rebuttal:</strong> dealers are required to use Carfax or AutoCheck (or comparable) on any used car they sell. Failure to check is itself a UDAP violation in most states. The 'we did not know' defense fails when the dealer's own due diligence would have revealed the issue.",
      },
      {
        quote: "The accident was minor and did not affect value.",
        pill: "Causation",
        rebuttal:
          "<strong>Rebuttal:</strong> bring a diminished-value appraisal from a licensed appraiser. Frame damage typically reduces value by 10 to 30 percent. The disclosure law focuses on whether the accident occurred, not whether it was 'serious enough.' Failure to disclose is the violation.",
      },
    ],
  },

  outcomes: {
    h2: { pre: "How much do buyers ", em: "actually win", post: "?" },
    lede:
      "Typical recovery in dealership-fraud cases. UDAP multipliers push recovery well above direct damages.",
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
          "<strong>Diminished value plus UDAP multiplier.</strong> Most common when documented Carfax contradiction plus dealer claim of due diligence pushes the court toward willfulness.",
        tier: "mid",
      },
      {
        label: "High",
        range: "$8,000 to $20,000+",
        body:
          "<strong>Cap-of-the-court awards.</strong> Mileage rollback (federal $10,000 minimum) plus UDAP multiplier plus attorney fees. Major undisclosed damage cases also push to the cap.",
        tier: "high",
      },
    ],
  },

  stateSection: null,

  alternatives: {
    h2: { pre: "What are the ", em: "alternatives", post: " to small claims?" },
    lede:
      "Dealership fraud cases have unusually strong out-of-court options. Use them in parallel with the demand letter.",
    cards: [
      {
        title: "State DMV consumer protection",
        pillLabel: "Free, regulatory",
        pillTier: "primary",
        whenItFits:
          "any licensed dealer. The DMV regulates dealer licensing and investigates fraud. Many state DMVs can order restitution. Filings usually free.",
        tradeoff:
          "DMV process can take months. Run in parallel with the demand letter, not as a replacement.",
      },
      {
        title: "State Attorney General consumer protection",
        pillLabel: "Free, UDAP-focused",
        pillTier: "good",
        whenItFits:
          "your case fits a state UDAP violation. AGs pursue dealer fraud aggressively because of the consumer protection mandate. Pattern cases (multiple buyers) get priority.",
        tradeoff:
          "AGs prioritize patterns over individual cases. Your single case may be added to a class but not always pursued individually.",
      },
      {
        title: "Small claims (this guide)",
        pillLabel: "Best for individual recovery",
        pillTier: "warn",
        whenItFits:
          "the dealer has not refunded after the demand letter. Damages within your state's cap.",
        tradeoff:
          "30 to 90 day timeline. Filing fee $30 to $100. Bigger cases (over $20,000) need higher courts and a consumer-protection attorney.",
      },
    ],
  },

  cta: {
    h2: { pre: "Recover the ", em: "diminished value", post: "." },
    body:
      "Dealership-fraud demand letters work especially well when paired with DMV and AG complaints. The state UDAP multiplier and fee-shifting create immediate settlement pressure. Our generator builds yours in under two minutes.",
    receipt: {
      label: "example · undisclosed accident history",
      items: [
        { label: "Diminished value", amount: "$2,800" },
        { label: "UDAP treble damages", amount: "+ $5,400" },
        { label: "Filing fee + interest", amount: "+ $200" },
      ],
      total: "$8,400",
      totalLabel: "Total claim",
      note: "Illustrative. Mileage-rollback cases unlock federal $10,000 minimum or 3x damages.",
    },
  },

  faqs: [
    {
      q: "What is UDAP?",
      a: "Unfair and Deceptive Acts and Practices: state consumer-protection laws prohibiting deceptive business practices. Most states have UDAP statutes (sometimes called consumer-protection acts or deceptive trade practices acts) with 2x or 3x damage multipliers and attorney fee-shifting. Dealer fraud is the most common UDAP claim category.",
    },
    {
      q: "What is the federal odometer law?",
      a: "49 USC § 32710 prohibits mileage rollback and other odometer fraud. It adds penalties of $10,000 or 3x actual damages, whichever is greater, plus attorney fees. The federal law applies on top of state odometer laws and is one of the strongest consumer fraud statutes in any context.",
    },
    {
      q: "Can I rescind the deal and get my money back?",
      a: "Yes, in many states. Rescission is a remedy under fraud claims that lets you return the vehicle and recover everything you paid. State UDAP laws often allow rescission alongside damages. The dealer takes back the vehicle; you take back your money plus your trade-in.",
    },
    {
      q: "Is the AutoBuyersGuide legally binding?",
      a: "Yes, in most states. The federal Used Car Rule (16 CFR § 455) requires dealers to display an AutoBuyersGuide on used-car windows. If the dealer's representations on the form contradict reality, that is grounds for fraud and UDAP claims. Get a copy of the signed form at sale.",
    },
    {
      q: "What if the dealer says 'as is'?",
      a: "'As is' protects against unknown defects, not fraud. A dealer cannot lie about the car and then hide behind 'as is' language. Most state courts hold that 'as is' cannot waive UDAP claims or fraud claims based on affirmative misrepresentations.",
    },
    {
      q: "How do I prove the dealer knew about the issue?",
      a: "Carfax, AutoCheck, or similar history reports from the date of sale establish what the dealer should have known. Most state laws require dealers to use due diligence; failure to check the history is itself a UDAP violation in many states. The 'we did not know' defense is hard to maintain.",
    },
    {
      q: "How long do I have to sue?",
      a: "State UDAP claims usually run 2 to 4 years from the date of discovery. Federal odometer fraud has a 2-year statute. Some states have shorter windows. Move fast: pre-suit demand letter timing often determines whether you get treble damages.",
    },
  ],

  relatedSlugs: [
    "dealership-undisclosed-damage",
    "lemon-car",
    "mechanic-overcharging",
    "mechanic-bad-work",
    "parked-car-hit",
    "valet-damage",
  ],
};
