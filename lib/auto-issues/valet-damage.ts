import type { AutoIssue } from "./types";

export const valetDamage: AutoIssue = {
  slug: "valet-damage",
  ready: true,
  short: "Valet damage",
  breadcrumbLabel: "Valet Damage",

  meta: {
    title: "Can I Sue a Valet for Damaging My Car? Small Claims Guide",
    description:
      "Plain-English guide to recovering when a valet damaged your car. Bailment law's presumption of negligence, why disclaimer signs are usually unenforceable, and a demand-letter template.",
  },

  hero: {
    eyebrowSuffix: "Valet damage",
    h1: { pre: "Can I sue a valet for ", em: "damaging my car", post: "?" },
    leadStrong: "Yes, and bailment law presumes the valet was negligent.",
    leadBody:
      " A valet who takes your keys becomes a 'bailee for hire' under common law. When the car comes back damaged, bailment law presumes the valet was negligent; the valet has to prove they were not at fault. Disclaimer signs ('not responsible for damage') are usually unenforceable. Most valet operations carry general liability insurance; the carrier is the typical source of recovery.",
  },

  counter: {
    amount: 2800,
    meta: "Bailment for hire · presumption of negligence",
    rows: [
      { label: "Repair cost", value: "$2,000" },
      { label: "Rental car (5 days)", value: "+ $400", emphasis: "accent" },
      { label: "Filing fee + interest", value: "$400", emphasis: "muted" },
    ],
    footer: "Sample · within most state small-claims caps",
  },

  whatCounts: {
    h2: { pre: "What kinds of ", em: "valet damage", post: " can you sue for?" },
    lede:
      "Four common patterns. Each one is recoverable under bailment law plus state vehicle-storage regulations.",
    cards: [
      {
        num: "01",
        title: "Damage during pickup or return",
        body:
          "Most common pattern. Scratched bumper, dented panel, broken trim, scraped wheels from curbs. Many valets rush to park multiple cars in tight spaces; mistakes happen. Bailment law makes the valet operation responsible.",
      },
      {
        num: "02",
        title: "Damage during transport",
        body:
          "Valet drove aggressively, hit a curb, rear-ended someone, or had a parking-lot collision while moving the car. Speed-monitoring devices on some modern cars can document the speed; many newer cars also save crash event data.",
      },
      {
        num: "03",
        title: "Damage at the lot",
        body:
          "Other vehicles backed into your car at the valet lot, weather damage from improper storage, vandalism while in their custody. The valet operation is bailee for the entire time it has your keys.",
      },
      {
        num: "04",
        title: "Items missing from the vehicle",
        body:
          "Items left in the car (sunglasses, electronics, golf clubs, tools) missing when retrieved. Most state laws treat valets as bailees for personal items in vehicles too. Recovery is replacement cost.",
      },
    ],
    note: {
      strongIntro: "Disclaimer signs are usually unenforceable.",
      rest:
        " Many valet operations post 'Not responsible for damage or items left in vehicle' signs. Most state consumer-protection laws prohibit pre-loss waivers of negligence liability. Courts routinely strike these signs as unenforceable. The bailment relationship cannot be disclaimed.",
    },
  },

  claim: {
    h2: { pre: "How much can you ", em: "claim", post: "?" },
    lede:
      "Repair cost is the floor. Rental, missing items, and consequential damages stack on top.",
    layers: [
      {
        tag: "Layer 1",
        title: "Repair cost",
        body:
          "Body shop estimate from a licensed facility. Two estimates strengthen the case. Hidden damage (bent suspension, alignment) often requires inspection by a different mechanic.",
        amount: "$2,000",
      },
      {
        tag: "Layer 2",
        title: "Rental car and missing items",
        body:
          "Rental car while the vehicle is being repaired. Replacement cost of items missing from the vehicle. Save receipts for both.",
        amount: "+ $400",
        accent: true,
      },
      {
        tag: "Layer 3",
        title: "Filing fees, alternative housing, interest",
        body:
          "Filing fee, service-of-process cost, pre-judgment interest at your state's legal rate. In rare cases, hotel costs if the trip was disrupted.",
        amount: "+ $400",
      },
    ],
    total: {
      label: "Sample total within small-claims cap",
      body:
        "Body shop repair cost plus 5 days of rental, plus filing fee.",
      amount: "$2,800",
      sublabel: "illustrative · varies by damage extent",
    },
  },

  demand: {
    h2: { pre: "Send a ", em: "demand letter", post: " first." },
    lede:
      "Demand letters work fast against valet operations because they have GL insurance and the carriers settle to avoid litigation. Copy the venue (hotel, restaurant, casino) on the letter; venues often pressure their valet operators to settle.",
    checklist: [
      "Date and venue where the valet operated",
      "Photos of damage (and pre-damage if available)",
      "Body shop estimate",
      "Rental car receipts",
      "Valet ticket and any signed receipt",
      "A 14-day deadline before you file",
      "Sent certified mail with copy to the venue and (if known) the GL carrier",
    ],
    letter: {
      certifiedNum: "7019 0140 0001 4827 3598",
      date: "May 5, 2026",
      recipientName: "Premier Valet Services LLC",
      recipientAddress: "1500 Hospitality Way, Las Vegas, NV 89109",
      reLine: "Demand for Damages, Vehicle Damage at Bellagio Hotel on April 14, 2026",
      bodyParagraphs: [
        "On April 14, 2026, I dropped off my 2024 BMW 540i with your valet at the Bellagio Hotel (valet ticket #82218). The vehicle was in undamaged condition (security camera footage from the dropoff confirms). When returned at 23:14 the same evening, the rear bumper had a deep scratch and the right rear quarter panel had a 4-inch dent.",
        "I obtained a body shop estimate from Vegas Auto Body (license #82817) for $2,000. I rented a vehicle for 5 days at $80/day ($400). Per common-law bailment, I demand within <strong>fourteen (14) days</strong>:",
      ],
      demandList: [
        "Reimbursement of <strong>$2,000</strong> in body shop repair costs;",
        "Reimbursement of <strong>$400</strong> in rental car costs.",
      ],
      closingLine:
        "Total demand: <strong>$2,400.00</strong>. Copy of this letter has been sent to your GL carrier (Acme Casualty, policy GL-2026-7821) and to Bellagio Hotel management. If unresolved, I will file in Small Claims Court.",
      signatory: "Reese Q. Owner",
    },
  },

  fileSteps: {
    h2: { pre: "How to ", em: "file", post: " a valet-damage case." },
    lede:
      "Four steps. Bailment law makes these cases unusually easy to win once damage is documented.",
    steps: [
      {
        title: "Document immediately",
        body:
          "Photos of the damage at retrieval, before driving away. The valet ticket. Get the venue's incident report (most hotels and casinos document valet incidents). Ask for the security footage; it usually shows both the dropoff condition and the return condition.",
      },
      {
        title: "File with GL carrier and venue",
        body:
          "Most valet operations have GL insurance through the venue or independently. Get the certificate of insurance and file a third-party claim. The venue often pressures the valet to settle to keep their hospitality reputation clean.",
      },
      {
        title: "File in small claims",
        body:
          "If the demand letter does not resolve within 30 days, file. Filing fees usually run $30 to $100. File against the valet operator (and sometimes the venue if it employed the valet).",
      },
      {
        title: "Hearing",
        body:
          "Lead with photos before and after, the body shop estimate, and the bailment-law citation. The valet has to prove they were not negligent. Hearings usually run 10 to 15 minutes.",
      },
    ],
    aftermath: {
      tag: "After you win",
      title: "Collecting from a valet operator.",
      bodyHtml:
        "Most valet operations have GL insurance. After judgment, the carrier pays the claim. After 30 days post-judgment, the enforcement tools are a <strong>judgment lien</strong>, a <strong>bank levy</strong>, and a <strong>writ of execution</strong>. Most cases settle through the carrier without enforcement.",
    },
  },

  evidence: {
    h2: { pre: "What evidence do you need to ", em: "sue a valet", post: "?" },
    lede:
      "Cases like this turn on photos and the bailment relationship. Evidence is usually straightforward.",
    cells: [
      {
        kind: "photos",
        tag: "Damage photos (dated)",
        photos: [
          { id: "1581094271901-8022df4466f9", cap: "Rear bumper scratch" },
          { id: "1556909114-f6e7ad7d3136", cap: "Quarter panel dent" },
          { id: "1581092335397-9583eb92d232", cap: "Wheel scrape" },
          { id: "1503602642458-232111445657", cap: "Valet stand at venue" },
        ],
      },
      {
        kind: "letter",
        tag: "Valet ticket",
        letterhead: "Premier Valet Services · Bellagio Hotel",
        date: "April 14, 2026",
        recipientName: "Reese Owner",
        reLine: "Valet ticket #82218",
        bodyParagraphs: [
          "Dropoff: 19:30. 2024 BMW 540i, dark blue. License plate noted.",
          "Pickup: 23:14. Same vehicle. Customer signature obtained.",
        ],
        signatory: "M. Vega",
        signatoryTitle: "Valet, Premier Valet Services",
      },
      {
        kind: "handbook",
        tag: "Bailment standard",
        documentTitle: "Restatement (Second) of Torts · § 519 (Bailment)",
        sectionTitle: "Bailee for hire · presumption of negligence",
        bodyParagraphs: [
          "When goods are delivered to a bailee for hire in good condition and returned in damaged condition, a presumption of negligence arises. The bailee bears the burden of proving they exercised reasonable care.",
        ],
        highlight:
          "Vehicle delivered undamaged at 19:30. Returned damaged at 23:14. Valet must prove non-negligence.",
        footer: "Bailment law applies in every state",
      },
      {
        kind: "receipt",
        tag: "Body shop + rental",
        vendor: "VEGAS AUTO BODY",
        vendorAddr: "License #82817 · Las Vegas, NV",
        receiptNum: "Estimate #2026-4217",
        date: "04/16/2026",
        lineItems: [
          { label: "Rear bumper repair + paint", amount: "$1,200.00" },
          { label: "Quarter panel pull and refinish", amount: "$800.00" },
        ],
        subtotal: "$2,000.00",
        total: "$2,000.00",
        footer: "Plus rental: 5 days at $80/day = $400",
      },
    ],
  },

  defenses: {
    h2: { pre: "Common valet ", em: "defenses", post: ", with rebuttals." },
    lede:
      "Three arguments cover most valet cases. Bailment law shuts down most of them.",
    items: [
      {
        quote: "Our sign said we are not responsible for damage.",
        pill: "Most common",
        rebuttal:
          "<strong>Rebuttal:</strong> disclaimer signs are unenforceable in most jurisdictions. State consumer-protection laws prohibit pre-loss waivers of negligence liability. Courts routinely strike valet disclaimer signs. Bailees cannot contract away their fundamental duty of care.",
      },
      {
        quote: "The damage was preexisting.",
        pill: "Preexisting",
        rebuttal:
          "<strong>Rebuttal:</strong> bring photos of the vehicle from before the dropoff. Many hotels and casinos have security camera footage of the valet dropoff and pickup. Subpoena the footage if needed. Without proof of preexisting damage, the bailment presumption applies.",
      },
      {
        quote: "We had several drivers that night. We cannot identify who did it.",
        pill: "Operator unknown",
        rebuttal:
          "<strong>Rebuttal:</strong> the valet operation is responsible regardless of which individual driver caused the damage. Bailment law holds the operator liable as a matter of organizational responsibility. Identifying the specific driver is the operator's problem, not yours.",
      },
    ],
  },

  outcomes: {
    h2: { pre: "How much do owners ", em: "actually recover", post: "?" },
    lede:
      "Typical recovery in valet-damage cases. Bailment law's presumption usually produces full recovery.",
    bands: [
      {
        label: "Low",
        range: "$300 to $1,500",
        body:
          "<strong>Cosmetic damage only.</strong> Court awards body shop estimate for surface damage. Common when the impact was light.",
        tier: "low",
      },
      {
        label: "Mid",
        range: "$1,500 to $4,000",
        body:
          "<strong>Repair plus rental.</strong> Most common when the damage required several days of body shop time.",
        tier: "mid",
      },
      {
        label: "High",
        range: "$4,000 to $10,000+",
        body:
          "<strong>Major mechanical or frame damage.</strong> Aggressive driving causing engine, transmission, or frame damage. Cases beyond the cap need higher courts.",
        tier: "high",
      },
    ],
  },

  stateSection: null,

  alternatives: {
    h2: { pre: "What are the ", em: "alternatives", post: " to small claims?" },
    lede:
      "Valet-damage cases have moderate out-of-court options. Always start with the venue and the GL carrier.",
    cards: [
      {
        title: "Valet operator's GL insurance",
        pillLabel: "Free, fast, biggest payer",
        pillTier: "primary",
        whenItFits:
          "the operator carries general liability insurance (most legitimate ones do). File a third-party claim using the certificate of insurance.",
        tradeoff:
          "small valet operations sometimes have minimal coverage.",
      },
      {
        title: "Venue management (hotel, restaurant, casino)",
        pillLabel: "Reputation pressure",
        pillTier: "good",
        whenItFits:
          "the valet operates at a venue that values its hospitality reputation. The venue often pressures the valet to settle to keep guest reviews positive. Loop in venue management early.",
        tradeoff:
          "venues with in-house valet are directly liable; outsourced valet shifts liability but the venue still has reputational interest.",
      },
      {
        title: "Small claims (this guide)",
        pillLabel: "Best for individual recovery",
        pillTier: "warn",
        whenItFits:
          "the carrier and venue did not resolve within 30 days. Bailment law makes these cases easy to win.",
        tradeoff:
          "30 to 90 day timeline. Filing fee $30 to $100.",
      },
    ],
  },

  cta: {
    h2: { pre: "Recover the ", em: "repair cost", post: "." },
    body:
      "Demand letters work fast against valet operations because of bailment law and venue reputation pressure. Copy the venue and the GL carrier for maximum impact. Our generator builds yours in under two minutes.",
    receipt: {
      label: "example · valet damage at hotel",
      items: [
        { label: "Body shop repair", amount: "$2,000" },
        { label: "Rental car (5 days)", amount: "+ $400" },
        { label: "Filing fee + interest", amount: "+ $400" },
      ],
      total: "$2,800",
      totalLabel: "Total claim",
      note: "Illustrative. Major engine or frame damage cases push higher.",
    },
  },

  faqs: [
    {
      q: "Are valet disclaimer signs enforceable?",
      a: "Usually no. Most state consumer-protection laws prohibit pre-loss waivers of negligence liability. Courts routinely strike valet disclaimer signs as unenforceable. Bailees cannot contract away their fundamental duty of care. The sign is essentially a bluff.",
    },
    {
      q: "What is bailment for hire?",
      a: "A common-law relationship where one party (the bailee) takes possession of another's property for a fee or in connection with a paid service. Valet parking is a textbook bailment for hire: you pay (directly or indirectly through the venue), the valet takes possession of the car. The valet owes you a duty of reasonable care.",
    },
    {
      q: "Can the venue (hotel, casino) be liable too?",
      a: "Sometimes. Venues that employ in-house valet operators are directly liable. Venues that outsource to a separate valet company shift the legal liability to the operator, but they retain a duty to vet and supervise. In some cases, you can sue both. Most often, suing the operator is enough.",
    },
    {
      q: "How do I prove the damage was not preexisting?",
      a: "Photos before the dropoff (most modern phones embed timestamps automatically). Security camera footage from the venue showing the dropoff and pickup conditions. Subpoena venue footage if needed. Without before photos, the bailment presumption still applies but the case is harder.",
    },
    {
      q: "What if items were missing from my car?",
      a: "Conversion plus negligence. The valet is bailee for personal items in the vehicle too. Photos of items in the car before dropoff (or witnesses) help establish what was there. Recovery is replacement cost.",
    },
    {
      q: "How long do I have to sue?",
      a: "Negligence and bailment claims usually run 2 to 4 years from the date of damage. Some states have specific bailee-liability statutes with their own deadlines. Move fast.",
    },
    {
      q: "Will my insurance cover this?",
      a: "Sometimes, under collision or comprehensive coverage. Use your insurance only when you need fast repair. Your carrier will pay you and pursue the valet (subrogation), but you eat the deductible. The valet's GL is usually the cleaner path.",
    },
  ],

  relatedSlugs: [
    "towing-damage",
    "parked-car-hit",
    "mechanic-bad-work",
    "lemon-car",
    "dealership-fraud",
    "mechanic-overcharging",
  ],
};
