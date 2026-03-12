import Link from "next/link";
import { Clock, Calendar, ArrowRight } from "lucide-react";
import type { BlogPost } from "@/types/blog";
import { formatDateShort } from "@/lib/utils";

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

export default function BlogCard({ post, featured = false }: BlogCardProps) {
  if (featured) {
    return (
      <Link
        href={`/blog/${post.slug}`}
        className="group relative flex flex-col gap-5 rounded-2xl border border-midnight-600/40 bg-midnight-800/50 p-7 shadow-card backdrop-blur-sm transition-all duration-300 hover:border-moon-glow/30 hover:bg-midnight-800/70 hover:shadow-card-hover"
      >
        <div className="absolute left-0 top-8 h-10 w-px rounded-r bg-gradient-to-b from-moon-glow/0 via-moon-glow/50 to-moon-glow/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {post.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="font-mono text-[11px] text-moon-glow/70 bg-moon-glow/5 border border-moon-glow/15 px-2.5 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div>
          <h2 className="font-display text-xl sm:text-2xl font-bold text-silver-50 leading-snug group-hover:text-moon-glow transition-colors duration-200 mb-2">
            {post.title}
          </h2>
          <p className="text-silver-300/80 text-sm leading-relaxed line-clamp-3">
            {post.summary}
          </p>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-midnight-700/50">
          <div className="flex items-center gap-4">
            {post.published_at && (
              <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-silver-400/70">
                <Calendar size={10} />
                {formatDateShort(post.published_at)}
              </span>
            )}
            <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-silver-400/70">
              <Clock size={10} />
              {post.reading_time}분 읽기
            </span>
          </div>
          <ArrowRight size={14} className="text-silver-400/40 transition-all duration-200 group-hover:text-moon-glow group-hover:translate-x-0.5" />
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group relative flex flex-col gap-3 rounded-2xl border border-midnight-600/40 bg-midnight-800/50 p-5 shadow-card backdrop-blur-sm transition-all duration-300 hover:border-star-blue/25 hover:bg-midnight-800/70 hover:shadow-card-hover"
    >
      <div className="absolute left-0 top-6 h-8 w-px rounded-r bg-gradient-to-b from-star-blue/0 via-star-blue/50 to-star-blue/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {post.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="font-mono text-[10px] text-star-blue/70 bg-star-blue/5 border border-star-blue/15 px-2 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <h3 className="font-display text-base font-semibold text-silver-50 leading-snug group-hover:text-star-blue transition-colors duration-200 line-clamp-2">
        {post.title}
      </h3>

      <p className="text-silver-400/80 text-sm leading-relaxed line-clamp-2 flex-1">
        {post.summary}
      </p>

      <div className="flex items-center justify-between pt-2 border-t border-midnight-700/50">
        <div className="flex items-center gap-3">
          {post.published_at && (
            <span className="inline-flex items-center gap-1 font-mono text-[10px] text-silver-500">
              <Calendar size={9} />
              {formatDateShort(post.published_at)}
            </span>
          )}
          <span className="inline-flex items-center gap-1 font-mono text-[10px] text-silver-500">
            <Clock size={9} />
            {post.reading_time}분
          </span>
        </div>
        <ArrowRight size={12} className="text-silver-500/40 transition-all duration-200 group-hover:text-star-blue group-hover:translate-x-0.5" />
      </div>
    </Link>
  );
}
