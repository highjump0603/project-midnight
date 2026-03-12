"use client";

import Link from "next/link";
import { ArrowUpRight, Github, ExternalLink } from "lucide-react";
import type { Project } from "@/types/project";

interface Props {
  project: Project;
  index: number;
}

export default function HjProjectCard({ project, index }: Props) {
  return (
    <div className="group flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-8 py-7 border-b border-hj-border hover:bg-hj-bg/60 transition-colors duration-150 px-1">
      {/* Index */}
      <span className="font-mono text-xs text-hj-muted shrink-0 sm:w-8 sm:pt-1">
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Content */}
      <div className="flex-1 flex flex-col gap-2 min-w-0">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display font-bold text-[#09090B] text-lg leading-tight group-hover:text-hj-primary transition-colors duration-150">
            {project.title}
          </h3>
          <div className="flex items-center gap-2 shrink-0">
            {project.repo_url && (
              <a
                href={project.repo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-hj-muted hover:text-hj-text transition-colors"
                aria-label="GitHub"
                onClick={(e) => e.stopPropagation()}
              >
                <Github size={15} />
              </a>
            )}
            {project.demo_url && (
              <a
                href={project.demo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-hj-muted hover:text-hj-primary transition-colors"
                aria-label="Live demo"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink size={15} />
              </a>
            )}
          </div>
        </div>

        <p className="text-hj-secondary text-sm leading-relaxed line-clamp-2">
          {project.summary}
        </p>

        {project.tech_tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-1">
            {project.tech_tags.slice(0, 5).map((tag) => (
              <span
                key={tag}
                className="font-mono text-[11px] text-hj-secondary bg-hj-bg border border-hj-border px-2.5 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
            {project.tech_tags.length > 5 && (
              <span className="font-mono text-[11px] text-hj-muted self-center">
                +{project.tech_tags.length - 5}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Arrow link */}
      <Link
        href={`/projects/${project.slug}`}
        className="sm:self-start sm:mt-1 inline-flex items-center gap-1 font-mono text-xs text-hj-muted hover:text-hj-primary transition-colors shrink-0 group-hover:translate-x-0.5 duration-150"
        aria-label={`View ${project.title}`}
      >
        Details
        <ArrowUpRight size={12} />
      </Link>
    </div>
  );
}
