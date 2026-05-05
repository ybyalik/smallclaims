import type { AutoIssue } from "./types";

export const towingDamage: AutoIssue = {
  slug: "towing-damage",
  ready: true,
  short: "Towing damage",
  breadcrumbLabel: "Towing Damage",

  meta: {
    title: "Can I Sue a Towing Company for Damaging My Car? Small Claims Guide",
    description:
      "Plain-English guide to recovering from a tow company that damaged your vehicle. Bailment law presumption of negligence, state tow regulations, and a demand-letter template.",
  },

  hero: {
    eyebrowSuffix: "Towing damage",
    h1: { pre: "Can I sue a towing company for ", em: "damaging my car", post: "?" },
    leadStrong: "Yes, and bailment law presumes the towing company is at fault.",
    leadBody:
      " A tow truck operator that picks up your car becomes a 'bailee' under common law. When the vehicle is returned damaged, bailment law presumes the bailee was negligent; the tow company has to prove they were not at fault. State tow regulations also impose specific duties (proper equipment, hookup procedures, reasonable care). Small claims is well-suited because tow damage cases usually fit the cap.",
  },

  counter: {
    amount: 3400,
    meta: "Bailment law + state tow regulations",
    rows: [
      { label: "Repair cost", value: "$2,400" },
      { label: "Rental car (5 days)", value: "+ $400", emphasis: "accent" },
      { label: "Filing fee + interest", value: "$200", emphasis: "muted" },
    ],
    footer: "Sample · within most state small-claims caps",
  },

  whatCounts: {
    h2: { pre: "What kinds of ", em: "tow damage", post: " can you sue for?" },
    lede:
      "Four common patterns. Each one is recoverable under bailment law plus state tow regulations.",
    cards: [
      {
        num: "01",
        title: "Damage during hookup",
        body:
          "Improper hookup causing bumper damage, tow eye broken off, body panels bent, or undercarriage damage. Modern vehicles need flatbed transport; using a hook-and-chain method on the wrong car causes substantial damage.",
      },
      {
        num: "02",
        title: "Damage during transport",
        body:
          "Vehicle dropped from the tow, hit overhead clearance, scraped underneath. Operator inexperience or speed are common causes. Transport damage usually shows in unusual locations (top, undercarriage, rear).",
      },
      {
        num: "03",
        title: "Damage at storage lot",
        body:
          "Other vehicles in the storage lot causing damage. Weather damage from improper storage. Damage during retrieval or release. Storage lots are part of the bailment relationship.",
      },
      {
        num: "04",
        title: "Items missing from the vehicle",
        body:
          "Personal items in the car when towed are part of the bailee's responsibility. Tools, electronics, custom audio equipment, golf clubs. Most states treat missing items as conversion plus negligence, both recoverable.",
      },
    ],
    note: {
      strongIntro: "Bailment law shifts the burden.",
      rest:
        " Unlike most negligence cases (where you have to prove the defendant was negligent), bailment law presumes negligence when a bailee returns goods damaged. The tow company has to prove they exercised reasonable care. Document the vehicle's condition before and after with photos.",
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
          "Body shop estimate for the damage. Two estimates are stronger than one. Hidden damage (bent frame, broken radiator, transmission issues from improper hookup) often requires inspection by a different mechanic.",
        amount: "$2,400",
      },
      {
        tag: "Layer 2",
        title: "Rental car and consequential damages",
        body:
          "Rental car while your vehicle is being repaired. Lost wages from missed work. Replacement cost of items missing from the vehicle (tools, electronics, golf clubs).",
        amount: "+ $400",
        accent: true,
      },
      {
        tag: "Layer 3",
        title: "Filing fees, statutory penalties, interest",
        body:
          "Filing fee, service-of-process cost, and pre-judgment interest at your state's legal rate. Some states (CA, FL, MA) add specific penalties for tow operators who damage vehicles.",
        amount: "+ $200",
      },
    ],
    total: {
      label: "Sample total within small-claims cap",
      body:
        "Body shop repair cost plus 5 days of rental car, plus filing fee.",
      amount: "$3,400",
      sublabel: "illustrative · varies by damage type and state",
    },
  },

  demand: {
    h2: { pre: "Send a ", em: "demand letter", post: " first." },
    lede:
      "Tow companies often have small-business GL insurance. The carrier wants to settle to avoid coverage litigation. Copy the carrier on the demand letter if you can identify it. Also file with the state DOT or PUC.",
    checklist: [
      "Date and reason for the tow",
      "Photos of vehicle condition before tow (if possible)",
      "Photos of damage at retrieval",
      "Body shop repair estimate",
      "Tow ticket and storage receipt",
      "A 14-day deadline before you file",
      "Sent certified mail with copy to the GL carrier",
    ],
    letter: {
      certifiedNum: "7019 0140 0001 4827 3594",
      date: "May 5, 2026",
      recipientName: "Apex Towing & Recovery",
      recipientAddress: "850 Industrial Way, Phoenix, AZ 85019",
      reLine: "Demand for Damages, Tow on April 14, 2026, Tow Ticket #82218",
      bodyParagraphs: [
        "On April 14, 2026, your operator towed my 2022 Honda Pilot from a parking enforcement violation at the Sunset Mall. The vehicle was in undamaged condition at the time of pickup (parking lot security footage timestamp 14:08). At retrieval (15:42, same day), the front bumper was cracked, the tow eye was broken off, and the front lower air dam had visible scrape damage from improper hookup.",
        "I obtained a body shop estimate from Phoenix Auto Body (license #82817) for $2,400. I rented a vehicle for 5 days at $80/day ($400). I demand within <strong>fourteen (14) days</strong>:",
      ],
      demandList: [
        "Reimbursement of <strong>$2,400</strong> in body shop repair costs;",
        "Reimbursement of <strong>$400</strong> in rental car costs.",
      ],
      closingLine:
        "Total demand: <strong>$2,800.00</strong>. If unresolved, I will file in Small Claims Court and report this incident to the Arizona Department of Transportation.",
      signatory: "Cameron K. Owner",
    },
  },

  fileSteps: {
    h2: { pre: "How to ", em: "file", post: " a tow-damage case." },
    lede:
      "Four steps. Bailment law makes these cases unusually easy to win once damage is documented.",
    steps: [
      {
        title: "Document the damage immediately",
        body:
          "Photos of the damage at the storage lot before the vehicle leaves. Photos before pickup (security footage from where you parked, if available) prove the damage was not pre-existing. Get the operator's name and tow ticket number.",
      },
      {
        title: "File state DOT or PUC complaint",
        body:
          "Most states regulate towing through the DOT, PUC, or a separate Tow Truck Authority. File a complaint at no cost. The agency can fine the operator and pull authority. Run in parallel with the demand letter.",
      },
      {
        title: "File in small claims",
        body:
          "If the demand letter does not resolve within 30 days, file. Filing fees usually run $30 to $100. File in the county where the tow occurred or where the storage lot is located.",
      },
      {
        title: "Hearing",
        body:
          "Lead with photos before and after, the body shop estimate, and the tow ticket. Cite bailment law: the tow company has to prove they were not negligent. Hearings usually run 10 to 15 minutes.",
      },
    ],
    aftermath: {
      tag: "After you win",
      title: "Collecting from a tow company.",
      bodyHtml:
        "Most tow companies carry GL insurance and bonds (state-mandated). After judgment, file a bond claim. After 30 days, the enforcement tools are a <strong>judgment lien</strong> on real estate, a <strong>bank levy</strong>, and a <strong>writ of execution</strong> on tow trucks or accounts receivable.",
    },
  },

  evidence: {
    h2: { pre: "What evidence do you need to ", em: "sue a tow company", post: "?" },
    lede:
      "Cases like this turn on before-and-after condition. Photos at retrieval are decisive; photos before tow seal the case.",
    cells: [
      {
        kind: "photos",
        tag: "Damage at retrieval",
        photos: [
          { id: "1581094271901-8022df4466f9", cap: "Cracked front bumper" },
          { id: "1556909114-f6e7ad7d3136", cap: "Broken tow eye" },
          { id: "1581092335397-9583eb92d232", cap: "Scraped air dam" },
          { id: "1503602642458-232111445657", cap: "Lot retrieval" },
        ],
      },
      {
        kind: "letter",
        tag: "Tow ticket",
        letterhead: "Apex Towing & Recovery",
        date: "April 14, 2026",
        recipientName: "Cameron Owner",
        reLine: "Tow Ticket #82218 · 2022 Honda Pilot",
        bodyParagraphs: [
          "Pickup: 14:30 from Sunset Mall, Lot C. Reason: parking enforcement violation, expired meter.",
          "Storage: Apex Lot B, 850 Industrial Way. Tow fee $185. Storage fee $40/day. Released 15:42 same day after fee paid.",
        ],
        signatory: "M. Vega",
        signatoryTitle: "Operator, Apex Towing",
      },
      {
        kind: "handbook",
        tag: "Bailment standard",
        documentTitle: "Restatement (Second) of Torts · § 519 (Bailment)",
        sectionTitle: "Presumption of negligence",
        bodyParagraphs: [
          "When goods are delivered to a bailee in good condition and returned in damaged condition, a presumption arises that the damage was caused by the bailee's negligence. The bailee bears the burden of proving they exercised reasonable care.",
        ],
        highlight:
          "Vehicle delivered undamaged at 14:30. Returned damaged at 15:42. Tow company must prove non-negligence.",
        footer: "Bailment law applies in every state",
      },
      {
        kind: "receipt",
        tag: "Body shop estimate",
        vendor: "PHOENIX AUTO BODY",
        vendorAddr: "License #82817 · Phoenix, AZ",
        receiptNum: "Estimate #2026-4217",
        date: "04/16/2026",
        lineItems: [
          { label: "Front bumper repair + paint", amount: "$1,400.00" },
          { label: "Tow eye replacement", amount: "$350.00" },
          { label: "Air dam refinish", amount: "$650.00" },
        ],
        subtotal: "$2,400.00",
        total: "$2,400.00",
        footer: "Plus rental car: 5 days at $80/day = $400",
      },
    ],
  },

  defenses: {
    h2: { pre: "Common tow company ", em: "defenses", post: ", with rebuttals." },
    lede:
      "Three arguments cover most tow-damage cases. Bailment law makes most of them hard to maintain.",
    items: [
      {
        quote: "The damage was preexisting.",
        pill: "Most common",
        rebuttal:
          "<strong>Rebuttal:</strong> bring photos of the vehicle from before the tow (security footage, parking lot timestamps, your own photos). Modern vehicles often have automatic damage detection in the body shop estimate. Without proof of preexisting damage, the bailment presumption applies.",
      },
      {
        quote: "Our operator followed standard procedures.",
        pill: "Procedure",
        rebuttal:
          "<strong>Rebuttal:</strong> following standard procedures does not mean those procedures were appropriate for your vehicle. Modern cars (with low front airdams, plastic bumpers, sensitive sensors) often require flatbed transport, not hook-and-chain. The choice of equipment is itself the negligence question.",
      },
      {
        quote: "Our standard receipt limits liability to the tow fee.",
        pill: "Limitation",
        rebuttal:
          "<strong>Rebuttal:</strong> most state consumer-protection laws prohibit pre-loss waivers of negligence liability. Tow company 'limitation of liability' clauses are routinely struck down by courts. Bailees cannot contract away their fundamental duty of care.",
      },
    ],
  },

  outcomes: {
    h2: { pre: "How much do owners ", em: "actually recover", post: "?" },
    lede:
      "Typical recovery in tow-damage cases. Bailment law's presumption usually produces full recovery.",
    bands: [
      {
        label: "Low",
        range: "$300 to $1,500",
        body:
          "<strong>Cosmetic damage only.</strong> Court awards body shop estimate for surface damage (bumper, panels, paint). Common when damage was contained.",
        tier: "low",
      },
      {
        label: "Mid",
        range: "$1,500 to $5,000",
        body:
          "<strong>Repair plus rental.</strong> Most common when documented damage required several days of body shop time.",
        tier: "mid",
      },
      {
        label: "High",
        range: "$5,000 to $20,000+",
        body:
          "<strong>Major mechanical or frame damage.</strong> Improper hookup causing transmission, engine, or frame damage pushes recovery higher. Cases beyond the cap need higher courts.",
        tier: "high",
      },
    ],
  },

  stateSection: null,

  alternatives: {
    h2: { pre: "What are the ", em: "alternatives", post: " to small claims?" },
    lede:
      "Tow-damage cases have moderate out-of-court options.",
    cards: [
      {
        title: "Tow company's GL insurance",
        pillLabel: "Free, fast",
        pillTier: "primary",
        whenItFits:
          "the company carries general liability insurance (most legitimate ones do). File a third-party claim using the certificate of insurance.",
        tradeoff:
          "small tow operators sometimes have minimal coverage. Not all carriers process claims quickly.",
      },
      {
        title: "State DOT, PUC, or Tow Truck Authority",
        pillLabel: "Free, regulatory",
        pillTier: "good",
        whenItFits:
          "the operator is licensed (most are). State agencies can fine operators, pull authority, and force settlement. Each state has a different agency: search 'tow truck complaint' on your state DOT site.",
        tradeoff:
          "agency timelines vary. Run in parallel with the demand letter.",
      },
      {
        title: "Small claims (this guide)",
        pillLabel: "Best for individual recovery",
        pillTier: "warn",
        whenItFits:
          "the carrier and agency did not resolve within 60 days. Bailment law makes these cases easy to win.",
        tradeoff:
          "30 to 90 day timeline. Filing fee $30 to $100.",
      },
    ],
  },

  cta: {
    h2: { pre: "Recover the ", em: "repair cost", post: "." },
    body:
      "Tow-damage demand letters work fast because bailment law shifts the burden to the tow company. They have to prove they were not negligent. Our generator builds yours in under two minutes.",
    receipt: {
      label: "example · improper hookup damage",
      items: [
        { label: "Body shop repair", amount: "$2,400" },
        { label: "Rental car (5 days)", amount: "+ $400" },
        { label: "Filing fee + interest", amount: "+ $200" },
      ],
      total: "$3,400",
      totalLabel: "Total claim",
      note: "Illustrative. Major mechanical or frame damage cases push higher.",
    },
  },

  faqs: [
    {
      q: "What is bailment law?",
      a: "Common-law rule that when you deliver goods to someone else (a bailee) for a specific purpose (transport, storage, repair), the bailee owes you a duty of reasonable care. When the bailee returns the goods damaged, a legal presumption arises that the bailee was negligent. The bailee has to prove otherwise. Towing is a textbook bailment relationship.",
    },
    {
      q: "Can the tow company limit liability with their receipt?",
      a: "Usually no. Most state consumer-protection laws prohibit pre-loss waivers of negligence liability. Tow company 'limitation of liability' clauses on standard receipts are routinely struck down. Bailees cannot contract away their fundamental duty of care.",
    },
    {
      q: "What if my car was towed illegally?",
      a: "Predatory towing (no signage, no warning, no proper notice) is a separate cause of action in many states. Damages from an illegal tow include the tow fee back, storage fees back, and any damage caused. Some states (CA, MD, others) have specific anti-predatory-towing statutes with multipliers.",
    },
    {
      q: "How do I prove the damage was not preexisting?",
      a: "Photos of the vehicle from before the tow are ideal. Security camera footage from where you parked. Body shop estimates that distinguish new damage from old (most shops do this in their reports). Your own dated photos. Without before photos, the bailment presumption still applies, but the case is harder.",
    },
    {
      q: "What if items were missing from my car?",
      a: "Conversion plus negligence. Document items in the vehicle before the tow (photos help). Get a written list of items missing. Most state laws treat tow operators as bailees of personal items in towed vehicles. Recovery is replacement cost.",
    },
    {
      q: "How long do I have to sue?",
      a: "Negligence and bailment claims usually run 2 to 4 years from the date of damage. State tow-regulation claims often have shorter windows (sometimes 1 year). Move fast.",
    },
    {
      q: "Will my insurance cover this?",
      a: "Sometimes, under collision or comprehensive coverage. Use your insurance only when you need fast repair and cannot wait. Your carrier will pay you and pursue the tow company (subrogation), but you eat the deductible. The tow company's GL is usually the cleaner path.",
    },
  ],

  relatedSlugs: [
    "valet-damage",
    "parked-car-hit",
    "mechanic-bad-work",
    "lemon-car",
    "dealership-fraud",
    "mechanic-overcharging",
  ],
};
