"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Building2, Briefcase, Hammer, Car, Trees, HandCoins, Users, ShoppingBag, Receipt, Mail, FileText, Wallet, BarChart3, Scale, BookOpen, LayoutDashboard, Settings, CreditCard, LogOut, Shield } from "lucide-react";
import { C, BODY_FONT, HEAD_FONT, PAD_X } from "./index";

export interface SiteHeaderUser {
  email: string;
  fullName: string;
  avatarUrl: string | null;
  isAdmin: boolean;
}

// Site-wide header for the (firm) route group. Uses the real CivilCase
// wordmark image, and exposes the two mega menus from the legacy site
// header (Services · Resources) re-skinned with firm tokens. Small
// Claims content lives inside Resources, matching the legacy structure.

const SERVICES = [
  { href: "/demand-letter", num: "01", title: "Demand Letter", sub: "State-specific templates. Most disputes settle at this stage.", Icon: Mail, price: "From $29" },
  { href: "/filing-kit", num: "02", title: "Filing Kit", sub: "County-specific forms, fee schedule, and hearing prep.", Icon: FileText, price: "From $79" },
  { href: "/collection-plan", num: "03", title: "Collection Plan", sub: "Enforce and collect on the judgment you won.", Icon: Wallet, price: "From $49" },
] as const;

const SC_CATEGORIES = [
  { href: "/small-claims/landlord", label: "Landlord disputes", Icon: Building2 },
  { href: "/small-claims/contractor", label: "Contractor disputes", Icon: Hammer },
  { href: "/small-claims/employer", label: "Employer disputes", Icon: Briefcase },
  { href: "/small-claims/auto", label: "Auto disputes", Icon: Car },
  { href: "/small-claims/neighbor", label: "Neighbor disputes", Icon: Trees },
  { href: "/small-claims/personal-loan", label: "Personal loan disputes", Icon: HandCoins },
  { href: "/small-claims/roommate", label: "Roommate disputes", Icon: Users },
  { href: "/small-claims/online-seller", label: "Online seller disputes", Icon: ShoppingBag },
  { href: "/small-claims/refund", label: "Refund disputes", Icon: Receipt },
] as const;

const FEATURED_STATES = [
  { slug: "california", name: "California" },
  { slug: "texas", name: "Texas" },
  { slug: "new-york", name: "New York" },
  { slug: "florida", name: "Florida" },
  { slug: "pennsylvania", name: "Pennsylvania" },
] as const;

type MegaKey = "services" | "res";

// Read the non-httpOnly cc_has_session marker cookie synchronously.
// Set by the auth flows (login / signup / oauth callback) and cleared
// on signout. Lets repeat visitors paint the logged-in shell without
// waiting on /api/me.
function readHasSessionCookie(): boolean {
  if (typeof document === "undefined") return false;
  return document.cookie.split("; ").some((c) => c.startsWith("cc_has_session=1"));
}

export function SiteHeaderClient() {
  const pathname = usePathname() || "/";
  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  const [openMega, setOpenMega] = useState<MegaKey | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [open, setOpen] = useState(false); // mobile drawer
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement | null>(null);

  // Auth state: hydrated from /api/me on mount. To avoid a flash for
  // repeat visitors, the cc_has_session cookie lets us optimistically
  // render the logged-in shell on the very first client render. SSR
  // always renders the logged-out shell to keep hydration consistent;
  // useEffect immediately swaps to the optimistic state if the cookie
  // says we're likely logged in, then /api/me confirms (and fills in
  // name / avatar / admin flag) or reverts to logged-out.
  const [user, setUser] = useState<SiteHeaderUser | null>(null);

  useEffect(() => {
    let cancelled = false;
    // Optimistic: if we look logged-in per the marker cookie, show a
    // skeleton user object immediately so the layout doesn't reflow.
    if (readHasSessionCookie()) {
      setUser({ email: "", fullName: "", avatarUrl: null, isAdmin: false });
    }
    // Confirm with the real auth probe.
    fetch("/api/me", { credentials: "include" })
      .then((r) => (r.ok ? r.json() : { loggedIn: false }))
      .then((data: { loggedIn: boolean; user?: SiteHeaderUser }) => {
        if (cancelled) return;
        if (data.loggedIn && data.user) {
          setUser(data.user);
          // Re-affirm the marker cookie (30-day rolling) so future
          // visits keep painting instantly.
          document.cookie = "cc_has_session=1; path=/; max-age=2592000; SameSite=Lax";
        } else {
          setUser(null);
          // Strip a stale marker if /api/me says we're actually
          // logged out (e.g., session expired since last visit).
          document.cookie = "cc_has_session=; path=/; max-age=0; SameSite=Lax";
        }
      })
      .catch(() => {
        if (cancelled) return;
        setUser(null);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Close the user menu on outside click
  useEffect(() => {
    if (!userMenuOpen) return;
    function onClick(e: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [userMenuOpen]);

  // Skeleton initial while the optimistic-but-empty user object is in
  // play (cc_has_session cookie present, /api/me hasn't returned yet).
  const initial = (user?.fullName || user?.email || "?").trim().charAt(0).toUpperCase() || "·";

  const openMegaNow = (k: MegaKey) => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setOpenMega(k);
  };
  const scheduleMegaClose = () => {
    closeTimerRef.current = setTimeout(() => setOpenMega(null), 140);
  };

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  // Close the drawer on Escape, and on route change.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <>
    <style dangerouslySetInnerHTML={{ __html: `
      .firm-mega-row { transition: background 0.15s ease; }
      .firm-mega-row:hover { background: ${C.cream}; }
      .firm-mega-row:hover .firm-mega-icon { background: rgba(184,51,31,0.14) !important; }

      /* ── Mobile drawer (≤980px) ──────────────────────────────────
         Visual tokens (width, shadow, timing, active state, hover, ink color)
         live in :root inside globals.css so the dashboard sidebar drawer
         can consume the exact same values. Change once, both update. */
      .firm-nav-burger {
        display: none;
        width: 44px; height: 44px;
        background: transparent; border: 0; padding: 0; cursor: pointer;
        flex-direction: column; align-items: center; justify-content: center;
        gap: 5px;
        border-radius: 8px;
        transition: background 0.15s ease;
      }
      .firm-nav-burger:hover { background: #f3f1ec; }
      .firm-nav-burger span { display: block; width: 22px; height: 2px; background: var(--drawer-item-color); border-radius: 2px; transition: transform 0.22s ease, opacity 0.15s ease; }
      .firm-nav-burger.is-open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
      .firm-nav-burger.is-open span:nth-child(2) { opacity: 0; }
      .firm-nav-burger.is-open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

      .firm-mobile-backdrop {
        position: fixed; inset: 0; background: var(--drawer-backdrop);
        opacity: 0; pointer-events: none; transition: opacity 0.2s ease;
        z-index: var(--drawer-z-backdrop);
      }
      .firm-mobile-backdrop.is-open { opacity: 1; pointer-events: auto; }

      .firm-mobile-drawer {
        position: fixed; top: 0; right: 0; height: 100vh; width: var(--drawer-width);
        background: var(--drawer-bg); z-index: var(--drawer-z-panel);
        display: flex; flex-direction: column;
        transform: translateX(100%); transition: transform var(--drawer-timing);
        box-shadow: var(--drawer-shadow);
        overflow-y: auto;
      }
      .firm-mobile-drawer.is-open { transform: translateX(0); }
      .firm-mobile-head { display: flex; align-items: center; justify-content: space-between; padding: 18px 20px; border-bottom: 1px solid var(--drawer-line); }
      .firm-mobile-close {
        width: 44px; height: 44px;
        display: grid; place-items: center;
        background: transparent; border: 0; cursor: pointer;
        color: var(--drawer-item-color); border-radius: 8px;
        transition: background 0.15s ease;
      }
      .firm-mobile-close:hover { background: #f3f1ec; }

      .firm-mobile-nav { padding: 14px 14px 24px; display: flex; flex-direction: column; gap: 4px; }
      .firm-mobile-section { display: flex; flex-direction: column; gap: 2px; padding-top: 14px; margin-top: 6px; border-top: 1px solid var(--drawer-line); }
      .firm-mobile-section:first-child { padding-top: 0; margin-top: 0; border-top: none; }
      .firm-mobile-eyebrow { font: 600 10.5px/1 ${BODY_FONT}; letter-spacing: 0.18em; text-transform: uppercase; color: var(--drawer-item-color-muted); padding: 8px 12px 6px; }
      .firm-mobile-link { display: flex; align-items: center; gap: 12px; padding: 12px; border-radius: 8px; text-decoration: none; color: var(--drawer-item-color); font: 500 15.5px/1.2 ${BODY_FONT}; }
      .firm-mobile-link.is-active { color: var(--drawer-item-color-active); background: var(--drawer-item-bg-active); }
      .firm-mobile-link:hover { background: var(--drawer-item-bg-hover); }
      .firm-mobile-sub { display: flex; align-items: center; gap: 10px; padding: 9px 12px 9px 28px; border-radius: 8px; text-decoration: none; color: var(--drawer-item-color-muted); font: 500 14px/1.2 ${BODY_FONT}; }
      .firm-mobile-sub:hover { color: var(--drawer-item-color); background: var(--drawer-item-bg-hover); }

      .firm-mobile-group > summary { list-style: none; cursor: pointer; }
      .firm-mobile-group > summary::-webkit-details-marker { display: none; }
      .firm-mobile-group > summary .firm-mobile-chev { margin-left: auto; transition: transform 0.2s ease; }
      .firm-mobile-group[open] > summary .firm-mobile-chev { transform: rotate(180deg); }

      .firm-mobile-foot { padding: 18px 22px 24px; border-top: 1px solid var(--drawer-line); display: flex; flex-direction: column; gap: 10px; margin-top: auto; }
      .firm-mobile-foot a { font: 500 14px/1 ${BODY_FONT}; text-decoration: none; padding: 12px 16px; border-radius: 999px; text-align: center; }
      .firm-mobile-foot .firm-mobile-cta-primary { background: #3D7A4A; color: #fef9f1; }
      .firm-mobile-foot .firm-mobile-cta-ghost { color: var(--drawer-item-color); border: 1px solid var(--drawer-line); }

      @media (max-width: 980px) {
        .firm-desktop-nav, .firm-desktop-auth { display: none !important; }
        .firm-nav-burger { display: inline-flex; }
      }
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
        <Link href="/" style={{ display: "inline-flex", alignItems: "center", textDecoration: "none" }}>
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
        <nav className="firm-desktop-nav" style={{ display: "flex", gap: 28, alignItems: "center", position: "relative" }}>
          {/* Services (mega) */}
          <div
            onMouseEnter={() => openMegaNow("services")}
            onMouseLeave={scheduleMegaClose}
            style={{ position: "relative" }}
          >
            <button
              type="button"
              style={navLinkStyle(openMega === "services" || isActive("/demand-letter") || isActive("/filing-kit") || isActive("/collection-plan"))}
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
                      href="/case-score"
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
            href="/small-claims"
            style={navLinkStyle(isActive("/small-claims") && !isActive("/small-claims/"))}
          >
            Small Claims
          </Link>

          <Link href="/case-score" style={navLinkStyle(isActive("/case-score"))}>Case Score</Link>

          {/* Resources (mega) — 3-column matches the legacy site layout:
              dispute types · state guides · featured blog card */}
          <div
            onMouseEnter={() => openMegaNow("res")}
            onMouseLeave={scheduleMegaClose}
            style={{ position: "relative" }}
          >
            <Link
              href="/blog"
              style={navLinkStyle(openMega === "res" || isActive("/blog") || isActive("/about") || isActive("/contact"))}
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
                    href="/small-claims"
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
                          href={`/small-claims/${s.slug}`}
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
                    href="/small-claims"
                    onClick={() => setOpenMega(null)}
                    style={{ display: "inline-block", marginTop: 10, padding: "6px 10px", textDecoration: "none", color: C.accent, font: `600 13px/1.3 ${BODY_FONT}` }}
                  >
                    All 50 states →
                  </Link>
                </div>

                {/* Col 3 — Featured blog card */}
                <div>
                  <Link
                    href="/blog"
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
                  { href: "/about", t: "About CivilCase" },
                  { href: "/contact", t: "Contact us" },
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

        {/* Auth controls. min-width reserves space so the swap between
            logged-out CTAs and the logged-in Dashboard + avatar doesn't
            shift the layout (avoid CLS) once /api/me hydrates state. */}
        <div className="firm-desktop-auth" style={{ display: "flex", alignItems: "center", gap: 18, minWidth: 220, justifyContent: "flex-end" }}>
          {user ? (
            <div ref={userMenuRef} style={{ position: "relative", display: "inline-flex", alignItems: "center", gap: 12 }}>
              <Link
                href="/dashboard"
                style={{
                  background: C.dark,
                  color: "#fff",
                  padding: "10px 16px",
                  font: `500 14px/1 ${BODY_FONT}`,
                  borderRadius: 999,
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <LayoutDashboard size={15} strokeWidth={1.9} aria-hidden /> Dashboard
              </Link>
              <button
                type="button"
                onClick={() => setUserMenuOpen((v) => !v)}
                aria-haspopup="menu"
                aria-expanded={userMenuOpen}
                aria-label="Account menu"
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  width: 36,
                  height: 36,
                  borderRadius: 999,
                  overflow: "hidden",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {user.avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={user.avatarUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  <span
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: 999,
                      background: C.cream,
                      color: C.accent,
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      font: `600 14px/1 ${BODY_FONT}`,
                    }}
                  >
                    {initial}
                  </span>
                )}
              </button>
              {userMenuOpen && (
                <div
                  role="menu"
                  style={{
                    position: "absolute",
                    top: "calc(100% + 8px)",
                    right: 0,
                    minWidth: 240,
                    background: "#fff",
                    border: `1px solid ${C.line}`,
                    borderRadius: 12,
                    boxShadow: "0 22px 44px -22px rgba(31,27,22,0.22)",
                    padding: 8,
                    zIndex: 60,
                  }}
                >
                  <div style={{ padding: "10px 12px 12px", borderBottom: `1px solid ${C.line}`, marginBottom: 6 }}>
                    <div style={{ font: `600 14px/1.3 ${BODY_FONT}`, color: C.fg }}>{user.fullName}</div>
                    <div style={{ font: `12.5px/1.4 ${BODY_FONT}`, color: C.muted, marginTop: 2 }}>{user.email}</div>
                  </div>
                  {[
                    { href: "/dashboard", label: "Dashboard", Icon: LayoutDashboard },
                    { href: "/dashboard/settings", label: "Settings", Icon: Settings },
                    { href: "/dashboard/billing", label: "Billing", Icon: CreditCard },
                  ].map((item) => (
                    <Link
                      key={item.href}
                      role="menuitem"
                      href={item.href}
                      onClick={() => setUserMenuOpen(false)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        padding: "10px 12px",
                        borderRadius: 8,
                        color: C.fg,
                        textDecoration: "none",
                        font: `500 14px/1 ${BODY_FONT}`,
                      }}
                    >
                      <item.Icon size={15} strokeWidth={1.8} color={C.muted} aria-hidden /> {item.label}
                    </Link>
                  ))}
                  {user.isAdmin && (
                    <Link
                      role="menuitem"
                      href="/admin"
                      onClick={() => setUserMenuOpen(false)}
                      style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", borderRadius: 8, color: C.accent, textDecoration: "none", font: `600 14px/1 ${BODY_FONT}` }}
                    >
                      <Shield size={15} strokeWidth={1.8} aria-hidden /> Admin
                    </Link>
                  )}
                  <div style={{ height: 1, background: C.line, margin: "6px 0" }} />
                  <a
                    role="menuitem"
                    href="/auth/signout"
                    style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", borderRadius: 8, color: C.muted, textDecoration: "none", font: `500 14px/1 ${BODY_FONT}` }}
                  >
                    <LogOut size={15} strokeWidth={1.8} aria-hidden /> Sign out
                  </a>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/login" style={{ font: `500 14px/1 ${BODY_FONT}`, color: C.fg, textDecoration: "none" }}>
                Sign in
              </Link>
              <Link
                href="/"
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
            </>
          )}
        </div>

        {/* Hamburger — mobile only */}
        <button
          type="button"
          className={`firm-nav-burger${open ? " is-open" : ""}`}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="firm-mobile-drawer"
          onClick={() => setOpen((v) => !v)}
        >
          <span /><span /><span />
        </button>
      </div>
    </header>

    {/* Mobile backdrop + drawer */}
    <div
      className={`firm-mobile-backdrop${open ? " is-open" : ""}`}
      onClick={() => setOpen(false)}
      aria-hidden
    />
    <aside
      id="firm-mobile-drawer"
      className={`firm-mobile-drawer${open ? " is-open" : ""}`}
      aria-hidden={!open}
    >
      <div className="firm-mobile-head">
        <Link href="/" onClick={() => setOpen(false)} aria-label="CivilCase home" style={{ display: "inline-flex" }}>
          <Image src="/civilcase-logo.webp" alt="CivilCase" width={200} height={40} style={{ height: 36, width: "auto" }} />
        </Link>
        <button type="button" className="firm-mobile-close" onClick={() => setOpen(false)} aria-label="Close menu">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>
      </div>

      <nav className="firm-mobile-nav">
        {/* 1. Services — first, matches desktop nav order */}
        <details className="firm-mobile-section firm-mobile-group" open>
          <summary className="firm-mobile-link">
            <FileText size={18} strokeWidth={1.8} aria-hidden /> Services
            <ChevronDown size={16} strokeWidth={2} className="firm-mobile-chev" aria-hidden />
          </summary>
          {SERVICES.map((s) => (
            <Link key={s.href} href={s.href} onClick={() => setOpen(false)} className="firm-mobile-sub">
              <s.Icon size={15} strokeWidth={1.7} aria-hidden /> {s.title}
            </Link>
          ))}
          <Link href="/case-score" onClick={() => setOpen(false)} className="firm-mobile-sub">
            <BarChart3 size={15} strokeWidth={1.7} aria-hidden /> Case Score
          </Link>
        </details>

        {/* 2. Small Claims — top-level link on desktop */}
        <div className="firm-mobile-section">
          <Link href="/small-claims" onClick={() => setOpen(false)} className={`firm-mobile-link${isActive("/small-claims") ? " is-active" : ""}`}>
            <Scale size={18} strokeWidth={1.8} aria-hidden /> Small Claims
          </Link>
        </div>

        {/* 3. Case Score — top-level link on desktop */}
        <div className="firm-mobile-section">
          <Link href="/case-score" onClick={() => setOpen(false)} className={`firm-mobile-link${isActive("/case-score") ? " is-active" : ""}`}>
            <BarChart3 size={18} strokeWidth={1.8} aria-hidden /> Case Score
          </Link>
        </div>

        {/* 4. Resources — matches the desktop mega's three groups */}
        <details className="firm-mobile-section firm-mobile-group">
          <summary className="firm-mobile-link">
            <BookOpen size={18} strokeWidth={1.8} aria-hidden /> Resources
            <ChevronDown size={16} strokeWidth={2} className="firm-mobile-chev" aria-hidden />
          </summary>
          <div className="firm-mobile-eyebrow">By dispute type</div>
          {SC_CATEGORIES.map((c) => (
            <Link key={c.href} href={c.href} onClick={() => setOpen(false)} className="firm-mobile-sub">
              <c.Icon size={15} strokeWidth={1.7} aria-hidden /> {c.label}
            </Link>
          ))}
          <Link href="/small-claims" onClick={() => setOpen(false)} className="firm-mobile-sub" style={{ color: C.accent, fontWeight: 600 }}>
            All categories →
          </Link>
          <div className="firm-mobile-eyebrow">State guides</div>
          {FEATURED_STATES.map((s) => (
            <Link key={s.slug} href={`/small-claims/${s.slug}`} onClick={() => setOpen(false)} className="firm-mobile-sub">
              {s.name}
            </Link>
          ))}
          <Link href="/small-claims#states" onClick={() => setOpen(false)} className="firm-mobile-sub" style={{ color: C.accent, fontWeight: 600 }}>
            All 50 states →
          </Link>
          <div className="firm-mobile-eyebrow">Blog</div>
          <Link href="/blog" onClick={() => setOpen(false)} className="firm-mobile-sub">
            Read the blog
          </Link>
        </details>

        {/* 5. About / Contact — chrome links (not in desktop top nav, kept for mobile reach) */}
        <div className="firm-mobile-section">
          <Link href="/about" onClick={() => setOpen(false)} className="firm-mobile-link">About</Link>
          <Link href="/contact" onClick={() => setOpen(false)} className="firm-mobile-link">Contact</Link>
        </div>
      </nav>

      <div className="firm-mobile-foot">
        {user ? (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "6px 4px 10px" }}>
              {user.avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={user.avatarUrl} alt="" style={{ width: 36, height: 36, borderRadius: 999, objectFit: "cover" }} />
              ) : (
                <span style={{ width: 36, height: 36, borderRadius: 999, background: C.cream, color: C.accent, display: "inline-flex", alignItems: "center", justifyContent: "center", font: `600 14px/1 ${BODY_FONT}` }}>
                  {initial}
                </span>
              )}
              <div style={{ minWidth: 0 }}>
                <div style={{ font: `600 14px/1.2 ${BODY_FONT}`, color: C.fg, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{user.fullName}</div>
                <div style={{ font: `12px/1.3 ${BODY_FONT}`, color: C.muted, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{user.email}</div>
              </div>
            </div>
            <Link href="/dashboard" onClick={() => setOpen(false)} className="firm-mobile-cta-primary" style={{ background: C.dark, color: "#fff" }}>Dashboard</Link>
            {user.isAdmin && (
              <Link href="/admin" onClick={() => setOpen(false)} className="firm-mobile-cta-ghost" style={{ color: C.accent }}>Admin</Link>
            )}
            <a href="/auth/signout" className="firm-mobile-cta-ghost">Sign out</a>
          </>
        ) : (
          <>
            <Link href="/login" onClick={() => setOpen(false)} className="firm-mobile-cta-ghost">Sign in</Link>
            <Link href="/dashboard/cases/new" onClick={() => setOpen(false)} className="firm-mobile-cta-primary">Get started</Link>
          </>
        )}
      </div>
    </aside>
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
