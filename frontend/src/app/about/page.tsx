"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Github, Mail, Code2, Cpu, Globe, BookOpen } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

// metadata는 layout.tsx에서 상속받음

// TODO: 아래 이름을 실제 이름으로 교체하세요
const NAME = "[이름]";

const TECH_STACK = {
  Frontend: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],
  Backend: ["FastAPI", "Python", "Node.js", "PostgreSQL", "Redis"],
  DevOps: ["Linux", "Nginx", "Docker", "Git", "GitHub Actions"],
  "Currently Learning": ["Rust", "System Design", "Cloud Architecture"],
};

const TIMELINE = [
  {
    year: "2024",
    title: "소프트웨어 공학과 재학 중",
    description: "전공 심화 과정을 이수하며 알고리즘, 운영체제, 데이터베이스를 깊이 학습.",
    type: "education",
  },
  {
    year: "2023",
    title: "풀스택 개발 시작",
    description: "FastAPI + Next.js 스택으로 첫 풀스택 프로젝트를 완성. 개인 포트폴리오 사이트 구축.",
    type: "project",
  },
  {
    year: "2022",
    title: "개발자의 길로",
    description: "소프트웨어 공학과 입학. Python을 시작으로 프로그래밍의 세계에 입문.",
    type: "education",
  },
];

const VALUES = [
  {
    icon: Code2,
    title: "Clean Code",
    description: "Writing code that reads like prose — clear, purposeful, and easy to maintain.",
  },
  {
    icon: Cpu,
    title: "Deep Understanding",
    description: "Going beyond surface-level. Understanding how things work under the hood.",
  },
  {
    icon: Globe,
    title: "Full Stack Thinking",
    description: "Seeing the whole picture — from database schema to pixel-perfect UI.",
  },
  {
    icon: BookOpen,
    title: "Continuous Learning",
    description: "Software evolves fast. Staying curious and building in public.",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export default function AboutPage() {
  return (
    <main className="section-padding">
      <div className="section-container max-w-4xl">

        {/* ── 프로필 히어로 ── */}
        <motion.section
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col sm:flex-row items-center sm:items-start gap-10 mb-20"
        >
          {/* 프로필 사진 */}
          <div className="shrink-0 relative">
            <div className="absolute inset-0 rounded-full bg-moon-glow/15 blur-2xl scale-110" />
            <div className="absolute inset-0 -m-3 rounded-full border border-moon-glow/20 animate-[spin_24s_linear_infinite]" />
            <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden border-2 border-moon-glow/40 shadow-[0_0_40px_rgba(123,123,255,0.25)]">
              <Image
                src="/images/profile.jpg"
                alt={NAME}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* 텍스트 */}
          <div className="flex flex-col gap-4 text-center sm:text-left items-center sm:items-start">
            <div>
              <p className="font-mono text-sm text-star-blue mb-1">// about me</p>
              <h1 className="font-display text-4xl sm:text-5xl font-bold text-silver-50">
                {NAME}
                <span className="text-moon-glow">.</span>
              </h1>
              <p className="font-display text-lg text-silver-300 mt-1">
                소프트웨어 공학과 · 풀스택 개발자
              </p>
            </div>
            <p className="text-silver-200 leading-relaxed text-base max-w-md">
              자정에 가장 집중하는 개발자입니다. 깔끔한 코드, 좋은 아키텍처, 그리고
              사용자 경험에 깊은 관심을 가지고 있으며 소프트웨어로 문제를 해결하는 것을
              즐깁니다.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/highjump0603"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-midnight-800 border border-midnight-600/60 hover:border-moon-glow/40 text-silver-200 hover:text-silver-50 font-mono text-sm rounded-lg transition-all duration-200"
              >
                <Github size={14} />
                GitHub
              </a>
              <a
                href="mailto:hello@project-midnight.dev"
                className="inline-flex items-center gap-2 px-4 py-2 bg-midnight-800 border border-midnight-600/60 hover:border-star-blue/40 text-silver-200 hover:text-silver-50 font-mono text-sm rounded-lg transition-all duration-200"
              >
                <Mail size={14} />
                Email
              </a>
            </div>
          </div>
        </motion.section>

        {/* ── 타임라인 ── */}
        <motion.section
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-20"
        >
          <SectionHeading label="// history" title="Timeline" className="mb-10" />
          <div className="relative pl-8">
            {/* 세로 선 */}
            <div className="absolute left-2.5 top-0 bottom-0 w-px bg-gradient-to-b from-moon-glow/40 via-midnight-600/60 to-transparent" />

            <div className="flex flex-col gap-8">
              {TIMELINE.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                  className="relative"
                >
                  {/* 점 */}
                  <div className="absolute -left-[1.45rem] top-1.5 w-2.5 h-2.5 rounded-full bg-moon-glow/70 border-2 border-midnight-950 shadow-[0_0_8px_rgba(123,123,255,0.5)]" />
                  <div className="bg-glass rounded-xl p-5 border border-midnight-600/40 hover:border-moon-glow/20 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-mono text-xs text-moon-glow">{item.year}</span>
                      <span className={`font-mono text-xs px-2 py-0.5 rounded-full ${
                        item.type === "education"
                          ? "bg-star-blue/10 text-star-blue border border-star-blue/20"
                          : "bg-moon-glow/10 text-moon-glow border border-moon-glow/20"
                      }`}>
                        {item.type === "education" ? "Education" : "Project"}
                      </span>
                    </div>
                    <h3 className="font-display font-semibold text-silver-50 mb-1">{item.title}</h3>
                    <p className="text-silver-300 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ── 기술 스택 ── */}
        <motion.section
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-20"
        >
          <SectionHeading label="// tools" title="Tech Stack" className="mb-8" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {Object.entries(TECH_STACK).map(([category, techs]) => (
              <div key={category} className="flex flex-col gap-3">
                <h3 className="font-mono text-xs text-silver-400 uppercase tracking-widest">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {techs.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-xs text-star-blue bg-midnight-800/60 border border-midnight-600/40 hover:border-star-blue/40 hover:text-silver-50 px-3 py-1 rounded-full transition-colors duration-150 cursor-default"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ── Philosophy ── */}
        <motion.section
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <SectionHeading label="// philosophy" title="How I Work" className="mb-8" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {VALUES.map(({ icon: Icon, title, description }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.08, duration: 0.5 }}
                className="bg-glass rounded-xl p-6 border border-midnight-600/40 hover:border-moon-glow/20 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-lg bg-midnight-700 border border-midnight-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon size={16} className="text-star-blue" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-silver-50 mb-1.5">{title}</h3>
                    <p className="text-silver-300 text-sm leading-relaxed">{description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

      </div>
    </main>
  );
}
