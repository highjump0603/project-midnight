"use client";

import { motion } from "framer-motion";
import StarField from "@/components/ui/StarField";

export default function HeroSection() {
  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden bg-midnight-950">
      <StarField starCount={180} />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-midnight-950/20 to-midnight-900 pointer-events-none" />

      <div className="relative z-10 section-container py-28 md:py-0 md:min-h-[100svh] md:flex md:items-center">
        <div className="flex flex-col items-center w-full">
          {/* ── 텍스트 ── */}
          <div className="flex flex-col items-center gap-6 text-center max-w-2xl">
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-[clamp(2rem,10vw,4.5rem)] font-bold text-silver-50 leading-[1.05] tracking-tight whitespace-nowrap drop-shadow-[0_0_14px_rgba(196,214,255,0.28)]"
            >
              Project Midnight
            </motion.h1>

            {/* 소개 */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.6 }}
              className="text-silver-300 text-base max-w-xl leading-relaxed"
            >
              AI를 도구로 삼아 더 빠르게 실험하고,
              <span className="mt-3 block text-sm text-silver-400">
                더 정확하게 완성한다.
              </span>
            </motion.p>
          </div>
        </div>
      </div>

      {/* 스크롤 인디케이터 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.5 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-xs text-silver-400">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-silver-400/50 to-transparent animate-[fade-in-up_2s_ease-in-out_infinite]" />
      </motion.div>
    </section>
  );
}
