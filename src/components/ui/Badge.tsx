import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "blue" | "purple" | "pink" | "green" | "yellow" | "red";
  className?: string;
}

export default function Badge({ children, variant = "blue", className }: BadgeProps) {
  const colorMap = {
    blue: "text-neon-blue border-neon-blue/30 bg-neon-blue/10",
    purple: "text-neon-purple border-neon-purple/30 bg-neon-purple/10",
    pink: "text-neon-pink border-neon-pink/30 bg-neon-pink/10",
    green: "text-neon-green border-neon-green/30 bg-neon-green/10",
    yellow: "text-neon-yellow border-neon-yellow/30 bg-neon-yellow/10",
    red: "text-red-400 border-red-400/30 bg-red-400/10",
  };

  return (
    <span className={cn("inline-block px-3 py-1 text-xs font-display font-bold uppercase tracking-wider border rounded-full", colorMap[variant], className)}>
      {children}
    </span>
  );
}
