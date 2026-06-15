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

export function LeadsFilter({ leads }: { leads: any[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const currentRange = searchParams.get("range") || "all";
  const [isCustom, setIsCustom] = useState(currentRange === "custom");
  const [startDate, setStartDate] = useState(searchParams.get("startDate") || "");
  const [endDate, setEndDate] = useState(searchParams.get("endDate") || "");

  const handleRangeChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all") {
      params.delete("range");
      params.delete("startDate");
      params.delete("endDate");
      setIsCustom(false);
      router.push(`?${params.toString()}`);
    } else if (value === "custom") {
      setIsCustom(true);
      // Wait for user to submit custom dates
    } else {
      params.set("range", value);
      params.delete("startDate");
      params.delete("endDate");
      setIsCustom(false);
      router.push(`?${params.toString()}`);
    }
  };

  const handleCustomApply = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    params.set("range", "custom");
    if (startDate) params.set("startDate", startDate);
    else params.delete("startDate");
    
    if (endDate) params.set("endDate", endDate);
    else params.delete("endDate");
    
    router.push(`?${params.toString()}`);
  };

  const handleExport = () => {
    if (leads.length === 0) return;
    
    // Create CSV header
    const headers = ["Name", "Phone", "City", "Condition", "Source", "Date", "Message"];
    
    // Convert leads to CSV rows
    const rows = leads.map(lead => [
      `"${lead.name.replace(/"/g, '""')}"`,
      `"${lead.phone}"`,
      `"${lead.city || ""}"`,
      `"${lead.condition || ""}"`,
      `"${lead.source}"`,
      `"${new Date(lead.createdAt).toLocaleDateString()}"`,
      `"${(lead.message || "").replace(/"/g, '""')}"`
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.join(","))
    ].join("\n");

    // Create and trigger download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `leads_export_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="mb-6 flex flex-col bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
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
          className="btn-ghost border border-slate-200 px-4 py-2 text-sm flex items-center justify-center gap-2 whitespace-nowrap bg-white hover:bg-slate-50 shadow-sm rounded-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
          Export CSV
        </button>
      </div>

      {isCustom && (
        <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
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
