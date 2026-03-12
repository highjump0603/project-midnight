import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getBlogPosts } from "@/lib/api";
import PostGallery from "../blog/PostGallery";
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
    <section className="relative overflow-hidden bg-midnight-900 border-t border-midnight-600/30">
      {/* 배경 글로우 */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-px w-[480px] -translate-x-1/2 bg-gradient-to-r from-transparent via-star-blue/30 to-transparent" />
        <div className="absolute left-1/2 top-0 h-64 w-[600px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(79,195,247,0.05)_0%,transparent_70%)]" />
      </div>

      <div className="relative section-container py-24 md:py-32">
        {/* 헤더 */}
        <div className="mb-14 flex flex-col items-center gap-3 text-center">
          <span className="font-mono text-xs tracking-[0.2em] text-star-blue/70 uppercase">
            // blog
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-silver-50 drop-shadow-[0_0_18px_rgba(79,195,247,0.2)]">
            최신 글
          </h2>
          <div className="mt-1 h-px w-16 bg-gradient-to-r from-transparent via-star-blue/50 to-transparent" />
        </div>

        <PostGallery posts={posts} />

        {posts.length > 0 && (
          <div className="mt-12 flex justify-center">
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 rounded-lg border border-star-blue/30 bg-star-blue/5 px-6 py-2.5 font-mono text-sm text-star-blue/80 transition-all duration-200 hover:border-star-blue/60 hover:bg-star-blue/10 hover:shadow-star-glow"
            >
              전체 보기
              <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
