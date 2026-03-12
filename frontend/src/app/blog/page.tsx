import type { Metadata } from "next";
import { headers } from "next/headers";
import { getBlogPosts } from "@/lib/api";
import BlogList from "@/components/blog/BlogList";
import SectionHeading from "@/components/ui/SectionHeading";
import type { BlogPost } from "@/types/blog";
import { createMetadata } from "@/lib/seo";
import { getThemeFromHost } from "@/lib/theme";
import HjBlogPage from "@/components/highjump/pages/BlogPage";

export const metadata: Metadata = createMetadata({
  title: "Blog",
  description:
    "Read technical notes on software engineering, architecture, product building, and lessons learned from shipping projects.",
  path: "/blog",
  keywords: ["engineering blog", "software architecture", "technical writing"],
});

export const revalidate = 1800;

export default async function BlogPage() {
  const headersList = await headers();
  const host = headersList.get("host") ?? "";
  const theme = getThemeFromHost(host);

  if (theme === "highjump") return <HjBlogPage />;

  let posts: BlogPost[] = [];
  try {
    const res = await getBlogPosts({ limit: 50 });
    posts = res.items;
  } catch {
    // show empty state
  }

  return (
    <main className="section-padding">
      <div className="section-container">
        <SectionHeading
          label="// blog"
          title="All Posts"
          description="Writing about software engineering, architecture patterns, and things I learn along the way."
          className="mb-12"
        />
        <BlogList posts={posts} />
      </div>
    </main>
  );
}
