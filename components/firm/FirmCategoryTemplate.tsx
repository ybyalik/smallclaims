import Link from "next/link";
import Image from "next/image";
import { cloneElement } from "react";
import { X, FileText, Lightbulb } from "lucide-react";
import HeroStatePins from "../HeroStatePins";
import FeaturedUsMap from "../widgets/FeaturedUsMap";
import {
  C, H1, H2, eyebrow, body, PAD_X, RAD, HEAD_FONT, BODY_FONT, italicEmCSS,
  Arrow, Check, FirmBtn, ThreeWaysSection, FaqSection,
} from "./index";
import { availableStateSlugs } from "../../lib/state-data";
import { STATES } from "../../lib/states";
import type { CategoryHubData } from "../../lib/category-hubs/types";
import { collectionPageSchema, articleSchema, breadcrumbList, jsonLdGraph } from "../../lib/schema";

// Firm-styled equivalent of CategoryTemplate. Reads the same CategoryHubData
// shape so every category landing page becomes a one-line wrapper:
//
//   <FirmCategoryTemplate data={EMPLOYER_HUB} />
//
// Sections match the legacy template: hero · issue cards · belongs/doesn't
// · damages · evidence · state-specific rules · three-ways CTA · FAQ.

export async function FirmCategoryTemplate({ data }: { data: CategoryHubData }) {
  const ready = new Set(await availableStateSlugs());
  const featured = data.featuredStateSlugs
    .map((slug) => STATES.find((s) => s.slug === slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s) && ready.has(s!.slug));

  const catUrl = `/small-claims/${data.categorySlug}`;
  const catHeadline = `${data.hero.h1.pre}${data.hero.h1.em}${data.hero.h1.post ?? ""}`;
  const jsonLd = jsonLdGraph(
    collectionPageSchema({
      name: data.breadcrumbLabel,
      description: data.meta.description,
      url: catUrl,
      items: data.issues.slice(0, 12).map((it) => ({
        name: it.title,
        url: `${catUrl}/${it.slug}`,
      })),
    }),
    articleSchema({
      headline: data.schemaArticle.headline || catHeadline,
      description: data.schemaArticle.description || data.meta.description,
      url: catUrl,
    }),
    breadcrumbList([
      { name: "CivilCase", url: "/" },
      { name: "Small Claims", url: "/small-claims" },
      { name: data.breadcrumbLabel, url: catUrl },
    ]),
  );

  return (
    <main style={{ background: C.bg, color: C.fg, font: `16px/1.5 ${BODY_FONT}` }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <style dangerouslySetInnerHTML={{ __html: italicEmCSS }} />

      {/* Breadcrumb */}
      <div style={{ padding: `20px ${PAD_X}`, background: C.bg, borderBottom: `1px solid ${C.line}`, font: `13px/1 ${BODY_FONT}`, color: C.muted }}>
        <Link href="/" style={{ color: C.muted, textDecoration: "none" }}>CivilCase</Link>
        <span style={{ margin: "0 10px", opacity: 0.5 }}>/</span>
        <Link href="/small-claims" style={{ color: C.muted, textDecoration: "none" }}>Small Claims</Link>
        <span style={{ margin: "0 10px", opacity: 0.5 }}>/</span>
        <span style={{ color: C.fg, fontWeight: 500 }}>{data.breadcrumbLabel}</span>
      </div>

      {/* HERO */}
      <section style={{ padding: `60px ${PAD_X} 80px` }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.15fr 1fr", gap: 80, alignItems: "center" }}>
          <div>
            <h1 className="firm-h" style={{ ...H1, fontSize: 60 }}>
              {data.hero.h1.pre}<em>{data.hero.h1.em}</em>{data.hero.h1.post ?? ""}
            </h1>
            <p style={{ font: `18px/1.55 ${BODY_FONT}`, color: C.muted, maxWidth: 540, marginTop: 28 }}>
              {data.hero.lede}
            </p>
            <div style={{ display: "flex", gap: 14, marginTop: 36 }}>
              <FirmBtn>Check My Case (Free)</FirmBtn>
              <FirmBtn kind="ghost">Send a Demand Letter</FirmBtn>
            </div>
          </div>
          {/* Hero right side: same HeroStatePins map used on /small-claims */}
          <div>
            <HeroStatePins />
          </div>
        </div>
      </section>

      {/* ISSUE PANEL (same pattern as /small-claims "All dispute categories"
          and /landlord "All landlord disputes") */}
      <section style={{ padding: `120px ${PAD_X}` }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 80, marginBottom: 56, alignItems: "end" }}>
          <div>
            <h2 className="firm-h" style={H2}>
              {data.issuesIntro.h2.pre}<em>{data.issuesIntro.h2.em}</em>{data.issuesIntro.h2.post ?? ""}
            </h2>
          </div>
          <p style={body}>{data.issuesIntro.paragraph}</p>
        </div>
        <article style={{ background: C.cream, border: `1px solid ${C.line}`, borderRadius: RAD.large, padding: "32px 40px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 22, alignItems: "center", marginBottom: 28 }}>
            <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#fff", display: "grid", placeItems: "center", color: C.accent, boxShadow: "0 1px 0 rgba(0,0,0,0.04)" }}>
              <FileText size={26} strokeWidth={1.8} aria-hidden />
            </div>
            <div>
              <div style={{ font: `600 26px/1.2 ${HEAD_FONT}`, color: C.fg, letterSpacing: "-0.012em" }}>
                All {data.breadcrumbLabel.toLowerCase()}
              </div>
              <div style={{ font: `400 15px/1.5 ${BODY_FONT}`, color: C.muted, marginTop: 4 }}>
                Pick the one that fits your situation. Each links to a state-specific guide.
              </div>
            </div>
            <button type="button" aria-label="Collapse" style={{ background: "transparent", border: "none", padding: 8, cursor: "pointer", color: C.muted, display: "grid", placeItems: "center" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="m18 15-6-6-6 6" />
              </svg>
            </button>
          </div>

          <div style={{ background: "#fff", borderRadius: RAD.panel, padding: "10px 8px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
              {data.issues.map((issue) => {
                const inner = (
                  <>
                    <span style={{ display: "grid", placeItems: "center", width: 28, color: C.accent }}>
                      {issue.icon}
                    </span>
                    <div>
                      <div style={{ font: `600 16px/1.3 ${BODY_FONT}`, color: C.fg }}>{issue.title}</div>
                      <div style={{ font: `400 13px/1.45 ${BODY_FONT}`, color: C.muted, marginTop: 2 }}>{issue.blurb}</div>
                      {!issue.ready && (
                        <div style={{ marginTop: 6, display: "inline-block", padding: "3px 8px", borderRadius: 999, background: C.cream, font: `500 10px/1 ${BODY_FONT}`, color: C.muted, letterSpacing: "0.06em" }}>
                          COMING SOON
                        </div>
                      )}
                    </div>
                    <span style={{ color: C.fg, display: "grid", placeItems: "center" }} aria-hidden>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </span>
                  </>
                );
                const cellStyle: React.CSSProperties = {
                  display: "grid",
                  gridTemplateColumns: "auto 1fr auto",
                  gap: 14,
                  alignItems: "center",
                  padding: "18px 22px",
                  textDecoration: "none",
                  color: "inherit",
                  borderRadius: 10,
                  opacity: issue.ready ? 1 : 0.55,
                };
                return issue.ready ? (
                  <Link
                    key={issue.slug}
                    href={`/small-claims/${data.categorySlug}/${issue.slug}`}
                    className="firm-cat-link"
                    style={cellStyle}
                  >
                    {inner}
                  </Link>
                ) : (
                  <div key={issue.slug} style={cellStyle} aria-disabled="true">
                    {inner}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Popular row: surface up to 4 ready issues as chips */}
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 22, paddingLeft: 6, flexWrap: "wrap" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8, color: C.muted, font: `500 13px/1 ${BODY_FONT}` }}>
              <Lightbulb size={14} strokeWidth={1.8} aria-hidden />
              Popular right now:
            </span>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {data.issues.filter((i) => i.ready).slice(0, 4).map((p) => (
                <Link
                  key={p.slug}
                  href={`/small-claims/${data.categorySlug}/${p.slug}`}
                  className="firm-cat-link"
                  style={{ display: "inline-flex", alignItems: "center", padding: "6px 12px", borderRadius: 999, background: "rgba(31,26,22,0.04)", border: `1px solid ${C.line}`, font: `500 12.5px/1 ${BODY_FONT}`, color: C.fg, textDecoration: "none" }}
                >
                  {p.title}
                </Link>
              ))}
            </div>
          </div>
        </article>
      </section>

      {/* SCOPE · V1 · Compact ledger · no images
          Tight 2-col yes/no compare. Header bars (blue ✓ / dark ×) with item
          count; rows on paper bg with hairlines. No card chrome. */}
      <section style={{ padding: `80px ${PAD_X}`, background: C.cream, color: C.fg }}>
        {/* Heading row — oneLine variant: title left, lede right */}
        <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 60, alignItems: "end", marginBottom: 32 }}>
          <div>
            <h2 className="firm-h" style={{ ...H2, fontSize: 44, margin: 0 }}>
              How small claims handles <em>{data.belongs.h2Em}</em>.
            </h2>
          </div>
          <p style={{ ...body, fontSize: 14, maxWidth: 460 }}>{data.belongs.intro}</p>
        </div>

        {/* Two-column ledger */}
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 20, alignItems: "start" }}>
          {/* BELONGS */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "12px 18px",
                background: "#1B3A5C",
                color: "#fff",
              }}
            >
              <div
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 999,
                  background: "#fff",
                  color: "#1B3A5C",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  font: `600 12px/1 ${BODY_FONT}`,
                }}
              >
                ✓
              </div>
              <div style={{ font: `500 12px/1 ${BODY_FONT}`, letterSpacing: "0.2em" }}>BELONGS IN SMALL CLAIMS</div>
              <div style={{ marginLeft: "auto", font: `500 12px/1 ${BODY_FONT}`, color: "rgba(255,255,255,0.85)" }}>
                {data.belongs.inItems.length}
              </div>
            </div>
            <div>
              {data.belongs.inItems.map((it, i) => (
                <div
                  key={i}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "36px 1fr",
                    gap: 16,
                    padding: "18px 20px",
                    borderBottom: i < data.belongs.inItems.length - 1 ? `1px solid ${C.line}` : "none",
                    alignItems: "baseline",
                    background: C.paper,
                  }}
                >
                  <div style={{ font: `500 13px/1 ${BODY_FONT}`, color: C.muted, letterSpacing: "0.08em" }}>
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <div style={{ font: `600 17px/1.3 ${HEAD_FONT}`, color: C.fg, letterSpacing: "-0.005em" }}>{it.titleBold}</div>
                    <div style={{ font: `14.5px/1.55 ${BODY_FONT}`, color: C.muted, marginTop: 6 }}>{it.rest}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* DOESN'T BELONG */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "12px 18px",
                background: C.dark,
                color: "#fff",
              }}
            >
              <div
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 999,
                  background: "rgba(255,255,255,0.18)",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  font: `600 12px/1 ${BODY_FONT}`,
                }}
              >
                ×
              </div>
              <div style={{ font: `500 12px/1 ${BODY_FONT}`, letterSpacing: "0.2em" }}>DOESN&rsquo;T BELONG HERE</div>
              <div style={{ marginLeft: "auto", font: `500 12px/1 ${BODY_FONT}`, color: "rgba(255,255,255,0.6)" }}>
                {data.belongs.outItems.length}
              </div>
            </div>
            <div>
              {data.belongs.outItems.map((it, i) => (
                <div
                  key={i}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "36px 1fr",
                    gap: 16,
                    padding: "18px 20px",
                    borderBottom: i < data.belongs.outItems.length - 1 ? `1px solid ${C.line}` : "none",
                    alignItems: "baseline",
                    background: C.paper,
                  }}
                >
                  <div style={{ font: `500 13px/1 ${BODY_FONT}`, color: C.muted, letterSpacing: "0.08em" }}>
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <div style={{ font: `600 17px/1.3 ${HEAD_FONT}`, color: C.fg, letterSpacing: "-0.005em" }}>{it.titleBold}</div>
                    <div style={{ font: `14.5px/1.55 ${BODY_FONT}`, color: C.muted, marginTop: 6 }}>{it.rest}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DAMAGES · V1 · With image */}
      <section style={{ padding: `120px ${PAD_X}` }}>
        <div style={{ marginBottom: 56 }}>
          <div style={{ ...eyebrow, marginBottom: 22 }}>DAMAGES</div>
          <h2 className="firm-h" style={H2}>What can you <em>recover</em>?</h2>
          <p style={{ ...body, marginTop: 22, maxWidth: 680 }}>{data.damages.intro}</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "0.85fr 1.15fr", gap: 40, alignItems: "stretch" }}>
          {/* Image side */}
          <div style={{ position: "relative", width: "100%", minHeight: 420, background: C.paper, border: `1px solid ${C.line}`, overflow: "hidden" }}>
            <Image
              src="https://images.unsplash.com/photo-1554224155-1696413565d3?w=900&h=1100&fit=crop"
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              style={{ objectFit: "cover" }}
              aria-hidden
            />
          </div>

          {/* Calc side */}
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {data.damages.rows.map((row, i) => (
              <div
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns: "80px 32px minmax(0, 1.2fr) minmax(0, 1.3fr)",
                  gap: 18,
                  padding: "22px 26px",
                  alignItems: "center",
                  background: row.accent ? "rgba(184,51,31,0.06)" : "transparent",
                  borderTop: i === 0 ? `1px solid ${C.line}` : "none",
                  borderBottom: `1px solid ${C.line}`,
                }}
              >
                {/* Icon — large tinted circle */}
                <span
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 999,
                    background: row.accent ? "rgba(184,51,31,0.16)" : "rgba(184,51,31,0.08)",
                    color: row.accent ? C.accent : C.muted,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                  aria-hidden
                >
                  {row.iconSvg}
                </span>

                {/* Step number — small filled circle */}
                <span
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 999,
                    background: row.accent ? C.accent : C.fg,
                    color: "#fff",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    font: `700 12px/1 ${BODY_FONT}`,
                    flexShrink: 0,
                  }}
                  aria-hidden
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Tag + body */}
                <div style={{ minWidth: 0 }}>
                  <div style={{ font: `700 17px/1.2 ${HEAD_FONT}`, color: row.accent ? C.accent : C.fg, letterSpacing: "-0.01em", marginBottom: 4 }}>
                    {row.tag}
                  </div>
                  <p style={{ font: `14px/1.55 ${BODY_FONT}`, color: C.muted, margin: 0 }}>{row.body}</p>
                </div>

                {/* Meter — amount + bar + label */}
                <div style={{ display: "flex", flexDirection: "column", gap: 8, paddingLeft: 24, borderLeft: `1px solid ${C.line}`, minWidth: 0 }}>
                  <div style={{ font: `700 24px/1 ${HEAD_FONT}`, letterSpacing: "-0.02em", color: row.accent ? C.accent : C.fg }}>
                    {row.amount}
                  </div>
                  <div style={{ background: "rgba(31,27,22,0.08)", borderRadius: 2, height: 4, overflow: "hidden" }}>
                    <span
                      style={{
                        display: "block",
                        height: "100%",
                        width: `${row.barWidthPct}%`,
                        background: row.accent ? C.accent : C.fg,
                        borderRadius: 2,
                      }}
                    />
                  </div>
                  <div style={{ font: `500 11px/1 ${BODY_FONT}`, color: C.muted, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                    {row.barLabel}
                  </div>
                </div>
              </div>
            ))}
            <div
              style={{
                marginTop: 10,
                background: C.dark,
                color: "#fff",
                padding: "20px 22px",
                display: "grid",
                gridTemplateColumns: "1fr auto auto",
                gap: 22,
                alignItems: "center",
              }}
            >
              <div style={{ ...eyebrow, color: "rgba(255,255,255,0.55)" }}>ESTIMATED RECOVERY</div>
              <div className="firm-h firm-h-light" style={{ font: `500 32px/1 ${HEAD_FONT}`, color: C.accentOnDark, letterSpacing: "-0.025em" }}>
                {data.damages.totalAmount}
              </div>
              <div style={{ font: `11.5px/1.4 ${BODY_FONT}`, color: "rgba(255,255,255,0.65)", maxWidth: 260, textAlign: "right" }}>
                {data.damages.totalCaption}
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* EVIDENCE */}
      <section style={{ padding: `120px ${PAD_X}`, background: C.cream }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 80, marginBottom: 56, alignItems: "end" }}>
          <div>
            <div style={{ ...eyebrow, marginBottom: 22 }}>BUILD THE FILE</div>
            <h2 className="firm-h" style={H2}>What evidence do you need to <em>{data.evidence.h2Em}</em>?</h2>
          </div>
          <p style={body}>{data.evidence.intro}</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
          {data.evidence.items.map((item, i) => (
            <div
              key={i}
              style={{
                position: "relative",
                background: C.paper,
                border: `1px solid ${C.line}`,
                borderRadius: 14,
                padding: "72px 22px 22px",
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              {/* Top-left step number */}
              <div
                style={{
                  position: "absolute",
                  top: 16,
                  left: 16,
                  width: 32,
                  height: 32,
                  borderRadius: 999,
                  background: C.fg,
                  color: "#fff",
                  display: "grid",
                  placeItems: "center",
                  font: `700 13px/1 ${BODY_FONT}`,
                }}
                aria-hidden
              >
                {i + 1}
              </div>

              {/* Top-right icon tile */}
              <div
                style={{
                  position: "absolute",
                  top: 14,
                  right: 14,
                  width: 52,
                  height: 52,
                  borderRadius: 12,
                  background: "rgba(184,51,31,0.10)",
                  color: C.accent,
                  display: "grid",
                  placeItems: "center",
                }}
                aria-hidden
              >
                {cloneElement(item.iconSvg as React.ReactElement<{ size?: number; strokeWidth?: number }>, { size: 26, strokeWidth: 1.7 })}
              </div>

              <div style={{ font: `700 17px/1.25 ${HEAD_FONT}`, color: C.fg, letterSpacing: "-0.01em" }}>{item.title}</div>
              <p style={{ font: `14.5px/1.55 ${BODY_FONT}`, color: C.muted, margin: 0 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* STATE-SPECIFIC RULES — left: intro, right: US map with featured states highlighted */}
      <section style={{ padding: `120px ${PAD_X}` }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 60, alignItems: "center" }}>
          <div>
            <div style={{ ...eyebrow, marginBottom: 22 }}>BY STATE</div>
            <h2 className="firm-h" style={H2}>State-specific <em>rules</em>.</h2>
            <p style={{ ...body, marginTop: 22, maxWidth: 520 }}>{data.stateRulesIntro}</p>
            <Link href="/small-claims" style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 22, font: `500 14px/1 ${BODY_FONT}`, color: C.accent, textDecoration: "none" }}>
              See all 50 state guides <Arrow color={C.accent} />
            </Link>
          </div>
          {/* Static US map PNG as backdrop with featured state pills overlaid on top
              — same visual pattern as the legacy /small-claims/{category} cat-state-grid */}
          <div style={{ position: "relative", padding: "80px 30px", isolation: "isolate", overflow: "visible" }}>
            <div
              aria-hidden
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "90%",
                height: "155%",
                backgroundImage: "url('/map-background.png')",
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                zIndex: -1,
                pointerEvents: "none",
              }}
            />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
              {featured.map((s) => (
                <Link
                  key={s.slug}
                  href={`/small-claims/${s.slug}`}
                  className="firm-card-link"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "14px 18px",
                    background: "#fff",
                    border: `1px solid ${C.line}`,
                    borderRadius: 10,
                    textDecoration: "none",
                    color: C.fg,
                    font: `600 15px/1 ${BODY_FONT}`,
                    boxShadow: "0 4px 12px -8px rgba(0,0,0,0.12)",
                  }}
                >
                  <span>{s.name}</span>
                  <Arrow color={C.accent} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* THREE WAYS + testimonial */}
      <ThreeWaysSection
        lede={data.hero.lede.length > 120 ? data.hero.lede.slice(0, 120) + "…" : data.hero.lede}
        testimonial={{ quote: data.testimonial.quote, name: data.testimonial.name, meta: data.testimonial.role }}
      />

      <FaqSection
        title={<>{data.breadcrumbLabel} <em>questions</em>.</>}
        subtitle={`The questions ${data.audienceLabel} actually ask before filing.`}
        faqs={data.faqs}
      />
    </main>
  );
}
