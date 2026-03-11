import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/constants";

const FALLBACK_SITE_URL = "https://project-midnight.dev";

function normalizeSiteUrl(url: string) {
  if (!url) {
    return FALLBACK_SITE_URL;
  }

  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  return `https://${url}`;
}

const normalizedSiteUrl = normalizeSiteUrl(SITE_URL);

export const siteUrl = new URL(normalizedSiteUrl);

export const defaultKeywords = [
  "Project Midnight",
  "developer portfolio",
  "software engineer",
  "full stack developer",
  "Next.js",
  "FastAPI",
  "TypeScript",
  "Python",
  "blog",
  "projects",
];

type MetadataOptions = {
  title?: string;
  description: string;
  path?: string;
  keywords?: string[];
  image?: string | null;
  type?: "website" | "article";
};

function toAbsoluteUrl(path: string) {
  return new URL(path, siteUrl);
}

function toAbsoluteImageUrl(image?: string | null) {
  if (!image) {
    return undefined;
  }

  if (image.startsWith("http://") || image.startsWith("https://")) {
    return image;
  }

  return toAbsoluteUrl(image).toString();
}

export function createMetadata({
  title,
  description,
  path = "/",
  keywords = [],
  image,
  type = "website",
}: MetadataOptions): Metadata {
  const canonical = toAbsoluteUrl(path);
  const socialImage = toAbsoluteImageUrl(image) ?? toAbsoluteUrl("/opengraph-image").toString();

  return {
    ...(title ? { title } : {}),
    description,
    keywords: [...defaultKeywords, ...keywords],
    alternates: {
      canonical,
    },
    openGraph: {
      type,
      locale: "ko_KR",
      url: canonical,
      siteName: SITE_NAME,
      title: title ?? SITE_NAME,
      description,
      images: [
        {
          url: socialImage,
          width: 1200,
          height: 630,
          alt: `${title ?? SITE_NAME} preview image`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: title ?? SITE_NAME,
      description,
      images: [socialImage],
    },
  };
}
