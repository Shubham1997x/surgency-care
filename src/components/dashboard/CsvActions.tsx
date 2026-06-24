"use client";

import { useRef, useState, useTransition } from "react";

type EntityType = "hospitals" | "doctors" | "treatments";

const HEADERS: Record<EntityType, string[]> = {
  hospitals: ["name", "slug", "location", "accreditation", "about", "beds", "modularOTs", "rating", "startingPrice", "specialties", "whyChoose", "featured"],
  doctors: ["name", "slug", "title", "primarySpecialty", "about", "experienceYears", "rating", "surgeriesCount", "consultationFee", "specialties", "qualifications", "featured", "hospitalSlug"],
  treatments: ["name", "slug", "conditionName", "tagline", "shortDesc", "heroDesc", "costMin", "costMax", "recoveryNote", "duration", "hospitalStay", "recoveryTime", "successRate", "symptoms", "procedureSteps", "benefits", "aftercare", "featured", "categorySlug"],
};

function escapeCell(val: unknown): string {
  const s = String(val ?? "");
  return s.includes(",") || s.includes('"') || s.includes("\n") ? `"${s.replace(/"/g, '""')}"` : s;
}

function jsonToArr(val: unknown): string {
  try {
    const parsed = JSON.parse(String(val || "[]"));
    if (!Array.isArray(parsed) || parsed.length === 0) return "";
    if (typeof parsed[0] === "string") return parsed.join("|");
    return String(val);
  } catch {
    return String(val ?? "");
  }
}

function buildRow(entity: EntityType, item: any): string[] {
  if (entity === "hospitals") {
    return [item.name, item.slug, item.location, item.accreditation, item.about, item.beds, item.modularOTs, item.rating, item.startingPrice, jsonToArr(item.specialties), item.whyChoose, item.featured].map(String);
  }
  if (entity === "doctors") {
    return [item.name, item.slug, item.title, item.primarySpecialty, item.about, item.experienceYears, item.rating, item.surgeriesCount, item.consultationFee, jsonToArr(item.specialties), jsonToArr(item.qualifications), item.featured, item.hospital?.slug ?? ""].map(String);
  }
  // treatments
  return [item.name, item.slug, item.conditionName, item.tagline, item.shortDesc, item.heroDesc, item.costMin, item.costMax, item.recoveryNote, item.duration, item.hospitalStay, item.recoveryTime, item.successRate, jsonToArr(item.symptoms), jsonToArr(item.procedureSteps), jsonToArr(item.benefits), jsonToArr(item.aftercare), item.featured, item.category?.slug ?? ""].map(String);
}

interface Props {
  entityType: EntityType;
  data: any[];
  importAction: (csv: string) => Promise<{ ok: boolean; error?: string; count?: number }>;
}

export function CsvActions({ entityType, data, importAction }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<{ msg: string; ok: boolean } | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleExport = () => {
    const headers = HEADERS[entityType];
    const rows = data.map((item) => buildRow(entityType, item).map(escapeCell).join(","));
    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${entityType}_${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setStatus({ msg: "Importing…", ok: true });
    file.text().then((text) => {
      startTransition(async () => {
        const res = await importAction(text);
        setStatus(res.ok ? { msg: `Imported ${res.count} records.`, ok: true } : { msg: `Error: ${res.error}`, ok: false });
      });
    });
    e.target.value = "";
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleExport}
        className="border border-slate-200 px-3 py-1.5 text-sm flex items-center gap-1.5 bg-white hover:bg-slate-50 rounded-lg text-slate-600 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
        Export CSV
      </button>
      <button
        onClick={() => fileRef.current?.click()}
        disabled={isPending}
        className="border border-slate-200 px-3 py-1.5 text-sm flex items-center gap-1.5 bg-white hover:bg-slate-50 rounded-lg text-slate-600 transition-colors disabled:opacity-50"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
        {isPending ? "Importing…" : "Import CSV"}
      </button>
      <input ref={fileRef} type="file" accept=".csv" className="hidden" onChange={handleFileChange} />
      {status && (
        <span className={`text-xs font-medium ${status.ok ? "text-green-600" : "text-red-500"}`}>
          {status.msg}
        </span>
      )}
    </div>
  );
}
