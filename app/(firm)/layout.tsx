import { SiteHeader, SiteFooter } from "../../components/firm";
import "../../components/firm/firm-responsive.css";

// Layout for the (firm) route group. Wraps every page in the firm
// header + footer, replacing the (site) global nav. Fonts (Newsreader,
// Geist) are still loaded by the root layout so they apply here too.
//
// The .firm-page wrapper class scopes the responsive overrides in
// firm-responsive.css so they only apply under this route group.

export default function FirmLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="firm-page">
      <SiteHeader />
      {children}
      <SiteFooter />
    </div>
  );
}
