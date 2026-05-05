// Raw OpenAI Responses API wrapper. Designed for two patterns we need:
//   1. structuredJson<T>() — schema-constrained JSON output
//   2. plainText()         — markdown / prose generation
//
// We don't pull in the openai SDK; raw fetch keeps the dependency surface
// small and matches the rest of this repo (see scripts/harvest-completed.mjs).

import { makeApiError } from "./api-errors";

const OPENAI_URL = "https://api.openai.com/v1/responses";

// Default models. These are tuned per use case in case-research.ts.
export const MODEL = {
  REASONING: "gpt-5",
  FAST: "gpt-5-mini",
} as const;

// Rough $/1M tokens. Used to estimate cost_cents per call. Not authoritative;
// real billing is whatever Stripe (i.e. OpenAI) sends us.
const COST_PER_1M_TOKENS_CENTS: Record<string, { in: number; out: number }> = {
  "gpt-5": { in: 125, out: 1000 },
  "gpt-5-mini": { in: 25, out: 200 },
  "gpt-4o": { in: 250, out: 1000 },
  "gpt-4o-mini": { in: 15, out: 60 },
};

export class OpenAINotConfigured extends Error {
  constructor() {
    super("OPENAI_API_KEY not set");
  }
}

interface ResponsesUsage {
  input_tokens?: number;
  output_tokens?: number;
}

interface ResponsesEnvelope {
  output_text?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  output?: any[];
  usage?: ResponsesUsage;
  error?: { message: string } | null;
}

interface CallOptions {
  model: string;
  input: string;
  systemPrompt?: string;
  temperature?: number;
  maxOutputTokens?: number;
}

interface CallResult<T> {
  data: T;
  costCents: number;
  model: string;
  usage: ResponsesUsage;
}

async function callResponses(
  opts: CallOptions & { jsonSchema?: unknown },
): Promise<{ raw: ResponsesEnvelope; costCents: number }> {
  const key = process.env.OPENAI_API_KEY;
  if (!key) throw new OpenAINotConfigured();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const body: any = {
    model: opts.model,
    input: opts.systemPrompt
      ? [
          { role: "system", content: opts.systemPrompt },
          { role: "user", content: opts.input },
        ]
      : opts.input,
  };
  // GPT-5 reasoning family does not accept temperature; only set it for legacy
  // models that do. We keep the option on the public API for flexibility.
  const supportsTemperature = !opts.model.startsWith("gpt-5") && !opts.model.startsWith("o");
  if (opts.temperature !== undefined && supportsTemperature) {
    body.temperature = opts.temperature;
  }
  if (opts.maxOutputTokens !== undefined) body.max_output_tokens = opts.maxOutputTokens;
  if (opts.jsonSchema) {
    body.text = {
      format: {
        type: "json_schema",
        name: "structured",
        schema: opts.jsonSchema,
        strict: true,
      },
    };
  }

  const res = await fetch(OPENAI_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw makeApiError("OpenAI", res.status, txt);
  }
  const data = (await res.json()) as ResponsesEnvelope;
  if (data.error) {
    throw new Error(`OpenAI: ${data.error.message}`);
  }
  return { raw: data, costCents: estimateCost(opts.model, data.usage) };
}

export async function structuredJson<T>(
  opts: CallOptions & { jsonSchema: unknown },
): Promise<CallResult<T>> {
  const { raw, costCents } = await callResponses(opts);
  const text = extractText(raw);
  let parsed: T;
  try {
    parsed = JSON.parse(text) as T;
  } catch {
    throw new Error(
      `OpenAI structured output not valid JSON: ${text.slice(0, 300)}`,
    );
  }
  return { data: parsed, costCents, model: opts.model, usage: raw.usage ?? {} };
}

export async function plainText(opts: CallOptions): Promise<CallResult<string>> {
  const { raw, costCents } = await callResponses(opts);
  return {
    data: extractText(raw),
    costCents,
    model: opts.model,
    usage: raw.usage ?? {},
  };
}

function extractText(env: ResponsesEnvelope): string {
  if (typeof env.output_text === "string" && env.output_text.length > 0) {
    return env.output_text;
  }
  // Fallback: walk env.output[].content[].text
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

function estimateCost(model: string, usage: ResponsesUsage | undefined): number {
  if (!usage) return 0;
  const rate =
    COST_PER_1M_TOKENS_CENTS[model] ??
    // unknown model fallback: use gpt-5 rates
    COST_PER_1M_TOKENS_CENTS["gpt-5"];
  const inCost = ((usage.input_tokens ?? 0) * rate.in) / 1_000_000;
  const outCost = ((usage.output_tokens ?? 0) * rate.out) / 1_000_000;
  return Math.ceil(inCost + outCost);
}
