"use client";

import React, { useState, useEffect } from "react";
import { Download, Eye, Trash2, Mail, Phone, Calendar, Globe, Building2, MessageSquare, X } from "lucide-react";
import DataTable, { Column } from "@/components/admin/DataTable";
import StatusBadge from "@/components/admin/StatusBadge";

interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  country: string;
  products: string;
  message: string;
  date: string;
  status: "new" | "contacted" | "qualified" | "closed";
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("All");

  const fetchLeads = async () => {
    try {
      const res = await fetch("/api/admin/leads");
      const data = await res.json();
      setLeads(data);
    } catch (error) {
      console.error("Failed to fetch leads:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleStatusChange = async (id: string, newStatus: Lead["status"]) => {
    try {
      const res = await fetch("/api/admin/leads", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setLeads((prev) =>
          prev.map((lead) => (lead.id === id ? { ...lead, status: newStatus } : lead))
        );
        // Sync open modal if the active lead changes
        if (selectedLead && selectedLead.id === id) {
          setSelectedLead((prev) => prev ? { ...prev, status: newStatus } : null);
        }
      } else {
        alert("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating lead status:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this lead? This is permanent.")) return;

    try {
      const res = await fetch(`/api/admin/leads?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setLeads((prev) => prev.filter((lead) => lead.id !== id));
        if (selectedLead && selectedLead.id === id) {
          setSelectedLead(null);
        }
      } else {
        alert("Failed to delete lead");
      }
    } catch (error) {
      console.error("Error deleting lead:", error);
    }
  };

  const handleExportCSV = () => {
    const headers = ["Name", "Company", "Email", "Phone", "Country", "Products Interest", "Date", "Status", "Message"];
    const rows = leads.map((l) => [
      l.name,
      l.company,
      l.email,
      l.phone,
      l.country,
      l.products,
      new Date(l.date).toISOString(),
      l.status,
      l.message.replace(/"/g, '""'), // Escape quotes
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map((val) => `"${val}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `srs_leads_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter logic
  const filteredLeads = React.useMemo(() => {
    if (statusFilter === "All") return leads;
    return leads.filter((lead) => lead.status === statusFilter.toLowerCase());
  }, [leads, statusFilter]);

  const searchFilter = (item: Lead, query: string) => {
    const q = query.toLowerCase();
    return (
      item.name.toLowerCase().includes(q) ||
      item.company.toLowerCase().includes(q) ||
      item.email.toLowerCase().includes(q) ||
      item.country.toLowerCase().includes(q) ||
      item.products.toLowerCase().includes(q)
    );
  };

  const columns: Column<Lead>[] = [
    {
      header: "Sender Detail",
      accessor: (row) => (
        <div>
          <div className="font-semibold text-white">{row.name}</div>
          <div className="text-xs text-slate-500 font-medium flex items-center gap-1 mt-0.5">
            <Building2 className="w-3.5 h-3.5 text-slate-650" />
            {row.company || "No Company Specified"}
          </div>
        </div>
      ),
    },
    {
      header: "Contact Info",
      accessor: (row) => (
        <div className="text-xs space-y-0.5 text-slate-400">
          <div className="flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-slate-550" />
            <a href={`mailto:${row.email}`} className="hover:text-[#C9A84C] transition-colors">{row.email}</a>
          </div>
          <div className="flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-slate-550" />
            <a href={`tel:${row.phone}`} className="hover:text-[#C9A84C] transition-colors">{row.phone}</a>
          </div>
        </div>
      ),
    },
    {
      header: "Requirements",
      accessor: (row) => (
        <div className="max-w-[200px] truncate">
          <span className="font-medium text-slate-200 block truncate">{row.products}</span>
          <span className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5">
            <Globe className="w-3 h-3 text-slate-600" />
            {row.country}
          </span>
        </div>
      ),
    },
    {
      header: "Received",
      accessor: (row) => (
        <div className="text-xs text-slate-400 flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-slate-550" />
          {new Date(row.date).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </div>
      ),
    },
    {
      header: "Status",
      accessor: (row) => (
        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
          <select
            value={row.status}
            onChange={(e) => handleStatusChange(row.id, e.target.value as Lead["status"])}
            className="px-2 py-1 bg-[#070d17] border border-slate-800 text-xs text-slate-300 rounded-md focus:border-[#C9A84C] focus:ring-0 outline-none"
          >
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="qualified">Qualified</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      ),
    },
  ];

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#C9A84C] border-t-transparent" />
        <span className="text-sm text-slate-500 font-medium">Retrieving client database...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500 relative">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight font-[family-name:var(--font-playfair)]">
            CRM Leads Manager
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Track and process enquiries from global buyers.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-bold bg-[#C9A84C] hover:bg-[#b0913f] text-[#09111e] rounded-lg transition-all shadow-lg shadow-[#C9A84C]/10 cursor-pointer"
        >
          <Download className="w-4 h-4" />
          Export to CSV
        </button>
      </div>

      {/* Filter Row */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-850 pb-4">
        {["All", "New", "Contacted", "Qualified", "Closed"].map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
              statusFilter === status
                ? "bg-[#C9A84C]/15 border-[#C9A84C]/40 text-[#C9A84C]"
                : "bg-slate-900/40 border-slate-800 text-slate-400 hover:text-white"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Main Grid table */}
      <DataTable
        columns={columns}
        data={filteredLeads}
        searchPlaceholder="Filter leads by client, company, email, country, or interest..."
        searchFilter={searchFilter}
        emptyMessage="No matching lead records found."
        actions={(row) => (
          <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedLead(row)}
              className="p-1.5 rounded-lg border border-slate-850 text-slate-400 hover:text-white hover:bg-slate-800/40 transition-colors"
              title="View Message"
            >
              <Eye className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleDelete(row.id)}
              className="p-1.5 rounded-lg border border-slate-850 text-slate-400 hover:text-red-400 hover:bg-red-500/5 transition-colors"
              title="Delete Lead"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      />

      {/* Detail Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-2xl bg-[#0f1b2d] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-white text-lg font-[family-name:var(--font-playfair)]">
                  Enquiry details
                </h3>
                <span className="text-[10px] font-mono text-slate-500">ID: {selectedLead.id}</span>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="p-1.5 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
              {/* Header card details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#070d17]/50 border border-slate-850 p-4 rounded-xl">
                <div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Client Name</span>
                  <span className="text-sm font-semibold text-white mt-0.5 block">{selectedLead.name}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Company / Business</span>
                  <span className="text-sm font-semibold text-white mt-0.5 block">{selectedLead.company || "General Buyer"}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Email Address</span>
                  <a href={`mailto:${selectedLead.email}`} className="text-sm text-[#C9A84C] hover:underline mt-0.5 block">{selectedLead.email}</a>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Phone Number</span>
                  <a href={`tel:${selectedLead.phone}`} className="text-sm text-slate-300 hover:text-white mt-0.5 block">{selectedLead.phone}</a>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Country / Location</span>
                  <span className="text-sm text-slate-300 mt-0.5 block">{selectedLead.country}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Requirement Categories</span>
                  <span className="text-sm text-[#C9A84C] font-semibold mt-0.5 block">{selectedLead.products}</span>
                </div>
              </div>

              {/* Status and date */}
              <div className="flex items-center justify-between border-b border-slate-850 pb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 font-medium">CRM State:</span>
                  <select
                    value={selectedLead.status}
                    onChange={(e) => handleStatusChange(selectedLead.id, e.target.value as Lead["status"])}
                    className="px-2 py-1 bg-[#070d17] border border-slate-800 text-xs text-slate-300 rounded-md focus:border-[#C9A84C] outline-none"
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="qualified">Qualified</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
                <div className="text-xs text-slate-500 font-medium">
                  Received on {new Date(selectedLead.date).toLocaleString("en-IN")}
                </div>
              </div>

              {/* Message text */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4 text-slate-500" />
                  Client Message
                </span>
                <div className="bg-[#070d17] border border-slate-850 p-4 rounded-xl text-slate-300 text-sm leading-relaxed whitespace-pre-wrap font-sans">
                  {selectedLead.message}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-slate-800 bg-[#0d1624]/30 flex justify-end gap-3">
              <button
                onClick={() => setSelectedLead(null)}
                className="px-4 py-2 border border-slate-850 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-all text-xs font-bold cursor-pointer"
              >
                Close View
              </button>
              <a
                href={`mailto:${selectedLead.email}?subject=Re: Shree Raj Steels Inquiry`}
                className="px-4 py-2 bg-[#C9A84C] hover:bg-[#b0913f] text-[#09111e] rounded-lg transition-all text-xs font-bold cursor-pointer flex items-center"
              >
                Reply via Email
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
