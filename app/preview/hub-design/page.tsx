import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Hub Design Preview",
  robots: { index: false, follow: false },
};

const CATEGORIES = [
  {
    slug: "landlord",
    title: "Sue a landlord",
    blurb: "Security deposit, mold, lockout, harassment, wrongful eviction, and 6 more.",
    issueCount: 11,
    photo: "1560518883-ce09059eeffa",
  },
  {
    slug: "employer",
    title: "Sue an employer",
    blurb: "Wrongful termination, unpaid wages, last paycheck, retaliation, stolen tips.",
    issueCount: 10,
    photo: "1521791136064-7986c2920216",
  },
  {
    slug: "contractor",
    title: "Sue a contractor",
    blurb: "Took deposit and vanished, unfinished work, poor workmanship, damage.",
    issueCount: 11,
    photo: "1503387762-592deb58ef4e",
  },
  {
    slug: "auto",
    title: "Sue over a car",
    blurb: "Parked-car hit, dealership fraud, lemon, mechanic, valet damage.",
    issueCount: 9,
    photo: "1503376780353-7e6692767b70",
  },
  {
    slug: "neighbor",
    title: "Sue a neighbor",
    blurb: "Property damage, fallen trees, noise, harassment, water runoff.",
    issueCount: 10,
    photo: "1568605114967-8130f3a36994",
  },
  {
    slug: "personal-loan",
    title: "Recover money owed",
    blurb: "Friend, family, ex, IOU, verbal agreement, cash loan.",
    issueCount: 8,
    photo: "1554224155-1696413565d3",
  },
  {
    slug: "roommate",
    title: "Sue a roommate",
    blurb: "Unpaid rent, unpaid bills, moving out without notice, property damage.",
    issueCount: 7,
    photo: "1560448204-e02f11c3d0e2",
  },
  {
    slug: "online-seller",
    title: "Sue an online seller",
    blurb: "Amazon, eBay, Etsy, Facebook Marketplace, Venmo scams, FedEx.",
    issueCount: 8,
    photo: "1607082348824-0a96f2a4b9da",
  },
  {
    slug: "refund",
    title: "Get a refund",
    blurb: "Defective product, gym membership, dry cleaner, salon damage.",
    issueCount: 6,
    photo: "1554224154-26032ffc0d07",
  },
];

const TOP_TOPICS = [
  { href: "/small-claims/sue-landlord-security-deposit", title: "Sue a landlord for a security deposit", blurb: "2x or 3x penalties in most states", avg: "$4,500", timeline: "30-60 days", cluster: "Property" },
  { href: "/small-claims/sue-employer-wrongful-termination", title: "Sue an employer for wrongful termination", blurb: "When small claims fits vs. needing an attorney", avg: "$7,200", timeline: "60-90 days", cluster: "Workplace" },
  { href: "/small-claims/sue-employer-unpaid-wages", title: "Sue an employer for unpaid wages", blurb: "FLSA + state wage acts (often 2x damages)", avg: "$4,400", timeline: "45-90 days", cluster: "Workplace" },
  { href: "/small-claims/sue-auto-parked-car-hit", title: "Sue someone for hitting your parked car", blurb: "When insurance won't pay", avg: "$4,200", timeline: "30-60 days", cluster: "Property" },
  { href: "/small-claims/sue-contractor-deposit-and-disappearing", title: "Sue a contractor who took the deposit and vanished", blurb: "License board + bond + court", avg: "$6,500", timeline: "60-120 days", cluster: "Money" },
  { href: "/small-claims/sue-loan-someone-owes-me-money", title: "Sue someone who owes you money", blurb: "Most informal loans are recoverable", avg: "$5,400", timeline: "60-90 days", cluster: "Money" },
  { href: "/small-claims/sue-loan-friend-not-paying-back", title: "Sue a friend who won't pay you back", blurb: "Venmo records + texts = case", avg: "$3,200", timeline: "60-90 days", cluster: "Money" },
  { href: "/small-claims/sue-roommate-unpaid-rent", title: "Sue a roommate for unpaid rent", blurb: "Joint-and-several lease + contribution", avg: "$4,200", timeline: "60-90 days", cluster: "Property" },
  { href: "/small-claims/sue-neighbor-property-damage", title: "Sue a neighbor for property damage", blurb: "Their homeowners insurance covers most", avg: "$4,400", timeline: "60-90 days", cluster: "Property" },
  { href: "/small-claims/sue-neighbor-noise", title: "Sue a neighbor for noise", blurb: "Private nuisance + city ordinances", avg: "$4,200", timeline: "60-120 days", cluster: "Property" },
  { href: "/small-claims/sue-seller-amazon-seller", title: "Sue an Amazon seller", blurb: "A-to-z Guarantee first, court for backup", avg: "$1,800", timeline: "30-60 days", cluster: "Consumer" },
  { href: "/small-claims/sue-refund-defective-product", title: "Sue for a defective product", blurb: "Magnuson-Moss + state UDAP", avg: "$1,800", timeline: "30-60 days", cluster: "Consumer" },
];

function PhotoSrc(id: string, w = 800, h = 600) {
  return `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop`;
}

export default function HubDesignPreview() {
  const featured = CATEGORIES.slice(0, 2);
  const rest = CATEGORIES.slice(2);

  const clustersOrder = ["Money", "Property", "Workplace", "Consumer"];
  const clusters = clustersOrder.map((name) => ({
    name,
    items: TOP_TOPICS.filter((t) => t.cluster === name),
  }));

  return (
    <main className="cat-page" style={{ paddingBottom: 120 }}>
      <div className="wrap" style={{ paddingTop: 24 }}>
        <p style={{ fontSize: 13, color: "var(--muted)", marginBottom: 8 }}>
          <Link href="/small-claims" className="cat-text-link">← Back to /small-claims</Link>
        </p>
        <h1 style={{ marginTop: 0 }}>Hub design preview</h1>
        <p style={{ maxWidth: "60ch", marginBottom: 24 }}>
          Six visual variants for the categories and popular-topics sections. Pick the ones you like and I&rsquo;ll roll them into <code>/small-claims</code>.
        </p>
        <nav style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 48, fontSize: 14 }}>
          <a href="#option-a" className="cat-text-link">A — Magazine bento</a>
          <a href="#option-b" className="cat-text-link">B — Photo-driven</a>
          <a href="#option-c" className="cat-text-link">C — Editorial numbered</a>
          <a href="#option-d" className="cat-text-link">D — Ranked + metadata</a>
          <a href="#option-e" className="cat-text-link">E — Topic clusters</a>
          <a href="#option-f" className="cat-text-link">F — Search-result style</a>
        </nav>

        {/* ============================ OPTION A ============================ */}
        <Divider id="option-a" label="Option A — Magazine bento (categories)" />
        <section className="cat-section">
          <div className="sec-head" style={{ textAlign: "left", marginBottom: 28 }}>
            <h2 style={{ margin: 0 }}><em>Pick</em> a category.</h2>
            <p style={{ marginTop: 12, maxWidth: "60ch" }}>Two featured categories highlighted, the rest in a tighter grid.</p>
          </div>

          <div className="bento-featured">
            {featured.map((c) => (
              <Link key={c.slug} href={`/small-claims/${c.slug}`} className="bento-hero">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={PhotoSrc(c.photo, 1200, 700)} alt="" className="bento-hero-img" />
                <div className="bento-hero-overlay">
                  <span className="bento-hero-badge">{c.issueCount} guides</span>
                  <h3>{c.title}</h3>
                  <p>{c.blurb}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="cat-grid" style={{ marginTop: 24 }}>
            {rest.map((c) => (
              <Link key={c.slug} href={`/small-claims/${c.slug}`} className="cat-card">
                <span className="cat-card-issuecount">{c.issueCount}</span>
                <h3>{c.title}</h3>
                <p>{c.blurb}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* ============================ OPTION B ============================ */}
        <Divider id="option-b" label="Option B — Photo-driven cards (categories)" />
        <section className="cat-section">
          <div className="sec-head" style={{ textAlign: "left", marginBottom: 28 }}>
            <h2 style={{ margin: 0 }}><em>Pick</em> a category.</h2>
            <p style={{ marginTop: 12, maxWidth: "60ch" }}>Each card has a relevant photo background with overlay text.</p>
          </div>

          <div className="photo-grid">
            {CATEGORIES.map((c) => (
              <Link key={c.slug} href={`/small-claims/${c.slug}`} className="photo-card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={PhotoSrc(c.photo, 600, 600)} alt="" className="photo-card-img" />
                <div className="photo-card-overlay">
                  <span className="photo-card-count">{c.issueCount} issues</span>
                  <h3>{c.title}</h3>
                  <p>{c.blurb}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ============================ OPTION C ============================ */}
        <Divider id="option-c" label="Option C — Editorial numbered list (categories)" />
        <section className="cat-section">
          <div className="sec-head" style={{ textAlign: "left", marginBottom: 28 }}>
            <h2 style={{ margin: 0 }}><em>Pick</em> a category.</h2>
            <p style={{ marginTop: 12, maxWidth: "60ch" }}>Editorial numbered list, two columns on desktop. Reads like a magazine table of contents.</p>
          </div>

          <div className="editorial-grid">
            {CATEGORIES.map((c, i) => (
              <Link key={c.slug} href={`/small-claims/${c.slug}`} className="editorial-item">
                <span className="editorial-num">{String(i + 1).padStart(2, "0")}</span>
                <div className="editorial-body">
                  <h3>{c.title}</h3>
                  <p>{c.blurb}</p>
                  <span className="editorial-count">{c.issueCount} guides →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ============================ OPTION D ============================ */}
        <Divider id="option-d" label="Option D — Ranked + metadata (popular topics)" />
        <section className="cat-section">
          <div className="sec-head" style={{ textAlign: "left", marginBottom: 28 }}>
            <h2 style={{ margin: 0 }}>Popular <em>topics</em>.</h2>
            <p style={{ marginTop: 12, maxWidth: "60ch" }}>Numbered ranking with metadata strip (avg recovery, timeline). Looks editorial.</p>
          </div>

          <ol className="ranked-list">
            {TOP_TOPICS.map((t, i) => (
              <li key={t.href}>
                <Link href={t.href} className="ranked-row">
                  <span className="ranked-num">{String(i + 1).padStart(2, "0")}</span>
                  <div className="ranked-body">
                    <h3>{t.title}</h3>
                    <p>{t.blurb}</p>
                    <div className="ranked-meta">
                      <span><strong>Avg recovery</strong> {t.avg}</span>
                      <span><strong>Timeline</strong> {t.timeline}</span>
                      <span><strong>Category</strong> {t.cluster}</span>
                    </div>
                  </div>
                  <span className="ranked-arrow">→</span>
                </Link>
              </li>
            ))}
          </ol>
        </section>

        {/* ============================ OPTION E ============================ */}
        <Divider id="option-e" label="Option E — Topic clusters (popular topics)" />
        <section className="cat-section">
          <div className="sec-head" style={{ textAlign: "left", marginBottom: 28 }}>
            <h2 style={{ margin: 0 }}>Popular <em>topics</em>.</h2>
            <p style={{ marginTop: 12, maxWidth: "60ch" }}>Topics grouped by theme. Each cluster has its own subhead.</p>
          </div>

          {clusters.map((cluster) => (
            <div key={cluster.name} className="cluster-block">
              <div className="cluster-head">
                <span className="cluster-eyebrow">{cluster.name}</span>
                <h3>{clusterLabel(cluster.name)}</h3>
              </div>
              <div className="cluster-grid">
                {cluster.items.map((t) => (
                  <Link key={t.href} href={t.href} className="cluster-item">
                    <h4>{t.title}</h4>
                    <p>{t.blurb}</p>
                    <span className="cluster-meta">{t.avg} · {t.timeline}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* ============================ OPTION F ============================ */}
        <Divider id="option-f" label="Option F — Search-result layout (popular topics)" />
        <section className="cat-section">
          <div className="sec-head" style={{ textAlign: "left", marginBottom: 28 }}>
            <h2 style={{ margin: 0 }}>Popular <em>topics</em>.</h2>
            <p style={{ marginTop: 12, maxWidth: "60ch" }}>Familiar search-result pattern. Dense, scannable, content-forward.</p>
          </div>

          <div className="search-list">
            {TOP_TOPICS.map((t) => (
              <Link key={t.href} href={t.href} className="search-result">
                <div className="search-url">civilcase.com{t.href}</div>
                <h3 className="search-title">{t.title}</h3>
                <p className="search-snippet">
                  {t.blurb}. Avg recovery {t.avg}. Timeline {t.timeline}. Category: {t.cluster}.
                </p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function Divider({ id, label }: { id: string; label: string }) {
  return (
    <div
      id={id}
      style={{
        margin: "72px 0 32px",
        paddingBottom: 12,
        borderBottom: "1px solid var(--hairline)",
        scrollMarginTop: 80,
      }}
    >
      <span style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--muted)" }}>
        Variant
      </span>
      <h2 style={{ margin: "6px 0 0", fontSize: 22 }}>{label}</h2>
    </div>
  );
}

function clusterLabel(name: string): string {
  switch (name) {
    case "Money": return "Money disputes & loans";
    case "Property": return "Property damage & housing";
    case "Workplace": return "Workplace & employment";
    case "Consumer": return "Consumer purchases";
    default: return name;
  }
}
