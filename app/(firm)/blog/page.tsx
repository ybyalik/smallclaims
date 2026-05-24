import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "../../../lib/supabase/server";
import {
  C, H1, H2, eyebrow, body, PAD_X, RAD, HEAD_FONT, BODY_FONT, italicEmCSS,
  Arrow, FirmBtn,
} from "../../../components/firm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog · CivilCase",
  description: "Plain-English guides, case studies, and updates on small claims court.",
  alternates: { canonical: "/blog" },
};

type Card = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  cover_image_url: string | null;
  published_at: string | null;
};

export default async function Blog2() {
  const supabase = createClient();
  const res = await supabase
    .from("blog_posts")
    .select("id, slug, title, excerpt, cover_image_url, published_at")
    .eq("status", "published")
    .order("published_at", { ascending: false });
  const posts = (res.data ?? []) as Card[];

  const [featured, ...rest] = posts;

  return (
    <main style={{ background: C.bg, color: C.fg, font: `16px/1.5 ${BODY_FONT}` }}>
      <style dangerouslySetInnerHTML={{ __html: italicEmCSS }} />

      {/* HERO */}
      <section style={{ padding: `80px ${PAD_X} 60px` }}>
        <div style={{ ...eyebrow, color: C.accent, marginBottom: 28 }}>CIVILCASE BLOG</div>
        <h1 className="firm-h" style={{ ...H1, fontSize: 72, maxWidth: 1000 }}>
          Notes on <em>recovering what you&rsquo;re owed</em>.
        </h1>
        <p style={{ font: `18px/1.55 ${BODY_FONT}`, color: C.muted, maxWidth: 680, marginTop: 28 }}>
          Stories, case studies, and plain-English updates from the small claims trenches.
        </p>
      </section>

      {posts.length === 0 ? (
        <section style={{ padding: `60px ${PAD_X} 160px` }}>
          <div style={{ background: C.cream, border: `1px solid ${C.line}`, borderRadius: RAD.panel, padding: 80, textAlign: "center" }}>
            <div style={{ ...eyebrow, marginBottom: 18 }}>NOTHING HERE YET</div>
            <h2 className="firm-h" style={H2}>The blog is <em>warming up</em>.</h2>
            <p style={{ ...body, maxWidth: 560, margin: "18px auto 0" }}>
              We publish state-by-state breakdowns, case studies from real recoveries, and procedural
              explainers. The first batch goes live with the public launch.
            </p>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", marginTop: 32 }}>
              <Link href="/small-claims" style={{ textDecoration: "none" }}><FirmBtn>Browse State Guides</FirmBtn></Link>
              <Link href="/about" style={{ textDecoration: "none" }}><FirmBtn kind="ghost">About CivilCase</FirmBtn></Link>
            </div>
          </div>
        </section>
      ) : (
        <>
          {/* FEATURED POST */}
          {featured && (
            <section style={{ padding: `40px ${PAD_X} 80px` }}>
              <Link
                href={`/blog/${featured.slug}`}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.2fr 1fr",
                  gap: 60,
                  background: C.paper,
                  border: `1px solid ${C.line}`,
                  borderRadius: RAD.panel,
                  overflow: "hidden",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <div style={{ padding: "56px 56px 56px 56px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <div style={{ ...eyebrow, color: C.accent, marginBottom: 18 }}>FEATURED</div>
                  {featured.published_at && (
                    <div style={{ font: `13px/1 ${BODY_FONT}`, color: C.muted, marginBottom: 18 }}>
                      <time dateTime={featured.published_at}>
                        {new Date(featured.published_at).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </time>
                    </div>
                  )}
                  <h2 className="firm-h" style={{ ...H2, fontSize: 44, color: C.fg }}>{featured.title}</h2>
                  {featured.excerpt && (
                    <p style={{ font: `17px/1.55 ${BODY_FONT}`, color: C.muted, marginTop: 18, maxWidth: 540 }}>
                      {featured.excerpt}
                    </p>
                  )}
                  <div style={{ display: "inline-flex", gap: 10, alignItems: "center", marginTop: 28, font: `500 14px/1 ${BODY_FONT}`, color: C.accent }}>
                    Read post <Arrow color={C.accent} />
                  </div>
                </div>
                <div style={{ position: "relative", minHeight: 460, background: C.cream }}>
                  {featured.cover_image_url && (
                    <Image
                      src={featured.cover_image_url}
                      alt=""
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      style={{ objectFit: "cover" }}
                    />
                  )}
                </div>
              </Link>
            </section>
          )}

          {/* GRID */}
          {rest.length > 0 && (
            <section style={{ padding: `40px ${PAD_X} 160px` }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 80, marginBottom: 40, alignItems: "end" }}>
                <div>
                  <div style={{ ...eyebrow, marginBottom: 22 }}>MORE POSTS</div>
                  <h2 className="firm-h" style={H2}>Everything <em>else</em>.</h2>
                </div>
                <p style={body}>
                  Case studies, state-specific deep dives, and short reads on practical procedure.
                </p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
                {rest.map((p) => (
                  <Link
                    key={p.id}
                    href={`/blog/${p.slug}`}
                    style={{
                      background: C.paper,
                      border: `1px solid ${C.line}`,
                      borderRadius: RAD.card,
                      overflow: "hidden",
                      textDecoration: "none",
                      color: "inherit",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div style={{ position: "relative", aspectRatio: "16 / 10", background: C.cream }}>
                      {p.cover_image_url && (
                        <Image
                          src={p.cover_image_url}
                          alt=""
                          fill
                          sizes="(max-width: 1024px) 50vw, 33vw"
                          style={{ objectFit: "cover" }}
                        />
                      )}
                    </div>
                    <div style={{ padding: 28, flex: 1, display: "flex", flexDirection: "column" }}>
                      {p.published_at && (
                        <div style={{ font: `12px/1 ${BODY_FONT}`, color: C.muted, marginBottom: 14, letterSpacing: "0.04em" }}>
                          <time dateTime={p.published_at}>
                            {new Date(p.published_at).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </time>
                        </div>
                      )}
                      <h3 style={{ font: `600 22px/1.25 ${HEAD_FONT}`, color: C.fg, letterSpacing: "-0.005em", margin: 0 }}>
                        {p.title}
                      </h3>
                      {p.excerpt && (
                        <p style={{ ...body, marginTop: 12, fontSize: 14.5, flex: 1 }}>{p.excerpt}</p>
                      )}
                      <div style={{ display: "inline-flex", gap: 10, alignItems: "center", marginTop: 18, font: `500 13px/1 ${BODY_FONT}`, color: C.accent }}>
                        Read post <Arrow color={C.accent} />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </main>
  );
}
