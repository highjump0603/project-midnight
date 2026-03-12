"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LockKeyhole, ShieldCheck, Eye, EyeOff } from "lucide-react";
import { login } from "@/lib/admin-api";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(username, password);
      router.push("/admin/dashboard");
    } catch {
      setError("아이디 또는 비밀번호가 올바르지 않습니다.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-midnight-950 flex items-center justify-center px-4">
      {/* Background glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-96 w-[600px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(123,123,255,0.15)_0%,transparent_65%)]" />
        <div className="absolute right-[-80px] top-1/4 h-64 w-64 rounded-full bg-star-blue/8 blur-3xl" />
        <div className="absolute left-[-80px] bottom-1/4 h-64 w-64 rounded-full bg-moon-glow/8 blur-3xl" />
      </div>

      <div className="relative w-full max-w-sm">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-moon-glow/30 bg-midnight-800/80 shadow-[0_0_24px_rgba(79,195,247,0.15)]">
            <ShieldCheck size={24} className="text-moon-glow" />
          </div>
          <h1 className="font-display text-2xl font-bold text-silver-50">
            관리자 로그인
          </h1>
          <p className="mt-1.5 font-mono text-xs text-silver-500">
            Project Midnight · 관리자 전용
          </p>
        </div>

        {/* Form card */}
        <div className="relative overflow-hidden rounded-2xl border border-midnight-600/50 bg-midnight-900/70 p-7 shadow-[0_20px_60px_rgba(0,0,0,0.5)] backdrop-blur-sm">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-moon-glow/40 to-transparent" />

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username */}
            <div>
              <label className="mb-1.5 block font-mono text-[11px] uppercase tracking-widest text-silver-500">
                아이디
              </label>
              <div className="relative">
                <LockKeyhole
                  size={13}
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-silver-500"
                />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full rounded-xl border border-midnight-600/60 bg-midnight-800/60 py-3 pl-9 pr-3.5 font-mono text-sm text-silver-100 placeholder:text-silver-600 focus:border-moon-glow/50 focus:outline-none focus:ring-1 focus:ring-moon-glow/20 transition-colors"
                  placeholder="아이디"
                  autoComplete="username"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="mb-1.5 block font-mono text-[11px] uppercase tracking-widest text-silver-500">
                비밀번호
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-midnight-600/60 bg-midnight-800/60 py-3 pl-3.5 pr-10 font-mono text-sm text-silver-100 placeholder:text-silver-600 focus:border-moon-glow/50 focus:outline-none focus:ring-1 focus:ring-moon-glow/20 transition-colors"
                  placeholder="비밀번호"
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-silver-500 hover:text-silver-300 transition-colors"
                >
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <p className="rounded-lg border border-red-500/20 bg-red-500/8 px-3 py-2.5 font-mono text-xs text-red-400">
                {error}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full rounded-xl bg-gradient-to-r from-moon-glow to-star-blue py-3 font-mono text-sm font-semibold text-midnight-950 shadow-[0_6px_20px_rgba(79,195,247,0.3)] transition-all duration-200 hover:shadow-[0_8px_28px_rgba(79,195,247,0.45)] hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "로그인 중..." : "로그인"}
            </button>
          </form>
        </div>

        <p className="mt-5 text-center font-mono text-[11px] text-silver-600">
          승인된 관리자만 접근 가능합니다
        </p>
      </div>
    </div>
  );
}
