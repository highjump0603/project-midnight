"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
      setError(err instanceof Error ? err.message : "Failed to create project");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl">
      <h1 className="font-mono text-star-gold text-xl font-bold mb-6">New Project</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Field label="Slug *" hint="lowercase, hyphens only (e.g. my-project)">
          <input className={input} value={form.slug} onChange={(e) => set("slug", e.target.value)} required pattern="^[a-z0-9-]+$" />
        </Field>
        <Field label="Title *">
          <input className={input} value={form.title} onChange={(e) => set("title", e.target.value)} required />
        </Field>
        <Field label="Summary *">
          <textarea className={`${input} h-20 resize-none`} value={form.summary} onChange={(e) => set("summary", e.target.value)} required />
        </Field>
        <Field label="Description (Markdown)">
          <textarea className={`${input} h-40 resize-y`} value={form.description} onChange={(e) => set("description", e.target.value)} />
        </Field>
        <Field label="Tech Tags" hint="comma-separated (e.g. React, TypeScript, FastAPI)">
          <input className={input} value={form.tech_tags} onChange={(e) => set("tech_tags", e.target.value)} />
        </Field>
        <Field label="Cover URL">
          <input className={input} value={form.cover_url} onChange={(e) => set("cover_url", e.target.value)} type="url" />
        </Field>
        <Field label="Demo URL">
          <input className={input} value={form.demo_url} onChange={(e) => set("demo_url", e.target.value)} type="url" />
        </Field>
        <Field label="Repo URL">
          <input className={input} value={form.repo_url} onChange={(e) => set("repo_url", e.target.value)} type="url" />
        </Field>
        <Field label="Sort Order">
          <input className={input} value={form.sort_order} onChange={(e) => set("sort_order", parseInt(e.target.value) || 0)} type="number" />
        </Field>
        <label className="flex items-center gap-2 font-mono text-sm text-silver-300 cursor-pointer">
          <input type="checkbox" checked={form.is_featured} onChange={(e) => set("is_featured", e.target.checked)} className="accent-star-gold" />
          Featured project
        </label>
        {error && <p className="font-mono text-xs text-red-400">{error}</p>}
        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={loading} className="bg-star-gold text-midnight-950 font-mono font-bold text-sm px-6 py-2.5 rounded-lg hover:bg-star-gold/90 disabled:opacity-50">
            {loading ? "Creating..." : "Create Project"}
          </button>
          <button type="button" onClick={() => router.back()} className="font-mono text-sm px-6 py-2.5 rounded-lg bg-midnight-700 text-silver-300 hover:bg-midnight-600">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

const input = "w-full bg-midnight-800 border border-midnight-700 rounded-lg px-4 py-2.5 font-mono text-sm text-silver-100 focus:outline-none focus:border-star-gold";

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block font-mono text-xs text-silver-400 mb-1.5">{label}</label>
      {hint && <p className="font-mono text-xs text-silver-500 mb-1">{hint}</p>}
      {children}
    </div>
  );
}
