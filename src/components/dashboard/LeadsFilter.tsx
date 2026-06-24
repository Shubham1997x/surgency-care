"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const RANGES = [
  { label: "All Time", value: "all" },
  { label: "Today", value: "today" },
  { label: "Last 7 Days", value: "7d" },
  { label: "Last 30 Days", value: "30d" },
  { label: "This Month", value: "thisMonth" },
  { label: "Custom", value: "custom" },
];

interface Props {
  leads: any[];
  uniqueConditions: string[];
  uniqueCities: string[];
  uniqueSources: string[];
}

export function LeadsFilter({ leads, uniqueConditions, uniqueCities, uniqueSources }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentRange = searchParams.get("range") || "all";
  const currentCondition = searchParams.get("condition") || "";
  const currentCity = searchParams.get("city") || "";
  const currentSource = searchParams.get("source") || "";
  const [isCustom, setIsCustom] = useState(currentRange === "custom");
  const [startDate, setStartDate] = useState(searchParams.get("startDate") || "");
  const [endDate, setEndDate] = useState(searchParams.get("endDate") || "");

  const push = (params: URLSearchParams) => router.push(`?${params.toString()}`);

  const handleRangeChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all") {
      params.delete("range");
      params.delete("startDate");
      params.delete("endDate");
      setIsCustom(false);
      push(params);
    } else if (value === "custom") {
      setIsCustom(true);
    } else {
      params.set("range", value);
      params.delete("startDate");
      params.delete("endDate");
      setIsCustom(false);
      push(params);
    }
  };

  const handleCustomApply = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    params.set("range", "custom");
    if (startDate) params.set("startDate", startDate); else params.delete("startDate");
    if (endDate) params.set("endDate", endDate); else params.delete("endDate");
    push(params);
  };

  const handleDropdown = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value); else params.delete(key);
    push(params);
  };

  const handleExport = () => {
    if (leads.length === 0) return;
    const headers = ["Name", "Phone", "City", "Condition", "Source", "Date", "Message"];
    const rows = leads.map((lead) => [
      `"${lead.name.replace(/"/g, '""')}"`,
      `"${lead.phone}"`,
      `"${lead.city || ""}"`,
      `"${lead.condition || ""}"`,
      `"${lead.source}"`,
      `"${new Date(lead.createdAt).toLocaleDateString()}"`,
      `"${(lead.message || "").replace(/"/g, '""')}"`,
    ]);
    const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads_export_${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const hasActiveFilters = currentCondition || currentCity || currentSource;

  const clearAll = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("condition");
    params.delete("city");
    params.delete("source");
    push(params);
  };

  return (
    <div className="mb-6 flex flex-col bg-white p-3 rounded-xl border border-slate-200 shadow-sm gap-3">
      {/* Date range row */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-50/50 rounded-lg">
          {RANGES.map((range) => {
            const isActive = currentRange === range.value;
            return (
              <button
                key={range.value}
                onClick={() => handleRangeChange(range.value)}
                className={`px-4 py-2 text-sm font-medium transition-all rounded-md ${
                  isActive
                    ? "bg-white text-brand-dark shadow-sm border border-slate-200"
                    : "text-slate-500 hover:text-slate-700 hover:bg-slate-100/50 border border-transparent"
                }`}
              >
                {range.label}
              </button>
            );
          })}
        </div>

        <button
          onClick={handleExport}
          className="border border-slate-200 px-4 py-2 text-sm flex items-center justify-center gap-2 whitespace-nowrap bg-white hover:bg-slate-50 shadow-sm rounded-lg text-slate-600 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Export CSV
        </button>
      </div>

      {/* Additional filters row */}
      <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 mr-1">Filter by</span>

        {uniqueConditions.length > 0 && (
          <select
            value={currentCondition}
            onChange={(e) => handleDropdown("condition", e.target.value)}
            className="field-input py-1.5 text-sm h-9 m-0 min-w-[140px]"
          >
            <option value="">All Conditions</option>
            {uniqueConditions.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        )}

        {uniqueCities.length > 0 && (
          <select
            value={currentCity}
            onChange={(e) => handleDropdown("city", e.target.value)}
            className="field-input py-1.5 text-sm h-9 m-0 min-w-[130px]"
          >
            <option value="">All Cities</option>
            {uniqueCities.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        )}

        {uniqueSources.length > 0 && (
          <select
            value={currentSource}
            onChange={(e) => handleDropdown("source", e.target.value)}
            className="field-input py-1.5 text-sm h-9 m-0 min-w-[130px]"
          >
            <option value="">All Sources</option>
            {uniqueSources.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        )}

        {hasActiveFilters && (
          <button
            onClick={clearAll}
            className="text-xs text-slate-400 hover:text-slate-600 underline underline-offset-2 transition-colors"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Custom date range */}
      {isCustom && (
        <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <span className="text-sm font-medium text-slate-600">Select Range:</span>
          <form onSubmit={handleCustomApply} className="flex flex-wrap items-center gap-2">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="field-input py-1.5 text-sm w-36 h-[38px] m-0"
            />
            <span className="text-slate-400">-</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="field-input py-1.5 text-sm w-36 h-[38px] m-0"
            />
            <button type="submit" className="btn-blue px-4 py-1.5 text-sm h-[38px]">
              Apply
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
