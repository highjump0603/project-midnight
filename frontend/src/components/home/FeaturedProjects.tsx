import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getProjects } from "@/lib/api";
import ProjectGallery from "../projects/ProjectGallery";
import type { Project } from "@/types/project";

export default async function FeaturedProjects() {
  let projects: Project[] = [];
  try {
    const res = await getProjects({ limit: 12 });
    projects = res.items
      .slice()
      .sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      )
      .slice(0, 6);
  } catch {
    // Backend not running — show empty state
  }

  return (
    <section className="relative overflow-hidden bg-midnight-950 border-t border-midnight-600/30">
      {/* 배경 글로우 */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-px w-[480px] -translate-x-1/2 bg-gradient-to-r from-transparent via-moon-glow/40 to-transparent" />
        <div className="absolute left-1/2 top-0 h-64 w-[600px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(123,123,255,0.07)_0%,transparent_70%)]" />
      </div>

      <div className="relative section-container py-24 md:py-32">
        {/* 헤더 */}
        <div className="mb-14 flex flex-col items-center gap-3 text-center">
          <span className="font-mono text-xs tracking-[0.2em] text-moon-glow/70 uppercase">
            // projects
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-silver-50 drop-shadow-[0_0_18px_rgba(123,123,255,0.25)]">
            최신 프로젝트
          </h2>
          <div className="mt-1 h-px w-16 bg-gradient-to-r from-transparent via-moon-glow/60 to-transparent" />
        </div>

        <ProjectGallery projects={projects} />

        {projects.length > 0 && (
          <div className="mt-12 flex justify-center">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 rounded-lg border border-moon-glow/30 bg-moon-glow/5 px-6 py-2.5 font-mono text-sm text-moon-crescent transition-all duration-200 hover:border-moon-glow/60 hover:bg-moon-glow/10 hover:shadow-moon-glow"
            >
              전체 보기
              <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
