import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Github, Star } from "lucide-react";
import type { Project } from "@/types/project";
import TechBadge from "./TechBadge";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group relative bg-glass rounded-2xl overflow-hidden border border-midnight-600/40 hover:border-moon-glow/35 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col"
    >
      {/* Hover glow */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-[radial-gradient(ellipse_at_top,rgba(79,195,247,0.04)_0%,transparent_70%)]" />

      {/* Cover image */}
      {project.cover_url ? (
        <div className="relative h-44 w-full overflow-hidden shrink-0">
          <Image
            src={project.cover_url}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-midnight-900/80 via-transparent to-transparent" />
          {project.is_featured && (
            <div className="absolute top-3 left-3 flex items-center gap-1 bg-star-gold/20 border border-star-gold/40 backdrop-blur-sm text-star-gold font-mono text-[10px] px-2 py-0.5 rounded-full">
              <Star size={9} />
              추천
            </div>
          )}
        </div>
      ) : (
        <div className="relative h-44 bg-midnight-800/60 flex items-center justify-center shrink-0 overflow-hidden">
          <div className="font-mono text-5xl text-midnight-600 select-none group-hover:text-midnight-500 transition-colors duration-300">
            &lt;/&gt;
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-star-blue/3 to-transparent" />
          {project.is_featured && (
            <div className="absolute top-3 left-3 flex items-center gap-1 bg-star-gold/20 border border-star-gold/40 text-star-gold font-mono text-[10px] px-2 py-0.5 rounded-full">
              <Star size={9} />
              추천
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <div>
          <h3 className="font-display text-base font-semibold text-silver-50 group-hover:text-moon-glow transition-colors duration-200 leading-snug mb-1.5">
            {project.title}
          </h3>
          <p className="text-silver-400 text-sm leading-relaxed line-clamp-2">
            {project.summary}
          </p>
        </div>

        {/* Tech tags */}
        {project.tech_tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {project.tech_tags.slice(0, 4).map((tag) => (
              <TechBadge key={tag} label={tag} />
            ))}
            {project.tech_tags.length > 4 && (
              <span className="font-mono text-xs text-silver-500 self-center">
                +{project.tech_tags.length - 4}
              </span>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="mt-auto pt-3 flex items-center justify-between border-t border-midnight-700/50">
          <span className="font-mono text-xs text-silver-500 group-hover:text-silver-300 transition-colors">
            자세히 보기 →
          </span>
          <div className="flex items-center gap-3">
            {project.repo_url && (
              <span
                onClick={(e) => {
                  e.preventDefault();
                  window.open(project.repo_url!, "_blank", "noopener,noreferrer");
                }}
                className="text-silver-500 hover:text-silver-100 transition-colors cursor-pointer"
                aria-label="GitHub 저장소"
              >
                <Github size={14} />
              </span>
            )}
            {project.demo_url && (
              <span
                onClick={(e) => {
                  e.preventDefault();
                  window.open(project.demo_url!, "_blank", "noopener,noreferrer");
                }}
                className="text-silver-500 hover:text-moon-glow transition-colors cursor-pointer"
                aria-label="라이브 데모"
              >
                <ExternalLink size={14} />
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
