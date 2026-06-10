import React from "react";

interface StatusBadgeProps {
  status: string;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const normalized = status.toLowerCase();

  const config: Record<string, { bg: string; text: string; label: string }> = {
    // Blog status
    published: {
      bg: "bg-emerald-500/10 border-emerald-500/20",
      text: "text-emerald-400",
      label: "Published",
    },
    draft: {
      bg: "bg-amber-500/10 border-amber-500/20",
      text: "text-amber-400",
      label: "Draft",
    },
    // Leads CRM status
    new: {
      bg: "bg-sky-500/10 border-sky-500/20",
      text: "text-sky-400",
      label: "New Lead",
    },
    contacted: {
      bg: "bg-purple-500/10 border-purple-500/20",
      text: "text-purple-400",
      label: "Contacted",
    },
    qualified: {
      bg: "bg-indigo-500/10 border-indigo-500/20",
      text: "text-indigo-400",
      label: "Qualified",
    },
    closed: {
      bg: "bg-slate-500/10 border-slate-500/20",
      text: "text-slate-400",
      label: "Closed",
    },
  };

  const current = config[normalized] || {
    bg: "bg-slate-500/10 border-slate-500/20",
    text: "text-slate-400",
    label: status,
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${current.bg} ${current.text}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current mr-1.5 animate-pulse" />
      {current.label}
    </span>
  );
}
