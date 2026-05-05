import type { Metadata } from "next";
import { notFound } from "next/navigation";
import IssueTemplate from "../../../../../components/issues/IssueTemplate";
import { NEIGHBOR_ISSUES, getNeighborIssue } from "../../../../../lib/neighbor-issues";
import { NEIGHBOR_CATEGORY } from "../../../../../lib/issues/categories";

export function generateStaticParams() {
  return NEIGHBOR_ISSUES.filter((i) => i.ready).map((i) => ({ issue: i.slug }));
}

export const dynamicParams = false;

interface Props {
  params: { issue: string };
}

export function generateMetadata({ params }: Props): Metadata {
  const issue = getNeighborIssue(params.issue);
  if (!issue || !issue.ready) {
    return { robots: { index: false, follow: false } };
  }
  return {
    title: issue.meta.title,
    description: issue.meta.description,
    alternates: { canonical: `/small-claims/sue-neighbor-${issue.slug}` },
    openGraph: {
      title: `${issue.meta.title} | CivilCase`,
      description: issue.meta.description,
      url: `/small-claims/sue-neighbor-${issue.slug}`,
      type: "article",
    },
  };
}

export default function NeighborIssuePage({ params }: Props) {
  const issue = getNeighborIssue(params.issue);
  if (!issue || !issue.ready) notFound();

  const siblings = issue.relatedSlugs
    .map((slug) => getNeighborIssue(slug))
    .filter((s): s is NonNullable<typeof s> => s !== null);

  return <IssueTemplate issue={issue} category={NEIGHBOR_CATEGORY} siblings={siblings} />;
}
