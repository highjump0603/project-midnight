"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BookOpen, Plus, Pencil, Trash2, Clock } from "lucide-react";
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
    if (!confirm(`"${slug}" 포스트를 삭제하시겠습니까?`)) return;
    await adminDeletePost(slug);
    setPosts((prev) => prev.filter((p) => p.slug !== slug));
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-mono text-xl font-bold text-silver-50">블로그 포스트</h1>
          {!loading && (
            <p className="font-mono text-xs text-silver-500 mt-1">총 {posts.length}개의 포스트</p>
          )}
        </div>
        <Link
          href="/admin/blog/new"
          className="flex items-center gap-1.5 bg-moon-glow/10 border border-moon-glow/30 text-moon-glow font-mono font-semibold text-xs px-4 py-2 rounded-lg hover:bg-moon-glow/20 transition-colors"
        >
          <Plus size={13} />
          새 포스트
        </Link>
      </div>

      {loading ? (
        <div className="font-mono text-xs text-silver-500 py-12 text-center">불러오는 중...</div>
      ) : posts.length === 0 ? (
        <div className="bg-midnight-900 border border-midnight-700/60 rounded-xl p-16 text-center">
          <BookOpen size={24} className="text-silver-700 mx-auto mb-3" />
          <p className="font-mono text-sm text-silver-500">등록된 포스트가 없습니다</p>
          <Link
            href="/admin/blog/new"
            className="inline-block mt-4 font-mono text-xs text-moon-glow hover:underline"
          >
            첫 포스트 작성하기 →
          </Link>
        </div>
      ) : (
        <div className="space-y-2">
          {posts.map((post) => (
            <div
              key={post.slug}
              className="bg-midnight-900 border border-midnight-700/60 rounded-xl px-5 py-4 flex items-center justify-between gap-4 hover:border-midnight-600 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <span
                    className={`font-mono text-[10px] px-2 py-0.5 rounded-full border ${
                      post.is_published
                        ? "bg-green-500/10 text-green-400 border-green-500/20"
                        : "bg-midnight-800 text-silver-500 border-midnight-700"
                    }`}
                  >
                    {post.is_published ? "발행됨" : "초안"}
                  </span>
                  <p className="font-mono text-sm font-semibold text-silver-100 truncate">
                    {post.title}
                  </p>
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="font-mono text-xs text-silver-600">/{post.slug}</span>
                  <span className="flex items-center gap-1 font-mono text-xs text-silver-600">
                    <Clock size={10} />
                    {post.reading_time}분 읽기
                  </span>
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[10px] bg-midnight-800 text-silver-500 px-2 py-0.5 rounded border border-midnight-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <Link
                  href={`/admin/blog/${post.slug}/edit`}
                  className="flex items-center gap-1.5 font-mono text-xs px-3 py-1.5 bg-midnight-800 border border-midnight-700 text-silver-300 rounded-lg hover:border-midnight-600 hover:text-silver-100 transition-colors"
                >
                  <Pencil size={11} />
                  수정
                </Link>
                <button
                  onClick={() => handleDelete(post.slug)}
                  className="flex items-center gap-1.5 font-mono text-xs px-3 py-1.5 bg-red-500/5 border border-red-500/20 text-red-400 rounded-lg hover:bg-red-500/15 transition-colors"
                >
                  <Trash2 size={11} />
                  삭제
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
