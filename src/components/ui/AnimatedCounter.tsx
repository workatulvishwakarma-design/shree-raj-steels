'use client';

import React, { useEffect, useRef } from 'react';
import {
  useInView,
  useMotionValue,
  useTransform,
  motion,
  animate,
} from 'framer-motion';

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  label: string;
  duration?: number;
}

export default function AnimatedCounter({
  value,
  suffix = '',
  label,
  duration = 2,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) => Math.round(latest));

  const displayRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(motionValue, value, {
      duration,
      ease: 'easeOut',
    });

    return () => controls.stop();
  }, [isInView, value, duration, motionValue]);

  useEffect(() => {
    const unsubscribe = rounded.on('change', (latest) => {
      if (displayRef.current) {
        displayRef.current.textContent = latest.toLocaleString();
      }
    });

    return () => unsubscribe();
  }, [rounded]);

  return (
    <div ref={ref} className="flex flex-col items-center">
      {/* Animated number */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="flex items-baseline"
      >
        <span
          ref={displayRef}
          className="font-serif text-5xl sm:text-6xl font-bold text-[#C9A84C]"
        >
          0
        </span>
        {suffix && (
          <span className="font-serif text-4xl sm:text-5xl font-bold text-[#C9A84C]">
            {suffix}
          </span>
        )}
      </motion.div>

      {/* Label */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
        className="mt-2 text-sm uppercase tracking-[0.15em] text-white font-medium"
      >
        {label}
      </motion.p>
    </div>
  );
}
