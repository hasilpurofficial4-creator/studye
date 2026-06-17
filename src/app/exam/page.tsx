"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard";
import Badge from "@/components/ui/Badge";
import Loader from "@/components/ui/Loader";
import { Exam } from "@/lib/types";

export default function ExamListPage() {
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/exams")
      .then((r) => r.json())
      .then((data) => setExams(data.data || []))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="min-h-[60vh] flex items-center justify-center"><Loader text="Loading Exams..." /></div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="font-display text-3xl font-bold text-white mb-2">
          Available <span className="neon-text">Exams</span>
        </h1>
        <p className="text-white/40 font-body">Select an exam to begin</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {exams.map((exam, i) => (
          <motion.div key={exam.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Link href={`/exam/${exam.id}`}>
              <GlassCard className="card-hover cursor-pointer h-full">
                <div className="flex items-start justify-between mb-3">
                  <Badge variant={exam.type === "mcq" ? "blue" : "purple"}>{exam.type.toUpperCase()}</Badge>
                  <span className="text-xs text-white/30">{exam.totalMarks} marks</span>
                </div>
                <h3 className="font-display text-lg font-bold text-white mb-1">{exam.title}</h3>
                <p className="text-sm text-white/40 font-body mb-3">{exam.class} • {exam.totalQuestions} questions</p>
                {exam.duration && <p className="text-xs text-neon-yellow font-display">{exam.duration} minutes</p>}
              </GlassCard>
            </Link>
          </motion.div>
        ))}
      </div>
      {exams.length === 0 && <div className="text-center py-20 text-white/30 font-body">No exams available right now.</div>}
    </div>
  );
}
