import Link from "next/link";
import { Github, Mail, Moon } from "lucide-react";

const NAV_LINKS = [
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function HighjumpFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#09090B] border-t border-white/10">
      <div className="section-container py-10">
        {/* Top row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          {/* Brand */}
          <Link href="/" className="font-display font-black text-lg text-white tracking-tight">
            highjump<span className="text-hj-accent">.</span>
          </Link>

          {/* Nav links */}
          <ul className="flex flex-wrap items-center gap-5">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-mono text-xs text-white/40 hover:text-white transition-colors duration-150"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Social */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/highjump0603"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-white/40 hover:text-white transition-colors rounded-md hover:bg-white/8"
              aria-label="GitHub"
            >
              <Github size={16} />
            </a>
            <a
              href="mailto:hello@highjump.kr"
              className="p-2 text-white/40 hover:text-white transition-colors rounded-md hover:bg-white/8"
              aria-label="Email"
            >
              <Mail size={16} />
            </a>
            <a
              href="https://project-midnight.dev"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 font-mono text-xs text-white/40 border border-white/10 rounded-lg hover:text-white/70 hover:border-white/20 transition-all duration-200"
            >
              <Moon size={11} />
              midnight
            </a>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-8 pt-6 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-mono text-[11px] text-white/25">
            © {currentYear} highjump. All rights reserved.
          </p>
          <p className="font-mono text-[11px] text-white/25">
            Built with Next.js · FastAPI
          </p>
        </div>
      </div>
    </footer>
  );
}
