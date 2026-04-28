// Server-side OpenRouter client.
// Used to call Claude (or any compatible model) for demand-letter generation.
//
// Why OpenRouter and not Anthropic direct: lets us swap models per-call (cheap
// vs. premium) without changing API surface, and lets the founder hold a single
// vendor relationship for now.

const OPENROUTER_BASE = "https://openrouter.ai/api/v1";

const DEFAULT_MODEL = "anthropic/claude-sonnet-4.5";

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface CompletionOptions {
  model?: string;
  temperature?: number;
  max_tokens?: number;
  messages: ChatMessage[];
}

export interface CompletionResult {
  text: string;
  model: string;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

class OpenRouterError extends Error {
  status?: number;
  body?: string;
  constructor(message: string, status?: number, body?: string) {
    super(message);
    this.status = status;
    this.body = body;
  }
}

export async function complete(opts: CompletionOptions): Promise<CompletionResult> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    throw new OpenRouterError("OPENROUTER_API_KEY not set");
  }

  const body = {
    model: opts.model || DEFAULT_MODEL,
    messages: opts.messages,
    temperature: opts.temperature ?? 0.4,
    max_tokens: opts.max_tokens ?? 4000,
  };

  const res = await fetch(`${OPENROUTER_BASE}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      // OpenRouter recommends these for analytics + abuse filtering
      "HTTP-Referer": "https://civilcase.com",
      "X-Title": "CivilCase",
    },
    body: JSON.stringify(body),
  });

  const text = await res.text();
  if (!res.ok) {
    throw new OpenRouterError(
      `OpenRouter ${res.status}: ${text.slice(0, 300)}`,
      res.status,
      text
    );
  }

  let parsed: {
    choices?: Array<{ message?: { content?: string } }>;
    model?: string;
    usage?: CompletionResult["usage"];
  };
  try {
    parsed = JSON.parse(text);
  } catch {
    throw new OpenRouterError(`OpenRouter returned non-JSON: ${text.slice(0, 200)}`);
  }

  const content = parsed.choices?.[0]?.message?.content;
  if (typeof content !== "string" || !content.trim()) {
    throw new OpenRouterError(`OpenRouter returned empty content: ${text.slice(0, 200)}`);
  }

  return {
    text: content,
    model: parsed.model || body.model,
    usage: parsed.usage,
  };
}

export { OpenRouterError };
