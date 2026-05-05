import type { AutoIssue } from "./types";

export const lemonCar: AutoIssue = {
  slug: "lemon-car",
  ready: true,
  short: "Lemon car",
  breadcrumbLabel: "Lemon Car",

  meta: {
    title: "Can I Sue a Dealership for Selling Me a Lemon? Small Claims Guide",
    description:
      "Plain-English guide to lemon-law claims. Federal Magnuson-Moss + state lemon laws, BBB Auto Line arbitration, when small claims fits and when you need a lemon-law attorney. Demand-letter template included.",
  },

  hero: {
    eyebrowSuffix: "Lemon car",
    h1: { pre: "Can I sue a dealership for selling me a ", em: "lemon", post: "?" },
    leadStrong: "Yes, but the lawsuit is usually against the manufacturer, not the dealer.",
    leadBody:
      " A 'lemon' is a vehicle with recurring problems the manufacturer cannot fix within a reasonable number of attempts. State lemon laws (every state has one for new cars; many extend to used cars) plus the federal Magnuson-Moss Warranty Act give you the right to a refund or a replacement, plus your attorney fees. Most cases start with BBB Auto Line arbitration before court. Small claims fits when the damages are limited; bigger cases need a lemon-law attorney (most take cases on contingency at no cost to you).",
  },

  counter: {
    amount: 8500,
    meta: "State lemon law + Magnuson-Moss",
    rows: [
      { label: "Refund of payments + finance charges", value: "$6,800" },
      { label: "Incidental damages (rental, towing)", value: "+ $1,500", emphasis: "accent" },
      { label: "Filing fee + interest", value: "$200", emphasis: "muted" },
    ],
    footer: "Sample · within most state small-claims caps",
  },

  whatCounts: {
    h2: { pre: "What makes a car a ", em: "lemon", post: "?" },
    lede:
      "Four conditions have to be present in most states. The exact threshold varies, but the framework is similar nationwide.",
    cards: [
      {
        num: "01",
        title: "A substantial defect",
        body:
          "The defect has to substantially impair the use, value, or safety of the vehicle. Cosmetic issues, minor electronics glitches, and rattles usually do not qualify. Brake failures, transmission problems, recurring stalls, electrical fires, and serious safety defects all count.",
      },
      {
        num: "02",
        title: "Multiple repair attempts",
        body:
          "Most state lemon laws presume the manufacturer had a 'reasonable opportunity' to fix the defect after 3 or 4 attempts on the same problem. Safety-related defects (brakes, steering) often trigger the presumption after just 1 or 2 attempts. Save every repair order.",
      },
      {
        num: "03",
        title: "Out of service for too long",
        body:
          "Most states have a separate trigger: if the vehicle is out of service for repairs for 30 cumulative days within the warranty period (e.g., the first year or 12,000 miles), it qualifies as a lemon regardless of whether the same defect recurred.",
      },
      {
        num: "04",
        title: "Within the warranty period",
        body:
          "State lemon laws apply during the warranty period (often the first 12 to 24 months or 12,000 to 24,000 miles, whichever is sooner). The federal Magnuson-Moss Act extends the protection by tying claims to whatever warranty came with the vehicle.",
      },
    ],
    note: {
      strongIntro: "Used cars are sometimes covered.",
      rest:
        " Most state lemon laws apply to new cars only. But some states (Massachusetts, New York, New Jersey) have separate used-car lemon laws. The federal Magnuson-Moss Act covers any vehicle still under any written warranty, including dealer service contracts. Read your warranty.",
    },
  },

  claim: {
    h2: { pre: "What can you ", em: "claim", post: "?" },
    lede:
      "Lemon laws give you a refund or a replacement vehicle, plus reasonable attorney fees from the manufacturer. Math is statutory.",
    layers: [
      {
        tag: "Layer 1",
        title: "Refund of all payments and finance charges",
        body:
          "Down payment, all monthly payments made, finance charges, sales tax, registration, and dealer fees. The manufacturer takes back the vehicle. Many statutes allow a small offset for mileage you used.",
        amount: "$6,800",
      },
      {
        tag: "Layer 2",
        title: "Incidental and consequential damages",
        body:
          "Rental car costs while the vehicle was in for repairs, towing fees, lost wages from missed work for repair appointments, alternative transportation costs.",
        amount: "+ $1,500",
        accent: true,
      },
      {
        tag: "Layer 3",
        title: "Attorney fees, filing costs, interest",
        body:
          "Magnuson-Moss and most state lemon laws shift attorney fees to the manufacturer. You can hire a lemon-law attorney at no upfront cost; the fees are recovered separately when you win.",
        amount: "+ $200",
      },
    ],
    total: {
      label: "Sample total under state lemon law",
      body:
        "Refund of $6,800 in payments and charges, plus $1,500 in rental and incidental costs, plus filing fee.",
      amount: "$8,500",
      sublabel: "illustrative · larger refund cases need higher courts",
    },
  },

  demand: {
    h2: { pre: "Send a ", em: "demand letter", post: " first." },
    lede:
      "Lemon-law demand letters work especially well because manufacturers track repurchase data and most settle to keep cases out of court. Cite both your state lemon law and Magnuson-Moss. The manufacturer's regional consumer affairs office handles the case, not the dealer.",
    checklist: [
      "VIN, purchase date, and purchase price",
      "List of every repair attempt with date and dealer",
      "The defect (substantial impairment of use, value, or safety)",
      "Cumulative days out of service for repair",
      "State lemon law citation and Magnuson-Moss reference",
      "A 30-day deadline before you file (some state lemon laws require this notice)",
      "Sent certified mail to manufacturer's regional consumer affairs office",
    ],
    letter: {
      certifiedNum: "7019 0140 0001 4827 3590",
      date: "May 5, 2026",
      recipientName: "Honda Motor Co. · Consumer Affairs",
      recipientAddress: "1919 Torrance Boulevard, Torrance, CA 90501",
      reLine: "Lemon Law Demand · 2025 Honda Pilot, VIN 5FNYF6H02NB123456",
      bodyParagraphs: [
        "I purchased the above vehicle on October 14, 2025 from Sunset Honda for $42,800. Beginning January 8, 2026 (less than 90 days after purchase), the vehicle has experienced a recurring transmission shudder under acceleration. The vehicle has been to the dealer 4 times for the same defect (Jan 8, Feb 12, Mar 18, Apr 22) and has been out of service for repairs for 38 cumulative days.",
        "Pursuant to <strong>California Civil Code § 1793.2</strong> (Song-Beverly Consumer Warranty Act) and the <strong>Magnuson-Moss Warranty Act (15 U.S.C. § 2301)</strong>, I demand within <strong>thirty (30) days</strong>:",
      ],
      demandList: [
        "Refund of <strong>$6,800</strong> in payments to date (down payment, 6 monthly payments, sales tax, fees);",
        "Reimbursement of <strong>$1,500</strong> in incidental and consequential damages (rental, towing, lost wages from repair visits).",
      ],
      closingLine:
        "Total demand: <strong>$8,300.00</strong>. If unresolved, I will pursue BBB Auto Line arbitration and Small Claims Court, and seek attorney fees per § 1794(d).",
      signatory: "Casey K. Owner",
    },
  },

  fileSteps: {
    h2: { pre: "How to ", em: "file", post: " a lemon-law case." },
    lede:
      "Four steps. BBB Auto Line is required first under many state lemon laws. Small claims is the third step, after the demand letter and arbitration.",
    steps: [
      {
        title: "Send the demand to the manufacturer",
        body:
          "Send certified mail to the manufacturer's regional consumer affairs office (not the dealer). Include the VIN, repair history, and statutory citation. Most state lemon laws require this notice before you can sue. Most cases settle here.",
      },
      {
        title: "File BBB Auto Line arbitration",
        body:
          "Free, manufacturer-sponsored arbitration. Most state lemon laws (CA, NY, FL, TX, etc.) require this step or treat it as evidence of good faith. Filings at bbb.org/auto-line. Decisions are usually within 40 days. Manufacturers often settle to avoid the arbitration record.",
      },
      {
        title: "File in small claims (if amount fits cap)",
        body:
          "If the refund and incidentals are under your state cap, small claims works. File in the county where the vehicle was purchased or where you live. Filing fees usually run $30 to $100.",
      },
      {
        title: "Hire a lemon-law attorney for bigger cases",
        body:
          "Most lemon-law attorneys take cases on contingency because Magnuson-Moss and state laws shift fees to the manufacturer. No upfront cost to you. Use this path when the refund exceeds the small-claims cap or when a replacement vehicle (not just refund) is the goal.",
      },
    ],
    aftermath: {
      tag: "After you win",
      title: "Refund or replacement.",
      bodyHtml:
        "Lemon-law judgments typically order the manufacturer to refund all payments (you return the vehicle) or provide a replacement. Most manufacturers comply within 30 days because they have to maintain dealer agreements. After a court judgment, the enforcement tools are a <strong>judgment lien</strong>, a <strong>bank levy</strong>, and a <strong>writ of execution</strong>, but enforcement against major manufacturers is rare; they pay.",
    },
  },

  evidence: {
    h2: { pre: "What evidence do you need to ", em: "win", post: "?" },
    lede:
      "Repair orders are the spine. The manufacturer's defense is usually 'we did not have a reasonable opportunity to repair'; the orders prove they did.",
    cells: [
      {
        kind: "letter",
        tag: "Repair history summary",
        letterhead: "Sunset Honda Service · License #2918374",
        date: "Jan – Apr 2026",
        recipientName: "Casey Owner",
        reLine: "Repair history · 2025 Honda Pilot · VIN 5FNYF6H02NB123456",
        bodyParagraphs: [
          "01/08/2026: Customer reports transmission shudder. Reflashed TCM. 4 days in service.",
          "02/12/2026: Same complaint. Replaced valve body. 8 days in service.",
          "03/18/2026: Same complaint. Replaced transmission. 14 days in service.",
          "04/22/2026: Same complaint. No further repair authorized. 12 days in service. Total: 38 days.",
        ],
        signatory: "K. Tran",
        signatoryTitle: "Service Manager",
      },
      {
        kind: "texts",
        tag: "Service advisor confirms",
        texts: [
          { dir: "in", text: "Did the new transmission fix the shudder?" },
          { dir: "out", text: "It came back. Same complaint as before." },
          { dir: "out", text: "Honda regional won't authorize another repair. Says it's normal." },
        ],
      },
      {
        kind: "handbook",
        tag: "Lemon law presumption",
        documentTitle: "California Civil Code · § 1793.22 (Tanner Consumer Protection Act)",
        sectionTitle: "Reasonable opportunity presumption",
        bodyParagraphs: [
          "It shall be presumed that a reasonable number of attempts have been made to conform a new motor vehicle to the applicable express warranties if (1) the same nonconformity has been subject to repair four or more times by the manufacturer or its agents, or (2) the vehicle is out of service by reason of repair of nonconformities for a cumulative total of more than 30 calendar days.",
        ],
        highlight:
          "4 attempts on same defect AND 38 days out of service. Presumption met on both counts.",
        footer: "Within 18 months / 18,000 miles of delivery",
      },
      {
        kind: "receipt",
        tag: "Payments to date",
        vendor: "PAYMENT SUMMARY · 2025 HONDA PILOT",
        vendorAddr: "VIN 5FNYF6H02NB123456",
        receiptNum: "Statement through 04/30/2026",
        date: "Oct 2025 to Apr 2026",
        lineItems: [
          { label: "Down payment (10/14/2025)", amount: "$5,000.00" },
          { label: "Sales tax + license + fees", amount: "$3,800.00" },
          { label: "6 monthly payments at $580", amount: "$3,480.00" },
          { label: "(less mileage offset, ~6,000 mi)", amount: "-$5,480.00" },
        ],
        subtotal: "$6,800.00",
        total: "$6,800.00",
        footer: "Refund basis · vehicle returned to manufacturer",
      },
    ],
  },

  defenses: {
    h2: { pre: "Common manufacturer ", em: "defenses", post: ", with rebuttals." },
    lede:
      "Three arguments cover most lemon cases. Each has a clean rebuttal once the repair orders are in evidence.",
    items: [
      {
        quote: "We did not have a reasonable opportunity to repair.",
        pill: "Most common",
        rebuttal:
          "<strong>Rebuttal:</strong> bring the repair orders. Most state lemon laws presume reasonable opportunity after 3 or 4 attempts on the same defect, or after 30 cumulative days out of service. Once the presumption is met, the burden shifts to the manufacturer to prove the defect was not substantial.",
      },
      {
        quote: "The defect does not substantially impair use, value, or safety.",
        pill: "Substantiality",
        rebuttal:
          "<strong>Rebuttal:</strong> document why the defect matters. A transmission shudder under acceleration is a safety issue (passing other cars, merging). Bring the technical-service-bulletin (TSB) reference if one exists; it shows the manufacturer recognized the defect class.",
      },
      {
        quote: "You did not give us a chance to use the BBB Auto Line first.",
        pill: "Procedural",
        rebuttal:
          "<strong>Rebuttal:</strong> file the BBB Auto Line case in parallel with the demand letter. Most state lemon laws require it but it is free and resolves quickly. After 40 days, you can move to court regardless of arbitration outcome.",
      },
    ],
  },

  outcomes: {
    h2: { pre: "How much do owners ", em: "actually recover", post: "?" },
    lede:
      "Typical recovery in lemon-law cases. Strength depends on repair history clarity and warranty status.",
    bands: [
      {
        label: "Low",
        range: "$1,000 to $5,000",
        body:
          "<strong>Cash settlement.</strong> Manufacturer offers a goodwill payment to keep the vehicle. Common when repair history is short or the defect is borderline.",
        tier: "low",
      },
      {
        label: "Mid",
        range: "$5,000 to $20,000",
        body:
          "<strong>Partial refund or replacement.</strong> Most common when the defect is well-documented and the cumulative-days threshold is met. Partial refund includes mileage offset.",
        tier: "mid",
      },
      {
        label: "High",
        range: "$20,000 to $80,000+",
        body:
          "<strong>Full refund or replacement vehicle.</strong> Cap-of-the-court awards rarely fit small claims for newer vehicles; these go to higher courts with lemon-law attorneys (contingency, no upfront cost).",
        tier: "high",
      },
    ],
  },

  stateSection: null,

  alternatives: {
    h2: { pre: "What are the ", em: "alternatives", post: " to small claims?" },
    lede:
      "Lemon-law cases have unusually strong out-of-court options. Small claims is appropriate only for limited-damage scenarios.",
    cards: [
      {
        title: "BBB Auto Line arbitration",
        pillLabel: "Free, often required first",
        pillTier: "primary",
        whenItFits:
          "the manufacturer participates in BBB Auto Line (most major brands do). Free arbitration with binding outcome for the manufacturer if you accept. Most state lemon laws require this step before court. File at bbb.org/auto-line.",
        tradeoff:
          "you have to wait up to 40 days. Some manufacturers do not participate (Tesla notably).",
      },
      {
        title: "Lemon-law attorney (contingency)",
        pillLabel: "No upfront cost",
        pillTier: "good",
        whenItFits:
          "any case where the refund exceeds the small-claims cap, or you want a replacement vehicle (not just refund). Magnuson-Moss and state lemon laws shift fees to the manufacturer.",
        tradeoff:
          "longer timeline (3 to 12 months). Most attorneys take 25 to 40 percent of the recovery, but the fee comes from the manufacturer's fee-shift award rather than your refund.",
      },
      {
        title: "Small claims (this guide)",
        pillLabel: "When the damages fit the cap",
        pillTier: "warn",
        whenItFits:
          "limited-damage cases (e.g., demand for incidentals only, partial refund within cap). Damages within your state's cap.",
        tradeoff:
          "cannot order a replacement vehicle. Cap usually $5,000 to $20,000 limits applicability for full refund cases.",
      },
    ],
  },

  cta: {
    h2: { pre: "Get the ", em: "refund or replacement", post: "." },
    body:
      "Lemon-law demand letters work especially well when paired with a BBB Auto Line filing. Most manufacturers settle to keep cases out of arbitration and court records. Our generator builds yours in under two minutes.",
    receipt: {
      label: "example · transmission lemon",
      items: [
        { label: "Refund of payments and charges", amount: "$6,800" },
        { label: "Incidental damages", amount: "+ $1,500" },
        { label: "Filing fee + interest", amount: "+ $200" },
      ],
      total: "$8,500",
      totalLabel: "Total claim",
      note: "Illustrative. Newer or higher-priced vehicles often exceed the cap and need a lemon-law attorney.",
    },
  },

  faqs: [
    {
      q: "What is a 'lemon' under the law?",
      a: "A vehicle with a substantial defect that the manufacturer cannot repair within a reasonable number of attempts during the warranty period. Most state lemon laws define 'reasonable' as 3 or 4 attempts on the same defect, or 30 cumulative days out of service. Safety-related defects often trigger the presumption faster.",
    },
    {
      q: "Should I sue the dealer or the manufacturer?",
      a: "Almost always the manufacturer. State lemon laws and Magnuson-Moss create the warranty obligations on the manufacturer, not the dealer. Dealers can be added as defendants for fraud or misrepresentation, but the lemon-law claim itself is against the manufacturer's regional consumer affairs office.",
    },
    {
      q: "What is BBB Auto Line and do I have to use it?",
      a: "Free arbitration sponsored by the Better Business Bureau and most major car manufacturers. Most state lemon laws require it as a first step or treat it as evidence of good faith before court. Decisions usually come within 40 days. The manufacturer is bound if you accept the arbitrator's decision; you are not.",
    },
    {
      q: "What is Magnuson-Moss?",
      a: "A federal law (15 U.S.C. § 2301) that creates federal-court enforcement of any written warranty. Magnuson-Moss covers any vehicle still under any written warranty, including service contracts. It works alongside state lemon laws and is especially useful for used cars (which most state lemon laws do not cover) or for federal-court jurisdiction.",
    },
    {
      q: "Will my used car qualify?",
      a: "Most state new-car lemon laws do not cover used vehicles, but some states (Massachusetts, New York, New Jersey, Connecticut) have separate used-car lemon laws. Federal Magnuson-Moss applies to any vehicle still under a written warranty, including dealer service contracts. Read your warranty.",
    },
    {
      q: "How long do I have to file?",
      a: "State lemon law deadlines vary widely: 12 to 24 months from purchase, or 12,000 to 24,000 miles, whichever is sooner. The four-attempt or 30-day presumption usually has to be met within that window. Magnuson-Moss claims run 4 years from breach. Move fast.",
    },
    {
      q: "Will my mileage reduce the refund?",
      a: "Yes, in most states. The 'mileage offset' reduces your refund based on miles driven before the first repair attempt. Most states cap the offset at a percentage of the purchase price. The offset for a $42,000 vehicle driven 6,000 miles before the first repair is typically $4,000 to $6,000, but varies by state.",
    },
  ],

  relatedSlugs: [
    "dealership-fraud",
    "dealership-undisclosed-damage",
    "mechanic-bad-work",
    "parked-car-hit",
    "mechanic-overcharging",
    "valet-damage",
  ],
};
