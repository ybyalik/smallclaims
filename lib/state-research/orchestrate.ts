// Higher-level helpers that wire the OpenAI runner together with Supabase
// state_research row updates. These are the entry points used by API routes
// and the polling cron.
//
// Two submission modes per call:
//   - 'background': ~30 min, full price. Uses Responses API with
//                   background: true.
//   - 'batch':       up to 24h, 50% off tokens. Uses Batch API.
//
// Each call independently records its mode in call_N_via. The poller picks
// the right path automatically.

import { createServiceRoleClient } from "../supabase/service-role";
import { getStateBySlug } from "../states";
import {
  submitStateResearchCall,
  getStateResearchStatus,
  parseStateResearchOutput,
  callRowPatch,
  type SubmitOutput,
} from "./runner";
import { submitStateResearchBatchCall, pollBatchCall } from "./batch";
import type { StateCallId } from "./prompts";

export type SubmitMode = "background" | "batch";

// ---------------------------------------------------------------------------
// Kick off one call for one state
// ---------------------------------------------------------------------------

export async function startStateResearchCall(
  slug: string,
  call: StateCallId,
  via: SubmitMode = "background",
): Promise<{ ok: true; id: string; via: SubmitMode } | { ok: false; error: string }> {
  const state = getStateBySlug(slug);
  if (!state) return { ok: false, error: `Unknown state slug: ${slug}` };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const admin = createServiceRoleClient() as any;

  // Mark as running BEFORE submitting so a duplicate trigger sees the
  // running state. Reset error, response_id, and batch_id so a re-run from
  // a previously-failed state doesn't leave stale IDs.
  await admin.from("state_research").upsert(
    {
      slug,
      state_name: state.name,
      ...callRowPatch(call, {
        status: "running",
        via,
        error: null,
        response_id: "",
        batch_id: "",
        started_at: new Date().toISOString(),
        completed_at: null,
      }),
      updated_at: new Date().toISOString(),
    },
    { onConflict: "slug" },
  );

  // ----- background mode --------------------------------------------------
  if (via === "background") {
    let submitted: SubmitOutput;
    try {
      submitted = await submitStateResearchCall(call, state.name);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      await admin
        .from("state_research")
        .update({
          ...callRowPatch(call, {
            status: "failed",
            error: msg,
            completed_at: new Date().toISOString(),
          }),
          updated_at: new Date().toISOString(),
        })
        .eq("slug", slug);
      return { ok: false, error: msg };
    }

    await admin
      .from("state_research")
      .update({
        ...callRowPatch(call, {
          response_id: submitted.responseId,
          model: submitted.model,
          status: "running",
        }),
        updated_at: new Date().toISOString(),
      })
      .eq("slug", slug);

    return { ok: true, id: submitted.responseId, via };
  }

  // ----- batch mode -------------------------------------------------------
  try {
    const batch = await submitStateResearchBatchCall(call, state.name, slug);
    await admin
      .from("state_research")
      .update({
        ...callRowPatch(call, {
          batch_id: batch.batchId,
          model: batch.model,
          status: "running",
        }),
        updated_at: new Date().toISOString(),
      })
      .eq("slug", slug);
    return { ok: true, id: batch.batchId, via };
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    await admin
      .from("state_research")
      .update({
        ...callRowPatch(call, {
          status: "failed",
          error: msg,
          completed_at: new Date().toISOString(),
        }),
        updated_at: new Date().toISOString(),
      })
      .eq("slug", slug);
    return { ok: false, error: msg };
  }
}

// ---------------------------------------------------------------------------
// Kick off all four calls in parallel
// ---------------------------------------------------------------------------

export async function startAllStateResearch(
  slug: string,
  via: SubmitMode = "background",
): Promise<{
  ok: boolean;
  results: Array<{ call: StateCallId; ok: boolean; id?: string; error?: string }>;
}> {
  const calls: StateCallId[] = [1, 2, 3, 4];
  const results = await Promise.all(
    calls.map(async (c) => {
      const r = await startStateResearchCall(slug, c, via);
      if (r.ok) return { call: c, ok: true as const, id: r.id };
      return { call: c, ok: false as const, error: r.error };
    }),
  );
  return { ok: results.every((r) => r.ok), results };
}

// ---------------------------------------------------------------------------
// Poll one in-flight call and persist on completion
// ---------------------------------------------------------------------------

export type PollOutcome =
  | { outcome: "still_running" }
  | { outcome: "done" }
  | { outcome: "failed"; error: string }
  | { outcome: "skipped"; reason: string };

export async function pollStateResearchCall(
  slug: string,
  call: StateCallId,
): Promise<PollOutcome> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const admin = createServiceRoleClient() as any;
  const { data: row } = await admin
    .from("state_research")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (!row) return { outcome: "skipped", reason: "no row" };

  const status = row[`call_${call}_status`] as string | null;
  if (status === "done" || status === "failed") {
    return { outcome: "skipped", reason: `already ${status}` };
  }

  const via = (row[`call_${call}_via`] as string | null) ?? "background";
  const model = (row[`call_${call}_model`] as string | null) ?? "o3-deep-research";

  if (via === "batch") {
    return pollBatchPath(admin, slug, call, row, model);
  }
  return pollBackgroundPath(admin, slug, call, row, model);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function pollBackgroundPath(admin: any, slug: string, call: StateCallId, row: any, model: string): Promise<PollOutcome> {
  const responseId = row[`call_${call}_response_id`] as string | null;
  if (!responseId) return { outcome: "skipped", reason: "no response id" };

  let envelope;
  try {
    const r = await getStateResearchStatus(responseId);
    envelope = r.envelope;
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return { outcome: "failed", error: msg };
  }

  const openaiStatus = envelope.status ?? "unknown";
  if (openaiStatus === "in_progress" || openaiStatus === "queued") {
    return { outcome: "still_running" };
  }
  if (openaiStatus === "completed") {
    const parsed = parseStateResearchOutput(envelope, model);
    await admin
      .from("state_research")
      .update({
        ...callRowPatch(call, {
          markdown: parsed.markdown,
          input_tokens: parsed.inputTokens,
          output_tokens: parsed.outputTokens,
          cost_cents: parsed.costCents,
          status: "done",
          completed_at: new Date().toISOString(),
        }),
        updated_at: new Date().toISOString(),
      })
      .eq("slug", slug);
    return { outcome: "done" };
  }

  const errMsg =
    envelope.error?.message ??
    envelope.incomplete_details?.reason ??
    `OpenAI returned status ${openaiStatus}`;
  await admin
    .from("state_research")
    .update({
      ...callRowPatch(call, {
        status: "failed",
        error: errMsg,
        completed_at: new Date().toISOString(),
      }),
      updated_at: new Date().toISOString(),
    })
    .eq("slug", slug);
  return { outcome: "failed", error: errMsg };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function pollBatchPath(admin: any, slug: string, call: StateCallId, row: any, model: string): Promise<PollOutcome> {
  const batchId = row[`call_${call}_batch_id`] as string | null;
  if (!batchId) return { outcome: "skipped", reason: "no batch id" };

  let result;
  try {
    result = await pollBatchCall(batchId);
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return { outcome: "failed", error: msg };
  }

  if (
    result.status === "validating" ||
    result.status === "in_progress" ||
    result.status === "finalizing"
  ) {
    return { outcome: "still_running" };
  }

  if (result.status === "completed" && result.envelope) {
    // The inner Responses envelope may itself be 'completed' (success) or
    // 'incomplete' (e.g., max_output_tokens). Reuse the same handling as
    // background mode: if the inner envelope says completed, save the
    // findings; otherwise mark failed.
    const innerStatus = result.envelope.status ?? "unknown";
    if (innerStatus === "completed") {
      const parsed = parseStateResearchOutput(result.envelope, model);
      // Batch tokens billed at 50% — discount the token portion.
      const discountedCost = Math.ceil(parsed.costCents * 0.5);
      await admin
        .from("state_research")
        .update({
          ...callRowPatch(call, {
            markdown: parsed.markdown,
            input_tokens: parsed.inputTokens,
            output_tokens: parsed.outputTokens,
            cost_cents: discountedCost,
            response_id: result.envelope.id ?? "",
            status: "done",
            completed_at: new Date().toISOString(),
          }),
          updated_at: new Date().toISOString(),
        })
        .eq("slug", slug);
      return { outcome: "done" };
    }

    const innerErr =
      result.envelope.error?.message ??
      result.envelope.incomplete_details?.reason ??
      `Batch inner response status ${innerStatus}`;
    await admin
      .from("state_research")
      .update({
        ...callRowPatch(call, {
          status: "failed",
          error: innerErr,
          completed_at: new Date().toISOString(),
        }),
        updated_at: new Date().toISOString(),
      })
      .eq("slug", slug);
    return { outcome: "failed", error: innerErr };
  }

  // Terminal failure of the batch itself.
  const errMsg = result.error ?? `Batch ${result.status}`;
  await admin
    .from("state_research")
    .update({
      ...callRowPatch(call, {
        status: "failed",
        error: errMsg,
        completed_at: new Date().toISOString(),
      }),
      updated_at: new Date().toISOString(),
    })
    .eq("slug", slug);
  return { outcome: "failed", error: errMsg };
}

// ---------------------------------------------------------------------------
// Poll every call that's currently running (for the cron)
// ---------------------------------------------------------------------------

export async function pollAllRunningStateResearch(): Promise<
  Array<{ slug: string; call: StateCallId; outcome: PollOutcome["outcome"]; error?: string }>
> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const admin = createServiceRoleClient() as any;
  const { data: rows } = await admin
    .from("state_research")
    .select(
      "slug, call_1_status, call_2_status, call_3_status, call_4_status",
    )
    .or(
      "call_1_status.eq.running,call_2_status.eq.running,call_3_status.eq.running,call_4_status.eq.running",
    )
    .limit(50);
  if (!rows || rows.length === 0) return [];

  const results: Array<{
    slug: string;
    call: StateCallId;
    outcome: PollOutcome["outcome"];
    error?: string;
  }> = [];
  for (const r of rows as Array<{
    slug: string;
    call_1_status: string | null;
    call_2_status: string | null;
    call_3_status: string | null;
    call_4_status: string | null;
  }>) {
    const calls: StateCallId[] = [1, 2, 3, 4];
    for (const c of calls) {
      const s = r[`call_${c}_status` as `call_${1 | 2 | 3 | 4}_status`];
      if (s !== "running") continue;
      try {
        const o = await pollStateResearchCall(r.slug, c);
        results.push({ slug: r.slug, call: c, outcome: o.outcome, error: "error" in o ? o.error : undefined });
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        results.push({ slug: r.slug, call: c, outcome: "failed", error: msg });
      }
    }
  }
  return results;
}
