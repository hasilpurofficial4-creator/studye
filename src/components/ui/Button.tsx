"use client";

import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  glow?: boolean;
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", glow = false, loading = false, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "relative font-display font-bold uppercase tracking-wider transition-all duration-300 overflow-hidden",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          // Sizes
          size === "sm" && "px-4 py-2 text-xs",
          size === "md" && "px-6 py-3 text-sm",
          size === "lg" && "px-8 py-4 text-base",
          // Variants
          variant === "primary" && "border-2 border-neon-blue text-neon-blue hover:bg-neon-blue/10 hover:shadow-[0_0_20px_rgba(0,240,255,0.5)]",
          variant === "secondary" && "border-2 border-neon-purple text-neon-purple hover:bg-neon-purple/10 hover:shadow-[0_0_20px_rgba(184,41,221,0.5)]",
          variant === "danger" && "border-2 border-red-500 text-red-500 hover:bg-red-500/10 hover:shadow-[0_0_20px_rgba(239,68,68,0.5)]",
          variant === "ghost" && "border-2 border-white/20 text-white/70 hover:border-white/40 hover:text-white hover:bg-white/5",
          glow && "animate-glow",
          className
        )}
        {...props}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            Loading...
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
