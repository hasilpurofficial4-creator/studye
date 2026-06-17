import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  neonColor?: "blue" | "purple" | "pink" | "green";
  glow?: boolean;
}

export default function GlassCard({ children, className, neonColor = "blue", glow }: GlassCardProps) {
  const borderColor = {
    blue: "hover:border-neon-blue/30 hover:shadow-[0_0_20px_rgba(0,240,255,0.1)]",
    purple: "hover:border-neon-purple/30 hover:shadow-[0_0_20px_rgba(184,41,221,0.1)]",
    pink: "hover:border-neon-pink/30 hover:shadow-[0_0_20px_rgba(255,45,149,0.1)]",
    green: "hover:border-neon-green/30 hover:shadow-[0_0_20px_rgba(57,255,20,0.1)]",
  };

  return (
    <div className={cn(
      "bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-6 transition-all duration-300",
      borderColor[neonColor],
      glow && "shadow-[0_0_30px_rgba(0,240,255,0.15)] border-neon-blue/20",
      className
    )}>
      {children}
    </div>
  );
}
