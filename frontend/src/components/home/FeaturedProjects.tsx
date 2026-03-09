import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getProjects } from "@/lib/api";
import ProjectGrid from "@/components/projects/ProjectGrid";
import SectionHeading from "@/components/ui/SectionHeading";

export default async function FeaturedProjects() {
  let projects = [];
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
            title="Featured Work"
            description="A selection of projects I've built — from web apps to tools and experiments."
          />
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 font-mono text-sm text-star-blue hover:text-star-blue/80 transition-colors shrink-0"
          >
            All projects
            <ArrowRight size={14} />
          </Link>
        </div>
        <ProjectGrid projects={projects} />
      </div>
    </section>
  );
}
