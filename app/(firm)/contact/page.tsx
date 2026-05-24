import type { Metadata } from "next";
import Link from "next/link";
import {
  C, H1, H2, eyebrow, body, PAD_X, HEAD_FONT, BODY_FONT, italicEmCSS,
  Arrow,
} from "../../../components/firm";
import { breadcrumbList, jsonLdGraph } from "../../../lib/schema";

// Contact page — editorial layout ported from claude design (Contact).
// Skipped per user direction: the 3 channel boxes (Call / Write / Mail us)
// and the Hours card in the sidebar.

export const metadata: Metadata = {
  title: "Contact · CivilCase",
  description:
    "Questions about our guides, templates, or which service fits your dispute? Send a note. We answer most messages within one business day. CivilCase is not a law firm and does not provide legal advice.",
  alternates: { canonical: "/contact" },
};

const INPUT_STYLE: React.CSSProperties = {
  width: "100%",
  boxSizing: "border-box",
  background: "#fff",
  border: `1px solid ${C.line}`,
  borderRadius: 8,
  padding: "12px 14px",
  font: `15px/1.4 ${BODY_FONT}`,
  color: C.fg,
  outline: "none",
};

const LABEL_STYLE: React.CSSProperties = {
  font: `500 10px/1 ${BODY_FONT}`,
  letterSpacing: "0.22em",
  color: C.muted,
  textTransform: "uppercase",
  marginBottom: 8,
};

const FAST_PATHS = [
  { tag: "QUICK", title: "Check your case strength", desc: "Free 90-second read on whether to pursue. No account needed.", cta: "Run my score", href: "/case-score" },
  { tag: "GUIDES", title: "State-by-state filing", desc: "Filing fees, caps, forms, and service rules for all 50 states.", cta: "Find your state", href: "/small-claims" },
  { tag: "ANSWERS", title: "Common questions", desc: "Cost, timeline, evidence, hearing prep, collection. Answered.", cta: "Browse FAQ", href: "/small-claims#faq" },
];

export default function Contact() {
  const jsonLd = jsonLdGraph(
    breadcrumbList([
      { name: "CivilCase", url: "/" },
      { name: "Contact", url: "/contact" },
    ]),
  );

  return (
    <main style={{ background: C.bg, color: C.fg, font: `16px/1.5 ${BODY_FONT}` }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <style dangerouslySetInnerHTML={{ __html: italicEmCSS }} />

      {/* HERO */}
      <section style={{ padding: `80px ${PAD_X} 60px` }}>
        <div>
          <div style={{ ...eyebrow, color: C.accent, marginBottom: 28 }}>CONTACT · WE READ EVERY MESSAGE</div>
          <h1 className="firm-h" style={{ ...H1, fontSize: 80 }}>
            Send us a <em>note.</em>
          </h1>
          <p style={{ font: `19px/1.55 ${BODY_FONT}`, color: C.muted, marginTop: 32, maxWidth: 720 }}>
            Questions about our guides, templates, or which service fits your dispute? Drop us a
            note. We answer most messages within one business day. We can&rsquo;t give legal advice,
            but we can help you find the right starting point.
          </p>
        </div>
      </section>

      {/* FORM + EDITORIAL SIDEBAR */}
      <section style={{ padding: `40px ${PAD_X} 100px`, background: C.paper }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 80, alignItems: "start" }}>
          {/* Form */}
          <div>
            <div style={{ ...eyebrow, marginBottom: 16 }}>GET IN TOUCH · BY EMAIL</div>
            <h2 className="firm-h" style={{ ...H2, fontSize: 44 }}>Tell us <em>what you need</em>.</h2>
            <p style={{ ...body, marginTop: 16, maxWidth: 540 }}>
              The more specific, the better we can point you to the right guide, template, or
              service. Stuck on a step? Not sure which tool fits your situation? Just ask.
            </p>

            <form style={{ marginTop: 40, display: "grid", gap: 28 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
                <div>
                  <div style={LABEL_STYLE}>YOUR NAME</div>
                  <input type="text" placeholder="Jordan Trevant" style={INPUT_STYLE} />
                </div>
                <div>
                  <div style={LABEL_STYLE}>EMAIL</div>
                  <input type="email" placeholder="you@example.com" style={INPUT_STYLE} />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
                <div>
                  <div style={LABEL_STYLE}>STATE</div>
                  <input type="text" placeholder="California" style={INPUT_STYLE} />
                </div>
                <div>
                  <div style={LABEL_STYLE}>TYPE OF CASE</div>
                  <select defaultValue="" style={{ ...INPUT_STYLE, color: C.muted, appearance: "none", cursor: "pointer" }}>
                    <option value="" disabled>Select a category…</option>
                    <option value="landlord">Landlord dispute</option>
                    <option value="contractor">Contractor dispute</option>
                    <option value="employer">Employer dispute</option>
                    <option value="auto">Auto dispute</option>
                    <option value="neighbor">Neighbor dispute</option>
                    <option value="personal-loan">Personal loan</option>
                    <option value="roommate">Roommate dispute</option>
                    <option value="online-seller">Online seller</option>
                    <option value="refund">Refund</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <div style={LABEL_STYLE}>BRIEFLY · WHAT&rsquo;S GOING ON?</div>
                <textarea
                  rows={6}
                  placeholder="A short summary. What's the dispute, what have you tried so far, and what would be most helpful from us."
                  style={{ ...INPUT_STYLE, resize: "vertical" }}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 4 }}>
                <button
                  type="submit"
                  style={{
                    background: C.dark,
                    color: "#fff",
                    border: "none",
                    padding: "16px 24px",
                    font: `500 14px/1 ${BODY_FONT}`,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 12,
                    cursor: "pointer",
                    borderRadius: 8,
                  }}
                >
                  Send message <Arrow color="#fff" />
                </button>
              </div>
            </form>
          </div>

          {/* Sidebar — editorial cards (skip the Hours card per direction) */}
          <aside style={{ position: "sticky", top: 24, display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Response promise */}
            <div style={{ background: C.dark, color: "#fff", padding: "24px 26px" }}>
              <div style={{ ...eyebrow, color: C.accentOnDark, marginBottom: 14 }}>OUR PROMISE</div>
              <div className="firm-h firm-h-light" style={{ font: `500 22px/1.2 ${HEAD_FONT}`, color: "#fff", letterSpacing: "-0.018em" }}>
                A real reply within <em>one business day.</em>
              </div>
              <p style={{ font: `13.5px/1.6 ${BODY_FONT}`, color: "rgba(255,255,255,0.7)", margin: "12px 0 0" }}>
                Written by a real person on our team who has read your message. Not a chatbot. Not a templated auto-reply.
              </p>
            </div>

            {/* What not to send */}
            <div style={{ border: `1px solid ${C.line}`, padding: "24px 26px", background: C.bg }}>
              <div style={{ ...eyebrow, color: C.muted, marginBottom: 14 }}>ONE NOTE</div>
              <div style={{ font: `500 18px/1.25 ${HEAD_FONT}`, color: C.fg, letterSpacing: "-0.015em" }}>
                Don&rsquo;t send the only copy of anything.
              </div>
              <p style={{ ...body, fontSize: 13.5, margin: "10px 0 0" }}>
                Send copies. Keep originals. We can usually tell you what to keep before you mail
                anything sensitive.
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* BEFORE YOU WRITE — alternate paths */}
      <section style={{ padding: `100px ${PAD_X}` }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "end", marginBottom: 48 }}>
          <div>
            <div style={{ ...eyebrow, marginBottom: 16 }}>BEFORE YOU WRITE</div>
            <h2 className="firm-h" style={{ ...H2, fontSize: 38 }}>You might find your answer <em>faster here</em>.</h2>
          </div>
          <p style={{ ...body, fontSize: 15 }}>
            We get the same handful of questions every week. If yours is in this list, you can
            usually start in minutes.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {FAST_PATHS.map((q) => (
            <Link
              key={q.title}
              href={q.href}
              style={{
                background: C.paper,
                border: `1px solid ${C.line}`,
                padding: "26px 28px",
                textDecoration: "none",
                color: "inherit",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div style={{ font: `500 10px/1 ${BODY_FONT}`, letterSpacing: "0.22em", color: C.accent, marginBottom: 14 }}>{q.tag}</div>
              <div style={{ font: `500 20px/1.22 ${HEAD_FONT}`, color: C.fg, letterSpacing: "-0.015em" }}>{q.title}</div>
              <div style={{ font: `13.5px/1.55 ${BODY_FONT}`, color: C.muted, marginTop: 10, flex: 1 }}>{q.desc}</div>
              <div style={{ marginTop: 18, paddingTop: 12, borderTop: `1px solid ${C.line}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ font: `500 13px/1 ${BODY_FONT}`, color: C.fg }}>{q.cta}</span>
                <Arrow color={C.fg} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* DISCLOSURE */}
      <section style={{ padding: `0 ${PAD_X} 80px` }}>
        <div
          style={{
            padding: "30px 36px",
            background: C.paper,
            border: `1px solid ${C.line}`,
            display: "grid",
            gridTemplateColumns: "200px 1fr",
            gap: 32,
            alignItems: "center",
          }}
        >
          <div style={{ ...eyebrow, color: C.accent }}>IMPORTANT</div>
          <p style={{ font: `13.5px/1.6 ${BODY_FONT}`, color: C.muted, margin: 0 }}>
            CivilCase is not a law firm and does not provide legal advice. Contacting CivilCase
            does not create an attorney-client relationship. Do not include time-sensitive or
            confidential information in this form until that relationship is established. For
            legal advice specific to your situation, consult a licensed attorney in your state.
          </p>
        </div>
      </section>
    </main>
  );
}
