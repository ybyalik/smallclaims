"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
  displayName: string;
  email: string;
  avatarUrl: string | null;
  isAdmin: boolean;
}

const NAV = [
  { label: "Cases", href: "/dashboard", match: /^\/dashboard(\/cases.*)?$/ },
  { label: "Billing", href: "/dashboard/billing", match: /^\/dashboard\/billing/ },
];

export default function DashboardSidebar({ displayName, email, avatarUrl, isAdmin }: SidebarProps) {
  const pathname = usePathname() || "";
  const settingsActive = /^\/dashboard\/settings/.test(pathname);

  return (
    <aside className="app-side">
      <div className="app-side-brand">
        <Link href="/dashboard" aria-label="CivilCase dashboard">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/civilcase-logo.webp"
            alt="CivilCase"
            width={600}
            height={198}
            className="app-brand-logo"
          />
        </Link>
      </div>

      <nav className="app-nav">
        {NAV.map((item) => {
          const active = item.match.test(pathname);
          return (
            <Link key={item.href} href={item.href} className={active ? "active" : ""}>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="app-side-divider" />

      <nav className="app-nav app-nav-secondary">
        <Link href="/guides" target="_blank" rel="noopener noreferrer">
          State guides ↗
        </Link>
        {isAdmin && (
          <Link href="/admin" className="app-admin-link">
            Admin →
          </Link>
        )}
      </nav>

      <div className="app-side-foot">
        <div className="app-user">
          {avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={avatarUrl} alt="" className="app-avatar" />
          ) : (
            <div className="app-avatar app-avatar-fallback">
              {displayName.charAt(0).toUpperCase()}
            </div>
          )}
          <div className="app-user-meta">
            <div className="app-user-name">{displayName}</div>
            <div className="app-user-email">{email}</div>
          </div>
        </div>
        <nav className="app-foot-nav">
          <Link
            href="/dashboard/settings"
            className={`app-foot-link ${settingsActive ? "active" : ""}`}
          >
            <SettingsIcon />
            <span>Settings</span>
          </Link>
          <a href="/auth/signout" className="app-foot-link">
            <SignOutIcon />
            <span>Sign out</span>
          </a>
        </nav>
      </div>
    </aside>
  );
}

function SettingsIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M13.4 9.4a5.4 5.4 0 0 0 0-2.8l1.4-1-1.4-2.4-1.7.5a5.5 5.5 0 0 0-2.4-1.4L8.8.4h-1.6l-.5 1.9A5.5 5.5 0 0 0 4.3 3.7l-1.7-.5L1.2 5.6l1.4 1a5.4 5.4 0 0 0 0 2.8l-1.4 1 1.4 2.4 1.7-.5a5.5 5.5 0 0 0 2.4 1.4l.5 1.9h1.6l.5-1.9a5.5 5.5 0 0 0 2.4-1.4l1.7.5 1.4-2.4-1.4-1Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SignOutIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M9 3H3v10h6"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 5l3 3-3 3M14 8H6"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
