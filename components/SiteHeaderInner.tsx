"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Building2, Hammer, Briefcase, Car, Trees, HandCoins, Users, ShoppingBag, Receipt } from "lucide-react";
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
          <Link href="/demand-letter">Demand Letter</Link>
          <Link href="/small-claims">Small Claims</Link>
          <Link href="/case-score">Case Score</Link>
          <div
            className={`nav-mega-trigger${openMega === "res" ? " is-open" : ""}`}
            onMouseEnter={() => openMegaNow("res")}
            onMouseLeave={scheduleMegaClose}
            onFocus={() => openMegaNow("res")}
          >
            <Link href="/blog">
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

        {user ? (
          <div className="nav-mobile-user">
            {user.avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={user.avatarUrl} alt="" className="nav-user-avatar" />
            ) : (
              <span className="nav-user-avatar nav-user-avatar-fallback">{initial}</span>
            )}
            <div>
              <strong>{user.fullName}</strong>
              <span>{user.email}</span>
            </div>
          </div>
        ) : null}

        <nav className="nav-mobile-links">
          {user ? (
            <div className="nav-mobile-section">
              <span className="nav-mobile-section-label">My account</span>
              <Link href="/dashboard" onClick={() => setOpen(false)}>
                Dashboard
              </Link>
              <Link href="/dashboard/settings" onClick={() => setOpen(false)}>
                Settings
              </Link>
            </div>
          ) : null}

          <div className="nav-mobile-section">
            <span className="nav-mobile-section-label">Get started</span>
            <Link href="/demand-letter" onClick={() => setOpen(false)}>
              Demand Letter
            </Link>
            <Link href="/case-score" onClick={() => setOpen(false)}>
              Case Score
            </Link>
            <Link href="/small-claims" onClick={() => setOpen(false)}>
              Small claims by state
            </Link>
          </div>

          <details className="nav-mobile-section nav-mobile-group">
            <summary>
              <span className="nav-mobile-section-label">Browse by dispute type</span>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" className="nav-mobile-chev">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </summary>
            <Link href="/small-claims/landlord" onClick={() => setOpen(false)}>
              Landlord
            </Link>
            <Link href="/small-claims/employer" onClick={() => setOpen(false)}>
              Employer
            </Link>
            <Link href="/small-claims/contractor" onClick={() => setOpen(false)}>
              Contractor
            </Link>
            <Link href="/small-claims/auto" onClick={() => setOpen(false)}>
              Auto
            </Link>
            <Link href="/small-claims/neighbor" onClick={() => setOpen(false)}>
              Neighbor
            </Link>
            <Link href="/small-claims/personal-loan" onClick={() => setOpen(false)}>
              Personal loan
            </Link>
            <Link href="/small-claims/roommate" onClick={() => setOpen(false)}>
              Roommate
            </Link>
            <Link href="/small-claims/online-seller" onClick={() => setOpen(false)}>
              Online seller
            </Link>
            <Link href="/small-claims/refund" onClick={() => setOpen(false)}>
              Refunds
            </Link>
          </details>
        </nav>

        <div className="nav-mobile-cta">
          {user ? (
            <a className="btn btn-cream" href="/auth/signout">
              Sign out
            </a>
          ) : (
            <>
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
            </>
          )}
        </div>
      </aside>
    </>
  );
}
