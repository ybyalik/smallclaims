import "./admin.css";
import Link from "next/link";
import { createClient } from "../../lib/supabase/server";
import SignOutButton from "../../components/admin/SignOutButton";

export const metadata = {
  title: "Admin · CivilCase",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // Auth + is_admin check happens in middleware. By the time this layout
  // renders we know the user is authenticated and admin.
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
          <Link href="/admin/users">Users</Link>
          <Link href="/admin/cases">Cases</Link>
          <Link href="/admin/blog">Blog</Link>
          <Link href="/admin/research">State research</Link>
          <Link href="/admin/test-scenarios">Test scenarios</Link>
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
