import type { Metadata } from "next";
import { Suspense } from "react";
import { availableStateSlugs, loadStateGuide } from "../../../lib/state-data";
import { STATES } from "../../../lib/states";
import {
  C, H1, H2, eyebrow, body, PAD_X, RAD, HEAD_FONT, BODY_FONT, italicEmCSS,
  Check, FirmBtn, FirmSubnav,
} from "../../../components/firm";
import QuizForm from "../../(site)/case-score/QuizForm";
import type { StateFacts } from "../../(site)/case-score/scoring";

export const metadata: Metadata = {
  title: "Case Score · CivilCase",
  description:
    "Answer 7 questions and get a free read on whether your dispute is worth pursuing in small claims court. No signup, no email required.",
  alternates: { canonical: "/case-score2" },
  robots: { index: false, follow: false },
};

function pickSol(entries: { id: string; claim: string; years: number }[]) {
  const find = (substr: string) =>
    entries.find((e) => e.id.includes(substr) || e.claim.toLowerCase().includes(substr))?.years;
  return {
    written_contract: find("written") ?? find("contract"),
    oral_contract: find("oral"),
    sale_of_goods: find("ucc") ?? find("goods") ?? find("sale-of-goods"),
    property_damage: find("property"),
    personal_injury: find("personal-injury") ?? find("injury"),
    wages: find("wage") ?? find("unpaid-wages"),
    bad_check: find("bad-check") ?? find("check"),
    fraud: find("fraud"),
  };
}

export default async function CaseScore2() {
  const slugs = await availableStateSlugs();
  const facts: Record<string, StateFacts> = {};
  await Promise.all(
    slugs.map(async (slug) => {
      const guide = await loadStateGuide(slug);
      if (!guide) return;
      facts[slug] = {
        name: guide.state,
        cap_individual: guide.limits.individual,
        cap_business: guide.limits.business,
        sol_years: pickSol(guide.statuteOfLimitations.entries),
      };
    }),
  );

  return (
    <main style={{ background: C.bg, color: C.fg, font: `16px/1.5 ${BODY_FONT}` }}>
      <style dangerouslySetInnerHTML={{ __html: italicEmCSS }} />

      {/* HERO */}
      <section style={{ padding: `80px ${PAD_X} 60px` }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.05fr 1fr", gap: 80, alignItems: "center" }}>
          <div>
            <div style={{ ...eyebrow, color: C.accent, marginBottom: 28 }}>FREE TOOL · 90 SECONDS</div>
            <h1 className="firm-h" style={{ ...H1, fontSize: 68 }}>Should you <em>sue</em>?</h1>
            <p style={{ font: `18px/1.55 ${BODY_FONT}`, color: C.muted, maxWidth: 540, marginTop: 28 }}>
              Answer seven questions about your dispute and get a free, plain-English read on whether
              it&rsquo;s worth pursuing in small claims court. No signup. No email required.
            </p>
            <div style={{ display: "grid", gap: 14, marginTop: 32, maxWidth: 540 }}>
              {[
                "Case-strength score from 0 to 100",
                "Your state's statute-of-limitations deadline",
                "Recommended next step (settle, demand letter, file)",
                "Coverage for all 50 states + DC",
              ].map((t) => (
                <div key={t} style={{ display: "flex", alignItems: "center", gap: 12, color: C.fg }}>
                  <Check color={C.accent} />
                  <span style={{ font: `15.5px/1.4 ${BODY_FONT}` }}>{t}</span>
                </div>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0, marginTop: 60, paddingTop: 30, borderTop: `1px solid ${C.line}` }}>
              {[["Price", "Free"], ["Questions", "7"], ["Time", "~90 sec"], ["Signup", "None"]].map(([k, v], i) => (
                <div key={k} style={{ paddingLeft: i ? 24 : 0, borderLeft: i ? `1px solid ${C.line}` : "none" }}>
                  <div style={{ ...eyebrow, color: C.muted, marginBottom: 10 }}>{k}</div>
                  <div style={{ font: `600 26px/1.1 ${HEAD_FONT}`, color: C.fg, letterSpacing: "-0.01em" }}>{v}</div>
                </div>
              ))}
            </div>
          </div>
          {/* Decorative score card */}
          <div style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center", minHeight: 480 }}>
            <div style={{ background: C.dark, color: "#fff", padding: 48, borderRadius: RAD.panel, width: 380, boxShadow: "0 24px 60px -20px rgba(40,28,12,0.28)" }}>
              <div style={{ ...eyebrow, color: "rgba(255,255,255,0.55)", marginBottom: 18 }}>YOUR CASE SCORE</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                <div style={{ font: `600 110px/1 ${HEAD_FONT}`, color: C.accentOnDark, letterSpacing: "-0.04em" }}>82</div>
                <div style={{ font: `500 18px/1 ${BODY_FONT}`, color: "rgba(255,255,255,0.5)" }}>/ 100</div>
              </div>
              <div style={{ font: `500 16px/1.3 ${HEAD_FONT}`, color: "#fff", marginTop: 14 }}>Strong case</div>
              <div style={{ height: 1, background: "rgba(255,255,255,0.12)", margin: "28px 0" }} />
              <div style={{ display: "grid", gap: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", font: `13.5px/1.4 ${BODY_FONT}`, color: "rgba(255,255,255,0.75)" }}>
                  <span>Cap (CA, individual)</span><span style={{ color: "#fff" }}>$12,500</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", font: `13.5px/1.4 ${BODY_FONT}`, color: "rgba(255,255,255,0.75)" }}>
                  <span>Statute of limitations</span><span style={{ color: "#fff" }}>4 years</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", font: `13.5px/1.4 ${BODY_FONT}`, color: "rgba(255,255,255,0.75)" }}>
                  <span>Recommended next step</span><span style={{ color: C.accentOnDark }}>Demand letter</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUIZ FORM — render the existing QuizForm directly. We hide
          its own .cs-hero so it doesn't compete with the firm hero
          above, and let its .cs-section cards flow naturally. */}
      <style dangerouslySetInnerHTML={{ __html: `
        /* Suppress QuizForm's internal hero — the firm hero above
           already serves that role. */
        .cs2-quiz-wrap .cs-hero { display: none; }
        /* Tighten the top spacing of the first cs-section now that
           there's no quiz-internal hero to balance against. */
        .cs2-quiz-wrap .cs-section:first-of-type { padding-top: 0; }
      `}} />
      <div className="cs2-quiz-wrap" style={{ padding: `20px 0 80px` }}>
        <div style={{ textAlign: "center", padding: `0 ${PAD_X}`, marginBottom: 8 }}>
          <div style={{ ...eyebrow, marginBottom: 16 }}>START THE QUIZ</div>
          <h2 className="firm-h" style={{ ...H2, fontSize: 36 }}>Tell us about <em>your dispute</em>.</h2>
          <p style={{ ...body, maxWidth: 560, margin: "16px auto 0" }}>
            Seven questions. About 90 seconds. We&rsquo;ll show your score, your deadline, and what to do
            next.
          </p>
        </div>
        <Suspense fallback={null}>
          <QuizForm states={STATES} stateFacts={facts} />
        </Suspense>
      </div>

      {/* TRUST STRIP */}
      <section style={{ padding: `100px ${PAD_X}` }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 32, paddingTop: 40, borderTop: `1px solid ${C.line}` }}>
          {[
            ["50 states", "Statute-of-limitations and cap data for every state plus DC."],
            ["No signup", "No email, no account. The score is yours to keep or toss."],
            ["Plain English", "We don't use words like 'tort' or 'pecuniary' without explaining them."],
            ["Not legal advice", "Educational tool, not a substitute for an attorney consultation."],
          ].map(([t, d], i) => (
            <div key={t} style={{ paddingLeft: i ? 24 : 0, borderLeft: i ? `1px solid ${C.line}` : "none" }}>
              <div style={{ font: `600 18px/1.2 ${HEAD_FONT}`, color: C.fg, letterSpacing: "-0.005em" }}>{t}</div>
              <p style={{ ...body, marginTop: 10, fontSize: 14 }}>{d}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
