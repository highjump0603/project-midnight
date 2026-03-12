import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Github, Star } from "lucide-react";
import type { Project } from "@/types/project";
import TechBadge from "./TechBadge";

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const num = index !== undefined ? String(index + 1).padStart(2, "0") : null;

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group relative bg-midnight-900/60 rounded-2xl overflow-hidden border border-midnight-700/50 hover:border-moon-glow/30 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col"
    >
      {/* Hover glow */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-[radial-gradient(ellipse_at_top_left,rgba(79,195,247,0.06)_0%,transparent_60%)]" />

      {/* Cover */}
      {project.cover_url ? (
        <div className="relative h-44 w-full overflow-hidden shrink-0">
          <Image
            src={project.cover_url}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-midnight-900 via-midnight-900/20 to-transparent" />
          {project.is_featured && (
            <div className="absolute top-3 left-3 flex items-center gap-1 bg-star-gold/20 border border-star-gold/40 backdrop-blur-sm text-star-gold font-mono text-[10px] px-2 py-0.5 rounded-full">
              <Star size={9} />
              추천
            </div>
          )}
          {num && (
            <div className="absolute top-3 right-3 font-mono text-xs text-silver-400/50 bg-midnight-900/60 backdrop-blur-sm px-1.5 py-0.5 rounded">
              {num}
            </div>
          )}
        </div>
      ) : (
        <div className="relative h-44 bg-midnight-800/40 flex items-center justify-center shrink-0 overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />
          <div className="font-mono text-5xl text-midnight-700 select-none group-hover:text-midnight-600 transition-colors duration-300">
            &lt;/&gt;
          </div>
          {project.is_featured && (
            <div className="absolute top-3 left-3 flex items-center gap-1 bg-star-gold/20 border border-star-gold/40 text-star-gold font-mono text-[10px] px-2 py-0.5 rounded-full">
              <Star size={9} />
              추천
            </div>
          )}
          {num && (
            <div className="absolute top-3 right-3 font-mono text-xs text-silver-500/40">
              {num}
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

        <div className="mt-auto pt-3 flex items-center justify-between border-t border-midnight-700/40">
          <span className="font-mono text-xs text-silver-500 group-hover:text-moon-glow/70 transition-colors">
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
