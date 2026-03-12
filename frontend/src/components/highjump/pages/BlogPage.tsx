import { getBlogPosts } from "@/lib/api";
import type { BlogPost } from "@/types/blog";
import HjBlogCard from "@/components/highjump/BlogCard";

export default async function HjBlogPage() {
  let posts: BlogPost[] = [];
  try {
    const res = await getBlogPosts({ limit: 50 });
    posts = res.items;
  } catch {
    // show empty state
  }

  return (
    <main className="bg-white min-h-screen">
      <div className="section-container py-20 max-w-3xl">
        {/* Header */}
        <div className="mb-2">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-hj-muted mb-1">
            Writing
          </p>
          <h1 className="font-display font-black text-[#09090B] leading-tight"
            style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)" }}
          >
            Blog
          </h1>
          <p className="text-hj-secondary text-base mt-3 max-w-md">
            소프트웨어, 아키텍처, 그리고 만드는 것에 대한 이야기.
          </p>
        </div>

        <div className="h-px bg-hj-border mt-8 mb-0" />

        {posts.length === 0 ? (
          <div className="py-20 text-center">
            <p className="font-mono text-sm text-hj-muted">No posts yet.</p>
          </div>
        ) : (
          <div>
            {posts.map((post) => (
              <HjBlogCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
