"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Props {
  sidebar: React.ReactNode;
  children: React.ReactNode;
}

/**
 * Client wrapper for the admin shell. Mirrors AppShellLayout (dashboard):
 * desktop = permanent sidebar on the left; mobile (<=900px) = a top bar
 * with a hamburger that opens the sidebar as a slide-out drawer from
 * the right.
 */
export default function AdminShellLayout({ sidebar, children }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="admin-shell">
      <header className="admin-mobile-bar">
        <Link href="/admin" className="admin-mobile-bar-brand" aria-label="CivilCase Admin">
          <span className="brand-mark">C</span>
          <span>CivilCase Admin</span>
        </Link>
        <button
          type="button"
          className={`admin-mobile-burger${open ? " is-open" : ""}`}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      <div
        className={`admin-mobile-backdrop${open ? " is-open" : ""}`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      <div
        className={`admin-side-wrap${open ? " is-open" : ""}`}
        onClick={(e) => {
          const target = e.target as HTMLElement;
          if (target.closest("a, button")) setOpen(false);
        }}
      >
        {sidebar}
      </div>

      <main className="admin-main">{children}</main>
    </div>
  );
}
