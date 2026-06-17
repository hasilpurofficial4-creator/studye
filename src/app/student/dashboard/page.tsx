"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import GlassCard from "@/components/ui/GlassCard";
import Loader from "@/components/ui/Loader";
import Badge from "@/components/ui/Badge";
import { ROUTES } from "@/lib/constants";
import { Exam, Result } from "@/lib/types";
import { GiBrain, GiBookCover, GiLightningFrequency, GiTrophy } from "react-icons/gi";
import { FiBookOpen, FiAward } from "react-icons/fi";

export default function StudentDashboard() {
  const { user } = useAuth();
  const [exams, setExams] = useState<Exam[]>([]);
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    Promise.all([
      fetch("/api/exams").then((r) => r.json()),
      fetch(`/api/results?studentId=${user.id}`).then((r) => r.json()),
    ])
      .then(([examData, resultData]) => {
        setExams(examData.data || []);
        setResults(resultData.data || []);
      })
      .finally(() => setLoading(false));
  }, [user]);

  if (loading) return <div className="min-h-[60vh] flex items-center justify-center"><Loader text="Loading Dashboard..." /></div>;

  const myExams = exams.filter((e) => e.class === (user?.class as string) || true);
  const takenExamIds = results.map((r) => r.examId);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="font-display text-3xl font-bold text-white mb-2">
          Welcome, <span className="neon-text">{user?.name}</span>
        </h1>
        <p className="text-white/40 font-body">Here&apos;s your academic overview</p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { icon: <FiBookOpen className="w-6 h-6" />, label: "Total Exams", value: myExams.length, color: "blue" },
          { icon: <FiAward className="w-6 h-6" />, label: "Exams Taken", value: results.length, color: "green" },
          { icon: <GiTrophy className="w-6 h-6" />, label: "Avg. Score", value: results.length ? `${Math.round(results.reduce((s, r) => s + r.percentage, 0) / results.length)}%` : "N/A", color: "purple" },
          { icon: <GiBrain className="w-6 h-6" />, label: "Available", value: myExams.filter((e) => !takenExamIds.includes(e.id)).length, color: "pink" },
        ].map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <GlassCard neonColor={stat.color as "blue" | "purple" | "pink" | "green"}>
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${
                  stat.color === "blue" ? "bg-neon-blue/10 text-neon-blue" :
                  stat.color === "green" ? "bg-neon-green/10 text-neon-green" :
                  stat.color === "purple" ? "bg-neon-purple/10 text-neon-purple" :
                  "bg-neon-pink/10 text-neon-pink"
                }`}>
                  {stat.icon}
                </div>
                <div>
                  <p className="font-display text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-white/40 font-display uppercase tracking-wider">{stat.label}</p>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Exam Categories */}
      <h2 className="font-display text-xl font-bold text-white mb-4">Exam Categories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          { icon: <GiBrain className="w-8 h-8" />, title: "MCQ Test", desc: "Multiple choice questions", color: "blue" as const, count: myExams.filter(e => e.type === "mcq").length },
          { icon: <GiBookCover className="w-8 h-8" />, title: "Subjective Exam", desc: "Written answer questions", color: "purple" as const, count: myExams.filter(e => e.type === "subjective").length },
          { icon: <GiLightningFrequency className="w-8 h-8" />, title: "Live Test", desc: "Real-time competitive tests", color: "pink" as const, count: 0 },
        ].map((cat, i) => (
          <motion.div key={cat.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.1 }}>
            <GlassCard neonColor={cat.color} className="text-center">
              <div className={`inline-flex p-4 rounded-xl mb-3 ${
                cat.color === "blue" ? "bg-neon-blue/10 text-neon-blue" :
                cat.color === "purple" ? "bg-neon-purple/10 text-neon-purple" :
                "bg-neon-pink/10 text-neon-pink"
              }`}>
                {cat.icon}
              </div>
              <h3 className="font-display text-lg font-bold text-white">{cat.title}</h3>
              <p className="text-sm text-white/40 font-body mb-2">{cat.desc}</p>
              <Badge variant={cat.color}>{cat.count} exams</Badge>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Available Exams */}
      <h2 className="font-display text-xl font-bold text-white mb-4">Available Exams</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {myExams.filter(e => !takenExamIds.includes(e.id)).map((exam) => (
          <Link key={exam.id} href={`/exam/${exam.id}`}>
            <GlassCard className="card-hover cursor-pointer">
              <div className="flex items-start justify-between mb-3">
                <Badge variant={exam.type === "mcq" ? "blue" : "purple"}>{exam.type.toUpperCase()}</Badge>
                <span className="text-xs text-white/30 font-body">{exam.totalMarks} marks</span>
              </div>
              <h3 className="font-display text-lg font-bold text-white mb-1">{exam.title}</h3>
              <p className="text-sm text-white/40 font-body">{exam.totalQuestions} questions • {exam.class}</p>
            </GlassCard>
          </Link>
        ))}
        {myExams.filter(e => !takenExamIds.includes(e.id)).length === 0 && (
          <div className="col-span-full text-center py-12 text-white/30 font-body">
            No exams available at the moment.
          </div>
        )}
      </div>

      {/* Recent Results */}
      <h2 className="font-display text-xl font-bold text-white mb-4">Recent Results</h2>
      <div className="space-y-3">
        {results.slice(0, 5).map((result) => (
          <Link key={result.id} href={`/results/${result.id}`}>
            <GlassCard className="card-hover cursor-pointer !p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display font-bold text-white">{result.examTitle}</h3>
                  <p className="text-sm text-white/40 font-body">{result.obtainedMarks}/{result.totalMarks} marks</p>
                </div>
                <div className="text-right">
                  <p className={`font-display text-2xl font-bold ${result.percentage >= 50 ? "neon-text-green" : "text-red-400"}`}>
                    {result.percentage}%
                  </p>
                </div>
              </div>
            </GlassCard>
          </Link>
        ))}
        {results.length === 0 && (
          <div className="text-center py-12 text-white/30 font-body">
            No results yet. Take your first exam!
          </div>
        )}
      </div>
    </div>
  );
}
