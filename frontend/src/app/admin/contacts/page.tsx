"use client";

import { useEffect, useState } from "react";
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
    if (!confirm("Delete this message?")) return;
    await adminDeleteContact(id);
    setContacts((prev) => prev.filter((c) => c.id !== id));
  }

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-mono text-star-gold text-xl font-bold">Contacts</h1>
        <label className="flex items-center gap-2 font-mono text-xs text-silver-300 cursor-pointer">
          <input type="checkbox" checked={unreadOnly} onChange={(e) => setUnreadOnly(e.target.checked)} className="accent-star-gold" />
          Unread only
        </label>
      </div>

      {loading ? (
        <p className="font-mono text-silver-400 text-sm">Loading...</p>
      ) : contacts.length === 0 ? (
        <p className="font-mono text-silver-400 text-sm">No messages.</p>
      ) : (
        <div className="space-y-3">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className={`bg-midnight-900 border rounded-xl p-5 ${contact.is_read ? "border-midnight-700" : "border-star-gold/40"}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    {!contact.is_read && (
                      <span className="font-mono text-xs bg-star-gold/20 text-star-gold px-2 py-0.5 rounded">New</span>
                    )}
                    <span className="font-mono text-sm font-bold text-silver-100">{contact.name}</span>
                    <span className="font-mono text-xs text-silver-400">{contact.email}</span>
                  </div>
                  {contact.subject && (
                    <p className="font-mono text-xs text-silver-300 mb-1">Subject: {contact.subject}</p>
                  )}
                  <p className="font-mono text-sm text-silver-300 whitespace-pre-wrap">{contact.message}</p>
                  <p className="font-mono text-xs text-silver-500 mt-2">
                    {new Date(contact.created_at).toLocaleString()}
                  </p>
                </div>
                <div className="flex gap-2 shrink-0">
                  {!contact.is_read && (
                    <button
                      onClick={() => handleMarkRead(contact.id)}
                      className="font-mono text-xs px-3 py-1.5 bg-midnight-700 text-silver-100 rounded hover:bg-midnight-600 transition-colors"
                    >
                      Mark Read
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(contact.id)}
                    className="font-mono text-xs px-3 py-1.5 bg-red-900/50 text-red-400 rounded hover:bg-red-900 transition-colors"
                  >
                    Delete
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
