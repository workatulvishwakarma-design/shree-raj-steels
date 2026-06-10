import React from "react";
import Link from "next/link";
import fs from "fs";
import path from "path";
import {
  FileText,
  Mail,
  Image as ImageIcon,
  Activity,
  Plus,
  ArrowRight,
} from "lucide-react";
import StatCard from "@/components/admin/StatCard";
import StatusBadge from "@/components/admin/StatusBadge";

// Helper to read JSON data safely
function readJsonFile<T>(filename: string, defaultValue: T): T {
  try {
    const filePath = path.join(process.cwd(), "src", "data", filename);
    if (!fs.existsSync(filePath)) {
      return defaultValue;
    }
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${filename}:`, error);
    return defaultValue;
  }
}

export default async function AdminDashboardPage() {
  // Read stats from local files
  const blogs = readJsonFile<any[]>("blog-posts.json", []);
  const leads = readJsonFile<any[]>("leads.json", []);
  const gallery = readJsonFile<any[]>("gallery-images.json", []);

  // Sort and slice for "recent" items
  const recentLeads = [...leads]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  const recentBlogs = [...blogs]
    .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
    .slice(0, 5);

  const newLeadsCount = leads.filter((l) => l.status === "new").length;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Welcome banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight font-[family-name:var(--font-playfair)]">
            Dashboard Overview
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Real-time operations tracking for Shree Raj Steels portal.
          </p>
        </div>
        
        {/* Quick action buttons */}
        <div className="flex items-center gap-3">
          <Link
            href="/admin/blog/new"
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold bg-[#C9A84C] hover:bg-[#b0913f] text-[#09111e] rounded-lg transition-all shadow-lg shadow-[#C9A84C]/10"
          >
            <Plus className="w-4 h-4" />
            New Post
          </Link>
          <Link
            href="/admin/leads"
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold bg-slate-900 border border-slate-800 hover:border-slate-700 text-white rounded-lg transition-all"
          >
            CRM Portal
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Stat Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Blog Posts"
          value={blogs.length}
          icon={FileText}
          description="Articles published on website"
          trend={{ value: "Active", positive: true }}
        />
        <StatCard
          title="Contact Leads"
          value={leads.length}
          icon={Mail}
          description={`${newLeadsCount} unresolved new submissions`}
          trend={{ value: `${newLeadsCount} new`, positive: newLeadsCount > 0 }}
        />
        <StatCard
          title="Gallery Assets"
          value={gallery.length}
          icon={ImageIcon}
          description="Industrial media items"
          trend={{ value: "Optimized", positive: true }}
        />
        <StatCard
          title="Portal Status"
          value="Online"
          icon={Activity}
          description="System environment normal"
          trend={{ value: "100% SLA", positive: true }}
        />
      </div>

      {/* Tables Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* CRM Leads Table */}
        <div className="xl:col-span-2 bg-[#0f1b2d]/50 border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl">
          <div className="px-6 py-5 border-b border-slate-800 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-white font-[family-name:var(--font-playfair)]">
                Recent Enquiries
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Latest submissions from contact and quote forms.
              </p>
            </div>
            <Link
              href="/admin/leads"
              className="text-xs text-[#C9A84C] hover:text-[#b0913f] font-semibold flex items-center gap-1"
            >
              View CRM
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/30 text-slate-400 font-semibold text-xs uppercase tracking-wider">
                  <th className="px-6 py-4">Client</th>
                  <th className="px-6 py-4">Interest</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {recentLeads.length > 0 ? (
                  recentLeads.map((lead) => (
                    <tr
                      key={lead.id}
                      className="hover:bg-slate-800/10 transition-colors group"
                    >
                      <td className="px-6 py-4">
                        <div className="font-semibold text-white group-hover:text-[#C9A84C] transition-colors">
                          {lead.name}
                        </div>
                        <div className="text-xs text-slate-500">{lead.company}</div>
                      </td>
                      <td className="px-6 py-4 text-slate-300">
                        {lead.products || "General Inquiry"}
                      </td>
                      <td className="px-6 py-4 text-slate-400 text-xs">
                        {new Date(lead.date).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={lead.status} />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-10 text-center text-slate-500">
                      No contact leads found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Blogs Checklist/List */}
        <div className="bg-[#0f1b2d]/50 border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl">
          <div className="px-6 py-5 border-b border-slate-800 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-white font-[family-name:var(--font-playfair)]">
                Recent Articles
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Manage the published insights and news.
              </p>
            </div>
            <Link
              href="/admin/blog"
              className="text-xs text-[#C9A84C] hover:text-[#b0913f] font-semibold flex items-center gap-1"
            >
              All Posts
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="p-6 space-y-4">
            {recentBlogs.length > 0 ? (
              recentBlogs.map((blog) => (
                <div
                  key={blog.slug}
                  className="flex items-start justify-between gap-4 p-3 rounded-lg hover:bg-slate-800/20 border border-transparent hover:border-slate-800 transition-all group"
                >
                  <div className="min-w-0">
                    <Link
                      href={`/admin/blog/${blog.slug}`}
                      className="font-semibold text-sm text-slate-200 group-hover:text-[#C9A84C] line-clamp-1 transition-colors block"
                    >
                      {blog.title}
                    </Link>
                    <span className="text-[10px] text-slate-500 font-medium">
                      By {blog.author} • {blog.category}
                    </span>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <span className="text-[10px] text-slate-400 block">
                      {new Date(blog.publishDate).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                      })}
                    </span>
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500 mt-1.5" title="Published" />
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-10 text-slate-500 text-sm">
                No blog posts found.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
