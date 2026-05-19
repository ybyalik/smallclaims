// Renders the generated v2 state guide. Single markdown blob from
// state_guide_v2.body_md, rendered via react-markdown with GFM tables.
//
// Layout: wide wrap with a 2-column grid — article on the left, sticky
// TOC + CTA sidebar on the right. The TOC is extracted from the H2
// headings in the markdown so it stays in sync without manual edits.

import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowRight } from "lucide-react";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import type { StateGuideV2 } from "../../../../lib/state-guide-v2/load";
import { buildStateGuideJsonLd } from "../../../../lib/state-guide-v2/json-ld";
import TocExpander from "./TocExpander";

interface Props {
  state: { slug: string; name: string };
  guide: StateGuideV2;
}

// Custom <a> for the markdown renderer:
// - External links open in a new tab and carry rel="nofollow noopener noreferrer".
// - Internal/anchor links keep default behavior.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function MarkdownLink({ href, children, ...rest }: any) {
  const isExternal =
    typeof href === "string" && /^https?:\/\//i.test(href) && !href.includes("civilcase.com");
  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="nofollow noopener noreferrer"
        {...rest}
      >
        {children}
      </a>
    );
  }
  return (
    <a href={href} {...rest}>
      {children}
    </a>
  );
}

// Stable slug for an H2 heading, used as the anchor target.
function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Pull plain text out of a react-markdown children list (which can be a mix
// of strings and inline element nodes).
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function nodeText(children: any): string {
  if (children == null) return "";
  if (typeof children === "string") return children;
  if (Array.isArray(children)) return children.map(nodeText).join("");
  if (typeof children === "object" && "props" in children) {
    return nodeText(children.props.children);
  }
  return "";
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function MarkdownH2({ children, ...rest }: any) {
  const id = slugify(nodeText(children));
  return (
    <h2 id={id} {...rest}>
      {children}
    </h2>
  );
}

// Curated short labels for the most-scanned sections.
const POPULAR_SECTIONS: Array<{ num: number; label: string }> = [
  { num: 3, label: "Statute of limitations" },
  { num: 4, label: "Demand letter" },
  { num: 6, label: "Forms to file" },
  { num: 8, label: "Filing fees" },
  { num: 11, label: "The hearing" },
  { num: 13, label: "What you can recover" },
  { num: 16, label: "Collecting your judgment" },
  { num: 19, label: "FAQ" },
];

interface TocItem {
  id: string;
  label: string;
}

// Build TOC split into "popular" (always-visible) and "extra" (hidden behind
// an expander). We match the curated list against the markdown's H2s by
// section number, then collect the rest with their full label minus the
// leading "N." prefix.
function buildToc(body: string): { popular: TocItem[]; extra: TocItem[] } {
  // num -> { fullHeading, labelWithoutNumber }
  const headings = new Map<number, { full: string; bare: string }>();
  for (const raw of body.split("\n")) {
    const m = raw.match(/^##\s+(\d+)\.\s+(.+?)\s*$/);
    if (!m) continue;
    const num = Number(m[1]);
    const bare = m[2].trim();
    const full = `${num}. ${bare}`;
    headings.set(num, { full, bare });
  }
  const popularNums = new Set(POPULAR_SECTIONS.map((s) => s.num));
  const popular: TocItem[] = [];
  for (const { num, label } of POPULAR_SECTIONS) {
    const h = headings.get(num);
    if (!h) continue;
    popular.push({ id: slugify(h.full), label });
  }
  const extra: TocItem[] = [];
  for (const [num, h] of [...headings.entries()].sort((a, b) => a[0] - b[0])) {
    if (popularNums.has(num)) continue;
    extra.push({ id: slugify(h.full), label: h.bare });
  }
  return { popular, extra };
}

export default function StateGuidePage({ state, guide }: Props) {
  // Article + FAQPage + BreadcrumbList schema, stitched into one @graph.
  // FAQPage is built by parsing Section 19's H3 questions from the
  // markdown body, so it stays in sync whenever a state is re-generated.
  const jsonLd = buildStateGuideJsonLd({
    stateName: state.name,
    stateSlug: state.slug,
    bodyMd: guide.bodyMd,
    generatedAt: guide.generatedAt,
  });

  const { popular: tocPopular, extra: tocExtra } = buildToc(guide.bodyMd);

  return (
    <main className="sgv2-page" data-state={state.slug}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="wrap sgv2-wrap">
        <Breadcrumbs
          items={[
            { href: "/small-claims", label: "Small Claims" },
            { label: state.name },
          ]}
        />

        <div className="sgv2-grid">
          <article className="sgv2-article">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{ a: MarkdownLink, h2: MarkdownH2 }}
            >
              {guide.bodyMd}
            </ReactMarkdown>

            <footer className="sgv2-footer">
              <p>
                Last reviewed{" "}
                {new Date(guide.generatedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
                . We are not a law firm and do not provide legal advice. This
                guide explains how small claims works in {state.name} based on
                publicly available statutes and court rules. It is not a
                substitute for the advice of an attorney.
              </p>
            </footer>
          </article>

          <aside className="sgv2-rail" aria-label="On this page">
            <div className="sgv2-rail-sticky">
              <div className="sgv2-toc-card">
                <span className="sgv2-toc-label">On this page</span>
                <ol className="sgv2-toc">
                  {tocPopular.map((it) => (
                    <li key={it.id}>
                      <a href={`#${it.id}`}>{it.label}</a>
                    </li>
                  ))}
                </ol>
                <TocExpander items={tocExtra} startCounter={tocPopular.length} />
              </div>

              <div className="sgv2-cta-card">
                <strong>Ready to send your demand letter?</strong>
                <p>Skip the back-and-forth. A formal demand often resolves the dispute before filing.</p>
                <Link href="/demand-letter" className="sgv2-cta-btn">
                  Start a demand letter
                  <ArrowRight size={16} strokeWidth={2.2} />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
