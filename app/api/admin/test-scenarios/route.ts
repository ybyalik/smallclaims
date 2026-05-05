// /api/admin/test-scenarios — admin-only endpoints for the test-scenarios
// admin page.
//
//   GET                              → list pre-baked scenario metadata + every
//                                       case ever spawned from a test scenario
//                                       (joined with research-job state).
//   POST ?slug=<slug>                → spawn a fresh case from a pre-baked scenario
//   POST ?random=1                   → spawn a fresh case from a randomly
//                                       generated scenario
//   DELETE ?caseId=<uuid>            → permanently wipe a spawned test case
//                                       (jobs, reports, sources links, and the
//                                       case row itself).

import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "../../../../lib/supabase/server";
import { createServiceRoleClient } from "../../../../lib/supabase/service-role";
import {
  TEST_SCENARIOS,
  getTestScenario,
  generateRandomScenario,
  type TestScenario,
} from "../../../../lib/demand-letter/test-scenarios";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function requireAdmin() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "auth_required", status: 401 as const };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const admin = createServiceRoleClient() as any;
  const { data: profile } = await admin
    .from("profiles")
    .select("is_admin")
    .eq("user_id", user.id)
    .maybeSingle();
  if (!profile?.is_admin) return { error: "not_admin", status: 403 as const };
  return { admin, userId: user.id };
}

export async function GET() {
  const auth = await requireAdmin();
  if ("error" in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }
  const { admin } = auth;

  // List every case spawned from a test scenario. We tag spawned cases with
  // `_test_scenario: true` in intake_answers so we can find them later.
  const { data: cases } = await admin
    .from("cases")
    .select("id, state, county, dispute_type, amount_cents, defendant_name, intake_answers, created_at, status")
    .eq("intake_answers->>_test_scenario", "true")
    .order("created_at", { ascending: false });

  // For each, look up latest research job state.
  const caseIds = ((cases ?? []) as Array<{ id: string }>).map((c) => c.id);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const jobsByCase = new Map<string, any>();
  if (caseIds.length > 0) {
    const { data: jobs } = await admin
      .from("case_research_jobs")
      .select("id, case_id, version, status, started_at, finished_at, progress")
      .in("case_id", caseIds)
      .order("version", { ascending: false });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    for (const j of (jobs ?? []) as any[]) {
      if (!jobsByCase.has(j.case_id)) jobsByCase.set(j.case_id, j);
    }
  }

  return NextResponse.json({
    scenarios: TEST_SCENARIOS.map((s) => ({
      slug: s.slug,
      label: s.label,
      description: s.description,
      state: s.state,
      county: s.county,
      dispute_type: s.dispute_type,
      amount_dollars: s.amount_cents / 100,
    })),
    spawned: ((cases ?? []) as Array<{
      id: string;
      state: string;
      county: string | null;
      dispute_type: string;
      amount_cents: number;
      defendant_name: string;
      intake_answers: Record<string, unknown>;
      created_at: string;
      status: string;
    }>).map((c) => {
      const job = jobsByCase.get(c.id);
      const deepStatus = job?.progress?.deep?.status as string | undefined;
      const reportPending = job?.progress?.deep?.status === "succeeded" ? "yes" : "no";
      return {
        caseId: c.id,
        scenarioSlug: (c.intake_answers?._test_scenario_slug as string | undefined) ?? null,
        scenarioLabel: (c.intake_answers?._test_scenario_label as string | undefined) ?? null,
        state: c.state,
        county: c.county,
        dispute_type: c.dispute_type,
        amount_dollars: c.amount_cents / 100,
        defendant_name: c.defendant_name,
        created_at: c.created_at,
        status: c.status,
        researchJobStatus: job?.status ?? null,
        deepStatus: deepStatus ?? null,
        reportPending,
      };
    }),
  });
}

export async function POST(req: NextRequest) {
  const auth = await requireAdmin();
  if ("error" in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }
  const { admin, userId } = auth;

  const params = new URL(req.url).searchParams;
  const slug = params.get("slug");
  const random = params.get("random") === "1";

  let scenario: TestScenario | null = null;
  if (random) {
    scenario = generateRandomScenario();
  } else if (slug) {
    scenario = getTestScenario(slug);
    if (!scenario) {
      return NextResponse.json({ error: `unknown scenario: ${slug}` }, { status: 404 });
    }
  } else {
    return NextResponse.json(
      { error: "missing slug or random=1 query param" },
      { status: 400 },
    );
  }

  // Tag the case so we can list/delete it later from this page.
  const intakeAnswersWithMarker = {
    ...scenario.intake_answers,
    _test_scenario: true,
    _test_scenario_slug: scenario.slug,
    _test_scenario_label: scenario.label,
  };

  const { data: caseRow, error: insertError } = await admin
    .from("cases")
    .insert({
      owner_user_id: userId,
      status: "demand_paid",
      state: scenario.state,
      county: scenario.county,
      dispute_type: scenario.dispute_type,
      amount_cents: scenario.amount_cents,
      plaintiff_name: scenario.plaintiff_name,
      plaintiff_email: scenario.plaintiff_email,
      plaintiff_phone: scenario.plaintiff_phone,
      plaintiff_address: scenario.plaintiff_address,
      plaintiff_county: scenario.plaintiff_county,
      defendant_name: scenario.defendant_name,
      defendant_email: scenario.defendant_email,
      defendant_phone: scenario.defendant_phone,
      defendant_address: scenario.defendant_address,
      defendant_county: scenario.defendant_county,
      incident_county: scenario.incident_county,
      facts_narrative: scenario.facts_narrative,
      intake_answers: intakeAnswersWithMarker,
    })
    .select("id")
    .single();
  if (insertError || !caseRow) {
    console.error("[test-scenarios] insert failed:", insertError);
    return NextResponse.json(
      { error: `insert failed: ${insertError?.message ?? "unknown"}` },
      { status: 500 },
    );
  }

  return NextResponse.json({
    ok: true,
    scenario: scenario.slug,
    label: scenario.label,
    caseId: caseRow.id,
    adminUrl: `/admin/cases/${caseRow.id}`,
  });
}

export async function DELETE(req: NextRequest) {
  const auth = await requireAdmin();
  if ("error" in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }
  const { admin } = auth;

  const caseId = new URL(req.url).searchParams.get("caseId");
  if (!caseId) {
    return NextResponse.json({ error: "missing caseId" }, { status: 400 });
  }

  // Confirm this case was actually a test scenario before nuking it. We
  // never want this endpoint to delete a real customer case.
  const { data: caseRow } = await admin
    .from("cases")
    .select("id, intake_answers")
    .eq("id", caseId)
    .maybeSingle();
  if (!caseRow) {
    return NextResponse.json({ error: "case not found" }, { status: 404 });
  }
  const isTest = (caseRow.intake_answers as Record<string, unknown> | null)?._test_scenario === true;
  if (!isTest) {
    return NextResponse.json(
      { error: "not a test scenario; refusing to delete" },
      { status: 403 },
    );
  }

  // Wipe related rows. Order matters: child rows first, parent last.
  // case_research_job_sources references case_research_jobs by job_id.
  const { data: jobs } = await admin
    .from("case_research_jobs")
    .select("id")
    .eq("case_id", caseId);
  const jobIds = ((jobs ?? []) as Array<{ id: string }>).map((j) => j.id);
  if (jobIds.length > 0) {
    await admin.from("case_research_job_sources").delete().in("job_id", jobIds);
    await admin.from("case_research_reports").delete().in("job_id", jobIds);
    await admin.from("case_research_jobs").delete().in("id", jobIds);
  }
  // Some peripheral rows may be FK'd to cases directly — let cascade handle
  // them via the case row delete.
  const { error } = await admin.from("cases").delete().eq("id", caseId);
  if (error) {
    return NextResponse.json(
      { error: `delete failed: ${error.message}` },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true, caseId });
}
