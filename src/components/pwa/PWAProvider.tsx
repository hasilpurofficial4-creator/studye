"use client";

import { useServiceWorker } from "@/hooks/useServiceWorker";

export default function PWAProvider({ swPath }: { swPath: string }) {
  useServiceWorker(swPath);
  return null;
}
