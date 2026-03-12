import type { Metadata } from "next";
import { Suspense } from "react";
import { headers } from "next/headers";
import HeroSection from "@/components/home/HeroSection";
import HighjumpHeroSection from "@/components/highjump/HeroSection";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import LatestPosts from "@/components/home/LatestPosts";
import HjFeaturedProjects from "@/components/highjump/home/FeaturedProjects";
import HjLatestPosts from "@/components/highjump/home/LatestPosts";
import { getProjects, getBlogPosts } from "@/lib/api";
import { createMetadata } from "@/lib/seo";
import { getThemeFromHost } from "@/lib/theme";
import type { Project } from "@/types/project";
import type { BlogPost } from "@/types/blog";

export const metadata: Metadata = createMetadata({
  description:
    "Project Midnight is a developer portfolio featuring full stack projects, technical writing, and experiments built with Next.js, FastAPI, TypeScript, and Python.",
  path: "/",
  keywords: ["portfolio website", "developer blog", "full stack projects"],
});

async function ProjectsSection({ promise }: { promise: Promise<Project[]> }) {
  const projects = await promise;
  return <HjFeaturedProjects projects={projects} />;
}

async function PostsSection({ promise }: { promise: Promise<BlogPost[]> }) {
  const posts = await promise;
  return <HjLatestPosts posts={posts} />;
}

function ProjectsSkeleton() {
  return (
    <section className="bg-white border-t border-hj-border">
      <div className="section-container py-20">
        <div className="h-8 w-32 bg-hj-border rounded animate-pulse mb-6" />
        <div className="h-px bg-hj-border mt-6 mb-0" />
        {[...Array(4)].map((_, i) => (
          <div key={i} className="py-6 border-b border-hj-border flex gap-8 items-center">
            <div className="h-4 w-6 bg-hj-border rounded animate-pulse shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-48 bg-hj-border rounded animate-pulse" />
              <div className="h-3 w-72 bg-hj-border rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function PostsSkeleton() {
  return (
    <section className="bg-hj-bg border-t border-hj-border">
      <div className="section-container py-20">
        <div className="h-8 w-32 bg-hj-border rounded animate-pulse mb-6" />
        <div className="h-px bg-hj-border mt-6 mb-0" />
        {[...Array(4)].map((_, i) => (
          <div key={i} className="py-6 border-b border-hj-border flex gap-8 items-center">
            <div className="h-3 w-20 bg-hj-border rounded animate-pulse shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-56 bg-hj-border rounded animate-pulse" />
              <div className="h-3 w-80 bg-hj-border rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default async function HomePage() {
  const headersList = await headers();
  const host = headersList.get("host") ?? "";
  const theme = getThemeFromHost(host);

  if (theme === "highjump") {
    const projectsPromise = getProjects({ featured: true, limit: 4 })
      .then((r) => r.items)
      .catch(() => [] as Project[]);

    const postsPromise = getBlogPosts({ limit: 4 })
      .then((r) => r.items)
      .catch(() => [] as BlogPost[]);

    return (
      <>
        <HighjumpHeroSection />
        <Suspense fallback={<ProjectsSkeleton />}>
          <ProjectsSection promise={projectsPromise} />
        </Suspense>
        <Suspense fallback={<PostsSkeleton />}>
          <PostsSection promise={postsPromise} />
        </Suspense>
      </>
    );
  }

  return (
    <>
      <HeroSection />
      <FeaturedProjects />
      <LatestPosts />
    </>
  );
}
