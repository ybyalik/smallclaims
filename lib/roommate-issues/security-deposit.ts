import type { RoommateIssue } from "./types";

export const securityDeposit: RoommateIssue = {
  slug: "security-deposit",
  ready: true,
  short: "Roommate security deposit",
  breadcrumbLabel: "Security Deposit",

  meta: {
    title: "Can I Sue My Roommate Over the Security Deposit?",
    description: "Plain-English guide to recovering your share of the security deposit from a roommate. When they kept your share, refused to forward the refund, or caused deductions.",
  },

  hero: {
    eyebrowSuffix: "Security deposit",
    h1: { pre: "Can I sue my roommate over the ", em: "security deposit", post: "?" },
    leadStrong: "Yes. Three common patterns: unfair allocation, kept refund, and damage caused by them.",
    leadBody:
      " Roommate security-deposit disputes usually arise at the end of the lease. The landlord refunds the deposit to one tenant or sends a single check to the unit; that tenant has to forward each roommate's share. When they don't (or when one roommate caused damage that reduced the refund), the case lands in small claims. The original deposit-contribution records and the move-out walkthrough establish the case.",
  },

  counter: {
    amount: 1800,
    meta: "Contribution / unjust enrichment",
    rows: [
      { label: "Your share of deposit owed", value: "$1,500" },
      { label: "Pre-judgment interest", value: "+ $100", emphasis: "accent" },
      { label: "Filing fee", value: "$200", emphasis: "muted" },
    ],
    footer: "Sample · within most state small-claims caps",
  },

  whatCounts: {
    h2: { pre: "What kinds of ", em: "deposit disputes", post: " can you sue for?" },
    lede: "Three common patterns.",
    cards: [
      { num: "01", title: "Roommate kept your share of the deposit", body: "Most common. Landlord sent the deposit refund to one tenant. That tenant kept the full amount instead of forwarding your share. Bank record from move-in (deposit contribution) plus landlord refund record establishes the case." },
      { num: "02", title: "Damage one roommate caused reduced the refund", body: "The deposit was reduced by deductions for damage. If a specific roommate caused the damage, their share of the deduction comes out of their portion. Photos and the move-out walkthrough establish causation." },
      { num: "03", title: "Roommate moved out, then claimed share without contributing repair costs", body: "Roommate left mid-lease, didn't help with end-of-lease cleaning or repairs. They demand their full deposit share but didn't help cover end-of-lease costs. The shortfall is recoverable from their share." },
      { num: "04", title: "Disputed allocation of deductions", body: "Landlord deducted for general wear-and-tear or unclear damage. Question is how to split deductions between roommates. Default rule: equal split unless one roommate caused specific damage." },
    ],
    note: { strongIntro: "Get the move-out walkthrough.", rest: " A move-out walkthrough with the landlord (and ideally with all roommates present) establishes who caused what damage. Photos help. Without a walkthrough, ambiguous deductions often default to equal split among roommates." },
  },

  claim: {
    h2: { pre: "How much can you ", em: "recover", post: "?" },
    lede: "Your unpaid share of the deposit plus filing fees.",
    layers: [
      { tag: "Layer 1", title: "Your share of the deposit", body: "Original deposit you contributed plus your fair share of any refund. Bank record from move-in establishing your contribution.", amount: "$1,500" },
      { tag: "Layer 2", title: "Pre-judgment interest", body: "State legal rate (7 to 10 percent per year) running from the date the landlord refunded.", amount: "+ $100", accent: true },
      { tag: "Layer 3", title: "Filing fees, post-judgment interest", body: "Filing fee, service-of-process cost, post-judgment interest until paid.", amount: "+ $200" },
    ],
    total: { label: "Sample total within small-claims cap", body: "$1,500 share kept by ex-roommate plus interest, plus filing fee.", amount: "$1,800", sublabel: "illustrative · varies by deposit size" },
  },

  demand: {
    h2: { pre: "Send a ", em: "demand letter", post: " first." },
    lede: "Demand letters work especially well for deposit disputes because the documentation is usually clean.",
    checklist: ["Original deposit contribution record (your bank record from move-in)", "Lease showing both names", "Landlord's refund record or itemization", "Move-out walkthrough notes", "A 14-day deadline", "Sent certified mail to forwarding address"],
    letter: {
      certifiedNum: "7019 0140 0001 4827 3622",
      date: "May 5, 2026",
      recipientName: "Jordan Roommate",
      recipientAddress: "1424 Forwarding Address, Phoenix, AZ 85003",
      reLine: "Demand for Share of Security Deposit",
      bodyParagraphs: [
        "On 09/01/2024, we both moved into 5500 Industrial Way under a joint lease with a $3,000 security deposit. I contributed $1,500 (bank record attached). On 04/30/2026, the landlord refunded the deposit in full ($3,000) to your address. You did not forward my $1,500 share.",
        "I demand within <strong>fourteen (14) days</strong>:",
      ],
      demandList: [
        "Refund of <strong>$1,500</strong> in my deposit share;",
        "Pre-judgment interest at 10 percent per year (<strong>$100</strong>).",
      ],
      closingLine: "Total demand: <strong>$1,600.00</strong>. If unresolved, I will file in Small Claims Court.",
      signatory: "Reese Q. Tenant",
    },
  },

  fileSteps: {
    h2: { pre: "How to ", em: "file", post: " a deposit case." },
    lede: "Four steps. Documentation of your share is the case.",
    steps: [
      { title: "Establish your share", body: "Bank record from move-in showing your deposit contribution. Lease with both names. Roommate agreement specifying deposit allocation." },
      { title: "Establish the refund", body: "Get the landlord's refund record or itemization. The landlord usually sends a single check to one tenant or to the property address." },
      { title: "Send certified-mail demand", body: "Use the roommate's forwarding address. Most pay at this stage to close the matter." },
      { title: "Hearing", body: "Lead with the bank record, the lease, the refund record, and the demand letter. Hearings usually run 10 to 15 minutes." },
    ],
    aftermath: { tag: "After you win", title: "Collecting the deposit share.", bodyHtml: "Money judgments enforce via <strong>judgment lien</strong>, <strong>bank levy</strong>, and <strong>writ of execution</strong>. Wage garnishment is also available." },
  },

  evidence: {
    h2: { pre: "What evidence do you need ", em: "for a deposit case", post: "?" },
    lede: "Bank record + lease + refund record establish the case.",
    cells: [
      { kind: "letter", tag: "Original deposit contribution", letterhead: "Wells Fargo · Account 1234", date: "August 28, 2024", recipientName: "Reese Tenant", reLine: "Wire to Phoenix Property Management", bodyParagraphs: [
        "Wire $1,500 to Phoenix Property Management.",
        "Memo: 'Security deposit share — Reese Tenant — Lease 4218'.",
        "Sent 08/28/2024.",
      ], signatory: "Bank platform record", signatoryTitle: "Wells Fargo statement" },
      { kind: "texts", tag: "Refund acknowledgment", texts: [
        { dir: "out", text: "Hey, did the deposit refund come yet?" },
        { dir: "in", text: "Yeah, got the $3k check. I'll send your half." },
        { dir: "out", text: "Been 3 weeks. Still waiting on my $1,500." },
      ] },
      { kind: "handbook", tag: "Lease deposit clause", documentTitle: "Lease #4218 · Section 12", sectionTitle: "Security Deposit", bodyParagraphs: [
        "Tenant security deposit is $3,000 paid jointly. Refund (or itemized statement) returned to tenants within 30 days of lease end per state law.",
      ], highlight: "Joint deposit; both tenants entitled to their respective contributions.", footer: "Lease specifies joint security deposit" },
      { kind: "receipt", tag: "Landlord refund record", vendor: "PHOENIX PROPERTY MGMT", vendorAddr: "Refund record", receiptNum: "Refund #82218", date: "04/30/2026", lineItems: [
        { label: "Original deposit", amount: "$3,000.00" },
        { label: "Cleaning deduction (general wear)", amount: "-$0.00" },
        { label: "Refund total", amount: "$3,000.00" },
        { label: "Sent to: Jordan Roommate (one check)", amount: "(one check)" },
      ], subtotal: "$3,000.00", total: "$3,000.00", footer: "Joint deposit refunded to one tenant; share owed" },
    ],
  },

  defenses: {
    h2: { pre: "Common roommate ", em: "defenses", post: ", with rebuttals." },
    lede: "Three arguments cover most deposit cases.",
    items: [
      { quote: "I deducted for damage you caused.", pill: "Most common", rebuttal: "<strong>Rebuttal:</strong> bring the move-out walkthrough notes and any landlord deductions. The landlord's deductions establish what was deducted; the roommate cannot add their own deductions on top without specific evidence of damage you caused." },
      { quote: "I never received the refund.", pill: "No refund received", rebuttal: "<strong>Rebuttal:</strong> the landlord's refund record establishes that the refund was sent. Bank record showing the deposit hit their account confirms receipt. Without the roommate's bank evidence, this defense fails." },
      { quote: "We had a different agreement on the split.", pill: "Different terms", rebuttal: "<strong>Rebuttal:</strong> bring contemporaneous texts or roommate agreement. The original deposit contributions usually establish the split absent contrary agreement." },
    ],
  },

  outcomes: {
    h2: { pre: "How much do tenants ", em: "actually recover", post: "?" },
    lede: "Most cases recover the full owed share.",
    bands: [
      { label: "Low", range: "$100 to $500", body: "<strong>Partial recovery.</strong> Court awards portion when documented damage reduces the refund.", tier: "low" },
      { label: "Mid", range: "$500 to $2,000", body: "<strong>Full share + interest.</strong> Most common with clean documentation.", tier: "mid" },
      { label: "High", range: "$2,000 to $5,000+", body: "<strong>Larger deposits.</strong> Multi-bedroom apartments with high deposits.", tier: "high" },
    ],
  },

  stateSection: null,

  alternatives: {
    h2: { pre: "What are the ", em: "alternatives", post: " to small claims?" },
    lede: "Demand letter is the lowest-friction path.",
    cards: [
      { title: "Demand letter alone", pillLabel: "Free, very effective", pillTier: "primary", whenItFits: "documented split. Most roommates pay at this stage.", tradeoff: "no enforcement if ignored." },
      { title: "Talk to the landlord", pillLabel: "Free, may help", pillTier: "good", whenItFits: "the landlord can often resolve disputes by allocating deductions clearly. Some landlords issue separate refund checks if asked.", tradeoff: "landlord may decline to get involved." },
      { title: "Small claims (this guide)", pillLabel: "When demand fails", pillTier: "warn", whenItFits: "demand failed. Damages within state cap.", tradeoff: "30 to 90 day timeline." },
    ],
  },

  cta: {
    h2: { pre: "Recover your ", em: "deposit share", post: "." },
    body: "Demand letters with bank records and refund documentation produce settlement in most cases.",
    receipt: { label: "example · roommate kept full deposit", items: [
      { label: "Your share of deposit", amount: "$1,500" },
      { label: "Pre-judgment interest", amount: "+ $100" },
      { label: "Filing fee", amount: "+ $200" },
    ], total: "$1,800", totalLabel: "Total claim", note: "Illustrative. Larger deposits push higher." },
  },

  faqs: [
    { q: "Can I sue my roommate for keeping my deposit share?", a: "Yes. The deposit refund is held in trust for both tenants by whoever receives it. Keeping the full refund without forwarding the other tenant's share is conversion. Bank records establishing your contribution and landlord refund records establishing the receipt are the case." },
    { q: "What if the deposit was reduced by deductions?", a: "Landlord deductions for damage usually come off the total before splitting. If specific damage was caused by one roommate, that roommate bears that deduction; remaining damage is split per the contribution ratio. Move-out walkthrough establishes who caused what." },
    { q: "What if the landlord sent the refund to the wrong tenant?", a: "Most landlords send to one tenant or to the property address. The receiving tenant holds the funds in trust for all tenants and must forward each share. Failure to forward = conversion." },
    { q: "Should I ask the landlord to send separate checks?", a: "At lease signing or before move-out, yes. Many landlords will issue separate checks if all tenants request and provide forwarding addresses. This avoids the keep-the-deposit problem entirely." },
    { q: "How long do I have to sue?", a: "Conversion claims usually run 2 to 4 years from the date the refund was received. Some states' security-deposit statutes have specific shorter windows. File promptly after the refund deadline passes." },
    { q: "What if my roommate disputes the move-out condition?", a: "The landlord's deductions (if any) are the official record. Your roommate's separate claims about move-out condition rarely succeed without the landlord backing them." },
    { q: "Can I include this with other roommate claims?", a: "Yes. One small-claims case can include unpaid rent + unpaid bills + property damage + deposit. Combine to avoid multiple court appearances." },
  ],

  relatedSlugs: ["unpaid-rent", "unpaid-bills", "moving-out-no-notice", "property-damage-or-theft", "no-lease", "emotional-distress"],
};
