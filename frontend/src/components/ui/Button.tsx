import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
  href?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-star-gold text-midnight-950 hover:bg-yellow-400 font-semibold shadow-gold-glow hover:shadow-[0_0_30px_rgba(255,215,0,0.6)]",
  secondary:
    "bg-moon-glow/20 text-moon-glow border border-moon-glow/30 hover:bg-moon-glow/30 hover:border-moon-glow/60",
  ghost:
    "text-silver-200 hover:text-silver-50 hover:bg-midnight-700",
  outline:
    "border border-silver-300/30 text-silver-100 hover:border-silver-100/60 hover:bg-midnight-700",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-xs rounded-md",
  md: "px-5 py-2.5 text-sm rounded-lg",
  lg: "px-7 py-3.5 text-base rounded-xl",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-mono transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
