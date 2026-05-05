import type { Metadata } from "next";
import { notFound } from "next/navigation";
import IssueTemplate from "../../../../../components/issues/IssueTemplate";
import { CONTRACTOR_ISSUES, getContractorIssue } from "../../../../../lib/contractor-issues";
import { CONTRACTOR_CATEGORY } from "../../../../../lib/issues/categories";

export function generateStaticParams() {
  return CONTRACTOR_ISSUES.filter((i) => i.ready).map((i) => ({ issue: i.slug }));
}

export const dynamicParams = false;

interface Props {
  params: { issue: string };
}

export function generateMetadata({ params }: Props): Metadata {
  const issue = getContractorIssue(params.issue);
  if (!issue || !issue.ready) {
    return { robots: { index: false, follow: false } };
  }
  return {
    title: issue.meta.title,
    description: issue.meta.description,
    alternates: { canonical: `/small-claims/sue-contractor-${issue.slug}` },
    openGraph: {
      title: `${issue.meta.title} | CivilCase`,
      description: issue.meta.description,
      url: `/small-claims/sue-contractor-${issue.slug}`,
      type: "article",
    },
  };
}

export default function ContractorIssuePage({ params }: Props) {
  const issue = getContractorIssue(params.issue);
  if (!issue || !issue.ready) notFound();

  const siblings = issue.relatedSlugs
    .map((slug) => getContractorIssue(slug))
    .filter((s): s is NonNullable<typeof s> => s !== null);

  return <IssueTemplate issue={issue} category={CONTRACTOR_CATEGORY} siblings={siblings} />;
}
