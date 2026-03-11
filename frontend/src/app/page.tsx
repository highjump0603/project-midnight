import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import LatestPosts from "@/components/home/LatestPosts";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  description:
    "Project Midnight is a developer portfolio featuring full stack projects, technical writing, and experiments built with Next.js, FastAPI, TypeScript, and Python.",
  path: "/",
  keywords: ["portfolio website", "developer blog", "full stack projects"],
});

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedProjects />
      <LatestPosts />
    </>
  );
}
