"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Building2, Hammer, Briefcase, Car, Trees, HandCoins, Users, ShoppingBag, Receipt, FileText, Scale, BarChart3, BookOpen, LayoutDashboard, Settings, LogOut } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { SiteHeaderUser } from "./SiteHeader";

type MegaKey = "sc" | "res";

const SC_CATEGORIES: Array<{ href: string; label: string; icon: LucideIcon }> = [
  { href: "/small-claims/landlord", label: "Landlord disputes", icon: Building2 },
  { href: "/small-claims/contractor", label: "Contractor disputes", icon: Hammer },
  { href: "/small-claims/employer", label: "Employer disputes", icon: Briefcase },
  { href: "/small-claims/auto", label: "Auto disputes", icon: Car },
  { href: "/small-claims/neighbor", label: "Neighbor disputes", icon: Trees },
  { href: "/small-claims/personal-loan", label: "Personal loan disputes", icon: HandCoins },
  { href: "/small-claims/roommate", label: "Roommate disputes", icon: Users },
  { href: "/small-claims/online-seller", label: "Online seller disputes", icon: ShoppingBag },
  { href: "/small-claims/refund", label: "Refund disputes", icon: Receipt },
];

const FEATURED_STATES: Array<{ slug: string; name: string }> = [
  { slug: "california", name: "California" },
  { slug: "texas", name: "Texas" },
  { slug: "new-york", name: "New York" },
  { slug: "florida", name: "Florida" },
  { slug: "pennsylvania", name: "Pennsylvania" },
];

export default function SiteHeaderInner({ user }: { user: SiteHeaderUser | null }) {
  const pathname = usePathname() || "/";
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");
  const [open, setOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [openMega, setOpenMega] = useState<MegaKey | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const openMegaNow = (k: MegaKey) => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setOpenMega(k);
  };
  const scheduleMegaClose = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => setOpenMega(null), 140);
  };
  useEffect(() => {
    if (!openMega) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenMega(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openMega]);

  // Lock body scroll when the mobile menu is open
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  // Close drawer on escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  // Close user-menu dropdown on outside click or escape
  useEffect(() => {
    if (!userMenuOpen) return;
    const onClick = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setUserMenuOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      window.removeEventListener("keydown", onKey);
    };
  }, [userMenuOpen]);

  const initial = user?.fullName.trim().charAt(0).toUpperCase() || "A";

  return (
    <>
    <div className="nav-shell">
      <header className="nav wrap">
        <Link className="brand" href="/" aria-label="CivilCase home">
          <Image
            src="/civilcase-logo.webp"
            alt="CivilCase"
            width={180}
            height={59}
            className="brand-logo"
            priority
          />
        </Link>
        <nav className="nav-links">
          <Link href="/demand-letter">
            <FileText className="nav-link-icon" size={16} strokeWidth={1.8} aria-hidden />
            Demand Letter
          </Link>
          <Link href="/small-claims">
            <Scale className="nav-link-icon" size={16} strokeWidth={1.8} aria-hidden />
            Small Claims
          </Link>
          <Link href="/case-score">
            <BarChart3 className="nav-link-icon" size={16} strokeWidth={1.8} aria-hidden />
            Case Score
          </Link>
          <div
            className={`nav-mega-trigger${openMega === "res" ? " is-open" : ""}`}
            onMouseEnter={() => openMegaNow("res")}
            onMouseLeave={scheduleMegaClose}
            onFocus={() => openMegaNow("res")}
          >
            <Link href="/blog">
              <BookOpen className="nav-link-icon" size={16} strokeWidth={1.8} aria-hidden />
              Resources
              <ChevronDown className="nav-mega-caret" size={12} strokeWidth={2} aria-hidden />
            </Link>
          </div>
        </nav>

        {user ? (
          <div className="nav-cta nav-user-wrap" ref={userMenuRef}>
            <Link className="btn btn-dark btn-sm" href="/dashboard">
              Dashboard
            </Link>
            <button
              type="button"
              className="nav-user-trigger"
              onClick={() => setUserMenuOpen((v) => !v)}
              aria-haspopup="menu"
              aria-expanded={userMenuOpen}
              aria-label="Account menu"
            >
              {user.avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={user.avatarUrl} alt="" className="nav-user-avatar" />
              ) : (
                <span className="nav-user-avatar nav-user-avatar-fallback">{initial}</span>
              )}
            </button>
            {userMenuOpen ? (
              <div className="nav-user-menu" role="menu">
                <div className="nav-user-menu-head">
                  <strong>{user.fullName}</strong>
                  <span>{user.email}</span>
                </div>
                <Link
                  href="/dashboard"
                  className="nav-user-menu-item"
                  role="menuitem"
                  onClick={() => setUserMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/settings"
                  className="nav-user-menu-item"
                  role="menuitem"
                  onClick={() => setUserMenuOpen(false)}
                >
                  Settings
                </Link>
                <Link
                  href="/dashboard/billing"
                  className="nav-user-menu-item"
                  role="menuitem"
                  onClick={() => setUserMenuOpen(false)}
                >
                  Billing
                </Link>
                {user.isAdmin ? (
                  <Link
                    href="/admin"
                    className="nav-user-menu-item nav-user-menu-admin"
                    role="menuitem"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    Admin
                  </Link>
                ) : null}
                <a href="/auth/signout" className="nav-user-menu-item nav-user-menu-signout" role="menuitem">
                  Sign out
                </a>
              </div>
            ) : null}
          </div>
        ) : (
          <div className="nav-cta">
            <Link className="btn btn-cream btn-sm" href="/login">
              Sign in
            </Link>
            <Link className="btn btn-green btn-sm" href="/demand-letter">
              Get started
            </Link>
          </div>
        )}

        <button
          className={`nav-burger${open ? " is-open" : ""}`}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      {/* Mega menu — Resources */}
      <div
        className={`nav-mega${openMega === "res" ? " is-open" : ""}`}
        onMouseEnter={() => openMegaNow("res")}
        onMouseLeave={scheduleMegaClose}
        aria-hidden={openMega !== "res"}
      >
        <div className="nav-mega-grid nav-mega-grid-res">
          <div className="nav-mega-col">
            <div className="nav-mega-eyebrow">By dispute type</div>
            <ul className="nav-mega-list nav-mega-list-2col nav-mega-list-icons">
              {SC_CATEGORIES.map((c) => {
                const Icon = c.icon;
                return (
                  <li key={c.href}>
                    <Link href={c.href} onClick={() => setOpenMega(null)}>
                      <span className="nav-mega-icon" aria-hidden>
                        <Icon size={18} strokeWidth={1.7} />
                      </span>
                      <span>{c.label}</span>
                    </Link>
                  </li>
                );
              })}
              <li className="nav-mega-allitem">
                <Link href="/small-claims" onClick={() => setOpenMega(null)}>
                  All categories →
                </Link>
              </li>
            </ul>
          </div>
          <div className="nav-mega-col">
            <div className="nav-mega-eyebrow">State guides</div>
            <ul className="nav-mega-list">
              {FEATURED_STATES.map((s) => (
                <li key={s.slug}>
                  <Link href={`/small-claims/${s.slug}`} onClick={() => setOpenMega(null)}>{s.name}</Link>
                </li>
              ))}
            </ul>
            <Link className="nav-mega-allink" href="/small-claims#states" onClick={() => setOpenMega(null)}>
              All 50 states →
            </Link>
          </div>
          <div className="nav-mega-col nav-mega-feature">
            <Link href="/blog" onClick={() => setOpenMega(null)} className="nav-mega-feature-card">
              <Image
                src="/assets/blog-menu-image.webp"
                alt=""
                width={400}
                height={300}
                className="nav-mega-feature-image"
                aria-hidden
              />
              <div className="nav-mega-feature-eyebrow">Blog</div>
              <div className="nav-mega-feature-title">Stories from the small-claims trenches</div>
              <div className="nav-mega-feature-sub">Filing tips, statute breakdowns, and real outcomes from people who took action.</div>
              <span className="nav-mega-feature-arrow">→</span>
            </Link>
          </div>
        </div>
      </div>

    </div>

      <div
        className={`nav-backdrop${open ? " is-open" : ""}`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      <aside
        id="mobile-menu"
        className={`nav-mobile${open ? " is-open" : ""}`}
        aria-hidden={!open}
      >
        <div className="nav-mobile-head">
          <Link
            className="brand"
            href="/"
            onClick={() => setOpen(false)}
            aria-label="CivilCase home"
          >
            <Image
              src="/civilcase-logo.webp"
              alt="CivilCase"
              width={180}
              height={59}
              className="brand-logo"
            />
          </Link>
          <button
            className="nav-mobile-close"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <nav className="nav-mobile-links">
          {user ? (
            <div className="nav-mobile-section">
              <span className="nav-mobile-section-label">My account</span>
              <Link href="/dashboard" onClick={() => setOpen(false)} className={`nav-mobile-top${isActive("/dashboard") ? " active" : ""}`}>
                <LayoutDashboard className="nav-link-icon" size={18} strokeWidth={1.8} aria-hidden />
                Dashboard
              </Link>
            </div>
          ) : null}

          {/* Top-level items mirror the desktop nav exactly. */}
          <div className="nav-mobile-section">
            <Link href="/demand-letter" onClick={() => setOpen(false)} className={`nav-mobile-top${isActive("/demand-letter") ? " active" : ""}`}>
              <FileText className="nav-link-icon" size={18} strokeWidth={1.8} aria-hidden />
              Demand Letter
            </Link>
            <Link href="/small-claims" onClick={() => setOpen(false)} className={`nav-mobile-top${isActive("/small-claims") ? " active" : ""}`}>
              <Scale className="nav-link-icon" size={18} strokeWidth={1.8} aria-hidden />
              Small Claims
            </Link>
            <Link href="/case-score" onClick={() => setOpen(false)} className={`nav-mobile-top${isActive("/case-score") ? " active" : ""}`}>
              <BarChart3 className="nav-link-icon" size={18} strokeWidth={1.8} aria-hidden />
              Case Score
            </Link>
          </div>

          {/* Resources — same three groupings as the desktop mega menu. */}
          <details className="nav-mobile-section nav-mobile-group">
            <summary>
              <span className="nav-mobile-top">
                <BookOpen className="nav-link-icon" size={18} strokeWidth={1.8} aria-hidden />
                Resources
              </span>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" className="nav-mobile-chev">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </summary>

            <span className="nav-mobile-section-label">By dispute type</span>
            {SC_CATEGORIES.map((c) => {
              const Icon = c.icon;
              return (
                <Link key={c.href} href={c.href} onClick={() => setOpen(false)} className="nav-mobile-sub">
                  <Icon size={16} strokeWidth={1.7} aria-hidden />
                  {c.label}
                </Link>
              );
            })}
            <Link href="/small-claims" onClick={() => setOpen(false)} className="nav-mobile-sub nav-mobile-all">
              All categories →
            </Link>

            <span className="nav-mobile-section-label">State guides</span>
            {FEATURED_STATES.map((s) => (
              <Link key={s.slug} href={`/small-claims/${s.slug}`} onClick={() => setOpen(false)} className="nav-mobile-sub">
                {s.name}
              </Link>
            ))}
            <Link href="/small-claims#states" onClick={() => setOpen(false)} className="nav-mobile-sub nav-mobile-all">
              All 50 states →
            </Link>

            <span className="nav-mobile-section-label">Blog</span>
            <Link href="/blog" onClick={() => setOpen(false)} className="nav-mobile-sub">
              Read the blog
            </Link>
          </details>
        </nav>

        {user ? (
          <div className="nav-mobile-foot">
            <div className="nav-mobile-foot-user">
              {user.avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={user.avatarUrl} alt="" className="nav-mobile-foot-avatar" />
              ) : (
                <span className="nav-mobile-foot-avatar nav-mobile-foot-avatar-fallback">{initial}</span>
              )}
              <div className="nav-mobile-foot-meta">
                <div className="nav-mobile-foot-name">{user.fullName}</div>
                <div className="nav-mobile-foot-email">{user.email}</div>
              </div>
            </div>
            <nav className="nav-mobile-foot-nav">
              <Link
                href="/dashboard/settings"
                onClick={() => setOpen(false)}
                className={`nav-mobile-foot-link${isActive("/dashboard/settings") ? " active" : ""}`}
              >
                <Settings size={14} strokeWidth={1.8} aria-hidden />
                <span>Settings</span>
              </Link>
              <a href="/auth/signout" className="nav-mobile-foot-link">
                <LogOut size={14} strokeWidth={1.8} aria-hidden />
                <span>Sign out</span>
              </a>
            </nav>
          </div>
        ) : (
          <div className="nav-mobile-cta">
            <Link
              className="btn btn-cream"
              href="/login"
              onClick={() => setOpen(false)}
            >
              Sign in
            </Link>
            <Link
              className="btn btn-green"
              href="/demand-letter"
              onClick={() => setOpen(false)}
            >
              Get started
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
