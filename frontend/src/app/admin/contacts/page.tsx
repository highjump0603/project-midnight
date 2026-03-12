"use client";

import { useEffect, useState } from "react";
import { Mail, MailOpen, Trash2, User, AtSign, MessageSquare } from "lucide-react";
import { adminGetContacts, adminMarkRead, adminDeleteContact } from "@/lib/admin-api";

interface Contact {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
}

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [unreadOnly, setUnreadOnly] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const data = await adminGetContacts(unreadOnly);
      setContacts(data.items);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, [unreadOnly]);

  async function handleMarkRead(id: string) {
    await adminMarkRead(id);
    setContacts((prev) => prev.map((c) => c.id === id ? { ...c, is_read: true } : c));
  }

  async function handleDelete(id: string) {
    if (!confirm("이 메시지를 삭제하시겠습니까?")) return;
    await adminDeleteContact(id);
    setContacts((prev) => prev.filter((c) => c.id !== id));
  }

  const unreadCount = contacts.filter((c) => !c.is_read).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-mono text-xl font-bold text-silver-50">문의 메시지</h1>
          {!loading && (
            <p className="font-mono text-xs text-silver-500 mt-1">
              총 {contacts.length}개
              {unreadCount > 0 && (
                <span className="ml-2 text-red-400">· 미확인 {unreadCount}개</span>
              )}
            </p>
          )}
        </div>
        <label className="flex items-center gap-2 cursor-pointer group">
          <input
            type="checkbox"
            checked={unreadOnly}
            onChange={(e) => setUnreadOnly(e.target.checked)}
            className="accent-moon-glow w-4 h-4"
          />
          <span className="font-mono text-xs text-silver-400 group-hover:text-silver-200 transition-colors">
            미확인만 보기
          </span>
        </label>
      </div>

      {loading ? (
        <div className="font-mono text-xs text-silver-500 py-12 text-center">불러오는 중...</div>
      ) : contacts.length === 0 ? (
        <div className="bg-midnight-900 border border-midnight-700/60 rounded-xl p-16 text-center">
          <MessageSquare size={24} className="text-silver-700 mx-auto mb-3" />
          <p className="font-mono text-sm text-silver-500">
            {unreadOnly ? "미확인 메시지가 없습니다" : "문의 메시지가 없습니다"}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className={`bg-midnight-900 border rounded-xl p-5 transition-colors ${
                contact.is_read
                  ? "border-midnight-700/60"
                  : "border-moon-glow/25 bg-moon-glow/[0.02]"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  {/* 발신자 정보 */}
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    {!contact.is_read && (
                      <span className="flex items-center gap-1 font-mono text-[10px] bg-moon-glow/10 border border-moon-glow/25 text-moon-glow px-2 py-0.5 rounded-full">
                        <Mail size={9} />
                        새 메시지
                      </span>
                    )}
                    <span className="flex items-center gap-1.5 font-mono text-sm font-semibold text-silver-100">
                      <User size={12} className="text-silver-500" />
                      {contact.name}
                    </span>
                    <span className="flex items-center gap-1.5 font-mono text-xs text-silver-500">
                      <AtSign size={11} />
                      {contact.email}
                    </span>
                  </div>

                  {/* 제목 */}
                  {contact.subject && (
                    <p className="font-mono text-xs text-silver-400 mb-2">
                      <span className="text-silver-600">제목: </span>
                      {contact.subject}
                    </p>
                  )}

                  {/* 본문 */}
                  <p className="font-mono text-sm text-silver-300 whitespace-pre-wrap leading-relaxed">
                    {contact.message}
                  </p>

                  {/* 날짜 */}
                  <p className="font-mono text-xs text-silver-600 mt-3">
                    {new Date(contact.created_at).toLocaleString("ko-KR")}
                  </p>
                </div>

                {/* 액션 버튼 */}
                <div className="flex flex-col gap-2 shrink-0">
                  {!contact.is_read && (
                    <button
                      onClick={() => handleMarkRead(contact.id)}
                      className="flex items-center gap-1.5 font-mono text-xs px-3 py-1.5 bg-midnight-800 border border-midnight-700 text-silver-300 rounded-lg hover:border-midnight-600 hover:text-silver-100 transition-colors whitespace-nowrap"
                    >
                      <MailOpen size={11} />
                      읽음 처리
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(contact.id)}
                    className="flex items-center gap-1.5 font-mono text-xs px-3 py-1.5 bg-red-500/5 border border-red-500/20 text-red-400 rounded-lg hover:bg-red-500/15 transition-colors"
                  >
                    <Trash2 size={11} />
                    삭제
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
