import type { EmployerIssue } from "./types";

export const unsafeWorkingConditions: EmployerIssue = {
  slug: "unsafe-working-conditions",
  ready: true,
  short: "Unsafe working conditions",
  breadcrumbLabel: "Unsafe working conditions",

  meta: {
    title: "Can I Sue My Employer for Unsafe Working Conditions?",
    description:
      "Plain-English guide to unsafe-conditions claims. Why workers' comp covers most injuries but not retaliation, when small claims is the right court, and what OSHA does first.",
  },

  hero: {
    eyebrowSuffix: "Unsafe conditions",
    h1: { pre: "Can I sue my employer for ", em: "unsafe working conditions", post: "?" },
    leadStrong: "Sometimes. Workers' comp covers most injuries. Retaliation is its own case.",
    leadBody:
      " Workers' compensation is the exclusive remedy for most workplace injuries in most states, which means you usually cannot sue your employer for the injury itself. But you can sue for retaliation if they fire, demote, or punish you for reporting unsafe conditions to OSHA. You can also sue for unpaid wages or contract damages tied to refusing dangerous work. Small claims fits when those secondary damages are within your state's cap.",
  },

  counter: {
    amount: 5500,
    meta: "OSHA whistleblower · 29 U.S.C. § 660(c)",
    rows: [
      { label: "Lost wages (5 wks)", value: "$3,500" },
      { label: "Unreimbursed PPE & medical", value: "+ $1,500", emphasis: "accent" },
      { label: "Filing fee + interest", value: "$500", emphasis: "muted" },
    ],
    footer: "Sample · OSHA-report retaliation",
  },

  whatCounts: {
    h2: { pre: "When is unsafe conditions ", em: "actually a small-claims case", post: "?" },
    lede:
      "Four scenarios where the courthouse, not workers' comp, is the right venue.",
    cards: [
      {
        num: "01",
        title: "Retaliation for reporting to OSHA",
        body:
          "Federal law (29 U.S.C. § 660(c)) makes it illegal to fire, demote, or punish workers for reporting safety violations. State whistleblower laws often layer on top. The OSHA retaliation case is separate from any workers' comp claim for the underlying injury.",
      },
      {
        num: "02",
        title: "Refusal to work in imminent danger",
        body:
          "Federal regulations (29 CFR § 1977.12) protect refusing to work when there is a real and imminent threat of serious injury and no time to fix it through normal OSHA channels. If you were fired for refusing, that is a retaliation claim.",
      },
      {
        num: "03",
        title: "Out-of-pocket safety costs",
        body:
          "PPE the employer was required to provide but you bought yourself. Medical bills not covered by workers' comp. Wages lost to mandatory training the employer skipped. These are contract or statutory damages, not workers' comp issues.",
      },
      {
        num: "04",
        title: "Intentional or third-party conduct",
        body:
          "Workers' comp generally bars suits against the employer for negligence, but intentional acts (assault by a manager, deliberately dangerous setups) and suits against third-party contractors (the equipment manufacturer, a separate company on site) often go directly to civil court.",
      },
    ],
    note: {
      strongIntro: "Workers' comp is the default for injuries.",
      rest:
        " If you were hurt at work, file a workers' comp claim first. The exclusive-remedy rule blocks most direct lawsuits against the employer for the injury itself. Small claims is for the side cases (retaliation, unpaid PPE, lost wages) that workers' comp does not cover.",
    },
  },

  claim: {
    h2: { pre: "What can you ", em: "claim", post: "?" },
    lede:
      "Lost wages from retaliation are usually the biggest layer. Out-of-pocket safety costs add up.",
    layers: [
      {
        tag: "Layer 1",
        title: "Lost wages from retaliatory action",
        body:
          "From the day you were fired, demoted, or had your hours cut after reporting unsafe conditions, until you found new work or could reasonably have found work. This is the heart of an OSHA whistleblower case.",
        amount: "$3,500",
      },
      {
        tag: "Layer 2",
        title: "Unreimbursed PPE and medical costs",
        body:
          "Personal protective equipment your employer was required to provide. Medical bills outside the workers' comp coverage (initial doctor visits before claim approved, mileage to appointments). Bring receipts.",
        amount: "+ $1,500",
        accent: true,
      },
      {
        tag: "Layer 3",
        title: "Filing fees, attorney fees, interest",
        body:
          "OSHA whistleblower statutes shift attorney fees to the loser. State public-policy claims often do too. You do not need a lawyer to use small claims, but the fee-shifting helps if you hire one.",
        amount: "+ $500",
      },
    ],
    total: {
      label: "Sample total within small-claims cap",
      body:
        "Five weeks of lost wages from retaliatory termination, plus PPE and medical out-of-pocket, plus filing fees and pre-judgment interest.",
      amount: "$5,500",
      sublabel: "illustrative · varies by state and tenure",
    },
  },

  demand: {
    h2: { pre: "Send a ", em: "demand letter", post: " first." },
    lede:
      "OSHA-retaliation demand letters carry weight because they invite federal attention. The letter signals you understand the statute and are willing to file. Most employers settle to keep the issue out of OSHA's audit pipeline.",
    checklist: [
      "The unsafe condition you reported (with date)",
      "How and to whom you reported it",
      "The adverse action and date",
      "The gap between report and action",
      "The statute (OSHA § 11(c) / 29 U.S.C. § 660(c)) and any state whistleblower law",
      "A 14-day deadline before you file",
      "Sent certified mail with return receipt",
    ],
    letter: {
      certifiedNum: "7019 0140 0001 4827 3568",
      date: "May 5, 2026",
      recipientName: "Northridge Construction Inc.",
      recipientAddress: "5500 Industrial Park Way, Reno, NV 89512",
      reLine: "Demand for Lost Wages, Retaliation for Safety Report on March 28, 2026",
      bodyParagraphs: [
        "On March 28, 2026, I reported to OSHA (Region 9) that scaffolding on the Sparks job site was missing toe boards and guardrails. On April 18, 2026 (21 days later), I was terminated. The stated reason was 'reduction in force,' but no other carpenter was let go. The proximity establishes a prima facie case of retaliation under <strong>29 U.S.C. § 660(c)</strong>.",
        "I demand within <strong>fourteen (14) days</strong>:",
      ],
      demandList: [
        "Payment of <strong>$3,500</strong> in lost wages from April 18 through May 23, 2026;",
        "Reimbursement of <strong>$1,500</strong> in unreimbursed safety equipment and medical costs.",
      ],
      closingLine:
        "Total demand: <strong>$5,000.00</strong>. If unresolved, I will file in Small Claims Court and pursue all available statutory damages and reinstatement remedies.",
      signatory: "Sam Tate",
    },
  },

  fileSteps: {
    h2: { pre: "How to ", em: "file", post: " a small-claims case." },
    lede:
      "Four steps. OSHA filing happens in parallel and is usually free. Both can run at the same time.",
    steps: [
      {
        title: "File with OSHA first (30-day deadline)",
        body:
          "OSHA whistleblower complaints have a 30-day filing window. Submit at osha.gov/whistleblower or call your regional OSHA office. The OSHA process is separate from small claims and can run simultaneously.",
      },
      {
        title: "Prepare for small claims",
        body:
          "Gather the OSHA complaint, your termination notice, paystubs showing the lost wages, PPE receipts, medical bills not covered by workers' comp, and any text or comment referencing your safety report.",
      },
      {
        title: "File and serve",
        body:
          "File in the county where the employer's main office is located, or where you worked. Serve the registered agent. Filing fees usually run $30 to $100.",
      },
      {
        title: "Hearing",
        body:
          "Lead with the timeline: safety report on date X, termination on date Y, gap of N days. Show the OSHA complaint and the termination email. The dates do most of the work. Hearings usually run 10 to 15 minutes.",
      },
    ],
    aftermath: {
      tag: "After you win",
      title: "Collecting on the judgment.",
      bodyHtml:
        "Most employers pay voluntarily within 30 days, especially since safety-retaliation cases attract OSHA audit attention. After that, the enforcement tools are a <strong>judgment lien</strong> on company real estate, a <strong>bank levy</strong> on a corporate account, and a <strong>writ of execution</strong> on business assets. Pre- and post-judgment interest runs at your state&rsquo;s legal rate.",
    },
  },

  evidence: {
    h2: { pre: "What evidence do you need to ", em: "sue your employer", post: "?" },
    lede:
      "Cases like this are won on the timeline plus the underlying safety record. The clearer the dates, the stronger the case.",
    photos: [],
    texts: [],
    receipt: {
      vendor: "", vendorAddr: "", receiptNum: "", date: "",
      lineItems: [], subtotal: "", total: "", footer: "",
    },
    cells: [
      {
        kind: "photos",
        tag: "Hazard photos",
        photos: [
          { id: "1581094271901-8022df4466f9", cap: "Scaffolding without rails" },
          { id: "1581092335397-9583eb92d232", cap: "Worksite layout" },
          { id: "1581092788270-3ee0b2d1f0c0", cap: "Power tools without guards" },
          { id: "1567427018141-0584cfcbf1b8", cap: "PPE missing" },
        ],
      },
      {
        kind: "letter",
        tag: "OSHA complaint",
        letterhead: "OSHA Whistleblower Complaint",
        date: "March 28, 2026",
        recipientName: "OSHA · Region 9",
        reLine: "Sparks job site scaffold and guardrail violations",
        bodyParagraphs: [
          "Reporting that scaffolding at the Sparks NV job site has no toe boards and incomplete guardrails. Two near-falls in the past two weeks.",
          "Filed under § 11(c). Please confirm receipt.",
        ],
        signatory: "Sam Tate",
        signatoryTitle: "Carpenter, Local 1234",
      },
      {
        kind: "texts",
        tag: "Foreman comment",
        texts: [
          { dir: "out", text: "Heard you went to OSHA. Real classy." },
          { dir: "in", text: "I asked you twice in writing. Nothing changed." },
          { dir: "out", text: "We'll see how the next layoff list looks." },
        ],
      },
      {
        kind: "receipt",
        tag: "PPE receipts",
        vendor: "BUILDERS SAFETY SUPPLY",
        vendorAddr: "12 Main St · Reno, NV",
        receiptNum: "Receipt #2210",
        date: "02/15/2026",
        lineItems: [
          { label: "Hard hat (Class E)", amount: "$48.00" },
          { label: "Steel-toe boots", amount: "$185.00" },
          { label: "Cut-resistant gloves", amount: "$32.00" },
          { label: "Respirator + cartridges", amount: "$95.00" },
        ],
        subtotal: "$360.00",
        total: "$360.00",
        footer: "PPE the employer was required to provide",
      },
    ],
  },

  defenses: {
    h2: { pre: "Common employer ", em: "defenses", post: ", with rebuttals." },
    lede:
      "Three arguments cover most safety-retaliation cases. Each has a clean rebuttal if the timeline is documented.",
    items: [
      {
        quote: "Workers' comp is your only remedy.",
        pill: "Most common",
        rebuttal:
          "<strong>Rebuttal:</strong> workers' comp covers injury claims, not retaliation. Retaliation for reporting safety violations is a separate claim under federal OSHA and state whistleblower law. The exclusive-remedy rule does not apply to retaliation.",
      },
      {
        quote: "We had a legitimate business reason for the termination.",
        pill: "Pretext",
        rebuttal:
          "<strong>Rebuttal:</strong> bring the OSHA filing date and the termination date side by side. Then ask for the documentation that supposedly preceded the safety report (performance reviews, written warnings dated before the report). If they cannot produce dated proof, the 'legitimate reason' defense is pretext.",
      },
      {
        quote: "The conditions weren't actually unsafe. You overreacted.",
        pill: "Reasonable belief",
        rebuttal:
          "<strong>Rebuttal:</strong> OSHA's anti-retaliation provision protects reasonable belief, not proven correctness. As long as you had a reasonable basis for believing the condition was unsafe (which you did, since OSHA opened a file on it), the report is protected.",
      },
    ],
  },

  outcomes: {
    h2: { pre: "How much do workers ", em: "actually win", post: "?" },
    lede:
      "Typical recovery in small-claims unsafe-conditions retaliation cases. OSHA proceedings can run separately and add their own remedies.",
    bands: [
      {
        label: "Low",
        range: "$300 to $1,500",
        body:
          "<strong>Out-of-pocket only.</strong> The court awards documented PPE and medical costs but does not find retaliation. Common when the timing was longer than 60 days.",
        tier: "low",
      },
      {
        label: "Mid",
        range: "$1,500 to $5,000",
        body:
          "<strong>Lost wages plus out-of-pocket.</strong> The most common retaliation outcome with clean timing (under 30 days between report and adverse action).",
        tier: "mid",
      },
      {
        label: "High",
        range: "$5,000 to $20,000+",
        body:
          "<strong>Lost wages plus statutory penalties plus fees.</strong> Strong OSHA whistleblower cases plus state public-policy multipliers. Cap-of-the-court territory.",
        tier: "high",
      },
    ],
  },

  stateSection: null,

  alternatives: {
    h2: { pre: "What are the ", em: "alternatives", post: " to small claims?" },
    lede:
      "Unsafe-conditions cases have several venues. OSHA does the heavy lifting on the underlying violation; small claims handles your direct damages.",
    cards: [
      {
        title: "OSHA whistleblower complaint",
        pillLabel: "Free, federal · 30-day deadline",
        pillTier: "primary",
        whenItFits:
          "you were retaliated against for reporting safety issues. File at osha.gov/whistleblower within 30 days of the adverse action. OSHA investigates at no cost and can order reinstatement plus back pay.",
        tradeoff:
          "deadline is short and rigid. OSHA chooses which cases to prosecute. If they decline, you can still sue.",
      },
      {
        title: "Workers' compensation",
        pillLabel: "Required for injuries",
        pillTier: "warn",
        whenItFits:
          "you were physically injured by unsafe conditions. Workers' comp is the exclusive remedy for the injury itself in most states. File the claim regardless of any small-claims case.",
        tradeoff:
          "limited damages: medical bills and partial lost wages. Pain and suffering is generally not covered.",
      },
      {
        title: "Small claims (this guide)",
        pillLabel: "Best for documented damages",
        pillTier: "primary",
        whenItFits:
          "you have lost wages from retaliatory action, unreimbursed PPE costs, or medical bills outside workers' comp coverage, and the total fits your state's cap.",
        tradeoff:
          "30 to 90 day timeline. Filing fee around $50 to $100. Cap usually $5,000 to $20,000.",
      },
    ],
  },

  cta: {
    h2: { pre: "Recover what's ", em: "actually owed", post: "." },
    body:
      "Safety-retaliation demand letters carry extra weight because they invite OSHA audit attention. A real demand letter cites the statute, lays out the dollar math, and gives a deadline. Our generator builds yours in under two minutes.",
    receipt: {
      label: "example · OSHA-report retaliation",
      items: [
        { label: "Lost wages (5 weeks)", amount: "$3,500" },
        { label: "PPE & medical out-of-pocket", amount: "+ $1,500" },
        { label: "Filing fee + interest", amount: "+ $500" },
      ],
      total: "$5,500",
      totalLabel: "Total claim",
      note: "Illustrative. Your number depends on the protected activity, gap to adverse action, and tenure.",
    },
  },

  faqs: [
    {
      q: "Can I sue my employer for unsafe working conditions?",
      a: "Usually not for the conditions themselves: workers' comp is the exclusive remedy for most workplace injuries. But you can sue for retaliation if your employer punished you for reporting unsafe conditions to OSHA. Out-of-pocket PPE and medical costs not covered by workers' comp are also recoverable.",
    },
    {
      q: "What is OSHA whistleblower protection?",
      a: "Federal law (29 U.S.C. § 660(c)) makes it illegal for employers to fire, demote, or punish workers for reporting safety violations or refusing to work in imminent danger. The protection covers complaints to OSHA, internal complaints to management, and refusals to perform clearly dangerous work.",
    },
    {
      q: "How long do I have to file an OSHA whistleblower complaint?",
      a: "30 days from the adverse action. The deadline is short and rigid. File at osha.gov/whistleblower or call your regional OSHA office. State whistleblower laws often have longer deadlines (1 to 3 years), but the federal OSHA window is short.",
    },
    {
      q: "Can I refuse to work in dangerous conditions?",
      a: "Yes, in narrow circumstances. Federal regulations (29 CFR § 1977.12) allow refusal when there is a real and imminent threat of serious injury, no time to fix it through normal OSHA channels, and you tried to ask the employer to fix it first. The protection does not cover everyday discomfort or minor risk.",
    },
    {
      q: "What if my employer makes me buy my own PPE?",
      a: "Most PPE the employer requires is the employer's responsibility under OSHA. There are limited exceptions (steel-toe boots in some industries, prescription safety glasses). If the employer required PPE that should have been provided, the cost is recoverable plus a possible OSHA citation.",
    },
    {
      q: "Will I get my job back if I win?",
      a: "Possibly. OSHA whistleblower remedies include reinstatement and back pay. Small claims awards money, not your job. If reinstatement is your priority, file with OSHA first; the agency can order it. Court small-claims judgments typically convert to a money award only.",
    },
    {
      q: "How long do I have to sue?",
      a: "OSHA whistleblower: 30 days. State public-policy retaliation: usually 2 to 3 years. State whistleblower acts: varies, often 90 days to 2 years. Move fast, especially for the OSHA window.",
    },
  ],

  relatedSlugs: [
    "retaliation",
    "wrongful-termination",
    "unpaid-wages",
    "fired-without-warning",
    "hostile-work-environment",
    "emotional-distress",
  ],
};
