"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Eye,
  FolderKanban,
  BookOpen,
  MessageSquare,
  TrendingUp,
  ArrowRight,
  Link as LinkIcon,
  Code2,
  Clock3,
} from "lucide-react";
import { adminGetStats, adminGetContacts, adminGetProjects, adminGetPosts } from "@/lib/admin-api";

interface Stats {
  total_views: number;
  top_pages: { page_path: string; views: number }[];
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [unread, setUnread] = useState(0);
  const [projectCount, setProjectCount] = useState(0);
  const [postCount, setPostCount] = useState(0);

  useEffect(() => {
    adminGetStats().then(setStats).catch(() => {});
    adminGetContacts(true).then((d) => setUnread(d.total)).catch(() => {});
    adminGetProjects().then((d) => setProjectCount(d.total)).catch(() => {});
    adminGetPosts().then((d) => setPostCount(d.total)).catch(() => {});
  }, []);

  const cards = [
    {
      label: "전체 조회수",
      value: stats?.total_views != null ? stats.total_views.toLocaleString() : "—",
      icon: Eye,
      href: null,
      accent: "text-moon-glow",
      glow: false,
    },
    {
      label: "프로젝트",
      value: projectCount,
      icon: FolderKanban,
      href: "/admin/projects",
      accent: "text-star-blue",
      glow: false,
    },
    {
      label: "블로그 포스트",
      value: postCount,
      icon: BookOpen,
      href: "/admin/blog",
      accent: "text-star-gold",
      glow: false,
    },
    {
      label: "미확인 메시지",
      value: unread,
      icon: MessageSquare,
      href: "/admin/contacts",
      accent: unread > 0 ? "text-red-400" : "text-silver-500",
      glow: unread > 0,
    },
  ];

  const maxViews = stats?.top_pages?.[0]?.views ?? 1;

  const settingShortcuts = [
    {
      title: "소셜 링크 관리",
      description: "푸터 및 프로필 링크 항목 편집",
      href: "/admin/settings#links",
      icon: LinkIcon,
      accent: "text-moon-glow",
    },
    {
      title: "기술 스택 관리",
      description: "기술 카드/숙련도/카테고리 편집",
      href: "/admin/settings#tech",
      icon: Code2,
      accent: "text-star-blue",
    },
    {
      title: "이력 카테고리 관리",
      description: "학업/경력/프로젝트 이력 편집",
      href: "/admin/settings#history",
      icon: Clock3,
      accent: "text-emerald-400",
    },
  ];

  return (
    <div>
      <div className="mb-8 rounded-2xl border border-midnight-700/60 bg-midnight-900/50 p-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-moon-glow/80">admin overview</p>
        <h1 className="mt-2 font-display text-3xl font-bold text-silver-50">대시보드</h1>
        <p className="font-mono text-xs text-silver-500 mt-2">Project Midnight 운영 현황과 편집 진입점을 한곳에서 관리합니다.</p>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {cards.map((card) => {
          const Icon = card.icon;
          const inner = (
            <div
              className={`relative bg-midnight-900 border rounded-xl p-5 transition-colors group ${
                card.href ? "hover:border-midnight-600 cursor-pointer" : ""
              } ${card.glow ? "border-red-500/30" : "border-midnight-700/60"}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-2 rounded-lg bg-midnight-800 ${card.accent}`}>
                  <Icon size={14} />
                </div>
                {card.href && (
                  <ArrowRight
                    size={12}
                    className="text-silver-700 group-hover:text-silver-400 transition-colors"
                  />
                )}
              </div>
              <p className="font-mono text-2xl font-bold text-silver-50 mb-1">{card.value}</p>
              <p className="font-mono text-xs text-silver-500">{card.label}</p>
              {card.glow && unread > 0 && (
                <div className="absolute top-3 right-3 h-2 w-2 rounded-full bg-red-400 animate-pulse" />
              )}
            </div>
          );
          return card.href ? (
            <Link key={card.label} href={card.href}>
              {inner}
            </Link>
          ) : (
            <div key={card.label}>{inner}</div>
          );
        })}
      </div>

      {/* 인기 페이지 */}
      {stats?.top_pages && stats.top_pages.length > 0 && (
        <div className="bg-midnight-900 border border-midnight-700/60 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp size={14} className="text-moon-glow" />
            <h2 className="font-mono text-sm font-semibold text-silver-100">인기 페이지</h2>
          </div>
          <div className="space-y-3">
            {stats.top_pages.map((p, i) => (
              <div key={p.page_path} className="flex items-center gap-4">
                <span className="font-mono text-xs text-silver-600 w-5 text-right shrink-0">
                  {i + 1}
                </span>
                <span className="font-mono text-xs text-silver-300 flex-1 min-w-0 truncate">
                  {p.page_path}
                </span>
                <div className="flex items-center gap-3 shrink-0">
                  <div className="h-1 w-24 bg-midnight-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-moon-glow/50 rounded-full transition-all"
                      style={{ width: `${(p.views / maxViews) * 100}%` }}
                    />
                  </div>
                  <span className="font-mono text-xs text-star-gold w-16 text-right">
                    {p.views.toLocaleString()}회
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 설정 바로가기 */}
      <div className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-mono text-sm font-semibold text-silver-100">설정 관리</h2>
          <Link
            href="/admin/settings"
            className="inline-flex items-center gap-1 font-mono text-xs text-silver-400 hover:text-silver-200 transition-colors"
          >
            설정 전체 보기
            <ArrowRight size={12} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {settingShortcuts.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.title}
                href={item.href}
                className="group rounded-xl border border-midnight-700/60 bg-midnight-900/40 p-4 transition-colors hover:border-midnight-600"
              >
                <div className="mb-3 flex items-center justify-between">
                  <div className={`rounded-lg bg-midnight-800 p-2 ${item.accent}`}>
                    <Icon size={14} />
                  </div>
                  <ArrowRight size={12} className="text-silver-600 group-hover:text-silver-300 transition-colors" />
                </div>
                <p className="font-mono text-xs text-silver-100">{item.title}</p>
                <p className="mt-1 font-mono text-[11px] leading-relaxed text-silver-500">{item.description}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
