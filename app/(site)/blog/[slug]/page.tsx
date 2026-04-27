import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "../../../../lib/supabase/server";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import type { BlogPost as BlogPostType } from "../../../../lib/supabase/types";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const supabase = createClient();
  const res = await supabase
    .from("blog_posts")
    .select("title, excerpt, cover_image_url")
    .eq("slug", params.slug)
    .eq("status", "published")
    .maybeSingle();
  const data = res.data as { title: string; excerpt: string | null; cover_image_url: string | null } | null;
  if (!data) return {};
  return {
    title: `${data.title} · CivilCase`,
    description: data.excerpt || undefined,
    alternates: { canonical: `/blog/${params.slug}` },
    openGraph: {
      title: data.title,
      description: data.excerpt || undefined,
      images: data.cover_image_url ? [data.cover_image_url] : undefined,
      type: "article",
    },
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const supabase = createClient();
  const res = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", params.slug)
    .eq("status", "published")
    .maybeSingle();
  const post = res.data as BlogPostType | null;
  if (!post) notFound();

  return (
    <main className="wrap blog-post">
      <Breadcrumbs items={[{ href: "/blog", label: "Blog" }, { label: post.title }]} />
      <article>
        <header className="blog-post-head">
          <time>
            {post.published_at &&
              new Date(post.published_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
          </time>
          <h1>{post.title}</h1>
          {post.excerpt && <p className="blog-post-excerpt">{post.excerpt}</p>}
          {post.cover_image_url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={post.cover_image_url} alt="" className="blog-post-cover" />
          )}
        </header>
        <div
          className="blog-post-body tiptap-content"
          dangerouslySetInnerHTML={{ __html: post.content_html || "" }}
        />
      </article>
      <p className="blog-post-back">
        <Link href="/blog">← All posts</Link>
      </p>
    </main>
  );
}
