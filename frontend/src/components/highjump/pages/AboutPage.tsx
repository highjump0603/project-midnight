"use client";

import { motion } from "framer-motion";
import { Github, Mail, Code2, Cpu, Globe, BookOpen } from "lucide-react";

const NAME = "송윤찬";

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

const fadeUp = { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 } };

export default function HjAboutPage() {
  return (
    <main className="bg-white min-h-screen">
      <div className="section-container py-20 max-w-3xl">

        {/* Hero */}
        <motion.section {...fadeUp} transition={{ duration: 0.5 }} className="mb-16">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-hj-muted mb-4">
            About
          </p>
          <h1
            className="font-display font-black text-[#09090B] leading-[0.9] mb-5"
            style={{ fontSize: "clamp(3rem, 8vw, 5.5rem)" }}
          >
            {NAME}
          </h1>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-[2px] w-8 bg-hj-primary shrink-0" />
            <p className="font-mono text-sm text-hj-primary">소프트웨어 공학과 · 풀스택 개발자</p>
          </div>
          <p className="text-hj-secondary text-base leading-relaxed max-w-lg mb-7">
            자정에 가장 집중하는 개발자입니다. 깔끔한 코드, 좋은 아키텍처, 그리고
            사용자 경험에 깊은 관심을 가지고 있으며 소프트웨어로 문제를 해결하는 것을
            즐깁니다.
          </p>
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/highjump0603"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#09090B] text-white font-mono text-sm rounded-full hover:bg-hj-primary transition-colors duration-200"
            >
              <Github size={13} />
              GitHub
            </a>
            <a
              href="mailto:hello@highjump.kr"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-hj-border text-hj-secondary font-mono text-sm rounded-full hover:border-hj-primary hover:text-hj-primary transition-all duration-200"
            >
              <Mail size={13} />
              Email
            </a>
          </div>
        </motion.section>

        {/* Divider */}
        <div className="h-px bg-hj-border mb-16" />

        {/* Timeline */}
        <motion.section {...fadeUp} transition={{ duration: 0.5, delay: 0.1 }} className="mb-16">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-hj-muted mb-1">History</p>
          <h2 className="font-display font-black text-2xl text-[#09090B] mb-8">Timeline</h2>

          <div className="relative pl-6 border-l-2 border-hj-border">
            {TIMELINE.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.08, duration: 0.4 }}
                className="relative mb-8 last:mb-0"
              >
                {/* dot */}
                <div className="absolute -left-[1.45rem] top-1.5 w-2.5 h-2.5 rounded-full bg-white border-2 border-hj-primary" />
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-mono text-xs font-bold text-hj-primary">{item.year}</span>
                  <span className={`font-mono text-[11px] px-2 py-0.5 rounded-full border ${
                    item.type === "education"
                      ? "bg-hj-primary-light text-hj-primary border-hj-primary/20"
                      : "bg-hj-accent-light text-hj-accent border-hj-accent/20"
                  }`}>
                    {item.type === "education" ? "Education" : "Project"}
                  </span>
                </div>
                <h3 className="font-display font-bold text-[#09090B] mb-1">{item.title}</h3>
                <p className="text-hj-secondary text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <div className="h-px bg-hj-border mb-16" />

        {/* Tech Stack */}
        <motion.section {...fadeUp} transition={{ duration: 0.5, delay: 0.2 }} className="mb-16">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-hj-muted mb-1">Tools</p>
          <h2 className="font-display font-black text-2xl text-[#09090B] mb-8">Tech Stack</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {Object.entries(TECH_STACK).map(([category, techs]) => (
              <div key={category}>
                <h3 className="font-mono text-xs text-hj-muted uppercase tracking-widest mb-3">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {techs.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-xs text-hj-secondary bg-hj-bg border border-hj-border hover:border-hj-primary hover:text-hj-primary px-3 py-1.5 rounded-full transition-colors duration-150 cursor-default"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        <div className="h-px bg-hj-border mb-16" />

        {/* Values */}
        <motion.section {...fadeUp} transition={{ duration: 0.5, delay: 0.3 }}>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-hj-muted mb-1">Philosophy</p>
          <h2 className="font-display font-black text-2xl text-[#09090B] mb-8">How I Work</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {VALUES.map(({ icon: Icon, title, description }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 + i * 0.07, duration: 0.4 }}
                className="p-6 rounded-2xl border border-hj-border bg-white hover:border-hj-primary/40 hover:shadow-hj-card transition-all duration-300"
              >
                <div className="w-9 h-9 rounded-xl bg-hj-bg border border-hj-border flex items-center justify-center mb-4">
                  <Icon size={16} className="text-hj-primary" />
                </div>
                <h3 className="font-display font-bold text-[#09090B] mb-1.5">{title}</h3>
                <p className="text-hj-secondary text-sm leading-relaxed">{description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

      </div>
    </main>
  );
}
