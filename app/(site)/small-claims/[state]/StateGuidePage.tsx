// Renders the generated v2 state guide. Single markdown blob from
// state_guide_v2.body_md, rendered via react-markdown with GFM tables.
//
// The brief expects: H1 + standfirst + byline + key-facts table + TOC,
// then 21 numbered sections, each with H3 subsections and inline tables.
// We render the whole thing in markdown form and use CSS to give the
// tables, headings, and TOC the right typographic hierarchy. Custom React
// components are minimal so the writing stays the source of truth.

import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import type { StateGuideV2 } from "../../../../lib/state-guide-v2/load";
import { buildStateGuideJsonLd } from "../../../../lib/state-guide-v2/json-ld";

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

        <article className="sgv2-article">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{ a: MarkdownLink }}
          >
            {guide.bodyMd}
          </ReactMarkdown>
        </article>

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
          <p className="sgv2-cta">
            <Link href="/case-score" className="btn btn-dark">
              Start a case
            </Link>
          </p>
        </footer>
      </div>
    </main>
  );
}
