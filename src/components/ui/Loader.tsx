import { cn } from "@/lib/utils";

interface LoaderProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  text?: string;
}

export default function Loader({ size = "md", className, text }: LoaderProps) {
  const sizeMap = { sm: "w-6 h-6", md: "w-10 h-10", lg: "w-16 h-16" };

  return (
    <div className={cn("flex flex-col items-center justify-center gap-3", className)}>
      <div className={cn("relative", sizeMap[size])}>
        <div className="absolute inset-0 border-2 border-neon-blue/20 rounded-full" />
        <div className="absolute inset-0 border-2 border-transparent border-t-neon-blue rounded-full animate-spin" />
        <div className="absolute inset-1 border-2 border-transparent border-b-neon-purple rounded-full animate-spin" style={{ animationDirection: "reverse", animationDuration: "1.5s" }} />
      </div>
      {text && <p className="text-sm text-white/50 font-display uppercase tracking-wider animate-neon-pulse">{text}</p>}
    </div>
  );
}
