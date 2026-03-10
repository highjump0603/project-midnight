"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/admin-api";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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
      setError("Invalid username or password");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-midnight-950 flex items-center justify-center">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <p className="font-mono text-star-gold text-lg">⟨ Project Midnight ⟩</p>
          <p className="font-mono text-silver-400 text-sm mt-1">Admin Panel</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-midnight-900 border border-midnight-700 rounded-xl p-8 space-y-4">
          <div>
            <label className="block font-mono text-xs text-silver-400 mb-1.5">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-midnight-800 border border-midnight-700 rounded-lg px-4 py-2.5 font-mono text-sm text-silver-100 focus:outline-none focus:border-star-gold"
              required
            />
          </div>
          <div>
            <label className="block font-mono text-xs text-silver-400 mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-midnight-800 border border-midnight-700 rounded-lg px-4 py-2.5 font-mono text-sm text-silver-100 focus:outline-none focus:border-star-gold"
              required
            />
          </div>
          {error && <p className="font-mono text-xs text-red-400">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-star-gold text-midnight-950 font-mono font-bold text-sm py-2.5 rounded-lg hover:bg-star-gold/90 transition-colors disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
