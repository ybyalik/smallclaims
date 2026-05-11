import Link from "next/link";
import type { ReactNode } from "react";

const ICONS: Record<string, ReactNode> = {
  "demand-letter": (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5" />
      <path d="M9 13h6M9 17h4" />
    </svg>
  ),
  "case-score": (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21V5M3 21h18" />
      <path d="M7 17V11M12 17V8M17 17V13" />
    </svg>
  ),
};

const ARROW = (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

interface Props {
  href: string;
  variant: "dark" | "cream" | "green";
  icon?: keyof typeof ICONS;
  children: ReactNode;
}

export default function HeroCta({ href, variant, icon, children }: Props) {
  return (
    <Link href={href} className={`btn btn-${variant} hero-cta-btn`}>
      {icon && <span className="hero-cta-icon" aria-hidden="true">{ICONS[icon]}</span>}
      <span>{children}</span>
      {ARROW}
    </Link>
  );
}
