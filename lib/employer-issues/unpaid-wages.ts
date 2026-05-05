import type { EmployerIssue } from "./types";

export const unpaidWages: EmployerIssue = {
  slug: "unpaid-wages",
  ready: true,
  short: "Unpaid wages",
  breadcrumbLabel: "Unpaid wages",

  meta: {
    title: "Can I Sue My Employer for Unpaid Wages? Small Claims Guide",
    description:
      "Plain-English guide to suing for unpaid wages and overtime. Federal and state wage laws, 2x or 3x liquidated damages, demand-letter template, and how to file in small claims.",
  },

  hero: {
    eyebrowSuffix: "Unpaid wages",
    h1: { pre: "Can I sue my employer for ", em: "unpaid wages", post: "?" },
    leadStrong: "Yes. Most state and federal wage laws double or triple what you are owed.",
    leadBody:
      " The federal Fair Labor Standards Act (FLSA) covers most workers and adds liquidated damages equal to 100 percent of the unpaid wages when the violation was willful. Many states layer on top: 2x or 3x in some, plus pre-judgment interest, plus attorney fees that often shift to the loser. Small claims is well-suited because most disputes fit your state's cap (usually $5,000 to $20,000).",
  },

  counter: {
    amount: 4400,
    meta: "FLSA + state wage acts",
    rows: [
      { label: "Unpaid wages", value: "$2,000" },
      { label: "Liquidated damages (2x)", value: "+ $2,000", emphasis: "accent" },
      { label: "Filing fee + interest", value: "$400", emphasis: "muted" },
    ],
    footer: "Sample · willful FLSA violation",
  },

  whatCounts: {
    h2: { pre: "What counts as ", em: "unpaid wages", post: "?" },
    lede:
      "Four common patterns. Any of them is a wage claim under federal law, state law, or both.",
    cards: [
      {
        num: "01",
        title: "Off-the-clock work",
        body:
          "Pre-shift setup, post-shift cleanup, mandatory training, working through unpaid lunch, or answering work emails after hours. If the work was required (or 'suffered or permitted'), the time is compensable.",
      },
      {
        num: "02",
        title: "Unpaid overtime",
        body:
          "Most employees get 1.5x for hours over 40 in a workweek under the FLSA. Some states add daily overtime (over 8 hours in California) or double-time. Misclassifying you as 'salaried exempt' to avoid OT is a separate violation.",
      },
      {
        num: "03",
        title: "Bounced or late paychecks",
        body:
          "Wages have to be paid on the regular payday. Late or bounced paychecks are a wage claim. Many states add daily penalties for each day the wages are late.",
      },
      {
        num: "04",
        title: "Illegal deductions",
        body:
          "Cash-register shortages, broken equipment, customer walkouts, or 'training fees' deducted from your paycheck are illegal in most states. The deduction itself is recoverable plus penalties in many cases.",
      },
    ],
    note: {
      strongIntro: "Three years (sometimes longer).",
      rest:
        " The FLSA looks back 2 years on standard claims, 3 years if willful. State wage statutes often look back 3 to 4 years. Move fast: pay records get harder to reconstruct over time.",
    },
  },

  claim: {
    h2: { pre: "How much can you ", em: "claim", post: "?" },
    lede:
      "Wage claims stack the unpaid amount, the multiplier, and fees. The math is usually clean if you have time records.",
    layers: [
      {
        tag: "Layer 1",
        title: "Unpaid wages and overtime",
        body:
          "Hours worked but not paid, multiplied by your rate. Overtime hours at 1.5x. If you can prove the underlying hours, the math is straightforward.",
        amount: "$2,000",
      },
      {
        tag: "Layer 2",
        title: "Liquidated damages (2x or 3x)",
        body:
          "FLSA adds 100 percent (effectively 2x). Several states add their own multipliers on top: Massachusetts adds 3x. New York adds 100 percent if willful. Read your state's wage act before filing.",
        amount: "+ $2,000",
        accent: true,
      },
      {
        tag: "Layer 3",
        title: "Filing fees, attorney fees, interest",
        body:
          "Most wage statutes shift attorney fees to the loser. You do not need a lawyer to use small claims, but you can recover fees if you do hire one.",
        amount: "+ $400",
      },
    ],
    total: {
      label: "Sample total at FLSA 2x",
      body:
        "$2,000 in unpaid wages with willful violation, plus 100 percent liquidated damages, plus filing fees and pre-judgment interest.",
      amount: "$4,400",
      sublabel: "illustrative · varies by state and willfulness",
    },
  },

  demand: {
    h2: { pre: "Send a ", em: "demand letter", post: " first." },
    lede:
      "Wage demand letters get fast responses. Employers and their counsel know wage statutes shift fees to the loser. Settling at the demand stage avoids a public judgment and the multiplier.",
    checklist: [
      "Hours worked but not paid (with dates)",
      "Your pay rate and the math",
      "The statute you are relying on (FLSA, your state's wage act)",
      "A 14-day deadline before you file",
      "Sent certified mail with return receipt",
    ],
    letter: {
      certifiedNum: "7019 0140 0001 4827 3563",
      date: "May 5, 2026",
      recipientName: "Riverside Diner LLC",
      recipientAddress: "812 Main Street, Riverside, NY 10580",
      reLine: "Demand for Unpaid Wages, March 2026 pay period",
      bodyParagraphs: [
        "Between March 1 and March 31, 2026, I worked 168 regular hours and 16 overtime hours. I was paid for 144 regular hours and 0 overtime hours. The unpaid balance is $1,500 in regular wages and $500 in overtime, for a total of $2,000.",
        "Pursuant to <strong>29 U.S.C. § 216(b)</strong> (FLSA) and New York Labor Law § 663, I demand within <strong>fourteen (14) days</strong>:",
      ],
      demandList: [
        "Payment of <strong>$2,000</strong> in unpaid wages and overtime;",
        "Payment of <strong>$2,000</strong> in liquidated damages for willful violation.",
      ],
      closingLine:
        "Total demand: <strong>$4,000.00</strong>. If unresolved, I will file in Small Claims Court and pursue all available statutory damages and attorney fees.",
      signatory: "Sam Rivera",
    },
  },

  fileSteps: {
    h2: { pre: "How to ", em: "file", post: " a wage case in small claims." },
    lede: "Four steps. Wage cases are some of the cleanest small-claims cases to win.",
    steps: [
      {
        title: "Prepare",
        body:
          "Gather paystubs, time records (or your own log), the schedule, and any text or email confirming hours worked. Calculate unpaid wages and overtime. Federal minimum wage is $7.25 per hour but most states are higher.",
      },
      {
        title: "File",
        body:
          "File a small-claims complaint in the county where the employer's main office is located, or where you worked. Filing fees usually run $30 to $100. Wage cases often have streamlined forms.",
      },
      {
        title: "Serve",
        body:
          "Sheriff, certified mail through the clerk, or a private process server. Serve the employer's registered agent (look it up on the secretary of state website) for the safest delivery.",
      },
      {
        title: "Hearing",
        body:
          "Lead with the math: hours worked, rate, total owed. Show paystubs and your time log side by side. Hearings usually run 10 to 15 minutes. Wage statutes do most of the legal work for you.",
      },
    ],
    aftermath: {
      tag: "After you win",
      title: "Collecting on a wage judgment.",
      bodyHtml:
        "Most employers pay voluntarily within 30 days, especially if they have business licenses to protect. After that, the enforcement tools are a <strong>judgment lien</strong> on company real estate, a <strong>bank levy</strong> on a corporate account, and a <strong>writ of execution</strong> on business assets. Pre- and post-judgment interest runs at your state&rsquo;s legal rate.",
    },
  },

  evidence: {
    h2: { pre: "What evidence do you need to ", em: "sue your employer", post: "?" },
    lede:
      "Wage cases are won on time records and paystubs. The cleaner the math, the faster the hearing.",
    cells: [
      {
        kind: "timeLog",
        tag: "Your time log",
        weekOf: "March 24, 2026",
        rows: [
          { date: "Mon 03/24", in: "8:00", out: "18:30", hours: "10.5" },
          { date: "Tue 03/25", in: "8:00", out: "18:00", hours: "10.0" },
          { date: "Wed 03/26", in: "8:00", out: "17:30", hours: "9.5" },
          { date: "Thu 03/27", in: "8:00", out: "18:00", hours: "10.0" },
          { date: "Fri 03/28", in: "8:00", out: "18:00", hours: "10.0" },
        ],
        totalLabel: "Week total",
        totalHours: "50.0",
        footer: "10 hours of overtime · paid as straight time",
      },
      {
        kind: "texts",
        tag: "Manager texts",
        texts: [
          { dir: "out", text: "Need you to stay til 6 today, we're slammed." },
          { dir: "in", text: "I'm already at 9 hrs. That's overtime, right?" },
          { dir: "out", text: "Just clock out at 5 and finish on the floor." },
        ],
      },
      {
        kind: "document",
        tag: "Schedule",
      },
      {
        kind: "paystub",
        tag: "Paystub vs. hours",
        employer: "RIVERSIDE DINER LLC",
        employerAddr: "812 Main Street · Riverside, NY",
        payPeriod: "Pay period 03/24 to 03/30/2026",
        payDate: "Paid 04/04/2026",
        earnings: [
          { label: "Regular hours (40)", amount: "$700.00" },
          { label: "Overtime (0)", amount: "$0.00" },
        ],
        deductions: [
          { label: "Federal tax", amount: "-$72.00" },
          { label: "FICA", amount: "-$53.55" },
        ],
        gross: "$700.00",
        net: "$574.45",
        footer: "Time log shows 50 hours. Paystub shows 40.",
      },
    ],
  },

  defenses: {
    h2: { pre: "Common employer ", em: "defenses", post: ", with rebuttals." },
    lede:
      "Three arguments cover most wage cases at the hearing. Each has a clean rebuttal if your records are in order.",
    items: [
      {
        quote: "You're a salaried employee. You don't get overtime.",
        pill: "Misclassification",
        rebuttal:
          "<strong>Rebuttal:</strong> being salaried is not the same as being exempt from overtime. The FLSA exempts only specific categories (executive, administrative, professional, outside sales, certain computer roles) and each has a duties test plus a salary threshold. Bring your job duties and the salary test from the Department of Labor website.",
      },
      {
        quote: "You never reported the extra hours, so they aren't owed.",
        pill: "Off-the-clock",
        rebuttal:
          "<strong>Rebuttal:</strong> the FLSA covers work the employer 'suffered or permitted,' meaning the employer knew or should have known. If you have texts or schedule changes asking you to work the extra hours, that is the case. The employer is responsible for accurate timekeeping, not you.",
      },
      {
        quote: "You agreed to comp time instead of overtime.",
        pill: "Comp time",
        rebuttal:
          "<strong>Rebuttal:</strong> private-sector employers cannot substitute comp time for overtime under the FLSA. That swap is legal only for public-sector workers under specific conditions. The agreement is not enforceable.",
      },
    ],
  },

  outcomes: {
    h2: { pre: "How much do workers ", em: "actually win", post: "?" },
    lede:
      "Typical recovery ranges. Wage cases with clean math and willful violations push to the higher band.",
    bands: [
      {
        label: "Low",
        range: "$300 to $1,500",
        body:
          "<strong>Unpaid wages, no multiplier.</strong> The court agrees on the wages but does not find willfulness. Common when the dispute is over a small payroll error.",
        tier: "low",
      },
      {
        label: "Mid",
        range: "$1,500 to $5,000",
        body:
          "<strong>Wages plus 2x liquidated damages.</strong> The most common FLSA outcome when records show clear off-the-clock or unpaid OT.",
        tier: "mid",
      },
      {
        label: "High",
        range: "$5,000 to $20,000+",
        body:
          "<strong>Wages plus state multiplier plus fees.</strong> Massachusetts 3x, NY willful, plus pre-judgment interest. Cap-of-the-court territory.",
        tier: "high",
      },
    ],
  },

  stateSection: null,

  alternatives: {
    h2: { pre: "What are the ", em: "alternatives", post: " to small claims?" },
    lede:
      "Wage claims have multiple venues. Some are free. Each has tradeoffs.",
    cards: [
      {
        title: "U.S. Department of Labor (Wage & Hour Division)",
        pillLabel: "Free, federal",
        pillTier: "good",
        whenItFits:
          "your claim is FLSA-only (unpaid minimum wage or overtime under federal law). DOL investigates at no cost and can collect for you. Especially worth it if multiple coworkers have the same issue.",
        tradeoff:
          "DOL chooses which cases to pursue. You give up control of strategy. If they decline, you can still file your own suit.",
      },
      {
        title: "State labor commissioner",
        pillLabel: "Free, state",
        pillTier: "good",
        whenItFits:
          "your state has a wage and hour agency (most do). California's Labor Commissioner runs Berman hearings. New York's DOL adjudicates wage claims. Free and faster than court.",
        tradeoff:
          "limited remedies. State agencies often cannot award the full statutory multiplier or attorney fees that a court can.",
      },
      {
        title: "Small claims (this guide)",
        pillLabel: "Best for clean cases under the cap",
        pillTier: "primary",
        whenItFits:
          "your damages including liquidated damages fit your state's cap, and you want a fast judgment with full statutory remedies.",
        tradeoff:
          "30 to 90 day timeline. Filing fee around $50 to $100. Cap usually $5,000 to $20,000.",
      },
    ],
  },

  cta: {
    h2: { pre: "Recover what's ", em: "actually owed", post: "." },
    body:
      "Wage demand letters get the fastest responses. Employers know wage laws shift fees to the loser. Our generator builds yours in under two minutes.",
    receipt: {
      label: "example · willful FLSA violation",
      items: [
        { label: "Unpaid wages and OT", amount: "$2,000" },
        { label: "Liquidated damages (2x)", amount: "+ $2,000" },
        { label: "Filing fee + interest", amount: "+ $400" },
      ],
      total: "$4,400",
      totalLabel: "Total claim",
      note: "Illustrative. Your number depends on hours, rate, state, and willfulness finding.",
    },
  },

  faqs: [
    {
      q: "Can I sue my employer for unpaid wages?",
      a: "Yes. The federal FLSA covers most workers and adds 100 percent liquidated damages on willful violations. Most states layer on top with their own wage acts, often adding 2x or 3x and fee-shifting. Small claims is the right court when the total fits your state's cap.",
    },
    {
      q: "How long do I have to sue for unpaid wages?",
      a: "Federal FLSA: 2 years for standard claims, 3 years if willful. State wage acts often look back 3 to 4 years (some longer). The clock runs from the day the wages were due, not when you discovered they were short.",
    },
    {
      q: "Do I get overtime if I'm salaried?",
      a: "Maybe. Salaried is not the same as exempt. The FLSA exempts only specific categories (executive, administrative, professional, outside sales, certain computer roles). Each has a duties test and a salary threshold. If your duties do not match the test, you are entitled to overtime even if you are paid a salary.",
    },
    {
      q: "What if I worked off the clock voluntarily?",
      a: "It does not matter. The FLSA covers work the employer 'suffered or permitted,' meaning the employer knew or should have known. If your manager assigned the work or saw you doing it, the time is compensable.",
    },
    {
      q: "Can my employer make me pay for shortages or broken equipment?",
      a: "In most states, no. Deducting cash-register shortages, broken equipment, customer walkouts, or training fees from your wages is illegal. The deduction itself is recoverable, often with penalties.",
    },
    {
      q: "What if my employer paid me in cash and didn't keep records?",
      a: "You still win. The FLSA puts the recordkeeping burden on the employer. If they did not keep records, the court accepts your reasonable estimate of hours worked. Bring your own log, schedule screenshots, or coworker statements.",
    },
    {
      q: "Will I be retaliated against?",
      a: "Retaliation is itself illegal under the FLSA and most state wage laws. If your employer fires or demotes you for filing a wage claim, that is a separate claim with its own damages. Some states add 2x or 3x penalties for wage retaliation.",
    },
  ],

  relatedSlugs: [
    "last-paycheck",
    "stolen-tips",
    "wrongful-termination",
    "retaliation",
    "fired-without-warning",
    "no-w2",
  ],
};
