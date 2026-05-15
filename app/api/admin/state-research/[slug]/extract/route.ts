// POST /api/admin/state-research/[slug]/extract
//
// Runs the state-level structured extraction over the four call markdowns
// and saves the resulting EvidencePack into state_research.structured_pack.
// All four calls must already be in status=done; otherwise the request
// errors with a clear message so the admin knows what to finish first.
//
// Idempotent: safe to re-run. Overwrites any prior structured_pack with
// the fresh extraction.

import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "../../../../../../lib/supabase/server";
import { createServiceRoleClient } from "../../../../../../lib/supabase/service-role";
import { getStateBySlug } from "../../../../../../lib/states";
import {
  combineStateMarkdowns,
  extractStateLevelPack,
} from "../../../../../../lib/state-research/extract";

export const runtime = "nodejs";
// State extraction runs gpt-5-mini over a ~300k-char dossier. NY took 254s.
// 600s leaves headroom for larger dossiers and the tighter-prompt re-runs.
export const maxDuration = 600;

const SLUG_RE = /^[a-z][a-z0-9-]+$/;

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

export async function POST(_req: NextRequest, ctx: { params: { slug: string } }) {
  if (!SLUG_RE.test(ctx.params.slug)) {
    return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
  }
  const guard = await requireAdmin();
  if ("error" in guard) {
    return NextResponse.json({ error: guard.error }, { status: 403 });
  }
  const state = getStateBySlug(ctx.params.slug);
  if (!state) return NextResponse.json({ error: "Unknown state" }, { status: 404 });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const admin = createServiceRoleClient() as any;

  const { data: row } = await admin
    .from("state_research")
    .select(
      "call_1_status, call_2_status, call_3_status, call_4_status, call_1_markdown, call_2_markdown, call_3_markdown, call_4_markdown",
    )
    .eq("slug", ctx.params.slug)
    .maybeSingle();

  if (!row) {
    return NextResponse.json(
      { error: `No state_research row for ${ctx.params.slug}` },
      { status: 404 },
    );
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
    return NextResponse.json(
      {
        error: `Cannot extract: call(s) ${notDone.join(", ")} are not done. Finish them first.`,
        statuses,
      },
      { status: 409 },
    );
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
      slug: ctx.params.slug,
      chars: combined.length,
    }),
  );

  let extracted;
  try {
    extracted = await extractStateLevelPack(state.name, combined);
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error(`[state-research extract] ${ctx.params.slug}:`, msg);
    return NextResponse.json({ error: `Extraction failed: ${msg}` }, { status: 502 });
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
    .eq("slug", ctx.params.slug);
  if (dbErr) {
    console.error("[state-research extract] db", dbErr);
    return NextResponse.json({ error: `DB save failed: ${dbErr.message}` }, { status: 500 });
  }

  return NextResponse.json({
    ok: true,
    slug: ctx.params.slug,
    model: extracted.model,
    cost_cents: extracted.costCents,
    chars: combined.length,
  });
}
