import { cn } from "@/lib/utils";

interface TechBadgeProps {
  label: string;
  className?: string;
}

export default function TechBadge({ label, className }: TechBadgeProps) {
  return (
    <span
      className={cn(
        "inline-block font-mono text-xs text-star-blue bg-midnight-800/60 border border-midnight-600/40 hover:border-star-blue/40 px-2.5 py-0.5 rounded-full transition-colors duration-150",
        className
      )}
    >
      {label}
    </span>
  );
}
