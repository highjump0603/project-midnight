"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Save, Settings, Link as LinkIcon } from "lucide-react";
import { adminGetSettings, adminUpdateSettings } from "@/lib/admin-api";

interface SocialLink {
  label: string;
  href: string;
  icon: string;
}

const ICON_OPTIONS = [
  { value: "github", label: "GitHub" },
  { value: "email", label: "Email" },
  { value: "twitter", label: "Twitter / X" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "youtube", label: "YouTube" },
  { value: "instagram", label: "Instagram" },
  { value: "link", label: "기타 링크" },
];

export default function SettingsPage() {
  const [links, setLinks] = useState<SocialLink[]>([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminGetSettings()
      .then((data) => setLinks(data.social_links ?? []))
      .finally(() => setLoading(false));
  }, []);

  const addLink = () => {
    setLinks([...links, { label: "", href: "", icon: "link" }]);
  };

  const removeLink = (i: number) => {
    setLinks(links.filter((_, idx) => idx !== i));
  };

  const updateLink = (i: number, field: keyof SocialLink, value: string) => {
    setLinks(links.map((l, idx) => (idx === i ? { ...l, [field]: value } : l)));
  };

  const save = async () => {
    setSaving(true);
    try {
      await adminUpdateSettings({ social_links: links });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-silver-500 font-mono text-sm">
        로딩 중...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-moon-glow/10 border border-moon-glow/20">
            <Settings size={18} className="text-moon-glow" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold text-silver-50">사이트 설정</h1>
            <p className="font-mono text-xs text-silver-500 mt-0.5">소셜 링크 및 푸터 설정</p>
          </div>
        </div>
        <button
          onClick={save}
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2 bg-moon-glow/15 border border-moon-glow/40 text-moon-glow font-mono text-sm rounded-xl hover:bg-moon-glow/25 transition-all disabled:opacity-50"
        >
          <Save size={14} />
          {saved ? "저장됨!" : saving ? "저장 중..." : "저장"}
        </button>
      </div>

      {/* Social Links */}
      <div className="bg-midnight-900/50 rounded-2xl border border-midnight-700/60 p-6">
        <div className="flex items-center gap-2 mb-5">
          <LinkIcon size={14} className="text-moon-glow" />
          <h2 className="font-mono text-sm font-semibold text-silver-200">소셜 링크</h2>
          <span className="font-mono text-xs text-silver-500">— 푸터에 표시됩니다</span>
        </div>

        <div className="space-y-3">
          {links.map((link, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-3 bg-midnight-800/60 rounded-xl border border-midnight-700/50"
            >
              <select
                value={link.icon}
                onChange={(e) => updateLink(i, "icon", e.target.value)}
                className="bg-midnight-950 border border-midnight-700/60 text-silver-200 font-mono text-xs px-2 py-1.5 rounded-lg focus:outline-none focus:border-moon-glow/40 w-32 shrink-0"
              >
                {ICON_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
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
              <button
                onClick={() => removeLink(i)}
                className="p-1.5 rounded-lg text-red-400/60 hover:text-red-400 hover:bg-red-500/10 transition-colors shrink-0"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={addLink}
          className="mt-3 flex items-center gap-2 font-mono text-xs text-silver-400 hover:text-silver-200 transition-colors px-3 py-2 rounded-xl border border-dashed border-midnight-600/60 hover:border-midnight-500/60 w-full justify-center"
        >
          <Plus size={13} />
          링크 추가
        </button>
      </div>
    </div>
  );
}
