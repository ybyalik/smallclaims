import type { RoommateIssue } from "./types";

export const emotionalDistress: RoommateIssue = {
  slug: "emotional-distress",
  ready: true,
  short: "Roommate emotional distress",
  breadcrumbLabel: "Emotional Distress",

  meta: {
    title: "Can I Sue My Roommate for Emotional Distress?",
    description: "Plain-English guide to suing a roommate for emotional distress. The IIED standard, why pairing with another claim helps, and a demand-letter template.",
  },

  hero: {
    eyebrowSuffix: "Emotional distress",
    h1: { pre: "Can I sue my roommate for ", em: "emotional distress", post: "?" },
    leadStrong: "Yes, but it works best paired with another claim.",
    leadBody:
      " Stand-alone emotional-distress claims against roommates are hard. The legal standard (intentional infliction of emotional distress) requires extreme and outrageous conduct. Most successful cases attach emotional-distress damages to a primary claim like harassment, property damage, or stalking. Therapy bills, medication costs, and lost work make the claim survive. Documented incidents with provider notes connecting symptoms to the conduct are decisive.",
  },

  counter: {
    amount: 4500,
    meta: "IIED + paired primary claim",
    rows: [
      { label: "Therapy + medication", value: "$2,200" },
      { label: "Lost work / missed shifts", value: "+ $2,000", emphasis: "accent" },
      { label: "Filing fee + interest", value: "$300", emphasis: "muted" },
    ],
    footer: "Sample · within most state small-claims caps",
  },

  whatCounts: {
    h2: { pre: "When does roommate conduct ", em: "support an emotional distress claim", post: "?" },
    lede: "Three patterns plus one paired-claim structure.",
    cards: [
      { num: "01", title: "Targeted harassment or threats", body: "Repeated targeted conduct that goes beyond ordinary roommate friction: threats, stalking, public shaming, harassment. Civil harassment restraining order plus emotional-distress damages." },
      { num: "02", title: "Outrageous violation of privacy", body: "Recording you without consent (where state law prohibits), reading your mail or messages, sharing personal info with others, or accessing your private spaces repeatedly." },
      { num: "03", title: "Pattern of intentional damage causing chronic stress", body: "Repeated property damage, theft, or destruction. The pattern over months establishes intentional infliction. Combined with documented health impact." },
      { num: "04", title: "Pair with primary claim", body: "Most useful approach: file the emotional-distress damages alongside another claim (unpaid rent, property damage, harassment). The primary claim establishes the wrong; emotional-distress adds the medical and lost-work damages." },
    ],
    note: { strongIntro: "Documentation is everything.", rest: " Therapy or counseling notes, prescriptions, doctor's diagnoses, missed work documentation, family or witness testimony about behavioral changes. Without documentation, emotional-distress damages are usually nominal." },
  },

  claim: {
    h2: { pre: "How much can you ", em: "claim", post: "?" },
    lede: "Therapy and medication bills plus lost work plus filing fees.",
    layers: [
      { tag: "Layer 1", title: "Therapy and medication", body: "Therapy or psychiatry sessions, anxiety or sleep medication, urgent-care visits. Provider notes connecting treatment to roommate conduct.", amount: "$2,200" },
      { tag: "Layer 2", title: "Lost work and consequential damages", body: "Wages lost from missed work due to chronic stress or panic attacks. Documented absences from work or school. Documented therapy appointment dates that conflicted with shifts.", amount: "+ $2,000", accent: true },
      { tag: "Layer 3", title: "Filing fees, IIED, interest", body: "Filing fee, service-of-process cost, pre-judgment interest. In rare cases, additional IIED damages for extreme conduct.", amount: "+ $300" },
    ],
    total: { label: "Sample total within small-claims cap", body: "Therapy bills, medication, missed work, plus filing fee.", amount: "$4,500", sublabel: "illustrative · varies by extent" },
  },

  demand: {
    h2: { pre: "Send a ", em: "demand letter", post: " first." },
    lede: "Demand letters work especially well when paired with documentation of the primary wrong.",
    checklist: ["Documented incident log", "Provider notes connecting symptoms to roommate conduct", "Therapy and medication receipts", "Missed work documentation", "Witness statements about behavioral changes", "A 14-day deadline", "Sent certified mail"],
    letter: {
      certifiedNum: "7019 0140 0001 4827 3624",
      date: "May 5, 2026",
      recipientName: "Jordan Roommate",
      recipientAddress: "1424 Forwarding Address, Phoenix, AZ 85003",
      reLine: "Demand for Damages, Roommate Harassment and Emotional Distress",
      bodyParagraphs: [
        "From November 2025 through April 2026, you engaged in a pattern of harassment: threats (3 documented), photographing me without consent (8 documented), repeated tampering with my belongings (5 documented). I have documented therapy bills of $2,200 since January 2026 with provider notes connecting symptoms to roommate conduct. I missed 12 days of work at $250/day = $2,000 in lost wages.",
        "I demand within <strong>fourteen (14) days</strong>:",
      ],
      demandList: [
        "Reimbursement of <strong>$2,200</strong> in therapy and medication;",
        "Reimbursement of <strong>$2,000</strong> in lost wages.",
      ],
      closingLine: "Total demand: <strong>$4,200.00</strong>. If unresolved, I will file in Small Claims Court alongside any other pending claims (rent, damage).",
      signatory: "Reese Q. Tenant",
    },
  },

  fileSteps: {
    h2: { pre: "How to ", em: "file", post: " an emotional-distress case." },
    lede: "Four steps. Documentation is the spine.",
    steps: [
      { title: "See a provider early", body: "Therapist, doctor, or psychiatrist. Document symptoms and connect them to roommate conduct in writing. Provider notes are decisive." },
      { title: "Document incidents", body: "Daily log with dates, descriptions, witnesses. Photos when applicable. The pattern over time establishes the case." },
      { title: "Send certified-mail demand with primary claim", body: "Bundle emotional distress with the primary claim (rent, harassment, damage). The combined case is stronger than either alone." },
      { title: "Hearing", body: "Lead with the primary wrong. Then the medical documentation. Then the lost-work calculation. Hearings usually run 10 to 15 minutes." },
    ],
    aftermath: { tag: "After you win", title: "Collecting damages.", bodyHtml: "Money judgments enforce via <strong>judgment lien</strong>, <strong>bank levy</strong>, and <strong>writ of execution</strong>. Wage garnishment is also available." },
  },

  evidence: {
    h2: { pre: "What evidence do you need ", em: "for emotional distress", post: "?" },
    lede: "Provider notes plus incident documentation plus medical bills are the case.",
    cells: [
      { kind: "letter", tag: "Provider note", letterhead: "Dr. K. Singh, LMFT · License #CA-LMFT-12345", date: "April 15, 2026", recipientName: "Reese Tenant", reLine: "Treatment summary", bodyParagraphs: [
        "Patient presented for therapy starting January 8, 2026 with symptoms consistent with acute anxiety and chronic stress.",
        "Patient describes a pattern of harassment by their roommate (verbal threats, surveillance, property tampering). Symptoms include sleep disruption, panic attacks (4 documented), and difficulty concentrating at work.",
        "I am providing this letter to support documentation.",
      ], signatory: "Dr. K. Singh", signatoryTitle: "Licensed Marriage and Family Therapist" },
      { kind: "texts", tag: "Roommate's threats", texts: [
        { dir: "in", text: "I see you watching me. You'll regret moving in here." },
        { dir: "in", text: "Cameras work both ways. Stop digging." },
        { dir: "out", text: "These threats are documented. I'm seeing a therapist now." },
      ] },
      { kind: "handbook", tag: "IIED standard", documentTitle: "Restatement (Second) of Torts · § 46", sectionTitle: "Outrageous conduct causing severe emotional distress", bodyParagraphs: [
        "One who by extreme and outrageous conduct intentionally or recklessly causes severe emotional distress to another is subject to liability for such emotional distress.",
      ], highlight: "Repeated threats + surveillance + property tampering meets IIED standard when combined with documented medical impact.", footer: "Restatement adopted in most state courts" },
      { kind: "receipt", tag: "Therapy + missed work", vendor: "WESTSIDE COUNSELING + EMPLOYER RECORDS", vendorAddr: "Combined claim", receiptNum: "Statement", date: "Q1 2026", lineItems: [
        { label: "Therapy sessions (10)", amount: "$1,800.00" },
        { label: "Anxiety medication", amount: "$400.00" },
        { label: "Missed work (12 days at $250)", amount: "$2,000.00" },
      ], subtotal: "$4,200.00", total: "$4,200.00", footer: "Documented out-of-pocket and lost wages" },
    ],
  },

  defenses: {
    h2: { pre: "Common roommate ", em: "defenses", post: ", with rebuttals." },
    lede: "Three arguments cover most cases.",
    items: [
      { quote: "We just don't get along. That's not 'extreme'.", pill: "Most common", rebuttal: "<strong>Rebuttal:</strong> bring the documented pattern. Threats, surveillance, and property tampering go beyond ordinary roommate friction. The pattern over months establishes the IIED standard." },
      { quote: "You're being oversensitive.", pill: "Sensitivity", rebuttal: "<strong>Rebuttal:</strong> the standard is the reasonable person's response, not your subjective sensitivity. Provider notes plus witness testimony establish that conduct was objectively beyond the line." },
      { quote: "Your problems were preexisting.", pill: "Causation", rebuttal: "<strong>Rebuttal:</strong> 'eggshell plaintiff' doctrine: the roommate takes you as they find you. If their conduct exacerbated a preexisting condition, the worsening is recoverable." },
    ],
  },

  outcomes: {
    h2: { pre: "How much do tenants ", em: "actually recover", post: "?" },
    lede: "Typical recovery in emotional-distress cases.",
    bands: [
      { label: "Low", range: "$200 to $1,000", body: "<strong>Documented direct costs.</strong> Therapy bills only. Common when pattern is short or evidence is light.", tier: "low" },
      { label: "Mid", range: "$1,000 to $5,000", body: "<strong>Therapy plus lost work.</strong> Most common with provider notes and pattern documentation.", tier: "mid" },
      { label: "High", range: "$5,000 to $20,000+", body: "<strong>Major IIED + paired claims.</strong> Cap-of-court when paired with harassment or property-damage cases.", tier: "high" },
    ],
  },

  stateSection: null,

  alternatives: {
    h2: { pre: "What are the ", em: "alternatives", post: " to small claims?" },
    lede: "Civil restraining orders for ongoing protection. Police complaints for criminal conduct.",
    cards: [
      { title: "Civil harassment restraining order", pillLabel: "Free or low-cost, fast", pillTier: "primary", whenItFits: "ongoing harassment. Protection independent of damages.", tradeoff: "no money damages. Use alongside small-claims for damages." },
      { title: "Police complaint", pillLabel: "Free, criminal angle", pillTier: "good", whenItFits: "threats, vandalism, or stalking are crimes. Police investigate and prosecute. Criminal record creates leverage.", tradeoff: "criminal cases focus on punishment, not damages." },
      { title: "Small claims (this guide)", pillLabel: "For monetary damages", pillTier: "warn", whenItFits: "documented therapy and lost work. Damages within state cap.", tradeoff: "30 to 90 day timeline. Cannot order injunction." },
    ],
  },

  cta: {
    h2: { pre: "Document the ", em: "harm", post: "." },
    body: "Demand letters with provider notes and incident logs produce settlement in many cases. Often paired with primary roommate claims (rent, damage).",
    receipt: { label: "example · pattern of harassment", items: [
      { label: "Therapy + medication", amount: "$2,200" },
      { label: "Lost work", amount: "+ $2,000" },
      { label: "Filing fee + interest", amount: "+ $300" },
    ], total: "$4,500", totalLabel: "Total claim", note: "Illustrative. Pair with primary claim for stronger case." },
  },

  faqs: [
    { q: "Can I sue my roommate for emotional distress?", a: "Yes, when conduct meets the IIED standard (extreme and outrageous behavior) and you have documented harm (therapy, medication, lost work). Stand-alone claims are hard; pair with a primary claim like harassment, property damage, or unpaid rent for stronger cases." },
    { q: "What is the IIED standard?", a: "Intentional Infliction of Emotional Distress requires extreme and outrageous conduct, intent (or recklessness), and severe emotional distress. The bar is high: rude, mean, or insensitive isn't enough. Targeted harassment, threats, or systematic cruelty can meet it." },
    { q: "How important is therapy documentation?", a: "Critical. Without provider notes connecting symptoms to roommate conduct, emotional-distress damages are usually nominal. Therapy bills + provider testimony + your own documentation establish damages." },
    { q: "Can I sue if I had pre-existing anxiety?", a: "Yes. The 'eggshell plaintiff' doctrine: the roommate takes you as they find you. If conduct exacerbated a preexisting condition, the worsening is recoverable. The provider note connecting the change to the timeline is essential." },
    { q: "How long do I have to sue?", a: "IIED claims usually run 1 to 3 years from the most recent incident. Continuing conduct resets the clock. State personal-injury statutes apply in some jurisdictions." },
    { q: "Should I just move out?", a: "Often the cleanest path. Moving out and pursuing the case from a stable place often produces better outcomes. Document each incident before, during, and after the move-out for the strongest case." },
    { q: "Can I get a restraining order?", a: "Yes. Civil harassment restraining orders provide ongoing protection independent of damages. Most states grant temporary orders within days; full hearings within 21 days. File alongside the small-claims action." },
  ],

  relatedSlugs: ["unpaid-rent", "unpaid-bills", "moving-out-no-notice", "property-damage-or-theft", "security-deposit", "no-lease"],
};
