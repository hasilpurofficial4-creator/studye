"use client";

import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, icon, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-display uppercase tracking-wider text-white/60 mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neon-blue/60">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg",
              "text-white placeholder-white/30 font-body",
              "focus:outline-none focus:border-neon-blue/50 focus:shadow-[0_0_10px_rgba(0,240,255,0.2)]",
              "transition-all duration-300",
              icon ? "pl-10" : undefined,
              error ? "border-red-500/50 focus:border-red-500 focus:shadow-[0_0_10px_rgba(239,68,68,0.2)]" : undefined,
              className
            )}
            {...props}
          />
        </div>
        {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
