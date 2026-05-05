import type { LandlordIssue } from "./types";

export const emotionalDistress: LandlordIssue = {
  slug: "emotional-distress",
  ready: true,
  short: "Emotional distress",
  breadcrumbLabel: "Emotional distress",

  meta: {
    title: "Can You Sue Your Landlord for Emotional Distress?",
    description:
      "Sometimes. Emotional-distress claims are hard to win alone but powerful when paired with another tenant claim. How much you can sue for, what evidence you need, and when these cases succeed.",
  },

  hero: {
    eyebrowSuffix: "Emotional distress",
    h1: { pre: "Can I sue my landlord for ", em: "emotional distress", post: "?" },
    leadStrong: "Yes, but emotional-distress claims are hard to win on their own",
    leadBody:
      ". Pure emotional-distress lawsuits rarely succeed in small claims, but emotional-distress damages added on top of another claim (harassment, wrongful eviction, mold) often do. Typical recoveries run $1,000 to $10,000 when supported by medical or therapy records.",
  },

  counter: {
    amount: 4500,
    meta: "Emotional distress + underlying claim",
    rows: [
      { label: "Therapy + medication", value: "$2,200" },
      { label: "Lost work + sleep loss", value: "+ $1,800", emphasis: "accent" },
      { label: "Filing fee + interest", value: "+ $500" },
    ],
    footer: "Documented therapy · paired with harassment claim",
  },

  whatCounts: {
    h2: { pre: "When does emotional distress give you a ", em: "lawsuit", post: "?" },
    lede:
      "Emotional-distress claims succeed when one of these conditions is met. Without one, courts usually dismiss.",
    cards: [
      {
        num: "01",
        title: "Paired with another claim",
        body:
          "Easiest path. Add emotional-distress damages on top of harassment, wrongful eviction, mold, or unsafe conditions. The underlying claim carries the case. Emotional distress is an add-on.",
      },
      {
        num: "02",
        title: "Outrageous conduct",
        body:
          "Intentional infliction of emotional distress (IIED) requires landlord conduct that goes beyond all bounds of decency. Threats with weapons, racial slurs, repeated entry while you sleep, blocking access to medical care.",
      },
      {
        num: "03",
        title: "Negligent infliction with physical injury",
        body:
          "If landlord negligence caused physical injury (unsafe condition, mold exposure, lead poisoning), you can usually add emotional distress on top. The physical injury is what unlocks the emotional-distress claim.",
      },
      {
        num: "04",
        title: "Documented mental-health treatment",
        body:
          "Therapy records, prescriptions, time off work, sleep studies, or a doctor's note linking symptoms to the landlord's conduct. Without records, emotional distress is treated as speculative.",
      },
    ],
    note: {
      strongIntro: "Document the medical side.",
      rest:
        " Emotional-distress claims live or die on records. A therapist's note that ties your anxiety, depression, or insomnia to specific landlord events is worth more than the most powerful testimony alone. See a provider early and ask them to document the connection.",
    },
  },

  claim: {
    h2: { pre: "How much can you sue for ", em: "emotional distress", post: "?" },
    lede:
      "Three categories. The medical and concrete-cost components win cases. Pain and suffering alone is hardest to prove.",
    layers: [
      {
        tag: "Layer 1",
        title: "Medical and therapy bills",
        body:
          "Therapy sessions, psychiatric medications, sleep studies, urgent care visits for anxiety attacks. Itemized bills with provider notes are decisive.",
        amount: "$2,200",
      },
      {
        tag: "Layer 2",
        title: "Concrete losses",
        body:
          "Lost wages from missed work, sleep loss documented by sleep studies, family-relationship costs (couples therapy), broken commitments due to anxiety attacks.",
        amount: "+ $1,800",
        accent: true,
      },
      {
        tag: "Layer 3",
        title: "Pain and suffering",
        body:
          "Hardest category to prove. Courts award something for severe documented distress, but rarely without a tied claim or medical evidence. Filing fee and interest also fit here.",
        amount: "+ $500",
      },
    ],
    total: {
      label: "Sample case · harassment + therapy",
      body:
        "Six months of harassment, eight therapy sessions, prescription anxiety medication, two missed weeks of work. Filed in small claims paired with statutory harassment claim.",
      amount: "$4,500",
      sublabel: "illustrative · varies by documentation strength",
    },
  },

  demand: {
    h2: { pre: "Send a ", em: "demand letter", post: " with the medical math." },
    lede:
      "Lead with the underlying claim (harassment, mold, wrongful eviction). Add the documented emotional-distress costs as a separate line item. Settlement rates are higher when the medical side is itemized.",
    checklist: [
      "The underlying claim and its statutory basis",
      "Itemized medical and therapy costs",
      "Lost wages with employer letter or pay stubs",
      "A specific dollar demand including emotional distress",
      "A 14-day deadline before filing",
    ],
    letter: {
      certifiedNum: "7019 0140 0001 4827 3567",
      date: "April 21, 2026",
      recipientName: "Hillside Property Management",
      recipientAddress: "8810 Sunset Blvd, Los Angeles, CA 90069",
      reLine: "Demand for damages, harassment and emotional distress, Apt 14B",
      bodyParagraphs: [
        "Beginning <strong>October 2025</strong>, your repeated unauthorized entries, threats to evict, and intimidation of my partner caused documented anxiety, sleep loss, and required ongoing therapy (records attached).",
        "Pursuant to <strong>Cal. Civ. Code § 1940.2</strong> (harassment) and common-law negligent infliction of emotional distress, I demand within <strong>fourteen (14) days</strong>:",
      ],
      demandList: [
        "Statutory harassment damages of $2,000 per act for 3 documented acts ($6,000);",
        "Therapy and medication costs of $2,200 (receipts attached);",
        "Lost wages of $1,800.",
      ],
      closingLine: "Total demand: <strong>$10,000.00</strong>. If unresolved, I will file in Small Claims Court.",
      signatory: "Quinn R. Tenant",
    },
  },

  fileSteps: {
    h2: { pre: "How to ", em: "file", post: " an emotional-distress case." },
    lede: "Four steps. The medical records do most of the work at the hearing.",
    steps: [
      {
        title: "Get records first",
        body:
          "See a therapist, doctor, or psychiatrist. Ask the provider to document the connection between symptoms and the landlord's conduct. Without records, the claim is speculative.",
      },
      {
        title: "File",
        body:
          "Almost always file with an underlying claim (harassment, wrongful eviction, mold). Pure IIED cases can go to small claims but the bar is high. State the underlying claim first.",
      },
      {
        title: "Serve",
        body:
          "Sheriff or process server. File proof of service before the hearing.",
      },
      {
        title: "Hearing",
        body:
          "Open with the underlying claim. Then walk the judge through the medical timeline: when symptoms started, treatment received, what it cost, what work you missed.",
      },
    ],
    aftermath: {
      tag: "After you win",
      title: "Collecting and what comes next.",
      bodyHtml:
        "30-day voluntary payment, then enforcement. Emotional-distress awards from a small-claims judgment can be a foundation for a larger civil-court case if the conduct continues. Save everything.",
    },
  },

  evidence: {
    h2: { pre: "What evidence do you need to ", em: "win", post: "?" },
    lede:
      "Emotional-distress cases are evidence cases. Records, records, records.",
    cells: [
      {
        kind: "letter",
        tag: "Provider note",
        letterhead: "Dr. K. Singh, LMFT · License CA-LMFT-12345",
        date: "March 18, 2026",
        recipientName: "To Whom It May Concern",
        reLine: "Patient: M. Chen · Treatment summary",
        bodyParagraphs: [
          "Patient has presented for weekly therapy since January 30, 2026 with symptoms consistent with acute anxiety disorder.",
          "Patient describes sustained harassment and threats by their landlord. Symptoms include sleep disruption and panic attacks.",
        ],
        signatory: "Dr. K. Singh, LMFT",
        signatoryTitle: "Licensed Marriage and Family Therapist",
      },
      {
        kind: "texts",
        tag: "Threats from landlord",
        texts: [
          { dir: "out", text: "If you don't pay by tomorrow, I'm calling ICE." },
          { dir: "in", text: "I told you I paid yesterday." },
          { dir: "out", text: "Then we'll see what happens." },
        ],
      },
      {
        kind: "handbook",
        tag: "Quiet enjoyment statute",
        documentTitle: "California Civil Code · § 1927",
        sectionTitle: "Quiet possession",
        bodyParagraphs: [
          "An agreement to let upon hire binds the lessor to secure to the lessee the quiet possession of the thing hired during the term of the hiring, against all persons lawfully claiming the same.",
        ],
        highlight: "Threats and harassment by the landlord breach quiet enjoyment.",
      },
      {
        kind: "receipt",
        tag: "Therapy & meds",
        vendor: "BAY AREA THERAPY GROUP",
        vendorAddr: "Polk St · SF, CA",
        receiptNum: "Statement #4827",
        date: "Q1 2026",
        lineItems: [
          { label: "8 therapy sessions @ $185", amount: "$1,480.00" },
          { label: "Psychiatric evaluation", amount: "$420.00" },
          { label: "Lexapro 10mg, 90-day supply", amount: "$300.00" },
        ],
        subtotal: "$2,200.00",
        total: "$2,200.00",
        footer: "Receipt for tenant claim · thank you",
      },
    ],
  },

  defenses: {
    h2: { pre: "Common landlord ", em: "defenses", post: "." },
    lede:
      "Three defenses come up. Each is harder to overcome than in property-damage cases, which is why documentation matters so much.",
    items: [
      {
        quote: "The tenant's distress had other causes.",
        pill: "Most common",
        rebuttal:
          "<strong>Rebuttal:</strong> a therapist's note specifically linking symptoms to landlord events. Even pre-existing anxiety can be aggravated by landlord conduct, which is recoverable as eggshell-plaintiff damages.",
      },
      {
        quote: "There was no actual harm.",
        pill: "Damages",
        rebuttal:
          "<strong>Rebuttal:</strong> medical bills and therapy receipts are concrete harm. Lost wages with pay stubs are concrete. The judge does not need to feel sympathy if the dollar amounts are documented.",
      },
      {
        quote: "Conduct was not outrageous.",
        pill: "Threshold",
        rebuttal:
          "<strong>Rebuttal:</strong> for pure IIED, this defense is hard to overcome. Pair the claim with another statutory or common-law tort (harassment, retaliation, wrongful eviction) so this defense becomes irrelevant.",
      },
    ],
  },

  outcomes: {
    h2: { pre: "How much do tenants ", em: "actually win", post: "?" },
    lede:
      "Outcomes correlate strongly with documentation. Cases without medical records rarely award above $1,000.",
    bands: [
      {
        label: "Low",
        range: "$0 to $1,000",
        body:
          "<strong>No medical records.</strong> Pure pain-and-suffering claims without therapy or doctor visits. Most courts award nothing or a token amount.",
        tier: "low",
      },
      {
        label: "Mid",
        range: "$2,000 to $7,000",
        body:
          "<strong>Documented therapy + underlying claim.</strong> Several months of therapy, paired with statutory harassment or habitability claim. Most successful tenant cases land here.",
        tier: "mid",
      },
      {
        label: "High",
        range: "$10,000+",
        body:
          "<strong>Severe distress with medical and lost-work documentation.</strong> Hospitalization, ongoing psychiatric treatment, multiple weeks of lost work. Often moves to civil court.",
        tier: "high",
      },
    ],
  },

  stateSection: null,

  alternatives: {
    h2: { pre: "What are the ", em: "alternatives", post: "?" },
    lede:
      "Three other paths fit different situations. Pure emotional-distress claims are the hardest to win, so consider these first.",
    cards: [
      {
        title: "Pair with a statutory claim",
        pillLabel: "Recommended",
        pillTier: "primary",
        whenItFits:
          "you have an underlying claim (harassment, mold, wrongful eviction). Add emotional distress as a damages line on the same complaint.",
        tradeoff:
          "Cleaner case strategy. Higher settlement rates than pure emotional-distress cases.",
      },
      {
        title: "Civil rights complaint",
        pillLabel: "Discrimination",
        pillTier: "good",
        whenItFits:
          "the conduct was tied to your race, religion, family status, disability, or sexual orientation. HUD and state agencies investigate for free with strong remedies.",
        tradeoff:
          "Longer timeline but injunctive relief plus damages plus civil penalties.",
      },
      {
        title: "Personal injury attorney",
        pillLabel: "Severe distress",
        pillTier: "warn",
        whenItFits:
          "ongoing psychiatric treatment, hospitalization, or major lost-work damages. Cases above the small-claims cap.",
        tradeoff:
          "Some attorneys take emotional-distress cases on contingency when paired with strong statutory claims.",
      },
    ],
  },

  cta: {
    h2: { pre: "Recover ", em: "what they cost you", post: "." },
    body:
      "Emotional-distress cases settle when the medical math is itemized. The demand letter alone often resolves harassment patterns once the landlord sees the per-act statutory penalties plus therapy costs.",
    receipt: {
      label: "example · paired with harassment claim",
      items: [
        { label: "Therapy + medication", amount: "$2,200" },
        { label: "Lost wages (10 days)", amount: "+ $1,800" },
        { label: "Filing fee + interest", amount: "+ $500" },
      ],
      total: "$4,500",
      totalLabel: "Total claim",
      note: "Illustrative. Pair with a statutory harassment or habitability claim for best results.",
    },
  },

  faqs: [
    {
      q: "Can you sue a landlord for emotional distress?",
      a: "Sometimes. Pure emotional-distress claims are hard to win in small claims, but emotional-distress damages added on top of another tenant claim (harassment, wrongful eviction, habitability) often succeed. Always pair with the underlying statutory claim if possible.",
    },
    {
      q: "How much can I sue my landlord for emotional distress?",
      a: "Successful tenant cases typically recover $1,000 to $10,000, depending on documentation. Cases with strong medical records (therapy, prescriptions, lost work) hit the higher end. Cases without records usually award little or nothing.",
    },
    {
      q: "Can you sue for stress and anxiety from a landlord?",
      a: "Yes, if you have records. A therapist's note that ties your anxiety to specific landlord events is the standard. See a provider early and document the connection. Self-reported stress without records rarely wins.",
    },
    {
      q: "Can you sue your landlord for pain and suffering?",
      a: "Pain and suffering alone is the hardest emotional-distress category. Courts award it more readily when paired with physical injury (mold, unsafe conditions) or a statutory claim. Itemized medical bills strengthen the claim.",
    },
    {
      q: "What is intentional infliction of emotional distress?",
      a: "IIED requires conduct that goes beyond all bounds of decency: threats with weapons, racial slurs, repeated entry while you sleep, blocking access to medical care. The bar is high. Most tenant cases pair the IIED theory with a statutory claim.",
    },
    {
      q: "Do I need a doctor's note to sue for emotional distress?",
      a: "Strongly recommended. Therapy or psychiatric records dramatically increase recovery. Cases without records usually receive token awards or none at all. See a provider early in the underlying dispute.",
    },
    {
      q: "How long do you have to sue for emotional distress?",
      a: "Usually 1 to 3 years depending on the state and theory. The clock typically runs from the last harassing event in a pattern. File quickly because witnesses and records degrade.",
    },
  ],

  relatedSlugs: [
    "harassment",
    "wrongful-eviction",
    "illegal-lockout",
    "mold",
    "unsafe-conditions",
    "after-moving-out",
  ],
};
