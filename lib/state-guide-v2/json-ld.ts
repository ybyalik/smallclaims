// JSON-LD builders for the v2 state guide. Emits two @types stitched
// into one @graph so Google reads them as a single document:
//
//   - Article: the guide itself (headline, datePublished, author, publisher)
//   - FAQPage: every "### question\n\nanswer" pair from Section 19
//
// BreadcrumbList is emitted by the shared <Breadcrumbs> component on every
// page in the site — keeping that source-of-truth so we don't double-emit.
// Verified shapes against schema.org / Google's structured-data guidelines.

const SITE_URL = "https://civilcase.com";

export interface FaqEntry {
  question: string;
  answer: string;
}

/**
 * Extracts the FAQ Q&A pairs from the guide's Section 19. The brief
 * formats each as `### question?\n\nanswer paragraph(s)`. We slice the
 * Section 19 region and walk H3 headings.
 */
export function extractFaqEntries(bodyMd: string): FaqEntry[] {
  // Locate "## 19. Frequently asked questions" and the next H2 (Section 20)
  const startMatch = bodyMd.match(/^## 19\.[^\n]*frequently asked questions[^\n]*$/im);
  if (!startMatch) return [];
  const startIdx = startMatch.index! + startMatch[0].length;
  const tail = bodyMd.slice(startIdx);
  const endRel = tail.search(/^## (?:20\.|2\d\.|\w)/m);
  const faqBlock = endRel > 0 ? tail.slice(0, endRel) : tail;

  // Walk H3 headings within the FAQ block
  const entries: FaqEntry[] = [];
  const h3Re = /^###\s+(.+?)\s*$/gm;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const matches: Array<{ idx: number; q: string }> = [];
  let m;
  while ((m = h3Re.exec(faqBlock)) !== null) {
    matches.push({ idx: m.index, q: m[1].trim() });
  }
  for (let i = 0; i < matches.length; i++) {
    const q = matches[i].q;
    const aStart = matches[i].idx + matches[i].q.length + 4; // after "### Q\n"
    const aEnd = i + 1 < matches.length ? matches[i + 1].idx : faqBlock.length;
    const answer = faqBlock.slice(aStart, aEnd).trim();
    // Drop trailing extra whitespace and any leftover heading separators
    const cleanA = answer.replace(/\s+\n\s*$/g, "").trim();
    if (q && cleanA) entries.push({ question: q, answer: cleanA });
  }
  return entries;
}

/**
 * Strips markdown to a plain-text answer for the JSON-LD `text` field.
 * Removes bullets, bold/italic markers, link wrappers; keeps prose.
 */
function stripMarkdownForJsonLd(md: string): string {
  return md
    .replace(/^\s*[-*]\s+/gm, "")
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/\*(.+?)\*/g, "$1")
    .replace(/`(.+?)`/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\n{2,}/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export interface BuildJsonLdArgs {
  stateName: string;
  stateSlug: string;
  bodyMd: string;
  generatedAt: string;
  /** Optional override for the canonical URL (defaults to civilcase.com path) */
  canonicalUrl?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function buildStateGuideJsonLd(args: BuildJsonLdArgs): Record<string, any> {
  const { stateName, stateSlug, bodyMd, generatedAt } = args;
  const pageUrl = args.canonicalUrl ?? `${SITE_URL}/small-claims/${stateSlug}`;
  const headline = `Small Claims Court in ${stateName}: How to File, Limits, Fees, and Collection`;

  // Description: pull the standfirst (italic line right after H1) if present;
  // fall back to a generic-but-state-named description.
  const standfirstMatch = bodyMd.match(/^[*_]([^*\n]+?)[*_]\s*$/m);
  const standfirst = standfirstMatch
    ? standfirstMatch[1].trim()
    : `A practical filing-to-collection guide to small claims court in ${stateName}.`;

  const faqs = extractFaqEntries(bodyMd);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const graph: any[] = [
    {
      "@type": "Article",
      "@id": `${pageUrl}#article`,
      headline,
      description: standfirst,
      datePublished: generatedAt,
      dateModified: generatedAt,
      mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
      author: { "@type": "Organization", name: "CivilCase", url: SITE_URL },
      publisher: { "@id": `${SITE_URL}/#organization` },
      // The state name is the most useful "about" entity for these pages.
      // Helps Google associate the guide with the right geographic area.
      about: { "@type": "AdministrativeArea", name: stateName },
      inLanguage: "en-US",
    },
  ];

  if (faqs.length > 0) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${pageUrl}#faq`,
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: stripMarkdownForJsonLd(f.answer),
        },
      })),
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}
