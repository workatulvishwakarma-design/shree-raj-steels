"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  BookOpen,
  Mail,
  Image as ImageIcon,
  Settings,
  LogOut,
  X,
  Shield,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
    { name: "Blog Posts", path: "/admin/blog", icon: BookOpen },
    { name: "Contact Leads", path: "/admin/leads", icon: Mail },
    { name: "Gallery", path: "/admin/gallery", icon: ImageIcon },
    { name: "Settings", path: "/admin/settings", icon: Settings },
  ];

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/admin/auth", {
        method: "DELETE",
      });
      if (res.ok) {
        router.push("/admin/login");
        router.refresh();
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#0b1320] border-r border-slate-800 text-slate-300">
      {/* Header / Brand */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800/80">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="p-2 bg-[#C9A84C]/10 border border-[#C9A84C]/20 rounded-lg">
            <Shield className="w-5 h-5 text-[#C9A84C]" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white tracking-wider font-[family-name:var(--font-montserrat)]">
              SHREE RAJ
            </h2>
            <p className="text-[10px] text-slate-500 font-semibold tracking-widest uppercase">
              Admin Console
            </p>
          </div>
        </Link>
        <button
          onClick={onClose}
          className="lg:hidden p-1 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive =
            pathname === item.path ||
            (item.path !== "/admin" && pathname.startsWith(item.path));
          return (
            <Link
              key={item.name}
              href={item.path}
              onClick={() => {
                if (window.innerWidth < 1024) onClose();
              }}
              className={`relative flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all group ${
                isActive
                  ? "text-white bg-slate-800/50"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/20"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute left-0 w-1 h-3/5 bg-[#C9A84C] rounded-r"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <item.icon
                className={`w-5 h-5 transition-colors ${
                  isActive
                    ? "text-[#C9A84C]"
                    : "text-slate-500 group-hover:text-slate-400"
                }`}
              />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Footer / Logout */}
      <div className="p-4 border-t border-slate-800/80">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/5 transition-all group"
        >
          <LogOut className="w-5 h-5 text-red-400/80 group-hover:text-red-300" />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (Permanent) */}
      <aside className="hidden lg:block fixed inset-y-0 left-0 w-64 z-20">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer (Overlay) */}
      <div className="lg:hidden">
        {/* Backdrop */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-30"
          />
        )}

        {/* Sliding Panel */}
        <motion.aside
          initial={{ x: "-100%" }}
          animate={{ x: isOpen ? "0%" : "-100%" }}
          transition={{ type: "tween", duration: 0.3 }}
          className="fixed inset-y-0 left-0 w-64 z-40 shadow-2xl"
        >
          {sidebarContent}
        </motion.aside>
      </div>
    </>
  );
}
