import type { Metadata } from "next";
import Image from "next/image";
import {
  C, H2, PAD_X, HEAD_FONT, BODY_FONT, eyebrow, italicEmCSS,
  ShieldLogo, Arrow,
} from "../../../components/firm";
import { breadcrumbList, jsonLdGraph } from "../../../lib/schema";

// About CivilCase — editorial layout matching the design source
// (redesign-civilcase/project/about-page.jsx). The photo collage is
// followed by a short founder credit that links to /about/yury-byalik.

export const metadata: Metadata = {
  title: "About · CivilCase",
  description:
    "CivilCase is a self-help legal-information website and document automation tool for self-represented plaintiffs. We are not a law firm and do not provide legal advice.",
  alternates: { canonical: "/about" },
};

function WaxSeal({ size = 90, label = "EST. 2026", color = C.accent }: { size?: number; label?: string; color?: string }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        border: `1.5px solid ${color}`,
        color,
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transform: "rotate(-6deg)",
        flexShrink: 0,
      }}
    >
      <div style={{ position: "absolute", inset: 5, borderRadius: "50%", border: `0.5px dashed ${color}` }} />
      <div style={{ textAlign: "center" }}>
        <ShieldLogo size={26} color={color} />
        <div style={{ font: `500 9px/1.1 ${BODY_FONT}`, letterSpacing: "0.18em", marginTop: 4 }}>{label}</div>
      </div>
    </div>
  );
}

// Editorial photo placeholder. Renders an unsplash photo or a cream block
// fallback for layouts that just need a tonal surface.
function EditorialPhoto({ src, ratio, caption, style = {} }: { src?: string; ratio: string; caption?: string; style?: React.CSSProperties }) {
  return (
    <div style={{ position: "relative", aspectRatio: ratio, width: "100%", overflow: "hidden", background: C.cream, ...style }}>
      {src && (
        <Image src={src} alt={caption ?? ""} fill sizes="(max-width: 1024px) 100vw, 50vw" style={{ objectFit: "cover" }} aria-hidden />
      )}
    </div>
  );
}

export default function About2() {
  const jsonLd = jsonLdGraph(
    {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      name: "About CivilCase",
      description:
        "CivilCase is a self-help legal-information website and document automation tool for self-represented plaintiffs (pro se). We are not a law firm and do not provide legal advice.",
      url: "https://civilcase.com/about",
      mainEntity: {
        "@type": "Organization",
        name: "CivilCase",
        url: "https://civilcase.com",
        foundingDate: "2026",
        description:
          "A self-help legal-information website and document automation tool for civil disputes. State-specific guides and templates for self-represented plaintiffs (pro se) across all 50 states. CivilCase is not a law firm and does not provide legal advice.",
        founder: {
          "@type": "Person",
          name: "Yury Byalik",
          jobTitle: "Founder",
        },
        areaServed: { "@type": "Country", name: "United States" },
        knowsAbout: [
          "Small claims court",
          "Demand letters",
          "Civil litigation",
          "Judgment enforcement",
          "Consumer protection",
        ],
      },
    },
    breadcrumbList([
      { name: "CivilCase", url: "/" },
      { name: "About", url: "/about" },
    ]),
  );

  return (
    <main style={{ background: C.bg, color: C.fg, font: `16px/1.5 ${BODY_FONT}` }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <style dangerouslySetInnerHTML={{ __html: italicEmCSS }} />

      {/* ─── EDITORIAL HERO ─── */}
      <section style={{ padding: `60px ${PAD_X} 0` }}>
        <h1 className="firm-h" style={{ font: `500 96px/0.98 ${HEAD_FONT}`, letterSpacing: "-0.04em", margin: 0, maxWidth: 900, color: C.fg }}>
          Self-help tools<br />for people <em>representing themselves.</em>
        </h1>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, marginTop: 48, alignItems: "end" }}>
          <p style={{ font: `400 19px/1.55 ${HEAD_FONT}`, color: C.fg, margin: 0 }}>
            CivilCase is a self-help tool for getting your money back without a lawyer. It walks
            you through the whole process: sending a demand letter, filing in small-claims court,
            and collecting once you win, each step built around the facts you enter and your
            state&rsquo;s rules. Not a law firm. Not your lawyer.
          </p>
          <div style={{ display: "flex", gap: 24, alignItems: "center", justifyContent: "flex-end" }}>
            <WaxSeal />
            <div style={{ font: `13px/1.6 ${BODY_FONT}`, color: C.muted, maxWidth: 200 }}>
              Founded 2026. Guides covering all 50 states + DC.
            </div>
          </div>
        </div>
      </section>

      {/* ─── MAGAZINE SPREAD PHOTO ─── */}
      <section style={{ padding: `80px ${PAD_X} 0` }}>
        <EditorialPhoto
          src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=2400&h=1029&fit=crop"
          ratio="21 / 9"
        />
      </section>

      {/* ─── MISSION ─── */}
      <section style={{ padding: `140px ${PAD_X}` }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 100 }}>
          <div>
            <h2 className="firm-h" style={H2}>Why we <em>exist.</em></h2>
          </div>
          <div>
            <p style={{ font: `400 24px/1.4 ${HEAD_FONT}`, color: C.fg, margin: 0, letterSpacing: "-0.005em" }}>
              Three out of four Americans with a real legal issue never see a lawyer. Not because
              they&rsquo;re wrong. The math doesn&rsquo;t work. A $1,200 dispute costs
              $3,000 to fight. So they swallow it. We thought that was an inversion of justice that
              could be fixed with software.
            </p>
          </div>
        </div>
      </section>

      {/* ─── PHOTO COLLAGE — three sizes ─── */}
      <section style={{ padding: `0 ${PAD_X} 40px` }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr 0.9fr", gap: 16 }}>
          <EditorialPhoto
            src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=720&h=960&fit=crop"
            ratio="3 / 4"
          />
          <div style={{ display: "grid", gap: 16 }}>
            <EditorialPhoto
              src="https://images.unsplash.com/photo-1573164574572-cb89e39749b4?w=720&h=720&fit=crop"
              ratio="1 / 1"
            />
            <EditorialPhoto
              src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=720&h=540&fit=crop"
              ratio="4 / 3"
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <EditorialPhoto
              src="https://images.unsplash.com/photo-1589994965851-a8f479c573a9?w=600&h=800&fit=crop"
              ratio="3 / 4"
            />
          </div>
        </div>
      </section>

      {/* ─── FOUNDER CREDIT ─── */}
      <section style={{ padding: `0 ${PAD_X} 130px` }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 40,
            alignItems: "center",
            borderTop: `1px solid ${C.line}`,
            paddingTop: 56,
          }}
        >
          <a
            href="/about/yury-byalik"
            aria-label="Meet the founder, Yury Byalik"
            style={{
              position: "relative",
              width: 128,
              height: 128,
              borderRadius: "50%",
              overflow: "hidden",
              flexShrink: 0,
              border: `1px solid ${C.line}`,
              display: "block",
            }}
          >
            <Image src="/yury.webp" alt="Yury Byalik" fill sizes="128px" style={{ objectFit: "cover" }} />
          </a>
          <div style={{ flex: "1 1 320px" }}>
            <span style={eyebrow}>Founder</span>
            <h2 className="firm-h" style={{ ...H2, fontSize: "clamp(28px, 3vw, 40px)", marginTop: 10 }}>
              Yury Byalik, <em>J.D.</em>
            </h2>
            <p style={{ font: `400 18px/1.6 ${BODY_FONT}`, color: C.muted, margin: "12px 0 20px", maxWidth: 620 }}>
              CivilCase was founded by Yury Byalik, J.D., who holds a law degree from Widener University
              School of Law. He writes and speaks on access to justice for people who represent themselves.
            </p>
            <a
              href="/about/yury-byalik"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                font: `500 15px/1 ${BODY_FONT}`,
                color: C.accent,
                textDecoration: "none",
              }}
            >
              Meet the founder <Arrow color={C.accent} />
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}
