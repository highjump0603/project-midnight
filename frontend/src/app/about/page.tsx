import type { Metadata } from "next";
import { Code2, Cpu, Globe, BookOpen } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import MoonIcon from "@/components/ui/MoonIcon";

export const metadata: Metadata = {
  title: "About",
  description: "Software engineering student, developer-in-progress. Building things at midnight.",
};

const TECH_STACK = {
  "Frontend": ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],
  "Backend": ["FastAPI", "Python", "Node.js", "PostgreSQL", "Redis"],
  "DevOps": ["Linux", "Nginx", "Docker", "Git", "GitHub Actions"],
  "Currently Learning": ["Rust", "System Design", "Cloud Architecture"],
};

const VALUES = [
  {
    icon: Code2,
    title: "Clean Code",
    description: "Writing code that reads like prose — clear, purposeful, and easy to maintain.",
  },
  {
    icon: Cpu,
    title: "Deep Understanding",
    description: "Going beyond surface-level. Understanding how things work under the hood.",
  },
  {
    icon: Globe,
    title: "Full Stack Thinking",
    description: "Seeing the whole picture — from database schema to pixel-perfect UI.",
  },
  {
    icon: BookOpen,
    title: "Continuous Learning",
    description: "Software evolves fast. Staying curious and building in public.",
  },
];

export default function AboutPage() {
  return (
    <main className="section-padding">
      <div className="section-container max-w-4xl">
        {/* Hero block */}
        <div className="flex flex-col sm:flex-row items-start gap-8 mb-16">
          <div className="shrink-0 w-24 h-24 rounded-2xl bg-midnight-800 border border-midnight-600 flex items-center justify-center">
            <MoonIcon size={52} className="text-silver-100" />
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <h1 className="font-display text-4xl font-bold text-silver-50 mb-1">
                Project Midnight
              </h1>
              <p className="font-mono text-sm text-star-blue">
                Software Engineering Student · Developer
              </p>
            </div>
            <p className="text-silver-200 leading-relaxed text-base max-w-xl">
              Software학부 학생으로, 개발자의 길을 걷고 있습니다.
              깨끗한 코드, 좋은 아키텍처, 그리고 사용자 경험에 깊은 관심을 가지고 있습니다.
              주로 자정에 가장 많은 작업을 합니다.
            </p>
            <p className="font-mono text-xs text-silver-400">
              {`// "${new Date().getFullYear()} — building in public"`}
            </p>
          </div>
        </div>

        {/* Values */}
        <section className="mb-16">
          <SectionHeading
            label="// philosophy"
            title="How I Work"
            className="mb-8"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {VALUES.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="bg-glass rounded-xl p-6 border border-midnight-600/40 hover:border-moon-glow/20 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-lg bg-midnight-700 border border-midnight-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon size={16} className="text-star-blue" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-silver-50 mb-1.5">
                      {title}
                    </h3>
                    <p className="text-silver-300 text-sm leading-relaxed">
                      {description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tech Stack */}
        <section>
          <SectionHeading
            label="// tools"
            title="Tech Stack"
            className="mb-8"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {Object.entries(TECH_STACK).map(([category, techs]) => (
              <div key={category} className="flex flex-col gap-3">
                <h3 className="font-mono text-xs text-silver-400 uppercase tracking-widest">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {techs.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-xs text-star-blue bg-midnight-800 border border-midnight-600 px-2.5 py-1 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
