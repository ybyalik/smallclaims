import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "../../../../lib/supabase/server";
import type { BlogPost as BlogPostType } from "../../../../lib/supabase/types";
import {
  C, H1, eyebrow, body, PAD_X, RAD, HEAD_FONT, BODY_FONT, italicEmCSS,
  FirmBtn,
} from "../../../../components/firm";

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
    alternates: { canonical: `/blog2/${params.slug}` },
    robots: { index: false, follow: false },
  };
}

const BLOG_PROSE_CSS = `
.firm-blog-body { font: 17px/1.75 var(--font-geist), system-ui, sans-serif; color: #2a241e; }
.firm-blog-body > * + * { margin-top: 22px; }
.firm-blog-body h2 { font: 600 32px/1.25 var(--font-newsreader), Georgia, serif; color: #1f1a16; letter-spacing: -0.015em; margin: 48px 0 18px; }
.firm-blog-body h3 { font: 600 22px/1.3 var(--font-newsreader), Georgia, serif; color: #1f1a16; letter-spacing: -0.005em; margin: 36px 0 12px; }
.firm-blog-body p { margin: 0; }
.firm-blog-body a { color: #b8331f; text-decoration: underline; text-underline-offset: 3px; }
.firm-blog-body strong { color: #1a1612; font-weight: 600; }
.firm-blog-body ul, .firm-blog-body ol { margin: 14px 0 0 26px; padding: 0; display: grid; gap: 10px; }
.firm-blog-body li { margin: 0; }
.firm-blog-body blockquote {
  border-left: 3px solid #b8331f;
  padding: 4px 0 4px 24px;
  margin: 28px 0;
  color: #5b544c;
  font: italic 19px/1.5 var(--font-newsreader), Georgia, serif;
}
.firm-blog-body img { max-width: 100%; height: auto; border-radius: 12px; margin: 28px 0; }
.firm-blog-body pre {
  background: #f5f1e8;
  border: 1px solid #e7dfd0;
  border-radius: 10px;
  padding: 18px;
  overflow-x: auto;
  font: 14px/1.5 ui-monospace, SFMono-Regular, Menlo, monospace;
}
.firm-blog-body code {
  background: #f5f1e8;
  padding: 2px 6px;
  border-radius: 4px;
  font: 14px ui-monospace, SFMono-Regular, Menlo, monospace;
}
.firm-blog-body hr { border: none; border-top: 1px solid #e7dfd0; margin: 40px 0; }
`;

export default async function Blog2Post({ params }: { params: { slug: string } }) {
  const supabase = createClient();
  const res = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", params.slug)
    .eq("status", "published")
    .maybeSingle();
  const post = res.data as BlogPostType | null;
  if (!post) notFound();

  const formattedDate =
    post.published_at &&
    new Date(post.published_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

  return (
    <main style={{ background: C.bg, color: C.fg, font: `16px/1.5 ${BODY_FONT}` }}>
      <style dangerouslySetInnerHTML={{ __html: italicEmCSS + BLOG_PROSE_CSS }} />

      {/* Breadcrumb */}
      <nav style={{ padding: `24px ${PAD_X} 0`, font: `13px/1 ${BODY_FONT}`, color: C.muted }}>
        <Link href="/blog2" style={{ color: C.muted, textDecoration: "none" }}>Blog</Link>
        <span style={{ margin: "0 10px", opacity: 0.5 }}>/</span>
        <span style={{ color: C.fg, fontWeight: 500 }}>{post.title}</span>
      </nav>

      {/* HEADER */}
      <header style={{ padding: `60px ${PAD_X} 40px`, maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ ...eyebrow, color: C.accent, marginBottom: 24 }}>CIVILCASE BLOG</div>
        {formattedDate && (
          <time
            dateTime={post.published_at ?? undefined}
            style={{ font: `14px/1 ${BODY_FONT}`, color: C.muted, marginBottom: 22, display: "block", letterSpacing: "0.04em" }}
          >
            {formattedDate}
          </time>
        )}
        <h1 className="firm-h" style={{ ...H1, fontSize: 64, maxWidth: 980 }}>{post.title}</h1>
        {post.excerpt && (
          <p style={{ font: `20px/1.55 ${BODY_FONT}`, color: C.muted, maxWidth: 760, marginTop: 28 }}>
            {post.excerpt}
          </p>
        )}
      </header>

      {/* COVER */}
      {post.cover_image_url && (
        <section style={{ padding: `20px ${PAD_X} 40px`, maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ position: "relative", aspectRatio: "16 / 9", borderRadius: RAD.panel, overflow: "hidden", background: C.cream }}>
            <Image src={post.cover_image_url} alt="" fill sizes="(max-width: 1280px) 100vw, 1280px" style={{ objectFit: "cover" }} priority />
          </div>
        </section>
      )}

      {/* BODY */}
      <article style={{ padding: `40px ${PAD_X} 80px` }}>
        <div
          className="firm-blog-body"
          style={{ maxWidth: 740, margin: "0 auto" }}
          dangerouslySetInnerHTML={{ __html: post.content_html || "" }}
        />
      </article>

      {/* BACK + CTA */}
      <section style={{ padding: `40px ${PAD_X} 120px` }}>
        <div style={{ background: C.cream, padding: "60px 56px", borderRadius: RAD.panel, display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 60, alignItems: "center" }}>
          <div>
            <div style={{ ...eyebrow, marginBottom: 18 }}>NEXT</div>
            <div style={{ font: `600 30px/1.2 ${HEAD_FONT}`, color: C.fg, letterSpacing: "-0.015em" }}>
              More from the CivilCase blog.
            </div>
            <p style={{ ...body, marginTop: 14, maxWidth: 460 }}>
              Case studies, state-specific deep dives, and short reads on practical procedure.
            </p>
          </div>
          <div style={{ display: "flex", gap: 14, justifyContent: "flex-end", flexWrap: "wrap" }}>
            <Link href="/blog2" style={{ textDecoration: "none" }}><FirmBtn kind="ghost">← All posts</FirmBtn></Link>
            <Link href="/demand-letter2" style={{ textDecoration: "none" }}><FirmBtn>Send a Demand Letter</FirmBtn></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
