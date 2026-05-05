import type { AutoIssue } from "./types";

export const mechanicBadWork: AutoIssue = {
  slug: "mechanic-bad-work",
  ready: true,
  short: "Mechanic bad work",
  breadcrumbLabel: "Mechanic Bad Work",

  meta: {
    title: "Can I Sue a Mechanic for Bad Work? Small Claims Guide",
    description:
      "Plain-English guide to suing a mechanic for defective repairs. State Bureau of Auto Repair complaints, the implied warranty of workmanlike service, second-opinion reports, and a demand-letter template.",
  },

  hero: {
    eyebrowSuffix: "Mechanic bad work",
    h1: { pre: "Can I sue a mechanic for ", em: "bad work", post: "?" },
    leadStrong: "Yes. Implied warranty of workmanlike service applies in every state.",
    leadBody:
      " A mechanic who failed to fix the problem, caused new damage, or used the wrong parts violated the implied warranty of workmanlike service. Most states also have specific auto repair statutes (CA Bureau of Auto Repair, NY DMV regulations) that give consumers extra protections. The state regulator's complaint process is usually free and faster than court. Small claims fits when documented damages are within the cap.",
  },

  counter: {
    amount: 4200,
    meta: "Implied warranty + state auto repair law",
    rows: [
      { label: "Original repair refund", value: "$1,800" },
      { label: "Cost to redo by another shop", value: "+ $2,200", emphasis: "accent" },
      { label: "Filing fee + interest", value: "$200", emphasis: "muted" },
    ],
    footer: "Sample · within most state small-claims caps",
  },

  whatCounts: {
    h2: { pre: "What counts as ", em: "bad mechanic work", post: "?" },
    lede:
      "Four common patterns. Each one is its own claim under state auto repair laws plus implied warranty.",
    cards: [
      {
        num: "01",
        title: "Repair did not fix the problem",
        body:
          "You took the car in for a specific symptom (rough idle, brake squeak, transmission shudder). The mechanic charged you for a repair, but the symptom continued. The mechanic owes the cost back, plus the cost to fix it correctly elsewhere.",
      },
      {
        num: "02",
        title: "Caused new damage",
        body:
          "Mechanic damaged something during repair. Cracked an oil pan during oil change, broke a sensor during diagnostic, scratched the paint, lost or broke a wheel stud. State auto repair laws make the shop responsible for damage during work.",
      },
      {
        num: "03",
        title: "Used wrong or substandard parts",
        body:
          "Used aftermarket parts when OEM was specified, used remanufactured parts presented as new, used wrong-spec fluid (transmission fluid, coolant). Most states require disclosure of part type. Misrepresentation is fraud plus warranty violation.",
      },
      {
        num: "04",
        title: "Did unauthorized work",
        body:
          "Performed work you did not approve. Most state auto repair statutes require written estimate before work; charges over the estimate require additional written authorization (CA Bureau of Auto Repair: anything over 10 percent of estimate). Unauthorized work is recoverable.",
      },
    ],
    note: {
      strongIntro: "Get a paid second-opinion inspection.",
      rest:
        " Take the car to a different ASE-certified mechanic for a paid diagnostic ($100 to $200). Ask for a written report identifying what the original mechanic did, what was wrong with it, and what it costs to fix. The second-opinion report is the spine of your case.",
    },
  },

  claim: {
    h2: { pre: "How much can you ", em: "claim", post: "?" },
    lede:
      "Refund of the bad work is the floor. Cost to redo by a competent shop and consequential damages stack on top.",
    layers: [
      {
        tag: "Layer 1",
        title: "Refund of the original repair",
        body:
          "If the work did not fix the problem, the mechanic owes the original payment back. Quantum meruit may give them a small offset for any work that was useful, but only if they can document it.",
        amount: "$1,800",
      },
      {
        tag: "Layer 2",
        title: "Cost to redo elsewhere",
        body:
          "Quote from a different mechanic to do the repair correctly. Bring two estimates if possible. Judges average them.",
        amount: "+ $2,200",
        accent: true,
      },
      {
        tag: "Layer 3",
        title: "Consequential damages, filing fees, interest",
        body:
          "Rental car while the car was still broken, lost wages from missed work, towing if the car broke down. Filing fee, service-of-process cost, pre-judgment interest.",
        amount: "+ $200",
      },
    ],
    total: {
      label: "Sample total within small-claims cap",
      body:
        "Refund of original $1,800 repair plus $2,200 to redo elsewhere, plus filing fee.",
      amount: "$4,200",
      sublabel: "illustrative · varies by repair complexity",
    },
  },

  demand: {
    h2: { pre: "Send a ", em: "demand letter", post: " first." },
    lede:
      "Demand letters work especially well in mechanic cases because state Bureau of Auto Repair complaints (or equivalent) carry serious license risk. Most shops settle to keep their license clean.",
    checklist: [
      "Date of original repair, what was done, what you paid",
      "Why the work was defective (with photos)",
      "Second-opinion mechanic's report",
      "Quote from a different shop to redo",
      "State auto repair statute citation",
      "A 14-day deadline before you file",
      "Sent certified mail to the shop owner (not just service writer)",
    ],
    letter: {
      certifiedNum: "7019 0140 0001 4827 3595",
      date: "May 5, 2026",
      recipientName: "Acme Auto Repair",
      recipientAddress: "850 Main Street, San Diego, CA 92101",
      reLine: "Demand for Damages, Defective Brake Repair on April 14, 2026",
      bodyParagraphs: [
        "On April 14, 2026, I paid your shop $1,800 for a brake job (rotors, pads, calipers). The brakes continued to squeal and pull to the right after the repair. On April 22, I obtained a second-opinion inspection from Bayview Auto (BAR Reg #ARD-12345). The second-opinion report confirms wrong-spec rotors were installed (cheap aftermarket instead of OE Honda parts as paid for) and the right caliper was not properly bled.",
        "Pursuant to <strong>California Bus & Prof Code § 9884.9</strong> (Bureau of Auto Repair), I demand within <strong>fourteen (14) days</strong>:",
      ],
      demandList: [
        "Refund of <strong>$1,800</strong> for the original defective repair;",
        "Reimbursement of <strong>$2,200</strong> for redo at Bayview Auto (quote attached).",
      ],
      closingLine:
        "Total demand: <strong>$4,000.00</strong>. If unresolved, I will file a complaint with the California Bureau of Automotive Repair and file in Small Claims Court.",
      signatory: "Pat M. Owner",
    },
  },

  fileSteps: {
    h2: { pre: "How to ", em: "file", post: " a mechanic case." },
    lede:
      "Four steps. State Bureau of Auto Repair complaint is unusually effective because of the license risk.",
    steps: [
      {
        title: "Get a second-opinion report",
        body:
          "Different mechanic, paid diagnostic. Written report identifying what was done wrong and what it costs to fix. ASE certification is helpful for credibility. Cost: $100 to $200.",
      },
      {
        title: "File state Bureau of Auto Repair complaint",
        body:
          "California: bar.ca.gov. New York: DMV repair shop complaint. Other states: search 'auto repair complaint' for your state. Boards investigate workmanship and unauthorized-work complaints aggressively. Filing is free.",
      },
      {
        title: "File in small claims",
        body:
          "If the demand and board complaint do not resolve within 60 days, file. Filing fees usually run $30 to $100. File in the county where the shop is located.",
      },
      {
        title: "Hearing",
        body:
          "Lead with the original invoice, the second-opinion report, and the redo quote. Hearings usually run 10 to 15 minutes. The second-opinion report does most of the work.",
      },
    ],
    aftermath: {
      tag: "After you win",
      title: "Collecting from a shop.",
      bodyHtml:
        "Most auto shops carry GL insurance and are licensed. After judgment, the enforcement tools are a <strong>judgment lien</strong> on real estate, a <strong>bank levy</strong>, and a <strong>writ of execution</strong> on tools or accounts receivable. Bureau of Auto Repair complaints can also block license renewal.",
    },
  },

  evidence: {
    h2: { pre: "What evidence do you need to ", em: "sue a mechanic", post: "?" },
    lede:
      "The second-opinion report is the spine. Original invoice plus redo quote complete the math.",
    cells: [
      {
        kind: "letter",
        tag: "Second-opinion report",
        letterhead: "Bayview Auto · BAR Reg #ARD-12345",
        date: "April 22, 2026",
        recipientName: "Pat Owner",
        reLine: "Brake system inspection · 2020 Honda Civic",
        bodyParagraphs: [
          "Inspected April 22, 2026. Findings: aftermarket rotors installed in place of OE Honda specification (per paperwork). Right front caliper not properly bled, causing pull. Pad compound is not Honda OE.",
          "Cost to remove and replace with correct OE parts and proper bleed: $2,200. Estimated 6 hours.",
        ],
        signatory: "K. Tran",
        signatoryTitle: "ASE-certified Master Tech",
      },
      {
        kind: "texts",
        tag: "Symptoms continued",
        texts: [
          { dir: "out", text: "Brakes still squeal after the new pads. Hard to stop in rain." },
          { dir: "in", text: "Probably needs a break-in period. Drive 200 miles." },
          { dir: "out", text: "Drove 400 miles. Same squeal. Pulling right too." },
        ],
      },
      {
        kind: "handbook",
        tag: "Auto repair statute",
        documentTitle: "California Bus & Prof Code · § 9884.9",
        sectionTitle: "Auto repair shop duties",
        bodyParagraphs: [
          "An automotive repair dealer shall give to the customer a written estimated price for parts and labor for a specific job. No work shall be done and no charges shall accrue before authorization to proceed is obtained from the customer.",
        ],
        highlight:
          "Customer paid for OE Honda parts per estimate. Aftermarket parts installed without authorization.",
        footer: "Bureau of Automotive Repair enforces this statute",
      },
      {
        kind: "receipt",
        tag: "Original invoice",
        vendor: "ACME AUTO REPAIR",
        vendorAddr: "BAR Reg #ARD-72182 · San Diego, CA",
        receiptNum: "Invoice #4218",
        date: "04/14/2026",
        lineItems: [
          { label: "OE Honda rotors (front pair)", amount: "$480.00" },
          { label: "OE Honda brake pads", amount: "$220.00" },
          { label: "Caliper service, both sides", amount: "$400.00" },
          { label: "Labor (5 hours)", amount: "$700.00" },
        ],
        subtotal: "$1,800.00",
        total: "$1,800.00",
        footer: "Charged for OE Honda · aftermarket installed",
      },
    ],
  },

  defenses: {
    h2: { pre: "Common mechanic ", em: "defenses", post: ", with rebuttals." },
    lede:
      "Three arguments cover most mechanic cases. The second-opinion report addresses most of them.",
    items: [
      {
        quote: "It is normal break-in. Drive it more.",
        pill: "Most common",
        rebuttal:
          "<strong>Rebuttal:</strong> bring the second-opinion report. Industry standards (manufacturer specs, ASE practice) define what 'normal' looks like. Your second mechanic's report should distinguish normal break-in from defective workmanship.",
      },
      {
        quote: "We installed what was specified. Manufacturer parts come and go.",
        pill: "Parts dispute",
        rebuttal:
          "<strong>Rebuttal:</strong> bring the original invoice charging for OE parts. The second-opinion report identifies what was actually installed. State auto repair statutes (CA § 9884.7) require itemized billing matching parts charged to parts installed. Misrepresenting part type is fraud.",
      },
      {
        quote: "You authorized the work in writing. We followed the estimate.",
        pill: "Authorization",
        rebuttal:
          "<strong>Rebuttal:</strong> the implied warranty of workmanlike service applies regardless of any signed estimate. Authorization to do the work does not authorize doing it badly. Bring the second-opinion report establishing the workmanship defect.",
      },
    ],
  },

  outcomes: {
    h2: { pre: "How much do owners ", em: "actually win", post: "?" },
    lede:
      "Typical recovery in mechanic-bad-work cases. Strength depends on second-opinion report quality.",
    bands: [
      {
        label: "Low",
        range: "$200 to $1,000",
        body:
          "<strong>Partial refund.</strong> Court awards partial refund of bad work. Common when the diagnosis is contested or evidence is light.",
        tier: "low",
      },
      {
        label: "Mid",
        range: "$1,000 to $4,000",
        body:
          "<strong>Refund plus cost to redo.</strong> Most common when documentation is good and the second-opinion report is clear.",
        tier: "mid",
      },
      {
        label: "High",
        range: "$4,000 to $10,000+",
        body:
          "<strong>Major workmanship plus damage.</strong> Bad work that caused new damage (transmission failure, engine damage from wrong fluid). Cases involving significant collateral damage push higher.",
        tier: "high",
      },
    ],
  },

  stateSection: null,

  alternatives: {
    h2: { pre: "What are the ", em: "alternatives", post: " to small claims?" },
    lede:
      "State Bureau of Auto Repair complaints have unusually strong leverage because of license risk.",
    cards: [
      {
        title: "State Bureau of Auto Repair (or equivalent)",
        pillLabel: "Free, regulatory, biggest hammer",
        pillTier: "primary",
        whenItFits:
          "shop is licensed (most are). California's BAR is the most active state regulator. Other states: search 'auto repair shop complaint' on your state DMV or consumer protection site.",
        tradeoff:
          "agency timelines vary, but the threat of a license investigation often produces fast settlement.",
      },
      {
        title: "Shop's GL insurance",
        pillLabel: "When damage was caused",
        pillTier: "good",
        whenItFits:
          "the bad work caused new damage (broken parts, transmission failure from wrong fluid). The shop's GL covers exactly this. File a third-party claim using the certificate of insurance.",
        tradeoff:
          "GL covers damage caused by work, not the cost to redo the work itself. Use this for damage cases, not workmanship-only.",
      },
      {
        title: "Small claims (this guide)",
        pillLabel: "Best for individual recovery",
        pillTier: "warn",
        whenItFits:
          "the demand and BAR complaint did not resolve. Damages within your state's cap.",
        tradeoff:
          "30 to 90 day timeline. Filing fee $30 to $100.",
      },
    ],
  },

  cta: {
    h2: { pre: "Recover the ", em: "cost to redo", post: "." },
    body:
      "Mechanic demand letters work fast when paired with a second-opinion report and a Bureau of Auto Repair complaint. The license risk is real. Our generator builds yours in under two minutes.",
    receipt: {
      label: "example · defective brake repair",
      items: [
        { label: "Refund of original repair", amount: "$1,800" },
        { label: "Cost to redo correctly", amount: "+ $2,200" },
        { label: "Filing fee + interest", amount: "+ $200" },
      ],
      total: "$4,200",
      totalLabel: "Total claim",
      note: "Illustrative. Cases involving consequential damage push higher.",
    },
  },

  faqs: [
    {
      q: "What is the implied warranty of workmanlike service?",
      a: "A common-law rule that any service provider (mechanic, contractor, etc.) must perform work to the standard of a competent member of the trade. Defective work breaks the warranty and lets you recover the cost to redo. The standard is whatever a competent mechanic in the same trade would consider acceptable.",
    },
    {
      q: "What is the Bureau of Automotive Repair?",
      a: "California's regulator of auto repair shops. Investigates complaints, enforces auto repair laws, and can suspend or revoke shop licenses. Other states have similar agencies (NY DMV, FL DACS, TX DLR). Filing a complaint is free and often more effective than a lawsuit because shops do not want to lose their license.",
    },
    {
      q: "Do I need an expert witness or report?",
      a: "Yes, in most cases. A second-opinion report from a different ASE-certified mechanic identifying the defect and quoting the cost to redo is the spine of your case. Many shops do paid second-opinion inspections for $100 to $200. The investment pays off at the hearing.",
    },
    {
      q: "What if the shop says they followed the manufacturer's procedure?",
      a: "Bring the second-opinion report. Sometimes the manufacturer procedure was the right approach but the shop did not follow it correctly. Sometimes the procedure was outdated and a competent mechanic would have used a different one. Either way, the second mechanic's report tells the court what was wrong.",
    },
    {
      q: "Can I refuse to pay if the work is defective?",
      a: "Sometimes, but be careful. Most states allow refusing payment proportionate to the defect, but if you refuse all payment, the shop can place a mechanic's lien on your vehicle (you cannot retrieve it without paying). Many homeowners pay under protest, get the second-opinion report, and sue for refund.",
    },
    {
      q: "How long do I have to sue?",
      a: "Breach of contract and warranty claims usually run 3 to 6 years. State auto repair statute claims often have shorter windows (1 to 4 years). Move fast: pay records and second-opinion observations get harder over time.",
    },
    {
      q: "What if the bad work caused other damage?",
      a: "File against the shop's general liability insurance for the consequential damage (broken transmission from wrong fluid, engine damage from skipped oil change, etc.). The shop's GL covers damage caused by their work. The implied warranty claim for the work itself is separate.",
    },
  ],

  relatedSlugs: [
    "mechanic-overcharging",
    "mechanic-took-too-long",
    "lemon-car",
    "dealership-fraud",
    "valet-damage",
    "towing-damage",
  ],
};
