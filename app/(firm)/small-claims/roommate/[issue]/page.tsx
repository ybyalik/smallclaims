import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FirmIssueTemplate } from "../../../../../components/firm";
import { getRoommateIssue, ROOMMATE_ISSUES } from "../../../../../lib/roommate-issues";
import { ROOMMATE_CATEGORY } from "../../../../../lib/issues/categories";

export function generateStaticParams() {
  return ROOMMATE_ISSUES.filter((i) => i.ready).map((i) => ({ issue: i.slug }));
}
export const revalidate = 86400;

type Props = { params: { issue: string } };

export function generateMetadata({ params }: Props): Metadata {
  const issue = getRoommateIssue(params.issue);
  if (!issue || !issue.ready) return { robots: { index: false, follow: false } };
  return {
    title: `${issue.meta.title} · CivilCase`,
    description: issue.meta.description,
    alternates: { canonical: `/small-claims/sue-roommate-${issue.slug}` },
  };
}

export default function RoommateIssue2({ params }: Props) {
  const issue = getRoommateIssue(params.issue);
  if (!issue || !issue.ready) notFound();
  const siblings = issue.relatedSlugs
    .map((slug) => getRoommateIssue(slug))
    .filter((s): s is NonNullable<typeof s> => s !== null);
  return <FirmIssueTemplate issue={issue} category={ROOMMATE_CATEGORY} siblings={siblings} />;
}
