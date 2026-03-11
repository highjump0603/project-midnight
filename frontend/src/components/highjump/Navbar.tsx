"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Github, Moon } from "lucide-react";

const NAV_LINKS = [
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function HighjumpNavbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
          scrolled
            ? "bg-white/90 backdrop-blur-md border-hj-border shadow-sm"
            : "bg-transparent border-transparent"
        }`}
      >
        <nav className="section-container flex items-center justify-between h-16">
          {/* Brand */}
          <Link href="/" className="flex items-center group" aria-label="highjump Home">
            <span className="font-display text-xl font-bold text-hj-primary group-hover:text-hj-primary-dark transition-colors">
              highjump
              <span className="text-hj-accent">.</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`px-4 py-2 font-mono text-sm rounded-md transition-colors duration-200 ${
                      isActive
                        ? "text-hj-primary bg-hj-primary-light font-medium"
                        : "text-hj-secondary hover:text-hj-text hover:bg-hj-bg"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="hidden md:flex items-center gap-2">
            <a
              href="https://github.com/highjump0603"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-hj-secondary hover:text-hj-text transition-colors rounded-md hover:bg-hj-bg"
              aria-label="GitHub"
            >
              <Github size={18} />
            </a>
            <a
              href="https://project-midnight.dev"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 font-mono text-xs text-hj-secondary border border-hj-border rounded-lg hover:border-hj-primary/40 hover:text-hj-primary transition-all duration-200"
            >
              <Moon size={12} />
              midnight
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded-md text-hj-secondary hover:text-hj-text hover:bg-hj-bg transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 md:hidden bg-white border-b border-hj-border shadow-lg"
          >
            <div className="section-container py-4 flex flex-col gap-1">
              {NAV_LINKS.map((link) => {
                const isActive =
                  pathname === link.href || pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-4 py-3 font-mono text-sm rounded-lg transition-colors ${
                      isActive
                        ? "text-hj-primary bg-hj-primary-light font-medium"
                        : "text-hj-secondary hover:text-hj-text hover:bg-hj-bg"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className="flex items-center gap-4 px-4 py-3 mt-2 border-t border-hj-border">
                <a
                  href="https://github.com/highjump0603"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-mono text-xs text-hj-secondary hover:text-hj-text transition-colors"
                >
                  <Github size={13} />
                  GitHub
                </a>
                <a
                  href="https://project-midnight.dev"
                  className="inline-flex items-center gap-1.5 font-mono text-xs text-hj-secondary hover:text-hj-primary transition-colors"
                >
                  <Moon size={12} />
                  midnight
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
