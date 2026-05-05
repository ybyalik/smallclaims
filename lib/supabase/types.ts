// Hand-written types for our Supabase schema.

// ============================================================================
// Blog (existing)
// ============================================================================

export type BlogPostStatus = "draft" | "published";

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content_json: unknown | null;
  content_html: string | null;
  cover_image_url: string | null;
  status: BlogPostStatus;
  author_id: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface BlogPostInsert {
  slug: string;
  title: string;
  excerpt?: string | null;
  content_json?: unknown | null;
  content_html?: string | null;
  cover_image_url?: string | null;
  status?: BlogPostStatus;
  author_id?: string | null;
  published_at?: string | null;
}

export interface BlogPostUpdate {
  slug?: string;
  title?: string;
  excerpt?: string | null;
  content_json?: unknown | null;
  content_html?: string | null;
  cover_image_url?: string | null;
  status?: BlogPostStatus;
  published_at?: string | null;
}

// ============================================================================
// Case lifecycle (CivilCase MVP)
// ============================================================================

export type CaseStatus =
  | "draft"
  | "demand_drafted"
  | "demand_paid"
  | "demand_sent"
  | "demand_delivered"
  | "demand_returned"
  | "demand_responded"
  | "filing_prepared"
  | "filed"
  | "service_arranged"
  | "served"
  | "hearing_scheduled"
  | "judgment_entered"
  | "collection"
  | "closed"
  | "settled";

export type DisputeType =
  // Original values (pre-Phase-1)
  | "unpaid_debt"
  | "security_deposit"
  | "property_damage"
  | "services_not_rendered"
  | "goods_not_delivered"
  | "other"
  // Added in migration 0003 to match the 15-category spec
  | "breach_of_contract"
  | "defective_product_or_service"
  | "unpaid_rent_or_deposit"
  | "tenant_landlord"
  | "auto_accident_or_repair"
  | "stolen_or_damaged_property"
  | "poor_construction"
  | "broken_verbal_promise"
  | "personal_injury"
  | "defamation"
  | "consumer_protection"
  | "ip_or_copyright";

export interface PostalAddress {
  line1: string;
  line2?: string | null;
  city: string;
  state: string; // 2-letter
  zip: string;
}

export interface Case {
  id: string;
  // Nullable on anonymous drafts. Filled when user signs up at Phase 5.
  owner_user_id: string | null;
  // Nullable when claimed. Set on anonymous drafts to scope reads/writes
  // before signup.
  cookie_session_id: string | null;
  status: CaseStatus;
  state: string; // 2-letter
  county: string | null;
  dispute_type: DisputeType;
  amount_cents: number;
  currency: string;
  // Nullable during draft. Required server-side at the relevant wizard step.
  plaintiff_name: string | null;
  plaintiff_address: PostalAddress | null;
  plaintiff_email: string | null;
  plaintiff_phone: string | null;
  defendant_name: string | null;
  defendant_address: PostalAddress | null;
  defendant_email: string | null;
  defendant_phone: string | null;
  intake_answers: Record<string, unknown> | null;
  intake_version: number;
  facts_narrative: string | null;
  case_number: string | null;
  filing_court_id: string | null;
  hearing_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface CaseInsert {
  owner_user_id?: string | null;
  cookie_session_id?: string | null;
  status?: CaseStatus;
  state: string;
  county?: string | null;
  dispute_type: DisputeType;
  amount_cents: number;
  currency?: string;
  plaintiff_name?: string | null;
  plaintiff_address?: PostalAddress | null;
  plaintiff_email?: string | null;
  plaintiff_phone?: string | null;
  defendant_name?: string | null;
  defendant_address?: PostalAddress | null;
  defendant_email?: string | null;
  defendant_phone?: string | null;
  intake_answers?: Record<string, unknown> | null;
  intake_version?: number;
  facts_narrative?: string | null;
}

export type CaseUpdate = Partial<Omit<CaseInsert, "owner_user_id">>;

// ============================================================================
// Demand letter
// ============================================================================

export type MailStatus =
  | "draft"
  | "queued"
  | "in_transit"
  | "delivered"
  | "returned"
  | "failed";

export interface DemandLetter {
  id: string;
  case_id: string;
  version: number;
  template_key: string;
  body_md: string;
  body_html: string | null;
  cure_period_days: number;
  generated_by: string | null;
  pdf_storage_path: string | null;
  mail_status: MailStatus;
  lob_letter_id: string | null;
  tracking_number: string | null;
  sent_at: string | null;
  delivered_at: string | null;
  returned_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface DemandLetterInsert {
  case_id: string;
  version?: number;
  template_key: string;
  body_md: string;
  body_html?: string | null;
  cure_period_days?: number;
  generated_by?: string | null;
  pdf_storage_path?: string | null;
}

export type DemandLetterUpdate = Partial<Omit<DemandLetterInsert, "case_id">>;

// ============================================================================
// Documents
// ============================================================================

export type DocumentKind =
  | "evidence"
  | "generated_letter"
  | "generated_form"
  | "court_stamped"
  | "receipt"
  | "correspondence"
  | "proof_of_service";

export interface CaseDocument {
  id: string;
  case_id: string;
  uploader_user_id: string | null;
  kind: DocumentKind;
  storage_path: string;
  filename: string;
  mime_type: string | null;
  size_bytes: number | null;
  sha256: string | null;
  notes: string | null;
  created_at: string;
}

export interface CaseDocumentInsert {
  case_id: string;
  uploader_user_id?: string | null;
  kind: DocumentKind;
  storage_path: string;
  filename: string;
  mime_type?: string | null;
  size_bytes?: number | null;
  sha256?: string | null;
  notes?: string | null;
}

// ============================================================================
// Payments
// ============================================================================

export type PaymentStatus = "pending" | "succeeded" | "failed" | "refunded";

export interface Payment {
  id: string;
  case_id: string;
  user_id: string;
  stripe_payment_intent_id: string | null;
  stripe_checkout_session_id: string | null;
  stripe_customer_id: string | null;
  amount_cents: number;
  currency: string;
  status: PaymentStatus;
  product_key: string;
  line_items: Record<string, unknown> | null;
  paid_at: string | null;
  refunded_at: string | null;
  created_at: string;
}

export interface PaymentInsert {
  case_id: string;
  user_id: string;
  stripe_payment_intent_id?: string | null;
  stripe_checkout_session_id?: string | null;
  stripe_customer_id?: string | null;
  amount_cents: number;
  currency?: string;
  status?: PaymentStatus;
  product_key: string;
  line_items?: Record<string, unknown> | null;
}

// ============================================================================
// Audit log
// ============================================================================

export interface AuditLogEntry {
  id: number;
  case_id: string | null;
  actor_user_id: string | null;
  event_type: string;
  entity_type: string | null;
  entity_id: string | null;
  ip: string | null;
  user_agent: string | null;
  request_id: string | null;
  payload: Record<string, unknown> | null;
  occurred_at: string;
}

export interface AuditLogInsert {
  case_id?: string | null;
  actor_user_id?: string | null;
  event_type: string;
  entity_type?: string | null;
  entity_id?: string | null;
  ip?: string | null;
  user_agent?: string | null;
  request_id?: string | null;
  payload?: Record<string, unknown> | null;
}

// ============================================================================
// Stub tables (Phase 2+, schema present but unused)
// ============================================================================

export type ServiceAttemptStatus = "queued" | "attempted" | "succeeded" | "failed";
export type ReviewStatus = "queued" | "in_review" | "completed" | "declined";

export interface CourtForm {
  id: string;
  case_id: string;
  form_code: string;
  schema_version: number;
  field_values: Record<string, unknown> | null;
  rendered_pdf_path: string | null;
  filed_at: string | null;
  efm_envelope_id: string | null;
  created_at: string;
}

export interface ServiceAttempt {
  id: string;
  case_id: string;
  vendor: string;
  vendor_ref: string | null;
  status: ServiceAttemptStatus;
  attempted_at: string | null;
  succeeded_at: string | null;
  proof_doc_id: string | null;
  notes: string | null;
  created_at: string;
}

export interface AttorneyReviewRequest {
  id: string;
  case_id: string;
  requester_user_id: string;
  assigned_attorney_id: string | null;
  status: ReviewStatus;
  requested_at: string;
  completed_at: string | null;
  decision: string | null;
  notes: string | null;
}

// ============================================================================
// Profiles
// ============================================================================

export interface Profile {
  user_id: string;
  full_name: string | null;
  avatar_url: string | null;
  is_admin: boolean;
  stripe_customer_id: string | null;
  notification_preferences: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface ProfileInsert {
  user_id: string;
  full_name?: string | null;
  avatar_url?: string | null;
  is_admin?: boolean;
  stripe_customer_id?: string | null;
  notification_preferences?: Record<string, unknown>;
}

export type ProfileUpdate = Partial<Omit<ProfileInsert, "user_id">>;

// ============================================================================
// Database type for createClient<Database>()
// ============================================================================

export interface Database {
  public: {
    Tables: {
      blog_posts: {
        Row: BlogPost;
        Insert: BlogPostInsert;
        Update: BlogPostUpdate;
        Relationships: [];
      };
      cases: {
        Row: Case;
        Insert: CaseInsert;
        Update: CaseUpdate;
        Relationships: [];
      };
      demand_letters: {
        Row: DemandLetter;
        Insert: DemandLetterInsert;
        Update: DemandLetterUpdate;
        Relationships: [];
      };
      documents: {
        Row: CaseDocument;
        Insert: CaseDocumentInsert;
        Update: Partial<CaseDocumentInsert>;
        Relationships: [];
      };
      payments: {
        Row: Payment;
        Insert: PaymentInsert;
        Update: Partial<PaymentInsert>;
        Relationships: [];
      };
      audit_log: {
        Row: AuditLogEntry;
        Insert: AuditLogInsert;
        Update: Partial<AuditLogInsert>;
        Relationships: [];
      };
      court_forms: {
        Row: CourtForm;
        Insert: Partial<CourtForm>;
        Update: Partial<CourtForm>;
        Relationships: [];
      };
      service_attempts: {
        Row: ServiceAttempt;
        Insert: Partial<ServiceAttempt>;
        Update: Partial<ServiceAttempt>;
        Relationships: [];
      };
      attorney_review_requests: {
        Row: AttorneyReviewRequest;
        Insert: Partial<AttorneyReviewRequest>;
        Update: Partial<AttorneyReviewRequest>;
        Relationships: [];
      };
      profiles: {
        Row: Profile;
        Insert: ProfileInsert;
        Update: ProfileUpdate;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
