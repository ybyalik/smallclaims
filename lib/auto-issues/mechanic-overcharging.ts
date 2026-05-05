import type { AutoIssue } from "./types";

export const mechanicOvercharging: AutoIssue = {
  slug: "mechanic-overcharging",
  ready: true,
  short: "Mechanic overcharging",
  breadcrumbLabel: "Mechanic Overcharging",

  meta: {
    title: "Can I Sue a Mechanic for Overcharging? Small Claims Guide",
    description:
      "Plain-English guide to disputing a mechanic bill that exceeds the written estimate. State auto repair statutes (10% cap in California, similar elsewhere), Bureau of Auto Repair complaints, and a demand-letter template.",
  },

  hero: {
    eyebrowSuffix: "Mechanic overcharging",
    h1: { pre: "Can I sue a mechanic for ", em: "overcharging", post: "?" },
    leadStrong: "Yes. State auto repair laws cap charges over the written estimate.",
    leadBody:
      " Most states require a written estimate before any auto repair work and cap charges over the estimate without your consent (California: anything over 10 percent of the estimate requires written authorization). Charges over that limit are recoverable, plus statutory penalties in some states. The Bureau of Auto Repair (or equivalent) takes complaints free of charge and the threat of a license investigation often produces a fast refund.",
  },

  counter: {
    amount: 2400,
    meta: "State auto repair statute · estimate cap",
    rows: [
      { label: "Overcharge above estimate", value: "$1,800" },
      { label: "Statutory penalty (varies by state)", value: "+ $400", emphasis: "accent" },
      { label: "Filing fee + interest", value: "$200", emphasis: "muted" },
    ],
    footer: "Sample · within most state small-claims caps",
  },

  whatCounts: {
    h2: { pre: "What counts as ", em: "overcharging", post: "?" },
    lede:
      "Four common patterns. Each one is its own claim under state auto repair statutes.",
    cards: [
      {
        num: "01",
        title: "Bill exceeds written estimate",
        body:
          "Most states require a written estimate before work. Charges over the estimate require additional written authorization. California: anything over 10 percent of the estimate is unauthorized. New York: prior authorization required for any increase. Texas: written notice of any change required.",
      },
      {
        num: "02",
        title: "Performed unauthorized work",
        body:
          "Did work you did not request. Most state auto repair statutes prohibit unauthorized work entirely. Common pattern: you bring the car for a $200 brake check and they do a $1,500 brake job without calling. Unauthorized work is recoverable.",
      },
      {
        num: "03",
        title: "Charged for parts not installed",
        body:
          "Billed for OE parts but installed cheap aftermarket. Charged for new parts but installed remanufactured. State laws require disclosure of part type. The price difference plus statutory penalties are recoverable.",
      },
      {
        num: "04",
        title: "Inflated labor hours",
        body:
          "Billed for 5 hours of labor when the manufacturer's flat-rate guide says 2 hours. Most shops bill at flat rate, but the rate must match the actual work. A second-opinion mechanic can confirm the appropriate flat rate.",
      },
    ],
    note: {
      strongIntro: "Get a copy of the original estimate.",
      rest:
        " The written estimate before work began is your spine evidence. If you do not have a copy, the shop is required by law to provide one. Most state auto repair statutes give the customer the right to a copy of the estimate, the work order, and the final invoice.",
    },
  },

  claim: {
    h2: { pre: "How much can you ", em: "claim", post: "?" },
    lede:
      "The overcharge is the floor. Statutory penalties stack on top in many states.",
    layers: [
      {
        tag: "Layer 1",
        title: "Refund of overcharge",
        body:
          "The amount over the written estimate (or beyond the 10 percent cap in California). If the work was entirely unauthorized, the full charge is recoverable.",
        amount: "$1,800",
      },
      {
        tag: "Layer 2",
        title: "Statutory penalties",
        body:
          "California's BAR can assess fines, but those go to the state, not to you. Some states (NY, MA) have consumer-recovery provisions in their auto repair statutes. State UDAP claims often add 2x or 3x for willful violations.",
        amount: "+ $400",
        accent: true,
      },
      {
        tag: "Layer 3",
        title: "Filing fees, attorney fees, interest",
        body:
          "Some state auto repair statutes shift fees to the loser. UDAP claims often do. Filing fee, service-of-process cost, pre-judgment interest at your state's legal rate.",
        amount: "+ $200",
      },
    ],
    total: {
      label: "Sample total within small-claims cap",
      body:
        "Refund of overcharge above the 10 percent cap, plus statutory penalty, plus filing fee.",
      amount: "$2,400",
      sublabel: "illustrative · varies by state and statute",
    },
  },

  demand: {
    h2: { pre: "Send a ", em: "demand letter", post: " first." },
    lede:
      "Demand letters work fast in overcharge cases because the shop knows the Bureau of Auto Repair will investigate any documented overcharge complaint. Most settle to keep the license clean.",
    checklist: [
      "The original written estimate",
      "The final invoice (showing the overcharge)",
      "What you authorized vs. what was billed",
      "State auto repair statute citation",
      "A 14-day deadline before you file",
      "Sent certified mail to the shop owner",
    ],
    letter: {
      certifiedNum: "7019 0140 0001 4827 3596",
      date: "May 5, 2026",
      recipientName: "Acme Auto Repair",
      recipientAddress: "850 Main Street, San Diego, CA 92101",
      reLine: "Demand for Refund of Overcharge, Repair on April 14, 2026",
      bodyParagraphs: [
        "On April 14, 2026, your shop provided a written estimate of $1,200 for a transmission service on my 2020 Honda Civic. The final invoice was $3,000. I never authorized the additional $1,800 in charges.",
        "Pursuant to <strong>California Bus & Prof Code § 9884.9</strong> (Bureau of Automotive Repair), charges over 10 percent of the written estimate require additional written authorization. The overcharge is $1,800 above the cap. I demand within <strong>fourteen (14) days</strong>:",
      ],
      demandList: [
        "Refund of <strong>$1,800</strong> in unauthorized charges (overcharge above § 9884.9 cap);",
        "Statutory penalty of <strong>$400</strong> per state UDAP for willful violation.",
      ],
      closingLine:
        "Total demand: <strong>$2,200.00</strong>. If unresolved, I will file a complaint with the California Bureau of Automotive Repair and file in Small Claims Court.",
      signatory: "Skylar Q. Customer",
    },
  },

  fileSteps: {
    h2: { pre: "How to ", em: "file", post: " an overcharge case." },
    lede:
      "Four steps. State Bureau of Auto Repair complaint is the most effective leverage; small claims is the fallback.",
    steps: [
      {
        title: "Document the gap",
        body:
          "Original written estimate. Final invoice. Side by side, the overcharge is the difference. State law in California sets the cap at 10 percent of estimate; check your state.",
      },
      {
        title: "File state Bureau of Auto Repair complaint",
        body:
          "California: bar.ca.gov. Other states: search 'auto repair complaint' for your state. The Bureau investigates overcharge complaints aggressively because the auto repair statute is one of their core enforcement areas.",
      },
      {
        title: "File in small claims",
        body:
          "If the demand and BAR complaint do not produce a refund within 60 days, file. Filing fees usually run $30 to $100. File in the county where the shop is located.",
      },
      {
        title: "Hearing",
        body:
          "Lead with the original estimate, the final invoice, and the statute citation. The math is the case. Hearings usually run 10 to 15 minutes.",
      },
    ],
    aftermath: {
      tag: "After you win",
      title: "Collecting from a shop.",
      bodyHtml:
        "Most auto shops are licensed and have business assets. After judgment, the enforcement tools are a <strong>judgment lien</strong> on real estate, a <strong>bank levy</strong>, and a <strong>writ of execution</strong> on tools or accounts receivable. BAR complaints can also result in license suspension or revocation.",
    },
  },

  evidence: {
    h2: { pre: "What evidence do you need to ", em: "sue a mechanic", post: "?" },
    lede:
      "The original estimate plus the final invoice are decisive. The math is the case.",
    cells: [
      {
        kind: "letter",
        tag: "Original estimate (signed)",
        letterhead: "Acme Auto Repair · BAR Reg #ARD-72182",
        date: "April 14, 2026",
        recipientName: "Skylar Customer",
        reLine: "Estimate · 2020 Honda Civic transmission service",
        bodyParagraphs: [
          "Scope: drain and refill transmission, replace filter, scan for fault codes.",
          "Estimated cost: parts $400, labor 4 hours @ $200 = $800. Total: $1,200. Customer signature required to proceed.",
        ],
        signatory: "Skylar Customer",
        signatoryTitle: "Customer signature, 04/14/2026 09:15",
      },
      {
        kind: "texts",
        tag: "Pickup conversation",
        texts: [
          { dir: "in", text: "Bill is $3,000? Your estimate was $1,200. What happened?" },
          { dir: "out", text: "We found additional issues. Replaced solenoids, did flush. You wanted the car fixed." },
          { dir: "in", text: "I never authorized that. You did not call." },
        ],
      },
      {
        kind: "handbook",
        tag: "Estimate cap statute",
        documentTitle: "California Bus & Prof Code · § 9884.9(a)",
        sectionTitle: "Auto repair estimate cap",
        bodyParagraphs: [
          "An automotive repair dealer shall not exceed by more than 10 percent the written estimated price for parts and labor for a specific job without first obtaining the customer's authorization in writing.",
        ],
        highlight:
          "Estimate $1,200. 10% cap = $1,320. Final $3,000. Overcharge above cap: $1,680.",
        footer: "Bureau of Automotive Repair enforces this statute · max fines $5,000 per violation",
      },
      {
        kind: "receipt",
        tag: "Final invoice",
        vendor: "ACME AUTO REPAIR",
        vendorAddr: "BAR Reg #ARD-72182 · San Diego, CA",
        receiptNum: "Invoice #4218",
        date: "04/15/2026",
        lineItems: [
          { label: "Transmission service (per estimate)", amount: "$1,200.00" },
          { label: "Replaced solenoid pack (unauthorized)", amount: "$1,200.00" },
          { label: "Transmission flush (unauthorized)", amount: "$600.00" },
        ],
        subtotal: "$3,000.00",
        total: "$3,000.00",
        footer: "$1,800 above estimate · no written authorization",
      },
    ],
  },

  defenses: {
    h2: { pre: "Common shop ", em: "defenses", post: ", with rebuttals." },
    lede:
      "Three arguments cover most overcharge cases. The estimate-cap statute makes most of them hard to maintain.",
    items: [
      {
        quote: "We called you and got verbal authorization.",
        pill: "Most common",
        rebuttal:
          "<strong>Rebuttal:</strong> California § 9884.9 specifically requires <em>written</em> authorization for charges over 10 percent. Verbal does not count. Other states are similar. Even if there was a phone call, the lack of written confirmation makes the overcharge unauthorized.",
      },
      {
        quote: "The additional work was needed and you knew about it.",
        pill: "Necessity",
        rebuttal:
          "<strong>Rebuttal:</strong> the estimate cap statute exists exactly for this scenario. Necessity does not waive the requirement for written authorization. The shop should have called for written approval. If they did the work without authorization, they cannot bill for it.",
      },
      {
        quote: "You picked up the car and paid the bill.",
        pill: "Acceptance",
        rebuttal:
          "<strong>Rebuttal:</strong> paying under protest is not acceptance. State auto repair laws often require customers to pay before retrieving the car (mechanic's lien). The customer's right to dispute the overcharge survives the payment. Bring proof of payment under protest if you noted it.",
      },
    ],
  },

  outcomes: {
    h2: { pre: "How much do customers ", em: "actually win", post: "?" },
    lede:
      "Typical recovery in overcharge cases. The math is statutory, so outcomes are predictable.",
    bands: [
      {
        label: "Low",
        range: "$200 to $800",
        body:
          "<strong>Partial refund.</strong> Court awards partial refund of charges over the cap. Common when some authorization is documented.",
        tier: "low",
      },
      {
        label: "Mid",
        range: "$800 to $3,000",
        body:
          "<strong>Full refund of overcharge.</strong> Most common when the gap between estimate and bill is clear and no written authorization exists.",
        tier: "mid",
      },
      {
        label: "High",
        range: "$3,000 to $10,000+",
        body:
          "<strong>Full refund plus UDAP multiplier.</strong> Major overcharges with willful violation findings push higher. Combined with bad-work claims, recovery can hit small-claims caps.",
        tier: "high",
      },
    ],
  },

  stateSection: null,

  alternatives: {
    h2: { pre: "What are the ", em: "alternatives", post: " to small claims?" },
    lede:
      "State Bureau of Auto Repair complaints are unusually effective in overcharge cases.",
    cards: [
      {
        title: "State Bureau of Auto Repair (or equivalent)",
        pillLabel: "Free, regulatory, biggest hammer",
        pillTier: "primary",
        whenItFits:
          "any licensed shop. The Bureau enforces auto repair laws, including the estimate-cap statute. Filing is free and often produces fast settlement.",
        tradeoff:
          "agency restitution authority varies. California BAR can fine the shop but does not always order restitution to the customer.",
      },
      {
        title: "State Attorney General consumer protection",
        pillLabel: "Free, UDAP-focused",
        pillTier: "good",
        whenItFits:
          "your case fits a state UDAP violation (most overcharge cases do). AGs pursue patterns of overcharge fraud aggressively.",
        tradeoff:
          "AGs prioritize patterns over individual cases.",
      },
      {
        title: "Small claims (this guide)",
        pillLabel: "Best for individual recovery",
        pillTier: "warn",
        whenItFits:
          "the demand and BAR complaint did not produce a refund. Damages within your state's cap.",
        tradeoff:
          "30 to 90 day timeline. Filing fee $30 to $100.",
      },
    ],
  },

  cta: {
    h2: { pre: "Recover the ", em: "overcharge", post: "." },
    body:
      "Demand letters work fast in overcharge cases because the math is statutory. The Bureau of Auto Repair complaint adds license risk. Our generator builds yours in under two minutes.",
    receipt: {
      label: "example · $1,800 over estimate",
      items: [
        { label: "Refund of overcharge", amount: "$1,800" },
        { label: "Statutory penalty (UDAP)", amount: "+ $400" },
        { label: "Filing fee + interest", amount: "+ $200" },
      ],
      total: "$2,400",
      totalLabel: "Total claim",
      note: "Illustrative. Larger overcharges or pattern complaints push recovery higher.",
    },
  },

  faqs: [
    {
      q: "Are mechanics required to give a written estimate?",
      a: "Yes, in most states. California requires a written estimate before any work. New York requires written estimate plus written authorization for changes. Texas requires written estimate for any job over $100. Check your state auto repair statute. Without a written estimate, all charges are usually disputable.",
    },
    {
      q: "What is the 10 percent rule?",
      a: "California Bus & Prof Code § 9884.9 prohibits a shop from exceeding the written estimate by more than 10 percent without obtaining additional written authorization from the customer. Charges over the cap without written authorization are recoverable. Other states have similar rules; some are stricter.",
    },
    {
      q: "What if the shop says additional work was needed?",
      a: "Necessity does not waive the written-authorization requirement. The shop should have called for written approval before doing the work. If they did the work without authorization, they cannot bill for it. State auto repair statutes are strict on this point.",
    },
    {
      q: "Do I have to pay the disputed amount to get my car back?",
      a: "Often yes, because of mechanic's-lien rules. Most states give the shop a lien for unpaid bills, meaning they can hold the car until paid. Many customers pay under protest (note 'paid under protest' on the receipt) and then file the demand letter and complaint. Your right to dispute survives the payment.",
    },
    {
      q: "What about the Bureau of Automotive Repair?",
      a: "California's auto repair regulator. Investigates complaints, can fine shops, and can suspend licenses. Other states have similar agencies. Filing a complaint is free and often more effective than a lawsuit because shops do not want to lose their license. Use this in parallel with the demand letter.",
    },
    {
      q: "How long do I have to sue?",
      a: "State auto repair statute claims usually run 1 to 4 years. Breach of contract claims run 3 to 6 years. UDAP claims usually 2 to 4 years. Move fast: pre-suit demand letter timing often determines whether you get statutory penalties.",
    },
    {
      q: "Can I refuse to pay the overcharge?",
      a: "Refusing to pay can lead to a mechanic's lien being placed on your vehicle (the shop holds it until paid). Most lawyers recommend paying under protest, retrieving the car, and then suing for refund. Document the protest in writing on the receipt.",
    },
  ],

  relatedSlugs: [
    "mechanic-bad-work",
    "mechanic-took-too-long",
    "dealership-fraud",
    "valet-damage",
    "lemon-car",
    "towing-damage",
  ],
};
