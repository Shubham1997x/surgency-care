"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { createSession, destroySession } from "@/lib/auth";

export type LoginState = { error?: string };

export async function login(
  _prev: LoginState | null,
  formData: FormData
): Promise<LoginState> {
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");
  const from = String(formData.get("from") || "/dashboard");

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  const admin = await prisma.admin.findUnique({ where: { email } });
  if (!admin || !(await bcrypt.compare(password, admin.passwordHash))) {
    return { error: "Invalid email or password." };
  }

  await createSession({ sub: admin.id, email: admin.email });
  redirect(from.startsWith("/dashboard") ? from : "/dashboard");
}

export async function logout() {
  await destroySession();
  redirect("/login");
}
