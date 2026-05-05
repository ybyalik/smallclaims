import type { Metadata } from "next";
import { notFound } from "next/navigation";
import IssueTemplate from "../../../../../components/issues/IssueTemplate";
import { PERSONAL_LOAN_ISSUES, getPersonalLoanIssue } from "../../../../../lib/personal-loan-issues";
import { PERSONAL_LOAN_CATEGORY } from "../../../../../lib/issues/categories";

export function generateStaticParams() {
  return PERSONAL_LOAN_ISSUES.filter((i) => i.ready).map((i) => ({ issue: i.slug }));
}

export const dynamicParams = false;

interface Props {
  params: { issue: string };
}

export function generateMetadata({ params }: Props): Metadata {
  const issue = getPersonalLoanIssue(params.issue);
  if (!issue || !issue.ready) {
    return { robots: { index: false, follow: false } };
  }
  return {
    title: issue.meta.title,
    description: issue.meta.description,
    alternates: { canonical: `/small-claims/sue-loan-${issue.slug}` },
    openGraph: {
      title: `${issue.meta.title} | CivilCase`,
      description: issue.meta.description,
      url: `/small-claims/sue-loan-${issue.slug}`,
      type: "article",
    },
  };
}

export default function PersonalLoanIssuePage({ params }: Props) {
  const issue = getPersonalLoanIssue(params.issue);
  if (!issue || !issue.ready) notFound();

  const siblings = issue.relatedSlugs
    .map((slug) => getPersonalLoanIssue(slug))
    .filter((s): s is NonNullable<typeof s> => s !== null);

  return <IssueTemplate issue={issue} category={PERSONAL_LOAN_CATEGORY} siblings={siblings} />;
}
