import React from "react";
import { Shield, Database, Info } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight font-[family-name:var(--font-playfair)]">
          System Settings
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Review system configuration and platform parameters.
        </p>
      </div>

      {/* Settings cards */}
      <div className="space-y-6">
        {/* Security configuration */}
        <div className="bg-[#0f1b2d]/50 border border-slate-800 rounded-xl p-6 shadow-md">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-4">
            <Shield className="w-4 h-4 text-[#C9A84C]" />
            Security & Authentication
          </h3>
          
          <div className="space-y-4 text-sm">
            <div className="flex items-center justify-between border-b border-slate-850 pb-3">
              <div>
                <span className="font-semibold text-slate-200 block">Single User Admin Portal</span>
                <span className="text-xs text-slate-500">Security state active</span>
              </div>
              <span className="px-2.5 py-1 text-xs font-semibold rounded-md bg-[#C9A84C]/10 border border-[#C9A84C]/25 text-[#C9A84C]">
                Active
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="font-semibold text-slate-200 block">Environment Key Protection</span>
                <span className="text-xs text-slate-500 font-mono">ADMIN_PASSWORD status</span>
              </div>
              <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                ● Configured
              </span>
            </div>
          </div>
        </div>

        {/* Database info */}
        <div className="bg-[#0f1b2d]/50 border border-slate-800 rounded-xl p-6 shadow-md">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-4">
            <Database className="w-4 h-4 text-[#C9A84C]" />
            Database Configuration
          </h3>
          
          <div className="space-y-4 text-sm">
            <div className="flex items-center justify-between border-b border-slate-850 pb-3">
              <div>
                <span className="font-semibold text-slate-200 block">Database Type</span>
                <span className="text-xs text-slate-500">Flat JSON-file storage</span>
              </div>
              <span className="text-xs text-slate-400 font-mono">
                src/data/*.json
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="font-semibold text-slate-200 block">File Synchronization</span>
                <span className="text-xs text-slate-500">Direct read/write locking</span>
              </div>
              <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                ● Connected
              </span>
            </div>
          </div>
        </div>

        {/* System info */}
        <div className="bg-[#0f1b2d]/50 border border-slate-800 rounded-xl p-6 shadow-md text-xs text-slate-500 flex items-start gap-2">
          <Info className="w-4 h-4 text-[#C9A84C] flex-shrink-0 mt-0.5" />
          <p>
            Shree Raj Steels Admin Portal v1.0.0. All changes are logged locally. For production backups or database migration (e.g. to Prisma/PostgreSQL), please contact the engineering team.
          </p>
        </div>
      </div>
    </div>
  );
}
