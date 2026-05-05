import Link from "next/link";

export type Crumb = { href?: string; label: string };

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const trail: Crumb[] = [{ href: "/", label: "Civil Case" }, ...items];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: `https://civilcase.com${c.href}` } : {}),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" className="breadcrumbs">
        <ol>
          {trail.map((c, i) => {
            const isLast = i === trail.length - 1;
            return (
              <li key={`${c.label}-${i}`}>
                {c.href && !isLast ? (
                  <Link href={c.href}>{c.label}</Link>
                ) : (
                  <span aria-current={isLast ? "page" : undefined}>{c.label}</span>
                )}
                {!isLast && <span className="sep" aria-hidden="true">/</span>}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
