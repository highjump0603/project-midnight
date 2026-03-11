"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import StarField from "@/components/ui/StarField";
import MoonIcon from "@/components/ui/MoonIcon";

export default function HeroSection() {
  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-midnight-950">
      {/* Star background */}
      <StarField starCount={180} />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-midnight-950/20 to-midnight-900 pointer-events-none" />

      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-moon-glow/5 blur-[100px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 section-container text-center flex flex-col items-center gap-10 py-32">
        {/* Logo mark */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative inline-block">
            <MoonIcon
              size={64}
              className="text-silver-50 drop-shadow-[0_0_30px_rgba(123,123,255,0.5)]"
            />
            <div className="absolute inset-0 -m-3 rounded-full border border-moon-glow/20 animate-[spin_20s_linear_infinite]" />
          </div>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight"
        >
          <span className="text-silver-50">Project</span>
          <span className="text-gradient-midnight">-Midnight</span>
        </motion.h1>
        
        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-star-gold text-midnight-950 font-mono font-semibold text-sm rounded-xl shadow-gold-glow hover:bg-yellow-400 hover:shadow-[0_0_30px_rgba(255,215,0,0.6)] transition-all duration-200 active:scale-95"
          >
            View Projects
            <ArrowRight size={16} />
          </Link>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-transparent border border-silver-300/30 text-silver-100 font-mono text-sm rounded-xl hover:border-silver-100/60 hover:bg-midnight-700 transition-all duration-200 active:scale-95"
          >
            Read Blog
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="font-mono text-xs text-silver-400">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-silver-400/50 to-transparent animate-[fade-in-up_2s_ease-in-out_infinite]" />
        </motion.div>
      </div>
    </section>
  );
}
