import type { Metadata } from "next";
import { getBlogPosts } from "@/lib/api";
import BlogList from "@/components/blog/BlogList";
import SectionHeading from "@/components/ui/SectionHeading";
import type { BlogPost } from "@/types/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Thoughts on software, architecture, and the craft of building.",
};

export const revalidate = 1800;

export default async function BlogPage() {
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
