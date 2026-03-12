import Link from "next/link";
import { Clock, Calendar, ArrowRight } from "lucide-react";
import type { BlogPost } from "@/types/blog";
import { formatDateShort } from "@/lib/utils";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group relative flex flex-col gap-4 rounded-2xl border border-midnight-600/40 bg-midnight-800/50 p-6 shadow-card backdrop-blur-sm transition-all duration-300 hover:border-star-blue/30 hover:bg-midnight-800/70 hover:shadow-[0_8px_40px_rgba(0,0,0,0.5),0_0_0_1px_rgba(79,195,247,0.15)]"
    >
      {/* 상단 좌측 accent 라인 */}
      <div className="absolute left-0 top-6 h-8 w-px rounded-r bg-gradient-to-b from-star-blue/0 via-star-blue/50 to-star-blue/0 transition-opacity duration-300 opacity-0 group-hover:opacity-100" />

      {/* Tags */}
      {post.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="font-mono text-[11px] text-star-blue/70 bg-star-blue/5 border border-star-blue/15 px-2 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Title */}
      <h3 className="font-display text-base font-semibold text-silver-50 leading-snug group-hover:text-star-blue transition-colors duration-200 line-clamp-2">
        {post.title}
      </h3>

      {/* Summary */}
      <p className="text-silver-300/80 text-sm leading-relaxed line-clamp-2 flex-1">
        {post.summary}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-3">
          {post.published_at && (
            <span className="inline-flex items-center gap-1 font-mono text-[11px] text-silver-400/70">
              <Calendar size={10} />
              {formatDateShort(post.published_at)}
            </span>
          )}
          <span className="inline-flex items-center gap-1 font-mono text-[11px] text-silver-400/70">
            <Clock size={10} />
            {post.reading_time} min
          </span>
        </div>
        <ArrowRight size={13} className="text-silver-400/40 transition-all duration-200 group-hover:text-star-blue group-hover:translate-x-0.5" />
      </div>
    </Link>
  );
}
