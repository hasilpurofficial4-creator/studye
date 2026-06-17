"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { useNotification } from "@/context/NotificationContext";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import Loader from "@/components/ui/Loader";
import { Exam, Answer } from "@/lib/types";
import { calculatePercentage } from "@/lib/utils";
import { FiClock, FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function TakeExamPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const { showToast } = useNotification();
  const [exam, setExam] = useState<Exam | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetch(`/api/exams/${params.id}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.data) {
          setExam(data.data);
          setTimeLeft((data.data.duration || 30) * 60);
          setAnswers(data.data.questions.map((q: { id: string }) => ({ questionId: q.id, answer: "" })));
        }
      })
      .finally(() => setLoading(false));
  }, [params.id]);

  // Timer
  useEffect(() => {
    if (timeLeft <= 0 || submitted) return;
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, submitted]);

  // Auto submit on time up
  useEffect(() => {
    if (timeLeft === 0 && exam && !submitted) handleSubmit();
  }, [timeLeft, exam, submitted]);

  const setAnswer = (questionId: string, answer: string) => {
    setAnswers((prev) => prev.map((a) => a.questionId === questionId ? { ...a, answer } : a));
  };

  const handleSubmit = useCallback(async () => {
    if (!exam || !user || submitted) return;
    setSubmitted(true);

    let obtainedMarks = 0;
    exam.questions.forEach((q) => {
      const answer = answers.find((a) => a.questionId === q.id);
      if (answer && q.type === "mcq" && answer.answer === q.correctOption) {
        obtainedMarks += q.marks;
      }
    });

    const percentage = calculatePercentage(obtainedMarks, exam.totalMarks);

    try {
      const res = await fetch("/api/results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentId: user.id,
          studentName: user.name,
          fatherName: (user.fatherName as string) || "N/A",
          class: (user.class as string) || "N/A",
          examId: exam.id,
          examTitle: exam.title,
          totalMarks: exam.totalMarks,
          obtainedMarks,
          percentage,
          answers,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      showToast("Exam submitted successfully!", "success");
      router.push(`/results/${data.data.id}`);
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Failed to submit", "error");
      setSubmitted(false);
    }
  }, [exam, user, answers, submitted, router, showToast]);

  if (loading) return <div className="min-h-[60vh] flex items-center justify-center"><Loader text="Loading Exam..." /></div>;
  if (!exam) return <div className="text-center py-20 text-white/30">Exam not found.</div>;

  const question = exam.questions[currentQ];
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-xl font-bold text-white">{exam.title}</h1>
          <p className="text-sm text-white/40">Question {currentQ + 1} of {exam.totalQuestions}</p>
        </div>
        <div className={`flex items-center gap-2 px-4 py-2 rounded-xl glass ${timeLeft < 60 ? "border border-red-500/50 text-red-400" : "neon-border text-neon-blue"}`}>
          <FiClock />
          <span className="font-display font-bold">{String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full h-1 bg-dark-600 rounded-full mb-8">
        <div className="h-full bg-gradient-to-r from-neon-blue to-neon-purple rounded-full transition-all" style={{ width: `${((currentQ + 1) / exam.totalQuestions) * 100}%` }} />
      </div>

      {/* Question */}
      <motion.div key={currentQ} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
        <GlassCard className="mb-6">
          <h2 className="font-display text-lg font-bold text-white mb-6">
            <span className="text-neon-blue mr-2">Q{currentQ + 1}.</span>
            {question.question}
          </h2>

          {question.type === "mcq" ? (
            <div className="space-y-3">
              {[
                { key: "A", val: question.optionA },
                { key: "B", val: question.optionB },
                { key: "C", val: question.optionC },
                { key: "D", val: question.optionD },
              ].map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => setAnswer(question.id, opt.key)}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    answers.find((a) => a.questionId === question.id)?.answer === opt.key
                      ? "border-neon-blue bg-neon-blue/10 text-white shadow-[0_0_10px_rgba(0,240,255,0.2)]"
                      : "border-white/10 bg-white/[0.02] text-white/60 hover:border-white/20"
                  }`}
                >
                  <span className="font-display font-bold mr-3 text-neon-blue">{opt.key}.</span>
                  {opt.val}
                </button>
              ))}
            </div>
          ) : (
            <textarea
              className="w-full h-40 p-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 font-body focus:outline-none focus:border-neon-blue/50 transition-all resize-none"
              placeholder="Write your answer here..."
              value={answers.find((a) => a.questionId === question.id)?.answer || ""}
              onChange={(e) => setAnswer(question.id, e.target.value)}
            />
          )}
        </GlassCard>
      </motion.div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => setCurrentQ((p) => Math.max(0, p - 1))} disabled={currentQ === 0} className="flex items-center gap-2">
          <FiChevronLeft /> Previous
        </Button>

        {/* Question grid */}
        <div className="flex gap-1 flex-wrap justify-center">
          {exam.questions.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentQ(i)}
              className={`w-8 h-8 rounded-lg text-xs font-display font-bold transition-all ${
                i === currentQ ? "bg-neon-blue text-dark-900" :
                answers[i]?.answer ? "bg-neon-green/20 text-neon-green border border-neon-green/30" :
                "bg-white/5 text-white/40 border border-white/10"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        {currentQ < exam.totalQuestions - 1 ? (
          <Button variant="ghost" onClick={() => setCurrentQ((p) => p + 1)} className="flex items-center gap-2">
            Next <FiChevronRight />
          </Button>
        ) : (
          <Button variant="primary" onClick={handleSubmit} loading={submitted} glow>
            Submit Exam
          </Button>
        )}
      </div>
    </div>
  );
}
