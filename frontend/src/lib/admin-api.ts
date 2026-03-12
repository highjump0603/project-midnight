const API = process.env.NEXT_PUBLIC_API_BASE_URL ?? "/api";

function getToken(): string {
  if (typeof window === "undefined") return "";
  return localStorage.getItem("admin_token") ?? "";
}

function authHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`,
  };
}

// ── Auth ─────────────────────────────────────────────────────────────────────

export async function login(username: string, password: string) {
  const body = new URLSearchParams({ username, password });
  const res = await fetch(`${API}/auth/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });
  if (!res.ok) throw new Error("Invalid credentials");
  const data = await res.json();
  localStorage.setItem("admin_token", data.access_token);
  return data;
}

export function logout() {
  localStorage.removeItem("admin_token");
}

export async function getMe() {
  const res = await fetch(`${API}/auth/me`, { headers: authHeaders() });
  if (!res.ok) throw new Error("Unauthorized");
  return res.json();
}

// ── Projects ─────────────────────────────────────────────────────────────────

export async function adminGetProjects() {
  const res = await fetch(`${API}/projects?limit=100`, { headers: authHeaders() });
  if (!res.ok) throw new Error("Failed to fetch projects");
  return res.json();
}

export async function adminGetProject(slug: string) {
  const res = await fetch(`${API}/projects/${slug}`, { headers: authHeaders() });
  if (!res.ok) throw new Error("Not found");
  return res.json();
}

export async function adminCreateProject(data: Record<string, unknown>) {
  const res = await fetch(`${API}/projects`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail ?? "Failed to create project");
  }
  return res.json();
}

export async function adminUpdateProject(slug: string, data: Record<string, unknown>) {
  const res = await fetch(`${API}/projects/${slug}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail ?? "Failed to update project");
  }
  return res.json();
}

export async function adminDeleteProject(slug: string) {
  const res = await fetch(`${API}/projects/${slug}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error("Failed to delete project");
}

// ── Blog ─────────────────────────────────────────────────────────────────────

export async function adminGetPosts() {
  const res = await fetch(`${API}/blog/admin/posts?limit=100`, { headers: authHeaders() });
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
}

export async function adminGetPost(slug: string) {
  const res = await fetch(`${API}/blog/admin/posts/${slug}`, { headers: authHeaders() });
  if (!res.ok) throw new Error("Not found");
  return res.json();
}

export async function adminCreatePost(data: Record<string, unknown>) {
  const res = await fetch(`${API}/blog`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail ?? "Failed to create post");
  }
  return res.json();
}

export async function adminUpdatePost(slug: string, data: Record<string, unknown>) {
  const res = await fetch(`${API}/blog/${slug}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail ?? "Failed to update post");
  }
  return res.json();
}

export async function adminDeletePost(slug: string) {
  const res = await fetch(`${API}/blog/${slug}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error("Failed to delete post");
}

// ── Contacts ─────────────────────────────────────────────────────────────────

export async function adminGetContacts(unreadOnly = false) {
  const url = `${API}/contact?limit=100${unreadOnly ? "&unread_only=true" : ""}`;
  const res = await fetch(url, { headers: authHeaders() });
  if (!res.ok) throw new Error("Failed to fetch contacts");
  return res.json();
}

export async function adminMarkRead(id: string) {
  const res = await fetch(`${API}/contact/${id}/read`, {
    method: "PATCH",
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error("Failed to mark as read");
  return res.json();
}

export async function adminDeleteContact(id: string) {
  const res = await fetch(`${API}/contact/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error("Failed to delete contact");
}

// ── Settings ─────────────────────────────────────────────────────────────────

export async function adminGetSettings() {
  const res = await fetch(`${API}/settings`, { headers: authHeaders() });
  if (!res.ok) throw new Error("Failed to fetch settings");
  return res.json();
}

export async function adminUpdateSettings(data: Record<string, unknown>) {
  const res = await fetch(`${API}/settings`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update settings");
  return res.json();
}

// ── Stats ────────────────────────────────────────────────────────────────────

export async function adminGetStats() {
  const res = await fetch(`${API}/stats/summary`, { headers: authHeaders() });
  if (!res.ok) throw new Error("Failed to fetch stats");
  return res.json();
}
