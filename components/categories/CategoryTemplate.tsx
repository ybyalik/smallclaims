// Shared template for category hub pages (/small-claims/landlord, /contractor, etc.).
// Renders the full section stack from a CategoryHubData object so each hub page
// is just a thin data file plus <CategoryTemplate data={...} />.

import Link from "next/link";
import { X } from "lucide-react";
import HeroCta from "../HeroCta";
import HeroStatePins from "../HeroStatePins";
import CtaStepCard from "../CtaStepCard";
import Breadcrumbs from "../Breadcrumbs";
import { availableStateSlugs } from "../../lib/state-data";
import { STATES } from "../../lib/states";
import type { CategoryHubData } from "../../lib/category-hubs/types";

const ARROW_SVG = (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export default async function CategoryTemplate({ data }: { data: CategoryHubData }) {
  const ready = new Set(await availableStateSlugs());
  const featured = data.featuredStateSlugs
    .map((slug) => STATES.find((s) => s.slug === slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s) && ready.has(s!.slug));

  const faqIndices = data.schemaFaqIndices ?? data.faqs.map((_, i) => i);
  const SITE_URL = "https://civilcase.com";
  const pageUrl = `${SITE_URL}/small-claims/${data.categorySlug}`;
  const readyIssues = data.issues.filter((i) => i.ready);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${pageUrl}#collection`,
        url: pageUrl,
        name: data.schemaArticle.headline,
        description: data.schemaArticle.description,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: "en-US",
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: readyIssues.length,
          itemListElement: readyIssues.map((i, idx) => ({
            "@type": "ListItem",
            position: idx + 1,
            url: `${SITE_URL}/small-claims/${data.urlPrefix}${i.slug}`,
            name: i.title,
          })),
        },
      },
      {
        "@type": "Article",
        "@id": `${pageUrl}#article`,
        headline: data.schemaArticle.headline,
        description: data.schemaArticle.description,
        author: { "@type": "Organization", name: "CivilCase" },
        publisher: { "@id": `${SITE_URL}/#organization` },
        mainEntityOfPage: { "@id": `${pageUrl}#collection` },
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: faqIndices.map((i) => ({
          "@type": "Question",
          name: data.faqs[i].q,
          acceptedAnswer: { "@type": "Answer", text: data.faqs[i].a },
        })),
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: ["#faq", ".cat-faq"],
        },
      },
    ],
  };

  return (
    <main className="cat-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="wrap">
        <Breadcrumbs
          items={[
            { href: "/small-claims", label: "Small Claims" },
            { label: data.breadcrumbLabel },
          ]}
        />

        {/* HERO */}
        <header className="cat-hero-2col">
          <div className="cat-hero-copy">
            <h1>
              {data.hero.h1.pre}
              <em>{data.hero.h1.em}</em>
              {data.hero.h1.post ?? ""}
            </h1>
            <p className="cat-lede">{data.hero.lede}</p>
            <div className="hero-ctas">
              <HeroCta href="/case-score" variant="green" icon="case-score">Check My Case (Free)</HeroCta>
              <HeroCta href="/demand-letter" variant="cream" icon="demand-letter">Send a Demand Letter</HeroCta>
            </div>
          </div>
          <HeroStatePins />
        </header>

        {/* ISSUE CARDS */}
        <section className="cat-section">
          <div className="sec-head" style={{ textAlign: "left", marginBottom: 28 }}>
            <h2 style={{ margin: 0 }}>
              {data.issuesIntro.h2.pre}
              <em>{data.issuesIntro.h2.em}</em>
              {data.issuesIntro.h2.post ?? ""}
            </h2>
            <p style={{ marginTop: 12, marginLeft: 0, maxWidth: "60ch" }}>{data.issuesIntro.paragraph}</p>
          </div>
          <div className="photo-grid">
            {data.issues.map((i, idx) => {
              const photo = data.issuePhotos[idx % data.issuePhotos.length];
              const inner = (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`https://images.unsplash.com/photo-${photo}?w=600&h=600&fit=crop`} alt="" className="photo-card-img" />
                  <span className="photo-card-icon" aria-hidden="true">{i.icon}</span>
                  <div className="photo-card-overlay">
                    <h3>{i.title}</h3>
                    <p>{i.blurb}</p>
                  </div>
                  <span className="photo-card-arrow" aria-hidden="true">{ARROW_SVG}</span>
                </>
              );
              return i.ready ? (
                <Link key={i.slug} href={`/small-claims/${data.urlPrefix}${i.slug}`} className="photo-card">
                  {inner}
                </Link>
              ) : (
                <div key={i.slug} className="photo-card soon" aria-disabled="true">
                  {inner}
                </div>
              );
            })}
            <Link href="/case-score" className="photo-card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=600&fit=crop" alt="" className="photo-card-img" />
              <span className="photo-card-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 2" />
                </svg>
              </span>
              <div className="photo-card-overlay">
                <h3>{data.somethingElseCard.title}</h3>
                <p>{data.somethingElseCard.blurb}</p>
              </div>
              <span className="photo-card-arrow" aria-hidden="true">{ARROW_SVG}</span>
            </Link>
          </div>
        </section>

        {/* HOW SMALL CLAIMS HANDLES X */}
        <section className="cat-section">
          <div className="sec-head" style={{ textAlign: "left", marginBottom: 24 }}>
            <h2 className="cat-h2" style={{ margin: 0 }}>
              How small claims handles <em>{data.belongs.h2Em}</em>.
            </h2>
            <p style={{ margin: "10px 0 0", maxWidth: "60ch", color: "var(--ink-2)" }}>{data.belongs.intro}</p>
          </div>

          <div className="cat-ps">
            <div className="cat-ps-grid">
              <div className="cat-ps-col">
                <h3>Belongs in small claims</h3>
                {data.belongs.inItems.map((it, idx) => (
                  <div key={idx} className="cat-ps-item">
                    <div className="cat-ps-num">{String(idx + 1).padStart(2, "0")}</div>
                    <div className="cat-ps-text">
                      <strong>{it.titleBold}</strong> {it.rest}
                    </div>
                  </div>
                ))}
              </div>

              <div className="cat-ps-orb" aria-hidden="true">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/cc-white-border.webp" alt="" />
              </div>

              <div className="cat-ps-col dark">
                <h3>Doesn&rsquo;t belong here</h3>
                {data.belongs.outItems.map((it, idx) => (
                  <div key={idx} className="cat-ps-item">
                    <div className="cat-ps-num"><X size={16} strokeWidth={2.4} aria-hidden /></div>
                    <div className="cat-ps-text">
                      <strong>{it.titleBold}</strong> {it.rest}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* DAMAGES */}
        <section className="cat-section">
          <div className="cat-stack-head">
            <span className="eyebrow">Damages</span>
            <h2>What can you <em>recover</em>?</h2>
            <p>{data.damages.intro}</p>
          </div>

          <div className="cat-recovery">
            <div className="cat-recovery-rows">
              {data.damages.rows.map((row, idx) => (
                <div key={idx} className={`cat-recovery-row${row.accent ? " accent" : ""}`}>
                  <span className="cat-recovery-icon" aria-hidden="true">{row.iconSvg}</span>
                  <span className="cat-recovery-num" aria-hidden="true">{String(idx + 1).padStart(2, "0")}</span>
                  <div className="cat-recovery-label">
                    <span className={`cat-recovery-tag${row.accent ? " accent" : ""}`}>{row.tag}</span>
                    <p>{row.body}</p>
                  </div>
                  <div className="cat-recovery-meter">
                    <div className={`cat-recovery-amount${row.accent ? " accent" : ""}`}>{row.amount}</div>
                    <div className="cat-recovery-bar">
                      <span style={{ width: `${row.barWidthPct}%`, ...(row.accent ? { background: "var(--accent)" } : {}) }} />
                    </div>
                    <div className="cat-recovery-bar-label">{row.barLabel}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="cat-recovery-total-stripe">
              <span className="cat-recovery-total-stripe-eyebrow">Estimated recovery</span>
              <span className="cat-recovery-total-stripe-leader" aria-hidden />
              <span className="cat-recovery-total-stripe-num">{data.damages.totalAmount}</span>
              <span className="cat-recovery-total-stripe-sub">{data.damages.totalCaption}</span>
            </div>
          </div>
        </section>

        {/* EVIDENCE */}
        <section className="cat-section">
          <div className="evidence-shell">
            <div className="evidence-shell-head">
              <div className="cat-stack-head" style={{ marginBottom: 0 }}>
                <span className="eyebrow">Build the file</span>
                <h2>
                  What evidence do you need to <em>{data.evidence.h2Em}</em>?
                </h2>
                <p>{data.evidence.intro}</p>
              </div>
              <div className="evidence-tagline" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3l8 3v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-3z" />
                </svg>
                <span>More documentation = stronger case</span>
              </div>
            </div>

            <div className="cat-evidence-grid">
              {data.evidence.items.map((item, idx) => (
                <div key={idx} className="cat-evidence-card">
                  <div className="cat-evidence-icon">{item.iconSvg}</div>
                  <h4 className="cat-evidence-title">{item.title}</h4>
                  <p className="cat-evidence-desc">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* STATE-SPECIFIC RULES */}
        <section className="cat-section">
          <div className="cat-split">
            <div className="cat-split-intro">
              <span className="eyebrow">By state</span>
              <h2>
                State-specific <em>rules</em>.
              </h2>
              <p>{data.stateRulesIntro}</p>
              <Link href="/small-claims" className="cat-text-link">
                See all 50 state guides →
              </Link>
            </div>
            <div className="cat-state-grid">
              {featured.map((s) => (
                <Link key={s.slug} href={`/small-claims/${s.slug}`} className="cat-state-link">
                  <span>{s.name}</span>
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CLOSING CTA + TESTIMONIAL */}
        <section className="cat-section">
          <div style={{ background: "#0d0d0d", color: "#fff", padding: "32px 0", borderRadius: 20, position: "relative", overflow: "hidden" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1.85fr 1fr", gap: 0, alignItems: "center" }}>
              <div style={{ padding: "12px 44px 20px" }}>
                <span className="eyebrow" style={{ color: "rgba(254,249,241,0.65)" }}>Take the next step</span>
                <h2 style={{ fontFamily: "Newsreader, Georgia, serif", fontSize: "clamp(28px, 2.8vw, 38px)", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.1, margin: "14px 0 28px", color: "#fef9f1" }}>
                  Three ways to <em style={{ fontStyle: "italic", color: "#f5b29f", fontWeight: 700 }}>move forward</em>.
                </h2>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, alignItems: "stretch", position: "relative" }}>
                  <CtaStepCard href="/demand-letter" bg="#4ad96a" tone="dark" stepNum="01" stepPos="top-left" title="Send a Demand Letter" titlePos="bottom-left" />
                  <CtaStepCard href="/case-score" bg="#fff" tone="dark" stepNum="02" stepPos="bottom-right" title="Check My Case" titlePos="top-left" gradient />
                  <CtaStepCard href="/small-claims" bg="#7344ee" tone="light" stepNum="03" stepPos="top-right" title="File Your Claim" titlePos="bottom-right" />
                </div>
              </div>
              <div style={{ borderLeft: "1px solid #1f1f1f", padding: "20px 44px", position: "relative", alignSelf: "stretch", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <div style={{ fontFamily: "Geist, system-ui, sans-serif", fontWeight: 900, fontSize: 70, lineHeight: 0.5, color: "#2a2a2a", marginBottom: 14, letterSpacing: "-0.06em" }} aria-hidden="true">
                  &rdquo;&rdquo;
                </div>
                <div style={{ width: 48, height: 1, background: "#3a3a3a", marginBottom: 14 }} />
                <p style={{ fontFamily: "Newsreader, Georgia, serif", fontSize: 18, fontStyle: "italic", lineHeight: 1.35, letterSpacing: "-0.005em", color: "#fef9f1", margin: "0 0 16px" }}>
                  {data.testimonial.quote}
                </p>
                <div>
                  <div style={{ fontFamily: "Geist, system-ui, sans-serif", fontWeight: 700, fontSize: 14, color: "#fff", marginBottom: 2 }}>{data.testimonial.name}</div>
                  <div style={{ fontSize: 12.5, color: "#9aa0a6" }}>{data.testimonial.role}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="cat-section">
          <div className="cat-split">
            <div className="cat-split-intro">
              <span className="eyebrow">FAQ</span>
              <h2>
                Frequently Asked <em>Questions</em>.
              </h2>
              <p>
                The questions {data.audienceLabel} actually ask before filing.
              </p>
            </div>
            <div className="cat-faq">
              {data.faqs.map((f, idx) => (
                <details key={idx}>
                  <summary>{f.q}</summary>
                  <div>
                    <p>{f.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
