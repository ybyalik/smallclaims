import type { Metadata } from "next";
import Image from "next/image";
import {
  FileText, Lightbulb, Wallet, Droplet, DoorOpen, Lock, ShieldAlert,
  Bug, Zap, HeartCrack, Building2, LogOut, FileX, HelpCircle,
} from "lucide-react";
import Link from "next/link";
import HeroStatePins from "../../../components/HeroStatePins";
import UsMap from "../../../components/widgets/UsMap";
import { availableStateSlugs } from "../../../lib/state-data";
import {
  C, H1, H2, eyebrow, body, PAD_X, RAD, HEAD_FONT, BODY_FONT, italicEmCSS,
  Arrow, Check, FirmBtn, ThreeWaysSection, FaqSection,
} from "../../../components/firm";

export const metadata: Metadata = {
  title: "Sue a Landlord · CivilCase",
  description: "Same landlord4 with the home4-wide treatment: 1600px container, / typography, white bg with cream alternates, peach accent on dark.",
  alternates: { canonical: "/landlord" },
};

export default async function Landlord2() {
  const ready = await availableStateSlugs();
  return (
    <main style={{ background: C.bg, color: C.fg, font: `16px/1.5 ${BODY_FONT}` }}>
      <style dangerouslySetInnerHTML={{ __html: italicEmCSS }} />

      {/* breadcrumb */}
      <div style={{ padding: `20px ${PAD_X}`, background: C.bg, borderBottom: `1px solid ${C.line}`, font: `13px/1 ${BODY_FONT}`, color: C.muted }}>
        <Link href="/" style={{ color: C.muted, textDecoration: "none" }}>CivilCase</Link>
        <span style={{ margin: "0 10px", opacity: 0.5 }}>/</span>
        <Link href="/small-claims" style={{ color: C.muted, textDecoration: "none" }}>Small Claims</Link>
        <span style={{ margin: "0 10px", opacity: 0.5 }}>/</span>
        <span style={{ color: C.fg, fontWeight: 500 }}>Landlord Disputes</span>
      </div>

      {/* HERO */}
      <section style={{ padding: `60px ${PAD_X} 80px` }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.15fr 1fr", gap: 80, alignItems: "center" }}>
          <div>
            <div style={{ ...eyebrow, color: C.accent, marginBottom: 28 }}>CATEGORY · LANDLORD DISPUTES</div>
            <h1 className="firm-h" style={{ ...H1, fontSize: 60 }}>How to sue your landlord in <em>small claims court</em>.</h1>
            <p style={{ font: `18px/1.55 ${BODY_FONT}`, color: C.muted, maxWidth: 540, marginTop: 28 }}>
              If your landlord owes you money for a withheld deposit, repair costs, or a hotel bill from a
              lockout, small claims is the right court. You do not need an attorney. Filing fees are usually
              under $100, and many states add statutory damages on top of what you are directly owed.
            </p>
            <div style={{ display: "flex", gap: 14, marginTop: 36 }}>
              <FirmBtn href="/case-score">Check My Case (Free)</FirmBtn>
              <FirmBtn kind="ghost" href="/demand-letter">Send a Demand Letter</FirmBtn>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0, marginTop: 56, paddingTop: 30, borderTop: `1px solid ${C.line}` }}>
              {[["Typical recovery", "$2K – $8K"], ["Statutory multiplier", "2× – 3×"], ["Timeline", "30–90 days"], ["Filing fee", "< $100"]].map(([k, v], i) => (
                <div key={k} style={{ paddingLeft: i ? 24 : 0, borderLeft: i ? `1px solid ${C.line}` : "none" }}>
                  <div style={{ ...eyebrow, color: C.muted, marginBottom: 10 }}>{k}</div>
                  <div style={{ font: `600 26px/1.1 ${HEAD_FONT}`, color: C.fg, letterSpacing: "-0.01em" }}>{v}</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <HeroStatePins />
          </div>
        </div>
      </section>

      {/* SUBCATEGORIES */}
      <section style={{ padding: `120px ${PAD_X}` }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 80, marginBottom: 56, alignItems: "end" }}>
          <div>
            <div style={{ ...eyebrow, marginBottom: 22 }}>SUBCATEGORIES</div>
            <h2 className="firm-h" style={H2}>What can you sue your landlord <em>for</em>?</h2>
          </div>
          <p style={body}>
            Pick the one that fits your situation. Each guide covers what you can recover, what evidence to
            bring, and how to file in your state.
          </p>
        </div>
        <article style={{ background: C.cream, border: `1px solid ${C.line}`, borderRadius: RAD.large, padding: "32px 40px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 22, alignItems: "center", marginBottom: 28 }}>
            <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#fff", display: "grid", placeItems: "center", color: C.accent, boxShadow: "0 1px 0 rgba(0,0,0,0.04)" }}>
              <FileText size={26} strokeWidth={1.8} aria-hidden />
            </div>
            <div>
              <div style={{ font: `600 26px/1.2 ${HEAD_FONT}`, color: C.fg, letterSpacing: "-0.012em" }}>All landlord disputes</div>
              <div style={{ font: `400 15px/1.5 ${BODY_FONT}`, color: C.muted, marginTop: 4 }}>
                Pick the one that fits your situation. Each links to a state-specific guide.
              </div>
            </div>
            <button type="button" aria-label="Collapse" style={{ background: "transparent", border: "none", padding: 8, cursor: "pointer", color: C.muted, display: "grid", placeItems: "center" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="m18 15-6-6-6 6" />
              </svg>
            </button>
          </div>

          <div style={{ background: "#fff", borderRadius: RAD.panel, padding: "10px 8px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
              {[
                { Icon: Wallet, t: "Security deposit not returned", d: "Most common case. 2× or 3× penalty in many states.", href: "/small-claims/landlord/security-deposit" },
                { Icon: Droplet, t: "Mold and habitability", d: "Medical costs, ruined property, rent abatement.", href: "/small-claims/landlord/mold" },
                { Icon: DoorOpen, t: "Wrongful eviction", d: "Moving costs, lost property, hotel stays, statutory damages.", href: "/small-claims/landlord/wrongful-eviction" },
                { Icon: Lock, t: "Illegal lockout", d: "Changed locks, shut-off utilities. CA $100/day, FL 3× damages.", href: "/small-claims/landlord/illegal-lockout" },
                { Icon: ShieldAlert, t: "Landlord harassment", d: "Unauthorized entries, threats, retaliation. CA $2K/act, NYC 3× rent.", href: "/small-claims/landlord/harassment" },
                { Icon: Bug, t: "Pest infestation", d: "Roaches, bed bugs, rats. Treatment costs and rent reduction.", href: "/small-claims/landlord/pest-infestation" },
                { Icon: Zap, t: "Unsafe living conditions", d: "Structural, electrical, no heat or hot water.", href: "/small-claims/landlord/unsafe-conditions" },
                { Icon: HeartCrack, t: "Emotional distress", d: "Pair with a willful tenant claim. Documented damages awarded.", href: "/small-claims/landlord/emotional-distress" },
                { Icon: Building2, t: "Apartment complex", d: "Corporate landlords settle faster. Typically $4K to $12K.", href: "/small-claims/landlord/apartment-complex" },
                { Icon: LogOut, t: "After moving out", d: "Most states honor 1 to 4 years after move-out. Move quickly anyway.", href: "/small-claims/landlord/after-moving-out" },
                { Icon: FileX, t: "Break your lease", d: "Five legal grounds: military, DV, habitability, harassment, mutual.", href: "/small-claims/landlord/break-lease" },
                { Icon: HelpCircle, t: "Something else?", d: "Tell us about your situation in 90 seconds.", href: "/case-score" },
              ].map((it, idx) => (
                <a key={idx} href={it.href} className="firm-cat-link" style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 14, alignItems: "center", padding: "18px 22px", textDecoration: "none", color: "inherit", borderRadius: 10 }}>
                  <span style={{ display: "grid", placeItems: "center", width: 28, color: C.accent }}>
                    <it.Icon size={20} strokeWidth={1.8} aria-hidden />
                  </span>
                  <div>
                    <div style={{ font: `600 16px/1.3 ${BODY_FONT}`, color: C.fg }}>{it.t}</div>
                    <div style={{ font: `400 13px/1.45 ${BODY_FONT}`, color: C.muted, marginTop: 2 }}>{it.d}</div>
                  </div>
                  <span style={{ color: C.fg, display: "grid", placeItems: "center" }} aria-hidden>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                </a>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 22, paddingLeft: 6, flexWrap: "wrap" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8, color: C.muted, font: `500 13px/1 ${BODY_FONT}` }}>
              <Lightbulb size={14} strokeWidth={1.8} aria-hidden />
              Popular right now:
            </span>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {["Security deposit", "Illegal lockout", "Mold", "Wrongful eviction"].map((p) => (
                <span key={p} style={{ display: "inline-flex", alignItems: "center", padding: "6px 12px", borderRadius: 999, background: "rgba(31,26,22,0.04)", border: `1px solid ${C.line}`, font: `500 12.5px/1 ${BODY_FONT}`, color: C.fg }}>
                  {p}
                </span>
              ))}
            </div>
          </div>
        </article>
      </section>

      {/* BELONGS / DOESN'T BELONG */}
      <section style={{ padding: `120px ${PAD_X}` }}>
        <div style={{ marginBottom: 56 }}>
          <div style={{ ...eyebrow, marginBottom: 22 }}>SCOPE</div>
          <h2 className="firm-h" style={H2}>How small claims handles <em>landlord disputes</em>.</h2>
          <p style={{ ...body, marginTop: 22, maxWidth: 680 }}>Small claims is built for everyday money disputes, the kind tenants run into all the time. Most state caps fall between $5,000 and $20,000. Hearings take 10 to 15 minutes. You do not need a lawyer to use it.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          <div style={{ background: C.paper, border: `1px solid ${C.line}`, padding: "38px 36px", borderRadius: RAD.card }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
              <div style={{ width: 28, height: 28, borderRadius: 999, background: C.accent, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}><Check color="#fff" /></div>
              <div style={{ ...eyebrow, color: C.accent }}>BELONGS IN SMALL CLAIMS</div>
            </div>
            <div style={{ display: "grid", gap: 18 }}>
              {[["Withheld security deposit", "Plus 2× or 3× in statutory damages in many states."], ["Repairs you paid for", "That the lease said the landlord owed."], ["Hotel stays during an illegal lockout", "Or uninhabitable period."], ["Ruined personal property", "From a habitability failure (mold, leaks, pests)."], ["Lead-paint disclosure violations", "Under federal and state law."]].map(([t, d], i) => (
                <div key={t} style={{ display: "grid", gridTemplateColumns: "28px 1fr", gap: 18, paddingBottom: i < 4 ? 18 : 0, borderBottom: i < 4 ? `1px solid ${C.line}` : "none" }}>
                  <div style={{ font: `500 12px/1 ${BODY_FONT}`, color: C.accent, letterSpacing: "0.06em" }}>{`0${i + 1}`}</div>
                  <div>
                    <div style={{ font: `600 18px/1.3 ${HEAD_FONT}`, color: C.fg, letterSpacing: "-0.005em" }}>{t}</div>
                    <div style={{ font: `13px/1.55 ${BODY_FONT}`, color: C.muted, marginTop: 4 }}>{d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: C.dark, color: "#fff", padding: "38px 36px", borderRadius: RAD.card }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
              <div style={{ width: 28, height: 28, borderRadius: 999, border: "1.5px solid rgba(255,255,255,0.4)", color: "rgba(255,255,255,0.7)", display: "flex", alignItems: "center", justifyContent: "center", font: `500 14px/1 ${BODY_FONT}` }}>×</div>
              <div style={{ ...eyebrow, color: "rgba(255,255,255,0.7)" }}>DOESN&rsquo;T BELONG HERE</div>
            </div>
            <div style={{ display: "grid", gap: 18 }}>
              {[["Getting back into the unit", "That requires an emergency court order from housing court — small claims can't force the landlord to let you back in."], ["Rent-control calculations", "Handled by your local rent board, not the courts."], ["Fair-housing discrimination", "Filed with a civil-rights agency or in federal court."], ["Eviction defense", "Goes to housing court (sometimes called 'unlawful detainer' court), not small claims."]].map(([t, d], i) => (
                <div key={t} style={{ display: "grid", gridTemplateColumns: "28px 1fr", gap: 18, paddingBottom: i < 3 ? 18 : 0, borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.1)" : "none" }}>
                  <div style={{ font: `500 12px/1 ${BODY_FONT}`, color: "rgba(255,255,255,0.5)", letterSpacing: "0.06em" }}>{`0${i + 1}`}</div>
                  <div>
                    <div style={{ font: `600 18px/1.3 ${HEAD_FONT}`, color: "#fff", letterSpacing: "-0.005em" }}>{t}</div>
                    <div style={{ font: `13px/1.55 ${BODY_FONT}`, color: "rgba(255,255,255,0.7)", marginTop: 4 }}>{d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DAMAGES CALCULATOR (cream-bg section) */}
      <section style={{ padding: `120px ${PAD_X}`, background: C.cream }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 80, marginBottom: 56, alignItems: "end" }}>
            <div>
              <div style={{ ...eyebrow, marginBottom: 22 }}>DAMAGES</div>
              <h2 className="firm-h" style={H2}>What can you <em>recover</em>?</h2>
            </div>
            <p style={body}>The math judges use. A typical security-deposit case stacks four layers on top of the deposit you are directly owed. Sample math below is based on a $1,500 deposit withheld in bad faith — your numbers will differ.</p>
          </div>
          <div style={{ background: "#fff", border: `1px solid ${C.line}`, borderRadius: RAD.card, overflow: "hidden" }}>
            {[{ tag: "01", title: "Direct damages", desc: "The deposit, repair receipts, hotel and moving costs, replacement-cost photos.", amount: "$1,500", label: "BASE AMOUNT", bar: 30, accent: false }, { tag: "02", title: "Penalty on top", desc: "If the landlord kept your money without a good reason, most states let you sue for 2 or 3 times that amount as a penalty (called 'statutory damages').", amount: "+$3,000", label: "2× MULTIPLIER", bar: 60, accent: true }, { tag: "03", title: "Attorney's fees", desc: "Many state laws make the losing side pay the winner's attorney fees. That pressure alone often gets the landlord to settle before court.", amount: "+$300", label: "TYPICAL RECOVERY", bar: 6, accent: false }, { tag: "04", title: "Interest", desc: "4 to 10 percent per year, pre- and post-judgment, depending on the state.", amount: "+$150", label: "ACCRUING", bar: 3, accent: false }].map((row) => (
              <div key={row.tag} style={{ display: "grid", gridTemplateColumns: "44px 1fr 1.4fr", gap: 30, alignItems: "center", padding: "28px 32px", borderBottom: `1px solid ${C.line}`, background: row.accent ? `${C.accent}0a` : "transparent" }}>
                <div style={{ font: `500 12px/1 ${BODY_FONT}`, color: row.accent ? C.accent : C.muted, letterSpacing: "0.08em" }}>{row.tag}</div>
                <div>
                  <div style={{ font: `600 22px/1.3 ${HEAD_FONT}`, color: row.accent ? C.accent : C.fg, letterSpacing: "-0.005em", fontStyle: row.accent ? "italic" : "normal" }}>{row.title}</div>
                  <div style={{ font: `13px/1.55 ${BODY_FONT}`, color: C.muted, marginTop: 6, maxWidth: 460 }}>{row.desc}</div>
                </div>
                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 20 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ height: 6, background: C.line, position: "relative", borderRadius: 3 }}>
                      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${row.bar}%`, background: C.accent, borderRadius: 3 }} />
                    </div>
                  </div>
                  <div style={{ minWidth: 130, textAlign: "right" }}>
                    <div style={{ font: `600 32px/1 ${HEAD_FONT}`, color: row.accent ? C.accent : C.fg, letterSpacing: "-0.015em" }}>{row.amount}</div>
                    <div style={{ ...eyebrow, color: C.muted, marginTop: 6, fontSize: 9 }}>{row.label}</div>
                  </div>
                </div>
              </div>
            ))}
            <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 20, alignItems: "center", padding: 32, background: C.dark, color: "#fff" }}>
              <div>
                <div style={{ ...eyebrow, color: "rgba(255,255,255,0.55)", marginBottom: 8 }}>ESTIMATED RECOVERY</div>
                <div style={{ font: `13px/1.4 ${BODY_FONT}`, color: "rgba(255,255,255,0.7)" }}>Sample math on a $1,500 deposit withheld in bad faith. Your numbers will differ.</div>
              </div>
              <div style={{ font: `500 60px/1 ${HEAD_FONT}`, color: C.accent, letterSpacing: "-0.025em", fontStyle: "italic" }}>$4,950</div>
            </div>
          </div>
        </div>
      </section>

      {/* EVIDENCE (dark) */}
      <section style={{ padding: `120px ${PAD_X}` }}>
        <div style={{ background: C.dark, color: "#fff", padding: "70px 60px", borderRadius: RAD.panel }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 60, alignItems: "end", marginBottom: 50 }}>
            <div>
              <div style={{ ...eyebrow, color: "rgba(255,255,255,0.55)", marginBottom: 22 }}>BUILD THE FILE</div>
              <h2 className="firm-h firm-h-light" style={{ ...H2, color: "#fff" }}>What evidence do you need to <em>sue your landlord</em>?</h2>
            </div>
            <div style={{ font: `15px/1.65 ${BODY_FONT}`, color: "rgba(255,255,255,0.7)" }}>
              Landlord cases are won on paperwork. Anything you can&rsquo;t show in writing, you&rsquo;re asking
              the judge to just take your word for — and they usually won&rsquo;t. Your landlord has more
              documentation than you do. Your job is to close that gap before you walk into court.
              <div style={{ marginTop: 18, font: `500 12px/1.4 ${BODY_FONT}`, color: C.accentOnDark, letterSpacing: "0.08em" }}>※ More documentation = stronger case</div>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
            {[["01", "Your lease", "Every page of the signed copy, not a draft."], ["02", "Move-in & move-out photos", "Walk-through photos plus the condition checklist."], ["03", "Proof of every payment", "Bank records, money-order stubs, cancelled checks."], ["04", "All communications", "Texts, emails, certified-mail receipts, voicemails."], ["05", "Receipts for what you spent", "Hotel, movers, replacement furniture, extermination."], ["06", "Your forwarding address notice", "Starts the state's return-deadline clock."], ["07", "Witness contact info", "Roommate, neighbor, repair tech."], ["08", "Anything else they sent you", "Notices, repair denials, eviction threats, late-fee invoices."]].map(([n, t, d]) => (
              <div key={n} style={{ background: "#fff", color: C.fg, padding: 22, minHeight: 200, borderRadius: RAD.card }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                  <div style={{ width: 26, height: 26, borderRadius: 999, background: C.accent, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", font: `500 12px/1 ${BODY_FONT}` }}>{parseInt(n, 10)}</div>
                  <div style={{ font: `500 10px/1 ${BODY_FONT}`, letterSpacing: "0.14em", color: C.muted }}>EVIDENCE</div>
                </div>
                <div style={{ font: `500 16px/1.25 ${HEAD_FONT}`, color: C.fg, letterSpacing: "-0.005em" }}>{t}</div>
                <p style={{ ...body, marginTop: 8, fontSize: 14 }}>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATE-SPECIFIC RULES */}
      <section style={{ padding: `120px ${PAD_X}` }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 60, alignItems: "center" }}>
          <div>
            <div style={{ ...eyebrow, marginBottom: 22 }}>BY STATE</div>
            <h2 className="firm-h" style={H2}>State-specific <em>rules</em>.</h2>
            <p style={{ ...body, marginTop: 22, maxWidth: 420 }}>Landlord-tenant rules vary state by state. Deposit return deadlines, statutory damages, and repair-and-deduct procedures are different in every state. Pick yours for the exact statute, deadline, and form numbers.</p>
            <div style={{ marginTop: 32 }}><FirmBtn kind="ghost" href="/small-claims">See all 50 state guides</FirmBtn></div>
          </div>
          <div>
            <div style={{ marginBottom: 24 }}>
              <UsMap readySlugs={ready} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
              {[["CA", "California", "21 days · 2×"], ["TX", "Texas", "30 days · 3×"], ["FL", "Florida", "15 days · 1×"], ["NY", "New York", "14 days · 2×"], ["IL", "Illinois", "30 days · 2×"], ["PA", "Pennsylvania", "30 days · 2×"], ["OH", "Ohio", "30 days · 2×"], ["GA", "Georgia", "30 days · 3×"], ["MI", "Michigan", "30 days · 2×"], ["NC", "North Carolina", "30 days · 1×"], ["MN", "Minnesota", "21 days · 2×"], ["DE", "Delaware", "20 days · 2×"]].map(([abbr, name, rule]) => (
                <div key={abbr} style={{ background: "#fff", border: `1px solid ${C.line}`, padding: "14px 16px", display: "flex", flexDirection: "column", gap: 4, borderRadius: RAD.card }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <div style={{ font: `500 11px/1 ${BODY_FONT}`, color: C.accent, letterSpacing: "0.06em" }}>{abbr}</div>
                    <Arrow color={C.muted} size={10} />
                  </div>
                  <div style={{ font: `500 15px/1.2 ${HEAD_FONT}`, color: C.fg, marginTop: 4, letterSpacing: "-0.005em" }}>{name}</div>
                  <div style={{ font: `11px/1.3 ${BODY_FONT}`, color: C.muted }}>{rule}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ThreeWaysSection
        lede="Most landlord disputes settle once a real demand letter arrives. If yours doesn't, the state guide walks you through filing step by step."
        testimonial={{
          quote: "Won my $4,500 deposit back in 17 days. The demand letter alone got my landlord to settle.",
          name: "Maria R.",
          meta: "Tenant · California",
        }}
      />

      <FaqSection
        title={<>Landlord <em>questions</em>.</>}
        subtitle="The questions tenants actually ask before filing."
        faqs={[
          { q: "Can you sue your landlord in small claims court?", a: "Yes. Small claims is the standard venue for tenant-versus-landlord money disputes under your state's jurisdictional cap (usually $5,000 to $20,000)." },
          { q: "How long do you have to sue a landlord?", a: null },
          { q: "Do you need a lawyer to sue a landlord?", a: null },
          { q: "What if your landlord ignores your demand letter?", a: null },
          { q: "Can you sue your landlord while you still live there?", a: null },
          { q: "What can you recover from a landlord in small claims?", a: null },
          { q: "How do I serve my landlord?", a: null },
          { q: "Can I sue the property management company?", a: null },
          { q: "Does small claims affect my rental history?", a: null },
          { q: "What if my landlord countersues?", a: null },
        ]}
      />
    </main>
  );
}
