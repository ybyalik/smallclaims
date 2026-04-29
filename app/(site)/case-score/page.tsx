import type { Metadata } from "next";
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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "CivilCase Case-Score",
  url: "https://civilcase.com/case-score",
  applicationCategory: "LegalService",
  description:
    "Free case-strength evaluation for small-claims and civil disputes. Returns a 0-100 score, statute-of-limitations deadline, and a recommended next step.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  publisher: { "@type": "Organization", name: "CivilCase" },
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
      <QuizForm states={STATES} stateFacts={facts} />
    </>
  );
}
