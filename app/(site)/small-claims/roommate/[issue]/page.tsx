import type { Metadata } from "next";
import { notFound } from "next/navigation";
import IssueTemplate from "../../../../../components/issues/IssueTemplate";
import { ROOMMATE_ISSUES, getRoommateIssue } from "../../../../../lib/roommate-issues";
import { ROOMMATE_CATEGORY } from "../../../../../lib/issues/categories";

export function generateStaticParams() {
  return ROOMMATE_ISSUES.filter((i) => i.ready).map((i) => ({ issue: i.slug }));
}

export const dynamicParams = false;

interface Props {
  params: { issue: string };
}

export function generateMetadata({ params }: Props): Metadata {
  const issue = getRoommateIssue(params.issue);
  if (!issue || !issue.ready) {
    return { robots: { index: false, follow: false } };
  }
  return {
    title: issue.meta.title,
    description: issue.meta.description,
    alternates: { canonical: `/small-claims/sue-roommate-${issue.slug}` },
    openGraph: {
      title: `${issue.meta.title} | CivilCase`,
      description: issue.meta.description,
      url: `/small-claims/sue-roommate-${issue.slug}`,
      type: "article",
    },
  };
}

export default function RoommateIssuePage({ params }: Props) {
  const issue = getRoommateIssue(params.issue);
  if (!issue || !issue.ready) notFound();

  const siblings = issue.relatedSlugs
    .map((slug) => getRoommateIssue(slug))
    .filter((s): s is NonNullable<typeof s> => s !== null);

  return <IssueTemplate issue={issue} category={ROOMMATE_CATEGORY} siblings={siblings} />;
}
