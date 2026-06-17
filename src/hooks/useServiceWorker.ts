"use client";

import { useEffect, useState } from "react";

export function useServiceWorker(swPath: string) {
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) return;

    const register = async () => {
      try {
        const existing = await navigator.serviceWorker.getRegistration(swPath);
        if (existing) {
          setRegistration(existing);
          return;
        }
        const reg = await navigator.serviceWorker.register(swPath, { scope: swPath === "/admin-sw.js" ? "/admin" : "/" });
        setRegistration(reg);
      } catch (err) {
        console.warn("SW registration failed:", err);
      }
    };

    register();
  }, [swPath]);

  return registration;
}

export function useInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const install = async () => {
    if (!deferredPrompt) return;
    (deferredPrompt as any).prompt();
    await (deferredPrompt as any).userChoice;
    setDeferredPrompt(null);
    setIsInstallable(false);
  };

  return { isInstallable, install };
}
