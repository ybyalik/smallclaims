import { createServiceRoleClient } from "../supabase/service-role";

export interface CaseResearchJobRow {
  id: string;
  case_id: string;
  version: number;
  status: "queued" | "running" | "succeeded" | "failed" | "canceled";
  visibility: "admin" | "customer";
  tier: "basic" | "comprehensive";
  started_at: string | null;
  finished_at: string | null;
  error_message: string | null;
  cost_cents: number;
  model_versions: Record<string, unknown>;
  progress: Record<string, Record<string, unknown>>;
  created_at: string;
}

export interface CaseResearchSourceRow {
  url: string;
  domain: string;
  title: string | null;
  cite_role: string;
  is_official: boolean;
  provenance: "tavily" | "firecrawl" | "bright_data" | "deep_research" | "form_pdf";
  content_markdown: string | null;
  content_text: string | null;
  byte_size: number | null;
  mime_type: string | null;
}

export interface CaseResearchDetail {
  job: CaseResearchJobRow;
  evidencePack: Record<string, unknown> | null;
  // Two-call deep research: each half has its own response id, raw findings
  // markdown, and structured pack. Legacy single-call fields (deepResearchPack,
  // deepResearchResponseId, deepResearchReportMd) remain on this interface
  // for backward compat with admin UI panels still rendering pre-migration
  // jobs; they're null on jobs created after the two-call rollout.
  deepResearchResponseIdA: string | null;
  deepResearchResponseIdB: string | null;
  deepResearchFindingsA: string | null;
  deepResearchFindingsB: string | null;
  deepResearchPack: Record<string, unknown> | null;
  deepResearchResponseId: string | null;
  deepResearchReportMd: string | null;
  formSpecs: Array<Record<string, unknown>> | null;
  qaPassed: boolean;
  qaNotes: Record<string, unknown> | null;
  sources: CaseResearchSourceRow[];
  // Customer report layer
  customerReportStatus: "pending" | "draft" | "published" | null;
  customerReportHtml: string | null;
  customerReportPublishedHtml: string | null;
  customerReportPublishedAt: string | null;
  mergedPack: Record<string, unknown> | null;
  mergeSummary: Record<string, unknown> | null;
  overallConfidence: "low" | "medium" | "high" | null;
  criticalConflictDetected: boolean;
}

export async function listCaseResearchJobs(caseId: string): Promise<CaseResearchJobRow[]> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const admin = createServiceRoleClient() as any;
  const { data } = await admin
    .from("case_research_jobs")
    .select("*")
    .eq("case_id", caseId)
    .order("version", { ascending: false });
  return (data ?? []) as CaseResearchJobRow[];
}

export async function loadCaseResearchLatest(caseId: string): Promise<CaseResearchDetail | null> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const admin = createServiceRoleClient() as any;
  const { data: job } = await admin
    .from("case_research_jobs")
    .select("*")
    .eq("case_id", caseId)
    .order("version", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (!job) return null;

  const { data: report } = await admin
    .from("case_research_reports")
    .select(
      "evidence_pack, deep_research_pack, deep_research_response_id, deep_research_report_md, deep_research_response_id_a, deep_research_response_id_b, deep_research_findings_a, deep_research_findings_b, form_specs, qa_passed, qa_notes, customer_report_status, customer_report_html, customer_report_published_html, customer_report_published_at, merged_pack, merge_summary, overall_confidence, critical_conflict_detected",
    )
    .eq("job_id", job.id)
    .maybeSingle();

  const { data: sourceRows } = await admin
    .from("case_research_job_sources")
    .select(
      "cite_role, source:case_research_sources(url, domain, title, is_official, provenance, content_markdown, content_text, byte_size, mime_type)",
    )
    .eq("job_id", job.id);

  const sources: CaseResearchSourceRow[] = (sourceRows ?? [])
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .map((r: any) => ({
      url: r.source?.url,
      domain: r.source?.domain,
      title: r.source?.title,
      cite_role: r.cite_role,
      is_official: r.source?.is_official ?? false,
      provenance: (r.source?.provenance ?? "firecrawl") as CaseResearchSourceRow["provenance"],
      content_markdown: r.source?.content_markdown ?? null,
      content_text: r.source?.content_text ?? null,
      byte_size: r.source?.byte_size ?? null,
      mime_type: r.source?.mime_type ?? null,
    }))
    .filter((r: CaseResearchSourceRow) => !!r.url);

  return {
    job: job as CaseResearchJobRow,
    evidencePack: report?.evidence_pack ?? null,
    deepResearchResponseIdA: report?.deep_research_response_id_a ?? null,
    deepResearchResponseIdB: report?.deep_research_response_id_b ?? null,
    deepResearchFindingsA: report?.deep_research_findings_a ?? null,
    deepResearchFindingsB: report?.deep_research_findings_b ?? null,
    deepResearchPack: report?.deep_research_pack ?? null,
    deepResearchResponseId: report?.deep_research_response_id ?? null,
    deepResearchReportMd: report?.deep_research_report_md ?? null,
    formSpecs: report?.form_specs ?? null,
    qaPassed: report?.qa_passed ?? false,
    qaNotes: report?.qa_notes ?? null,
    sources,
    customerReportStatus: (report?.customer_report_status ?? null) as CaseResearchDetail["customerReportStatus"],
    customerReportHtml: report?.customer_report_html ?? null,
    customerReportPublishedHtml: report?.customer_report_published_html ?? null,
    customerReportPublishedAt: report?.customer_report_published_at ?? null,
    mergedPack: report?.merged_pack ?? null,
    mergeSummary: report?.merge_summary ?? null,
    overallConfidence: (report?.overall_confidence ?? null) as CaseResearchDetail["overallConfidence"],
    criticalConflictDetected: report?.critical_conflict_detected ?? false,
  };
}

export async function listCaseResearchStatuses(
  caseIds: string[],
): Promise<Map<string, CaseResearchJobRow["status"]>> {
  if (caseIds.length === 0) return new Map();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const admin = createServiceRoleClient() as any;
  const { data } = await admin
    .from("case_research_jobs")
    .select("case_id, version, status")
    .in("case_id", caseIds);
  const out = new Map<string, CaseResearchJobRow["status"]>();
  // Keep highest version per case
  const seen = new Map<string, number>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  for (const r of (data ?? []) as any[]) {
    const prev = seen.get(r.case_id) ?? -1;
    if (r.version > prev) {
      seen.set(r.case_id, r.version);
      out.set(r.case_id, r.status);
    }
  }
  return out;
}
