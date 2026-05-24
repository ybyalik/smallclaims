"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Building2, Briefcase, Hammer, Car, Trees, HandCoins, Users, ShoppingBag, Receipt, Mail, FileText, Wallet } from "lucide-react";
import { C, BODY_FONT, HEAD_FONT, PAD_X } from "./index";

// Site-wide header for the (firm) route group. Uses the real CivilCase
// wordmark image, and exposes the two mega menus from the legacy site
// header (Services · Resources) re-skinned with firm tokens. Small
// Claims content lives inside Resources, matching the legacy structure.

const SERVICES = [
  { href: "/demand-letter2", num: "01", title: "Demand Letter", sub: "Attorney-drafted, state-specific. Most disputes settle here.", Icon: Mail, price: "From $29" },
  { href: "/filing-kit2", num: "02", title: "Filing Kit", sub: "County-specific forms, fee schedule, and hearing prep.", Icon: FileText, price: "From $79" },
  { href: "/collection-plan2", num: "03", title: "Collection Plan", sub: "Enforce and collect on the judgment you won.", Icon: Wallet, price: "From $49" },
] as const;

const SC_CATEGORIES = [
  { href: "/small-claims2/landlord", label: "Landlord disputes", Icon: Building2 },
  { href: "/small-claims2/contractor", label: "Contractor disputes", Icon: Hammer },
  { href: "/small-claims2/employer", label: "Employer disputes", Icon: Briefcase },
  { href: "/small-claims2/auto", label: "Auto disputes", Icon: Car },
  { href: "/small-claims2/neighbor", label: "Neighbor disputes", Icon: Trees },
  { href: "/small-claims2/personal-loan", label: "Personal loan disputes", Icon: HandCoins },
  { href: "/small-claims2/roommate", label: "Roommate disputes", Icon: Users },
  { href: "/small-claims2/online-seller", label: "Online seller disputes", Icon: ShoppingBag },
  { href: "/small-claims2/refund", label: "Refund disputes", Icon: Receipt },
] as const;

const FEATURED_STATES = [
  { slug: "california", name: "California" },
  { slug: "texas", name: "Texas" },
  { slug: "new-york", name: "New York" },
  { slug: "florida", name: "Florida" },
  { slug: "pennsylvania", name: "Pennsylvania" },
] as const;

type MegaKey = "services" | "res";

export function SiteHeader() {
  const pathname = usePathname() || "/";
  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  const [openMega, setOpenMega] = useState<MegaKey | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openMegaNow = (k: MegaKey) => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setOpenMega(k);
  };
  const scheduleMegaClose = () => {
    closeTimerRef.current = setTimeout(() => setOpenMega(null), 140);
  };

  return (
    <>
    <style dangerouslySetInnerHTML={{ __html: `
      .firm-mega-row { transition: background 0.15s ease; }
      .firm-mega-row:hover { background: ${C.cream}; }
      .firm-mega-row:hover .firm-mega-icon { background: rgba(184,51,31,0.14) !important; }
    ` }} />
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: C.bg,
        borderBottom: `1px solid ${C.line}`,
        font: `14px/1 ${BODY_FONT}`,
        color: C.fg,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: `16px ${PAD_X}`,
          gap: 32,
        }}
      >
        {/* Brand wordmark */}
        <Link href="/home2" style={{ display: "inline-flex", alignItems: "center", textDecoration: "none" }}>
          <Image
            src="/civilcase-logo.webp"
            alt="CivilCase"
            width={260}
            height={52}
            style={{ height: 48, width: "auto" }}
            priority
          />
        </Link>

        {/* Nav with mega-menu triggers */}
        <nav style={{ display: "flex", gap: 28, alignItems: "center", position: "relative" }}>
          {/* Services (mega) */}
          <div
            onMouseEnter={() => openMegaNow("services")}
            onMouseLeave={scheduleMegaClose}
            style={{ position: "relative" }}
          >
            <button
              type="button"
              style={navLinkStyle(openMega === "services" || isActive("/demand-letter2") || isActive("/filing-kit2") || isActive("/collection-plan2"))}
            >
              Services <ChevronDown size={12} strokeWidth={2.2} aria-hidden />
            </button>
            <Mega open={openMega === "services"} variant="services">
              <div style={{ padding: "28px 32px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 32, alignItems: "start" }}>
                  {/* Col 1 — Services list */}
                  <div>
                    <div style={{ font: `600 11px/1 ${BODY_FONT}`, letterSpacing: "0.14em", textTransform: "uppercase", color: C.muted, opacity: 0.7, marginBottom: 14 }}>
                      Our services
                    </div>
                    <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 4 }}>
                      {SERVICES.map((s) => (
                        <li key={s.href}>
                          <Link
                            href={s.href}
                            onClick={() => setOpenMega(null)}
                            className="firm-mega-row"
                            style={{
                              display: "grid",
                              gridTemplateColumns: "auto 1fr auto",
                              gap: 14,
                              alignItems: "center",
                              padding: "12px 10px",
                              margin: "0 -10px",
                              textDecoration: "none",
                              color: C.fg,
                              borderRadius: 8,
                            }}
                          >
                            {/* Icon container — peach-tinted square */}
                            <span
                              className="firm-mega-icon"
                              style={{
                                position: "relative",
                                width: 40,
                                height: 40,
                                borderRadius: 8,
                                background: "rgba(184,51,31,0.08)",
                                color: C.accent,
                                display: "grid",
                                placeItems: "center",
                                flexShrink: 0,
                                transition: "background 0.15s ease",
                              }}
                            >
                              <s.Icon size={20} strokeWidth={1.8} aria-hidden />
                              {/* Tiny step numeral overlaid in the top-right */}
                              <span style={{ position: "absolute", top: -4, right: -4, width: 18, height: 18, borderRadius: 999, background: C.dark, color: "#fff", display: "grid", placeItems: "center", font: `600 9px/1 ${BODY_FONT}` }}>
                                {s.num.replace(/^0/, "")}
                              </span>
                            </span>
                            <strong style={{ font: `600 16px/1.2 ${HEAD_FONT}`, color: C.fg }}>{s.title}</strong>
                            <ChevronDown size={16} strokeWidth={2} style={{ transform: "rotate(-90deg)", color: C.muted }} aria-hidden />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Col 2 — Case Score feature card */}
                  <div>
                    <Link
                      href="/case-score2"
                      onClick={() => setOpenMega(null)}
                      style={{
                        display: "block",
                        background: C.dark,
                        color: "#fff",
                        borderRadius: 12,
                        overflow: "hidden",
                        textDecoration: "none",
                        position: "relative",
                      }}
                    >
                      {/* Mini case-score gauge visual */}
                      <div style={{ background: "#fdfaf3", color: "#1a1612", padding: "16px 18px 14px", borderBottom: `1px solid rgba(255,255,255,0.08)`, position: "relative", borderTopLeftRadius: 12, borderTopRightRadius: 12 }}>
                        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 10 }}>
                          <div style={{ font: `600 9px/1 ${BODY_FONT}`, letterSpacing: "0.22em", color: C.accent }}>CASE SCORE</div>
                          <div style={{ font: `500 9px/1 ${BODY_FONT}`, letterSpacing: "0.18em", color: "#7a7165" }}>/ 100</div>
                        </div>
                        <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 12 }}>
                          <div style={{ font: `700 40px/1 ${HEAD_FONT}`, color: C.accent, letterSpacing: "-0.03em" }}>78</div>
                          <div style={{ font: `600 10px/1 ${BODY_FONT}`, letterSpacing: "0.18em", color: C.accent }}>STRONG</div>
                        </div>
                        {/* Segmented bar with marker */}
                        <div style={{ position: "relative", height: 6, display: "flex", gap: 2 }}>
                          <div style={{ flex: 1, background: "#e7dfd0", borderRadius: 2 }} />
                          <div style={{ flex: 1, background: "#e7dfd0", borderRadius: 2 }} />
                          <div style={{ flex: 1, background: C.accent, borderRadius: 2 }} />
                          <div style={{ flex: 1, background: "#f5b29f", borderRadius: 2 }} />
                          <div
                            aria-hidden
                            style={{
                              position: "absolute",
                              left: "78%",
                              top: -3,
                              width: 2,
                              height: 12,
                              background: "#1a1612",
                              transform: "translateX(-50%)",
                              borderRadius: 1,
                            }}
                          />
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, font: `500 8.5px/1 ${BODY_FONT}`, letterSpacing: "0.12em", color: "#7a7165" }}>
                          <span>WEAK</span>
                          <span>FAIR</span>
                          <span>STRONG</span>
                        </div>
                      </div>
                      <div style={{ padding: "16px 18px 18px" }}>
                        <div style={{ font: `500 11px/1 ${BODY_FONT}`, letterSpacing: "0.18em", color: C.accentOnDark, marginBottom: 6 }}>FREE · 90 SECONDS</div>
                        <div style={{ font: `600 16px/1.3 ${HEAD_FONT}`, color: "#fff", letterSpacing: "-0.005em" }}>
                          Score your case before you sue.
                        </div>
                        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 10, font: `500 12.5px/1 ${BODY_FONT}`, color: C.accentOnDark }}>
                          Run my score →
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </Mega>
          </div>

          <Link
            href="/small-claims2"
            style={navLinkStyle(isActive("/small-claims2") && !isActive("/small-claims2/"))}
          >
            Small Claims
          </Link>

          <Link href="/case-score2" style={navLinkStyle(isActive("/case-score2"))}>Case Score</Link>

          {/* Resources (mega) — 3-column matches the legacy site layout:
              dispute types · state guides · featured blog card */}
          <div
            onMouseEnter={() => openMegaNow("res")}
            onMouseLeave={scheduleMegaClose}
            style={{ position: "relative" }}
          >
            <Link
              href="/blog2"
              style={navLinkStyle(openMega === "res" || isActive("/blog2") || isActive("/about2") || isActive("/contact2"))}
            >
              Resources <ChevronDown size={12} strokeWidth={2.2} aria-hidden />
            </Link>
            <Mega open={openMega === "res"} variant="res">
              <div style={{ padding: "28px 32px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1.5fr 0.8fr 1.1fr", gap: 40, alignItems: "start" }}>
                {/* Col 1 — By dispute type */}
                <div>
                  <div style={{ font: `600 11px/1 ${BODY_FONT}`, letterSpacing: "0.14em", textTransform: "uppercase", color: C.muted, opacity: 0.7, marginBottom: 12 }}>By dispute type</div>
                  <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px 24px" }}>
                    {SC_CATEGORIES.map((c) => (
                      <li key={c.href}>
                        <Link
                          href={c.href}
                          onClick={() => setOpenMega(null)}
                          className="firm-mega-row"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 12,
                            padding: "8px 10px",
                            margin: "0 -10px",
                            textDecoration: "none",
                            color: C.fg,
                            font: `500 14.5px/1.3 ${BODY_FONT}`,
                            borderRadius: 8,
                            whiteSpace: "nowrap",
                          }}
                        >
                          <span
                            className="firm-mega-icon"
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              justifyContent: "center",
                              width: 28,
                              height: 28,
                              borderRadius: 6,
                              background: "rgba(184,51,31,0.08)",
                              color: C.accent,
                              flexShrink: 0,
                              transition: "background 0.15s ease",
                            }}
                          >
                            <c.Icon size={16} strokeWidth={1.8} aria-hidden />
                          </span>
                          {c.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/small-claims2"
                    onClick={() => setOpenMega(null)}
                    style={{ display: "inline-block", marginTop: 10, padding: "6px 10px", textDecoration: "none", color: C.accent, font: `600 13px/1.3 ${BODY_FONT}` }}
                  >
                    All categories →
                  </Link>
                </div>

                {/* Col 2 — Featured state guides */}
                <div>
                  <div style={{ font: `600 11px/1 ${BODY_FONT}`, letterSpacing: "0.14em", textTransform: "uppercase", color: C.muted, opacity: 0.7, marginBottom: 12 }}>State guides</div>
                  <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 4 }}>
                    {FEATURED_STATES.map((s) => (
                      <li key={s.slug}>
                        <Link
                          href={`/small-claims2/${s.slug}`}
                          onClick={() => setOpenMega(null)}
                          className="firm-mega-row"
                          style={{
                            display: "block",
                            padding: "8px 10px",
                            margin: "0 -10px",
                            textDecoration: "none",
                            color: C.fg,
                            font: `500 14.5px/1.3 ${BODY_FONT}`,
                            borderRadius: 8,
                            whiteSpace: "nowrap",
                          }}
                        >
                          {s.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/small-claims2"
                    onClick={() => setOpenMega(null)}
                    style={{ display: "inline-block", marginTop: 10, padding: "6px 10px", textDecoration: "none", color: C.accent, font: `600 13px/1.3 ${BODY_FONT}` }}
                  >
                    All 50 states →
                  </Link>
                </div>

                {/* Col 3 — Featured blog card */}
                <div>
                  <Link
                    href="/blog2"
                    onClick={() => setOpenMega(null)}
                    style={{
                      display: "block",
                      position: "relative",
                      background: C.cream,
                      borderRadius: 12,
                      overflow: "hidden",
                      textDecoration: "none",
                      color: "inherit",
                    }}
                  >
                    <div style={{ position: "relative", aspectRatio: "16 / 9", background: C.cream }}>
                      <Image
                        src="/assets/blog-menu-image.webp"
                        alt=""
                        fill
                        sizes="280px"
                        style={{ objectFit: "cover" }}
                        aria-hidden
                      />
                    </div>
                    <div style={{ padding: "14px 16px 18px" }}>
                      <div style={{ font: `600 10px/1 ${BODY_FONT}`, letterSpacing: "0.18em", textTransform: "uppercase", color: C.accent, marginBottom: 8 }}>Blog</div>
                      <div style={{ font: `600 15px/1.3 ${HEAD_FONT}`, color: C.fg, letterSpacing: "-0.005em" }}>
                        Stories from the small-claims trenches
                      </div>
                      <div style={{ font: `13px/1.5 ${BODY_FONT}`, color: C.muted, marginTop: 6 }}>
                        Filing tips, statute breakdowns, and real outcomes.
                      </div>
                      <div style={{ font: `500 13px/1 ${BODY_FONT}`, color: C.accent, marginTop: 10, display: "inline-flex", alignItems: "center", gap: 6 }}>
                        Read the blog →
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
              {/* About / Contact secondary row */}
              <div style={{ marginTop: 16, paddingTop: 14, borderTop: `1px solid ${C.line}`, display: "flex", gap: 8, justifyContent: "flex-start" }}>
                {[
                  { href: "/about2", t: "About CivilCase" },
                  { href: "/contact2", t: "Contact us" },
                ].map((r) => (
                  <Link
                    key={r.href}
                    href={r.href}
                    onClick={() => setOpenMega(null)}
                    style={{ display: "block", padding: "6px 10px", textDecoration: "none", color: C.fg, font: `500 13px/1.3 ${BODY_FONT}`, borderRadius: 8 }}
                  >
                    {r.t}
                  </Link>
                ))}
              </div>
              </div>
            </Mega>
          </div>
        </nav>

        {/* Auth controls */}
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <Link href="/login" style={{ font: `500 14px/1 ${BODY_FONT}`, color: C.fg, textDecoration: "none" }}>
            Sign in
          </Link>
          <Link
            href="/home2"
            style={{
              background: "#3D7A4A",
              color: "#fef9f1",
              padding: "11px 18px",
              font: `500 14px/1 ${BODY_FONT}`,
              borderRadius: 999,
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            Get started
          </Link>
        </div>
      </div>
    </header>
    </>
  );
}

// ─── helpers ────────────────────────────────────────────────────────
function navLinkStyle(active: boolean): React.CSSProperties {
  return {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    padding: "8px 4px",
    font: `500 14px/1 ${BODY_FONT}`,
    color: active ? C.accent : C.fg,
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    borderBottom: active ? `1.5px solid ${C.accent}` : "1.5px solid transparent",
    transition: "color 0.15s ease",
  };
}


// Mega panel — absolutely-positioned dropdown that sits under the
// trigger. Uses a soft drop shadow + hairline border + cream-tinted
// background.
function Mega({
  open,
  variant,
  children,
}: {
  open: boolean;
  variant: "services" | "res";
  children: React.ReactNode;
}) {
  // Services anchors under its trigger (position: absolute, left: 0).
  // Resources is wide, so we use position: fixed and anchor it to the right
  // edge of the viewport (PAD_X from edge) so the 1080px panel doesn't
  // overflow off-screen. top is tuned to sit just below the sticky header.
  const isRes = variant === "res";
  return (
    <div
      style={{
        ...(isRes
          ? {
              position: "fixed",
              top: 70,
              right: "max(24px, calc((100vw - 1440px) / 2 + 80px))",
              width: "min(1080px, calc(100vw - 48px))",
            }
          : {
              position: "absolute",
              top: "calc(100% + 8px)",
              left: 0,
              width: 680,
            }),
        background: "#fff",
        border: `1px solid ${C.line}`,
        borderRadius: 16,
        padding: 0,
        boxShadow: "0 22px 44px -22px rgba(31,27,22,0.22)",
        opacity: open ? 1 : 0,
        transform: open ? "translateY(0)" : "translateY(-6px)",
        pointerEvents: open ? "auto" : "none",
        transition: "opacity 0.15s ease, transform 0.15s ease",
        zIndex: 60,
      }}
    >
      {children}
    </div>
  );
}
