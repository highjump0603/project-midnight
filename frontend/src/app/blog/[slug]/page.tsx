import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { getBlogPost, getBlogPosts } from "@/lib/api";
import ReadingProgress from "@/components/blog/ReadingProgress";
import { formatDate } from "@/lib/utils";
import { createMetadata } from "@/lib/seo";

export const revalidate = 1800;
export const dynamicParams = true;

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  try {
    const res = await getBlogPosts({ limit: 100 });
    return res.items.map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const post = await getBlogPost(slug);
    return createMetadata({
      title: post.title,
      description: post.summary,
      path: `/blog/${post.slug}`,
      image: post.cover_url,
      keywords: post.tags,
      type: "article",
    });
  } catch {
    return createMetadata({
      title: "Post",
      description: "Technical writing from Project Midnight.",
      path: "/blog",
    });
  }
}

export default async function BlogPostPage({
  params,
}: BlogPostPageProps) {
  const { slug } = await params;

  let post;
  try {
    post = await getBlogPost(slug);
  } catch {
    notFound();
  }

  return (
    <>
      <ReadingProgress />
      <main className="section-padding">
        <div className="section-container max-w-3xl">
          {/* Back */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 font-mono text-sm text-silver-300 hover:text-silver-50 transition-colors mb-10"
          >
            <ArrowLeft size={14} />
            All Posts
          </Link>

          {/* Header */}
          <header className="flex flex-col gap-5 mb-12">
            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-xs text-moon-crescent bg-midnight-800 px-2.5 py-1 rounded-full border border-midnight-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <h1 className="font-display text-4xl sm:text-5xl font-bold text-silver-50 leading-tight">
              {post.title}
            </h1>

            <p className="text-silver-300 text-lg leading-relaxed">
              {post.summary}
            </p>

            {/* Meta */}
            <div className="flex items-center gap-5 pt-2 border-t border-midnight-600/40">
              {post.published_at && (
                <span className="inline-flex items-center gap-1.5 font-mono text-xs text-silver-400">
                  <Calendar size={12} />
                  {formatDate(post.published_at)}
                </span>
              )}
              <span className="inline-flex items-center gap-1.5 font-mono text-xs text-silver-400">
                <Clock size={12} />
                {post.reading_time} min read
              </span>
            </div>
          </header>

          {/* Body */}
          <article className="prose prose-invert max-w-none text-silver-200 leading-relaxed whitespace-pre-wrap">
            {post.body}
          </article>
        </div>
      </main>
    </>
  );
}
