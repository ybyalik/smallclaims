import type { Metadata } from "next";
import { notFound } from "next/navigation";
import IssueTemplate from "../../../../../components/issues/IssueTemplate";
import { ONLINE_SELLER_ISSUES, getOnlineSellerIssue } from "../../../../../lib/online-seller-issues";
import { ONLINE_SELLER_CATEGORY } from "../../../../../lib/issues/categories";

export function generateStaticParams() {
  return ONLINE_SELLER_ISSUES.filter((i) => i.ready).map((i) => ({ issue: i.slug }));
}

export const dynamicParams = false;

interface Props {
  params: { issue: string };
}

export function generateMetadata({ params }: Props): Metadata {
  const issue = getOnlineSellerIssue(params.issue);
  if (!issue || !issue.ready) {
    return { robots: { index: false, follow: false } };
  }
  return {
    title: issue.meta.title,
    description: issue.meta.description,
    alternates: { canonical: `/small-claims/sue-seller-${issue.slug}` },
    openGraph: {
      title: `${issue.meta.title} | CivilCase`,
      description: issue.meta.description,
      url: `/small-claims/sue-seller-${issue.slug}`,
      type: "article",
    },
  };
}

export default function OnlineSellerIssuePage({ params }: Props) {
  const issue = getOnlineSellerIssue(params.issue);
  if (!issue || !issue.ready) notFound();

  const siblings = issue.relatedSlugs
    .map((slug) => getOnlineSellerIssue(slug))
    .filter((s): s is NonNullable<typeof s> => s !== null);

  return <IssueTemplate issue={issue} category={ONLINE_SELLER_CATEGORY} siblings={siblings} />;
}
