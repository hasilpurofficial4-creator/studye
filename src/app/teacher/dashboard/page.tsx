"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { useNotification } from "@/context/NotificationContext";
import GlassCard from "@/components/ui/GlassCard";
import Loader from "@/components/ui/Loader";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Badge from "@/components/ui/Badge";
import Modal from "@/components/ui/Modal";
import { Exam, Student, Result } from "@/lib/types";
import { CLASSES } from "@/lib/constants";
import { generateId } from "@/lib/utils";
import { FiUsers, FiBook, FiAward, FiPlus, FiTrash2 } from "react-icons/fi";

export default function TeacherDashboard() {
  const { user } = useAuth();
  const { showToast } = useNotification();
  const [students, setStudents] = useState<Student[]>([]);
  const [exams, setExams] = useState<Exam[]>([]);
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);
  const [showExamModal, setShowExamModal] = useState(false);
  const [examForm, setExamForm] = useState({
    title: "", class: "", type: "mcq" as "mcq" | "subjective", totalMarks: 0, duration: 30,
    questions: [{ id: "1", question: "", optionA: "", optionB: "", optionC: "", optionD: "", correctOption: "A", marks: 1, type: "mcq" as "mcq" | "subjective" }],
  });

  useEffect(() => {
    Promise.all([
      fetch("/api/students").then((r) => r.json()),
      fetch("/api/exams").then((r) => r.json()),
      fetch("/api/results").then((r) => r.json()),
    ])
      .then(([s, e, r]) => {
        setStudents(s.data || []);
        setExams(e.data || []);
        setResults(r.data || []);
      })
      .finally(() => setLoading(false));
  }, []);

  const addQuestion = () => {
    setExamForm((prev) => ({
      ...prev,
      questions: [...prev.questions, {
        id: generateId(), question: "", optionA: "", optionB: "", optionC: "", optionD: "", correctOption: "A", marks: 1, type: prev.type,
      }],
    }));
  };

  const removeQuestion = (id: string) => {
    setExamForm((prev) => ({ ...prev, questions: prev.questions.filter((q) => q.id !== id) }));
  };

  const updateQuestion = (id: string, field: string, value: string | number) => {
    setExamForm((prev) => ({
      ...prev,
      questions: prev.questions.map((q) => q.id === id ? { ...q, [field]: value } : q),
    }));
  };

  const createExam = async () => {
    try {
      const payload = {
        ...examForm,
        totalQuestions: examForm.questions.length,
        totalMarks: examForm.questions.reduce((s, q) => s + q.marks, 0),
      };
      const res = await fetch("/api/exams", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      showToast("Exam created successfully!", "success");
      setExams((prev) => [...prev, data.data]);
      setShowExamModal(false);
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Failed to create exam", "error");
    }
  };

  const deleteExam = async (id: string) => {
    try {
      const res = await fetch(`/api/exams/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      setExams((prev) => prev.filter((e) => e.id !== id));
      showToast("Exam deleted", "info");
    } catch {
      showToast("Failed to delete exam", "error");
    }
  };

  if (loading) return <div className="min-h-[60vh] flex items-center justify-center"><Loader text="Loading..." /></div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-white mb-2">
            Teacher <span className="neon-text-purple">Dashboard</span>
          </h1>
          <p className="text-white/40 font-body">Welcome back, {user?.name}</p>
        </div>
        <Button variant="primary" onClick={() => setShowExamModal(true)} className="flex items-center gap-2">
          <FiPlus /> Create Exam
        </Button>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          { icon: <FiUsers className="w-6 h-6" />, label: "Total Students", value: students.length, color: "blue" },
          { icon: <FiBook className="w-6 h-6" />, label: "Exams Created", value: exams.length, color: "purple" },
          { icon: <FiAward className="w-6 h-6" />, label: "Results", value: results.length, color: "green" },
        ].map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <GlassCard neonColor={stat.color as "blue" | "purple" | "green"}>
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${stat.color === "blue" ? "bg-neon-blue/10 text-neon-blue" : stat.color === "purple" ? "bg-neon-purple/10 text-neon-purple" : "bg-neon-green/10 text-neon-green"}`}>{stat.icon}</div>
                <div>
                  <p className="font-display text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-white/40 font-display uppercase tracking-wider">{stat.label}</p>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Exams List */}
      <h2 className="font-display text-xl font-bold text-white mb-4">Your Exams</h2>
      <div className="space-y-3 mb-8">
        {exams.map((exam) => (
          <GlassCard key={exam.id} className="!p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-display font-bold text-white">{exam.title}</h3>
                  <Badge variant={exam.type === "mcq" ? "blue" : "purple"}>{exam.type}</Badge>
                </div>
                <p className="text-sm text-white/40 font-body">{exam.class} • {exam.totalQuestions} questions • {exam.totalMarks} marks</p>
              </div>
              <button onClick={() => deleteExam(exam.id)} className="p-2 text-red-400/60 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors">
                <FiTrash2 size={18} />
              </button>
            </div>
          </GlassCard>
        ))}
        {exams.length === 0 && <div className="text-center py-12 text-white/30">No exams created yet.</div>}
      </div>

      {/* Students List */}
      <h2 className="font-display text-xl font-bold text-white mb-4">Students</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-xs font-display uppercase tracking-wider text-white/40 border-b border-white/10">
              <th className="pb-3 pr-4">Name</th>
              <th className="pb-3 pr-4">Class</th>
              <th className="pb-3 pr-4">Father Name</th>
              <th className="pb-3">ID Card</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.id} className="border-b border-white/5 text-sm text-white/60">
                <td className="py-3 pr-4 font-medium text-white">{s.name}</td>
                <td className="py-3 pr-4">{s.class}</td>
                <td className="py-3 pr-4">{s.fatherName}</td>
                <td className="py-3 font-mono text-xs">{s.idCard}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {students.length === 0 && <div className="text-center py-12 text-white/30">No students registered.</div>}
      </div>

      {/* Create Exam Modal */}
      <Modal isOpen={showExamModal} onClose={() => setShowExamModal(false)} title="Create New Exam" className="max-w-2xl">
        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
          <Input label="Exam Title" value={examForm.title} onChange={(e) => setExamForm((p) => ({ ...p, title: e.target.value }))} placeholder="e.g. Mathematics Midterm" />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-display uppercase tracking-wider text-white/60 mb-2">Class</label>
              <select className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white" value={examForm.class} onChange={(e) => setExamForm((p) => ({ ...p, class: e.target.value }))}>
                <option value="" className="bg-dark-800">Select</option>
                {CLASSES.map((c) => <option key={c} value={c} className="bg-dark-800">{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-display uppercase tracking-wider text-white/60 mb-2">Type</label>
              <select className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white" value={examForm.type} onChange={(e) => setExamForm((p) => ({ ...p, type: e.target.value as "mcq" | "subjective" }))}>
                <option value="mcq" className="bg-dark-800">MCQ</option>
                <option value="subjective" className="bg-dark-800">Subjective</option>
              </select>
            </div>
          </div>
          <Input label="Duration (minutes)" type="number" value={String(examForm.duration)} onChange={(e) => setExamForm((p) => ({ ...p, duration: Number(e.target.value) }))} />

          {/* Questions */}
          <h3 className="font-display text-lg font-bold text-white pt-2">Questions</h3>
          {examForm.questions.map((q, i) => (
            <div key={q.id} className="glass rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-display text-neon-blue">Q{i + 1}</span>
                {examForm.questions.length > 1 && (
                  <button onClick={() => removeQuestion(q.id)} className="text-red-400/60 hover:text-red-400"><FiTrash2 size={16} /></button>
                )}
              </div>
              <Input placeholder="Question text" value={q.question} onChange={(e) => updateQuestion(q.id, "question", e.target.value)} />
              {examForm.type === "mcq" && (
                <div className="grid grid-cols-2 gap-2">
                  <Input placeholder="Option A" value={q.optionA || ""} onChange={(e) => updateQuestion(q.id, "optionA", e.target.value)} />
                  <Input placeholder="Option B" value={q.optionB || ""} onChange={(e) => updateQuestion(q.id, "optionB", e.target.value)} />
                  <Input placeholder="Option C" value={q.optionC || ""} onChange={(e) => updateQuestion(q.id, "optionC", e.target.value)} />
                  <Input placeholder="Option D" value={q.optionD || ""} onChange={(e) => updateQuestion(q.id, "optionD", e.target.value)} />
                </div>
              )}
              <div className="grid grid-cols-2 gap-2">
                {examForm.type === "mcq" && (
                  <div>
                    <label className="block text-xs font-display uppercase text-white/40 mb-1">Correct Option</label>
                    <select className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm" value={q.correctOption} onChange={(e) => updateQuestion(q.id, "correctOption", e.target.value)}>
                      {["A", "B", "C", "D"].map((o) => <option key={o} value={o} className="bg-dark-800">{o}</option>)}
                    </select>
                  </div>
                )}
                <Input label="Marks" type="number" value={String(q.marks)} onChange={(e) => updateQuestion(q.id, "marks", Number(e.target.value))} />
              </div>
            </div>
          ))}
          <Button variant="ghost" size="sm" onClick={addQuestion} className="w-full flex items-center justify-center gap-2">
            <FiPlus /> Add Question
          </Button>
          <Button variant="primary" size="lg" className="w-full" onClick={createExam}>Create Exam</Button>
        </div>
      </Modal>
    </div>
  );
}
