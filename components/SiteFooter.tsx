import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-brand">
            <Link className="brand" href="/" aria-label="CivilCase home">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/civilcase-logo.webp"
                alt="CivilCase"
                width={600}
                height={198}
                className="brand-logo brand-logo-foot"
              />
            </Link>
            <p style={{ marginTop: 14 }}>
              Resolve small claims and civil disputes, from demand to resolution.
            </p>
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
            <Link href="/editorial-policy">Editorial policy</Link>
          </div>
          <div className="foot-col">
            <h5>Legal</h5>
            <Link href="/disclaimer">Disclaimer</Link>
            <a href="mailto:legal@civilcase.com">legal@civilcase.com</a>
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
          <span>© 2026 CivilCase, PBC.</span>
          <span>Made for the 87% of disputes that never see a lawyer.</span>
        </div>
      </div>
    </footer>
  );
}
