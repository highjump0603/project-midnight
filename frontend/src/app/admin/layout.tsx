"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { logout, getMe } from "@/lib/admin-api";
import {
  LayoutDashboard,
  FolderKanban,
  BookOpen,
  Mail,
  LogOut,
  ShieldCheck,
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (pathname === "/admin") { setReady(true); return; }
    getMe()
      .then(() => setReady(true))
      .catch(() => router.replace("/admin"));
  }, [pathname, router]);

  if (!ready) return null;
  if (pathname === "/admin") return <>{children}</>;

  const navItems = [
    { href: "/admin/dashboard", label: "대시보드", icon: LayoutDashboard },
    { href: "/admin/projects", label: "프로젝트", icon: FolderKanban },
    { href: "/admin/blog", label: "블로그", icon: BookOpen },
    { href: "/admin/contacts", label: "문의", icon: Mail },
  ];

  return (
    <div className="min-h-screen bg-midnight-950 text-silver-100">
      <nav className="sticky top-0 z-40 bg-midnight-900/95 border-b border-midnight-700/60 backdrop-blur-sm">
        <div className="flex items-center justify-between h-14 px-6">
          {/* 로고 + 네비 */}
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2 pr-5 border-r border-midnight-700/60">
              <ShieldCheck size={15} className="text-moon-glow" />
              <span className="font-mono text-sm font-bold text-silver-100 tracking-tight">
                관리자
              </span>
            </div>
            <div className="flex items-center gap-0.5">
              {navItems.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-1.5 font-mono text-xs px-3 py-2 rounded-lg transition-colors ${
                    pathname.startsWith(href)
                      ? "bg-midnight-800 text-moon-glow"
                      : "text-silver-500 hover:text-silver-200 hover:bg-midnight-800/60"
                  }`}
                >
                  <Icon size={13} />
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* 로그아웃 */}
          <button
            onClick={() => { logout(); router.push("/admin"); }}
            className="flex items-center gap-1.5 font-mono text-xs text-silver-500 hover:text-silver-200 transition-colors px-3 py-2 rounded-lg hover:bg-midnight-800/60"
          >
            <LogOut size={13} />
            로그아웃
          </button>
        </div>
      </nav>

      <main className="p-6 max-w-5xl mx-auto">{children}</main>
    </div>
  );
}
