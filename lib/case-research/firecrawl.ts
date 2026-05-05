// Thin Firecrawl client. We use the /v1/scrape endpoint which returns
// markdown for HTML pages and extracted text for PDFs.
// Docs: https://docs.firecrawl.dev/api-reference/endpoint/scrape

import { makeApiError } from "./api-errors";

export interface FirecrawlPage {
  url: string;
  finalUrl: string;
  title: string | null;
  markdown: string;
  textContent: string;
  mimeType: string;
  byteSize: number;
}

export class FirecrawlNotConfigured extends Error {
  constructor() {
    super("FIRECRAWL_API_KEY not set");
  }
}

export async function firecrawlFetch(url: string): Promise<FirecrawlPage> {
  const key = process.env.FIRECRAWL_API_KEY;
  if (!key) throw new FirecrawlNotConfigured();

  const res = await fetch("https://api.firecrawl.dev/v1/scrape", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      url,
      formats: ["markdown"],
      onlyMainContent: true,
      timeout: 30000,
    }),
  });
  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw makeApiError("Firecrawl", res.status, `for ${url}: ${txt}`);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const body = (await res.json()) as { success?: boolean; data?: any; error?: string };
  if (!body.success || !body.data) {
    throw new Error(`Firecrawl: ${body.error ?? "no data"}`);
  }
  const data = body.data;
  const markdown = (data.markdown as string) || "";
  return {
    url,
    finalUrl: (data.metadata?.sourceURL as string) || url,
    title: (data.metadata?.title as string) || null,
    markdown,
    textContent: markdown,
    mimeType: (data.metadata?.contentType as string) || "text/html",
    byteSize: markdown.length,
  };
}
