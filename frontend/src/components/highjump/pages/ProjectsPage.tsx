import { getProjects } from "@/lib/api";
import type { Project } from "@/types/project";
import HjProjectCard from "@/components/highjump/ProjectCard";

export default async function HjProjectsPage() {
  let projects: Project[] = [];
  try {
    const res = await getProjects({ limit: 50 });
    projects = res.items;
  } catch {
    // show empty state
  }

  return (
    <main className="bg-white min-h-screen">
      <div className="section-container py-20 max-w-3xl">
        {/* Header */}
        <div className="mb-2">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-hj-muted mb-1">
            Portfolio
          </p>
          <h1 className="font-display font-black text-[#09090B] leading-tight"
            style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)" }}
          >
            Projects
          </h1>
          <p className="text-hj-secondary text-base mt-3 max-w-md">
            직접 만든 프로젝트 모음 — 웹 앱, 도구, 실험적인 작업까지.
          </p>
        </div>

        <div className="h-px bg-hj-border mt-8 mb-0" />

        {projects.length === 0 ? (
          <div className="py-20 text-center">
            <p className="font-mono text-sm text-hj-muted">No projects yet.</p>
          </div>
        ) : (
          <div>
            {projects.map((project, i) => (
              <HjProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
