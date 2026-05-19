"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import StartCaseButton from "../../components/StartCaseButton";
import {
  LayoutDashboard,
  Folder,
  CreditCard,
  LifeBuoy,
  BookOpen,
  Shield,
  Settings,
  LogOut,
  Bell,
  type LucideIcon,
} from "lucide-react";

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
  icon: LucideIcon;
  cta?: { label: string; href: string };
  comingSoon?: boolean;
}

// Section: services. Today only Demand Letter is live. Other services
// (e.g., Small claims) slot in here when they ship.
const SERVICES: NavItem[] = [
  {
    label: "Cases",
    href: "/dashboard/cases",
    match: /^\/dashboard\/cases(\/.*)?$|^\/case\//,
    icon: Folder,
    cta: { label: "Start a New Case", href: "/dashboard/cases/new" },
  },
];

const ACCOUNT: NavItem[] = [
  {
    label: "Notifications",
    href: "/dashboard/notifications",
    match: /^\/dashboard\/notifications/,
    icon: Bell,
  },
  {
    label: "Billing",
    href: "/dashboard/billing",
    match: /^\/dashboard\/billing/,
    icon: CreditCard,
  },
  {
    label: "Support",
    href: "/dashboard/support",
    match: /^\/dashboard\/support/,
    icon: LifeBuoy,
  },
];

function NavIcon({ Icon }: { Icon: LucideIcon }) {
  return <Icon size={16} strokeWidth={1.8} className="app-nav-icon" aria-hidden />;
}

export default function DashboardSidebar({ user }: SidebarProps) {
  const pathname = usePathname() || "";
  const settingsActive = /^\/dashboard\/settings/.test(pathname);
  const dashboardActive = pathname === "/dashboard";

  // Poll the notifications endpoint to keep the action-needed badge live.
  // Bell shows the count of unresolved action-required notifications, not
  // unread — visiting /dashboard/notifications does NOT clear the badge.
  // Only resolving the action (approving a letter, etc.) clears it.
  const [actionable, setActionable] = useState(0);
  useEffect(() => {
    if (!user) return;
    let alive = true;
    async function load() {
      try {
        const res = await fetch("/api/notifications");
        if (!res.ok) return;
        const data = (await res.json()) as { actionableCount?: number };
        if (alive) setActionable(data.actionableCount ?? 0);
      } catch {
        // network blip — try again on next tick
      }
    }
    load();
    const id = window.setInterval(load, 60_000);
    // Refresh when window regains focus so a quick alt-tab back picks up
    // notifications fired while the tab was inactive.
    const onFocus = () => load();
    window.addEventListener("focus", onFocus);
    return () => {
      alive = false;
      window.clearInterval(id);
      window.removeEventListener("focus", onFocus);
    };
  }, [user]);

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

      <nav className="app-nav" style={{ marginTop: 14 }}>
        {user ? (
          <Link href="/dashboard" className={dashboardActive ? "active" : ""}>
            <NavIcon Icon={LayoutDashboard} />
            <span>Dashboard</span>
          </Link>
        ) : null}
        {SERVICES.map((item) => {
          const active = item.match.test(pathname);
          if (item.comingSoon) {
            return (
              <span key={item.label} className="app-nav-soon" aria-disabled="true">
                <NavIcon Icon={item.icon} />
                <span>{item.label}</span>
                <span className="app-nav-pill">Soon</span>
              </span>
            );
          }
          const href = user ? item.href : "/demand-letter";
          const ctaHref = user ? item.cta?.href : "/demand-letter";
          // If the CTA points at the legacy "new case" entry, render the
          // StartCaseButton so we go through the API path instead of the
          // server-rendered redirect page.
          const useStartButton =
            !!item.cta && user && item.cta.href === "/dashboard/cases/new";
          return (
            <div key={item.href} className="app-nav-group">
              <Link href={href} className={active ? "active" : ""}>
                <NavIcon Icon={item.icon} />
                <span>{item.label}</span>
              </Link>
              {item.cta ? (
                useStartButton ? (
                  <StartCaseButton className="app-nav-cta">
                    + {item.cta.label}
                  </StartCaseButton>
                ) : (
                  <Link href={ctaHref!} className="app-nav-cta">
                    + {item.cta.label}
                  </Link>
                )
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
            const isNotifications = item.href === "/dashboard/notifications";
            return (
              <Link key={item.href} href={item.href} className={active ? "active" : ""}>
                <NavIcon Icon={item.icon} />
                <span>{item.label}</span>
                {isNotifications && actionable > 0 ? (
                  <span
                    className="app-nav-badge"
                    aria-label={`${actionable} action${actionable === 1 ? "" : "s"} needed`}
                  >
                    {actionable > 99 ? "99+" : actionable}
                  </span>
                ) : null}
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
          <NavIcon Icon={BookOpen} />
          <span>State guides ↗</span>
        </Link>
        {user?.isAdmin ? (
          <Link href="/admin" className="app-admin-link">
            <NavIcon Icon={Shield} />
            <span>Admin →</span>
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
                <Settings size={14} strokeWidth={1.8} aria-hidden />
                <span>Settings</span>
              </Link>
              <a href="/auth/signout" className="app-foot-link">
                <LogOut size={14} strokeWidth={1.8} aria-hidden />
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
