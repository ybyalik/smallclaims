import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { createServiceRoleClient } from "./supabase/service-role";

const REPORTS_DIR = resolve(process.cwd(), "reports");

export interface ResearchSummary {
  slug: string;
  state: string;
  sizeBytes: number;
  wordCount: number;
  updatedAt: string;
  source: "draft" | "openai" | "override";
  edited: boolean;
}

const titleCase = (slug: string) =>
  slug
    .split("-")
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" ");

export function listResearch(): ResearchSummary[] {
  if (!existsSync(REPORTS_DIR)) return [];
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
      edited: false,
    });
  };
  for (const slug of draftSlugs) push(slug, `${slug}-draft.md`, "draft");
  for (const slug of legacyOnly) push(slug, `${slug}-openai.md`, "openai");
  out.sort((a, b) => a.state.localeCompare(b.state));
  return out;
}

/**
 * listResearch with admin overrides merged in. Use this in the admin UI
 * so the "Updated" column reflects the saved edit time (and we can mark
 * which states have been edited). Returns only async because of DB roundtrip.
 */
export async function listResearchWithOverrides(): Promise<ResearchSummary[]> {
  const base = listResearch();
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const admin = createServiceRoleClient() as any;
    const { data: overrides } = await admin
      .from("research_overrides")
      .select("slug, markdown, updated_at");
    if (overrides && overrides.length > 0) {
      const map = new Map<string, { markdown: string; updated_at: string }>();
      for (const o of overrides) map.set(o.slug, { markdown: o.markdown, updated_at: o.updated_at });
      return base.map((r) => {
        const ov = map.get(r.slug);
        if (!ov) return r;
        return {
          ...r,
          source: "override" as const,
          edited: true,
          sizeBytes: Buffer.byteLength(ov.markdown, "utf8"),
          wordCount: ov.markdown.split(/\s+/).filter(Boolean).length,
          updatedAt: ov.updated_at,
        };
      });
    }
  } catch {
    // Supabase unavailable in dev/build — fall back to filesystem
  }
  return base;
}

/**
 * Load research markdown. Checks Supabase override first (where admin
 * edits live), then falls back to the bundled filesystem version.
 */
export async function loadResearch(
  slug: string
): Promise<{ state: string; markdown: string; source: "override" | "file" } | null> {
  // 1. Check the override table
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const admin = createServiceRoleClient() as any;
    const { data } = await admin
      .from("research_overrides")
      .select("markdown")
      .eq("slug", slug)
      .maybeSingle();
    if (data?.markdown) {
      return { state: titleCase(slug), markdown: data.markdown, source: "override" };
    }
  } catch {
    // ignore
  }

  // 2. Fall back to bundled file
  const candidates = [
    resolve(REPORTS_DIR, `${slug}-draft.md`),
    resolve(REPORTS_DIR, `${slug}-openai.md`),
    resolve(REPORTS_DIR, `${slug}.md`),
  ];
  for (const p of candidates) {
    if (existsSync(p)) {
      return { state: titleCase(slug), markdown: readFileSync(p, "utf8"), source: "file" };
    }
  }
  return null;
}
