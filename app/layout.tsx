import type { Metadata } from "next";
import "./globals.css";

const SITE_URL = "https://civilcase.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "CivilCase — Get Your Money Back Without a Lawyer",
    template: "%s · CivilCase",
  },
  description:
    "Resolve small claims and civil disputes, from demand to resolution. CivilCase drafts the demand letter, mails it certified, and walks you through filing and collection in all 50 states.",
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
    title: "CivilCase — Get Your Money Back Without a Lawyer",
    description:
      "Resolve small claims and civil disputes, from demand to resolution. All 50 states.",
  },
  twitter: {
    card: "summary_large_image",
    title: "CivilCase — Get Your Money Back Without a Lawyer",
    description:
      "Resolve small claims and civil disputes, from demand to resolution.",
  },
  robots: { index: true, follow: true },
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
          href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,500;0,6..72,600;0,6..72,700;0,6..72,800;1,6..72,500;1,6..72,600;1,6..72,700;1,6..72,800&family=Geist:wght@400;500;600;700;800&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
