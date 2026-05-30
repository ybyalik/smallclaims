import type { Metadata } from "next";
import {
  C, H1, H2, eyebrow, body, PAD_X, RAD, HEAD_FONT, BODY_FONT, SERIF_FONT, italicEmCSS,
  Check, ShieldLogo, FirmBtn, FaqSection, RatingStrip,
  FirmHeroStats, FirmProcessStrip, FirmCtaBar,
} from "../../../components/firm";
import { breadcrumbList, serviceSchema, jsonLdGraph } from "../../../lib/schema";
import Image from "next/image";
import { DollarSign, Clock, MapPin, Building2, FileText, ShieldCheck, MessageSquare, Briefcase, Scale, ClipboardCheck } from "lucide-react";

// Filing Kit service page. All copy ported from /filing-kit (the
// existing production page) and re-implemented in the firm design.

export const metadata: Metadata = {
  title: "Filing Kit · CivilCase",
  description:
    "A state- and county-specific filing kit: the right forms, fee schedule, service-of-process rules, statute of limitations, and hearing prep. File in under an hour.",
  alternates: { canonical: "/filing-kit" },
};

const FAQS: { q: string; a: string }[] = [
  {
    q: "What's in the Filing Kit?",
    a: "A state-specific filing guide: where to file (court name + venue rules), every required form with code and link to the current PDF, the filing fee schedule and fee-waiver eligibility, pre-suit requirements (demand letter, government claim, mediation if applicable), all allowed service-of-process methods with cost and deadlines, hearing-day preparation, and the most common pitfalls that get cases dismissed.",
  },
  { q: "Will it work for my state?", a: "Yes. We cover all 50 states plus DC. Each guide is built from your state's small-claims rules (forms, fees, statute, service methods) with county-difference notes appended where your county varies from the state default." },
  { q: "Do I have to use this with a CivilCase demand letter?", a: "No. The Filing Kit is sold standalone. Whether you sent your own letter, used another service, or are skipping the letter step entirely, the kit gives you everything you need to file." },
  { q: "What about service of process?", a: "The kit walks you through the three legal ways to serve the defendant in your state (sheriff, certified mail through the clerk, or process server), with the cost of each and which one is most likely to work for your specific defendant." },
  { q: "Can you file for me?", a: "No. Most states require the plaintiff to file in person or via the court's e-filing portal directly. We give you everything you need to do it yourself in under an hour, including which window in the courthouse to look for." },
  { q: "What if I lose?", a: "Most plaintiffs who prepare properly win small claims. If the court rules against you, the loss is around $30 to $100 in filing fees (which the kit told you about up front). Many states let you appeal within 30 days, and the kit covers what that looks like." },
  { q: "What if I win?", a: "Add the Post-Judgment Collection Plan ($49) to actually collect on your judgment. Winning is half the battle. Collecting is the other half." },
  { q: "Is CivilCase a law firm?", a: "No. We're a document-preparation service, not a law firm, and we don't provide legal advice. The Filing Kit is informational, based on public court rules and statutes, to help you represent yourself." },
];

// Static Filing-Kit document mockup (analog of the demand-letter
// LetterDoc, but with kit copy). Used in hero + anatomy.
function FilingKitDoc({ style = {} }: { style?: React.CSSProperties }) {
  return (
    <div style={{
      background: "#fdfaf3",
      boxShadow: "0 1px 0 rgba(0,0,0,0.04), 0 12px 40px -12px rgba(40,28,12,0.18), 0 2px 6px rgba(0,0,0,0.04)",
      padding: "44px 48px",
      font: `12.5px/1.6 ${SERIF_FONT}`,
      color: "#1a1612",
      position: "relative",
      borderRadius: RAD.card,
      ...style,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 18 }}>
        <div>
          <div style={{ font: `600 11px/1 ${BODY_FONT}`, letterSpacing: "0.22em", color: C.accent }}>CIVILCASE</div>
          <div style={{ font: `500 10px/1 ${BODY_FONT}`, letterSpacing: "0.18em", color: "#7a7165", marginTop: 6 }}>FILING KIT</div>
        </div>
        <div style={{ font: `11px/1 ${BODY_FONT}`, color: "#7a7165" }}>Los Angeles County</div>
      </div>
      <div style={{ height: 1, background: "#e7dfd0", marginBottom: 18 }} />
      <div style={{ fontSize: 12 }}>
        <p style={{ margin: "0 0 10px 0" }}>
          <strong style={{ fontWeight: 600 }}>COURT:</strong>
          <br />
          Stanley Mosk Courthouse, Dept. 77
          <br />
          111 N Hill St, Los Angeles, CA 90012
        </p>
        <p style={{ margin: "0 0 10px 0" }}>
          <strong style={{ fontWeight: 600 }}>FORMS:</strong>
          <br />
          SC-100 · SC-104 · SC-130
        </p>
        <p style={{ margin: "0 0 10px 0" }}>
          Filing fee: <strong style={{ fontWeight: 600 }}>$75</strong> (claims $1,500-$5,000).
        </p>
        <p style={{ margin: "0 0 10px 0" }}>
          Statute of limitations: <strong style={{ fontWeight: 600 }}>4 years</strong> from breach.
        </p>
        <p style={{ margin: "0 0 18px 0" }}>
          <strong style={{ fontWeight: 600 }}>Hearing window: 30-70 days from filing.</strong>
        </p>
      </div>
      <div style={{ position: "absolute", right: 38, bottom: 38, width: 56, height: 56, borderRadius: "50%", border: `1.5px solid ${C.accent}`, color: C.accent, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <ShieldLogo size={20} color={C.accent} />
      </div>
    </div>
  );
}

export default function FilingKit2() {
  const jsonLd = jsonLdGraph(
    serviceSchema({
      name: "Small Claims Filing Kit",
      description: "County-specific filing kit with the right forms, current filing fees, service rules, and a hearing-day checklist.",
      url: "/filing-kit",
      priceFrom: 79,
      audience: "Self-represented plaintiffs",
    }),
    breadcrumbList([
      { name: "CivilCase", url: "/" },
      { name: "Filing Kit", url: "/filing-kit" },
    ]),
  );

  return (
    <main style={{ background: C.bg, color: C.fg, font: `16px/1.5 ${BODY_FONT}` }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <style dangerouslySetInnerHTML={{ __html: italicEmCSS }} />

      {/* HERO */}
      <section style={{ padding: `80px ${PAD_X} 100px` }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.15fr 1fr", gap: 48, alignItems: "center" }}>
          <div>
            <RatingStrip style={{ marginBottom: 24 }} />
            <h1 className="firm-h" style={{ ...H1, fontSize: 68 }}>File your case the <em>right way</em>.</h1>
            <p style={{ font: `18px/1.55 ${BODY_FONT}`, color: C.muted, maxWidth: 540, marginTop: 28 }}>
              Every small-claims court has its own forms, fees, and service rules. The Filing Kit packages all
              of it into one place for your exact county. File in under an hour. Show up to court prepared.
            </p>
            <div style={{ display: "grid", gap: 14, marginTop: 32, maxWidth: 540 }}>
              {[
                "Every form with code and link for your state",
                "Filing fee schedule + fee-waiver eligibility",
                "All allowed service-of-process methods",
                "Venue rules, hearing prep, common pitfalls",
              ].map((t) => (
                <div key={t} style={{ display: "flex", alignItems: "center", gap: 12, color: C.fg }}>
                  <Check color={C.accent} />
                  <span style={{ font: `15.5px/1.4 ${BODY_FONT}` }}>{t}</span>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 14, marginTop: 36 }}>
              <FirmBtn href="/filing-kit">Get My Filing Kit</FirmBtn>
              <FirmBtn kind="ghost" href="/filing-kit">See a Sample Kit</FirmBtn>
            </div>
            <FirmHeroStats items={[
              { Icon: DollarSign, headline: "From $79", sub: "one-time fee" },
              { Icon: Clock, headline: "Minutes", sub: "turnaround" },
              { Icon: MapPin, headline: "All 50 + DC", sub: "every state covered" },
              { Icon: Building2, headline: "3,000+", sub: "counties supported" },
            ]} />
          </div>
          <div style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center", minHeight: 580 }}>
            <div style={{ position: "relative", width: 400, height: 560 }}>
              <div style={{ position: "absolute", top: 20, left: 30, transform: "rotate(-3deg)", width: 360 }}>
                <FilingKitDoc />
              </div>
              <div style={{ position: "absolute", top: 70, left: -10, transform: "rotate(2deg)", width: 360, opacity: 0.95 }}>
                <FilingKitDoc />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY THE FILING KIT WORKS (cream-bg) */}
      <section style={{ padding: `120px ${PAD_X}`, background: C.cream }}>
        <div style={{ background: C.paper, border: `1px solid ${C.line}`, borderRadius: RAD.panel, padding: 80, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <div>
            <div style={{ ...eyebrow, marginBottom: 22 }}>WHY THE FILING KIT WORKS</div>
            <h2 className="firm-h" style={H2}>The right paperwork is <em>half the battle</em>.</h2>
            <p style={{ ...body, marginTop: 22, maxWidth: 460 }}>
              Most self-represented plaintiffs lose on a technicality: wrong form, wrong fee, wrong service.
              The kit removes the guesswork.
            </p>
            <div style={{ marginTop: 36, display: "grid", gap: 22 }}>
              {[
                ["Personalized to Your Court", "Not a generic template. The kit is built around the exact courthouse where you'll file."],
                ["Right Forms, Right Order", "We know which form comes first and which the clerk will reject without. No second trip."],
                ["Hearing-Day Game Plan", "The judge will ask the same questions every time. We tell you what they are and how to answer them."],
              ].map(([t, d], i) => (
                <div key={t} style={{ paddingBottom: 22, borderBottom: i < 2 ? `1px solid ${C.line}` : "none" }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
                    <div style={{ font: `600 20px/1.3 ${HEAD_FONT}`, color: C.accent, letterSpacing: "0.02em", flexShrink: 0 }}>0{i + 1}</div>
                    <div style={{ font: `600 19px/1.3 ${HEAD_FONT}`, color: C.fg, letterSpacing: "-0.005em" }}>{t}</div>
                  </div>
                  <div style={{ ...body, marginTop: 6, fontSize: 15, paddingLeft: 38 }}>{d}</div>
                </div>
              ))}
            </div>
          </div>
          <FilingKitDoc style={{ width: "100%" }} />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding: `120px ${PAD_X}` }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 80, marginBottom: 56 }}>
          <div>
            <div style={{ ...eyebrow, marginBottom: 22 }}>HOW IT WORKS</div>
            <h2 className="firm-h" style={H2}>Four steps. <em>One filing</em>.</h2>
          </div>
          <p style={{ ...body, alignSelf: "end" }}>
            From buying the kit to walking out of the clerk&rsquo;s office with a filed case, usually under 24
            hours.
          </p>
        </div>
        <FirmProcessStrip
          cellPadding="40px 30px"
          steps={[
            { Icon: MessageSquare, title: "Tell Us About Your Case", desc: "Plaintiff, defendant, amount, state, county. We pull the live filing rules for that exact courthouse." },
            { Icon: Briefcase, title: "We Build Your Kit", desc: "Within minutes you get a personalized PDF: the right forms, the current filing fee, and a hearing-day checklist." },
            { Icon: Building2, title: "You File", desc: "Walk into the courthouse (or use the e-filing portal) with everything you need. Most filings take under an hour." },
            { Icon: Scale, title: "Show Up Prepared", desc: "On hearing day, follow the checklist: what to bring, how to present, what the judge will ask, the order of events." },
          ]}
        />
      </section>

      {/* CTA BAR */}
      <section style={{ padding: `60px ${PAD_X}` }}>
        <FirmCtaBar
          Icon={ClipboardCheck}
          headline={<>Ready to <em>file your case</em>?</>}
          sub="No account. No subscription. Just results."
          cta={{ label: "Get My Filing Kit", href: "/filing-kit", caption: "Takes about 5 minutes · From $79" }}
        />
      </section>

      {/* WHAT'S IN THE KIT — annotated cover sheet with leader-line callouts */}
      <section style={{ padding: `120px ${PAD_X}` }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start", marginBottom: 60 }}>
          <div>
            <div style={{ ...eyebrow, marginBottom: 22 }}>WHAT&rsquo;S IN THE KIT</div>
            <h2 className="firm-h" style={H2}>Built specifically for <em>your courthouse</em>.</h2>
          </div>
          <p style={body}>
            Every kit follows the same structure: the right forms, the exact fee, the service rules, the
            deadline, and the hearing-day plan.
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
          {/* Kit cover sheet */}
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
            <header style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{ font: `600 16px/1 ${HEAD_FONT}`, letterSpacing: "0.12em", color: C.fg, marginBottom: 4 }}>CIVILCASE</div>
                <div style={{ font: `700 10px/1 ${BODY_FONT}`, letterSpacing: "0.14em", color: C.muted }}>FILING KIT</div>
              </div>
              <div style={{ font: `12px/1 ${BODY_FONT}`, color: C.muted }}>Los Angeles County, CA</div>
            </header>
            <div style={{ height: 1, background: "rgba(31,26,22,0.12)", margin: "18px 0 22px" }} />

            <div style={{ display: "grid", gap: 6, marginBottom: 26 }}>
              <div style={{ display: "grid", gridTemplateColumns: "70px 1fr", gap: 16, alignItems: "baseline" }}>
                <span style={{ font: `700 12px/1 ${BODY_FONT}`, letterSpacing: "0.06em", color: C.muted }}>COURT:</span>
                <p style={{ margin: 0, font: `15px/1.4 ${SERIF_FONT}`, color: C.fg }}>Stanley Mosk Courthouse · Limited Civil</p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "70px 1fr", gap: 16, alignItems: "baseline" }}>
                <span style={{ font: `700 12px/1 ${BODY_FONT}`, letterSpacing: "0.06em", color: C.muted }}>CLAIM:</span>
                <p style={{ margin: 0, font: `15px/1.4 ${SERIF_FONT}`, color: C.fg }}>Plaintiff&rsquo;s Claim · Small Claims</p>
              </div>
            </div>

            <p style={{ margin: "0 0 16px" }}>
              File <span className="firm-anno-mark">SC-100 (Plaintiff&rsquo;s Claim)</span> with the clerk. Filing fee:{" "}
              <span className="firm-anno-mark">$50 for claims $1,500-$5,000</span>. Fee-waiver form FW-001 if you qualify.
            </p>
            <p style={{ margin: "0 0 12px" }}>
              Statute of limitations: <span className="firm-anno-mark">two years</span> from the date of the incident
              (Cal. Code Civ. Proc. § 339).
            </p>
            <ul style={{ listStyle: "disc", paddingLeft: 22, margin: "0 0 16px" }}>
              <li style={{ marginBottom: 6 }}>
                <span className="firm-anno-mark">Personal service by sheriff</span>, at least 15 days before hearing;
              </li>
              <li style={{ marginBottom: 6 }}>Proof of service (SC-104) filed before the hearing date.</li>
            </ul>
            <p style={{ margin: "0 0 24px" }}>
              <strong style={{ fontWeight: 700 }}>Hearing: 30-70 days out.</strong>{" "}
              <span className="firm-anno-mark">Bring three copies of every exhibit</span> plus your witness list.
            </p>

            <p style={{ margin: "32px 0 4px", font: `italic 22px/1 ${SERIF_FONT}`, color: C.accent }}>Filing packet · ready</p>
            <p style={{ margin: 0, font: `12px/1 ${BODY_FONT}`, color: C.muted }}>Drafted for your county clerk</p>

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
              ["Form numbers", "Exact court forms with direct links to the current PDFs."],
              ["Filing fee + waiver", "Fee schedule for your claim band, plus FW-001 eligibility."],
              ["Statute deadline", "Hard SOL flagged in months and days. Don’t miss it."],
              ["Service rules", "Who serves, when, and how to prove it back to the court."],
              ["Hearing prep", "What to bring, how many copies, what gets cases dismissed."],
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
            { Icon: ShieldCheck, title: "Built for your county.", body: "Every county has its own forms, fees, and service rules. Yours is the only one our templates cover." },
            { Icon: FileText, title: "Court-ready packet.", body: "PDFs, fees, deadlines. Print, sign, walk into the clerk’s office." },
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

      {/* PRICING (cream-bg) */}
      <section style={{ padding: `120px ${PAD_X}`, background: C.cream }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div style={{ ...eyebrow, marginBottom: 18 }}>PRICING</div>
          <h2 className="firm-h" style={H2}>One price. <em>Everything you need</em>.</h2>
          <p style={{ ...body, maxWidth: 540, margin: "18px auto 0" }}>
            No subscriptions. No upsells you have to dodge. One flat fee, complete kit.
          </p>
        </div>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <div style={{ padding: 48, background: C.dark, color: "#fff", borderRadius: RAD.panel, position: "relative" }}>
            <div style={{ position: "absolute", top: 28, right: 28, font: `500 10px/1 ${BODY_FONT}`, letterSpacing: "0.2em", color: C.accentOnDark, border: `1px solid ${C.accentOnDark}`, padding: "5px 10px", borderRadius: 999 }}>FILING KIT</div>
            <div style={{ font: `600 32px/1.2 ${HEAD_FONT}` }}>Small Claims Filing Kit</div>
            <div style={{ font: `14px/1.5 ${BODY_FONT}`, color: "rgba(255,255,255,0.6)", marginTop: 8, maxWidth: 380 }}>Personalized to your county. Files in under an hour.</div>
            <div style={{ marginTop: 36, display: "flex", alignItems: "baseline", gap: 12 }}>
              <div style={{ font: `500 12px/1 ${BODY_FONT}`, color: "rgba(255,255,255,0.6)" }}>$</div>
              <div style={{ font: `600 80px/1 ${HEAD_FONT}`, letterSpacing: "-0.025em" }}>79</div>
              <div style={{ font: `13px/1 ${BODY_FONT}`, color: "rgba(255,255,255,0.5)", marginLeft: "auto" }}>one-time</div>
            </div>
            <div style={{ height: 1, background: "rgba(255,255,255,0.12)", margin: "32px 0 24px" }} />
            <div style={{ display: "grid", gap: 12 }}>
              {[
                "Where to file: court name + venue rules",
                "Every required form with code & PDF link",
                "Filing fee schedule + fee-waiver eligibility",
                "Pre-suit requirements (demand, gov claim, mediation)",
                "All allowed service-of-process methods",
                "Hearing prep + common pitfalls",
              ].map((it) => (
                <div key={it} style={{ display: "flex", gap: 12, alignItems: "center", font: `13.5px/1.4 ${BODY_FONT}` }}>
                  <Check color={C.accentOnDark} /> {it}
                </div>
              ))}
            </div>
            <button type="button" style={{ width: "100%", marginTop: 32, background: C.accentOnDark, color: C.dark, border: "none", padding: 16, font: `500 14px/1 ${BODY_FONT}`, cursor: "pointer", borderRadius: 999 }}>
              Get My Filing Kit →
            </button>
            <p style={{ font: `13px/1.5 ${BODY_FONT}`, color: "rgba(255,255,255,0.55)", marginTop: 18, textAlign: "center" }}>
              Best for when the demand letter was ignored or you&rsquo;re ready to skip straight to court.
            </p>
          </div>
        </div>
      </section>

      <FaqSection
        faqs={FAQS}
        title={<>Filing Kit <em>questions</em>.</>}
        subtitle="Everything you need to know about your state-specific filing kit and what happens after."
      />
    </main>
  );
}
