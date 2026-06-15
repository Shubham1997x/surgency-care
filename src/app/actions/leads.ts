"use server";

import { prisma } from "@/lib/db";

export type LeadResult = { ok: boolean; error?: string };

export async function submitLead(
  _prev: LeadResult | null,
  formData: FormData
): Promise<LeadResult> {
  const name = String(formData.get("name") || "").trim();
  const phone = String(formData.get("phone") || "").trim();
  const city = String(formData.get("city") || "").trim();
  const condition = String(formData.get("condition") || "").trim();
  const message = String(formData.get("message") || "").trim();
  const source = String(formData.get("source") || "contact").trim();

  if (!name || !phone) {
    return { ok: false, error: "Please enter your name and phone number." };
  }
  if (!/^[+\d][\d\s-]{6,}$/.test(phone)) {
    return { ok: false, error: "Please enter a valid phone number." };
  }

  await prisma.lead.create({
    data: { name, phone, city, condition, message, source },
  });

  return { ok: true };
}
