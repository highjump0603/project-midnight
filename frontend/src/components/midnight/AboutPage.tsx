"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { User } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import TechIcon from "@/components/ui/TechIcon";
import type { TechItem, TimelineItem } from "@/lib/api";

const NAME = "송윤찬";

const TYPE_STYLE: Record<string, string> = {
  "학업":     "bg-star-blue/10 text-star-blue border-star-blue/20",
  "경력":     "bg-moon-glow/10 text-moon-glow border-moon-glow/20",
  "프로젝트": "bg-emerald-400/10 text-emerald-400 border-emerald-400/20",
  "대외활동": "bg-purple-400/10 text-purple-400 border-purple-400/20",
  "수상":     "bg-star-gold/10 text-star-gold border-star-gold/20",
};

function getCategoryColor(category: string) {
  const map: Record<string, string> = {
    "Frontend": "text-star-blue border-star-blue/20 bg-star-blue/5",
    "Backend":  "text-moon-glow border-moon-glow/20 bg-moon-glow/5",
    "DevOps":   "text-emerald-400 border-emerald-400/20 bg-emerald-400/5",
  };
  return map[category] ?? "text-purple-400 border-purple-400/20 bg-purple-400/5";
}

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

function TechCard({ item, index }: { item: TechItem; index: number }) {
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
      <div className="flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
          style={{ backgroundColor: `${item.color}18`, border: `1px solid ${item.color}30` }}
        >
          <TechIcon iconKey={item.icon_key} size={18} color={item.color} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <span className="font-display text-sm font-semibold text-silver-50 truncate">{item.name}</span>
            <span className="font-mono text-xs text-silver-500 shrink-0">{item.proficiency}%</span>
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <span className={`font-mono text-[10px] px-1.5 py-0.5 rounded-full border ${getCategoryColor(item.category)}`}>
              {item.category}
            </span>
            <span className="font-mono text-[10px] text-silver-600">{item.duration}</span>
          </div>
        </div>
      </div>
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
  const [techItems, setTechItems] = useState<TechItem[]>([]);
  const [timelineItems, setTimelineItems] = useState<TimelineItem[]>([]);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? "/api";
    fetch(`${apiUrl}/settings`)
      .then((r) => r.json())
      .then((data) => {
        if (data.tech_items?.length > 0) setTechItems(data.tech_items);
        if (data.timeline_items?.length > 0) setTimelineItems(data.timeline_items);
      })
      .catch(() => {});
  }, []);

  // Group tech items by category (preserve insertion order)
  const categories = Array.from(new Set(techItems.map((t) => t.category)));

  // Group history items by type (preserve insertion order)
  const historyTypes = Array.from(new Set(timelineItems.map((item) => item.type)));

  return (
    <main className="section-padding">
      <div className="section-container max-w-4xl">

        {/* Hero */}
        <motion.section {...fadeUp} transition={{ duration: 0.6, delay: 0.1 }} className="mb-20">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
            <div className="relative shrink-0">
              <div className="w-24 h-24 rounded-2xl bg-midnight-800 border border-midnight-700/60 flex items-center justify-center">
                <User size={36} className="text-moon-glow/50" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-midnight-950 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div>
                <span className="font-mono text-xs text-moon-glow/70 mb-2 block">// about me</span>
                <h1 className="font-display text-4xl sm:text-5xl font-bold text-silver-50 leading-tight">
                  {NAME}
                </h1>
                <p className="font-mono text-sm text-silver-400 mt-1.5">
                  숭실대학교 AI소프트웨어학부 재학중
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* 이력 카테고리 */}
        {timelineItems.length > 0 && (
          <motion.section {...fadeUp} transition={{ duration: 0.6, delay: 0.2 }} className="mb-20">
            <div className="space-y-12">
              {historyTypes.map((type, typeIndex) => {
                const items = timelineItems.filter((item) => item.type === type);
                return (
                  <motion.div
                    key={type}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.28 + typeIndex * 0.08, duration: 0.45 }}
                    className="rounded-2xl border border-midnight-700/50 bg-midnight-900/35 p-5 sm:p-6"
                  >
                    <SectionHeading
                      title={type}
                      className="mb-5"
                    />

                    <div className="relative pl-8">
                      <div className="absolute left-2.5 top-1 bottom-1 w-px bg-gradient-to-b from-moon-glow/40 via-midnight-600/60 to-transparent" />
                      <div className="space-y-5">
                      {items.map((item, i) => (
                        <motion.div
                          key={`${type}-${i}`}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.32 + i * 0.05, duration: 0.4 }}
                          className="relative"
                        >
                          <div className="absolute -left-[1.45rem] top-2 w-2.5 h-2.5 rounded-full bg-moon-glow/70 border-2 border-midnight-950 shadow-[0_0_8px_rgba(123,123,255,0.5)]" />
                          <div className="bg-glass rounded-xl p-5 border border-midnight-600/40 hover:border-moon-glow/25 transition-colors">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="font-mono text-xs px-2 py-0.5 rounded-full border border-moon-glow/20 bg-moon-glow/10 text-moon-glow">
                                {item.year}
                              </span>
                            </div>
                            <h4 className="font-display font-semibold text-silver-50 mb-1">{item.title}</h4>
                            <p className="text-silver-300 text-sm leading-relaxed">{item.description}</p>
                          </div>
                        </motion.div>
                      ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>
        )}

        {/* 기술 스택 */}
        {techItems.length > 0 && (
          <motion.section {...fadeUp} transition={{ duration: 0.6, delay: 0.3 }} className="mb-20">
            <SectionHeading label="// tools" title="기술 스택" className="mb-8" />
            <div className="space-y-8">
              {categories.map((cat) => {
                const items = techItems.filter((t) => t.category === cat);
                return (
                  <div key={cat}>
                    <h3 className={`font-mono text-xs px-2.5 py-1 rounded-full border w-fit mb-4 ${getCategoryColor(cat)}`}>
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
        )}

      </div>
    </main>
  );
}
