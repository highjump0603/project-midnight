"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { logout, getMe } from "@/lib/admin-api";

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
    { href: "/admin/dashboard", label: "Dashboard" },
    { href: "/admin/projects", label: "Projects" },
    { href: "/admin/blog", label: "Blog" },
    { href: "/admin/contacts", label: "Contacts" },
  ];

  return (
    <div className="min-h-screen bg-midnight-950 text-silver-100">
      <nav className="bg-midnight-900 border-b border-midnight-700 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <span className="font-mono text-star-gold text-sm font-bold">⟨ Admin ⟩</span>
          <div className="flex gap-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`font-mono text-xs px-3 py-1.5 rounded transition-colors ${
                  pathname.startsWith(item.href)
                    ? "bg-midnight-700 text-star-gold"
                    : "text-silver-300 hover:text-silver-100"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <button
          onClick={() => { logout(); router.push("/admin"); }}
          className="font-mono text-xs text-silver-400 hover:text-silver-100 transition-colors"
        >
          Logout
        </button>
      </nav>
      <main className="p-6">{children}</main>
    </div>
  );
}
