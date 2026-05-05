// Shared HTTP error helper used by all third-party API clients in the
// case-research pipeline (OpenAI, Tavily, Firecrawl, Bright Data).
//
// Distinguishes:
//   - 5xx and 408 (Request Timeout): transient; let Inngest retry.
//   - 429 (Too Many Requests): transient; retry. We don't honor Retry-After
//     here — Inngest backoff is good enough for our cadence.
//   - 4xx (other): permanent; throw NonRetriableError so retry budget isn't
//     burned on bugs (bad auth key, malformed request, schema mismatch).

import { NonRetriableError } from "inngest";

export function makeApiError(provider: string, status: number, body: string): Error {
  const trimmed = body.replace(/\s+/g, " ").slice(0, 600);
  const msg = `${provider} ${status}: ${trimmed}`;
  // Retryable: any 5xx, plus 408 and 429.
  if (status >= 500 || status === 408 || status === 429) {
    return new Error(msg);
  }
  // Non-retryable: 4xx other than 408/429.
  return new NonRetriableError(msg);
}
