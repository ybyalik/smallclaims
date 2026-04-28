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

  return (
    <aside className="app-side">
      <div className="app-side-brand">
        <Link href="/dashboard">
          <span className="app-brand-mark">C</span>
          <span>CivilCase</span>
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
        <Link href="/dashboard/settings">Settings</Link>
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
        <a href="/auth/signout" className="app-signout">
          Sign out
        </a>
      </div>
    </aside>
  );
}
