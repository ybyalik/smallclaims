import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FirmIssueTemplate } from "../../../../../components/firm";
import { getIssue } from "../../../../../lib/landlord-issues";
import { LANDLORD_CATEGORY } from "../../../../../lib/issues/categories";

export function generateStaticParams() { return []; }
export const dynamicParams = true;
export const revalidate = false;

type Props = { params: { issue: string } };

export function generateMetadata({ params }: Props): Metadata {
  const issue = getIssue(params.issue);
  if (!issue || !issue.ready) return { robots: { index: false, follow: false } };
  return {
    title: `${issue.meta.title} · CivilCase`,
    description: issue.meta.description,
    alternates: { canonical: `/small-claims/sue-landlord-${issue.slug}` },
  };
}

export default function LandlordIssue2({ params }: Props) {
  const issue = getIssue(params.issue);
  if (!issue || !issue.ready) notFound();
  const siblings = issue.relatedSlugs
    .map((slug) => getIssue(slug))
    .filter((s): s is NonNullable<typeof s> => s !== null);
  return <FirmIssueTemplate issue={issue} category={LANDLORD_CATEGORY} siblings={siblings} />;
}
