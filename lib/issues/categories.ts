// Category-level metadata for the shared IssueTemplate.
// Each issue category (Landlord, Employer, ...) supplies its own labels and URL
// prefix so the template can render the same layout for any category.

export interface CategoryMeta {
  // breadcrumb + eyebrow label, e.g. "Landlord disputes"
  hubLabel: string;
  // hub URL, e.g. "/small-claims/landlord"
  hubHref: string;
  // URL prefix for individual issue pages, e.g. "sue-landlord-"
  urlPrefix: string;
  // TOC label for the defenses section, e.g. "Landlord defenses"
  defensesTocLabel: string;
  // signature line on the example evidence doc, e.g. "Tenant"
  signatoryLabel: string;
  // group noun for the FAQ lede, e.g. "tenants"
  audienceLabel: string;
  // h2 italic phrase for the related-issues section, e.g. "sue your landlord"
  relatedH2Em: string;
}

export const LANDLORD_CATEGORY: CategoryMeta = {
  hubLabel: "Landlord Disputes",
  hubHref: "/small-claims/landlord",
  urlPrefix: "sue-landlord-",
  defensesTocLabel: "Landlord defenses",
  signatoryLabel: "Tenant",
  audienceLabel: "tenants",
  relatedH2Em: "sue your landlord",
};

export const EMPLOYER_CATEGORY: CategoryMeta = {
  hubLabel: "Employer Disputes",
  hubHref: "/small-claims/employer",
  urlPrefix: "sue-employer-",
  defensesTocLabel: "Employer defenses",
  signatoryLabel: "Employee",
  audienceLabel: "workers",
  relatedH2Em: "sue your employer",
};
