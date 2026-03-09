import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageWrapper from "@/components/layout/PageWrapper";

export const metadata: Metadata = {
  title: {
    default: "Project Midnight",
    template: "%s | Project Midnight",
  },
  description:
    "Software developer portfolio — building things at midnight. Projects, blog, and more.",
  keywords: ["developer", "portfolio", "software engineer", "web development"],
  authors: [{ name: "Project Midnight" }],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: "Project Midnight",
    title: "Project Midnight",
    description: "Software developer portfolio — building things at midnight.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Project Midnight",
    description: "Software developer portfolio — building things at midnight.",
  },
  robots: {
    index: true,
    follow: true,
  },
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
