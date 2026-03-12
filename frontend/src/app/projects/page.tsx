import type { Metadata } from "next";
import { headers } from "next/headers";
import { getProjects } from "@/lib/api";
import ProjectGrid from "@/components/projects/ProjectGrid";
import SectionHeading from "@/components/ui/SectionHeading";
import type { Project } from "@/types/project";
import { createMetadata } from "@/lib/seo";
import { getThemeFromHost } from "@/lib/theme";
import HjProjectsPage from "@/components/highjump/pages/ProjectsPage";

export const metadata: Metadata = createMetadata({
  title: "Projects",
  description:
    "Browse web apps, developer tools, and product experiments built in Project Midnight.",
  path: "/projects",
  keywords: ["software projects", "portfolio projects", "web apps"],
});

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const headersList = await headers();
  const host = headersList.get("host") ?? "";
  const theme = getThemeFromHost(host);

  if (theme === "highjump") return <HjProjectsPage />;

  let projects: Project[] = [];
  try {
    const res = await getProjects({ limit: 50 });
    projects = res.items;
  } catch {
    // show empty state
  }

  return (
    <main className="section-padding">
      <div className="section-container">
        <div className="flex items-end justify-between mb-12 gap-4">
          <SectionHeading
            label="// projects"
            title="프로젝트"
          />
          {projects.length > 0 && (
            <span className="font-mono text-xs text-silver-500 shrink-0 pb-1">
              {projects.length}개
            </span>
          )}
        </div>
        <ProjectGrid projects={projects} />
      </div>
    </main>
  );
}
