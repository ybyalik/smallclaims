import Link from "next/link";
import { createClient } from "../../lib/supabase/server";
import { createServiceRoleClient } from "../../lib/supabase/service-role";
import { listResearch } from "../../lib/research";

export const dynamic = "force-dynamic";

function fmt$(cents: number): string {
  return (cents / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

export default async function AdminDashboard() {
  const supabase = createClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const admin = createServiceRoleClient() as any;

  const [
    { count: totalBlog },
    { count: publishedBlog },
    { count: totalCases },
    { count: draftCases },
    { count: paidCases },
    { data: revenueRows },
    { data: usersResp },
  ] = await Promise.all([
    supabase.from("blog_posts").select("*", { count: "exact", head: true }),
    supabase.from("blog_posts").select("*", { count: "exact", head: true }).eq("status", "published"),
    admin.from("cases").select("*", { count: "exact", head: true }),
    admin.from("cases").select("*", { count: "exact", head: true }).eq("status", "draft"),
    admin
      .from("payments")
      .select("case_id", { count: "exact", head: true })
      .eq("status", "succeeded"),
    admin.from("payments").select("amount_cents").eq("status", "succeeded"),
    admin.auth.admin.listUsers({ perPage: 1000 }),
  ]);

  const totalUsers = usersResp?.users?.length ?? 0;
  const revenueCents =
    (revenueRows ?? []).reduce((s: number, p: { amount_cents: number }) => s + (p.amount_cents ?? 0), 0);

  return (
    <div className="admin-page">
      <header className="admin-page-head">
        <h1>Dashboard</h1>
      </header>

      <h2 className="admin-section-h" style={{ marginTop: 0 }}>People & money</h2>
      <div className="admin-cards">
        <Link href="/admin/users" className="admin-card">
          <span className="admin-card-eyebrow">Users</span>
          <span className="admin-card-num">{totalUsers}</span>
          <span className="admin-card-sub">Total registered</span>
        </Link>
        <Link href="/admin/cases" className="admin-card">
          <span className="admin-card-eyebrow">Cases</span>
          <span className="admin-card-num">{totalCases ?? 0}</span>
          <span className="admin-card-sub">{draftCases ?? 0} drafts</span>
        </Link>
        <Link href="/admin/cases" className="admin-card">
          <span className="admin-card-eyebrow">Paid cases</span>
          <span className="admin-card-num">{paidCases ?? 0}</span>
          <span className="admin-card-sub">Successful payments</span>
        </Link>
        <Link href="/admin/cases" className="admin-card">
          <span className="admin-card-eyebrow">Revenue</span>
          <span className="admin-card-num">{fmt$(revenueCents)}</span>
          <span className="admin-card-sub">Lifetime</span>
        </Link>
      </div>

      <h2 className="admin-section-h" style={{ marginTop: 32 }}>Content</h2>
      <div className="admin-cards">
        <Link href="/admin/blog" className="admin-card">
          <span className="admin-card-eyebrow">Blog</span>
          <span className="admin-card-num">{totalBlog ?? 0}</span>
          <span className="admin-card-sub">{publishedBlog ?? 0} published</span>
        </Link>
        <Link href="/admin/research" className="admin-card">
          <span className="admin-card-eyebrow">State research</span>
          <span className="admin-card-num">{listResearch().length}</span>
          <span className="admin-card-sub">Reports available</span>
        </Link>
      </div>
    </div>
  );
}
