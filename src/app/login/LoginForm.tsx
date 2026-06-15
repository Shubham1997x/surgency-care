"use client";

import { useActionState } from "react";
import { login, type LoginState } from "@/app/actions/auth";

export function LoginForm({ from }: { from?: string }) {
  const [state, action, pending] = useActionState<LoginState | null, FormData>(
    login,
    null
  );
  return (
    <form action={action} className="space-y-4">
      <input type="hidden" name="from" value={from ?? "/dashboard"} />
      <div>
        <label className="field-label">Email</label>
        <input
          name="email"
          type="email"
          required
          defaultValue="admin@surgencycare.com"
          className="field-input"
        />
      </div>
      <div>
        <label className="field-label">Password</label>
        <input name="password" type="password" required className="field-input" />
      </div>
      {state?.error && <p className="text-sm text-red-600">{state.error}</p>}
      <button type="submit" disabled={pending} className="btn-blue w-full">
        {pending ? "Signing in…" : "Sign In"}
      </button>
    </form>
  );
}
