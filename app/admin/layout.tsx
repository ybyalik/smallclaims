import "./admin.css";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "../../lib/supabase/server";
import { createServiceRoleClient } from "../../lib/supabase/service-role";
import SignOutButton from "../../components/admin/SignOutButton";
import AdminShellLayout from "../../components/admin/AdminShellLayout";
import ResponsiveTableLabels from "../../components/admin/ResponsiveTableLabels";

export const metadata = {
  title: "Admin · CivilCase",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // Defense in depth: re-verify auth + is_admin HERE, not just in middleware.
  // Relying on middleware alone is risky (e.g. CVE-2025-29927 lets a crafted
  // header skip middleware on vulnerable Next.js versions), and every admin
  // page reads data with the RLS-bypassing service-role client, so a bypass
  // would expose real customer data. This server check gates the whole surface.
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  const user = data.user;
  if (!user) redirect("/login?next=/admin");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const svc = createServiceRoleClient() as any;
  const { data: profile } = await svc
    .from("profiles")
    .select("is_admin")
    .eq("user_id", user.id)
    .maybeSingle();
  if (!profile?.is_admin) redirect("/");
  const email = user.email;

  const sidebar = (
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
        <Link href="/admin/winback">Winback emails</Link>
        <Link href="/admin/research">State research</Link>
        <Link href="/admin/prompts">AI prompts</Link>
        <Link href="/admin/test-scenarios">Test scenarios</Link>
        <Link href="/" target="_blank" rel="noopener noreferrer">View site ↗</Link>
      </nav>
      <div className="admin-side-foot">
        {email && <span className="admin-user">{email}</span>}
        <SignOutButton />
      </div>
    </aside>
  );

  return (
    <>
      <ResponsiveTableLabels />
      <AdminShellLayout sidebar={sidebar}>{children}</AdminShellLayout>
    </>
  );
}
