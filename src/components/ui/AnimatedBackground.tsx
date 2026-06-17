"use client";

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Grid */}
      <div className="absolute inset-0 grid-bg opacity-50" />

      {/* Gradient orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-neon-blue/5 rounded-full blur-[120px] animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-neon-purple/5 rounded-full blur-[100px] animate-float" style={{ animationDelay: "1s" }} />
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-neon-pink/3 rounded-full blur-[80px] animate-float" style={{ animationDelay: "2s" }} />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(5,5,10,0.8)_100%)]" />
    </div>
  );
}
