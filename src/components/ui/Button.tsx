'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

type ButtonVariant = 'primary' | 'secondary' | 'dark' | 'danger' | 'whatsapp';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  ariaLabel?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-[#C9A84C] text-[#0A1628] hover:bg-[#D4B766] font-semibold',
  secondary:
    'bg-transparent text-white border border-white hover:bg-white/10 font-medium',
  dark:
    'bg-[#0A1628] text-white hover:bg-[#1B2A4A] font-semibold',
  danger:
    'bg-red-600 text-white hover:bg-red-700 font-semibold',
  whatsapp:
    'bg-[#25D366] text-white hover:bg-[#20BD5A] font-semibold',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm gap-1.5',
  md: 'px-6 py-3 text-base gap-2',
  lg: 'px-8 py-4 text-lg gap-2.5',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  href,
  icon,
  children,
  className = '',
  onClick,
  disabled = false,
  type = 'button',
  ariaLabel,
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center rounded-md transition-colors duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A84C] disabled:opacity-50 disabled:cursor-not-allowed';

  const classes = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  const motionProps = {
    whileHover: disabled ? {} : { scale: 1.05 },
    whileTap: disabled ? {} : { scale: 0.98 },
    transition: { type: 'spring' as const, stiffness: 400, damping: 17 },
  };

  if (href && !disabled) {
    return (
      <motion.div {...motionProps} className="inline-block">
        <Link href={href} className={classes} aria-label={ariaLabel}>
          {icon && <span className="shrink-0">{icon}</span>}
          {children}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      {...motionProps}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      type={type}
      aria-label={ariaLabel}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </motion.button>
  );
}
