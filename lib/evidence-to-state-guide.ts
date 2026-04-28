import type {
  StateGuide,
  ClaimCategory,
  Claim,
  Exclusion,
  StatutoryMultiplier,
  VenueRule,
  FeeTier,
  ServiceFee,
  StatuteOfLimitationsEntry,
  Form,
  ServiceMethod,
  CollectionMethod,
  CountyDifference,
  Pitfall,
  RecentChange,
  FAQ,
  Source,
  AtAGlanceFact,
  FormGroup,
} from "./types/state-guide";
import { STATES } from "./states";

// Defensive helpers — evidence packs are AI-generated; coerce gracefully.
const toStr = (x: unknown, fallback = ""): string =>
  typeof x === "string" ? x : x == null ? fallback : String(x);
const toNum = (x: unknown, fallback = 0): number =>
  typeof x === "number" && !Number.isNaN(x) ? x : fallback;
const toBool = (x: unknown, fallback = false): boolean =>
  typeof x === "boolean" ? x : x === "true" ? true : x === "false" ? false : fallback;
const toArr = <T>(x: unknown): T[] => (Array.isArray(x) ? (x as T[]) : []);

const toFormGroup = (x: unknown): FormGroup => {
  const v = toStr(x).toLowerCase();
  const allowed: FormGroup[] = [
    "starting","service","hearing","counterclaim","after-judgment","fee-waiver","appeal",
  ];
  return (allowed as string[]).includes(v) ? (v as FormGroup) : "starting";
};

interface EvidenceClaim {
  slug?: string;
  name?: string;
  example?: string;
  eligibility?: string;
  claim_statute?: string;
  notes?: string;
  damage_boost?: string;
  source_ids?: string[];
}
interface EvidenceCategory {
  id?: string;
  title?: string;
  blurb?: string;
  claims?: EvidenceClaim[];
}

export function evidenceToStateGuide(pack: Record<string, unknown>): StateGuide {
  const slug = toStr(pack.slug);
  const stateMeta = STATES.find((s) => s.slug === slug);
  const stateName = toStr(pack.state, stateMeta?.name ?? slug);
  const abbr = stateMeta?.abbr ?? toStr((pack as { abbr?: unknown }).abbr, "").toUpperCase();
  const asOf = toStr(pack.as_of, new Date().toISOString().split("T")[0]);

  const hero = (pack.hero as Record<string, unknown> | undefined) ?? {};
  const limits = (pack.limits as Record<string, unknown> | undefined) ?? {};
  const claimCats = toArr<EvidenceCategory>(pack.claim_categories);
  const exclusions = toArr<Record<string, unknown>>(pack.exclusions);
  const damages = (pack.damages as Record<string, unknown> | undefined) ?? {};
  const whereToFile = (pack.where_to_file as Record<string, unknown> | undefined) ?? {};
  const fees = (pack.fees as Record<string, unknown> | undefined) ?? {};
  const sol = (pack.statute_of_limitations as Record<string, unknown> | undefined) ?? {};
  const preFiling = (pack.pre_filing as Record<string, unknown> | undefined) ?? {};
  const formsArr = toArr<Record<string, unknown>>(pack.forms);
  const service = (pack.service as Record<string, unknown> | undefined) ?? {};
  const respDef = (pack.response_and_default as Record<string, unknown> | undefined) ?? {};
  const counterclaim = (pack.counterclaim as Record<string, unknown> | undefined) ?? {};
  const hearing = (pack.hearing as Record<string, unknown> | undefined) ?? {};
  const appeals = (pack.appeals as Record<string, unknown> | undefined) ?? {};
  const collection = (pack.collection as Record<string, unknown> | undefined) ?? {};
  const businesses = (pack.businesses as Record<string, unknown> | undefined) ?? {};
  const countyVar = toArr<Record<string, unknown>>(pack.county_variations);
  const pitfalls = toArr<Record<string, unknown>>(pack.pitfalls);
  const recentChanges = toArr<Record<string, unknown>>(pack.recent_changes);
  const faqs = toArr<Record<string, unknown>>(pack.faqs);
  const sources = toArr<Record<string, unknown>>(pack.sources);

  const indLimit = toNum(limits.individual_dollars, toNum(hero.individual_limit_dollars));
  const bizLimit = toNum(limits.business_dollars, toNum(hero.business_limit_dollars, indLimit));

  const heroOut: StateGuide["hero"] = {
    individualLimit: indLimit,
    businessLimit: bizLimit,
    typicalTimelineDays: {
      min: toNum(hero.typical_timeline_min_days, 30),
      max: toNum(hero.typical_timeline_max_days, 90),
    },
    filingFeeLow: toNum(hero.filing_fee_low_dollars),
    filingFeeHigh: toNum(hero.filing_fee_high_dollars),
    tagline: toStr(hero.tagline, `Small claims procedure for ${stateName}.`),
  };

  const ataGlance: AtAGlanceFact[] = toArr<Record<string, unknown>>(pack.at_a_glance).map((g) => ({
    label: toStr(g.label),
    value: toStr(g.value),
    detail: toStr(g.detail) || undefined,
  }));

  const limitsOut: StateGuide["limits"] = {
    individual: indLimit,
    business: bizLimit,
    annualCap: {
      count: toNum(((limits.annual_filing_cap as Record<string, unknown>) ?? {}).count),
      threshold: toNum(((limits.annual_filing_cap as Record<string, unknown>) ?? {}).threshold_dollars),
    },
    splitClaimsAllowed: toBool(limits.split_claims_allowed),
    splitClaimsExplanation: toStr(limits.split_claims_explanation, toStr(limits.split_claims_notes)),
    statute: toStr(limits.statute),
  };
  const guarWith = limits.guarantor_with_fee_max;
  if (typeof guarWith === "number") limitsOut.guarantorWithFee = guarWith;
  const guarWithout = limits.guarantor_without_fee_max;
  if (typeof guarWithout === "number") limitsOut.guarantorWithoutFee = guarWithout;

  const claimCategories: ClaimCategory[] = claimCats.map((cat, i) => {
    const claims: Claim[] = (cat.claims ?? []).map((c) => {
      const claim: Claim = {
        id: toStr(c.slug, `claim-${i}`),
        name: toStr(c.name, toStr(c.slug)),
        example: toStr(c.example),
        eligible: toStr(c.eligibility, "eligible") === "eligible",
      };
      if (c.notes) claim.notes = toStr(c.notes);
      if (c.claim_statute) claim.statute = toStr(c.claim_statute);
      if (c.damage_boost) claim.damageBoost = toStr(c.damage_boost);
      return claim;
    });
    return {
      id: toStr(cat.id, `cat-${i}`),
      title: toStr(cat.title, "Other"),
      blurb: toStr(cat.blurb),
      claims,
    };
  });

  const whatYouCannotSueFor: Exclusion[] = exclusions.map((e) => ({
    category: toStr(e.category),
    explanation: toStr(e.explanation),
    whereToGoInstead: toStr(e.where_to_go_instead) || undefined,
  }));

  const statMult: StatutoryMultiplier[] = toArr<Record<string, unknown>>(damages.statutory_multipliers).map((m) => ({
    claim: toStr(m.claim),
    multiplier: toStr(m.multiplier, toStr(m.explanation)),
    statute: toStr(m.statute),
  }));

  const damagesOut: StateGuide["damages"] = {
    compensatory: toBool(damages.compensatory_allowed, true),
    punitive: {
      available: toBool(damages.punitive_allowed),
      explanation: toStr(damages.punitive_explanation),
    },
    statutoryMultipliers: statMult,
    attorneyFees: {
      available: toStr(damages.attorney_fees_recoverable, "no").toLowerCase() !== "no",
      explanation: toStr(damages.attorney_fees_explanation),
    },
    interestRate: {
      rate: toNum(
        damages.postjudgment_interest_rate_pct,
        toNum(collection.post_judgment_interest_rate_pct),
      ),
      type: toStr(damages.postjudgment_interest_type, "simple") === "compound" ? "compound" : "simple",
      statute:
        toStr(damages.postjudgment_interest_statute) ||
        toStr(collection.post_judgment_interest_statute),
      notes:
        toStr(damages.postjudgment_interest_notes) ||
        toStr(collection.post_judgment_interest_notes),
    },
    feesRecoverable: toBool(damages.filing_and_service_fees_recoverable_from_loser, true),
  };

  const venueRules: VenueRule[] = toArr<Record<string, unknown>>(whereToFile.venue_rules).map((r) => ({
    scenario: toStr(r.scenario),
    filingOptions: toArr<string>(r.filing_options).map((x) => toStr(x)).filter(Boolean),
  }));

  const whereToFileOut: StateGuide["whereToFile"] = {
    courtName: toStr(whereToFile.court_name, "Small Claims Court"),
    parentCourt: toStr(whereToFile.parent_court),
    venueRules,
    consequencesOfWrongVenue: toStr(whereToFile.consequences_of_wrong_venue),
    eFilingAvailable: ((): "yes" | "no" | "varies" => {
      const v = toStr(whereToFile.e_filing_available, "varies").toLowerCase();
      return v === "yes" || v === "no" ? v : "varies";
    })(),
    eFilingNotes: toStr(whereToFile.e_filing_notes),
  };
  const efPortal = whereToFile.e_filing_portal;
  if (efPortal) whereToFileOut.eFilingPortal = toStr(efPortal);

  const tiers: FeeTier[] = toArr<Record<string, unknown>>(fees.filing_fee_tiers).map((t) => ({
    range:
      toStr(t.range_label) ||
      `$${toNum(t.range_min)} to $${toNum(t.range_max, toNum(t.range_max_dollars))}`,
    amount: toNum(t.fee_dollars, toNum(t.fee)),
  }));

  const serviceFees: ServiceFee[] = toArr<Record<string, unknown>>(fees.service_fees).map((s) => ({
    method: toStr(s.method),
    amount: toStr(s.amount_label, toStr(s.cost_dollars_or_range, toStr(s.cost))),
    notes: toStr(s.notes) || undefined,
  }));

  const waiver = (fees.waiver as Record<string, unknown> | undefined) ?? {};
  const feesOut: StateGuide["fees"] = {
    tiers: tiers.length ? tiers : [{ range: "All claims", amount: 0 }],
    frequentFiler: {
      threshold: toNum(((fees.frequent_filer as Record<string, unknown>) ?? {}).threshold_per_year),
      fee: toNum(((fees.frequent_filer as Record<string, unknown>) ?? {}).fee_dollars),
    },
    serviceFees,
    waiver: {
      forms: toArr<Record<string, unknown>>(waiver.forms).map((f) => {
        const form: { number: string; name: string; url?: string } = {
          number: toStr(f.number),
          name: toStr(f.name),
        };
        if (f.url) form.url = toStr(f.url);
        return form;
      }),
      eligibility: toArr<string>(waiver.eligibility_bullets).map((x) => toStr(x)).filter(Boolean),
      coverageNotes: toStr(waiver.coverage_notes),
    },
    otherFees: toArr<Record<string, unknown>>(fees.other_fees).map((o) => {
      const fee: { name: string; amount: string; notes?: string } = {
        name: toStr(o.name),
        amount: toStr(o.amount_label, toStr(o.amount)),
      };
      if (o.notes) fee.notes = toStr(o.notes);
      return fee;
    }),
  };
  const fr = fees.fees_recoverable_from_loser_notes;
  if (fr) feesOut.feesRecoverableNotes = toStr(fr);

  const solEntries: StatuteOfLimitationsEntry[] = toArr<Record<string, unknown>>(sol.entries).map((e, i) => {
    const entry: StatuteOfLimitationsEntry = {
      id: toStr(e.id, `sol-${i}`),
      claim: toStr(e.claim),
      years: toNum(e.years),
      clockStart: toStr(e.clock_starts, toStr(e.clock_start)),
    };
    if (e.statute) entry.statute = toStr(e.statute);
    if (e.notes) entry.notes = toStr(e.notes);
    return entry;
  });

  const statuteOfLimitations: StateGuide["statuteOfLimitations"] = {
    entries: solEntries,
    discoveryRuleNotes: toStr(sol.discovery_rule_notes),
    tollingNotes: toStr(sol.tolling_notes),
  };

  const preFilingOut: StateGuide["preFiling"] = {
    demandLetterRequired: toBool(preFiling.demand_letter_required),
    demandLetterRecommended: toBool(preFiling.demand_letter_recommended, true),
    demandLetterNotes: toStr(preFiling.demand_letter_notes),
    governmentClaimRequired: toBool(preFiling.government_claim_required),
    arbitrationClauseNotes:
      toStr(preFiling.arbitration_clauses_notes) ||
      (toBool(preFiling.arbitration_clauses_enforced)
        ? "Courts will enforce a valid arbitration clause."
        : "Arbitration enforcement varies."),
  };
  if (preFiling.government_claim_notes)
    preFilingOut.governmentClaimNotes = toStr(preFiling.government_claim_notes);
  if (preFiling.landlord_tenant_pre_filing_notes)
    preFilingOut.landlordTenantNotes = toStr(preFiling.landlord_tenant_pre_filing_notes);
  if (preFiling.consumer_protection_notes)
    preFilingOut.consumerProtectionNotes = toStr(preFiling.consumer_protection_notes);

  const forms: Form[] = formsArr.map((f) => {
    const form: Form = {
      number: toStr(f.number),
      name: toStr(f.name),
      description: toStr(f.description, toStr(f.purpose_one_line)),
      whoFiles: ((): "plaintiff" | "defendant" | "either" | "court" => {
        const v = toStr(f.filed_by, "plaintiff").toLowerCase();
        return v === "plaintiff" || v === "defendant" || v === "either" || v === "court" ? v : "either";
      })(),
      required: toBool(f.required, true),
      group: toFormGroup(f.group),
    };
    if (f.url) form.url = toStr(f.url);
    return form;
  });

  const serviceMethods: ServiceMethod[] = toArr<Record<string, unknown>>(service.methods).map((m) => {
    const method: ServiceMethod = {
      name: toStr(m.name),
      description: toStr(m.description, toStr(m.when_valid)),
    };
    const pros = toArr<string>(m.pros).map((x) => toStr(x)).filter(Boolean);
    const cons = toArr<string>(m.cons).map((x) => toStr(x)).filter(Boolean);
    if (pros.length) method.pros = pros;
    if (cons.length) method.cons = cons;
    return method;
  });

  const serviceOut: StateGuide["service"] = {
    whoCanServe: toArr<string>(service.who_can_serve).map((x) => toStr(x)).filter(Boolean),
    methods: serviceMethods,
    timing: {
      inCountyDays: toNum(service.in_county_days_before_hearing),
      outOfCountyDays: toNum(service.out_of_county_days_before_hearing),
    },
    proofFilingDeadlineDays: toNum(service.proof_filing_deadline_days_before_hearing),
    proofForm: {
      number: toStr(((service.proof_of_service_form as Record<string, unknown>) ?? {}).number),
      name: toStr(((service.proof_of_service_form as Record<string, unknown>) ?? {}).name),
    },
    businessServiceRules: toStr(service.business_service_rule),
    outOfStateNotes: toStr(service.out_of_state_defendant_notes),
    cantFindDefendant: toStr(service.cant_find_defendant_notes, toStr(service.cant_find_defendant)),
    avoidingService: toStr(service.avoiding_service_notes, toStr(service.avoiding_service)),
  };

  const responseOut: StateGuide["response"] = {
    defendantMustFileAnswer: toBool(respDef.must_file_written_answer),
    responseNotes: toStr(respDef.response_notes),
    defaultProcess: toStr(respDef.default_process),
    proveUpRequired: toBool(respDef.prove_up_required),
    proveUpNotes: toStr(respDef.prove_up_notes),
    motionToVacateForm: {
      number: toStr(((respDef.motion_to_vacate_form as Record<string, unknown>) ?? {}).number),
      name: toStr(((respDef.motion_to_vacate_form as Record<string, unknown>) ?? {}).name),
    },
    motionToVacateDeadlineDays: toNum(respDef.motion_to_vacate_deadline_days),
    motionToVacateLackOfNoticeDays: toNum(respDef.motion_to_vacate_lack_of_notice_days),
    motionToVacateAppealDeadlineDays: toNum(respDef.motion_to_vacate_appeal_deadline_days),
    motionToVacateAppealNotes: toStr(respDef.motion_to_vacate_appeal_notes),
  };

  const counterclaimOut: StateGuide["counterclaim"] = {
    allowed: toBool(counterclaim.allowed, true),
    form: {
      number: toStr(((counterclaim.form as Record<string, unknown>) ?? {}).number),
      name: toStr(((counterclaim.form as Record<string, unknown>) ?? {}).name),
    },
    sameMonetaryLimit: toBool(counterclaim.same_monetary_limit, true),
    serviceDeadlineSameCountyDays: toNum(counterclaim.service_deadline_in_county_days),
    serviceDeadlineOutOfCountyDays: toNum(counterclaim.service_deadline_out_of_county_days),
    transferToHigherCourt: {
      available: toBool(counterclaim.transfer_to_higher_court_available),
      statute: toStr(counterclaim.transfer_to_higher_court_statute) || undefined,
      notes: toStr(counterclaim.transfer_to_higher_court_notes),
    },
  };

  const hearingOut: StateGuide["hearing"] = {
    attorneysAllowed: toStr(hearing.lawyers_allowed, "yes").toLowerCase() !== "no",
    attorneysAllowedNotes: toStr(hearing.lawyers_allowed_notes),
    format: toStr(hearing.format, "Bench trial"),
    presider: toStr(hearing.presider, "Judge"),
    burdenOfProof: toStr(hearing.burden_of_proof, "preponderance"),
    whatToBring: toArr<string>(hearing.what_to_bring).map((x) => toStr(x)).filter(Boolean),
    interpretersFree: toBool(hearing.free_interpreters),
    interpreterNotes: toStr(hearing.interpreter_request_process),
    juryAllowed: toBool(hearing.jury_option),
    decisionTiming: toStr(hearing.decision_timing, "Mailed"),
    mediationOnHearingDay: {
      offered: toStr(hearing.on_site_mediation, "no").toLowerCase() !== "no",
      notes: toStr(hearing.on_site_mediation_notes),
    },
  };
  const subpoenaForm = hearing.subpoena_form as Record<string, unknown> | undefined;
  if (subpoenaForm && (subpoenaForm.number || subpoenaForm.name)) {
    const fpd = hearing.witness_fee_per_day_dollars;
    hearingOut.witnessSubpoenaForm = {
      number: toStr(subpoenaForm.number),
      name: toStr(subpoenaForm.name),
      ...(typeof fpd === "number" && fpd > 0 ? { feePerDay: fpd } : {}),
    };
  }

  const appealsOut: StateGuide["appeals"] = {
    whoCanAppeal: toStr(appeals.who_can_appeal, "either"),
    deadlineDays: toNum(appeals.deadline_days),
    fee: toNum(appeals.fee_dollars),
    type: ((): "de novo" | "on the record" | "other" => {
      const v = toStr(appeals.type, "de novo").toLowerCase();
      if (v.includes("de novo")) return "de novo";
      if (v.includes("on the record")) return "on the record";
      return "other";
    })(),
    typeNotes: toStr(appeals.type_notes),
    attorneysAllowedOnAppeal: toBool(appeals.attorneys_allowed_on_appeal, true),
    bondRequired: toBool(appeals.bond_required),
    automaticStayOnFiling: toBool(appeals.automatic_stay_on_appeal),
    notice: {
      form: toStr(((appeals.notice_of_appeal_form as Record<string, unknown>) ?? {}).number),
      name: toStr(((appeals.notice_of_appeal_form as Record<string, unknown>) ?? {}).name),
    },
    defaultJudgmentNotAppealable: !toBool(appeals.default_judgment_appealable, true),
    defaultJudgmentNotes: toStr(appeals.default_judgment_notes),
  };
  const fpd = appeals.frivolous_appeal_penalty_dollars;
  if (typeof fpd === "number" && fpd > 0) {
    appealsOut.frivolousPenalty = {
      available: true,
      cap: fpd,
      statute: toStr(appeals.frivolous_appeal_statute) || undefined,
      notes: toStr(appeals.frivolous_appeal_notes),
    };
  }

  const collectionMethods: CollectionMethod[] = toArr<Record<string, unknown>>(collection.methods).map((m) => {
    const method: CollectionMethod = {
      id: toStr(m.id, toStr(m.name).toLowerCase().replace(/\s+/g, "-")),
      name: toStr(m.name),
      blurb: toStr(m.blurb),
      description: toStr(m.description),
    };
    if (m.estimated_cost) method.estimatedCost = toStr(m.estimated_cost);
    if (m.effectiveness_notes) method.effectivenessNotes = toStr(m.effectiveness_notes);
    const exemptions = toArr<string>(m.exemptions).map((x) => toStr(x)).filter(Boolean);
    if (exemptions.length) method.exemptions = exemptions;
    return method;
  });

  const collectionOut: StateGuide["collection"] = {
    paymentDeadline: `${toNum(collection.payment_deadline_typical_days)} days`,
    interestRate: toNum(collection.post_judgment_interest_rate_pct),
    interestRateNotes: toStr(collection.post_judgment_interest_notes),
    methods: collectionMethods,
    judgmentLifespanYears: toNum(collection.judgment_lifespan_years),
    renewalProcess: toStr(collection.judgment_renewal_process),
    debtorExamForm: {
      number: toStr(((collection.debtor_exam_form as Record<string, unknown>) ?? {}).number),
      name: toStr(((collection.debtor_exam_form as Record<string, unknown>) ?? {}).name),
    },
    exemptions: toArr<string>(collection.exempt_assets).map((x) => toStr(x)).filter(Boolean),
    bankruptcyNotes: toStr(collection.bankruptcy_effect_notes),
    satisfactionForm: {
      number: toStr(((collection.satisfaction_of_judgment_form as Record<string, unknown>) ?? {}).number),
      name: toStr(((collection.satisfaction_of_judgment_form as Record<string, unknown>) ?? {}).name),
    },
    priorityNotes: toStr(collection.priority_notes),
  };

  const businessesOut: StateGuide["businesses"] = {
    representation: toStr(businesses.self_representation_notes),
    canSendEmployee: toBool(businesses.can_send_employee),
    canSendAttorney: toBool(businesses.can_send_attorney, true),
    insuranceAdjusterAllowed: toBool(businesses.insurance_adjuster_allowed),
    outOfStateNotes: toStr(businesses.out_of_state_business_statute),
  };
  const repForm = businesses.non_attorney_representation_form as Record<string, unknown> | undefined;
  if (repForm && (repForm.number || repForm.name)) {
    businessesOut.representationForm = {
      number: toStr(repForm.number),
      name: toStr(repForm.name),
    };
  }
  const fictForm = businesses.fictitious_name_form as Record<string, unknown> | undefined;
  if (fictForm && (fictForm.number || fictForm.name)) {
    businessesOut.fictitiousNameForm = {
      number: toStr(fictForm.number),
      name: toStr(fictForm.name),
    };
  }
  if (businesses.fictitious_name_notes) businessesOut.fictitiousNameNotes = toStr(businesses.fictitious_name_notes);
  if (businesses.sole_proprietor_employee_exception)
    businessesOut.soleProprietorEmployeeException = toStr(businesses.sole_proprietor_employee_exception);
  if (businesses.licensing_notes) businessesOut.licensingNotes = toStr(businesses.licensing_notes);

  // Group county variations by county
  const countyByName: Record<string, { topic: string; detail: string }[]> = {};
  for (const cv of countyVar) {
    const county = toStr(cv.county);
    if (!county) continue;
    if (!countyByName[county]) countyByName[county] = [];
    countyByName[county].push({
      topic: toStr(cv.topic, "Difference"),
      detail: toStr(cv.detail, toStr(cv.summary_one_line)),
    });
  }
  const countyDifferences: CountyDifference[] = Object.entries(countyByName).map(([county, differences]) => ({
    county,
    differences,
  }));

  const pitfallsOut: Pitfall[] = pitfalls.map((p) => ({
    title: toStr(p.title),
    whatHappens: toStr(p.what_happens),
    howToAvoid: toStr(p.how_to_avoid),
  }));

  const recentChangesOut: RecentChange[] = recentChanges.map((c) => {
    const chg: RecentChange = {
      date: toStr(c.date),
      title: toStr(c.title, toStr(c.summary_one_line).slice(0, 60)),
      description: toStr(c.description, toStr(c.summary_one_line)),
    };
    const bill = c.bill_or_rule_citation;
    if (bill) chg.bill = toStr(bill);
    return chg;
  });

  const faqsOut: FAQ[] = faqs.map((f) => ({
    question: toStr(f.question),
    answer: toStr(f.answer),
  }));

  const sourcesOut: Source[] = sources.map((s) => {
    const src: Source = {
      label: toStr(s.label),
      url: toStr(s.url),
    };
    if (s.citation) src.citation = toStr(s.citation);
    return src;
  });

  return {
    state: stateName,
    slug,
    abbr,
    lastUpdated: asOf,
    hero: heroOut,
    ataGlance,
    limits: limitsOut,
    whatYouCanSueFor: claimCategories,
    whatYouCannotSueFor,
    damages: damagesOut,
    whereToFile: whereToFileOut,
    fees: feesOut,
    statuteOfLimitations,
    preFiling: preFilingOut,
    forms,
    service: serviceOut,
    response: responseOut,
    counterclaim: counterclaimOut,
    hearing: hearingOut,
    appeals: appealsOut,
    collection: collectionOut,
    businesses: businessesOut,
    countyDifferences,
    pitfalls: pitfallsOut,
    recentChanges: recentChangesOut,
    faqs: faqsOut,
    sources: sourcesOut,
  };
}
