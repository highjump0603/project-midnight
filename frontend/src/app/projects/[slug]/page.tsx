import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { getProject, getProjects } from "@/lib/api";
import TechBadge from "@/components/projects/TechBadge";
import { createMetadata } from "@/lib/seo";

export const revalidate = 3600;

export async function generateStaticParams() {
  try {
    const res = await getProjects({ limit: 100 });
    return res.items.map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  try {
    const project = await getProject(params.slug);
    return createMetadata({
      title: project.title,
      description: project.summary,
      path: `/projects/${project.slug}`,
      image: project.cover_url,
      keywords: project.tech_tags,
    });
  } catch {
    return createMetadata({
      title: "Project",
      description: "Project details from Project Midnight.",
      path: "/projects",
    });
  }
}

export default async function ProjectDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  let project;
  try {
    project = await getProject(params.slug);
  } catch {
    notFound();
  }

  return (
    <main className="section-padding">
      <div className="section-container max-w-4xl">
        {/* Back */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 font-mono text-sm text-silver-300 hover:text-silver-50 transition-colors mb-10"
        >
          <ArrowLeft size={14} />
          All Projects
        </Link>

        {/* Cover */}
        {project.cover_url && (
          <div className="relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden mb-10">
            <Image
              src={project.cover_url}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Header */}
        <div className="flex flex-col gap-6 mb-10">
          <div className="flex flex-col gap-3">
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-silver-50">
              {project.title}
            </h1>
            <p className="text-silver-300 text-lg leading-relaxed">
              {project.summary}
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-3">
            {project.demo_url && (
              <a
                href={project.demo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-star-gold text-midnight-950 font-mono font-semibold text-sm rounded-lg shadow-gold-glow hover:bg-yellow-400 transition-all active:scale-95"
              >
                <ExternalLink size={14} />
                Live Demo
              </a>
            )}
            {project.repo_url && (
              <a
                href={project.repo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-midnight-700 border border-midnight-600 text-silver-100 font-mono text-sm rounded-lg hover:border-silver-300/40 transition-all active:scale-95"
              >
                <Github size={14} />
                Source Code
              </a>
            )}
          </div>

          {/* Tech stack */}
          {project.tech_tags.length > 0 && (
            <div className="flex flex-col gap-2">
              <span className="font-mono text-xs text-silver-400 uppercase tracking-widest">
                Tech Stack
              </span>
              <div className="flex flex-wrap gap-2">
                {project.tech_tags.map((tag) => (
                  <TechBadge key={tag} label={tag} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Description */}
        <div className="border-t border-midnight-600/40 pt-10">
          <div className="prose prose-invert max-w-none text-silver-200 leading-relaxed whitespace-pre-wrap">
            {project.description}
          </div>
        </div>
      </div>
    </main>
  );
}
