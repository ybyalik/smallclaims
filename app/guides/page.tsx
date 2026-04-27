import type { Metadata } from "next";
import { availableStateSlugs } from "../../lib/state-data";
import Breadcrumbs from "../../components/Breadcrumbs";
import UsMap from "../../components/widgets/UsMap";
import StateSearch from "../../components/widgets/StateSearch";

export const metadata: Metadata = {
  title: "Small Claims Guides — Every State",
  description:
    "Step-by-step small claims guides for every U.S. state. Filing limits, fees, forms, deadlines, service of process, and post-judgment collection.",
  alternates: { canonical: "/guides" },
};

export default function GuidesIndex() {
  const ready = availableStateSlugs();

  return (
    <main className="wrap" style={{ paddingBottom: 96 }}>
      <Breadcrumbs items={[{ label: "Guides" }]} />
      <header className="guides-hero">
        <span className="eyebrow">Small claims, by state</span>
        <h1>
          Pick your state to <em>get started.</em>
        </h1>
        <p>
          A current, plain-English guide for every U.S. state. Filing limits, deadlines, fees, forms,
          service rules, and how to actually collect after you win.
        </p>
      </header>

      <StateSearch readySlugs={ready} />

      <UsMap readySlugs={ready} />
    </main>
  );
}
