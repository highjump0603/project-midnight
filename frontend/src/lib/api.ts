import { API_BASE_URL } from "@/lib/constants";
import type { Project, ProjectListResponse } from "@/types/project";
import type { BlogPost, BlogListResponse } from "@/types/blog";
import type { ContactFormData, ContactResponse } from "@/types/contact";

async function apiFetch<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const url = `${API_BASE_URL}${path}`;
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(error.detail || `API error: ${res.status}`);
  }

  return res.json();
}

// ─── Projects ────────────────────────────────────────────────────────────────

export async function getProjects(params?: {
  featured?: boolean;
  tag?: string;
  limit?: number;
  offset?: number;
}): Promise<ProjectListResponse> {
  const query = new URLSearchParams();
  if (params?.featured !== undefined)
    query.set("featured", String(params.featured));
  if (params?.tag) query.set("tag", params.tag);
  if (params?.limit) query.set("limit", String(params.limit));
  if (params?.offset) query.set("offset", String(params.offset));

  const qs = query.toString() ? `?${query}` : "";
  return apiFetch<ProjectListResponse>(`/projects${qs}`, {
    next: { revalidate: 3600 },
  });
}

export async function getProject(slug: string): Promise<Project> {
  return apiFetch<Project>(`/projects/${slug}`, {
    next: { revalidate: 3600 },
  });
}

// ─── Blog ─────────────────────────────────────────────────────────────────────

export async function getBlogPosts(params?: {
  tag?: string;
  limit?: number;
  offset?: number;
}): Promise<BlogListResponse> {
  const query = new URLSearchParams();
  if (params?.tag) query.set("tag", params.tag);
  if (params?.limit) query.set("limit", String(params.limit));
  if (params?.offset) query.set("offset", String(params.offset));

  const qs = query.toString() ? `?${query}` : "";
  return apiFetch<BlogListResponse>(`/blog${qs}`, {
    next: { revalidate: 1800 },
  });
}

export async function getBlogPost(slug: string): Promise<BlogPost> {
  return apiFetch<BlogPost>(`/blog/${slug}`, {
    next: { revalidate: 1800 },
  });
}

// ─── Contact ─────────────────────────────────────────────────────────────────

export async function submitContact(
  data: ContactFormData
): Promise<ContactResponse> {
  return apiFetch<ContactResponse>("/contact", {
    method: "POST",
    body: JSON.stringify(data),
    cache: "no-store",
  });
}

// ─── Stats ───────────────────────────────────────────────────────────────────

export async function recordView(pagePath: string, slug?: string): Promise<void> {
  await apiFetch("/stats/view", {
    method: "POST",
    body: JSON.stringify({ page_path: pagePath, slug }),
    cache: "no-store",
  }).catch(() => {
    // Silently fail — view count is non-critical
  });
}

export async function getViewCount(
  pagePath: string
): Promise<{ page_path: string; total_views: number }> {
  const encoded = encodeURIComponent(pagePath);
  return apiFetch(`/stats/views/${encoded}`, {
    next: { revalidate: 900 },
  });
}
