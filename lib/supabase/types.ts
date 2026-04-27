// Hand-written types for our Supabase schema.
// (Could be generated via supabase gen types, but for one table it's fine to write.)

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

export interface Database {
  public: {
    Tables: {
      blog_posts: {
        Row: BlogPost;
        Insert: BlogPostInsert;
        Update: BlogPostUpdate;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
