import type { EmployerIssue } from "./types";

export const firedWithoutWarning: EmployerIssue = {
  slug: "fired-without-warning",
  ready: true,
  short: "Fired without warning",
  breadcrumbLabel: "Fired without warning",

  meta: {
    title: "Can I Sue My Employer for Being Fired Without Warning?",
    description:
      "Plain-English guide to firings without warning. When at-will rules apply, when a handbook or contract creates a warning requirement, and how to file in small claims for unpaid pay or contract breach.",
  },

  hero: {
    eyebrowSuffix: "No warning",
    h1: { pre: "Can I sue my employer for being ", em: "fired without warning", post: "?" },
    leadStrong: "Probably not, unless something specific was promised.",
    leadBody:
      " In 49 states, employment is at-will, which means an employer does not have to give you a warning, a reason, or a chance to fix things. The exception is when your handbook, contract, or company policy promises a warning or a progressive-discipline process. If they promised it and skipped it, that is a contract claim. Small claims fits when the damages are within your state's cap (usually $5,000 to $20,000).",
  },

  counter: {
    amount: 4500,
    meta: "Breach of progressive-discipline policy",
    rows: [
      { label: "Lost wages (3 wks)", value: "$3,000" },
      { label: "Severance per policy", value: "+ $1,500", emphasis: "accent" },
      { label: "Filing fee + interest", value: "$0", emphasis: "muted" },
    ],
    footer: "Sample · contract claim within small-claims cap",
  },

  whatCounts: {
    h2: { pre: "When does ", em: "no warning", post: " become a legal claim?" },
    lede:
      "At-will is the default. To sue, your firing has to fit one of these four narrower situations.",
    cards: [
      {
        num: "01",
        title: "Handbook promised warnings",
        body:
          "Your employee handbook lays out a progressive-discipline policy: verbal warning, written warning, suspension, then termination. In many states, that creates a contract. If they skipped the steps for you, that is a contract breach.",
      },
      {
        num: "02",
        title: "Written contract required cause",
        body:
          "Your offer letter or employment contract said you could only be fired 'for cause' or 'with notice.' Termination without those is a clean contract claim. Read the offer letter carefully. People forget what they signed.",
      },
      {
        num: "03",
        title: "Past practice for everyone else",
        body:
          "If everyone else got progressive discipline before being fired but you did not, that pattern can support an implied-contract or pretext argument. It is harder to prove but worth raising.",
      },
      {
        num: "04",
        title: "Final pay and PTO still owed",
        body:
          "Whether the firing was wrongful or not, your last paycheck and accrued PTO (in most states) are still owed. That is a separate claim from the warning issue and almost always belongs in small claims.",
      },
    ],
    note: {
      strongIntro: "At-will means at-will.",
      rest:
        " A bad reason or no reason is usually still legal, as long as the reason is not illegal (discrimination, retaliation) and there is no contract or handbook promise to break.",
    },
  },

  claim: {
    h2: { pre: "How much can you sue your ", em: "employer", post: " for?" },
    lede:
      "Documented losses win. The clean numbers are the wages and severance you can prove were promised.",
    layers: [
      {
        tag: "Layer 1",
        title: "Lost wages during the policy gap",
        body:
          "If the handbook required a written warning and a 30-day improvement period before termination, your damages are the wages you would have earned during those steps. Show the policy and do the math.",
        amount: "$3,000",
      },
      {
        tag: "Layer 2",
        title: "Severance promised in the handbook or contract",
        body:
          "Severance schedules tied to tenure (one week per year, two weeks per year) are common in handbooks. If you qualified and were not paid, that is a separate contract claim.",
        amount: "+ $1,500",
        accent: true,
      },
      {
        tag: "Layer 3",
        title: "Filing fees and interest",
        body:
          "Small-claims filing fee, service-of-process cost, and pre-judgment interest at your state's legal rate (usually 4 to 10 percent per year).",
        amount: "+ $200",
      },
    ],
    total: {
      label: "Sample total within small-claims cap",
      body:
        "Three weeks of wages the handbook required before termination, plus severance owed under the policy, plus fees.",
      amount: "$4,700",
      sublabel: "illustrative · varies by handbook and state",
    },
  },

  demand: {
    h2: { pre: "Send a ", em: "demand letter", post: " first." },
    lede:
      "A demand letter that quotes your handbook back to the company often gets a response within a week. HR has to take written, statute-citing demands seriously, especially when they include the legal theory and a deadline.",
    checklist: [
      "The handbook section that promised progressive discipline (quote it)",
      "The exact dollar amount: lost wages, severance, accrued PTO",
      "The contract theory you are relying on (handbook as contract, written employment agreement, etc.)",
      "A 14-day deadline before you file",
      "Sent certified mail with return receipt to HR or the registered agent",
    ],
    letter: {
      certifiedNum: "7019 0140 0001 4827 3562",
      date: "May 5, 2026",
      recipientName: "Beacon Retail Inc., HR Department",
      recipientAddress: "200 Commerce Plaza, Atlanta, GA 30303",
      reLine: "Demand for Lost Wages and Severance, employment ended April 14, 2026",
      bodyParagraphs: [
        "I was terminated on April 14, 2026 with no prior warning. The Beacon Retail Employee Handbook (Section 5.2) requires written warning and a 30-day performance-improvement plan before termination. None of those steps were followed. The termination was a breach of the handbook contract.",
        "I demand within <strong>fourteen (14) days</strong>:",
      ],
      demandList: [
        "Payment of <strong>$3,000</strong> for the four weeks of wages I would have earned during the policy steps;",
        "Payment of <strong>$1,500</strong> in severance owed under Section 7.1 of the handbook (one week per year of service).",
      ],
      closingLine:
        "Total demand: <strong>$4,500.00</strong>. If unresolved, I will file in Small Claims Court.",
      signatory: "Casey Morgan",
    },
  },

  fileSteps: {
    h2: { pre: "How to ", em: "file", post: " a small-claims case." },
    lede:
      "Four steps. Most plaintiffs file and represent themselves. The handbook is your central exhibit.",
    steps: [
      {
        title: "Prepare",
        body:
          "Gather your offer letter, employment contract, employee handbook, last three paystubs, termination email or letter, performance reviews, and any text or email about the firing.",
      },
      {
        title: "File",
        body:
          "File a small-claims complaint in the county where the employer's main office is located, or where you worked. Filing fees usually run $30 to $100. Form names vary (SC-100 in California, JC-201 in Indiana).",
      },
      {
        title: "Serve",
        body:
          "Sheriff, certified mail through the clerk, or a private process server. You cannot serve it yourself. Look up the employer's registered agent on the secretary of state website.",
      },
      {
        title: "Hearing",
        body:
          "Lead with the handbook section. Show the policy, then the timeline of your firing. The contrast does most of the work. Hearings usually run 10 to 15 minutes.",
      },
    ],
    aftermath: {
      tag: "After you win",
      title: "Collecting from an employer.",
      bodyHtml:
        "Most employers pay voluntarily within 30 days. After that, the enforcement tools are a <strong>judgment lien</strong> on company real estate, a <strong>bank levy</strong> on a corporate account if you can identify it, and a <strong>writ of execution</strong> on business assets. Pre- and post-judgment interest runs at your state&rsquo;s legal rate.",
    },
  },

  evidence: {
    h2: { pre: "What evidence do you need to ", em: "sue your employer", post: "?" },
    lede:
      "Cases like this turn on the handbook plus the timeline. Bring originals plus copies for the judge and the employer.",
    photos: [],
    texts: [],
    receipt: {
      vendor: "", vendorAddr: "", receiptNum: "", date: "",
      lineItems: [], subtotal: "", total: "", footer: "",
    },
    cells: [
      {
        kind: "handbook",
        tag: "Handbook policy",
        documentTitle: "Beacon Retail Employee Handbook · Section 5.2",
        sectionTitle: "Progressive Discipline",
        bodyParagraphs: [
          "Performance issues are addressed in stages. The standard sequence is verbal warning, written warning, performance-improvement plan (30 days), and only then termination.",
        ],
        highlight:
          "An employee will not be terminated for performance reasons without first completing the steps above.",
        footer: "Effective January 2024",
      },
      {
        kind: "texts",
        tag: "Manager thread",
        texts: [
          { dir: "out", text: "Casey, can you stay late today? HR wants to talk." },
          { dir: "in", text: "What about? Did I do something?" },
          { dir: "out", text: "I'll explain when you get there." },
        ],
      },
      {
        kind: "document",
        tag: "Offer letter",
      },
      {
        kind: "letter",
        tag: "Termination email",
        letterhead: "Beacon Retail · HR",
        date: "April 14, 2026",
        recipientName: "Casey Morgan",
        reLine: "Effective immediately",
        bodyParagraphs: [
          "Your employment with Beacon Retail is terminated effective today. Final pay will be deposited per the standard schedule.",
          "Please return your badge and laptop. We wish you well.",
        ],
        signatory: "T. Howard",
        signatoryTitle: "HR Manager",
      },
    ],
  },

  defenses: {
    h2: { pre: "Common employer ", em: "defenses", post: ", with rebuttals." },
    lede:
      "Three arguments cover most of what employers say. Each has a clean rebuttal if your handbook is in your hand.",
    items: [
      {
        quote: "The handbook is a guide, not a contract. We can change it any time.",
        pill: "Most common",
        rebuttal:
          "<strong>Rebuttal:</strong> in many states, employee handbooks create implied contracts when they describe specific procedures and the employee is told to follow them. Bring the page that promised progressive discipline. If the handbook lacks an at-will disclaimer or a unilateral-modification clause, the contract argument is even stronger.",
      },
      {
        quote: "We had to act fast for business reasons.",
        pill: "Pretext",
        rebuttal:
          "<strong>Rebuttal:</strong> the policy did not carve out exceptions for business reasons. If they had time to plan a termination meeting, they had time to follow their own steps. Show the timeline.",
      },
      {
        quote: "You signed an offer letter that said 'at-will employment.'",
        pill: "At-will",
        rebuttal:
          "<strong>Rebuttal:</strong> an at-will clause does not override a separate handbook contract about how termination happens. The two coexist. Many courts find handbook procedures enforceable even when an at-will clause appears in the offer letter.",
      },
    ],
  },

  outcomes: {
    h2: { pre: "How much do workers ", em: "actually win", post: "?" },
    lede:
      "Typical recovery ranges. Strength depends on how clearly the handbook promised the steps the employer skipped.",
    bands: [
      {
        label: "Low",
        range: "$300 to $1,500",
        body:
          "<strong>Final-pay-only judgments.</strong> The court does not buy the contract argument but agrees the last paycheck or accrued PTO was owed.",
        tier: "low",
      },
      {
        label: "Mid",
        range: "$1,500 to $5,000",
        body:
          "<strong>Wages plus accrued PTO.</strong> The court finds a partial contract claim. Common when the handbook policy was clear but the at-will clause hurts.",
        tier: "mid",
      },
      {
        label: "High",
        range: "$5,000 to $20,000+",
        body:
          "<strong>Full contract damages.</strong> The handbook policy was clear, the at-will clause was missing, and the court treats it as a contract. Cap-of-the-court territory.",
        tier: "high",
      },
    ],
  },

  stateSection: null,

  alternatives: {
    h2: { pre: "What are the ", em: "alternatives", post: " to small claims?" },
    lede:
      "Small claims is usually the right tool when contract damages are bounded. Two other paths cover the rest.",
    cards: [
      {
        title: "State labor commissioner",
        pillLabel: "Free",
        pillTier: "good",
        whenItFits:
          "your dispute is mainly about an unpaid final paycheck or accrued PTO. State labor agencies investigate at no cost. They cannot enforce contract terms beyond wage law, but they handle the wage piece quickly.",
        tradeoff:
          "limited remedies. The agency cannot order severance under a handbook. For that, you need a court.",
      },
      {
        title: "Small claims (this guide)",
        pillLabel: "Best for clean contract claims",
        pillTier: "primary",
        whenItFits:
          "the handbook or contract clearly promised a process, and your damages (lost wages, severance, accrued PTO) fit your state's cap.",
        tradeoff:
          "30 to 90 day timeline. Filing fee around $50 to $100. Cap usually $5,000 to $20,000.",
      },
      {
        title: "Plaintiff's employment attorney",
        pillLabel: "Damages over $20,000",
        pillTier: "warn",
        whenItFits:
          "lost wages or promised severance exceed your small-claims cap, the firing involved discrimination, or there is evidence of company-wide pattern.",
        tradeoff:
          "longer timeline. Most employment attorneys take strong cases on contingency (33 to 40 percent of recovery). No upfront fees in those cases.",
      },
    ],
  },

  cta: {
    h2: { pre: "Recover what's ", em: "actually owed", post: "." },
    body:
      "Many cases like this settle once the demand letter quotes the handbook back at HR. Real demand letters cite the policy, lay out the dollar math, and give a deadline. Our generator builds yours in under two minutes.",
    receipt: {
      label: "example · handbook breach",
      items: [
        { label: "Lost wages (handbook gap)", amount: "$3,000" },
        { label: "Severance per policy", amount: "+ $1,500" },
        { label: "Filing fee + interest", amount: "+ $200" },
      ],
      total: "$4,700",
      totalLabel: "Total claim",
      note: "Illustrative. Your number depends on your handbook, contract, and tenure.",
    },
  },

  faqs: [
    {
      q: "Does my employer have to give me a warning before firing me?",
      a: "Usually no. In an at-will state (49 of 50), no warning is legally required. The exception is when your handbook, contract, or company policy promises a warning or a progressive-discipline process. If they promised it and skipped it, that is a contract claim.",
    },
    {
      q: "Is an employee handbook a contract?",
      a: "Sometimes. In many states, a handbook creates an implied contract when it describes specific procedures and you were told to follow them. The exception is when the handbook has a clear at-will disclaimer and a unilateral-modification clause. Read the first and last pages of yours.",
    },
    {
      q: "Can I sue if I was fired during my probation period?",
      a: "Usually not just for being fired. Probation is not a special legal status in most states. The same exceptions to at-will apply: discrimination, retaliation, public policy, contract breach. If your handbook promised a different process for probationary employees and they skipped it, that is a contract claim.",
    },
    {
      q: "What if my offer letter said 'at-will'?",
      a: "An at-will clause does not always override separate handbook procedures. Courts in many states treat handbook policies as enforceable contracts even when offer letters use at-will language. Bring both documents to the hearing.",
    },
    {
      q: "Is my final paycheck owed even if the firing was legal?",
      a: "Yes. Final pay and accrued PTO (in most states) are owed regardless of why you were fired. That is a separate claim. Most states set a deadline for the final paycheck (next regular payday or sooner) and many add penalties for missing it.",
    },
    {
      q: "How long do I have to sue?",
      a: "Breach of contract claims usually run 3 to 6 years in most states. Wage claims often run 2 to 4 years. Move fast either way: evidence and witness memories fade.",
    },
    {
      q: "Do I need a lawyer?",
      a: "Not for small claims. Most plaintiffs file and represent themselves. Lawyers are not allowed at the initial hearing in some states (California, for example).",
    },
  ],

  relatedSlugs: [
    "wrongful-termination",
    "last-paycheck",
    "unpaid-wages",
    "retaliation",
    "emotional-distress",
    "hostile-work-environment",
  ],
};
