"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import type { Project } from "@/types/project";
import TechBadge from "./TechBadge";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const router = useRouter();

  const openProjectDetail = () => {
    router.push(`/projects/${project.slug}`);
  };

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="group relative bg-glass rounded-2xl overflow-hidden border border-midnight-600/40 hover:border-moon-glow/40 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-star-blue/50"
      role="link"
      tabIndex={0}
      onClick={openProjectDetail}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openProjectDetail();
        }
      }}
    >
      {/* Hover glow border */}
      <div className="absolute inset-0 rounded-2xl border border-moon-glow/0 group-hover:border-moon-glow/25 transition-colors duration-300 pointer-events-none z-10" />

      {/* Cover image */}
      {project.cover_url ? (
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={project.cover_url}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-midnight-800/80 to-transparent" />
        </div>
      ) : (
        <div className="h-48 bg-midnight-800 flex items-center justify-center">
          <div className="font-mono text-4xl text-midnight-600 select-none">
            &lt;/&gt;
          </div>
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col flex-1 p-card-pad gap-4">
        <div className="flex flex-col gap-2">
          <h3 className="font-display text-lg font-semibold text-silver-50 group-hover:text-star-blue transition-colors duration-200">
            {project.title}
          </h3>
          <p className="text-silver-300 text-sm leading-relaxed line-clamp-3">
            {project.summary}
          </p>
        </div>

        {/* Tech tags */}
        {project.tech_tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {project.tech_tags.slice(0, 5).map((tag) => (
              <TechBadge key={tag} label={tag} />
            ))}
            {project.tech_tags.length > 5 && (
              <span className="font-mono text-xs text-silver-400 self-center">
                +{project.tech_tags.length - 5}
              </span>
            )}
          </div>
        )}

        {/* External links */}
        <div className="mt-auto pt-2 flex items-center justify-end gap-2">
          <div className="flex items-center gap-3">
            {project.repo_url && (
              <a
                href={project.repo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-silver-400 hover:text-silver-50 transition-colors"
                aria-label="GitHub repository"
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
                className="text-silver-400 hover:text-star-blue transition-colors"
                aria-label="Live demo"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink size={15} />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
