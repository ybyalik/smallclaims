import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="nav wrap">
      <Link className="brand" href="/">
        <span className="brand-mark">C</span>CivilCase
      </Link>
      <nav className="nav-links">
        <Link href="/#how">How it works</Link>
        <Link href="/#do">What we do</Link>
        <Link href="/guides">Guides</Link>
        <Link href="/#faq">FAQ</Link>
      </nav>
      <div className="nav-cta">
        <a className="btn btn-cream btn-sm" href="#">
          Sign in
        </a>
        <a className="btn btn-dark btn-sm" href="#">
          Check Your Case
        </a>
      </div>
    </header>
  );
}
