import Link from "next/link";
import Image from "next/image";

export default function SiteFooter() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-brand">
            <Link className="brand" href="/" aria-label="CivilCase home">
              <Image
                src="/civilcase-logo.webp"
                alt="CivilCase"
                width={200}
                height={66}
                className="brand-logo brand-logo-foot"
              />
            </Link>
            <p style={{ marginTop: 14 }}>
              Resolve small claims and civil disputes, from demand to resolution.
            </p>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                marginTop: 12,
              }}
            >
              <a
                href="https://www.linkedin.com/company/civilcase/"
                target="_blank"
                rel="nofollow noopener noreferrer"
                aria-label="CivilCase on LinkedIn"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 36,
                  height: 36,
                  borderRadius: 8,
                  color: "inherit",
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/civilcasecom/"
                target="_blank"
                rel="nofollow noopener noreferrer"
                aria-label="CivilCase on Facebook"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 36,
                  height: 36,
                  borderRadius: 8,
                  color: "inherit",
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.408.593 24 1.325 24h11.495v-9.294H9.691v-3.622h3.129V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.407 24 24 23.408 24 22.676V1.325C24 .593 23.407 0 22.675 0z" />
                </svg>
              </a>
              <a
                href="https://x.com/civilcasecom"
                target="_blank"
                rel="nofollow noopener noreferrer"
                aria-label="CivilCase on X"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 36,
                  height: 36,
                  borderRadius: 8,
                  color: "inherit",
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>
          <div className="foot-col">
            <h5>Product</h5>
            <Link href="/demand-letter">Demand letters</Link>
            <Link href="/small-claims">Small claims by state</Link>
            <Link href="/blog">Blog</Link>
          </div>
          <div className="foot-col">
            <h5>Company</h5>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
        <div className="legal-disclaimer">
          <b>CivilCase is not a law firm</b> and does not provide legal advice. The
          information on this site is for general informational purposes and is not a
          substitute for the advice of a licensed attorney. See our{" "}
          <Link href="/disclaimer" style={{ color: "rgba(254, 249, 241, 0.85)", textDecoration: "underline" }}>
            disclaimer
          </Link>
          .
        </div>
        <div className="foot-bottom">
          <span>Copyright © 2026 CivilCase.com. All Rights Reserved.</span>
          <span>
            <Link href="/privacy">Privacy Policy</Link>
            {" | "}
            <Link href="/terms">Terms and Conditions</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
