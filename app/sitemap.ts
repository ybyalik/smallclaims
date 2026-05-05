import type { MetadataRoute } from "next";
import { STATES } from "../lib/states";
import { availableStateSlugs } from "../lib/state-data";
import { createClient } from "../lib/supabase/server";
import { ISSUES } from "../lib/landlord-issues";
import { EMPLOYER_ISSUES } from "../lib/employer-issues";

const BASE = "https://civilcase.com";

async function publishedBlogPosts(): Promise<{ slug: string; updated: Date }[]> {
  try {
    const supabase = createClient();
    const { data } = await supabase
      .from("blog_posts")
      .select("slug, updated_at")
      .eq("status", "published");
    if (!data) return [];
    return (data as { slug: string; updated_at: string | null }[]).map((p) => ({
      slug: p.slug,
      updated: p.updated_at ? new Date(p.updated_at) : new Date(),
    }));
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const ready = new Set(availableStateSlugs());

  const stateUrls: MetadataRoute.Sitemap = STATES.filter((s) => ready.has(s.slug)).map((s) => ({
    url: `${BASE}/small-claims/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const landlordUrls: MetadataRoute.Sitemap = ISSUES.filter((i) => i.ready).map((i) => ({
    url: `${BASE}/small-claims/sue-landlord-${i.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const employerUrls: MetadataRoute.Sitemap = EMPLOYER_ISSUES.filter((i) => i.ready).map((i) => ({
    url: `${BASE}/small-claims/sue-employer-${i.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const blogPosts = await publishedBlogPosts();
  const blogUrls: MetadataRoute.Sitemap = blogPosts.map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: p.updated,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [
    { url: `${BASE}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/case-score`, lastModified: now, changeFrequency: "monthly", priority: 0.95 },
    { url: `${BASE}/small-claims`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/small-claims/landlord`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    ...landlordUrls,
    { url: `${BASE}/small-claims/employer`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    ...employerUrls,
    { url: `${BASE}/demand-letter`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/about`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: `${BASE}/editorial-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
    { url: `${BASE}/disclaimer`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
    { url: `${BASE}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
    ...stateUrls,
    ...blogUrls,
  ];
}
