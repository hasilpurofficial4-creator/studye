"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiUser, FiMail, FiLock, FiMapPin, FiCreditCard } from "react-icons/fi";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { useAuth } from "@/context/AuthContext";
import { useNotification } from "@/context/NotificationContext";
import { ROUTES, CLASSES } from "@/lib/constants";

export default function StudentRegisterPage() {
  const [form, setForm] = useState({
    name: "", fatherName: "", class: "", idCard: "", address: "", email: "", password: "",
  });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { showToast } = useNotification();
  const router = useRouter();

  const update = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      login(data.data.token, data.data.user);
      showToast("Registration successful!", "success");
      router.push(ROUTES.STUDENT.DASHBOARD);
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Registration failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card glow>
          <div className="text-center mb-8">
            <h1 className="font-display text-2xl font-bold neon-text mb-2">Student Registration</h1>
            <p className="text-white/40 text-sm font-body">Create your account to get started</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Student Name" placeholder="Full name" icon={<FiUser />} value={form.name} onChange={update("name")} required />
            <Input label="Father Name" placeholder="Father's full name" icon={<FiUser />} value={form.fatherName} onChange={update("fatherName")} required />

            <div>
              <label className="block text-sm font-display uppercase tracking-wider text-white/60 mb-2">Class</label>
              <select
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white font-body focus:outline-none focus:border-neon-blue/50 transition-all"
                value={form.class}
                onChange={update("class")}
                required
              >
                <option value="" className="bg-dark-800">Select Class</option>
                {CLASSES.map((c) => <option key={c} value={c} className="bg-dark-800">{c}</option>)}
              </select>
            </div>

            <Input label="ID Card Number" placeholder="CNIC or B-Form number" icon={<FiCreditCard />} value={form.idCard} onChange={update("idCard")} required />
            <Input label="Address" placeholder="Full address" icon={<FiMapPin />} value={form.address} onChange={update("address")} required />
            <Input label="Email (optional)" type="email" placeholder="Email address" icon={<FiMail />} value={form.email} onChange={update("email")} />
            <Input label="Password" type="password" placeholder="Create a password" icon={<FiLock />} value={form.password} onChange={update("password")} required />

            <Button type="submit" variant="primary" size="lg" className="w-full" loading={loading}>
              Register
            </Button>
          </form>

          <p className="text-center text-sm text-white/40 mt-6">
            Already have an account?{" "}
            <Link href={ROUTES.STUDENT.LOGIN} className="text-neon-blue hover:underline">Login Here</Link>
          </p>
        </Card>
      </motion.div>
    </div>
  );
}
