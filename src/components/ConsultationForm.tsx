"use client";

import { useActionState, useState } from "react";
import { submitLead, type LeadResult } from "@/app/actions/leads";
import { IconCheck, IconPhone } from "./Icons";

export function ConsultationForm({
  source = "contact",
  conditionDefault = "",
  compact = false,
  treatments = [],
}: {
  source?: string;
  conditionDefault?: string;
  compact?: boolean;
  treatments?: { name: string; slug: string }[];
}) {
  const [state, action, pending] = useActionState<LeadResult | null, FormData>(
    submitLead,
    null
  );

  const [errors, setErrors] = useState<{
    name?: string;
    phone?: string;
    city?: string;
    condition?: string;
  }>({});

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    const formData = new FormData(e.currentTarget);
    const name = String(formData.get("name") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const city = String(formData.get("city") || "").trim();
    const condition = String(formData.get("condition") || "").trim();

    const newErrors: typeof errors = {};

    if (!name) {
      newErrors.name = "Full name is required";
    } else if (name.length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }

    if (!phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?[\d\s-]{10,15}$/.test(phone.replace(/[\s-]/g, ""))) {
      newErrors.phone = "Please enter a valid phone number (10-12 digits)";
    }

    if (city && city.length < 2) {
      newErrors.city = "City must be at least 2 characters";
    }

    if (condition && condition.length < 2) {
      newErrors.condition = "Condition must be at least 2 characters";
    }

    if (Object.keys(newErrors).length > 0) {
      e.preventDefault();
      setErrors(newErrors);
    } else {
      setErrors({});
    }
  }

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
    <form action={action} onSubmit={handleSubmit} className="space-y-4">
      <input type="hidden" name="source" value={source} />
      <div className={compact ? "grid gap-4 sm:grid-cols-2" : "space-y-4"}>
        <div>
          <label className="field-label font-medium text-slate-700">Full Name *</label>
          <input
            name="name"
            placeholder="Enter your name"
            className={`field-input ${errors.name ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}`}
          />
          {errors.name && (
            <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-500">
              <span className="text-[10px]">⚠️</span> {errors.name}
            </p>
          )}
        </div>
        <div>
          <label className="field-label font-medium text-slate-700">Phone Number *</label>
          <input
            name="phone"
            placeholder="+91 00000 00000"
            className={`field-input ${errors.phone ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}`}
          />
          {errors.phone && (
            <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-500">
              <span className="text-[10px]">⚠️</span> {errors.phone}
            </p>
          )}
        </div>
      </div>
      <div className={compact ? "grid gap-4 sm:grid-cols-2" : "space-y-4"}>
        <div>
          <label className="field-label font-medium text-slate-700">City / Location</label>
          <input
            name="city"
            placeholder="Ghaziabad"
            className={`field-input ${errors.city ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}`}
          />
          {errors.city && (
            <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-500">
              <span className="text-[10px]">⚠️</span> {errors.city}
            </p>
          )}
        </div>
        <div>
          <label className="field-label font-medium text-slate-700">Condition / Treatment Needed</label>
          {treatments && treatments.length > 0 ? (
            <select
              name="condition"
              className={`field-input bg-white ${errors.condition ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}`}
            >
              <option value="">Select a treatment...</option>
              {treatments.map((t) => (
                <option key={t.slug} value={t.name}>
                  {t.name}
                </option>
              ))}
              <option value="Other">Other / Not Listed</option>
            </select>
          ) : (
            <input
              name="condition"
              defaultValue={conditionDefault}
              placeholder="e.g. Gallbladder Stone"
              className={`field-input ${errors.condition ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}`}
            />
          )}
          {errors.condition && (
            <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-500">
              <span className="text-[10px]">⚠️</span> {errors.condition}
            </p>
          )}
        </div>
      </div>
      <div>
        <label className="field-label font-medium text-slate-700">Brief Description (Optional)</label>
        <textarea
          name="message"
          rows={3}
          placeholder="Describe your symptoms or any questions you have…"
          className="field-input resize-none"
        />
      </div>
      {(state?.error || Object.keys(errors).length > 0) && (
        <div className="flex items-start gap-2.5 rounded-xl bg-red-50 p-4 text-xs text-red-700 border border-red-100">
          <span className="mt-0.5 text-sm flex-shrink-0">⚠️</span>
          <div>
            <span className="font-semibold block mb-0.5">Please check your details</span>
            <span className="opacity-90 leading-normal">
              {state?.error || "Some required fields are missing or incorrect. Please review the highlighted fields above."}
            </span>
          </div>
        </div>
      )}
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
