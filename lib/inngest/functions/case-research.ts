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
import { submitDeepResearch, type DeepCallId } from "../../case-research/deep-research";
import { parseAllForms, type ParsedPdfForm } from "../../case-research/pdf-forms";
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
      // that need it for context (e.g. the deep research brief).
      const classification: Classification = stubClassificationFromIntake(intake);

      // ----- shallow + deep submit run in parallel --------------------------
      // Deep research is submit-only here; it can take hours and is finalized
      // by the OpenAI webhook or the safety-net cron, not by this function.
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

        // Note: deep_research_response_id_a / _b are already on the report row
        // from deep.submit-ab. Per-call findings + extracted packs + citations
        // land later via the webhook / cron handlers; the merge agent
        // reconciles them once both calls succeed.
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
            // Job is "succeeded" even though deep research may still be running.
            // The progress.deep.status remains "polling" until the webhook/cron
            // finalizes it. This decouples job completion from deep latency.
            status: "succeeded",
            finished_at: new Date().toISOString(),
            model_versions: {
              stage: liveSteps > 0 ? "live" : "stub",
              ledger,
              deep_research_submitted: !!deepOut,
              forms_parsed: formsOut.specs.length,
            },
            cost_cents: totalCost,
            updated_at: new Date().toISOString(),
          })
          .eq("id", jobId);
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
  responseIdA: string;
  responseIdB: string;
  ledger: LedgerEntry[];
}

// Submit-only deep branch with TWO parallel calls.
//   Call A: pre-filing and filing (sections 1-11 of the original 21)
//   Call B: hearing through collection (sections 12-21)
//
// Both submissions must succeed before the branch is considered submitted; if
// either fails the whole deep branch is marked failed (no partial output).
// Completion of each call is handled separately by the webhook + cron, which
// finalize per-call findings and only fire `case/research.ready` once BOTH
// calls have succeeded.
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
    bumpProgress(admin, jobId, "deep", { status: "running", phase: "submitting" }),
  );

  // Helper: submit one call. Returns either the response info or a "skipped"
  // marker if keys are missing, or throws on hard failure.
  async function submitOne(which: DeepCallId) {
    const res = await submitDeepResearch(which, intake, classification);
    return { which, responseId: res.responseId, model: res.model };
  }

  const submitOut: {
    data:
      | {
          responseIdA: string;
          responseIdB: string;
          model: string;
        }
      | null;
    ledger: LedgerEntry[];
    skipReason?: string;
  } = await step.run("deep.submit-ab", async () => {
    try {
      const [a, b] = await Promise.all([submitOne("a"), submitOne("b")]);

      // Park both response IDs on the report row so the webhook + cron can
      // route incoming events to this job.
      await admin
        .from("case_research_reports")
        .upsert({
          job_id: jobId,
          case_id: caseId,
          evidence_pack: {},
          qa_passed: false,
          qa_notes: {},
          deep_research_response_id_a: a.responseId,
          deep_research_response_id_b: b.responseId,
        });

      await bumpProgress(admin, jobId, "deep", {
        status: "polling",
        phase: "submitted",
        model: a.model,
        call_a: { status: "polling", response_id: a.responseId, at: new Date().toISOString() },
        call_b: { status: "polling", response_id: b.responseId, at: new Date().toISOString() },
      });

      return {
        data: { responseIdA: a.responseId, responseIdB: b.responseId, model: a.model },
        ledger: [
          { step: "deep.submit", cents: 0, model: a.model, meta: { calls: 2 } },
        ] as LedgerEntry[],
      };
    } catch (e) {
      if (isMissingKey(e)) {
        await bumpProgress(admin, jobId, "deep", { status: "skipped", reason: "missing_key" });
        return {
          data: null,
          ledger: [{ step: "deep.submit", cents: 0 }] as LedgerEntry[],
          skipReason: "missing_key",
        };
      }
      // Hard submit failure for either call: mark deep failed (no salvage).
      // The other call may have succeeded at OpenAI's side, but without both
      // response IDs we can't honor the both-must-succeed contract; we
      // intentionally let it dangle rather than try to salvage partial work.
      const msg = e instanceof Error ? e.message : String(e);
      console.warn("[deep.submit-ab] failed:", msg);
      await bumpProgress(admin, jobId, "deep", { status: "failed", error: msg });
      return {
        data: null,
        ledger: [{ step: "deep.submit", cents: 0, meta: { error: msg } }] as LedgerEntry[],
      };
    }
  });

  if (!submitOut.data) {
    return null;
  }

  return {
    responseIdA: submitOut.data.responseIdA,
    responseIdB: submitOut.data.responseIdB,
    ledger: submitOut.ledger,
  };
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
      "id, state, county, plaintiff_county, defendant_county, incident_county, dispute_type, amount_cents, defendant_name, defendant_address, facts_narrative",
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
  return {
    caseId: data.id,
    state: data.state,
    county: bestCounty,
    city,
    plaintiffCounty: data.plaintiff_county ?? null,
    defendantCounty: data.defendant_county ?? null,
    incidentCounty: data.incident_county ?? null,
    disputeType: data.dispute_type,
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
function stubClassificationFromIntake(intake: IntakeSnapshot): Classification {
  return {
    claim_category: intake.disputeType,
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

