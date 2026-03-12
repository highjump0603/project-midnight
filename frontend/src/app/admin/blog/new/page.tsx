"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, FileText } from "lucide-react";
import { adminCreatePost } from "@/lib/admin-api";

export default function NewBlogPostPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    slug: "",
    title: "",
    summary: "",
    body: "",
    cover_url: "",
    tags: "",
    reading_time: 5,
    is_published: false,
  });

  function set(key: string, value: unknown) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await adminCreatePost({
        ...form,
        tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
        cover_url: form.cover_url || null,
      });
      router.push("/admin/blog");
    } catch (err) {
      setError(err instanceof Error ? err.message : "포스트 생성에 실패했습니다");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* 헤더 */}
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1.5 font-mono text-xs text-silver-500 hover:text-silver-200 transition-colors"
        >
          <ArrowLeft size={13} />
          돌아가기
        </button>
        <span className="text-midnight-700">/</span>
        <div className="flex items-center gap-2">
          <FileText size={14} className="text-moon-glow" />
          <h1 className="font-mono text-lg font-bold text-silver-50">새 블로그 포스트</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* 기본 정보 */}
        <section className="bg-midnight-900 border border-midnight-700/60 rounded-xl p-6 space-y-4">
          <p className="font-mono text-[10px] uppercase tracking-widest text-silver-600 mb-1">
            기본 정보
          </p>
          <Field label="슬러그 *" hint="소문자, 하이픈만 사용 (예: my-first-post)">
            <input
              className={inputCls}
              value={form.slug}
              onChange={(e) => set("slug", e.target.value)}
              required
              pattern="^[a-z0-9-]+$"
              placeholder="my-first-post"
            />
          </Field>
          <Field label="제목 *">
            <input
              className={inputCls}
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              required
            />
          </Field>
          <Field label="요약 *">
            <textarea
              className={`${inputCls} h-20 resize-none`}
              value={form.summary}
              onChange={(e) => set("summary", e.target.value)}
              required
            />
          </Field>
        </section>

        {/* 본문 */}
        <section className="bg-midnight-900 border border-midnight-700/60 rounded-xl p-6">
          <p className="font-mono text-[10px] uppercase tracking-widest text-silver-600 mb-4">
            본문
          </p>
          <Field label="본문 (마크다운)">
            <textarea
              className={`${inputCls} h-72 resize-y font-mono text-xs leading-relaxed`}
              value={form.body}
              onChange={(e) => set("body", e.target.value)}
              placeholder={"# 제목\n\n마크다운으로 작성하세요..."}
            />
          </Field>
        </section>

        {/* 메타 정보 */}
        <section className="bg-midnight-900 border border-midnight-700/60 rounded-xl p-6 space-y-4">
          <p className="font-mono text-[10px] uppercase tracking-widest text-silver-600 mb-1">
            메타 정보
          </p>
          <Field label="태그" hint="쉼표로 구분 (예: React, TypeScript, Web)">
            <input
              className={inputCls}
              value={form.tags}
              onChange={(e) => set("tags", e.target.value)}
              placeholder="React, TypeScript, Web"
            />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="커버 이미지 URL">
              <input
                className={inputCls}
                value={form.cover_url}
                onChange={(e) => set("cover_url", e.target.value)}
                type="url"
                placeholder="https://..."
              />
            </Field>
            <Field label="읽기 시간 (분)">
              <input
                className={inputCls}
                value={form.reading_time}
                onChange={(e) => set("reading_time", parseInt(e.target.value) || 1)}
                type="number"
                min={1}
              />
            </Field>
          </div>
          <label className="flex items-center gap-2.5 cursor-pointer group">
            <input
              type="checkbox"
              checked={form.is_published}
              onChange={(e) => set("is_published", e.target.checked)}
              className="accent-moon-glow w-4 h-4"
            />
            <span className="font-mono text-sm text-silver-400 group-hover:text-silver-200 transition-colors">
              바로 발행
            </span>
          </label>
        </section>

        {error && (
          <p className="rounded-lg border border-red-500/20 bg-red-500/8 px-4 py-3 font-mono text-xs text-red-400">
            {error}
          </p>
        )}

        <div className="flex gap-3 pt-1">
          <button
            type="submit"
            disabled={loading}
            className="bg-moon-glow/15 border border-moon-glow/35 text-moon-glow font-mono font-semibold text-sm px-6 py-2.5 rounded-lg hover:bg-moon-glow/25 disabled:opacity-50 transition-colors"
          >
            {loading ? "생성 중..." : "포스트 생성"}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="font-mono text-sm px-6 py-2.5 rounded-lg bg-midnight-800 border border-midnight-700 text-silver-400 hover:text-silver-200 hover:border-midnight-600 transition-colors"
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
}

const inputCls =
  "w-full bg-midnight-800/60 border border-midnight-700/60 rounded-lg px-3.5 py-2.5 font-mono text-sm text-silver-100 placeholder:text-silver-600 focus:outline-none focus:border-moon-glow/50 focus:ring-1 focus:ring-moon-glow/15 transition-colors";

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block font-mono text-[11px] uppercase tracking-wider text-silver-500 mb-1.5">
        {label}
      </label>
      {hint && <p className="font-mono text-xs text-silver-600 mb-1.5">{hint}</p>}
      {children}
    </div>
  );
}
