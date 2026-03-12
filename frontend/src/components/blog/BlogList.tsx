"use client";

import { useState, useMemo } from "react";
import type { BlogPost } from "@/types/blog";
import BlogCard from "./BlogCard";

interface BlogListProps {
  posts: BlogPost[];
}

export default function BlogList({ posts }: BlogListProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    posts.forEach((p) => p.tags.forEach((t) => tags.add(t)));
    return Array.from(tags).sort();
  }, [posts]);

  const filtered = activeTag
    ? posts.filter((p) => p.tags.includes(activeTag))
    : posts;

  if (posts.length === 0) {
    return (
      <div className="text-center py-20 text-silver-500 font-mono text-sm">
        // 아직 작성된 포스트가 없습니다
      </div>
    );
  }

  const [first, ...rest] = filtered;

  return (
    <div className="space-y-8">
      {/* Tag filter */}
      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTag(null)}
            className={`font-mono text-xs px-3 py-1.5 rounded-full border transition-all duration-200 ${
              !activeTag
                ? "border-moon-glow/50 bg-moon-glow/10 text-moon-glow"
                : "border-midnight-600/50 text-silver-500 hover:text-silver-200 hover:border-midnight-500"
            }`}
          >
            전체 ({posts.length})
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              className={`font-mono text-xs px-3 py-1.5 rounded-full border transition-all duration-200 ${
                activeTag === tag
                  ? "border-moon-glow/50 bg-moon-glow/10 text-moon-glow"
                  : "border-midnight-600/50 text-silver-500 hover:text-silver-200 hover:border-midnight-500"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="text-center py-20 text-silver-500 font-mono text-sm">
          // 해당 태그의 포스트가 없습니다
        </div>
      ) : (
        <div className="space-y-4">
          {/* Featured first post */}
          {first && <BlogCard post={first} featured />}

          {/* Rest — 3-col grid */}
          {rest.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {rest.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
