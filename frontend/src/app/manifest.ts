import type { MetadataRoute } from "next";
import { SITE_NAME } from "@/lib/constants";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: "Midnight",
    description:
      "Project Midnight portfolio with full stack projects, technical writing, and contact information.",
    start_url: "/",
    display: "standalone",
    background_color: "#050816",
    theme_color: "#050816",
    icons: [
      {
        src: "/icons/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
