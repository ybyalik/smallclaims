import type { AutoIssue } from "./types";

export const parkedCarHit: AutoIssue = {
  slug: "parked-car-hit",
  ready: true,
  short: "Parked car hit",
  breadcrumbLabel: "Parked Car Hit",

  meta: {
    title: "Can I Sue Someone for Hitting My Parked Car? Small Claims Guide",
    description:
      "Plain-English guide to recovering when someone hit your parked car. Their auto insurance is the primary recovery; small claims fits when the driver was uninsured, hit-and-run, or the claim was rejected.",
  },

  hero: {
    eyebrowSuffix: "Parked car hit",
    h1: { pre: "Can I sue someone for ", em: "hitting my parked car", post: "?" },
    leadStrong: "Yes, but their auto insurance is usually the first stop.",
    leadBody:
      " A driver who hit your parked car owes you for the damage under negligence. Their auto insurance covers it. Small claims fits when the driver was uninsured, the insurance company rejected the claim, or it was a hit-and-run with a suspect identified (license plate, witness, security camera). You can also recover the diminished value of the vehicle even after repair.",
  },

  counter: {
    amount: 4200,
    meta: "Negligence + auto property damage",
    rows: [
      { label: "Repair cost", value: "$3,200" },
      { label: "Rental car (10 days)", value: "+ $800", emphasis: "accent" },
      { label: "Filing fee + interest", value: "$200", emphasis: "muted" },
    ],
    footer: "Sample · within most state small-claims caps",
  },

  whatCounts: {
    h2: { pre: "When does ", em: "hitting your parked car", post: " become a lawsuit?" },
    lede:
      "Four common scenarios. The other driver's insurance handles most cases. Small claims is for when insurance does not.",
    cards: [
      {
        num: "01",
        title: "Uninsured driver",
        body:
          "About 12 percent of US drivers are uninsured (varies by state). If the driver who hit you has no insurance, your options are your own uninsured-motorist coverage or a direct lawsuit. Small claims is the fastest path to a judgment for the repair cost.",
      },
      {
        num: "02",
        title: "Hit-and-run with a suspect identified",
        body:
          "If a witness, security camera, or license-plate fragment let you identify the driver, you can sue them directly. The hit-and-run aspect is a separate criminal matter, but the civil claim for the damage proceeds independently.",
      },
      {
        num: "03",
        title: "Insurance claim rejected or undervalued",
        body:
          "The other driver's insurance denied the claim, blamed you, or offered far below the repair cost. Small claims lets you bypass the insurance company and sue the driver directly. The driver's insurance often reopens the claim once you sue.",
      },
      {
        num: "04",
        title: "Diminished value claim",
        body:
          "Even after a perfect repair, your vehicle is worth less because of the accident history (it shows up in Carfax). Most states recognize a diminished-value claim against the at-fault driver. Bring a written diminished-value appraisal.",
      },
    ],
    note: {
      strongIntro: "Always file a police report.",
      rest:
        " A police report establishes the date, time, location, and (if a witness can identify the driver) the at-fault party. Without a report, hit-and-run cases are very hard to win. Most states have a 24 to 72 hour window to file. Even for non-hit-and-run, the report becomes evidence at the hearing.",
    },
  },

  claim: {
    h2: { pre: "How much can you ", em: "recover", post: "?" },
    lede:
      "Repair cost is the floor. Rental, towing, and diminished value stack on top. Most cases settle within the small-claims cap.",
    layers: [
      {
        tag: "Layer 1",
        title: "Repair cost or replacement",
        body:
          "Body shop estimate from a licensed repair facility. If the repair cost exceeds the vehicle's value, the case becomes a 'total loss' and you recover the actual cash value (ACV) instead.",
        amount: "$3,200",
      },
      {
        tag: "Layer 2",
        title: "Rental car and towing",
        body:
          "Rental car while your vehicle is being repaired. Towing fees if the vehicle was undriveable. Save receipts. Most courts award 'reasonable' rental costs (modest sedan, not luxury).",
        amount: "+ $800",
        accent: true,
      },
      {
        tag: "Layer 3",
        title: "Diminished value, filing fees, interest",
        body:
          "Diminished value: the difference between the vehicle's pre-accident and post-repair market value. Filing fee, service-of-process cost, and pre-judgment interest at your state's legal rate.",
        amount: "+ $200",
      },
    ],
    total: {
      label: "Sample total within small-claims cap",
      body:
        "Body shop repair cost plus 10 days of rental car, plus filing fee.",
      amount: "$4,200",
      sublabel: "illustrative · diminished-value cases push higher",
    },
  },

  demand: {
    h2: { pre: "Send a ", em: "demand letter", post: " first." },
    lede:
      "Demand letters work especially well when copied to the driver's auto insurance carrier (if you have it from the police report). The carrier wants to settle to avoid litigation costs. If the driver was uninsured, send the letter to the driver directly.",
    checklist: [
      "Date, time, and location of the incident",
      "Description of the damage with photos",
      "Body shop estimate from a licensed facility",
      "Rental car and towing receipts",
      "Police report number",
      "A 14-day deadline before you file",
      "Sent certified mail to the driver and (if known) the insurance carrier",
    ],
    letter: {
      certifiedNum: "7019 0140 0001 4827 3591",
      date: "May 5, 2026",
      recipientName: "Jordan Driver",
      recipientAddress: "2218 Magnolia Lane, Atlanta, GA 30309",
      reLine: "Demand for Damages, Parked-Car Hit on April 14, 2026, Police Report 26-04218",
      bodyParagraphs: [
        "On April 14, 2026 at approximately 3:15 PM, you struck my parked 2022 Toyota Camry on Peachtree Street and left the scene. A witness identified your license plate (GA ABC1234) and your vehicle. Police report number 26-04218 was filed.",
        "I obtained a repair estimate from Atlantic Auto Body (license #82817) for $3,200 and rented a vehicle for 10 days at $80/day ($800). I demand within <strong>fourteen (14) days</strong>:",
      ],
      demandList: [
        "Reimbursement of <strong>$3,200</strong> in repair costs (estimate attached);",
        "Reimbursement of <strong>$800</strong> in rental car costs (receipts attached).",
      ],
      closingLine:
        "Total demand: <strong>$4,000.00</strong>. If unresolved, I will file in Small Claims Court.",
      signatory: "Casey Q. Owner",
    },
  },

  fileSteps: {
    h2: { pre: "How to ", em: "file", post: " a parked-car case." },
    lede:
      "Four steps. The police report is your spine. Without it, hit-and-run cases are usually unwinnable.",
    steps: [
      {
        title: "File the police report immediately",
        body:
          "Most states require police reports for hit-and-run within 24 to 72 hours. Even for non-hit-and-run, the report locks in the date, location, and any witness statements. Get the report number; you will reference it everywhere.",
      },
      {
        title: "Get a body shop estimate",
        body:
          "Written estimate from a licensed body shop. Two estimates are stronger than one. If the damage looks small but the structure was hit, ask the shop to inspect for hidden frame or alignment damage.",
      },
      {
        title: "File a claim with the at-fault driver's insurance",
        body:
          "If you have the driver's info, contact their carrier directly (third-party claim). Most carriers settle within 30 to 60 days. If they reject or undervalue, the small-claims case follows. Always start here unless the driver was uninsured.",
      },
      {
        title: "File in small claims",
        body:
          "If the driver is uninsured, the insurance rejected, or the claim was undervalued, file. Filing fees usually run $30 to $100. File in the county where the incident occurred. Lead with the police report and body shop estimates.",
      },
    ],
    aftermath: {
      tag: "After you win",
      title: "Collecting from a driver.",
      bodyHtml:
        "Most insured cases pay through the carrier. For uninsured drivers, collection is harder. After 30 days post-judgment, the enforcement tools are a <strong>judgment lien</strong> on real estate, a <strong>bank levy</strong>, and a <strong>writ of execution</strong> on personal property. Many states also let you suspend the at-fault driver&rsquo;s license until they pay (administrative remedy through DMV).",
    },
  },

  evidence: {
    h2: { pre: "What evidence do you need to ", em: "sue a driver", post: "?" },
    lede:
      "Cases like this turn on the police report, body shop estimates, and damage photos. The clearer the chain, the faster the hearing.",
    cells: [
      {
        kind: "photos",
        tag: "Damage photos (dated)",
        photos: [
          { id: "1581094271901-8022df4466f9", cap: "Side dent" },
          { id: "1556909114-f6e7ad7d3136", cap: "Paint transfer" },
          { id: "1581092335397-9583eb92d232", cap: "Bumper damage" },
          { id: "1503602642458-232111445657", cap: "Position on street" },
        ],
      },
      {
        kind: "letter",
        tag: "Police report",
        letterhead: "Atlanta Police Department",
        date: "April 14, 2026",
        recipientName: "Casey Owner",
        reLine: "Incident Report #26-04218 · Hit and Run, Parked Vehicle",
        bodyParagraphs: [
          "On 04/14/2026 at approx. 1515 hrs, victim's parked 2022 Toyota Camry struck on Peachtree Street near 5th Ave. Witness Jamie Park provided license plate of suspect vehicle: GA ABC1234. Witness states suspect did not stop or leave note.",
          "Vehicle damage: driver-side rear panel, bumper. Suspect identified through DMV records as Jordan Driver, 2218 Magnolia Lane, Atlanta GA.",
        ],
        signatory: "Officer M. Reyes",
        signatoryTitle: "Badge 4827, APD",
      },
      {
        kind: "document",
        tag: "Witness contact",
      },
      {
        kind: "receipt",
        tag: "Body shop + rental",
        vendor: "ATLANTIC AUTO BODY",
        vendorAddr: "License #82817 · Atlanta, GA",
        receiptNum: "Estimate #2026-4217",
        date: "04/16/2026",
        lineItems: [
          { label: "Rear panel repair + paint", amount: "$1,800.00" },
          { label: "Bumper repair", amount: "$900.00" },
          { label: "Frame check + alignment", amount: "$500.00" },
        ],
        subtotal: "$3,200.00",
        total: "$3,200.00",
        footer: "Plus rental car: 10 days at $80/day = $800",
      },
    ],
  },

  defenses: {
    h2: { pre: "Common driver ", em: "defenses", post: ", with rebuttals." },
    lede:
      "Three arguments cover most parked-car cases. The police report and witness identification shut down most of them.",
    items: [
      {
        quote: "It was not me. I was somewhere else.",
        pill: "Most common",
        rebuttal:
          "<strong>Rebuttal:</strong> bring the police report identifying the license plate and the witness statement. Most states let plaintiffs subpoena the witness for the small-claims hearing. The license plate is registered to the driver's name and address; their alibi has to overcome the witness identification.",
      },
      {
        quote: "The damage was preexisting.",
        pill: "Preexisting",
        rebuttal:
          "<strong>Rebuttal:</strong> bring photos of your vehicle from before the incident (most insurance apps have these from policy start; many phone photos have date stamps). The body shop's report should distinguish new damage from old.",
      },
      {
        quote: "The estimate is too high. We will pay only fair value.",
        pill: "Cost dispute",
        rebuttal:
          "<strong>Rebuttal:</strong> bring two written estimates from licensed body shops. Most courts award the average. If the damage caused frame or alignment issues (often hidden), the body shop's inspection report substantiates higher costs.",
      },
    ],
  },

  outcomes: {
    h2: { pre: "How much do drivers ", em: "actually recover", post: "?" },
    lede:
      "Typical recovery in parked-car cases. Insurance route usually pays full repair plus reasonable rental.",
    bands: [
      {
        label: "Low",
        range: "$300 to $1,500",
        body:
          "<strong>Cosmetic damage only.</strong> Court awards the body shop estimate. Common when the impact was light and rental costs were minimal.",
        tier: "low",
      },
      {
        label: "Mid",
        range: "$1,500 to $5,000",
        body:
          "<strong>Repair plus rental.</strong> Most common when the damage required several days of body shop time and rental cost is documented.",
        tier: "mid",
      },
      {
        label: "High",
        range: "$5,000 to $20,000+",
        body:
          "<strong>Total loss or major structural damage.</strong> The vehicle was totaled or had substantial frame damage. Diminished-value claims also push higher when documented by an appraiser.",
        tier: "high",
      },
    ],
  },

  stateSection: null,

  alternatives: {
    h2: { pre: "What are the ", em: "alternatives", post: " to small claims?" },
    lede:
      "Most cases pay through insurance. Small claims is for when insurance does not.",
    cards: [
      {
        title: "At-fault driver's insurance",
        pillLabel: "Free, fast, biggest payer",
        pillTier: "primary",
        whenItFits:
          "the driver was insured. File a third-party claim with their carrier. Provide police report, photos, body shop estimate. Most carriers settle within 30 to 60 days.",
        tradeoff:
          "carriers often dispute the rental-car duration or the body shop's hourly rate. Push back with comparable estimates.",
      },
      {
        title: "Your uninsured-motorist coverage",
        pillLabel: "Quick, deductible applies",
        pillTier: "good",
        whenItFits:
          "the at-fault driver was uninsured (or fled the scene with no identification). Your own carrier pays under uninsured-motorist provisions, then pursues the driver (subrogation).",
        tradeoff:
          "deductible costs you out of pocket. Claims may affect your premium. Some states require UIM coverage; some do not.",
      },
      {
        title: "Small claims (this guide)",
        pillLabel: "When insurance fails",
        pillTier: "warn",
        whenItFits:
          "uninsured driver identified, insurance claim rejected, or claim undervalued. Damages within your state's cap.",
        tradeoff:
          "30 to 90 day timeline. Filing fee $30 to $100. Collection from an uninsured judgment-proof driver can be hard.",
      },
    ],
  },

  cta: {
    h2: { pre: "Recover the ", em: "repair cost", post: "." },
    body:
      "Demand letters work fast when paired with the police report and body shop estimate. Copy the driver's auto insurance carrier if you have it. Our generator builds yours in under two minutes.",
    receipt: {
      label: "example · uninsured driver, parked-car hit",
      items: [
        { label: "Body shop repair", amount: "$3,200" },
        { label: "Rental car (10 days)", amount: "+ $800" },
        { label: "Filing fee + interest", amount: "+ $200" },
      ],
      total: "$4,200",
      totalLabel: "Total claim",
      note: "Illustrative. Total-loss or diminished-value cases push higher.",
    },
  },

  faqs: [
    {
      q: "Should I sue the driver or the insurance company?",
      a: "Sue the driver. The insurance company is not directly liable to you (they have a contract with the driver, not with you). The driver is the proper defendant; their insurance handles the defense and pays the judgment. Some states allow direct action against the carrier in narrow cases, but it is rare.",
    },
    {
      q: "What if the driver fled the scene?",
      a: "Hit-and-run cases require identification before a lawsuit can proceed. A witness, security camera, license plate fragment, or your own dash cam can establish identity. File a police report immediately (most states require it within 24 to 72 hours) and follow up to ensure the report includes any witness contact info.",
    },
    {
      q: "Can I claim diminished value?",
      a: "In most states, yes. Even after a perfect repair, your vehicle's market value drops because the accident shows in vehicle history reports (Carfax, AutoCheck). Bring a written diminished-value appraisal from a licensed appraiser. Diminished-value claims add typically $500 to $3,000 to repair costs.",
    },
    {
      q: "What if the at-fault driver was uninsured?",
      a: "Two paths: (1) your own uninsured-motorist coverage if you carry it; (2) sue the driver directly in small claims. Collection from an uninsured driver can be hard, but the judgment stays on their record for 10+ years and accrues interest. Many states also let you ask the DMV to suspend their license until paid.",
    },
    {
      q: "How long do I have to sue?",
      a: "Property damage claims usually run 2 to 4 years from the date of the incident. Negligence claims (which is what this is) typically have shorter windows. Some states have specific motor-vehicle damage statutes with their own deadlines. Move fast.",
    },
    {
      q: "Will my insurance go up if I file a small-claims case against the driver?",
      a: "Suing the other party rarely affects your insurance. What can affect your insurance is filing a claim against your own policy (uninsured-motorist coverage, collision). Small-claims actions against another driver are usually insurance-neutral on your side.",
    },
    {
      q: "Can I sue for the time I spent dealing with this?",
      a: "Generally not. Personal time spent on phone calls and paperwork is rarely compensable in small-claims property-damage cases. But documented lost wages from work missed (e.g., to attend the hearing or visit body shops) are sometimes recoverable.",
    },
  ],

  relatedSlugs: [
    "valet-damage",
    "towing-damage",
    "mechanic-bad-work",
    "dealership-fraud",
    "lemon-car",
    "mechanic-overcharging",
  ],
};
