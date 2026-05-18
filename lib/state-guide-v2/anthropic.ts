// Raw Anthropic Messages API caller. Mirrors the pattern in
// lib/case-research/openai.ts so we don't pull in the @anthropic/sdk
// package just for one endpoint.

const ANTHROPIC_URL = "https://api.anthropic.com/v1/messages";
const ANTHROPIC_VERSION = "2023-06-01";

// Default models. The state-guide generator uses OPUS_4_7 because the
// brief enforces voice rules (banned words, heading-echo, no em-dashes)
// that Claude follows more reliably than the fast tier.
export const CLAUDE_MODEL = {
  OPUS_4_7: "claude-opus-4-7",
  SONNET_4_6: "claude-sonnet-4-6",
  HAIKU_4_5: "claude-haiku-4-5-20251001",
} as const;

// Rough $/1M tokens for cost estimation. Real billing comes from
// Anthropic's invoices, this is just for telemetry.
const COST_PER_1M_TOKENS_CENTS: Record<string, { in: number; out: number }> = {
  "claude-opus-4-7": { in: 1500, out: 7500 },
  "claude-sonnet-4-6": { in: 300, out: 1500 },
  "claude-haiku-4-5-20251001": { in: 100, out: 500 },
};

export class AnthropicNotConfigured extends Error {
  constructor() {
    super("ANTHROPIC_API_KEY not set");
  }
}

interface MessagesUsage {
  input_tokens?: number;
  output_tokens?: number;
  cache_creation_input_tokens?: number;
  cache_read_input_tokens?: number;
}

interface MessagesEnvelope {
  content?: Array<{ type: string; text?: string }>;
  usage?: MessagesUsage;
  stop_reason?: string;
  error?: { message: string; type?: string } | null;
}

export interface ClaudeCallOptions {
  model: string;
  systemPrompt: string;
  userPrompt: string;
  /** Cap on output tokens. Default 16000 (long-form prose). */
  maxOutputTokens?: number;
  /** Lower = more deterministic. Default 0.7 to leave some natural variance. */
  temperature?: number;
}

export interface ClaudeCallResult {
  text: string;
  inputTokens: number;
  outputTokens: number;
  costCents: number;
  stopReason: string;
}

export async function callClaude(opts: ClaudeCallOptions): Promise<ClaudeCallResult> {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) throw new AnthropicNotConfigured();

  const body = {
    model: opts.model,
    max_tokens: opts.maxOutputTokens ?? 16000,
    temperature: opts.temperature ?? 0.7,
    system: opts.systemPrompt,
    messages: [{ role: "user", content: opts.userPrompt }],
  };

  const res = await fetch(ANTHROPIC_URL, {
    method: "POST",
    headers: {
      "x-api-key": key,
      "anthropic-version": ANTHROPIC_VERSION,
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`Anthropic ${res.status}: ${txt.slice(0, 500)}`);
  }
  const data = (await res.json()) as MessagesEnvelope;
  if (data.error) {
    throw new Error(`Anthropic: ${data.error.message}`);
  }

  // content is an array of blocks; for a plain text response there's just
  // one text block. Concatenate any text blocks we find.
  const text = Array.isArray(data.content)
    ? data.content
        .filter((c) => c.type === "text" && typeof c.text === "string")
        .map((c) => c.text as string)
        .join("\n")
    : "";

  const inputTokens = data.usage?.input_tokens ?? 0;
  const outputTokens = data.usage?.output_tokens ?? 0;
  const rate =
    COST_PER_1M_TOKENS_CENTS[opts.model] ?? COST_PER_1M_TOKENS_CENTS["claude-opus-4-7"];
  const costCents = Math.ceil(
    (inputTokens * rate.in + outputTokens * rate.out) / 1_000_000,
  );

  return {
    text,
    inputTokens,
    outputTokens,
    costCents,
    stopReason: data.stop_reason ?? "unknown",
  };
}
