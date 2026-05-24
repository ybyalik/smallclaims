import type { Metadata } from "next";
import { MessageSquare, Edit3, Users, Newspaper } from "lucide-react";
import {
  C, H1, H2, eyebrow, body, PAD_X, RAD, HEAD_FONT, BODY_FONT, italicEmCSS,
  FirmBtn,
} from "../../../components/firm";

// Contact page. Copy ported from /contact and re-implemented with firm tokens.

export const metadata: Metadata = {
  title: "Contact · CivilCase",
  description: "Reach CivilCase. Support, editorial corrections, partnerships, and press.",
  alternates: { canonical: "/contact2" },
  robots: { index: false, follow: false },
};

const CHANNELS = [
  { Icon: MessageSquare, title: "Help with your case", email: "support@civilcase.com", desc: "Account questions, billing, refunds, document issues. We respond within one business day." },
  { Icon: Edit3, title: "Corrections to a state guide", email: "editorial@civilcase.com", desc: "Spotted an outdated fee, deadline, or form number? Send the source and we'll verify and fix." },
  { Icon: Users, title: "Partnerships", email: "partnerships@civilcase.com", desc: "Process servers, attorneys, courts, legal aid orgs, and integration partners." },
  { Icon: Newspaper, title: "Press and media", email: "press@civilcase.com", desc: "Interview requests, data requests, and stories about access to justice." },
];

const INBOX = [
  { from: "Support · CivilCase", preview: "Re: Refund — sorted in 4 hours.", when: "2m", unread: true },
  { from: "Editorial · CivilCase", preview: "Verified your correction. Patched today.", when: "1h" },
  { from: "Partnerships · CivilCase", preview: "Looped you with a process server in TX.", when: "3h" },
  { from: "Press · CivilCase", preview: "Forwarded your interview ask.", when: "1d" },
];

const NOT_OVER_EMAIL = [
  ["Give legal advice", "If you're asking whether to accept a settlement or sue a specific person, the answer is 'consult a licensed attorney in your state.' We give general information, not advice on your facts."],
  ["Review your case for free", "Our state guides are how we deliver scalable information. One-off case review isn't something we offer. The guide for your state covers what we'd tell you anyway."],
  ["Accept service of process", "If you need to serve a defendant, hire a process server or your local sheriff. CivilCase is not an authorized agent for service."],
];

const RESPONSE_TIMES = [
  ["1", "day", "Support and billing.", "Account questions, refunds, document issues."],
  ["≤7", "days", "Editorial corrections.", "We verify against the primary source before patching the guide."],
  ["3", "days", "Partnerships and press.", "Triaged in batches by team lead."],
];

export default function Contact2() {
  return (
    <main style={{ background: C.bg, color: C.fg, font: `16px/1.5 ${BODY_FONT}` }}>
      <style dangerouslySetInnerHTML={{ __html: italicEmCSS }} />

      {/* HERO */}
      <section style={{ padding: `80px ${PAD_X} 100px` }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 80, alignItems: "center" }}>
          <div>
            <div style={{ ...eyebrow, color: C.accent, marginBottom: 28 }}>CONTACT</div>
            <h1 className="firm-h" style={{ ...H1, fontSize: 72 }}>Real humans, <em>real fast</em>.</h1>
            <p style={{ font: `18px/1.55 ${BODY_FONT}`, color: C.muted, maxWidth: 540, marginTop: 28 }}>
              We answer every support email within one business day. Pick the channel that fits your
              question — or scroll for the things we can&rsquo;t handle over email.
            </p>
            <div style={{ display: "flex", gap: 14, marginTop: 36 }}>
              <FirmBtn href="mailto:support@civilcase.com">Email Support</FirmBtn>
              <FirmBtn kind="ghost" href="/small-claims2">Browse State Guides</FirmBtn>
            </div>
          </div>
          {/* Inbox mockup */}
          <div style={{ background: C.paper, border: `1px solid ${C.line}`, borderRadius: RAD.panel, overflow: "hidden", boxShadow: "0 24px 60px -20px rgba(40,28,12,0.18)" }}>
            <div style={{ display: "flex", gap: 8, padding: "14px 18px", borderBottom: `1px solid ${C.line}`, background: C.cream }}>
              <span style={{ width: 10, height: 10, borderRadius: 999, background: "#f57b54" }} />
              <span style={{ width: 10, height: 10, borderRadius: 999, background: "#f5c84b" }} />
              <span style={{ width: 10, height: 10, borderRadius: 999, background: "#5fd17a" }} />
            </div>
            <div>
              {INBOX.map((m, i) => (
                <div key={m.from} style={{ display: "grid", gridTemplateColumns: "16px 1fr auto", gap: 14, padding: "20px 22px", borderBottom: i < INBOX.length - 1 ? `1px solid ${C.line}` : "none", alignItems: "center" }}>
                  <span style={{ width: 8, height: 8, borderRadius: 999, background: m.unread ? C.accent : C.muted, marginTop: 6 }} />
                  <div>
                    <div style={{ font: `600 14px/1.3 ${BODY_FONT}`, color: C.fg }}>{m.from}</div>
                    <div style={{ font: `13.5px/1.4 ${BODY_FONT}`, color: C.muted, marginTop: 4 }}>{m.preview}</div>
                  </div>
                  <div style={{ font: `12px/1 ${BODY_FONT}`, color: C.muted }}>{m.when}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CHANNELS */}
      <section style={{ padding: `120px ${PAD_X}`, background: C.cream }}>
        <div style={{ marginBottom: 56 }}>
          <div style={{ ...eyebrow, marginBottom: 22 }}>REACH THE RIGHT DESK</div>
          <h2 className="firm-h" style={H2}>Four ways in. <em>One promise</em>: a real reply.</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
          {CHANNELS.map((c) => (
            <a
              key={c.email}
              href={`mailto:${c.email}`}
              style={{
                background: C.paper,
                border: `1px solid ${C.line}`,
                padding: "36px 36px 32px",
                borderRadius: RAD.card,
                textDecoration: "none",
                color: "inherit",
                display: "grid",
                gridTemplateColumns: "auto 1fr",
                gap: 24,
                alignItems: "start",
              }}
            >
              <div style={{ width: 48, height: 48, borderRadius: 999, background: C.accent, color: "#fff", display: "grid", placeItems: "center" }}>
                <c.Icon size={22} strokeWidth={1.8} aria-hidden />
              </div>
              <div>
                <div style={{ font: `600 22px/1.25 ${HEAD_FONT}`, color: C.fg, letterSpacing: "-0.005em" }}>{c.title}</div>
                <div style={{ font: `500 14px/1.4 ${BODY_FONT}`, color: C.accent, marginTop: 6 }}>{c.email}</div>
                <p style={{ ...body, marginTop: 12, fontSize: 14.5 }}>{c.desc}</p>
                <div style={{ font: `500 13px/1 ${BODY_FONT}`, color: C.fg, marginTop: 18 }}>Email this desk →</div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* OFF THE MENU */}
      <section style={{ padding: `120px ${PAD_X}` }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 80, marginBottom: 56, alignItems: "end" }}>
          <div>
            <div style={{ ...eyebrow, marginBottom: 22 }}>WHAT WE DON&rsquo;T DO</div>
            <h2 className="firm-h" style={H2}>These three are <em>off the menu</em>.</h2>
          </div>
          <p style={body}>
            We&rsquo;re happy to send a real reply — but these aren&rsquo;t things email support can do.
            Save yourself a round trip.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {NOT_OVER_EMAIL.map(([t, d]) => (
            <div key={t} style={{ background: C.dark, color: "#fff", padding: 32, borderRadius: RAD.card }}>
              <div style={{ width: 36, height: 36, borderRadius: 999, border: "1.5px solid rgba(255,255,255,0.4)", color: "rgba(255,255,255,0.7)", display: "flex", alignItems: "center", justifyContent: "center", font: `500 18px/1 ${BODY_FONT}`, marginBottom: 18 }}>×</div>
              <div style={{ font: `600 20px/1.3 ${HEAD_FONT}`, color: "#fff", letterSpacing: "-0.005em" }}>{t}</div>
              <p style={{ font: `14px/1.55 ${BODY_FONT}`, color: "rgba(255,255,255,0.7)", marginTop: 12 }}>{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* RESPONSE TIMES */}
      <section style={{ padding: `120px ${PAD_X}`, background: C.cream }}>
        <div style={{ background: C.paper, border: `1px solid ${C.line}`, borderRadius: RAD.panel, padding: 80, display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 80, alignItems: "center" }}>
          <div>
            <div style={{ ...eyebrow, marginBottom: 22 }}>RESPONSE TIMES</div>
            <h2 className="firm-h" style={H2}>We don&rsquo;t leave you on <em>read</em>.</h2>
            <p style={{ ...body, marginTop: 22, maxWidth: 460 }}>
              Most desks reply within one business day. Editorial corrections take longer because we
              verify against the source. Press and partnerships get triaged within three days.
            </p>
          </div>
          <div style={{ display: "grid", gap: 0 }}>
            {RESPONSE_TIMES.map(([n, unit, head, sub], i) => (
              <div key={head} style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 32, alignItems: "center", padding: "26px 0", borderTop: i === 0 ? `1px solid ${C.line}` : "none", borderBottom: `1px solid ${C.line}` }}>
                <div style={{ font: `600 48px/1 ${HEAD_FONT}`, color: C.fg, letterSpacing: "-0.025em", minWidth: 100 }}>
                  <em style={{ color: C.accent, fontStyle: "italic" }}>{n}</em>
                  <span style={{ font: `500 14px/1 ${BODY_FONT}`, color: C.muted, marginLeft: 6 }}>{unit}</span>
                </div>
                <div>
                  <div style={{ font: `600 16px/1.3 ${HEAD_FONT}`, color: C.fg, letterSpacing: "-0.005em" }}>{head}</div>
                  <div style={{ ...body, marginTop: 4, fontSize: 14 }}>{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MAILING ADDRESS */}
      <section style={{ padding: `120px ${PAD_X}` }}>
        <div style={{ background: C.paper, border: `1px solid ${C.line}`, borderRadius: RAD.panel, padding: "56px 56px", display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 60, alignItems: "center" }}>
          <div>
            <div style={{ ...eyebrow, marginBottom: 22 }}>MAILING ADDRESS</div>
            <h3 className="firm-h" style={{ ...H2, fontSize: 36 }}>The PO Box is <em>in transit</em>.</h3>
            <p style={{ ...body, marginTop: 18, maxWidth: 460 }}>
              Our mailing address publishes with the public launch. For now, please send anything
              you&rsquo;d normally mail to{" "}
              <a href="mailto:support@civilcase.com" style={{ color: C.accent }}>support@civilcase.com</a>
              {" "}and we&rsquo;ll route it.
            </p>
          </div>
          <div style={{ textAlign: "right", font: `italic 22px/1.4 ${HEAD_FONT}`, color: C.muted }}>
            CivilCase
            <br />
            Attn: Customer Support
            <br />
            <span style={{ font: `400 14px/1.4 ${BODY_FONT}`, fontStyle: "italic" }}>(coming with public launch)</span>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: `120px ${PAD_X}` }}>
        <div style={{ background: C.dark, color: "#fff", padding: "80px 56px", borderRadius: RAD.panel, textAlign: "center" }}>
          <div style={{ ...eyebrow, color: "rgba(255,255,255,0.55)", marginBottom: 22 }}>FASTER PATH</div>
          <h2 className="firm-h firm-h-light" style={{ ...H2, color: "#fff" }}>Faster path: <em>start your case</em>.</h2>
          <p style={{ font: `16px/1.6 ${BODY_FONT}`, color: "rgba(255,255,255,0.7)", marginTop: 18, maxWidth: 540, marginLeft: "auto", marginRight: "auto" }}>
            If you&rsquo;re here to send a demand letter, you can begin in under three minutes. No support
            ticket required.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", marginTop: 32 }}>
            <FirmBtn kind="accent" href="/demand-letter2">Send a Demand Letter</FirmBtn>
            <FirmBtn kind="ghostDark" href="/small-claims2">Browse State Guides</FirmBtn>
          </div>
        </div>
      </section>
    </main>
  );
}
