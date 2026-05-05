// Bright Data Web Unlocker wrapper. Used as a fallback when Firecrawl
// gets blocked, rate-limited, or returns empty content.
//
// API: POST https://api.brightdata.com/request
//      Body: { zone, url, format: "raw" }
//      Returns raw page bytes (HTML / text / PDF).

import type { FirecrawlPage } from "./firecrawl";
import { makeApiError } from "./api-errors";

const ENDPOINT = "https://api.brightdata.com/request";
const DEFAULT_ZONE = "civilcase";

export class BrightDataNotConfigured extends Error {
  constructor() {
    super("BRIGHTDATA_API_TOKEN not set");
  }
}

export function isBrightDataConfigured(): boolean {
  return !!process.env.BRIGHTDATA_API_TOKEN;
}

export async function brightDataFetch(url: string): Promise<FirecrawlPage> {
  const token = process.env.BRIGHTDATA_API_TOKEN;
  if (!token) throw new BrightDataNotConfigured();
  const zone = process.env.BRIGHTDATA_UNLOCKER_ZONE || DEFAULT_ZONE;

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ zone, url, format: "raw" }),
  });
  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw makeApiError("BrightData", res.status, `for ${url}: ${txt}`);
  }
  const contentType = res.headers.get("content-type") || "text/html";
  const raw = await res.text();
  const stripped = stripHtml(raw);
  const title = extractTitle(raw);
  return {
    url,
    finalUrl: url,
    title,
    markdown: stripped,
    textContent: stripped,
    mimeType: contentType,
    byteSize: raw.length,
  };
}

function stripHtml(html: string): string {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript\b[^>]*>[\s\S]*?<\/noscript>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function extractTitle(html: string): string | null {
  const m = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  if (!m) return null;
  return m[1].trim().replace(/\s+/g, " ").slice(0, 300) || null;
}
