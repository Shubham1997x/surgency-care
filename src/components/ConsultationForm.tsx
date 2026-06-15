"use client";

import { useActionState } from "react";
import { submitLead, type LeadResult } from "@/app/actions/leads";
import { IconCheck, IconPhone } from "./Icons";

export function ConsultationForm({
  source = "contact",
  conditionDefault = "",
  compact = false,
}: {
  source?: string;
  conditionDefault?: string;
  compact?: boolean;
}) {
  const [state, action, pending] = useActionState<LeadResult | null, FormData>(
    submitLead,
    null
  );

  if (state?.ok) {
    return (
      <div className="rounded-xl bg-brand-teal/10 p-6 text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-brand-teal text-white">
          <IconCheck className="h-6 w-6" />
        </div>
        <h4 className="font-semibold text-brand-dark">Thank you! We&apos;ll call you back.</h4>
        <p className="mt-1 text-sm text-slate-600">
          Our care team will reach out shortly to guide you — completely free.
        </p>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-4">
      <input type="hidden" name="source" value={source} />
      <div className={compact ? "grid gap-4 sm:grid-cols-2" : "space-y-4"}>
        <div>
          <label className="field-label">Full Name *</label>
          <input name="name" required placeholder="Enter your name" className="field-input" />
        </div>
        <div>
          <label className="field-label">Phone Number *</label>
          <input name="phone" required placeholder="+91 00000 00000" className="field-input" />
        </div>
      </div>
      <div className={compact ? "grid gap-4 sm:grid-cols-2" : "space-y-4"}>
        <div>
          <label className="field-label">City / Location</label>
          <input name="city" placeholder="Ghaziabad" className="field-input" />
        </div>
        <div>
          <label className="field-label">Condition / Treatment Needed</label>
          <input
            name="condition"
            defaultValue={conditionDefault}
            placeholder="e.g. Gallbladder Stone"
            className="field-input"
          />
        </div>
      </div>
      <div>
        <label className="field-label">Brief Description (Optional)</label>
        <textarea
          name="message"
          rows={3}
          placeholder="Describe your symptoms or any questions you have…"
          className="field-input resize-none"
        />
      </div>
      {state?.error && <p className="text-sm text-red-600">{state.error}</p>}
      <button type="submit" disabled={pending} className="btn-blue w-full">
        <IconPhone className="h-4 w-4" />
        {pending ? "Submitting…" : "Submit & Get a Call Back"}
      </button>
      <p className="text-center text-xs text-slate-400">
        Your information is safe with us. We respect your privacy.
      </p>
    </form>
  );
}
