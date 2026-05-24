import type { Metadata } from "next";
import {
  C, H1, H2, eyebrow, body, PAD_X, RAD, HEAD_FONT, BODY_FONT, SERIF_FONT, italicEmCSS,
  Check, ShieldLogo, FirmBtn, FaqSection, RatingStrip,
  FirmHeroStats, FirmProcessStrip, FirmCtaBar,
} from "../../../components/firm";
import { breadcrumbList, serviceSchema, jsonLdGraph } from "../../../lib/schema";
import Image from "next/image";
import { DollarSign, MapPin, Workflow, RotateCw, FileText, ShieldCheck, ClipboardList, Banknote } from "lucide-react";

// Collection Plan service page. Copy ported from /collection-plan.

export const metadata: Metadata = {
  title: "Post-Judgment Collection Plan · CivilCase",
  description:
    "Won your small-claims case? Now actually collect. State-specific judgment-debtor exam, bank levy, wage garnishment, lien recording, and renewal calendar.",
  alternates: { canonical: "/collection-plan" },
};

const FAQS: { q: string; a: string }[] = [
  { q: "Why do I need this if I already won?", a: "Winning the case is half the battle. The court doesn't collect for you. It just hands you a piece of paper that says the defendant owes you money. Roughly 50% of small-claims winners never actually collect because they don't know the next steps. This plan walks you through them." },
  { q: "What's in the Collection Plan?", a: "A personalized sequence of enforcement steps for your state (debtor exam, wage garnishment, bank levy, writ of execution, abstract of judgment) with the exact form codes, fees, and links to the PDFs. Plus your state's exemption catalog (what the defendant gets to keep), the defendant's claim-of-exemption playbook, satisfaction-of-judgment instructions, the judgment renewal deadline, and your county's self-help center contact." },
  { q: "What if the defendant has no money?", a: "Judgments stay enforceable for years (typically 10 to 20, varies by state). The plan tells you your state's renewal interval so you can refile before yours expires. Recording the judgment as a lien against real estate is one of the included steps. Once recorded, it follows the defendant and attaches to property they may buy or sell down the road." },
  { q: "Do I need a lawyer to enforce a judgment?", a: "No. Every collection mechanism (judgment-debtor exam, levy, garnishment, lien) is available to self-represented plaintiffs. The forms exist for non-lawyers. The plan tells you which form, which fee, and what order to file them." },
  { q: "How long does collection take?", a: "Varies wildly. Wage garnishment on an employed defendant can start paying within 60 days. A bank levy on a known account can produce funds within 30 days. A judgment lien against real estate may not produce money until the defendant sells the property, which could be years." },
  { q: "What about interest?", a: "Most states accrue post-judgment interest at 6% to 10% per year on unpaid amounts. The plan covers your state's rate and how to claim accrued interest when you do collect." },
  { q: "Can I use this if I won outside small claims?", a: "Yes for most US civil judgments. The mechanics of post-judgment collection are largely the same across small claims, district court, and superior court. The plan focuses on small-claims judgments but the steps apply to most civil money judgments under $25,000." },
  { q: "Is CivilCase a law firm?", a: "No. We're a document-preparation service, not a law firm, and we don't provide legal advice. The Collection Plan is informational, based on public court rules and statutes, to help you enforce your judgment." },
];

function PlanDoc({ style = {} }: { style?: React.CSSProperties }) {
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
          <div style={{ font: `500 10px/1 ${BODY_FONT}`, letterSpacing: "0.18em", color: "#7a7165", marginTop: 6 }}>COLLECTION PLAN</div>
        </div>
        <div style={{ font: `11px/1 ${BODY_FONT}`, color: "#7a7165" }}>California</div>
      </div>
      <div style={{ height: 1, background: "#e7dfd0", marginBottom: 18 }} />
      <div style={{ fontSize: 12 }}>
        <p style={{ margin: "0 0 10px 0" }}><strong style={{ fontWeight: 600 }}>Step 1. Judgment-debtor exam</strong><br />File SC-134. Subpoena defendant for asset disclosure under oath.</p>
        <p style={{ margin: "0 0 10px 0" }}><strong style={{ fontWeight: 600 }}>Step 2. Bank levy</strong><br />File EJ-152. $40 fee. 30-day hold.</p>
        <p style={{ margin: "0 0 10px 0" }}><strong style={{ fontWeight: 600 }}>Step 3. Wage garnishment</strong><br />File WG-001. Up to 25% of disposable pay.</p>
        <p style={{ margin: "0 0 10px 0" }}><strong style={{ fontWeight: 600 }}>Step 4. Property lien</strong><br />File abstract of judgment with county recorder.</p>
        <p style={{ margin: "0 0 18px 0" }}><strong style={{ fontWeight: 600 }}>Renewal:</strong> Every 10 years. We remind you.</p>
      </div>
      <div style={{ position: "absolute", right: 38, bottom: 38, width: 56, height: 56, borderRadius: "50%", border: `1.5px solid ${C.accent}`, color: C.accent, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <ShieldLogo size={20} color={C.accent} />
      </div>
    </div>
  );
}

export default function CollectionPlan2() {
  const jsonLd = jsonLdGraph(
    serviceSchema({
      name: "Collection Plan",
      description: "Personalized post-judgment enforcement plan: debtor exam, bank levy, wage garnishment, property lien, and renewal tracking, sequenced for your state.",
      url: "/collection-plan",
      priceFrom: 49,
      audience: "Judgment creditors",
    }),
    breadcrumbList([
      { name: "CivilCase", url: "/" },
      { name: "Collection Plan", url: "/collection-plan" },
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
            <h1 className="firm-h" style={{ ...H1, fontSize: 68 }}>Won your case? <em>Now actually collect.</em></h1>
            <p style={{ font: `18px/1.55 ${BODY_FONT}`, color: C.muted, maxWidth: 540, marginTop: 28 }}>
              The court doesn&rsquo;t enforce your judgment for you. Half of small-claims winners never collect
              because they don&rsquo;t know the next steps. The Collection Plan gives you the playbook.
            </p>
            <div style={{ display: "grid", gap: 14, marginTop: 32, maxWidth: 540 }}>
              {[
                "Sequenced step-by-step plan tailored to your case",
                "Every enforcement form with code, fee, and link",
                "State exemption catalog: what's protected",
                "Judgment renewal deadline + post-judgment interest rate",
              ].map((t) => (
                <div key={t} style={{ display: "flex", alignItems: "center", gap: 12, color: C.fg }}>
                  <Check color={C.accent} />
                  <span style={{ font: `15.5px/1.4 ${BODY_FONT}` }}>{t}</span>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 14, marginTop: 36 }}>
              <FirmBtn href="/collection-plan">Get My Collection Plan</FirmBtn>
              <FirmBtn kind="ghost" href="/collection-plan">See a sample plan</FirmBtn>
            </div>
            <FirmHeroStats items={[
              { Icon: DollarSign, headline: "From $49", sub: "one-time fee" },
              { Icon: MapPin, headline: "All 50 states", sub: "every state" },
              { Icon: Workflow, headline: "Tailored", sub: "for your case" },
              { Icon: RotateCw, headline: "Tracked", sub: "renewals" },
            ]} />
          </div>
          <div style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center", minHeight: 600 }}>
            <div style={{ position: "relative", width: 460, height: 560 }}>
              <div style={{ position: "absolute", top: 0, left: 30, transform: "rotate(-3deg)", width: 410 }}>
                <PlanDoc />
              </div>
              <div style={{ position: "absolute", top: 60, left: -10, transform: "rotate(2deg)", width: 410, opacity: 0.95 }}>
                <PlanDoc />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY THE PLAN WORKS (cream-bg) */}
      <section style={{ padding: `120px ${PAD_X}`, background: C.cream }}>
        <div style={{ background: C.paper, border: `1px solid ${C.line}`, borderRadius: RAD.panel, padding: 80, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <div>
            <div style={{ ...eyebrow, marginBottom: 22 }}>WHY YOU NEED THIS</div>
            <h2 className="firm-h" style={H2}>Winning is half the battle. <em>Collecting is the other half</em>.</h2>
            <p style={{ ...body, marginTop: 22, maxWidth: 460 }}>
              About half of small-claims winners never collect a dollar. Not because the defendant
              can&rsquo;t pay, but because the winner doesn&rsquo;t know how to enforce.
            </p>
            <div style={{ marginTop: 36, display: "grid", gap: 22 }}>
              {[
                ["Find Their Assets", "The judgment-debtor exam forces the defendant to disclose bank, employer, and property under oath."],
                ["Take The Money", "Levy the bank, garnish the wages. The sheriff handles it once you file the form."],
                ["Wait Them Out", "Broke today? Record a lien. It follows them and any property they ever buy."],
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
          <PlanDoc style={{ width: "100%" }} />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding: `120px ${PAD_X}` }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 80, marginBottom: 56 }}>
          <div>
            <div style={{ ...eyebrow, marginBottom: 22 }}>HOW IT WORKS</div>
            <h2 className="firm-h" style={H2}>Four steps. <em>One paid judgment</em>.</h2>
          </div>
          <p style={{ ...body, alignSelf: "end" }}>
            Most plaintiffs collect within 30 to 120 days once they actually start using the right
            enforcement tools.
          </p>
        </div>
        <FirmProcessStrip
          cellPadding="40px 30px"
          steps={[
            { Icon: ClipboardList, title: "Tell Us About Your Judgment", desc: "State, defendant, amount, when the judgment was entered. We pull your state's enforcement playbook." },
            { Icon: Workflow, title: "We Build Your Plan", desc: "A personalized, sequenced enforcement plan. Which step first, which forms, which fees, which to skip given what you know." },
            { Icon: Banknote, title: "Work the Sequence", desc: "Judgment-debtor exam, levy, garnishment, lien, in the right order. Each step has the form, the fee, the timeline." },
            { Icon: RotateCw, title: "Track and Renew", desc: "Some collections take months. The plan tracks your judgment expiration and tells you when to renew it." },
          ]}
        />
      </section>

      {/* CTA BAR */}
      <section style={{ padding: `60px ${PAD_X}` }}>
        <FirmCtaBar
          Icon={Banknote}
          headline={<>Ready to <em>collect what you won</em>?</>}
          sub="No account. No subscription. Just results."
          cta={{ label: "Start My Collection Plan", href: "/collection-plan", caption: "Takes about 3 minutes · $49 one-time" }}
        />
      </section>

      {/* WHAT'S IN THE PLAN — annotated enforcement playbook with leader-line callouts */}
      <section style={{ padding: `120px ${PAD_X}` }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start", marginBottom: 60 }}>
          <div>
            <div style={{ ...eyebrow, marginBottom: 22 }}>WHAT&rsquo;S IN THE PLAN</div>
            <h2 className="firm-h" style={H2}>Built specifically for <em>your state</em>.</h2>
          </div>
          <p style={body}>
            Every plan follows the same structure: the right enforcement mechanism, the form numbers, the
            fees, the timeline, and your state&rsquo;s rules at each step.
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
          {/* Plan cover sheet */}
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
                <div style={{ font: `700 10px/1 ${BODY_FONT}`, letterSpacing: "0.14em", color: C.muted }}>COLLECTION PLAN</div>
              </div>
              <div style={{ font: `12px/1 ${BODY_FONT}`, color: C.muted }}>California</div>
            </header>
            <div style={{ height: 1, background: "rgba(31,26,22,0.12)", margin: "18px 0 22px" }} />

            <div style={{ display: "grid", gap: 6, marginBottom: 26 }}>
              <div style={{ display: "grid", gridTemplateColumns: "82px 1fr", gap: 16, alignItems: "baseline" }}>
                <span style={{ font: `700 12px/1 ${BODY_FONT}`, letterSpacing: "0.06em", color: C.muted }}>JUDGMENT:</span>
                <p style={{ margin: 0, font: `15px/1.4 ${SERIF_FONT}`, color: C.fg }}>$4,500 · Smith v. Johnson</p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "82px 1fr", gap: 16, alignItems: "baseline" }}>
                <span style={{ font: `700 12px/1 ${BODY_FONT}`, letterSpacing: "0.06em", color: C.muted }}>STATE:</span>
                <p style={{ margin: 0, font: `15px/1.4 ${SERIF_FONT}`, color: C.fg }}>California · CCP § 700 et seq.</p>
              </div>
            </div>

            <p style={{ margin: "0 0 14px" }}>
              <strong style={{ fontWeight: 700 }}>Step 1. Judgment-debtor exam.</strong> File{" "}
              <span className="firm-anno-mark">SC-134</span>. Subpoena the defendant for asset disclosure under oath.
            </p>
            <p style={{ margin: "0 0 14px" }}>
              <strong style={{ fontWeight: 700 }}>Step 2. Bank levy.</strong> File{" "}
              <span className="firm-anno-mark">EJ-152 ($40 fee)</span>. 30-day hold once served on the bank.
            </p>
            <ul style={{ listStyle: "disc", paddingLeft: 22, margin: "0 0 16px" }}>
              <li style={{ marginBottom: 6 }}>
                <span className="firm-anno-mark">Wage garnishment up to 25%</span> of disposable pay (CCP § 706.050);
              </li>
              <li style={{ marginBottom: 6 }}>
                <span className="firm-anno-mark">Property lien</span> via abstract of judgment with the county recorder.
              </li>
            </ul>
            <p style={{ margin: "0 0 24px" }}>
              <strong style={{ fontWeight: 700 }}>Renewal:</strong>{" "}
              <span className="firm-anno-mark">every 10 years</span> (CCP § 683.020). We send the reminder.
            </p>

            <p style={{ margin: "32px 0 4px", font: `italic 22px/1 ${SERIF_FONT}`, color: C.accent }}>Enforcement plan · ready</p>
            <p style={{ margin: 0, font: `12px/1 ${BODY_FONT}`, color: C.muted }}>Sequenced for your judgment</p>

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
              ["Sequenced for you", "Skips steps that don’t apply based on what you know about the defendant."],
              ["Exact form numbers", "State-specific codes with direct links to the right PDFs."],
              ["Exemption catalog", "What the defendant gets to keep, with dollar amounts and statutes."],
              ["Renewal alerts", "10-year judgment clock tracked. Your plan flags the renewal deadline so you can file before it expires."],
              ["Pushback playbook", "Claim-of-exemption response and what triggers a hearing."],
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
            { Icon: ShieldCheck, title: "Built for your state.", body: "Forms, fees, and exemptions vary state to state. Yours is the only one our templates cover." },
            { Icon: FileText, title: "Renewal tracked.", body: "10-year clock with reminders so you can file the renewal before the judgment expires." },
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

      {/* COLLECTOR COMPARISON STRIP */}
      <section style={{ padding: `100px ${PAD_X}`, background: C.cream }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <div>
            <div style={{ ...eyebrow, marginBottom: 22 }}>VS. A COLLECTOR</div>
            <h2 className="firm-h" style={H2}>Collection without <em>hiring a collector</em>.</h2>
            <p style={{ ...body, marginTop: 22 }}>
              Most collection agencies take 25 to 40% of what they recover. The Collection Plan gives you
              the same playbook for $49, one time. You keep every dollar you collect.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0, background: C.paper, border: `1px solid ${C.line}`, borderRadius: RAD.panel, padding: 40 }}>
            {[
              ["50%", "of small-claims winners never collect a dollar."],
              ["10-20", "years most judgments stay enforceable."],
              ["25%", "max federal wage-garnishment of disposable pay."],
            ].map(([n, c], i) => (
              <div key={n} style={{ padding: "0 24px", borderLeft: i ? `1px solid ${C.line}` : "none" }}>
                <div style={{ font: `600 44px/1 ${HEAD_FONT}`, color: C.fg, letterSpacing: "-0.02em" }}>{n}</div>
                <div style={{ ...body, marginTop: 12, fontSize: 14 }}>{c}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section style={{ padding: `120px ${PAD_X}` }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div style={{ ...eyebrow, marginBottom: 18 }}>PRICING</div>
          <h2 className="firm-h" style={H2}>One price. <em>Real money back</em>.</h2>
          <p style={{ ...body, maxWidth: 540, margin: "18px auto 0" }}>
            $49 unlocks every enforcement mechanism your state offers, with the forms and the sequence to
            use them.
          </p>
        </div>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <div style={{ padding: 48, background: C.dark, color: "#fff", borderRadius: RAD.panel, position: "relative" }}>
            <div style={{ position: "absolute", top: 28, right: 28, font: `500 10px/1 ${BODY_FONT}`, letterSpacing: "0.2em", color: C.accentOnDark, border: `1px solid ${C.accentOnDark}`, padding: "5px 10px", borderRadius: 999 }}>COLLECTION PLAN</div>
            <div style={{ font: `600 32px/1.2 ${HEAD_FONT}` }}>Post-Judgment Collection Plan</div>
            <div style={{ font: `14px/1.5 ${BODY_FONT}`, color: "rgba(255,255,255,0.6)", marginTop: 8, maxWidth: 380 }}>Personalized to your state. Sequenced for fastest payment.</div>
            <div style={{ marginTop: 36, display: "flex", alignItems: "baseline", gap: 12 }}>
              <div style={{ font: `500 12px/1 ${BODY_FONT}`, color: "rgba(255,255,255,0.6)" }}>$</div>
              <div style={{ font: `600 80px/1 ${HEAD_FONT}`, letterSpacing: "-0.025em" }}>49</div>
              <div style={{ font: `13px/1 ${BODY_FONT}`, color: "rgba(255,255,255,0.5)", marginLeft: "auto" }}>one-time</div>
            </div>
            <div style={{ height: 1, background: "rgba(255,255,255,0.12)", margin: "32px 0 24px" }} />
            <div style={{ display: "grid", gap: 12 }}>
              {[
                "Step-by-step plan, sequenced to your case",
                "Debtor exam, levy, garnishment, lien (forms + fees)",
                "State exemption catalog (what's protected)",
                "Defendant claim-of-exemption playbook",
                "Satisfaction of judgment + renewal deadline",
                "Self-help center contact + special leverage options",
              ].map((it) => (
                <div key={it} style={{ display: "flex", gap: 12, alignItems: "center", font: `13.5px/1.4 ${BODY_FONT}` }}>
                  <Check color={C.accentOnDark} /> {it}
                </div>
              ))}
            </div>
            <button type="button" style={{ width: "100%", marginTop: 32, background: C.accentOnDark, color: C.dark, border: "none", padding: 16, font: `500 14px/1 ${BODY_FONT}`, cursor: "pointer", borderRadius: 999 }}>
              Get My Collection Plan →
            </button>
            <p style={{ font: `13px/1.5 ${BODY_FONT}`, color: "rgba(255,255,255,0.55)", marginTop: 18, textAlign: "center" }}>
              Best for plaintiffs who&rsquo;ve won a judgment and want to actually see the money.
            </p>
          </div>
        </div>
      </section>

      <FaqSection
        faqs={FAQS}
        title={<>Collection Plan <em>questions</em>.</>}
        subtitle="Everything you need to know about collecting on a judgment after you win."
        background={C.cream}
      />
    </main>
  );
}
