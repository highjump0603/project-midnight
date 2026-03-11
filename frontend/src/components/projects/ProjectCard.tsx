"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import type { Project } from "@/types/project";
import TechBadge from "./TechBadge";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="group relative bg-glass rounded-2xl overflow-hidden border border-midnight-600/40 hover:border-moon-glow/40 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col"
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

        {/* Footer links */}
        <div className="mt-auto pt-2 flex items-center justify-between gap-2">
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1.5 font-mono text-xs text-silver-300 hover:text-star-blue transition-colors"
          >
            View Details
            <ArrowRight size={12} />
          </Link>
          <div className="flex items-center gap-3">
            {project.repo_url && (
              <a
                href={project.repo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-silver-400 hover:text-silver-50 transition-colors"
                aria-label="GitHub repository"
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
