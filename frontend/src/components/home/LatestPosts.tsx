import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getBlogPosts } from "@/lib/api";
import BlogList from "@/components/blog/BlogList";
import SectionHeading from "@/components/ui/SectionHeading";
import type { BlogPost } from "@/types/blog";

export default async function LatestPosts() {
  let posts: BlogPost[] = [];
  try {
    const res = await getBlogPosts({ limit: 4 });
    posts = res.items;
  } catch {
    // Backend not running — show empty state
  }

  return (
    <section className="section-padding bg-midnight-950/60">
      <div className="section-container">
        <div className="flex items-end justify-between mb-12 gap-4 flex-wrap">
          <SectionHeading
            label="// blog"
            title="최신 글"
            description="소프트웨어, 아키텍처, 그리고 만드는 것에 대한 이야기."
          />
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 font-mono text-sm text-star-blue hover:text-star-blue/80 transition-colors shrink-0"
          >
            전체 글
            <ArrowRight size={14} />
          </Link>
        </div>
        <BlogList posts={posts} />
      </div>
    </section>
  );
}
