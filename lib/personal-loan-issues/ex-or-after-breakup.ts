import type { PersonalLoanIssue } from "./types";

export const exOrAfterBreakup: PersonalLoanIssue = {
  slug: "ex-or-after-breakup",
  ready: true,
  short: "Ex owes money",
  breadcrumbLabel: "Ex Owes Money",

  meta: {
    title: "Can I Sue My Ex for Money Owed? Small Claims Guide",
    description:
      "Plain-English guide to recovering money from an ex after a breakup. Joint expenses, advanced loans, and the line between gift and contract. Demand-letter template included.",
  },

  hero: {
    eyebrowSuffix: "Ex owes me money",
    h1: { pre: "Can I sue my ex for ", em: "money owed", post: "?" },
    leadStrong: "Yes, but the gift presumption from cohabitation can complicate things.",
    leadBody:
      " Money you advanced to an ex during the relationship is often disputed afterward as 'gift' versus 'loan'. Documentation matters more than ever. Bank transfers with 'loan' notes, texts about repayment, written agreements, or proof of joint expenses you covered alone all support recovery. Small claims is the right venue when the amount fits your state's cap and you're not entangled in a family-court situation.",
  },

  counter: {
    amount: 4800,
    meta: "Oral contract / unjust enrichment after breakup",
    rows: [
      { label: "Loan + paid-on-behalf expenses", value: "$4,000" },
      { label: "Pre-judgment interest", value: "+ $600", emphasis: "accent" },
      { label: "Filing fee", value: "$200", emphasis: "muted" },
    ],
    footer: "Sample · within most state small-claims caps",
  },

  whatCounts: {
    h2: { pre: "What kinds of ex-related ", em: "debts", post: " are recoverable?" },
    lede: "Four common patterns after breakups.",
    cards: [
      { num: "01", title: "Money you advanced as a loan", body: "Cash transfer or Venmo with 'pay you back' designation. The platform record plus texts establish the loan independent of the relationship status." },
      { num: "02", title: "Joint expenses you paid alone", body: "Rent, utilities, vacation deposits, joint car payments where you paid more than half. Recovery for the excess under unjust enrichment when the relationship ended without resolving." },
      { num: "03", title: "Major purchases for shared use", body: "Furniture, electronics, appliances purchased with your money for joint use. Many state laws allow recovery of half the value when the relationship ends." },
      { num: "04", title: "Engagement ring (state-specific)", body: "Most states treat engagement rings as 'conditional gifts': returnable if the engagement is broken (regardless of fault). Some states (Montana, others) treat the ring as a gift once given." },
    ],
    note: { strongIntro: "Stay out of family court if possible.", rest: " If you were married, divorced, or had children with the ex, the dispute may belong in family court rather than small claims. Family courts have authority over property division. Pure cohabitation cases (no marriage, no kids) usually fit small claims." },
  },

  claim: {
    h2: { pre: "How much can you ", em: "claim", post: "?" },
    lede: "Direct loans plus paid-on-behalf expenses plus pre-judgment interest.",
    layers: [
      { tag: "Layer 1", title: "Direct loans and paid-on-behalf expenses", body: "Bank transfer record. Venmo/Zelle/Cash App receipts. Joint expenses you covered (with receipts). The total you transferred or paid on the ex's behalf.", amount: "$4,000" },
      { tag: "Layer 2", title: "Pre-judgment interest", body: "State legal rate (7 to 10 percent per year) running from the breakup date or first demand.", amount: "+ $600", accent: true },
      { tag: "Layer 3", title: "Filing fees, post-judgment interest", body: "Filing fee, service-of-process cost. Post-judgment interest until paid.", amount: "+ $200" },
    ],
    total: { label: "Sample total within small-claims cap", body: "$4,000 in advances and paid-on-behalf expenses plus pre-judgment interest, plus filing fee.", amount: "$4,800", sublabel: "illustrative · varies by state and term" },
  },

  demand: {
    h2: { pre: "Send a ", em: "demand letter", post: " first." },
    lede: "Demand letters work especially well after breakups because the ex usually wants to cut ties cleanly. Most disputes settle within 14 days to avoid the lawsuit.",
    checklist: [
      "Itemized list of advances and paid-on-behalf expenses",
      "Bank/Venmo/Zelle records",
      "Texts about repayment or shared expenses",
      "Pre-judgment interest calculation",
      "A 14-day deadline before you file",
      "Sent certified mail",
    ],
    letter: {
      certifiedNum: "7019 0140 0001 4827 3613",
      date: "May 5, 2026",
      recipientName: "Jordan Ex",
      recipientAddress: "1424 Maple Lane, Sacramento, CA 95816",
      reLine: "Demand for Repayment of Loans and Joint Expenses",
      bodyParagraphs: [
        "During our relationship (March 2023 to January 2026), I made the following advances and paid the following joint expenses on your behalf:",
        "March 2024: $2,500 wire transfer with memo 'Loan for car repairs — pay back'.",
        "September 2024 to December 2025: $1,500 in joint utility payments while you were unemployed (your half of bills I paid alone).",
        "Total: $4,000. I demand within <strong>fourteen (14) days</strong>:",
      ],
      demandList: [
        "Repayment of <strong>$4,000</strong> in loans and paid-on-behalf expenses;",
        "Pre-judgment interest at 10 percent per year (<strong>$600</strong>).",
      ],
      closingLine: "Total demand: <strong>$4,600.00</strong>. If unresolved, I will file in Small Claims Court.",
      signatory: "Reese Q. Lender",
    },
  },

  fileSteps: {
    h2: { pre: "How to ", em: "file", post: " against an ex." },
    lede: "Four steps. Documentation of each advance and joint expense is the case.",
    steps: [
      { title: "Itemize the financial entanglement", body: "List each advance with date, amount, and method. Each joint expense you paid alone. Subtract anything the ex paid on your behalf. Net is your claim." },
      { title: "Send certified-mail demand", body: "14-day deadline. Most exes pay or counter-offer to avoid court appearance and lingering legal exposure." },
      { title: "File in small claims", body: "If demand fails, file. Filing fees usually run $30 to $100. File in the county where the ex lives." },
      { title: "Hearing", body: "Lead with the itemized list, transfer records, and texts. Hearings usually run 10 to 15 minutes. Avoid getting drawn into emotional territory." },
    ],
    aftermath: { tag: "After you win", title: "Collecting from an ex.", bodyHtml: "Money judgments enforce via <strong>judgment lien</strong>, <strong>bank levy</strong>, and <strong>writ of execution</strong>. Wage garnishment is also available. Post-judgment interest accrues until paid. Judgments stay valid 10 to 20 years." },
  },

  evidence: {
    h2: { pre: "What evidence do you need to ", em: "sue an ex", post: "?" },
    lede: "Bank records, transfer notes, and texts establishing loan vs. gift are the case.",
    cells: [
      { kind: "letter", tag: "Itemized financial entanglement", letterhead: "Reese Lender · Personal records", date: "March 2023 - January 2026", recipientName: "Court records", reLine: "Loans and joint expenses", bodyParagraphs: [
        "03/14/2024: $2,500 wire transfer to Jordan Ex with memo 'Loan for car repairs'.",
        "09/22/2024 to 12/15/2025: 16 utility payments totaling $1,500 (Jordan's half I paid alone during their unemployment).",
        "01/05/2026: $0 from Jordan Ex during the relationship.",
        "Total advances and paid-on-behalf: $4,000. Net owed.",
      ], signatory: "Reese Lender", signatoryTitle: "Documentation since 03/14/2024" },
      { kind: "texts", tag: "Loan agreement texts", texts: [
        { dir: "in", text: "Hey, my car needs $2,500 in repairs. Can you help? I'll pay you back when I get my bonus." },
        { dir: "out", text: "Sending now via wire. Bonus in 3 months, right?" },
        { dir: "in", text: "Yes thank you. I'll pay back as soon as I have it." },
      ] },
      { kind: "handbook", tag: "Statute of limitations", documentTitle: "California Code of Civil Procedure · § 339", sectionTitle: "Oral contract · 2-year statute", bodyParagraphs: [
        "Within two years: An action upon a contract, obligation, or liability not founded upon an instrument of writing.",
      ], highlight: "Last advance Dec 2025. 2-year statute runs Dec 2027. Within deadline.", footer: "California oral-contract statute" },
      { kind: "receipt", tag: "Bank transfer record", vendor: "WELLS FARGO", vendorAddr: "Account 1234", receiptNum: "Wire #82218", date: "03/14/2024", lineItems: [
        { label: "Wire transfer to Jordan Ex", amount: "$2,500.00" },
        { label: "Memo: 'Loan for car repairs - pay back'", amount: "(memo line)" },
      ], subtotal: "$2,500.00", total: "$2,500.00", footer: "Bank confirmed transfer · receipt" },
    ],
  },

  defenses: {
    h2: { pre: "Common ex ", em: "defenses", post: ", with rebuttals." },
    lede: "Three arguments cover most ex cases.",
    items: [
      { quote: "It was a gift between partners.", pill: "Most common", rebuttal: "<strong>Rebuttal:</strong> bring the bank memos and texts. The ex's own words about 'pay back' overcome the gift defense. Cohabitation alone does not make transfers gifts." },
      { quote: "We had a different agreement.", pill: "Different terms", rebuttal: "<strong>Rebuttal:</strong> bring the documented terms (memos, texts). Ex's preferred narrative is irrelevant if the contemporaneous documentation says something different. Texts at the time of the loan are stronger than recollection later." },
      { quote: "I paid for things too.", pill: "Offset", rebuttal: "<strong>Rebuttal:</strong> the offset is legitimate but should be itemized similarly. Subtract verifiable amounts the ex paid on your behalf. Net amount remains the claim." },
    ],
  },

  outcomes: {
    h2: { pre: "How much do lenders ", em: "actually recover", post: "?" },
    lede: "Typical recovery ranges. Documentation drives outcomes more than relationship details.",
    bands: [
      { label: "Low", range: "$200 to $1,500", body: "<strong>Partial recovery.</strong> Court awards a portion when documentation is weak or terms disputed.", tier: "low" },
      { label: "Mid", range: "$1,500 to $5,000", body: "<strong>Documented advances + interest.</strong> Most common with bank memos and texts.", tier: "mid" },
      { label: "High", range: "$5,000 to $20,000+", body: "<strong>Cap-of-court awards.</strong> Major financial entanglement (down payments, joint property) with strong documentation.", tier: "high" },
    ],
  },

  stateSection: null,

  alternatives: {
    h2: { pre: "What are the ", em: "alternatives", post: " to small claims?" },
    lede: "Demand letter often resolves cleanly. Family court if married or with kids.",
    cards: [
      { title: "Demand letter alone", pillLabel: "Free, low-friction", pillTier: "primary", whenItFits: "documented financial entanglement. Most exes pay or counter-offer to cut ties cleanly.", tradeoff: "no enforcement if ex ignores." },
      { title: "Family court (if married)", pillLabel: "For property division", pillTier: "warn", whenItFits: "you were married or had children together. Family court has jurisdiction over property division and may absorb the loan dispute.", tradeoff: "longer process. Different judges and procedures." },
      { title: "Small claims (this guide)", pillLabel: "Best for cohabitation cases", pillTier: "good", whenItFits: "no marriage, no kids, financial entanglement only. Damages within your state's cap.", tradeoff: "30 to 90 day timeline. Clean separation of legal issues." },
    ],
  },

  cta: {
    h2: { pre: "Recover what's ", em: "owed after the split", post: "." },
    body: "Most ex disputes settle once a demand letter arrives. Our generator builds yours in under two minutes.",
    receipt: { label: "example · post-breakup recovery", items: [
      { label: "Loans + paid expenses", amount: "$4,000" },
      { label: "Pre-judgment interest", amount: "+ $600" },
      { label: "Filing fee", amount: "+ $200" },
    ], total: "$4,800", totalLabel: "Total claim", note: "Illustrative. Long relationships with major joint expenses push higher." },
  },

  faqs: [
    { q: "Can I sue an ex for money I gave them during the relationship?", a: "Yes, when documented as a loan rather than gift. Bank memos with 'loan' or 'pay back' designations, texts about repayment, or written agreements all support recovery. Without documentation, the gift defense usually wins." },
    { q: "What about joint expenses I paid alone?", a: "Recoverable under unjust enrichment when the relationship ended without resolving. The ex received the benefit (housing, utilities, transportation) without paying their share. State law varies; most allow recovery for documented overpayments." },
    { q: "Should I file in small claims or family court?", a: "If you were married or had children, family court has jurisdiction over property division and may absorb the financial dispute. If pure cohabitation (no marriage, no kids), small claims is appropriate. The cleanest case for small claims is documented loans separate from joint property." },
    { q: "What about an engagement ring?", a: "Most states treat engagement rings as 'conditional gifts': the ring returns to the giver if the engagement is broken, regardless of fault. Some states (Montana, others) treat the ring as a gift once given. Check your state law." },
    { q: "How long do I have to sue?", a: "Oral contracts: 2 to 4 years. Written contracts: 4 to 6 years. Unjust enrichment: usually 4 years. The clock typically starts on the breakup date or first demand for repayment." },
    { q: "What if my ex moved to another state?", a: "Sue in the state where the ex lives. Filing in your home state when the ex is out-of-state often results in jurisdiction problems. The court must have authority over the defendant; that usually requires defendant to live in the state." },
    { q: "What if the ex disputes the amounts?", a: "Bank records and Venmo screenshots are decisive. The ex's later recollection rarely overcomes contemporaneous documentation. Bring receipts to the hearing and walk through each transaction." },
  ],

  relatedSlugs: ["friend-not-paying-back", "family-member", "someone-owes-me-money", "iou", "verbal-agreement", "unpaid-debt-no-contract"],
};
