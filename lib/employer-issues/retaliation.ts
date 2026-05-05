import type { EmployerIssue } from "./types";

export const retaliation: EmployerIssue = {
  slug: "retaliation",
  ready: true,
  short: "Retaliation",
  breadcrumbLabel: "Retaliation",

  meta: {
    title: "Can I Sue My Employer for Retaliation? Small Claims Guide",
    description:
      "Plain-English guide to suing for workplace retaliation. The three things you have to prove, when small claims is the right court, and a demand-letter template that gets HR's attention.",
  },

  hero: {
    eyebrowSuffix: "Retaliation",
    h1: { pre: "Can I sue my employer for ", em: "retaliation", post: "?" },
    leadStrong: "Yes, when you can show three things in order.",
    leadBody:
      " Retaliation cases require: (1) you did something the law protects, (2) the employer took an adverse action, and (3) the timing or pattern shows the action was because of the protected activity. Workers' comp claims, harassment reports, FMLA leave, OSHA complaints, and whistleblowing all count. Small claims fits when the lost wages and damages are within your state's cap (usually $5,000 to $20,000).",
  },

  counter: {
    amount: 6500,
    meta: "FLSA, OSHA, state whistleblower acts",
    rows: [
      { label: "Lost wages (6 wks)", value: "$4,500" },
      { label: "Demoted-pay difference", value: "+ $1,500", emphasis: "accent" },
      { label: "Filing fee + interest", value: "$500", emphasis: "muted" },
    ],
    footer: "Sample · post-OSHA-report retaliation",
  },

  whatCounts: {
    h2: { pre: "What counts as ", em: "retaliation", post: "?" },
    lede:
      "Three elements have to line up. The clearer the timing, the stronger the case.",
    cards: [
      {
        num: "01",
        title: "You did something protected",
        body:
          "Filing a workers' comp claim. Reporting harassment or discrimination. Requesting FMLA leave. Reporting a safety violation to OSHA. Joining a union. Refusing to commit a crime. Discussing wages with coworkers. Each is protected by federal law, state law, or both.",
      },
      {
        num: "02",
        title: "The employer took an adverse action",
        body:
          "Firing, demotion, pay cut, schedule changes that hurt, undesirable shifts, discipline, or any change a reasonable worker would find materially adverse. Even threats can qualify in some retaliation laws.",
      },
      {
        num: "03",
        title: "The timing or pattern proves causation",
        body:
          "Adverse action within days or weeks of the protected act is the strongest signal. Manager comments referencing the protected activity, comparator employees who got better treatment, or a sudden shift after years of clean reviews all add to the timing argument.",
      },
      {
        num: "04",
        title: "Often a separate claim from the underlying issue",
        body:
          "You can win a retaliation case even if you lose (or never bring) the underlying discrimination, harassment, or wage claim. Retaliation is its own claim with its own damages and its own statute.",
      },
    ],
    note: {
      strongIntro: "Different statutes, different rules.",
      rest:
        " Title VII retaliation needs an EEOC charge first. FLSA retaliation can go straight to court. State whistleblower laws vary. Public-policy retaliation is judge-made law in most states.",
    },
  },

  claim: {
    h2: { pre: "How much can you ", em: "claim", post: "?" },
    lede:
      "Lost wages are the floor. Demoted-pay differences and emotional-distress damages stack on top.",
    layers: [
      {
        tag: "Layer 1",
        title: "Lost wages",
        body:
          "From the day of the adverse action until you found new work or could reasonably have found work. Mitigation matters: courts expect you to look for similar work.",
        amount: "$4,500",
      },
      {
        tag: "Layer 2",
        title: "Demoted-pay difference or schedule loss",
        body:
          "If you were not fired but cut to part-time, denied overtime, or reassigned to a lower-paying role, the wage difference is recoverable from the date of the action.",
        amount: "+ $1,500",
        accent: true,
      },
      {
        tag: "Layer 3",
        title: "Filing fees, attorney fees, interest",
        body:
          "Most retaliation statutes shift attorney fees to the loser. Some (FLSA retaliation, whistleblower acts) include statutory penalties on top.",
        amount: "+ $500",
      },
    ],
    total: {
      label: "Sample total within small-claims cap",
      body:
        "Six weeks of lost wages from termination, plus demoted-pay difference for the two months prior, plus filing fees and pre-judgment interest.",
      amount: "$6,500",
      sublabel: "illustrative · varies by statute and tenure",
    },
  },

  demand: {
    h2: { pre: "Send a ", em: "demand letter", post: " first." },
    lede:
      "Retaliation demand letters work because the legal theory is named. HR understands the statute and the timing risk. Many cases settle once the letter shows the protected activity, the adverse action, and the dates side by side.",
    checklist: [
      "The protected activity (with date)",
      "The adverse action (with date)",
      "The timing (the gap in days between the two)",
      "The statute or theory you are relying on (FLSA § 215(a)(3), state whistleblower act, public policy)",
      "A 14-day deadline before you file",
      "Sent certified mail with return receipt",
    ],
    letter: {
      certifiedNum: "7019 0140 0001 4827 3566",
      date: "May 5, 2026",
      recipientName: "Summit Industrial LLC",
      recipientAddress: "4400 Summit Drive, Denver, CO 80207",
      reLine: "Demand for Lost Wages, Retaliatory Termination on April 18, 2026",
      bodyParagraphs: [
        "On March 28, 2026, I filed an OSHA complaint about unguarded conveyor belts on the warehouse floor. On April 18, 2026 (21 days later), I was terminated. The company's stated reason was 'reorganization,' but no other warehouse worker was let go. The proximity of the OSHA report and the termination establishes a prima facie case of retaliation under <strong>29 U.S.C. § 660(c)</strong> and Colorado public policy.",
        "I demand within <strong>fourteen (14) days</strong>:",
      ],
      demandList: [
        "Payment of <strong>$4,500</strong> in lost wages from April 18 through May 30, 2026;",
        "Payment of <strong>$1,500</strong> in demoted pay from February through April (reduced overtime hours after I raised concerns).",
      ],
      closingLine:
        "Total demand: <strong>$6,000.00</strong>. If unresolved, I will file in Small Claims Court and pursue all available statutory damages, fees, and reinstatement remedies.",
      signatory: "Riley Quinn",
    },
  },

  fileSteps: {
    h2: { pre: "How to ", em: "file", post: " a retaliation case." },
    lede:
      "Four steps. The strength of these cases is in the timeline, so put it on paper before you file.",
    steps: [
      {
        title: "Prepare",
        body:
          "Build a one-page timeline: date of protected activity (with proof), date of adverse action (with proof), and gap between them. Gather paystubs, performance reviews, the termination email, and any text or comment referencing the protected activity.",
      },
      {
        title: "File",
        body:
          "File a small-claims complaint in the county where the employer's main office is located, or where you worked. Filing fees usually run $30 to $100. Some retaliation statutes also require an agency filing first (Title VII via EEOC). Check your statute.",
      },
      {
        title: "Serve",
        body:
          "Sheriff, certified mail through the clerk, or a private process server. Serve the registered agent (look it up on the secretary of state website).",
      },
      {
        title: "Hearing",
        body:
          "Lead with the timeline. Show the protected activity, then the adverse action, then the gap. The visual sequence does most of the work. Hearings usually run 10 to 15 minutes.",
      },
    ],
    aftermath: {
      tag: "After you win",
      title: "Collecting on a retaliation judgment.",
      bodyHtml:
        "Most employers pay voluntarily within 30 days, especially when retaliation is on the record (it draws agency attention). After that, the enforcement tools are a <strong>judgment lien</strong> on company real estate, a <strong>bank levy</strong> on a corporate account, and a <strong>writ of execution</strong> on business assets. Pre- and post-judgment interest runs at your state&rsquo;s legal rate.",
    },
  },

  evidence: {
    h2: { pre: "What evidence do you need to ", em: "sue your employer", post: "?" },
    lede:
      "Retaliation cases are won on timeline. The clearer the dates, the stronger the case.",
    cells: [
      {
        kind: "letter",
        tag: "Your protected report",
        letterhead: "OSHA Complaint Form 7",
        date: "March 28, 2026",
        recipientName: "OSHA · Region 8",
        reLine: "Unguarded conveyor on warehouse floor",
        bodyParagraphs: [
          "I am reporting that the main conveyor belt at Summit Industrial's Denver warehouse runs without proper guards. Two near-misses in the past month.",
          "Submitting under § 660(c). Please confirm receipt.",
        ],
        signatory: "Riley Quinn",
        signatoryTitle: "Warehouse Associate",
      },
      {
        kind: "texts",
        tag: "Manager comment",
        texts: [
          { dir: "out", text: "Heard you went to OSHA. That's a bold move." },
          { dir: "in", text: "I gave HR three weeks first. Nothing changed." },
          { dir: "out", text: "We'll see how 'bold' looks at performance review." },
        ],
      },
      {
        kind: "document",
        tag: "Performance review",
      },
      {
        kind: "letter",
        tag: "Termination email",
        letterhead: "Summit Industrial · HR",
        date: "April 18, 2026 (21 days later)",
        recipientName: "Riley Quinn",
        reLine: "Position eliminated effective today",
        bodyParagraphs: [
          "Due to organizational restructuring, your position is being eliminated effective today.",
          "Final pay will be processed in the next pay cycle. Please return your badge and PPE on your way out.",
        ],
        signatory: "L. Singh",
        signatoryTitle: "HR Business Partner",
      },
    ],
  },

  defenses: {
    h2: { pre: "Common employer ", em: "defenses", post: ", with rebuttals." },
    lede:
      "Three arguments cover most retaliation cases at the hearing. Each has a clean rebuttal if your timeline is on paper.",
    items: [
      {
        quote: "It was a legitimate business reason.",
        pill: "Most common",
        rebuttal:
          "<strong>Rebuttal:</strong> the burden shifts back to you to show the reason was pretext. Bring your performance reviews (positive before, negative after). Show comparator employees (others not let go for the same 'reason'). The closer in time the adverse action, the harder pretext is to defend.",
      },
      {
        quote: "We didn't know about the protected activity.",
        pill: "Knowledge",
        rebuttal:
          "<strong>Rebuttal:</strong> bring proof the decisionmaker knew. The HR email confirming receipt of your complaint, the manager comment about your OSHA filing, or the safety meeting where the report was discussed. Constructive knowledge sometimes counts too.",
      },
      {
        quote: "The action was already in motion before you complained.",
        pill: "Pre-existing",
        rebuttal:
          "<strong>Rebuttal:</strong> ask for the documentation showing the action was already planned: emails, meeting notes, written warnings dated before the protected activity. If they cannot produce dated evidence, the 'pre-existing' defense fails.",
      },
    ],
  },

  outcomes: {
    h2: { pre: "How much do workers ", em: "actually win", post: "?" },
    lede:
      "Typical recovery ranges in small-claims retaliation cases. Bigger discrimination-based retaliation cases usually need higher courts and an attorney.",
    bands: [
      {
        label: "Low",
        range: "$500 to $2,500",
        body:
          "<strong>Partial wages.</strong> The court agrees on retaliation but reduces lost wages because of mitigation or because new work was found quickly.",
        tier: "low",
      },
      {
        label: "Mid",
        range: "$2,500 to $8,000",
        body:
          "<strong>Lost wages plus demoted-pay difference.</strong> The most common small-claims retaliation outcome with clean timing evidence.",
        tier: "mid",
      },
      {
        label: "High",
        range: "$8,000 to $20,000+",
        body:
          "<strong>Lost wages plus statutory penalties plus fees.</strong> FLSA retaliation, OSHA whistleblower, or strong public-policy claims with clear evidence push to the cap.",
        tier: "high",
      },
    ],
  },

  stateSection: null,

  alternatives: {
    h2: { pre: "What are the ", em: "alternatives", post: " to small claims?" },
    lede:
      "Retaliation has multiple venues. Pick based on the protected activity.",
    cards: [
      {
        title: "EEOC charge",
        pillLabel: "Required for Title VII retaliation",
        pillTier: "warn",
        whenItFits:
          "your protected activity was opposing discrimination based on race, sex, age, religion, disability, or another federally protected category. EEOC charge required within 180 days (300 in most states).",
        tradeoff:
          "long process. EEOC investigation can take a year. After the right-to-sue letter, you go to federal or state court, usually with an attorney.",
      },
      {
        title: "OSHA whistleblower / agency filing",
        pillLabel: "Free, statutory",
        pillTier: "good",
        whenItFits:
          "your protected activity was an OSHA report (deadline: 30 days), a SOX disclosure, an FLSA wage complaint, or another statute-specific protected act. Agencies have their own retaliation processes.",
        tradeoff:
          "short deadlines. Some statutes allow concurrent court filing; others require agency exhaustion first.",
      },
      {
        title: "Small claims (this guide)",
        pillLabel: "Best for clean timeline cases",
        pillTier: "primary",
        whenItFits:
          "the protected activity does not require agency filing (FLSA wage retaliation, public-policy claims, state whistleblower acts that allow direct suit) and your damages fit your state's cap.",
        tradeoff:
          "30 to 90 day timeline. Filing fee around $50 to $100. Cap usually $5,000 to $20,000.",
      },
    ],
  },

  cta: {
    h2: { pre: "Make the ", em: "timeline visible", post: "." },
    body:
      "Retaliation demand letters work because they put the dates side by side. A real demand letter cites the protected activity, the adverse action, and the gap between them. Our generator builds yours in under two minutes.",
    receipt: {
      label: "example · OSHA-report retaliation",
      items: [
        { label: "Lost wages (6 weeks)", amount: "$4,500" },
        { label: "Demoted-pay difference", amount: "+ $1,500" },
        { label: "Filing fee + interest", amount: "+ $500" },
      ],
      total: "$6,500",
      totalLabel: "Total claim",
      note: "Illustrative. Your number depends on the protected activity, gap to adverse action, and tenure.",
    },
  },

  faqs: [
    {
      q: "What is workplace retaliation?",
      a: "Retaliation is when an employer takes an adverse action (firing, demotion, pay cut, schedule change) because you did something the law protects (filed a workers' comp claim, reported harassment, requested FMLA, reported safety issues). It is its own claim, separate from the underlying activity.",
    },
    {
      q: "What counts as 'protected activity'?",
      a: "Common ones: filing a workers' comp claim, reporting discrimination or harassment, requesting FMLA leave, reporting safety issues to OSHA, joining a union, refusing to break the law, discussing wages with coworkers, and whistleblowing on illegal company conduct. Each is protected by specific statutes.",
    },
    {
      q: "How close in time does the retaliation have to be?",
      a: "Closer is better. Adverse action within days or weeks of the protected activity creates a strong inference. Several months out, the timing alone usually does not suffice and you need additional evidence (manager comments, comparator employees, sudden negative reviews).",
    },
    {
      q: "Do I need to file with the EEOC first?",
      a: "Only if your protected activity was opposing discrimination based on a federally protected category (Title VII retaliation). FLSA wage retaliation, OSHA whistleblower, FMLA retaliation, and state public-policy claims usually do not require EEOC. Each statute has its own process.",
    },
    {
      q: "Can I win retaliation if I lose the underlying claim?",
      a: "Yes. Retaliation is its own claim with its own elements. You can win a retaliation case even if your underlying discrimination, wage, or safety complaint was wrong on the merits, as long as you had a reasonable belief in it when you reported.",
    },
    {
      q: "How long do I have to sue?",
      a: "Depends on the statute. FLSA retaliation: 2 to 3 years. Title VII retaliation: 180 to 300 days for EEOC, then 90 days after right-to-sue. OSHA whistleblower: 30 days. State public-policy retaliation: usually 2 to 3 years. Move fast either way.",
    },
    {
      q: "Will my next employer find out?",
      a: "Possibly. Retaliation lawsuits are public records. Some employees prefer to settle quietly via demand letter to avoid a public filing. The settlement can include confidentiality. Once you file in court, the lawsuit name appears in public dockets.",
    },
  ],

  relatedSlugs: [
    "wrongful-termination",
    "unpaid-wages",
    "fired-without-warning",
    "hostile-work-environment",
    "unsafe-working-conditions",
    "emotional-distress",
  ],
};
