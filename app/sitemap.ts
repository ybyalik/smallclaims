import type { MetadataRoute } from "next";
import { STATES } from "../lib/states";
import { availableStateSlugs } from "../lib/state-data";
import { createClient } from "../lib/supabase/server";
import { ISSUES } from "../lib/landlord-issues";
import { EMPLOYER_ISSUES } from "../lib/employer-issues";
import { CONTRACTOR_ISSUES } from "../lib/contractor-issues";
import { AUTO_ISSUES } from "../lib/auto-issues";
import { NEIGHBOR_ISSUES } from "../lib/neighbor-issues";
import { PERSONAL_LOAN_ISSUES } from "../lib/personal-loan-issues";
import { ROOMMATE_ISSUES } from "../lib/roommate-issues";
import { ONLINE_SELLER_ISSUES } from "../lib/online-seller-issues";
import { REFUND_ISSUES } from "../lib/refund-issues";

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
  const ready = new Set(await availableStateSlugs());

  const stateUrls: MetadataRoute.Sitemap = STATES.filter((s) => ready.has(s.slug)).map((s) => ({
    url: `${BASE}/small-claims/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Issue pages use the canonical slug shape /small-claims/sue-<cat>-<slug>.
  // The directory under /small-claims/<category>/<slug>/ exists only so the
  // file lives in a clean path; next.config rewrites the slug URL to it.
  const mkIssueUrls = (slugPrefix: string, list: readonly { slug: string; ready: boolean }[]): MetadataRoute.Sitemap =>
    list.filter((i) => i.ready).map((i) => ({
      url: `${BASE}/small-claims/sue-${slugPrefix}-${i.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    }));

  const landlordUrls = mkIssueUrls("landlord", ISSUES);
  const employerUrls = mkIssueUrls("employer", EMPLOYER_ISSUES);
  const contractorUrls = mkIssueUrls("contractor", CONTRACTOR_ISSUES);
  const autoUrls = mkIssueUrls("auto", AUTO_ISSUES);
  const neighborUrls = mkIssueUrls("neighbor", NEIGHBOR_ISSUES);
  const personalLoanUrls = mkIssueUrls("loan", PERSONAL_LOAN_ISSUES);
  const roommateUrls = mkIssueUrls("roommate", ROOMMATE_ISSUES);
  const onlineSellerUrls = mkIssueUrls("seller", ONLINE_SELLER_ISSUES);
  const refundUrls = mkIssueUrls("refund", REFUND_ISSUES);

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
    { url: `${BASE}/small-claims/contractor`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    ...contractorUrls,
    { url: `${BASE}/small-claims/auto`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    ...autoUrls,
    { url: `${BASE}/small-claims/neighbor`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    ...neighborUrls,
    { url: `${BASE}/small-claims/personal-loan`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    ...personalLoanUrls,
    { url: `${BASE}/small-claims/roommate`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    ...roommateUrls,
    { url: `${BASE}/small-claims/online-seller`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    ...onlineSellerUrls,
    { url: `${BASE}/small-claims/refund`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    ...refundUrls,
    { url: `${BASE}/demand-letter`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/filing-kit`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/collection-plan`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE}/landlord`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/about`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: `${BASE}/disclaimer`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
    { url: `${BASE}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
    ...stateUrls,
    ...blogUrls,
  ];
}
