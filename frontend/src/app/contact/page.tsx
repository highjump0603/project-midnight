import type { Metadata } from "next";
import { Mail, Github } from "lucide-react";
import ContactForm from "@/components/contact/ContactForm";
import SectionHeading from "@/components/ui/SectionHeading";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Contact",
  description:
    "Contact Project Midnight for collaboration, project inquiries, or technical conversations.",
  path: "/contact",
  keywords: ["contact developer", "project inquiry", "collaboration"],
});

const CONTACT_INFO = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@project-midnight.dev",
    href: "mailto:hello@project-midnight.dev",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/",
    href: "https://github.com/",
  },
];

export default function ContactPage() {
  return (
    <main className="section-padding">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left */}
          <div className="flex flex-col gap-8">
            <SectionHeading
              label="// contact"
              title="Get In Touch"
              description="Have a project in mind, want to collaborate, or just want to say hello? Drop me a message."
            />

            {/* Contact info */}
            <div className="flex flex-col gap-4">
              {CONTACT_INFO.map(({ icon: Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-4 p-4 bg-glass rounded-xl border border-midnight-600/40 hover:border-moon-glow/25 transition-all group"
                >
                  <div className="w-10 h-10 rounded-lg bg-midnight-700 border border-midnight-600 flex items-center justify-center shrink-0 group-hover:border-moon-glow/40 transition-colors">
                    <Icon size={16} className="text-silver-300 group-hover:text-moon-glow transition-colors" />
                  </div>
                  <div>
                    <p className="font-mono text-xs text-silver-400 uppercase tracking-wider">{label}</p>
                    <p className="text-silver-100 text-sm">{value}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="bg-glass rounded-2xl p-8 border border-midnight-600/40">
            <ContactForm />
          </div>
        </div>
      </div>
    </main>
  );
}
