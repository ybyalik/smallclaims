import type { NeighborIssue } from "./types";

export const fenceDispute: NeighborIssue = {
  slug: "fence-dispute",
  ready: true,
  short: "Fence dispute",
  breadcrumbLabel: "Fence Dispute",

  meta: {
    title: "Can I Sue My Neighbor Over a Fence Dispute? Small Claims Guide",
    description:
      "Plain-English guide to suing a neighbor over a boundary fence. State partition fence statutes, spite fence laws, shared cost obligations, and a demand-letter template.",
  },

  hero: {
    eyebrowSuffix: "Fence dispute",
    h1: { pre: "Can I sue my neighbor over a ", em: "fence dispute", post: "?" },
    leadStrong: "Yes. State partition fence laws plus spite fence statutes both apply.",
    leadBody:
      " Boundary fences sit on the property line and have shared ownership in most states. Partition fence statutes (CA Civ. Code § 841 and similar) require both owners to share routine maintenance. Spite fence laws (CA Civ. Code § 841.4 and similar) prohibit excessive fences built primarily to annoy. Damage caused by one owner's negligence is recoverable from that owner. The state DOI complaint and small claims are usually fast paths.",
  },

  counter: {
    amount: 4200,
    meta: "State partition fence + spite fence statutes",
    rows: [
      { label: "Shared fence repair (your share)", value: "$2,800" },
      { label: "Damage from neighbor's negligence", value: "+ $1,200", emphasis: "accent" },
      { label: "Filing fee + interest", value: "$200", emphasis: "muted" },
    ],
    footer: "Sample · within most state small-claims caps",
  },

  whatCounts: {
    h2: { pre: "What counts as a ", em: "fence dispute", post: "?" },
    lede: "Four common patterns. Each has its own legal framework.",
    cards: [
      { num: "01", title: "Shared boundary fence repair costs", body: "Most states require both owners of a boundary fence to share routine maintenance. If you replaced the fence and the neighbor refuses to pay their share, that is a recoverable claim. Notice and reasonable construction are usually required." },
      { num: "02", title: "Spite fence (excessive height or design)", body: "Most states cap fence height at 6 to 8 feet (varies by zoning). A fence built primarily to annoy you (height beyond zoning, ugly side facing you, blocking your view) violates spite fence statutes. Damages and removal orders are available." },
      { num: "03", title: "Damage from neighbor's negligence", body: "Neighbor's tree fell on the fence, neighbor's vehicle hit the fence, neighbor's children damaged the fence. Negligence claims for the repair cost. The homeowners insurance route applies." },
      { num: "04", title: "Boundary line disagreement", body: "You and your neighbor disagree on where the property line is. A licensed surveyor establishes the line. If a fence was built across the line, the encroaching portion is actionable." },
    ],
    note: { strongIntro: "Get a survey if the line is disputed.", rest: " Boundary surveys cost $400 to $1,500 but resolve most fence disputes definitively. The surveyor's report is admissible in court and binding for property purposes. Many fence disputes evaporate once the actual line is documented." },
  },

  claim: {
    h2: { pre: "How much can you ", em: "claim", post: "?" },
    lede: "Repair cost is the floor. Surveys, removal of spite fences, and consequential damages stack on top.",
    layers: [
      { tag: "Layer 1", title: "Repair or replacement cost", body: "For shared-fence cases: half the repair cost (or whatever the state's partition fence statute requires). For damage cases: full repair cost. Quote from a licensed fence company.", amount: "$2,800" },
      { tag: "Layer 2", title: "Damage from negligence", body: "If the neighbor's negligence damaged the fence (tree fall, vehicle hit, etc.), the full damage cost is recoverable, not just half.", amount: "+ $1,200", accent: true },
      { tag: "Layer 3", title: "Filing fees, survey costs, interest", body: "Filing fee, boundary survey if needed ($400 to $1,500), pre-judgment interest at your state's legal rate.", amount: "+ $200" },
    ],
    total: { label: "Sample total within small-claims cap", body: "Half cost of new shared fence plus damage from neighbor's negligence, plus filing fee.", amount: "$4,200", sublabel: "illustrative · varies by state and dispute" },
  },

  demand: {
    h2: { pre: "Send a ", em: "demand letter", post: " first." },
    lede: "Demand letters work well in fence cases because the law is clear (state partition fence statutes are well-defined). Most neighbors settle once they see the statute citation.",
    checklist: [
      "Photos of the fence and the property line",
      "Survey report if the line is disputed",
      "Repair quote from a licensed fence company",
      "State partition fence statute citation",
      "Documentation that you gave proper notice (if state law requires)",
      "A 14-day deadline before you file",
      "Sent certified mail",
    ],
    letter: {
      certifiedNum: "7019 0140 0001 4827 3606",
      date: "May 5, 2026",
      recipientName: "Pat Neighbor",
      recipientAddress: "1424 Maple Lane, Sacramento, CA 95816",
      reLine: "Demand for Shared Fence Costs and Damage Recovery",
      bodyParagraphs: [
        "Our shared fence at the property line was damaged in February 2026 when your tree fell on it. I gave you written notice on March 1 (attached) and you did not respond. I rebuilt the fence on April 15, 2026 at a cost of $5,600.",
        "Pursuant to <strong>California Civil Code § 841</strong>, you owe half ($2,800) of the routine maintenance cost. The damage from your tree falling adds another $1,200 (full damage portion). I demand within <strong>fourteen (14) days</strong>:",
      ],
      demandList: [
        "Reimbursement of <strong>$2,800</strong> for your half of the shared fence cost;",
        "Reimbursement of <strong>$1,200</strong> for damage caused by your tree.",
      ],
      closingLine: "Total demand: <strong>$4,000.00</strong>. If unresolved, I will file in Small Claims Court.",
      signatory: "Reese Q. Owner",
    },
  },

  fileSteps: {
    h2: { pre: "How to ", em: "file", post: " a fence-dispute case." },
    lede: "Four steps. The state partition fence statute and the property survey are decisive.",
    steps: [
      { title: "Verify the property line", body: "If disputed, get a licensed surveyor's report. Cost: $400 to $1,500. Most disputes resolve once the line is established." },
      { title: "Send written notice", body: "Most state partition fence statutes require notice before construction or repair. The notice triggers the neighbor's obligation to share costs." },
      { title: "File in small claims", body: "If neighbor refuses to share costs, file. Filing fees usually run $30 to $100. Lead with the statute citation and your repair documentation." },
      { title: "Hearing", body: "Lead with the statute, the photos, and the contractor's invoice. Hearings usually run 10 to 15 minutes." },
    ],
    aftermath: { tag: "After you win", title: "Collecting + statute enforcement.", bodyHtml: "Money judgments enforce via <strong>judgment lien</strong>, <strong>bank levy</strong>, and <strong>writ of execution</strong>. Repeated violations of partition fence obligations can trigger HOA action and additional small-claims cases." },
  },

  evidence: {
    h2: { pre: "What evidence do you need to ", em: "sue your neighbor", post: "?" },
    lede: "Photos, survey, statute, and repair quote are the case.",
    cells: [
      { kind: "photos", tag: "Fence and property line", photos: [
        { id: "1581094271901-8022df4466f9", cap: "Damaged fence" },
        { id: "1556909114-f6e7ad7d3136", cap: "Property survey markers" },
        { id: "1581092335397-9583eb92d232", cap: "Source of damage" },
        { id: "1503602642458-232111445657", cap: "New fence installed" },
      ] },
      { kind: "letter", tag: "Notice to neighbor", letterhead: "Reese Owner", date: "March 1, 2026", recipientName: "Pat Neighbor", reLine: "Notice of fence repair (CA Civ. Code § 841)", bodyParagraphs: [
        "Our shared fence at the property line was damaged on February 14 when your oak fell. The fence is now non-functional.",
        "Pursuant to § 841, I am giving 30-day notice of intent to repair. Your share of routine maintenance is half the cost. If you do not respond, I will proceed with repair and seek your half plus the damage portion in court.",
      ], signatory: "Reese Owner", signatoryTitle: "Property owner" },
      { kind: "handbook", tag: "Partition fence statute", documentTitle: "California Civil Code · § 841", sectionTitle: "Adjoining landowners shall share equally", bodyParagraphs: [
        "Adjoining landowners shall share equally the responsibility for maintaining the boundaries and monuments between them. Adjoining landowners are presumed to share an equal benefit from any fence dividing their properties and, unless otherwise agreed in writing, shall be presumed to be equally responsible for the reasonable costs of construction, maintenance, or necessary replacement of the fence.",
      ], highlight: "Equal responsibility for routine maintenance. Damage from one owner's negligence is separately recoverable from that owner.", footer: "California Civil Code · partition fence law" },
      { kind: "receipt", tag: "Fence contractor invoice", vendor: "VALLEY FENCE CO.", vendorAddr: "License #38291 · Sacramento, CA", receiptNum: "Invoice #2026-218", date: "04/15/2026", lineItems: [
        { label: "Remove damaged fence (60 ft)", amount: "$800.00" },
        { label: "Install replacement (cedar, 60 ft)", amount: "$4,400.00" },
        { label: "Post repair and stain", amount: "$400.00" },
      ], subtotal: "$5,600.00", total: "$5,600.00", footer: "Half ($2,800) is neighbor's share under § 841 · plus $1,200 damage portion" },
    ],
  },

  defenses: {
    h2: { pre: "Common neighbor ", em: "defenses", post: ", with rebuttals." },
    lede: "Three arguments cover most fence cases.",
    items: [
      { quote: "I never agreed to pay half. The fence is yours.", pill: "Most common", rebuttal: "<strong>Rebuttal:</strong> bring the partition fence statute. Most states (CA § 841, NY § 16, etc.) impose equal responsibility on adjoining landowners regardless of original construction. Written agreement is not required." },
      { quote: "You built it without telling me. I had no say.", pill: "No notice", rebuttal: "<strong>Rebuttal:</strong> bring your written notice. Most state partition fence statutes require notice before construction or repair. If you provided the statutorily-required notice, the neighbor's failure to respond constitutes acceptance." },
      { quote: "The fence is fancier than what we needed.", pill: "Quality", rebuttal: "<strong>Rebuttal:</strong> partition fence statutes require 'reasonable' or 'sufficient' construction. Bring multiple quotes showing the cost is reasonable for your area. Excessive construction (luxury materials beyond local standard) may reduce the neighbor's share but not eliminate it." },
    ],
  },

  outcomes: {
    h2: { pre: "How much do owners ", em: "actually recover", post: "?" },
    lede: "Typical recovery in fence cases.",
    bands: [
      { label: "Low", range: "$200 to $1,500", body: "<strong>Damage-only awards.</strong> Court awards damage portion but not shared maintenance.", tier: "low" },
      { label: "Mid", range: "$1,500 to $5,000", body: "<strong>Shared cost plus damage.</strong> Most common when statute and notice are documented.", tier: "mid" },
      { label: "High", range: "$5,000 to $20,000+", body: "<strong>Spite fence + removal.</strong> Spite fence cases with mandatory removal orders and significant property impact push higher.", tier: "high" },
    ],
  },

  stateSection: null,

  alternatives: {
    h2: { pre: "What are the ", em: "alternatives", post: " to small claims?" },
    lede: "Mediation often resolves fence disputes before court.",
    cards: [
      { title: "HOA mediation", pillLabel: "Free, often required first", pillTier: "primary", whenItFits: "you live in an HOA. Most HOAs require mediation before any neighbor lawsuit. The HOA itself often has fence rules.", tradeoff: "no enforcement authority. Pure mediation." },
      { title: "Survey + written agreement", pillLabel: "Permanent solution", pillTier: "good", whenItFits: "boundary line is unclear. A licensed survey followed by a written agreement on fence costs creates clear rights for both owners going forward.", tradeoff: "cost ($400 to $1,500 for survey)." },
      { title: "Small claims (this guide)", pillLabel: "When informal resolution fails", pillTier: "warn", whenItFits: "neighbor refuses to share costs after notice and statute citation. Damages within your state's cap.", tradeoff: "30 to 90 day timeline." },
    ],
  },

  cta: {
    h2: { pre: "Recover your ", em: "fence costs", post: "." },
    body: "Demand letters with the partition fence statute citation usually produce settlement. Our generator builds yours in under two minutes.",
    receipt: { label: "example · shared fence + damage", items: [
      { label: "Half-cost (statutory)", amount: "$2,800" },
      { label: "Damage from negligence", amount: "+ $1,200" },
      { label: "Filing fee + interest", amount: "+ $200" },
    ], total: "$4,200", totalLabel: "Total claim", note: "Illustrative. Spite fence and removal cases push higher." },
  },

  faqs: [
    { q: "Do I have to share the cost of a boundary fence with my neighbor?", a: "In most states, yes. Partition fence statutes (CA § 841, NY § 16, others) require adjoining landowners to share routine maintenance costs equally. Written agreement is not required. Statutory notice is usually required before any major work." },
    { q: "What is a 'spite fence'?", a: "A fence built primarily to annoy a neighbor: excessive height beyond zoning, ugly side facing the neighbor, blocking views or sunlight without legitimate purpose. Most states have spite fence statutes (CA Civ. Code § 841.4 caps at 10 feet for spite analysis) allowing damages and removal." },
    { q: "What if I don't know where the property line is?", a: "Get a licensed surveyor. Cost: $400 to $1,500. The survey is binding for property purposes and resolves most boundary disputes. Many fence disputes evaporate once the actual line is documented." },
    { q: "Do I need to give my neighbor notice before building or repairing?", a: "Most state partition fence statutes require some form of notice (often 30 days). The notice triggers the neighbor's obligation to share costs. Without proper notice, the cost-sharing claim is harder to win." },
    { q: "What if my neighbor's tree fell and damaged the fence?", a: "Damage from negligence is fully recoverable from the neighbor (not just half). Combine with the shared-cost analysis: routine maintenance is half, damage is full. The neighbor's homeowners insurance usually covers the damage portion." },
    { q: "How long do I have to sue?", a: "Property damage and contract claims usually run 2 to 6 years. State partition fence statutes often have specific notice periods that affect timing. File the demand letter promptly." },
    { q: "What if my neighbor agrees to share costs but won't pay?", a: "Get the agreement in writing. If they sign and don't pay, the case becomes a clean breach-of-contract claim with the agreement as your central exhibit. Faster than litigating the partition fence statute." },
  ],

  relatedSlugs: ["property-damage", "construction-damage", "tree-encroachment", "blocking-driveway", "harassment", "water-runoff"],
};
