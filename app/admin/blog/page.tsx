import Link from "next/link";
import { createClient } from "../../../lib/supabase/server";

export default async function BlogList() {
  type Row = {
    id: string;
    title: string;
    slug: string;
    status: "draft" | "published";
    updated_at: string;
    published_at: string | null;
  };
  const supabase = createClient();
  const res = await supabase
    .from("blog_posts")
    .select("id, title, slug, status, updated_at, published_at")
    .order("updated_at", { ascending: false });
  const posts = (res.data ?? []) as Row[];
  const error = res.error;

  return (
    <div className="admin-page">
      <header className="admin-page-head">
        <div>
          <h1>Blog posts</h1>
          <p>Drafts and published posts.</p>
        </div>
        <Link href="/admin/blog/new" className="btn btn-dark">
          New post
        </Link>
      </header>

      {error && <p className="admin-error">{error.message}</p>}

      {posts.length === 0 ? (
        <div className="admin-empty">
          <p>No posts yet.</p>
          <Link href="/admin/blog/new" className="btn btn-cream">
            Create your first post
          </Link>
        </div>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th>Updated</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {posts.map((p) => (
              <tr key={p.id}>
                <td>
                  <Link href={`/admin/blog/${p.id}`} className="admin-link">
                    {p.title || "(untitled)"}
                  </Link>
                </td>
                <td>
                  <span className={`admin-pill admin-pill-${p.status}`}>{p.status}</span>
                </td>
                <td>
                  <time>{new Date(p.updated_at).toLocaleString()}</time>
                </td>
                <td className="admin-actions">
                  <Link href={`/admin/blog/${p.id}`}>Edit</Link>
                  {p.status === "published" && (
                    <a href={`/blog/${p.slug}`} target="_blank" rel="noopener noreferrer">
                      View ↗
                    </a>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
