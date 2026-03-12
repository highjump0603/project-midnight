"use client";

import { motion } from "framer-motion";
import { Code2, Cpu, Globe, BookOpen, User } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

const NAME = "송윤찬";

// 기술 스택 — symbol: 아이콘 대신 표시할 약자/기호, color: 브랜드 색상
const TECH_ITEMS = [
  // Frontend
  { name: "Next.js",      symbol: "N↗",  color: "#ffffff", category: "Frontend",  proficiency: 85, duration: "2년+" },
  { name: "React",        symbol: "⚛",   color: "#61DAFB", category: "Frontend",  proficiency: 85, duration: "2년+" },
  { name: "TypeScript",   symbol: "TS",  color: "#3178C6", category: "Frontend",  proficiency: 80, duration: "1년 6개월" },
  { name: "Tailwind CSS", symbol: "TW",  color: "#06B6D4", category: "Frontend",  proficiency: 90, duration: "2년" },
  { name: "Framer Motion",symbol: "FM",  color: "#BB4FE8", category: "Frontend",  proficiency: 70, duration: "1년" },
  // Backend
  { name: "Python",       symbol: "Py",  color: "#3776AB", category: "Backend",   proficiency: 85, duration: "3년+" },
  { name: "FastAPI",      symbol: "⚡",   color: "#009688", category: "Backend",   proficiency: 80, duration: "1년 6개월" },
  { name: "Node.js",      symbol: "⬡",   color: "#539E43", category: "Backend",   proficiency: 65, duration: "1년" },
  { name: "PostgreSQL",   symbol: "PG",  color: "#336791", category: "Backend",   proficiency: 70, duration: "1년" },
  { name: "Redis",        symbol: "Re",  color: "#DC382D", category: "Backend",   proficiency: 55, duration: "6개월" },
  // DevOps
  { name: "Linux",        symbol: "🐧",   color: "#FCC624", category: "DevOps",   proficiency: 70, duration: "2년" },
  { name: "Nginx",        symbol: "Nx",  color: "#009639", category: "DevOps",   proficiency: 65, duration: "1년" },
  { name: "Docker",       symbol: "🐳",   color: "#2496ED", category: "DevOps",   proficiency: 65, duration: "1년" },
  { name: "Git",          symbol: "Git", color: "#F05032", category: "DevOps",   proficiency: 85, duration: "3년" },
  // 학습 중
  { name: "Rust",         symbol: "Rs",  color: "#CE422B", category: "학습 중",   proficiency: 20, duration: "3개월" },
  { name: "System Design",symbol: "SD",  color: "#8B5CF6", category: "학습 중",   proficiency: 30, duration: "6개월" },
  { name: "Cloud (AWS)",  symbol: "☁",   color: "#FF9900", category: "학습 중",   proficiency: 25, duration: "3개월" },
];

const CATEGORIES = ["Frontend", "Backend", "DevOps", "학습 중"] as const;

const CATEGORY_COLOR: Record<string, string> = {
  "Frontend":  "text-star-blue border-star-blue/20 bg-star-blue/5",
  "Backend":   "text-moon-glow border-moon-glow/20 bg-moon-glow/5",
  "DevOps":    "text-emerald-400 border-emerald-400/20 bg-emerald-400/5",
  "학습 중":   "text-purple-400 border-purple-400/20 bg-purple-400/5",
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

function TechCard({ item, index }: { item: typeof TECH_ITEMS[0]; index: number }) {
  const barColor =
    item.proficiency >= 80 ? "bg-moon-glow" :
    item.proficiency >= 60 ? "bg-star-blue" :
    item.proficiency >= 40 ? "bg-silver-400" :
    "bg-purple-400";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35 + index * 0.04, duration: 0.4 }}
      className="bg-midnight-900/60 rounded-xl border border-midnight-700/50 p-4 flex flex-col gap-3 hover:border-midnight-600/70 transition-colors"
    >
      {/* Top row */}
      <div className="flex items-center gap-3">
        {/* Icon badge */}
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 font-mono font-bold text-xs select-none"
          style={{ backgroundColor: `${item.color}18`, border: `1px solid ${item.color}30`, color: item.color }}
        >
          {item.symbol}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <span className="font-display text-sm font-semibold text-silver-50 truncate">{item.name}</span>
            <span className="font-mono text-xs text-silver-500 shrink-0">{item.proficiency}%</span>
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <span className={`font-mono text-[10px] px-1.5 py-0.5 rounded-full border ${CATEGORY_COLOR[item.category]}`}>
              {item.category}
            </span>
            <span className="font-mono text-[10px] text-silver-600">{item.duration}</span>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 rounded-full bg-midnight-800/80 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${item.proficiency}%` }}
          transition={{ delay: 0.5 + index * 0.04, duration: 0.7, ease: "easeOut" }}
          className={`h-full rounded-full ${barColor}`}
        />
      </div>
    </motion.div>
  );
}

export default function MidnightAboutPage() {
  return (
    <main className="section-padding">
      <div className="section-container max-w-4xl">

        <motion.section {...fadeUp} transition={{ duration: 0.6, delay: 0.1 }} className="mb-20">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
            {/* Avatar */}
            <div className="relative shrink-0">
              <div className="w-24 h-24 rounded-2xl bg-midnight-800 border border-midnight-700/60 flex items-center justify-center">
                <User size={36} className="text-moon-glow/50" />
              </div>
              {/* Online dot */}
              <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-midnight-950 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
              </div>
            </div>

            {/* Info */}
            <div className="flex flex-col gap-3">
              <div>
                <span className="font-mono text-xs text-moon-glow/70 mb-2 block">// about me</span>
                <h1 className="font-display text-4xl sm:text-5xl font-bold text-silver-50 leading-tight">
                  {NAME}
                </h1>
                <p className="font-mono text-sm text-silver-400 mt-1.5">
                  소프트웨어 공학과 · 풀스택 개발자
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section {...fadeUp} transition={{ duration: 0.6, delay: 0.2 }} className="mb-20">
          <SectionHeading label="// history" title="Timeline" className="mb-10" />
          <div className="relative pl-8">
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
                  <div className="absolute -left-[1.45rem] top-1.5 w-2.5 h-2.5 rounded-full bg-moon-glow/70 border-2 border-midnight-950 shadow-[0_0_8px_rgba(123,123,255,0.5)]" />
                  <div className="bg-glass rounded-xl p-5 border border-midnight-600/40 hover:border-moon-glow/20 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-mono text-xs text-moon-glow">{item.year}</span>
                      <span className={`font-mono text-xs px-2 py-0.5 rounded-full ${
                        item.type === "education"
                          ? "bg-star-blue/10 text-star-blue border border-star-blue/20"
                          : "bg-moon-glow/10 text-moon-glow border border-moon-glow/20"
                      }`}>
                        {item.type === "education" ? "교육" : "프로젝트"}
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

        {/* 기술 스택 */}
        <motion.section {...fadeUp} transition={{ duration: 0.6, delay: 0.3 }} className="mb-20">
          <SectionHeading label="// tools" title="기술 스택" className="mb-8" />

          {/* 숙련도 범례 */}
          <div className="flex flex-wrap items-center gap-4 mb-8 p-3 bg-midnight-900/40 rounded-xl border border-midnight-700/40">
            <span className="font-mono text-[10px] text-silver-500">숙련도</span>
            {[
              { label: "80%+ 숙련", color: "bg-moon-glow" },
              { label: "60%+ 능숙", color: "bg-star-blue" },
              { label: "40%+ 기초", color: "bg-silver-400" },
              { label: "학습 중", color: "bg-purple-400" },
            ].map(({ label, color }) => (
              <div key={label} className="flex items-center gap-1.5">
                <div className={`w-2.5 h-2.5 rounded-full ${color}`} />
                <span className="font-mono text-[10px] text-silver-500">{label}</span>
              </div>
            ))}
          </div>

          <div className="space-y-8">
            {CATEGORIES.map((cat) => {
              const items = TECH_ITEMS.filter((t) => t.category === cat);
              return (
                <div key={cat}>
                  <h3 className={`font-mono text-xs px-2.5 py-1 rounded-full border w-fit mb-4 ${CATEGORY_COLOR[cat]}`}>
                    {cat}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {items.map((item, i) => (
                      <TechCard key={item.name} item={item} index={i} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.section>

        <motion.section {...fadeUp} transition={{ duration: 0.6, delay: 0.4 }}>
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
