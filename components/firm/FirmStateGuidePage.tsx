import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  C, H2, eyebrow, body, PAD_X, RAD, HEAD_FONT, BODY_FONT, italicEmCSS,
  Arrow, FirmBtn,
} from "./index";
import type { StateGuideV2 } from "../../lib/state-guide-v2/load";
import { buildStateGuideJsonLd } from "../../lib/state-guide-v2/json-ld";
import { getNeighbors } from "../../lib/state-neighbors";
import { getStateBySlug } from "../../lib/states";
import TocExpander from "./FirmTocExpander";

interface Props {
  state: { slug: string; name: string };
  guide: StateGuideV2;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
function MarkdownLink({ href, children, ...rest }: any) {
  const isExternal =
    typeof href === "string" && /^https?:\/\//i.test(href) && !href.includes("civilcase.com");
  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="nofollow noopener noreferrer" {...rest}>
        {children}
      </a>
    );
  }
  return <a href={href} {...rest}>{children}</a>;
}

function slugify(s: string): string {
  return s.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").replace(/^-+|-+$/g, "");
}

function nodeText(children: any): string {
  if (children == null) return "";
  if (typeof children === "string") return children;
  if (Array.isArray(children)) return children.map(nodeText).join("");
  if (typeof children === "object" && "props" in children) return nodeText(children.props.children);
  return "";
}

function MarkdownH2({ children, ...rest }: any) {
  const id = slugify(nodeText(children));
  return <h2 id={id} {...rest}>{children}</h2>;
}
/* eslint-enable @typescript-eslint/no-explicit-any */

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

interface TocItem { id: string; label: string; }

function buildToc(body: string): { popular: TocItem[]; extra: TocItem[] } {
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

// Firm-styled prose for the markdown body. Newsreader headings, Geist body,
// peach accent links, tables with hairlines, blockquote with brick rule.
const FIRM_SG_CSS = `
.firm-sg-article { font: 17px/1.75 var(--font-geist), system-ui, sans-serif; color: #2a241e; max-width: none; }
.firm-sg-article > * + * { margin-top: 18px; }
.firm-sg-article h2 {
  font: 600 36px/1.25 var(--font-newsreader), Georgia, serif;
  color: #1f1a16;
  letter-spacing: -0.018em;
  margin: 60px 0 18px;
  scroll-margin-top: 90px;
  counter-increment: firm-sg-h2;
}
.firm-sg-article > h2:first-of-type { margin-top: 24px; }
.firm-sg-article h3 {
  font: 600 22px/1.3 var(--font-newsreader), Georgia, serif;
  color: #1f1a16;
  letter-spacing: -0.005em;
  margin: 36px 0 12px;
}
.firm-sg-article h4 {
  font: 600 17px/1.4 var(--font-geist), system-ui, sans-serif;
  color: #1a1612;
  margin: 28px 0 8px;
}
.firm-sg-article p { margin: 0; }
.firm-sg-article p + p { margin-top: 16px; }
.firm-sg-article a { color: #b8331f; text-decoration: underline; text-underline-offset: 3px; }
.firm-sg-article strong { color: #1a1612; font-weight: 600; }
.firm-sg-article ul, .firm-sg-article ol { margin: 14px 0 0 26px; padding: 0; display: grid; gap: 10px; }
.firm-sg-article li { margin: 0; }
.firm-sg-article blockquote {
  border-left: 3px solid #b8331f;
  padding: 4px 0 4px 24px;
  margin: 28px 0;
  color: #5b544c;
  font: italic 18px/1.5 var(--font-newsreader), Georgia, serif;
}
.firm-sg-article hr { border: none; border-top: 1px solid #e7dfd0; margin: 40px 0; }
.firm-sg-article code {
  background: #f5f1e8;
  padding: 2px 6px;
  border-radius: 4px;
  font: 14px ui-monospace, SFMono-Regular, Menlo, monospace;
  color: #1a1612;
}
.firm-sg-article table {
  width: 100%;
  border-collapse: collapse;
  margin: 22px 0;
  font: 14.5px/1.5 var(--font-geist), system-ui, sans-serif;
}
.firm-sg-article thead th {
  text-align: left;
  background: #f5f1e8;
  color: #1a1612;
  font: 600 12px/1 var(--font-geist), system-ui, sans-serif;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 14px 16px;
  border-bottom: 1px solid #d8d0c1;
}
.firm-sg-article tbody td {
  padding: 14px 16px;
  border-bottom: 1px solid #e7dfd0;
  vertical-align: top;
  color: #2a241e;
}
.firm-sg-article tbody tr:last-child td { border-bottom: none; }

/* TOC sidebar */
.firm-sg-toc { list-style: none; margin: 0; padding: 0; display: grid; gap: 2px; counter-reset: firm-sg-toc; }
.firm-sg-toc li a {
  display: grid;
  grid-template-columns: 28px 1fr;
  gap: 10px;
  padding: 10px 0;
  border-bottom: 1px solid #e7dfd0;
  text-decoration: none;
  color: #2a241e;
  font: 500 14px/1.4 var(--font-geist), system-ui, sans-serif;
  transition: color 0.15s ease;
  counter-increment: firm-sg-toc;
}
.firm-sg-toc li a::before {
  content: counter(firm-sg-toc, decimal-leading-zero);
  color: #b8331f;
  font: 500 12px/1.4 var(--font-geist), system-ui, sans-serif;
}
.firm-sg-toc li a:hover { color: #b8331f; }
.firm-sg-toc-rest { margin-top: 0; }

/* Nearby states cards — hover lift + accent border */
.firm-nearby-card { transition: border-color 160ms ease, background 160ms ease, transform 160ms ease, box-shadow 160ms ease; }
.firm-nearby-card:hover { border-color: #b8331f; background: #fdf9f0; transform: translateY(-2px); box-shadow: 0 10px 24px -18px rgba(184,51,31,0.45); }
.firm-nearby-card .firm-nearby-arrow { transition: transform 160ms ease, color 160ms ease; }
.firm-nearby-card:hover .firm-nearby-arrow { transform: translateX(4px); color: #b8331f; }
`;

export default function FirmStateGuidePage({ state, guide }: Props) {
  const jsonLd = buildStateGuideJsonLd({
    stateName: state.name,
    stateSlug: state.slug,
    bodyMd: guide.bodyMd,
    generatedAt: guide.generatedAt,
  });

  const { popular: tocPopular, extra: tocExtra } = buildToc(guide.bodyMd);
  const neighbors = getNeighbors(state.slug);

  return (
    <main style={{ background: C.bg, color: C.fg, font: `16px/1.5 ${BODY_FONT}` }} data-state={state.slug}>
      <style dangerouslySetInnerHTML={{ __html: italicEmCSS + FIRM_SG_CSS }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Breadcrumb */}
      <div style={{ padding: `20px ${PAD_X}`, background: C.bg, borderBottom: `1px solid ${C.line}`, font: `13px/1 ${BODY_FONT}`, color: C.muted }}>
        <Link href="/" style={{ color: C.muted, textDecoration: "none" }}>CivilCase</Link>
        <span style={{ margin: "0 10px", opacity: 0.5 }}>/</span>
        <Link href="/small-claims" style={{ color: C.muted, textDecoration: "none" }}>Small Claims</Link>
        <span style={{ margin: "0 10px", opacity: 0.5 }}>/</span>
        <span style={{ color: C.fg, fontWeight: 500 }}>{state.name}</span>
      </div>

      {/* HERO STRIP */}
      <section style={{ padding: `60px ${PAD_X} 24px` }}>
        <div style={{ ...eyebrow, color: C.accent, marginBottom: 22 }}>STATE GUIDE</div>
        <h1 className="firm-h" style={{ font: `600 clamp(48px, 5vw, 72px)/1.05 ${HEAD_FONT}`, color: C.fg, letterSpacing: "-0.025em", margin: 0 }}>
          Small claims in <em>{state.name}</em>.
        </h1>
      </section>

      {/* GRID: article + sticky sidebar */}
      <section style={{ padding: `40px ${PAD_X} 120px` }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 80, alignItems: "start" }}>
          {/* Article */}
          <article className="firm-sg-article">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{ a: MarkdownLink, h2: MarkdownH2 }}
            >
              {guide.bodyMd}
            </ReactMarkdown>

            {/* Neighbors */}
            <nav style={{ marginTop: 80, paddingTop: 60, borderTop: `1px solid ${C.line}` }} aria-label={`States near ${state.name}`}>
              <div style={{ marginBottom: 32 }}>
                <div style={{ ...eyebrow, marginBottom: 18 }}>NEARBY STATES</div>
                <h2 className="firm-h" style={{ ...H2, fontSize: 36, margin: 0 }}>
                  States near <em>{state.name}</em>.
                </h2>
                <p style={{ ...body, marginTop: 16, maxWidth: 620 }}>
                  Filing in a neighboring state? Caps, fees, and forms are all different across the line.
                </p>
              </div>
              <ul style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12, listStyle: "none", padding: 0, margin: 0 }}>
                {neighbors.map((slug) => {
                  const s = getStateBySlug(slug);
                  if (!s) return null;
                  return (
                    <li key={slug}>
                      <Link
                        href={`/small-claims/${slug}`}
                        className="firm-nearby-card"
                        style={{
                          display: "grid",
                          gridTemplateColumns: "auto 1fr auto",
                          gap: 14,
                          alignItems: "center",
                          padding: "16px 18px",
                          background: C.paper,
                          border: `1px solid ${C.line}`,
                          borderRadius: RAD.card,
                          textDecoration: "none",
                          color: C.fg,
                        }}
                      >
                        <span style={{ font: `600 13px/1 ${BODY_FONT}`, color: C.accent, letterSpacing: "0.08em" }}>{s.abbr}</span>
                        <span style={{ font: `500 15px/1.3 ${BODY_FONT}`, color: C.fg }}>{s.name}</span>
                        <span className="firm-nearby-arrow" style={{ display: "inline-flex", color: C.muted }}>
                          <Arrow color="currentColor" />
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <div style={{ marginTop: 24 }}>
                <Link
                  href="/small-claims"
                  style={{ display: "inline-flex", alignItems: "center", gap: 8, font: `500 14px/1 ${BODY_FONT}`, color: C.accent, textDecoration: "none" }}
                >
                  Browse all 51 state guides <Arrow color={C.accent} />
                </Link>
              </div>
            </nav>
          </article>

          {/* Sticky sidebar */}
          <aside style={{ position: "sticky", top: 90, alignSelf: "start" }} aria-label="On this page">
            {/* TOC */}
            <div style={{ background: C.paper, border: `1px solid ${C.line}`, borderRadius: RAD.card, padding: 24, marginBottom: 20 }}>
              <div style={{ ...eyebrow, marginBottom: 16 }}>ON THIS PAGE</div>
              <ol className="firm-sg-toc">
                {tocPopular.map((it) => (
                  <li key={it.id}>
                    <a href={`#${it.id}`}>{it.label}</a>
                  </li>
                ))}
              </ol>
              <TocExpander items={tocExtra} startCounter={tocPopular.length} />
            </div>

            {/* CTA card */}
            <div style={{ background: C.dark, color: "#fff", borderRadius: RAD.card, padding: 28 }}>
              <div style={{ font: `600 19px/1.3 ${HEAD_FONT}`, color: "#fff", letterSpacing: "-0.005em" }}>
                Ready to send your demand letter?
              </div>
              <p style={{ font: `14px/1.55 ${BODY_FONT}`, color: "rgba(255,255,255,0.7)", marginTop: 12 }}>
                Skip the back-and-forth. A formal demand often resolves the dispute before filing.
              </p>
              <Link href="/demand-letter" style={{ textDecoration: "none", display: "inline-block", marginTop: 18 }}>
                <FirmBtn kind="accent">Start a Demand Letter</FirmBtn>
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
