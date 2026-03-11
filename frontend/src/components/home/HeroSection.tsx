"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Code2 } from "lucide-react";
import StarField from "@/components/ui/StarField";
import MoonIcon from "@/components/ui/MoonIcon";
import AnimatedText from "@/components/ui/AnimatedText";

const TECH_STACK = ["Next.js", "TypeScript", "FastAPI", "Python"];

export default function HeroSection() {
  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-midnight-950">
      {/* Star background */}
      <StarField starCount={180} />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-midnight-950/20 to-midnight-900 pointer-events-none" />

      {/* Radial glow behind content */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-moon-glow/5 blur-[100px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 section-container text-center flex flex-col items-center gap-8 py-32">
        {/* Logo mark */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-2"
        >
          <div className="relative inline-block">
            <MoonIcon
              size={72}
              className="text-silver-50 drop-shadow-[0_0_30px_rgba(123,123,255,0.5)]"
            />
            {/* Orbit ring */}
            <div className="absolute inset-0 -m-3 rounded-full border border-moon-glow/20 animate-[spin_20s_linear_infinite]" />
          </div>
        </motion.div>

        {/* Code label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <span className="code-label flex items-center gap-1.5">
            <Code2 size={12} />
            소프트웨어 개발자
          </span>
        </motion.div>

        {/* Main heading */}
        <div className="flex flex-col items-center gap-3">
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight">
            <AnimatedText
              text="코드로 만드는,"
              className="text-silver-50"
              delay={0.3}
              staggerDelay={0.025}
            />
            <br />
            <AnimatedText
              text="at midnight."
              className="text-gradient-midnight"
              delay={0.55}
              staggerDelay={0.03}
            />
          </h1>
        </div>

        {/* Sub heading */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95, duration: 0.6 }}
          className="font-mono text-silver-300 text-sm sm:text-base max-w-lg leading-relaxed"
        >
          {"// 소프트웨어 공학 전공 → 풀스택 개발자"}
          <br />
          {"// 풀스택 · 클린 아키텍처 · 좋은 디자인"}
        </motion.p>

        {/* Tech stack badges */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-2"
        >
          {TECH_STACK.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 bg-midnight-800/60 border border-midnight-600/50 rounded-full text-xs font-mono text-silver-300 hover:border-moon-glow/40 hover:text-silver-100 transition-colors"
            >
              {tech}
            </span>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4 mt-2"
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-star-gold text-midnight-950 font-mono font-semibold text-sm rounded-xl shadow-gold-glow hover:bg-yellow-400 hover:shadow-[0_0_30px_rgba(255,215,0,0.6)] transition-all duration-200 active:scale-95"
          >
            프로젝트 보기
            <ArrowRight size={16} />
          </Link>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-transparent border border-silver-300/30 text-silver-100 font-mono text-sm rounded-xl hover:border-silver-100/60 hover:bg-midnight-700 transition-all duration-200 active:scale-95"
          >
            블로그 읽기
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="font-mono text-xs text-silver-400">스크롤</span>
          <div className="w-px h-12 bg-gradient-to-b from-silver-400/50 to-transparent animate-[fade-in-up_2s_ease-in-out_infinite]" />
        </motion.div>
      </div>
    </section>
  );
}
