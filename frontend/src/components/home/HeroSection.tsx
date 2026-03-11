"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Github } from "lucide-react";
import StarField from "@/components/ui/StarField";

const NAME = "송윤찬";

export default function HeroSection() {
  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden bg-midnight-950">
      <StarField starCount={180} />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-midnight-950/20 to-midnight-900 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-moon-glow/5 blur-[120px]" />
      </div>

      <div className="relative z-10 section-container py-28 md:py-0 md:min-h-[100svh] md:flex md:items-center">
        <div className="flex flex-col-reverse md:flex-row items-center gap-12 md:gap-16 w-full">

          {/* ── 좌측: 텍스트 ── */}
          <div className="flex-1 flex flex-col gap-6 text-center md:text-left items-center md:items-start">

            {/* code label */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <span className="code-label">&lt;/ developer &gt;</span>
            </motion.div>

            {/* 인사 + 이름 + 역할 */}
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-2"
            >
              <p className="text-silver-300 text-lg font-display">안녕하세요,</p>
              <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold text-silver-50 leading-tight tracking-tight">
                {NAME}
                <span className="text-moon-glow">.</span>
              </h1>
              <p className="font-display text-xl sm:text-2xl font-semibold text-gradient-midnight">
                풀스택 개발자 · at midnight.
              </p>
            </motion.div>

            {/* 소개 */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.6 }}
              className="text-silver-300 text-base max-w-md leading-relaxed"
            >
              소프트웨어 공학을 전공하며 자정에 가장 집중하는 개발자입니다.
              깔끔한 코드와 좋은 사용자 경험을 추구합니다.
            </motion.p>

            {/* CTA 버튼 */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="flex flex-wrap gap-3"
            >
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-6 py-3 bg-star-gold text-midnight-950 font-mono font-semibold text-sm rounded-xl shadow-gold-glow hover:bg-yellow-400 hover:shadow-[0_0_30px_rgba(255,215,0,0.6)] transition-all duration-200 active:scale-95"
              >
                View Projects
                <ArrowRight size={15} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-transparent border border-silver-300/30 text-silver-100 font-mono text-sm rounded-xl hover:border-silver-100/60 hover:bg-midnight-700 transition-all duration-200 active:scale-95"
              >
                Contact Me
              </Link>
            </motion.div>

            {/* GitHub 링크 */}
            <motion.a
              href="https://github.com/highjump0603"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="inline-flex items-center gap-2 font-mono text-xs text-silver-400 hover:text-silver-100 transition-colors group"
            >
              <Github size={14} className="group-hover:text-moon-glow transition-colors" />
              github.com/highjump0603
            </motion.a>
          </div>

          {/* ── 우측: 프로필 사진 ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="shrink-0 flex items-center justify-center"
          >
            <div className="relative">
              {/* 배경 글로우 */}
              <div className="absolute inset-0 rounded-full bg-moon-glow/15 blur-2xl scale-110" />
              {/* 회전 궤도 링 */}
              <div className="absolute inset-0 -m-4 rounded-full border border-moon-glow/20 animate-[spin_24s_linear_infinite]" />
              <div className="absolute inset-0 -m-8 rounded-full border border-star-blue/10 animate-[spin_40s_linear_infinite_reverse]" />
              {/* 프로필 이미지 */}
              <div className="relative w-52 h-52 sm:w-60 sm:h-60 md:w-72 md:h-72 rounded-full overflow-hidden border-2 border-moon-glow/40 shadow-[0_0_40px_rgba(123,123,255,0.25)]">
                <Image
                  src="/images/profile.jpg"
                  alt="Profile"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* 스크롤 인디케이터 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-xs text-silver-400">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-silver-400/50 to-transparent animate-[fade-in-up_2s_ease-in-out_infinite]" />
      </motion.div>
    </section>
  );
}
