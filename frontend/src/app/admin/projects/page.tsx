"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { adminGetProjects, adminDeleteProject } from "@/lib/admin-api";
import type { Project } from "@/types/project";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    try {
      const data = await adminGetProjects();
      setProjects(data.items);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function handleDelete(slug: string) {
    if (!confirm(`Delete "${slug}"?`)) return;
    await adminDeleteProject(slug);
    setProjects((prev) => prev.filter((p) => p.slug !== slug));
  }

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-mono text-star-gold text-xl font-bold">Projects</h1>
        <Link
          href="/admin/projects/new"
          className="bg-star-gold text-midnight-950 font-mono font-bold text-xs px-4 py-2 rounded-lg hover:bg-star-gold/90 transition-colors"
        >
          + New Project
        </Link>
      </div>

      {loading ? (
        <p className="font-mono text-silver-400 text-sm">Loading...</p>
      ) : projects.length === 0 ? (
        <p className="font-mono text-silver-400 text-sm">No projects yet.</p>
      ) : (
        <div className="space-y-3">
          {projects.map((project) => (
            <div
              key={project.slug}
              className="bg-midnight-900 border border-midnight-700 rounded-xl p-5 flex items-center justify-between gap-4"
            >
              <div>
                <p className="font-mono text-sm font-bold text-silver-100">{project.title}</p>
                <p className="font-mono text-xs text-silver-400 mt-0.5">/{project.slug}</p>
                <div className="flex gap-2 mt-1.5">
                  {project.is_featured && (
                    <span className="font-mono text-xs bg-star-gold/20 text-star-gold px-2 py-0.5 rounded">
                      Featured
                    </span>
                  )}
                  {project.tech_tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="font-mono text-xs bg-midnight-700 text-silver-300 px-2 py-0.5 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <Link
                  href={`/admin/projects/${project.slug}/edit`}
                  className="font-mono text-xs px-3 py-1.5 bg-midnight-700 text-silver-100 rounded hover:bg-midnight-600 transition-colors"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(project.slug)}
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
