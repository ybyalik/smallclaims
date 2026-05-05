// Pre-baked fake cases for end-to-end testing the case-research pipeline.
// Each scenario is a complete case payload as if a user finished the wizard.

import type { PostalAddress, DisputeType } from "../supabase/types";

export interface TestScenario {
  slug: string;
  label: string;
  description: string;
  state: string;
  county: string | null;
  dispute_type: DisputeType;
  amount_cents: number;
  plaintiff_name: string;
  plaintiff_email: string;
  plaintiff_phone: string;
  plaintiff_address: PostalAddress;
  plaintiff_county: string;
  defendant_name: string;
  defendant_email: string | null;
  defendant_phone: string | null;
  defendant_address: PostalAddress;
  defendant_county: string;
  incident_county: string;
  facts_narrative: string;
  intake_answers: Record<string, unknown>;
}

export const TEST_SCENARIOS: TestScenario[] = [
  {
    slug: "nj-security-deposit",
    label: "NJ — Security deposit (Middlesex County)",
    description:
      "Tenant in Old Bridge, NJ. Landlord withheld a $2,800 deposit 60 days after move-out. Classic NJSA 46:8-21.1 double-damages case.",
    state: "NJ",
    county: "Middlesex",
    dispute_type: "security_deposit",
    amount_cents: 280000,
    plaintiff_name: "Maya Reyes",
    plaintiff_email: "test+maya@civilcase.com",
    plaintiff_phone: "732-555-0142",
    plaintiff_address: {
      line1: "118 Bridge Way",
      city: "Old Bridge",
      state: "NJ",
      zip: "08857",
    },
    plaintiff_county: "Middlesex",
    defendant_name: "Riverside Property Holdings LLC",
    defendant_email: null,
    defendant_phone: "732-555-0190",
    defendant_address: {
      line1: "200 Main Street, Suite 4",
      city: "Old Bridge",
      state: "NJ",
      zip: "08857",
    },
    defendant_county: "Middlesex",
    incident_county: "Middlesex",
    facts_narrative:
      "I rented an apartment from Riverside Property Holdings from June 2024 to July 2025 and paid a $2,800 security deposit. I moved out July 31, 2025 in clean condition with no damage. The landlord did not return the deposit within 30 days and has not provided an itemized statement of deductions. I sent a written demand on October 12 with proof of move-out condition; they have not responded.",
    intake_answers: {
      plaintiff_entity_type: "individual",
      defendant_entity_type: "business",
      defendant_business_subtype: "llc",
      incident_date: "2025-08-30",
      incident_location: "Old Bridge, NJ 08857",
      incident_county: "Middlesex",
      eligibility: { adult: true, private_party: true, within_sol: true },
      eligibility_passed: true,
    },
  },
  {
    slug: "ca-unpaid-invoice",
    label: "CA — Unpaid contractor invoice (Santa Clara County)",
    description:
      "Freelance web developer in San Jose. Client owes $4,500 on a delivered project. Two invoices ignored.",
    state: "CA",
    county: "Santa Clara",
    dispute_type: "services_not_rendered",
    amount_cents: 450000,
    plaintiff_name: "Daniel Park",
    plaintiff_email: "test+daniel@civilcase.com",
    plaintiff_phone: "408-555-0119",
    plaintiff_address: {
      line1: "742 Evergreen Terrace",
      city: "San Jose",
      state: "CA",
      zip: "95112",
    },
    plaintiff_county: "Santa Clara",
    defendant_name: "BluePeak Marketing Inc.",
    defendant_email: "ap@bluepeakmarketing.test",
    defendant_phone: "415-555-0177",
    defendant_address: {
      line1: "55 Market Street, Floor 3",
      city: "San Francisco",
      state: "CA",
      zip: "94103",
    },
    defendant_county: "San Francisco",
    incident_county: "Santa Clara",
    facts_narrative:
      "I am a freelance web developer. I built a marketing website for BluePeak Marketing Inc. under a written agreement signed February 2025, total fee $4,500 due net-30 after launch. I delivered and launched the site on April 14, 2025. Final invoice sent April 14 and a follow-up June 1. They have not paid and have stopped responding to email.",
    intake_answers: {
      plaintiff_entity_type: "individual",
      defendant_entity_type: "business",
      defendant_business_subtype: "corp",
      incident_date: "2025-04-14",
      incident_location: "San Jose, CA 95112",
      incident_county: "Santa Clara",
      eligibility: { adult: true, private_party: true, within_sol: true },
      eligibility_passed: true,
    },
  },
  {
    slug: "tx-broken-contract",
    label: "TX — Broken contract (Travis County)",
    description:
      "Wedding photographer no-show in Austin. $1,800 refund owed. Justice of the Peace court territory.",
    state: "TX",
    county: "Travis",
    dispute_type: "breach_of_contract",
    amount_cents: 180000,
    plaintiff_name: "Lena Okafor",
    plaintiff_email: "test+lena@civilcase.com",
    plaintiff_phone: "512-555-0104",
    plaintiff_address: {
      line1: "904 Lavaca Street",
      city: "Austin",
      state: "TX",
      zip: "78701",
    },
    plaintiff_county: "Travis",
    defendant_name: "James Holloway",
    defendant_email: null,
    defendant_phone: "512-555-0166",
    defendant_address: {
      line1: "215 Oak Hollow Drive",
      city: "Austin",
      state: "TX",
      zip: "78745",
    },
    defendant_county: "Travis",
    incident_county: "Travis",
    facts_narrative:
      "I hired James Holloway to photograph my wedding on May 17, 2025 for a $1,800 fee paid in advance via Venmo. He did not show up the day of the event and never delivered any photos. He stopped answering calls and texts within a week. I have the booking contract, payment receipt, and call/text logs.",
    intake_answers: {
      plaintiff_entity_type: "individual",
      defendant_entity_type: "individual",
      incident_date: "2025-05-17",
      incident_location: "Austin, TX 78701",
      incident_county: "Travis",
      eligibility: { adult: true, private_party: true, within_sol: true },
      eligibility_passed: true,
    },
  },
];

export function getTestScenario(slug: string): TestScenario | null {
  return TEST_SCENARIOS.find((s) => s.slug === slug) ?? null;
}

// ---------------------------------------------------------------------------
// Random scenario generator
//
// Builds a plausible end-of-wizard case payload from random picks across
// states, claim types, dollar amounts, and party templates. Used by the
// test-scenarios page when the admin wants a fresh case beyond the three
// pre-baked ones.
// ---------------------------------------------------------------------------

const RANDOM_STATES: Array<{ abbr: string; sampleCity: string; sampleZip: string; county: string }> = [
  { abbr: "NJ", sampleCity: "Edison", sampleZip: "08817", county: "Middlesex" },
  { abbr: "NY", sampleCity: "Brooklyn", sampleZip: "11201", county: "Kings" },
  { abbr: "CA", sampleCity: "Oakland", sampleZip: "94612", county: "Alameda" },
  { abbr: "TX", sampleCity: "Austin", sampleZip: "78701", county: "Travis" },
  { abbr: "FL", sampleCity: "Miami", sampleZip: "33130", county: "Miami-Dade" },
  { abbr: "IL", sampleCity: "Chicago", sampleZip: "60614", county: "Cook" },
  { abbr: "WA", sampleCity: "Seattle", sampleZip: "98109", county: "King" },
  { abbr: "MA", sampleCity: "Boston", sampleZip: "02116", county: "Suffolk" },
  { abbr: "GA", sampleCity: "Atlanta", sampleZip: "30308", county: "Fulton" },
  { abbr: "PA", sampleCity: "Philadelphia", sampleZip: "19103", county: "Philadelphia" },
  { abbr: "AZ", sampleCity: "Phoenix", sampleZip: "85003", county: "Maricopa" },
  { abbr: "NC", sampleCity: "Charlotte", sampleZip: "28202", county: "Mecklenburg" },
];

const FIRST_NAMES = [
  "Maya", "Daniel", "Lena", "Marcus", "Aisha", "Jordan", "Priya", "Sam",
  "Olivia", "Noah", "Sofia", "Kai", "Riley", "Maria", "Jamal", "Elena",
];

const LAST_NAMES = [
  "Reyes", "Park", "Okafor", "Webb", "Patel", "Nguyen", "Cohen", "Ortiz",
  "Brennan", "Iyer", "Morrison", "Diaz", "Holloway", "Kim", "Walsh", "Chen",
];

const STREETS = [
  "Maple Avenue", "Bridge Way", "Lavaca Street", "Evergreen Terrace",
  "Oak Hollow Drive", "Market Street", "Birchwood Lane", "Park Avenue",
  "Sunset Boulevard", "Riverside Drive", "Pine Street", "Elm Court",
];

const BUSINESS_PREFIXES = ["Riverside", "BluePeak", "Summit", "Northstar", "Cypress", "Anchor", "Harbor", "Cedar"];
const BUSINESS_SUFFIXES = ["Holdings", "Marketing", "Solutions", "Properties", "Services", "Group", "Partners"];

interface ScenarioTemplate {
  dispute_type: DisputeType;
  defendantBusiness: boolean;
  amountRange: [number, number];
  narrative: (params: {
    plaintiff: string;
    defendant: string;
    amount: string;
    incidentDate: string;
    demandDate: string;
    city: string;
    state: string;
  }) => string;
  description: (state: string, amount: string) => string;
}

const TEMPLATES: ScenarioTemplate[] = [
  {
    dispute_type: "security_deposit",
    defendantBusiness: true,
    amountRange: [80000, 450000],
    narrative: ({ plaintiff: _p, defendant, amount, incidentDate, demandDate, city, state: _s }) =>
      `I rented an apartment from ${defendant} for the past year and paid a ${amount} security deposit. I moved out ${incidentDate} in clean condition with no damage. The landlord has not returned the deposit and has not provided an itemized statement of deductions. I sent a written demand on ${demandDate} via certified mail with photos of the move-out condition; they have not responded. The property is in ${city}.`,
    description: (state, amount) => `Tenant withholding case in ${state}. Landlord failed to return ${amount} deposit after move-out.`,
  },
  {
    dispute_type: "services_not_rendered",
    defendantBusiness: true,
    amountRange: [150000, 800000],
    narrative: ({ plaintiff: _p, defendant, amount, incidentDate, demandDate, city, state: _s }) =>
      `I am a freelance consultant. I delivered a project for ${defendant} under a written agreement signed earlier this year, total fee ${amount} due net-30 after delivery. I completed and handed off the work on ${incidentDate}. I sent the final invoice on ${incidentDate} and a follow-up on ${demandDate}. They have not paid and have stopped responding to email. The work was performed in ${city}.`,
    description: (state, amount) => `Unpaid invoice in ${state}. Freelancer delivered work; client owes ${amount} and is non-responsive.`,
  },
  {
    dispute_type: "breach_of_contract",
    defendantBusiness: false,
    amountRange: [60000, 300000],
    narrative: ({ plaintiff: _p, defendant, amount, incidentDate, demandDate, city, state: _s }) =>
      `I hired ${defendant} to provide a wedding-related service on ${incidentDate} for a ${amount} fee paid in advance via Venmo. They did not show up and never delivered. They stopped answering calls and texts within a week. I sent a written demand on ${demandDate}. I have the booking contract, payment receipt, and call logs. The event was in ${city}.`,
    description: (state, amount) => `Service no-show in ${state}. Vendor took ${amount} upfront and never delivered.`,
  },
  {
    dispute_type: "property_damage",
    defendantBusiness: false,
    amountRange: [80000, 350000],
    narrative: ({ plaintiff: _p, defendant, amount, incidentDate, demandDate, city, state: _s }) =>
      `${defendant} damaged my parked vehicle in ${city} on ${incidentDate}. They were apologetic at the scene and exchanged information but have refused to pay the body-shop estimate of ${amount}. I sent a written demand on ${demandDate} with the repair invoice and photos. No response. I have witness contact info and the police report.`,
    description: (state, amount) => `Auto property damage in ${state}. ${amount} repair bill, defendant refusing to pay.`,
  },
  {
    dispute_type: "defective_product_or_service",
    defendantBusiness: true,
    amountRange: [40000, 200000],
    narrative: ({ plaintiff: _p, defendant, amount, incidentDate, demandDate, city: _c, state: _s }) =>
      `I bought a product from ${defendant} on ${incidentDate} for ${amount}. It arrived defective and does not perform as advertised. I requested a refund within the return window; they refused, citing a "no refunds" policy not disclosed at purchase. I have order confirmation, photos of the defect, and chat logs. I sent a final demand on ${demandDate}.`,
    description: (state, amount) => `Defective product in ${state}. ${amount} refund refused despite advertised performance failure.`,
  },
];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function fmtUsd(cents: number): string {
  return `$${(cents / 100).toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
}

function isoDate(daysAgo: number): string {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().slice(0, 10);
}

function fmtPrettyDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export function generateRandomScenario(): TestScenario {
  const tpl = pick(TEMPLATES);
  const state = pick(RANDOM_STATES);
  const otherState = pick(RANDOM_STATES.filter((s) => s.abbr !== state.abbr));
  const amount = randInt(tpl.amountRange[0], tpl.amountRange[1]);
  // Round to nearest 25
  const amountCents = Math.round(amount / 2500) * 2500;
  const amountUsd = fmtUsd(amountCents);

  const plaintiffFirst = pick(FIRST_NAMES);
  const plaintiffLast = pick(LAST_NAMES);
  const plaintiffName = `${plaintiffFirst} ${plaintiffLast}`;

  let defendantName: string;
  if (tpl.defendantBusiness) {
    defendantName = `${pick(BUSINESS_PREFIXES)} ${pick(BUSINESS_SUFFIXES)} ${pick(["LLC", "Inc.", "Group"])}`;
  } else {
    defendantName = `${pick(FIRST_NAMES)} ${pick(LAST_NAMES)}`;
  }

  const incidentDays = randInt(20, 200);
  const demandDays = Math.max(7, Math.floor(incidentDays / 3));
  const incidentDateIso = isoDate(incidentDays);
  const demandDateIso = isoDate(demandDays);

  const narrative = tpl.narrative({
    plaintiff: plaintiffName,
    defendant: defendantName,
    amount: amountUsd,
    incidentDate: fmtPrettyDate(incidentDateIso),
    demandDate: fmtPrettyDate(demandDateIso),
    city: state.sampleCity,
    state: state.abbr,
  });

  const slug = `random-${state.abbr.toLowerCase()}-${tpl.dispute_type}-${Date.now().toString(36).slice(-5)}`;
  const label = `${state.abbr} - ${tpl.dispute_type.replace(/_/g, " ")} (${state.county} County)`;

  const plaintiffStreet = `${randInt(100, 9999)} ${pick(STREETS)}`;
  const defendantStreet = `${randInt(100, 9999)} ${pick(STREETS)}`;

  return {
    slug,
    label,
    description: tpl.description(state.abbr, amountUsd),
    state: state.abbr,
    county: state.county,
    dispute_type: tpl.dispute_type,
    amount_cents: amountCents,
    plaintiff_name: plaintiffName,
    plaintiff_email: `test+${plaintiffFirst.toLowerCase()}.${plaintiffLast.toLowerCase()}@civilcase.com`,
    plaintiff_phone: `${randInt(200, 999)}-555-${String(randInt(1000, 9999)).padStart(4, "0")}`,
    plaintiff_address: {
      line1: plaintiffStreet,
      city: state.sampleCity,
      state: state.abbr,
      zip: state.sampleZip,
    },
    plaintiff_county: state.county,
    defendant_name: defendantName,
    defendant_email: tpl.defendantBusiness ? `contact@${defendantName.toLowerCase().replace(/[^a-z]+/g, "")}.test` : null,
    defendant_phone: `${randInt(200, 999)}-555-${String(randInt(1000, 9999)).padStart(4, "0")}`,
    defendant_address: {
      line1: defendantStreet,
      // Defendant lives in the same state ~70% of the time, otherwise different
      // state to test cross-state venue rules.
      city: Math.random() < 0.7 ? state.sampleCity : otherState.sampleCity,
      state: Math.random() < 0.7 ? state.abbr : otherState.abbr,
      zip: Math.random() < 0.7 ? state.sampleZip : otherState.sampleZip,
    },
    defendant_county: Math.random() < 0.7 ? state.county : otherState.county,
    incident_county: state.county,
    facts_narrative: narrative,
    intake_answers: {
      plaintiff_entity_type: "individual",
      defendant_entity_type: tpl.defendantBusiness ? "business" : "individual",
      defendant_business_subtype: tpl.defendantBusiness ? "llc" : undefined,
      incident_date: incidentDateIso,
      incident_location: `${state.sampleCity}, ${state.abbr} ${state.sampleZip}`,
      incident_county: state.county,
      eligibility: { adult: true, private_party: true, within_sol: true },
      eligibility_passed: true,
    },
  };
}
