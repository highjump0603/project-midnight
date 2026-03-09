import Link from "next/link";
import { Clock, Calendar } from "lucide-react";
import type { BlogPost } from "@/types/blog";
import { formatDateShort } from "@/lib/utils";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block bg-glass rounded-xl p-6 border border-midnight-600/40 hover:border-moon-glow/25 shadow-card hover:shadow-card-hover transition-all duration-300"
    >
      <div className="flex flex-col gap-3">
        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="font-mono text-xs text-moon-crescent bg-midnight-800 px-2 py-0.5 rounded-full border border-midnight-600"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h3 className="font-display text-lg font-semibold text-silver-50 group-hover:text-star-blue transition-colors duration-200 line-clamp-2">
          {post.title}
        </h3>

        {/* Summary */}
        <p className="text-silver-300 text-sm leading-relaxed line-clamp-3">
          {post.summary}
        </p>

        {/* Meta */}
        <div className="flex items-center gap-4 mt-2">
          {post.published_at && (
            <span className="inline-flex items-center gap-1.5 font-mono text-xs text-silver-400">
              <Calendar size={11} />
              {formatDateShort(post.published_at)}
            </span>
          )}
          <span className="inline-flex items-center gap-1.5 font-mono text-xs text-silver-400">
            <Clock size={11} />
            {post.reading_time} min read
          </span>
        </div>
      </div>
    </Link>
  );
}
