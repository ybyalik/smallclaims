// Thin Tavily search client for case-research queries.
// Docs: https://docs.tavily.com/docs/rest-api/api-reference

import { makeApiError } from "./api-errors";

export interface TavilySearchResult {
  url: string;
  title: string;
  content: string;
  score: number;
  domain: string;
  published_date?: string;
}

export interface TavilySearchResponse {
  query: string;
  results: TavilySearchResult[];
  costCents: number;
}

interface TavilyApiResult {
  url: string;
  title: string;
  content: string;
  score: number;
  published_date?: string;
}

export class TavilyNotConfigured extends Error {
  constructor() {
    super("TAVILY_API_KEY not set");
  }
}

export async function tavilySearch(
  query: string,
  opts: {
    includeDomains?: string[];
    maxResults?: number;
    searchDepth?: "basic" | "advanced";
  } = {},
): Promise<TavilySearchResponse> {
  const key = process.env.TAVILY_API_KEY;
  if (!key) throw new TavilyNotConfigured();

  const body = {
    api_key: key,
    query,
    search_depth: opts.searchDepth ?? "advanced",
    max_results: opts.maxResults ?? 8,
    include_answer: false,
    include_raw_content: false,
    include_domains: opts.includeDomains ?? [],
  };

  const res = await fetch("https://api.tavily.com/search", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw makeApiError("Tavily", res.status, txt);
  }
  const data = (await res.json()) as { results?: TavilyApiResult[] };

  const results: TavilySearchResult[] = (data.results ?? []).map((r) => ({
    url: r.url,
    title: r.title,
    content: r.content,
    score: r.score,
    published_date: r.published_date,
    domain: hostOf(r.url),
  }));

  // Tavily charges per request, ~$0.005 advanced. Approximate.
  const costCents = opts.searchDepth === "basic" ? 1 : 1;

  return { query, results, costCents };
}

function hostOf(rawUrl: string): string {
  try {
    return new URL(rawUrl).hostname.toLowerCase();
  } catch {
    return "unknown";
  }
}
