"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    setReducedMotion(prefersReducedMotion);

    // Preloader shows only on the root homepage first visit
    const isHomepage = window.location.pathname === "/";
    const hasPreloaderRun = sessionStorage.getItem("srs-preloader-minimal-shown");

    if (isHomepage && !hasPreloaderRun) {
      setIsVisible(true);
      sessionStorage.setItem("srs-preloader-minimal-shown", "true");
      
      // Keep visible for the full transition duration (2 seconds)
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 2000);

      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, []);

  if (!isMounted || !isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: 1.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-[#020B1A] flex flex-col items-center justify-center overflow-hidden select-none pointer-events-auto"
          role="dialog"
          aria-modal="true"
          aria-label="Loading website"
        >
          {/* Centered Brand Presentation */}
          <div className="flex flex-col items-center">
            {/* Minimal Refined Gold SVG Emblem Logo */}
            <motion.div
              initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative w-20 h-20 mb-6 flex items-center justify-center"
            >
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full"
                fill="none"
                stroke="none"
              >
                {/* Circle Border */}
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  stroke="#C9A84C"
                  strokeWidth="3"
                />
                {/* Inner Circle (Dashed Accent) */}
                <circle
                  cx="50"
                  cy="50"
                  r="35"
                  stroke="#C9A84C"
                  strokeWidth="1"
                  strokeDasharray="4,4"
                  opacity="0.35"
                />
                {/* Intersecting Piping Silhouette */}
                <path
                  d="M 32 68 L 50 32 L 68 68 Z"
                  stroke="#C9A84C"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Vertical Support Pipe */}
                <path
                  d="M 50 32 V 68"
                  stroke="#C9A84C"
                  strokeWidth="2"
                />
              </svg>
            </motion.div>

            {/* Subtle Expanding Gold Line (Hidden if reduced motion is active) */}
            {!reducedMotion && (
              <div className="w-32 h-[1px] bg-white/10 relative overflow-hidden">
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1.0, delay: 0.5, ease: [0.25, 0.1, 0.25, 1.0] }}
                  style={{ originX: 0 }}
                  className="absolute inset-0 bg-[#C9A84C]"
                />
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
