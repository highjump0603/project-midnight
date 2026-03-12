"use client";

import { useState, useMemo } from "react";
import type { Project } from "@/types/project";
import ProjectCard from "./ProjectCard";

interface ProjectGridProps {
  projects: Project[];
}

export default function ProjectGrid({ projects }: ProjectGridProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    projects.forEach((p) => p.tech_tags.forEach((t) => tags.add(t)));
    return Array.from(tags).sort();
  }, [projects]);

  const filtered = activeTag
    ? projects.filter((p) => p.tech_tags.includes(activeTag))
    : projects;

  if (projects.length === 0) {
    return (
      <div className="text-center py-20 text-silver-500 font-mono text-sm">
        // 아직 프로젝트가 없습니다
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Tag filter */}
      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTag(null)}
            className={`font-mono text-xs px-3 py-1.5 rounded-full border transition-all duration-200 ${
              !activeTag
                ? "border-moon-glow/50 bg-moon-glow/10 text-moon-glow"
                : "border-midnight-600/50 text-silver-500 hover:text-silver-200 hover:border-midnight-500"
            }`}
          >
            전체 ({projects.length})
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              className={`font-mono text-xs px-3 py-1.5 rounded-full border transition-all duration-200 ${
                activeTag === tag
                  ? "border-star-blue/50 bg-star-blue/10 text-star-blue"
                  : "border-midnight-600/50 text-silver-500 hover:text-silver-200 hover:border-midnight-500"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-silver-500 font-mono text-sm">
          // 해당 태그의 프로젝트가 없습니다
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
