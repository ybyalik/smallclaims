import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FirmIssueTemplate } from "../../../../../components/firm";
import { getAutoIssue } from "../../../../../lib/auto-issues";
import { AUTO_CATEGORY } from "../../../../../lib/issues/categories";

export function generateStaticParams() { return []; }
export const dynamicParams = true;
export const revalidate = false;

type Props = { params: { issue: string } };

export function generateMetadata({ params }: Props): Metadata {
  const issue = getAutoIssue(params.issue);
  if (!issue || !issue.ready) return { robots: { index: false, follow: false } };
  return {
    title: `${issue.meta.title} · CivilCase`,
    description: issue.meta.description,
    alternates: { canonical: `/small-claims/sue-auto-${issue.slug}` },
  };
}

export default function AutoIssue2({ params }: Props) {
  const issue = getAutoIssue(params.issue);
  if (!issue || !issue.ready) notFound();
  const siblings = issue.relatedSlugs
    .map((slug) => getAutoIssue(slug))
    .filter((s): s is NonNullable<typeof s> => s !== null);
  return <FirmIssueTemplate issue={issue} category={AUTO_CATEGORY} siblings={siblings} />;
}
