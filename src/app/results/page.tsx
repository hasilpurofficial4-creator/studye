"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard";
import Loader from "@/components/ui/Loader";
import Badge from "@/components/ui/Badge";
import { Result } from "@/lib/types";

export default function ResultsListPage() {
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/results")
      .then((r) => r.json())
      .then((data) => setResults(data.data || []))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="min-h-[60vh] flex items-center justify-center"><Loader text="Loading Results..." /></div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="font-display text-3xl font-bold text-white mb-2">
          Your <span className="neon-text">Results</span>
        </h1>
      </motion.div>

      <div className="space-y-3">
        {results.map((result) => (
          <Link key={result.id} href={`/results/${result.id}`}>
            <GlassCard className="card-hover cursor-pointer !p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display font-bold text-white">{result.examTitle}</h3>
                  <p className="text-sm text-white/40">{result.studentName} • {result.class}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm text-white/40">{result.obtainedMarks}/{result.totalMarks}</p>
                    <Badge variant={result.percentage >= 50 ? "green" : "red"}>{result.percentage}%</Badge>
                  </div>
                </div>
              </div>
            </GlassCard>
          </Link>
        ))}
        {results.length === 0 && <div className="text-center py-20 text-white/30">No results yet.</div>}
      </div>
    </div>
  );
}
