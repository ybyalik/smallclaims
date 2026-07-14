import type { Metadata } from "next";
import Image from "next/image";
import {
  C, H1, H2, eyebrow, PAD_X, HEAD_FONT, BODY_FONT, italicEmCSS,
  Check, ShieldLogo, Arrow,
} from "../../../../components/firm";
import { breadcrumbList, jsonLdGraph } from "../../../../lib/schema";

// Founder bio / author-entity page for Yury Byalik.
// Doubles as the press/commentary landing page journalists are pointed
// to. Editorial layout reuses the same tokens as /about. Header + footer
// come from app/(firm)/layout.tsx, so this file only renders <main>.

const LINKEDIN = "https://www.linkedin.com/in/ybyalik/";

const META_DESC =
  "Yury Byalik, J.D., is the founder of CivilCase, a self-help legal platform that helps people prepare their own small-claims filings (demand letters, court paperwork, and post-judgment collection steps) without hiring a lawyer, in all 50 states and DC.";

export const metadata: Metadata = {
  // Root layout applies the template "%s · CivilCase", so keep this short
  // to avoid a doubled brand. Renders as "Yury Byalik, J.D., Founder · CivilCase".
  title: "Yury Byalik, J.D., Founder",
  description: META_DESC,
  alternates: { canonical: "/about/yury-byalik" },
  openGraph: {
    title: "Yury Byalik, J.D. · Founder of CivilCase",
    description: META_DESC,
    url: "https://civilcase.com/about/yury-byalik",
    type: "profile",
    images: [{ url: "https://civilcase.com/yury.webp", width: 746, height: 746, alt: "Yury Byalik" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yury Byalik, J.D. · Founder of CivilCase",
    description: META_DESC,
    images: ["https://civilcase.com/yury.webp"],
  },
};

// Topics Byalik is available to comment on. Kept as data so the visible
// list and the Person.knowsAbout schema stay in sync.
const COMMENTARY = [
  "Access to justice for self-represented litigants",
  "The economics of pursuing a small claim without a lawyer",
  "Legal technology and document automation",
  "How AI-driven search is changing discovery for small businesses and legal consumers alike",
];

function LinkedInButton() {
  return (
    <a
      href={LINKEDIN}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        background: C.dark,
        color: "#fff",
        border: `1px solid ${C.dark}`,
        padding: "14px 22px",
        font: `500 14px/1 ${BODY_FONT}`,
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        borderRadius: 999,
        textDecoration: "none",
      }}
    >
      Connect on LinkedIn <Arrow color="#fff" />
    </a>
  );
}

export default function YuryByalikPage() {
  const jsonLd = jsonLdGraph(
    {
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      url: "https://civilcase.com/about/yury-byalik",
      mainEntity: {
        "@type": "Person",
        name: "Yury Byalik",
        honorificSuffix: "J.D.",
        jobTitle: "Founder",
        description: META_DESC,
        url: "https://civilcase.com/about/yury-byalik",
        image: "https://civilcase.com/yury.webp",
        worksFor: { "@type": "Organization", name: "CivilCase", url: "https://civilcase.com" },
        alumniOf: { "@type": "CollegeOrUniversity", name: "Widener University School of Law" },
        knowsAbout: [
          "Access to justice",
          "Self-represented litigants (pro se)",
          "Small claims court",
          "Demand letters",
          "Legal technology",
          "Document automation",
          "AI-driven search",
          "Technical SEO",
          "Ecommerce growth",
        ],
        sameAs: [LINKEDIN],
      },
    },
    breadcrumbList([
      { name: "CivilCase", url: "/" },
      { name: "About", url: "/about" },
      { name: "Yury Byalik", url: "/about/yury-byalik" },
    ]),
  );

  return (
    <main style={{ background: C.bg, color: C.fg, font: `16px/1.5 ${BODY_FONT}` }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <style dangerouslySetInnerHTML={{ __html: italicEmCSS }} />
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .yb-hero-grid { display: grid; grid-template-columns: 1.35fr 1fr; gap: 64px; align-items: center; }
            .yb-two { display: grid; grid-template-columns: 1fr 1.2fr; gap: 80px; align-items: start; }
            @media (max-width: 900px) {
              .yb-hero-grid, .yb-two { grid-template-columns: 1fr; gap: 40px; }
              .yb-portrait { max-width: 380px; }
            }
          `,
        }}
      />

      {/* ─── HERO ─── */}
      <section style={{ padding: `56px ${PAD_X} 0` }}>
        <a
          href="/about"
          className="firm-nav-link"
          style={{ ...eyebrow, textDecoration: "none", cursor: "pointer" }}
        >
          About · Founder
        </a>
        <div className="yb-hero-grid" style={{ marginTop: 28 }}>
          <div>
            <h1 className="firm-h" style={{ ...H1, marginBottom: 10 }}>
              Yury Byalik, <em>J.D.</em>
            </h1>
            <div style={{ font: `400 22px/1.35 ${HEAD_FONT}`, color: C.muted, marginBottom: 28 }}>
              Founder of CivilCase
            </div>
            <p style={{ font: `400 19px/1.6 ${BODY_FONT}`, color: C.fg, margin: "0 0 30px", maxWidth: 560 }}>
              Yury Byalik, J.D., is the founder of CivilCase, a self-help legal platform at CivilCase.com
              that helps people prepare their own small-claims filings, from demand letters to court
              paperwork to post-judgment collection steps, without hiring a lawyer, in all 50 states and DC.
              He holds a law degree from Widener University School of Law.
            </p>
            <LinkedInButton />
          </div>

          {/* Portrait */}
          <div className="yb-portrait" style={{ justifySelf: "center", width: "100%" }}>
            <div
              style={{
                position: "relative",
                aspectRatio: "1 / 1",
                width: "100%",
                overflow: "hidden",
                borderRadius: 14,
                border: `1px solid ${C.line}`,
                background: C.cream,
                boxShadow: "0 20px 60px -24px rgba(40,28,12,0.28)",
              }}
            >
              <Image
                src="/yury.webp"
                alt="Yury Byalik, founder of CivilCase"
                fill
                sizes="(max-width: 900px) 380px, 420px"
                style={{ objectFit: "cover" }}
                priority
              />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginTop: 14,
                font: `13px/1.5 ${BODY_FONT}`,
                color: C.muted,
              }}
            >
              <ShieldLogo size={16} color={C.accent} />
              Yury Byalik, J.D., Founder of CivilCase
            </div>
          </div>
        </div>
      </section>

      <div style={{ padding: `72px ${PAD_X} 0` }}>
        <div style={{ height: 1, background: C.line }} />
      </div>

      {/* ─── BACKGROUND ─── */}
      <section style={{ padding: `72px ${PAD_X}` }}>
        <div className="yb-two">
          <h2 className="firm-h" style={H2}>
            Before <em>CivilCase.</em>
          </h2>
          <div>
            <p style={{ font: `400 21px/1.55 ${HEAD_FONT}`, color: C.fg, margin: 0, letterSpacing: "-0.005em" }}>
              Before founding CivilCase, Byalik worked in technical SEO and ecommerce growth. He has spoken at
              industry events including the Shenzhen SEO Conference and led workshops on Shopify optimization
              for direct-to-consumer brands.
            </p>
          </div>
        </div>
      </section>

      {/* ─── COMMENTARY / MEDIA ─── */}
      <section style={{ padding: `0 ${PAD_X} 40px` }}>
        <div className="yb-two">
          <div>
            <span style={eyebrow}>Commentary &amp; media</span>
            <h2 className="firm-h" style={{ ...H2, marginTop: 16 }}>
              What Yury <em>comments on.</em>
            </h2>
          </div>
          <div>
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {COMMENTARY.map((item, i) => (
                <li
                  key={i}
                  style={{
                    display: "flex",
                    gap: 16,
                    alignItems: "flex-start",
                    padding: "20px 0",
                    borderTop: i === 0 ? "none" : `1px solid ${C.line}`,
                  }}
                >
                  <span style={{ marginTop: 3, flexShrink: 0 }}>
                    <Check size={18} color={C.accent} />
                  </span>
                  <span style={{ font: `400 19px/1.5 ${BODY_FONT}`, color: C.fg }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ─── DISCLAIMER + CONNECT ─── */}
      <section style={{ padding: `40px ${PAD_X} 120px` }}>
        <div
          style={{
            background: C.cream,
            border: `1px solid ${C.line}`,
            borderRadius: 16,
            padding: "40px 44px",
            display: "flex",
            flexWrap: "wrap",
            gap: 28,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <p style={{ font: `400 16px/1.6 ${BODY_FONT}`, color: C.muted, margin: 0, maxWidth: 640 }}>
            CivilCase is a self-help tool, not a law firm, and does not provide legal advice on individual
            cases. To interview Yury or request commentary, connect with him on LinkedIn.
          </p>
          <LinkedInButton />
        </div>
      </section>
    </main>
  );
}
