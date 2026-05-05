"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { CaseResearchDetail, CaseResearchSourceRow } from "../../../../lib/admin/case-research";
import EvidencePackView from "./EvidencePackView";
import CustomerReportPanel from "./CustomerReportPanel";

type Tab = "customer" | "evidence" | "deep" | "sources" | "qa";

const BRANCH_LABELS = {
  shallow: "shallow",
  deep: "deep research",
  qa: "qa",
} as const;

function branchTone(status: string): string {
  if (status === "succeeded") return "good";
  if (status === "failed") return "warn";
  if (status === "running") return "active";
  if (status === "skipped" || status === "stubbed") return "neutral";
  return "neutral";
}

function renderBranchTitle(name: string, p: Record<string, unknown> | undefined): string {
  if (!p) return `${name}: queued`;
  const lines: string[] = [`${name}: ${p.status ?? "queued"}`];
  for (const [k, v] of Object.entries(p)) {
    if (k === "status" || k === "at") continue;
    lines.push(`  ${k}: ${typeof v === "object" ? JSON.stringify(v) : v}`);
  }
  if (p.at) lines.push(`  at: ${p.at}`);
  return lines.join("\n");
}

interface Props {
  caseId: string;
  detail: CaseResearchDetail | null;
}

function statusToneClass(status: string): string {
  if (status === "succeeded") return "admin-pill-good";
  if (status === "failed" || status === "canceled") return "admin-pill-warn";
  if (status === "running") return "admin-pill-active";
  return "admin-pill-neutral";
}

function fmtDate(s: string | null): string {
  if (!s) return "—";
  return new Date(s).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function CaseResearchPanel({ caseId, detail }: Props) {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("customer");
  const [running, setRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pollingDeep, setPollingDeep] = useState(false);
  const [pollOutcome, setPollOutcome] = useState<string | null>(null);

  // Auto-refresh logic. Three live states:
  //   1. Job itself is still running → poll every 4s (the shallow pipeline is
  //      moving through phases, lots of UI updates).
  //   2. Job succeeded but deep research is still polling on OpenAI's side →
  //      poll every 60s (slow drumbeat; deep can take hours).
  //   3. Everything is terminal → stop polling.
  const liveStatus = detail?.job.status;
  const deepStatus = (detail?.job.progress?.deep?.status as string | undefined) ?? null;
  useEffect(() => {
    if (liveStatus === "queued" || liveStatus === "running") {
      const timer = setTimeout(() => router.refresh(), liveStatus === "running" ? 4000 : 6000);
      return () => clearTimeout(timer);
    }
    if (liveStatus === "succeeded" && deepStatus === "polling") {
      const timer = setTimeout(() => router.refresh(), 60000);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [liveStatus, deepStatus, detail?.job.id, detail?.job.started_at, router]);

  async function pokeDeepResearch() {
    if (pollingDeep) return;
    setPollingDeep(true);
    setPollOutcome(null);
    try {
      const res = await fetch(`/api/admin/case-research/${caseId}/poll-deep`, {
        method: "POST",
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        setPollOutcome(`error: ${body.error || res.status}`);
      } else {
        setPollOutcome(body.outcome || "ok");
        if (body.outcome === "completed") router.refresh();
      }
    } catch (e) {
      setPollOutcome(`error: ${e instanceof Error ? e.message : String(e)}`);
    } finally {
      setPollingDeep(false);
    }
  }

  async function rerun() {
    if (running) return;
    if (
      !confirm(
        "Run a fresh research pass? Takes ~3-6 minutes when keys are configured. The previous report is kept as an older version.",
      )
    )
      return;
    setRunning(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/case-research/${caseId}/rerun`, {
        method: "POST",
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Could not enqueue");
      }
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not enqueue");
    } finally {
      setRunning(false);
    }
  }

  if (!detail) {
    return (
      <div className="admin-prose" style={{ marginTop: 14 }}>
        <strong>Filing research</strong>
        <p style={{ color: "var(--muted)" }}>
          No research job has been queued for this case yet. Research auto-runs after the case
          flips to <code>demand_paid</code>.
        </p>
        <button
          type="button"
          className="btn btn-cream btn-sm"
          onClick={rerun}
          disabled={running}
          style={{ marginTop: 8 }}
        >
          {running ? "Enqueueing…" : "Run research now"}
        </button>
        {error ? <p style={{ color: "var(--accent)", marginTop: 8 }}>{error}</p> : null}
      </div>
    );
  }

  const {
    job,
    evidencePack,
    deepResearchPack,
    deepResearchResponseId,
    deepResearchReportMd,
    deepResearchResponseIdA,
    deepResearchResponseIdB,
    deepResearchFindingsA,
    deepResearchFindingsB,
    qaPassed,
    qaNotes,
    sources,
  } = detail;
  // Job is "two-call era" if either of the new response_id slots is set.
  // Older jobs (pre-rollout) only have the legacy single-call columns.
  const isTwoCall = !!(deepResearchResponseIdA || deepResearchResponseIdB);
  const modelVersions = (job.model_versions ?? {}) as Record<string, unknown>;
  const ledger = (modelVersions.ledger as Array<{ step: string; cents: number; model?: string }>) || [];
  const isLive = job.status === "queued" || job.status === "running";
  const progress = (job.progress ?? {}) as Record<string, Record<string, unknown>>;
  const shallowQueries = ((progress.shallow?.queries as string[] | undefined) ?? []).filter(Boolean);
  // Derive QA tab badge from checks, not the agent's own passed flag.
  const qaChecks = ((qaNotes?.checks ?? {}) as Record<string, boolean>);
  const qaChecksFailed =
    Object.entries(qaChecks).length > 0 &&
    !Object.entries(qaChecks).every(([k, v]) =>
      k === "contradictions_found" || k === "legal_advice_detected" ? !v : v,
    );
  const branchOrder: Array<keyof typeof BRANCH_LABELS> = [
    "shallow",
    "deep",
    "qa",
  ];

  return (
    <div style={{ marginTop: 14 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 14,
          flexWrap: "wrap",
          marginBottom: 10,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <span className={`admin-pill ${statusToneClass(job.status)}`}>
            {job.status}
            {isLive ? <span className="admin-spinner" aria-hidden style={{ marginLeft: 6 }} /> : null}
          </span>
          <span style={{ fontSize: 13, color: "var(--muted)" }}>
            v{job.version} · started {fmtDate(job.started_at)}
            {job.finished_at ? ` · finished ${fmtDate(job.finished_at)}` : ""}
            {job.cost_cents > 0 ? ` · $${(job.cost_cents / 100).toFixed(2)}` : ""}
          </span>
        </div>
        <button
          type="button"
          className="btn btn-cream btn-sm"
          onClick={rerun}
          disabled={running}
        >
          {running ? "Enqueueing…" : "Re-run"}
        </button>
      </div>

      <div className="admin-branch-row">
        {branchOrder.map((b) => {
          const p = progress[b];
          const status = (p?.status as string) || "queued";
          const phase = (p?.phase as string) || null;
          const tone = branchTone(status);
          return (
            <span
              key={b}
              className={`admin-branch-pill admin-branch-pill-${tone}`}
              title={renderBranchTitle(b, p)}
            >
              <span className="admin-branch-pill-label">{BRANCH_LABELS[b]}</span>
              <span className="admin-branch-pill-state">
                {status === "running" ? (
                  <>
                    {phase ?? "running"}
                    <span className="admin-spinner" aria-hidden style={{ marginLeft: 4 }} />
                  </>
                ) : (
                  status
                )}
              </span>
            </span>
          );
        })}
      </div>

      {job.error_message ? (
        <div className="admin-error" style={{ marginBottom: 10 }}>
          {job.error_message}
        </div>
      ) : null}
      {error ? <div className="admin-error" style={{ marginBottom: 10 }}>{error}</div> : null}

      {ledger.length > 0 ? (
        <div className="admin-research-ledger">
          {ledger.map((s, i) => (
            <span key={i} className="admin-research-ledger-step" title={s.model ?? ""}>
              <span className="admin-research-ledger-name">{s.step}</span>
              {s.cents > 0 ? (
                <span className="admin-research-ledger-cost">
                  ${(s.cents / 100).toFixed(2)}
                </span>
              ) : null}
            </span>
          ))}
        </div>
      ) : null}

      {isLive ? (
        <p style={{ fontSize: 12, color: "var(--muted)", marginBottom: 14 }}>
          Pipeline: query plan → search → fetch & extract → evidence pack → QA, in parallel with two deep research calls (A: pre-filing/filing, B: hearing/collection) → combined extraction → merge → customer report. Live step output is at{" "}
          <a
            href="https://app.inngest.com"
            target="_blank"
            rel="noopener noreferrer"
            className="admin-link"
          >
            app.inngest.com → Runs
          </a>
          .
        </p>
      ) : null}

      <div className="admin-research-tabs">
        {(["customer", "evidence", "deep", "sources", "qa"] as Tab[]).map((t) => (
          <button
            key={t}
            type="button"
            className={`admin-research-tab${tab === t ? " is-active" : ""}`}
            onClick={() => setTab(t)}
          >
            {t === "customer"
              ? customerTabLabel(detail)
              : t === "evidence"
                ? "Shallow pack"
                : t === "deep"
                  ? `Deep research${deepResearchPack ? "" : " ·"}`
                  : t === "sources"
                    ? `Sources (${sources.length})`
                    : `QA${qaChecksFailed ? " ⚠" : ""}`}
          </button>
        ))}
      </div>

      <div className="admin-research-tab-body">
        {tab === "customer" && <CustomerReportPanel caseId={caseId} detail={detail} />}
        {tab === "evidence" && (
          <ShallowResearchView
            pack={evidencePack}
            queries={shallowQueries}
            sources={sources}
          />
        )}
        {tab === "deep" && (
          <div>
            {(deepResearchResponseIdA || deepResearchResponseIdB || deepResearchResponseId) ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 12,
                  flexWrap: "wrap",
                  marginBottom: 12,
                  padding: "8px 12px",
                  background: "var(--bg-2)",
                  borderRadius: 8,
                  fontSize: 12,
                }}
              >
                <span style={{ color: "var(--muted)" }}>
                  {isTwoCall ? (
                    <>
                      Call A:{" "}
                      <code style={{ fontSize: 11 }}>
                        {deepResearchResponseIdA ?? "(none)"}
                      </code>
                      {" · Call B: "}
                      <code style={{ fontSize: 11 }}>
                        {deepResearchResponseIdB ?? "(none)"}
                      </code>
                    </>
                  ) : (
                    <>
                      OpenAI response id:{" "}
                      <code style={{ fontSize: 11 }}>{deepResearchResponseId}</code>
                    </>
                  )}
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  {pollOutcome ? (
                    <span style={{ color: "var(--muted)" }}>{pollOutcome}</span>
                  ) : null}
                  <button
                    type="button"
                    className="btn btn-cream btn-sm"
                    onClick={pokeDeepResearch}
                    disabled={pollingDeep}
                  >
                    {pollingDeep ? "Checking…" : "Check status now"}
                  </button>
                </span>
              </div>
            ) : null}

            {isTwoCall ? (
              <>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
                  <DeepCallColumn
                    label="Call A — pre-filing and filing"
                    callKey="call_a"
                    progress={progress}
                    findings={deepResearchFindingsA}
                  />
                  <DeepCallColumn
                    label="Call B — hearing through collection"
                    callKey="call_b"
                    progress={progress}
                    findings={deepResearchFindingsB}
                  />
                </div>
                {deepResearchPack ? (
                  <div style={{ marginTop: 22 }}>
                    <h4
                      style={{
                        margin: "0 0 10px",
                        fontSize: 12,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: "var(--muted)",
                        fontWeight: 600,
                      }}
                    >
                      Combined extracted fields (A + B)
                    </h4>
                    <EvidencePackView
                      pack={deepResearchPack as Parameters<typeof EvidencePackView>[0]["pack"]}
                      emptyLabel="(no combined pack yet — runs once both calls succeed)"
                    />
                    <details style={{ marginTop: 10 }}>
                      <summary style={{ cursor: "pointer", color: "var(--muted)", fontSize: 13 }}>
                        Raw JSON
                      </summary>
                      <pre className="admin-pre" style={{ marginTop: 8 }}>
                        {JSON.stringify(deepResearchPack, null, 2)}
                      </pre>
                    </details>
                  </div>
                ) : null}
              </>
            ) : (
              <>
                {deepResearchReportMd ? (
                  <div className="ev-section" style={{ padding: "20px 28px" }}>
                    <h4 className="ev-section-title">Deep research narrative</h4>
                    <article className="admin-research-content">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {deepResearchReportMd}
                      </ReactMarkdown>
                    </article>
                  </div>
                ) : null}

                <div style={{ marginTop: 18 }}>
                  <h4
                    style={{
                      margin: "0 0 8px",
                      fontSize: 12,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "var(--muted)",
                      fontWeight: 600,
                    }}
                  >
                    Structured summary
                  </h4>
                  <EvidencePackView
                    pack={deepResearchPack as Parameters<typeof EvidencePackView>[0]["pack"]}
                    emptyLabel="Deep research did not run for this job (key missing, skipped, or still polling)."
                  />
                </div>

                <details style={{ marginTop: 18 }}>
                  <summary style={{ cursor: "pointer", color: "var(--muted)", fontSize: 13 }}>
                    Show raw deep research JSON
                  </summary>
                  <pre className="admin-pre" style={{ marginTop: 8 }}>
                    {deepResearchPack
                      ? JSON.stringify(deepResearchPack, null, 2)
                      : "(none)"}
                  </pre>
                </details>
              </>
            )}
          </div>
        )}
        {tab === "sources" && <SourcesView sources={sources} />}
        {tab === "qa" && <QaView passed={qaPassed} notes={qaNotes} />}
      </div>
    </div>
  );
}

function customerTabLabel(detail: CaseResearchDetail): string {
  const s = detail.customerReportStatus;
  if (s === "published") return "Customer report ✓";
  if (s === "draft") return "Customer report (draft)";
  if (detail.criticalConflictDetected) return "Customer report ⚠";
  return "Customer report";
}

function provenanceTone(p: string): string {
  if (p === "deep_research") return "active";
  if (p === "form_pdf") return "good";
  if (p === "bright_data") return "warn";
  return "neutral";
}

function ShallowResearchView({
  pack,
  queries,
  sources,
}: {
  pack: Record<string, unknown> | null;
  queries: string[];
  sources: CaseResearchSourceRow[];
}) {
  const fetchedSources = sources.filter(
    (s) => s.provenance === "firecrawl" || s.provenance === "bright_data" || s.provenance === "tavily",
  );

  // Build URL → citation number map from the pack's sources array. Each
  // pack.sources[i] has { n, url, ... } where `n` is the [#N] marker the
  // evidence-pack agent used inline. We surface that next to each fetched
  // page so admin can find "which fetched page is citation #7".
  const citationByUrl = new Map<string, number>();
  const packSources = (pack && (pack as { sources?: Array<{ n?: number; url?: string }> }).sources) || [];
  for (const s of packSources) {
    if (typeof s.n === "number" && typeof s.url === "string") {
      citationByUrl.set(s.url, s.n);
    }
  }

  // Sort fetched pages: cited first (in citation-number order), then uncited
  // by domain. Makes "[#1] [#2] ..." order match the citation numbers.
  const sortedFetched = [...fetchedSources].sort((a, b) => {
    const an = citationByUrl.get(a.url);
    const bn = citationByUrl.get(b.url);
    if (an != null && bn != null) return an - bn;
    if (an != null) return -1;
    if (bn != null) return 1;
    return a.domain.localeCompare(b.domain);
  });

  const citedCount = fetchedSources.filter((s) => citationByUrl.has(s.url)).length;
  const uncitedCount = fetchedSources.length - citedCount;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      {queries.length > 0 ? (
        <div className="ev-section">
          <h4 className="ev-section-title">Search queries used ({queries.length})</h4>
          <p style={{ fontSize: 12.5, color: "var(--muted)", margin: "0 0 10px" }}>
            Each query went to Tavily and returned ~5-10 hits. We deduplicated
            and fetched the top {fetchedSources.length} unique pages (the
            fetch budget). Of those, {citedCount} were cited in the evidence
            pack and {uncitedCount} weren&rsquo;t referenced.
          </p>
          <ol className="ev-list" style={{ listStyle: "decimal" }}>
            {queries.map((q, i) => (
              <li key={i} style={{ fontFamily: "ui-monospace, monospace", fontSize: 13 }}>
                {q}
              </li>
            ))}
          </ol>
        </div>
      ) : null}

      <EvidencePackView
        pack={pack as Parameters<typeof EvidencePackView>[0]["pack"]}
        emptyLabel="No shallow evidence pack yet."
      />

      {fetchedSources.length > 0 ? (
        <div className="ev-section">
          <h4 className="ev-section-title">
            Fetched pages ({fetchedSources.length}) · {citedCount} cited, {uncitedCount} not used · click to expand content
          </h4>
          <p style={{ fontSize: 12.5, color: "var(--muted)", margin: "0 0 10px" }}>
            Pages with a <strong>[#N]</strong> badge match the same number used in the
            evidence pack&rsquo;s inline citations. Pages without a badge were fetched
            but the evidence-pack agent didn&rsquo;t reference them.
          </p>
          {sortedFetched.map((s, i) => (
            <SourceCard key={i} source={s} citationN={citationByUrl.get(s.url) ?? null} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

function SourcesView({ sources }: { sources: CaseResearchSourceRow[] }) {
  const groups: Record<string, CaseResearchSourceRow[]> = {};
  for (const s of sources) {
    const key = s.provenance;
    if (!groups[key]) groups[key] = [];
    groups[key].push(s);
  }
  if (sources.length === 0) {
    return <p style={{ color: "var(--muted)" }}>No sources stored for this job yet.</p>;
  }
  const order = ["firecrawl", "bright_data", "tavily", "deep_research", "form_pdf"];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      {order
        .filter((k) => groups[k]?.length)
        .map((k) => (
          <div key={k}>
            <h4
              style={{
                margin: "0 0 8px",
                fontSize: 12,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--muted)",
                fontWeight: 600,
              }}
            >
              {k.replace(/_/g, " ")} ({groups[k].length})
            </h4>
            {groups[k].map((s, i) => (
              <SourceCard key={i} source={s} />
            ))}
          </div>
        ))}
    </div>
  );
}

function SourceCard({
  source,
  citationN,
}: {
  source: CaseResearchSourceRow;
  citationN?: number | null;
}) {
  const [open, setOpen] = useState(false);
  const sizeKb = source.byte_size ? `${(source.byte_size / 1024).toFixed(0)} KB` : null;
  const content = source.content_markdown || source.content_text || "";
  const preview = content ? content.slice(0, 600) : "";
  const hasFull = content.length > 600;
  return (
    <div className="src-card">
      <div className="src-card-head">
        <div className="src-card-title" style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {citationN != null ? (
            <span
              className="admin-pill admin-pill-good"
              style={{ fontFamily: "ui-monospace, monospace", fontSize: 11 }}
              title="Citation marker used in the evidence pack"
            >
              [#{citationN}]
            </span>
          ) : (
            <span
              className="admin-pill admin-pill-neutral"
              style={{ fontSize: 11 }}
              title="This page was fetched but not cited in the evidence pack"
            >
              not cited
            </span>
          )}
          <a href={source.url} target="_blank" rel="noopener noreferrer" className="admin-link">
            {source.title || source.url}
          </a>
        </div>
        <div className="src-card-meta">
          <span>{source.domain}</span>
          <span className={`admin-pill admin-pill-${provenanceTone(source.provenance)}`}>
            {source.provenance.replace(/_/g, " ")}
          </span>
          <span className="admin-pill admin-pill-neutral">{source.cite_role}</span>
          {source.is_official ? (
            <span className="admin-pill admin-pill-good">official</span>
          ) : (
            <span className="admin-pill admin-pill-warn">not on allow-list</span>
          )}
          {sizeKb ? <span>{sizeKb}</span> : null}
        </div>
      </div>
      {content ? (
        <>
          <div className={`src-card-content${open ? " is-expanded" : ""}`}>
            <article className="admin-research-content">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {open || !hasFull ? content : `${preview}…`}
              </ReactMarkdown>
            </article>
          </div>
          {hasFull ? (
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              style={{
                marginTop: 6,
                background: "transparent",
                border: 0,
                color: "var(--muted)",
                fontSize: 12,
                cursor: "pointer",
                padding: 0,
              }}
            >
              {open ? "Collapse" : `Show full content (${content.length.toLocaleString()} chars)`}
            </button>
          ) : null}
        </>
      ) : (
        <p style={{ color: "var(--muted)", fontSize: 12, margin: "8px 0 0" }}>
          No content stored (form PDFs and deep research citations don't store full body).
        </p>
      )}
    </div>
  );
}

function QaView({
  passed: _agentVerdict,
  notes,
}: {
  passed: boolean;
  notes: Record<string, unknown> | null;
}) {
  if (!notes) {
    return <p style={{ color: "var(--muted)" }}>No QA pass yet.</p>;
  }
  const checks = (notes.checks ?? {}) as Record<string, boolean>;
  const issues = (notes.issues ?? []) as string[];
  const checkLabels: Record<string, string> = {
    all_claims_cited: "Every concrete claim cites a source",
    sources_official: "All sources are on the official allow-list",
    county_correct: "Court / county matches the case input",
    contradictions_found: "No internal contradictions",
    legal_advice_detected: "Procedural only (no legal advice)",
  };

  // Derive the verdict from the five checks rather than trusting the agent's
  // own passed flag. Three states:
  //   - passed: all checks clean, no advisory issues
  //   - passed with notes: all checks clean, but advisory issues exist
  //   - failed: at least one check failed
  const isInverted = (k: string) =>
    k === "contradictions_found" || k === "legal_advice_detected";
  const checkEntries = Object.entries(checks);
  const allChecksClean =
    checkEntries.length > 0 &&
    checkEntries.every(([k, v]) => (isInverted(k) ? !v : v));
  let verdictLabel: string;
  let verdictTone: "good" | "warn";
  if (!allChecksClean) {
    verdictLabel = "failed";
    verdictTone = "warn";
  } else if (issues.length > 0) {
    verdictLabel = "passed with notes";
    verdictTone = "good";
  } else {
    verdictLabel = "passed";
    verdictTone = "good";
  }

  return (
    <div className="ev-pack">
      <div className="ev-section">
        <h4 className="ev-section-title">Verdict</h4>
        <p style={{ margin: 0 }}>
          <span className={`admin-pill admin-pill-${verdictTone}`}>{verdictLabel}</span>
        </p>
        <div className="qa-checks">
          {checkEntries.map(([k, v]) => {
            const ok = isInverted(k) ? !v : v;
            return (
              <div key={k} className="qa-check">
                <span className={`qa-check-icon ${ok ? "ok" : "warn"}`}>
                  {ok ? "✓" : "✗"}
                </span>
                <span style={{ color: ok ? "var(--ink)" : "var(--accent)" }}>
                  {checkLabels[k] || k}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="ev-section">
        <h4 className="ev-section-title">
          {allChecksClean && issues.length > 0 ? "Advisory notes" : "Issues found"} (
          {issues.length})
        </h4>
        {issues.length === 0 ? (
          <p style={{ color: "var(--muted)" }}>None.</p>
        ) : (
          <ol className="ev-list">
            {issues.map((s, i) => (
              <li
                key={i}
                style={{ marginBottom: 10, color: allChecksClean ? "var(--muted)" : undefined }}
              >
                {s}
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}

function DeepCallColumn({
  label,
  callKey,
  progress,
  findings,
}: {
  label: string;
  callKey: "call_a" | "call_b";
  progress: Record<string, Record<string, unknown>>;
  findings: string | null;
}) {
  const deep = (progress.deep ?? {}) as Record<string, unknown>;
  const call = (deep[callKey] ?? {}) as Record<string, unknown>;
  const status = (call.status as string | undefined) ?? "—";
  const phase = (call.phase as string | undefined) ?? null;
  const citations = (call.citations as number | undefined) ?? null;
  const findingsChars = (call.findings_chars as number | undefined) ?? null;

  return (
    <div
      style={{
        border: "1px solid var(--bg-3)",
        borderRadius: 10,
        padding: 16,
        background: "var(--bg-1)",
        minWidth: 0,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          marginBottom: 8,
        }}
      >
        <h4 style={{ margin: 0, fontSize: 13 }}>{label}</h4>
        <span
          style={{
            fontSize: 11,
            color:
              status === "succeeded"
                ? "var(--ok)"
                : status === "failed"
                  ? "var(--accent)"
                  : "var(--muted)",
          }}
        >
          {status}
          {phase && status !== "succeeded" ? ` · ${phase}` : ""}
        </span>
      </div>
      <div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 10 }}>
        {citations !== null ? `${citations} citations` : ""}
        {citations !== null && findingsChars !== null ? " · " : ""}
        {findingsChars !== null ? `${findingsChars.toLocaleString()} chars` : ""}
      </div>
      {findings ? (
        <details>
          <summary style={{ cursor: "pointer", color: "var(--muted)", fontSize: 13 }}>
            Findings dossier
          </summary>
          <article className="admin-research-content" style={{ marginTop: 8 }}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{findings}</ReactMarkdown>
          </article>
        </details>
      ) : (
        <p style={{ color: "var(--muted)", fontSize: 12 }}>(no findings yet)</p>
      )}
    </div>
  );
}

