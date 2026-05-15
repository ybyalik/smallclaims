import type { Metadata, Viewport } from "next";
import "./globals.css";

const SITE_URL = "https://civilcase.com";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Recover Up to $25,000 in Small Claims Court | CivilCase.com",
    template: "%s · CivilCase",
  },
  description:
    "Recover up to $25,000 in your state's small claims court. We draft your demand letter, mail it certified, and walk you through filing, hearing, and collection.",
  keywords: [
    "small claims",
    "demand letter",
    "consumer dispute",
    "security deposit",
    "unpaid invoice",
    "contractor dispute",
    "recover money",
    "self-help legal",
  ],
  authors: [{ name: "CivilCase" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "CivilCase",
    title: "Recover Up to $25,000 in Small Claims Court | CivilCase.com",
    description:
      "Recover up to $25,000 in your state's small claims court. We draft your demand letter, mail it certified, and walk you through filing, hearing, and collection.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Recover Up to $25,000 in Small Claims Court | CivilCase.com",
    description:
      "Recover up to $25,000 in your state's small claims court. We draft your demand letter, mail it certified, and walk you through filing, hearing, and collection.",
  },
  robots: { index: true, follow: true },
};

// Sitewide JSON-LD: one Organization that other pages reference by @id, plus
// a WebSite with SearchAction so Google can render a sitelinks search box
// directly in the SERP.
const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "CivilCase",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/civilcase-logo.webp`,
        width: 600,
        height: 198,
      },
      description:
        "Self-help platform for small claims and civil disputes. Demand letters, filing guides, and collection plans for all 50 states.",
      foundingDate: "2026",
      areaServed: { "@type": "Country", name: "United States" },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "CivilCase",
      description:
        "Recover up to $25,000 in your state's small claims court without hiring a lawyer.",
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "en-US",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${SITE_URL}/blog?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,500;0,6..72,600;0,6..72,700;0,6..72,800;1,6..72,500;1,6..72,600;1,6..72,700;1,6..72,800&family=Geist:wght@400;500;600;700;800&family=Caveat:wght@500;600;700&display=swap"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
