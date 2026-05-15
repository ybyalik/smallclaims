import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";

// The `site-page` wrapper class scopes marketing-only bare-element CSS
// (e.g. the giant section padding in globals.css) to this route group.
// App pages outside (site) don't inherit those styles, so adding <section>
// or <footer> elements in dashboard/checkout pages won't blow up the layout.
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="site-page">
      <SiteHeader />
      {children}
      <SiteFooter />
    </div>
  );
}
