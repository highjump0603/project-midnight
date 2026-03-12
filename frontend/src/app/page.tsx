import type { Metadata } from "next";
import { headers } from "next/headers";
import HeroSection from "@/components/home/HeroSection";
import HighjumpHeroSection from "@/components/highjump/HeroSection";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import LatestPosts from "@/components/home/LatestPosts";
import HjFeaturedProjects from "@/components/highjump/home/FeaturedProjects";
import HjLatestPosts from "@/components/highjump/home/LatestPosts";
import { createMetadata } from "@/lib/seo";
import { getThemeFromHost } from "@/lib/theme";

export const metadata: Metadata = createMetadata({
  description:
    "Project Midnight is a developer portfolio featuring full stack projects, technical writing, and experiments built with Next.js, FastAPI, TypeScript, and Python.",
  path: "/",
  keywords: ["portfolio website", "developer blog", "full stack projects"],
});

export default async function HomePage() {
  const headersList = await headers();
  const host = headersList.get("host") ?? "";
  const theme = getThemeFromHost(host);

  if (theme === "highjump") {
    return (
      <>
        <HighjumpHeroSection />
        <HjFeaturedProjects />
        <HjLatestPosts />
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
