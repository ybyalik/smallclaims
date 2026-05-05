import type { ContractorIssue } from "./types";

export const handymanBadWork: ContractorIssue = {
  slug: "handyman-bad-work",
  ready: true,
  short: "Handyman bad work",
  breadcrumbLabel: "Handyman Bad Work",

  meta: {
    title: "Can I Sue a Handyman for Bad Work? Small Claims Guide",
    description:
      "Plain-English guide to suing a handyman for defective work. Why most handymen are unlicensed (and why that often helps you), the cost-to-redo math, and a demand-letter template.",
  },

  hero: {
    eyebrowSuffix: "Handyman bad work",
    h1: { pre: "Can I sue a handyman for ", em: "bad work", post: "?" },
    leadStrong: "Yes, and most handymen are unlicensed, which often helps your case.",
    leadBody:
      " Most states require licenses for jobs above a dollar threshold (California: $500, Florida: many trades). Handymen often work below that threshold or work without a license at all. That sometimes lets you recover every dollar paid, regardless of work quality. Below the threshold, the implied warranty of workmanlike construction still applies and you can recover the cost to redo defective work.",
  },

  counter: {
    amount: 2400,
    meta: "Implied warranty + unlicensed status",
    rows: [
      { label: "Original payment", value: "$1,200" },
      { label: "Cost to redo (replacement quote)", value: "+ $1,000", emphasis: "accent" },
      { label: "Filing fee + interest", value: "$200", emphasis: "muted" },
    ],
    footer: "Sample · within most state small-claims caps",
  },

  whatCounts: {
    h2: { pre: "When can you sue a ", em: "handyman", post: "?" },
    lede:
      "Four common scenarios. Each one is its own claim. Many handyman cases stack two: defective work plus unlicensed status.",
    cards: [
      {
        num: "01",
        title: "Job above the licensing threshold",
        body:
          "If the handyman charged more than your state's small-job exemption (California: $500 including labor and materials), they needed a contractor license. Without one, most states forbid them from enforcing the contract or keeping payment. California's § 7031 lets you recover every dollar paid.",
      },
      {
        num: "02",
        title: "Defective work below the threshold",
        body:
          "Even on small jobs that did not require a license, the implied warranty of workmanlike construction still applies. The work has to meet the standard of competent practice in the trade. Defective work lets you recover the cost to redo.",
      },
      {
        num: "03",
        title: "Damage caused by the work",
        body:
          "If the handyman damaged something while working (broke a sink, cracked a tile, ruined a fixture), you can recover the repair or replacement cost. Negligence, separate from any workmanship issue.",
      },
      {
        num: "04",
        title: "Took a deposit without doing the work",
        body:
          "Common with handymen working below the licensing threshold. You paid for materials or a deposit, they took the money and did not deliver. Conversion or theft, plus breach of contract. State consumer-protection laws often add multipliers.",
      },
    ],
    note: {
      strongIntro: "Check the licensing threshold in your state.",
      rest:
        " California: jobs over $500 (labor and materials combined) require a license. Florida: specific trades (electrical, plumbing) require licenses regardless of size. Texas: most general handyman work is unregulated. Search your state's contractor licensing board website for the small-job exemption.",
    },
  },

  claim: {
    h2: { pre: "How much can you ", em: "recover", post: "?" },
    lede:
      "Cost to redo is the floor. Original payment is recoverable when the handyman was unlicensed for the job. Damage repairs stack on top.",
    layers: [
      {
        tag: "Layer 1",
        title: "Original payment (when unlicensed)",
        body:
          "If the handyman needed a license and did not have one, you can recover what you paid. California (Bus & Prof Code § 7031) lets you recover every dollar regardless of work quality. Other states have similar rules.",
        amount: "$1,200",
      },
      {
        tag: "Layer 2",
        title: "Cost to redo defective work",
        body:
          "Quote from a licensed contractor to demo what is wrong and redo it correctly. Even on small jobs, the cost to fix often exceeds the original payment.",
        amount: "+ $1,000",
        accent: true,
      },
      {
        tag: "Layer 3",
        title: "Filing fees, statutory damages, interest",
        body:
          "Filing fee, service-of-process cost, and pre-judgment interest at your state's legal rate. Some state consumer-protection laws add multipliers for unlicensed work.",
        amount: "+ $200",
      },
    ],
    total: {
      label: "Sample total within small-claims cap",
      body:
        "Original $1,200 paid, cost-to-redo $1,000 from replacement quote, plus filing fee.",
      amount: "$2,400",
      sublabel: "illustrative · varies by state and licensing status",
    },
  },

  demand: {
    h2: { pre: "Send a ", em: "demand letter", post: " first." },
    lede:
      "Handyman cases settle quickly when the demand letter cites the licensing threshold and quotes the recovery statute. Most handymen do not want to litigate against their own unlicensed status.",
    checklist: [
      "The job description and original price",
      "Photos showing the defects or damage",
      "Whether the handyman is licensed (or note that they are not)",
      "Cost-to-redo quote from a replacement",
      "Citation of the licensing threshold and recovery statute (if applicable)",
      "A 14-day deadline before you file",
      "Sent certified mail with return receipt",
    ],
    letter: {
      certifiedNum: "7019 0140 0001 4827 3584",
      date: "May 5, 2026",
      recipientName: "Handy Bob's Repairs",
      recipientAddress: "82 Walnut Street, Sacramento, CA 95816",
      reLine: "Demand for Refund and Cost-to-Redo, Bathroom Repair on March 22, 2026",
      bodyParagraphs: [
        "On March 22, 2026, I paid you $1,200 to repair a leaky shower and replace the vanity. The job total exceeded California's $500 small-job exemption, but you do not hold a contractor license (verified through the CSLB). The new vanity is installed crookedly with visible gaps, and the shower is leaking again two weeks later.",
        "Per <strong>California Bus & Prof Code § 7031</strong>, an unlicensed contractor cannot collect any payment for a job that required a license. I demand within <strong>fourteen (14) days</strong>:",
      ],
      demandList: [
        "Refund of the full <strong>$1,200</strong> paid;",
        "Reimbursement of <strong>$1,000</strong> from a licensed plumber to redo the work (quote attached).",
      ],
      closingLine:
        "Total demand: <strong>$2,200.00</strong>. If unresolved, I will file a complaint with the Contractors State License Board for unlicensed contracting and file in Small Claims Court.",
      signatory: "Casey Q. Homeowner",
    },
  },

  fileSteps: {
    h2: { pre: "How to ", em: "file", post: " a handyman case." },
    lede:
      "Four steps. The licensing threshold is the central legal point. Establish whether the job required a license first.",
    steps: [
      {
        title: "Verify license status",
        body:
          "Search your state contractor licensing board website (cslb.ca.gov, myfloridalicense.com, etc.). Print the search result. If the handyman has no license, that is a fact in your favor on jobs above the threshold.",
      },
      {
        title: "Get a replacement quote",
        body:
          "Hire a licensed contractor (in the relevant trade if applicable) for a written quote to redo the work. The quote becomes your damages figure.",
      },
      {
        title: "File a complaint with the contractor board",
        body:
          "If the handyman was unlicensed for a job that needed one, file an unlicensed-contracting complaint. State boards investigate and assess fines. The threat of a board investigation often produces a refund.",
      },
      {
        title: "File in small claims",
        body:
          "If the demand and board complaint do not resolve, file. Filing fees usually run $30 to $100. Lead with the licensing threshold, the work value, and the replacement quote.",
      },
    ],
    aftermath: {
      tag: "After you win",
      title: "Collecting from a handyman.",
      bodyHtml:
        "Many handymen are individuals without business assets, which makes collection harder than with corporate contractors. After 30 days post-judgment, the enforcement tools are a <strong>judgment lien</strong> on real estate, a <strong>bank levy</strong> on a personal account if you can identify it, and a <strong>writ of execution</strong> on tools and vehicles. A judgment also stays on the handyman&rsquo;s credit report.",
    },
  },

  evidence: {
    h2: { pre: "What evidence do you need to ", em: "sue a handyman", post: "?" },
    lede:
      "Cases like this turn on photos, the original payment receipt, and proof the handyman was unlicensed for a job that needed a license.",
    cells: [
      {
        kind: "photos",
        tag: "Defective work",
        photos: [
          { id: "1581094271901-8022df4466f9", cap: "Crooked vanity install" },
          { id: "1556909114-f6e7ad7d3136", cap: "Visible gap behind" },
          { id: "1581092335397-9583eb92d232", cap: "Shower still leaking" },
          { id: "1503602642458-232111445657", cap: "Water damage to floor" },
        ],
      },
      {
        kind: "texts",
        tag: "Hiring exchange",
        texts: [
          { dir: "out", text: "Quoted the bath job at $1,200 total. Cash or Venmo. Will start Saturday." },
          { dir: "in", text: "Sounds good. You have a license? Just checking." },
          { dir: "out", text: "I do this kind of small stuff all the time, no license needed." },
        ],
      },
      {
        kind: "handbook",
        tag: "Recovery statute",
        documentTitle: "California Bus & Prof Code · § 7031(b)",
        sectionTitle: "Unlicensed contractor recovery",
        bodyParagraphs: [
          "A person who utilizes the services of an unlicensed contractor may bring an action in any court of competent jurisdiction in this state to recover all compensation paid to the unlicensed contractor for performance of any act or contract.",
        ],
        highlight:
          "Recovery applies regardless of work quality. The statute is automatic on jobs above the $500 threshold.",
        footer: "Print the CSLB search result confirming no license",
      },
      {
        kind: "receipt",
        tag: "Replacement quote",
        vendor: "ANYTOWN PLUMBING · License #38291",
        vendorAddr: "License verified · Sacramento, CA",
        receiptNum: "Quote #2026-08",
        date: "04/15/2026",
        lineItems: [
          { label: "Remove and reinstall vanity", amount: "$400.00" },
          { label: "Diagnose and repair shower leak", amount: "$450.00" },
          { label: "Materials (sealant, fittings)", amount: "$150.00" },
        ],
        subtotal: "$1,000.00",
        total: "$1,000.00",
        footer: "Cost to redo from licensed replacement",
      },
    ],
  },

  defenses: {
    h2: { pre: "Common handyman ", em: "defenses", post: ", with rebuttals." },
    lede:
      "Three arguments cover most handyman cases. Each has a clean rebuttal once licensing is on the table.",
    items: [
      {
        quote: "I told you I was a handyman, not a contractor.",
        pill: "Most common",
        rebuttal:
          "<strong>Rebuttal:</strong> the licensing threshold is statutory. Either the job needed a license or it did not. The handyman's self-description does not control. If the job exceeded your state's threshold (often $500), they needed a license regardless of what they call themselves.",
      },
      {
        quote: "You agreed to the price knowing the work was as-is.",
        pill: "Acceptance",
        rebuttal:
          "<strong>Rebuttal:</strong> the implied warranty of workmanlike construction applies regardless of what you agreed to verbally. Most state consumer-protection laws prohibit waiving the warranty by handshake. The work still has to meet the standard of competent practice.",
      },
      {
        quote: "The job was simple. The damage was your fault.",
        pill: "Misuse",
        rebuttal:
          "<strong>Rebuttal:</strong> bring the replacement contractor's report identifying the defect's actual cause (improper installation, missing seal, wrong fastener). The replacement contractor is a neutral expert and their explanation usually wins.",
      },
    ],
  },

  outcomes: {
    h2: { pre: "How much do homeowners ", em: "actually win", post: "?" },
    lede:
      "Typical recovery in handyman small-claims cases. Strength depends on whether the job needed a license.",
    bands: [
      {
        label: "Low",
        range: "$200 to $1,000",
        body:
          "<strong>Partial refund or fix-and-patch.</strong> Common when the job was below the licensing threshold and the defect is contained. Court awards partial refund.",
        tier: "low",
      },
      {
        label: "Mid",
        range: "$1,000 to $3,500",
        body:
          "<strong>Refund plus cost-to-redo.</strong> Most common when unlicensed work is established and replacement quotes are clean.",
        tier: "mid",
      },
      {
        label: "High",
        range: "$3,500 to $10,000+",
        body:
          "<strong>Full unlicensed-contractor recovery.</strong> States like California allow full clawback of payment regardless of work value. Pair with damage costs for cap-of-the-court awards.",
        tier: "high",
      },
    ],
  },

  stateSection: null,

  alternatives: {
    h2: { pre: "What are the ", em: "alternatives", post: " to small claims?" },
    lede:
      "Handyman cases have fewer out-of-court options than licensed-contractor cases because most handymen are not licensed and not bonded. Small claims is often the main path.",
    cards: [
      {
        title: "Contractor licensing board complaint",
        pillLabel: "Free, regulatory",
        pillTier: "good",
        whenItFits:
          "the handyman was unlicensed for a job that needed a license. State boards investigate unlicensed contracting and assess fines. The fines are paid to the state, not to you, but the threat often produces a refund.",
        tradeoff:
          "the board does not order restitution to you in unlicensed cases the same way it does for licensed contractors.",
      },
      {
        title: "State consumer-protection bureau",
        pillLabel: "Free, restitution-oriented",
        pillTier: "good",
        whenItFits:
          "your state attorney general or consumer protection agency takes complaints against unlicensed contractors and home-repair fraud. Some pursue restitution.",
        tradeoff:
          "case-by-case. Most agencies pursue patterns of fraud rather than individual disputes.",
      },
      {
        title: "Small claims (this guide)",
        pillLabel: "Best for individual recovery",
        pillTier: "primary",
        whenItFits:
          "you want a money judgment for the refund and the cost-to-redo. Damages within your state's cap.",
        tradeoff:
          "30 to 90 day timeline. Filing fee $30 to $100. Collection from a no-asset handyman can be hard.",
      },
    ],
  },

  cta: {
    h2: { pre: "Recover the ", em: "refund and the redo", post: "." },
    body:
      "Demand letters that cite the licensing threshold and the recovery statute usually get a fast refund offer. Our generator builds yours in under two minutes.",
    receipt: {
      label: "example · unlicensed handyman",
      items: [
        { label: "Original payment", amount: "$1,200" },
        { label: "Cost to redo (licensed)", amount: "+ $1,000" },
        { label: "Filing fee + interest", amount: "+ $200" },
      ],
      total: "$2,400",
      totalLabel: "Total claim",
      note: "Illustrative. California's full recovery rule can push the figure higher when paired with damage costs.",
    },
  },

  faqs: [
    {
      q: "What is the licensing threshold for handyman work?",
      a: "It varies by state. California: jobs over $500 (labor and materials combined) require a contractor license. Florida: specific trades (electrical, plumbing, HVAC) require a license regardless of size. Texas: most general handyman work is unregulated. Search your state's contractor licensing board for the exact threshold.",
    },
    {
      q: "Can I sue if I knew the handyman was unlicensed?",
      a: "Yes. The licensing rule protects consumers, and the protection cannot be waived by knowingly hiring an unlicensed worker. California (Bus & Prof Code § 7031) explicitly allows recovery 'regardless of the merits of the cause of action.' The unlicensed-recovery rule is automatic.",
    },
    {
      q: "Are handyman cases worth the filing fee?",
      a: "Yes if the original payment was over $400 to $500. Filing fees run $30 to $100, and recovery often includes the original payment plus cost-to-redo. Smaller jobs may not be worth the filing fee, but pair with a contractor-board complaint as a no-cost pressure point.",
    },
    {
      q: "What if the handyman is in the country illegally and won't show up?",
      a: "Immigration status does not affect the case. You can still get a default judgment if the handyman is properly served and does not appear. Collection on a default judgment can be hard if the handyman has no documented assets, but the judgment itself is good for 10+ years and accrues interest.",
    },
    {
      q: "Can I recover what I paid in cash?",
      a: "Yes, but you need to prove the payment. Bank withdrawal slips dated near the payment, ATM receipts, text messages confirming the price, photos of the cash being handed over (Venmo screenshots especially). Cash payments are recoverable; they just need additional proof.",
    },
    {
      q: "How long do I have to sue?",
      a: "Breach of contract claims usually run 3 to 6 years. Unlicensed-contractor recovery statutes typically run 1 to 4 years from the date of payment. State consumer-protection claims often have shorter windows. Move fast and check your state.",
    },
    {
      q: "What if the handyman is uninsured and uncollectable?",
      a: "Collection from no-asset handymen is the realistic limit on recovery. The judgment is still worth pursuing because it appears on credit reports, blocks future loans, and accrues interest. Some homeowners pair the judgment with a contractor-board complaint that prevents the handyman from getting licensed in the future.",
    },
  ],

  relatedSlugs: [
    "deposit-and-disappearing",
    "unfinished-work",
    "poor-workmanship",
    "damaged-house",
    "plumber-damage",
    "painter-damage",
  ],
};
