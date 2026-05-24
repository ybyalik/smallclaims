import Link from "next/link";
import Image from "next/image";
import {
  X, CheckCircle2, AlertTriangle, Scale, MapPin,
  FileText, Mail, ShieldCheck, ShieldAlert, Clock, ArrowRight,
  Lightbulb, BarChart3, Trophy,
} from "lucide-react";
import FeaturedUsMap from "../widgets/FeaturedUsMap";
import CountUp from "../widgets/CountUp";
import { availableStateSlugs } from "../../lib/state-data";
import { getClaimStateTable } from "../../lib/state-data/by-claim";
import type { LandlordIssue, EvidenceCell } from "../../lib/landlord-issues/types";
import type { CategoryMeta } from "../../lib/issues/categories";
import { articleSchema, howToSchema, breadcrumbList, jsonLdGraph } from "../../lib/schema";
import {
  C, H1, H2, eyebrow, body, PAD_X, RAD, HEAD_FONT, BODY_FONT, SERIF_FONT, italicEmCSS,
  Arrow, Check, ShieldLogo, FirmBtn, FaqSection,
} from "./index";

// Fully firm-styled issue page. Same data shape as the legacy IssueTemplate
// (LandlordIssue), all sections present, all interactive widgets retained.
// Replaces components/issues/IssueTemplate.tsx for the (firm) route group.

const FEATURED_STATE_SLUGS = [
  "california", "texas", "florida", "new-york", "pennsylvania",
  "illinois", "ohio", "georgia", "north-carolina", "michigan",
];

const FIRM_ISSUE_CSS = `
.firm-rich-html { font: 15.5px/1.65 var(--font-geist), system-ui, sans-serif; color: #2a241e; }
.firm-rich-html p { margin: 0 0 12px; }
.firm-rich-html p:last-child { margin-bottom: 0; }
.firm-rich-html strong { color: #1a1612; font-weight: 600; }
.firm-rich-html a { color: #b8331f; text-decoration: underline; text-underline-offset: 3px; }
.firm-rich-html em { font-style: italic; }
.firm-rich-html ul, .firm-rich-html ol { margin: 8px 0 12px 22px; padding: 0; display: grid; gap: 6px; }
/* Dark-context variant — used inside dark bands so strong/links stay readable */
.firm-rich-html.on-dark { color: rgba(255,255,255,0.75); }
.firm-rich-html.on-dark strong { color: #fff; }
.firm-rich-html.on-dark a { color: #f5b29f; }

/* Related claims cards — hover lift + accent border */
.firm-related-card { transition: border-color 160ms ease, background 160ms ease, transform 160ms ease, box-shadow 160ms ease; }
.firm-related-card:hover { border-color: #b8331f; background: #fdf9f0; transform: translateY(-2px); box-shadow: 0 10px 24px -18px rgba(184,51,31,0.45); }
.firm-related-card .firm-related-arrow { transition: transform 160ms ease, color 160ms ease; }
.firm-related-card:hover .firm-related-arrow { transform: translateX(4px); color: #b8331f; }
`;

interface Props {
  issue: LandlordIssue;
  category: CategoryMeta;
  siblings: LandlordIssue[];
}

const tierColor = (tier: "low" | "mid" | "high"): string =>
  tier === "high" ? C.accent : tier === "mid" ? "#7a7165" : "#bfb9ad";

export default async function FirmIssueTemplate({ issue, category, siblings }: Props) {
  const ready = new Set(await availableStateSlugs());
  const claimRows = issue.claimType ? await getClaimStateTable(issue.claimType) : [];
  const featuredClaimRows = FEATURED_STATE_SLUGS
    .map((slug) => claimRows.find((r) => r.slug === slug))
    .filter((r): r is NonNullable<typeof r> => Boolean(r));
  const minCap = 2500;
  const maxCap = 25000;
  const fmtCap = (n: number) => `$${n.toLocaleString("en-US")}`;
  const showStateSection = !!issue.claimType || !!issue.stateSection;

  // Map category hub href → firm equivalent (best-effort: replace /small-claims/X → /small-claims/X).
  const hubHref = category.hubHref.replace(/^\/small-claims\//, "/small-claims/");

  const issueUrl = `${hubHref}/${issue.slug}`;
  const headline = `${issue.hero.h1.pre}${issue.hero.h1.em}${issue.hero.h1.post ?? ""}`;
  const jsonLd = jsonLdGraph(
    articleSchema({
      headline,
      description: issue.meta?.description,
      url: issueUrl,
    }),
    howToSchema({
      name: `How to sue: ${issue.short}`,
      description: `Step-by-step plan to ${issue.short.toLowerCase()} in small claims court.`,
      steps: issue.fileSteps.steps.slice(0, 5).map((s) => ({ name: s.title, text: s.body })),
    }),
    breadcrumbList([
      { name: "CivilCase", url: "/" },
      { name: "Small Claims", url: "/small-claims" },
      { name: category.hubLabel, url: hubHref },
      { name: issue.short, url: issueUrl },
    ]),
  );

  return (
    <main style={{ background: C.bg, color: C.fg, font: `16px/1.5 ${BODY_FONT}` }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <style dangerouslySetInnerHTML={{ __html: italicEmCSS + FIRM_ISSUE_CSS }} />
      <CountUp />

      {/* Breadcrumb */}
      <div style={{ padding: `20px ${PAD_X}`, borderBottom: `1px solid ${C.line}`, font: `13px/1 ${BODY_FONT}`, color: C.muted }}>
        <Link href="/" style={{ color: C.muted, textDecoration: "none" }}>CivilCase</Link>
        <span style={{ margin: "0 10px", opacity: 0.5 }}>/</span>
        <Link href="/small-claims" style={{ color: C.muted, textDecoration: "none" }}>Small Claims</Link>
        <span style={{ margin: "0 10px", opacity: 0.5 }}>/</span>
        <Link href={hubHref} style={{ color: C.muted, textDecoration: "none" }}>{category.hubLabel}</Link>
        <span style={{ margin: "0 10px", opacity: 0.5 }}>/</span>
        <span style={{ color: C.fg, fontWeight: 500 }}>{issue.breadcrumbLabel}</span>
      </div>

      {/* HERO */}
      <section style={{ padding: `60px ${PAD_X} 80px` }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 80, alignItems: "center" }}>
          <div>
            <div style={{ ...eyebrow, color: C.accent, marginBottom: 22 }}>{category.hubLabel.toUpperCase()}</div>
            <h1 className="firm-h" style={{ ...H1, fontSize: 60 }}>
              {issue.hero.h1.pre}<em>{issue.hero.h1.em}</em>{issue.hero.h1.post ?? ""}
            </h1>
            <p style={{ font: `18px/1.55 ${BODY_FONT}`, color: C.muted, maxWidth: 540, marginTop: 22 }}>
              <strong style={{ color: C.fg }}>{issue.hero.leadStrong}</strong>{issue.hero.leadBody}
            </p>
            <div style={{ display: "flex", gap: 14, marginTop: 32 }}>
              <Link href="/demand-letter" style={{ textDecoration: "none" }}><FirmBtn>Generate a Demand Letter</FirmBtn></Link>
              <Link href="/case-score" style={{ textDecoration: "none" }}><FirmBtn kind="ghost">Check My Case Strength</FirmBtn></Link>
            </div>
          </div>
          {/* Counter card — legacy light design with count-up + bar animations */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div className="cv2-counter-card" aria-hidden>
              <div className="cv2-counter-stamp" aria-hidden>
                <div className="cv2-counter-stamp-label">Awarded</div>
                <div className="cv2-counter-stamp-meta">{issue.counter.meta.split("·")[0].trim()}</div>
              </div>
              <span className="cv2-counter-tag">If you win</span>
              <div className="cv2-counter-amount">
                <span className="cv2-counter-currency">$</span>
                <span className="cv2-counter-num" data-target={issue.counter.amount}>0</span>
              </div>
              <div className="cv2-counter-rows">
                {issue.counter.rows.map((row, i) => (
                  <div key={row.label} className="cv2-counter-row">
                    <span>{row.label}</span>
                    <strong>{row.value}</strong>
                    <div className={`cv2-counter-bar${row.emphasis === "accent" ? " accent" : ""}`}>
                      <span
                        style={{
                          animationDelay: `${0.2 + i * 0.7}s`,
                          ...(row.emphasis === "muted" ? { width: "0%" } : {}),
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="cv2-counter-foot">{issue.counter.footer}</div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT COUNTS — V1 With image layout: photo left, definitions list right */}
      <section id="what-counts" style={{ padding: `100px ${PAD_X}`, background: C.cream }}>
        <div style={{ display: "grid", gridTemplateColumns: "0.9fr 1.1fr", gap: 40, alignItems: "stretch" }}>
          {/* LEFT — editorial image */}
          <div style={{ position: "relative", width: "100%", minHeight: 420, background: C.paper, border: `1px solid ${C.line}`, overflow: "hidden" }}>
            <Image
              src="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=900&h=1100&fit=crop"
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              style={{ objectFit: "cover" }}
              aria-hidden
            />
          </div>

          {/* RIGHT — content */}
          <div>
            <div style={{ ...eyebrow, color: C.accent, marginBottom: 14 }}>DEFINITIONS</div>
            <h2 className="firm-h" style={{ font: `500 36px/1.08 ${HEAD_FONT}`, letterSpacing: "-0.025em", margin: 0 }}>
              {issue.whatCounts.h2.pre}<em>{issue.whatCounts.h2.em}</em>{issue.whatCounts.h2.post ?? ""}
            </h2>
            <p style={{ ...body, marginTop: 14, fontSize: 14, maxWidth: 520 }}>{issue.whatCounts.lede}</p>

            {/* Compact definition rows */}
            <div style={{ display: "grid", gap: 12, marginTop: 24 }}>
              {issue.whatCounts.cards.map((c, i) => (
                <div
                  key={c.num}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "auto 1fr",
                    gap: 18,
                    alignItems: "start",
                    padding: "16px 18px",
                    background: i === 0 ? "rgba(184,51,31,0.06)" : C.paper,
                    border: i === 0 ? `1px solid ${C.accent}` : `1px solid ${C.line}`,
                  }}
                >
                  <div style={{ font: `500 28px/0.95 ${HEAD_FONT}`, color: i === 0 ? C.accent : C.muted, letterSpacing: "-0.03em" }}>
                    0{i + 1}
                  </div>
                  <div>
                    <div style={{ font: `500 17px/1.2 ${HEAD_FONT}`, color: C.fg, letterSpacing: "-0.01em" }}>{c.title}</div>
                    <div style={{ font: `12.5px/1.5 ${BODY_FONT}`, color: C.muted, marginTop: 6 }}>{c.body}</div>
                  </div>
                </div>
              ))}
            </div>

            {issue.whatCounts.note && (
              <div style={{ display: "flex", gap: 14, alignItems: "start", marginTop: 20, padding: "16px 18px", background: C.paper, border: `1px solid ${C.line}`, borderLeft: `3px solid ${C.accent}` }}>
                <div style={{ flex: 1, font: `13.5px/1.55 ${BODY_FONT}`, color: C.fg }}>
                  <strong>{issue.whatCounts.note.strongIntro}</strong>{issue.whatCounts.note.rest}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CLAIM LAYERS — 2-column: claim ledger on left, editorial image on right */}
      <section id="claim" style={{ padding: `100px ${PAD_X}` }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: 60, marginBottom: 48 }}>
          <div>
            <div style={{ ...eyebrow, marginBottom: 18 }}>WHAT YOU CAN CLAIM FOR</div>
            <h2 className="firm-h" style={H2}>
              {issue.claim.h2.pre}<em>{issue.claim.h2.em}</em>{issue.claim.h2.post ?? ""}
            </h2>
          </div>
          <p style={{ ...body, alignSelf: "end" }}>{issue.claim.lede}</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 32, alignItems: "stretch" }}>
          {/* LEFT — bubble rows + dashed-red total stripe (no container chrome) */}
          <div>
            <div style={{ display: "grid", gap: 10 }}>
              {issue.claim.layers.map((layer) => (
                <div
                  key={layer.tag}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "90px 1fr 130px",
                    gap: 24,
                    alignItems: "center",
                    background: layer.accent ? "rgba(184,51,31,0.05)" : C.paper,
                    border: `1px solid ${layer.accent ? "rgba(184,51,31,0.28)" : C.line}`,
                    borderRadius: 12,
                    padding: "18px 22px",
                  }}
                >
                  <div
                    style={{
                      display: "inline-block",
                      font: `700 11px/1 ${BODY_FONT}`,
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      color: layer.accent ? "#fff" : C.fg,
                      background: layer.accent ? C.accent : C.cream,
                      padding: "6px 10px",
                      borderRadius: 6,
                      textAlign: "center",
                    }}
                  >
                    {layer.tag}
                  </div>
                  <div>
                    <h3 style={{ font: `700 17px/1.3 ${HEAD_FONT}`, color: C.fg, letterSpacing: "-0.015em", margin: "0 0 4px" }}>{layer.title}</h3>
                    <p style={{ font: `14px/1.5 ${BODY_FONT}`, color: C.muted, margin: 0 }}>{layer.body}</p>
                  </div>
                  <div style={{ font: `700 26px/1 ${HEAD_FONT}`, letterSpacing: "-0.02em", color: layer.accent ? C.accent : C.fg, textAlign: "right" }}>{layer.amount}</div>
                </div>
              ))}
            </div>

            {/* Sample total — no card chrome, dashed red top rule */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr auto",
                gap: "16px 24px",
                alignItems: "baseline",
                padding: "18px 4px 4px",
                marginTop: 12,
                borderTop: "2px dashed rgba(184,51,31,0.35)",
              }}
            >
              <div style={{ minWidth: 0 }}>
                <div style={{ font: `700 13px/1.3 ${BODY_FONT}`, color: C.accent, letterSpacing: "0.04em", marginBottom: 6 }}>{issue.claim.total.label}</div>
                <p style={{ font: `13.5px/1.55 ${BODY_FONT}`, color: C.muted, margin: 0, maxWidth: "50ch" }}>{issue.claim.total.body}</p>
              </div>
              <div style={{ textAlign: "right" }}>
                <div
                  style={{
                    fontFamily: HEAD_FONT,
                    fontWeight: 700,
                    fontSize: "clamp(32px, 3.6vw, 46px)",
                    letterSpacing: "-0.03em",
                    lineHeight: 1,
                    color: C.accent,
                  }}
                >
                  {issue.claim.total.amount}
                </div>
                <div style={{ font: `11.5px/1.3 ${BODY_FONT}`, letterSpacing: "0.04em", color: C.muted, marginTop: 8 }}>{issue.claim.total.sublabel}</div>
              </div>
            </div>
          </div>

          {/* RIGHT — editorial image */}
          <div style={{ position: "relative", width: "100%", minHeight: 420, background: C.paper, border: `1px solid ${C.line}`, borderRadius: RAD.panel, overflow: "hidden" }}>
            <Image
              src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=900&h=1100&fit=crop"
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              style={{ objectFit: "cover" }}
              aria-hidden
            />
          </div>
        </div>
      </section>

      {/* BEFORE YOU SUE · V3 · Editorial recommendation (dark band, no chrome) */}
      <section id="before" style={{ background: C.dark, color: "#fff", padding: `84px ${PAD_X}` }}>
        {/* Header */}
        <div style={{ marginBottom: 56, display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 80, alignItems: "end" }}>
          <div>
            <div style={{ ...eyebrow, color: "rgba(255,255,255,0.55)", marginBottom: 18 }}>BEFORE YOU SUE</div>
            <h2 className="firm-h firm-h-light" style={{ font: `500 52px/1.02 ${HEAD_FONT}`, letterSpacing: "-0.035em", color: "#fff", margin: 0 }}>
              {issue.demand.h2.pre}<em>{issue.demand.h2.em}</em>{issue.demand.h2.post ?? ""}
            </h2>
          </div>
          <p style={{ font: `15px/1.6 ${BODY_FONT}`, color: "rgba(255,255,255,0.65)" }}>{issue.demand.lede}</p>
        </div>

        {/* Magazine-spread primary panel */}
        <div style={{ display: "grid", gridTemplateColumns: "1.05fr 1fr", gap: 0, border: `1px solid ${C.accentOnDark}`, position: "relative" }}>
          {/* Editor's choice badge */}
          <div style={{ position: "absolute", top: -1, left: -1, background: C.accentOnDark, color: C.dark, padding: "8px 14px", font: `500 10px/1 ${BODY_FONT}`, letterSpacing: "0.22em" }}>
            EDITOR&rsquo;S CHOICE · 6 IN 10 SETTLE HERE
          </div>

          {/* Left — copy */}
          <div style={{ padding: "60px 48px 44px", display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 18, marginBottom: 14 }}>
              <div className="firm-h firm-h-light" style={{ font: `300 72px/0.9 ${HEAD_FONT}`, letterSpacing: "-0.04em", color: C.accentOnDark }}>01</div>
              <div style={{ font: `500 11px/1 ${BODY_FONT}`, letterSpacing: "0.22em", color: "rgba(255,255,255,0.55)" }}>STEP 01</div>
            </div>
            <h3 className="firm-h firm-h-light" style={{ font: `500 36px/1.04 ${HEAD_FONT}`, letterSpacing: "-0.025em", color: "#fff", margin: 0, maxWidth: 440 }}>
              Send a Demand Letter.
            </h3>

            {/* Checklist (kept as the proof points underneath) */}
            <ul style={{ marginTop: 24, padding: 0, listStyle: "none", display: "grid", gap: 12 }}>
              {issue.demand.checklist.map((c) => (
                <li key={c} style={{ display: "flex", alignItems: "start", gap: 12 }}>
                  <span style={{ marginTop: 2 }}>
                    <Check color={C.accentOnDark} />
                  </span>
                  <span style={{ font: `14.5px/1.5 ${BODY_FONT}`, color: "rgba(255,255,255,0.85)" }}>{c}</span>
                </li>
              ))}
            </ul>

            {/* Stats row */}
            <div style={{ marginTop: 28, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0, borderTop: "1px solid rgba(255,255,255,0.15)", paddingTop: 20 }}>
              {[
                ["FROM", "$29"],
                ["DRAFTED IN", "24 hr"],
                ["SETTLES WITHIN", "30 days"],
              ].map(([k, v], i) => (
                <div key={k} style={{ paddingLeft: i ? 18 : 0, borderLeft: i ? "1px solid rgba(255,255,255,0.12)" : "none" }}>
                  <div style={{ font: `500 10px/1 ${BODY_FONT}`, letterSpacing: "0.18em", color: "rgba(255,255,255,0.5)", marginBottom: 8 }}>{k}</div>
                  <div className="firm-h firm-h-light" style={{ font: `500 18px/1 ${HEAD_FONT}`, color: "#fff" }}>{v}</div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div style={{ marginTop: "auto", paddingTop: 32, display: "flex", gap: 18, alignItems: "center", flexWrap: "wrap" }}>
              <Link href="/demand-letter" style={{ textDecoration: "none" }}>
                <FirmBtn kind="accent">Generate My Demand Letter</FirmBtn>
              </Link>
              <a
                href="/demand-letter"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  font: `500 14px/1 ${BODY_FONT}`,
                  color: "rgba(255,255,255,0.75)",
                  textDecoration: "none",
                  padding: "8px 4px",
                }}
              >
                See a sample letter <Arrow color="rgba(255,255,255,0.75)" />
              </a>
            </div>
          </div>

          {/* Right — rotated letter mockup + floating testimonial chip */}
          <div
            style={{
              background: "rgba(255,255,255,0.03)",
              padding: "44px",
              borderLeft: "1px solid rgba(255,255,255,0.10)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              minHeight: 520,
            }}
          >
            <div style={{ transform: "rotate(-2deg)", width: "85%" }}>
              <div style={{ background: "#fdfaf3", boxShadow: "0 24px 60px -20px rgba(0,0,0,0.45)", padding: "32px 36px", font: `12px/1.55 ${SERIF_FONT}`, color: "#1a1612", position: "relative" }}>
                <div style={{ position: "absolute", top: 18, right: 18, padding: "4px 10px", background: C.accent, color: "#fff", font: `500 9px/1 ${BODY_FONT}`, letterSpacing: "0.18em" }}>
                  CERTIFIED · {issue.demand.letter.certifiedNum}
                </div>
                <div style={{ font: `500 9px/1 ${BODY_FONT}`, letterSpacing: "0.22em", color: C.accent, marginBottom: 14 }}>EXAMPLE</div>
                <div style={{ font: `10px/1 ${BODY_FONT}`, color: "#7a7165", marginBottom: 10 }}>{issue.demand.letter.date}</div>
                <div style={{ marginBottom: 10, fontSize: 11 }}>
                  <strong style={{ fontWeight: 600 }}>{issue.demand.letter.recipientName}</strong>
                  <br />
                  {issue.demand.letter.recipientAddress}
                </div>
                <div style={{ marginBottom: 10, fontSize: 11 }}>
                  <strong style={{ fontWeight: 600 }}>Re:</strong> {issue.demand.letter.reLine}
                </div>
                <div style={{ fontSize: 11, marginBottom: 10 }}>
                  {issue.demand.letter.bodyParagraphs.slice(0, 2).map((p, i) => (
                    <p key={i} style={{ margin: "0 0 8px" }} dangerouslySetInnerHTML={{ __html: p }} />
                  ))}
                  <ol style={{ margin: "6px 0 8px 16px", padding: 0 }}>
                    {issue.demand.letter.demandList.slice(0, 3).map((d, i) => (
                      <li key={i} style={{ margin: "0 0 4px" }} dangerouslySetInnerHTML={{ __html: d }} />
                    ))}
                  </ol>
                </div>
                <div style={{ marginTop: 14, font: `italic 13px ${SERIF_FONT}`, color: C.accent }}>{issue.demand.letter.signatory}</div>
              </div>
            </div>

            {/* Floating testimonial chip */}
            <div
              style={{
                position: "absolute",
                bottom: 28,
                right: 28,
                background: "#fff",
                color: C.dark,
                padding: "16px 18px",
                maxWidth: 280,
                boxShadow: "0 20px 50px -10px rgba(0,0,0,0.5)",
              }}
            >
              <div style={{ font: `500 10px/1 ${BODY_FONT}`, letterSpacing: "0.18em", color: C.accent }}>★★★★★</div>
              <p style={{ font: `italic 13.5px/1.4 ${HEAD_FONT}`, margin: "8px 0 0", color: C.dark }}>
                &ldquo;The letter alone got them to settle in under two weeks.&rdquo;
              </p>
              <div style={{ font: `11.5px/1.4 ${BODY_FONT}`, color: "rgba(14,18,24,0.6)", marginTop: 6 }}>
                Devon T. · Won $3,200, Texas
              </div>
            </div>
          </div>
        </div>

        {/* OR rail */}
        <div style={{ display: "flex", alignItems: "center", gap: 20, margin: "36px 0 20px" }}>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.12)" }} />
          <div style={{ font: `500 11px/1 ${BODY_FONT}`, letterSpacing: "0.28em", color: "rgba(255,255,255,0.45)" }}>OR PICK A DIFFERENT PATH</div>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.12)" }} />
        </div>

        {/* Secondary path tiles */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {[
            {
              num: "02",
              tag: "PATH B",
              title: "Check My Case Strength",
              desc: "Not sure if it's worth pursuing? Free 90-second read on viability.",
              price: "Free",
              cta: "Run my score",
              href: "/case-score",
            },
            {
              num: "03",
              tag: "PATH C",
              title: "File Your Claim",
              desc: "Skip the letter — county-specific small-claims forms drafted in 48 hours.",
              price: "From $79",
              cta: "Go to filing",
              href: "/filing-kit",
            },
          ].map((p) => (
            <a
              key={p.tag}
              href={p.href}
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.10)",
                padding: "28px 30px",
                display: "grid",
                gridTemplateColumns: "auto 1fr auto",
                gap: 22,
                alignItems: "center",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <div className="firm-h firm-h-light" style={{ font: `300 44px/0.9 ${HEAD_FONT}`, letterSpacing: "-0.03em", color: "rgba(255,255,255,0.35)" }}>
                {p.num}
              </div>
              <div>
                <div style={{ font: `500 11px/1 ${BODY_FONT}`, letterSpacing: "0.22em", color: "rgba(255,255,255,0.55)", marginBottom: 8 }}>
                  {p.tag} · {p.price}
                </div>
                <div style={{ font: `500 20px/1.2 ${HEAD_FONT}`, color: "#fff" }}>{p.title}</div>
                <div style={{ font: `13px/1.5 ${BODY_FONT}`, color: "rgba(255,255,255,0.65)", marginTop: 6 }}>{p.desc}</div>
              </div>
              <span
                style={{
                  background: "transparent",
                  color: "#fff",
                  border: "1px solid rgba(255,255,255,0.4)",
                  padding: "12px 16px",
                  font: `500 12.5px/1 ${BODY_FONT}`,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  whiteSpace: "nowrap",
                }}
              >
                {p.cta} <Arrow color="#fff" />
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS — horizontal timeline with connecting line + dark icon nodes */}
      <section id="how" style={{ padding: `100px ${PAD_X}` }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: 60, marginBottom: 64 }}>
          <div>
            <div style={{ ...eyebrow, marginBottom: 18 }}>PROCESS</div>
            <h2 className="firm-h" style={H2}>
              {issue.fileSteps.h2.pre}<em>{issue.fileSteps.h2.em}</em>{issue.fileSteps.h2.post ?? ""}
            </h2>
          </div>
          <p style={{ ...body, alignSelf: "end" }}>{issue.fileSteps.lede}</p>
        </div>

        {/* Timeline track: outlined icon nodes (hover fills solid dark) +
            dashed arrows pointing from each step to the next */}
        {(() => {
          const STEP_ICONS: ((size: number) => React.ReactElement)[] = [
            // 01 · file
            (size) => (
              <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M5 3 L15 3 L19 7 L19 21 L5 21 Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                <path d="M15 3 L15 7 L19 7" stroke="currentColor" strokeWidth="1.6" />
                <line x1="8" y1="12" x2="16" y2="12" stroke="currentColor" strokeWidth="1.6" />
                <line x1="8" y1="15" x2="16" y2="15" stroke="currentColor" strokeWidth="1.6" />
                <line x1="8" y1="18" x2="12" y2="18" stroke="currentColor" strokeWidth="1.6" />
              </svg>
            ),
            // 02 · mail
            (size) => (
              <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
                <rect x="3" y="6" width="18" height="13" stroke="currentColor" strokeWidth="1.6" />
                <path d="M3 7 L12 14 L21 7" stroke="currentColor" strokeWidth="1.6" />
              </svg>
            ),
            // 03 · gavel
            (size) => (
              <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
                <rect x="9" y="2.5" width="9" height="4" transform="rotate(45 13.5 4.5)" stroke="currentColor" strokeWidth="1.6" />
                <line x1="11" y1="9" x2="4" y2="16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                <line x1="3" y1="21" x2="13" y2="21" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            ),
            // 04 · wallet / collection
            (size) => (
              <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
                <rect x="3" y="6" width="18" height="13" stroke="currentColor" strokeWidth="1.6" />
                <path d="M3 9 L21 9" stroke="currentColor" strokeWidth="1.6" />
                <circle cx="17" cy="14" r="1.4" fill="currentColor" />
              </svg>
            ),
            // 05+ · check (fallback)
            (size) => (
              <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M5 12 L10 17 L19 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ),
          ];
          const steps = issue.fileSteps.steps;
          const n = steps.length;
          return (
            <div style={{ position: "relative" }}>
              {/* Hover styles: hovering anywhere on the step (icon OR text)
                  fills the icon. Using a dedicated class so we don't collide
                  with the existing .firm-step rule on service pages. */}
              <style dangerouslySetInnerHTML={{ __html: `
                .firm-process-node {
                  background: ${C.bg};
                  color: ${C.dark};
                  border: 1.5px solid ${C.dark};
                  transition: background 0.18s ease, color 0.18s ease;
                }
                .firm-process-step { cursor: default; }
                .firm-process-step:hover .firm-process-node {
                  background: ${C.dark};
                  color: #fff;
                }
              `}} />

              {/* Dashed arrow connectors — one per gap between consecutive nodes.
                  Icons are left-aligned in their column, so arrows start after the
                  current icon's right edge (column-left + 60px node + 6px ring + 6px gap)
                  and end before the next icon's left edge. */}
              {Array.from({ length: n - 1 }).map((_, i) => {
                const colLeftPct = (i / n) * 100;
                const nextColLeftPct = ((i + 1) / n) * 100;
                return (
                  <div
                    key={i}
                    aria-hidden
                    style={{
                      position: "absolute",
                      top: 30,
                      left: `calc(${colLeftPct}% + 72px)`,
                      right: `calc(${100 - nextColLeftPct}% + 12px)`,
                      display: "flex",
                      alignItems: "center",
                      zIndex: 0,
                    }}
                  >
                    <div style={{ flex: 1, borderTop: `1.2px dashed ${C.line}`, height: 0 }} />
                    <div
                      style={{
                        width: 0,
                        height: 0,
                        borderTop: "5px solid transparent",
                        borderBottom: "5px solid transparent",
                        borderLeft: `7px solid ${C.line}`,
                        marginLeft: -1,
                      }}
                    />
                  </div>
                );
              })}

              <div style={{ display: "grid", gridTemplateColumns: `repeat(${n}, 1fr)`, gap: 0, position: "relative", zIndex: 1 }}>
                {steps.map((s, i) => {
                  const Icon = STEP_ICONS[Math.min(i, STEP_ICONS.length - 1)];
                  return (
                    <div key={s.title} className="firm-process-step" style={{ paddingRight: 24, display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                      <div
                        className="firm-process-node"
                        style={{
                          width: 60,
                          height: 60,
                          borderRadius: "50%",
                          display: "grid",
                          placeItems: "center",
                          marginBottom: 26,
                          boxShadow: `0 0 0 6px ${C.bg}`,
                        }}
                      >
                        {Icon(24)}
                      </div>
                      <div style={{ font: `500 11px/1 ${BODY_FONT}`, color: C.muted, letterSpacing: "0.16em", marginBottom: 12 }}>
                        STEP 0{i + 1}
                      </div>
                      <div style={{ font: `600 20px/1.22 ${HEAD_FONT}`, color: C.fg, letterSpacing: "-0.01em" }}>{s.title}</div>
                      <p style={{ ...body, marginTop: 14, fontSize: 14 }}>{s.body}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })()}

        {/* Aftermath callout — dark band with eyebrow + title + body */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "300px 1fr",
            gap: 40,
            marginTop: 60,
            padding: "32px 36px",
            background: C.dark,
            color: "#fff",
            borderRadius: RAD.card,
            alignItems: "center",
          }}
        >
          <div>
            <div style={{ ...eyebrow, color: C.accentOnDark, marginBottom: 14 }}>{issue.fileSteps.aftermath.tag}</div>
            <div className="firm-h firm-h-light" style={{ font: `500 26px/1.2 ${HEAD_FONT}`, color: "#fff", letterSpacing: "-0.015em" }}>
              {issue.fileSteps.aftermath.title}
            </div>
          </div>
          <div
            className="firm-rich-html on-dark"
            style={{ fontSize: 15, lineHeight: 1.6, alignSelf: "center" }}
            dangerouslySetInnerHTML={{ __html: issue.fileSteps.aftermath.bodyHtml }}
          />
        </div>
      </section>

      {/* EVIDENCE */}
      <section id="evidence" style={{ padding: `100px ${PAD_X}`, background: C.cream }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: 60, marginBottom: 48 }}>
          <div>
            <div style={{ ...eyebrow, marginBottom: 18 }}>WHAT TO GATHER</div>
            <h2 className="firm-h" style={H2}>
              {issue.evidence.h2.pre}<em>{issue.evidence.h2.em}</em>{issue.evidence.h2.post ?? ""}
            </h2>
          </div>
          <p style={{ ...body, alignSelf: "end" }}>{issue.evidence.lede}</p>
        </div>
        {/* 3-col x 2-row bento: cell 0 (photos) spans rows 1-2 of col 1,
            cell 1 in col 2 row 1, cell 2 in col 2 row 2, cell 3 spans rows 1-2 col 3 */}
        <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr 1fr", gridTemplateRows: "220px 220px", gap: 14 }}>
          {issue.evidence.cells.slice(0, 4).map((cell, i) => {
            const placement =
              i === 0 ? { gridColumn: 1, gridRow: "span 2" } :
              i === 1 ? { gridColumn: 2, gridRow: 1 } :
              i === 2 ? { gridColumn: 2, gridRow: 2 } :
              { gridColumn: 3, gridRow: "span 2" };
            return (
              <div
                key={i}
                style={{
                  ...placement,
                  background: C.paper,
                  border: `1px solid ${C.line}`,
                  borderRadius: RAD.card,
                  padding: 18,
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                  <div style={{ width: 22, height: 22, borderRadius: 999, background: C.accent, color: "#fff", display: "grid", placeItems: "center", font: `500 11px/1 ${BODY_FONT}` }}>{i + 1}</div>
                  <div style={{ font: `500 11px/1 ${BODY_FONT}`, color: C.muted, letterSpacing: "0.06em", textTransform: "uppercase" }}>{evidenceTag(cell)}</div>
                </div>
                <div style={{ flex: 1, minHeight: 0, overflow: "hidden" }}>
                  <FirmEvidenceCellView cell={cell} category={category} />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* DEFENSES */}
      <section id="defenses" style={{ padding: `100px ${PAD_X}` }}>
        <div style={{ marginBottom: 48 }}>
          <div style={{ ...eyebrow, marginBottom: 18 }}>BE READY</div>
          <h2 className="firm-h" style={H2}>
            {issue.defenses.h2.pre}<em>{issue.defenses.h2.em}</em>{issue.defenses.h2.post ?? ""}
          </h2>
          <p style={{ ...body, marginTop: 18, maxWidth: 680 }}>{issue.defenses.lede}</p>
        </div>
        <div style={{ display: "grid", gap: 14 }}>
          {issue.defenses.items.map((d, i) => {
            const LeftIcon = [FileText, Mail, ShieldAlert][i % 3];
            const RightIcon = [ShieldCheck, Clock, Scale][i % 3];
            const themes = [
              { tile: "rgba(184,51,31,0.10)", pillBg: "rgba(184,51,31,0.12)", pillColor: C.accent, statusBg: "rgba(184,51,31,0.10)", statusColor: C.accent },
              { tile: "#f3e8d6", pillBg: "#f3e8d6", pillColor: "#8a6e3a", statusBg: "#f3e8d6", statusColor: "#8a6e3a" },
              { tile: "#e6e9d5", pillBg: "#e6e9d5", pillColor: "#5a6b3a", statusBg: "#e6e9d5", statusColor: "#5a6b3a" },
            ];
            const theme = themes[i % 3];
            return (
              <div
                key={d.quote}
                style={{
                  display: "grid",
                  gridTemplateColumns: "auto 1fr auto 1.4fr auto",
                  gap: 28,
                  alignItems: "center",
                  background: C.paper,
                  border: `1px solid ${C.line}`,
                  borderRadius: RAD.card,
                  padding: "24px 28px",
                }}
              >
                {/* Left icon tile — theme-rotating background, muted icon */}
                <div style={{ width: 88, height: 88, borderRadius: 18, background: theme.tile, color: C.muted, display: "grid", placeItems: "center", flexShrink: 0 }}>
                  <LeftIcon size={36} strokeWidth={1.5} aria-hidden />
                </div>

                {/* Quote — no chrome, just italic serif */}
                <div style={{ minWidth: 0 }}>
                  <div style={{ display: "inline-block", padding: "7px 12px", borderRadius: 8, background: theme.pillBg, color: theme.pillColor, font: `700 11px/1 ${BODY_FONT}`, letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 14 }}>
                    {d.pill}
                  </div>
                  <div
                    style={{
                      font: `italic 500 22px/1.2 ${HEAD_FONT}`,
                      color: C.fg,
                      letterSpacing: "-0.015em",
                    }}
                  >
                    <span style={{ font: `600 24px/0.5 ${HEAD_FONT}`, color: C.accent, marginRight: 2 }}>&ldquo;</span>
                    {d.quote}&rdquo;
                  </div>
                </div>

                {/* Arrow divider with vertical separator line */}
                <div style={{ position: "relative", alignSelf: "stretch", display: "flex", alignItems: "center", justifyContent: "center", minHeight: 88, width: 36 }}>
                  <div
                    aria-hidden
                    style={{
                      position: "absolute",
                      top: 0,
                      bottom: 0,
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: 1,
                      background: "rgba(184,51,31,0.4)",
                    }}
                  />
                  <div style={{ position: "relative", zIndex: 2, width: 36, height: 36, borderRadius: 999, background: C.accent, color: "#fff", display: "grid", placeItems: "center", boxShadow: "0 6px 14px -8px rgba(184,51,31,0.6)" }}>
                    <ArrowRight size={18} strokeWidth={2.4} aria-hidden />
                  </div>
                </div>

                {/* Rebuttal */}
                <div>
                  <div style={{ ...eyebrow, color: C.accent, marginBottom: 8 }}>YOUR RESPONSE</div>
                  <div className="firm-rich-html" dangerouslySetInnerHTML={{ __html: d.rebuttal }} />
                </div>

                {/* Right status icon — theme-rotating circle */}
                <div style={{ width: 54, height: 54, borderRadius: 999, background: theme.statusBg, color: theme.statusColor, display: "grid", placeItems: "center", flexShrink: 0 }}>
                  <RightIcon size={22} strokeWidth={1.7} aria-hidden />
                </div>
              </div>
            );
          })}
        </div>

        {/* "Keep it simple" tagline — cream bg, yellow lightbulb circle */}
        <div style={{ display: "flex", gap: 16, alignItems: "center", marginTop: 14, padding: "18px 24px", background: "#fdf9f0", borderRadius: 14, font: `14.5px/1.5 ${BODY_FONT}`, color: C.muted }}>
          <div style={{ width: 44, height: 44, borderRadius: 999, background: "#fde047", color: "#1f1b16", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Lightbulb size={22} strokeWidth={1.8} aria-hidden />
          </div>
          <p style={{ margin: 0 }}><strong style={{ color: C.fg, fontWeight: 700 }}>Keep it simple.</strong> Organized records, clear timelines, and solid evidence are your best defense.</p>
        </div>
      </section>

      {/* OUTCOMES */}
      <section id="outcomes" style={{ padding: `100px ${PAD_X}`, background: C.cream }}>
        <div style={{ marginBottom: 48 }}>
          <div style={{ ...eyebrow, marginBottom: 18 }}>REALISTIC OUTCOMES</div>
          <h2 className="firm-h" style={H2}>
            {issue.outcomes.h2.pre}<em>{issue.outcomes.h2.em}</em>{issue.outcomes.h2.post ?? ""}
          </h2>
          <p style={{ ...body, marginTop: 18, maxWidth: 680 }}>{issue.outcomes.lede}</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {issue.outcomes.bands.map((b) => {
            const color = tierColor(b.tier);
            const TierIcon = b.tier === "low" ? Lightbulb : b.tier === "mid" ? BarChart3 : Trophy;
            return (
              <div key={b.label} style={{ background: C.paper, border: `1px solid ${C.line}`, borderTop: `4px solid ${color}`, borderRadius: RAD.card, padding: 28, position: "relative" }}>
                {/* Tier pill (uppercase) */}
                <div style={{ display: "inline-block", padding: "5px 12px", borderRadius: 999, background: color, color: b.tier === "low" ? C.fg : "#fff", font: `600 11px/1 ${BODY_FONT}`, letterSpacing: "0.16em", textTransform: "uppercase" }}>
                  {b.label}
                </div>
                {/* Tier icon */}
                <div style={{ position: "absolute", top: 24, right: 24, width: 44, height: 44, borderRadius: 999, background: C.cream, color, display: "grid", placeItems: "center" }} aria-hidden>
                  <TierIcon size={22} strokeWidth={1.8} />
                </div>
                <div style={{ font: `600 36px/1.1 ${HEAD_FONT}`, color: C.fg, letterSpacing: "-0.02em", marginTop: 20 }}>{b.range}</div>
                <div style={{ height: 6, background: C.cream, borderRadius: 999, overflow: "hidden", marginTop: 14 }}>
                  <div style={{ height: "100%", width: b.tier === "low" ? "25%" : b.tier === "mid" ? "60%" : "100%", background: color, borderRadius: 999 }} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", font: `11px/1.4 ${BODY_FONT}`, color: C.muted, marginTop: 6 }}>
                  <span>$0</span><span>$5K</span><span>$10K+</span>
                </div>
                <div className="firm-rich-html" style={{ marginTop: 16, fontSize: 14 }} dangerouslySetInnerHTML={{ __html: b.body }} />
              </div>
            );
          })}
        </div>
      </section>

      {/* STATE TABLE */}
      {showStateSection && (
        <section id="state" style={{ padding: `100px ${PAD_X}` }}>
          <div style={{ marginBottom: 48 }}>
            <div style={{ ...eyebrow, marginBottom: 18 }}>STATE-SPECIFIC RULES</div>
            <h2 className="firm-h" style={H2}>
              {issue.stateSection ? (
                <>{issue.stateSection.h2.pre}<em>{issue.stateSection.h2.em}</em>{issue.stateSection.h2.post ?? ""}</>
              ) : (
                <>{issue.breadcrumbLabel} rules, by <em>state</em>.</>
              )}
            </h2>
            <p style={{ ...body, marginTop: 18, maxWidth: 680 }}>
              {issue.stateSection?.lede ??
                `Top ${FEATURED_STATE_SLUGS.length} states by case volume, highlighted in red. Each row shows that state's deadline to sue and statutory penalty for this claim.`}
            </p>
          </div>
          {(() => {
            let rows: { slug: string; state: string; col2: string; col3: string }[];
            if (issue.stateSection?.kind === "rows") {
              rows = issue.stateSection.rows.map((r) => ({ slug: r.slug, state: r.state, col2: r.col2, col3: r.col3 }));
            } else if (featuredClaimRows.length > 0) {
              rows = featuredClaimRows.map((r) => ({ slug: r.slug, state: r.state, col2: r.deadline, col3: r.penalty }));
            } else {
              rows = [];
            }
            const tooltips: Record<string, { title: string; sub?: string }> = {};
            for (const r of rows) tooltips[r.slug] = { title: r.state, sub: r.col3 };
            const featuredSlugs = rows.map((r) => r.slug);
            return (
              <div style={{ background: C.paper, border: `1px solid ${C.line}`, borderRadius: RAD.panel, padding: 32, display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 40 }}>
                <div>
                  <FeaturedUsMap highlightedSlugs={featuredSlugs} tooltips={tooltips} />
                </div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
                    <MapPin size={16} strokeWidth={1.8} color={C.accent} />
                    <div style={{ font: `500 13px/1 ${BODY_FONT}`, color: C.muted, letterSpacing: "0.08em" }}>TOP 10 STATES BY CASE VOLUME</div>
                  </div>
                  <ol style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 0 }}>
                    {rows.map((r, i) => {
                      const isReady = ready.has(r.slug);
                      const inner = (
                        <div style={{ display: "grid", gridTemplateColumns: "28px 1fr auto auto", gap: 14, alignItems: "center", padding: "12px 0", borderTop: i === 0 ? `1px solid ${C.line}` : "none", borderBottom: `1px solid ${C.line}`, opacity: isReady ? 1 : 0.5 }}>
                          <span style={{ font: `500 13px/1 ${BODY_FONT}`, color: C.muted }}>{i + 1}</span>
                          <span style={{ font: `500 15px/1 ${BODY_FONT}`, color: C.fg }}>{r.state}</span>
                          <span style={{ font: `13px/1 ${BODY_FONT}`, color: C.muted }}>{r.col2}</span>
                          <Arrow color={C.muted} />
                        </div>
                      );
                      return (
                        <li key={r.slug}>
                          {isReady ? <Link href={`/small-claims/${r.slug}`} style={{ textDecoration: "none", color: "inherit" }}>{inner}</Link> : <span>{inner}</span>}
                        </li>
                      );
                    })}
                  </ol>
                </div>
              </div>
            );
          })()}
          <Link href="/small-claims" style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 22, font: `500 14px/1 ${BODY_FONT}`, color: C.accent, textDecoration: "none" }}>
            See rules for all 50 states <Arrow color={C.accent} />
          </Link>
        </section>
      )}

      {/* OVER THE CAP */}
      <section id="over-cap" style={{ padding: `100px ${PAD_X}`, background: C.bg, color: C.fg }}>
        {/* Header — single line */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "end", marginBottom: 28 }}>
          <div>
            <div style={{ ...eyebrow, color: C.accent, marginBottom: 14 }}>OVER THE CAP</div>
            <h2 className="firm-h" style={{ font: `500 36px/1.08 ${HEAD_FONT}`, letterSpacing: "-0.025em", margin: 0 }}>
              What if your case is over your state&rsquo;s <em>cap</em>?
            </h2>
          </div>
          <p style={{ ...body, fontSize: 14, maxWidth: 440 }}>
            Small claims caps vary state to state. If your claim is larger, you have two options.
          </p>
        </div>

        {/* Decision fork diagram */}
        <div style={{ position: "relative", padding: "44px 0 0" }}>
          {/* Central node */}
          <div
            style={{
              position: "relative",
              margin: "0 auto 32px",
              width: "fit-content",
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: "14px 22px",
              background: C.dark,
              color: "#fff",
              zIndex: 2,
            }}
          >
            <div style={{ width: 8, height: 8, borderRadius: 999, background: C.accentOnDark }} />
            <div className="firm-h firm-h-light" style={{ font: `500 15px/1 ${HEAD_FONT}`, color: "#fff" }}>
              Your case is <em>over the cap.</em>
            </div>
          </div>

          {/* Fork lines */}
          <svg width="100%" height="80" viewBox="0 0 1000 80" preserveAspectRatio="none" style={{ display: "block", margin: "0 0 0" }}>
            <path d="M500 0 L500 24 L160 24 L160 80" stroke={C.fg} strokeWidth="1.4" fill="none" />
            <path d="M500 24 L840 24 L840 80" stroke={C.muted} strokeWidth="1.4" fill="none" strokeDasharray="4 4" />
            <text x="320" y="18" fill={C.muted} fontFamily="Geist, sans-serif" fontSize="10" letterSpacing="2">STAY IN SMALL CLAIMS</text>
            <text x="595" y="18" fill={C.muted} fontFamily="Geist, sans-serif" fontSize="10" letterSpacing="2">ESCALATE</text>
          </svg>

          {/* Two branches */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
            {[
              {
                num: "OPTION 1",
                title: "Waive the excess",
                desc: "Stay in small claims and forfeit anything above your state's cap. Fast, cheap, no lawyer. Most plaintiffs in this situation pick this.",
                tag: "MOST PICK",
                stats: [["Cost", "$"], ["Lawyer", "Not needed"], ["Speed", "Fast"]] as [string, string][],
                primary: true,
              },
              {
                num: "OPTION 2",
                title: "File in civil court",
                desc: "Pursue the full amount in regular civil court. Slower, costlier, lawyer recommended.",
                tag: null,
                stats: [["Cost", "$$$"], ["Lawyer", "Recommended"], ["Speed", "Slow"]] as [string, string][],
                primary: false,
              },
            ].map((o) => (
              <div
                key={o.num}
                style={{
                  padding: "26px 28px",
                  background: o.primary ? C.accentOnDark : "transparent",
                  color: C.fg,
                  border: o.primary ? "none" : `1px dashed ${C.muted}`,
                }}
              >
                <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 10 }}>
                  <div style={{ font: `500 10px/1 ${BODY_FONT}`, letterSpacing: "0.22em", color: o.primary ? "rgba(0,0,0,0.55)" : C.muted }}>
                    {o.num}
                  </div>
                  {o.tag && (
                    <span style={{ font: `500 9.5px/1 ${BODY_FONT}`, letterSpacing: "0.18em", color: o.primary ? "#fff" : C.fg, background: o.primary ? C.dark : "transparent", padding: "3px 7px" }}>
                      {o.tag}
                    </span>
                  )}
                </div>
                <div style={{ font: `500 24px/1.15 ${HEAD_FONT}`, letterSpacing: "-0.02em", color: C.fg }}>
                  {o.title}
                </div>
                <p style={{ font: `13.5px/1.55 ${BODY_FONT}`, color: o.primary ? "rgba(0,0,0,0.7)" : C.muted, marginTop: 10, marginBottom: 0 }}>
                  {o.desc}
                </p>
                <div style={{ marginTop: 16, display: "flex", gap: 24, font: `12px/1.4 ${BODY_FONT}`, color: o.primary ? "rgba(0,0,0,0.6)" : C.muted }}>
                  {o.stats.map(([k, v]) => (
                    <div key={k}>
                      <div style={{ fontSize: 10, letterSpacing: "0.18em", marginBottom: 4 }}>{k.toUpperCase()}</div>
                      <div style={{ font: `500 14px/1 ${HEAD_FONT}`, color: C.fg }}>{v}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Range bar tucked under */}
          <div style={{ marginTop: 28, paddingTop: 18, borderTop: `1px solid ${C.line}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ font: `13px/1 ${BODY_FONT}`, color: C.muted }}>
              <span style={{ font: `500 15px/1 ${HEAD_FONT}`, color: C.fg }}>{fmtCap(minCap)}</span> –{" "}
              <span style={{ font: `500 15px/1 ${HEAD_FONT}`, color: C.fg }}>{fmtCap(maxCap)}</span>
              <span style={{ marginLeft: 8 }}>range of state caps across the U.S.</span>
            </div>
            <Link href="/small-claims" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 10, padding: "10px 16px", border: `1px solid ${C.fg}`, color: C.fg, font: `500 13px/1 ${BODY_FONT}` }}>
              Find your state&rsquo;s cap <Arrow color={C.fg} />
            </Link>
          </div>
        </div>
      </section>

      {/* ALTERNATIVES */}
      <section id="alternatives" style={{ padding: `100px ${PAD_X}` }}>
        <div style={{ marginBottom: 48 }}>
          <div style={{ ...eyebrow, marginBottom: 18 }}>ALTERNATIVES TO SUING</div>
          <h2 className="firm-h" style={H2}>
            {issue.alternatives.h2.pre}<em>{issue.alternatives.h2.em}</em>{issue.alternatives.h2.post ?? ""}
          </h2>
          <p style={{ ...body, marginTop: 18, maxWidth: 680 }}>{issue.alternatives.lede}</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {issue.alternatives.cards.map((a) => {
            const tierIcon = a.pillTier === "good" ? <CheckCircle2 size={18} strokeWidth={1.8} /> : a.pillTier === "primary" ? <Scale size={18} strokeWidth={1.8} /> : <AlertTriangle size={18} strokeWidth={1.8} />;
            const tierBg = a.pillTier === "good" ? "#5fa572" : a.pillTier === "primary" ? C.accent : "#d4a04f";
            return (
              <div key={a.title} style={{ background: C.paper, border: `1px solid ${C.line}`, borderRadius: RAD.card, padding: 28 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 999, background: tierBg, color: "#fff", display: "grid", placeItems: "center" }}>{tierIcon}</div>
                  <div style={{ display: "inline-block", padding: "6px 12px", borderRadius: 999, background: C.cream, font: `700 11.5px/1 ${BODY_FONT}`, color: tierBg, letterSpacing: "0.16em", textTransform: "uppercase" }}>{a.pillLabel}</div>
                </div>
                <div style={{ font: `600 20px/1.25 ${HEAD_FONT}`, color: C.fg, letterSpacing: "-0.005em" }}>{a.title}</div>
                <div style={{ marginTop: 18, font: `14px/1.55 ${BODY_FONT}`, color: C.muted }}>
                  <p style={{ margin: 0 }}><strong style={{ color: C.fg }}>When it fits:</strong> {a.whenItFits}</p>
                  <div style={{ height: 1, background: C.line, margin: "12px 0" }} />
                  <p style={{ margin: 0 }}><strong style={{ color: C.fg }}>Tradeoff:</strong> {a.tradeoff}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA + RECEIPT */}
      <section id="cta" style={{ padding: `100px ${PAD_X}` }}>
        <div style={{ background: C.dark, color: "#fff", padding: 56, borderRadius: RAD.panel, display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 60, alignItems: "center" }}>
          <div>
            <div style={{ ...eyebrow, color: "rgba(255,255,255,0.55)", marginBottom: 18 }}>MOVE FORWARD</div>
            <h2 className="firm-h firm-h-light" style={{ ...H2, color: "#fff", fontSize: 40 }}>
              {issue.cta.h2.pre}<em>{issue.cta.h2.em}</em>{issue.cta.h2.post ?? ""}
            </h2>
            <p style={{ font: `15px/1.6 ${BODY_FONT}`, color: "rgba(255,255,255,0.7)", marginTop: 16, maxWidth: 460 }}>{issue.cta.body}</p>
            <div style={{ display: "flex", gap: 14, marginTop: 28 }}>
              <Link href="/demand-letter" style={{ textDecoration: "none" }}><FirmBtn kind="accent">Generate a Demand Letter</FirmBtn></Link>
              <Link href="/case-score" style={{ textDecoration: "none" }}><FirmBtn kind="ghostDark">Check Case Strength</FirmBtn></Link>
            </div>
          </div>
          {/* Receipt mockup */}
          <div style={{ background: "#fdfaf3", color: C.fg, padding: 32, borderRadius: RAD.card, font: `13px/1.5 ${SERIF_FONT}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 18, paddingBottom: 12, borderBottom: `1px dashed ${C.line}` }}>
              <span style={{ ...eyebrow, color: C.muted }}>ESTIMATED RECOVERY</span>
              <em style={{ font: `italic 11px/1 ${SERIF_FONT}`, color: C.muted }}>{issue.cta.receipt.label}</em>
            </div>
            {issue.cta.receipt.items.map((it) => (
              <div key={it.label} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px dotted ${C.line}` }}>
                <span style={{ font: `13px ${BODY_FONT}`, color: C.muted }}>{it.label}</span>
                <strong style={{ font: `600 13px ${BODY_FONT}`, color: C.fg }}>{it.amount}</strong>
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "space-between", padding: "14px 0 0", marginTop: 8, borderTop: `2px solid ${C.fg}` }}>
              <span style={{ font: `600 14px ${BODY_FONT}`, color: C.fg }}>{issue.cta.receipt.totalLabel}</span>
              <strong style={{ font: `700 22px ${HEAD_FONT}`, color: C.accent, letterSpacing: "-0.01em" }}>{issue.cta.receipt.total}</strong>
            </div>
            <p style={{ font: `italic 12px/1.5 ${SERIF_FONT}`, color: C.muted, marginTop: 14 }}>{issue.cta.receipt.note}</p>
          </div>
        </div>
      </section>

      <FaqSection
        title={<>{issue.breadcrumbLabel} <em>questions</em>.</>}
        subtitle={`The questions ${category.audienceLabel} actually ask before filing.`}
        faqs={issue.faqs}
        background={C.cream}
      />

      {/* RELATED */}
      {siblings.length > 0 && (
        <section id="related" style={{ padding: `100px ${PAD_X}` }}>
          <div style={{ marginBottom: 48 }}>
            <div style={{ ...eyebrow, marginBottom: 18 }}>RELATED CLAIMS</div>
            <h2 className="firm-h" style={H2}>Other ways to <em>{category.relatedH2Em}</em>.</h2>
            <p style={{ ...body, marginTop: 18, maxWidth: 680 }}>
              If your dispute is not about {issue.short.toLowerCase()}, one of these guides probably fits.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
            {siblings.map((sib) => (
              <Link
                key={sib.slug}
                href={`/small-claims/${category.categorySlug}/${sib.slug}`}
                className="firm-related-card"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr auto",
                  gap: 18,
                  alignItems: "center",
                  background: C.paper,
                  border: `1px solid ${C.line}`,
                  padding: 24,
                  borderRadius: RAD.card,
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <div>
                  <div style={{ font: `500 11px/1 ${BODY_FONT}`, color: C.accent, letterSpacing: "0.1em", marginBottom: 10 }}>{sib.short.toUpperCase()}</div>
                  <div style={{ font: `600 17px/1.3 ${HEAD_FONT}`, color: C.fg, letterSpacing: "-0.005em" }}>
                    {sib.hero.h1.pre}<em style={{ color: C.accent }}>{sib.hero.h1.em}</em>{sib.hero.h1.post ?? ""}
                  </div>
                </div>
                <span className="firm-related-arrow" style={{ display: "inline-flex", color: C.muted }}>
                  <Arrow color="currentColor" />
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

function evidenceTag(cell: EvidenceCell): string {
  const k = cell.kind;
  const baseLabels: Record<string, string> = {
    photos: "Photos", texts: "Texts", document: "Document", receipt: "Receipt",
    paystub: "Paystub", letter: "Letter", timeLog: "Time log", handbook: "Handbook",
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (cell as any).tag ?? baseLabels[k] ?? "Evidence";
}

function FirmEvidenceCellView({ cell, category }: { cell: EvidenceCell; category: CategoryMeta }) {
  switch (cell.kind) {
    case "photos":
      return (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 8 }}>
          {cell.photos.map((p) => (
            <div
              key={p.id}
              title={p.cap}
              style={{
                aspectRatio: "1 / 1",
                background: `url(https://images.unsplash.com/photo-${p.id}?w=400&h=400&fit=crop) center/cover`,
                borderRadius: 6,
              }}
            />
          ))}
        </div>
      );
    case "texts":
      return (
        <div style={{ display: "grid", gap: 8 }}>
          {cell.texts.map((t, i) => (
            <div
              key={i}
              style={{
                alignSelf: t.dir === "in" ? "flex-start" : "flex-end",
                background: t.dir === "in" ? "#e7dfd0" : C.accent,
                color: t.dir === "in" ? C.fg : "#fff",
                padding: "8px 14px",
                borderRadius: 14,
                maxWidth: "80%",
                font: `13px/1.4 ${BODY_FONT}`,
              }}
            >
              {t.text}
            </div>
          ))}
        </div>
      );
    case "document":
      return (
        <div style={{ background: "#fdfaf3", padding: 18, borderRadius: 6, fontFamily: SERIF_FONT, color: C.fg }}>
          <div style={{ height: 4, background: "#d8d0c1", borderRadius: 2, margin: "0 0 8px" }} />
          <div style={{ height: 4, background: "#d8d0c1", borderRadius: 2, width: "70%", margin: "0 0 8px" }} />
          <div style={{ height: 4, background: "#d8d0c1", borderRadius: 2, margin: "0 0 8px" }} />
          <div style={{ height: 4, background: "#d8d0c1", borderRadius: 2, width: "65%", margin: "0 0 16px" }} />
          <div style={{ font: `italic 13px/1.4 ${SERIF_FONT}`, color: C.accent }}>
            /s/ {category.signatoryLabel} signature
          </div>
        </div>
      );
    case "receipt":
      return (
        <div style={{ background: "#fdfaf3", padding: 18, borderRadius: 6, font: `12px/1.5 ${SERIF_FONT}`, color: C.fg }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <strong style={{ font: `600 13px/1 ${BODY_FONT}` }}>{cell.vendor}</strong>
            <div style={{ font: `11px ${BODY_FONT}`, color: C.muted, marginTop: 2 }}>{cell.vendorAddr}</div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", font: `10px ${BODY_FONT}`, color: C.muted, marginBottom: 10 }}>
            <span>{cell.receiptNum}</span><span>{cell.date}</span>
          </div>
          <div style={{ height: 1, borderTop: `1px dashed ${C.line}`, margin: "0 0 8px" }} />
          {cell.lineItems.map((li) => (
            <div key={li.label} style={{ display: "flex", justifyContent: "space-between", padding: "3px 0" }}>
              <span>{li.label}</span><span>{li.amount}</span>
            </div>
          ))}
          <div style={{ height: 1, borderTop: `1px dashed ${C.line}`, margin: "8px 0" }} />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>Subtotal</span><span>{cell.subtotal}</span>
          </div>
          <div style={{ height: 1, borderTop: `1px solid ${C.fg}`, margin: "8px 0" }} />
          <div style={{ display: "flex", justifyContent: "space-between", font: `600 13px ${BODY_FONT}` }}>
            <span>TOTAL</span><span>{cell.total}</span>
          </div>
          <div style={{ textAlign: "center", marginTop: 10, padding: "4px 12px", border: `2px solid ${C.accent}`, color: C.accent, font: `600 10px/1 ${BODY_FONT}`, letterSpacing: "0.18em", display: "inline-block" }}>
            {cell.stamp ?? "PAID"}
          </div>
          <div style={{ font: `italic 11px ${SERIF_FONT}`, color: C.muted, marginTop: 8, textAlign: "center" }}>{cell.footer}</div>
        </div>
      );
    case "paystub":
      return (
        <div style={{ background: "#fdfaf3", padding: 18, borderRadius: 6, font: `12px/1.5 ${SERIF_FONT}`, color: C.fg }}>
          <strong style={{ font: `600 13px/1 ${BODY_FONT}`, display: "block", marginBottom: 4 }}>{cell.employer}</strong>
          <div style={{ font: `11px ${BODY_FONT}`, color: C.muted, marginBottom: 10 }}>{cell.employerAddr}</div>
          <div style={{ display: "flex", justifyContent: "space-between", font: `10px ${BODY_FONT}`, color: C.muted, marginBottom: 10 }}>
            <span>{cell.payPeriod}</span><span>{cell.payDate}</span>
          </div>
          <div style={{ height: 1, borderTop: `1px solid ${C.line}`, margin: "0 0 8px" }} />
          <div style={{ font: `500 11px/1 ${BODY_FONT}`, color: C.muted, marginBottom: 4 }}>Earnings</div>
          {cell.earnings.map((e) => (
            <div key={e.label} style={{ display: "flex", justifyContent: "space-between", padding: "3px 0" }}>
              <span>{e.label}</span><span>{e.amount}</span>
            </div>
          ))}
          <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderTop: `1px solid ${C.line}`, marginTop: 6, font: `600 12px ${BODY_FONT}` }}>
            <span>Gross</span><span>{cell.gross}</span>
          </div>
          <div style={{ height: 1, borderTop: `1px solid ${C.line}`, margin: "8px 0" }} />
          <div style={{ display: "flex", justifyContent: "space-between", font: `600 13px ${BODY_FONT}`, color: C.accent }}>
            <span>Net pay</span><span>{cell.net}</span>
          </div>
        </div>
      );
    case "letter":
      return (
        <div style={{ background: "#fdfaf3", padding: 18, borderRadius: 6, font: `12px/1.55 ${SERIF_FONT}`, color: C.fg }}>
          <div style={{ font: `600 11px/1 ${BODY_FONT}`, color: C.accent, letterSpacing: "0.18em", marginBottom: 10 }}>{cell.letterhead}</div>
          <div style={{ font: `11px ${BODY_FONT}`, color: C.muted, marginBottom: 10 }}>{cell.date}</div>
          <div style={{ marginBottom: 10 }}>
            <strong style={{ fontWeight: 600 }}>{cell.recipientName}</strong>
            {cell.recipientAddress && <div style={{ font: `11px ${BODY_FONT}`, color: C.muted }}>{cell.recipientAddress}</div>}
          </div>
          {cell.reLine && (
            <div style={{ marginBottom: 10 }}>
              <strong style={{ fontWeight: 600 }}>Re:</strong> {cell.reLine}
            </div>
          )}
          {cell.bodyParagraphs.slice(0, 2).map((p, i) => (
            <p key={i} style={{ margin: "0 0 8px" }} dangerouslySetInnerHTML={{ __html: p }} />
          ))}
          <div style={{ marginTop: 14, font: `italic 13px ${SERIF_FONT}`, color: C.accent }}>{cell.signatory}</div>
          {cell.signatoryTitle && <div style={{ font: `10px ${BODY_FONT}`, color: C.muted }}>{cell.signatoryTitle}</div>}
        </div>
      );
    case "timeLog":
      return (
        <div style={{ background: "#fdfaf3", padding: 16, borderRadius: 6, font: `12px/1.5 ${BODY_FONT}`, color: C.fg }}>
          <div style={{ font: `600 12px ${BODY_FONT}`, color: C.accent, marginBottom: 10 }}>Week of {cell.weekOf}</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 50px 50px 50px", gap: 6, font: `10px ${BODY_FONT}`, color: C.muted, paddingBottom: 6, borderBottom: `1px solid ${C.line}` }}>
            <span>Date</span><span>In</span><span>Out</span><span>Hours</span>
          </div>
          {cell.rows.map((r) => (
            <div key={r.date} style={{ display: "grid", gridTemplateColumns: "1fr 50px 50px 50px", gap: 6, padding: "4px 0" }}>
              <span>{r.date}</span><span>{r.in}</span><span>{r.out}</span><span>{r.hours}</span>
            </div>
          ))}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 50px 50px 50px", gap: 6, padding: "6px 0", borderTop: `1px solid ${C.fg}`, marginTop: 4, font: `600 12px ${BODY_FONT}` }}>
            <span>{cell.totalLabel}</span><span /><span /><span>{cell.totalHours}</span>
          </div>
        </div>
      );
    case "handbook":
      return (
        <div style={{ background: "#fdfaf3", padding: 18, borderRadius: 6, font: `12px/1.55 ${BODY_FONT}`, color: C.fg }}>
          <div style={{ font: `500 11px/1 ${BODY_FONT}`, color: C.muted, letterSpacing: "0.08em", marginBottom: 8 }}>{cell.documentTitle}</div>
          <div style={{ font: `600 14px/1.3 ${HEAD_FONT}`, color: C.fg, marginBottom: 10 }}>{cell.sectionTitle}</div>
          {cell.bodyParagraphs.slice(0, 2).map((p, i) => (
            <p key={i} style={{ margin: "0 0 8px" }}>{p}</p>
          ))}
          {cell.highlight && (
            <p style={{ margin: "8px 0 0", padding: "8px 12px", background: C.cream, borderLeft: `3px solid ${C.accent}`, fontWeight: 500 }}>
              {cell.highlight}
            </p>
          )}
        </div>
      );
  }
}
