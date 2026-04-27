import "./admin.css";
import Link from "next/link";
import { headers } from "next/headers";
import { createClient } from "../../lib/supabase/server";
import SignOutButton from "../../components/admin/SignOutButton";

export const metadata = {
  title: "Admin · CivilCase",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // Read pathname so we can hide the chrome on /admin/login
  const h = headers();
  const pathname =
    h.get("x-invoke-path") || h.get("x-next-pathname") || h.get("x-pathname") || "";

  // For login page, render a minimal shell with no nav
  if (pathname.endsWith("/admin/login")) {
    return <>{children}</>;
  }

  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  const email = data.user?.email;

  return (
    <div className="admin-shell">
      <aside className="admin-side">
        <div className="admin-side-brand">
          <Link href="/admin">
            <span className="brand-mark">C</span>
            <span>CivilCase Admin</span>
          </Link>
        </div>
        <nav className="admin-nav">
          <Link href="/admin">Dashboard</Link>
          <Link href="/admin/blog">Blog</Link>
          <Link href="/admin/research">State research</Link>
          <Link href="/" target="_blank" rel="noopener noreferrer">View site ↗</Link>
        </nav>
        <div className="admin-side-foot">
          {email && <span className="admin-user">{email}</span>}
          <SignOutButton />
        </div>
      </aside>
      <main className="admin-main">{children}</main>
    </div>
  );
}
