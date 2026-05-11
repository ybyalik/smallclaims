// Shared data shape for category hub pages (e.g., /small-claims/landlord).
// Each category page is rendered by <CategoryTemplate /> with one of these objects.

import type { ReactNode } from "react";

export interface CategoryHubIssue {
  slug: string; // appended to urlPrefix to form /small-claims/sue-{prefix}-{slug}
  title: string;
  blurb: string;
  icon: ReactNode;
  ready: boolean;
}

export interface CategoryHubBeltItem {
  // Bold lead-in followed by the rest of the sentence. Lets us style the strong
  // tag without hand-writing markup in each item.
  titleBold: string;
  rest: string;
}

export interface CategoryHubRecoveryRow {
  // Inline SVG for the row icon. Kept as JSX so each category can pick its own.
  iconSvg: ReactNode;
  tag: string;
  body: string;
  amount: string; // e.g. "$1,500" or "+$3,000"
  barWidthPct: number; // 0–100
  barLabel: string; // e.g. "Base amount", "Multiplier"
  accent?: boolean; // red bar + accent typography for the highlight row
}

export interface CategoryHubEvidenceItem {
  iconSvg: ReactNode;
  title: string;
  desc: string;
}

export interface CategoryHubFaq {
  q: string;
  a: string;
}

export interface CategoryHubData {
  // ── Routing / SEO ──────────────────────────────────────────────────────────
  categorySlug: string; // "landlord", "contractor", etc. Used for canonical path.
  breadcrumbLabel: string; // e.g. "Landlord Disputes"
  urlPrefix: string; // e.g. "sue-landlord-" → /small-claims/sue-landlord-{issueSlug}

  meta: {
    title: string; // <title>
    description: string;
    ogTitle?: string;
    ogDescription?: string;
  };

  schemaArticle: {
    headline: string;
    description: string;
  };

  // ── Hero ───────────────────────────────────────────────────────────────────
  hero: {
    h1: { pre: string; em: string; post?: string };
    lede: string;
  };

  // ── Issue grid ────────────────────────────────────────────────────────────
  issues: CategoryHubIssue[];
  issuePhotos: string[]; // unsplash photo IDs (cycled across the grid)
  issuesIntro: {
    h2: { pre: string; em: string; post?: string };
    paragraph: string;
  };
  somethingElseCard: {
    title: string;
    blurb: string;
  };

  // ── How small claims handles X (belongs / doesn't) ─────────────────────────
  belongs: {
    h2Em: string; // italic phrase, e.g. "landlord disputes"
    intro: string;
    inItems: CategoryHubBeltItem[]; // 4–5 items
    outItems: CategoryHubBeltItem[]; // 3–4 items
  };

  // ── Damages / Recovery ────────────────────────────────────────────────────
  damages: {
    intro: string;
    rows: CategoryHubRecoveryRow[]; // 3–4 rows
    totalNote?: string; // legacy: small caption that lived in the old dark total
    totalAmount: string; // e.g. "$4,950"
    totalCaption: string; // e.g. "Sample math on a $1,500 deposit..."
  };

  // ── Evidence checklist ────────────────────────────────────────────────────
  evidence: {
    h2Em: string; // italic phrase, e.g. "sue your landlord"
    intro: string;
    items: CategoryHubEvidenceItem[]; // 6–8 cards
  };

  // ── State-specific rules section ──────────────────────────────────────────
  stateRulesIntro: string;
  featuredStateSlugs: string[];

  // ── Closing CTA testimonial ───────────────────────────────────────────────
  testimonial: {
    quote: string;
    name: string;
    role: string; // e.g. "Tenant · California"
  };

  // ── FAQ ───────────────────────────────────────────────────────────────────
  audienceLabel: string; // "tenants", "homeowners", "lenders", etc. Used in lede.
  faqs: CategoryHubFaq[]; // 5

  // Subset of FAQs to also surface in JSON-LD FAQPage schema. If omitted, all.
  schemaFaqIndices?: number[];

  // ── Disclaimer ────────────────────────────────────────────────────────────
  disclaimerNote: string;
}
