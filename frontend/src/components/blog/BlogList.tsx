import type { BlogPost } from "@/types/blog";
import BlogCard from "./BlogCard";

interface BlogListProps {
  posts: BlogPost[];
}

export default function BlogList({ posts }: BlogListProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-20 text-silver-500 font-mono text-sm">
        // 아직 작성된 포스트가 없습니다
      </div>
    );
  }

  const [first, ...rest] = posts;

  return (
    <div className="space-y-5">
      {/* 첫 포스트 — 크게 */}
      <BlogCard post={first} featured />

      {/* 나머지 — 2열 그리드 */}
      {rest.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rest.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
