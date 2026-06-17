"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface NeonBorderProps {
  children: ReactNode;
  className?: string;
  color?: "blue" | "purple" | "pink" | "green";
  animated?: boolean;
}

export default function NeonBorder({ children, className, color = "blue", animated = true }: NeonBorderProps) {
  const colors = {
    blue: "border-neon-blue shadow-[0_0_15px_rgba(0,240,255,0.4),inset_0_0_15px_rgba(0,240,255,0.05)]",
    purple: "border-neon-purple shadow-[0_0_15px_rgba(184,41,221,0.4),inset_0_0_15px_rgba(184,41,221,0.05)]",
    pink: "border-neon-pink shadow-[0_0_15px_rgba(255,45,149,0.4),inset_0_0_15px_rgba(255,45,149,0.05)]",
    green: "border-neon-green shadow-[0_0_15px_rgba(57,255,20,0.4),inset_0_0_15px_rgba(57,255,20,0.05)]",
  };

  return (
    <div className={cn(
      "border-2 rounded-2xl",
      colors[color],
      animated && "animate-glow",
      className
    )}>
      {children}
    </div>
  );
}
