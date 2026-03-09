import { cn } from "@/lib/utils";

interface TechBadgeProps {
  label: string;
  className?: string;
}

export default function TechBadge({ label, className }: TechBadgeProps) {
  return (
    <span
      className={cn(
        "inline-block font-mono text-xs text-star-blue bg-midnight-800 border border-midnight-600 px-2 py-0.5 rounded-full",
        className
      )}
    >
      {label}
    </span>
  );
}
