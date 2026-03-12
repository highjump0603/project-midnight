"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Moon } from "lucide-react";

const NAV_LINKS = [
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function HighjumpNavbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#09090B] border-b border-white/10">
        <nav className="section-container flex items-center justify-between h-14">
          {/* Brand */}
          <Link href="/" className="font-display font-black text-lg text-white tracking-tight">
            highjump<span className="text-hj-accent">.</span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-0.5">
            {NAV_LINKS.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`px-4 py-2 font-mono text-sm rounded-md transition-colors duration-150 ${
                      isActive
                        ? "text-white bg-white/10"
                        : "text-white/50 hover:text-white hover:bg-white/8"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="hidden md:flex items-center">
            <a
              href="https://project-midnight.dev"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 font-mono text-xs text-white/40 border border-white/10 rounded-lg hover:text-white/80 hover:border-white/20 transition-all duration-200"
            >
              <Moon size={11} />
              midnight
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 text-white/60 hover:text-white transition-colors"
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
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="fixed top-14 left-0 right-0 z-40 md:hidden bg-[#09090B] border-b border-white/10"
          >
            <div className="section-container py-3 flex flex-col gap-0.5">
              {NAV_LINKS.map((link) => {
                const isActive =
                  pathname === link.href || pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-4 py-3 font-mono text-sm rounded-lg transition-colors ${
                      isActive
                        ? "text-white bg-white/10"
                        : "text-white/50 hover:text-white hover:bg-white/8"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className="px-4 py-3 mt-1 border-t border-white/10">
                <a
                  href="https://project-midnight.dev"
                  className="inline-flex items-center gap-1.5 font-mono text-xs text-white/40 hover:text-white/80 transition-colors"
                >
                  <Moon size={12} />
                  Switch to midnight
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
