import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FirmIssueTemplate } from "../../../../../components/firm";
import { getPersonalLoanIssue } from "../../../../../lib/personal-loan-issues";
import { PERSONAL_LOAN_CATEGORY } from "../../../../../lib/issues/categories";

export function generateStaticParams() { return []; }
export const dynamicParams = true;
export const revalidate = false;

type Props = { params: { issue: string } };

export function generateMetadata({ params }: Props): Metadata {
  const issue = getPersonalLoanIssue(params.issue);
  if (!issue || !issue.ready) return { robots: { index: false, follow: false } };
  return {
    title: `${issue.meta.title} · CivilCase`,
    description: issue.meta.description,
    alternates: { canonical: `/small-claims2/personal-loan/${issue.slug}` },
    robots: { index: false, follow: false },
  };
}

export default function PersonalLoanIssue2({ params }: Props) {
  const issue = getPersonalLoanIssue(params.issue);
  if (!issue || !issue.ready) notFound();
  const siblings = issue.relatedSlugs
    .map((slug) => getPersonalLoanIssue(slug))
    .filter((s): s is NonNullable<typeof s> => s !== null);
  return <FirmIssueTemplate issue={issue} category={PERSONAL_LOAN_CATEGORY} siblings={siblings} />;
}
