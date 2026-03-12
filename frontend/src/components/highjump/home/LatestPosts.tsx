import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import type { BlogPost } from "@/types/blog";
import { formatDateShort } from "@/lib/utils";

export default function HjLatestPosts({ posts }: { posts: BlogPost[] }) {
  return (
    <section className="bg-hj-bg border-t border-hj-border">
      <div className="section-container py-20">
        {/* Header */}
        <div className="flex items-end justify-between mb-2 gap-4">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-hj-muted mb-1">
              Writing
            </p>
            <h2 className="font-display font-black text-3xl text-[#09090B] leading-tight">
              Latest Posts
            </h2>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 font-mono text-xs text-hj-secondary hover:text-hj-primary transition-colors shrink-0 mb-1"
          >
            View all
            <ArrowUpRight size={13} />
          </Link>
        </div>

        <div className="h-px bg-hj-border mt-6 mb-0" />

        {posts.length === 0 ? (
          <div className="py-16 text-center">
            <p className="font-mono text-sm text-hj-muted">No posts yet.</p>
          </div>
        ) : (
          <div>
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-8 py-6 border-b border-hj-border hover:bg-white/60 transition-colors duration-150 px-1"
              >
                <div className="shrink-0 sm:w-24 sm:pt-0.5">
                  {post.published_at && (
                    <span className="font-mono text-xs text-hj-muted">
                      {formatDateShort(post.published_at)}
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-bold text-[#09090B] mb-1 group-hover:text-hj-primary transition-colors duration-150 line-clamp-1">
                    {post.title}
                  </h3>
                  <p className="text-hj-secondary text-sm line-clamp-1">
                    {post.summary}
                  </p>
                </div>
                <div className="shrink-0 sm:self-start sm:mt-0.5">
                  <span className="inline-flex items-center gap-1 font-mono text-xs text-hj-muted">
                    <Clock size={11} />
                    {post.reading_time}m
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
