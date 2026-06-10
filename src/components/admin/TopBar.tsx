"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, Globe, User } from "lucide-react";

interface TopBarProps {
  onMenuToggle: () => void;
}

export default function TopBar({ onMenuToggle }: TopBarProps) {
  const pathname = usePathname();

  // Simple breadcrumb generator
  const getBreadcrumbs = () => {
    const parts = pathname.split("/").filter((x) => x);
    return parts.map((part, index) => {
      const href = "/" + parts.slice(0, index + 1).join("/");
      const isLast = index === parts.length - 1;
      const label = part.charAt(0).toUpperCase() + part.slice(1);

      return (
        <span key={href} className="flex items-center text-xs sm:text-sm">
          {index > 0 && <span className="mx-2 text-slate-600">/</span>}
          {isLast ? (
            <span className="text-[#C9A84C] font-semibold">{label}</span>
          ) : (
            <Link
              href={href}
              className="text-slate-400 hover:text-slate-200 transition-colors"
            >
              {label}
            </Link>
          )}
        </span>
      );
    });
  };

  return (
    <header className="sticky top-0 z-10 flex h-16 w-full items-center justify-between border-b border-slate-800 bg-[#070d17]/80 backdrop-blur-md px-6">
      {/* Left side: Hamburger (mobile) + Breadcrumbs */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 text-slate-400 hover:text-white hover:bg-slate-800/40 rounded-lg transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden sm:flex items-center gap-1">
          {getBreadcrumbs()}
        </div>
      </div>

      {/* Right side: Actions & User Avatar */}
      <div className="flex items-center gap-4">
        {/* View Website Link */}
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-[#C9A84C] border border-slate-850 hover:border-[#C9A84C]/35 rounded-lg bg-slate-900/50 hover:bg-[#C9A84C]/5 transition-all"
        >
          <Globe className="w-4 h-4" />
          <span className="hidden md:inline">View Site</span>
        </Link>

        {/* User profile dropdown/button */}
        <div className="flex items-center gap-2.5 pl-4 border-l border-slate-850">
          <div className="flex flex-col text-right hidden sm:block">
            <span className="text-xs font-bold text-slate-200">Administrator</span>
            <span className="text-[10px] text-slate-500 font-medium">SRS Team</span>
          </div>
          <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-[#C9A84C]/30 to-slate-800 border border-slate-750 flex items-center justify-center text-[#C9A84C]">
            <User className="w-4 h-4" />
          </div>
        </div>
      </div>
    </header>
  );
}
