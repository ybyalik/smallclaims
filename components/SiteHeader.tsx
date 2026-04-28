import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="nav wrap">
      <Link className="brand" href="/" aria-label="CivilCase home">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/civilcase-logo.webp"
          alt="CivilCase"
          width={600}
          height={204}
          className="brand-logo"
        />
      </Link>
      <nav className="nav-links">
        <Link href="/#how">How it works</Link>
        <Link href="/#do">What we do</Link>
        <Link href="/guides">Guides</Link>
        <Link href="/#faq">FAQ</Link>
      </nav>
      <div className="nav-cta">
        <Link className="btn btn-cream btn-sm" href="/login">
          Sign in
        </Link>
        <Link className="btn btn-dark btn-sm" href="/signup?next=/dashboard/cases/new">
          Get Started
        </Link>
      </div>
    </header>
  );
}
