"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { adminGetPost, adminUpdatePost } from "@/lib/admin-api";

export default function EditBlogPostPage() {
  const router = useRouter();
  const { slug } = useParams<{ slug: string }>();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    summary: "",
    body: "",
    cover_url: "",
    tags: "",
    reading_time: 5,
    is_published: false,
  });

  useEffect(() => {
    adminGetPost(slug).then((p) => {
      setForm({
        title: p.title,
        summary: p.summary,
        body: p.body,
        cover_url: p.cover_url ?? "",
        tags: p.tags.join(", "),
        reading_time: p.reading_time,
        is_published: p.is_published,
      });
    });
  }, [slug]);

  function set(key: string, value: unknown) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await adminUpdatePost(slug, {
        ...form,
        tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
        cover_url: form.cover_url || null,
      });
      router.push("/admin/blog");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update post");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl">
      <h1 className="font-mono text-star-gold text-xl font-bold mb-6">Edit Post: {slug}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Field label="Title *">
          <input className={input} value={form.title} onChange={(e) => set("title", e.target.value)} required />
        </Field>
        <Field label="Summary *">
          <textarea className={`${input} h-20 resize-none`} value={form.summary} onChange={(e) => set("summary", e.target.value)} required />
        </Field>
        <Field label="Body (Markdown)">
          <textarea className={`${input} h-64 resize-y font-mono text-xs`} value={form.body} onChange={(e) => set("body", e.target.value)} />
        </Field>
        <Field label="Tags" hint="comma-separated">
          <input className={input} value={form.tags} onChange={(e) => set("tags", e.target.value)} />
        </Field>
        <Field label="Cover URL">
          <input className={input} value={form.cover_url} onChange={(e) => set("cover_url", e.target.value)} />
        </Field>
        <Field label="Reading Time (minutes)">
          <input className={input} value={form.reading_time} onChange={(e) => set("reading_time", parseInt(e.target.value) || 1)} type="number" min={1} />
        </Field>
        <label className="flex items-center gap-2 font-mono text-sm text-silver-300 cursor-pointer">
          <input type="checkbox" checked={form.is_published} onChange={(e) => set("is_published", e.target.checked)} className="accent-star-gold" />
          Published
        </label>
        {error && <p className="font-mono text-xs text-red-400">{error}</p>}
        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={loading} className="bg-star-gold text-midnight-950 font-mono font-bold text-sm px-6 py-2.5 rounded-lg hover:bg-star-gold/90 disabled:opacity-50">
            {loading ? "Saving..." : "Save Changes"}
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
