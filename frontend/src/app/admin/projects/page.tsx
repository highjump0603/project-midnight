"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FolderKanban, Plus, Pencil, Trash2, Star } from "lucide-react";
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
    if (!confirm(`"${slug}" 프로젝트를 삭제하시겠습니까?`)) return;
    await adminDeleteProject(slug);
    setProjects((prev) => prev.filter((p) => p.slug !== slug));
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-mono text-xl font-bold text-silver-50">프로젝트</h1>
          {!loading && (
            <p className="font-mono text-xs text-silver-500 mt-1">총 {projects.length}개의 프로젝트</p>
          )}
        </div>
        <Link
          href="/admin/projects/new"
          className="flex items-center gap-1.5 bg-star-blue/10 border border-star-blue/30 text-star-blue font-mono font-semibold text-xs px-4 py-2 rounded-lg hover:bg-star-blue/20 transition-colors"
        >
          <Plus size={13} />
          새 프로젝트
        </Link>
      </div>

      {loading ? (
        <div className="font-mono text-xs text-silver-500 py-12 text-center">불러오는 중...</div>
      ) : projects.length === 0 ? (
        <div className="bg-midnight-900 border border-midnight-700/60 rounded-xl p-16 text-center">
          <FolderKanban size={24} className="text-silver-700 mx-auto mb-3" />
          <p className="font-mono text-sm text-silver-500">등록된 프로젝트가 없습니다</p>
          <Link
            href="/admin/projects/new"
            className="inline-block mt-4 font-mono text-xs text-star-blue hover:underline"
          >
            첫 프로젝트 추가하기 →
          </Link>
        </div>
      ) : (
        <div className="space-y-2">
          {projects.map((project) => (
            <div
              key={project.slug}
              className="bg-midnight-900 border border-midnight-700/60 rounded-xl px-5 py-4 flex items-center justify-between gap-4 hover:border-midnight-600 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  {project.is_featured && (
                    <span className="flex items-center gap-1 font-mono text-[10px] bg-star-gold/10 border border-star-gold/25 text-star-gold px-2 py-0.5 rounded-full">
                      <Star size={9} />
                      추천
                    </span>
                  )}
                  <p className="font-mono text-sm font-semibold text-silver-100 truncate">
                    {project.title}
                  </p>
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="font-mono text-xs text-silver-600">/{project.slug}</span>
                  {project.tech_tags.slice(0, 4).map((tag) => (
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
                  href={`/admin/projects/${project.slug}/edit`}
                  className="flex items-center gap-1.5 font-mono text-xs px-3 py-1.5 bg-midnight-800 border border-midnight-700 text-silver-300 rounded-lg hover:border-midnight-600 hover:text-silver-100 transition-colors"
                >
                  <Pencil size={11} />
                  수정
                </Link>
                <button
                  onClick={() => handleDelete(project.slug)}
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
