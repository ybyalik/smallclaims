import type { AutoIssue } from "./types";

export const mechanicTookTooLong: AutoIssue = {
  slug: "mechanic-took-too-long",
  ready: true,
  short: "Mechanic took too long",
  breadcrumbLabel: "Mechanic Took Too Long",

  meta: {
    title: "Can I Sue a Mechanic for Taking Too Long? Small Claims Guide",
    description:
      "Plain-English guide to suing a mechanic for unreasonable delay. Rental car costs, lost wages, contract breach for time, and a demand-letter template. Bureau of Auto Repair complaints add pressure.",
  },

  hero: {
    eyebrowSuffix: "Took too long",
    h1: { pre: "Can I sue a mechanic for ", em: "taking too long", post: "?" },
    leadStrong: "Yes. State auto repair laws and contract law both impose a reasonable-time duty.",
    leadBody:
      " A mechanic who keeps a car for weeks or months without progress is in breach of contract for time. Most state auto repair statutes require shops to keep customers informed of delays. The Uniform Commercial Code (UCC) and common law impose a 'reasonable time' obligation on service contracts. Recoverable damages include rental car costs, lost wages, and (in extreme cases) the diminished value of the car from prolonged storage.",
  },

  counter: {
    amount: 3200,
    meta: "Breach of contract · reasonable time",
    rows: [
      { label: "Rental car (45 days)", value: "$2,200" },
      { label: "Lost wages (missed work)", value: "+ $800", emphasis: "accent" },
      { label: "Filing fee + interest", value: "$200", emphasis: "muted" },
    ],
    footer: "Sample · within most state small-claims caps",
  },

  whatCounts: {
    h2: { pre: "When does a ", em: "delay", post: " become a lawsuit?" },
    lede:
      "Four common patterns. Each one is its own claim under contract law plus state auto repair statutes.",
    cards: [
      {
        num: "01",
        title: "Promised completion date missed substantially",
        body:
          "Shop quoted 1 week, took 6 weeks. The promised completion date in the written estimate creates a contract obligation. Substantial delays without good reason are breach. State law imposes a 'reasonable time' even when no specific date was promised.",
      },
      {
        num: "02",
        title: "Parts were never ordered or arrived months late",
        body:
          "Shop blamed delays on parts that were never ordered, or that the shop did not bother to expedite. Most state auto repair laws require shops to keep customers informed and to act in good faith on parts.",
      },
      {
        num: "03",
        title: "Car sat untouched for weeks",
        body:
          "Shop took the deposit, then did not work on the car. Visit the shop and check. Some shops triage based on profit margin, leaving smaller jobs for last. The customer is paying for prompt service, not for storage.",
      },
      {
        num: "04",
        title: "Repeated 'almost done' delays",
        body:
          "Shop says 'next week' for 6 consecutive weeks. Each delay extends rental and consequential costs. The pattern itself is evidence of bad faith.",
      },
    ],
    note: {
      strongIntro: "Document the timeline with specific dates.",
      rest:
        " Save text messages and emails. Note in writing what the shop promised and when. The case turns on the gap between the promised completion date and the actual completion (or your decision to retrieve the car). The longer the documented gap, the stronger the case.",
    },
  },

  claim: {
    h2: { pre: "What can you ", em: "claim", post: "?" },
    lede:
      "Rental car costs are usually the biggest layer. Lost wages and consequential damages stack on top.",
    layers: [
      {
        tag: "Layer 1",
        title: "Rental car costs",
        body:
          "Daily rental cost from the date completion was promised until the actual return (or until you reasonably could have retrieved the car and gone elsewhere). $50 to $80/day is reasonable; luxury rentals are not recoverable.",
        amount: "$2,200",
      },
      {
        tag: "Layer 2",
        title: "Lost wages and missed appointments",
        body:
          "Wages lost from missed work because of the delay. Missed appointments, missed travel, alternative-transportation costs (Uber, Lyft, parking). Document with timesheets or pay stubs.",
        amount: "+ $800",
        accent: true,
      },
      {
        tag: "Layer 3",
        title: "Filing fees, interest, possibly diminished value",
        body:
          "Filing fee, service-of-process cost, and pre-judgment interest. In extreme cases (months of unauthorized storage), diminished value of the vehicle.",
        amount: "+ $200",
      },
    ],
    total: {
      label: "Sample total within small-claims cap",
      body:
        "45 days of rental at $50/day plus 4 days of lost wages, plus filing fee.",
      amount: "$3,200",
      sublabel: "illustrative · varies by delay length and state",
    },
  },

  demand: {
    h2: { pre: "Send a ", em: "demand letter", post: " first." },
    lede:
      "Demand letters work in delay cases because the shop knows the math: rental costs add up daily and the Bureau of Auto Repair complaint can pull their license. Most settle to stop the bleeding.",
    checklist: [
      "Original estimate with promised completion date (or implied reasonable time)",
      "Timeline of delays with specific dates",
      "Rental car receipts",
      "Lost wages documentation (paystubs, timesheets)",
      "State auto repair statute citation",
      "A 14-day deadline before you file",
      "Sent certified mail to the shop owner",
    ],
    letter: {
      certifiedNum: "7019 0140 0001 4827 3597",
      date: "May 5, 2026",
      recipientName: "Acme Auto Repair",
      recipientAddress: "850 Main Street, San Diego, CA 92101",
      reLine: "Demand for Damages, Excessive Delay on 2020 Honda Civic Repair",
      bodyParagraphs: [
        "On March 14, 2026, your shop estimated 7 to 10 working days for transmission service on my 2020 Honda Civic. The car was finally returned on April 28, 2026 (45 days later). I rented a vehicle from March 24 (when the original promised completion passed) through April 28 (45 days at $50/day = $2,250). I missed 4 days of work to follow up on status updates and retrieve the car ($800 in lost wages).",
        "Pursuant to <strong>California Bus & Prof Code § 9884.9</strong> and the implied warranty of workmanlike service, I demand within <strong>fourteen (14) days</strong>:",
      ],
      demandList: [
        "Reimbursement of <strong>$2,200</strong> in rental car costs;",
        "Reimbursement of <strong>$800</strong> in lost wages from delay-related work absences.",
      ],
      closingLine:
        "Total demand: <strong>$3,000.00</strong>. If unresolved, I will file a complaint with the Bureau of Automotive Repair and file in Small Claims Court.",
      signatory: "Avery Q. Customer",
    },
  },

  fileSteps: {
    h2: { pre: "How to ", em: "file", post: " a delay case." },
    lede:
      "Four steps. The timeline documentation is the spine.",
    steps: [
      {
        title: "Document the timeline",
        body:
          "Save the original estimate with promised completion date. Save text messages or emails about delays. Note dates of every status check. Save rental receipts and pay stubs for missed work.",
      },
      {
        title: "File state Bureau of Auto Repair complaint",
        body:
          "Most state auto repair statutes require shops to keep customers informed and act in good faith. Excessive delay without communication is investigatable. California BAR file at bar.ca.gov.",
      },
      {
        title: "File in small claims",
        body:
          "If the demand and BAR complaint do not resolve within 30 days, file. Filing fees usually run $30 to $100. File in the county where the shop is located.",
      },
      {
        title: "Hearing",
        body:
          "Lead with the timeline: estimated completion date, actual return date, gap. Then the math: rental costs, lost wages, consequential damages. Hearings usually run 10 to 15 minutes.",
      },
    ],
    aftermath: {
      tag: "After you win",
      title: "Collecting from a shop.",
      bodyHtml:
        "Most auto shops are licensed and have business assets. After judgment, the enforcement tools are a <strong>judgment lien</strong> on real estate, a <strong>bank levy</strong>, and a <strong>writ of execution</strong> on tools or accounts receivable.",
    },
  },

  evidence: {
    h2: { pre: "What evidence do you need to ", em: "sue a mechanic", post: "?" },
    lede:
      "Cases like this turn on the timeline. The documented gap between promised and actual completion is decisive.",
    cells: [
      {
        kind: "letter",
        tag: "Original estimate",
        letterhead: "Acme Auto Repair · BAR Reg #ARD-72182",
        date: "March 14, 2026",
        recipientName: "Avery Customer",
        reLine: "Estimate · 2020 Honda Civic transmission service",
        bodyParagraphs: [
          "Scope: drain and refill, replace filter, scan codes, replace solenoid pack if needed.",
          "Estimated cost: $1,200. Estimated completion: 7-10 working days from drop-off (3/14/2026). Expected return: 3/24/2026.",
        ],
        signatory: "Avery Customer",
        signatoryTitle: "Customer signature, 03/14/2026",
      },
      {
        kind: "texts",
        tag: "Delay pattern",
        texts: [
          { dir: "out", text: "Estimate said done by 3/24. It's now 4/4. What's the status?" },
          { dir: "in", text: "Waiting on parts. Maybe early next week." },
          { dir: "out", text: "Same answer for 3 weeks now. Today is 4/15. Where are we?" },
        ],
      },
      {
        kind: "handbook",
        tag: "Reasonable time duty",
        documentTitle: "California Bus & Prof Code · § 9884.9(b)",
        sectionTitle: "Auto repair shop duties",
        bodyParagraphs: [
          "An automotive repair dealer shall not perform any work for compensation upon a motor vehicle without obtaining the customer's prior consent. Where written estimates contain estimated completion dates, the shop shall make commercially reasonable efforts to honor those dates.",
        ],
        highlight:
          "Promised: 7-10 days. Actual: 45 days. No good-faith communication or expedited parts.",
        footer: "Bureau of Automotive Repair enforces this statute",
      },
      {
        kind: "receipt",
        tag: "Rental car costs",
        vendor: "ENTERPRISE RENT-A-CAR",
        vendorAddr: "Mission Valley · San Diego, CA",
        receiptNum: "Rental #4218",
        date: "03/24-04/28/2026",
        lineItems: [
          { label: "45 days at $50/day", amount: "$2,250.00" },
          { label: "Insurance + fees", amount: "$0.00" },
          { label: "(rental began on promised completion date)", amount: "—" },
        ],
        subtotal: "$2,250.00",
        total: "$2,250.00",
        footer: "Returned when shop finally completed repair on 04/28/2026",
      },
    ],
  },

  defenses: {
    h2: { pre: "Common shop ", em: "defenses", post: ", with rebuttals." },
    lede:
      "Three arguments cover most delay cases. The timeline documentation addresses most of them.",
    items: [
      {
        quote: "Parts were back-ordered. Out of our control.",
        pill: "Most common",
        rebuttal:
          "<strong>Rebuttal:</strong> ask for the supplier's purchase orders and shipping records. If the shop did not order parts promptly or did not expedite, the back-order excuse fails. Most state laws require shops to act in good faith and keep customers informed.",
      },
      {
        quote: "We had to wait for additional diagnostic work.",
        pill: "Diagnostic delay",
        rebuttal:
          "<strong>Rebuttal:</strong> diagnostic delay does not excuse failure to communicate. The shop should have updated the estimate, gotten written authorization for the additional time, and offered loaner-vehicle accommodations. None of those happened.",
      },
      {
        quote: "You did not have to rent a car. The car would have been done eventually.",
        pill: "Mitigation",
        rebuttal:
          "<strong>Rebuttal:</strong> mitigation is the customer's duty to minimize damages, not to absorb them. Renting a car was the reasonable response to the delay; not renting would have caused more lost wages from missed work and life. Bring the rental as a reasonable mitigation measure.",
      },
    ],
  },

  outcomes: {
    h2: { pre: "How much do customers ", em: "actually win", post: "?" },
    lede:
      "Typical recovery in delay cases. Documented rental and lost-wage damages drive the outcome.",
    bands: [
      {
        label: "Low",
        range: "$200 to $1,000",
        body:
          "<strong>Partial rental costs.</strong> Court awards partial reimbursement. Common when the shop documented some good-faith communication.",
        tier: "low",
      },
      {
        label: "Mid",
        range: "$1,000 to $3,500",
        body:
          "<strong>Full rental plus partial wages.</strong> Most common when the timeline gap is well documented and the shop's communication was sparse.",
        tier: "mid",
      },
      {
        label: "High",
        range: "$3,500 to $10,000+",
        body:
          "<strong>Full damages plus consequential.</strong> Cases involving multiple months of delay, significant lost wages, or vehicle diminished value push higher.",
        tier: "high",
      },
    ],
  },

  stateSection: null,

  alternatives: {
    h2: { pre: "What are the ", em: "alternatives", post: " to small claims?" },
    lede:
      "Bureau of Auto Repair complaints are unusually effective in delay cases.",
    cards: [
      {
        title: "State Bureau of Auto Repair (or equivalent)",
        pillLabel: "Free, regulatory",
        pillTier: "primary",
        whenItFits:
          "any licensed shop. State auto repair statutes require good-faith communication and reasonable completion times. The Bureau investigates complaints aggressively.",
        tradeoff:
          "agency timelines vary. Run in parallel with the demand letter.",
      },
      {
        title: "Better Business Bureau",
        pillLabel: "Public pressure",
        pillTier: "good",
        whenItFits:
          "the shop wants to maintain a public reputation. BBB complaints become public records and affect the shop's ratings. Many shops settle to remove the complaint.",
        tradeoff:
          "BBB has no enforcement authority. Pure public pressure.",
      },
      {
        title: "Small claims (this guide)",
        pillLabel: "Best for individual recovery",
        pillTier: "warn",
        whenItFits:
          "the demand letter and regulatory complaint did not resolve. Damages within your state's cap.",
        tradeoff:
          "30 to 90 day timeline. Filing fee $30 to $100.",
      },
    ],
  },

  cta: {
    h2: { pre: "Recover the ", em: "rental and wages", post: "." },
    body:
      "Demand letters work fast in delay cases because the math is concrete: every day of delay is another day of rental cost. Pair with a Bureau complaint for maximum pressure. Our generator builds yours in under two minutes.",
    receipt: {
      label: "example · 45-day delay",
      items: [
        { label: "Rental car (45 days at $50)", amount: "$2,200" },
        { label: "Lost wages (4 days)", amount: "+ $800" },
        { label: "Filing fee + interest", amount: "+ $200" },
      ],
      total: "$3,200",
      totalLabel: "Total claim",
      note: "Illustrative. Multi-month delays push higher.",
    },
  },

  faqs: [
    {
      q: "What is a 'reasonable time' for an auto repair?",
      a: "It depends on the work. A simple oil change is hours. A transmission replacement is days. Major engine work is 1 to 2 weeks. The estimated completion date in the written estimate creates the obligation; if not specified, courts use industry-standard timeframes for similar work.",
    },
    {
      q: "Can I retrieve my car if the repair is taking too long?",
      a: "Sometimes. Most states give the shop a mechanic's lien for unpaid charges, meaning they can hold the car until paid. If the work is not done, you can usually retrieve the car by paying for the work-in-progress (parts plus pro-rata labor). Some states require the shop to release the car if it has been there an unreasonable time.",
    },
    {
      q: "How do I prove the delay was unreasonable?",
      a: "Compare the promised completion date (or industry-standard timeframe) with the actual return date. Document communications: every text or email about delays. The longer and less explained the gap, the stronger your case. Photos of the car sitting untouched at the shop also help.",
    },
    {
      q: "What if the shop blamed parts back-orders?",
      a: "Ask for the purchase orders and supplier shipping records. If the shop did not order parts promptly or did not expedite, the back-order excuse fails. Most state laws require shops to act in good faith on parts, including offering refund and release if parts cannot be obtained.",
    },
    {
      q: "Can I claim my time?",
      a: "Generally no. Personal time spent on phone calls and follow-ups is rarely compensable. But documented lost wages from missed work (e.g., to retrieve the car or attend status meetings) are recoverable. Bring pay stubs or timesheets.",
    },
    {
      q: "How long do I have to sue?",
      a: "Breach of contract claims usually run 3 to 6 years. State auto repair statute claims often have shorter windows (1 to 4 years). Move fast.",
    },
    {
      q: "Can I just take the car back without paying?",
      a: "Usually not, because of mechanic's lien rules. Most states give the shop the right to hold the car until paid. Some states cap how long they can hold without progress, but the rules vary. Pay for the work-in-progress under protest, retrieve the car, then sue for damages.",
    },
  ],

  relatedSlugs: [
    "mechanic-bad-work",
    "mechanic-overcharging",
    "lemon-car",
    "dealership-fraud",
    "valet-damage",
    "towing-damage",
  ],
};
