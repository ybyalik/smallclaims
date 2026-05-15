// POST /api/admin/state-research/bulk-extract
//
// Runs the state-level structured extraction for a list of states in
// parallel. Mirrors the per-state extract endpoint but takes an array of
// slugs and fans out, so an admin can pick 3-5 states from the index and
// trigger them all with one click without manually opening each state's
// page.
//
// Body:
//   { "slugs": ["delaware", "florida", ...] }
//
// Returns:
//   { ok, submitted, succeeded, perState: [{ slug, ok, error?, model?, cost_cents?, chars? }] }
//
// A hard cap of 10 slugs per request keeps a runaway click from kicking
// off all 50 states at once. The admin can run multiple batches.

import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "../../../../../lib/supabase/server";
import { createServiceRoleClient } from "../../../../../lib/supabase/service-role";
import { getStateBySlug } from "../../../../../lib/states";
import {
  combineStateMarkdowns,
  extractStateLevelPack,
} from "../../../../../lib/state-research/extract";

export const runtime = "nodejs";
// Each state extraction can take up to 5 min on the largest dossiers. Ten
// states in parallel still complete in roughly the slowest-state time, so
// 800s (the Vercel Pro ceiling) is plenty for a 10-state batch.
export const maxDuration = 800;

const SLUG_RE = /^[a-z][a-z0-9-]+$/;
const MAX_SLUGS_PER_REQUEST = 10;

async function requireAdmin() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "auth_required" as const };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const admin = createServiceRoleClient() as any;
  const { data: profile } = await admin
    .from("profiles")
    .select("is_admin")
    .eq("user_id", user.id)
    .maybeSingle();
  if (!profile?.is_admin) return { error: "not_admin" as const };
  return { user };
}

interface PerStateResult {
  slug: string;
  ok: boolean;
  error?: string;
  model?: string;
  cost_cents?: number;
  chars?: number;
}

async function extractOne(slug: string): Promise<PerStateResult> {
  if (!SLUG_RE.test(slug)) return { slug, ok: false, error: "invalid slug" };
  const state = getStateBySlug(slug);
  if (!state) return { slug, ok: false, error: "unknown state" };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const admin = createServiceRoleClient() as any;

  const { data: row } = await admin
    .from("state_research")
    .select(
      "call_1_status, call_2_status, call_3_status, call_4_status, call_1_markdown, call_2_markdown, call_3_markdown, call_4_markdown",
    )
    .eq("slug", slug)
    .maybeSingle();

  if (!row) {
    return { slug, ok: false, error: "no state_research row" };
  }

  const statuses = [
    row.call_1_status,
    row.call_2_status,
    row.call_3_status,
    row.call_4_status,
  ];
  const notDone = statuses
    .map((s, i) => (s === "done" ? null : i + 1))
    .filter((i): i is number => i !== null);
  if (notDone.length > 0) {
    return {
      slug,
      ok: false,
      error: `call(s) ${notDone.join(", ")} not done`,
    };
  }

  const combined = combineStateMarkdowns(state.name, {
    1: row.call_1_markdown,
    2: row.call_2_markdown,
    3: row.call_3_markdown,
    4: row.call_4_markdown,
  });

  console.log(
    JSON.stringify({
      tag: "state-research.extract.start",
      ts: new Date().toISOString(),
      slug,
      chars: combined.length,
      via: "bulk-extract",
    }),
  );

  let extracted;
  try {
    extracted = await extractStateLevelPack(state.name, combined);
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error(`[state-research bulk-extract] ${slug}:`, msg);
    return { slug, ok: false, error: `extraction failed: ${msg}` };
  }

  const { error: dbErr } = await admin
    .from("state_research")
    .update({
      structured_pack: extracted.data,
      structured_pack_extracted_at: new Date().toISOString(),
      structured_pack_model: extracted.model,
      structured_pack_cost_cents: extracted.costCents,
      structured_pack_source_chars: combined.length,
      updated_at: new Date().toISOString(),
    })
    .eq("slug", slug);
  if (dbErr) {
    return { slug, ok: false, error: `DB save failed: ${dbErr.message}` };
  }

  return {
    slug,
    ok: true,
    model: extracted.model,
    cost_cents: extracted.costCents,
    chars: combined.length,
  };
}

export async function POST(req: NextRequest) {
  const guard = await requireAdmin();
  if ("error" in guard) {
    return NextResponse.json({ error: guard.error }, { status: 403 });
  }

  let body: { slugs?: unknown };
  try {
    body = (await req.json()) as { slugs?: unknown };
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!Array.isArray(body.slugs) || body.slugs.length === 0) {
    return NextResponse.json(
      { error: "slugs must be a non-empty array" },
      { status: 400 },
    );
  }
  const slugs = Array.from(
    new Set(
      (body.slugs as unknown[]).filter(
        (s): s is string => typeof s === "string" && SLUG_RE.test(s),
      ),
    ),
  );
  if (slugs.length === 0) {
    return NextResponse.json({ error: "No valid slugs provided" }, { status: 400 });
  }
  if (slugs.length > MAX_SLUGS_PER_REQUEST) {
    return NextResponse.json(
      {
        error: `Cap is ${MAX_SLUGS_PER_REQUEST} states per bulk extract. Run multiple batches.`,
      },
      { status: 400 },
    );
  }

  console.log(
    JSON.stringify({
      tag: "state-research.bulk-extract.start",
      ts: new Date().toISOString(),
      slugs,
      slug_count: slugs.length,
    }),
  );

  // Run all extractions in parallel. Each is bounded by the gpt-5-mini
  // call's own latency; batches up to 10 fit comfortably in the 900s
  // route timeout because parallel calls don't compound wall-clock.
  const perState: PerStateResult[] = await Promise.all(slugs.map(extractOne));
  const okCount = perState.filter((r) => r.ok).length;
  const totalCostCents = perState.reduce((n, r) => n + (r.cost_cents ?? 0), 0);

  console.log(
    JSON.stringify({
      tag: "state-research.bulk-extract.done",
      ts: new Date().toISOString(),
      submitted: slugs.length,
      succeeded: okCount,
      cost_cents: totalCostCents,
    }),
  );

  return NextResponse.json({
    ok: okCount === slugs.length,
    submitted: slugs.length,
    succeeded: okCount,
    cost_cents: totalCostCents,
    perState,
  });
}
