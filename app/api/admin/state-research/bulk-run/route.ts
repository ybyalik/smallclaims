// POST /api/admin/state-research/bulk-run
//
// Kicks off all four deep-research calls for a list of states. Each state's
// four calls run in parallel (same as the single-state "Run all" button);
// state-level fan-out is also parallel, so all selected states submit at
// roughly the same time.
//
// Body:
//   { "slugs": ["delaware", "florida", ...], "via": "background" | "batch" }
//
// Returns a results array per state with the same shape as
// /api/admin/state-research/[slug]/run when called with call="all".

import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "../../../../../lib/supabase/server";
import { createServiceRoleClient } from "../../../../../lib/supabase/service-role";
import {
  startAllStateResearch,
  type SubmitMode,
} from "../../../../../lib/state-research/orchestrate";

export const runtime = "nodejs";
export const maxDuration = 60;

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

const SLUG_RE = /^[a-z][a-z0-9-]+$/;

export async function POST(req: NextRequest) {
  const guard = await requireAdmin();
  if ("error" in guard) {
    return NextResponse.json({ error: guard.error }, { status: 403 });
  }

  let body: { slugs?: unknown; via?: unknown };
  try {
    body = (await req.json()) as { slugs?: unknown; via?: unknown };
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!Array.isArray(body.slugs) || body.slugs.length === 0) {
    return NextResponse.json({ error: "slugs must be a non-empty array" }, { status: 400 });
  }
  const slugs = (body.slugs as unknown[]).filter(
    (s): s is string => typeof s === "string" && SLUG_RE.test(s),
  );
  if (slugs.length === 0) {
    return NextResponse.json({ error: "No valid slugs provided" }, { status: 400 });
  }
  if (slugs.length > 51) {
    return NextResponse.json({ error: "Cap is 51 states per bulk run" }, { status: 400 });
  }

  const via: SubmitMode = body.via === "batch" ? "batch" : "background";

  console.log(
    JSON.stringify({
      tag: "state-research.bulk-run",
      ts: new Date().toISOString(),
      slugs,
      slug_count: slugs.length,
      via,
      ua: req.headers.get("user-agent")?.slice(0, 120) ?? "",
      ip:
        req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
        req.headers.get("x-real-ip") ||
        "",
    }),
  );

  const perState = await Promise.all(
    slugs.map(async (slug) => {
      try {
        const r = await startAllStateResearch(slug, via);
        return { slug, ok: r.ok, results: r.results };
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        return { slug, ok: false, error: msg };
      }
    }),
  );

  const okCount = perState.filter((r) => r.ok).length;
  return NextResponse.json({
    ok: okCount === slugs.length,
    submitted: slugs.length,
    succeeded: okCount,
    via,
    perState,
  });
}
