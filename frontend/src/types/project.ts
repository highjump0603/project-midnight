export interface Project {
  id: string;
  slug: string;
  title: string;
  summary: string;
  description: string;
  cover_url: string | null;
  demo_url: string | null;
  repo_url: string | null;
  tech_tags: string[];
  is_featured: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface ProjectListResponse {
  items: Project[];
  total: number;
  limit: number;
  offset: number;
}
