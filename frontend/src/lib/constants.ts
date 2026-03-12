// Server-side: use internal URL directly (avoids external HTTPS round-trip)
// Client-side: API_INTERNAL_URL is undefined, falls back to public URL
export const API_BASE_URL =
  process.env.API_INTERNAL_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "http://localhost:8000/api";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://project-midnight.dev";

export const SITE_NAME =
  process.env.NEXT_PUBLIC_SITE_NAME || "Project Midnight";
