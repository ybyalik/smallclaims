// Runner for state-level deep research. Submits one or more of the four
// calls to OpenAI in background mode, polls for completion, and saves the
// markdown findings + metadata to the state_research table.
//
// Each call is independent: failures don't cascade, and re-running one call
// doesn't redo the others.

import { getStatePrompt, type StateCallId, CALL_TITLES } from "./prompts";
import { makeApiError } from "../case-research/api-errors";

const DEFAULT_DR_MODEL = "o3-deep-research";

// Same budget as per-case deep research — gives ~50k reasoning + ~50k output.
const PER_CALL_MAX_OUTPUT_TOKENS = 100_000;

// State-level research touches broader scope than per-case. 30 web searches
// per call lets the model dig into the long-tail items in the bounded sweeps
// without starving.
const PER_CALL_MAX_TOOL_CALLS = 30;

// OpenAI deep-research pricing (cents per 1M tokens).
const DEEP_RESEARCH_RATES: Record<string, { in: number; out: number }> = {
  "o3-deep-research": { in: 1000, out: 4000 },
  "o3-deep-research-2025-06-26": { in: 1000, out: 4000 },
  "o4-mini-deep-research": { in: 200, out: 800 },
  "o4-mini-deep-research-2025-06-26": { in: 200, out: 800 },
};
const WEB_SEARCH_CALL_COST_CENTS = 2.5;

interface CitationItem {
  type?: string;
  url?: string;
  title?: string;
}

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

export interface SubmitOutput {
  responseId: string;
  model: string;
}

export class OpenAINotConfigured extends Error {
  constructor() {
    super("OPENAI_API_KEY not set");
    this.name = "OpenAINotConfigured";
  }
}

// ---------------------------------------------------------------------------
// Submit
// ---------------------------------------------------------------------------

export async function submitStateResearchCall(
  call: StateCallId,
  stateName: string,
): Promise<SubmitOutput> {
  const key = process.env.OPENAI_API_KEY;
  if (!key) throw new OpenAINotConfigured();
  const model = process.env.OPENAI_DEEP_RESEARCH_MODEL || DEFAULT_DR_MODEL;
  const body = {
    model,
    input: getStatePrompt(call, stateName),
    background: true,
    tools: [{ type: "web_search_preview" }],
    max_output_tokens: PER_CALL_MAX_OUTPUT_TOKENS,
    max_tool_calls: PER_CALL_MAX_TOOL_CALLS,
  };
  const res = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw makeApiError(`State research submit (call ${call} ${stateName})`, res.status, txt);
  }
  const data = (await res.json()) as ResponsesEnvelope;
  if (!data.id) {
    throw new Error(`State research submit (call ${call} ${stateName}): no response id returned`);
  }
  return { responseId: data.id, model };
}

// ---------------------------------------------------------------------------
// Poll
// ---------------------------------------------------------------------------

export async function getStateResearchStatus(
  responseId: string,
): Promise<{ status: string; envelope: ResponsesEnvelope }> {
  const key = process.env.OPENAI_API_KEY;
  if (!key) throw new OpenAINotConfigured();
  const res = await fetch(`https://api.openai.com/v1/responses/${responseId}`, {
    headers: { Authorization: `Bearer ${key}` },
  });
  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw makeApiError("State research poll", res.status, txt);
  }
  const env = (await res.json()) as ResponsesEnvelope;
  return { status: env.status ?? "unknown", envelope: env };
}

export interface ParsedCallOutput {
  markdown: string;
  inputTokens: number;
  outputTokens: number;
  costCents: number;
  model: string;
}

export function parseStateResearchOutput(
  envelope: ResponsesEnvelope,
  model: string,
): ParsedCallOutput {
  const text = extractText(envelope);
  const usage = envelope.usage ?? {};
  const inTokens = usage.input_tokens ?? 0;
  const outTokens = usage.output_tokens ?? 0;
  const rates = DEEP_RESEARCH_RATES[model] ?? DEEP_RESEARCH_RATES["o3-deep-research"];
  const tokenCostCents = (inTokens * rates.in + outTokens * rates.out) / 1_000_000;
  const webSearchCalls = countWebSearchCalls(envelope);
  const toolCostCents = webSearchCalls * WEB_SEARCH_CALL_COST_CENTS;
  const costCents = Math.ceil(tokenCostCents + toolCostCents);
  return {
    markdown: text,
    inputTokens: inTokens,
    outputTokens: outTokens,
    costCents,
    model,
  };
}

function countWebSearchCalls(env: ResponsesEnvelope): number {
  if (!Array.isArray(env.output)) return 0;
  let n = 0;
  for (const item of env.output) {
    const t = item?.type as string | undefined;
    if (t === "web_search_call" || t === "web_search_preview_call") n += 1;
  }
  return n;
}

function extractText(env: ResponsesEnvelope): string {
  if (typeof env.output_text === "string" && env.output_text.length > 0) return env.output_text;
  if (Array.isArray(env.output)) {
    const parts: string[] = [];
    for (const item of env.output) {
      const content = item?.content;
      if (Array.isArray(content)) {
        for (const c of content) {
          if (typeof c?.text === "string") parts.push(c.text);
          else if (typeof c?.text?.value === "string") parts.push(c.text.value);
        }
      }
    }
    if (parts.length > 0) return parts.join("\n");
  }
  return "";
}

// ---------------------------------------------------------------------------
// DB helpers — column naming
// ---------------------------------------------------------------------------

export interface StateResearchCallColumns {
  markdown: string;
  response_id: string;
  batch_id: string;
  via: "background" | "batch";
  model: string;
  input_tokens: number;
  output_tokens: number;
  cost_cents: number;
  status: string;
  error: string | null;
  started_at: string | null;
  completed_at: string | null;
}

export function callColumnPrefix(call: StateCallId): string {
  return `call_${call}`;
}

export function callTitle(call: StateCallId): string {
  return CALL_TITLES[call];
}

// Maps a call's parsed output + status into a partial row update keyed by
// the per-call columns. e.g., call=2 → { call_2_markdown, call_2_response_id, ... }
export function callRowPatch(
  call: StateCallId,
  fields: Partial<StateResearchCallColumns>,
): Record<string, unknown> {
  const prefix = callColumnPrefix(call);
  const out: Record<string, unknown> = {};
  if (fields.markdown !== undefined) out[`${prefix}_markdown`] = fields.markdown;
  if (fields.response_id !== undefined) out[`${prefix}_response_id`] = fields.response_id;
  if (fields.batch_id !== undefined) out[`${prefix}_batch_id`] = fields.batch_id;
  if (fields.via !== undefined) out[`${prefix}_via`] = fields.via;
  if (fields.model !== undefined) out[`${prefix}_model`] = fields.model;
  if (fields.input_tokens !== undefined) out[`${prefix}_input_tokens`] = fields.input_tokens;
  if (fields.output_tokens !== undefined) out[`${prefix}_output_tokens`] = fields.output_tokens;
  if (fields.cost_cents !== undefined) out[`${prefix}_cost_cents`] = fields.cost_cents;
  if (fields.status !== undefined) out[`${prefix}_status`] = fields.status;
  if (fields.error !== undefined) out[`${prefix}_error`] = fields.error;
  if (fields.started_at !== undefined) out[`${prefix}_started_at`] = fields.started_at;
  if (fields.completed_at !== undefined) out[`${prefix}_completed_at`] = fields.completed_at;
  return out;
}
