import type { Metadata } from "next";
import { Suspense } from "react";
import { availableStateSlugs, loadStateGuide } from "../../../lib/state-data";
import { STATES } from "../../../lib/states";
import type { StateFacts } from "./scoring";
import QuizForm from "./QuizForm";

export const metadata: Metadata = {
  title: "Case-score — should I sue?",
  description:
    "Answer 7 questions and get a free read on whether your dispute is worth pursuing in small claims court. No signup, no email required.",
  alternates: { canonical: "/case-score" },
  openGraph: {
    title: "Case-score — should I sue? | CivilCase",
    description:
      "Free 7-question check. Get a case-strength score, your statute-of-limitations deadline, and a recommended next step.",
    url: "/case-score",
    type: "website",
  },
};

const SITE_URL = "https://civilcase.com";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["WebApplication", "SoftwareApplication"],
  "@id": `${SITE_URL}/case-score#app`,
  name: "CivilCase Case-Score",
  url: `${SITE_URL}/case-score`,
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "LegalService",
  operatingSystem: "Any (web browser)",
  browserRequirements: "Requires JavaScript and a modern browser",
  description:
    "Free case-strength evaluation for small-claims and civil disputes. Answer seven questions, get a 0 to 100 score, your statute-of-limitations deadline, and a recommended next step.",
  featureList: [
    "Case strength scoring (0 to 100)",
    "Statute of limitations deadline lookup by state",
    "Recommended next step (settle, demand letter, file, consult a lawyer)",
    "Coverage for all 50 US states",
  ],
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
  },
  publisher: { "@id": `${SITE_URL}/#organization` },
  isPartOf: { "@id": `${SITE_URL}/#website` },
  inLanguage: "en-US",
};

function pickSol(entries: { id: string; claim: string; years: number }[]) {
  const find = (substr: string) =>
    entries.find((e) => e.id.includes(substr) || e.claim.toLowerCase().includes(substr))?.years;
  return {
    written_contract: find("written") ?? find("contract"),
    oral_contract: find("oral"),
    sale_of_goods: find("ucc") ?? find("goods") ?? find("sale-of-goods"),
    property_damage: find("property"),
    personal_injury: find("personal-injury") ?? find("injury"),
    wages: find("wage") ?? find("unpaid-wages"),
    bad_check: find("bad-check") ?? find("check"),
    fraud: find("fraud"),
  };
}

export default async function CaseScorePage() {
  // Build a quick-facts table from the state guides we have.
  const slugs = availableStateSlugs();
  const facts: Record<string, StateFacts> = {};
  await Promise.all(
    slugs.map(async (slug) => {
      const guide = await loadStateGuide(slug);
      if (!guide) return;
      facts[slug] = {
        name: guide.state,
        cap_individual: guide.limits.individual,
        cap_business: guide.limits.business,
        sol_years: pickSol(guide.statuteOfLimitations.entries),
      };
    }),
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Suspense fallback={null}>
        <QuizForm states={STATES} stateFacts={facts} />
      </Suspense>
    </>
  );
}
