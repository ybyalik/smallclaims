// Admin endpoints for editable state-research prompts.
//
//   POST   { call: 1|2|3|4, prompt_text: string }  -> upsert override
//   DELETE { call: 1|2|3|4 }                       -> remove override (resets to code default)
//
// The runner consults the override at submission time via resolveStatePrompt.

import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "../../../../../lib/supabase/server";
import { createServiceRoleClient } from "../../../../../lib/supabase/service-role";
import type { StateCallId } from "../../../../../lib/state-research/prompts";

export const runtime = "nodejs";
export const maxDuration = 30;

const MIN_PROMPT_CHARS = 200;
const MAX_PROMPT_CHARS = 50_000;

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
  if (!profile?.is_admin) return { error: "not_admin" as const, user };
  return { user };
}

function parseCall(input: unknown): StateCallId | null {
  if (input === 1 || input === 2 || input === 3 || input === 4) return input;
  return null;
}

export async function POST(req: NextRequest) {
  const guard = await requireAdmin();
  if ("error" in guard) {
    return NextResponse.json({ error: guard.error }, { status: 403 });
  }

  let body: { call?: unknown; prompt_text?: unknown };
  try {
    body = (await req.json()) as { call?: unknown; prompt_text?: unknown };
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const call = parseCall(body.call);
  if (!call) {
    return NextResponse.json({ error: "call must be 1, 2, 3, or 4" }, { status: 400 });
  }
  const text = typeof body.prompt_text === "string" ? body.prompt_text.trim() : "";
  if (text.length < MIN_PROMPT_CHARS) {
    return NextResponse.json(
      { error: `prompt_text must be at least ${MIN_PROMPT_CHARS} characters` },
      { status: 400 },
    );
  }
  if (text.length > MAX_PROMPT_CHARS) {
    return NextResponse.json(
      { error: `prompt_text must be no more than ${MAX_PROMPT_CHARS} characters` },
      { status: 400 },
    );
  }
  if (!text.includes("[STATE NAME]")) {
    return NextResponse.json(
      {
        error:
          "prompt_text must contain the literal placeholder [STATE NAME] so the runner can substitute the state at submit time",
      },
      { status: 400 },
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const admin = createServiceRoleClient() as any;
  const { error: dbErr } = await admin.from("state_research_prompts").upsert(
    {
      call_id: call,
      prompt_text: text,
      updated_at: new Date().toISOString(),
      updated_by: guard.user.id,
    },
    { onConflict: "call_id" },
  );
  if (dbErr) {
    return NextResponse.json({ error: `DB save failed: ${dbErr.message}` }, { status: 500 });
  }

  console.log(
    JSON.stringify({
      tag: "state-research.prompt.save",
      ts: new Date().toISOString(),
      call,
      chars: text.length,
      user: guard.user.id,
    }),
  );

  return NextResponse.json({ ok: true, call, chars: text.length });
}

export async function DELETE(req: NextRequest) {
  const guard = await requireAdmin();
  if ("error" in guard) {
    return NextResponse.json({ error: guard.error }, { status: 403 });
  }

  let body: { call?: unknown };
  try {
    body = (await req.json()) as { call?: unknown };
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const call = parseCall(body.call);
  if (!call) {
    return NextResponse.json({ error: "call must be 1, 2, 3, or 4" }, { status: 400 });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const admin = createServiceRoleClient() as any;
  const { error: dbErr } = await admin
    .from("state_research_prompts")
    .delete()
    .eq("call_id", call);
  if (dbErr) {
    return NextResponse.json({ error: `DB delete failed: ${dbErr.message}` }, { status: 500 });
  }

  console.log(
    JSON.stringify({
      tag: "state-research.prompt.reset",
      ts: new Date().toISOString(),
      call,
      user: guard.user.id,
    }),
  );

  return NextResponse.json({ ok: true, call });
}
