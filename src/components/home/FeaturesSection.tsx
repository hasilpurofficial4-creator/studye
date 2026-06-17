"use client";

import { motion } from "framer-motion";
import { GiBrain, GiPodium, GiBookCover, GiLightningFrequency } from "react-icons/gi";
import GlassCard from "@/components/ui/GlassCard";

const features = [
  {
    icon: <GiBrain className="w-8 h-8" />,
    title: "MCQ Exams",
    description: "Interactive multiple choice exams with instant results and detailed analytics.",
    color: "blue" as const,
  },
  {
    icon: <GiBookCover className="w-8 h-8" />,
    title: "Subjective Tests",
    description: "Write detailed answers for subjective exams evaluated by expert teachers.",
    color: "purple" as const,
  },
  {
    icon: <GiLightningFrequency className="w-8 h-8" />,
    title: "Live Tests",
    description: "Real-time competitive tests with live leaderboards and timed challenges.",
    color: "pink" as const,
  },
  {
    icon: <GiPodium className="w-8 h-8" />,
    title: "Result Tracking",
    description: "Track your progress with detailed result analysis and downloadable reports.",
    color: "green" as const,
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
            Platform <span className="neon-text">Features</span>
          </h2>
          <p className="text-white/40 font-body text-lg max-w-2xl mx-auto">
            Everything you need for a modern educational experience, powered by cutting-edge technology.
          </p>
        </motion.div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <GlassCard neonColor={feature.color} className="h-full text-center">
                <div className={`inline-flex p-4 rounded-xl mb-4 ${
                  feature.color === "blue" ? "bg-neon-blue/10 text-neon-blue" :
                  feature.color === "purple" ? "bg-neon-purple/10 text-neon-purple" :
                  feature.color === "pink" ? "bg-neon-pink/10 text-neon-pink" :
                  "bg-neon-green/10 text-neon-green"
                }`}>
                  {feature.icon}
                </div>
                <h3 className="font-display text-lg font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-white/40 font-body">{feature.description}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
