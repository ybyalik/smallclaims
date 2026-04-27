import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { STATES, getStateBySlug } from "../../../lib/states";
import { availableReportSlugs, loadReport } from "../../../lib/reports";

export function generateStaticParams() {
  const ready = new Set(availableReportSlugs());
  return STATES.filter((s) => {
    const variants = [s.slug, s.slug.replace(/-/g, "")];
    return variants.some((v) => ready.has(v));
  }).map((s) => ({ state: s.slug }));
}

export const dynamicParams = false;

type Params = { params: { state: string } };

export function generateMetadata({ params }: Params): Metadata {
  const state = getStateBySlug(params.state);
  if (!state) return {};
  return {
    title: `Small Claims in ${state.name} — Filing Guide`,
    description: `How to file a small claims case in ${state.name}: limits, fees, deadlines, forms, service rules, and post-judgment collection. Plain-English guide for individuals and small businesses.`,
    alternates: { canonical: `/guides/${state.slug}` },
    openGraph: {
      title: `Small Claims in ${state.name} — Filing Guide`,
      description: `How to file a small claims case in ${state.name}.`,
      url: `/guides/${state.slug}`,
      type: "article",
    },
  };
}

export default function StateGuide({ params }: Params) {
  const state = getStateBySlug(params.state);
  if (!state) notFound();
  const report = loadReport(state.slug);
  if (!report) notFound();

  return (
    <main className="wrap" style={{ paddingTop: 40, paddingBottom: 80, maxWidth: 820 }}>
      <nav style={{ marginBottom: 24, display: "flex", gap: 16, fontSize: 13 }}>
        <Link href="/" style={{ color: "var(--muted)" }}>CivilCase</Link>
        <span style={{ color: "var(--hairline)" }}>/</span>
        <Link href="/guides" style={{ color: "var(--muted)" }}>Guides</Link>
        <span style={{ color: "var(--hairline)" }}>/</span>
        <span style={{ color: "var(--ink)" }}>{state.name}</span>
      </nav>

      {report.meta.completedAt && (
        <div
          style={{
            fontSize: 12,
            color: "var(--muted)",
            marginBottom: 16,
            padding: "10px 14px",
            background: "var(--bg-2)",
            borderRadius: 8,
            display: "inline-block",
          }}
        >
          Researched {new Date(report.meta.completedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })} · Verify against the cited statute before relying on any specific number.
        </div>
      )}

      <article className="report-body">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{report.markdown}</ReactMarkdown>
      </article>

      <hr style={{ margin: "60px 0 24px", border: 0, borderTop: "1px dashed var(--hairline)" }} />
      <p style={{ fontSize: 12.5, color: "var(--muted)", lineHeight: 1.6 }}>
        <strong style={{ color: "var(--ink-2)" }}>Disclaimer:</strong> This guide is informational only and not legal advice. CivilCase is not a law firm. Court rules, fees, and statutes change — verify against the cited authority before filing.
      </p>
    </main>
  );
}
