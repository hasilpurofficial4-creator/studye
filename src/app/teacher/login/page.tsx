"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiMail, FiLock } from "react-icons/fi";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { useAuth } from "@/context/AuthContext";
import { useNotification } from "@/context/NotificationContext";
import { ROUTES } from "@/lib/constants";

export default function TeacherLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { showToast } = useNotification();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role: "teacher" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      login(data.data.token, data.data.user);
      showToast("Welcome back!", "success");
      router.push(ROUTES.TEACHER.DASHBOARD);
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Login failed", "error");
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
            <h1 className="font-display text-2xl font-bold neon-text-purple mb-2">Teacher Login</h1>
            <p className="text-white/40 text-sm font-body">Access your teacher dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input label="Email" type="email" placeholder="Enter your email" icon={<FiMail />} value={email} onChange={(e) => setEmail(e.target.value)} required />
            <Input label="Password" type="password" placeholder="Enter your password" icon={<FiLock />} value={password} onChange={(e) => setPassword(e.target.value)} required />
            <Button type="submit" variant="secondary" size="lg" className="w-full" loading={loading}>
              Login
            </Button>
          </form>

          <p className="text-center text-sm text-white/40 mt-6">
            <Link href={ROUTES.HOME} className="text-neon-purple hover:underline">Back to Home</Link>
          </p>
        </Card>
      </motion.div>
    </div>
  );
}
