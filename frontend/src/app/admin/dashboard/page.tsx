"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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
    { label: "Total Views", value: stats?.total_views ?? "—", href: null },
    { label: "Projects", value: projectCount, href: "/admin/projects" },
    { label: "Blog Posts", value: postCount, href: "/admin/blog" },
    { label: "Unread Messages", value: unread, href: "/admin/contacts" },
  ];

  return (
    <div className="max-w-4xl">
      <h1 className="font-mono text-star-gold text-xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {cards.map((card) => (
          <div key={card.label} className="bg-midnight-900 border border-midnight-700 rounded-xl p-5">
            <p className="font-mono text-xs text-silver-400 mb-1">{card.label}</p>
            <p className="font-mono text-2xl font-bold text-silver-100">{card.value}</p>
            {card.href && (
              <Link href={card.href} className="font-mono text-xs text-star-blue hover:underline mt-2 block">
                View →
              </Link>
            )}
          </div>
        ))}
      </div>

      {stats?.top_pages && stats.top_pages.length > 0 && (
        <div className="bg-midnight-900 border border-midnight-700 rounded-xl p-6">
          <h2 className="font-mono text-sm font-bold text-silver-100 mb-4">Top Pages</h2>
          <div className="space-y-2">
            {stats.top_pages.map((p) => (
              <div key={p.page_path} className="flex items-center justify-between font-mono text-sm">
                <span className="text-silver-300">{p.page_path}</span>
                <span className="text-star-gold">{p.views.toLocaleString()} views</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
