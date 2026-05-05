"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Props {
  sidebar: React.ReactNode;
  children: React.ReactNode;
}

/**
 * Client wrapper for the dashboard/wizard shell. Renders a mobile top bar
 * with a burger button below 900px; the sidebar becomes a slide-out drawer.
 * On larger screens, the sidebar sits permanently on the left.
 */
export default function AppShellLayout({ sidebar, children }: Props) {
  const [open, setOpen] = useState(false);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="app-shell">
      {/* Mobile top bar — only visible below 900px */}
      <header className="app-mobile-bar">
        <Link href="/" aria-label="CivilCase home" className="app-mobile-bar-brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/civilcase-logo.webp"
            alt="CivilCase"
            width={600}
            height={198}
            className="app-mobile-bar-logo"
          />
        </Link>
        <button
          type="button"
          className={`app-mobile-burger${open ? " is-open" : ""}`}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      {/* Backdrop for mobile drawer */}
      <div
        className={`app-mobile-backdrop${open ? " is-open" : ""}`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* Sidebar (always rendered; CSS controls desktop vs mobile-drawer) */}
      <div
        className={`app-side-wrap${open ? " is-open" : ""}`}
        onClick={(e) => {
          // Tapping a nav link should close the drawer
          const target = e.target as HTMLElement;
          if (target.closest("a, button")) setOpen(false);
        }}
      >
        {sidebar}
      </div>

      <main className="app-main">{children}</main>
    </div>
  );
}
