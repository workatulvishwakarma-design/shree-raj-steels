"use client";

import React, { useState } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";

export interface Column<T> {
  header: string;
  accessor: keyof T | ((row: T) => React.ReactNode);
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  searchPlaceholder?: string;
  searchFilter?: (item: T, query: string) => boolean;
  actionsHeader?: string;
  actions?: (row: T) => React.ReactNode;
  emptyMessage?: string;
}

export default function DataTable<T>({
  columns,
  data,
  searchPlaceholder = "Search records...",
  searchFilter,
  actionsHeader = "Actions",
  actions,
  emptyMessage = "No records found.",
}: DataTableProps<T>) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Filter data
  const filteredData = React.useMemo(() => {
    if (!searchQuery) return data;
    if (!searchFilter) return data;
    return data.filter((item) => searchFilter(item, searchQuery));
  }, [data, searchQuery, searchFilter]);

  // Paginate data
  const totalPages = Math.max(1, Math.ceil(filteredData.length / itemsPerPage));
  const paginatedData = React.useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [filteredData, currentPage]);

  // Reset page on search
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const renderCell = (row: T, col: Column<T>) => {
    if (typeof col.accessor === "function") {
      return col.accessor(row);
    }
    return row[col.accessor] as React.ReactNode;
  };

  return (
    <div className="space-y-4">
      {/* Top controls: Search */}
      {searchFilter && (
        <div className="relative max-w-sm">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
            <Search className="w-4 h-4" />
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder={searchPlaceholder}
            className="w-full pl-9 pr-4 py-2 bg-[#070d17] border border-slate-800 focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C]/50 text-white rounded-lg text-sm placeholder-slate-600 transition-all outline-none"
          />
        </div>
      )}

      {/* Table Shell */}
      <div className="bg-[#0f1b2d]/50 border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/30 text-slate-400 font-semibold text-xs uppercase tracking-wider">
                {columns.map((col, idx) => (
                  <th key={idx} className={`px-6 py-4 ${col.className || ""}`}>
                    {col.header}
                  </th>
                ))}
                {actions && <th className="px-6 py-4 text-right">{actionsHeader}</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {paginatedData.length > 0 ? (
                paginatedData.map((row, rowIdx) => (
                  <tr
                    key={rowIdx}
                    className="hover:bg-slate-800/10 transition-colors group"
                  >
                    {columns.map((col, colIdx) => (
                      <td
                        key={colIdx}
                        className={`px-6 py-4 text-slate-300 align-middle ${
                          col.className || ""
                        }`}
                      >
                        {renderCell(row, col)}
                      </td>
                    ))}
                    {actions && (
                      <td className="px-6 py-4 text-right align-middle">
                        {actions(row)}
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length + (actions ? 1 : 0)}
                    className="px-6 py-12 text-center text-slate-500"
                  >
                    {emptyMessage}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-slate-800 bg-slate-900/10 flex items-center justify-between">
            <span className="text-xs text-slate-500">
              Showing Page {currentPage} of {totalPages} ({filteredData.length} records)
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-1.5 rounded-lg border border-slate-850 bg-slate-900/50 text-slate-400 hover:text-white hover:border-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-1.5 rounded-lg border border-slate-850 bg-slate-900/50 text-slate-400 hover:text-white hover:border-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
