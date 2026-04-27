import { readFileSync, existsSync, readdirSync } from "node:fs";
import { resolve } from "node:path";

const REPORTS_DIR = resolve(process.cwd(), "reports");

export type ReportMeta = {
  id?: string;
  state?: string;
  agent?: string;
  usage?: { input_tokens?: number; output_tokens?: number; total_tokens?: number };
  completedAt?: string;
};

export function reportPath(slug: string) {
  // Reports are saved using the lowercase state name (no hyphens) by the runner.
  // Map slugs back: "new-york" -> "newyork"; we store with hyphenated slug too for safety.
  const key = slug.toLowerCase();
  const candidates = [
    resolve(REPORTS_DIR, `${key}.md`),
    resolve(REPORTS_DIR, `${key.replace(/-/g, "")}.md`),
  ];
  return candidates.find((p) => existsSync(p));
}

export function loadReport(slug: string): { markdown: string; meta: ReportMeta } | null {
  const path = reportPath(slug);
  if (!path) return null;
  const markdown = readFileSync(path, "utf8");
  const metaPath = path.replace(/\.md$/, ".json");
  let meta: ReportMeta = {};
  if (existsSync(metaPath)) {
    try {
      meta = JSON.parse(readFileSync(metaPath, "utf8"));
    } catch {}
  }
  return { markdown, meta };
}

export function availableReportSlugs(): string[] {
  if (!existsSync(REPORTS_DIR)) return [];
  return readdirSync(REPORTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}
