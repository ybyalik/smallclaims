// Fake-case generator for end-to-end testing both flows:
//   1. Pre-purchase ("draft" mode)  — status='draft', intake_version=2, drops
//      the spawning admin into /case/[id]/build with the wizard fields filled
//      so they can test the review step + checkout.
//   2. Post-purchase ("paid" mode)  — status='demand_paid', drops them into
//      /case/[id] with the case file ready for the demand-letter pipeline.
//
// Hand-crafted scenarios were removed; everything is generated randomly from
// per-category templates. There's one template per canonical dispute_type
// surfaced in the picker, so "Spawn random" rotates across all 11.
//
// IMPORTANT: dispute_type values here must match the canonical 11+other
// taxonomy from lib/demand-letter/categories.ts and lib/supabase/types.ts.
// Old legacy values (security_deposit, services_not_rendered, breach_of_contract,
// defective_product_or_service) have been retired and should not be used here.

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

// No baked scenarios. The runner only spawns random ones.
export const TEST_SCENARIOS: TestScenario[] = [];

export function getTestScenario(_slug: string): TestScenario | null {
  return null;
}

// ---------------------------------------------------------------------------
// Random scenario generator — one template per canonical category.
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

interface NarrativeArgs {
  plaintiff: string;
  defendant: string;
  amount: string;
  incidentDate: string;
  demandDate: string;
  city: string;
  state: string;
}

interface ScenarioTemplate {
  dispute_type: DisputeType;
  defendantBusiness: boolean;
  amountRange: [number, number];
  narrative: (a: NarrativeArgs) => string;
  description: (state: string, amount: string) => string;
  defendantName?: (random: () => string) => string;
}

const TEMPLATES: ScenarioTemplate[] = [
  {
    dispute_type: "landlord",
    defendantBusiness: true,
    amountRange: [80000, 450000],
    narrative: ({ defendant, amount, incidentDate, demandDate, city }) =>
      `I rented an apartment from ${defendant} for the past year and paid a ${amount} security deposit. I moved out ${incidentDate} in clean condition with no damage. The landlord has not returned the deposit and has not provided an itemized statement of deductions. I sent a written demand on ${demandDate} via certified mail with photos of the move-out condition; they have not responded. The property is in ${city}.`,
    description: (state, amount) => `${state} landlord/tenant case. Landlord withheld ${amount} security deposit after move-out.`,
  },
  {
    dispute_type: "auto",
    defendantBusiness: false,
    amountRange: [80000, 350000],
    narrative: ({ defendant, amount, incidentDate, demandDate, city }) =>
      `${defendant} backed into my parked car in ${city} on ${incidentDate}. They were apologetic at the scene and exchanged information but have refused to pay the body-shop estimate of ${amount}. I sent a written demand on ${demandDate} with the repair invoice and photos. No response. I have witness contact info and the police report.`,
    description: (state, amount) => `${state} auto/vehicle case. ${amount} repair bill, defendant refusing to pay after parked-car hit.`,
  },
  {
    dispute_type: "personal_loan",
    defendantBusiness: false,
    amountRange: [50000, 300000],
    narrative: ({ defendant, amount, incidentDate, demandDate }) =>
      `I lent ${defendant} ${amount} on ${incidentDate} to help cover their rent and an emergency car repair. We had a written agreement (text exchange + signed IOU) that they'd repay within 90 days. The deadline has passed by months. They've gone quiet and stopped answering my texts. I sent a written demand on ${demandDate}. I have screenshots, the IOU, and bank-transfer records.`,
    description: (state, amount) => `${state} personal loan case. ${amount} owed by individual; deadline passed and borrower non-responsive.`,
  },
  {
    dispute_type: "contractor",
    defendantBusiness: true,
    amountRange: [150000, 900000],
    narrative: ({ defendant, amount, incidentDate, demandDate, city }) =>
      `I hired ${defendant} on ${incidentDate} to remodel a bathroom in my home in ${city}. I paid a ${amount} deposit upfront. They demolished the existing bathroom, did one day of framing work, and then disappeared. They stopped returning calls and texts. The bathroom has been unusable for weeks. I sent a written demand on ${demandDate}. I have the signed contract, payment receipt, and photos of the half-demolished bathroom.`,
    description: (state, amount) => `${state} contractor case. Contractor took ${amount} deposit and abandoned the job mid-demolition.`,
  },
  {
    dispute_type: "refund",
    defendantBusiness: true,
    amountRange: [40000, 250000],
    narrative: ({ defendant, amount, incidentDate, demandDate }) =>
      `I bought a product from ${defendant} on ${incidentDate} for ${amount}. It arrived defective and does not perform as advertised. I requested a refund within the return window; they refused, citing a "no refunds" policy that was not disclosed at purchase. I have the order confirmation, photos of the defect, and chat logs with their support team. I sent a final demand on ${demandDate}.`,
    description: (state, amount) => `${state} consumer refund case. ${amount} refund refused on a defective product despite advertised performance.`,
  },
  {
    dispute_type: "online_seller",
    defendantBusiness: false,
    amountRange: [25000, 200000],
    narrative: ({ defendant, amount, incidentDate, demandDate }) =>
      `I bought an item from ${defendant} on Facebook Marketplace on ${incidentDate} for ${amount}. They listed the item as functional and undamaged. After payment via Zelle, the item never shipped. They blocked me on Marketplace shortly after. I have screenshots of the listing, the chat thread, and the Zelle transfer. I sent a written demand to their address on ${demandDate}.`,
    description: (state, amount) => `${state} online purchase case. ${amount} paid for Marketplace item that was never shipped; seller blocked the buyer.`,
  },
  {
    dispute_type: "employer",
    defendantBusiness: true,
    amountRange: [100000, 600000],
    narrative: ({ defendant, amount, incidentDate, demandDate, city }) =>
      `I worked at ${defendant} in ${city} until my last day on ${incidentDate}. I'm owed ${amount} in unpaid final wages plus accrued PTO that the state requires they pay out. The owner promised the check was "in the mail" three times. It never arrived. I have my offer letter, time sheets, pay stubs, and the text-message exchanges with the owner. I sent a written demand on ${demandDate}.`,
    description: (state, amount) => `${state} wage case. Final paycheck of ${amount} unpaid; employer dodging.`,
  },
  {
    dispute_type: "property_damage",
    defendantBusiness: true,
    amountRange: [60000, 350000],
    narrative: ({ defendant, amount, incidentDate, demandDate }) =>
      `I hired ${defendant} to move my apartment on ${incidentDate}. During the move they dropped and shattered a custom-framed art piece and gouged a path through my hardwood floor. The estimated repair/replacement cost is ${amount}. Their dispatcher told me to file a claim with the company; the company offered me $50 citing a "released-value" clause I never signed. I have the bill of lading, photos of the damage, and the appraisal. I sent a written demand on ${demandDate}.`,
    description: (state, amount) => `${state} property damage case. ${amount} damage by mover; company hiding behind unsigned release.`,
  },
  {
    dispute_type: "medical_billing",
    defendantBusiness: true,
    amountRange: [50000, 400000],
    narrative: ({ defendant, amount, incidentDate, demandDate }) =>
      `I received a bill from ${defendant} on ${incidentDate} for ${amount} for an in-network procedure that should have been fully covered by my insurance. The provider billed me directly without first submitting to insurance. I called repeatedly, sent the EOB showing my insurance covered it, and asked them to reverse the charge. They sent the bill to collections anyway. I have the EOB, my insurance card on file, and call logs. I sent a written demand on ${demandDate}.`,
    description: (state, amount) => `${state} medical billing case. ${amount} balance billed despite in-network coverage; sent to collections.`,
  },
  {
    dispute_type: "insurance",
    defendantBusiness: true,
    amountRange: [100000, 600000],
    narrative: ({ defendant, amount, incidentDate, demandDate }) =>
      `I filed a renters-insurance claim with ${defendant} on ${incidentDate} for ${amount} after a water leak from the unit above destroyed my electronics, furniture, and a laptop I use for work. They denied the claim citing an exclusion for "gradual leaks" — but the building plumber's report shows the leak was a sudden pipe failure, not gradual. I have the plumber's report, the policy, photos of the damage, and the receipts/replacement quotes. I sent a written demand on ${demandDate}.`,
    description: (state, amount) => `${state} insurance case. Renters claim of ${amount} wrongly denied as gradual leak despite plumber's sudden-failure report.`,
  },
  {
    dispute_type: "pet_injury",
    defendantBusiness: false,
    amountRange: [40000, 250000],
    narrative: ({ defendant, amount, incidentDate, demandDate, city }) =>
      `On ${incidentDate}, ${defendant}'s dog escaped their yard and bit my dog as we walked past on a public sidewalk in ${city}. The vet bill for emergency care, sutures, and follow-up came to ${amount}. The owner admitted at the scene the gate was broken; their homeowner's insurer told me they'd cover it, then later denied the claim. I have the vet records, animal-control report, and photos of the injuries. I sent a written demand on ${demandDate}.`,
    description: (state, amount) => `${state} pet injury case. ${amount} vet bill from neighbor's dog attack; insurer denied.`,
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
      // The wizard root walks 5 prescreen + 6 main steps and redirects to
      // the first unfilled one. Setting the keys it checks for lets a draft
      // scenario skip straight to /review so the spawning admin can test
      // the review step + checkout. (See app/(wizard)/case/[id]/build/page.tsx.)
      recipient_state: state.abbr,
      eligibility: { adult: true, private_party: true, within_sol: true },
      eligibility_passed: true,
      recovery_seen: true,
      // Plain-text explanation the user would type into the claim-amount step.
      amount_calculation: `Principal owed: ${amountUsd}. This is the dollar amount the other party agreed to pay or the documented loss they're responsible for.`,
      evidence_skipped: true,
    },
  };
}
