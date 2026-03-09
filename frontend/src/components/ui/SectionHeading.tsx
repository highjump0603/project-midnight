import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
}

export default function SectionHeading({
  label,
  title,
  description,
  className,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" && "items-center text-center",
        className
      )}
    >
      {label && (
        <span className="code-label w-fit">
          {label}
        </span>
      )}
      <h2 className="font-display text-3xl sm:text-4xl font-bold text-silver-50">
        {title}
      </h2>
      {description && (
        <p className="text-silver-300 text-base leading-relaxed max-w-2xl">
          {description}
        </p>
      )}
    </div>
  );
}
