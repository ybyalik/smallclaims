import type { PersonalLoanIssue } from "./types";

export const unpaidDebtNoContract: PersonalLoanIssue = {
  slug: "unpaid-debt-no-contract",
  ready: true,
  short: "Unpaid debt no contract",
  breadcrumbLabel: "Unpaid Debt No Contract",

  meta: {
    title: "Can I Sue for Unpaid Debt Without a Contract? Small Claims Guide",
    description:
      "Plain-English guide to recovering money owed without a formal contract. Unjust enrichment, promissory estoppel, course of dealing, and a demand-letter template.",
  },

  hero: {
    eyebrowSuffix: "Unpaid debt no contract",
    h1: { pre: "Can I sue someone for ", em: "unpaid debt without a contract", post: "?" },
    leadStrong: "Yes. Unjust enrichment and promissory estoppel are alternative legal theories.",
    leadBody:
      " Even without a formal contract, you can recover money owed under three theories: (1) unjust enrichment (the borrower received a benefit at your expense and it would be unfair for them to keep it without paying); (2) promissory estoppel (you relied on their promise to your detriment); (3) course of dealing (your prior transactions establish a pattern). The proof is harder than a contract case but the recovery is the same. Documentation of the transfer plus the borrower's understanding of the obligation is the spine.",
  },

  counter: {
    amount: 8800,
    meta: "Unjust enrichment / promissory estoppel",
    rows: [
      { label: "Original transfer", value: "$8,000" },
      { label: "Pre-judgment interest", value: "+ $600", emphasis: "accent" },
      { label: "Filing fee", value: "$200", emphasis: "muted" },
    ],
    footer: "Sample · within most state small-claims caps",
  },

  whatCounts: {
    h2: { pre: "What can you ", em: "recover without a contract", post: "?" },
    lede: "Four legal theories work even without a signed agreement.",
    cards: [
      { num: "01", title: "Unjust enrichment", body: "Borrower received money or services at your expense and it would be unfair for them to keep without paying. Doesn't require explicit agreement, just unjust retention. Most common theory in informal cases." },
      { num: "02", title: "Promissory estoppel", body: "Borrower made a clear promise; you relied on it; you suffered detriment as a result. Even without a formal contract, the broken promise creates liability. Useful when oral agreements are disputed." },
      { num: "03", title: "Course of dealing", body: "Your prior transactions with the borrower establish a pattern. Repeated similar exchanges with consistent repayment terms create implied contract. Each subsequent exchange follows the established pattern." },
      { num: "04", title: "Quantum meruit (services)", body: "If you provided services rather than money, you can recover the reasonable value of services rendered. Common for freelance work without written contracts. Courts use industry rates to set value." },
    ],
    note: { strongIntro: "Documentation matters more than the legal theory.", rest: " The court usually applies whichever theory fits the facts. Your job is to document the transfer and the borrower's understanding. Whether it's called 'unjust enrichment' or 'breach of implied contract' is the court's framing; the evidence requirements are similar." },
  },

  claim: {
    h2: { pre: "How much can you ", em: "claim", post: "?" },
    lede: "The amount transferred plus pre-judgment interest plus filing fees.",
    layers: [
      { tag: "Layer 1", title: "Original amount transferred", body: "Bank transfer record, business invoice, or receipts for services rendered. The transfer itself is the foundation.", amount: "$8,000" },
      { tag: "Layer 2", title: "Pre-judgment interest", body: "State legal rate (7 to 10 percent per year) running from the transfer date or first demand.", amount: "+ $600", accent: true },
      { tag: "Layer 3", title: "Filing fees, post-judgment interest", body: "Filing fee (often higher for larger claims), service-of-process cost, post-judgment interest until paid.", amount: "+ $200" },
    ],
    total: { label: "Sample total within small-claims cap", body: "$8,000 transfer plus pre-judgment interest, plus filing fee.", amount: "$8,800", sublabel: "illustrative · varies by state and term" },
  },

  demand: {
    h2: { pre: "Send a ", em: "demand letter", post: " first." },
    lede: "Demand letters work especially well for no-contract cases because the alternative theories (unjust enrichment, promissory estoppel) are less familiar to most borrowers. The letter educates them about the legal exposure.",
    checklist: [
      "Detailed timeline of the transfer or services",
      "Bank record or invoice",
      "Texts, emails, or witness testimony establishing the borrower's understanding",
      "The legal theory you're relying on (unjust enrichment, promissory estoppel)",
      "Pre-judgment interest calculation",
      "A 14-day deadline before you file",
      "Sent certified mail",
    ],
    letter: {
      certifiedNum: "7019 0140 0001 4827 3617",
      date: "May 5, 2026",
      recipientName: "Jordan Borrower",
      recipientAddress: "1424 Maple Lane, Phoenix, AZ 85003",
      reLine: "Demand for Repayment of $8,000 Advance from August 14, 2024",
      bodyParagraphs: [
        "On August 14, 2024, I transferred $8,000 to you to cover the down payment on your new car. We did not have a written contract, but our text exchange (attached) establishes your understanding that the money was a loan and would be repaid as soon as your tax refund arrived in 2025. Your tax refund arrived in May 2025; you have not repaid any portion.",
        "Under the doctrines of <strong>unjust enrichment</strong> and <strong>promissory estoppel</strong>, you are obligated to repay. I demand within <strong>fourteen (14) days</strong>:",
      ],
      demandList: [
        "Repayment of <strong>$8,000</strong> in advance;",
        "Pre-judgment interest at 10 percent per year for 1.5 years (<strong>$600</strong>).",
      ],
      closingLine: "Total demand: <strong>$8,600.00</strong>. If unresolved, I will file in Small Claims Court.",
      signatory: "Reese Q. Lender",
    },
  },

  fileSteps: {
    h2: { pre: "How to ", em: "file", post: " a no-contract case." },
    lede: "Four steps. Stitching together evidence under a recognized legal theory is the case.",
    steps: [
      { title: "Identify the legal theory", body: "Unjust enrichment (most common): the borrower received money and it would be unfair to keep without paying. Promissory estoppel: they promised to repay and you relied on it. Course of dealing: prior transactions establish the pattern." },
      { title: "Document everything", body: "Bank records, texts, emails, witness statements. Even casual references to the money in subsequent communications support the case." },
      { title: "Send certified-mail demand", body: "Cite the legal theory specifically. Many borrowers settle once they realize the law has names for what they did." },
      { title: "File in small claims", body: "If demand fails, file. Filing fees usually run $30 to $200. Lead with the theory and the documented transfer." },
    ],
    aftermath: { tag: "After you win", title: "Collecting on a no-contract judgment.", bodyHtml: "Money judgments enforce via <strong>judgment lien</strong>, <strong>bank levy</strong>, and <strong>writ of execution</strong>. No-contract judgments enforce identically to written-contract judgments once entered." },
  },

  evidence: {
    h2: { pre: "What evidence do you need ", em: "without a contract", post: "?" },
    lede: "Bank records, texts, and circumstantial evidence under unjust-enrichment theory.",
    cells: [
      { kind: "letter", tag: "Bank transfer", letterhead: "Wells Fargo · Wire transfer record", date: "August 14, 2024", recipientName: "Reese Lender", reLine: "$8,000 wire to Jordan Borrower", bodyParagraphs: [
        "Outgoing wire to Jordan Borrower, account 5678.",
        "Memo: 'Down payment advance per text — repay 2025'",
        "Confirmed 08/15/2024.",
      ], signatory: "Bank record", signatoryTitle: "Wells Fargo statement" },
      { kind: "texts", tag: "Borrower's understanding", texts: [
        { dir: "in", text: "Hey, can you spot me $8k for the car down payment? I'll pay back when my tax refund hits next year." },
        { dir: "out", text: "Yes, sending tomorrow morning. Refund usually March-April for you, right?" },
        { dir: "in", text: "Yes. Will pay back in full as soon as it lands. Thank you so much." },
      ] },
      { kind: "handbook", tag: "Unjust enrichment doctrine", documentTitle: "Restatement (Third) of Restitution · § 1", sectionTitle: "Unjust enrichment doctrine", bodyParagraphs: [
        "A person who is unjustly enriched at the expense of another is subject to liability in restitution.",
        "Unjust enrichment may arise from the conferring of a benefit by mistake, fraud, or other circumstance making it unjust for the recipient to retain.",
      ], highlight: "Borrower received $8,000, used it for car, never repaid. Retention is unjust without payment.", footer: "Restitution doctrine · adopted by most state courts" },
      { kind: "receipt", tag: "Demand sent", vendor: "USPS CERTIFIED MAIL", vendorAddr: "Phoenix Branch", receiptNum: "Cert #7019 0140 0001 4827 3617", date: "04/15/2026", lineItems: [
        { label: "Certified mail with return receipt", amount: "$8.45" },
        { label: "Demand for $8,600", amount: "(included)" },
      ], subtotal: "$8.45", total: "$8.45", footer: "Return receipt confirmed" },
    ],
  },

  defenses: {
    h2: { pre: "Common borrower ", em: "defenses", post: ", with rebuttals." },
    lede: "Three arguments cover most no-contract cases.",
    items: [
      { quote: "Without a contract, you can't sue.", pill: "Most common", rebuttal: "<strong>Rebuttal:</strong> wrong. Unjust enrichment, promissory estoppel, and quantum meruit are all alternative legal theories that don't require a formal contract. Cite the specific theory in the demand letter." },
      { quote: "It was a gift.", pill: "Gift defense", rebuttal: "<strong>Rebuttal:</strong> bring the texts. The borrower's own words about repayment ('will pay back', 'as soon as my refund hits') overcome the gift defense. Unjust enrichment also rebuts gift presumption when retention is unjust." },
      { quote: "I never promised a specific repayment date.", pill: "No terms", rebuttal: "<strong>Rebuttal:</strong> if no specific date, courts use 'reasonable time'. After 1 to 2 years, demand becomes reasonable. Promissory estoppel applies even to general promises." },
    ],
  },

  outcomes: {
    h2: { pre: "How much do lenders ", em: "actually recover", post: "?" },
    lede: "No-contract cases recover when documentation is strong.",
    bands: [
      { label: "Low", range: "$300 to $2,000", body: "<strong>Partial recovery.</strong> Court awards portion when documentation is weak or competing theories complicate.", tier: "low" },
      { label: "Mid", range: "$2,000 to $8,000", body: "<strong>Full principal + interest.</strong> Most common when bank records and borrower's own words establish the unjust enrichment.", tier: "mid" },
      { label: "High", range: "$8,000 to $20,000+", body: "<strong>Cap-of-court awards.</strong> Larger no-contract advances with strong documentation push to cap.", tier: "high" },
    ],
  },

  stateSection: null,

  alternatives: {
    h2: { pre: "What are the ", em: "alternatives", post: " to small claims?" },
    lede: "Demand letter is the lowest-friction path. Mediation works for relationship-preservation cases.",
    cards: [
      { title: "Demand letter alone", pillLabel: "Free, educational", pillTier: "primary", whenItFits: "documented advance with the borrower's understanding. Many borrowers settle once they understand the legal theories.", tradeoff: "no enforcement if borrower ignores." },
      { title: "Mediation", pillLabel: "Preserve relationships", pillTier: "good", whenItFits: "personal relationships you want to maintain. Community mediation centers offer services for $50 to $200.", tradeoff: "no enforcement; only effective if borrower participates." },
      { title: "Small claims (this guide)", pillLabel: "Reliable enforced recovery", pillTier: "warn", whenItFits: "demand letter failed. Damages within your state's cap. The unjust-enrichment theory applies.", tradeoff: "30 to 90 day timeline." },
    ],
  },

  cta: {
    h2: { pre: "Recover the ", em: "advance", post: "." },
    body: "Most no-contract cases settle once a demand letter cites the legal theory. Our generator builds yours in under two minutes.",
    receipt: { label: "example · informal advance", items: [
      { label: "Original transfer", amount: "$8,000" },
      { label: "Pre-judgment interest", amount: "+ $600" },
      { label: "Filing fee", amount: "+ $200" },
    ], total: "$8,800", totalLabel: "Total claim", note: "Illustrative. Larger advances push to small-claims cap." },
  },

  faqs: [
    { q: "Can I sue someone for money I gave them without a contract?", a: "Yes. Unjust enrichment, promissory estoppel, and quantum meruit are alternative legal theories that don't require a formal contract. The borrower's understanding of the obligation (from texts, emails, or course of dealing) is the central evidence." },
    { q: "What is unjust enrichment?", a: "A common-law doctrine that prevents a person from keeping money or benefits received at another's expense when retention would be unfair. Most state courts recognize it. Common in informal financial relationships." },
    { q: "What is promissory estoppel?", a: "A doctrine that enforces promises when the promisee reasonably relied on them to their detriment. Even without a formal contract, the broken promise creates liability for the resulting loss." },
    { q: "How do I prove unjust enrichment?", a: "Bank record showing the transfer plus evidence of the borrower's understanding (texts, emails, witness testimony). The borrower's subsequent retention of the benefit without payment establishes 'unjust' retention." },
    { q: "What if I provided services instead of money?", a: "Quantum meruit applies. You can recover the reasonable value of services rendered. Courts use industry rates to set value. Common for freelance work without written contracts." },
    { q: "How long do I have to sue?", a: "Unjust enrichment and quasi-contract claims usually run 3 to 4 years. Promissory estoppel runs on the underlying promise's clock (often 2 to 4 years). State law varies; check your specific deadline." },
    { q: "Will the court take this seriously without a contract?", a: "Yes. Unjust-enrichment cases are common in small-claims and standard in higher courts too. The theories are well-established. The challenge is documentation, not legal recognition." },
  ],

  relatedSlugs: ["someone-owes-me-money", "verbal-agreement", "iou", "cash-loan", "friend-not-paying-back", "family-member"],
};
