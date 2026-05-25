import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FirmIssueTemplate } from "../../../../../components/firm";
import { getRefundIssue, REFUND_ISSUES } from "../../../../../lib/refund-issues";
import { REFUND_CATEGORY } from "../../../../../lib/issues/categories";

export function generateStaticParams() {
  return REFUND_ISSUES.filter((i) => i.ready).map((i) => ({ issue: i.slug }));
}
export const revalidate = 86400;

type Props = { params: { issue: string } };

export function generateMetadata({ params }: Props): Metadata {
  const issue = getRefundIssue(params.issue);
  if (!issue || !issue.ready) return { robots: { index: false, follow: false } };
  return {
    title: `${issue.meta.title} · CivilCase`,
    description: issue.meta.description,
    alternates: { canonical: `/small-claims/sue-refund-${issue.slug}` },
  };
}

export default function RefundIssue2({ params }: Props) {
  const issue = getRefundIssue(params.issue);
  if (!issue || !issue.ready) notFound();
  const siblings = issue.relatedSlugs
    .map((slug) => getRefundIssue(slug))
    .filter((s): s is NonNullable<typeof s> => s !== null);
  return <FirmIssueTemplate issue={issue} category={REFUND_CATEGORY} siblings={siblings} />;
}
