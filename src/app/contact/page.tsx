"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiPhone, FiMapPin, FiSend } from "react-icons/fi";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { useNotification } from "@/context/NotificationContext";

export default function ContactPage() {
  const { showToast } = useNotification();
  const [form, setForm] = useState({ name: "", contactType: "email" as "email" | "mobile" | "whatsapp", contactValue: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      showToast("Message sent successfully!", "success");
      setForm({ name: "", contactType: "email", contactValue: "", subject: "", message: "" });
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Failed to send", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
        <h1 className="font-display text-4xl font-bold text-white mb-4">Contact <span className="neon-text">Us</span></h1>
        <p className="text-white/40 font-body text-lg max-w-lg mx-auto">Have a question? We&apos;d love to hear from you.</p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Form */}
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
          <Card glow>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input label="Your Name" value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} placeholder="Full name" required />

              <div>
                <label className="block text-sm font-display uppercase tracking-wider text-white/60 mb-2">Contact Method</label>
                <div className="flex gap-2">
                  {(["email", "mobile", "whatsapp"] as const).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setForm((p) => ({ ...p, contactType: type }))}
                      className={`px-4 py-2 rounded-lg text-sm font-display uppercase transition-all ${
                        form.contactType === type ? "bg-neon-blue/10 text-neon-blue border border-neon-blue/30" : "bg-white/5 text-white/40 border border-white/10 hover:border-white/20"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <Input
                label={form.contactType === "email" ? "Email Address" : form.contactType === "mobile" ? "Phone Number" : "WhatsApp Number"}
                value={form.contactValue}
                onChange={(e) => setForm((p) => ({ ...p, contactValue: e.target.value }))}
                placeholder={form.contactType === "email" ? "your@email.com" : "+92 300 1234567"}
                required
              />

              <Input label="Subject (optional)" value={form.subject} onChange={(e) => setForm((p) => ({ ...p, subject: e.target.value }))} placeholder="Subject" />

              <div>
                <label className="block text-sm font-display uppercase tracking-wider text-white/60 mb-2">Message</label>
                <textarea
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 font-body focus:outline-none focus:border-neon-blue/50 transition-all h-32 resize-none"
                  value={form.message}
                  onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                  placeholder="Your message..."
                  required
                />
              </div>

              <Button type="submit" variant="primary" size="lg" className="w-full flex items-center justify-center gap-2" loading={loading}>
                <FiSend /> Send Message
              </Button>
            </form>
          </Card>
        </motion.div>

        {/* Info */}
        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="space-y-6">
          {[
            { icon: <FiMail className="w-6 h-6" />, title: "Email", value: "info@studyhublahore.com", color: "blue" },
            { icon: <FiPhone className="w-6 h-6" />, title: "Phone", value: "+92 300 1234567", color: "purple" },
            { icon: <FiMapPin className="w-6 h-6" />, title: "Address", value: "Lahore, Pakistan", color: "pink" },
          ].map((info) => (
            <Card key={info.title} className="flex items-center gap-4">
              <div className={`p-3 rounded-xl ${info.color === "blue" ? "bg-neon-blue/10 text-neon-blue" : info.color === "purple" ? "bg-neon-purple/10 text-neon-purple" : "bg-neon-pink/10 text-neon-pink"}`}>
                {info.icon}
              </div>
              <div>
                <h3 className="font-display font-bold text-white">{info.title}</h3>
                <p className="text-sm text-white/40 font-body">{info.value}</p>
              </div>
            </Card>
          ))}

          <Card className="neon-border-purple">
            <h3 className="font-display text-lg font-bold text-white mb-2">Business Hours</h3>
            <div className="space-y-1 text-sm text-white/40 font-body">
              <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
              <p>Saturday: 10:00 AM - 4:00 PM</p>
              <p>Sunday: Closed</p>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
