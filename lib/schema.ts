// Reusable schema.org JSON-LD builders for the firm-design pages.
// Render the output via:
//   <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

const SITE_URL = "https://civilcase.com";
const ORG = { "@type": "Organization", name: "CivilCase", url: SITE_URL } as const;

export interface BreadcrumbCrumb { name: string; url: string }

export function breadcrumbList(crumbs: BreadcrumbCrumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: c.url.startsWith("http") ? c.url : `${SITE_URL}${c.url}`,
    })),
  };
}

export function serviceSchema(args: {
  name: string;
  description: string;
  url: string;
  priceFrom?: number;
  audience?: string;
}) {
  const out: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: args.name,
    description: args.description,
    provider: ORG,
    areaServed: { "@type": "Country", name: "United States" },
    url: `${SITE_URL}${args.url}`,
  };
  if (args.audience) out.audience = { "@type": "Audience", audienceType: args.audience };
  if (typeof args.priceFrom === "number") {
    out.offers = {
      "@type": "Offer",
      price: String(args.priceFrom),
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    };
  }
  return out;
}

export function articleSchema(args: {
  headline: string;
  description?: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
  image?: string;
}) {
  const out: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: args.headline,
    author: ORG,
    publisher: ORG,
    mainEntityOfPage: `${SITE_URL}${args.url}`,
  };
  if (args.description) out.description = args.description;
  if (args.datePublished) out.datePublished = args.datePublished;
  if (args.dateModified) out.dateModified = args.dateModified;
  if (args.image) out.image = args.image;
  return out;
}

export interface HowToStepArg { name: string; text: string }
export function howToSchema(args: { name: string; description: string; steps: HowToStepArg[] }) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: args.name,
    description: args.description,
    step: args.steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
}

export function collectionPageSchema(args: {
  name: string;
  description: string;
  url: string;
  items: { name: string; url: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: args.name,
    description: args.description,
    url: `${SITE_URL}${args.url}`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: args.items.map((it, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: it.url.startsWith("http") ? it.url : `${SITE_URL}${it.url}`,
        name: it.name,
      })),
    },
  };
}

// Combine multiple schema objects into a single @graph payload so each page
// can emit one <script> tag containing all its schemas.
export function jsonLdGraph(...nodes: Record<string, unknown>[]) {
  // Strip @context from inner nodes since the outer @graph carries it.
  const cleanNodes = nodes.map(({ "@context": _omit, ...rest }) => rest);
  return {
    "@context": "https://schema.org",
    "@graph": cleanNodes,
  };
}
