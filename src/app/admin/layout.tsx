"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FiHome, FiUsers, FiBook, FiFileText, FiAward, FiShoppingBag, FiMessageSquare, FiSettings, FiBell, FiLogOut, FiMenu, FiX } from "react-icons/fi";
import { IoSchoolOutline } from "react-icons/io5";
import { useAuth } from "@/context/AuthContext";
import { useNotification } from "@/context/NotificationContext";
import { APP_NAME, ROUTES } from "@/lib/constants";
import { useServiceWorker } from "@/hooks/useServiceWorker";
import { useInstallPrompt } from "@/hooks/useServiceWorker";
import { FiDownload } from "react-icons/fi";

const adminNav = [
  { label: "Dashboard", href: ROUTES.ADMIN.HOME, icon: <FiHome /> },
  { label: "Students", href: ROUTES.ADMIN.STUDENTS, icon: <FiUsers /> },
  { label: "Teachers", href: ROUTES.ADMIN.TEACHERS, icon: <FiUsers /> },
  { label: "Exams", href: ROUTES.ADMIN.EXAMS, icon: <FiBook /> },
  { label: "Results", href: ROUTES.ADMIN.RESULTS, icon: <FiAward /> },
  { label: "Orders", href: ROUTES.ADMIN.ORDERS, icon: <FiShoppingBag /> },
  { label: "Contacts", href: ROUTES.ADMIN.CONTACTS, icon: <FiMessageSquare /> },
  { label: "Settings", href: ROUTES.ADMIN.SETTINGS, icon: <FiSettings /> },
  { label: "Notifications", href: ROUTES.ADMIN.NOTIFICATIONS, icon: <FiBell /> },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout, isAdmin, loading } = useAuth();
  const router = useRouter();
  const { showToast } = useNotification();
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [loginLoading, setLoginLoading] = useState(false);
  useServiceWorker("/admin-sw.js");
  const { isInstallable, install } = useInstallPrompt();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    try {
      const res = await fetch("/api/auth/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginForm),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      document.cookie = `shl_token=${data.data.token}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax`;
      window.location.reload();
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Login failed", "error");
    } finally {
      setLoginLoading(false);
    }
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-dark-900">
      <div className="w-12 h-12 border-2 border-neon-blue/20 border-t-neon-blue rounded-full animate-spin" />
    </div>
  );

  if (!isAdmin) return (
    <div className="min-h-screen flex items-center justify-center bg-dark-900 px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="glass-strong rounded-2xl p-8 neon-border">
          <div className="text-center mb-8">
            <IoSchoolOutline className="w-12 h-12 text-neon-blue mx-auto mb-4" />
            <h1 className="font-display text-2xl font-bold neon-text">Admin Panel</h1>
            <p className="text-white/40 text-sm font-body mt-1">{APP_NAME}</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-display uppercase tracking-wider text-white/60 mb-2">Username</label>
              <input className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-neon-blue/50" value={loginForm.username} onChange={(e) => setLoginForm((p) => ({ ...p, username: e.target.value }))} required />
            </div>
            <div>
              <label className="block text-sm font-display uppercase tracking-wider text-white/60 mb-2">Password</label>
              <input type="password" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-neon-blue/50" value={loginForm.password} onChange={(e) => setLoginForm((p) => ({ ...p, password: e.target.value }))} required />
            </div>
            <button type="submit" disabled={loginLoading} className="w-full py-3 font-display font-bold uppercase tracking-wider border-2 border-neon-blue text-neon-blue hover:bg-neon-blue/10 hover:shadow-[0_0_20px_rgba(0,240,255,0.5)] transition-all rounded-lg disabled:opacity-50">
              {loginLoading ? "Logging in..." : "Login"}
            </button>
          </form>
          <Link href="/" className="block text-center text-sm text-white/40 mt-4 hover:text-neon-blue">Back to Website</Link>
        </div>
      </motion.div>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-dark-900">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 glass-strong border-r border-white/[0.06] transform transition-transform lg:translate-x-0 lg:static ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="p-4 border-b border-white/[0.06]">
          <div className="flex items-center gap-2">
            <IoSchoolOutline className="w-7 h-7 text-neon-blue" />
            <div>
              <p className="font-display text-sm font-bold neon-text">Admin Panel</p>
              <p className="text-[10px] text-white/30 font-body">{APP_NAME}</p>
            </div>
          </div>
        </div>
        <nav className="p-3 space-y-1">
          {adminNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-display transition-all ${
                pathname === item.href ? "bg-neon-blue/10 text-neon-blue" : "text-white/50 hover:text-white hover:bg-white/5"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-3 border-t border-white/[0.06] absolute bottom-0 w-full">
          <button onClick={logout} className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-sm font-display text-red-400/70 hover:text-red-400 hover:bg-red-400/10 transition-all">
            <FiLogOut /> Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="sticky top-0 z-40 glass-strong border-b border-white/[0.06] px-4 py-3 flex items-center justify-between lg:px-6">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2 text-white/60 hover:text-white">
            {sidebarOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
          <div className="flex items-center gap-2">
            <span className="text-sm font-display text-white/60">Welcome,</span>
            <span className="text-sm font-display font-bold text-neon-green">{user?.name}</span>
          </div>
          <div className="flex items-center gap-3">
            {isInstallable && (
              <button onClick={install} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-display border border-neon-purple/30 text-neon-purple rounded-full hover:bg-neon-purple/10 transition-all">
                <FiDownload size={12} /> Install
              </button>
            )}
            <Link href="/" className="text-xs text-white/30 hover:text-white/60 font-display">View Site</Link>
          </div>
        </header>
        <main className="flex-1 p-4 lg:p-6">
          {children}
        </main>
      </div>

      {/* Overlay */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}
    </div>
  );
}
