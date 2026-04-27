import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-brand">
            <Link className="brand" href="/">
              <span className="brand-mark">C</span>CivilCase
            </Link>
            <p style={{ marginTop: 14 }}>
              An operating system for civil disputes. Built for real people, not law firms.
            </p>
          </div>
          <div className="foot-col">
            <h5>Product</h5>
            <a href="#">Case review</a>
            <a href="#">Demand letters</a>
            <a href="#">Filing assistance</a>
            <a href="#">Collections</a>
          </div>
          <div className="foot-col">
            <h5>Resources</h5>
            <Link href="/guides">By state</Link>
            <a href="#">Case studies</a>
            <a href="#">Help center</a>
            <a href="#">Glossary</a>
          </div>
          <div className="foot-col">
            <h5>Company</h5>
            <a href="#">About</a>
            <a href="#">Careers</a>
            <a href="#">Press</a>
            <a href="#">Contact</a>
          </div>
        </div>
        <div className="legal-disclaimer">
          <b>CivilCase is not a law firm</b> and does not provide legal advice. The
          information on this site is for general informational purposes and is not a
          substitute for the advice of a licensed attorney. Use is governed by our{" "}
          <a href="#" style={{ color: "var(--ink-2)", textDecoration: "underline" }}>
            Terms
          </a>{" "}
          and{" "}
          <a href="#" style={{ color: "var(--ink-2)", textDecoration: "underline" }}>
            Privacy
          </a>
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
