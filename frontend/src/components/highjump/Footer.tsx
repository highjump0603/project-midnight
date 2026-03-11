import Link from "next/link";
import { Github, Mail, ExternalLink, Moon } from "lucide-react";

const NAV_LINKS = [
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const SOCIAL_LINKS = [
  { href: "https://github.com/highjump0603", label: "GitHub", icon: Github },
  { href: "mailto:hello@highjump.kr", label: "Email", icon: Mail },
];

export default function HighjumpFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-hj-border bg-hj-bg">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-hj-primary/30 to-transparent" />

      <div className="section-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="w-fit">
              <span className="font-display text-xl font-bold text-hj-primary">
                highjump<span className="text-hj-accent">.</span>
              </span>
            </Link>
            <p className="text-hj-secondary text-sm leading-relaxed max-w-xs">
              자정에 무언가를 만드는 소프트웨어 개발자.
            </p>
            <a
              href="https://project-midnight.dev"
              className="inline-flex items-center gap-1.5 font-mono text-xs text-hj-muted hover:text-hj-primary transition-colors w-fit"
            >
              <Moon size={11} />
              Switch to Project Midnight
            </a>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-mono text-xs text-hj-muted uppercase tracking-widest mb-4">
              Navigation
            </h3>
            <ul className="flex flex-col gap-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-hj-secondary hover:text-hj-primary text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-mono text-xs text-hj-muted uppercase tracking-widest mb-4">
              Connect
            </h3>
            <ul className="flex flex-col gap-2.5">
              {SOCIAL_LINKS.map(({ href, label, icon: Icon }) => (
                <li key={href}>
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-2 text-hj-secondary hover:text-hj-primary text-sm transition-colors group"
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
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-hj-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-mono text-xs text-hj-muted">
            © {currentYear} highjump. All rights reserved.
          </p>
          <p className="font-mono text-xs text-hj-muted">
            Built with{" "}
            <span className="text-hj-primary">Next.js</span>
            {" + "}
            <span className="text-hj-accent">FastAPI</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
