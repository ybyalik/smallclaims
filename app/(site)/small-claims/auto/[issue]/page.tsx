import type { Metadata } from "next";
import { notFound } from "next/navigation";
import IssueTemplate from "../../../../../components/issues/IssueTemplate";
import { AUTO_ISSUES, getAutoIssue } from "../../../../../lib/auto-issues";
import { AUTO_CATEGORY } from "../../../../../lib/issues/categories";

export function generateStaticParams() {
  return AUTO_ISSUES.filter((i) => i.ready).map((i) => ({ issue: i.slug }));
}

export const dynamicParams = false;

interface Props {
  params: { issue: string };
}

export function generateMetadata({ params }: Props): Metadata {
  const issue = getAutoIssue(params.issue);
  if (!issue || !issue.ready) {
    return { robots: { index: false, follow: false } };
  }
  return {
    title: issue.meta.title,
    description: issue.meta.description,
    alternates: { canonical: `/small-claims/sue-auto-${issue.slug}` },
    openGraph: {
      title: `${issue.meta.title} | CivilCase`,
      description: issue.meta.description,
      url: `/small-claims/sue-auto-${issue.slug}`,
      type: "article",
    },
  };
}

export default function AutoIssuePage({ params }: Props) {
  const issue = getAutoIssue(params.issue);
  if (!issue || !issue.ready) notFound();

  const siblings = issue.relatedSlugs
    .map((slug) => getAutoIssue(slug))
    .filter((s): s is NonNullable<typeof s> => s !== null);

  return <IssueTemplate issue={issue} category={AUTO_CATEGORY} siblings={siblings} />;
}
