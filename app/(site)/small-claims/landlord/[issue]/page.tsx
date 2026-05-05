import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LandlordIssueTemplate from "../../../../../components/landlord/LandlordIssueTemplate";
import { ISSUES, getIssue } from "../../../../../lib/landlord-issues";

export function generateStaticParams() {
  return ISSUES.filter((i) => i.ready).map((i) => ({ issue: i.slug }));
}

export const dynamicParams = false;

interface Props {
  params: { issue: string };
}

export function generateMetadata({ params }: Props): Metadata {
  const issue = getIssue(params.issue);
  if (!issue || !issue.ready) {
    return { robots: { index: false, follow: false } };
  }
  return {
    title: issue.meta.title,
    description: issue.meta.description,
    alternates: { canonical: `/small-claims/sue-landlord-${issue.slug}` },
    openGraph: {
      title: `${issue.meta.title} | CivilCase`,
      description: issue.meta.description,
      url: `/small-claims/sue-landlord-${issue.slug}`,
      type: "article",
    },
  };
}

export default function LandlordIssuePage({ params }: Props) {
  const issue = getIssue(params.issue);
  if (!issue || !issue.ready) notFound();
  return <LandlordIssueTemplate issue={issue} />;
}
