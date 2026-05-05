import type { Metadata } from "next";
import { notFound } from "next/navigation";
import IssueTemplate from "../../../../../components/issues/IssueTemplate";
import { EMPLOYER_ISSUES, getEmployerIssue } from "../../../../../lib/employer-issues";
import { EMPLOYER_CATEGORY } from "../../../../../lib/issues/categories";

export function generateStaticParams() {
  return EMPLOYER_ISSUES.filter((i) => i.ready).map((i) => ({ issue: i.slug }));
}

export const dynamicParams = false;

interface Props {
  params: { issue: string };
}

export function generateMetadata({ params }: Props): Metadata {
  const issue = getEmployerIssue(params.issue);
  if (!issue || !issue.ready) {
    return { robots: { index: false, follow: false } };
  }
  return {
    title: issue.meta.title,
    description: issue.meta.description,
    alternates: { canonical: `/small-claims/sue-employer-${issue.slug}` },
    openGraph: {
      title: `${issue.meta.title} | CivilCase`,
      description: issue.meta.description,
      url: `/small-claims/sue-employer-${issue.slug}`,
      type: "article",
    },
  };
}

export default function EmployerIssuePage({ params }: Props) {
  const issue = getEmployerIssue(params.issue);
  if (!issue || !issue.ready) notFound();

  const siblings = issue.relatedSlugs
    .map((slug) => getEmployerIssue(slug))
    .filter((s): s is NonNullable<typeof s> => s !== null);

  return <IssueTemplate issue={issue} category={EMPLOYER_CATEGORY} siblings={siblings} />;
}
