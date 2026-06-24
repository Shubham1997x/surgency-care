"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { slugify } from "@/lib/utils";

async function requireAdmin() {
  const session = await getSession();
  if (!session) redirect("/login");
}

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === "," && !inQuotes) {
      result.push(current);
      current = "";
    } else {
      current += ch;
    }
  }
  result.push(current);
  return result;
}

function parseCSV(text: string): Record<string, string>[] {
  const lines = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n").trim().split("\n");
  if (lines.length < 2) return [];
  const headers = parseCSVLine(lines[0]).map((h) => h.trim());
  return lines.slice(1).map((line) => {
    const values = parseCSVLine(line);
    const row: Record<string, string> = {};
    headers.forEach((h, i) => {
      row[h] = (values[i] ?? "").trim();
    });
    return row;
  });
}

function pipeToJSON(val: string): string {
  if (!val) return "[]";
  return JSON.stringify(val.split("|").map((s) => s.trim()).filter(Boolean));
}

function int(val: string, fallback = 0): number {
  const n = parseInt(val, 10);
  return isNaN(n) ? fallback : n;
}

function float(val: string, fallback = 0): number {
  const n = parseFloat(val);
  return isNaN(n) ? fallback : n;
}

function bool(val: string): boolean {
  return val?.toLowerCase() === "true";
}

// ────────────────────────── HOSPITALS ──────────────────────────

export async function importHospitalsCSV(
  csv: string
): Promise<{ ok: boolean; error?: string; count?: number }> {
  await requireAdmin();
  try {
    const rows = parseCSV(csv);
    let count = 0;
    for (const row of rows) {
      const name = row["name"];
      if (!name) continue;
      const slug = row["slug"] || slugify(name) || `hospital-${Date.now()}`;
      const data = {
        name,
        location: row["location"] ?? "",
        accreditation: row["accreditation"] || "NABH Accredited",
        about: row["about"] ?? "",
        beds: int(row["beds"]),
        modularOTs: int(row["modularOTs"]),
        rating: float(row["rating"], 4.5),
        startingPrice: int(row["startingPrice"]),
        specialties: pipeToJSON(row["specialties"]),
        whyChoose: row["whyChoose"] || "[]",
        featured: bool(row["featured"]),
      };
      await prisma.hospital.upsert({
        where: { slug },
        create: { slug, ...data },
        update: data,
      });
      count++;
    }
    revalidatePath("/dashboard/hospitals");
    return { ok: true, count };
  } catch (e: any) {
    return { ok: false, error: e.message };
  }
}

// ────────────────────────── DOCTORS ──────────────────────────

export async function importDoctorsCSV(
  csv: string
): Promise<{ ok: boolean; error?: string; count?: number }> {
  await requireAdmin();
  try {
    const rows = parseCSV(csv);
    let count = 0;
    for (const row of rows) {
      const name = row["name"];
      if (!name) continue;
      const slug = row["slug"] || slugify(name) || `doctor-${Date.now()}`;

      let hospitalId: string | null = null;
      if (row["hospitalSlug"]) {
        const h = await prisma.hospital.findUnique({ where: { slug: row["hospitalSlug"] }, select: { id: true } });
        hospitalId = h?.id ?? null;
      }

      const data = {
        name,
        title: row["title"] ?? "",
        primarySpecialty: row["primarySpecialty"] ?? "",
        about: row["about"] ?? "",
        experienceYears: int(row["experienceYears"]),
        rating: float(row["rating"], 4.8),
        surgeriesCount: int(row["surgeriesCount"]),
        consultationFee: int(row["consultationFee"]),
        specialties: pipeToJSON(row["specialties"]),
        qualifications: pipeToJSON(row["qualifications"]),
        featured: bool(row["featured"]),
        hospitalId,
      };
      await prisma.doctor.upsert({
        where: { slug },
        create: { slug, ...data },
        update: data,
      });
      count++;
    }
    revalidatePath("/dashboard/doctors");
    return { ok: true, count };
  } catch (e: any) {
    return { ok: false, error: e.message };
  }
}

// ────────────────────────── TREATMENTS ──────────────────────────

export async function importTreatmentsCSV(
  csv: string
): Promise<{ ok: boolean; error?: string; count?: number }> {
  await requireAdmin();
  try {
    const rows = parseCSV(csv);
    let count = 0;
    for (const row of rows) {
      const name = row["name"];
      if (!name) continue;
      const slug = row["slug"] || slugify(name) || `treatment-${Date.now()}`;

      let categoryId: string | null = null;
      if (row["categorySlug"]) {
        const c = await prisma.treatmentCategory.findUnique({ where: { slug: row["categorySlug"] }, select: { id: true } });
        categoryId = c?.id ?? null;
      }

      const data = {
        name,
        conditionName: row["conditionName"] ?? "",
        tagline: row["tagline"] ?? "",
        shortDesc: row["shortDesc"] ?? "",
        heroDesc: row["heroDesc"] ?? "",
        costMin: int(row["costMin"]),
        costMax: int(row["costMax"]),
        recoveryNote: row["recoveryNote"] ?? "",
        duration: row["duration"] ?? "",
        hospitalStay: row["hospitalStay"] ?? "",
        recoveryTime: row["recoveryTime"] ?? "",
        successRate: row["successRate"] ?? "",
        symptoms: pipeToJSON(row["symptoms"]),
        procedureSteps: pipeToJSON(row["procedureSteps"]),
        benefits: pipeToJSON(row["benefits"]),
        aftercare: pipeToJSON(row["aftercare"]),
        featured: bool(row["featured"]),
        categoryId,
      };
      await prisma.treatment.upsert({
        where: { slug },
        create: { slug, ...data },
        update: data,
      });
      count++;
    }
    revalidatePath("/dashboard/treatments");
    return { ok: true, count };
  } catch (e: any) {
    return { ok: false, error: e.message };
  }
}
