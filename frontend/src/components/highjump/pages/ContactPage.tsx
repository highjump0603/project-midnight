"use client";

import { Github, Mail } from "lucide-react";
import HjContactForm from "@/components/highjump/ContactForm";

const CONTACT_INFO = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@highjump.kr",
    href: "mailto:hello@highjump.kr",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/highjump0603",
    href: "https://github.com/highjump0603",
  },
];

export default function HjContactPage() {
  return (
    <main className="bg-white min-h-screen">
      <div className="section-container py-20 max-w-3xl">
        {/* Header */}
        <div className="mb-12">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-hj-muted mb-1">
            Contact
          </p>
          <h1
            className="font-display font-black text-[#09090B] leading-tight"
            style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)" }}
          >
            Get In Touch
          </h1>
          <p className="text-hj-secondary text-base mt-3 max-w-md">
            프로젝트 협업, 문의, 또는 그냥 안녕하세요도 좋아요.
          </p>
        </div>

        <div className="h-px bg-hj-border mb-12" />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Contact info */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <h2 className="font-display font-bold text-[#09090B] mb-2">Connect</h2>
            {CONTACT_INFO.map(({ icon: Icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group flex items-center gap-4 p-4 rounded-2xl border border-hj-border hover:border-hj-primary/40 hover:bg-hj-bg transition-all duration-200"
              >
                <div className="w-10 h-10 rounded-xl bg-hj-bg border border-hj-border flex items-center justify-center shrink-0 group-hover:bg-hj-primary-light group-hover:border-hj-primary/30 transition-all duration-200">
                  <Icon size={16} className="text-hj-secondary group-hover:text-hj-primary transition-colors" />
                </div>
                <div>
                  <p className="font-mono text-[11px] text-hj-muted uppercase tracking-wider">{label}</p>
                  <p className="text-hj-text text-sm font-medium">{value}</p>
                </div>
              </a>
            ))}
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <h2 className="font-display font-bold text-[#09090B] mb-6">Send a Message</h2>
            <HjContactForm />
          </div>
        </div>
      </div>
    </main>
  );
}
