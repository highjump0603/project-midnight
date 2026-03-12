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
        className="group relative flex flex-col sm:flex-row gap-0 rounded-2xl overflow-hidden border border-midnight-700/50 bg-midnight-900/60 shadow-card hover:shadow-card-hover hover:border-moon-glow/25 transition-all duration-300"
      >
        {/* Left accent bar */}
        <div className="absolute left-0 inset-y-0 w-px bg-gradient-to-b from-transparent via-moon-glow/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Hover glow */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-[radial-gradient(ellipse_at_top_left,rgba(224,194,117,0.04)_0%,transparent_60%)]" />

        <div className="flex flex-col gap-4 p-7 flex-1">
          {/* Top row: tags + meta */}
          <div className="flex items-start justify-between gap-4">
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {post.tags.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] text-moon-glow/70 bg-moon-glow/5 border border-moon-glow/15 px-2.5 py-0.5 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <div className="flex items-center gap-3 shrink-0">
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
          </div>

          {/* Title + summary */}
          <div>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-silver-50 leading-snug group-hover:text-moon-glow transition-colors duration-200 mb-2.5">
              {post.title}
            </h2>
            <p className="text-silver-400 text-sm leading-relaxed line-clamp-2">
              {post.summary}
            </p>
          </div>

          {/* Footer */}
          <div className="flex items-center gap-2 mt-auto">
            <span className="font-mono text-xs text-silver-500 group-hover:text-moon-glow/80 transition-colors">
              읽기
            </span>
            <ArrowRight
              size={13}
              className="text-silver-500/50 transition-all duration-200 group-hover:text-moon-glow group-hover:translate-x-1"
            />
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group relative flex flex-col gap-3 rounded-2xl border border-midnight-700/50 bg-midnight-900/60 p-5 shadow-card hover:shadow-card-hover hover:border-star-blue/25 transition-all duration-300"
    >
      {/* Left accent */}
      <div className="absolute left-0 top-5 h-8 w-px rounded-r bg-gradient-to-b from-star-blue/0 via-star-blue/50 to-star-blue/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

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

      <h3 className="font-display text-sm font-semibold text-silver-100 leading-snug group-hover:text-star-blue transition-colors duration-200 line-clamp-2">
        {post.title}
      </h3>

      <p className="text-silver-500 text-xs leading-relaxed line-clamp-2 flex-1">
        {post.summary}
      </p>

      <div className="flex items-center justify-between pt-2 border-t border-midnight-800/80">
        <div className="flex items-center gap-3">
          {post.published_at && (
            <span className="inline-flex items-center gap-1 font-mono text-[10px] text-silver-600">
              <Calendar size={9} />
              {formatDateShort(post.published_at)}
            </span>
          )}
          <span className="inline-flex items-center gap-1 font-mono text-[10px] text-silver-600">
            <Clock size={9} />
            {post.reading_time}분
          </span>
        </div>
        <ArrowRight
          size={11}
          className="text-silver-600/50 transition-all duration-200 group-hover:text-star-blue group-hover:translate-x-0.5"
        />
      </div>
    </Link>
  );
}
