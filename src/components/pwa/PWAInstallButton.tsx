"use client";

import { FiDownload } from "react-icons/fi";
import { useInstallPrompt } from "@/hooks/useServiceWorker";

export default function PWAInstallButton() {
  const { isInstallable, install } = useInstallPrompt();

  if (!isInstallable) return null;

  return (
    <button
      onClick={install}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 glass-strong rounded-full border border-neon-blue/30 text-neon-blue font-display text-sm font-bold hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all animate-bounce"
    >
      <FiDownload />
      Install App
    </button>
  );
}
