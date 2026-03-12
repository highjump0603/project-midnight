"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Eye, FolderKanban, BookOpen, MessageSquare, TrendingUp, ArrowRight } from "lucide-react";
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

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-mono text-xl font-bold text-silver-50">대시보드</h1>
        <p className="font-mono text-xs text-silver-500 mt-1">Project Midnight 관리자 패널</p>
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
    </div>
  );
}
