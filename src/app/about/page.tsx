"use client";

import { motion } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard";
import { APP_NAME, APP_OWNER } from "@/lib/constants";
import { FiTarget, FiEye, FiHeart } from "react-icons/fi";

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero */}
      <div className="text-center mb-16">
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
          About <span className="shimmer-text">{APP_NAME}</span>
        </h1>
        <p className="text-white/40 font-body text-lg max-w-2xl mx-auto">
          A premium gaming-style academy platform reimagining education for the digital age.
          Built with passion by {APP_OWNER}.
        </p>
      </div>

      {/* Mission, Vision, Values */}
      <div className="grid md:grid-cols-3 gap-6 mb-16">
        {[
          { icon: <FiTarget className="w-8 h-8" />, title: "Our Mission", desc: "To provide accessible, engaging, and technology-driven education that empowers students to achieve their full potential through innovative learning methods.", color: "blue" },
          { icon: <FiEye className="w-8 h-8" />, title: "Our Vision", desc: "To become the leading digital academy platform in Pakistan, setting new standards for online education with cutting-edge technology and gamified learning.", color: "purple" },
          { icon: <FiHeart className="w-8 h-8" />, title: "Our Values", desc: "Innovation, excellence, accessibility, and student-first approach. We believe every student deserves the best tools to succeed in their academic journey.", color: "pink" },
        ].map((item, i) => (
          <motion.div key={item.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
            <GlassCard neonColor={item.color as "blue" | "purple" | "pink"} className="h-full text-center">
              <div className={`inline-flex p-4 rounded-xl mb-4 ${item.color === "blue" ? "bg-neon-blue/10 text-neon-blue" : item.color === "purple" ? "bg-neon-purple/10 text-neon-purple" : "bg-neon-pink/10 text-neon-pink"}`}>
                {item.icon}
              </div>
              <h3 className="font-display text-xl font-bold text-white mb-3">{item.title}</h3>
              <p className="text-white/40 font-body text-sm leading-relaxed">{item.desc}</p>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Story */}
      <div className="max-w-3xl mx-auto">
        <GlassCard className="text-center">
          <h2 className="font-display text-2xl font-bold text-white mb-4">Our Story</h2>
          <p className="text-white/50 font-body leading-relaxed mb-4">
            {APP_NAME} was founded with a simple yet powerful idea: make education as engaging as gaming.
            By combining modern web technology with gamified learning elements, we&apos;ve created a platform
            where students actually enjoy taking exams and tracking their progress.
          </p>
          <p className="text-white/50 font-body leading-relaxed mb-4">
            Our platform features MCQ exams, subjective tests, real-time assessments, and comprehensive
            result tracking — all wrapped in a stunning neon-lit gaming aesthetic that makes learning feel
            like an adventure.
          </p>
          <p className="text-sm font-display text-neon-purple mt-6">
            Founded & Developed by {APP_OWNER} | Lahore, Pakistan
          </p>
        </GlassCard>
      </div>
    </div>
  );
}
