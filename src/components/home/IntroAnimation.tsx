"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoSchoolOutline } from "react-icons/io5";
import { APP_NAME } from "@/lib/constants";

export default function IntroAnimation({ children }: { children: React.ReactNode }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {show && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center bg-dark-900"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="flex flex-col items-center gap-6"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* Logo glow animation */}
              <motion.div
                className="relative"
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(0,240,255,0.3)",
                    "0 0 60px rgba(0,240,255,0.6)",
                    "0 0 20px rgba(0,240,255,0.3)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="w-24 h-24 rounded-2xl bg-dark-700 neon-border flex items-center justify-center">
                  <IoSchoolOutline className="w-14 h-14 text-neon-blue" />
                </div>
              </motion.div>

              {/* Title */}
              <motion.h1
                className="font-display text-3xl sm:text-4xl font-black gradient-text"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                {APP_NAME}
              </motion.h1>

              {/* Loading bar */}
              <motion.div
                className="w-48 h-1 bg-dark-600 rounded-full overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <motion.div
                  className="h-full bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.8, duration: 1.5, ease: "easeInOut" }}
                />
              </motion.div>

              <motion.p
                className="text-sm font-display text-white/40 uppercase tracking-[0.3em]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                Loading Experience
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {!show && children}
    </>
  );
}
