// POST /api/admin/state-research/[slug]/import
//
// Recovery endpoint: pulls an already-completed response from OpenAI by
// response_id and saves its markdown into the corresponding call slot of
// state_research. Used to recover from situations where OpenAI ran a call
// and billed for it but our row never got the result (e.g., earlier
// duplicate-submission bug, polling failures, etc.).
//
// Body: { call: 1|2|3|4, responseId: string }
// Response must be status=completed on OpenAI's side.

import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "../../../../../../lib/supabase/server";
import { createServiceRoleClient } from "../../../../../../lib/supabase/service-role";
import { getStateBySlug } from "../../../../../../lib/states";
import {
  getStateResearchStatus,
  parseStateResearchOutput,
  callRowPatch,
} from "../../../../../../lib/state-research/runner";
import type { StateCallId } from "../../../../../../lib/state-research/prompts";

export const runtime = "nodejs";
export const maxDuration = 60;

const SLUG_RE = /^[a-z][a-z0-9-]+$/;
const RESPONSE_ID_RE = /^resp_[a-z0-9]{8,}$/i;

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

export async function POST(req: NextRequest, ctx: { params: { slug: string } }) {
  if (!SLUG_RE.test(ctx.params.slug)) {
    return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
  }
  const guard = await requireAdmin();
  if ("error" in guard) {
    return NextResponse.json({ error: guard.error }, { status: 403 });
  }
  const state = getStateBySlug(ctx.params.slug);
  if (!state) return NextResponse.json({ error: "Unknown state" }, { status: 404 });

  let body: { call?: number; responseId?: unknown };
  try {
    body = (await req.json()) as { call?: number; responseId?: unknown };
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const call = body.call;
  if (call !== 1 && call !== 2 && call !== 3 && call !== 4) {
    return NextResponse.json({ error: "call must be 1, 2, 3, or 4" }, { status: 400 });
  }

  let responseId = typeof body.responseId === "string" ? body.responseId.trim() : "";
  // Allow pasting a full OpenAI logs URL — extract the resp_… part.
  const m = /resp_[a-z0-9]+/i.exec(responseId);
  if (m) responseId = m[0];
  if (!RESPONSE_ID_RE.test(responseId)) {
    return NextResponse.json(
      { error: "responseId must look like resp_…" },
      { status: 400 },
    );
  }

  console.log(
    JSON.stringify({
      tag: "state-research.import",
      ts: new Date().toISOString(),
      slug: ctx.params.slug,
      call,
      response_id: responseId,
    }),
  );

  let envelope;
  try {
    const r = await getStateResearchStatus(responseId);
    envelope = r.envelope;
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: `OpenAI fetch failed: ${msg}` }, { status: 502 });
  }

  if (envelope.status !== "completed") {
    return NextResponse.json(
      {
        error: `Response is not completed (status=${envelope.status}). Only completed responses can be imported.`,
      },
      { status: 409 },
    );
  }

  // Reuse the same parser the poller uses so input/output tokens, costs,
  // model, and markdown are computed identically.
  const model = "o3-deep-research"; // import doesn't know the original; default
  const parsed = parseStateResearchOutput(envelope, model);
  if (!parsed.markdown || parsed.markdown.length < 200) {
    return NextResponse.json(
      { error: `Response markdown is too short (${parsed.markdown.length} chars) — wrong response_id?` },
      { status: 400 },
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const admin = createServiceRoleClient() as any;
  const { error: dbErr } = await admin.from("state_research").upsert(
    {
      slug: ctx.params.slug,
      state_name: state.name,
      ...callRowPatch(call as StateCallId, {
        markdown: parsed.markdown,
        response_id: responseId,
        model: parsed.model,
        input_tokens: parsed.inputTokens,
        output_tokens: parsed.outputTokens,
        cost_cents: parsed.costCents,
        status: "done",
        error: null,
        // Don't override started_at on an import — keep whatever was there.
        completed_at: new Date().toISOString(),
      }),
      updated_at: new Date().toISOString(),
    },
    { onConflict: "slug" },
  );
  if (dbErr) {
    console.error("[state-research import] db", dbErr);
    return NextResponse.json({ error: `DB save failed: ${dbErr.message}` }, { status: 500 });
  }

  return NextResponse.json({
    ok: true,
    response_id: responseId,
    chars: parsed.markdown.length,
    input_tokens: parsed.inputTokens,
    output_tokens: parsed.outputTokens,
    cost_cents: parsed.costCents,
  });
}
