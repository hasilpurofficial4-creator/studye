"use client";

import { useEffect, useState } from "react";
import GlassCard from "@/components/ui/GlassCard";
import Badge from "@/components/ui/Badge";
import Loader from "@/components/ui/Loader";
import { Notification } from "@/lib/types";
import { formatDateTime } from "@/lib/utils";

export default function AdminNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Build notifications from recent data
    Promise.all([
      fetch("/api/students").then((r) => r.json()),
      fetch("/api/teachers").then((r) => r.json()),
      fetch("/api/exams").then((r) => r.json()),
      fetch("/api/results").then((r) => r.json()),
      fetch("/api/contact").then((r) => r.json()),
      fetch("/api/orders").then((r) => r.json()),
    ])
      .then(([students, teachers, exams, results, contacts, orders]) => {
        const notifs: Notification[] = [];

        // Recent students
        (students.data || []).slice(-3).reverse().forEach((s: { id: string; name: string; createdAt: string }) => {
          notifs.push({ id: `s-${s.id}`, type: "student", message: `New student registered: ${s.name}`, read: false, createdAt: s.createdAt });
        });

        // Recent teachers
        (teachers.data || []).slice(-2).reverse().forEach((t: { id: string; name: string; createdAt: string }) => {
          notifs.push({ id: `t-${t.id}`, type: "teacher", message: `New teacher added: ${t.name}`, read: false, createdAt: t.createdAt });
        });

        // Recent exams
        (exams.data || []).slice(-2).reverse().forEach((e: { id: string; title: string; createdAt: string }) => {
          notifs.push({ id: `e-${e.id}`, type: "exam", message: `New exam created: ${e.title}`, read: false, createdAt: e.createdAt });
        });

        // Recent results
        (results.data || []).slice(-2).reverse().forEach((r: { id: string; studentName: string; examTitle: string; createdAt: string }) => {
          notifs.push({ id: `r-${r.id}`, type: "result", message: `New result: ${r.studentName} - ${r.examTitle}`, read: false, createdAt: r.createdAt });
        });

        // Recent contacts
        (contacts.data || []).slice(-2).reverse().forEach((c: { id: string; name: string; createdAt: string }) => {
          notifs.push({ id: `c-${c.id}`, type: "contact", message: `New contact from: ${c.name}`, read: false, createdAt: c.createdAt });
        });

        // Recent orders
        (orders.data || []).slice(-2).reverse().forEach((o: { id: string; name: string; totalAmount: number; createdAt: string }) => {
          notifs.push({ id: `o-${o.id}`, type: "order", message: `New order from: ${o.name} (Rs. ${o.totalAmount})`, read: false, createdAt: o.createdAt });
        });

        // Sort by date
        notifs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setNotifications(notifs);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader text="Loading Notifications..." />;

  const typeColors: Record<string, "blue" | "purple" | "pink" | "green" | "yellow"> = {
    student: "blue", teacher: "purple", exam: "pink", result: "green", contact: "blue", order: "yellow",
  };

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-white mb-6">Notifications</h1>
      <div className="space-y-3">
        {notifications.map((notif) => (
          <GlassCard key={notif.id} className="!p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <Badge variant={typeColors[notif.type] || "blue"}>{notif.type}</Badge>
                <div>
                  <p className="text-sm text-white font-body">{notif.message}</p>
                  <p className="text-xs text-white/30 mt-1">{formatDateTime(notif.createdAt)}</p>
                </div>
              </div>
            </div>
          </GlassCard>
        ))}
        {notifications.length === 0 && (
          <div className="text-center py-16 text-white/30">No notifications yet.</div>
        )}
      </div>
    </div>
  );
}
