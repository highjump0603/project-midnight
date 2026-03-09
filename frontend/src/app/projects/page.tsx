import type { Metadata } from "next";
import { getProjects } from "@/lib/api";
import ProjectGrid from "@/components/projects/ProjectGrid";
import SectionHeading from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Projects",
  description: "All projects — web apps, tools, and experiments.",
};

export const revalidate = 3600;

export default async function ProjectsPage() {
  let projects = [];
  try {
    const res = await getProjects({ limit: 50 });
    projects = res.items;
  } catch {
    // show empty state
  }

  return (
    <main className="section-padding">
      <div className="section-container">
        <SectionHeading
          label="// projects"
          title="All Projects"
          description="Everything I've built — personal projects, open source contributions, and experiments."
          className="mb-12"
        />
        <ProjectGrid projects={projects} />
      </div>
    </main>
  );
}
