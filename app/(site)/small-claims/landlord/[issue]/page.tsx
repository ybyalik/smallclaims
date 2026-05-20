import type { Metadata } from "next";
import { notFound } from "next/navigation";
import IssueTemplate from "../../../../../components/issues/IssueTemplate";
import { ISSUES, getIssue } from "../../../../../lib/landlord-issues";
import { LANDLORD_CATEGORY } from "../../../../../lib/issues/categories";

export function generateStaticParams() {
  return [];
}

export const dynamicParams = true;
export const revalidate = false;

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

  const siblings = issue.relatedSlugs
    .map((slug) => getIssue(slug))
    .filter((s): s is NonNullable<typeof s> => s !== null);

  return <IssueTemplate issue={issue} category={LANDLORD_CATEGORY} siblings={siblings} />;
}
