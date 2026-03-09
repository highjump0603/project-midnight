"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import MoonIcon from "@/components/ui/MoonIcon";

const NAV_LINKS = [
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-glass border-b border-midnight-600/40 shadow-[0_2px_20px_rgba(0,0,0,0.4)]"
            : "bg-transparent"
        }`}
      >
        <nav className="section-container flex items-center justify-between h-16">
          {/* Brand */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group"
            aria-label="Project Midnight Home"
          >
            <MoonIcon
              size={28}
              className="text-silver-50 group-hover:drop-shadow-[0_0_8px_rgba(123,123,255,0.8)] transition-all duration-300"
            />
            <span className="font-mono text-sm font-medium text-silver-50 hidden sm:block">
              <span className="text-moon-glow">&lt;</span>
              {" Project Midnight "}
              <span className="text-moon-glow">/&gt;</span>
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
                    className={`relative px-4 py-2 font-mono text-sm transition-colors duration-200 rounded-md ${
                      isActive
                        ? "text-star-blue"
                        : "text-silver-200 hover:text-silver-50"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute inset-0 bg-midnight-700 rounded-md border border-moon-glow/20"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-silver-200 hover:text-silver-50 p-2 rounded-md hover:bg-midnight-700 transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden bg-midnight-950/95 backdrop-blur-xl flex flex-col items-center justify-center"
          >
            <motion.ul
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: { transition: { staggerChildren: 0.07 } },
                closed: {},
              }}
              className="flex flex-col items-center gap-6"
            >
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href || pathname.startsWith(link.href);
                return (
                  <motion.li
                    key={link.href}
                    variants={{
                      open: { opacity: 1, y: 0 },
                      closed: { opacity: 0, y: 20 },
                    }}
                  >
                    <Link
                      href={link.href}
                      className={`font-display text-3xl font-semibold transition-colors ${
                        isActive
                          ? "text-star-blue text-glow"
                          : "text-silver-100 hover:text-silver-50"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                );
              })}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
