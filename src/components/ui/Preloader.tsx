"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield } from "lucide-react";

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // Check if user has already visited in this session
    const hasPreloaded = sessionStorage.getItem("srs_preloaded");
    if (!hasPreloaded) {
      setShouldRender(true);
      // Wait for animation to finish then hide preloader
      const timer = setTimeout(() => {
        setLoading(false);
        sessionStorage.setItem("srs_preloaded", "true");
      }, 2600);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!shouldRender || !loading) return null;

  // Render sparkles particles
  const particles = Array.from({ length: 15 });

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            y: -80,
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#060b13] overflow-hidden select-none"
        >
          {/* Subtle industrial grid texture in the background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

          {/* Central Logo and Rings */}
          <div className="relative flex items-center justify-center w-40 h-40 mb-8">
            {/* Outer rotating gold contour ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
              className="absolute inset-0 rounded-full border-2 border-dashed border-[#C9A84C]/30"
            />

            {/* Middle solid pulsing ring */}
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="absolute inset-2 rounded-full border border-[#C9A84C]/10"
            />

            {/* Gold glowing background core */}
            <div className="absolute inset-6 rounded-full bg-[radial-gradient(circle_at_center,rgba(201,168,76,0.12)_0%,transparent_70%)] blur-md" />

            {/* SRS central Shield icon */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="z-10 p-4 bg-[#0d1624] border border-[#C9A84C]/45 rounded-2xl shadow-[0_0_20px_rgba(201,168,76,0.15)] text-[#C9A84C]"
            >
              <Shield className="w-10 h-10" />
            </motion.div>
          </div>

          {/* Branded letters animated in */}
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-[0.2em] text-white font-[family-name:var(--font-playfair)] flex items-center justify-center gap-1.5 overflow-hidden">
              {"SHREE RAJ".split(" ").map((word, wordIdx) => (
                <span key={wordIdx} className="flex">
                  {word.split("").map((letter, idx) => (
                    <motion.span
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        duration: 0.6,
                        delay: (wordIdx * 4 + idx) * 0.06 + 0.3,
                        ease: [0.215, 0.61, 0.355, 1]
                      }}
                      key={idx}
                      className="inline-block relative"
                    >
                      {letter}
                    </motion.span>
                  ))}
                  {wordIdx === 0 && <span className="w-2" />}
                </span>
              ))}
            </h1>
            
            <motion.p
              initial={{ opacity: 0, letterSpacing: "0.2em" }}
              animate={{ opacity: 0.5, letterSpacing: "0.45em" }}
              transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
              className="text-[9px] text-[#C9A84C] font-semibold uppercase tracking-[0.45em] mt-3"
            >
              Engineering Excellence
            </motion.p>
          </div>

          {/* Shimmer overlay line swipe */}
          <motion.div 
            initial={{ left: "-100%" }}
            animate={{ left: "100%" }}
            transition={{ duration: 1.5, delay: 1, ease: "easeInOut" }}
            className="absolute top-1/2 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-[#C9A84C]/20 to-transparent pointer-events-none"
          />

          {/* Particle Sparks rising up */}
          {particles.map((_, i) => {
            const randomLeft = Math.random() * 100;
            const randomSize = Math.random() * 3 + 1;
            const randomDuration = Math.random() * 1.5 + 1;
            const randomDelay = Math.random() * 0.5;

            return (
              <motion.div
                key={i}
                initial={{ y: "110vh", opacity: 0, x: `${randomLeft}vw` }}
                animate={{ y: "-10vh", opacity: [0, 0.8, 0] }}
                transition={{
                  duration: randomDuration,
                  delay: randomDelay,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
                style={{
                  position: "absolute",
                  width: `${randomSize}px`,
                  height: `${randomSize}px`,
                  borderRadius: "50%",
                  backgroundColor: "#C9A84C",
                  boxShadow: "0 0 8px #C9A84C",
                  pointerEvents: "none"
                }}
              />
            );
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
