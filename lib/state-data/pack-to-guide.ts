// Convert a state_research.structured_pack record into the legacy
// StateGuide shape that the rest of the site (sitemap, case-score quiz,
// filing kit, category + issue templates) still expects.
//
// This is the bridge that lets us delete /data/*.ts and
// /reports/*-evidence.json without rewriting every consumer. The
// structured_pack is the canonical source going forward; consumers can
// migrate off the StateGuide shape one by one over time.

import type {
  StateGuide,
  StatuteOfLimitationsEntry,
  StatutoryMultiplier,
  FeeTier,
  ServiceFee,
  Form,
  ServiceMethod,
  CollectionMethod,
  Exclusion,
  Pitfall,
  Source,
  AtAGlanceFact,
} from "../types/state-guide";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Pack = Record<string, any>;

function num(v: unknown, fallback = 0): number {
  return typeof v === "number" && !Number.isNaN(v) ? v : fallback;
}
function str(v: unknown, fallback = ""): string {
  return typeof v === "string" ? v : fallback;
}
function arr<T>(v: unknown): T[] {
  return Array.isArray(v) ? (v as T[]) : [];
}
function cents(c: unknown): number | undefined {
  return typeof c === "number" ? c / 100 : undefined;
}

// Strip backend snake_case codes to plain English where they leak through.
const CLAIM_TYPE_LABEL: Record<string, string> = {
  written_contract: "Written contract",
  oral_contract: "Oral contract",
  open_account: "Unpaid invoice / open account",
  promissory_note: "Promissory note",
  property_damage: "Property damage",
  personal_injury: "Personal injury",
  fraud: "Fraud",
  wages: "Unpaid wages",
  final_paycheck: "Final paycheck",
  security_deposit: "Security deposit",
  conversion: "Stolen / kept property",
  defamation: "Defamation",
  negligence: "Negligence",
  breach_of_warranty: "Breach of warranty",
  bad_check: "Bad check",
  consumer_protection: "Consumer protection",
  trespass_to_chattels: "Trespass to chattels",
  quasi_contract: "Quasi-contract / unjust enrichment",
};

function humanizeClaim(code: string | undefined): string {
  if (!code) return "";
  const k = code.toLowerCase().trim();
  if (CLAIM_TYPE_LABEL[k]) return CLAIM_TYPE_LABEL[k];
  return k
    .split("_")
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : ""))
    .join(" ");
}

export interface MapInput {
  pack: Pack;
  state: string; // full name, "California"
  slug: string; // "california"
  abbr: string; // "CA"
  lastUpdated: string; // ISO date
}

export function packToStateGuide(input: MapInput): StateGuide {
  const { pack, state, slug, abbr, lastUpdated } = input;

  // ── Limits / hero ────────────────────────────────────────────────────
  const individualLimit = num(pack.claim_limit_dollars);
  const businessLimit = individualLimit; // structured_pack doesn't separate today

  const feeTierObjs = arr<{ fee_cents?: number; amount_band?: string; applies_to?: string }>(
    pack.filing_fee_tiers,
  );
  const feeCentsValues = feeTierObjs
    .map((t) => num(t.fee_cents))
    .filter((v) => v > 0);
  const filingFeeLow = feeCentsValues.length ? Math.min(...feeCentsValues) / 100 : 0;
  const filingFeeHigh = feeCentsValues.length ? Math.max(...feeCentsValues) / 100 : 0;

  const daysToHearing = num(pack.hearing_logistics?.typical_days_filing_to_hearing, 0);
  const tlMin = daysToHearing > 0 ? Math.max(daysToHearing - 14, 14) : 30;
  const tlMax = daysToHearing > 0 ? daysToHearing + 14 : 90;

  // ── Statute of limitations ───────────────────────────────────────────
  const sols = arr<{
    years?: number;
    citation?: string;
    claim_type?: string;
    when_clock_starts?: string;
  }>(pack.statute_of_limitations_by_claim_type);
  const solEntries: StatuteOfLimitationsEntry[] = sols.map((s, i) => ({
    id: `${slug}-sol-${s.claim_type ?? `row${i}`}`,
    claim: humanizeClaim(s.claim_type) || "Unknown",
    years: num(s.years),
    clockStart: str(s.when_clock_starts, "From the harm or breach"),
    statute: str(s.citation),
  }));

  // ── Statutory multipliers ────────────────────────────────────────────
  const multipliers = arr<{
    multiplier?: number | string;
    claim_types?: string[];
    statute?: string;
    conditions?: string;
  }>(pack.statutory_multipliers);
  const statutoryMultipliers: StatutoryMultiplier[] = multipliers.map((m) => {
    const claims = (m.claim_types ?? []).map(humanizeClaim).filter(Boolean).join(", ");
    const mult =
      typeof m.multiplier === "number"
        ? `${m.multiplier}x`
        : str(m.multiplier, "Bonus damages");
    return {
      claim: claims || "Specific claim types",
      multiplier: mult,
      statute: str(m.statute),
    };
  });

  // ── Filing fee tiers ─────────────────────────────────────────────────
  const tiers: FeeTier[] = feeTierObjs.map((t) => ({
    range: str(t.amount_band, "Claim"),
    amount: num(cents(t.fee_cents)),
  }));

  // ── Service fees ─────────────────────────────────────────────────────
  const serviceMethods = arr<{
    method?: string;
    cost_cents?: number;
    notes?: string;
    deadline_days_before_hearing?: number;
    allowed?: boolean;
    proof_of_service_form_code?: string;
  }>(pack.service_methods);
  const serviceFees: ServiceFee[] = serviceMethods
    .filter((m) => m.allowed !== false)
    .map((m) => ({
      method: humanizeClaim(m.method) || str(m.method, "Service"),
      amount: m.cost_cents === 0 ? "Free" : `$${num(cents(m.cost_cents))}`,
      notes: str(m.notes),
    }));

  // ── Fee waiver ────────────────────────────────────────────────────────
  const waiverRaw = pack.fee_schedule?.fee_waiver as
    | {
        available?: boolean;
        eligibility_criteria?: string | string[];
        form_code?: string;
        form_url?: string;
      }
    | undefined;
  const waiverEligibility: string[] = (() => {
    if (!waiverRaw) return [];
    if (Array.isArray(waiverRaw.eligibility_criteria)) {
      return waiverRaw.eligibility_criteria.filter((s) => typeof s === "string");
    }
    if (typeof waiverRaw.eligibility_criteria === "string") {
      return [waiverRaw.eligibility_criteria];
    }
    return [];
  })();
  const waiverForms = waiverRaw?.form_code
    ? [
        {
          number: waiverRaw.form_code,
          name: "Fee waiver application",
          url: waiverRaw.form_url || undefined,
        },
      ]
    : [];

  // ── Other fees: motion, jury, service court ──────────────────────────
  const fs = pack.fee_schedule ?? {};
  const otherFees: { name: string; amount: string; notes?: string }[] = [];
  if (typeof fs.motion_fee_cents === "number") {
    otherFees.push({
      name: "Motion fee (e.g. to vacate a default)",
      amount: `$${fs.motion_fee_cents / 100}`,
    });
  }
  if (typeof fs.jury_demand_fee_cents === "number") {
    otherFees.push({ name: "Jury demand fee", amount: `$${fs.jury_demand_fee_cents / 100}` });
  }
  if (typeof fs.service_fee_cents === "number" && fs.service_fee_cents > 0) {
    otherFees.push({ name: "Court-served service", amount: `$${fs.service_fee_cents / 100}` });
  }

  // ── Forms ────────────────────────────────────────────────────────────
  const formsRaw = arr<{
    code?: string;
    name?: string;
    purpose?: string;
    who_files?: string;
    required?: boolean;
    url?: string;
  }>(pack.forms_required);
  const forms: Form[] = formsRaw.map((f) => ({
    number: str(f.code),
    name: str(f.name, "Form"),
    description: str(f.purpose),
    whoFiles:
      f.who_files === "plaintiff" || f.who_files === "defendant" || f.who_files === "court"
        ? f.who_files
        : "either",
    required: f.required !== false,
    group: "starting",
    url: str(f.url) || undefined,
  }));

  // ── Where to file ────────────────────────────────────────────────────
  const efile = pack.efile_portal as
    | { name?: string; url?: string; account_required?: boolean }
    | undefined;
  const efileAvailable: "yes" | "no" | "varies" = efile?.name?.trim() || efile?.url?.trim()
    ? "yes"
    : "varies";

  // ── Pre-filing ───────────────────────────────────────────────────────
  const demandLetter = pack.demand_letter as
    | { required?: boolean; notes?: string; required_content?: string[] | string }
    | undefined;
  const govTort = pack.government_tort_claim_notice as
    | {
        required_for_government_defendants?: boolean;
        deadline_days?: number;
        recipient_address?: string;
        statute?: string;
      }
    | undefined;

  // ── Service ──────────────────────────────────────────────────────────
  const allowedMethods = serviceMethods.filter((m) => m.allowed !== false);
  const serviceTimingMin = allowedMethods.reduce(
    (m, x) => Math.max(m, num(x.deadline_days_before_hearing)),
    0,
  );
  const serviceMethodList: ServiceMethod[] = allowedMethods.map((m) => ({
    name: humanizeClaim(m.method) || str(m.method, "Service"),
    description: str(m.notes),
  }));

  // ── Hearing ──────────────────────────────────────────────────────────
  const hearing = pack.hearing_logistics ?? {};
  const cls = pack.classification ?? {};
  const attorneysAllowed = cls.attorneys_allowed !== false;

  // ── Appeals ──────────────────────────────────────────────────────────
  const ap = pack.appeal_details as
    | {
        type?: string;
        window_days?: number;
        who_can_appeal?: string;
        motion_to_vacate_default_window_days?: number;
      }
    | undefined;
  const appealType: "de novo" | "on the record" | "other" =
    ap?.type === "de_novo" || /de\s*novo/i.test(str(ap?.type))
      ? "de novo"
      : /on.*record|review/i.test(str(ap?.type))
        ? "on the record"
        : "other";

  // ── Collection ───────────────────────────────────────────────────────
  const cd = pack.collection_details ?? {};
  const postJudgmentSteps = arr<string>(pack.post_judgment_steps);
  const collectionMethods: CollectionMethod[] = postJudgmentSteps.slice(0, 6).map((step, i) => ({
    id: `${slug}-pjs-${i}`,
    name: step.split(/[.;:]/, 1)[0].trim().slice(0, 60),
    blurb: step,
    description: step,
  }));
  const exemptionDetails = arr<{ category?: string; statute?: string; notes?: string }>(
    cd.exemption_details,
  );
  const exemptionStrings: string[] = exemptionDetails
    .map((e) => str(e.category))
    .filter(Boolean);

  // ── Exclusions ───────────────────────────────────────────────────────
  const excludedRaw = arr<unknown>(pack.excluded_claim_types);
  const exclusions: Exclusion[] = excludedRaw.map((e) => {
    if (typeof e === "string") return { category: e, explanation: "" };
    const o = e as { type?: string; reason?: string };
    return { category: str(o.type, "Excluded"), explanation: str(o.reason) };
  });

  // ── Pitfalls ─────────────────────────────────────────────────────────
  const quirks = arr<unknown>(pack.state_specific_quirks);
  const pitfalls: Pitfall[] = quirks.map((q) => {
    const txt = typeof q === "string" ? q : str((q as { text?: string }).text);
    const [title, ...rest] = txt.split(/\.\s+/);
    return {
      title: title?.slice(0, 80) || "Quirk",
      whatHappens: txt,
      howToAvoid: rest.join(". ") || "Plan around this rule before filing.",
    };
  });

  // ── Sources ──────────────────────────────────────────────────────────
  const sourcesRaw = arr<{ title?: string; url?: string; citation?: string }>(pack.sources);
  const sources: Source[] = sourcesRaw.map((s) => ({
    label: str(s.title, str(s.url, "Source")),
    url: str(s.url),
    citation: str(s.citation) || undefined,
  }));

  // ── At-a-glance facts ────────────────────────────────────────────────
  const ataGlance: AtAGlanceFact[] = [
    {
      label: "Max claim",
      value: individualLimit ? `$${individualLimit.toLocaleString("en-US")}` : "—",
    },
    {
      label: "Filing fee",
      value:
        filingFeeLow && filingFeeHigh && filingFeeLow !== filingFeeHigh
          ? `$${filingFeeLow}-$${filingFeeHigh}`
          : filingFeeLow
            ? `$${filingFeeLow}`
            : "—",
    },
    { label: "Court", value: str(pack.court_name) || "Small claims court" },
    {
      label: "Filing to hearing",
      value: daysToHearing ? `~${daysToHearing} days` : "—",
    },
    { label: "Attorneys allowed", value: attorneysAllowed ? "Yes" : "No" },
    {
      label: "Appeal window",
      value: ap?.window_days ? `${ap.window_days} days` : "—",
    },
  ];

  // ── Compose ──────────────────────────────────────────────────────────
  return {
    state,
    slug,
    abbr,
    lastUpdated,
    hero: {
      individualLimit,
      businessLimit,
      typicalTimelineDays: { min: tlMin, max: tlMax },
      filingFeeLow,
      filingFeeHigh,
      tagline: `Small claims procedure for ${state}.`,
    },
    ataGlance,
    limits: {
      individual: individualLimit,
      business: businessLimit,
      annualCap: { count: 0, threshold: 0 },
      splitClaimsAllowed: !pack.claim_splitting_prohibited,
      splitClaimsExplanation: str(pack.frequency_caps),
      statute: "",
    },
    whatYouCanSueFor: [], // structured_pack doesn't carry claim categories with examples
    whatYouCannotSueFor: exclusions,
    damages: {
      compensatory: true,
      punitive: { available: false, explanation: "" },
      statutoryMultipliers,
      attorneyFees: {
        available: !!(pack.recoverable_amounts?.attorneys_fees_text || pack.recoverable_amounts?.attorneys_fees),
        explanation: str(pack.recoverable_amounts?.attorneys_fees_text),
      },
      interestRate: {
        rate: num(cd.post_judgment_interest_rate_pct ?? cd.post_judgment_interest_rate_percent, 0),
        type: "simple",
        notes: "",
      },
      feesRecoverable: true,
    },
    whereToFile: {
      courtName: str(pack.court_name, "Small claims court"),
      parentCourt: str(pack.filing_location),
      venueRules: [],
      consequencesOfWrongVenue: "",
      eFilingAvailable: efileAvailable,
      eFilingNotes: efile?.name || efile?.url ? "E-filing available via the state's online portal." : "",
      eFilingPortal: efile?.url || undefined,
    },
    fees: {
      tiers,
      frequentFiler: { threshold: 0, fee: 0 },
      serviceFees,
      waiver: {
        forms: waiverForms,
        eligibility: waiverEligibility,
        coverageNotes: "",
      },
      otherFees,
      feesRecoverableNotes: str(pack.recoverable_amounts?.costs_recoverable_text),
    },
    statuteOfLimitations: {
      entries: solEntries,
      discoveryRuleNotes: "",
      tollingNotes: "",
    },
    preFiling: {
      demandLetterRequired: !!demandLetter?.required,
      demandLetterRecommended: !demandLetter?.required,
      demandLetterNotes: str(demandLetter?.notes),
      governmentClaimRequired: !!govTort?.required_for_government_defendants,
      governmentClaimNotes:
        govTort?.required_for_government_defendants
          ? `Notice required within ${num(govTort.deadline_days, 90)} days. ${str(govTort.statute)}`
          : undefined,
      arbitrationClauseNotes: str(pack.arbitration_clause_considerations),
    },
    forms,
    service: {
      whoCanServe: [],
      methods: serviceMethodList,
      timing: { inCountyDays: serviceTimingMin || 21, outOfCountyDays: serviceTimingMin || 30 },
      proofFilingDeadlineDays: 0,
      proofForm: { number: "", name: "Proof of service" },
      businessServiceRules: "",
      outOfStateNotes: "",
      cantFindDefendant: "",
      avoidingService: "",
    },
    response: {
      defendantMustFileAnswer: true,
      responseNotes: "",
      defaultProcess: str(hearing.plaintiff_no_show_consequence),
      proveUpRequired: !!hearing.default_proveup_required,
      proveUpNotes: "",
      motionToVacateForm: { number: "", name: "Motion to vacate" },
      motionToVacateDeadlineDays: num(ap?.motion_to_vacate_default_window_days),
      motionToVacateLackOfNoticeDays: 0,
      motionToVacateAppealDeadlineDays: 0,
      motionToVacateAppealNotes: "",
    },
    counterclaim: {
      allowed: true,
      form: { number: "", name: "Counterclaim" },
      sameMonetaryLimit: true,
      serviceDeadlineSameCountyDays: 0,
      serviceDeadlineOutOfCountyDays: 0,
      transferToHigherCourt: {
        available: false,
        notes: str(pack.counterclaim_transfer_threshold),
      },
    },
    hearing: {
      attorneysAllowed,
      attorneysAllowedNotes: "",
      format: hearing.phone_video_appearance_allowed
        ? "Bench trial (in-person, phone, or video allowed)"
        : "Bench trial (in-person)",
      presider: "Judge",
      burdenOfProof: "Preponderance of the evidence",
      whatToBring: [
        "All original documents",
        `${num(hearing.copies_required, 3)} copies of every exhibit`,
        "All witnesses",
        "Damages calculation",
      ],
      interpretersFree: !!pack.accommodations?.available_languages?.length,
      interpreterNotes: str(pack.accommodations?.interpreter_request_process),
      juryAllowed: false,
      decisionTiming: "Usually ruled from the bench or mailed within a few days",
      mediationOnHearingDay: {
        offered: !!pack.court_mediation?.available,
        notes: str(pack.court_mediation?.when),
      },
    },
    appeals: {
      whoCanAppeal: str(ap?.who_can_appeal, "Either party"),
      deadlineDays: num(ap?.window_days),
      fee: 0,
      type: appealType,
      typeNotes: "",
      attorneysAllowedOnAppeal: true,
      bondRequired: false,
      automaticStayOnFiling: false,
      notice: { form: "", name: "Notice of appeal" },
      defaultJudgmentNotAppealable: false,
      defaultJudgmentNotes: "",
    },
    collection: {
      paymentDeadline: "30 days",
      interestRate: num(cd.post_judgment_interest_rate_pct ?? cd.post_judgment_interest_rate_percent, 0),
      interestRateNotes: "",
      methods: collectionMethods,
      judgmentLifespanYears: num(cd.judgment_renewal_years, 10),
      renewalProcess: "",
      debtorExamForm: { number: "", name: "Debtor's exam" },
      exemptions: exemptionStrings,
      bankruptcyNotes: str(cd.bankruptcy_stay_effects),
      satisfactionForm: { number: "", name: "Satisfaction of judgment" },
      priorityNotes: "",
    },
    businesses: {
      representation: "",
      canSendEmployee: false,
      canSendAttorney: attorneysAllowed,
      insuranceAdjusterAllowed: false,
      outOfStateNotes: "",
    },
    countyDifferences: [],
    pitfalls,
    recentChanges: [],
    faqs: [],
    sources,
  };
}
