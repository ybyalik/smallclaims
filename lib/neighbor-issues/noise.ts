import type { NeighborIssue } from "./types";

export const noise: NeighborIssue = {
  slug: "noise",
  ready: true,
  short: "Neighbor noise",
  breadcrumbLabel: "Neighbor Noise",

  meta: {
    title: "Can I Sue My Neighbor for Noise? Small Claims Guide",
    description:
      "Plain-English guide to suing a neighbor for excessive noise. Private nuisance law, city noise ordinances, decibel-meter evidence, and a demand-letter template.",
  },

  hero: {
    eyebrowSuffix: "Noise",
    h1: { pre: "Can I sue my neighbor for ", em: "noise", post: "?" },
    leadStrong: "Yes, when the noise is unreasonable and persistent.",
    leadBody:
      " Excessive noise is a private nuisance: an interference with your reasonable use and enjoyment of your property. Most cities have noise ordinances setting decibel limits and quiet hours; most states recognize private nuisance as a cause of action even without a specific city violation. Recoverable damages include the cost to soundproof, lost rental income (if you rent the property), medical bills from sleep loss, and (in extreme cases) emotional distress. Police complaints and HOA action are usually faster than court.",
  },

  counter: {
    amount: 4200,
    meta: "Private nuisance + city ordinances",
    rows: [
      { label: "Soundproofing your unit", value: "$3,200" },
      { label: "Medical / therapy from sleep loss", value: "+ $800", emphasis: "accent" },
      { label: "Filing fee + interest", value: "$200", emphasis: "muted" },
    ],
    footer: "Sample · within most state small-claims caps",
  },

  whatCounts: {
    h2: { pre: "What kinds of ", em: "neighbor noise", post: " support a lawsuit?" },
    lede: "Four common patterns. The standard is whether a reasonable person would consider it unreasonable.",
    cards: [
      { num: "01", title: "Late-night noise (after quiet hours)", body: "Most cities prohibit loud noise between 10 PM and 7 AM (varies). Music, TV, parties, parking-lot conversations, dog barking. Documented violations of the local ordinance are decisive evidence." },
      { num: "02", title: "Constant or chronic noise", body: "Construction at all hours. Industrial-grade equipment in residential areas. Repeat parties. Chronic dog barking. The pattern over weeks or months establishes nuisance even without specific ordinance violations." },
      { num: "03", title: "Excessive volume during the day", body: "Noise above ordinary residential level even during normal hours. Power tools at 7 AM, amplified music outdoors, large vehicle idling. Most cities have daytime decibel limits too." },
      { num: "04", title: "Targeted or harassing noise", body: "Stereo aimed at your bedroom wall, repeated banging meant to annoy, intentional sleep deprivation. Targeted noise crosses into harassment with stronger remedies including restraining orders." },
    ],
    note: { strongIntro: "Document with a decibel meter.", rest: " Smartphone decibel apps (NIOSH SLM is free, accurate within a few dB) record noise levels with timestamps. Most cities require a violation of the specific decibel limit (often 50 dB at night, 65 dB during day at the property line). The meter app's logs are admissible at most small-claims hearings." },
  },

  claim: {
    h2: { pre: "How much can you ", em: "claim", post: "?" },
    lede: "Soundproofing is the most concrete recovery. Medical bills, lost rental income, and emotional distress stack on top.",
    layers: [
      { tag: "Layer 1", title: "Soundproofing your property", body: "Cost to add insulation, double-pane windows, sealing gaps, soundproof wall treatment. Quote from a licensed contractor. Average $2,000 to $5,000 for a single bedroom or living room.", amount: "$3,200" },
      { tag: "Layer 2", title: "Medical and consequential damages", body: "Therapy or medication for sleep loss, missed work from exhaustion, lost rental income if you rent the property out. Save documented receipts and provider notes.", amount: "+ $800", accent: true },
      { tag: "Layer 3", title: "Filing fees, interest", body: "Filing fee, service-of-process cost, pre-judgment interest at your state's legal rate.", amount: "+ $200" },
    ],
    total: { label: "Sample total within small-claims cap", body: "Soundproofing single bedroom plus therapy bills, plus filing fee.", amount: "$4,200", sublabel: "illustrative · varies by extent and state" },
  },

  demand: {
    h2: { pre: "Send a ", em: "demand letter", post: " first." },
    lede: "Demand letters work especially well when paired with police-call records and HOA citations. Most neighbors stop the noise once formal legal action is in motion.",
    checklist: [
      "Decibel-meter logs with dates and times",
      "Police-call or noise-complaint records",
      "HOA citations if applicable",
      "Soundproofing or repair quote",
      "Medical bills from sleep loss",
      "A 14-day deadline before you file",
      "Sent certified mail",
    ],
    letter: {
      certifiedNum: "7019 0140 0001 4827 3603",
      date: "May 5, 2026",
      recipientName: "Pat Neighbor",
      recipientAddress: "1424 Maple Lane, Los Angeles, CA 90015",
      reLine: "Demand for Damages, Excessive Noise from Late-Night Music",
      bodyParagraphs: [
        "Since January 2026, you have played amplified music every Friday and Saturday from approximately 11 PM to 3 AM. I have called LAPD on 4 occasions (incident #s 26-1182, 26-1408, 26-2218, 26-3217) for violations of <strong>LAMC § 116.01</strong> (50 dB nighttime limit). Decibel measurements at my bedroom wall: 68 to 74 dB on each occasion.",
        "I obtained a quote from Acoustic Solutions for $3,200 to soundproof my bedroom. I also have $800 in therapy bills tied to chronic sleep loss. I demand within <strong>fourteen (14) days</strong>:",
      ],
      demandList: [
        "Reimbursement of <strong>$3,200</strong> in soundproofing costs;",
        "Reimbursement of <strong>$800</strong> in medical bills from sleep loss.",
      ],
      closingLine: "Total demand: <strong>$4,000.00</strong>. If unresolved, I will file in Small Claims Court and pursue an injunction restraining further violations.",
      signatory: "Sage Q. Owner",
    },
  },

  fileSteps: {
    h2: { pre: "How to ", em: "file", post: " a noise case." },
    lede: "Four steps. Police-call records and decibel-meter logs are your spine evidence.",
    steps: [
      { title: "Document the pattern", body: "Decibel-meter logs (NIOSH SLM app is free). Police calls (request the call log from the department). HOA complaints. Photo timestamps of the noise source." },
      { title: "Send formal complaints to police, HOA, city", body: "Most cities have noise hotlines and online complaint forms. HOAs have written rules. The cumulative complaint record is decisive evidence." },
      { title: "File in small claims", body: "If informal complaints do not stop the noise, file. Filing fees usually run $30 to $100. File in the county where you live." },
      { title: "Hearing", body: "Lead with the decibel logs, the police-call records, and the soundproofing quote. Hearings usually run 10 to 15 minutes." },
    ],
    aftermath: { tag: "After you win", title: "Collecting plus injunction.", bodyHtml: "Most small-claims courts can order money damages but not injunctions; for an injunction restraining future noise, you need higher court. Cumulative judgments often pressure neighbors to relocate or stop. Money judgments enforce via <strong>judgment lien</strong> on real estate, <strong>bank levy</strong>, and <strong>writ of execution</strong>." },
  },

  evidence: {
    h2: { pre: "What evidence do you need to ", em: "sue your neighbor", post: "?" },
    lede: "Decibel-meter logs and police records are decisive. Soundproofing quote establishes damages.",
    cells: [
      { kind: "letter", tag: "Decibel log", letterhead: "NIOSH Sound Level Meter App", date: "January – April 2026", recipientName: "Sage Owner", reLine: "Bedroom-wall measurements", bodyParagraphs: [
        "Measurements at bedroom wall, multiple Friday and Saturday nights:",
        "01/14/2026, 11:30 PM: 68.4 dB. 01/21/2026, 1:15 AM: 71.2 dB. 02/04/2026, 11:45 PM: 73.8 dB. 02/18/2026, 2:30 AM: 69.6 dB.",
        "City limit (LAMC § 116.01): 50 dB after 10 PM. Each measurement exceeds limit by 18+ dB.",
      ], signatory: "App-generated log", signatoryTitle: "NIOSH SLM v3.5" },
      { kind: "texts", tag: "Asked them to stop", texts: [
        { dir: "out", text: "Pat — the music has been on past midnight every weekend. Can you turn it down?" },
        { dir: "in", text: "It's a weekend. People are entitled to enjoy their home." },
        { dir: "out", text: "City limit is 50 dB after 10 PM. I've measured 70+. Calling police if it continues." },
      ] },
      { kind: "handbook", tag: "Police call records", documentTitle: "LAPD Incident Records · 90015", sectionTitle: "Noise complaints filed by Sage Owner", bodyParagraphs: [
        "Incident 26-1182 (01/14/2026 23:45): noise complaint, music violation. Officer arrived 00:15. Citation issued.",
        "Incident 26-1408 (01/21/2026 01:40): noise complaint, repeat. Citation issued.",
        "Incident 26-2218 (02/04/2026 23:55): noise complaint. Resident not home, citation left.",
        "Incident 26-3217 (02/18/2026 02:50): noise complaint. Citation issued.",
      ], highlight: "4 separate violations within 5 weeks. Pattern of repeat noise establishes nuisance.", footer: "LAPD records obtained via public records request" },
      { kind: "receipt", tag: "Soundproofing quote", vendor: "ACOUSTIC SOLUTIONS", vendorAddr: "License #38291 · Los Angeles, CA", receiptNum: "Quote #2026-218", date: "04/22/2026", lineItems: [
        { label: "Soundproof wall treatment (single wall)", amount: "$1,800.00" },
        { label: "Acoustic ceiling tiles", amount: "$700.00" },
        { label: "Window seal upgrade", amount: "$700.00" },
      ], subtotal: "$3,200.00", total: "$3,200.00", footer: "Single bedroom · estimated 4 working days" },
    ],
  },

  defenses: {
    h2: { pre: "Common neighbor ", em: "defenses", post: ", with rebuttals." },
    lede: "Three arguments cover most noise cases.",
    items: [
      { quote: "Reasonable people make noise. You're being oversensitive.", pill: "Most common", rebuttal: "<strong>Rebuttal:</strong> the standard is the reasonable person, not your subjective sensitivity. Bring decibel measurements and the city ordinance limit. 70 dB at midnight is objectively excessive regardless of how anyone feels about it." },
      { quote: "We've never been cited or warned.", pill: "No prior notice", rebuttal: "<strong>Rebuttal:</strong> bring the police-call records. Even a warning is sufficient notice in most states. Repeat behavior after notice establishes nuisance." },
      { quote: "Soundproofing is your problem, not ours.", pill: "Burden", rebuttal: "<strong>Rebuttal:</strong> the law puts the burden on the noise-maker, not the receiver. The neighbor caused the nuisance; the cost to mitigate is the appropriate remedy. Most courts award the soundproofing cost to the affected owner." },
    ],
  },

  outcomes: {
    h2: { pre: "How much do owners ", em: "actually recover", post: "?" },
    lede: "Typical recovery in noise cases. Documented patterns produce predictable outcomes.",
    bands: [
      { label: "Low", range: "$200 to $1,500", body: "<strong>Documented occasional violations.</strong> Court awards limited damages without finding ongoing nuisance.", tier: "low" },
      { label: "Mid", range: "$1,500 to $5,000", body: "<strong>Soundproofing plus modest medical.</strong> Most common when the pattern is well-documented.", tier: "mid" },
      { label: "High", range: "$5,000 to $20,000+", body: "<strong>Major nuisance + lost rental income.</strong> Cases with rental loss, significant medical, or chronic harassment push to cap.", tier: "high" },
    ],
  },

  stateSection: null,

  alternatives: {
    h2: { pre: "What are the ", em: "alternatives", post: " to small claims?" },
    lede: "Police, HOA, and code-enforcement complaints often produce faster results than court.",
    cards: [
      { title: "Police and noise hotline", pillLabel: "Free, immediate", pillTier: "primary", whenItFits: "ongoing noise during quiet hours. Police citations create the documented record needed for a small-claims case.", tradeoff: "police often warn rather than cite on first call. Persistent calls build the record." },
      { title: "HOA and code enforcement", pillLabel: "Free, regulatory", pillTier: "good", whenItFits: "you live in an HOA or the city has noise ordinances. HOA fines and code-enforcement violations create written records.", tradeoff: "HOAs only have authority over members. Code enforcement varies by city." },
      { title: "Small claims (this guide)", pillLabel: "When informal channels fail", pillTier: "warn", whenItFits: "documented noise pattern with quantifiable damages. Damages within your state's cap.", tradeoff: "30 to 90 day timeline. Cannot order an injunction; for that, higher court is needed." },
    ],
  },

  cta: {
    h2: { pre: "Stop the ", em: "nuisance", post: "." },
    body: "Demand letters with decibel logs and police-call records produce settlement in most cases. Our generator builds yours in under two minutes.",
    receipt: { label: "example · weekly noise nuisance", items: [
      { label: "Soundproofing", amount: "$3,200" },
      { label: "Medical from sleep loss", amount: "+ $800" },
      { label: "Filing fee + interest", amount: "+ $200" },
    ], total: "$4,200", totalLabel: "Total claim", note: "Illustrative. Major nuisance cases push higher." },
  },

  faqs: [
    { q: "What is a 'private nuisance'?", a: "An interference with your reasonable use and enjoyment of your property. Most states recognize private nuisance as a cause of action separate from any specific code violation. Excessive noise, smells, smoke, and vibrations all qualify when persistent and unreasonable." },
    { q: "Do I need to prove the noise level with a meter?", a: "It helps a lot. Smartphone decibel apps (NIOSH SLM is free, accurate within a few dB) provide timestamped logs that are admissible in most jurisdictions. The meter establishes the objective standard rather than your subjective complaint." },
    { q: "Are noise ordinances actually enforced?", a: "Yes, but enforcement varies. Most cities issue warnings before citations. Repeat calls usually escalate to citations and fines. The police-call record itself becomes evidence for your nuisance case even when the citation rate is low." },
    { q: "Can I sue the landlord if my neighbor is a tenant?", a: "Sometimes. Landlords have a duty to address known nuisances created by their tenants. If you have documented complaints to the landlord and they did nothing, you can sue both the landlord and the tenant. Tenant cases usually pay through homeowners or commercial GL insurance." },
    { q: "What if my neighbor's dog barks all day?", a: "Most cities have specific dog-barking ordinances (often after 5 to 20 minutes of continuous barking). Animal control issues citations. The pattern over weeks builds nuisance. Recovery includes the cost to soundproof your home plus emotional distress in extreme cases." },
    { q: "How long do I have to sue?", a: "Private-nuisance claims usually run 1 to 3 years from the most recent instance. Continuing nuisances reset the clock with each new violation. Move fast on the formal complaint side; the lawsuit is a longer process." },
    { q: "Will I have to face my neighbor in court?", a: "Yes. Small-claims hearings have both parties present. Many cases settle at the demand letter stage to avoid the hearing. Some jurisdictions offer mediation as a first step before formal hearing." },
  ],

  relatedSlugs: ["harassment", "smoke-and-odors", "property-damage", "construction-damage", "dead-tree-fell", "fence-dispute"],
};
