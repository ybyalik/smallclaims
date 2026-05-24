import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BarChart3, Folder, Mail, FileText, Headphones, UserCheck, Briefcase, ArrowRight, ShieldCheck, Target, TrendingUp, CheckCircle2, DollarSign, Clock, MapPin, ClipboardCheck, MessageSquare, PenLine, Send, Scale } from "lucide-react";
import {
  C, H1, H2, eyebrow, body, PAD_X, RAD, HEAD_FONT, BODY_FONT, SERIF_FONT, italicEmCSS,
  Check, FirmBtn, LetterDisplay, FaqSection, RatingStrip,
} from "../../../components/firm";
import { breadcrumbList, serviceSchema, jsonLdGraph } from "../../../lib/schema";

export const metadata: Metadata = {
  title: "Demand Letter · CivilCase",
  description:
    "Attorney-drafted, state-specific demand letter. From $29. Delivered USPS Certified within 24 hours.",
  alternates: { canonical: "/demand-letter" },
};

export default function DemandLetter2() {
  const jsonLd = jsonLdGraph(
    serviceSchema({
      name: "Demand Letter Service",
      description: "Attorney-drafted, state-specific demand letter. Delivered via USPS Certified mail within 24 hours.",
      url: "/demand-letter",
      priceFrom: 29,
      audience: "Self-represented plaintiffs",
    }),
    breadcrumbList([
      { name: "CivilCase", url: "/" },
      { name: "Demand Letter", url: "/demand-letter" },
    ]),
  );

  return (
    <main style={{ background: C.bg, color: C.fg, font: `16px/1.5 ${BODY_FONT}` }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <style dangerouslySetInnerHTML={{ __html: italicEmCSS }} />

      {/* HERO */}
      <section style={{ padding: `80px ${PAD_X} 100px` }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.05fr 1fr", gap: 80, alignItems: "center" }}>
          <div>
            <RatingStrip style={{ marginBottom: 24 }} />
            <h1 className="firm-h" style={{ ...H1, fontSize: 68 }}>The <em>demand</em> letter.</h1>
            <p style={{ font: `18px/1.55 ${BODY_FONT}`, color: C.muted, maxWidth: 520, marginTop: 28 }}>
              A formal written notice that you are owed money, intend to pursue the matter in court if it
              isn&rsquo;t resolved, and have the documentation to back it up. Attorney-drafted. State-specific.
              In your mailbox within 24 hours.
            </p>
            <div style={{ display: "flex", gap: 14, marginTop: 36 }}>
              <FirmBtn href="/dashboard/cases/new">Start my letter</FirmBtn>
              <FirmBtn kind="ghost" href="/demand-letter#sample">See a sample letter</FirmBtn>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", marginTop: 60, paddingTop: 30, borderTop: `1px solid ${C.line}` }}>
              {[
                { Icon: DollarSign, headline: "From $29", sub: "one-time fee" },
                { Icon: Clock, headline: "24 hours", sub: "turnaround" },
                { Icon: Mail, headline: "USPS Certified", sub: "tracked delivery" },
                { Icon: MapPin, headline: "All 50 states", sub: "every jurisdiction" },
              ].map(({ Icon, headline, sub }, i, arr) => (
                <div
                  key={headline}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    paddingLeft: i ? 24 : 0,
                    paddingRight: i === arr.length - 1 ? 0 : 24,
                    borderLeft: i ? `1px solid ${C.line}` : "none",
                  }}
                >
                  <Icon size={28} strokeWidth={1.7} color={C.accent} aria-hidden />
                  <div>
                    <div style={{ font: `700 15px/1.2 ${BODY_FONT}`, color: C.fg, marginBottom: 3 }}>{headline}</div>
                    <div style={{ font: `13px/1.3 ${BODY_FONT}`, color: C.muted }}>{sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center", minHeight: 580 }}>
            <LetterDisplay />
          </div>
        </div>
      </section>

      {/* WHY THEY WORK (cream-bg section) */}
      <section style={{ padding: `120px ${PAD_X}`, background: C.cream }}>
        <div style={{ background: C.paper, border: `1px solid ${C.line}`, borderRadius: RAD.panel, padding: 80, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <div>
            <div style={{ ...eyebrow, marginBottom: 22 }}>WHY THEY WORK</div>
            <h2 className="firm-h" style={H2}>A simple letter can create <em>serious results</em>.</h2>
            <p style={{ ...body, marginTop: 22, maxWidth: 460 }}>
              Most people resolve the issue once they realize you&rsquo;re prepared to take action. The mechanism
              is psychological as much as legal. A properly-formatted notice signals that informal options have
              ended.
            </p>
            <div style={{ marginTop: 36, display: "grid", gap: 20 }}>
              {[
                ["Creates legal pressure", "A formal written demand shows you're serious and prepared to escalate."],
                ["Resolves without court", "Many recipients pay or respond once the issue is documented and enforceable."],
                ["Builds your paper trail", "Establishes a timeline judges weigh. Shows the court you attempted to resolve in good faith first."],
                ["Triggers statutory remedies", "Several states require a written demand before bad-faith damages or attorney-fee shifting can attach."],
              ].map(([t, d], i) => (
                <div key={t} style={{ paddingBottom: 18, borderBottom: i < 3 ? `1px solid ${C.line}` : "none" }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
                    <div style={{ font: `600 20px/1.3 ${HEAD_FONT}`, color: C.accent, letterSpacing: "0.02em", flexShrink: 0 }}>0{i + 1}</div>
                    <div style={{ font: `600 19px/1.3 ${HEAD_FONT}`, color: C.fg, letterSpacing: "-0.005em" }}>{t}</div>
                  </div>
                  <div style={{ ...body, marginTop: 6, fontSize: 14, paddingLeft: 38 }}>{d}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: C.dark, color: "#fff", padding: 50, position: "relative", borderRadius: RAD.card }}>
            <div style={{ ...eyebrow, color: "rgba(255,255,255,0.5)", marginBottom: 18 }}>OUTCOMES, MEASURED</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28, marginTop: 30 }}>
              {[
                { Icon: TrendingUp, n: "68%", l: "Letters that resolve before any filing" },
                { Icon: Clock, n: "14d", l: "Median response time after delivery" },
                { Icon: CheckCircle2, n: "91%", l: "Recipients who acknowledge receipt" },
                { Icon: DollarSign, n: "$4.5k", l: "Median amount recovered per case" },
              ].map(({ Icon, n, l }) => (
                <div key={l} style={{ paddingBottom: 22, borderBottom: "1px solid rgba(255,255,255,0.12)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 34, height: 34, borderRadius: 999, background: "rgba(255,255,255,0.08)", color: C.accentOnDark, display: "grid", placeItems: "center", flexShrink: 0 }}>
                      <Icon size={18} strokeWidth={1.8} aria-hidden />
                    </div>
                    <div style={{ font: `500 46px/1 ${HEAD_FONT}`, color: "#fff", letterSpacing: "-0.02em" }}>{n}</div>
                  </div>
                  <div style={{ font: `12.5px/1.4 ${BODY_FONT}`, color: "rgba(255,255,255,0.65)", marginTop: 10 }}>{l}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 32, font: `12px/1.4 ${BODY_FONT}`, color: "rgba(255,255,255,0.45)" }}>
              Sample · 2,341 letters dispatched Q3–Q4 2025 · Internal CivilCase outcomes data.
            </div>
          </div>
        </div>
      </section>

      {/* WHAT'S IN THE LETTER — annotated mockup ported from legacy /demand-letter */}
      <section style={{ padding: `120px ${PAD_X}` }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start", marginBottom: 60 }}>
          <div>
            <div style={{ ...eyebrow, marginBottom: 22 }}>WHAT&rsquo;S IN THE LETTER</div>
            <h2 className="firm-h" style={H2}>Built specifically for <em>your dispute</em>.</h2>
          </div>
          <p style={body}>
            Every letter follows a structure courts respect: who, what, when, the law that applies, the demand,
            and the deadline.
          </p>
        </div>

        <style dangerouslySetInnerHTML={{ __html: `
          .firm-anno-mark {
            background: rgba(184,51,31,0.10);
            color: ${C.accent};
            padding: 1px 5px;
            border-radius: 3px;
            box-decoration-break: clone;
            -webkit-box-decoration-break: clone;
            font-weight: 600;
          }
          .firm-anno-callout {
            position: relative;
            background: #fff;
            border: 1px solid ${C.line};
            border-radius: 10px;
            padding: 12px 14px;
            box-shadow: 0 4px 14px rgba(60,45,25,0.05);
          }
          .firm-anno-callout::before {
            content: "";
            position: absolute;
            top: 50%;
            left: -100px;
            width: 92px;
            height: 1.5px;
            background-image: linear-gradient(to right, ${C.accent} 50%, transparent 50%);
            background-size: 8px 1.5px;
            background-repeat: repeat-x;
            transform: translateY(-50%);
          }
          .firm-anno-callout::after {
            content: "";
            position: absolute;
            top: 50%;
            left: -104px;
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: ${C.accent};
            transform: translateY(-50%);
          }
          @media (max-width: 1100px) {
            .firm-anno-grid { grid-template-columns: 1fr !important; column-gap: 0 !important; }
            .firm-anno-callout::before, .firm-anno-callout::after { display: none; }
          }
        `}} />

        <div
          className="firm-anno-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) 240px",
            columnGap: 100,
            alignItems: "start",
            maxWidth: 1020,
            margin: "0 auto",
          }}
        >
          {/* Letter mockup */}
          <article
            style={{
              position: "relative",
              background: "#ffffff",
              border: `1px solid ${C.line}`,
              borderRadius: 6,
              padding: "40px 44px 48px",
              color: C.fg,
              font: `14px/1.6 ${SERIF_FONT}`,
              boxShadow: "0 12px 36px rgba(60,45,25,0.08)",
            }}
          >
            <header style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 0 }}>
              <div>
                <div style={{ font: `600 16px/1 ${HEAD_FONT}`, letterSpacing: "0.12em", color: C.fg, marginBottom: 4 }}>CIVILCASE</div>
                <div style={{ font: `700 10px/1 ${BODY_FONT}`, letterSpacing: "0.14em", color: C.muted }}>DEMAND LETTER</div>
              </div>
              <div style={{ font: `12px/1 ${BODY_FONT}`, color: C.muted }}>April 21, 2026</div>
            </header>
            <div style={{ height: 1, background: "rgba(31,26,22,0.12)", margin: "18px 0 22px" }} />

            <div style={{ display: "grid", gap: 6, marginBottom: 26 }}>
              <div style={{ display: "grid", gridTemplateColumns: "50px 1fr", gap: 16, alignItems: "baseline" }}>
                <span style={{ font: `700 12px/1 ${BODY_FONT}`, letterSpacing: "0.06em", color: C.muted }}>TO:</span>
                <p style={{ margin: 0, font: `15px/1.4 ${SERIF_FONT}`, color: C.fg }}>Oakwood Properties LLC</p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "50px 1fr", gap: 16, alignItems: "baseline" }}>
                <span style={{ font: `700 12px/1 ${BODY_FONT}`, letterSpacing: "0.06em", color: C.muted }}>RE:</span>
                <p style={{ margin: 0, font: `15px/1.4 ${SERIF_FONT}`, color: C.fg }}>Demand for Return of Security Deposit</p>
              </div>
            </div>

            <p style={{ margin: "0 0 18px" }}>
              Pursuant to <span className="firm-anno-mark">Cal. Civ. Code § 1950.5</span>, you were required to
              return my $1,500 security deposit within 21 days of move-out. That period has elapsed.
            </p>
            <p style={{ margin: "0 0 12px" }}>
              I demand within <span className="firm-anno-mark">fourteen (14) days</span>:
            </p>
            <ul style={{ listStyle: "disc", paddingLeft: 22, margin: "0 0 18px" }}>
              <li style={{ marginBottom: 6 }}>Return of the $1,500 deposit in full;</li>
              <li style={{ marginBottom: 6 }}><span className="firm-anno-mark">Statutory damages of 2x for bad-faith retention ($3,000)</span>.</li>
            </ul>
            <p style={{ margin: "0 0 24px" }}>
              <strong style={{ fontWeight: 700 }}>Total demand: $4,500.00.</strong>{" "}
              <span className="firm-anno-mark">If unresolved, I will file in Small Claims Court</span>.
            </p>

            <p style={{ margin: "32px 0 4px", font: `italic 28px/1 ${SERIF_FONT}`, color: C.accent }}>Jordan A. Tenant</p>
            <p style={{ margin: 0, font: `14px/1 ${SERIF_FONT}`, color: C.fg }}>
              <span className="firm-anno-mark">Jordan A. Tenant</span>
            </p>

            <Image
              src="/icons/cc-seal-1.webp"
              alt=""
              width={120}
              height={120}
              aria-hidden
              style={{ position: "absolute", bottom: 24, right: 24, width: 96, height: 96, objectFit: "contain", pointerEvents: "none" }}
            />
          </article>

          {/* Annotations — narrow column with leader-line callouts */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16, pointerEvents: "none" }}>
            {[
              ["Specific law", "We cite the exact statute that applies."],
              ["Penalty calculated", "We include any statutory multipliers you’re owed."],
              ["Clear deadline", "A firm 14-day deadline is written in."],
              ["Court threat", "We name small claims court as the next step if they don’t pay."],
              ["Evidence referenced", "We reference the proof you already have."],
            ].map(([t, d]) => (
              <div key={t} className="firm-anno-callout">
                <strong style={{ display: "block", font: `700 13px/1.3 ${BODY_FONT}`, color: C.fg, marginBottom: 3 }}>{t}</strong>
                <span style={{ display: "block", font: `12px/1.4 ${BODY_FONT}`, color: C.muted }}>{d}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer cards — dark + cream pair */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 32, maxWidth: 1020, marginLeft: "auto", marginRight: "auto" }}>
          {[
            { Icon: ShieldCheck, title: "Professional. Persuasive. Court-Ready.", body: "Our letters are written to create pressure and build your paper trail." },
            { Icon: FileText, title: "100% customized to your case.", body: "No templates. A letter that fits your facts and your state." },
          ].map(({ Icon, title, body: bodyText }) => (
            <div key={title} style={{ display: "flex", gap: 20, padding: "24px 28px", background: C.cream, borderRadius: 20, alignItems: "center" }}>
              <div style={{ width: 46, height: 46, borderRadius: 999, background: C.dark, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon size={20} strokeWidth={1.8} aria-hidden />
              </div>
              <div>
                <div style={{ font: `700 15.5px/1.3 ${HEAD_FONT}`, color: C.fg, letterSpacing: "-0.005em" }}>{title}</div>
                <div style={{ font: `13.5px/1.5 ${BODY_FONT}`, color: C.muted, marginTop: 4 }}>{bodyText}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section style={{ padding: `120px ${PAD_X}` }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 80, marginBottom: 56 }}>
          <div>
            <div style={{ ...eyebrow, marginBottom: 22 }}>PROCESS</div>
            <h2 className="firm-h" style={H2}>From your facts to <em>filed</em>.</h2>
          </div>
          <p style={{ ...body, alignSelf: "end" }}>
            We&rsquo;ve collapsed what a paralegal would charge $200/hour to do into a single intake. Most users
            finish in under eight minutes; their letter is in the mail within 24 hours.
          </p>
        </div>
        <style dangerouslySetInnerHTML={{ __html: `
          .firm-step { border-top: 4px solid transparent; transition: border-top-color 0.18s ease, background 0.18s ease; }
          .firm-step:hover { border-top-color: ${C.accent}; background: ${C.cream}; }
        `}} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0, borderTop: `1px solid ${C.fg}`, borderBottom: `1px solid ${C.line}` }}>
          {[
            { Icon: MessageSquare, t: "Tell us what happened", d: "Plain-language intake. We ask the questions. You stay in your seat.", time: "~8 min" },
            { Icon: PenLine, t: "We draft your letter", d: "Attorney-reviewed, specific to your state, statute, and facts.", time: "24 hours" },
            { Icon: Send, t: "Certified mail dispatch", d: "USPS certified with tracking. Signature on delivery.", time: "2–4 days" },
            { Icon: Scale, t: "Escalate if ignored", d: "Filing assistance, court-ready forms, court-day procedure brief.", time: "14+ days" },
          ].map(({ Icon, t, d, time }, i) => (
            <div key={t} className="firm-step" style={{ padding: "36px 28px", borderLeft: i ? `1px solid ${C.line}` : "none" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 22 }}>
                <div style={{ font: `500 13px/1 ${BODY_FONT}`, color: C.accent, letterSpacing: "0.08em" }}>STEP 0{i + 1}</div>
                <div style={{ width: 36, height: 36, borderRadius: 999, background: "rgba(184,51,31,0.10)", color: C.accent, display: "grid", placeItems: "center" }}>
                  <Icon size={18} strokeWidth={1.8} aria-hidden />
                </div>
              </div>
              <div style={{ font: `600 28px/1.22 ${HEAD_FONT}`, color: C.fg, minHeight: 52, letterSpacing: "-0.01em" }}>{t}</div>
              <p style={{ ...body, marginTop: 12, fontSize: 14 }}>{d}</p>
              <div style={{ marginTop: 22, font: `11px/1 ${BODY_FONT}`, letterSpacing: "0.16em", color: C.muted, textTransform: "uppercase" }}>{time}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SAMPLE LETTERS */}
      <section style={{ padding: `0 ${PAD_X}`, background: C.paper }}>
        <div style={{ padding: "100px 0" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 80, marginBottom: 60 }}>
            <div>
              <div style={{ ...eyebrow, marginBottom: 22 }}>SAMPLE EXCERPTS</div>
              <h2 className="firm-h" style={H2}>Three letters. <em>Three outcomes</em>.</h2>
            </div>
            <p style={{ ...body, alignSelf: "end" }}>
              Excerpts pulled from real CivilCase letters that resolved before filing. Names and amounts are
              unchanged; identifying details have been redacted with consent.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {[
              { tag: "Security Deposit", state: "California", code: "Civ. Code § 1950.5", excerpt: "Pursuant to Cal. Civ. Code § 1950.5, you were required to return my $1,200 security deposit within 21 days of move-out. That period has elapsed. I demand within fourteen (14) days: return of the $1,200 deposit in full, statutory damages of 2× for bad-faith retention ($2,400). Total demand: $4,200.", outcome: "Paid in 4 days." },
              { tag: "Unpaid Contractor", state: "Texas", code: "Tex. Prop. Code § 53.052", excerpt: "On March 14, 2025 you agreed in writing to complete kitchen renovation work for $9,800. As of this date, work remains incomplete and four (4) months have passed since your last on-site presence. I demand return of the $4,200 paid for unperformed work, or completion within 14 days, after which I will perfect a mechanic's lien.", outcome: "Settled $4,200." },
              { tag: "Final Wages", state: "New York", code: "NY Lab. Law § 191", excerpt: "Under NY Lab. Law § 191, final wages were due on the regular payday following separation. My final paycheck dated 10/22 has not been issued. I demand within fourteen (14) days: payment of $1,820 in earned wages, liquidated damages of 100% ($1,820 additional), and interest. Failure will be filed with the NY DOL.", outcome: "DOL filing avoided." },
            ].map((s) => (
              <div key={s.tag} style={{ background: "#fff", border: `1px solid ${C.line}`, borderRadius: RAD.card, overflow: "hidden" }}>
                <div style={{ padding: "20px 22px", borderBottom: `1px solid ${C.line}`, background: C.bg }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <div style={{ ...eyebrow, color: C.accent }}>{s.tag}</div>
                    <div style={{ font: `12px/1 ${BODY_FONT}`, color: C.muted }}>{s.state}</div>
                  </div>
                  <div style={{ font: `500 18px/1.3 ${HEAD_FONT}`, color: C.fg, marginTop: 12, letterSpacing: "-0.005em" }}>{s.code}</div>
                </div>
                <div style={{ padding: "26px 22px" }}>
                  <div style={{ font: `13.5px/1.7 ${SERIF_FONT}`, color: C.fg, fontStyle: "italic" }}>&ldquo;{s.excerpt}&rdquo;</div>
                  <div style={{ marginTop: 22, paddingTop: 16, borderTop: `1px solid ${C.line}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ ...eyebrow, color: C.muted }}>Outcome</div>
                    <div style={{ font: `500 14px/1 ${HEAD_FONT}`, color: C.accent }}>{s.outcome}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BAR */}
      <section style={{ padding: `60px ${PAD_X}` }}>
        <div style={{ background: C.dark, color: "#fff", padding: "36px 36px", borderRadius: RAD.panel, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 32, flexWrap: "wrap" }}>
          {/* Left — icon + headline + sub */}
          <div style={{ display: "flex", alignItems: "center", gap: 22, flex: "1 1 auto", minWidth: 0 }}>
            <div style={{ width: 56, height: 56, borderRadius: 14, background: "#fff", color: C.dark, display: "grid", placeItems: "center", flexShrink: 0 }}>
              <ClipboardCheck size={26} strokeWidth={1.9} aria-hidden />
            </div>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <h2 className="firm-h firm-h-light" style={{ font: `700 30px/1.15 ${HEAD_FONT}`, color: "#fff", letterSpacing: "-0.02em", margin: 0, whiteSpace: "nowrap" }}>
                Ready to <em>send your letter</em>?
              </h2>
              <p style={{ font: `14px/1.5 ${BODY_FONT}`, color: "rgba(255,255,255,0.7)", margin: "6px 0 0" }}>
                No account. No subscription. Just results.
              </p>
            </div>
          </div>

          {/* Right — divider + button + caption */}
          <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
            <div aria-hidden style={{ width: 1, height: 56, background: "rgba(255,255,255,0.15)" }} />
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
              <FirmBtn kind="accent" href="/dashboard/cases/new">Start Your Letter</FirmBtn>
              <div style={{ font: `12.5px/1.4 ${BODY_FONT}`, color: "rgba(255,255,255,0.5)" }}>Takes about 5 minutes · From $29</div>
            </div>
          </div>
        </div>
      </section>

      {/* DASHBOARD PANEL — your case, all in one place */}
      <section style={{ padding: `120px ${PAD_X}` }}>
        <div style={{ background: C.darkPanel, color: "#fff", padding: 80, borderRadius: RAD.panel, display: "grid", gridTemplateColumns: "0.7fr 1.6fr", gap: 60, alignItems: "center" }}>
          <div>
            <div style={{ ...eyebrow, color: "rgba(255,255,255,0.6)", marginBottom: 22 }}>YOUR CASE, ALL IN ONE PLACE</div>
            <h2 className="firm-h firm-h-light" style={{ ...H2, color: "#fff" }}>Track everything. Win with <em>confidence</em>.</h2>
            <p style={{ font: `16px/1.6 ${BODY_FONT}`, color: "rgba(255,255,255,0.7)", marginTop: 22, maxWidth: 440 }}>
              Every case has a dashboard. Every deadline has a reminder. Every document is one click away.
              Court doesn&rsquo;t tolerate missed dates. We don&rsquo;t either.
            </p>
            <div style={{ display: "grid", gap: 14, marginTop: 32, maxWidth: 380 }}>
              {["Track your case progress", "Get court updates", "Store all documents in one place", "Never miss a deadline"].map((t) => (
                <div key={t} style={{ display: "flex", gap: 12, alignItems: "center", color: "rgba(255,255,255,0.85)" }}>
                  <Check color={C.accentOnDark} />
                  <span style={{ font: `14px/1.4 ${BODY_FONT}` }}>{t}</span>
                </div>
              ))}
            </div>
            <button type="button" style={{ marginTop: 36, background: "#fff", color: C.dark, border: "none", padding: "13px 22px", font: `500 13px/1 ${BODY_FONT}`, cursor: "pointer", borderRadius: 999 }}>
              See your dashboard →
            </button>
          </div>
          {/* Right — full dashboard mockup ported from legacy /demand-letter */}
          <div className="dl-bento-dash">
            <aside className="dl-bento-dash-side" aria-hidden>
              <div className="dl-bento-dash-brand">
                <span className="dl-bento-dash-brand-mark">C</span>
                <span className="dl-bento-dash-brand-name">CivilCase</span>
              </div>
              <nav className="dl-bento-dash-nav">
                <span><BarChart3 size={14} strokeWidth={1.8} /> Dashboard</span>
                <span className="is-active"><Folder size={14} strokeWidth={1.8} /> Cases</span>
                <span><Mail size={14} strokeWidth={1.8} /> Notifications</span>
                <span><FileText size={14} strokeWidth={1.8} /> Billing</span>
                <span><Headphones size={14} strokeWidth={1.8} /> Support</span>
              </nav>
            </aside>

            <div className="dl-bento-dash-main-area">
              <ol className="dl-bento-dash-phases">
                <li className="is-done"><span>1</span><span>Eligibility</span></li>
                <li className="is-done"><span>2</span><span>Category</span></li>
                <li className="is-active"><span>3</span><span>Defendant</span></li>
                <li><span>4</span><span>Your info</span></li>
                <li><span>5</span><span>What happened</span></li>
                <li><span>6</span><span>Amount</span></li>
                <li><span>7</span><span>Evidence</span></li>
                <li className="is-locked"><span>8</span><span>Review</span></li>
              </ol>

              <div className="dl-bento-dash-body" style={{ gridTemplateColumns: "1fr" }}>
                <div className="dl-bento-dash-main" style={{ borderRight: "none" }}>
                  <div className="dl-bento-wiz-eyebrow">Phase 3 of 8 &middot; Defendant</div>
                  <h3 className="dl-bento-wiz-q">Who are you sending this to?</h3>
                  <p className="dl-bento-wiz-sub">
                    Pick whether the recipient is a person or a business. We&rsquo;ll set the
                    letter tone accordingly.
                  </p>

                  <div className="dl-bento-wiz-pills" aria-hidden>
                    <span className="dl-bento-wiz-pill dl-bento-wiz-pill-on">
                      <UserCheck size={14} strokeWidth={1.9} />
                      Individual
                    </span>
                    <span className="dl-bento-wiz-pill">
                      <Briefcase size={14} strokeWidth={1.9} />
                      Business
                    </span>
                  </div>

                  <div className="dl-bento-wiz-fields">
                    <div className="dl-bento-wiz-row">
                      <div className="dl-bento-wiz-field">
                        <label>First name <em>*</em></label>
                        <div className="dl-bento-wiz-input">Jordan</div>
                      </div>
                      <div className="dl-bento-wiz-field">
                        <label>Last name <em>*</em></label>
                        <div className="dl-bento-wiz-input">Hayes</div>
                      </div>
                    </div>
                    <div className="dl-bento-wiz-row">
                      <div className="dl-bento-wiz-field">
                        <label>Email</label>
                        <div className="dl-bento-wiz-input dl-bento-wiz-input-empty">
                          jordan@example.com
                        </div>
                      </div>
                      <div className="dl-bento-wiz-field">
                        <label>Phone</label>
                        <div className="dl-bento-wiz-input dl-bento-wiz-input-empty">
                          (415) 555-0142
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="dl-bento-wiz-actions">
                    <span className="dl-bento-wiz-back">Back</span>
                    <span className="dl-bento-wiz-next">
                      Continue
                      <ArrowRight size={14} strokeWidth={2.4} />
                    </span>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING (cream-bg section) */}
      <section style={{ padding: `120px ${PAD_X}`, background: C.cream }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div style={{ ...eyebrow, marginBottom: 18 }}>PRICING</div>
          <h2 className="firm-h" style={H2}>One-time, <em>per letter</em>.</h2>
          <p style={{ ...body, maxWidth: 540, margin: "18px auto 0" }}>
            No subscription. No retainer. Pay once when you send. If we can&rsquo;t draft your letter, we refund
            in full.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, maxWidth: 1000, margin: "0 auto", alignItems: "start" }}>
          {[
            {
              name: "Send the Letter",
              price: "29",
              was: null as string | null,
              blurbStrong: "Good for most cases.",
              blurbRest: "Perfect first step.",
              popular: false,
              Icon: Mail,
              StatIcon: Target,
              statStrong: "Most disputes settle",
              statSub: "at this stage.",
              includesLabel: "Includes:",
              items: ["Professional demand letter", "Certified mail with tracking", "14-day response deadline", "You choose the send date"],
              dots: 4,
              cta: "Send the Letter",
              foot: "Best when communication is open and you want formal documentation.",
            },
            {
              name: "Full Pressure",
              price: "49",
              was: "79",
              blurbStrong: "Built for ignored messages",
              blurbRest: "and stubborn debtors.",
              popular: true,
              Icon: ShieldCheck,
              StatIcon: TrendingUp,
              statStrong: "Higher response rate",
              statSub: "with full escalation.",
              includesLabel: "Includes everything in Send the Letter, plus:",
              items: ["Escalating follow-up sequence", "Voice of Justice phone calls", "Escalating email follow-ups", "Final Notice letter on day 10", "One-tap escalation to filing"],
              dots: 5,
              cta: "Start Full Pressure",
              foot: "Best when they’ve ignored you, ghosted you, or won’t take you seriously.",
            },
          ].map((p) => {
            const bg = p.popular ? C.dark : "#fff";
            const fg = p.popular ? "#fff" : C.fg;
            const muted = p.popular ? "rgba(255,255,255,0.7)" : C.muted;
            const subtleLine = p.popular ? "rgba(255,255,255,0.12)" : C.line;
            const iconBg = p.popular ? "rgba(184,51,31,0.20)" : C.cream;
            const iconColor = p.popular ? C.accentOnDark : C.accent;
            const includesColor = p.popular ? C.accentOnDark : C.accent;
            return (
              <div key={p.name} style={{ padding: 40, background: bg, color: fg, border: p.popular ? "none" : `1px solid ${C.line}`, borderRadius: RAD.panel, position: "relative" }}>
                {p.popular && (
                  <div style={{ position: "absolute", top: -14, left: 32, font: `700 10px/1 ${BODY_FONT}`, letterSpacing: "0.22em", color: "#fef9f1", background: "#3D7A4A", padding: "8px 14px", borderRadius: 999 }}>
                    MOST POPULAR
                  </div>
                )}

                {/* Header — icon + name + tagline */}
                <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28 }}>
                  <div style={{ width: 56, height: 56, borderRadius: 14, background: iconBg, color: iconColor, display: "grid", placeItems: "center", flexShrink: 0 }}>
                    <p.Icon size={26} strokeWidth={1.8} aria-hidden />
                  </div>
                  <div>
                    <h3 style={{ margin: 0, font: `700 24px/1.15 ${HEAD_FONT}`, letterSpacing: "-0.015em" }}>{p.name}</h3>
                    <p style={{ margin: "6px 0 0", font: `13.5px/1.4 ${BODY_FONT}`, color: muted }}>
                      <strong style={{ color: fg, fontWeight: 700 }}>{p.blurbStrong}</strong> {p.blurbRest}
                    </p>
                  </div>
                </div>

                {/* Price */}
                <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 22 }}>
                  <div style={{ font: `500 18px/1 ${BODY_FONT}`, color: muted }}>$</div>
                  <div style={{ font: `700 64px/1 ${HEAD_FONT}`, letterSpacing: "-0.03em" }}>{p.price}</div>
                  {p.was && (
                    <div style={{ font: `500 18px/1 ${BODY_FONT}`, color: muted, textDecoration: "line-through" }}>${p.was}</div>
                  )}
                  <div style={{ font: `13px/1 ${BODY_FONT}`, color: muted, marginLeft: "auto" }}>one-time</div>
                </div>

                {/* Stat row */}
                <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", background: p.popular ? "rgba(184,51,31,0.14)" : C.cream, borderRadius: 12, marginBottom: 24 }}>
                  <p.StatIcon size={22} strokeWidth={1.8} color={p.popular ? C.accentOnDark : C.accent} aria-hidden />
                  <div style={{ font: `13.5px/1.35 ${BODY_FONT}`, color: muted }}>
                    <strong style={{ color: fg, fontWeight: 700, display: "block" }}>{p.statStrong}</strong>
                    {p.statSub}
                  </div>
                </div>

                {/* Includes */}
                <div style={{ marginBottom: 22 }}>
                  <div style={{ font: `700 13px/1.3 ${BODY_FONT}`, color: includesColor, letterSpacing: "0.04em", marginBottom: 12 }}>{p.includesLabel}</div>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 10 }}>
                    {p.items.map((it) => (
                      <li key={it} style={{ display: "flex", gap: 12, alignItems: "center", font: `15px/1.4 ${BODY_FONT}`, color: fg }}>
                        <CheckCircle2 size={22} strokeWidth={2} color={iconColor} aria-hidden />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Pressure level */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0", borderTop: `1px solid ${subtleLine}`, borderBottom: `1px solid ${subtleLine}`, marginBottom: 24 }}>
                  <span style={{ font: `700 11px/1 ${BODY_FONT}`, letterSpacing: "0.16em", textTransform: "uppercase", color: muted }}>Pressure Level</span>
                  <span style={{ display: "inline-flex", gap: 6 }}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span
                        key={i}
                        aria-hidden
                        style={{
                          width: 10,
                          height: 10,
                          borderRadius: 999,
                          background: i < p.dots ? iconColor : (p.popular ? "rgba(255,255,255,0.18)" : "rgba(31,27,22,0.12)"),
                        }}
                      />
                    ))}
                  </span>
                </div>

                <Link href="/dashboard/cases/new" style={{ width: "100%", background: p.popular ? "#3D7A4A" : C.dark, color: p.popular ? "#fef9f1" : "#fff", border: "none", padding: 16, font: `600 14px/1 ${BODY_FONT}`, cursor: "pointer", borderRadius: 999, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 10, textDecoration: "none" }}>
                  {p.cta} <ArrowRight size={16} strokeWidth={2} />
                </Link>

                <p style={{ margin: "16px 0 0", font: `13px/1.45 ${BODY_FONT}`, color: muted, textAlign: "center" }}>{p.foot}</p>
              </div>
            );
          })}
        </div>
        <div style={{ textAlign: "center", marginTop: 32, font: `13px/1.4 ${BODY_FONT}`, color: C.muted }}>
          Refund policy · If we cannot draft your letter, we refund in full within 24 hours.
        </div>
      </section>

      {/* TESTIMONIALS (dark) */}
      <section style={{ background: C.darkPanel, color: "#fff", padding: `120px ${PAD_X}` }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 80, marginBottom: 56 }}>
          <div>
            <div style={{ ...eyebrow, color: "rgba(255,255,255,0.6)", marginBottom: 22 }}>THE LETTERS THAT WORKED</div>
            <h2 className="firm-h firm-h-light" style={{ ...H2, color: "#fff" }}>Three letters from <em>last quarter</em>.</h2>
            <p style={{ font: `16px/1.6 ${BODY_FONT}`, color: "rgba(255,255,255,0.7)", marginTop: 22, maxWidth: 420 }}>
              Resolved without filing. Verified against bank records and confirmed by the plaintiff.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0 }}>
            {[
              { who: "Maya R.", where: "Brooklyn, NY", amt: "$2,800", days: "12 DAYS", quote: "I'd been chasing the deposit for six weeks on my own. CivilCase put a demand letter on his desk and he wired it back the next morning." },
              { who: "Daniel P.", where: "Austin, TX", amt: "$4,200", days: "11 DAYS", quote: "Two lawyers had already taken $1,800 of mine for nothing. CivilCase finished it in eleven days for the price of a stamp." },
              { who: "Marcos W.", where: "Phoenix, AZ", amt: "$6,750", days: "JUDGMENT", quote: "My ex-employer thought ignoring me would be cheaper than paying my final check. The court disagreed. So did the bank levy." },
            ].map((c, i) => (
              <div key={c.who} style={{ padding: "0 24px", borderLeft: i ? "1px solid rgba(255,255,255,0.12)" : "none" }}>
                <div style={{ font: `500 11px/1 ${BODY_FONT}`, color: C.accentOnDark, letterSpacing: "0.16em", marginBottom: 18 }}>{c.days}</div>
                <div style={{ font: `500 38px/1 ${HEAD_FONT}`, letterSpacing: "-0.015em" }}>{c.amt}</div>
                <p style={{ font: `14.5px/1.6 ${BODY_FONT}`, color: "rgba(255,255,255,0.78)", marginTop: 24, fontStyle: "italic" }}>&ldquo;{c.quote}&rdquo;</p>
                <div style={{ marginTop: 22, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.12)" }}>
                  <div style={{ font: `500 13.5px/1 ${BODY_FONT}`, color: "#fff" }}>{c.who}</div>
                  <div style={{ font: `12px/1.4 ${BODY_FONT}`, color: "rgba(255,255,255,0.5)", marginTop: 4 }}>{c.where}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FaqSection
        title={<>Demand letter <em>questions</em>.</>}
        subtitle="The most common questions we get from first-time senders."
        faqs={[
          { q: "Will the recipient know I wrote it?", a: "Yes — your name and return address appear on the letter. CivilCase's role is identified at the bottom as drafter, not counsel of record. We are not your attorney." },
          { q: "Do you contact me before mailing?", a: null },
          { q: "Can I review the letter before it goes out?", a: null },
          { q: "What if I don't have the other person's address?", a: null },
          { q: "What happens if they ignore it?", a: null },
          { q: "What if they offer less than I asked for?", a: null },
          { q: "Is CivilCase a law firm?", a: null },
          { q: "Can I send a demand letter on behalf of a business?", a: null },
          { q: "What if I'm being sued — can you send a response letter?", a: null },
          { q: "How is this different from a cease-and-desist?", a: null },
        ]}
      />
    </main>
  );
}
