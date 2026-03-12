import {
  SiPython, SiReact, SiTypescript, SiNextdotjs, SiTailwindcss,
  SiFastapi, SiPostgresql, SiDocker, SiGit, SiLinux,
  SiNginx, SiNodedotjs, SiRedis, SiRust, SiGithub,
  SiJavascript, SiGo, SiKubernetes, SiMongodb,
  SiMysql, SiPrisma, SiGraphql, SiVuedotjs, SiSvelte,
  SiDjango, SiFlask, SiSpring, SiAmazonaws,
  SiGooglecloud, SiVercel, SiCloudflare, SiGitlab, SiJira,
  SiJava, SiKotlin, SiSwift,
} from "react-icons/si";
import type { IconType } from "react-icons";

export const TECH_ICON_MAP: Record<string, IconType> = {
  python: SiPython,
  react: SiReact,
  typescript: SiTypescript,
  javascript: SiJavascript,
  nextjs: SiNextdotjs,
  tailwindcss: SiTailwindcss,
  fastapi: SiFastapi,
  postgresql: SiPostgresql,
  docker: SiDocker,
  git: SiGit,
  linux: SiLinux,
  nginx: SiNginx,
  nodejs: SiNodedotjs,
  redis: SiRedis,
  rust: SiRust,
  github: SiGithub,
  go: SiGo,
  kubernetes: SiKubernetes,
  mongodb: SiMongodb,
  mysql: SiMysql,
  prisma: SiPrisma,
  graphql: SiGraphql,
  vue: SiVuedotjs,
  svelte: SiSvelte,
  django: SiDjango,
  flask: SiFlask,
  spring: SiSpring,
  aws: SiAmazonaws,
  gcp: SiGooglecloud,
  vercel: SiVercel,
  cloudflare: SiCloudflare,
  gitlab: SiGitlab,
  jira: SiJira,
  java: SiJava,
  kotlin: SiKotlin,
  swift: SiSwift,
};

export const TECH_ICON_OPTIONS = [
  { value: "python", label: "Python" },
  { value: "react", label: "React" },
  { value: "typescript", label: "TypeScript" },
  { value: "javascript", label: "JavaScript" },
  { value: "nextjs", label: "Next.js" },
  { value: "tailwindcss", label: "Tailwind CSS" },
  { value: "fastapi", label: "FastAPI" },
  { value: "postgresql", label: "PostgreSQL" },
  { value: "mysql", label: "MySQL" },
  { value: "mongodb", label: "MongoDB" },
  { value: "redis", label: "Redis" },
  { value: "docker", label: "Docker" },
  { value: "kubernetes", label: "Kubernetes" },
  { value: "linux", label: "Linux" },
  { value: "nginx", label: "Nginx" },
  { value: "nodejs", label: "Node.js" },
  { value: "git", label: "Git" },
  { value: "github", label: "GitHub" },
  { value: "gitlab", label: "GitLab" },
  { value: "rust", label: "Rust" },
  { value: "go", label: "Go" },
  { value: "java", label: "Java" },
  { value: "kotlin", label: "Kotlin" },
  { value: "swift", label: "Swift" },
  { value: "c", label: "C" },
  { value: "cpp", label: "C++" },
  { value: "vue", label: "Vue.js" },
  { value: "svelte", label: "Svelte" },
  { value: "django", label: "Django" },
  { value: "flask", label: "Flask" },
  { value: "spring", label: "Spring" },
  { value: "graphql", label: "GraphQL" },
  { value: "prisma", label: "Prisma" },
  { value: "aws", label: "AWS" },
  { value: "gcp", label: "GCP" },
  { value: "vercel", label: "Vercel" },
  { value: "cloudflare", label: "Cloudflare" },
  { value: "jira", label: "Jira" },
];

interface TechIconProps {
  iconKey: string;
  size?: number;
  color?: string;
  className?: string;
}

export default function TechIcon({ iconKey, size = 20, color, className }: TechIconProps) {
  const Icon = TECH_ICON_MAP[iconKey];
  if (!Icon) {
    return (
      <span className={`font-mono font-bold text-xs ${className ?? ""}`} style={{ color }}>
        {iconKey.slice(0, 2).toUpperCase()}
      </span>
    );
  }
  return <Icon size={size} color={color} className={className} />;
}
