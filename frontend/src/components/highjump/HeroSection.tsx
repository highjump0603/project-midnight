"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Github } from "lucide-react";

const NAME = "송윤찬";

export default function HighjumpHeroSection() {
  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden bg-hj-bg">
      {/* Dot grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#CBD5E1 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          opacity: 0.6,
        }}
      />
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-hj-primary-light/70 via-transparent to-hj-accent-light/50 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-hj-bg via-transparent to-transparent pointer-events-none" />
      {/* Center glow */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-hj-primary/5 blur-[100px] pointer-events-none" />

      <div className="relative z-10 section-container py-28 md:py-0 md:min-h-[100svh] md:flex md:items-center">
        <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-2xl gap-6">

          {/* Code label */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <span className="inline-block font-mono text-xs text-hj-primary bg-hj-primary-light px-2 py-0.5 rounded border border-hj-primary/20">
              &lt; developer /&gt;
            </span>
          </motion.div>

          {/* Name + role */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-2"
          >
            <p className="text-hj-secondary text-lg font-display">안녕하세요,</p>
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold text-hj-text leading-tight tracking-tight">
              {NAME}
              <span className="text-hj-primary">.</span>
            </h1>
            <p
              className="font-display text-xl sm:text-2xl font-semibold"
              style={{
                background: "linear-gradient(135deg, #3B5BDB 0%, #6366F1 50%, #F97316 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              풀스택 개발자 · at highjump.
            </p>
          </motion.div>

          {/* Intro */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6 }}
            className="text-hj-secondary text-base max-w-md leading-relaxed"
          >
            소프트웨어 공학을 전공하며 자정에 가장 집중하는 개발자입니다.
            깔끔한 코드와 좋은 사용자 경험을 추구합니다.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex flex-wrap gap-3"
          >
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 bg-hj-accent text-white font-mono font-semibold text-sm rounded-xl shadow-hj-accent hover:bg-hj-accent-dark transition-all duration-200 active:scale-95"
            >
              View Projects
              <ArrowRight size={15} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-hj-border text-hj-secondary font-mono text-sm rounded-xl hover:border-hj-primary/40 hover:text-hj-primary hover:bg-hj-primary-light transition-all duration-200 active:scale-95"
            >
              Contact Me
            </Link>
          </motion.div>

          {/* GitHub */}
          <motion.a
            href="https://github.com/highjump0603"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="inline-flex items-center gap-2 font-mono text-xs text-hj-muted hover:text-hj-primary transition-colors group"
          >
            <Github size={14} className="group-hover:scale-110 transition-transform" />
            github.com/highjump0603
          </motion.a>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-xs text-hj-muted">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-hj-muted/50 to-transparent" />
      </motion.div>
    </section>
  );
}
