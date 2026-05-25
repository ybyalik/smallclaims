import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FirmIssueTemplate } from "../../../../../components/firm";
import { getNeighborIssue, NEIGHBOR_ISSUES } from "../../../../../lib/neighbor-issues";
import { NEIGHBOR_CATEGORY } from "../../../../../lib/issues/categories";

export function generateStaticParams() {
  return NEIGHBOR_ISSUES.filter((i) => i.ready).map((i) => ({ issue: i.slug }));
}
export const revalidate = 86400;

type Props = { params: { issue: string } };

export function generateMetadata({ params }: Props): Metadata {
  const issue = getNeighborIssue(params.issue);
  if (!issue || !issue.ready) return { robots: { index: false, follow: false } };
  return {
    title: `${issue.meta.title} · CivilCase`,
    description: issue.meta.description,
    alternates: { canonical: `/small-claims/sue-neighbor-${issue.slug}` },
  };
}

export default function NeighborIssue2({ params }: Props) {
  const issue = getNeighborIssue(params.issue);
  if (!issue || !issue.ready) notFound();
  const siblings = issue.relatedSlugs
    .map((slug) => getNeighborIssue(slug))
    .filter((s): s is NonNullable<typeof s> => s !== null);
  return <FirmIssueTemplate issue={issue} category={NEIGHBOR_CATEGORY} siblings={siblings} />;
}
