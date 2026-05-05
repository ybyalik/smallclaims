import type { LandlordIssue } from "./types";

export const harassment: LandlordIssue = {
  slug: "harassment",
  ready: true,
  short: "Harassment",
  breadcrumbLabel: "Harassment",

  meta: {
    title: "Can I Sue My Landlord for Harassment?",
    description:
      "Yes. Recover damages for repeated unauthorized entry, threats, intimidation, and retaliation. State penalties can be 3x rent or higher. How much you can sue for and how to file.",
  },

  hero: {
    eyebrowSuffix: "Harassment",
    h1: { pre: "Can I sue my landlord for ", em: "harassment", post: "?" },
    leadStrong: "Yes, you can sue your landlord for harassment",
    leadBody:
      " when they enter your unit without notice, threaten you, retaliate for complaints, or interfere with your right to quiet enjoyment. Damages depend on state law: California adds $2,000 per harassment act under Civ. Code § 1940.2. New York City authorizes 3x damages plus civil penalties.",
  },

  counter: {
    amount: 8500,
    meta: "Quiet enjoyment + state harassment statutes",
    rows: [
      { label: "Statutory damages (4 acts × $2,000)", value: "$8,000", emphasis: "accent" },
      { label: "Emotional distress + locks", value: "+ $400" },
      { label: "Filing fee + interest", value: "+ $100" },
    ],
    footer: "California Civ. Code § 1940.2 · per-act damages",
  },

  whatCounts: {
    h2: { pre: "What counts as ", em: "landlord harassment", post: "?" },
    lede:
      "Four behavior patterns that state laws and common law recognize as harassment.",
    cards: [
      {
        num: "01",
        title: "Repeated unauthorized entry",
        body:
          "Showing up without 24-hour notice (the standard in most states), entering when you are not home without an emergency, or using the master key during prohibited hours. Even one entry can be a privacy violation.",
      },
      {
        num: "02",
        title: "Threats and intimidation",
        body:
          "Verbal or written threats to evict, raise rent in retaliation, contact ICE or police about you, harm your pets, or damage your belongings. Texas, California, and New York have explicit anti-harassment statutes covering threats.",
      },
      {
        num: "03",
        title: "Retaliatory action",
        body:
          "Rent increases, refusing to renew, terminating services, or filing eviction within 6 months of you complaining about habitability, contacting code enforcement, or organizing with other tenants.",
      },
      {
        num: "04",
        title: "Interference with quiet enjoyment",
        body:
          "Disrupting utilities, removing amenities (laundry, parking) without notice, refusing to repair things on purpose, or tolerating noise complaints from other tenants only when directed at you.",
      },
    ],
    note: {
      strongIntro: "Document every incident.",
      rest:
        " Harassment cases are about patterns. Date, time, what was said, and any witnesses. Save voicemails, screenshot texts, and write a contemporaneous log. The pattern is what wins.",
    },
  },

  claim: {
    h2: { pre: "How much can you sue for ", em: "landlord harassment", post: "?" },
    lede:
      "Three categories of damages. Statutory damages are the largest in California, New York, and a few other states. Other states require proving actual harm.",
    layers: [
      {
        tag: "Layer 1",
        title: "Statutory damages",
        body:
          "California: up to $2,000 per harassment act under Civ. Code § 1940.2. NYC: 3x rent plus civil penalty. Texas: $500 to $2,500 plus fees under Prop. Code § 92.331. Most states have a per-act or per-month structure.",
        amount: "$8,000",
        accent: true,
      },
      {
        tag: "Layer 2",
        title: "Actual damages",
        body:
          "Money you spent because of the harassment: changed locks after unauthorized entry, security cameras, therapy bills, missed work for hearings or moving, hotel nights when you felt unsafe.",
        amount: "+ $400",
      },
      {
        tag: "Layer 3",
        title: "Filing fees and interest",
        body:
          "Court filing fee, service-of-process cost, statutory attorney fees in most harassment statutes (you can recover them even pro se), and pre- and post-judgment interest.",
        amount: "+ $100",
      },
    ],
    total: {
      label: "Sample harassment case in California",
      body:
        "Four documented unauthorized entries over three months, plus changed locks. $2,000 per entry under Civ. Code § 1940.2 plus actual costs.",
      amount: "$8,500",
      sublabel: "illustrative · varies by state and number of acts",
    },
  },

  demand: {
    h2: { pre: "Send a ", em: "cease-and-demand letter", post: " first." },
    lede:
      "Harassment letters serve two purposes: they create a paper trail for the lawsuit and they often stop the behavior immediately. Most landlords back off once they see the per-act statutory math.",
    checklist: [
      "Each documented incident with date and time",
      "Quotes from threats or unauthorized entries",
      "The statute you are relying on (per-act penalty)",
      "A demand for the behavior to stop",
      "A 14-day deadline before filing",
    ],
    letter: {
      certifiedNum: "7019 0140 0001 4827 3566",
      date: "April 21, 2026",
      recipientName: "Northbrook Properties LLC",
      recipientAddress: "555 California Street, San Francisco, CA 94104",
      reLine: "Cease harassment and demand for damages, Apt 8A",
      bodyParagraphs: [
        "On four separate occasions (logs attached) you entered my unit without the 24-hour notice required by Cal. Civ. Code § 1954: <strong>Feb 12, Feb 28, Mar 14, and Apr 5, 2026</strong>. On Feb 28 you also threatened to call ICE about my partner.",
        "Under <strong>Cal. Civ. Code § 1940.2</strong>, you are liable for damages of up to $2,000 per harassment act. I demand within <strong>fourteen (14) days</strong>:",
      ],
      demandList: [
        "Statutory damages of $8,000 (4 acts × $2,000);",
        "Reimbursement of $400 in lock changes;",
        "Written confirmation that all future entries will follow § 1954.",
      ],
      closingLine: "Total demand: <strong>$8,400.00</strong>. If unresolved, I will file in Small Claims Court.",
      signatory: "Sage A. Tenant",
    },
  },

  fileSteps: {
    h2: { pre: "How to ", em: "file", post: " a harassment case." },
    lede: "Four steps. The pattern is what wins. Document everything.",
    steps: [
      {
        title: "Build the log",
        body:
          "Date, time, what happened, witnesses, evidence (texts, voicemails, security footage, neighbor statements). One incident is hard. Four becomes a pattern.",
      },
      {
        title: "File",
        body:
          "Small claims if statutory damages fit your state cap. File in the county where the rental is located. Filing fees usually run $30 to $80.",
      },
      {
        title: "Serve",
        body:
          "Sheriff is recommended. Harassing landlords sometimes try to avoid service. File proof of service before the hearing.",
      },
      {
        title: "Hearing",
        body:
          "Lead with the timeline. Walk the judge through each incident date and the per-act statutory penalty. Have your log printed and ready.",
      },
    ],
    aftermath: {
      tag: "After you win",
      title: "Collecting and what comes next.",
      bodyHtml:
        "30-day voluntary payment, then enforcement. Harassment judgments are useful as injunctions: courts can order the landlord to stop the behavior under threat of contempt. If the landlord owns multiple units, the judgment may be admissible in other tenants&rsquo; cases.",
    },
  },

  evidence: {
    h2: { pre: "What evidence do you need to ", em: "win a harassment case", post: "?" },
    lede:
      "Harassment cases are pattern cases. Date logs and saved messages decide the outcome.",
    photos: [
      { id: "1601933470928-c84b1e09b73a", cap: "Door camera footage" },
      { id: "1554224155-1696413565d3", cap: "Email screenshots" },
      { id: "1591019479261-c10b4716a0ea", cap: "Property after entry" },
      { id: "1517245386807-bb43f82c33c4", cap: "Text thread" },
    ],
    texts: [
      { dir: "out", text: "I'll be there in 10 minutes. Have to look at something." },
      { dir: "in", text: "You need to give 24-hour notice." },
      { dir: "out", text: "I'll come whenever I want. It's my building." },
    ],
    receipt: {
      vendor: "ACE LOCKSMITH",
      vendorAddr: "Mission St · SF, CA",
      receiptNum: "Job #4127",
      date: "03/15/2026",
      lineItems: [
        { label: "Re-key apartment door", amount: "$185.00" },
        { label: "Smart deadbolt installation", amount: "$210.00" },
        { label: "Service call", amount: "$45.00" },
      ],
      subtotal: "$440.00",
      total: "$440.00",
      footer: "Receipt for tenant claim · thank you",
    },
  },

  defenses: {
    h2: { pre: "Common landlord ", em: "defenses", post: "." },
    lede:
      "Three defenses come up. Each has a clean rebuttal if you have the documentation.",
    items: [
      {
        quote: "It was an emergency.",
        pill: "Most common",
        rebuttal:
          "<strong>Rebuttal:</strong> emergencies are fires, burst pipes, or suspected medical emergencies, not routine inspections or showings. If the landlord cannot describe a specific imminent harm, the entry was not an emergency.",
      },
      {
        quote: "We gave reasonable notice.",
        pill: "Procedural",
        rebuttal:
          "<strong>Rebuttal:</strong> the standard is 24 hours in writing in most states. Verbal heads-up at 6 AM does not count. Save the timestamped texts and voicemails.",
      },
      {
        quote: "The tenant misinterpreted the situation.",
        pill: "Credibility",
        rebuttal:
          "<strong>Rebuttal:</strong> patterns and witnesses. Three or four documented incidents with neighbor statements or security footage outweigh he-said-she-said disputes.",
      },
    ],
  },

  outcomes: {
    h2: { pre: "How much do tenants ", em: "actually win", post: "?" },
    lede:
      "Harassment outcomes vary by state. California's per-act statute makes it the highest-paying jurisdiction. Other states require proving actual harm.",
    bands: [
      {
        label: "Low",
        range: "$500 to $2,000",
        body:
          "<strong>Single incident or weak documentation.</strong> One unauthorized entry, no witnesses, no actual costs. Best chance is in per-act statutory states.",
        tier: "low",
      },
      {
        label: "Mid",
        range: "$3,000 to $10,000",
        body:
          "<strong>Documented pattern over months.</strong> Four to six incidents, written records, some out-of-pocket costs (locks, security cameras). Solid recovery in California, NY.",
        tier: "mid",
      },
      {
        label: "High",
        range: "$10,000+",
        body:
          "<strong>Severe pattern or specific damages.</strong> Threats with police involvement, retaliation eviction, ongoing emotional distress with therapy bills. Often moves to civil court.",
        tier: "high",
      },
    ],
  },

  stateSection: null,

  alternatives: {
    h2: { pre: "What are the ", em: "alternatives", post: " to suing for harassment?" },
    lede:
      "Three other paths. Pick based on whether you want the behavior to stop or you want money for what already happened.",
    cards: [
      {
        title: "Restraining order",
        pillLabel: "Stop the behavior",
        pillTier: "primary",
        whenItFits:
          "the harassment is ongoing or escalating to threats. Civil restraining orders force the landlord to stay away under threat of contempt.",
        tradeoff:
          "Goes to family or civil court, not small claims. Faster injunction but no money.",
      },
      {
        title: "Small claims (recommended)",
        pillLabel: "Best for damages",
        pillTier: "primary",
        whenItFits:
          "you have a documented pattern of incidents and want to recover statutory and actual damages.",
        tradeoff:
          "30 to 90 day timeline. Filing fee around $50.",
      },
      {
        title: "Civil rights complaint",
        pillLabel: "Discrimination",
        pillTier: "warn",
        whenItFits:
          "the harassment is tied to your race, religion, family status, disability, source of income, or sexual orientation. HUD and state agencies investigate for free.",
        tradeoff:
          "longer timeline but stronger remedies (injunctions, damages, civil penalties).",
      },
    ],
  },

  cta: {
    h2: { pre: "Make it ", em: "stop", post: "." },
    body:
      "Most harassment cases settle once the landlord sees the per-act statutory math. The demand letter alone often ends the behavior. Generate yours in under two minutes.",
    receipt: {
      label: "example · 4 unauthorized entries",
      items: [
        { label: "Statutory damages (4 × $2,000)", amount: "$8,000" },
        { label: "Locks + security cameras", amount: "+ $400" },
        { label: "Filing fee", amount: "+ $100" },
      ],
      total: "$8,500",
      totalLabel: "Total claim",
      note: "Illustrative. CA per-act statute is the highest. Other states require proving actual harm.",
    },
  },

  faqs: [
    {
      q: "What counts as landlord harassment?",
      a: "Repeated unauthorized entry, threats, retaliation for complaints, interfering with utilities or services, intimidating visits, and discrimination based on protected status. The pattern matters more than one incident. Keep a dated log of every event.",
    },
    {
      q: "How much can I sue my landlord for harassment?",
      a: "California: up to $2,000 per harassment act under Civ. Code § 1940.2. New York City: 3x rent plus civil penalty. Texas: $500 to $2,500 per § 92.331. Most cases recover $2,000 to $10,000 in small claims, depending on state and number of incidents.",
    },
    {
      q: "Can I sue my landlord for showing up unannounced?",
      a: "Yes. Most states require 24 hours of written notice. Repeated unannounced entries are a privacy violation and can be harassment under state statutes. Each entry is a separate act in California ($2,000 per).",
    },
    {
      q: "Can I sue my landlord for threatening to evict me?",
      a: "If the threat is connected to a protected activity (a complaint, organizing, contacting code enforcement), yes. That is retaliation, presumed in most states if the threat or action came within 6 months of the complaint. Save the message and the underlying complaint.",
    },
    {
      q: "What if my landlord threatens to call ICE or the police?",
      a: "Most states (California, New York, Illinois) have specific statutes against threats to report immigration status. California adds $2,000 per threat plus actual damages. Document the threat exactly as said.",
    },
    {
      q: "Can I sue for emotional distress from harassment?",
      a: "Sometimes. Pure emotional distress claims are hard in small claims without medical or therapy records. Cases that lead with statutory damages and add modest emotional-distress amounts on top do better than pure emotional cases.",
    },
    {
      q: "How do you prove a pattern of harassment?",
      a: "A contemporaneous log (date, time, what happened), saved texts and voicemails, neighbor statements, security camera footage, and any out-of-pocket costs the harassment caused (locks, hotel nights, therapy). Three or four documented incidents are usually enough.",
    },
  ],

  relatedSlugs: [
    "wrongful-eviction",
    "illegal-lockout",
    "after-moving-out",
    "break-lease",
    "unsafe-conditions",
    "security-deposit",
  ],
};
