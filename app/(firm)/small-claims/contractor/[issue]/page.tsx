import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FirmIssueTemplate } from "../../../../../components/firm";
import { getContractorIssue, CONTRACTOR_ISSUES } from "../../../../../lib/contractor-issues";
import { CONTRACTOR_CATEGORY } from "../../../../../lib/issues/categories";

export function generateStaticParams() {
  return CONTRACTOR_ISSUES.filter((i) => i.ready).map((i) => ({ issue: i.slug }));
}
export const revalidate = 86400;

type Props = { params: { issue: string } };

export function generateMetadata({ params }: Props): Metadata {
  const issue = getContractorIssue(params.issue);
  if (!issue || !issue.ready) return { robots: { index: false, follow: false } };
  return {
    title: `${issue.meta.title} · CivilCase`,
    description: issue.meta.description,
    alternates: { canonical: `/small-claims/sue-contractor-${issue.slug}` },
  };
}

export default function ContractorIssue2({ params }: Props) {
  const issue = getContractorIssue(params.issue);
  if (!issue || !issue.ready) notFound();
  const siblings = issue.relatedSlugs
    .map((slug) => getContractorIssue(slug))
    .filter((s): s is NonNullable<typeof s> => s !== null);
  return <FirmIssueTemplate issue={issue} category={CONTRACTOR_CATEGORY} siblings={siblings} />;
}
