import Image from "next/image";
import Link from "next/link";
import { C, BODY_FONT, HEAD_FONT, PAD_X } from "./index";

// Brand-mark SVGs (lucide v1.14 doesn't ship these as named exports).
const LinkedInIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.95v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.59 0 4.26 2.37 4.26 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .78 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .78 23.2 0 22.22 0z" />
  </svg>
);
const TwitterIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817-5.97 6.817H1.673l7.731-8.835L1.25 2.25h6.829l4.713 6.231 5.452-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
  </svg>
);
const FacebookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.408.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.894-4.788 4.659-4.788 1.325 0 2.463.099 2.794.143v3.24h-1.918c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.407 24 24 23.408 24 22.676V1.325C24 .593 23.407 0 22.675 0z" />
  </svg>
);

// Dark footer used across the new (firm) pages. Brand block on the left,
// three link columns in the middle/right, bottom strip with copyright +
// legal links. Matches the dark sections elsewhere on the firm pages.

const FOOTER_COLS = [
  {
    label: "PRODUCT",
    items: [
      { href: "/demand-letter", label: "Demand Letter" },
      { href: "/filing-kit", label: "Filing Kit" },
      { href: "/collection-plan", label: "Collection Plan" },
      { href: "/small-claims", label: "Small Claims by State" },
      { href: "/case-score", label: "Case Score" },
    ],
  },
  {
    label: "COMPANY",
    items: [
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
      { href: "/blog", label: "Blog" },
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer
      style={{
        background: C.dark,
        color: "rgba(255,255,255,0.6)",
        padding: `80px ${PAD_X} 32px`,
        font: `14px/1.5 ${BODY_FONT}`,
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr 1fr",
          gap: 60,
          paddingBottom: 56,
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        {/* Brand block */}
        <div>
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              textDecoration: "none",
              marginBottom: 20,
            }}
          >
            <Image
              src="/civil-case-logo-white.webp"
              alt="CivilCase"
              width={300}
              height={60}
              style={{ height: 54, width: "auto" }}
            />
          </Link>
          <p style={{ font: `14px/1.55 ${BODY_FONT}`, color: "rgba(255,255,255,0.6)", maxWidth: 280, margin: 0 }}>
            A self-help legal-information website and document automation tool. Templates and guides
            help everyday people prepare demand letters, small-claims filings, and post-judgment
            collection paperwork themselves.
          </p>
          <div style={{ display: "flex", gap: 12, marginTop: 28 }}>
            <Link
              href="#"
              aria-label="LinkedIn"
              style={{ width: 36, height: 36, borderRadius: 999, border: "1px solid rgba(255,255,255,0.18)", color: "rgba(255,255,255,0.7)", display: "inline-flex", alignItems: "center", justifyContent: "center", textDecoration: "none" }}
            >
              <LinkedInIcon />
            </Link>
            <Link
              href="#"
              aria-label="Twitter / X"
              style={{ width: 36, height: 36, borderRadius: 999, border: "1px solid rgba(255,255,255,0.18)", color: "rgba(255,255,255,0.7)", display: "inline-flex", alignItems: "center", justifyContent: "center", textDecoration: "none" }}
            >
              <TwitterIcon />
            </Link>
            <Link
              href="#"
              aria-label="Facebook"
              style={{ width: 36, height: 36, borderRadius: 999, border: "1px solid rgba(255,255,255,0.18)", color: "rgba(255,255,255,0.7)", display: "inline-flex", alignItems: "center", justifyContent: "center", textDecoration: "none" }}
            >
              <FacebookIcon />
            </Link>
          </div>
        </div>

        {/* Link columns */}
        {FOOTER_COLS.map((col) => (
          <div key={col.label}>
            <div
              style={{
                font: `600 11px/1 ${BODY_FONT}`,
                letterSpacing: "0.18em",
                color: "#fff",
                marginBottom: 20,
              }}
            >
              {col.label}
            </div>
            <div style={{ display: "grid", gap: 12 }}>
              {col.items.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  style={{
                    font: `14px/1.4 ${BODY_FONT}`,
                    color: "rgba(255,255,255,0.6)",
                    textDecoration: "none",
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Legal-positioning disclosure */}
      <div
        style={{
          paddingTop: 28,
          font: `12px/1.55 ${BODY_FONT}`,
          color: "rgba(255,255,255,0.45)",
          maxWidth: 920,
        }}
      >
        CivilCase is not a law firm and does not provide legal advice or legal representation. We
        publish self-help legal information and document automation tools. Use of this site does
        not create an attorney-client relationship. For legal advice about your specific situation,
        consult a licensed attorney in your state. See our{" "}
        <Link href="/disclaimer" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "underline" }}>full disclaimer</Link>{" "}
        for details.
      </div>

      {/* Bottom strip */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 20,
          paddingTop: 20,
          borderTop: "1px solid rgba(255,255,255,0.08)",
          font: `12px/1.5 ${BODY_FONT}`,
          color: "rgba(255,255,255,0.4)",
        }}
      >
        <div>Copyright © 2026 CivilCase. All Rights Reserved.</div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Link href="/privacy" style={{ color: "inherit", textDecoration: "none" }}>Privacy</Link>
          <span aria-hidden style={{ opacity: 0.4 }}>|</span>
          <Link href="/terms" style={{ color: "inherit", textDecoration: "none" }}>Terms</Link>
          <span aria-hidden style={{ opacity: 0.4 }}>|</span>
          <Link href="/disclaimer" style={{ color: "inherit", textDecoration: "none" }}>Disclaimer</Link>
        </div>
      </div>
    </footer>
  );
}
