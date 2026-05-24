import type { Metadata } from "next";
import Image from "next/image";
import {
  C, H1, H2, eyebrow, body, PAD_X, RAD, HEAD_FONT, BODY_FONT, italicEmCSS,
  Arrow, Check, ShieldLogo, FirmBtn, FaqSection,
} from "../../components/firm";

export const metadata: Metadata = {
  title: "CivilCase — Recover what you're owed, without a lawyer",
  description:
    "Same Hybrid structure as /home4 but with /'s typography spec (weight 600, clamp sizes, 0.14em eyebrows, plain ink italic emphasis) and the 1600px container used by the other wide variants.",
  alternates: { canonical: "/" },
};
export default function Home2() {
  return (
    <main style={{ background: C.bg, color: C.fg, font: `16px/1.5 ${BODY_FONT}` }}>
      <style dangerouslySetInnerHTML={{ __html: italicEmCSS }} />

      {/* ─────────────── HERO · WHITE CENTERED (variant A) ─────────────── */}
      <section style={{ padding: "120px 80px 80px", background: "#fff" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", textAlign: "center" }}>
          {/* avatar stack + rating, sits above the headline */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 12, marginBottom: 36 }}>
            <div style={{ display: "flex" }}>
              {["/assets/home2/avatar-1.webp", "/assets/home2/avatar-2.webp", "/assets/home2/avatar-3.webp", "/assets/home2/avatar-4.webp"].map((src, i) => (
                <span key={src} style={{ width: 32, height: 32, borderRadius: "50%", overflow: "hidden", display: "inline-block", position: "relative", border: "2px solid #fff", marginLeft: i ? -10 : 0 }}>
                  <Image src={src} alt="" fill sizes="32px" style={{ objectFit: "cover" }} aria-hidden />
                </span>
              ))}
            </div>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, font: `500 13px/1 ${BODY_FONT}`, color: C.muted, marginLeft: 6 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill={C.fg} aria-hidden>
                <path d="M12 2l2.39 7.36H22l-6.18 4.49L18.21 22 12 17.27 5.79 22l2.39-8.15L2 9.36h7.61z" />
              </svg>
              Rated <strong style={{ color: C.fg, fontWeight: 700 }}>4.9/5</strong> from 2,300+ users
            </span>
          </div>

          <h1 className="firm-h" style={H1}>
            Get your money back, <em>without a lawyer.</em>
          </h1>
          <p style={{ font: `400 19px/1.6 ${BODY_FONT}`, color: C.muted, maxWidth: 640, margin: "28px auto 36px" }}>
            CivilCase handles the repeatable with precision — demand letters, court filings, and collection —
            so you can focus on getting paid, not paperwork.
          </p>
          <div style={{ display: "inline-flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
            <FirmBtn>Start your case</FirmBtn>
            <FirmBtn kind="ghost">Check case strength</FirmBtn>
          </div>
        </div>
      </section>

      {/* ─────────────── PRACTICE AREAS ─────────────── */}
      <section style={{ padding: `120px ${PAD_X}` }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 80, marginBottom: 60 }}>
          <div>
            <div style={{ ...eyebrow, marginBottom: 22 }}>OUR SERVICES</div>
            <h2 className="firm-h" style={H2}>Specialized claims across every <em>civil dispute</em>.</h2>
          </div>
          <p style={{ ...body, alignSelf: "end" }}>
            Whether you&rsquo;re chasing an unpaid invoice or recovering a security deposit, every CivilCase
            letter is drafted to your jurisdiction, your facts, and the statute that applies.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
          {[
            { n: "01.", t: "Security Deposits", d: "Statutory damages where landlords act in bad faith.", tag: "Recovers 2–3× deposit", img: "/assets/home2/service-demand-letter.webp" },
            { n: "02.", t: "Contractor Disputes", d: "Unpaid balances, abandoned jobs, defective work.", tag: "Mech. lien support", img: "/assets/home2/service-filing-kit.webp" },
            { n: "03.", t: "Wage Claims", d: "Final paychecks, unpaid overtime, off-the-books work.", tag: "DOL-aligned drafting", img: "/assets/home2/bento-photo.webp" },
            { n: "04.", t: "Consumer Refunds", d: "Defective goods, fraud, refused returns, dealer disputes.", tag: "Cited under your state UCL", img: "/assets/home2/service-collection-plan.webp" },
          ].map((p) => (
            <article key={p.t} style={{ background: C.paper, border: `1px solid ${C.line}`, overflow: "hidden" }}>
              <div style={{ position: "relative", aspectRatio: "5 / 4", overflow: "hidden" }}>
                <Image src={p.img} alt="" fill sizes="(max-width: 1024px) 50vw, 25vw" style={{ objectFit: "cover" }} aria-hidden />
              </div>
              <div style={{ padding: 24 }}>
                <div style={{ font: `500 12px/1 ${BODY_FONT}`, color: C.accent, letterSpacing: "0.06em", marginBottom: 12 }}>{p.n}</div>
                <div style={{ font: `600 30px/1.18 ${HEAD_FONT}`, color: C.fg, letterSpacing: "-0.01em" }}>{p.t}</div>
                <p style={{ ...body, marginTop: 8, fontSize: 14 }}>{p.d}</p>
                <div style={{ marginTop: 18, paddingTop: 14, borderTop: `1px solid ${C.line}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ font: `12px/1 ${BODY_FONT}`, color: C.muted }}>{p.tag}</div>
                  <Arrow color={C.accent} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ─────────────── FIVE SCENARIOS — header + alternating editorial cases ─────────────── */}
      <section style={{ padding: `120px ${PAD_X} 0` }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 80, alignItems: "end" }}>
          <div>
            <h2 className="firm-h" style={H2}>The cases we see <em>most often</em>.</h2>
          </div>
          <p style={body}>
            These five fact patterns make up about 80% of landlord cases we draft. Each one has its own
            statute, evidence list, and damages math.
          </p>
        </div>
      </section>

      {[
        {
          n: "I.",
          tag: "DEPOSITS",
          title: "The deposit that never came back.",
          img: "/assets/firm/ll-deposit.webp",
          desc: "You moved out clean. The landlord had 14, 21, or 30 days to itemize or return. They did neither. Most states impose 2× or 3× damages for bad-faith retention. The deposit is the floor; the statutory multiplier is what makes it a real case.",
          range: "$1,200 – $9,000",
          statute: "21-day notice statutes · multipliers in 41 states",
          evidence: ["Signed lease", "Move-out photos", "Forwarding address proof", "Deposit receipt"],
          href: "/small-claims/landlord/security-deposit",
          reverse: false,
        },
        {
          n: "II.",
          tag: "LOCKOUTS",
          title: "Locked out, kept out, paid double.",
          img: "/assets/firm/ll-lockout.webp",
          desc: "Self-help eviction is illegal in every state. Changed locks, shut-off utilities, removed your stuff — the landlord owes per-day statutory damages plus everything it cost to find shelter, replace what they tossed, and miss work to deal with it.",
          range: "$2,500 – $15,000",
          statute: "Per-day statutory damages (CA: $100/day · FL: 3× rent)",
          evidence: ["Lease", "Police report", "Hotel + replacement receipts", "Witness statements"],
          href: "/small-claims/landlord/illegal-lockout",
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
                <div style={{ ...eyebrow, color: C.muted, marginBottom: 8 }}>RECOVERY RANGE</div>
                <div className="firm-h" style={{ font: `500 22px/1.1 ${HEAD_FONT}`, color: C.fg }}>{s.range}</div>
              </div>
              <div>
                <div style={{ ...eyebrow, color: C.muted, marginBottom: 8 }}>STATUTORY BASIS</div>
                <div style={{ font: `13.5px/1.4 ${BODY_FONT}`, color: C.fg }}>{s.statute}</div>
              </div>
            </div>
            <div style={{ marginTop: 28 }}>
              <div style={{ ...eyebrow, color: C.muted, marginBottom: 12 }}>EVIDENCE YOU&rsquo;LL NEED</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {s.evidence.map((e) => (
                  <div key={e} style={{ border: `1px solid ${C.line}`, padding: "6px 12px", font: `12.5px/1.3 ${BODY_FONT}`, color: C.fg, background: "#fff" }}>
                    {e}
                  </div>
                ))}
              </div>
            </div>
            <a href={s.href} style={{ marginTop: 32, display: "inline-flex", alignItems: "center", gap: 10, font: `13px/1 ${BODY_FONT}`, color: C.accent, textDecoration: "none" }}>
              Read the full guide <Arrow color={C.accent} />
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


      {/* ─────────────── FOUNDER NOTE ─────────────── */}
      <section>
        <div style={{ background: C.dark, color: "#fff", padding: `100px ${PAD_X}` }}>
          {/* alignItems: start instead of center, so the copy hugs the top
              of the grid cell and there's no empty space above the eyebrow
              when the photo column is taller than the text column. */}
          <div style={{ display: "grid", gridTemplateColumns: "0.7fr 1.7fr", gap: 80, alignItems: "center", maxWidth: 1500, margin: "0 auto" }}>
            <div style={{ position: "relative", aspectRatio: "1 / 1", width: "100%", maxWidth: 320, borderRadius: 999, overflow: "hidden", border: `4px solid ${C.accentOnDark}`, boxShadow: "0 18px 50px -22px rgba(0,0,0,0.55)" }}>
              <Image src="/yury.webp" alt="Yury Byalik" fill sizes="(max-width: 1024px) 100vw, 28vw" style={{ objectFit: "cover" }} />
            </div>
            <div>
              <div style={{ ...eyebrow, color: "rgba(255,255,255,0.6)", marginBottom: 22 }}>A NOTE FROM OUR FOUNDER</div>
              <h2 className="firm-h firm-h-light" style={{ ...H2, color: "#fff", fontSize: 46 }}>Built by a lawyer, so you <em>don&rsquo;t need one</em>.</h2>
              <p style={{ font: `16px/1.6 ${BODY_FONT}`, color: "rgba(255,255,255,0.78)", marginTop: 24, maxWidth: 620 }}>
                I spent fifteen years inside courthouses watching working people lose claims they should have
                won, simply because they couldn&rsquo;t afford a lawyer to walk them through the process.
              </p>
              <p style={{ font: `16px/1.6 ${BODY_FONT}`, color: "rgba(255,255,255,0.78)", marginTop: 14, maxWidth: 620 }}>
                We built CivilCase to flip that. Every form, every deadline, every step that a paralegal would
                charge you $200 an hour to handle, drafted for your specific case in your specific county. You
                bring the facts. We bring the procedure.
              </p>
              <div style={{ marginTop: 32, paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.15)" }}>
                <div style={{ font: `500 17px/1 ${HEAD_FONT}`, color: "#fff" }}>Yury Byalik, Esq.</div>
                <div style={{ font: `13px/1.4 ${BODY_FONT}`, color: "rgba(255,255,255,0.55)", marginTop: 4 }}>
                  Founder &amp; CEO, CivilCase · CA Bar 281044
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────── CASES CLOSED ─────────────── */}
      <section style={{ padding: `120px ${PAD_X}` }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, marginBottom: 56, alignItems: "end" }}>
          <div>
            <div style={{ ...eyebrow, marginBottom: 22 }}>VERDICTS</div>
            <h2 className="firm-h" style={H2}>Cases closed. <em>Money recovered.</em></h2>
          </div>
          <div style={body}>
            Real plaintiffs, real outcomes. Names and counties below are anonymized where requested but
            verified against court filings.
            <div style={{ font: `13px/1.4 ${BODY_FONT}`, color: C.accent, marginTop: 16 }}>$18.4M recovered to date →</div>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0, borderTop: `1px solid ${C.fg}` }}>
          {[
            { tag: "SECURITY DEPOSIT", amt: "$2,800", verdict: "WON", quote: "My landlord ignored me for six weeks. CivilCase put a demand letter on his desk. He wired the deposit back the next morning.", who: "Maya R.", where: "Brooklyn, NY · Filed 2/14, settled 2/26" },
            { tag: "CONTRACTOR", amt: "$4,200", verdict: "RECOVERED", quote: "Two lawyers had already taken $1,800 of my money for nothing. CivilCase finished it in eleven days for the price of a stamp.", who: "Daniel P.", where: "Austin, TX · Filed 1/22, settled 2/12" },
            { tag: "WAGE DISPUTE", amt: "$6,750", verdict: "JUDGMENT", quote: "My ex-employer thought ignoring me would be cheaper than paying my final check. The court disagreed. So did the bank levy.", who: "Marcos W.", where: "Phoenix, AZ · Filed 1/04, settled 1/22" },
          ].map((c, i) => (
            <article key={c.who} style={{ padding: "40px 32px", borderLeft: i ? `1px solid ${C.line}` : "none", borderBottom: `1px solid ${C.line}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <div style={{ font: `500 11px/1 ${BODY_FONT}`, letterSpacing: "0.16em", color: C.muted }}>{c.tag}</div>
                <div style={{ font: `500 10px/1 ${BODY_FONT}`, letterSpacing: "0.16em", color: C.accent, padding: "4px 8px", border: `1px solid ${C.accent}`, borderRadius: 999 }}>{c.verdict}</div>
              </div>
              <div style={{ font: `600 64px/1 ${HEAD_FONT}`, marginTop: 24, letterSpacing: "-0.02em" }}>{c.amt}</div>
              <div style={{ font: `13px/1 ${BODY_FONT}`, color: C.muted, marginTop: 6 }}>recovered</div>
              <p style={{ ...body, marginTop: 24, fontSize: 14.5, color: C.fg, fontStyle: "italic" }}>&ldquo;{c.quote}&rdquo;</p>
              <div style={{ marginTop: 24, paddingTop: 16, borderTop: `1px solid ${C.line}` }}>
                <div style={{ font: `500 13px/1.3 ${BODY_FONT}` }}>{c.who}</div>
                <div style={{ font: `12px/1.4 ${BODY_FONT}`, color: C.muted, marginTop: 3 }}>{c.where}</div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <FaqSection
        title={<>Frequently asked <em>questions</em>.</>}
        subtitle="Still have a question? Email hello@civilcase.com."
        faqs={[
          { q: "What is a demand letter?", a: "A demand letter is a formal written notice that you're owed money and intend to pursue the matter in court if it isn't resolved. It puts the other side on notice, sets a deadline, and creates a paper trail." },
          { q: "Why does it work?", a: null },
          { q: "Will my name and address be on the letter?", a: null },
          { q: "Do you contact me before mailing?", a: null },
          { q: "Can I cancel after I pay?", a: null },
          { q: "What if they respond and offer less than I asked for?", a: null },
          { q: "What if they ignore the letter?", a: null },
          { q: "Do I need a lawyer to send one?", a: null },
          { q: "What if I don't have the other person's address?", a: null },
          { q: "Is CivilCase a law firm?", a: null },
        ]}
      />
    </main>
  );
}
