import type { LandlordIssue } from "./types";

export const securityDeposit: LandlordIssue = {
  slug: "security-deposit",
  ready: true,
  short: "Security deposit",
  breadcrumbLabel: "Security deposit",

  meta: {
    title: "How to Get Your Security Deposit Back From a Landlord",
    description:
      "Step by step guide to recovering your security deposit. State return deadlines, statutory damages of 2x or 3x in most states, demand-letter template, and how to file in small claims.",
  },

  hero: {
    eyebrowSuffix: "Security deposit",
    h1: { pre: "Can I sue my landlord for my ", em: "security deposit", post: "?" },
    leadStrong: "Yes, you can sue your landlord to get your security deposit back",
    leadBody:
      " if they miss the return deadline your state sets, usually 14 to 30 days after move-out. If they miss it or charge for normal wear and tear, you can sue for the deposit plus 2x or 3x statutory damages in most states, plus filing fees and (often) attorney fees. You do not need a lawyer.",
  },

  counter: {
    amount: 4500,
    meta: "CA · Civ. Code § 1950.5",
    rows: [
      { label: "Deposit", value: "$1,500" },
      { label: "2x penalty", value: "+ $3,000", emphasis: "accent" },
      { label: "Filing fee + interest", value: "$0", emphasis: "muted" },
    ],
    footer: "Bad-faith withholding · 21-day deadline passed",
  },

  whatCounts: {
    h2: { pre: "What counts as ", em: "wrongful withholding", post: "?" },
    lede:
      "Four situations, each one a sufficient basis for a small-claims case under most state security-deposit laws.",
    cards: [
      {
        num: "01",
        title: "The deadline passed",
        body:
          "Your landlord did not return the deposit or send an itemized deduction list within the state deadline. The deadline starts on the later of your move-out date or the date you sent written notice of your forwarding address.",
      },
      {
        num: "02",
        title: "No itemized list",
        body:
          "Money was kept, but you got no written breakdown of what was deducted and why. Most statutes treat that as a failure to comply, even if the deductions would have been valid.",
      },
      {
        num: "03",
        title: "Wear-and-tear charges",
        body:
          "Carpet wear after years of use, paint scuffs, faded curtains, and nail holes count as normal wear and tear, not damage. Charging for any of them is wrongful withholding in every state.",
      },
      {
        num: "04",
        title: "Pre-existing damage",
        body:
          "The landlord deducted for damage that was already documented at move-in, or that you can show pre-dated your tenancy with a walkthrough video, photos, or a signed move-in checklist.",
      },
    ],
    note: {
      strongIntro: "The clock starts on the later of two dates:",
      rest:
        " move-out or your written forwarding-address notice. Without that notice, the deadline never starts. Your landlord can argue they had no place to send the money.",
    },
  },

  claim: {
    h2: { pre: "How much can you sue your ", em: "landlord", post: " for?" },
    lede:
      "The deposit is the floor, not the ceiling. Bring receipts and clear math. Judges award what they can verify.",
    layers: [
      {
        tag: "Layer 1",
        title: "The deposit itself",
        body:
          "Whatever the landlord wrongfully withheld. If they kept $1,200 of a $1,500 deposit and sent no itemized list, you ask for the full $1,500.",
        amount: "$1,500",
      },
      {
        tag: "Layer 2",
        title: "Statutory damages (2x or 3x)",
        body:
          "Most states add a 2x or 3x multiplier on the wrongfully withheld amount when the landlord acted in bad faith. Texas adds $100 plus 3x. Massachusetts adds 3x plus interest.",
        amount: "+ $4,500",
        accent: true,
      },
      {
        tag: "Layer 3",
        title: "Fees and interest",
        body:
          "Filing fee, service-of-process cost, statutory attorney fees (most security-deposit statutes shift fees to the loser), and pre- and post-judgment interest.",
        amount: "+ $250",
      },
    ],
    total: {
      label: "Sample total in a 3x state",
      body:
        "$1,500 deposit, plus 3x penalty on the $1,500 wrongfully withheld, plus $250 in fees and interest.",
      amount: "$6,250",
      sublabel: "illustrative · varies by state and facts",
    },
  },

  demand: {
    h2: { pre: "Send a ", em: "demand letter", post: " first." },
    lede:
      "About half of security-deposit disputes settle once a real demand letter arrives. A real one shows the statutory damages math and cites the actual statute by section. Most landlords pay rather than risk a fee-shifting judgment in court.",
    checklist: [
      "Your forwarding address and lease end date",
      "The exact amount you are owed (deposit plus statutory multiplier)",
      "The statute you are relying on, cited by section",
      "A 14-day deadline before you file",
      "Sent certified mail with return receipt",
    ],
    letter: {
      certifiedNum: "7019 0140 0001 4827 3561",
      date: "April 21, 2026",
      recipientName: "Oakwood Properties LLC",
      recipientAddress: "1247 Mission Street, San Francisco, CA 94103",
      reLine: "Demand for Return of Security Deposit, lease ended March 31, 2026",
      bodyParagraphs: [
        "Pursuant to <strong>Cal. Civ. Code § 1950.5</strong>, you were required to return my $1,500 security deposit or furnish an itemized statement of deductions within 21 days of move-out. That period has elapsed.",
        "I demand within <strong>fourteen (14) days</strong>:",
      ],
      demandList: [
        "Return of the $1,500 deposit in full;",
        "Statutory damages of <strong>2x</strong> for bad-faith retention ($3,000).",
      ],
      closingLine: "Total demand: <strong>$4,500.00</strong>. If unresolved, I will file in Small Claims Court.",
      signatory: "Jordan A. Tenant",
    },
  },

  fileSteps: {
    h2: { pre: "How to ", em: "file", post: " a small-claims case against your landlord." },
    lede: "Four steps. Most plaintiffs do this without a lawyer.",
    steps: [
      {
        title: "Prepare",
        body:
          "Gather the lease, move-in/move-out photos, your forwarding-address notice, certified-mail receipts, and any communications. Calculate the dollar amount.",
      },
      {
        title: "File",
        body:
          "File a small-claims complaint in the county where the rental was located. Filing fees usually run $30 to $80. Each state has its own form (SC-100 in California, Justice Court in Texas).",
      },
      {
        title: "Serve",
        body:
          "Sheriff, certified mail through the clerk, or a private process server. You cannot serve it yourself. File proof of service before the hearing date.",
      },
      {
        title: "Hearing",
        body:
          "Lead with the dollar amount, the statute, and your paper trail. Hearings usually run 10 to 15 minutes. The judge often rules from the bench or sends a written ruling within a few days.",
      },
    ],
    aftermath: {
      tag: "After you win",
      title: "Collecting on the judgment.",
      bodyHtml:
        "Most states give the landlord 30 days to pay voluntarily. After that, you have three enforcement tools: a <strong>judgment lien</strong> recorded against the landlord&rsquo;s real estate, <strong>wage garnishment</strong> filed with their employer, or a <strong>bank levy</strong> if you can identify their account. Most landlords pay before any of that, since a recorded judgment hits their property records and business filings. Pre- and post-judgment interest runs at your state&rsquo;s legal rate.",
    },
  },

  evidence: {
    h2: { pre: "What evidence do you need to ", em: "sue your landlord", post: "?" },
    lede:
      "Four kinds of proof do most of the work at a security-deposit hearing. Bring originals plus copies for the judge and the landlord.",
    cells: [
      {
        kind: "photos",
        tag: "Move-in/out walkthrough",
        photos: [
          { id: "1556909114-f6e7ad7d3136", cap: "Kitchen at move-in" },
          { id: "1505873242700-f289a29e1e0f", cap: "Living room (clean)" },
          { id: "1564540586988-aa4e53c3d799", cap: "Bathroom (clean)" },
          { id: "1502672260266-1c1ef2d93688", cap: "Bedroom (clean)" },
        ],
      },
      {
        kind: "texts",
        tag: "Asking for the deposit",
        texts: [
          { dir: "in", text: "Hey, I'm moving out April 1. Sending forwarding address now." },
          { dir: "out", text: "OK, will send deposit." },
          { dir: "in", text: "It's been 30 days. Where is it?" },
        ],
      },
      {
        kind: "letter",
        tag: "Forwarding address (certified)",
        letterhead: "Jordan A. Tenant",
        date: "April 1, 2026",
        recipientName: "Oakwood Properties LLC",
        recipientAddress: "1247 Mission St, SF, CA",
        reLine: "Forwarding address for security deposit return",
        bodyParagraphs: [
          "I vacated the unit on March 31. Please send my $1,500 deposit (or itemized statement of deductions) to: 88 New Street, Oakland, CA 94612.",
          "Per Cal. Civ. Code § 1950.5, the 21-day clock starts today.",
        ],
        signatory: "Jordan A. Tenant",
      },
      {
        kind: "receipt",
        tag: "Deposit receipt",
        vendor: "OAKWOOD PROPERTIES",
        vendorAddr: "1247 Mission St · SF, CA",
        receiptNum: "Receipt #4827",
        date: "03/15/2025",
        lineItems: [
          { label: "Security deposit", amount: "$1,500.00" },
          { label: "First month rent", amount: "$2,200.00" },
          { label: "Pet fee", amount: "$300.00" },
        ],
        subtotal: "$4,000.00",
        total: "$4,000.00",
        footer: "Cashier's check · thank you",
      },
    ],
  },

  defenses: {
    h2: { pre: "Common landlord ", em: "defenses", post: ", with rebuttals." },
    lede:
      "Three arguments make up most of what landlords say at the hearing. Each has a clean rebuttal if your paperwork is in order.",
    items: [
      {
        quote: "The damages exceeded the deposit.",
        pill: "Most common",
        rebuttal:
          "<strong>Rebuttal:</strong> they have to prove it with itemized invoices, dated photos, and reasonable estimates. Bring your move-in walkthrough photos and signed checklist. If the landlord never did a move-in walkthrough, that fact alone weighs against them.",
      },
      {
        quote: "You never gave us a forwarding address.",
        pill: "Procedural",
        rebuttal:
          "<strong>Rebuttal:</strong> certified-mail receipt with the return signature, or a printed email with full headers and timestamp. Without proof of when you sent the address, your case is not dead, but the penalty math gets harder. The statutory clock may not have started.",
      },
      {
        quote: "That's just normal wear and tear repair.",
        pill: "Wear and tear",
        rebuttal:
          "<strong>Rebuttal:</strong> carpet wear after years of use, paint scuffs, nail holes, and faded curtains all count as wear and tear, not damage. Cite your state's statutory definition (most have one) and put move-out photos next to move-in photos for direct comparison.",
      },
    ],
  },

  outcomes: {
    h2: { pre: "How much do tenants ", em: "actually win", post: "?" },
    lede:
      "Typical recovery ranges across security-deposit small-claims judgments. Your number depends on the state, the facts, and the quality of your evidence.",
    bands: [
      {
        label: "Low",
        range: "$300 to $1,200",
        body:
          "<strong>Partial win.</strong> The judge agrees with some deductions but finds the landlord did not document them properly. No multiplier applied.",
        tier: "low",
      },
      {
        label: "Mid",
        range: "$1,500 to $4,500",
        body:
          "<strong>Full deposit plus 2x.</strong> The most common outcome when the landlord sent no itemized list or charged for wear and tear. Add the filing fee on top.",
        tier: "mid",
      },
      {
        label: "High",
        range: "$4,500 to $10,000+",
        body:
          "<strong>3x states with fee-shifting.</strong> Texas, Massachusetts, and Colorado on clear bad-faith facts. Triple damages plus pre-judgment interest plus attorney fees.",
        tier: "high",
      },
    ],
  },

  stateSection: {
    kind: "us-map",
    h2: { pre: "Security deposit return deadlines, by ", em: "state", post: "." },
    lede:
      "The ten highest-volume states for security-deposit small claims, highlighted in red. Cards below show each state's deadline and bad-faith penalty. Always confirm against the cited statute before filing.",
  },

  alternatives: {
    h2: { pre: "What are the ", em: "alternatives", post: " to suing your landlord?" },
    lede:
      "Small claims is usually the right tool for security-deposit disputes, but it is not the only one. Two other paths fit certain situations better.",
    cards: [
      {
        title: "Mediation",
        pillLabel: "Free or low-cost",
        pillTier: "good",
        whenItFits:
          "the landlord is responsive but disputes the deduction amount. Most counties offer free landlord-tenant mediation through the courts.",
        tradeoff: "no statutory multiplier, no fee-shifting. You get the deposit back, not the penalty.",
      },
      {
        title: "Small claims (recommended)",
        pillLabel: "Best fit",
        pillTier: "primary",
        whenItFits:
          "you have documentation and the landlord ignored a demand letter, sent no itemized list, or charged wear-and-tear.",
        tradeoff: "30 to 90 day timeline. Filing fee around $50. Statutory multiplier and fee-shifting available.",
      },
      {
        title: "Tenant-rights attorney",
        pillLabel: "When stakes are high",
        pillTier: "warn",
        whenItFits:
          "deposit exceeds the small-claims cap, retaliation is involved, or the landlord owns multiple units (class-action territory).",
        tradeoff:
          "longer timeline, but most tenant-rights attorneys take security-deposit cases on contingency because of fee-shifting statutes.",
      },
    ],
  },

  cta: {
    h2: { pre: "Recover what's ", em: "actually owed", post: "." },
    body:
      "Most landlords settle once a real demand letter arrives. Real ones show the statutory damages math and cite the statute by section. Our generator builds yours in under two minutes.",
    receipt: {
      label: "example · 3x state",
      items: [
        { label: "Deposit wrongfully withheld", amount: "$1,500" },
        { label: "Statutory penalty (3x)", amount: "+ $4,500" },
        { label: "Filing fee + interest", amount: "+ $250" },
      ],
      total: "$6,250",
      totalLabel: "Total claim",
      note: "Illustrative. Your number depends on state, deposit size, and bad-faith findings.",
    },
  },

  faqs: [
    {
      q: "How long does a landlord have to return a security deposit?",
      a: "14 to 60 days, depending on the state. Most states fall in the 21 to 30 day range. The clock starts on the later of move-out or your written forwarding-address notice. New York is the fastest at 14 days. Parts of Florida go up to 60.",
    },
    {
      q: "How much can you sue a landlord for if they keep your deposit?",
      a: "The wrongfully withheld amount, plus a statutory penalty of 2x or 3x in most states when bad faith is shown, plus filing fees and (in many states) attorney fees. Texas adds $100 plus 3x. Massachusetts adds 3x plus interest plus fees.",
    },
    {
      q: "Can you sue a landlord in small claims for double or triple the deposit?",
      a: "Yes. Most state security-deposit statutes authorize a 2x or 3x multiplier on the wrongfully withheld amount when the landlord acted in bad faith. That multiplier is what pushes most landlords to settle once a real demand letter arrives.",
    },
    {
      q: "What counts as bad-faith withholding?",
      a: "Failing to send an itemized list of deductions, inventing damage that pre-existed your tenancy, charging for normal wear and tear, or simply ignoring your demand. Each one is enough on its own under most state statutes.",
    },
    {
      q: "How do you sue a landlord for a security deposit in California?",
      a: "File Form SC-100 in the small claims division of the superior court in the county where the rental was located. Filing fees run $30 to $75 based on the claim amount. California Civil Code section 1950.5 caps bad-faith damages at 2x the deposit. Lawyers are not allowed at the initial hearing.",
    },
    {
      q: "What if your deposit is bigger than the small-claims cap?",
      a: "Two options: waive the amount above the cap and stay in small claims, or file in regular civil court. The cap covers the total claim including the multiplier. A $2,000 deposit at 3x in a state with a $10,000 cap fits. A $5,000 deposit at 3x does not.",
    },
    {
      q: "Do you need a lawyer to sue a landlord for a security deposit?",
      a: "No. Small claims is built for self-represented litigants. In California, lawyers are not even allowed at the initial hearing. The hearing typically takes 10 to 15 minutes. Statutory fee-shifting still lets you recover attorney fees in some states, even without a lawyer.",
    },
  ],

  relatedSlugs: [
    "wrongful-eviction",
    "illegal-lockout",
    "after-moving-out",
    "harassment",
    "mold",
    "break-lease",
  ],
};
