"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { adminGetPosts, adminDeletePost } from "@/lib/admin-api";
import type { BlogPost } from "@/types/blog";

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    try {
      const data = await adminGetPosts();
      setPosts(data.items);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function handleDelete(slug: string) {
    if (!confirm(`Delete "${slug}"?`)) return;
    await adminDeletePost(slug);
    setPosts((prev) => prev.filter((p) => p.slug !== slug));
  }

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-mono text-star-gold text-xl font-bold">Blog Posts</h1>
        <Link
          href="/admin/blog/new"
          className="bg-star-gold text-midnight-950 font-mono font-bold text-xs px-4 py-2 rounded-lg hover:bg-star-gold/90 transition-colors"
        >
          + New Post
        </Link>
      </div>

      {loading ? (
        <p className="font-mono text-silver-400 text-sm">Loading...</p>
      ) : posts.length === 0 ? (
        <p className="font-mono text-silver-400 text-sm">No posts yet.</p>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <div
              key={post.slug}
              className="bg-midnight-900 border border-midnight-700 rounded-xl p-5 flex items-center justify-between gap-4"
            >
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-mono text-sm font-bold text-silver-100">{post.title}</p>
                  <span className={`font-mono text-xs px-2 py-0.5 rounded ${post.is_published ? "bg-green-900/50 text-green-400" : "bg-midnight-700 text-silver-400"}`}>
                    {post.is_published ? "Published" : "Draft"}
                  </span>
                </div>
                <p className="font-mono text-xs text-silver-400 mt-0.5">/{post.slug} · {post.reading_time}min read</p>
                {post.tags.length > 0 && (
                  <div className="flex gap-2 mt-1.5">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="font-mono text-xs bg-midnight-700 text-silver-300 px-2 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex gap-2 shrink-0">
                <Link
                  href={`/admin/blog/${post.slug}/edit`}
                  className="font-mono text-xs px-3 py-1.5 bg-midnight-700 text-silver-100 rounded hover:bg-midnight-600 transition-colors"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(post.slug)}
                  className="font-mono text-xs px-3 py-1.5 bg-red-900/50 text-red-400 rounded hover:bg-red-900 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
