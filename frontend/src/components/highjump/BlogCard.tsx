import Link from "next/link";
import { Clock } from "lucide-react";
import type { BlogPost } from "@/types/blog";
import { formatDateShort } from "@/lib/utils";

interface Props {
  post: BlogPost;
}

export default function HjBlogCard({ post }: Props) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-8 py-6 border-b border-hj-border hover:bg-hj-bg/60 transition-colors duration-150 px-1"
    >
      {/* Date */}
      <div className="shrink-0 sm:w-24 sm:pt-0.5">
        {post.published_at && (
          <span className="font-mono text-xs text-hj-muted">
            {formatDateShort(post.published_at)}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 flex flex-col gap-1.5">
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="font-mono text-[11px] text-hj-primary bg-hj-primary-light px-2.5 py-0.5 rounded-full border border-hj-primary/15"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <h3 className="font-display font-bold text-[#09090B] leading-snug group-hover:text-hj-primary transition-colors duration-150 line-clamp-2">
          {post.title}
        </h3>
        <p className="text-hj-secondary text-sm leading-relaxed line-clamp-2">
          {post.summary}
        </p>
      </div>

      {/* Reading time */}
      <div className="shrink-0 sm:self-start sm:mt-0.5">
        <span className="inline-flex items-center gap-1 font-mono text-xs text-hj-muted">
          <Clock size={11} />
          {post.reading_time}m
        </span>
      </div>
    </Link>
  );
}
