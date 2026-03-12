import Link from "next/link";
import { ArrowUpRight, Github, ExternalLink } from "lucide-react";
import { getProjects } from "@/lib/api";
import type { Project } from "@/types/project";

export default async function HjFeaturedProjects() {
  let projects: Project[] = [];
  try {
    const res = await getProjects({ featured: true, limit: 4 });
    projects = res.items;
  } catch {
    // Backend not running
  }

  return (
    <section className="bg-white border-t border-hj-border">
      <div className="section-container py-20">
        {/* Header */}
        <div className="flex items-end justify-between mb-2 gap-4">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-hj-muted mb-1">
              Selected Work
            </p>
            <h2 className="font-display font-black text-3xl text-[#09090B] leading-tight">
              Projects
            </h2>
          </div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 font-mono text-xs text-hj-secondary hover:text-hj-primary transition-colors shrink-0 mb-1"
          >
            View all
            <ArrowUpRight size={13} />
          </Link>
        </div>

        {/* Border separator */}
        <div className="h-px bg-hj-border mt-6 mb-0" />

        {/* List */}
        {projects.length === 0 ? (
          <div className="py-16 text-center">
            <p className="font-mono text-sm text-hj-muted">No projects yet.</p>
          </div>
        ) : (
          <div>
            {projects.map((project, i) => (
              <div
                key={project.id}
                className="group flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-8 py-6 border-b border-hj-border hover:bg-hj-bg/40 transition-colors duration-150 px-1"
              >
                <span className="font-mono text-xs text-hj-muted shrink-0 sm:w-8">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-display font-bold text-[#09090B] group-hover:text-hj-primary transition-colors duration-150">
                      {project.title}
                    </h3>
                    {project.tech_tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="hidden sm:inline font-mono text-[11px] text-hj-muted bg-hj-bg border border-hj-border px-2 py-0.5 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-hj-secondary text-sm line-clamp-1">
                    {project.summary}
                  </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  {project.repo_url && (
                    <a
                      href={project.repo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-hj-muted hover:text-hj-text transition-colors"
                      aria-label="GitHub"
                    >
                      <Github size={14} />
                    </a>
                  )}
                  {project.demo_url && (
                    <a
                      href={project.demo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-hj-muted hover:text-hj-primary transition-colors"
                      aria-label="Demo"
                    >
                      <ExternalLink size={14} />
                    </a>
                  )}
                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-1 font-mono text-xs text-hj-muted hover:text-hj-primary transition-colors"
                  >
                    <ArrowUpRight size={13} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
