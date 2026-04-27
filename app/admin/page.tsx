import Link from "next/link";
import { createClient } from "../../lib/supabase/server";

export default async function AdminDashboard() {
  const supabase = createClient();
  const { count: total } = await supabase
    .from("blog_posts")
    .select("*", { count: "exact", head: true });
  const { count: published } = await supabase
    .from("blog_posts")
    .select("*", { count: "exact", head: true })
    .eq("status", "published");

  return (
    <div className="admin-page">
      <header className="admin-page-head">
        <h1>Dashboard</h1>
      </header>

      <div className="admin-cards">
        <Link href="/admin/blog" className="admin-card">
          <span className="admin-card-eyebrow">Blog</span>
          <span className="admin-card-num">{total ?? 0}</span>
          <span className="admin-card-sub">{published ?? 0} published</span>
        </Link>
        <Link href="/admin/research" className="admin-card">
          <span className="admin-card-eyebrow">State research</span>
          <span className="admin-card-num">14</span>
          <span className="admin-card-sub">Reports available</span>
        </Link>
      </div>
    </div>
  );
}
