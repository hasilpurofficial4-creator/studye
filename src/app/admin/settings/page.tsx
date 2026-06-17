"use client";

import { useEffect, useState } from "react";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Loader from "@/components/ui/Loader";
import { useNotification } from "@/context/NotificationContext";
import { Settings } from "@/lib/types";

export default function AdminSettings() {
  const { showToast } = useNotification();
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((data) => setSettings(data.data))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    if (!settings) return;
    setSaving(true);
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      showToast("Settings saved!", "success");
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Failed to save", "error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loader text="Loading Settings..." />;
  if (!settings) return <div className="text-white/30 text-center py-12">Failed to load settings.</div>;

  const update = (field: keyof Settings) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setSettings((prev) => prev ? { ...prev, [field]: e.target.value } : prev);

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-white mb-6">Site Settings</h1>
      <GlassCard>
        <div className="space-y-4 max-w-xl">
          <Input label="Site Title" value={settings.siteTitle} onChange={update("siteTitle")} />
          <Input label="Logo URL" value={settings.logoUrl || ""} onChange={update("logoUrl")} />
          <Input label="Hero Image URL" value={settings.heroImageUrl || ""} onChange={update("heroImageUrl")} />
          <Input label="Header Text" value={settings.headerText || ""} onChange={update("headerText")} />
          <Input label="Footer Text" value={settings.footerText || ""} onChange={update("footerText")} />
          <Input label="Mobile Number" value={settings.mobile || ""} onChange={update("mobile")} />
          <Input label="Email" value={settings.email || ""} onChange={update("email")} />
          <Input label="Address" value={settings.address || ""} onChange={update("address")} />
          <div>
            <label className="block text-sm font-display uppercase tracking-wider text-white/60 mb-2">About</label>
            <textarea
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white font-body focus:outline-none focus:border-neon-blue/50 transition-all h-32 resize-none"
              value={settings.about || ""}
              onChange={update("about")}
            />
          </div>
          <Button variant="primary" size="lg" onClick={handleSave} loading={saving}>
            Save Settings
          </Button>
        </div>
      </GlassCard>
    </div>
  );
}
