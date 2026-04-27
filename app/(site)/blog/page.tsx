import Link from "next/link";
import type { Metadata } from "next";
import { createClient } from "../../../lib/supabase/server";
import Breadcrumbs from "../../../components/Breadcrumbs";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog · CivilCase",
  description: "Plain-English guides, case studies, and updates on small claims court.",
  alternates: { canonical: "/blog" },
};

export default async function BlogIndex() {
  type Card = {
    id: string;
    slug: string;
    title: string;
    excerpt: string | null;
    cover_image_url: string | null;
    published_at: string | null;
  };
  const supabase = createClient();
  const res = await supabase
    .from("blog_posts")
    .select("id, slug, title, excerpt, cover_image_url, published_at")
    .eq("status", "published")
    .order("published_at", { ascending: false });
  const posts = (res.data ?? []) as Card[];

  return (
    <main className="wrap blog-index">
      <Breadcrumbs items={[{ label: "Blog" }]} />
      <header className="blog-header">
        <span className="eyebrow">CivilCase Blog</span>
        <h1>
          Notes on <em>recovering what you&rsquo;re owed.</em>
        </h1>
        <p>Stories, case studies, and plain-English updates from the small claims trenches.</p>
      </header>
      {posts.length === 0 ? (
        <div className="blog-empty">
          <p>No posts yet. Check back soon.</p>
        </div>
      ) : (
        <ul className="blog-grid">
          {posts.map((p) => (
            <li key={p.id} className="blog-card">
              <Link href={`/blog/${p.slug}`}>
                {p.cover_image_url && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.cover_image_url} alt="" className="blog-card-cover" />
                )}
                <div className="blog-card-body">
                  <time>
                    {p.published_at &&
                      new Date(p.published_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                  </time>
                  <h2>{p.title}</h2>
                  {p.excerpt && <p>{p.excerpt}</p>}
                  <span className="blog-card-cta">Read post →</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
