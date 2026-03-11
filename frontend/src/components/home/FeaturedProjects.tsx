import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getProjects } from "@/lib/api";
import ProjectGrid from "@/components/projects/ProjectGrid";
import SectionHeading from "@/components/ui/SectionHeading";
import type { Project } from "@/types/project";

export default async function FeaturedProjects() {
  let projects: Project[] = [];
  try {
    const res = await getProjects({ featured: true, limit: 3 });
    projects = res.items;
  } catch {
    // Backend not running — show empty state
  }

  return (
    <section className="section-padding bg-midnight-900">
      <div className="section-container">
        <div className="flex items-end justify-between mb-12 gap-4 flex-wrap">
          <SectionHeading
            label="// projects"
            title="주요 프로젝트"
            description="웹 앱부터 도구, 실험적인 작업까지 — 직접 만든 프로젝트 모음입니다."
          />
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 font-mono text-sm text-star-blue hover:text-star-blue/80 transition-colors shrink-0"
          >
            전체 프로젝트
            <ArrowRight size={14} />
          </Link>
        </div>
        <ProjectGrid projects={projects} />
      </div>
    </section>
  );
}
