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

export const dynamic = "force-dynamic";

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
        <div className="flex items-end justify-between mb-12 gap-4">
          <SectionHeading
            label="// blog"
            title="블로그"
            description="소프트웨어 개발, 아키텍처, 그리고 배운 것들을 기록합니다."
          />
          {posts.length > 0 && (
            <span className="font-mono text-xs text-silver-500 shrink-0 pb-1">
              {posts.length}개
            </span>
          )}
        </div>
        <BlogList posts={posts} />
      </div>
    </main>
  );
}
