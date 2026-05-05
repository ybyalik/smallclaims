// Shared schema for /small-claims/landlord/<issue> pages.
// Adding a new landlord issue: write a record matching this shape and
// register it in the issues index. The template renders all sections.

export type Tier = "low" | "mid" | "high";
export type PillTier = "good" | "primary" | "warn";

export interface H2Parts {
  pre: string;
  em: string;
  post?: string;
}

export interface CounterRow {
  label: string;
  value: string;
  emphasis?: "normal" | "accent" | "muted";
}

export interface IssueCounter {
  amount: number;            // animates 0 -> amount
  meta: string;              // "CA · Civ. Code § 1950.5"
  rows: CounterRow[];
  footer: string;
}

export interface WhatCountsCard {
  num: string;
  title: string;
  body: string;
}

export interface ClaimLayer {
  tag: string;
  title: string;
  body: string;
  amount: string;
  accent?: boolean;
}

export interface DemandLetterBlock {
  certifiedNum: string;
  date: string;
  recipientName: string;
  recipientAddress: string;
  reLine: string;
  bodyParagraphs: string[];
  demandList: string[];
  closingLine: string;
  signatory: string;
}

export interface FileStep {
  title: string;
  body: string;
}

export interface DefenseItem {
  quote: string;
  pill: string;
  rebuttal: string;
}

export interface OutcomeBand {
  label: string;
  range: string;
  body: string;
  tier: Tier;
}

export interface AlternativeCard {
  title: string;
  pillLabel: string;
  pillTier: PillTier;
  whenItFits: string;
  tradeoff: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface RelatedSlug {
  slug: string;
}

export type StateSection =
  | { kind: "us-map"; h2: H2Parts; lede: string; tableNote?: string }
  | {
      kind: "rows";
      h2: H2Parts;
      lede: string;
      rows: { state: string; slug: string; col2: string; col3: string }[];
      col2Header: string;
      col3Header: string;
    }
  | null;

export interface LandlordIssue {
  slug: string;
  ready: boolean;
  short: string;
  breadcrumbLabel: string;

  meta: { title: string; description: string };

  hero: {
    eyebrowSuffix: string;
    h1: H2Parts;
    leadStrong: string;
    leadBody: string;
  };

  counter: IssueCounter;

  whatCounts: {
    h2: H2Parts;
    lede: string;
    cards: WhatCountsCard[];
    note?: { strongIntro: string; rest: string };
  };

  claim: {
    h2: H2Parts;
    lede: string;
    layers: ClaimLayer[];
    total: { label: string; body: string; amount: string; sublabel: string };
  };

  demand: {
    h2: H2Parts;
    lede: string;
    checklist: string[];
    letter: DemandLetterBlock;
  };

  fileSteps: {
    h2: H2Parts;
    lede: string;
    steps: FileStep[];
    aftermath: { tag: string; title: string; bodyHtml: string };
  };

  evidence: {
    h2: H2Parts;
    lede: string;
    photos: { id: string; cap: string }[];
    texts: { dir: "in" | "out"; text: string }[];
    receipt: {
      vendor: string;
      vendorAddr: string;
      receiptNum: string;
      date: string;
      lineItems: { label: string; amount: string }[];
      subtotal: string;
      total: string;
      footer: string;
    };
  };

  defenses: {
    h2: H2Parts;
    lede: string;
    items: DefenseItem[];
  };

  outcomes: {
    h2: H2Parts;
    lede: string;
    bands: OutcomeBand[];
  };

  stateSection: StateSection;

  alternatives: {
    h2: H2Parts;
    lede: string;
    cards: AlternativeCard[];
  };

  cta: {
    h2: H2Parts;
    body: string;
    receipt: {
      label: string;
      items: { label: string; amount: string }[];
      total: string;
      totalLabel: string;
      note: string;
    };
  };

  faqs: FaqItem[];

  relatedSlugs: string[];
}
