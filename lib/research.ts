import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { resolve } from "node:path";

const REPORTS_DIR = resolve(process.cwd(), "reports");

export interface ResearchSummary {
  slug: string;
  state: string;
  sizeBytes: number;
  wordCount: number;
  updatedAt: string;
  source: "draft" | "openai";
}

const titleCase = (slug: string) =>
  slug
    .split("-")
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" ");

export function listResearch(): ResearchSummary[] {
  if (!existsSync(REPORTS_DIR)) return [];
  // Prefer -draft.md (new 3-pass pipeline). Fall back to -openai.md (legacy)
  // only for slugs that don't yet have a draft. Each slug appears once.
  const all = readdirSync(REPORTS_DIR);
  const draftSlugs = new Set(
    all.filter((f) => f.endsWith("-draft.md")).map((f) => f.replace(/-draft\.md$/, "")),
  );
  const legacyOnly = all
    .filter((f) => f.endsWith("-openai.md"))
    .map((f) => f.replace(/-openai\.md$/, ""))
    .filter((s) => !draftSlugs.has(s));

  const out: ResearchSummary[] = [];
  const push = (slug: string, file: string, source: "draft" | "openai") => {
    const path = resolve(REPORTS_DIR, file);
    const stat = statSync(path);
    const text = readFileSync(path, "utf8");
    const wordCount = text.split(/\s+/).filter(Boolean).length;
    out.push({
      slug,
      state: titleCase(slug),
      sizeBytes: stat.size,
      wordCount,
      updatedAt: stat.mtime.toISOString(),
      source,
    });
  };
  for (const slug of draftSlugs) push(slug, `${slug}-draft.md`, "draft");
  for (const slug of legacyOnly) push(slug, `${slug}-openai.md`, "openai");
  out.sort((a, b) => a.state.localeCompare(b.state));
  return out;
}

export function loadResearch(slug: string): { state: string; markdown: string } | null {
  const candidates = [
    resolve(REPORTS_DIR, `${slug}-draft.md`),
    resolve(REPORTS_DIR, `${slug}-openai.md`),
    resolve(REPORTS_DIR, `${slug}.md`),
  ];
  for (const p of candidates) {
    if (existsSync(p)) {
      return { state: titleCase(slug), markdown: readFileSync(p, "utf8") };
    }
  }
  return null;
}
