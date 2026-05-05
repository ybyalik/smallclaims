import type { EmployerIssue } from "./types";

export const emotionalDistress: EmployerIssue = {
  slug: "emotional-distress",
  ready: true,
  short: "Emotional distress",
  breadcrumbLabel: "Emotional distress",

  meta: {
    title: "Can I Sue My Employer for Emotional Distress? Small Claims Guide",
    description:
      "Plain-English guide to emotional-distress claims against an employer. The two flavors (IIED and NIED), why pairing with another claim is usually the winning play, and what small claims can recover.",
  },

  hero: {
    eyebrowSuffix: "Emotional distress",
    h1: { pre: "Can I sue my employer for ", em: "emotional distress", post: "?" },
    leadStrong: "Yes, but it works best paired with another claim.",
    leadBody:
      " Stand-alone emotional-distress claims are hard. The legal standard is high (the conduct has to be 'extreme and outrageous' or the employer's negligence has to have caused real, documented harm). Most successful cases attach emotional distress to a wage, retaliation, harassment, or wrongful-termination claim. Documented therapy bills, medication costs, and lost work make these claims survive in small claims.",
  },

  counter: {
    amount: 4500,
    meta: "IIED + paired wage claim",
    rows: [
      { label: "Therapy & meds", value: "$1,800" },
      { label: "Lost work (panic attacks)", value: "+ $2,200", emphasis: "accent" },
      { label: "Filing fee + interest", value: "$500", emphasis: "muted" },
    ],
    footer: "Sample · paired with retaliation claim",
  },

  whatCounts: {
    h2: { pre: "What counts as ", em: "emotional distress", post: "?" },
    lede:
      "Two legal flavors. One requires intentional conduct that crosses a high bar. The other requires negligence plus documented harm.",
    cards: [
      {
        num: "01",
        title: "Intentional Infliction of Emotional Distress (IIED)",
        body:
          "The employer or supervisor engaged in 'extreme and outrageous' conduct, intended to cause distress (or knew it was substantially certain to), and you suffered severe emotional distress as a result. The conduct bar is high: rude, mean, or insensitive is not enough. Targeted public humiliation, deliberate cruelty, or threats can clear it.",
        },
      {
        num: "02",
        title: "Negligent Infliction of Emotional Distress (NIED)",
        body:
          "The employer breached a duty of care (such as workplace-safety obligations or anti-harassment policies) and the breach caused you foreseeable emotional harm. Some states require physical injury or a 'zone of danger' showing; others accept distress alone with documentation.",
      },
      {
        num: "03",
        title: "Pair with another claim",
        body:
          "Emotional-distress claims succeed most often when attached to a wrongful termination, retaliation, harassment, wage, or workers' comp case. The underlying claim establishes the legal violation; the emotional-distress claim adds therapy and treatment costs to the damages.",
      },
      {
        num: "04",
        title: "Documented harm wins",
        body:
          "Therapy or counseling notes, prescription receipts, doctor's diagnosis (anxiety, PTSD, depression), missed work tied to medical visits, and family or coworker testimony about the change in your behavior. Without documentation, the damages are usually nominal.",
      },
    ],
    note: {
      strongIntro: "Workers' comp can block stand-alone IIED.",
      rest:
        " In some states, the workers' comp 'exclusive remedy' rule blocks emotional-distress suits against the employer for negligence. Intentional conduct usually escapes the bar. Pair with a non-workers'-comp claim (wage, retaliation, harassment) to keep the path clear.",
    },
  },

  claim: {
    h2: { pre: "What can you ", em: "claim", post: "?" },
    lede:
      "Documented therapy and medical costs. Missed work from medical appointments. Sometimes punitive damages where the conduct was extreme.",
    layers: [
      {
        tag: "Layer 1",
        title: "Therapy, counseling, and medication",
        body:
          "Therapy or psychiatry sessions, anxiety or sleep medication, EAP visit copays, and any treatment your doctor connects to workplace conditions. Bring receipts and provider notes.",
        amount: "$1,800",
      },
      {
        tag: "Layer 2",
        title: "Lost work from panic attacks or medical visits",
        body:
          "Wages lost to therapy appointments, panic attacks that prevented work, or medical leave tied to workplace stress. Show paystubs or PTO records and provider notes connecting the absences.",
        amount: "+ $2,200",
        accent: true,
      },
      {
        tag: "Layer 3",
        title: "Filing fees, attorney fees, interest",
        body:
          "Federal civil rights cases shift attorney fees. Stand-alone emotional-distress claims do not, but pairing with a wage or retaliation case often unlocks fee-shifting.",
        amount: "+ $500",
      },
    ],
    total: {
      label: "Sample total within small-claims cap",
      body:
        "Documented therapy and medication, plus lost work from medical visits, plus filing fees. Pair with a retaliation or wage claim for stronger recovery.",
      amount: "$4,500",
      sublabel: "illustrative · varies by documentation and state",
    },
  },

  demand: {
    h2: { pre: "Send a ", em: "demand letter", post: " first." },
    lede:
      "Emotional-distress demand letters work best when they connect specific conduct to specific medical documentation. Vague 'I was stressed' framing gets ignored; 'these incidents on these dates caused this diagnosis on this date' gets responses.",
    checklist: [
      "The specific incidents (with dates) and the conduct",
      "The diagnosis or treatment received (with provider names and dates)",
      "Documented bills (therapy, medication, missed-work loss)",
      "The legal theory (IIED, NIED, or paired with another claim)",
      "A 14-day deadline before you file",
      "Sent certified mail with return receipt",
    ],
    letter: {
      certifiedNum: "7019 0140 0001 4827 3570",
      date: "May 5, 2026",
      recipientName: "Pinnacle Tech Solutions Inc.",
      recipientAddress: "1200 Pacific Boulevard, San Diego, CA 92101",
      reLine: "Demand for Therapy Costs and Lost Wages, Constructive Discharge on April 1, 2026",
      bodyParagraphs: [
        "After my supervisor (Taylor Reyes) repeatedly criticized me publicly in front of clients in February and March 2026 (specific incidents on Feb 12, Feb 22, and Mar 5), I developed acute anxiety. My therapist (Dr. K. Singh, license CA-LMFT-12345) diagnosed work-related anxiety on March 18 and I left employment on April 1.",
        "I demand within <strong>fourteen (14) days</strong>:",
      ],
      demandList: [
        "Reimbursement of <strong>$1,800</strong> in therapy and medication costs (records attached);",
        "Payment of <strong>$2,200</strong> in lost wages from missed work and reduced hours documented in the medical records.",
      ],
      closingLine:
        "Total demand: <strong>$4,000.00</strong>. If unresolved, I will file in Small Claims Court.",
      signatory: "Devin Marsh",
    },
  },

  fileSteps: {
    h2: { pre: "How to ", em: "file", post: " an emotional-distress case." },
    lede:
      "Four steps. The case is built on documentation: provider notes, receipts, paystubs.",
    steps: [
      {
        title: "Prepare",
        body:
          "Gather therapy and medical records, prescription receipts, paystubs showing lost wages, the timeline of incidents, and any text or email documenting the conduct. Have your provider write a brief letter connecting your treatment to workplace conditions.",
      },
      {
        title: "File",
        body:
          "File a small-claims complaint in the county where the employer's main office is located, or where you worked. Filing fees usually run $30 to $100. If you are pairing with a discrimination claim, EEOC filing should already be in motion.",
      },
      {
        title: "Serve",
        body:
          "Sheriff, certified mail through the clerk, or a private process server. Serve the employer's registered agent (look it up on the secretary of state website).",
      },
      {
        title: "Hearing",
        body:
          "Lead with the documentation: the diagnosis, the bills, the missed work. Then connect the dates back to specific workplace incidents. Hearings usually run 10 to 15 minutes.",
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
      "Documented harm wins. The connection between specific incidents and specific medical care is the case.",
    cells: [
      {
        kind: "letter",
        tag: "Provider letter",
        letterhead: "Dr. K. Singh, LMFT · License CA-LMFT-12345",
        date: "March 18, 2026",
        recipientName: "To Whom It May Concern",
        reLine: "Patient: Devin Marsh · Treatment summary",
        bodyParagraphs: [
          "Patient has presented for weekly therapy since January 28, 2026 with symptoms consistent with acute anxiety disorder. Patient describes a pattern of public criticism by an immediate supervisor. Symptoms include sleep disruption, panic attacks (3 documented), and inability to perform routine work tasks.",
          "I am providing this letter at the patient's request to support their workplace and legal documentation.",
        ],
        signatory: "Dr. K. Singh, LMFT",
        signatoryTitle: "Licensed Marriage and Family Therapist",
      },
      {
        kind: "receipt",
        tag: "Therapy receipts",
        vendor: "WESTSIDE COUNSELING ASSOCIATES",
        vendorAddr: "844 4th Ave · San Diego, CA",
        receiptNum: "Patient: Devin Marsh",
        date: "Jan – Apr 2026",
        lineItems: [
          { label: "Initial intake (1 hr)", amount: "$200.00" },
          { label: "Weekly sessions (12 × $150)", amount: "$1,800.00" },
          { label: "Insurance copay (waived)", amount: "—" },
        ],
        subtotal: "$2,000.00",
        total: "$2,000.00",
        footer: "Net out-of-pocket after insurance: $1,800",
      },
      {
        kind: "texts",
        tag: "Documented incident",
        texts: [
          { dir: "out", text: "Did Taylor really yell at you in front of the Bloom team again?" },
          { dir: "in", text: "Yeah. Same as last week. I had to step out, panic attack." },
          { dir: "out", text: "You should get this in writing. Three times now in a month." },
        ],
      },
      {
        kind: "paystub",
        tag: "Lost work",
        employer: "PINNACLE TECH SOLUTIONS",
        employerAddr: "1200 Pacific Blvd · San Diego, CA",
        payPeriod: "Pay period 03/16 to 03/29/2026",
        payDate: "Paid 04/05/2026",
        earnings: [
          { label: "Salary (full)", amount: "$2,400.00" },
          { label: "Less: medical leave (40 hrs)", amount: "-$1,200.00" },
        ],
        deductions: [
          { label: "Federal tax", amount: "-$144.00" },
          { label: "FICA", amount: "-$92.00" },
        ],
        gross: "$1,200.00",
        net: "$964.00",
        footer: "40 hours unpaid medical leave for therapy / panic attacks",
      },
    ],
  },

  defenses: {
    h2: { pre: "Common employer ", em: "defenses", post: ", with rebuttals." },
    lede:
      "Three arguments cover most emotional-distress cases. Each has a clean rebuttal if your medical records are in your hand.",
    items: [
      {
        quote: "The conduct wasn't 'extreme and outrageous.'",
        pill: "Most common",
        rebuttal:
          "<strong>Rebuttal:</strong> for IIED, you do not need physical violence. Repeated public humiliation, targeted threats, or systematic exclusion can clear the bar in many states. Bring documented incidents (with dates) and witness testimony. For NIED, the standard is lower: breach of duty plus foreseeable harm.",
      },
      {
        quote: "Workers' comp is your only remedy.",
        pill: "Exclusive remedy",
        rebuttal:
          "<strong>Rebuttal:</strong> the workers' comp bar usually does not apply to intentional conduct. It also does not apply when the emotional distress is paired with a separate claim (wage violation, retaliation, civil rights). Pair the case if needed.",
      },
      {
        quote: "Your problems were preexisting, not caused by us.",
        pill: "Causation",
        rebuttal:
          "<strong>Rebuttal:</strong> 'eggshell plaintiff' doctrine applies in most states: an employer takes the worker as they find them. If the workplace conduct exacerbated a preexisting condition, the worsening is recoverable. Bring provider notes documenting the change tied to the workplace timeline.",
      },
    ],
  },

  outcomes: {
    h2: { pre: "How much do workers ", em: "actually win", post: "?" },
    lede:
      "Typical recovery in small-claims emotional-distress cases. Bigger cases (significant PTSD, ongoing treatment, paired with strong discrimination claims) usually need higher courts.",
    bands: [
      {
        label: "Low",
        range: "$200 to $1,500",
        body:
          "<strong>Documented direct costs.</strong> Court awards therapy and medical bills tied to the workplace but does not find emotional-distress damages beyond reimbursement.",
        tier: "low",
      },
      {
        label: "Mid",
        range: "$1,500 to $5,000",
        body:
          "<strong>Bills plus lost wages.</strong> Most common when the emotional-distress claim is paired with a wage or retaliation case and there is documented missed work.",
        tier: "mid",
      },
      {
        label: "High",
        range: "$5,000 to $20,000+",
        body:
          "<strong>Cap-of-the-court awards.</strong> Strong IIED cases (extreme, documented conduct), paired with a successful wage or discrimination claim, with extensive medical records.",
        tier: "high",
      },
    ],
  },

  stateSection: null,

  alternatives: {
    h2: { pre: "What are the ", em: "alternatives", post: " to small claims?" },
    lede:
      "Emotional-distress claims often share venues with the underlying conduct. Pick the strongest path.",
    cards: [
      {
        title: "EEOC or state fair-employment agency",
        pillLabel: "If discrimination is the trigger",
        pillTier: "warn",
        whenItFits:
          "the emotional distress is rooted in discrimination or harassment based on a protected category. EEOC charge required for federal claims within 180 days (300 in most states).",
        tradeoff:
          "long process. EEOC investigations typically take a year. After right-to-sue letter, lawsuits go to higher court with attorney representation.",
      },
      {
        title: "Workers' compensation",
        pillLabel: "If physical injury or 'mental injury' is covered",
        pillTier: "good",
        whenItFits:
          "your state's workers' comp covers mental injuries (some do, some do not). If covered, file the comp claim. The exclusive-remedy rule may block other suits for the same injury.",
        tradeoff:
          "limited damages: medical and partial lost wages. No pain-and-suffering award. Pair with a non-workers'-comp claim (wage, retaliation) for the rest.",
      },
      {
        title: "Small claims (this guide)",
        pillLabel: "Best for documented direct costs",
        pillTier: "primary",
        whenItFits:
          "you have therapy bills and lost-wage records that fit your state's cap. Most successful when paired with a wage or retaliation claim that establishes the underlying violation.",
        tradeoff:
          "30 to 90 day timeline. Filing fee around $50 to $100. Cap usually $5,000 to $20,000.",
      },
    ],
  },

  cta: {
    h2: { pre: "Connect ", em: "harm to conduct", post: "." },
    body:
      "Emotional-distress demand letters work when they tie specific incidents to specific medical documentation. Our generator builds yours in under two minutes.",
    receipt: {
      label: "example · paired with retaliation",
      items: [
        { label: "Therapy & medication", amount: "$1,800" },
        { label: "Lost work (medical visits)", amount: "+ $2,200" },
        { label: "Filing fee + interest", amount: "+ $500" },
      ],
      total: "$4,500",
      totalLabel: "Total claim",
      note: "Illustrative. Stand-alone claims often run lower; paired claims push to the cap.",
    },
  },

  faqs: [
    {
      q: "Can I sue my employer for emotional distress?",
      a: "Yes, but it is hard alone. The legal standard is high (intentional conduct that is 'extreme and outrageous' or negligent breach of duty causing real, foreseeable harm). Stand-alone claims succeed less often than emotional-distress claims paired with a wage, retaliation, harassment, or wrongful-termination case.",
    },
    {
      q: "What is the difference between IIED and NIED?",
      a: "IIED (intentional infliction) requires extreme and outrageous conduct, intent (or substantial certainty) to cause distress, and severe distress as a result. NIED (negligent infliction) requires breach of a duty of care, foreseeable emotional harm, and (in some states) physical injury or zone-of-danger showing. IIED has a higher conduct bar; NIED has a lower one but stricter causation rules.",
    },
    {
      q: "Does workers' comp block emotional-distress claims?",
      a: "Sometimes. The 'exclusive remedy' rule blocks negligence suits for workplace injuries in most states. It usually does not block intentional-conduct claims (IIED). Pairing emotional distress with a separate claim (wage, retaliation, civil rights) often keeps the path clear.",
    },
    {
      q: "How important is therapy or medical documentation?",
      a: "Critical. Without documented diagnosis, treatment, and provider notes connecting your treatment to workplace conditions, emotional-distress damages are usually nominal. The diagnosis plus the treatment timeline tied to workplace incidents is the case.",
    },
    {
      q: "Can I sue if I had pre-existing anxiety or depression?",
      a: "Yes. The 'eggshell plaintiff' doctrine in most states means the employer takes you as they find you. If workplace conduct worsened a pre-existing condition, the worsening is recoverable. The provider note connecting the change to the workplace timeline is essential.",
    },
    {
      q: "How long do I have to sue?",
      a: "Stand-alone IIED and NIED claims usually run 1 to 3 years depending on state. Personal-injury statutes apply in some states. If paired with discrimination (EEOC charge required), the federal-charge deadline is 180 days (300 in most states).",
    },
    {
      q: "Will I have to discuss my mental-health history in court?",
      a: "Possibly, in cross-examination. Employers often probe pre-existing conditions to argue causation. Most cases settle before that point. Settlement agreements often include confidentiality. Your therapist's testimony is usually limited to what is needed to support the claim.",
    },
  ],

  relatedSlugs: [
    "hostile-work-environment",
    "retaliation",
    "wrongful-termination",
    "fired-without-warning",
    "unsafe-working-conditions",
    "unpaid-wages",
  ],
};
