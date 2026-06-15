import type { Metadata } from "next";
import { Logo } from "@/components/Logo";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = { title: "Admin Login" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string }>;
}) {
  const { from } = await searchParams;
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>
        <div className="card p-8">
          <h1 className="text-center text-xl font-semibold text-brand-dark">
            Dashboard Login
          </h1>
          <p className="mt-1 text-center text-sm text-slate-500">
            Sign in to manage your website content.
          </p>
          <div className="mt-6">
            <LoginForm from={from} />
          </div>
        </div>
        <p className="mt-4 text-center text-xs text-slate-400">
          Demo credentials: admin@surgencycare.com / admin123
        </p>
      </div>
    </div>
  );
}
