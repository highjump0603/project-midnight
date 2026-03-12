"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, FolderKanban } from "lucide-react";
import { adminCreateProject } from "@/lib/admin-api";

export default function NewProjectPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    slug: "",
    title: "",
    summary: "",
    description: "",
    cover_url: "",
    demo_url: "",
    repo_url: "",
    tech_tags: "",
    is_featured: false,
    sort_order: 0,
  });

  function set(key: string, value: unknown) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await adminCreateProject({
        ...form,
        tech_tags: form.tech_tags.split(",").map((t) => t.trim()).filter(Boolean),
        cover_url: form.cover_url || null,
        demo_url: form.demo_url || null,
        repo_url: form.repo_url || null,
      });
      router.push("/admin/projects");
    } catch (err) {
      setError(err instanceof Error ? err.message : "프로젝트 생성에 실패했습니다");
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
          <FolderKanban size={14} className="text-star-blue" />
          <h1 className="font-mono text-lg font-bold text-silver-50">새 프로젝트</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* 기본 정보 */}
        <section className="bg-midnight-900 border border-midnight-700/60 rounded-xl p-6 space-y-4">
          <p className="font-mono text-[10px] uppercase tracking-widest text-silver-600 mb-1">
            기본 정보
          </p>
          <Field label="슬러그 *" hint="소문자, 하이픈만 사용 (예: my-project)">
            <input
              className={inputCls}
              value={form.slug}
              onChange={(e) => set("slug", e.target.value)}
              required
              pattern="^[a-z0-9-]+$"
              placeholder="my-project"
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
          <Field label="설명 (마크다운)">
            <textarea
              className={`${inputCls} h-40 resize-y font-mono text-xs leading-relaxed`}
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
            />
          </Field>
        </section>

        {/* 기술 스택 및 링크 */}
        <section className="bg-midnight-900 border border-midnight-700/60 rounded-xl p-6 space-y-4">
          <p className="font-mono text-[10px] uppercase tracking-widest text-silver-600 mb-1">
            기술 스택 및 링크
          </p>
          <Field label="기술 태그" hint="쉼표로 구분 (예: React, TypeScript, FastAPI)">
            <input
              className={inputCls}
              value={form.tech_tags}
              onChange={(e) => set("tech_tags", e.target.value)}
              placeholder="React, TypeScript, FastAPI"
            />
          </Field>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Field label="커버 이미지 URL">
              <input
                className={inputCls}
                value={form.cover_url}
                onChange={(e) => set("cover_url", e.target.value)}
                type="url"
                placeholder="https://..."
              />
            </Field>
            <Field label="데모 URL">
              <input
                className={inputCls}
                value={form.demo_url}
                onChange={(e) => set("demo_url", e.target.value)}
                type="url"
                placeholder="https://..."
              />
            </Field>
            <Field label="저장소 URL">
              <input
                className={inputCls}
                value={form.repo_url}
                onChange={(e) => set("repo_url", e.target.value)}
                type="url"
                placeholder="https://github.com/..."
              />
            </Field>
          </div>
        </section>

        {/* 설정 */}
        <section className="bg-midnight-900 border border-midnight-700/60 rounded-xl p-6 space-y-4">
          <p className="font-mono text-[10px] uppercase tracking-widest text-silver-600 mb-1">
            설정
          </p>
          <Field label="정렬 순서">
            <input
              className={`${inputCls} w-32`}
              value={form.sort_order}
              onChange={(e) => set("sort_order", parseInt(e.target.value) || 0)}
              type="number"
            />
          </Field>
          <label className="flex items-center gap-2.5 cursor-pointer group">
            <input
              type="checkbox"
              checked={form.is_featured}
              onChange={(e) => set("is_featured", e.target.checked)}
              className="accent-star-gold w-4 h-4"
            />
            <span className="font-mono text-sm text-silver-400 group-hover:text-silver-200 transition-colors">
              추천 프로젝트로 표시
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
            className="bg-star-blue/15 border border-star-blue/35 text-star-blue font-mono font-semibold text-sm px-6 py-2.5 rounded-lg hover:bg-star-blue/25 disabled:opacity-50 transition-colors"
          >
            {loading ? "생성 중..." : "프로젝트 생성"}
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
  "w-full bg-midnight-800/60 border border-midnight-700/60 rounded-lg px-3.5 py-2.5 font-mono text-sm text-silver-100 placeholder:text-silver-600 focus:outline-none focus:border-star-blue/50 focus:ring-1 focus:ring-star-blue/15 transition-colors";

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
