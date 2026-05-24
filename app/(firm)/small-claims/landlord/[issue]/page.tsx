import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FirmIssueTemplate } from "../../../../../components/firm";
import { getIssue } from "../../../../../lib/landlord-issues";
import { LANDLORD_CATEGORY } from "../../../../../lib/issues/categories";

// Layout calls Supabase auth via cookies() so this route can't be
// statically generated; ISR with revalidate=false caused 500s.
export const dynamic = "force-dynamic";

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
