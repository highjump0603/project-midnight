import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HighjumpNavbar from "@/components/highjump/Navbar";
import HighjumpFooter from "@/components/highjump/Footer";
import PageWrapper from "@/components/layout/PageWrapper";
import ThemeProvider from "@/components/ThemeProvider";
import { SITE_NAME } from "@/lib/constants";
import { createMetadata, siteUrl } from "@/lib/seo";
import { getThemeFromHost } from "@/lib/theme";

export const metadata: Metadata = {
  metadataBase: siteUrl,
  applicationName: SITE_NAME,
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  icons: {
    icon: [{ url: "/icons/favicon.svg", type: "image/svg+xml" }],
    shortcut: ["/icons/favicon.svg"],
    apple: [{ url: "/icons/favicon.svg", type: "image/svg+xml" }],
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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const host = headersList.get("host") ?? "";
  const theme = getThemeFromHost(host);

  const isMidnight = theme === "midnight";

  return (
    <html
      lang="ko"
      className={isMidnight ? "dark" : ""}
      data-theme={theme}
    >
      <body
        className={
          isMidnight
            ? "bg-midnight-900 text-silver-50 min-h-screen flex flex-col"
            : "bg-hj-bg text-hj-text min-h-screen flex flex-col"
        }
      >
        <ThemeProvider theme={theme}>
          {isMidnight ? <Navbar /> : <HighjumpNavbar />}
          <PageWrapper>
            <div className="flex-1 pt-16">{children}</div>
          </PageWrapper>
          {isMidnight ? <Footer /> : <HighjumpFooter />}
        </ThemeProvider>
      </body>
    </html>
  );
}
