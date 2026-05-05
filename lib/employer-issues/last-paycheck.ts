import type { EmployerIssue } from "./types";

export const lastPaycheck: EmployerIssue = {
  slug: "last-paycheck",
  ready: true,
  short: "Last paycheck withheld",
  breadcrumbLabel: "Last paycheck",

  meta: {
    title: "Can I Sue My Employer for Withholding My Last Paycheck?",
    description:
      "Plain-English guide to recovering a withheld final paycheck. State deadlines, waiting-time penalties of one day's wages per day late, demand-letter template, and how to file in small claims.",
  },

  hero: {
    eyebrowSuffix: "Last paycheck",
    h1: { pre: "Can I sue my employer for ", em: "withholding my last paycheck", post: "?" },
    leadStrong: "Yes, and most states add penalties for every day it is late.",
    leadBody:
      " Most states set a deadline for the final paycheck (immediate, next regular payday, or sometimes faster) and many add 'waiting time' penalties of one day's wages per day late, capped between 10 and 30 days. Accrued PTO is also owed in most states. Final paycheck disputes are some of the cleanest small-claims cases because the math is simple and the deadlines are statutory.",
  },

  counter: {
    amount: 3800,
    meta: "State final-paycheck statute",
    rows: [
      { label: "Final wages owed", value: "$1,400" },
      { label: "Waiting-time penalty (20 days)", value: "+ $2,000", emphasis: "accent" },
      { label: "Filing fee + interest", value: "$400", emphasis: "muted" },
    ],
    footer: "Sample · CA Labor Code § 203 cap",
  },

  whatCounts: {
    h2: { pre: "What counts as a ", em: "withheld final paycheck", post: "?" },
    lede:
      "Four common situations. Each is enough on its own under most state final-paycheck statutes.",
    cards: [
      {
        num: "01",
        title: "Past the state deadline",
        body:
          "Most states require the final paycheck by the next regular payday. Some are faster: California requires it the same day if you were fired, within 72 hours if you quit. Texas allows 6 days. If they missed the deadline, the case is mostly mechanical.",
      },
      {
        num: "02",
        title: "Accrued PTO not paid",
        body:
          "Most states require unused vacation or PTO to be paid out at termination if it accrues like wages. Some states (California, Colorado, Massachusetts) treat it as wages by statute. Sick time payout depends on state.",
      },
      {
        num: "03",
        title: "Improper deductions",
        body:
          "Cash-register shortages, broken equipment, uniform fees, or training costs deducted from your last check are illegal in most states. The deductions are recoverable plus penalties.",
      },
      {
        num: "04",
        title: "Withheld for return of property",
        body:
          "Most states do not let employers hold the final paycheck hostage for a returned laptop or uniform. The wages are owed regardless, and the employer can sue separately for the property if they choose.",
      },
    ],
    note: {
      strongIntro: "The clock starts on the termination date.",
      rest:
        " Most state penalty statutes start running the day after the deadline passes. Document the date you were fired or quit and the date the paycheck was due under your state's law.",
    },
  },

  claim: {
    h2: { pre: "How much can you ", em: "claim", post: "?" },
    lede:
      "The wages are the floor. Waiting-time penalties stack fast in states that have them.",
    layers: [
      {
        tag: "Layer 1",
        title: "The unpaid final wages",
        body:
          "Hours worked but not paid, plus accrued PTO if your state requires payout, plus any owed bonus or commission earned before termination.",
        amount: "$1,400",
      },
      {
        tag: "Layer 2",
        title: "Waiting-time penalty",
        body:
          "California, Massachusetts, and several other states add one day's wages per day late, often capped at 30 days. Texas adds the lesser of 30 days' wages or the unpaid amount. New York adds 100 percent if willful.",
        amount: "+ $2,000",
        accent: true,
      },
      {
        tag: "Layer 3",
        title: "Filing fees, attorney fees, interest",
        body:
          "Most state wage statutes shift attorney fees to the loser. You do not need a lawyer to use small claims, but if you hire one those fees are recoverable.",
        amount: "+ $400",
      },
    ],
    total: {
      label: "Sample total in California (Labor Code § 203)",
      body:
        "$1,400 in unpaid final wages, plus 20 days of waiting-time penalty (capped at 30), plus filing fee and interest.",
      amount: "$3,800",
      sublabel: "illustrative · varies by state and tenure",
    },
  },

  demand: {
    h2: { pre: "Send a ", em: "demand letter", post: " first." },
    lede:
      "Final-paycheck demand letters work fast. Most employers and their counsel know the penalty math and would rather pay than fight a fee-shifting case in court.",
    checklist: [
      "The termination date and the statutory deadline (cite the section)",
      "The exact amount: unpaid wages plus accrued PTO plus penalties to date",
      "The state statute you are relying on (CA Labor Code § 203, NY Labor Law § 191, etc.)",
      "A 14-day deadline before you file",
      "Sent certified mail with return receipt",
    ],
    letter: {
      certifiedNum: "7019 0140 0001 4827 3564",
      date: "May 5, 2026",
      recipientName: "Coastline Cafe LLC",
      recipientAddress: "300 Ocean Boulevard, Long Beach, CA 90802",
      reLine: "Demand for Final Wages and Waiting-Time Penalty, terminated April 14, 2026",
      bodyParagraphs: [
        "I was terminated on April 14, 2026. Pursuant to <strong>California Labor Code § 201</strong>, all final wages were due that same day. The wages remain unpaid.",
        "I demand within <strong>fourteen (14) days</strong>:",
      ],
      demandList: [
        "Payment of <strong>$1,400</strong> in unpaid wages and accrued PTO;",
        "Payment of <strong>$2,000</strong> in waiting-time penalty under <strong>Labor Code § 203</strong> (20 days at $100/day, capped at 30 days).",
      ],
      closingLine:
        "Total demand: <strong>$3,400.00</strong>. The penalty continues to accrue. If unresolved, I will file in Small Claims Court and pursue all available statutory damages and fees.",
      signatory: "Alex Palmer",
    },
  },

  fileSteps: {
    h2: { pre: "How to ", em: "file", post: " a final-paycheck case." },
    lede:
      "Four steps. These are some of the cleanest small-claims cases. The math is statutory.",
    steps: [
      {
        title: "Prepare",
        body:
          "Gather your last paystub, a record of unpaid hours and accrued PTO, your termination email or letter, and your employee handbook (the PTO-payout policy section).",
      },
      {
        title: "File",
        body:
          "File a small-claims complaint in the county where the employer's main office is located, or where you worked. Filing fees usually run $30 to $100. Some states have streamlined wage forms.",
      },
      {
        title: "Serve",
        body:
          "Sheriff, certified mail through the clerk, or a private process server. Serve the employer's registered agent (look it up on the secretary of state website) for the safest delivery.",
      },
      {
        title: "Hearing",
        body:
          "Lead with the dates: termination date, statutory deadline, today's date. Then the math. Hearings usually run 10 to 15 minutes. The statute does most of the legal work.",
      },
    ],
    aftermath: {
      tag: "After you win",
      title: "Collecting on the judgment.",
      bodyHtml:
        "Most employers pay voluntarily within 30 days. After that, the enforcement tools are a <strong>judgment lien</strong> on company real estate, a <strong>bank levy</strong> on a corporate account, and a <strong>writ of execution</strong> on business assets. Pre- and post-judgment interest runs at your state&rsquo;s legal rate.",
    },
  },

  evidence: {
    h2: { pre: "What evidence do you need to ", em: "sue your employer", post: "?" },
    lede:
      "Final-paycheck cases are won on three documents: the termination notice, the last paystub, and the handbook PTO policy.",
    cells: [
      {
        kind: "paystub",
        tag: "Last paystub",
        employer: "COASTLINE CAFE LLC",
        employerAddr: "300 Ocean Blvd · Long Beach, CA",
        payPeriod: "Pay period 04/01 to 04/14/2026",
        payDate: "Final · not yet paid",
        earnings: [
          { label: "Regular hours (56)", amount: "$840.00" },
          { label: "Tips collected", amount: "$240.00" },
          { label: "Accrued PTO (20 hrs)", amount: "$300.00" },
        ],
        deductions: [
          { label: "Federal tax", amount: "—" },
          { label: "FICA", amount: "—" },
        ],
        gross: "$1,380.00",
        net: "Pending",
        footer: "Pay was due same day under CA Labor Code § 201",
      },
      {
        kind: "texts",
        tag: "Asking for the check",
        texts: [
          { dir: "in", text: "Hi, when can I pick up my final paycheck?" },
          { dir: "out", text: "Should be processed in the next pay run, around 4/30." },
          { dir: "in", text: "By statute it was due on my last day. I'll wait until then but the clock is running." },
        ],
      },
      {
        kind: "handbook",
        tag: "PTO policy",
        documentTitle: "Coastline Cafe Employee Handbook · Section 6.4",
        sectionTitle: "Paid Time Off",
        bodyParagraphs: [
          "All full-time employees accrue paid time off at a rate of one hour for every 26 hours worked, capped at 80 hours per year.",
        ],
        highlight:
          "Unused PTO will be paid out at the employee's regular rate upon separation, regardless of cause.",
        footer: "Effective January 2024",
      },
      {
        kind: "letter",
        tag: "Termination email",
        letterhead: "Coastline Cafe · Management",
        date: "April 14, 2026",
        recipientName: "Alex Palmer",
        reLine: "Effective today",
        bodyParagraphs: [
          "Your employment ends today, April 14, 2026. Please leave your apron and keys with the manager on your way out.",
          "Your final pay will be processed in the regular pay cycle.",
        ],
        signatory: "M. Davis",
        signatoryTitle: "Owner",
      },
    ],
  },

  defenses: {
    h2: { pre: "Common employer ", em: "defenses", post: ", with rebuttals." },
    lede:
      "Three arguments cover most final-paycheck disputes. The statute usually wins for you.",
    items: [
      {
        quote: "We pay everyone on the regular cycle. That's our policy.",
        pill: "Most common",
        rebuttal:
          "<strong>Rebuttal:</strong> the company's policy does not override the statute. Most states (California's most strict, but many others as well) require final wages on or near the termination date, not the next regular payday. Cite the statute by section.",
      },
      {
        quote: "We're holding the check until you return company property.",
        pill: "Hostage",
        rebuttal:
          "<strong>Rebuttal:</strong> most states do not let employers withhold a paycheck pending return of property. The wages are owed. The employer can sue separately for the laptop or uniform if they want to, but the paycheck is not a bargaining chip.",
      },
      {
        quote: "PTO doesn't have to be paid out under our handbook.",
        pill: "Use it or lose it",
        rebuttal:
          "<strong>Rebuttal:</strong> some states (California, Colorado, Montana, Nebraska) treat accrued PTO as wages by statute, regardless of company policy. Even in states that allow 'use it or lose it,' the policy has to be in writing and applied consistently. Bring your handbook.",
      },
    ],
  },

  outcomes: {
    h2: { pre: "How much do workers ", em: "actually win", post: "?" },
    lede:
      "Typical recovery ranges. Penalties stack fast in waiting-time states.",
    bands: [
      {
        label: "Low",
        range: "$200 to $1,500",
        body:
          "<strong>Wages only, no penalty.</strong> States without waiting-time penalties, or partial wins where the court finds the deadline was met but PTO was owed.",
        tier: "low",
      },
      {
        label: "Mid",
        range: "$1,500 to $5,000",
        body:
          "<strong>Wages plus partial waiting-time penalty.</strong> Common when the employer paid eventually but missed the deadline by a week or two.",
        tier: "mid",
      },
      {
        label: "High",
        range: "$5,000 to $20,000+",
        body:
          "<strong>Wages plus maxed waiting-time penalty plus fees.</strong> California 30-day cap on a higher hourly rate, or Massachusetts 3x. Cap-of-the-court territory.",
        tier: "high",
      },
    ],
  },

  stateSection: null,

  alternatives: {
    h2: { pre: "What are the ", em: "alternatives", post: " to small claims?" },
    lede:
      "Final-paycheck disputes have several venues. Some are free. Each has tradeoffs.",
    cards: [
      {
        title: "State labor commissioner",
        pillLabel: "Free, fast",
        pillTier: "good",
        whenItFits:
          "your state has a labor agency that handles wage claims (most do). California's Labor Commissioner runs Berman hearings. Texas Workforce Commission handles wage claims free of charge.",
        tradeoff:
          "limited to wage law. Some agencies cannot enforce handbook PTO promises beyond the statutory minimum.",
      },
      {
        title: "Small claims (this guide)",
        pillLabel: "Best for clean penalty cases",
        pillTier: "primary",
        whenItFits:
          "your damages including waiting-time penalties fit your state's cap, and you want a fast judgment with full statutory remedies.",
        tradeoff:
          "30 to 90 day timeline. Filing fee around $50 to $100. Cap usually $5,000 to $20,000.",
      },
      {
        title: "Plaintiff's wage attorney",
        pillLabel: "When the case is bigger",
        pillTier: "warn",
        whenItFits:
          "high hourly rate (waiting-time penalty maxes out big), discrimination overlay, or multiple coworkers with the same issue (class-action territory).",
        tradeoff:
          "longer timeline. Most wage attorneys take strong cases on contingency because of fee-shifting statutes.",
      },
    ],
  },

  cta: {
    h2: { pre: "Recover what's ", em: "owed today", post: "." },
    body:
      "The penalty clock keeps running. A real demand letter cites the statute, lays out the math, and gives a deadline. Our generator builds yours in under two minutes.",
    receipt: {
      label: "example · CA 20 days late",
      items: [
        { label: "Unpaid wages and PTO", amount: "$1,400" },
        { label: "Waiting-time penalty (§ 203)", amount: "+ $2,000" },
        { label: "Filing fee + interest", amount: "+ $400" },
      ],
      total: "$3,800",
      totalLabel: "Total claim",
      note: "Illustrative. Your number depends on hourly rate, state, and days late.",
    },
  },

  faqs: [
    {
      q: "How long does my employer have to give me my final paycheck?",
      a: "It depends on your state and whether you were fired or quit. California: same day if fired, 72 hours if you quit. Texas: 6 days. New York: next regular payday. Most states fall between immediate and next payday. Look up your state's final-paycheck statute.",
    },
    {
      q: "Does my employer have to pay out my unused PTO?",
      a: "In most states, yes. California, Colorado, Massachusetts, Montana, and Nebraska treat accrued vacation or PTO as wages by statute. Other states allow 'use it or lose it' policies if the policy is in writing and applied consistently. Sick time payout depends on state.",
    },
    {
      q: "Can my employer hold my paycheck until I return company property?",
      a: "In most states, no. The paycheck is not a bargaining chip. Wages are owed regardless of returned property. The employer can sue separately for the property if they want to.",
    },
    {
      q: "What is a 'waiting-time penalty' and how is it calculated?",
      a: "Several states (California most prominently) add one day's wages for each day the final paycheck is late, capped between 10 and 30 days. So if you made $200 a day and the check is 20 days late, the penalty is $4,000 on top of the wages owed. Texas takes a different approach (the lesser of 30 days' wages or the unpaid amount).",
    },
    {
      q: "Can my employer make me pay for shortages or broken items from my last check?",
      a: "In most states, no. Cash-register shortages, broken equipment, customer walkouts, uniform fees, and training fees deducted from your wages are illegal. The deduction itself is recoverable, often with penalties on top.",
    },
    {
      q: "How long do I have to sue?",
      a: "Wage claims usually run 2 to 4 years depending on state. California's waiting-time penalty has its own clock (typically 3 years). Move fast: documentation gets harder to assemble over time, and the penalty does not keep growing forever.",
    },
    {
      q: "Will my employer fight back?",
      a: "Some try. Most settle once a real demand letter arrives. Wage statutes shift attorney fees to the loser, which is usually the employer in clean cases. The math pressures early resolution.",
    },
  ],

  relatedSlugs: [
    "unpaid-wages",
    "stolen-tips",
    "wrongful-termination",
    "fired-without-warning",
    "no-w2",
    "retaliation",
  ],
};
