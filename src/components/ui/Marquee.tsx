'use client';

import React from 'react';

interface MarqueeProps {
  children: React.ReactNode;
  speed?: number;
  pauseOnHover?: boolean;
}

export default function Marquee({
  children,
  speed = 40,
  pauseOnHover = true,
}: MarqueeProps) {
  return (
    <div
      className="relative overflow-hidden border-y border-[#C9A84C]/30"
      aria-label="Scrolling content"
    >
      <div
        className={`flex w-max animate-[marquee_var(--marquee-duration)_linear_infinite] ${
          pauseOnHover ? 'hover:[animation-play-state:paused]' : ''
        }`}
        style={
          {
            '--marquee-duration': `${speed}s`,
          } as React.CSSProperties
        }
      >
        {/* Original content */}
        <div className="flex shrink-0 items-center">{children}</div>

        {/* Duplicate for seamless loop */}
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>

      {/* Inline keyframes via style tag */}
      <style>{`
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}
