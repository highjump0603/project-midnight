import Link from "next/link";
import { Github, Mail, ExternalLink, Linkedin, Globe } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { getSettings } from "@/lib/api";
import type { SocialLink } from "@/lib/api";

const NAV_LINKS = [
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const ICON_MAP: Record<string, LucideIcon> = {
  github: Github,
  email: Mail,
  linkedin: Linkedin,
  link: Globe,
  twitter: Globe,
  youtube: Globe,
  instagram: Globe,
};

export default async function Footer() {
  const currentYear = new Date().getFullYear();

  let socialLinks: SocialLink[] = [];
  try {
    const settings = await getSettings();
    socialLinks = settings.social_links ?? [];
  } catch {
    // fallback to empty — API may be unavailable during build
  }

  return (
    <footer className="relative border-t border-midnight-600/30 bg-midnight-950/80">
      {/* Top glow line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-moon-glow/40 to-transparent" />

      <div className="section-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2.5 w-fit group">
              <span className="font-mono text-sm text-silver-100">
                <span className="text-moon-glow">&lt;</span>
                {" Project Midnight "}
                <span className="text-moon-glow">/&gt;</span>
              </span>
            </Link>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-mono text-xs text-silver-400 uppercase tracking-widest mb-4">
              Navigation
            </h3>
            <ul className="flex flex-col gap-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-silver-200 hover:text-silver-50 text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          {socialLinks.length > 0 && (
            <div>
              <h3 className="font-mono text-xs text-silver-400 uppercase tracking-widest mb-4">
                Connect
              </h3>
              <ul className="flex flex-col gap-2.5">
                {socialLinks.map(({ href, label, icon }) => {
                  const Icon = ICON_MAP[icon] ?? Globe;
                  return (
                    <li key={href}>
                      <a
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="flex items-center gap-2 text-silver-200 hover:text-star-blue text-sm transition-colors group"
                      >
                        <Icon size={14} />
                        <span>{label}</span>
                        {href.startsWith("http") && (
                          <ExternalLink
                            size={10}
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                          />
                        )}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-midnight-600/30 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-mono text-xs text-silver-400">
            © {currentYear} Project Midnight. All rights reserved.
          </p>
          <p className="font-mono text-xs text-silver-400">
            Built with{" "}
            <span className="text-star-blue">Next.js</span>
            {" + "}
            <span className="text-moon-glow">FastAPI</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
