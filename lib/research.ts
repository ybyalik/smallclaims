import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { resolve } from "node:path";

const REPORTS_DIR = resolve(process.cwd(), "reports");

export interface ResearchSummary {
  slug: string;
  state: string;
  sizeBytes: number;
  wordCount: number;
  updatedAt: string;
}

const titleCase = (slug: string) =>
  slug
    .split("-")
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" ");

export function listResearch(): ResearchSummary[] {
  if (!existsSync(REPORTS_DIR)) return [];
  const files = readdirSync(REPORTS_DIR).filter(
    (f) => f.endsWith("-openai.md") || (f.endsWith(".md") && !f.includes("-openai"))
  );
  const out: ResearchSummary[] = [];
  for (const f of files) {
    const slug = f.replace(/-openai\.md$/, "").replace(/\.md$/, "");
    const path = resolve(REPORTS_DIR, f);
    const stat = statSync(path);
    const text = readFileSync(path, "utf8");
    const wordCount = text.split(/\s+/).filter(Boolean).length;
    out.push({
      slug,
      state: titleCase(slug),
      sizeBytes: stat.size,
      wordCount,
      updatedAt: stat.mtime.toISOString(),
    });
  }
  out.sort((a, b) => a.state.localeCompare(b.state));
  return out;
}

export function loadResearch(slug: string): { state: string; markdown: string } | null {
  const candidates = [
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
