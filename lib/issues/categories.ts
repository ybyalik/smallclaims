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

export const CONTRACTOR_CATEGORY: CategoryMeta = {
  hubLabel: "Contractor Disputes",
  hubHref: "/small-claims/contractor",
  urlPrefix: "sue-contractor-",
  defensesTocLabel: "Contractor defenses",
  signatoryLabel: "Homeowner",
  audienceLabel: "homeowners",
  relatedH2Em: "sue your contractor",
};

export const AUTO_CATEGORY: CategoryMeta = {
  hubLabel: "Auto Disputes",
  hubHref: "/small-claims/auto",
  urlPrefix: "sue-auto-",
  defensesTocLabel: "Defendant defenses",
  signatoryLabel: "Owner",
  audienceLabel: "drivers",
  relatedH2Em: "sue over a car",
};

export const NEIGHBOR_CATEGORY: CategoryMeta = {
  hubLabel: "Neighbor Disputes",
  hubHref: "/small-claims/neighbor",
  urlPrefix: "sue-neighbor-",
  defensesTocLabel: "Neighbor defenses",
  signatoryLabel: "Owner",
  audienceLabel: "homeowners",
  relatedH2Em: "sue your neighbor",
};

export const PERSONAL_LOAN_CATEGORY: CategoryMeta = {
  hubLabel: "Personal Loan Disputes",
  hubHref: "/small-claims/personal-loan",
  urlPrefix: "sue-loan-",
  defensesTocLabel: "Borrower defenses",
  signatoryLabel: "Lender",
  audienceLabel: "lenders",
  relatedH2Em: "recover money owed",
};

export const ROOMMATE_CATEGORY: CategoryMeta = {
  hubLabel: "Roommate Disputes",
  hubHref: "/small-claims/roommate",
  urlPrefix: "sue-roommate-",
  defensesTocLabel: "Roommate defenses",
  signatoryLabel: "Roommate",
  audienceLabel: "roommates",
  relatedH2Em: "sue your roommate",
};

export const ONLINE_SELLER_CATEGORY: CategoryMeta = {
  hubLabel: "Online Seller Disputes",
  hubHref: "/small-claims/online-seller",
  urlPrefix: "sue-seller-",
  defensesTocLabel: "Seller defenses",
  signatoryLabel: "Buyer",
  audienceLabel: "buyers",
  relatedH2Em: "sue an online seller",
};

export const REFUND_CATEGORY: CategoryMeta = {
  hubLabel: "Refund Disputes",
  hubHref: "/small-claims/refund",
  urlPrefix: "sue-refund-",
  defensesTocLabel: "Business defenses",
  signatoryLabel: "Customer",
  audienceLabel: "customers",
  relatedH2Em: "get a refund",
};
