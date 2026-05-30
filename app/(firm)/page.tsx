import type { Metadata } from "next";
import Image from "next/image";
import { Mail, Gauge, Scale, ArrowRight, Star, MessageSquare, FileText, Send, Home, Wrench, Car, ShoppingBag, Banknote, Users } from "lucide-react";
import {
  C, H1, H2, eyebrow, body, PAD_X, RAD, HEAD_FONT, BODY_FONT, italicEmCSS,
  Arrow, ShieldLogo, FirmBtn, FirmProcessStrip, FaqSection,
} from "../../components/firm";

export const metadata: Metadata = {
  title: "CivilCase: Self-help legal tools for small-claims disputes",
  description:
    "Prepare your own demand letter, small-claims filing, and post-judgment collection paperwork. State-specific guides and plain-English steps for self-represented plaintiffs in all 50 states.",
  alternates: { canonical: "/" },
};
export default function Home2() {
  return (
    <main style={{ background: C.bg, color: C.fg, font: `16px/1.5 ${BODY_FONT}` }}>
      <style dangerouslySetInnerHTML={{ __html: italicEmCSS }} />

      {/* ─────────────── HERO · WHITE CENTERED (variant A) ─────────────── */}
      <section style={{ padding: `120px ${PAD_X} 80px`, background: "#fff" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", textAlign: "center" }}>
          {/* honest trust line, sits above the headline */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 36, padding: "8px 16px", border: `1px solid ${C.line}`, borderRadius: 999, font: `500 13px/1 ${BODY_FONT}`, color: C.muted }}>
            <ShieldLogo size={14} color={C.accent} />
            Covers all 50 states + DC · Free case check, no signup
          </div>

          <h1 className="firm-h" style={H1}>
            Handle your own small-claims case, <em>step by step.</em>
          </h1>
          <p style={{ font: `400 19px/1.6 ${BODY_FONT}`, color: C.muted, maxWidth: 640, margin: "28px auto 36px" }}>
            CivilCase is a self-help tool, not a law firm. State-specific guides and plain-English
            steps help you prepare your own demand letter, file your small-claims case, and collect
            once you win, without hiring a lawyer.
          </p>
          <div style={{ display: "inline-flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
            <FirmBtn>Start Your Case</FirmBtn>
            <FirmBtn kind="ghost">Check Case Strength</FirmBtn>
          </div>
        </div>
      </section>

      {/* ─────────────── THE BASICS — small claims explained ─────────────── */}
      <section style={{ padding: `120px ${PAD_X}` }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 80, alignItems: "start" }}>
          <div>
            <div style={{ ...eyebrow, color: C.accent, marginBottom: 22 }}>THE BASICS</div>
            <h2 className="firm-h" style={H2}>Small claims, <em>explained</em>.</h2>
            <p style={{ ...body, marginTop: 22, maxWidth: 360 }}>
              The court built for people without lawyers. Lower stakes, simpler rules, and you
              represent yourself.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
            {[
              { t: "No lawyer needed", d: "Small-claims court is designed for self-represented people. In many states lawyers are not even allowed." },
              { t: "Dollar limits apply", d: "Each state caps what you can sue for, usually $2,500 to $25,000. Your guide shows your state's limit." },
              { t: "Start with a letter", d: "A demand letter settles many disputes before a filing fee is ever paid. It is the cheapest first move." },
              { t: "Then you file", d: "If it is ignored, you file in the right county, pay a small fee, and present your facts to a judge." },
            ].map((x, i) => (
              <div key={x.t} style={{ padding: i < 2 ? "6px 28px 34px" : "34px 28px 6px", borderLeft: i % 2 ? `1px solid ${C.line}` : "none", borderBottom: i < 2 ? `1px solid ${C.line}` : "none" }}>
                <div style={{ font: `600 13px/1 ${BODY_FONT}`, letterSpacing: "0.16em", color: C.accent }}>{`0${i + 1}.`}</div>
                <div style={{ font: `600 25px/1.2 ${HEAD_FONT}`, color: C.fg, marginTop: 18 }}>{x.t}</div>
                <p style={{ ...body, fontSize: 16.5, marginTop: 12 }}>{x.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── BROWSE BY SITUATION — category grid ─────────────── */}
      <section style={{ padding: `120px ${PAD_X}`, background: C.cream }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, marginBottom: 56, alignItems: "end" }}>
          <div>
            <div style={{ ...eyebrow, color: C.accent, marginBottom: 22 }}>BROWSE BY SITUATION</div>
            <h2 className="firm-h" style={H2}>What kind of dispute <em>do you have</em>?</h2>
          </div>
          <p style={body}>
            Every category has its own statute, evidence list, and damages math. Pick yours for a
            plain-English guide and the forms your state requires.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {[
            { Icon: Home, t: "Landlord & deposits", d: "Unreturned deposits, illegal lockouts, repairs, habitability.", href: "/small-claims/landlord" },
            { Icon: Wrench, t: "Contractors", d: "Vanishing deposits, unfinished jobs, defective or damaging work.", href: "/small-claims/contractor" },
            { Icon: Car, t: "Auto repair & dealers", d: "Bad repairs, dealer fraud, undisclosed damage, lemon issues.", href: "/small-claims/auto" },
            { Icon: Banknote, t: "Unpaid wages", d: "Final paychecks, unpaid overtime, off-the-books work.", href: "/small-claims/employer" },
            { Icon: ShoppingBag, t: "Refunds & bad goods", d: "Defective products, refused returns, online-seller disputes.", href: "/small-claims/refund" },
            { Icon: Users, t: "Roommates & loans", d: "Unpaid shares, personal loans gone bad, neighbor damage.", href: "/small-claims/roommate" },
          ].map((c) => (
            <a key={c.t} href={c.href} className="firm-card-link" style={{ border: `1px solid ${C.line}`, borderRadius: RAD.card, padding: 26, textDecoration: "none", display: "block", background: C.paper }}>
              <div style={{ width: 44, height: 44, borderRadius: 10, background: "rgba(184,51,31,0.08)", color: C.accent, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
                <c.Icon size={22} strokeWidth={1.7} aria-hidden />
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
                <div style={{ font: `600 19px/1.2 ${HEAD_FONT}`, color: C.fg }}>{c.t}</div>
                <ArrowRight size={16} strokeWidth={2} color={C.accent} />
              </div>
              <p style={{ font: `14px/1.55 ${BODY_FONT}`, color: C.muted, marginTop: 8 }}>{c.d}</p>
            </a>
          ))}
        </div>
      </section>

      {/* ─────────────── THREE WAYS TO MOVE FORWARD ─────────────── */}
      <section style={{ padding: `120px ${PAD_X}`, background: C.cream }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 80, marginBottom: 56, alignItems: "end" }}>
          <div>
            <div style={{ ...eyebrow, color: C.accent, marginBottom: 22 }}>TAKE THE NEXT STEP</div>
            <h2 className="firm-h" style={H2}>Three ways to <em>move forward</em>.</h2>
          </div>
          <p style={{ ...body, alignSelf: "end" }}>
            However your dispute started, pick the step that fits: send a demand letter, check your
            case for free, or skip ahead and file. You stay in control the whole way.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, alignItems: "stretch" }}>
          {[
            { Icon: Mail, tag: "PATH A", title: "Send a Demand Letter", desc: "Start with formal pressure. Most cases settle here.", price: "From $29", cta: "Start My Letter", href: "/demand-letter", img: "/assets/home2/service-demand-letter.webp", color: C.accent, recommended: true },
            { Icon: Gauge, tag: "PATH B", title: "Check My Case Strength", desc: "Free 90-second read with general information about your dispute. Not legal advice.", price: "Free", cta: "Continue", href: "/case-score", img: "/assets/home2/bento-photo.webp", color: "#4A6FA5", recommended: false },
            { Icon: Scale, tag: "PATH C", title: "File Your Claim", desc: "Skip ahead. Get county-specific filing forms ready to file.", price: "From $79", cta: "Continue", href: "/filing-kit", img: "/assets/home2/service-filing-kit.webp", color: "#7A8775", recommended: false },
          ].map((p, i) => (
            <article
              key={p.title}
              style={{
                background: C.paper,
                border: `1px solid ${p.recommended ? "rgba(184,51,31,0.30)" : C.line}`,
                borderRadius: RAD.card,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                boxShadow: p.recommended
                  ? "0 18px 44px -24px rgba(0,0,0,0.28)"
                  : "0 12px 32px -26px rgba(0,0,0,0.18)",
              }}
            >
              {/* header band: number + tag + icon. The badge row is reserved in
                  every card so the photos below line up; only the recommended
                  card tints the band and fills the badge slot. */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "22px 22px 18px", background: p.recommended ? "rgba(184,51,31,0.06)" : "transparent" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{ width: 48, height: 48, background: p.color, borderRadius: 10, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", font: `600 25px/1 ${HEAD_FONT}` }}>
                    <span style={{ transform: "translateY(1px)" }}>{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <div style={{ font: `600 11px/1 ${BODY_FONT}`, letterSpacing: "0.2em", color: C.muted }}>{p.tag}</div>
                </div>
                <p.Icon size={30} strokeWidth={1.6} color={p.color} aria-hidden />
              </div>

              {/* photo — full bleed: touches the card sides and the header band above.
                  The RECOMMENDED badge straddles the seam (bottom half over the image,
                  top half above it), so it sits outside the overflow-hidden image
                  wrapper to avoid being clipped. */}
              <div style={{ position: "relative" }}>
                {p.recommended && (
                  <div style={{ position: "absolute", top: 14, left: 14, zIndex: 2, background: p.color, color: "#fff", padding: "7px 14px", borderRadius: 5, font: `700 11.5px/1 ${BODY_FONT}`, letterSpacing: "0.14em", display: "inline-flex", alignItems: "center", gap: 7, boxShadow: "0 5px 14px -3px rgba(0,0,0,0.4)" }}>
                    <Star size={13} fill="currentColor" stroke="currentColor" /> RECOMMENDED
                  </div>
                )}
                <div style={{ position: "relative", aspectRatio: "16 / 10", overflow: "hidden" }}>
                  <Image src={p.img} alt="" fill sizes="(max-width: 1024px) 100vw, 33vw" style={{ objectFit: "cover" }} aria-hidden />
                </div>
              </div>

              {/* body */}
              <div style={{ padding: "22px 24px 24px", display: "flex", flexDirection: "column", flex: 1 }}>
                <div style={{ font: `600 26px/1.15 ${HEAD_FONT}`, color: C.fg, letterSpacing: "-0.01em" }}>{p.title}</div>
                <p style={{ ...body, fontSize: 14, marginTop: 10, flex: 1 }}>{p.desc}</p>
                <div style={{ borderTop: `1px solid ${C.line}`, marginTop: 22, paddingTop: 18, font: `500 14px/1 ${BODY_FONT}`, color: C.muted }}>{p.price}</div>
                <a
                  href={p.href}
                  style={{
                    marginTop: 14,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    padding: "13px 16px",
                    borderRadius: 8,
                    font: `600 13px/1 ${BODY_FONT}`,
                    textDecoration: "none",
                    background: p.recommended ? p.color : "transparent",
                    color: p.recommended ? "#fff" : p.color,
                    border: `1px solid ${p.color}`,
                  }}
                >
                  {p.cta} <ArrowRight size={14} strokeWidth={2} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ─────────────── WHAT YOU GET — deliverables (alternating editorial cards) ─────────────── */}
      <section style={{ padding: `120px ${PAD_X} 0` }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 80, alignItems: "end" }}>
          <div>
            <h2 className="firm-h" style={H2}>What you <em>actually get</em>.</h2>
          </div>
          <p style={body}>
            Two deliverables do most of the work: a demand letter that makes the first move, and a
            filing kit for when it&rsquo;s ignored. Both built from your facts and your state&rsquo;s rules.
          </p>
        </div>
      </section>

      {[
        {
          n: "I.",
          tag: "THE DEMAND LETTER",
          title: "A formal demand, in their mailbox.",
          img: "/assets/home2/service-demand-letter.webp",
          desc: "We turn your facts into a state-specific demand letter that names the law you're owed under and sets a deadline to pay. You read and approve it, then we send it USPS Certified with tracking and a signature on delivery.",
          range: "From $29",
          statute: "In the mail within 24 hours",
          evidence: ["State-specific citations", "Certified mail + tracking", "Editable before it sends", "Settlement-ready wording"],
          href: "/demand-letter",
          reverse: false,
        },
        {
          n: "II.",
          tag: "THE COURT FILING KIT",
          title: "Court-ready forms for your county.",
          img: "/assets/home2/service-filing-kit.webp",
          desc: "If the letter is ignored, we assemble the exact small-claims forms your county requires, filled in from your facts, with a step-by-step guide to filing and what to say on court day.",
          range: "From $79",
          statute: "Ready the same day",
          evidence: ["County-specific forms", "Filled from your facts", "Filing fee + venue lookup", "Court-day prep guide"],
          href: "/filing-kit",
          reverse: true,
        },
      ].map((s, idx) => {
        const copyBlock = (
          <div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 18, marginBottom: 24 }}>
              <div className="firm-h" style={{ font: `400 italic 48px/1 ${HEAD_FONT}`, color: C.accent, letterSpacing: "-0.02em" }}>
                {s.n}
              </div>
              <div style={{ ...eyebrow, color: C.muted }}>{s.tag}</div>
            </div>
            <h3 className="firm-h" style={{ font: `500 34px/1.1 ${HEAD_FONT}`, color: C.fg, letterSpacing: "-0.02em", margin: 0 }}>
              {s.title}
            </h3>
            <p style={{ font: `16px/1.65 ${BODY_FONT}`, color: C.muted, marginTop: 20, maxWidth: 560 }}>{s.desc}</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginTop: 32, paddingTop: 24, borderTop: `1px solid ${C.line}` }}>
              <div>
                <div style={{ ...eyebrow, color: C.muted, marginBottom: 8 }}>PRICE</div>
                <div className="firm-h" style={{ font: `500 22px/1.1 ${HEAD_FONT}`, color: C.fg }}>{s.range}</div>
              </div>
              <div>
                <div style={{ ...eyebrow, color: C.muted, marginBottom: 8 }}>TURNAROUND</div>
                <div style={{ font: `13.5px/1.4 ${BODY_FONT}`, color: C.fg }}>{s.statute}</div>
              </div>
            </div>
            <div style={{ marginTop: 28 }}>
              <div style={{ ...eyebrow, color: C.muted, marginBottom: 12 }}>WHAT&rsquo;S INCLUDED</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {s.evidence.map((e) => (
                  <div key={e} style={{ border: `1px solid ${C.line}`, padding: "6px 12px", font: `12.5px/1.3 ${BODY_FONT}`, color: C.fg, background: "#fff" }}>
                    {e}
                  </div>
                ))}
              </div>
            </div>
            <a href={s.href} style={{ marginTop: 32, display: "inline-flex", alignItems: "center", gap: 10, font: `13px/1 ${BODY_FONT}`, color: C.accent, textDecoration: "none" }}>
              See what&rsquo;s inside <Arrow color={C.accent} />
            </a>
          </div>
        );
        const photoBlock = (
          <div style={{ position: "relative", aspectRatio: "5 / 4", width: "100%", overflow: "hidden", background: C.cream }}>
            <Image src={s.img} alt="" fill sizes="(max-width: 1024px) 100vw, 50vw" style={{ objectFit: "cover" }} aria-hidden />
          </div>
        );
        return (
          <section
            key={s.n}
            style={{
              background: idx % 2 === 0 ? "transparent" : C.paper,
              padding: `80px ${PAD_X}`,
            }}
          >
            <div style={{ display: "grid", gridTemplateColumns: s.reverse ? "1fr 1.1fr" : "1.1fr 1fr", gap: 60, alignItems: "center" }}>
              {s.reverse ? (<>{copyBlock}{photoBlock}</>) : (<>{photoBlock}{copyBlock}</>)}
            </div>
          </section>
        );
      })}

      {/* ─────────────── HOW IT WORKS — process strip ─────────────── */}
      <section style={{ padding: `120px ${PAD_X}`, background: C.cream }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 80, alignItems: "end", marginBottom: 56 }}>
          <div>
            <div style={{ ...eyebrow, color: C.accent, marginBottom: 22 }}>HOW IT WORKS</div>
            <h2 className="firm-h" style={H2}>From your facts to <em>filed</em>.</h2>
          </div>
          <p style={body}>
            You answer plain-language questions. We turn them into the letter and forms. You read,
            decide, and stay in charge the whole way.
          </p>
        </div>
        <FirmProcessStrip steps={[
          { Icon: MessageSquare, title: "Tell us what happened", desc: "Plain-language intake. We ask the questions, you stay in your seat.", time: "~8 min" },
          { Icon: FileText, title: "We build your documents", desc: "Your demand letter and any forms, drafted around your facts and your state's rules.", time: "24 hours" },
          { Icon: Send, title: "Send it certified", desc: "USPS Certified with tracking and a signature on delivery.", time: "2-4 days" },
          { Icon: Scale, title: "Escalate if ignored", desc: "County-specific filing forms and a court-day guide, ready when you need them.", time: "14+ days" },
        ]} />
      </section>

      {/* ─────────────── FAQ ─────────────── */}
      <FaqSection
        eyebrowText="COMMON QUESTIONS"
        title={<>Questions, <em>answered</em>.</>}
        subtitle="The things people ask before they start."
        faqs={[
          { q: "Do I need a lawyer?", a: "No. Small-claims court is built for self-represented people, and in many states lawyers are not allowed. CivilCase gives you the letter, forms, and procedure to do it yourself." },
          { q: "Is this legal advice?", a: "No. CivilCase is a self-help tool, not a law firm. We give you general legal information and documents built from your facts, but we do not represent you or advise on your specific case." },
          { q: "How much does it cost?", a: "A demand letter starts at $29 and a filing kit at $79. You can check your case strength for free first, with no signup or card." },
          { q: "Which states do you cover?", a: "All 50 states and DC. Your guide and forms are specific to your state's rules, dollar limits, and courts." },
          { q: "How long does it take?", a: "Most demand letters are in the mail within 24 hours. Many disputes settle after the letter; if not, your filing kit is ready the same day you need it." },
        ]}
      />

      {/* ─────────────── MISSION ─────────────── */}
      <section>
        <div style={{ background: C.dark, color: "#fff", padding: `100px ${PAD_X}` }}>
          <div style={{ maxWidth: 820, margin: "0 auto", textAlign: "center" }}>
            <div style={{ ...eyebrow, color: "rgba(255,255,255,0.6)", marginBottom: 22 }}>WHY CIVILCASE</div>
            <h2 className="firm-h firm-h-light" style={{ ...H2, color: "#fff", fontSize: 46 }}>Built for people who <em>represent themselves</em>.</h2>
            <p style={{ font: `16px/1.6 ${BODY_FONT}`, color: "rgba(255,255,255,0.78)", marginTop: 24, maxWidth: 640, marginLeft: "auto", marginRight: "auto" }}>
              Most people with a winnable claim never pursue it, because hiring a lawyer costs more
              than the dispute is worth. CivilCase is the other option. It&rsquo;s a self-help tool,
              not a law firm: it doesn&rsquo;t represent you and can&rsquo;t give legal advice about
              your specific case.
            </p>
            <p style={{ font: `16px/1.6 ${BODY_FONT}`, color: "rgba(255,255,255,0.78)", marginTop: 14, maxWidth: 640, marginLeft: "auto", marginRight: "auto" }}>
              What it does is turn the forms and procedure into plain-English steps, built around the
              facts you enter and the rules in your state. You read the document. You decide what to
              file. You stay in charge of your case.
            </p>
          </div>
        </div>
      </section>

    </main>
  );
}
