import { headers } from "next/headers";
import { getThemeFromHost } from "@/lib/theme";
import MidnightAboutPage from "@/components/midnight/AboutPage";
import HjAboutPage from "@/components/highjump/pages/AboutPage";

export default async function About() {
  const headersList = await headers();
  const host = headersList.get("host") ?? "";
  const theme = getThemeFromHost(host);

  if (theme === "highjump") return <HjAboutPage />;
  return <MidnightAboutPage />;
}
