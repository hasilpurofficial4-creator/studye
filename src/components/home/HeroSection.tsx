"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ROUTES } from "@/lib/constants";
import Button from "@/components/ui/Button";
import { FiArrowRight } from "react-icons/fi";

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-blue/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-neon-purple/10 rounded-full blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div
            className="text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block mb-4"
            >
              <span className="px-4 py-2 text-xs font-display font-bold uppercase tracking-widest border border-neon-blue/30 text-neon-blue rounded-full bg-neon-blue/5">
                Premium Academy Platform
              </span>
            </motion.div>

            <motion.h1
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <span className="text-white">Welcome to</span>
              <br />
              <span className="shimmer-text">Study Hub Lahore</span>
            </motion.h1>

            <motion.p
              className="text-lg text-white/50 font-body leading-relaxed mb-8 max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              Experience education like never before. Our gaming-style platform makes
              learning engaging, interactive, and fun. Take exams, track results, and
              level up your academic journey.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Link href={ROUTES.STUDENT.LOGIN}>
                <Button variant="primary" size="lg" className="flex items-center gap-2">
                  Student Login <FiArrowRight />
                </Button>
              </Link>
              <Link href={ROUTES.TEACHER.LOGIN}>
                <Button variant="secondary" size="lg" className="flex items-center gap-2">
                  Teacher Login <FiArrowRight />
                </Button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="flex gap-8 mt-12 justify-center lg:justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              {[
                { label: "Students", value: "500+" },
                { label: "Exams", value: "200+" },
                { label: "Teachers", value: "50+" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="font-display text-2xl font-bold neon-text">{stat.value}</p>
                  <p className="text-xs text-white/40 font-display uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right - Hero Image */}
          <motion.div
            className="relative flex justify-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative">
              {/* Glow behind image */}
              <div className="absolute inset-0 bg-neon-blue/20 rounded-full blur-[80px] scale-75" />

              {/* Image container with neon border */}
              <div className="relative w-80 h-80 sm:w-96 sm:h-96 rounded-3xl overflow-hidden neon-border p-1 animate-float">
                <div className="w-full h-full rounded-3xl overflow-hidden bg-dark-700 flex items-center justify-center">
                  <Image
                    src="/hero-academy.png"
                    alt="Study Hub Lahore Academy"
                    width={400}
                    height={400}
                    className="w-full h-full object-cover"
                    priority
                    unoptimized
                  />
                </div>
              </div>

              {/* Floating badges */}
              <motion.div
                className="absolute -top-4 -right-4 glass neon-border rounded-xl px-4 py-2"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <p className="text-xs font-display font-bold text-neon-green">LIVE EXAMS</p>
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -left-4 glass neon-border-purple rounded-xl px-4 py-2"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              >
                <p className="text-xs font-display font-bold text-neon-purple">MCQ + SUBJECTIVE</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
