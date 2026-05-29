import React from 'react';

interface SectionHeaderProps {
  label: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

export default function SectionHeader({
  label,
  title,
  subtitle,
  centered = true,
  light = false,
}: SectionHeaderProps) {
  return (
    <div className={centered ? 'text-center' : 'text-left'}>
      {/* Gold uppercase label */}
      <p className="text-xs uppercase tracking-[0.2em] font-medium text-[#C9A84C] mb-3">
        {label}
      </p>

      {/* Playfair Display heading */}
      <h2
        className={`font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight ${
          light ? 'text-[#0A1628]' : 'text-white'
        }`}
      >
        {title}
      </h2>

      {/* Optional subtitle */}
      {subtitle && (
        <p
          className={`mt-4 max-w-2xl text-base sm:text-lg leading-relaxed ${
            centered ? 'mx-auto' : ''
          } ${light ? 'text-gray-500' : 'text-gray-300'}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
