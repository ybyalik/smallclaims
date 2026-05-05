"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { SiteHeaderUser } from "./SiteHeader";

export default function SiteHeaderInner({ user }: { user: SiteHeaderUser | null }) {
  const [open, setOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

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
      <header className="nav wrap">
        <Link className="brand" href="/" aria-label="CivilCase home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/civilcase-logo.webp"
            alt="CivilCase"
            width={600}
            height={198}
            className="brand-logo"
          />
        </Link>
        <nav className="nav-links">
          <Link href="/case-score">Case score</Link>
          <Link href="/small-claims">Small Claims</Link>
          <Link href="/#how">How it works</Link>
          <Link href="/#faq">FAQ</Link>
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
            <Link className="btn btn-dark btn-sm" href="/demand-letter">
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
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/civilcase-logo.webp"
              alt="CivilCase"
              width={600}
              height={198}
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
            <Link href="/dashboard" onClick={() => setOpen(false)}>
              Dashboard
            </Link>
          ) : null}
          <Link href="/case-score" onClick={() => setOpen(false)}>
            Case score
          </Link>
          <Link href="/small-claims" onClick={() => setOpen(false)}>
            Small Claims
          </Link>
          <Link href="/small-claims/landlord" onClick={() => setOpen(false)}>
            Landlord disputes
          </Link>
          <Link href="/small-claims/employer" onClick={() => setOpen(false)}>
            Employer disputes
          </Link>
          <Link href="/small-claims/contractor" onClick={() => setOpen(false)}>
            Contractor disputes
          </Link>
          <Link href="/small-claims/auto" onClick={() => setOpen(false)}>
            Auto disputes
          </Link>
          <Link href="/demand-letter" onClick={() => setOpen(false)}>
            Demand letter
          </Link>
          <Link href="/#how" onClick={() => setOpen(false)}>
            How it works
          </Link>
          <Link href="/#faq" onClick={() => setOpen(false)}>
            FAQ
          </Link>
          {user ? (
            <Link href="/dashboard/settings" onClick={() => setOpen(false)}>
              Settings
            </Link>
          ) : null}
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
                className="btn btn-dark"
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
