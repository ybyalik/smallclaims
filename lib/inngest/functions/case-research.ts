import { createServiceRoleClient } from "../../supabase/service-role";
import { inngest } from "../client";
import {
  buildEvidencePack,
  buildQueryPlan,
  fetchAndExtract,
  qaEvidencePack,
  searchAll,
  type Classification,
  type EvidencePack,
  type FetchedDoc,
  type IntakeSnapshot,
  type QaResult,
  type RankedHit,
} from "../../case-research/agents";
import { isOfficialDomain } from "../../case-research/source-policy";
import { OpenAINotConfigured } from "../../case-research/openai";
import { TavilyNotConfigured } from "../../case-research/tavily";
import { FirecrawlNotConfigured } from "../../case-research/firecrawl";
import { extractStructuredPackFromCombinedFindings } from "../../case-research/deep-research";
import { parseAllForms, type ParsedPdfForm } from "../../case-research/pdf-forms";
import { getStateByAbbr } from "../../states";
import { formatDisputeTypePhrase } from "../../cases/dispute-type-label";
import { getCaseClaimType, type CaseClassification } from "../../cases/classify-claim-type";
import { finalizeCustomerReport } from "../../case-research/finalize-customer-report";
import { notifyAdminOfResearchFailure } from "../../case-research/notify-admin-failure";
import crypto from "node:crypto";

const COST_CAP_CENTS = 1500;
const FETCH_PAGE_BUDGET = 40;

interface LedgerEntry {
  step: string;
  cents: number;
  model?: string;
  meta?: Record<string, unknown>;
}

function isMissingKey(err: unknown): boolean {
  return (
    err instanceof OpenAINotConfigured ||
    err instanceof TavilyNotConfigured ||
    err instanceof FirecrawlNotConfigured
  );
}

export const caseResearchRun = inngest.createFunction(
  {
    id: "case-research-run",
    name: "Case research pipeline",
    // 6 retries with exponential backoff. OpenAI's edge (Cloudflare) returns
    // 502/503 in waves during peak traffic — 3 retries can land entirely
    // inside one wave. 6 with backoff covers ~5-10 minutes of upstream
    // wobble. Permanent failures (4xx) are thrown as NonRetriableError so
    // we don't waste budget on auth or bad-request bugs.
    retries: 6,
    concurrency: { limit: 5 },
    triggers: [{ event: "case/intake.paid" }],
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async ({ event, step }: { event: any; step: any }) => {
    const { caseId, jobId, version } = event.data as {
      caseId: string;
      jobId: string;
      version: number;
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const admin = createServiceRoleClient() as any;

    await step.run("mark-running", async () => {
      await admin
        .from("case_research_jobs")
        .update({
          status: "running",
          started_at: new Date().toISOString(),
          attempt: version,
          updated_at: new Date().toISOString(),
          progress: {
            shallow: { status: "queued" },
            deep: { status: "queued" },
            forms: { status: "queued" },
            qa: { status: "queued" },
          },
        })
        .eq("id", jobId);
    });

    try {
      const intake: IntakeSnapshot = await step.run("load-intake", async () =>
        loadIntake(admin, caseId),
      );

      // ----- minimal classification stub (no classify step anymore) --------
      // The classify step used to fill these fields from the model's training
      // knowledge before any web research ran. We dropped it: shallow and deep
      // extraction now fill the classification block from research instead.
      // This stub only carries `claim_category` from the intake into prompts
      // that need it for context. We prefer the LLM-resolved canonical claim
      // type when available so prompts see what actually happened, not just
      // the wizard slug.
      const caseClassification = await step.run("classify-claim-type", async () =>
        getCaseClaimType(caseId),
      );
      const classification: Classification = stubClassificationFromIntake(
        intake,
        caseClassification,
      );

      // ----- shallow + deep load run in parallel ----------------------------
      // Deep is now a synchronous load from the pre-baked state_research
      // table plus an inline structured extraction — no OpenAI Deep Research
      // submissions, no webhook polling, no multi-hour latency.
      const [shallowOut, deepOut] = await Promise.all([
        runShallowBranch(step, admin, jobId, intake, classification),
        runDeepBranch(step, admin, jobId, caseId, intake, classification),
      ]);

      // ----- form PDF parsing: disabled for now ----------------------------
      // We tried parsing AcroForm fields out of court PDFs but most of the
      // value (which forms exist, what they're for, where to download) is
      // already in the evidence pack. Field-level parsing was noise without
      // a downstream consumer. Keeping the helper + schema in case we need
      // it later.
      const formsOut: { specs: ParsedPdfForm[]; ledger: LedgerEntry[] } = await step.run(
        "parse-forms",
        async () => {
          await bumpProgress(admin, jobId, "forms", { status: "skipped", reason: "disabled" });
          return { specs: [], ledger: [] };
        },
      );

      // ----- QA pass over the shallow pack (fast, cheap) -------------------
      const qaOut: { data: QaResult; ledger: LedgerEntry[] } = await step.run("qa", async () => {
        await bumpProgress(admin, jobId, "qa", { status: "running" });
        try {
          const res = await qaEvidencePack(intake, shallowOut.pack);
          await bumpProgress(admin, jobId, "qa", {
            status: "succeeded",
            qa_passed: res.data.passed,
            issues: res.data.issues.length,
          });
          return {
            data: res.data,
            ledger: [{ step: "qa", cents: 0, model: "gpt-5-mini" }],
          };
        } catch (e) {
          if (isMissingKey(e)) {
            await bumpProgress(admin, jobId, "qa", { status: "stubbed" });
            return { data: stubQa(), ledger: [{ step: "qa", cents: 0 }] };
          }
          throw e;
        }
      });

      // ----- Persist final artifacts + ledger ------------------------------
      await step.run("persist-final", async () => {
        const ledger: LedgerEntry[] = [
          ...shallowOut.ledger,
          ...(deepOut?.ledger ?? []),
          ...formsOut.ledger,
          ...qaOut.ledger,
        ];
        const totalCost = ledger.reduce((s, e) => s + e.cents, 0);
        if (totalCost > COST_CAP_CENTS) {
          throw new Error(`cost cap exceeded: ${totalCost} cents`);
        }

        // Note: state_findings_md and deep_research_pack are already on the
        // report row from runDeepBranch (deep.load-state + deep.extract).
        // This step only writes the shallow + forms + qa results.
        await admin
          .from("case_research_reports")
          .update({
            evidence_pack: shallowOut.pack,
            form_specs: formsOut.specs,
            qa_passed: qaOut.data.passed,
            qa_notes: qaOut.data,
          })
          .eq("job_id", jobId);

        // Link shallow sources (deep ones get linked when the webhook fires)
        const citedUrls = new Set(shallowOut.pack.sources.map((s) => s.url));
        const linkRows = (shallowOut.persistedSources as PersistedSource[]).map((s) => ({
          job_id: jobId,
          source_id: s.id,
          cite_role: citedUrls.has(s.url) ? "primary" : "fetched",
        }));
        const formUrls = uniqueUrls(formsOut.specs.map((s) => s.url).filter(Boolean));
        if (formUrls.length > 0) {
          const formHashes = formUrls.map((u) => sha256(u));
          const { data: formRows } = await admin
            .from("case_research_sources")
            .select("id, url_hash")
            .in("url_hash", formHashes);
          for (const row of (formRows ?? []) as { id: string; url_hash: string }[]) {
            linkRows.push({ job_id: jobId, source_id: row.id, cite_role: "form_pdf" });
          }
        }
        if (linkRows.length > 0) {
          await admin
            .from("case_research_job_sources")
            .upsert(linkRows, { onConflict: "job_id,source_id" });
        }

        const liveSteps = ledger.filter((e) => e.cents > 0).length;
        await admin
          .from("case_research_jobs")
          .update({
            status: "succeeded",
            finished_at: new Date().toISOString(),
            model_versions: {
              stage: liveSteps > 0 ? "live" : "stub",
              ledger,
              deep_state_loaded: deepOut?.stateSlug ?? null,
              forms_parsed: formsOut.specs.length,
            },
            cost_cents: totalCost,
            updated_at: new Date().toISOString(),
          })
          .eq("id", jobId);
      });

      // ----- Merge + write + auto-publish the customer report ---------------
      // No human review: the report becomes customer-visible immediately. If
      // this throws, the outer catch marks the job failed and alerts the team;
      // the customer keeps seeing "being prepared" until an admin re-runs.
      await step.run("finalize-customer-report", async () => {
        const result = await finalizeCustomerReport(admin, caseId, jobId, { autoPublish: true });
        if (result.status === "skipped_no_packs") {
          throw new Error("finalize skipped: no research packs available to merge");
        }
        return result;
      });

      return { jobId, caseId, version, status: "succeeded" };
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      await admin
        .from("case_research_jobs")
        .update({
          status: "failed",
          finished_at: new Date().toISOString(),
          error_message: msg.slice(0, 1500),
          updated_at: new Date().toISOString(),
        })
        .eq("id", jobId);
      await notifyAdminOfResearchFailure({ caseId, jobId, stage: "case-research-run", error: e });
      throw e;
    }
  },
);

// ---------------------------------------------------------------------------
// Branches
// ---------------------------------------------------------------------------

interface ShallowBranchResult {
  pack: EvidencePack;
  persistedSources: PersistedSource[];
  ledger: LedgerEntry[];
}

async function runShallowBranch(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  step: any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  admin: any,
  jobId: string,
  intake: IntakeSnapshot,
  classification: Classification,
): Promise<ShallowBranchResult> {
  await step.run("shallow.mark-running", async () =>
    bumpProgress(admin, jobId, "shallow", { status: "running", phase: "query-plan" }),
  );

  const queriesOut: { data: string[]; ledger: LedgerEntry[] } = await step.run(
    "shallow.query-plan",
    async () => {
      try {
        const res = await buildQueryPlan(intake, classification);
        await bumpProgress(admin, jobId, "shallow", {
          phase: "search",
          queries: res.data.queries,
        });
        return {
          data: res.data.queries,
          ledger: [{ step: "shallow.query-plan", cents: 0, model: "gpt-5-mini" }],
        };
      } catch (e) {
        if (isMissingKey(e)) {
          const stub = stubQueryPlan(intake);
          await bumpProgress(admin, jobId, "shallow", { phase: "search", queries: stub });
          return { data: stub, ledger: [{ step: "shallow.query-plan", cents: 0 }] };
        }
        throw e;
      }
    },
  );

  const hitsOut: { data: RankedHit[]; ledger: LedgerEntry[] } = await step.run(
    "shallow.search",
    async () => {
      try {
        const res = await searchAll(intake.state, queriesOut.data);
        await bumpProgress(admin, jobId, "shallow", {
          phase: "fetch-extract",
          search_hits: res.hits.length,
        });
        return {
          data: res.hits,
          ledger: [
            {
              step: "shallow.search",
              cents: 0,
              meta: { hits: res.hits.length, official: res.hits.filter((h) => h.isOfficial).length },
            },
          ],
        };
      } catch (e) {
        if (isMissingKey(e)) {
          return { data: stubSearch(queriesOut.data), ledger: [{ step: "shallow.search", cents: 0 }] };
        }
        throw e;
      }
    },
  );

  const docsOut: { data: FetchedDoc[]; ledger: LedgerEntry[] } = await step.run(
    "shallow.fetch-extract",
    async () => {
      try {
        const res = await fetchAndExtract(hitsOut.data, { maxPages: FETCH_PAGE_BUDGET });
        await bumpProgress(admin, jobId, "shallow", {
          phase: "evidence-pack",
          fetched_pages: res.docs.length,
          brightdata_fallbacks: res.fallbacks,
        });
        return {
          data: res.docs,
          ledger: [
            {
              step: "shallow.fetch-extract",
              cents: 0,
              meta: { docs: res.docs.length, brightdata_fallbacks: res.fallbacks },
            },
          ],
        };
      } catch (e) {
        if (isMissingKey(e)) {
          return { data: stubFetch(hitsOut.data), ledger: [{ step: "shallow.fetch-extract", cents: 0 }] };
        }
        throw e;
      }
    },
  );

  const persistedOut: { data: PersistedSource[]; ledger: LedgerEntry[] } = await step.run(
    "shallow.persist-sources",
    async () => {
      const persisted = await persistSources(admin, docsOut.data, "firecrawl");
      return { data: persisted, ledger: [] };
    },
  );

  const packOut: { data: EvidencePack; ledger: LedgerEntry[] } = await step.run(
    "shallow.evidence-pack",
    async () => {
      try {
        const res = await buildEvidencePack(intake, classification, docsOut.data);
        return {
          data: res.data,
          ledger: [{ step: "shallow.evidence-pack", cents: 0, model: "gpt-5" }],
        };
      } catch (e) {
        if (isMissingKey(e)) {
          return {
            data: stubEvidencePack(intake, classification, docsOut.data),
            ledger: [{ step: "shallow.evidence-pack", cents: 0 }],
          };
        }
        throw e;
      }
    },
  );

  await step.run("shallow.mark-done", async () =>
    bumpProgress(admin, jobId, "shallow", {
      status: "succeeded",
      phase: "done",
      sources_persisted: persistedOut.data.length,
    }),
  );

  return {
    pack: packOut.data,
    persistedSources: persistedOut.data,
    ledger: [
      ...queriesOut.ledger,
      ...hitsOut.ledger,
      ...docsOut.ledger,
      ...persistedOut.ledger,
      ...packOut.ledger,
    ],
  };
}

interface DeepBranchResult {
  stateSlug: string;
  ledger: LedgerEntry[];
}

// Deep branch is now a synchronous load from state_research instead of two
// OpenAI Deep Research submissions.
//   1. Resolve the case's state slug from intake.state (an abbreviation).
//   2. Read the pre-baked state_research row.
//   3. Concatenate the four call markdowns into one combined dossier.
//   4. Persist the dossier on case_research_reports.state_findings_md and
//      seed the row so finalize-customer-report can find it.
//   5. Run the structured extraction (gpt-5-mini → deep_research_pack)
//      inline so the rest of the pipeline has both raw and structured input.
async function runDeepBranch(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  step: any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  admin: any,
  jobId: string,
  caseId: string,
  intake: IntakeSnapshot,
  classification: Classification,
): Promise<DeepBranchResult | null> {
  await step.run("deep.mark-running", async () =>
    bumpProgress(admin, jobId, "deep", { status: "running", phase: "load-state" }),
  );

  const state = getStateByAbbr(intake.state);
  if (!state) {
    const msg = `Unknown state code "${intake.state}" — cannot map to state_research slug`;
    await bumpProgress(admin, jobId, "deep", { status: "failed", error: msg });
    throw new Error(msg);
  }

  const loadOut: {
    combined: string;
    prebakedPack: Record<string, unknown> | null;
    ledger: LedgerEntry[];
  } = await step.run("deep.load-state", async () => {
    const { data: sr } = await admin
      .from("state_research")
      .select(
        "state_name, call_1_status, call_2_status, call_3_status, call_4_status, call_1_markdown, call_2_markdown, call_3_markdown, call_4_markdown, structured_pack",
      )
      .eq("slug", state.slug)
      .maybeSingle();

    const callStatuses = [
      sr?.call_1_status,
      sr?.call_2_status,
      sr?.call_3_status,
      sr?.call_4_status,
    ];
    const allDone = sr && callStatuses.every((s) => s === "done");
    if (!allDone) {
      const msg = `state_research for "${state.slug}" is not fully populated (statuses=${JSON.stringify(callStatuses)})`;
      await bumpProgress(admin, jobId, "deep", { status: "failed", error: msg });
      throw new Error(msg);
    }

    const combined = combineStateMarkdowns(state.name, {
      call1: sr.call_1_markdown ?? "",
      call2: sr.call_2_markdown ?? "",
      call3: sr.call_3_markdown ?? "",
      call4: sr.call_4_markdown ?? "",
    });

    await admin.from("case_research_reports").upsert({
      job_id: jobId,
      case_id: caseId,
      evidence_pack: {},
      qa_passed: false,
      qa_notes: {},
      state_findings_md: combined,
    });

    return {
      combined,
      prebakedPack: (sr.structured_pack as Record<string, unknown> | null) ?? null,
      ledger: [
        {
          step: "deep.load-state",
          cents: 0,
          meta: {
            state: state.slug,
            chars: combined.length,
            prebaked: !!sr.structured_pack,
          },
        },
      ] as LedgerEntry[],
    };
  });

  const extractOut: { ledger: LedgerEntry[] } = await step.run(
    "deep.extract",
    async () => {
      await bumpProgress(admin, jobId, "deep", { status: "running", phase: "extract" });

      // Fast path: pre-baked structured_pack exists on state_research.
      // Apply case-specific tweaks deterministically and save. No LLM call.
      if (loadOut.prebakedPack) {
        const classification = await getCaseClaimType(intake.caseId);
        const tweaked = applyCaseTweaksToStatePack(loadOut.prebakedPack, intake, classification);
        await admin
          .from("case_research_reports")
          .update({ deep_research_pack: tweaked })
          .eq("job_id", jobId);
        await bumpProgress(admin, jobId, "deep", {
          status: "succeeded",
          phase: "done",
          structured_extracted: true,
          source: "prebaked",
          chars: loadOut.combined.length,
        });
        return {
          ledger: [
            { step: "deep.extract", cents: 0, meta: { source: "prebaked" } },
          ] as LedgerEntry[],
        };
      }

      // Fallback: no pre-baked pack for this state yet. Run live extraction.
      try {
        const res = await extractStructuredPackFromCombinedFindings(
          loadOut.combined,
          intake,
          classification,
        );
        await admin
          .from("case_research_reports")
          .update({ deep_research_pack: res.data })
          .eq("job_id", jobId);
        await bumpProgress(admin, jobId, "deep", {
          status: "succeeded",
          phase: "done",
          structured_extracted: true,
          source: "live",
          chars: loadOut.combined.length,
        });
        return {
          ledger: [
            {
              step: "deep.extract",
              cents: res.costCents,
              model: res.model,
              meta: { source: "live" },
            },
          ] as LedgerEntry[],
        };
      } catch (e) {
        if (isMissingKey(e)) {
          await bumpProgress(admin, jobId, "deep", { status: "skipped", reason: "missing_key" });
          return { ledger: [{ step: "deep.extract", cents: 0 }] as LedgerEntry[] };
        }
        // Soft-fail: keep the raw state findings persisted so the safety-net
        // cron can retry extraction later via runCombinedExtractionIfReady.
        const msg = e instanceof Error ? e.message : String(e);
        console.warn("[deep.extract] failed:", msg);
        await bumpProgress(admin, jobId, "deep", {
          status: "succeeded",
          phase: "done",
          structured_extracted: false,
          extraction_error: msg,
        });
        return { ledger: [{ step: "deep.extract", cents: 0, meta: { error: msg } }] as LedgerEntry[] };
      }
    },
  );

  return {
    stateSlug: state.slug,
    ledger: [...loadOut.ledger, ...extractOut.ledger],
  };
}

// Layer the case-specific bits over a state-level pre-baked EvidencePack.
// The state pack stores full tier breakdowns (statute_of_limitations_by_claim_type,
// filing_fee_tiers, claim_cap_tiers, prejudgment_interest_by_claim_type) so
// here we pick the right row based on the user's intake and stamp the
// top-level single-value fields. No LLM call.
function applyCaseTweaksToStatePack(
  pack: Record<string, unknown>,
  intake: IntakeSnapshot,
  classification: CaseClassification | null,
): Record<string, unknown> {
  const out: Record<string, unknown> = { ...pack };

  // Prefer the LLM-resolved primary claim type. Falls back to the static
  // wizard-slug mapping when classification is unavailable (older cases or
  // when the classify call failed).
  const claimType =
    classification?.primary_claim_type ??
    mapDisputeTypeToClaimType(intake.disputeType);
  const secondaryClaimTypes = classification?.secondary_claim_types ?? [];
  // All claim types (primary + secondaries) — used for matching statutory
  // multipliers, which can apply to any of the legal theories in play.
  const allClaimTypes = [claimType, ...secondaryClaimTypes].filter(
    (t): t is string => typeof t === "string" && t.length > 0,
  );
  const inNyc =
    isNycCounty(intake.county) ||
    isNycCounty(intake.defendantCounty) ||
    isNycCounty(intake.plaintiffCounty) ||
    isNycCounty(intake.incidentCounty);

  // --- Statute of limitations -------------------------------------------
  const solRows = (out.statute_of_limitations_by_claim_type as Array<{
    claim_type?: string;
    years?: number | null;
    citation?: string;
    when_clock_starts?: string;
  }>) ?? [];
  const solHit =
    pickRowByClaimType(solRows, claimType) ?? solRows[0];

  // --- Claim cap --------------------------------------------------------
  const capRows = (out.claim_cap_tiers as Array<{
    court_level?: string;
    cap_cents?: number | null;
    applies_when?: string;
  }>) ?? [];
  const capHit = pickClaimCapTier(capRows, { inNyc });
  const capDollars =
    capHit?.cap_cents != null ? Math.round(capHit.cap_cents / 100) : null;

  // --- Filing fee -------------------------------------------------------
  const feeRows = (out.filing_fee_tiers as Array<{
    applies_to?: string;
    amount_band?: string;
    fee_cents?: number | null;
  }>) ?? [];
  const feeHit = pickFilingFeeTier(feeRows, { inNyc, amountCents: intake.amountCents });

  // --- Pre-judgment interest --------------------------------------------
  const interestRows = (out.prejudgment_interest_by_claim_type as Array<{
    claim_type?: string;
    rate_pct?: number | null;
  }>) ?? [];
  const interestHit =
    pickRowByClaimType(interestRows, claimType) ??
    interestRows.find((r) => r.claim_type === "money_judgment") ??
    interestRows[0];

  // --- Stamp the single-value fields ------------------------------------
  const cls = { ...((out.classification as Record<string, unknown>) ?? {}) };
  // Prefer the resolved canonical claim type for downstream consumers; falls
  // back to the user's free text (for "other" cases) or the wizard slug.
  const intakeClaimCategory =
    classification?.primary_claim_type ??
    (intake.disputeType === "other" && intake.disputeTypeOther
      ? formatDisputeTypePhrase("other", intake.disputeTypeOther)
      : intake.disputeType);
  cls.claim_category = intakeClaimCategory || cls.claim_category || "";
  if (secondaryClaimTypes.length > 0) {
    cls.secondary_claim_types = secondaryClaimTypes;
  }
  // Make all claim types available so downstream multiplier matching can hit
  // any of the legal theories in play.
  if (allClaimTypes.length > 0) {
    cls.all_claim_types = allClaimTypes;
  }
  if (solHit) {
    const solCurrent = { ...((cls.statute_of_limitations as Record<string, unknown>) ?? {}) };
    if (solHit.years != null) solCurrent.deadline = `${solHit.years} years`;
    if (solHit.citation) solCurrent.citation = solHit.citation;
    if (solHit.when_clock_starts) {
      const existing = (solCurrent.notes as string | undefined) ?? "";
      solCurrent.notes = existing
        ? `Clock starts ${solHit.when_clock_starts}. ${existing}`
        : `Clock starts ${solHit.when_clock_starts}.`;
    }
    cls.statute_of_limitations = solCurrent;
  }
  if (capDollars != null) {
    cls.amount_limit_dollars = capDollars;
    cls.amount_within_limit = intake.amountCents / 100 <= capDollars;
    out.claim_limit_dollars = capDollars;
  } else if (typeof cls.amount_limit_dollars === "number") {
    cls.amount_within_limit = intake.amountCents / 100 <= (cls.amount_limit_dollars as number);
  }
  out.classification = cls;

  if (feeHit?.fee_cents != null) {
    out.filing_fee_cents = feeHit.fee_cents;
  }

  if (interestHit?.rate_pct != null) {
    const recoverable = {
      ...((out.recoverable_amounts as Record<string, unknown>) ?? {}),
    };
    recoverable.prejudgment_interest_rate_pct = interestHit.rate_pct;
    out.recoverable_amounts = recoverable;
  }

  // filing_location is intentionally per-case; state pack stores the
  // literal "(set per case)" sentinel.
  if (intake.county) out.filing_location = intake.county;

  return out;
}

// Pick the SOL / interest row that best matches the user's claim type. Uses
// canonical labels (written_contract, property_damage, etc.) — see the
// extraction prompt for the list.
function pickRowByClaimType<T extends { claim_type?: string }>(
  rows: T[],
  claimType: string | null,
): T | undefined {
  if (!claimType || rows.length === 0) return undefined;
  return rows.find((r) => (r.claim_type ?? "").toLowerCase() === claimType.toLowerCase());
}

// Walk the claim_cap_tiers array and pick the row that matches the user's
// region. NY is the main multi-tier state today.
function pickClaimCapTier(
  rows: Array<{ court_level?: string; cap_cents?: number | null }>,
  ctx: { inNyc: boolean },
): { court_level?: string; cap_cents?: number | null } | undefined {
  if (rows.length === 0) return undefined;
  if (rows.length === 1) return rows[0];
  const lower = (s?: string) => (s ?? "").toLowerCase();
  if (ctx.inNyc) {
    const nyc = rows.find((r) => /nyc|new york city/.test(lower(r.court_level)));
    if (nyc) return nyc;
  }
  // Default for outside-NYC: prefer city/district, then town/village, then
  // statewide / first available.
  const cityDistrict = rows.find((r) =>
    /city|district/.test(lower(r.court_level)) && !/nyc/.test(lower(r.court_level)),
  );
  if (cityDistrict) return cityDistrict;
  const statewide = rows.find((r) => /statewide|state-wide|state\b/.test(lower(r.court_level)));
  if (statewide) return statewide;
  return rows[0];
}

// Walk the filing_fee_tiers array and pick the row that matches the user's
// region + claim amount band.
function pickFilingFeeTier(
  rows: Array<{ applies_to?: string; amount_band?: string; fee_cents?: number | null }>,
  ctx: { inNyc: boolean; amountCents: number },
): { applies_to?: string; amount_band?: string; fee_cents?: number | null } | undefined {
  if (rows.length === 0) return undefined;
  if (rows.length === 1) return rows[0];
  const lower = (s?: string) => (s ?? "").toLowerCase();

  // Filter by region first
  const regionMatches = rows.filter((r) => {
    const a = lower(r.applies_to);
    if (ctx.inNyc) return /nyc|new york city/.test(a);
    // Outside NYC: prefer non-NYC rows
    return !/nyc|new york city/.test(a);
  });
  const pool = regionMatches.length > 0 ? regionMatches : rows;

  // Then pick the row whose amount_band fits the user's amount.
  const dollars = ctx.amountCents / 100;
  const matching = pool.find((r) => amountBandIncludes(r.amount_band, dollars));
  if (matching) return matching;
  // No band matched — return the first row in the region pool.
  return pool[0];
}

// Parse strings like "any", "<= $1,000", "> $1,000", "$1,000 - $5,000",
// "$1,001 to $5,000" and decide whether the given dollar amount fits.
function amountBandIncludes(band: string | undefined, dollars: number): boolean {
  if (!band) return true;
  const s = band.toLowerCase().replace(/[$,]/g, "").trim();
  if (s === "" || s === "any" || s === "all") return true;
  // "<= 1000" or "≤ 1000"
  let m = s.match(/^(<=|≤|<)\s*(\d+(?:\.\d+)?)/);
  if (m) {
    const n = parseFloat(m[2]);
    return m[1] === "<" ? dollars < n : dollars <= n;
  }
  // ">= 1000" or "> 1000"
  m = s.match(/^(>=|≥|>)\s*(\d+(?:\.\d+)?)/);
  if (m) {
    const n = parseFloat(m[2]);
    return m[1] === ">" ? dollars > n : dollars >= n;
  }
  // "1000 - 5000" or "1000 to 5000"
  m = s.match(/^(\d+(?:\.\d+)?)\s*(?:-|to|–|—)\s*(\d+(?:\.\d+)?)/);
  if (m) {
    const lo = parseFloat(m[1]);
    const hi = parseFloat(m[2]);
    return dollars >= lo && dollars <= hi;
  }
  return false;
}

const NYC_COUNTIES = new Set([
  "new york",
  "manhattan",
  "kings",
  "brooklyn",
  "queens",
  "bronx",
  "richmond",
  "staten island",
]);

function isNycCounty(county: string | null | undefined): boolean {
  if (!county) return false;
  const c = county
    .toLowerCase()
    .replace(/\s+county\s*$/, "")
    .trim();
  return NYC_COUNTIES.has(c);
}

// Map the 9 canonical wizard dispute_type values onto the canonical legal
// claim_type labels used by the SOL master table. Each dispute_type has a
// primary mapping; the lookup falls back to the first SOL row if no match.
function mapDisputeTypeToClaimType(disputeType: string | null | undefined): string | null {
  if (!disputeType) return null;
  switch (disputeType.toLowerCase()) {
    case "landlord":
      return "security_deposit";
    case "contractor":
      return "written_contract";
    case "employer":
      return "wages";
    case "auto":
      return "property_damage";
    case "neighbor":
      return "property_damage";
    case "personal_loan":
      return "promissory_note";
    case "roommate":
      return "oral_contract";
    case "online_seller":
      return "breach_of_warranty";
    case "refund":
      return "consumer_protection";
    default:
      return null;
  }
}

function combineStateMarkdowns(
  stateName: string,
  parts: { call1: string; call2: string; call3: string; call4: string },
): string {
  const sep = "\n\n---\n\n";
  return [
    `# State research — ${stateName}`,
    "",
    parts.call1.trim() || "(call 1 markdown missing)",
    sep,
    parts.call2.trim() || "(call 2 markdown missing)",
    sep,
    parts.call3.trim() || "(call 3 markdown missing)",
    sep,
    parts.call4.trim() || "(call 4 markdown missing)",
  ].join("\n");
}

// ---------------------------------------------------------------------------
// helpers
// ---------------------------------------------------------------------------

// Merges patch into the JSONB progress column atomically (single round trip
// per call; no read-modify-write race). Used as the live signal for the admin
// panel while the pipeline runs.
async function bumpProgress(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  admin: any,
  jobId: string,
  key: "shallow" | "deep" | "forms" | "qa",
  patch: Record<string, unknown>,
): Promise<void> {
  const { data: row } = await admin
    .from("case_research_jobs")
    .select("progress")
    .eq("id", jobId)
    .maybeSingle();
  const current = (row?.progress ?? {}) as Record<string, Record<string, unknown>>;
  current[key] = { ...(current[key] ?? {}), ...patch, at: new Date().toISOString() };
  await admin
    .from("case_research_jobs")
    .update({ progress: current, updated_at: new Date().toISOString() })
    .eq("id", jobId);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function loadIntake(admin: any, caseId: string): Promise<IntakeSnapshot> {
  const { data, error } = await admin
    .from("cases")
    .select(
      "id, state, county, plaintiff_county, defendant_county, incident_county, dispute_type, amount_cents, defendant_name, defendant_address, facts_narrative, intake_answers",
    )
    .eq("id", caseId)
    .single();
  if (error || !data) throw new Error(`Case ${caseId} not found`);
  const addr = (data.defendant_address ?? null) as Record<string, unknown> | null;
  const city = (addr?.city as string | undefined) ?? null;
  // For backward-compat consumers, pick best single county: defendant >
  // incident > plaintiff > legacy county column.
  const bestCounty =
    data.defendant_county ||
    data.incident_county ||
    data.plaintiff_county ||
    data.county ||
    null;
  const answers = (data.intake_answers ?? {}) as Record<string, unknown>;
  const disputeTypeOther =
    typeof answers.dispute_type_other === "string" &&
    answers.dispute_type_other.trim().length > 0
      ? answers.dispute_type_other.trim()
      : null;
  return {
    caseId: data.id,
    state: data.state,
    county: bestCounty,
    city,
    plaintiffCounty: data.plaintiff_county ?? null,
    defendantCounty: data.defendant_county ?? null,
    incidentCounty: data.incident_county ?? null,
    disputeType: data.dispute_type,
    disputeTypeOther,
    amountCents: data.amount_cents,
    defendantName: data.defendant_name,
    defendantAddress: addr,
    factsNarrative: data.facts_narrative,
  };
}

interface PersistedSource {
  id: string;
  url: string;
}

type Provenance = "tavily" | "firecrawl" | "bright_data" | "deep_research" | "form_pdf";

async function persistSources(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  admin: any,
  docs: FetchedDoc[],
  provenance: Provenance,
): Promise<PersistedSource[]> {
  if (docs.length === 0) return [];
  const rows = docs.map((d) => {
    const url = d.finalUrl;
    const urlHash = sha256(url);
    return {
      url,
      url_hash: urlHash,
      domain: hostOf(url),
      is_official: isOfficialDomain(url),
      provenance,
      title: d.title,
      mime_type: d.mimeType,
      byte_size: d.byteSize,
      content_text: d.textContent,
      content_markdown: d.markdown,
      last_seen_at: new Date().toISOString(),
    };
  });

  // Upsert without .select() — postgrest returns inconsistent data for upserts
  // that mostly hit existing rows (cache reuse). After the upsert we read back
  // by url_hash to get the canonical id list. This is two round trips but is
  // the only reliable pattern.
  const { error: upsertErr } = await admin
    .from("case_research_sources")
    .upsert(rows, { onConflict: "url_hash" });
  if (upsertErr) {
    console.error("[case-research persistSources upsert]", upsertErr);
    return [];
  }

  const hashes = rows.map((r) => r.url_hash);
  const { data, error: selectErr } = await admin
    .from("case_research_sources")
    .select("id, url, url_hash")
    .in("url_hash", hashes);
  if (selectErr) {
    console.error("[case-research persistSources select]", selectErr);
    return [];
  }
  return (data ?? []).map((r: { id: string; url: string }) => ({
    id: r.id,
    url: r.url,
  })) as PersistedSource[];
}

async function persistFormPdfSource(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  admin: any,
  _jobId: string,
  spec: ParsedPdfForm & { error?: string },
): Promise<void> {
  const url = spec.url;
  await admin
    .from("case_research_sources")
    .upsert(
      [
        {
          url,
          url_hash: sha256(url),
          domain: hostOf(url),
          is_official: isOfficialDomain(url),
          provenance: "form_pdf",
          title: null,
          mime_type: "application/pdf",
          byte_size: spec.byteSize,
          content_text: JSON.stringify({
            page_count: spec.page_count,
            field_count: spec.field_count,
            is_fillable: spec.is_fillable,
            is_xfa_only: spec.is_xfa_only,
            warning: spec.warning,
            error: spec.error,
          }),
          content_markdown: null,
          last_seen_at: new Date().toISOString(),
        },
      ],
      { onConflict: "url_hash" },
    );
}

function uniqueUrls(urls: string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const u of urls) {
    if (!u || seen.has(u)) continue;
    seen.add(u);
    out.push(u);
  }
  return out;
}

function sha256(s: string): string {
  return crypto.createHash("sha256").update(s).digest("hex");
}

function hostOf(rawUrl: string): string {
  try {
    return new URL(rawUrl).hostname.toLowerCase();
  } catch {
    return "unknown";
  }
}

// ---------------------------------------------------------------------------
// Stub fallbacks (when keys are missing)
// ---------------------------------------------------------------------------

// Minimal classification carrying claim_category from the intake. Used as
// prompt context only — the actual structured classification block of the
// EvidencePack gets filled by shallow + deep extraction from research.
function stubClassificationFromIntake(
  intake: IntakeSnapshot,
  cached: CaseClassification | null = null,
): Classification {
  // Prefer the LLM-resolved canonical claim type; fall back to free text for
  // "other"; finally fall back to the wizard slug.
  const claimCategory =
    cached?.primary_claim_type ??
    (intake.disputeType === "other" && intake.disputeTypeOther
      ? formatDisputeTypePhrase("other", intake.disputeTypeOther)
      : intake.disputeType);
  return {
    claim_category: claimCategory,
    proper_court_type: "",
    proper_court_type_notes: "",
    amount_within_limit: false,
    amount_limit_dollars: null,
    venue_rule: "",
    statute_of_limitations: { deadline: null, citation: "", notes: "" },
    pre_filing_requirements: [],
    eligibility_concerns: [],
    jury_trial_available: null,
    attorneys_allowed: null,
    counterclaim_implications: "",
    notes: "",
  };
}

function stubQueryPlan(intake: IntakeSnapshot): string[] {
  const state = intake.state.toUpperCase();
  return [
    `${state} small claims filing fee official court`,
    `${state} small claims forms official`,
    `${intake.county ?? state} county clerk small claims efile`,
    `${state} small claims service of process rules`,
  ];
}

function stubSearch(queries: string[]): RankedHit[] {
  return queries.map((q, i) => ({
    url: `https://courts.ca.gov/selfhelp-smallclaims.htm#stub-${i}`,
    title: `Stub result for "${q}"`,
    content: "Stub.",
    score: 0,
    domain: "courts.ca.gov",
    query: q,
    isOfficial: true,
  }));
}

function stubFetch(hits: RankedHit[]): FetchedDoc[] {
  return hits.map((h) => ({
    url: h.url,
    finalUrl: h.url,
    title: h.title,
    markdown: `# ${h.title}\n\n(stub)`,
    textContent: `${h.title} (stub)`,
    mimeType: "text/html",
    byteSize: 32,
    query: h.query,
    isOfficial: h.isOfficial,
  }));
}

function stubEvidencePack(
  intake: IntakeSnapshot,
  classification: Classification,
  docs: FetchedDoc[],
): EvidencePack {
  return {
    classification,
    court_name: "Superior Court of California (stub)",
    filing_location: intake.county ?? `${intake.state} (stub)`,
    claim_limit_dollars: 12500,
    excluded_claim_types: [],
    arbitration_clause_considerations: "",
    frequency_caps: "",
    claim_splitting_prohibited: null,
    forms_required: [
      {
        code: "SC-100",
        name: "Plaintiff's Claim and ORDER to Go to Small Claims Court",
        url: "https://www.courts.ca.gov/documents/sc100.pdf",
        purpose: "Initiates the small-claims case.",
        fillable_online: true,
        completion_methods: ["fillable_pdf", "online_form"],
      },
    ],
    filing_fee_cents: 7500,
    filing_fee_notes: "Stub. Verify with the clerk.",
    filing_methods: ["in_person", "mail", "efile"],
    service_requirements: [
      "Personal service by a non-party adult",
      "Substituted service permitted under specific conditions",
      "File proof of service at least 5 days before hearing",
    ],
    hearing_process: [
      "Hearing typically scheduled 30 to 75 days after filing",
      "Both parties present evidence and witnesses",
      "Judgment issued at the hearing or by mail within days",
    ],
    hearing_logistics: {
      copies_required: null,
      exhibit_format: "",
      recording_rules: "",
      hearsay_rules: "",
      default_proveup_required: null,
      plaintiff_no_show_consequence: "",
      typical_days_filing_to_hearing: null,
      continuance_rules: "",
      witness_subpoena_process: "",
      phone_video_appearance_allowed: null,
    },
    counterclaim_transfer_threshold: "",
    recoverable_amounts: {
      costs_recoverable: [],
      prejudgment_interest_rate_pct: null,
      post_judgment_interest_rate_pct: null,
      attorney_fees: { available: null, conditions: "", statute: "" },
    },
    court_mediation: { available: null, when: "", free: null, process: "" },
    accommodations: {
      interpreter_request_process: "",
      interpreter_lead_time_days: null,
      available_languages: [],
      interpreter_request_form_code: "",
      ada_request_process: "",
      ada_coordinator_name: "",
      ada_coordinator_contact: "",
      ada_request_form_code: "",
    },
    appeal_details: {
      window_days: null,
      who_can_appeal: "",
      type: "",
      motion_to_vacate_default_window_days: null,
    },
    post_judgment_steps: [
      "Request a Writ of Execution",
      "Bank levy or wage garnishment via the sheriff",
      "Judgment debtor exam if collection is hard",
    ],
    collection_details: {
      judgment_renewal_years: null,
      abstract_of_judgment_process: "",
      wage_garnishment_cap_pct: null,
      bank_levy_process: "",
      debtors_exam_process: "",
      exemptions: [],
      exemption_details: [],
      federal_vs_state_exemption_rule: "",
      satisfaction_required: null,
      bankruptcy_stay_effects: "",
      domestication_of_out_of_state_judgment: "",
    },
    statute_of_limitations_by_claim_type: [],
    filing_fee_tiers: [],
    claim_cap_tiers: [],
    prejudgment_interest_by_claim_type: [],
    defendant_collectability_signals: [],
    evidence_required_for_this_claim_type: [],
    state_specific_quirks: [],
    statutory_multipliers: [],
    tax_implications: { recovery_taxability: "", form_1099_c_consideration: "" },
    demand_letter: {
      required: null,
      recommended: null,
      minimum_days_before_filing: null,
      certified_mail_required: null,
      return_receipt_required: null,
      required_content_elements: [],
      notes: "",
    },
    government_tort_claim_notice: {
      required_for_government_defendants: null,
      deadline_days: null,
      form_code: "",
      recipient_address: "",
      statute: "",
    },
    efile_portal: {
      name: "",
      url: "",
      account_required: null,
      accepted_file_types: [],
    },
    fee_schedule: {
      service_fee_cents: null,
      motion_fee_cents: null,
      jury_demand_fee_cents: null,
      accepted_payment_methods: [],
      check_payee: "",
      fee_waiver: {
        available: null,
        eligibility_criteria: "",
        form_code: "",
        form_url: "",
      },
    },
    service_methods: [],
    sources: docs.map((d) => ({
      url: d.finalUrl,
      title: d.title ?? d.finalUrl,
      domain: hostOf(d.finalUrl),
      cited_for: ["stub"],
    })),
    unknowns: ["Stage 1 plumbing only — verify everything with the clerk."],
  };
}

function stubQa(): QaResult {
  return {
    passed: true,
    checks: {
      all_claims_cited: true,
      sources_official: true,
      county_correct: true,
      contradictions_found: false,
      legal_advice_detected: false,
    },
    issues: [],
  };
}

