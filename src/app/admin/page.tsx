"use client";

import { useEffect, useState } from "react";
import GlassCard from "@/components/ui/GlassCard";
import Loader from "@/components/ui/Loader";
import { FiUsers, FiBook, FiAward, FiShoppingBag, FiMessageSquare } from "react-icons/fi";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ students: 0, teachers: 0, exams: 0, results: 0, orders: 0, contacts: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/students").then((r) => r.json()),
      fetch("/api/teachers").then((r) => r.json()),
      fetch("/api/exams").then((r) => r.json()),
      fetch("/api/results").then((r) => r.json()),
      fetch("/api/orders").then((r) => r.json()),
      fetch("/api/contact").then((r) => r.json()),
    ])
      .then(([s, t, e, r, o, c]) => {
        setStats({
          students: s.data?.length || 0,
          teachers: t.data?.length || 0,
          exams: e.data?.length || 0,
          results: r.data?.length || 0,
          orders: o.data?.length || 0,
          contacts: c.data?.length || 0,
        });
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader text="Loading Dashboard..." />;

  const cards = [
    { label: "Students", value: stats.students, icon: <FiUsers className="w-6 h-6" />, color: "blue", href: "/admin/students" },
    { label: "Teachers", value: stats.teachers, icon: <FiUsers className="w-6 h-6" />, color: "purple", href: "/admin/teachers" },
    { label: "Exams", value: stats.exams, icon: <FiBook className="w-6 h-6" />, color: "pink", href: "/admin/exams" },
    { label: "Results", value: stats.results, icon: <FiAward className="w-6 h-6" />, color: "green", href: "/admin/results" },
    { label: "Orders", value: stats.orders, icon: <FiShoppingBag className="w-6 h-6" />, color: "yellow", href: "/admin/orders" },
    { label: "Contacts", value: stats.contacts, icon: <FiMessageSquare className="w-6 h-6" />, color: "blue", href: "/admin/contacts" },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-white mb-6">Dashboard Overview</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card) => (
          <a key={card.label} href={card.href}>
            <GlassCard neonColor={card.color as "blue" | "purple" | "pink" | "green"} className="card-hover cursor-pointer">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${
                  card.color === "blue" ? "bg-neon-blue/10 text-neon-blue" :
                  card.color === "purple" ? "bg-neon-purple/10 text-neon-purple" :
                  card.color === "pink" ? "bg-neon-pink/10 text-neon-pink" :
                  card.color === "green" ? "bg-neon-green/10 text-neon-green" :
                  "bg-neon-yellow/10 text-neon-yellow"
                }`}>
                  {card.icon}
                </div>
                <div>
                  <p className="font-display text-3xl font-bold text-white">{card.value}</p>
                  <p className="text-xs text-white/40 font-display uppercase tracking-wider">{card.label}</p>
                </div>
              </div>
            </GlassCard>
          </a>
        ))}
      </div>
    </div>
  );
}
