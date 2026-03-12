"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";

const NAME = "송윤찬";

const STATS = [
  { number: "2+", label: "Years\nExperience" },
  { number: "10+", label: "Projects\nBuilt" },
  { number: "Full", label: "Stack\nDeveloper" },
  { number: "∞", label: "Cups of\nCoffee" },
];

export default function HighjumpHeroSection() {
  return (
    <section className="min-h-[100svh] bg-white flex flex-col">
      {/* Main grid */}
      <div className="flex-1 section-container grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center pt-28 pb-0 lg:pt-0">

        {/* Left: Typography */}
        <motion.div
          className="lg:col-span-7 flex flex-col"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-hj-muted mb-5">
            Portfolio · 2025
          </p>

          <h1
            className="font-display font-black leading-[0.9] tracking-tight text-[#09090B]"
            style={{ fontSize: "clamp(3.8rem, 10vw, 8rem)" }}
          >
            {NAME}
          </h1>

          <div className="mt-5 flex items-center gap-3">
            <div className="h-[2px] w-8 bg-hj-primary shrink-0" />
            <p className="font-mono text-sm text-hj-primary">Full-Stack Developer</p>
          </div>

          <p className="mt-6 text-hj-secondary text-[15px] leading-relaxed max-w-sm">
            소프트웨어 공학을 전공하며 자정에 가장 집중하는 개발자.
            깔끔한 코드와 좋은 사용자 경험을 추구합니다.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#09090B] text-white font-mono text-sm font-semibold rounded-full hover:bg-hj-primary transition-colors duration-200"
            >
              Projects
              <ArrowUpRight size={14} />
            </Link>
            <a
              href="https://github.com/highjump0603"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border border-hj-border text-hj-secondary font-mono text-sm rounded-full hover:border-hj-primary hover:text-hj-primary transition-all duration-200"
            >
              <Github size={14} />
              GitHub
            </a>
          </div>
        </motion.div>

        {/* Right: Stats */}
        <motion.div
          className="lg:col-span-5 grid grid-cols-2 gap-3 pb-10 lg:pb-0"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {STATS.map((stat, i) => (
            <div
              key={i}
              className={`p-6 rounded-2xl border transition-all duration-300 group cursor-default ${
                i === 0
                  ? "bg-[#09090B] border-[#09090B] hover:bg-hj-primary hover:border-hj-primary"
                  : "bg-white border-hj-border hover:border-hj-primary/40 hover:shadow-hj-card"
              }`}
            >
              <p
                className={`font-display font-black text-4xl leading-none ${
                  i === 0 ? "text-white" : "text-[#09090B]"
                }`}
              >
                {stat.number}
              </p>
              <p
                className={`mt-2.5 font-mono text-[11px] whitespace-pre-line leading-relaxed uppercase tracking-wide ${
                  i === 0 ? "text-white/50" : "text-hj-muted"
                }`}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom status bar */}
      <div className="border-t border-hj-border">
        <div className="section-container flex items-center justify-between h-12">
          <p className="font-mono text-[11px] text-hj-muted">
            Available for new opportunities
          </p>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <p className="font-mono text-[11px] text-hj-muted">Open to work</p>
          </div>
        </div>
      </div>
    </section>
  );
}
