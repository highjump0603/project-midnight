export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  summary: string;
  body: string;
  cover_url: string | null;
  tags: string[];
  reading_time: number;
  is_published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface BlogListResponse {
  items: BlogPost[];
  total: number;
  limit: number;
  offset: number;
}
