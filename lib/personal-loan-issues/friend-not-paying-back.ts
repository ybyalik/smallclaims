import type { PersonalLoanIssue } from "./types";

export const friendNotPayingBack: PersonalLoanIssue = {
  slug: "friend-not-paying-back",
  ready: true,
  short: "Friend not paying back",
  breadcrumbLabel: "Friend Not Paying Back",

  meta: {
    title: "Can I Sue a Friend for Not Paying Me Back? Small Claims Guide",
    description:
      "Plain-English guide to suing a friend for an unpaid loan. Texts and Venmo records as evidence, the gift vs loan defense, and a demand-letter template.",
  },

  hero: {
    eyebrowSuffix: "Friend won't pay back",
    h1: { pre: "Can I sue a friend for ", em: "not paying me back", post: "?" },
    leadStrong: "Yes, even when there's no written contract.",
    leadBody:
      " Friend loans are usually informal: a Venmo or Zelle transfer with a 'pay you back' text, no signed agreement. The good news: the texts and the transfer record are enough evidence in most cases. The bad news: the friendship usually does not survive the lawsuit. Most cases settle once a demand letter arrives. The hardest part is deciding to file at all.",
  },

  counter: {
    amount: 3200,
    meta: "Oral contract / unjust enrichment",
    rows: [
      { label: "Original loan", value: "$2,500" },
      { label: "Pre-judgment interest (2 years)", value: "+ $500", emphasis: "accent" },
      { label: "Filing fee", value: "$200", emphasis: "muted" },
    ],
    footer: "Sample · within most state small-claims caps",
  },

  whatCounts: {
    h2: { pre: "When does a friend's debt ", em: "become a lawsuit", post: "?" },
    lede: "Four common patterns. Each is recoverable when documented.",
    cards: [
      { num: "01", title: "Loan via Venmo, Zelle, or Cash App", body: "The transfer note often says 'loan' or 'pay back'. The platform record plus follow-up texts establish the agreement. Most informal friend loans are this pattern." },
      { num: "02", title: "Cash loan with text confirmation", body: "Cash exchange followed by a text message confirming the amount and repayment terms. The text alone establishes the contract. Even short messages ('thanks for the $500, will pay back next month') count." },
      { num: "03", title: "You paid for something on their behalf", body: "Concert tickets, vacation deposit, restaurant bill, joint Uber. They said they'd pay you back later. Common with split expenses. Recovery under unjust enrichment when explicit agreement is light." },
      { num: "04", title: "Pattern of unpaid 'I'll get the next one'", body: "Repeated patterns where the friend always promised to repay and never did. Cumulative pattern can support recovery for multiple amounts. Each transaction is its own claim with its own clock." },
    ],
    note: { strongIntro: "The friendship is usually over.", rest: " Honest assessment: most lawsuits between friends end the friendship. If preserving the relationship matters more than the money, mediation or simply walking away may be the better path. If the money matters more (or the friendship was already strained), the lawsuit is straightforward to file." },
  },

  claim: {
    h2: { pre: "How much can you ", em: "claim", post: "?" },
    lede: "Original principal plus pre-judgment interest plus filing fees.",
    layers: [
      { tag: "Layer 1", title: "Original loan amount", body: "Venmo/Zelle/Cash App receipts, bank transfer record, or witness testimony for cash. The platform records are the cleanest evidence.", amount: "$2,500" },
      { tag: "Layer 2", title: "Pre-judgment interest", body: "Most states allow pre-judgment interest at the legal rate (7 to 10 percent per year) running from the agreed repayment date or the date you first demanded.", amount: "+ $500", accent: true },
      { tag: "Layer 3", title: "Filing fees, post-judgment interest", body: "Filing fee, service-of-process cost, post-judgment interest until paid.", amount: "+ $200" },
    ],
    total: { label: "Sample total within small-claims cap", body: "$2,500 friend loan plus 2 years of pre-judgment interest, plus filing fee.", amount: "$3,200", sublabel: "illustrative · varies by state and term" },
  },

  demand: {
    h2: { pre: "Send a ", em: "demand letter", post: " first." },
    lede: "Demand letters work especially well with friends because the formality signals that the relationship is on the line. Most pay quickly to avoid the hearing.",
    checklist: [
      "Date and amount of each loan",
      "Venmo/Zelle/Cash App or bank record",
      "Texts confirming the loan and terms",
      "Any prior demands or partial payments",
      "Pre-judgment interest calculation",
      "A 14-day deadline before you file",
      "Sent certified mail",
    ],
    letter: {
      certifiedNum: "7019 0140 0001 4827 3611",
      date: "May 5, 2026",
      recipientName: "Jordan Friend",
      recipientAddress: "1424 Maple Lane, Phoenix, AZ 85003",
      reLine: "Demand for Repayment of $2,500 Loan from March 14, 2024",
      bodyParagraphs: [
        "On March 14, 2024, you sent me a Venmo request asking me to send $2,500 'for rent, will pay back in a month' (screenshot attached). I sent the funds the same day. Two years and two months have passed without any repayment. I have asked verbally on multiple occasions and via text on March 18, May 22, August 14, and November 8, 2024 (screenshots attached).",
        "I demand within <strong>fourteen (14) days</strong>:",
      ],
      demandList: [
        "Repayment of <strong>$2,500</strong> in original loan;",
        "Pre-judgment interest at 10 percent per year for 2 years (<strong>$500</strong>).",
      ],
      closingLine: "Total demand: <strong>$3,000.00</strong>. If unresolved, I will file in Small Claims Court.",
      signatory: "Reese Q. Lender",
    },
  },

  fileSteps: {
    h2: { pre: "How to ", em: "file", post: " against a friend." },
    lede: "Four steps. The transfer record plus texts are the case.",
    steps: [
      { title: "Gather the digital evidence", body: "Screenshots of Venmo/Zelle/Cash App transactions. Texts about the loan and repayment. Bank records if traditional transfer. The transfer plus the agreement is the case." },
      { title: "Send certified-mail demand", body: "Certified-mail receipt creates the formal record. Most friends pay at this stage to avoid the lawsuit." },
      { title: "File in small claims", body: "If demand fails, file in the county where the friend lives. Filing fees usually run $30 to $100." },
      { title: "Hearing", body: "Lead with the transfer screenshots and texts. Hearings usually run 10 to 15 minutes." },
    ],
    aftermath: { tag: "After you win", title: "Collecting and the friendship.", bodyHtml: "Money judgments enforce via <strong>judgment lien</strong>, <strong>bank levy</strong>, and <strong>writ of execution</strong>. Wage garnishment is also available. The friendship usually does not survive the suit; budget for that emotionally before filing." },
  },

  evidence: {
    h2: { pre: "What evidence do you need to ", em: "sue a friend", post: "?" },
    lede: "Venmo/Zelle/Cash App screenshots plus follow-up texts are the case.",
    cells: [
      { kind: "letter", tag: "Venmo screenshot", letterhead: "Venmo · @reeselender", date: "March 14, 2024", recipientName: "Reese Lender", reLine: "Transaction record", bodyParagraphs: [
        "Sent: $2,500 to @jordanfriend",
        "Note: 'Loan for rent — pay back in 1 month per text'",
        "Status: Completed. Confirmed.",
      ], signatory: "Venmo platform record", signatoryTitle: "Transaction confirmed via Venmo" },
      { kind: "texts", tag: "Loan agreement texts", texts: [
        { dir: "in", text: "Hey Reese — short on rent. Can you spot me $2,500? I'll pay back in 30 days, promise." },
        { dir: "out", text: "Sending now via Venmo. Pay back by April 14." },
        { dir: "in", text: "Thank you so much. Will get it back to you ASAP." },
      ] },
      { kind: "handbook", tag: "Statute of limitations", documentTitle: "Arizona Revised Statutes · § 12-543", sectionTitle: "Oral contract / 3-year statute", bodyParagraphs: [
        "An action for relief from oral or unwritten contract shall be commenced and prosecuted within three years after the cause of action accrues.",
      ], highlight: "Loan due April 2024. 3-year statute runs April 2027. Within deadline.", footer: "Statute of limitations · oral contract" },
      { kind: "receipt", tag: "Demand sent", vendor: "USPS CERTIFIED MAIL", vendorAddr: "USPS · Phoenix Branch", receiptNum: "Cert #7019 0140 0001 4827 3611", date: "04/15/2026", lineItems: [
        { label: "Certified mail with return receipt", amount: "$8.45" },
        { label: "Demand letter for $3,000", amount: "(included)" },
      ], subtotal: "$8.45", total: "$8.45", footer: "Return receipt confirmed" },
    ],
  },

  defenses: {
    h2: { pre: "Common friend ", em: "defenses", post: ", with rebuttals." },
    lede: "Three arguments cover most friend cases.",
    items: [
      { quote: "It was a gift, not a loan.", pill: "Most common", rebuttal: "<strong>Rebuttal:</strong> bring the texts. The Venmo note 'pay back' or the text 'I'll pay back' from the borrower's own words decisively establishes loan vs. gift. Friends rarely send 'pay back' messages for gifts." },
      { quote: "I tried to pay back, but you refused.", pill: "Refused payment", rebuttal: "<strong>Rebuttal:</strong> bring the demand letter. Refusing payment is rare and easily disproven by the certified-mail demand. The court rarely accepts this defense without specific evidence of the refusal." },
      { quote: "We're friends. We help each other.", pill: "Mutual support", rebuttal: "<strong>Rebuttal:</strong> mutual support and informal help do not eliminate contract obligations. The texts establishing 'loan' and 'pay back' are decisive. The friend's understanding of the relationship is irrelevant to the legal question." },
    ],
  },

  outcomes: {
    h2: { pre: "How much do lenders ", em: "actually recover", post: "?" },
    lede: "Typical recovery ranges. Documentation strength drives the outcome.",
    bands: [
      { label: "Low", range: "$100 to $500", body: "<strong>Partial recovery.</strong> Court awards a portion when documentation is light or borrower's gift defense partially succeeds.", tier: "low" },
      { label: "Mid", range: "$500 to $3,000", body: "<strong>Full principal plus modest interest.</strong> Most common with Venmo/Zelle plus text evidence.", tier: "mid" },
      { label: "High", range: "$3,000 to $20,000+", body: "<strong>Cap-of-court awards.</strong> Larger loans or pattern of multiple loans pushed to cap. Rare for friend loans, more common for family.", tier: "high" },
    ],
  },

  stateSection: null,

  alternatives: {
    h2: { pre: "What are the ", em: "alternatives", post: " to small claims?" },
    lede: "Demand letter is the lowest-friction path. Mediation preserves the relationship.",
    cards: [
      { title: "Demand letter alone", pillLabel: "Free, low-friction", pillTier: "primary", whenItFits: "informal loan with platform records. Most friends pay within 14 days to avoid the lawsuit.", tradeoff: "no enforcement if borrower ignores." },
      { title: "Mediation", pillLabel: "Preserve the friendship", pillTier: "good", whenItFits: "you want recovery but care about the relationship. Community mediation centers offer services for $50 to $200.", tradeoff: "no enforcement; only effective if borrower participates." },
      { title: "Small claims (this guide)", pillLabel: "When demand fails", pillTier: "warn", whenItFits: "demand letter ignored. Damages within your state's cap.", tradeoff: "the friendship usually ends. Budget for that." },
    ],
  },

  cta: {
    h2: { pre: "Recover the ", em: "loan", post: "." },
    body: "Most friend loans settle once a demand letter arrives. Our generator builds yours in under two minutes.",
    receipt: { label: "example · friend Venmo loan", items: [
      { label: "Original loan", amount: "$2,500" },
      { label: "Pre-judgment interest", amount: "+ $500" },
      { label: "Filing fee", amount: "+ $200" },
    ], total: "$3,200", totalLabel: "Total claim", note: "Illustrative. Varies by amount, term, and documentation." },
  },

  faqs: [
    { q: "Can I sue a friend for a loan even without a written contract?", a: "Yes. Oral contracts and even informal agreements (texts, Venmo notes, witness testimony) are enforceable in most states. The Venmo note 'loan' or 'pay back' itself is enough evidence in most courts." },
    { q: "What if I lent cash with no platform record?", a: "Texts or witness testimony to the exchange substitute. Cash cases are harder but recoverable. The borrower's own words about repayment in any subsequent text are decisive." },
    { q: "How does the friend defend against this?", a: "Most common defense is 'it was a gift'. The texts establishing 'loan' or 'pay back' overcome this. Other defenses (refused payment, friendship implies forgiveness) rarely succeed." },
    { q: "Will the friendship survive?", a: "Usually no. Most lawsuits between friends end the friendship. Honest assessment before filing: if preserving the friendship matters more than the money, mediation or walking away may be better." },
    { q: "How long do I have to sue?", a: "Oral contracts: 2 to 4 years from the agreed repayment date. Written contracts: 4 to 6 years (some states up to 10). Most informal friend loans run on the oral contract clock." },
    { q: "Can I charge interest?", a: "Yes if agreed in advance. Without agreement, you can claim pre-judgment interest at the state legal rate (7 to 10 percent per year). This often adds substantial amounts to long-outstanding loans." },
    { q: "What if I'm friends with the borrower's family?", a: "The lawsuit is between you and the borrower. Other friends and family are not affected legally, but social fallout is common. Some lenders prefer mediation in family-adjacent friendships." },
  ],

  relatedSlugs: ["someone-owes-me-money", "family-member", "ex-or-after-breakup", "iou", "verbal-agreement", "cash-loan"],
};
