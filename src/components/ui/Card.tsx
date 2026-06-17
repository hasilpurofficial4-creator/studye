import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  glow?: boolean;
  hover?: boolean;
}

export default function Card({ children, className, glow = false, hover = true }: CardProps) {
  return (
    <div
      className={cn(
        "glass rounded-2xl p-6",
        hover && "card-hover",
        glow && "neon-border",
        className
      )}
    >
      {children}
    </div>
  );
}
