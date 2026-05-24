import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Building2, Briefcase, Hammer, Car, Trees, HandCoins, Users, ShoppingBag, Receipt,
  FileText, Lightbulb,
} from "lucide-react";
import HeroStatePins from "../../../components/HeroStatePins";
import UsMap from "../../../components/widgets/UsMap";
import { availableStateSlugs } from "../../../lib/state-data";
import { STATES } from "../../../lib/states";
import {
  C, H1, H2, eyebrow, body, PAD_X, RAD, HEAD_FONT, BODY_FONT, italicEmCSS,
  Arrow, FirmBtn, ThreeWaysSection, StateSearchPanel, FaqSection,
} from "../../../components/firm";

export const metadata: Metadata = {
  title: "Small Claims · CivilCase",
  description:
    "Same small-claims4 with the home4-wide treatment: 1600px container, /home2 typography, white bg with cream alternates, peach accent on dark.",
  alternates: { canonical: "/small-claims2" },
  robots: { index: false, follow: false },
};

export default async function SmallClaims2() {
  const ready = await availableStateSlugs();
  return (
    <main style={{ background: C.bg, color: C.fg, font: `16px/1.5 ${BODY_FONT}` }}>
      <style dangerouslySetInnerHTML={{ __html: italicEmCSS }} />

      {/* Breadcrumb */}
      <div style={{ padding: `20px ${PAD_X}`, borderBottom: `1px solid ${C.line}`, font: `13px/1 ${BODY_FONT}`, color: C.muted }}>
        <Link href="/home2" style={{ color: C.muted, textDecoration: "none" }}>CivilCase</Link>
        <span style={{ margin: "0 10px", opacity: 0.5 }}>/</span>
        <span style={{ color: C.fg, fontWeight: 500 }}>Small Claims</span>
      </div>

      {/* HERO */}
      <section style={{ padding: `80px ${PAD_X} 100px` }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.15fr 1fr", gap: 80, alignItems: "center" }}>
          <div>
            <div style={{ ...eyebrow, color: C.accent, marginBottom: 28 }}>SMALL CLAIMS FILING</div>
            <h1 className="firm-h" style={{ ...H1, fontSize: 64 }}>How to sue someone in <em>small claims court</em>.</h1>
            <p style={{ font: `18px/1.55 ${BODY_FONT}`, color: C.muted, maxWidth: 540, marginTop: 28 }}>
              The simplified court for everyday money disputes. Most caps fall between $5,000 and $20,000,
              hearings take 10 to 15 minutes, and you don&rsquo;t need a lawyer. Pick a category below to start,
              browse popular topics, or jump straight to your state for filing fees and forms.
            </p>
            <div style={{ display: "flex", gap: 14, marginTop: 36 }}>
              <FirmBtn href="/demand-letter2">Generate a Demand Letter</FirmBtn>
              <FirmBtn kind="ghost" href="/case-score2">Check My Case Strength</FirmBtn>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0, marginTop: 56, paddingTop: 30, borderTop: `1px solid ${C.line}` }}>
              {[["Cap", "$5K – $20K"], ["Hearing", "10–15 min"], ["Lawyer", "Not required"], ["States", "All 50"]].map(([k, v], i) => (
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

      {/* CATEGORIES */}
      <section style={{ padding: `120px ${PAD_X}` }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 80, marginBottom: 56, alignItems: "end" }}>
          <div>
            <div style={{ ...eyebrow, marginBottom: 22 }}>BY CATEGORY</div>
            <h2 className="firm-h" style={H2}>Pick the type of dispute <em>you&rsquo;re filing</em>.</h2>
          </div>
          <p style={body}>
            Each guide covers the legal theory, what evidence to bring, what you can recover, and how to file in
            your state. We&rsquo;ve drafted the steps and forms for every category below in every state we cover.
          </p>
        </div>
        {/* One panel containing all 9 category links. Header row + 2-col
            grid of sub-items + popular chips at the bottom. */}
        <article style={{ background: C.cream, border: `1px solid ${C.line}`, borderRadius: RAD.large, padding: "32px 40px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 22, alignItems: "center", marginBottom: 28 }}>
            <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#fff", display: "grid", placeItems: "center", color: C.accent, boxShadow: "0 1px 0 rgba(0,0,0,0.04)" }}>
              <FileText size={26} strokeWidth={1.8} aria-hidden />
            </div>
            <div>
              <div style={{ font: `600 26px/1.2 ${HEAD_FONT}`, color: C.fg, letterSpacing: "-0.012em" }}>All dispute categories</div>
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

          {/* 2-column grid of 9 category links + 1 "View all" */}
          <div style={{ background: "#fff", borderRadius: RAD.panel, padding: "10px 8px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
              {[
                { Icon: Building2, t: "Sue a landlord", d: "Security deposit, mold, eviction, lockout", href: "/small-claims2/landlord" },
                { Icon: Briefcase, t: "Sue an employer", d: "Wrongful termination, unpaid wages, retaliation", href: "/small-claims2/employer" },
                { Icon: Hammer, t: "Sue a contractor", d: "Took deposit, unfinished work, defective", href: "/small-claims2/contractor" },
                { Icon: Car, t: "Sue over a car", d: "Parked-car hit, lemon, mechanic, towing", href: "/small-claims2/auto" },
                { Icon: Trees, t: "Sue a neighbor", d: "Property damage, trees, noise, fence", href: "/small-claims2/neighbor" },
                { Icon: HandCoins, t: "Recover money owed", d: "Friends, family, IOUs, verbal agreements", href: "/small-claims2/personal-loan" },
                { Icon: Users, t: "Sue a roommate", d: "Unpaid rent, bills, move-out damage", href: "/small-claims2/roommate" },
                { Icon: ShoppingBag, t: "Sue an online seller", d: "Amazon, eBay, Marketplace, Venmo scams", href: "/small-claims2/online-seller" },
                { Icon: Receipt, t: "Get a refund", d: "Defective products, services, subscriptions", href: "/small-claims2/refund" },
                { Icon: FileText, t: "More categories", d: "View all dispute guides", href: "/small-claims2" },
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

          {/* Popular row */}
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 22, paddingLeft: 6, flexWrap: "wrap" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8, color: C.muted, font: `500 13px/1 ${BODY_FONT}` }}>
              <Lightbulb size={14} strokeWidth={1.8} aria-hidden />
              Popular right now:
            </span>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {["Security deposit", "Final paycheck", "Parked-car hit", "Venmo scam"].map((p) => (
                <span key={p} style={{ display: "inline-flex", alignItems: "center", padding: "6px 12px", borderRadius: 999, background: "rgba(31,26,22,0.04)", border: `1px solid ${C.line}`, font: `500 12.5px/1 ${BODY_FONT}`, color: C.fg }}>
                  {p}
                </span>
              ))}
            </div>
          </div>
        </article>
      </section>

      {/* QUIZ CTA */}
      <section style={{ padding: `120px ${PAD_X}` }}>
        <div style={{ background: C.dark, color: "#fff", padding: "44px 56px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 32, borderRadius: RAD.panel }}>
          <div>
            <div style={{ ...eyebrow, color: "rgba(255,255,255,0.55)", marginBottom: 12 }}>NOT SURE WHICH FITS?</div>
            <div className="firm-h firm-h-light" style={{ font: `600 32px/1.2 ${HEAD_FONT}`, letterSpacing: "-0.01em" }}>Take the case-strength <em>quiz</em>.</div>
            <div style={{ font: `14px/1.4 ${BODY_FONT}`, color: "rgba(255,255,255,0.6)", marginTop: 6 }}>
              Tell us about your situation in 90 seconds and get a strength read on your case.
            </div>
          </div>
          <FirmBtn kind="accent" href="/case-score2">Check Case Score</FirmBtn>
        </div>
      </section>

      {/* POPULAR TOPICS · Scenarios V6 — Category portraits */}
      <section style={{ padding: `100px ${PAD_X}`, background: C.cream, color: C.fg }}>
        {/* Header */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "end", marginBottom: 56 }}>
          <div>
            <div style={{ ...eyebrow, marginBottom: 18 }}>POPULAR TOPICS</div>
            <h2 className="firm-h" style={{ ...H2, fontSize: 44, margin: 0 }}>
              The most-searched <em>scenarios,</em> by who you&rsquo;re suing.
            </h2>
          </div>
          <p style={{ ...body, maxWidth: 460 }}>
            The 10 fact patterns we see most often, grouped by opponent. The category determines the statute,
            the evidence, and the recovery math.
          </p>
        </div>

        {/* 4 featured category portraits — 3 items each, real issue subpages */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 48 }}>
          {[
            {
              cat: "landlord",
              img: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=900&h=720&fit=crop",
              items: [
                { title: "for a security deposit", recovery: "$4,500", href: "/small-claims2/landlord/security-deposit" },
                { title: "for wrongful eviction", recovery: "$6,800", href: "/small-claims2/landlord/wrongful-eviction" },
                { title: "for an illegal lockout", recovery: "$5,200", href: "/small-claims2/landlord/illegal-lockout" },
              ],
            },
            {
              cat: "employer",
              img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&h=720&fit=crop",
              items: [
                { title: "for wrongful termination", recovery: "$7,200", href: "/small-claims2/employer/wrongful-termination" },
                { title: "for unpaid wages", recovery: "$3,400", href: "/small-claims2/employer/unpaid-wages" },
                { title: "for retaliation", recovery: "$5,800", href: "/small-claims2/employer/retaliation" },
              ],
            },
            {
              cat: "neighbor",
              img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=900&h=720&fit=crop",
              items: [
                { title: "for property damage", recovery: "$4,000", href: "/small-claims2/neighbor/property-damage" },
                { title: "for noise", recovery: "$3,200", href: "/small-claims2/neighbor/noise" },
                { title: "for a fence dispute", recovery: "$2,800", href: "/small-claims2/neighbor/fence-dispute" },
              ],
            },
            {
              cat: "contractor",
              img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=900&h=720&fit=crop",
              items: [
                { title: "who took a deposit and vanished", recovery: "$6,500", href: "/small-claims2/contractor/deposit-and-disappearing" },
                { title: "for unfinished work", recovery: "$4,800", href: "/small-claims2/contractor/unfinished-work" },
                { title: "for poor workmanship", recovery: "$3,900", href: "/small-claims2/contractor/poor-workmanship" },
              ],
            },
          ].map((g) => (
            <div
              key={g.cat}
              style={{
                display: "flex",
                flexDirection: "column",
                background: "#fff",
                border: `1px solid ${C.line}`,
                borderRadius: RAD.card,
                overflow: "hidden",
              }}
            >
              {/* Category portrait */}
              <div style={{ position: "relative", aspectRatio: "3 / 2", width: "100%", overflow: "hidden", background: C.paper }}>
                <Image src={g.img} alt="" fill sizes="(max-width: 1024px) 100vw, 33vw" style={{ objectFit: "cover" }} aria-hidden />
              </div>
              {/* Heading + list, padded inside the white card */}
              <div style={{ padding: "22px 22px 8px", display: "flex", flexDirection: "column", flex: 1 }}>
                <div style={{ paddingBottom: 18, borderBottom: `1px solid ${C.fg}` }}>
                  <div style={{ ...eyebrow, color: C.muted, marginBottom: 8 }}>CATEGORY</div>
                  <div className="firm-h" style={{ font: `500 28px/1 ${HEAD_FONT}`, letterSpacing: "-0.02em", color: C.fg }}>
                    Sue your <em>{g.cat}.</em>
                  </div>
                </div>
                <div>
                  {g.items.map((it, idx, arr) => (
                    <a
                      key={it.title}
                      href={it.href}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 70px",
                        gap: 16,
                        padding: "14px 0",
                        borderBottom: idx < arr.length - 1 ? `1px solid ${C.line}` : "none",
                        alignItems: "baseline",
                        textDecoration: "none",
                        color: "inherit",
                      }}
                    >
                      <div style={{ font: `500 14.5px/1.3 ${HEAD_FONT}`, color: C.fg, letterSpacing: "-0.005em" }}>
                        {it.title}
                      </div>
                      <div className="firm-h" style={{ textAlign: "right", font: `500 14px/1 ${HEAD_FONT}`, color: C.accent }}>
                        {it.recovery}
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* "More categories" rail */}
        <div
          style={{
            marginTop: 48,
            padding: "22px 28px",
            background: C.paper,
            border: `1px solid ${C.line}`,
            display: "grid",
            gridTemplateColumns: "auto 1fr auto",
            gap: 32,
            alignItems: "center",
          }}
        >
          <div style={{ ...eyebrow, color: C.muted }}>MORE CATEGORIES</div>
          <div style={{ display: "flex", gap: 22, flexWrap: "wrap" }}>
            {[
              { label: "Sue over a car", href: "/small-claims2/auto" },
              { label: "Recover money owed", href: "/small-claims2/personal-loan" },
              { label: "Sue a roommate", href: "/small-claims2/roommate" },
              { label: "Sue an online seller", href: "/small-claims2/online-seller" },
              { label: "Get a refund", href: "/small-claims2/refund" },
            ].map((g) => (
              <a
                key={g.label}
                href={g.href}
                style={{
                  display: "inline-flex",
                  alignItems: "baseline",
                  gap: 10,
                  font: `500 14px/1 ${BODY_FONT}`,
                  color: C.fg,
                  textDecoration: "none",
                }}
              >
                {g.label}
              </a>
            ))}
          </div>
          <a
            href="/small-claims2"
            style={{
              font: `500 13px/1 ${BODY_FONT}`,
              color: C.fg,
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              borderBottom: `1px solid ${C.fg}`,
              paddingBottom: 5,
              whiteSpace: "nowrap",
            }}
          >
            All 240+ guides <Arrow color={C.fg} />
          </a>
        </div>
      </section>

      {/* METHOD · V2 · Single dark band (5-step icon row + bring-to-court chips) */}
      <section style={{ padding: `80px ${PAD_X}`, background: C.bg, color: C.fg }}>
        {/* Header — inline-right pattern: title + lede + TOTAL TIME pull-stat */}
        <div style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 40, alignItems: "end", marginBottom: 36, borderBottom: `1px solid ${C.fg}`, paddingBottom: 24 }}>
          <div>
            <div style={{ ...eyebrow, marginBottom: 12 }}>METHOD</div>
            <h2 className="firm-h" style={{ ...H2, fontSize: 34, margin: 0 }}>
              How small claims <em>actually</em> works.
            </h2>
          </div>
          <p style={{ ...body, maxWidth: 380, margin: 0, fontSize: 14 }}>
            Built for self-represented filers. Most cases resolve in 30 to 90 days from filing.
          </p>
          <div style={{ textAlign: "right" }}>
            <div style={{ ...eyebrow, color: C.muted, marginBottom: 4 }}>TOTAL TIME</div>
            <div className="firm-h" style={{ font: `500 28px/1 ${HEAD_FONT}`, color: C.accent }}>~8 hrs</div>
          </div>
        </div>

        {/* Single dark band — 2 rows: process steps + bring-to-court chips */}
        <div style={{ background: C.dark, color: "#fff" }}>
          {/* Row 1 — the 5-step process */}
          <div style={{ padding: "32px 32px 28px" }}>
            <div style={{ font: `500 10px/1 ${BODY_FONT}`, letterSpacing: "0.22em", color: C.accentOnDark, marginBottom: 18 }}>
              THE PROCESS · 5 STEPS
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 0, position: "relative" }}>
              {/* Dotted spine through the icons */}
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  top: 24,
                  height: 1,
                  background: "repeating-linear-gradient(90deg, rgba(255,255,255,0.4) 0 4px, transparent 4px 8px)",
                }}
                aria-hidden
              />
              {[
                {
                  Icon: (p: { color: string; size: number }) => (
                    <svg width={p.size} height={p.size} viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path d="M3 9 L12 4 L21 9" stroke={p.color} strokeWidth="1.6" strokeLinejoin="round" />
                      <line x1="5" y1="11" x2="5" y2="19" stroke={p.color} strokeWidth="1.6" />
                      <line x1="9" y1="11" x2="9" y2="19" stroke={p.color} strokeWidth="1.6" />
                      <line x1="15" y1="11" x2="15" y2="19" stroke={p.color} strokeWidth="1.6" />
                      <line x1="19" y1="11" x2="19" y2="19" stroke={p.color} strokeWidth="1.6" />
                      <line x1="3" y1="21" x2="21" y2="21" stroke={p.color} strokeWidth="1.6" />
                    </svg>
                  ),
                  title: "State caps",
                  stat: "$5K – $20K",
                  desc: "Texas $20K · California $12.5K · NY $10K. Above the cap, higher court.",
                },
                {
                  Icon: (p: { color: string; size: number }) => (
                    <svg width={p.size} height={p.size} viewBox="0 0 24 24" fill="none" aria-hidden>
                      <circle cx="12" cy="12" r="8" stroke={p.color} strokeWidth="1.6" />
                      <path d="M14 9 C13 8 11 8 10 9 C9 10 9.5 11.5 11 12 L13 12.5 C14.5 13 15 14.5 14 15.5 C13 16.5 11 16.5 10 15.5" stroke={p.color} strokeWidth="1.6" strokeLinecap="round" />
                      <line x1="12" y1="6" x2="12" y2="8" stroke={p.color} strokeWidth="1.6" strokeLinecap="round" />
                      <line x1="12" y1="16" x2="12" y2="18" stroke={p.color} strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                  ),
                  title: "Filing fees",
                  stat: "$30 – $100",
                  desc: "Some states scale by claim amount. Many waive for low-income filers.",
                },
                {
                  Icon: (p: { color: string; size: number }) => (
                    <svg width={p.size} height={p.size} viewBox="0 0 24 24" fill="none" aria-hidden>
                      <rect x="3" y="6" width="18" height="13" stroke={p.color} strokeWidth="1.6" />
                      <path d="M3 7 L12 14 L21 7" stroke={p.color} strokeWidth="1.6" />
                    </svg>
                  ),
                  title: "Service of process",
                  stat: "Not you",
                  desc: "Sheriff, certified mail, or private server. You cannot serve it yourself.",
                },
                {
                  Icon: (p: { color: string; size: number }) => (
                    <svg width={p.size} height={p.size} viewBox="0 0 24 24" fill="none" aria-hidden>
                      <rect x="9" y="2.5" width="9" height="4" transform="rotate(45 13.5 4.5)" stroke={p.color} strokeWidth="1.6" />
                      <line x1="11" y1="9" x2="4" y2="16" stroke={p.color} strokeWidth="1.6" strokeLinecap="round" />
                      <line x1="3" y1="21" x2="13" y2="21" stroke={p.color} strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                  ),
                  title: "Hearing",
                  stat: "10 – 15 min",
                  desc: "Lead with the dollar amount, the legal theory, and your paper trail.",
                },
                {
                  Icon: (p: { color: string; size: number }) => (
                    <svg width={p.size} height={p.size} viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path d="M8 13 L8 6 C8 5 8.7 4 10 4 C11.3 4 12 5 12 6 L12 11" stroke={p.color} strokeWidth="1.6" strokeLinecap="round" />
                      <path d="M12 11 L12 5 C12 4 12.7 3 14 3 C15.3 3 16 4 16 5 L16 13" stroke={p.color} strokeWidth="1.6" strokeLinecap="round" />
                      <path d="M16 11 L16 7 C16 6 16.7 5 18 5 C19.3 5 20 6 20 7 L20 17 C20 19 18 21 15 21 L11 21 C8 21 6 19 5 17 L4 13" stroke={p.color} strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                  ),
                  title: "Collection",
                  stat: "30 days",
                  desc: "Then judgment lien, bank levy, wage garnishment, writ of execution.",
                },
              ].map((s) => (
                <div key={s.title} style={{ position: "relative", paddingRight: 16 }}>
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 999,
                      background: C.dark,
                      border: `1px solid ${C.accentOnDark}`,
                      color: C.accentOnDark,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 14,
                      position: "relative",
                      zIndex: 1,
                    }}
                  >
                    <s.Icon color={C.accentOnDark} size={22} />
                  </div>
                  <div style={{ font: `500 16px/1.2 ${HEAD_FONT}`, color: "#fff", letterSpacing: "-0.01em" }}>{s.title}</div>
                  <div className="firm-h firm-h-light" style={{ font: `500 18px/1 ${HEAD_FONT}`, color: C.accentOnDark, marginTop: 8 }}>{s.stat}</div>
                  <div style={{ font: `12.5px/1.5 ${BODY_FONT}`, color: "rgba(255,255,255,0.7)", marginTop: 8 }}>{s.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: "rgba(255,255,255,0.10)" }} />

          {/* Row 2 — Bring to court chips */}
          <div style={{ padding: "22px 32px", display: "grid", gridTemplateColumns: "auto 1fr", gap: 28, alignItems: "center" }}>
            <div style={{ font: `500 10px/1 ${BODY_FONT}`, letterSpacing: "0.22em", color: C.accentOnDark }}>
              BRING TO COURT →
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {[
                {
                  Icon: (p: { color: string; size: number }) => (
                    <svg width={p.size} height={p.size} viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path d="M6 3 L18 3 L18 21 L15 19 L12 21 L9 19 L6 21 Z" stroke={p.color} strokeWidth="1.6" strokeLinejoin="round" />
                      <line x1="9" y1="8" x2="15" y2="8" stroke={p.color} strokeWidth="1.6" />
                      <line x1="9" y1="12" x2="15" y2="12" stroke={p.color} strokeWidth="1.6" />
                      <line x1="9" y1="16" x2="13" y2="16" stroke={p.color} strokeWidth="1.6" />
                    </svg>
                  ),
                  title: "Contracts & receipts",
                },
                {
                  Icon: (p: { color: string; size: number }) => (
                    <svg width={p.size} height={p.size} viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path d="M3 8 L7 8 L8.5 5 L15.5 5 L17 8 L21 8 L21 19 L3 19 Z" stroke={p.color} strokeWidth="1.6" strokeLinejoin="round" />
                      <circle cx="12" cy="13" r="3.5" stroke={p.color} strokeWidth="1.6" />
                    </svg>
                  ),
                  title: "Photos w/ timestamps",
                },
                {
                  Icon: (p: { color: string; size: number }) => (
                    <svg width={p.size} height={p.size} viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path d="M4 5 L18 5 L18 15 L11 15 L7 19 L7 15 L4 15 Z" stroke={p.color} strokeWidth="1.6" strokeLinejoin="round" />
                      <line x1="7" y1="9" x2="15" y2="9" stroke={p.color} strokeWidth="1.6" />
                      <line x1="7" y1="12" x2="12" y2="12" stroke={p.color} strokeWidth="1.6" />
                    </svg>
                  ),
                  title: "All communications",
                },
                {
                  Icon: (p: { color: string; size: number }) => (
                    <svg width={p.size} height={p.size} viewBox="0 0 24 24" fill="none" aria-hidden>
                      <circle cx="12" cy="8" r="4" stroke={p.color} strokeWidth="1.6" />
                      <path d="M4 21 C4 16.5 7.5 14 12 14 C16.5 14 20 16.5 20 21" stroke={p.color} strokeWidth="1.6" />
                    </svg>
                  ),
                  title: "Witness contact info",
                },
                {
                  Icon: (p: { color: string; size: number }) => (
                    <svg width={p.size} height={p.size} viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path d="M5 3 L15 3 L19 7 L19 21 L5 21 Z" stroke={p.color} strokeWidth="1.6" strokeLinejoin="round" />
                      <path d="M15 3 L15 7 L19 7" stroke={p.color} strokeWidth="1.6" />
                      <line x1="8" y1="11" x2="16" y2="11" stroke={p.color} strokeWidth="1.6" />
                      <line x1="8" y1="14" x2="16" y2="14" stroke={p.color} strokeWidth="1.6" />
                      <line x1="8" y1="17" x2="13" y2="17" stroke={p.color} strokeWidth="1.6" />
                    </svg>
                  ),
                  title: "Demand letter",
                },
              ].map((b) => (
                <div
                  key={b.title}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 10,
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    padding: "10px 14px",
                  }}
                >
                  <b.Icon color={C.accentOnDark} size={16} />
                  <span style={{ font: `500 13px/1 ${BODY_FONT}`, color: "#fff" }}>{b.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FILE IN YOUR STATE (cream-bg section) */}
      <section style={{ padding: `120px ${PAD_X}`, background: C.cream }}>
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 80, marginBottom: 56, alignItems: "end" }}>
            <div>
              <div style={{ ...eyebrow, marginBottom: 22 }}>STATE-SPECIFIC GUIDES</div>
              <h2 className="firm-h" style={H2}>File in <em>your state</em>.</h2>
            </div>
            <p style={body}>Filing fees, caps, forms, and service rules vary by state. Pick yours for the exact statute citations, court forms, and step-by-step filing process.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
            <div>
              <UsMap readySlugs={ready} />
            </div>
            <StateSearchPanel
              states={STATES.map((s) => {
                const popularCaps: Record<string, string> = {
                  california: "$12.5K cap",
                  texas: "$20K cap",
                  "new-york": "$10K cap",
                  florida: "$8K cap",
                  pennsylvania: "$12K cap",
                  georgia: "$15K cap",
                };
                return {
                  abbr: s.abbr,
                  name: s.name,
                  slug: s.slug,
                  cap: popularCaps[s.slug],
                  popular: s.slug in popularCaps,
                };
              })}
            />
          </div>
        </div>
      </section>

      <ThreeWaysSection
        lede="Most disputes settle once a real demand letter arrives. If yours doesn't, the state guide walks you through filing step by step."
        testimonial={{
          quote: "Filed my claim for $3,200 in unpaid wages and won. The kit told me exactly which forms and where to file.",
          name: "Devon T.",
          meta: "Plaintiff · Texas",
        }}
      />

      <FaqSection
        title={<>Small claims <em>questions</em>.</>}
        subtitle="The questions people actually ask before filing in small claims court."
        faqs={[
          { q: "What is small claims court?", a: "A simplified court for everyday money disputes. Most state caps fall between $5,000 and $20,000. Hearings take 10 to 15 minutes. You don't need a lawyer (and in some states, like California, lawyers aren't even allowed at the initial hearing)." },
          { q: "How much does it cost to file?", a: null },
          { q: "Do I need a lawyer?", a: null },
          { q: "How long does the process take?", a: null },
          { q: "What can I sue for?", a: null },
          { q: "How do I serve the defendant?", a: null },
          { q: "What if the defendant doesn't show up?", a: null },
          { q: "Will this affect the defendant's credit?", a: null },
          { q: "What if I lose — can I appeal?", a: null },
          { q: "What if they have no money to pay?", a: null },
        ]}
      />
    </main>
  );
}
