import type { Metadata } from "next";
import Image from "next/image";
import {
  C, H1, H2, eyebrow, body, PAD_X, HEAD_FONT, BODY_FONT, italicEmCSS,
  ShieldLogo,
} from "../../../components/firm";
import { breadcrumbList, jsonLdGraph } from "../../../lib/schema";

// About CivilCase — editorial layout matching the design source
// (redesign-civilcase/project/about-page.jsx). Stops after Four
// principles; nothing below that.

export const metadata: Metadata = {
  title: "About · CivilCase",
  description:
    "CivilCase is a self-help legal-information website and document automation tool for self-represented plaintiffs. We are not a law firm and do not provide legal advice.",
  alternates: { canonical: "/about" },
};

// Decorative line ornament (line · ringed dot · line)
function Ornament({ size = 32, color = C.accent }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size * 0.4} viewBox="0 0 80 32" fill="none" aria-hidden>
      <line x1="0" y1="16" x2="28" y2="16" stroke={color} strokeWidth="1" />
      <circle cx="40" cy="16" r="3" stroke={color} strokeWidth="1.2" fill="none" />
      <circle cx="40" cy="16" r="1" fill={color} />
      <line x1="52" y1="16" x2="80" y2="16" stroke={color} strokeWidth="1" />
    </svg>
  );
}

function WaxSeal({ size = 90, label = "EST. 2024", color = C.accent }: { size?: number; label?: string; color?: string }) {
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

// Editorial line-art icons used in the Four Principles row
function ValueIcon({ kind, color = C.accent }: { kind: "scales" | "compass" | "key" | "shield"; color?: string }) {
  const stroke = { stroke: color, strokeWidth: 1.5, fill: "none" as const, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (kind === "scales") return (
    <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden>
      <line {...stroke} x1="20" y1="6" x2="20" y2="34" />
      <line {...stroke} x1="14" y1="34" x2="26" y2="34" />
      <line {...stroke} x1="6" y1="14" x2="34" y2="14" />
      <path {...stroke} d="M6 14 L2 24 a4 4 0 0 0 8 0 Z" />
      <path {...stroke} d="M34 14 L30 24 a4 4 0 0 0 8 0 Z" />
    </svg>
  );
  if (kind === "compass") return (
    <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden>
      <circle {...stroke} cx="20" cy="20" r="14" />
      <path {...stroke} d="M14 26 L20 12 L26 26 L20 22 Z" fill={`${color}20`} />
    </svg>
  );
  if (kind === "key") return (
    <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden>
      <circle {...stroke} cx="14" cy="20" r="6" />
      <line {...stroke} x1="20" y1="20" x2="36" y2="20" />
      <line {...stroke} x1="30" y1="20" x2="30" y2="26" />
      <line {...stroke} x1="34" y1="20" x2="34" y2="24" />
    </svg>
  );
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden>
      <path {...stroke} d="M20 6 L32 10 V20 C32 28 26 33 20 35 C14 33 8 28 8 20 V10 Z" />
      <path {...stroke} d="M15 20 L19 24 L26 16" />
    </svg>
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
        foundingDate: "2024",
        description:
          "A self-help legal-information website and document automation tool for civil disputes. Attorney-authored templates and state-specific guides for self-represented plaintiffs (pro se) across all 50 states. CivilCase is not a law firm and does not provide legal advice.",
        founder: {
          "@type": "Person",
          name: "Yury Byalik",
          jobTitle: "Founder & CEO",
          alumniOf: { "@type": "Organization", name: "California State Bar" },
          identifier: "CA Bar 281044",
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
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", alignItems: "center", marginBottom: 28 }}>
          <div style={{ ...eyebrow, color: C.accent }}>※ ISSUE NO. 04 · OUR STORY</div>
          <Ornament size={60} />
        </div>
        <h1 className="firm-h" style={{ font: `500 96px/0.98 ${HEAD_FONT}`, letterSpacing: "-0.04em", margin: 0, maxWidth: 900, color: C.fg }}>
          Lawyer-built tools<br />for people <em>representing themselves.</em>
        </h1>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, marginTop: 48, alignItems: "end" }}>
          <p style={{ font: `400 19px/1.55 ${HEAD_FONT}`, color: C.fg, margin: 0 }}>
            CivilCase is a self-help legal-information website and document automation tool for
            disputes that don&rsquo;t justify a $300/hour retainer. Attorney-authored templates,
            state-specific guides, plain-English procedure. Not a law firm. Not your lawyer.
          </p>
          <div style={{ display: "flex", gap: 24, alignItems: "center", justifyContent: "flex-end" }}>
            <WaxSeal />
            <div style={{ font: `13px/1.6 ${BODY_FONT}`, color: C.muted, maxWidth: 200 }}>
              Founded May 2024 in Los Angeles. Guides and templates covering all 50 states + DC.
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
        <div style={{ display: "grid", gridTemplateColumns: "60px 1fr", gap: 24, marginTop: 14 }}>
          <div style={{ ...eyebrow, color: C.muted }}>FIG. 01</div>
          <div style={{ font: `italic 13px/1.5 ${BODY_FONT}`, color: C.muted }}>
            The original CivilCase office, Los Angeles · May 2024. Photograph by the founder.
          </div>
        </div>
      </section>

      {/* ─── MISSION ─── */}
      <section style={{ padding: `140px ${PAD_X}` }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 100 }}>
          <div>
            <div style={{ ...eyebrow, color: C.accent, marginBottom: 22 }}>※ THE MISSION</div>
            <h2 className="firm-h" style={H2}>Why we <em>exist.</em></h2>
          </div>
          <div>
            <p style={{ font: `400 24px/1.4 ${HEAD_FONT}`, color: C.fg, margin: 0, letterSpacing: "-0.005em" }}>
              <span style={{ font: `500 64px/0.6 ${HEAD_FONT}`, color: C.accent, float: "left", marginRight: 16, marginTop: 14 }}>&ldquo;</span>
              Three out of four Americans with a real legal issue never see a lawyer. Not because
              they&rsquo;re wrong. The math doesn&rsquo;t work. A $1,200 dispute costs
              $3,000 to fight. So they swallow it.
            </p>
            <p style={{ font: `400 17px/1.7 ${BODY_FONT}`, color: C.muted, marginTop: 28, maxWidth: 600 }}>
              We thought that was an inversion of justice that could be fixed with software. Three
              years and 12,000 users later, we still do.
            </p>
            <div style={{ marginTop: 32, font: `italic 18px/1.4 ${HEAD_FONT}`, color: C.accent }}>Yury Bystik, founder</div>
          </div>
        </div>
      </section>

      {/* ─── PHOTO COLLAGE — three sizes ─── */}
      <section style={{ padding: `0 ${PAD_X} 140px` }}>
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
            <div style={{ background: C.dark, color: "#fff", padding: 24, flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div style={{ ...eyebrow, color: C.accentOnDark }}>※ BY THE NUMBERS</div>
              <div>
                <div className="firm-h firm-h-light" style={{ font: `500 56px/1 ${HEAD_FONT}`, color: "#fff", letterSpacing: "-0.03em" }}>$18.4M</div>
                <div style={{ font: `12px/1.4 ${BODY_FONT}`, color: "rgba(255,255,255,0.6)", marginTop: 10, letterSpacing: "0.12em" }}>RECOVERED FOR USERS TO DATE</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOUR PRINCIPLES (final section, nothing after) ─── */}
      <section style={{ padding: `140px ${PAD_X}` }}>
        <div style={{ textAlign: "center", marginBottom: 80 }}>
          <div style={{ display: "inline-block" }}>
            <Ornament size={80} />
          </div>
          <div style={{ ...eyebrow, color: C.accent, marginTop: 22, marginBottom: 22 }}>※ WHAT WE BELIEVE</div>
          <h2 className="firm-h" style={{ ...H2, fontSize: 56 }}>Four principles.</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0, borderTop: `1px solid ${C.fg}`, borderBottom: `1px solid ${C.fg}` }}>
          {[
            { icon: "scales" as const, title: "Equal access", desc: "Justice that costs $4,000 to access isn't justice. It's a luxury good. Our work is to make it ordinary." },
            { icon: "compass" as const, title: "Plain language", desc: "No Latin. No 'whereas.' If a paralegal can say it, so can we. Lawyers wrote the system for themselves." },
            { icon: "key" as const, title: "Tools, not gatekeeping", desc: "We give people the same forms a paralegal would charge $200 to fill in. The expertise is the system." },
            { icon: "shield" as const, title: "Built for plaintiffs", desc: "Our tools are written for the person bringing the claim, not the landlord, employer, or contractor on the other side. We don't represent anyone, but we only build for one side of the table." },
          ].map((v, i) => (
            <div key={v.title} style={{ padding: "48px 32px", borderRight: i < 3 ? `1px solid ${C.line}` : "none" }}>
              <ValueIcon kind={v.icon} />
              <div style={{ font: `500 22px/1.2 ${HEAD_FONT}`, color: C.fg, marginTop: 28, letterSpacing: "-0.01em" }}>{v.title}</div>
              <p style={{ ...body, fontSize: 14, marginTop: 14 }}>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
