import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageWrapper from "@/components/layout/PageWrapper";
import { SITE_NAME } from "@/lib/constants";
import { createMetadata, siteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: siteUrl,
  applicationName: SITE_NAME,
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  icons: {
    icon: [
      {
        url: "/icons/favicon.png",
        type: "image/png",
      },
    ],
    shortcut: ["/icons/favicon.png"],
    apple: [
      {
        url: "/icons/apple-touch-icon.png",
        type: "image/png",
      },
    ],
  },
  ...createMetadata({
    description:
      "Software developer portfolio focused on full stack projects, engineering notes, and things built after midnight.",
  }),
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "technology",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport = {
  themeColor: "#050816",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className="dark">
      <body className="bg-midnight-900 text-silver-50 min-h-screen flex flex-col">
        <Navbar />
        <PageWrapper>
          <div className="flex-1 pt-16">{children}</div>
        </PageWrapper>
        <Footer />
      </body>
    </html>
  );
}
