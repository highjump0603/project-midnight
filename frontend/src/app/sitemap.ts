import type { MetadataRoute } from "next";
import { getBlogPosts, getProjects } from "@/lib/api";
import { siteUrl } from "@/lib/seo";

const staticRoutes = ["", "/about", "/blog", "/contact", "/projects"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: new URL(route || "/", siteUrl).toString(),
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));

  try {
    const [{ items: posts }, { items: projects }] = await Promise.all([
      getBlogPosts({ limit: 100 }),
      getProjects({ limit: 100 }),
    ]);

    return [
      ...entries,
      ...posts.map((post) => ({
        url: new URL(`/blog/${post.slug}`, siteUrl).toString(),
        lastModified: new Date(post.updated_at || post.created_at),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      })),
      ...projects.map((project) => ({
        url: new URL(`/projects/${project.slug}`, siteUrl).toString(),
        lastModified: new Date(project.updated_at || project.created_at),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      })),
    ];
  } catch {
    return entries;
  }
}
