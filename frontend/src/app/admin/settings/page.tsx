"use client";

import { useState, useEffect } from "react";
import {
  Plus, Trash2, Save, Settings, Link as LinkIcon,
  ChevronUp, ChevronDown, Code2, Clock,
} from "lucide-react";
import { adminGetSettings, adminUpdateSettings } from "@/lib/admin-api";
import TechIcon, { TECH_ICON_OPTIONS } from "@/components/ui/TechIcon";

// ── Types ────────────────────────────────────────────────────────────────────

interface SocialLink { label: string; href: string; icon: string; }
interface TechItem {
  name: string; icon_key: string; color: string;
  category: string; proficiency: number; duration: string;
}
interface TimelineItem {
  year: string; title: string; description: string; type: string;
}

// ── Constants ────────────────────────────────────────────────────────────────

const ICON_OPTIONS = [
  { value: "github", label: "GitHub" },
  { value: "email", label: "Email" },
  { value: "twitter", label: "Twitter / X" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "youtube", label: "YouTube" },
  { value: "instagram", label: "Instagram" },
  { value: "link", label: "기타 링크" },
];

const TIMELINE_TYPES = ["학업", "경력", "프로젝트", "대외활동", "수상"];

const CATEGORY_OPTIONS = ["Frontend", "Backend", "DevOps", "Language", "기타"];

const DEFAULT_COLORS: Record<string, string> = {
  python: "#3776AB", react: "#61DAFB", typescript: "#3178C6",
  javascript: "#F7DF1E", nextjs: "#FFFFFF", tailwindcss: "#06B6D4",
  fastapi: "#009688", postgresql: "#4169E1", docker: "#2496ED",
  git: "#F05032", linux: "#FCC624", nginx: "#009639",
  nodejs: "#339933", redis: "#DC382D", rust: "#CE422B",
  github: "#FFFFFF", go: "#00ADD8", kubernetes: "#326CE5",
  mongodb: "#47A248", mysql: "#4479A1", prisma: "#2D3748",
  graphql: "#E10098", vue: "#4FC08D", svelte: "#FF3E00",
  django: "#092E20", flask: "#FFFFFF", spring: "#6DB33F",
  aws: "#FF9900", gcp: "#4285F4", vercel: "#FFFFFF",
  cloudflare: "#F6821F", java: "#007396", kotlin: "#7F52FF",
  swift: "#FA7343", c: "#A8B9CC", cpp: "#00599C",
};

// ── Helpers ──────────────────────────────────────────────────────────────────

function move<T>(arr: T[], i: number, dir: -1 | 1): T[] {
  const j = i + dir;
  if (j < 0 || j >= arr.length) return arr;
  const next = [...arr];
  [next[i], next[j]] = [next[j], next[i]];
  return next;
}

function SaveBtn({ onClick, saving, saved }: { onClick: () => void; saving: boolean; saved: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={saving}
      className="flex items-center gap-2 px-3 py-1.5 bg-moon-glow/15 border border-moon-glow/40 text-moon-glow font-mono text-xs rounded-lg hover:bg-moon-glow/25 transition-all disabled:opacity-50"
    >
      <Save size={13} />
      {saved ? "저장됨!" : saving ? "저장 중..." : "저장"}
    </button>
  );
}

// ── Main Page ────────────────────────────────────────────────────────────────

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);

  // Social links
  const [links, setLinks] = useState<SocialLink[]>([]);
  const [savingLinks, setSavingLinks] = useState(false);
  const [savedLinks, setSavedLinks] = useState(false);

  // Tech items
  const [techItems, setTechItems] = useState<TechItem[]>([]);
  const [savingTech, setSavingTech] = useState(false);
  const [savedTech, setSavedTech] = useState(false);

  // Timeline
  const [timeline, setTimeline] = useState<TimelineItem[]>([]);
  const [savingTimeline, setSavingTimeline] = useState(false);
  const [savedTimeline, setSavedTimeline] = useState(false);

  useEffect(() => {
    adminGetSettings()
      .then((data) => {
        setLinks(data.social_links ?? []);
        setTechItems(data.tech_items ?? []);
        setTimeline(data.timeline_items ?? []);
      })
      .finally(() => setLoading(false));
  }, []);

  // ── Social links handlers ──

  const addLink = () => setLinks([...links, { label: "", href: "", icon: "link" }]);
  const removeLink = (i: number) => setLinks(links.filter((_, idx) => idx !== i));
  const updateLink = (i: number, field: keyof SocialLink, value: string) =>
    setLinks(links.map((l, idx) => (idx === i ? { ...l, [field]: value } : l)));

  const saveLinks = async () => {
    setSavingLinks(true);
    try {
      await adminUpdateSettings({ social_links: links });
      setSavedLinks(true);
      setTimeout(() => setSavedLinks(false), 2000);
    } finally {
      setSavingLinks(false);
    }
  };

  // ── Tech items handlers ──

  const addTech = () =>
    setTechItems([...techItems, { name: "", icon_key: "react", color: "#61DAFB", category: "Frontend", proficiency: 50, duration: "" }]);
  const removeTech = (i: number) => setTechItems(techItems.filter((_, idx) => idx !== i));
  const updateTech = <K extends keyof TechItem>(i: number, field: K, value: TechItem[K]) =>
    setTechItems(techItems.map((t, idx) => (idx === i ? { ...t, [field]: value } : t)));
  const moveTech = (i: number, dir: -1 | 1) => setTechItems(move(techItems, i, dir));

  const saveTech = async () => {
    setSavingTech(true);
    try {
      await adminUpdateSettings({ tech_items: techItems });
      setSavedTech(true);
      setTimeout(() => setSavedTech(false), 2000);
    } finally {
      setSavingTech(false);
    }
  };

  // ── Timeline handlers ──

  const addTimeline = () =>
    setTimeline([...timeline, { year: "", title: "", description: "", type: "학업" }]);
  const removeTimeline = (i: number) => setTimeline(timeline.filter((_, idx) => idx !== i));
  const updateTimeline = <K extends keyof TimelineItem>(i: number, field: K, value: TimelineItem[K]) =>
    setTimeline(timeline.map((t, idx) => (idx === i ? { ...t, [field]: value } : t)));
  const moveTimeline = (i: number, dir: -1 | 1) => setTimeline(move(timeline, i, dir));

  const saveTimeline = async () => {
    setSavingTimeline(true);
    try {
      await adminUpdateSettings({ timeline_items: timeline });
      setSavedTimeline(true);
      setTimeout(() => setSavedTimeline(false), 2000);
    } finally {
      setSavingTimeline(false);
    }
  };

  // ── Render ──

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-silver-500 font-mono text-sm">
        로딩 중...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-moon-glow/10 border border-moon-glow/20">
          <Settings size={18} className="text-moon-glow" />
        </div>
        <div>
          <h1 className="font-display text-2xl font-bold text-silver-50">사이트 설정</h1>
          <p className="font-mono text-xs text-silver-500 mt-0.5">소셜 링크 · 기술 스택 · 타임라인</p>
        </div>
      </div>

      {/* ── Social Links ─────────────────────────────────────────────────── */}
      <div className="bg-midnight-900/50 rounded-2xl border border-midnight-700/60 p-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <LinkIcon size={14} className="text-moon-glow" />
            <h2 className="font-mono text-sm font-semibold text-silver-200">소셜 링크</h2>
            <span className="font-mono text-xs text-silver-500">— 푸터에 표시됩니다</span>
          </div>
          <SaveBtn onClick={saveLinks} saving={savingLinks} saved={savedLinks} />
        </div>

        <div className="space-y-3">
          {links.map((link, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-midnight-800/60 rounded-xl border border-midnight-700/50">
              <select
                value={link.icon}
                onChange={(e) => updateLink(i, "icon", e.target.value)}
                className="bg-midnight-950 border border-midnight-700/60 text-silver-200 font-mono text-xs px-2 py-1.5 rounded-lg focus:outline-none focus:border-moon-glow/40 w-32 shrink-0"
              >
                {ICON_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <input
                value={link.label}
                onChange={(e) => updateLink(i, "label", e.target.value)}
                placeholder="표시 이름"
                className="bg-midnight-950 border border-midnight-700/60 text-silver-200 font-mono text-xs px-3 py-1.5 rounded-lg focus:outline-none focus:border-moon-glow/40 w-32 shrink-0"
              />
              <input
                value={link.href}
                onChange={(e) => updateLink(i, "href", e.target.value)}
                placeholder="https://..."
                className="bg-midnight-950 border border-midnight-700/60 text-silver-200 font-mono text-xs px-3 py-1.5 rounded-lg focus:outline-none focus:border-moon-glow/40 flex-1 min-w-0"
              />
              <button onClick={() => removeLink(i)} className="p-1.5 rounded-lg text-red-400/60 hover:text-red-400 hover:bg-red-500/10 transition-colors shrink-0">
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={addLink}
          className="mt-3 flex items-center gap-2 font-mono text-xs text-silver-400 hover:text-silver-200 transition-colors px-3 py-2 rounded-xl border border-dashed border-midnight-600/60 hover:border-midnight-500/60 w-full justify-center"
        >
          <Plus size={13} />링크 추가
        </button>
      </div>

      {/* ── Tech Stack ───────────────────────────────────────────────────── */}
      <div className="bg-midnight-900/50 rounded-2xl border border-midnight-700/60 p-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Code2 size={14} className="text-star-blue" />
            <h2 className="font-mono text-sm font-semibold text-silver-200">기술 스택</h2>
            <span className="font-mono text-xs text-silver-500">— About 페이지에 표시됩니다</span>
          </div>
          <SaveBtn onClick={saveTech} saving={savingTech} saved={savedTech} />
        </div>

        <div className="space-y-3">
          {techItems.map((item, i) => (
            <div key={i} className="p-4 bg-midnight-800/60 rounded-xl border border-midnight-700/50 space-y-3">
              {/* Row 1: icon + name + category + color */}
              <div className="flex items-center gap-3 flex-wrap">
                {/* Reorder */}
                <div className="flex flex-col gap-0.5 shrink-0">
                  <button onClick={() => moveTech(i, -1)} className="p-0.5 text-silver-600 hover:text-silver-300 transition-colors">
                    <ChevronUp size={13} />
                  </button>
                  <button onClick={() => moveTech(i, 1)} className="p-0.5 text-silver-600 hover:text-silver-300 transition-colors">
                    <ChevronDown size={13} />
                  </button>
                </div>

                {/* Icon preview */}
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${item.color}20`, border: `1px solid ${item.color}40` }}
                >
                  <TechIcon iconKey={item.icon_key} size={16} color={item.color} />
                </div>

                {/* Icon key */}
                <select
                  value={item.icon_key}
                  onChange={(e) => {
                    const key = e.target.value;
                    updateTech(i, "icon_key", key);
                    if (DEFAULT_COLORS[key]) updateTech(i, "color", DEFAULT_COLORS[key]);
                  }}
                  className="bg-midnight-950 border border-midnight-700/60 text-silver-200 font-mono text-xs px-2 py-1.5 rounded-lg focus:outline-none focus:border-moon-glow/40 w-36 shrink-0"
                >
                  {TECH_ICON_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>

                {/* Name */}
                <input
                  value={item.name}
                  onChange={(e) => updateTech(i, "name", e.target.value)}
                  placeholder="표시 이름"
                  className="bg-midnight-950 border border-midnight-700/60 text-silver-200 font-mono text-xs px-3 py-1.5 rounded-lg focus:outline-none focus:border-moon-glow/40 w-32 shrink-0"
                />

                {/* Category */}
                <select
                  value={item.category}
                  onChange={(e) => updateTech(i, "category", e.target.value)}
                  className="bg-midnight-950 border border-midnight-700/60 text-silver-200 font-mono text-xs px-2 py-1.5 rounded-lg focus:outline-none focus:border-moon-glow/40 w-28 shrink-0"
                >
                  {CATEGORY_OPTIONS.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>

                {/* Color */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <input
                    type="color"
                    value={item.color}
                    onChange={(e) => updateTech(i, "color", e.target.value)}
                    className="w-7 h-7 rounded cursor-pointer bg-transparent border-0 p-0"
                  />
                  <input
                    value={item.color}
                    onChange={(e) => updateTech(i, "color", e.target.value)}
                    placeholder="#FFFFFF"
                    className="bg-midnight-950 border border-midnight-700/60 text-silver-200 font-mono text-xs px-2 py-1.5 rounded-lg focus:outline-none focus:border-moon-glow/40 w-24"
                  />
                </div>

                <button onClick={() => removeTech(i)} className="ml-auto p-1.5 rounded-lg text-red-400/60 hover:text-red-400 hover:bg-red-500/10 transition-colors shrink-0">
                  <Trash2 size={14} />
                </button>
              </div>

              {/* Row 2: proficiency + duration */}
              <div className="flex items-center gap-4 pl-[3.75rem]">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] text-silver-500 shrink-0">숙련도</span>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={item.proficiency}
                    onChange={(e) => updateTech(i, "proficiency", Number(e.target.value))}
                    className="w-32 accent-moon-glow"
                  />
                  <span className="font-mono text-xs text-moon-glow w-8 text-right shrink-0">{item.proficiency}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] text-silver-500 shrink-0">기간</span>
                  <input
                    value={item.duration}
                    onChange={(e) => updateTech(i, "duration", e.target.value)}
                    placeholder="예) 2년, 6개월"
                    className="bg-midnight-950 border border-midnight-700/60 text-silver-200 font-mono text-xs px-3 py-1.5 rounded-lg focus:outline-none focus:border-moon-glow/40 w-28"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={addTech}
          className="mt-3 flex items-center gap-2 font-mono text-xs text-silver-400 hover:text-silver-200 transition-colors px-3 py-2 rounded-xl border border-dashed border-midnight-600/60 hover:border-midnight-500/60 w-full justify-center"
        >
          <Plus size={13} />기술 추가
        </button>
      </div>

      {/* ── Timeline ─────────────────────────────────────────────────────── */}
      <div className="bg-midnight-900/50 rounded-2xl border border-midnight-700/60 p-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Clock size={14} className="text-emerald-400" />
            <h2 className="font-mono text-sm font-semibold text-silver-200">타임라인</h2>
            <span className="font-mono text-xs text-silver-500">— About 페이지에 표시됩니다</span>
          </div>
          <SaveBtn onClick={saveTimeline} saving={savingTimeline} saved={savedTimeline} />
        </div>

        <div className="space-y-3">
          {timeline.map((item, i) => (
            <div key={i} className="p-4 bg-midnight-800/60 rounded-xl border border-midnight-700/50 space-y-3">
              {/* Row 1: reorder + year + type + delete */}
              <div className="flex items-center gap-3">
                <div className="flex flex-col gap-0.5 shrink-0">
                  <button onClick={() => moveTimeline(i, -1)} className="p-0.5 text-silver-600 hover:text-silver-300 transition-colors">
                    <ChevronUp size={13} />
                  </button>
                  <button onClick={() => moveTimeline(i, 1)} className="p-0.5 text-silver-600 hover:text-silver-300 transition-colors">
                    <ChevronDown size={13} />
                  </button>
                </div>

                <input
                  value={item.year}
                  onChange={(e) => updateTimeline(i, "year", e.target.value)}
                  placeholder="2024"
                  className="bg-midnight-950 border border-midnight-700/60 text-silver-200 font-mono text-xs px-3 py-1.5 rounded-lg focus:outline-none focus:border-moon-glow/40 w-24 shrink-0"
                />

                <select
                  value={item.type}
                  onChange={(e) => updateTimeline(i, "type", e.target.value)}
                  className="bg-midnight-950 border border-midnight-700/60 text-silver-200 font-mono text-xs px-2 py-1.5 rounded-lg focus:outline-none focus:border-moon-glow/40 w-28 shrink-0"
                >
                  {TIMELINE_TYPES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>

                <input
                  value={item.title}
                  onChange={(e) => updateTimeline(i, "title", e.target.value)}
                  placeholder="제목"
                  className="bg-midnight-950 border border-midnight-700/60 text-silver-200 font-mono text-xs px-3 py-1.5 rounded-lg focus:outline-none focus:border-moon-glow/40 flex-1 min-w-0"
                />

                <button onClick={() => removeTimeline(i)} className="p-1.5 rounded-lg text-red-400/60 hover:text-red-400 hover:bg-red-500/10 transition-colors shrink-0">
                  <Trash2 size={14} />
                </button>
              </div>

              {/* Row 2: description */}
              <div className="pl-[1.75rem]">
                <textarea
                  value={item.description}
                  onChange={(e) => updateTimeline(i, "description", e.target.value)}
                  placeholder="설명"
                  rows={2}
                  className="w-full bg-midnight-950 border border-midnight-700/60 text-silver-200 font-mono text-xs px-3 py-2 rounded-lg focus:outline-none focus:border-moon-glow/40 resize-none"
                />
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={addTimeline}
          className="mt-3 flex items-center gap-2 font-mono text-xs text-silver-400 hover:text-silver-200 transition-colors px-3 py-2 rounded-xl border border-dashed border-midnight-600/60 hover:border-midnight-500/60 w-full justify-center"
        >
          <Plus size={13} />항목 추가
        </button>
      </div>
    </div>
  );
}
