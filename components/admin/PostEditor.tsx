"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import TipTapEditor from "./TipTapEditor";
import { createClient } from "../../lib/supabase/client";
import type { BlogPost, BlogPostStatus } from "../../lib/supabase/types";

function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

type Props = {
  initial?: BlogPost;
};

export default function PostEditor({ initial }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? "");
  const [coverImage, setCoverImage] = useState(initial?.cover_image_url ?? "");
  const [status, setStatus] = useState<BlogPostStatus>(initial?.status ?? "draft");
  const [content, setContent] = useState<{ json: unknown; html: string }>({
    json: initial?.content_json ?? null,
    html: initial?.content_html ?? "",
  });
  const [slugTouched, setSlugTouched] = useState(!!initial);

  function onTitleChange(v: string) {
    setTitle(v);
    if (!slugTouched) setSlug(slugify(v));
  }

  async function save(newStatus?: BlogPostStatus) {
    setError(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const supabase = createClient() as any;
    const finalStatus = newStatus ?? status;
    const payload = {
      title: title.trim() || "Untitled",
      slug: (slug || slugify(title) || crypto.randomUUID().slice(0, 8)).trim(),
      excerpt: excerpt.trim() || null,
      cover_image_url: coverImage.trim() || null,
      content_json: content.json,
      content_html: content.html,
      status: finalStatus,
      published_at:
        finalStatus === "published" && (initial?.status !== "published" || !initial?.published_at)
          ? new Date().toISOString()
          : initial?.published_at ?? null,
    };

    if (initial) {
      const { error } = await supabase.from("blog_posts").update(payload).eq("id", initial.id);
      if (error) {
        setError(error.message);
        return;
      }
      setSavedAt(new Date());
      setStatus(finalStatus);
      router.refresh();
    } else {
      const { data, error } = await supabase
        .from("blog_posts")
        .insert(payload)
        .select("id")
        .single();
      if (error || !data) {
        setError(error?.message || "Failed to create post");
        return;
      }
      router.replace(`/admin/blog/${data.id}`);
      router.refresh();
    }
  }

  async function deletePost() {
    if (!initial) return;
    if (!confirm("Delete this post permanently? This cannot be undone.")) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const supabase = createClient() as any;
    const { error } = await supabase.from("blog_posts").delete().eq("id", initial.id);
    if (error) {
      setError(error.message);
      return;
    }
    router.replace("/admin/blog");
    router.refresh();
  }

  const liveUrl = initial && status === "published" ? `/blog/${initial.slug}` : null;

  return (
    <div className="admin-page admin-editor">
      <header className="admin-page-head">
        <div>
          <Link href="/admin/blog" className="admin-back">← Posts</Link>
          <h1>{initial ? "Edit post" : "New post"}</h1>
        </div>
        <div className="admin-editor-meta">
          {savedAt && <span className="admin-saved">Saved at {savedAt.toLocaleTimeString()}</span>}
          {liveUrl && (
            <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="admin-link">
              View live ↗
            </a>
          )}
        </div>
      </header>

      {error && <div className="admin-error">{error}</div>}

      <div className="admin-editor-grid">
        <div className="admin-editor-main">
          <input
            className="admin-title-input"
            placeholder="Post title"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
          />
          <TipTapEditor
            initialJson={initial?.content_json ?? null}
            initialHtml={initial?.content_html ?? null}
            onChange={(d) => setContent(d)}
          />
        </div>

        <aside className="admin-editor-side">
          <div className="admin-side-card">
            <h3>Status</h3>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as BlogPostStatus)}
              className="admin-input"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
            <div className="admin-side-actions">
              <button
                type="button"
                className="btn btn-dark"
                disabled={isPending}
                onClick={() => startTransition(() => save())}
              >
                {isPending ? "Saving…" : "Save"}
              </button>
              {status === "draft" && (
                <button
                  type="button"
                  className="btn btn-cream"
                  disabled={isPending}
                  onClick={() => startTransition(() => save("published"))}
                >
                  Publish
                </button>
              )}
              {status === "published" && (
                <button
                  type="button"
                  className="btn btn-cream"
                  disabled={isPending}
                  onClick={() => startTransition(() => save("draft"))}
                >
                  Unpublish
                </button>
              )}
            </div>
          </div>

          <div className="admin-side-card">
            <h3>Slug</h3>
            <input
              className="admin-input"
              value={slug}
              onChange={(e) => {
                setSlug(e.target.value);
                setSlugTouched(true);
              }}
              placeholder="my-post-slug"
            />
            <p className="admin-hint">URL: /blog/{slug || "..."}</p>
          </div>

          <div className="admin-side-card">
            <h3>Excerpt</h3>
            <textarea
              className="admin-input"
              rows={3}
              value={excerpt ?? ""}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Short summary for the blog index and SEO."
            />
          </div>

          <div className="admin-side-card">
            <h3>Cover image URL</h3>
            <input
              className="admin-input"
              value={coverImage ?? ""}
              onChange={(e) => setCoverImage(e.target.value)}
              placeholder="https://…"
            />
            {coverImage && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={coverImage} alt="" className="admin-cover-preview" />
            )}
          </div>

          {initial && (
            <div className="admin-side-card admin-danger">
              <h3>Danger zone</h3>
              <button type="button" className="btn btn-danger" onClick={deletePost}>
                Delete post
              </button>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
