import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FirmIssueTemplate } from "../../../../../components/firm";
import { getEmployerIssue, EMPLOYER_ISSUES } from "../../../../../lib/employer-issues";
import { EMPLOYER_CATEGORY } from "../../../../../lib/issues/categories";

export function generateStaticParams() {
  return EMPLOYER_ISSUES.filter((i) => i.ready).map((i) => ({ issue: i.slug }));
}
export const revalidate = 86400;

type Props = { params: { issue: string } };

export function generateMetadata({ params }: Props): Metadata {
  const issue = getEmployerIssue(params.issue);
  if (!issue || !issue.ready) return { robots: { index: false, follow: false } };
  return {
    title: `${issue.meta.title} · CivilCase`,
    description: issue.meta.description,
    alternates: { canonical: `/small-claims/sue-employer-${issue.slug}` },
  };
}

export default function EmployerIssue2({ params }: Props) {
  const issue = getEmployerIssue(params.issue);
  if (!issue || !issue.ready) notFound();
  const siblings = issue.relatedSlugs
    .map((slug) => getEmployerIssue(slug))
    .filter((s): s is NonNullable<typeof s> => s !== null);
  return <FirmIssueTemplate issue={issue} category={EMPLOYER_CATEGORY} siblings={siblings} />;
}
