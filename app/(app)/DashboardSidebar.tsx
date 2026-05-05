"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarUser {
  displayName: string;
  email: string;
  avatarUrl: string | null;
  isAdmin: boolean;
}

interface SidebarProps {
  user: SidebarUser | null;
}

interface NavItem {
  label: string;
  href: string;
  match: RegExp;
  cta?: { label: string; href: string };
  comingSoon?: boolean;
}

// Section: services. Today only Demand Letter is live. Small claims and other
// services slot in here when they ship.
const SERVICES: NavItem[] = [
  {
    label: "Demand letter",
    href: "/dashboard/demand-letters",
    match: /^\/dashboard(\/(cases|demand-letters).*)?$|^\/demand-letter\/wizard/,
    cta: { label: "Create a demand letter", href: "/dashboard/demand-letters/new" },
  },
  {
    label: "Small claims",
    href: "#",
    match: /__never__/,
    comingSoon: true,
  },
];

const ACCOUNT: NavItem[] = [
  { label: "Billing", href: "/dashboard/billing", match: /^\/dashboard\/billing/ },
];

export default function DashboardSidebar({ user }: SidebarProps) {
  const pathname = usePathname() || "";
  const settingsActive = /^\/dashboard\/settings/.test(pathname);

  return (
    <aside className="app-side">
      <div className="app-side-brand">
        <Link href={user ? "/dashboard" : "/"} aria-label="CivilCase home">
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

      <div className="app-nav-section-label">Services</div>
      <nav className="app-nav">
        {SERVICES.map((item) => {
          const active = item.match.test(pathname);
          if (item.comingSoon) {
            return (
              <span key={item.label} className="app-nav-soon" aria-disabled="true">
                {item.label}
                <span className="app-nav-pill">Soon</span>
              </span>
            );
          }
          // Anonymous users: route service nav to the public entry
          const href = user ? item.href : "/demand-letter";
          const ctaHref = user ? item.cta?.href : "/demand-letter";
          return (
            <div key={item.href} className="app-nav-group">
              <Link href={href} className={active ? "active" : ""}>
                {item.label}
              </Link>
              {item.cta ? (
                <Link href={ctaHref!} className="app-nav-cta">
                  + {item.cta.label}
                </Link>
              ) : null}
            </div>
          );
        })}
      </nav>

      <div className="app-side-divider" />

      <div className="app-nav-section-label">Account</div>
      <nav className="app-nav">
        {user ? (
          ACCOUNT.map((item) => {
            const active = item.match.test(pathname);
            return (
              <Link key={item.href} href={item.href} className={active ? "active" : ""}>
                {item.label}
              </Link>
            );
          })
        ) : (
          <>
            <Link href="/login">Sign in</Link>
            <Link href="/signup">Create account</Link>
          </>
        )}
      </nav>

      <div className="app-side-divider" />

      <nav className="app-nav app-nav-secondary">
        <Link href="/small-claims" target="_blank" rel="noopener noreferrer">
          State guides ↗
        </Link>
        {user?.isAdmin ? (
          <Link href="/admin" className="app-admin-link">
            Admin →
          </Link>
        ) : null}
      </nav>

      <div className="app-side-foot">
        {user ? (
          <>
            <div className="app-user">
              {user.avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={user.avatarUrl} alt="" className="app-avatar" />
              ) : (
                <div className="app-avatar app-avatar-fallback">
                  {user.displayName.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="app-user-meta">
                <div className="app-user-name">{user.displayName}</div>
                <div className="app-user-email">{user.email}</div>
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
          </>
        ) : (
          <div className="app-anon-foot">
            <p>Save your progress and access it from any device.</p>
            <Link href="/signup" className="btn btn-dark btn-sm app-anon-cta">
              Create account
            </Link>
          </div>
        )}
      </div>
    </aside>
  );
}

function SettingsIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M13.4 9.4a5.4 5.4 0 0 0 0-2.8l1.4-1-1.4-2.4-1.7.5a5.5 5.5 0 0 0-2.4-1.4L8.8.4h-1.6l-.5 1.9A5.5 5.5 0 0 0 4.3 3.7l-1.7-.5L1.2 5.6l1.4 1a5.4 5.4 0 0 0 0 2.8l-1.4 1 1.4 2.4 1.7-.5a5.5 5.5 0 0 0 2.4 1.4l.5 1.9h1.6l.5-1.9a5.5 5.5 0 0 0 2.4-1.4l1.7.5 1.4-2.4-1.4-1Z"
        stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"
      />
    </svg>
  );
}

function SignOutIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M9 3H3v10h6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11 5l3 3-3 3M14 8H6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
