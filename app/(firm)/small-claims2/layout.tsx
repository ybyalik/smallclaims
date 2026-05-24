// Imports the legacy small-claims CSS so the state-guide and category-issue
// pages (which reuse the existing IssueTemplate / StateGuidePage components)
// render with their full bespoke styling inside the firm route group.
import "../../(site)/small-claims/small-claims.css";

export default function SmallClaims2Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
