// Orchestrator: county research → sequencing → report → mark ready.
//
// Idempotent. Safe to call from any payment success path; the first call
// inserts the collection_plans row (status='pending') and runs the pipeline.
// Subsequent calls for the same case no-op if a 'ready' row already exists.
//
// On any failure the row is stamped status='failed' with error_message so
// admin can inspect and retry.

import { createServiceRoleClient } from "../supabase/service-role";
import { marked } from "marked";
import { STATES, getStateByAbbr } from "../states";
import { fetchCountyPack } from "./county-research";
import { buildCollectionSequence, type StateContextLite, type DefendantContext } from "./sequencing";
import { writeCollectionReport } from "./report";
import { buildCollectionPlanHeader, stripDashes, stripMissingDataHedges } from "./header";
import { formatDisputeTypeShort } from "../cases/dispute-type-label";
import { getCaseClaimType } from "../cases/classify-claim-type";
import { appendDisclaimerMd, appendDisclaimerHtml } from "../cases/disclaimer";
import { notifyAdminOfResearchFailure } from "../case-research/notify-admin-failure";
import { notifyCustomerProductReady } from "../notifications/notify-product-ready";
import type { CollectionPlanIntake, CountyPack, CollectionSequence } from "./types";

interface EnsureResult {
  status:
    | "created"
    | "existing"
    | "in_progress"
    | "failed"
    | "skipped"
    | "cooldown"
    | "max_attempts_reached";
  planId: string | null;
  reason?: string;
  retry_available_at?: string;
}

// Cooldown window after a failed attempt. The page won't auto-fire a new
// attempt during this window so failures don't churn through API quota.
const RETRY_COOLDOWN_MS = 5 * 60 * 1000; // 5 minutes
// How long an in-progress row may sit without advancing before we treat it
// as abandoned. The pipeline bumps updated_at at every stage transition, and
// the slowest single stage (an LLM call) is a couple of minutes, so a gap
// this long means the previous run was interrupted (e.g. the serverless
// function was frozen after the response). When that happens we mark the
// dead row failed and start a fresh version instead of returning in_progress
// forever — which is what stranded buyers on a permanent "generating" screen.
const STALE_INPROGRESS_MS = 12 * 60 * 1000; // 12 minutes
// Stop auto-retrying after this many failures inside the lookback window.
// forceNew=true (admin) bypasses both limits.
const MAX_FAILED_VERSIONS = 3;
const MAX_FAILED_LOOKBACK_MS = 24 * 60 * 60 * 1000; // 24 hours

interface CaseRow {
  id: string;
  state: string;
  county: string | null;
  plaintiff_county: string | null;
  defendant_county: string | null;
  incident_county: string | null;
  plaintiff_name: string | null;
  defendant_name: string | null;
  defendant_email: string | null;
  defendant_phone: string | null;
  facts_narrative: string | null;
  amount_cents: number;
  intake_answers: Record<string, unknown> | null;
  dispute_type: string;
}

function pickCounty(c: CaseRow): string | null {
  return (
    c.plaintiff_county ||
    c.defendant_county ||
    c.incident_county ||
    c.county ||
    null
  );
}

function stateNameLong(abbr: string): string {
  return STATES.find((s) => s.abbr.toUpperCase() === abbr.toUpperCase())?.name ?? abbr;
}

async function loadStateContext(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  admin: any,
  state: string,
): Promise<StateContextLite> {
  // state_research is keyed by the full state slug ("new-york", not "ny").
  // Use the canonical lookup so the report writer actually gets the
  // exemption schedule, interest rate, and renewal period that already
  // live in state_research.
  const stateInfo = getStateByAbbr(state);
  const slug = stateInfo?.slug ?? state.toLowerCase();
  const { data } = await admin
    .from("state_research")
    .select("structured_pack")
    .eq("slug", slug)
    .maybeSingle();
  const pack = (data?.structured_pack ?? {}) as Record<string, unknown>;

  const collection = (pack.collection_details ?? {}) as Record<string, unknown>;
  const recoverable = (pack.recoverable_amounts ?? {}) as Record<string, unknown>;
  const exemptionDetails = Array.isArray(collection.exemption_details)
    ? (collection.exemption_details as Array<{
        category?: string;
        dollar_amount_cents?: number | null;
        statute?: string;
        notes?: string;
      }>)
    : [];
  // Full readable summary so the report writer can quote real numbers and
  // statute citations instead of saying "this pack does not include..."
  const exemptionSummary = exemptionDetails
    .map((e) => {
      const parts: string[] = [];
      const cat = e.category ?? "unknown";
      const amt =
        e.dollar_amount_cents != null
          ? `$${(e.dollar_amount_cents / 100).toLocaleString("en-US")}`
          : "no fixed cap";
      parts.push(`${cat} (${amt}${e.statute ? `, ${e.statute}` : ""})`);
      if (e.notes) parts.push(e.notes);
      return parts.join(" — ");
    })
    .join("; ");

  // Pull the additional state-level fields the report writer + sequencer
  // can use to add real depth (collectability signals, state quirks,
  // statutory multipliers, tax implications, exemption-election rule,
  // out-of-state domestication).
  const collectabilitySignals = Array.isArray(pack.defendant_collectability_signals)
    ? (pack.defendant_collectability_signals as string[])
    : [];
  const stateQuirks = Array.isArray(pack.state_specific_quirks)
    ? (pack.state_specific_quirks as string[])
    : [];
  const statutoryMultipliers = Array.isArray(pack.statutory_multipliers)
    ? (pack.statutory_multipliers as Array<{
        statute?: string;
        multiplier?: number | null;
        conditions?: string;
      }>).map((m) => ({
        statute: m.statute ?? "",
        multiplier: m.multiplier ?? null,
        conditions: m.conditions ?? "",
      }))
    : [];
  const taxImpl = (pack.tax_implications ?? {}) as Record<string, unknown>;

  return {
    state: stateNameLong(state),
    post_judgment_interest_rate_pct:
      (recoverable.post_judgment_interest_rate_pct as number | null) ?? null,
    wage_garnishment_cap_pct:
      (collection.wage_garnishment_cap_pct as number | null) ?? null,
    judgment_renewal_years:
      (collection.judgment_renewal_years as number | null) ?? null,
    exemption_summary: exemptionSummary,
    satisfaction_required:
      (collection.satisfaction_required as boolean | null) ?? null,
    bankruptcy_stay_effects:
      (collection.bankruptcy_stay_effects as string) ?? "",
    federal_vs_state_exemption_rule:
      (collection.federal_vs_state_exemption_rule as string) ?? "",
    domestication_of_out_of_state_judgment:
      (collection.domestication_of_out_of_state_judgment as string) ?? "",
    defendant_collectability_signals: collectabilitySignals,
    state_specific_quirks: stateQuirks,
    statutory_multipliers: statutoryMultipliers,
    tax_implications: {
      recovery_taxability: (taxImpl.recovery_taxability as string) ?? "",
      form_1099_c_consideration: (taxImpl.form_1099_c_consideration as string) ?? "",
    },
  };
}

function deriveDefendantContext(c: CaseRow): DefendantContext {
  const a = (c.intake_answers ?? {}) as Record<string, unknown>;
  const kindRaw = a.score_defendant_kind as string | undefined;
  const validKinds = new Set([
    "business",
    "individual_stable",
    "individual_unknown",
    "government",
  ]);
  const kind =
    kindRaw && validKinds.has(kindRaw)
      ? (kindRaw as DefendantContext["kind"])
      : null;
  const entityType =
    typeof a.defendant_entity_type === "string" ? (a.defendant_entity_type as string) : null;
  const businessSubtype =
    typeof a.defendant_business_subtype === "string"
      ? (a.defendant_business_subtype as string)
      : null;
  const website =
    typeof a.defendant_website === "string" ? (a.defendant_website as string) : null;
  return {
    kind,
    name: c.defendant_name,
    entity_type: entityType,
    business_subtype: businessSubtype,
    email: c.defendant_email,
    phone: c.defendant_phone,
    website,
    notes: typeof a.dispute_type_other === "string" ? (a.dispute_type_other as string) : null,
  };
}

/**
 * Insert a pending row for this case and immediately run the pipeline. If a
 * 'ready' row already exists this is a no-op (returns existing). Background
 * caller should use opts.forceNew=true for admin re-runs.
 */
export async function ensureCollectionPlanForCase(
  caseId: string,
  opts: { forceNew?: boolean } = {},
): Promise<EnsureResult> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const admin = createServiceRoleClient() as any;

  const { data: existing } = await admin
    .from("collection_plans")
    .select("id, status, version, updated_at")
    .eq("case_id", caseId)
    .order("version", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (existing?.id && !opts.forceNew) {
    if (existing.status === "ready") {
      return { status: "existing", planId: existing.id };
    }
    if (existing.status !== "failed") {
      // A pipeline is either genuinely mid-flight, or it crashed/froze without
      // ever updating the row. Distinguish by staleness: if the row has kept
      // advancing recently, a run is live — don't double-fire. If it has sat
      // untouched past the stale window, the previous run is dead; mark it
      // failed and fall through to start a fresh version (self-healing).
      const lastTouch = existing.updated_at
        ? new Date(existing.updated_at).getTime()
        : 0;
      const staleMs = Date.now() - lastTouch;
      if (staleMs < STALE_INPROGRESS_MS) {
        return {
          status: "in_progress",
          planId: existing.id,
          reason: `existing row in status=${existing.status}`,
        };
      }
      // Stale → abandon the dead row so it stops blocking and so the admin
      // sweep/alert can see it. Then continue below to start a new version.
      await admin
        .from("collection_plans")
        .update({
          status: "failed",
          error_message: `abandoned: no progress for ${Math.round(
            staleMs / 60000,
          )}m in status=${existing.status} (previous run likely interrupted)`,
          updated_at: new Date().toISOString(),
        })
        .eq("id", existing.id);
    }

    // The latest row is failed. Two backoff checks before we auto-retry.

    // (1) Per-failure cooldown: don't immediately re-fire if the last
    // failure was within the last 5 minutes.
    const lastUpdated = existing.updated_at
      ? new Date(existing.updated_at).getTime()
      : 0;
    const sinceFailureMs = Date.now() - lastUpdated;
    if (sinceFailureMs < RETRY_COOLDOWN_MS) {
      const retryAt = new Date(lastUpdated + RETRY_COOLDOWN_MS).toISOString();
      return {
        status: "cooldown",
        planId: existing.id,
        reason: "in_cooldown",
        retry_available_at: retryAt,
      };
    }

    // (2) Max failures in a 24h window: stop auto-retrying after 3 in a
    // row. Admin can still force a new version with opts.forceNew.
    const lookbackIso = new Date(Date.now() - MAX_FAILED_LOOKBACK_MS).toISOString();
    const { data: recentFailures } = await admin
      .from("collection_plans")
      .select("id", { count: "exact", head: false })
      .eq("case_id", caseId)
      .eq("status", "failed")
      .gte("updated_at", lookbackIso);
    if (
      Array.isArray(recentFailures) &&
      recentFailures.length >= MAX_FAILED_VERSIONS
    ) {
      return {
        status: "max_attempts_reached",
        planId: existing.id,
        reason: `${recentFailures.length} failures in last 24h`,
      };
    }
  }

  const nextVersion = existing?.version ? existing.version + 1 : 1;

  // Load case + intake_answers.collection_plan_intake to get the user's intake.
  const { data: caseRow, error: caseErr } = await admin
    .from("cases")
    .select(
      "id, state, county, plaintiff_county, defendant_county, incident_county, plaintiff_name, defendant_name, defendant_email, defendant_phone, facts_narrative, amount_cents, intake_answers, dispute_type",
    )
    .eq("id", caseId)
    .maybeSingle();
  if (caseErr || !caseRow) {
    return { status: "skipped", planId: null, reason: "case_not_found" };
  }
  const c = caseRow as CaseRow;

  const intakeFromAnswers = ((c.intake_answers ?? {}) as Record<string, unknown>)
    .collection_plan_intake as CollectionPlanIntake | undefined;
  if (!intakeFromAnswers) {
    return {
      status: "skipped",
      planId: null,
      reason: "intake missing (collection_plan_intake not on case)",
    };
  }

  const county = pickCounty(c);
  if (!county) {
    return { status: "skipped", planId: null, reason: "no_county" };
  }

  // Insert the pending row up front so the case page can show progress.
  const { data: inserted, error: insErr } = await admin
    .from("collection_plans")
    .insert({
      case_id: caseId,
      version: nextVersion,
      intake: intakeFromAnswers,
      status: "county_researching",
    })
    .select("id")
    .single();
  if (insErr || !inserted) {
    return { status: "skipped", planId: null, reason: `insert_failed: ${insErr?.message}` };
  }
  const planId = inserted.id as string;

  async function fail(message: string): Promise<EnsureResult> {
    await admin
      .from("collection_plans")
      .update({
        status: "failed",
        error_message: message,
        updated_at: new Date().toISOString(),
      })
      .eq("id", planId);
    // Alert the team so an admin can fix + re-run; the customer keeps seeing the
    // "generating" status, never an error. Never throws.
    await notifyAdminOfResearchFailure({
      product: "Collection Plan",
      caseId,
      jobId: planId,
      stage: "collection-plan-generate",
      error: message,
    });
    return { status: "failed", planId, reason: message };
  }

  // 1) County research
  let countyPack: CountyPack;
  try {
    const r = await fetchCountyPack({ state: c.state, county });
    countyPack = r.pack;
  } catch (err) {
    return fail(`county_research_failed: ${err instanceof Error ? err.message : String(err)}`);
  }

  await admin
    .from("collection_plans")
    .update({
      county_pack: countyPack,
      status: "sequencing",
      updated_at: new Date().toISOString(),
    })
    .eq("id", planId);

  // 2) State context
  let stateCtx: StateContextLite;
  try {
    stateCtx = await loadStateContext(admin, c.state);
  } catch (err) {
    return fail(`state_context_failed: ${err instanceof Error ? err.message : String(err)}`);
  }

  // 3) Sequencing
  const defendantCtx = deriveDefendantContext(c);
  let sequence: CollectionSequence;
  let sequenceModel = "";
  try {
    const r = await buildCollectionSequence({
      intake: intakeFromAnswers,
      state_context: stateCtx,
      county_pack: countyPack,
      defendant: defendantCtx,
    });
    sequence = r.sequence;
    sequenceModel = r.model;
  } catch (err) {
    return fail(`sequencing_failed: ${err instanceof Error ? err.message : String(err)}`);
  }

  await admin
    .from("collection_plans")
    .update({
      sequence,
      status: "generating_report",
      updated_at: new Date().toISOString(),
    })
    .eq("id", planId);

  // Prefer the LLM-resolved canonical claim type label; fall back to the
  // wizard slug formatted for display. This shows up in the report header.
  const classification = await getCaseClaimType(caseId).catch(() => null);
  const claimTypeLabel = classification?.primary_claim_type
    ? classification.primary_claim_type.replace(/_/g, " ")
    : formatDisputeTypeShort(
        c.dispute_type,
        typeof ((c.intake_answers ?? {}) as Record<string, unknown>).dispute_type_other === "string"
          ? (((c.intake_answers ?? {}) as Record<string, unknown>).dispute_type_other as string)
          : null,
      );

  const todayDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // 4) Report
  let bodyMd = "";
  let reportModel = "";
  try {
    const r = await writeCollectionReport({
      case: {
        plaintiff_name: c.plaintiff_name,
        defendant_name: c.defendant_name,
        state: c.state,
        county,
        claim_type_label: claimTypeLabel,
        facts_narrative: c.facts_narrative,
      },
      today_date: todayDate,
      intake: intakeFromAnswers,
      county_pack: countyPack,
      state_context: stateCtx,
      sequence,
      defendant: defendantCtx,
    });
    bodyMd = r.body_md;
    reportModel = r.model;
  } catch (err) {
    return fail(`report_failed: ${err instanceof Error ? err.message : String(err)}`);
  }

  // Deterministic post-processing of the LLM output. Two safety nets:
  //  1. Strip em-dashes / en-dashes the user has banned site-wide.
  //  2. Strip "the X does not list Y online" hedge phrases the model keeps
  //     slipping in. Replace "in forma pauperis" with "fee waiver."
  const cleanBody = stripMissingDataHedges(stripDashes(bodyMd));

  // Build the header server-side (plaintiff vs defendant, judgment amount,
  // claim type, date). Generating this deterministically guarantees a
  // consistent format across every plan and saves the LLM from re-doing it.
  const { headerMd, headerHtml } = buildCollectionPlanHeader({
    plaintiff_name: c.plaintiff_name,
    defendant_name: c.defendant_name,
    judgment_amount_cents: intakeFromAnswers.judgment_amount_cents,
    claim_type_label: claimTypeLabel,
    today_date: todayDate,
  });

  // Compose the markdown body with the deterministic header at the top and
  // the shared customer-facing disclaimer at the bottom.
  const finalMd = appendDisclaimerMd(`${headerMd}${cleanBody}`);
  // Pre-render to HTML so the customer view and admin editor both have a
  // ready-to-use HTML representation. body_md remains the canonical source.
  const bodyContentHtml = marked.parse(cleanBody, {
    async: false,
    breaks: true,
  }) as string;
  const finalHtml = appendDisclaimerHtml(`${headerHtml}${bodyContentHtml}`);

  await admin
    .from("collection_plans")
    .update({
      body_md: finalMd,
      body_html: finalHtml,
      status: "ready",
      generated_by: `${sequenceModel || "seq"}+${reportModel || "report"}`,
      updated_at: new Date().toISOString(),
    })
    .eq("id", planId);

  // The plan just became viewable. Email the customer so they don't have to
  // sit on the status page waiting. This runs once per successful generation
  // (the only path that reaches status='ready'); never throws.
  await notifyCustomerProductReady({
    caseId,
    product: "Collection Plan",
    viewPath: `/case/${caseId}/collection`,
  });

  return { status: "created", planId };
}
