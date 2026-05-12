// Batch-API submission for state research. Each "batch" we create contains
// exactly ONE deep-research request (one call). One-per-batch preserves the
// retry-an-individual-call workflow from background mode — fail one call,
// retry just that one, don't redo the state.
//
// Cost trade-off vs. background mode:
//   - 50% off input + output tokens (the deep-research model fee).
//   - Web-search tool calls still bill at 2.5¢ each (not batch-discounted).
//   - Wall-clock SLA: up to 24h instead of ~30 min.
//
// Flow:
//   submit  -> upload JSONL file to /v1/files
//           -> POST /v1/batches with file_id + endpoint=/v1/responses
//           -> return batch_id
//   poll    -> GET /v1/batches/{batch_id}
//           -> when status=completed, GET /v1/files/{output_file_id}/content
//           -> parse the single output line into a Responses envelope

import { getStatePrompt, type StateCallId } from "./prompts";
import { makeApiError } from "../case-research/api-errors";

const DEFAULT_DR_MODEL = "o3-deep-research";
const PER_CALL_MAX_OUTPUT_TOKENS = 100_000;
const PER_CALL_MAX_TOOL_CALLS = 30;

interface ResponsesEnvelope {
  id?: string;
  status?: string;
  output_text?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  output?: any[];
  usage?: { input_tokens?: number; output_tokens?: number };
  error?: { message: string } | null;
  incomplete_details?: { reason?: string };
}

interface BatchEnvelope {
  id: string;
  status:
    | "validating"
    | "failed"
    | "in_progress"
    | "finalizing"
    | "completed"
    | "expired"
    | "cancelling"
    | "cancelled";
  output_file_id?: string | null;
  error_file_id?: string | null;
  errors?: { data?: Array<{ message?: string }> } | null;
  request_counts?: { total: number; completed: number; failed: number };
}

interface BatchOutputLine {
  id: string;
  custom_id: string;
  response: {
    status_code: number;
    request_id?: string;
    body: ResponsesEnvelope;
  } | null;
  error: { code?: string; message?: string } | null;
}

export interface BatchSubmitResult {
  batchId: string;
  model: string;
}

export interface BatchPollResult {
  status: BatchEnvelope["status"];
  // Present when status === 'completed'
  envelope?: ResponsesEnvelope;
  // Present when terminal (failed / expired / cancelled / error in line)
  error?: string;
}

class OpenAINotConfigured extends Error {
  constructor() {
    super("OPENAI_API_KEY not set");
    this.name = "OpenAINotConfigured";
  }
}

function getKey(): string {
  const key = process.env.OPENAI_API_KEY;
  if (!key) throw new OpenAINotConfigured();
  return key;
}

// ---------------------------------------------------------------------------
// Submit
// ---------------------------------------------------------------------------

export async function submitStateResearchBatchCall(
  call: StateCallId,
  stateName: string,
  slug: string,
): Promise<BatchSubmitResult> {
  const key = getKey();
  const model = process.env.OPENAI_DEEP_RESEARCH_MODEL || DEFAULT_DR_MODEL;
  const customId = `state-${slug}-call-${call}`;

  const line = {
    custom_id: customId,
    method: "POST",
    url: "/v1/responses",
    body: {
      model,
      input: getStatePrompt(call, stateName),
      tools: [{ type: "web_search_preview" }],
      max_output_tokens: PER_CALL_MAX_OUTPUT_TOKENS,
      max_tool_calls: PER_CALL_MAX_TOOL_CALLS,
    },
  };
  const jsonl = JSON.stringify(line) + "\n";

  // 1. Upload the JSONL as a file with purpose=batch.
  const form = new FormData();
  form.append("purpose", "batch");
  form.append(
    "file",
    new Blob([jsonl], { type: "application/jsonl" }),
    `${customId}.jsonl`,
  );

  const fileRes = await fetch("https://api.openai.com/v1/files", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}` },
    body: form,
  });
  if (!fileRes.ok) {
    const txt = await fileRes.text().catch(() => "");
    throw makeApiError(`State research batch file upload (${customId})`, fileRes.status, txt);
  }
  const fileData = (await fileRes.json()) as { id?: string };
  if (!fileData.id) {
    throw new Error(`State research batch file upload (${customId}): no file id returned`);
  }

  // 2. Create the batch pointing at the file.
  const batchRes = await fetch("https://api.openai.com/v1/batches", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      input_file_id: fileData.id,
      endpoint: "/v1/responses",
      completion_window: "24h",
      metadata: {
        kind: "state-research",
        slug,
        call: String(call),
      },
    }),
  });
  if (!batchRes.ok) {
    const txt = await batchRes.text().catch(() => "");
    throw makeApiError(`State research batch create (${customId})`, batchRes.status, txt);
  }
  const batch = (await batchRes.json()) as { id?: string };
  if (!batch.id) {
    throw new Error(`State research batch create (${customId}): no batch id returned`);
  }
  return { batchId: batch.id, model };
}

// ---------------------------------------------------------------------------
// Poll
// ---------------------------------------------------------------------------

export async function pollBatchCall(batchId: string): Promise<BatchPollResult> {
  const key = getKey();

  const res = await fetch(`https://api.openai.com/v1/batches/${batchId}`, {
    headers: { Authorization: `Bearer ${key}` },
  });
  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw makeApiError("State research batch poll", res.status, txt);
  }
  const batch = (await res.json()) as BatchEnvelope;

  if (
    batch.status === "validating" ||
    batch.status === "in_progress" ||
    batch.status === "finalizing"
  ) {
    return { status: batch.status };
  }

  if (batch.status === "failed" || batch.status === "expired" || batch.status === "cancelled") {
    const firstErr = batch.errors?.data?.[0]?.message;
    return {
      status: batch.status,
      error: firstErr ?? `Batch ${batch.status}`,
    };
  }

  if (batch.status === "completed") {
    // OpenAI marks a batch 'completed' even when every request inside it
    // failed — successful results land in output_file_id, failed ones in
    // error_file_id. Prefer output; fall back to surfacing the first error
    // from error_file_id so the admin sees the real failure cause.
    if (!batch.output_file_id) {
      const counts = batch.request_counts;
      const countSummary = counts
        ? `${counts.completed}/${counts.total} completed, ${counts.failed} failed`
        : "no output";
      if (batch.error_file_id) {
        const firstError = await fetchFirstBatchError(batch.error_file_id, key);
        return {
          status: "completed",
          error: firstError
            ? `Batch ${countSummary} — ${firstError}`
            : `Batch ${countSummary} (error file present but unreadable)`,
        };
      }
      return {
        status: "completed",
        error: `Batch ${countSummary} but no output_file_id and no error_file_id present`,
      };
    }
    const fileRes = await fetch(
      `https://api.openai.com/v1/files/${batch.output_file_id}/content`,
      {
        headers: { Authorization: `Bearer ${key}` },
      },
    );
    if (!fileRes.ok) {
      const txt = await fileRes.text().catch(() => "");
      throw makeApiError("State research batch output fetch", fileRes.status, txt);
    }
    const text = await fileRes.text();
    const line = text.trim().split("\n")[0];
    if (!line) {
      return { status: "completed", error: "Empty batch output file" };
    }
    let parsed: BatchOutputLine;
    try {
      parsed = JSON.parse(line) as BatchOutputLine;
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      return { status: "completed", error: `Failed to parse batch output line: ${msg}` };
    }

    if (parsed.error) {
      return {
        status: "completed",
        error: parsed.error.message ?? parsed.error.code ?? "Batch line error",
      };
    }
    if (!parsed.response || parsed.response.status_code >= 400) {
      const code = parsed.response?.status_code ?? "?";
      const bodyErr = parsed.response?.body?.error?.message ?? "no error message";
      return { status: "completed", error: `Batch line HTTP ${code}: ${bodyErr}` };
    }
    return { status: "completed", envelope: parsed.response.body };
  }

  return { status: batch.status, error: `Unexpected batch status: ${batch.status}` };
}

// Fetch the first error from a batch's error_file_id. Each line is shaped
// like the output JSONL: { id, custom_id, response, error }.
async function fetchFirstBatchError(
  errorFileId: string,
  key: string,
): Promise<string | null> {
  try {
    const res = await fetch(`https://api.openai.com/v1/files/${errorFileId}/content`, {
      headers: { Authorization: `Bearer ${key}` },
    });
    if (!res.ok) return null;
    const text = await res.text();
    const line = text.trim().split("\n")[0];
    if (!line) return null;
    const parsed = JSON.parse(line) as BatchOutputLine;
    if (parsed.error) {
      return parsed.error.message ?? parsed.error.code ?? "Unknown line error";
    }
    if (parsed.response) {
      const code = parsed.response.status_code;
      const bodyErr =
        parsed.response.body?.error?.message ??
        parsed.response.body?.incomplete_details?.reason ??
        "no body error message";
      return `HTTP ${code}: ${bodyErr}`;
    }
    return null;
  } catch {
    return null;
  }
}
